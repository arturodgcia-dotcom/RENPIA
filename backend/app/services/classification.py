from __future__ import annotations

import re
from collections import Counter

from app.schemas.api import LeadCreate


FREE_EMAIL_DOMAINS = {
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "icloud.com",
}


def has_business_email(email: str) -> bool:
    domain = email.split("@")[-1].lower()
    return domain not in FREE_EMAIL_DOMAINS and "." in domain


def is_valid_whatsapp(phone: str) -> bool:
    digits = re.sub(r"\D", "", phone or "")
    return 10 <= len(digits) <= 14


def is_repetitive_text(text: str) -> bool:
    words = [word.lower() for word in re.findall(r"\w+", text)]
    if len(words) < 6:
        return False
    counts = Counter(words)
    return counts.most_common(1)[0][1] >= max(4, len(words) // 2)


def looks_like_gibberish(text: str) -> bool:
    clean = re.sub(r"\s+", "", text.lower())
    return len(clean) > 15 and len(set(clean)) < 5


def classify_lead(payload: LeadCreate) -> dict[str, int | str]:
    score = 0
    bot_risk = 0

    if payload.company.strip():
        score += 15
    if has_business_email(payload.email):
        score += 15
    if is_valid_whatsapp(payload.phone):
        score += 10
    if payload.budget_range not in {"", "Sin definir"}:
        score += 15
    if len(payload.main_need.strip()) >= 20 and len(payload.challenge_description.strip()) >= 20:
        score += 20
    if payload.implementation_time in {"Inmediata", "1 a 3 meses"}:
        score += 15
    if payload.preferred_contact_method in {"call", "videocall"}:
        score += 10

    if payload.honeypot.strip():
        bot_risk += 100
    if is_repetitive_text(payload.challenge_description):
        bot_risk += 30
    if looks_like_gibberish(payload.challenge_description):
        bot_risk += 30
    if not is_valid_whatsapp(payload.phone):
        bot_risk += 10
    if "@" not in payload.email:
        bot_risk += 20

    if bot_risk >= 70:
        lead_classification = "Bot sospechoso"
    elif score >= 75 and payload.company.strip():
        lead_classification = "Caliente"
    elif score >= 50 and payload.company.strip():
        lead_classification = "Medio"
    elif score < 25 and not payload.company.strip() and not has_business_email(payload.email):
        lead_classification = "Curioso"
    else:
        lead_classification = "Bajo"

    if payload.preferred_responsible != "Pendiente":
        assigned_to = payload.preferred_responsible
    elif payload.solution_interest in {"SprintPilot", "ComerCia"} or payload.preferred_contact_method in {"videocall", "call"}:
        assigned_to = "Isa"
    elif payload.solution_interest in {"Nervia", "JornadaLaboral360", "Desarrollo a la medida"}:
        assigned_to = "Arturo"
    else:
        assigned_to = "Pendiente"

    status = "review_needed" if bot_risk >= 40 else "new"

    return {
        "lead_score": min(score, 100),
        "bot_risk": bot_risk,
        "lead_classification": lead_classification,
        "assigned_to": assigned_to,
        "status": status,
    }
