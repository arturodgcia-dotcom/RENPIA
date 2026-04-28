from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from datetime import datetime, timedelta

from app.core.config import DATABASE_PATH


SCHEMA = """
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    company TEXT,
    position TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    company_type TEXT,
    solution_interest TEXT NOT NULL,
    main_need TEXT NOT NULL,
    budget_range TEXT,
    implementation_time TEXT,
    challenge_description TEXT NOT NULL,
    preferred_contact_method TEXT NOT NULL,
    preferred_responsible TEXT,
    assigned_to TEXT,
    lead_score INTEGER NOT NULL,
    lead_classification TEXT NOT NULL,
    bot_risk INTEGER NOT NULL,
    status TEXT NOT NULL,
    source TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lead_activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL,
    activity_type TEXT NOT NULL,
    description TEXT NOT NULL,
    created_by TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (lead_id) REFERENCES leads (id)
);

CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    title TEXT NOT NULL,
    appointment_type TEXT NOT NULL,
    responsible TEXT NOT NULL,
    start_datetime TEXT NOT NULL,
    end_datetime TEXT NOT NULL,
    status TEXT NOT NULL,
    is_video_call INTEGER NOT NULL,
    video_link TEXT,
    video_link_status TEXT NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (lead_id) REFERENCES leads (id)
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    company TEXT,
    source TEXT NOT NULL,
    status TEXT NOT NULL,
    confirmation_token TEXT NOT NULL,
    confirmed_at TEXT,
    unsubscribed_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ai_news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL,
    published_at TEXT NOT NULL,
    archived_at TEXT,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL
);
"""


SEED_NEWS = [
    {
        "title": "La IA operativa ya no es experimento: es ventaja competitiva",
        "slug": "ia-operativa-ventaja-competitiva",
        "summary": "Las empresas que integran automatizacion y analitica en ventas y operacion estan reduciendo tiempos de respuesta y capturando oportunidades antes que su competencia.",
        "content": "RENPIA puede ayudarte a convertir esta tendencia en un plan de automatizacion comercial, operativa y de seguimiento con soluciones propias y desarrollo a la medida.",
        "category": "Tendencias",
    },
    {
        "title": "Automatizacion comercial con datos conectados",
        "slug": "automatizacion-comercial-datos-conectados",
        "summary": "La integracion entre formularios, CRM, agenda y seguimiento comercial evita fugas en el proceso de venta y mejora la conversion.",
        "content": "Con SprintPilot y ComerCia, RENPIA puede acelerar seguimiento, diagnostico y acompanamiento comercial con una ruta medible.",
        "category": "Ventas",
    },
    {
        "title": "Software a la medida con foco en retorno",
        "slug": "software-medida-foco-retorno",
        "summary": "El desarrollo a la medida gana valor cuando parte de objetivos de negocio claros, responsables definidos y una implementacion por fases.",
        "content": "RENPIA combina estrategia, IA y ejecucion para construir soluciones que si aterrizan en operacion diaria.",
        "category": "Desarrollo",
    },
]


def now_iso() -> str:
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


@contextmanager
def db_cursor():
    connection = get_connection()
    try:
        cursor = connection.cursor()
        yield cursor
        connection.commit()
    finally:
        connection.close()


def init_db() -> None:
    with db_cursor() as cursor:
        cursor.executescript(SCHEMA)

        existing = cursor.execute("SELECT COUNT(*) AS count FROM ai_news").fetchone()["count"]
        if existing:
            return

        created_at = now_iso()
        for index, item in enumerate(SEED_NEWS):
            published_at = (datetime.utcnow() - timedelta(days=index)).replace(microsecond=0).isoformat() + "Z"
            expires_at = (datetime.utcnow() + timedelta(days=210)).replace(microsecond=0).isoformat() + "Z"
            cursor.execute(
                """
                INSERT INTO ai_news (
                    title, slug, summary, content, category, status,
                    published_at, archived_at, expires_at, created_at
                )
                VALUES (?, ?, ?, ?, ?, 'active', ?, NULL, ?, ?)
                """,
                (
                    item["title"],
                    item["slug"],
                    item["summary"],
                    item["content"],
                    item["category"],
                    published_at,
                    expires_at,
                    created_at,
                ),
            )
