# REINPIA Landing

Landing corporativa y comercial de REINPIA construida con React + Vite + TypeScript, lista para mostrar consultoria, automatizacion, agentes de IA, plataformas propias, desarrollo a la medida, demos, newsletter, agenda y una base administrativa mock.

## Estado actual

- Branding visual corregido a `REINPIA`.
- Landing bilingue ES / EN.
- Hero, soluciones, demos y desarrollo a la medida con assets reales integrados.
- Blog / noticias IA con 8 articulos seed y rutas internas.
- Newsletter funcional en modo mock con persistencia local.
- Formulario inteligente de prospectos con scoring visual y persistencia local.
- Agenda funcional base con slots, responsable y persistencia local.
- Panel base en rutas admin para leads, citas y newsletter.
- SEO / AEO base con metadata dinamica y JSON-LD.
- Estructura lista para conectar Telegram, correo SMTP, backend y Google Calendar.

## Stack

- Frontend: React 19 + Vite + TypeScript
- Backend base: FastAPI
- Deploy target: VPS Linux + Nginx + SSL + PostgreSQL

## Estructura relevante

```text
frontend/
  public/renpia-assets/
  src/
    components/
    config/
    content/
    data/
    hooks/
    i18n/
    pages/
    sections/
    services/
backend/
deploy/
docs/
```

## Assets integrados

Los assets publicos se sirven desde:

```text
frontend/public/renpia-assets/
```

Archivos usados:

- `reinpia-logo.jpeg`
- `hero-consultoria.png`
- `sprintpilot-preview.png`
- `comercia-preview.png`
- `nervia-preview.png`
- `jornada360-preview.png`
- `desarrollo-medida.png`
- `demo-sprintpilot.png`
- `demo-comercia.png`

Si reemplazas un archivo manteniendo el mismo nombre, la UI lo tomara automaticamente.

## Variables de entorno

### Frontend

Usa `frontend/.env.example` como base:

```bash
cd frontend
cp .env.example .env
```

Variables principales:

- `VITE_APP_NAME`
- `VITE_APP_URL`
- `VITE_ADMIN_URL`
- `VITE_API_URL`
- `VITE_NEWSLETTER_SOURCE`
- `VITE_GOOGLE_CALENDAR_ENABLED`
- `VITE_TELEGRAM_BOT_TOKEN`
- `VITE_TELEGRAM_CHAT_ID`
- `VITE_SMTP_HOST`
- `VITE_SMTP_PORT`
- `VITE_SMTP_USER`
- `VITE_SMTP_PASS`
- `VITE_NEWSLETTER_FROM_EMAIL`

Nota: las credenciales reales de SMTP y Telegram no deben exponerse en navegador en produccion. Esta base las documenta para desarrollo y debe migrarse a backend o server functions al integrar servicios reales.

### Backend

Usa `backend/.env.example` como base:

```bash
cd backend
cp .env.example .env
```

Tambien existe un `.env.example` en la raiz con variables compartidas orientadas a despliegue.

## Correr localmente

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Build

```bash
cd frontend
npm run build
```

## Rutas disponibles

### Publicas

- `/`
- `/blog`
- `/blog/:slug`
- `/solutions/sprintpilot`
- `/solutions/comercia`
- `/solutions/nervia`
- `/solutions/jornadalaboral360`
- `/demo/sprintpilot`
- `/demo/comercia`

### Admin base

- `/admin`
- `/admin/leads`
- `/admin/appointments`
- `/admin/newsletter`

## Persistencia actual

La version actual usa `localStorage` para almacenar temporalmente:

- leads
- citas
- suscripciones newsletter

Eso permite probar la UX y el panel base sin depender todavia del backend real.

## Servicios mock preparados

Archivos base:

- `frontend/src/services/leadService.ts`
- `frontend/src/services/leadScoring.ts`
- `frontend/src/services/newsletterService.ts`
- `frontend/src/services/appointmentService.ts`
- `frontend/src/services/telegramService.ts`
- `frontend/src/services/calendarService.ts`
- `frontend/src/services/newsService.ts`

Estado actual:

- Leads: mock funcional con scoring y guardado local
- Newsletter: mock funcional con validacion y guardado local
- Agenda: mock funcional con slots y guardado local
- Telegram: preparado como adapter mock
- Calendar: preparado como adapter mock
- SMTP: documentado para integracion posterior

## SEO / AEO

La app actualiza metadata dinamica segun ruta desde:

- `frontend/src/hooks/usePageMetadata.ts`

Incluye:

- `title`
- `meta description`
- `canonical`
- Open Graph
- Twitter Card
- JSON-LD base para `Organization`, `WebSite` y `Service`

## Despliegue a VPS

Flujo recomendado:

```bash
git pull origin main
cd frontend
npm install
npm run build
```

Luego sirve `frontend/dist/` detras de Nginx con fallback SPA a `index.html`.

Puntos a revisar en VPS:

- Dominio apuntando al VPS
- Nginx con fallback SPA
- SSL activo con Let's Encrypt
- Variables de entorno definidas
- Backend FastAPI corriendo
- Proxy de API configurado

## Notas

- El nombre tecnico de algunas carpetas historicas como `renpia-assets` se mantuvo por compatibilidad, pero la marca visible en UI es `REINPIA`.
- CI/CD no fue alterado.
- Los servicios sensibles siguen en modo mock o preparacion; no se exponen credenciales reales en el repositorio.
