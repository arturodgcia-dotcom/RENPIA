from __future__ import annotations

import json
import logging
import smtplib
import ssl
from email.message import EmailMessage
from urllib.error import URLError
from urllib.request import Request, urlopen

from app.core import config


logger = logging.getLogger(__name__)


def send_telegram_message(message: str) -> bool:
    if not config.TELEGRAM_BOT_TOKEN or not config.TELEGRAM_CHAT_ID:
        logger.info("Telegram no configurado. Mensaje omitido: %s", message)
        return False

    url = f"https://api.telegram.org/bot{config.TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = json.dumps({"chat_id": config.TELEGRAM_CHAT_ID, "text": message}).encode("utf-8")
    request = Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")

    try:
        with urlopen(request, timeout=10) as response:
            return 200 <= response.status < 300
    except URLError as error:
        logger.warning("No se pudo enviar Telegram: %s", error)
        return False


def send_email(subject: str, body: str, recipients: list[str]) -> bool:
    if not config.SMTP_HOST or not config.SMTP_USER or not config.SMTP_FROM_EMAIL or not recipients:
        logger.info("SMTP no configurado. Correo omitido: %s", subject)
        return False

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = f"{config.SMTP_FROM_NAME} <{config.SMTP_FROM_EMAIL}>"
    message["To"] = ", ".join(recipients)
    message.set_content(body)

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP(config.SMTP_HOST, config.SMTP_PORT, timeout=15) as server:
            server.starttls(context=context)
            server.login(config.SMTP_USER, config.SMTP_PASSWORD)
            server.send_message(message)
            return True
    except Exception as error:  # noqa: BLE001
        logger.warning("No se pudo enviar correo '%s': %s", subject, error)
        return False


def notify_new_lead(payload: dict[str, str]) -> None:
    message = (
        "[RENPIA] Nuevo prospecto\n"
        f"Nombre: {payload['full_name']}\n"
        f"Empresa: {payload['company'] or 'Sin empresa'}\n"
        f"Solucion: {payload['solution_interest']}\n"
        f"Clasificacion: {payload['lead_classification']}\n"
        f"Responsable sugerido: {payload['assigned_to']}\n"
        f"Panel: {config.RENPIA_ADMIN_URL}"
    )

    telegram_sent = send_telegram_message(message)
    if payload["lead_classification"] == "Caliente" or not telegram_sent:
        subject = f"Nuevo prospecto RENPIA: {payload['company'] or payload['full_name']} - {payload['solution_interest']}"
        body = (
            f"Nombre: {payload['full_name']}\n"
            f"Empresa: {payload['company'] or 'Sin empresa'}\n"
            f"Correo: {payload['email']}\n"
            f"WhatsApp: {payload['phone'] or 'No proporcionado'}\n"
            f"Solucion: {payload['solution_interest']}\n"
            f"Clasificacion: {payload['lead_classification']}\n"
            f"Responsable sugerido: {payload['assigned_to']}\n"
            f"Panel: {config.RENPIA_ADMIN_URL}"
        )
        send_email(subject, body, config.INTERNAL_SALES_EMAILS)


def notify_appointment(payload: dict[str, str]) -> None:
    message = (
        f"[RENPIA] Solicitud de {payload['appointment_type']}\n"
        f"Titulo: {payload['title']}\n"
        f"Responsable: {payload['responsible']}\n"
        f"Inicio: {payload['start_datetime']}\n"
        f"Panel: {config.RENPIA_ADMIN_URL}"
    )

    telegram_sent = send_telegram_message(message)
    subject = f"Agenda RENPIA: {payload['title']}"
    body = (
        f"Tipo: {payload['appointment_type']}\n"
        f"Responsable: {payload['responsible']}\n"
        f"Inicio: {payload['start_datetime']}\n"
        f"Fin: {payload['end_datetime']}\n"
        f"Estado: {payload['status']}\n"
        f"Panel: {config.RENPIA_ADMIN_URL}"
    )
    if not telegram_sent:
        body += "\n\nTelegram no pudo entregar esta alerta."
    send_email(subject, body, config.INTERNAL_SALES_EMAILS)


def send_newsletter_confirmation(email: str) -> None:
    subject = "Confirma tu suscripcion a RENPIA"
    body = (
        "Gracias por suscribirte a RENPIA.\n\n"
        "Confirma tu correo para recibir ideas, noticias y oportunidades relacionadas con "
        "inteligencia artificial, automatizacion y reingenieria de procesos.\n\n"
        f"Landing: {config.APP_URL}"
    )
    send_email(subject, body, [email])
