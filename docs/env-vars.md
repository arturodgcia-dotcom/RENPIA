# Variables de Entorno RENPIA

## Aplicacion

- `APP_ENV`: entorno activo.
- `APP_NAME`: nombre de la aplicacion.
- `APP_URL`: dominio publico.
- `ADMIN_URL`: dominio del panel interno.
- `API_URL`: dominio del backend.

## Base de datos

- `DATABASE_URL`: conexion PostgreSQL.

## Seguridad

- `SECRET_KEY`: clave base de aplicacion.
- `JWT_SECRET`: firma de tokens.
- `ADMIN_DEFAULT_EMAIL`: usuario inicial admin.
- `ADMIN_DEFAULT_PASSWORD`: password inicial temporal.

## Telegram

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `RENPIA_ADMIN_URL`

## Correo SMTP

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM_EMAIL`
- `SMTP_FROM_NAME`

## Newsletter

- `NEWSLETTER_FROM_EMAIL`
- `NEWSLETTER_REPLY_TO`
- `INTERNAL_SALES_EMAILS`

## Google Calendar

- `GOOGLE_CALENDAR_ENABLED`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`

## WhatsApp Business

- `WHATSAPP_ENABLED`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`

## Reglas anti-bot y agenda

- `RATE_LIMIT_PER_MINUTE`
- `LEAD_HONEYPOT_FIELD`
- `BOT_SCORE_REVIEW_THRESHOLD`
- `BOT_SCORE_BLOCK_THRESHOLD`
- `DEFAULT_CALL_DURATION_MINUTES`
- `DEFAULT_DEMO_DURATION_MINUTES`
