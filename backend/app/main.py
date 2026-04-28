from __future__ import annotations

import logging
import secrets
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.core import config
from app.core.database import db_cursor, init_db, now_iso
from app.schemas.api import (
    AppointmentCreate,
    AppointmentResponse,
    DashboardSummary,
    LeadCreate,
    LeadResponse,
    NewsItem,
    NewsletterResponse,
    NewsletterSubscribe,
)
from app.services.classification import classify_lead
from app.services.notifications import notify_appointment, notify_new_lead, send_newsletter_confirmation


logging.basicConfig(level=logging.INFO)


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield


app = FastAPI(title=config.APP_NAME, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def row_to_lead_response(row) -> LeadResponse:
    return LeadResponse(
        id=row["id"],
        full_name=row["full_name"],
        company=row["company"] or "",
        email=row["email"],
        solution_interest=row["solution_interest"],
        lead_score=row["lead_score"],
        lead_classification=row["lead_classification"],
        bot_risk=row["bot_risk"],
        assigned_to=row["assigned_to"] or "Pendiente",
        status=row["status"],
        created_at=row["created_at"],
    )


def row_to_appointment_response(row) -> AppointmentResponse:
    return AppointmentResponse(
        id=row["id"],
        lead_id=row["lead_id"],
        title=row["title"],
        appointment_type=row["appointment_type"],
        responsible=row["responsible"],
        status=row["status"],
        is_video_call=bool(row["is_video_call"]),
        video_link_status=row["video_link_status"],
        start_datetime=row["start_datetime"],
        end_datetime=row["end_datetime"],
    )


@app.get("/health")
def health_check():
    return {"status": "ok", "app": config.APP_NAME, "env": config.APP_ENV}


@app.get("/api/news", response_model=list[NewsItem])
def list_news():
    with db_cursor() as cursor:
        rows = cursor.execute(
            """
            SELECT id, title, slug, summary, content, category, published_at
            FROM ai_news
            WHERE status = 'active'
            ORDER BY published_at DESC
            LIMIT 30
            """
        ).fetchall()
    return [NewsItem(**dict(row)) for row in rows]


@app.post("/api/newsletter/subscribe", response_model=NewsletterResponse)
def subscribe_newsletter(payload: NewsletterSubscribe):
    created_at = now_iso()
    token = secrets.token_urlsafe(24)

    with db_cursor() as cursor:
        existing = cursor.execute(
            "SELECT id, email, status, created_at FROM newsletter_subscribers WHERE email = ?",
            (payload.email,),
        ).fetchone()
        if existing:
            return NewsletterResponse(
                id=existing["id"],
                email=existing["email"],
                status=existing["status"],
                created_at=existing["created_at"],
            )

        cursor.execute(
            """
            INSERT INTO newsletter_subscribers (
                email, name, company, source, status, confirmation_token,
                confirmed_at, unsubscribed_at, created_at, updated_at
            )
            VALUES (?, ?, ?, ?, 'pending_confirmation', ?, NULL, NULL, ?, ?)
            """,
            (payload.email, payload.name, payload.company, payload.source, token, created_at, created_at),
        )
        subscriber_id = cursor.lastrowid

    send_newsletter_confirmation(payload.email)
    return NewsletterResponse(id=subscriber_id, email=payload.email, status="pending_confirmation", created_at=created_at)


@app.post("/api/leads", response_model=LeadResponse)
def create_lead(payload: LeadCreate):
    classification = classify_lead(payload)
    created_at = now_iso()

    if classification["bot_risk"] >= config.BOT_SCORE_BLOCK_THRESHOLD:
        raise HTTPException(status_code=400, detail="El envio fue marcado como sospechoso.")

    with db_cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO leads (
                full_name, company, position, email, phone, company_type, solution_interest,
                main_need, budget_range, implementation_time, challenge_description,
                preferred_contact_method, preferred_responsible, assigned_to, lead_score,
                lead_classification, bot_risk, status, source, created_at, updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                payload.full_name,
                payload.company,
                payload.position,
                payload.email,
                payload.phone,
                payload.company_type,
                payload.solution_interest,
                payload.main_need,
                payload.budget_range,
                payload.implementation_time,
                payload.challenge_description,
                payload.preferred_contact_method,
                payload.preferred_responsible,
                classification["assigned_to"],
                classification["lead_score"],
                classification["lead_classification"],
                classification["bot_risk"],
                classification["status"],
                payload.source,
                created_at,
                created_at,
            ),
        )
        lead_id = cursor.lastrowid

        cursor.execute(
            """
            INSERT INTO lead_activities (lead_id, activity_type, description, created_by, created_at)
            VALUES (?, 'lead_created', ?, 'system', ?)
            """,
            (
                lead_id,
                f"Lead creado con clasificacion {classification['lead_classification']}",
                created_at,
            ),
        )

        row = cursor.execute("SELECT * FROM leads WHERE id = ?", (lead_id,)).fetchone()

    notify_new_lead(
        {
            "full_name": payload.full_name,
            "company": payload.company,
            "email": payload.email,
            "phone": payload.phone,
            "solution_interest": payload.solution_interest,
            "lead_classification": str(classification["lead_classification"]),
            "assigned_to": str(classification["assigned_to"]),
        }
    )

    return row_to_lead_response(row)


@app.get("/api/leads", response_model=list[LeadResponse])
def list_leads():
    with db_cursor() as cursor:
        rows = cursor.execute(
            """
            SELECT *
            FROM leads
            ORDER BY created_at DESC
            LIMIT 50
            """
        ).fetchall()
    return [row_to_lead_response(row) for row in rows]


@app.post("/api/appointments", response_model=AppointmentResponse)
def create_appointment(payload: AppointmentCreate):
    created_at = now_iso()
    is_video_call = payload.appointment_type in {"videocall", "demo"}

    with db_cursor() as cursor:
        if payload.lead_id is not None:
            lead = cursor.execute("SELECT id FROM leads WHERE id = ?", (payload.lead_id,)).fetchone()
            if not lead:
                raise HTTPException(status_code=404, detail="Lead no encontrado.")

        cursor.execute(
            """
            INSERT INTO appointments (
                lead_id, title, appointment_type, responsible, start_datetime, end_datetime,
                status, is_video_call, video_link, video_link_status, notes, created_at, updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, 'requested', ?, NULL, ?, ?, ?, ?)
            """,
            (
                payload.lead_id,
                payload.title,
                payload.appointment_type,
                payload.responsible,
                payload.start_datetime.isoformat(),
                payload.end_datetime.isoformat(),
                int(is_video_call),
                "pending" if is_video_call else "not_required",
                payload.notes,
                created_at,
                created_at,
            ),
        )
        appointment_id = cursor.lastrowid
        row = cursor.execute("SELECT * FROM appointments WHERE id = ?", (appointment_id,)).fetchone()

        if payload.lead_id is not None:
            cursor.execute(
                """
                INSERT INTO lead_activities (lead_id, activity_type, description, created_by, created_at)
                VALUES (?, 'appointment_requested', ?, 'system', ?)
                """,
                (
                    payload.lead_id,
                    f"Cita solicitada: {payload.appointment_type} con {payload.responsible}",
                    created_at,
                ),
            )

    notify_appointment(
        {
            "title": payload.title,
            "appointment_type": payload.appointment_type,
            "responsible": payload.responsible,
            "start_datetime": payload.start_datetime.isoformat(),
            "end_datetime": payload.end_datetime.isoformat(),
            "status": "requested",
        }
    )
    return row_to_appointment_response(row)


@app.get("/api/appointments", response_model=list[AppointmentResponse])
def list_appointments():
    with db_cursor() as cursor:
        rows = cursor.execute(
            """
            SELECT *
            FROM appointments
            ORDER BY start_datetime ASC
            LIMIT 50
            """
        ).fetchall()
    return [row_to_appointment_response(row) for row in rows]


@app.get("/api/dashboard/summary", response_model=DashboardSummary)
def dashboard_summary():
    today = datetime.utcnow().date().isoformat()

    with db_cursor() as cursor:
        lead_rows = cursor.execute("SELECT lead_classification, solution_interest, bot_risk FROM leads").fetchall()
        appointment_rows = cursor.execute(
            "SELECT appointment_type, start_datetime FROM appointments"
        ).fetchall()

    solution_counts: dict[str, int] = {}
    hot = medium = curious = bots = 0
    for row in lead_rows:
        classification = row["lead_classification"]
        solution = row["solution_interest"]
        solution_counts[solution] = solution_counts.get(solution, 0) + 1
        if classification == "Caliente":
            hot += 1
        elif classification == "Medio":
            medium += 1
        elif classification == "Curioso":
            curious += 1
        if row["bot_risk"] >= config.BOT_SCORE_REVIEW_THRESHOLD:
            bots += 1

    today_calls = sum(
        1
        for row in appointment_rows
        if row["appointment_type"] in {"call", "videocall"} and row["start_datetime"].startswith(today)
    )
    requested_demos = sum(1 for row in appointment_rows if row["appointment_type"] == "demo")

    most_requested_solution = max(solution_counts, key=solution_counts.get, default="Sin datos")

    return DashboardSummary(
        total_leads=len(lead_rows),
        hot_leads=hot,
        medium_leads=medium,
        curious_leads=curious,
        suspicious_bots=bots,
        today_calls=today_calls,
        requested_demos=requested_demos,
        most_requested_solution=most_requested_solution,
    )
