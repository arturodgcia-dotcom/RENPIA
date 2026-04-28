from __future__ import annotations

import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

APP_NAME = os.getenv("APP_NAME", "RENPIA Landing")
APP_ENV = os.getenv("APP_ENV", "development")
APP_URL = os.getenv("APP_URL", "http://localhost:5173")
ADMIN_URL = os.getenv("ADMIN_URL", "http://localhost:5173/admin")
API_URL = os.getenv("API_URL", "http://localhost:8000")

DATABASE_PATH = os.getenv("DATABASE_PATH", str(DATA_DIR / "renpia.sqlite3"))
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
RENPIA_ADMIN_URL = os.getenv("RENPIA_ADMIN_URL", ADMIN_URL)

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL", "")
SMTP_FROM_NAME = os.getenv("SMTP_FROM_NAME", "RENPIA")
INTERNAL_SALES_EMAILS = [
    email.strip()
    for email in os.getenv("INTERNAL_SALES_EMAILS", "arturo@renpia.com,isa@renpia.com").split(",")
    if email.strip()
]

RATE_LIMIT_PER_MINUTE = int(os.getenv("RATE_LIMIT_PER_MINUTE", "10"))
LEAD_HONEYPOT_FIELD = os.getenv("LEAD_HONEYPOT_FIELD", "website")
BOT_SCORE_REVIEW_THRESHOLD = int(os.getenv("BOT_SCORE_REVIEW_THRESHOLD", "40"))
BOT_SCORE_BLOCK_THRESHOLD = int(os.getenv("BOT_SCORE_BLOCK_THRESHOLD", "70"))
DEFAULT_CALL_DURATION_MINUTES = int(os.getenv("DEFAULT_CALL_DURATION_MINUTES", "30"))
DEFAULT_DEMO_DURATION_MINUTES = int(os.getenv("DEFAULT_DEMO_DURATION_MINUTES", "45"))
