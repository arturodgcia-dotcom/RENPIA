# RENPIA Landing

Arquitectura base para convertir la landing aprobada de RENPIA en una plataforma real de captacion, agenda, seguimiento comercial, newsletter, noticias IA y panel interno, sin modificar su diseno visual.

## Restriccion principal

No se debe cambiar el diseno visual aprobado de la landing.
Esta base solo define arquitectura, modulos, datos, despliegue, seguridad, operaciones y entregables tecnicos.

## Estructura del repositorio

```text
renpia-landing/
├── .github/workflows/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── workers/
│   ├── migrations/
│   └── .env.example
├── deploy/
│   ├── nginx/
│   ├── scripts/
│   └── systemd/
├── docs/
│   ├── architecture.md
│   ├── changelog.md
│   ├── deployment.md
│   └── env-vars.md
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── sections/
│   │   └── services/
│   └── .env.example
├── .gitignore
└── docker-compose.yml
```

## Documentos clave

- `docs/architecture.md`: arquitectura funcional, tecnica, modulos, base de datos, endpoints y flujos.
- `docs/deployment.md`: GitHub, VPS, Nginx, SSL, CI/CD, backups y operacion.
- `docs/env-vars.md`: variables de entorno por dominio funcional.
- `deploy/nginx/renpia.conf.example`: referencia para Nginx.
- `deploy/systemd/*.example`: servicios de ejemplo para API y worker.

## Flujo Git recomendado

- Rama principal: `main`
- Rama de integracion: `develop`
- Ramas por funcionalidad:
  - `feature/landing-renpia`
  - `feature/leads`
  - `feature/telegram-bot`
  - `feature/appointments`
  - `feature/newsletter`
  - `feature/admin-panel`
  - `feature/news-ai`
  - `feature/email-subscriptions`
  - `feature/deployment-vps`

## Comandos base

```bash
git init
git add .
git commit -m "Initial RENPIA landing architecture"
git branch -M main
git remote add origin https://github.com/arturodgcia-dotcom/RENPIA.git
git push -u origin main
```

## Variables y secretos

- Nunca subir secretos a Git.
- Usar `.env.example` como plantilla.
- Mantener `.env` real fuera de versionado.
- Configurar credenciales de produccion solo en VPS o GitHub Secrets.

## Siguiente paso recomendado

1. Implementar backend FastAPI modular.
2. Implementar frontend React/Vite respetando la UI aprobada.
3. Conectar formulario inteligente, newsletter y agenda.
4. Habilitar despliegue manual al VPS.
5. Activar CI/CD cuando SSH, dominio y secretos esten listos.

## Ejecucion local

### Backend

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

### URLs locales

- Landing: `http://localhost:5173/`
- Panel interno: `http://localhost:5173/admin`
- API: `http://localhost:8000`
