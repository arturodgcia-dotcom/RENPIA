# Arquitectura RENPIA

## 1. Objetivo

Convertir la landing aprobada de RENPIA en una plataforma funcional de captacion, agenda, seguimiento comercial, demos, newsletter, noticias IA y operacion interna, sin modificar su diseno visual.

## 2. Principios de arquitectura

- Mantener intacta la UI aprobada.
- Separar frontend publico, panel interno y backend.
- Centralizar reglas de negocio en backend.
- Usar PostgreSQL como fuente de verdad.
- Registrar toda interaccion relevante para seguimiento comercial.
- Notificar por Telegram y correo interno.
- Preparar integraciones futuras sin acoplar la primera version a servicios externos complejos.

## 3. Arquitectura general

### Capas

1. Landing publica
   - Presenta RENPIA, soluciones, demos, noticias, FAQ, newsletter y formulario inteligente.
   - Consume API para leads, newsletter, noticias y agenda.

2. Panel interno RENPIA
   - Dashboard comercial y operativo.
   - Gestion de prospectos, agenda, demos, newsletter, noticias y configuracion.

3. Backend/API
   - Valida entradas.
   - Ejecuta clasificacion de prospectos.
   - Persiste informacion.
   - Dispara notificaciones Telegram y correo.
   - Expone endpoints publicos y administrativos.

4. Procesos programados
   - Publicacion diaria de noticia IA.
   - Archivado automatico de noticias.
   - Depuracion a 7 meses.
   - Reintentos de notificaciones fallidas.

5. Infraestructura
   - VPS Ubuntu.
   - Nginx.
   - FastAPI.
   - React/Vite.
   - PostgreSQL.
   - SSL con Let's Encrypt.

## 4. Arquitectura tecnica recomendada

### Frontend

- Framework: React + Vite.
- Ruteo: React Router.
- Formularios: React Hook Form + Zod.
- Estado: estado local y servicios API por dominio.
- SEO/AEO: `react-helmet-async`, JSON-LD y prerender de paginas publicas criticas.

### Backend

- Framework: FastAPI.
- ORM: SQLAlchemy 2.0.
- Migraciones: Alembic.
- Validacion: Pydantic.
- Autenticacion admin: JWT con refresh seguro o sesion server-side.
- Jobs: APScheduler en fase inicial; cola dedicada en fases futuras si crece el volumen.

### Datos

- Base de datos: PostgreSQL.
- Logs operativos: archivos rotados o journald.
- Auditoria: tablas de actividad y notas internas.

### Integraciones

- Telegram Bot API para alertas.
- SMTP para newsletter, confirmaciones y respaldo de notificaciones.
- Google Calendar preparado pero deshabilitado en v1.
- WhatsApp Business preparado pero deshabilitado en v1.

## 5. Diagrama logico en texto

```text
Usuario landing
  -> Frontend publico RENPIA
  -> API publica FastAPI
  -> validacion + anti-bot + clasificacion
  -> PostgreSQL
  -> eventos internos
     -> Telegram notifier
     -> Email notifier
     -> Agenda service
     -> News scheduler

Equipo RENPIA
  -> Admin frontend (admin.renpia.com)
  -> API admin FastAPI
  -> PostgreSQL
  -> panel de prospectos / agenda / newsletter / noticias / configuracion
```

## 6. Modulos funcionales

### 6.1 Landing publica

- Renderiza las 12 secciones aprobadas sin alterar su estructura.
- Conecta CTAs a acciones internas:
  - solicitar diagnostico
  - solicitar demo
  - suscribirse al newsletter
  - enviar formulario inteligente
- Carga noticias IA activas.
- Inserta schemas SEO/AEO sin cambiar el layout.

### 6.2 Modulo de prospectos

- Captura leads desde formulario y CTAs.
- Valida nombre, empresa, correo, telefono, necesidad y canal preferido.
- Calcula `lead_score`, `lead_classification` y `bot_risk`.
- Sugiere responsable:
  - Arturo: desarrollos a la medida, Nervia, JornadaLaboral360, tickets enterprise o urgencia alta.
  - Isa: SprintPilot, ComerCia, solicitudes de demo, seguimiento comercial estandar.
  - Pendiente: informacion ambigua o incompleta.
- Genera historial automatico.
- Dispara notificaciones.

### 6.3 Modulo de agenda

- Registra solicitudes de llamada, videollamada y demo.
- Asigna responsable y franja sugerida.
- Crea cita en estado `requested` o `pending_confirmation`.
- Permite capturar liga de videollamada manualmente.
- Prepara sincronizacion futura con Google Calendar.

### 6.4 Modulo de demos

- Diferencia entre:
  - Demo SprintPilot
  - Demo ComerCia
- Relaciona la demo con el lead y con una cita.
- Mide estado: `requested`, `scheduled`, `completed`, `follow_up_pending`, `closed`.

### 6.5 Modulo de newsletter

- Registra correos.
- Aplica doble opt-in.
- Guarda origen de suscripcion.
- Prepara futuras campanas y bajas.

### 6.6 Modulo de noticias IA

- Publica una noticia diaria.
- Mantiene maximo 30 activas.
- Archiva el excedente.
- Marca `expires_at` a 7 meses.
- Inserta CTA para contactar a RENPIA dentro del contenido.

### 6.7 Modulo Telegram

- Envia alertas operativas y comerciales.
- Registra exito o error.
- Reintenta y usa correo interno como respaldo.

### 6.8 Modulo de seguridad

- Honeypot.
- Rate limit.
- Revision de texto repetitivo.
- Normalizacion de entradas.
- Registro de IP, user-agent y timestamp si la politica legal lo permite.

## 7. Modelos de datos

### 7.1 Lead

Campos base:

- `id`
- `full_name`
- `company`
- `position`
- `email`
- `phone`
- `company_type`
- `solution_interest`
- `main_need`
- `budget_range`
- `implementation_time`
- `challenge_description`
- `preferred_contact_method`
- `preferred_responsible`
- `assigned_to`
- `lead_score`
- `lead_classification`
- `bot_risk`
- `status`
- `source`
- `created_at`
- `updated_at`

Campos recomendados adicionales:

- `business_email` boolean
- `is_whatsapp_valid` boolean
- `ip_address`
- `user_agent`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `last_contact_at`

### 7.2 Appointment

- `id`
- `lead_id`
- `title`
- `appointment_type`
- `responsible`
- `start_datetime`
- `end_datetime`
- `status`
- `is_video_call`
- `video_link`
- `video_link_status`
- `notes`
- `created_at`
- `updated_at`

Estados sugeridos:

- `requested`
- `pending_confirmation`
- `confirmed`
- `completed`
- `cancelled`
- `rescheduled`
- `no_show`

### 7.3 LeadActivity

- `id`
- `lead_id`
- `activity_type`
- `description`
- `created_by`
- `created_at`

Tipos sugeridos:

- `lead_created`
- `classified`
- `assigned`
- `telegram_sent`
- `email_sent`
- `appointment_requested`
- `appointment_confirmed`
- `demo_requested`
- `note_added`
- `status_changed`

### 7.4 InternalNote

- `id`
- `lead_id`
- `author`
- `note`
- `created_at`

### 7.5 NewsletterSubscriber

- `id`
- `email`
- `name`
- `company`
- `source`
- `status`
- `confirmation_token`
- `confirmed_at`
- `unsubscribed_at`
- `created_at`
- `updated_at`

Estados:

- `pending_confirmation`
- `active`
- `unsubscribed`
- `bounced`
- `blocked`

### 7.6 AINews

- `id`
- `title`
- `slug`
- `summary`
- `content`
- `category`
- `status`
- `published_at`
- `archived_at`
- `expires_at`
- `created_at`

Estados:

- `draft`
- `active`
- `archived`
- `expired`

### 7.7 TelegramNotification

- `id`
- `event_type`
- `lead_id`
- `appointment_id`
- `message`
- `status`
- `sent_at`

Estados:

- `pending`
- `sent`
- `failed`
- `retrying`

### 7.8 User

- `id`
- `name`
- `email`
- `role`
- `status`
- `created_at`

Roles sugeridos:

- `admin`
- `sales`
- `operations`
- `marketing`

### 7.9 Relaciones

- Un `Lead` puede tener muchas `LeadActivity`.
- Un `Lead` puede tener muchas `InternalNote`.
- Un `Lead` puede tener muchas `Appointment`.
- Un `Lead` puede detonar muchas `TelegramNotification`.
- Un `Appointment` puede asociarse a una `TelegramNotification`.

### 7.10 Indices recomendados

- `lead(email)`
- `lead(status, lead_classification)`
- `lead(solution_interest, assigned_to)`
- `appointment(start_datetime, responsible)`
- `newsletter_subscriber(email)`
- `ai_news(status, published_at)`
- `telegram_notification(status, sent_at)`

## 8. Reglas de negocio y clasificacion

### 8.1 Scoring de prospectos

Base sugerida sobre 100:

- Tiene empresa: +15
- Correo empresarial: +15
- WhatsApp valido: +10
- Presupuesto definido: +15
- Necesidad clara: +20
- Tiempo de implementacion <= 3 meses: +15
- Interes en demo o llamada: +10

### 8.2 Clasificacion

- Caliente:
  - score >= 75
  - empresa declarada
  - necesidad clara
  - presupuesto definido
  - implementacion pronta

- Medio:
  - score entre 50 y 74
  - empresa declarada
  - necesidad clara
  - presupuesto bajo o mediano

- Bajo:
  - score entre 25 y 49
  - informacion incompleta
  - sin urgencia o sin presupuesto

- Curioso:
  - score < 25
  - sin empresa
  - correo gratuito
  - necesidad poco concreta

### 8.3 Riesgo bot

Reglas basicas de puntaje:

- Honeypot lleno: +100
- Mensaje repetitivo o sin sentido: +30
- Multiples envios desde mismo origen en ventana corta: +30
- Dominio de correo raro o anomalo: +20
- Telefono incoherente: +20
- Tiempo de llenado demasiado rapido: +20

Decision:

- `0-39`: bajo
- `40-69`: revisar
- `70+`: bloquear o cuarentena

## 9. Endpoints backend

### 9.1 Publicos

- `POST /api/leads`
- `POST /api/appointments`
- `POST /api/newsletter/subscribe`
- `GET /api/news`
- `GET /api/news/{slug}`
- `GET /api/faq`
- `GET /api/availability?responsible=arturo|isa&type=call|demo`

### 9.2 Administrativos

- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/leads`
- `GET /api/leads/{id}`
- `PATCH /api/leads/{id}`
- `POST /api/leads/{id}/notes`
- `POST /api/leads/{id}/activities`
- `GET /api/appointments`
- `PATCH /api/appointments/{id}`
- `POST /api/news`
- `PATCH /api/news/{id}`
- `GET /api/newsletter/subscribers`
- `PATCH /api/newsletter/subscribers/{id}`
- `POST /api/telegram/test`
- `POST /api/telegram/notify`
- `GET /api/dashboard/summary`
- `GET /api/settings`
- `PATCH /api/settings`

### 9.3 Endpoints de newsletter

- `GET /api/newsletter/confirm/{token}`
- `POST /api/newsletter/unsubscribe`

## 10. Componentes frontend necesarios

## Publico

- `HeroCtaHandler`
- `ProductsGrid`
- `SolutionRedirectCard`
- `DemoRequestTrigger`
- `SmartLeadForm`
- `NewsletterForm`
- `NewsFeedSection`
- `FaqSchemaInjector`
- `SeoMetaManager`
- `FormSuccessState`
- `FormErrorState`

## Servicios frontend

- `apiClient`
- `leadService`
- `appointmentService`
- `newsletterService`
- `newsService`
- `trackingService`

## Admin

- `ProtectedRoute`
- `DashboardPage`
- `LeadsTable`
- `LeadDetailDrawer`
- `LeadFilters`
- `AppointmentCalendar`
- `DemoRequestsBoard`
- `NewsletterSubscribersTable`
- `NewsManager`
- `SettingsPage`

## 11. Panel interno RENPIA

### Dashboard

- Total de prospectos
- Prospectos calientes
- Prospectos medios
- Curiosos
- Bots sospechosos
- Llamadas de hoy
- Demos solicitadas
- Soluciones mas solicitadas
- Leads por responsable

### Prospectos

- Tabla de leads
- Filtros por estado
- Filtros por solucion
- Filtros por responsable
- Filtros por clasificacion
- Acciones rapidas:
  - reasignar
  - cambiar estado
  - crear cita
  - agregar nota
  - marcar seguimiento

### Detalle del prospecto

- Datos generales
- Necesidad principal
- Clasificacion y score
- Riesgo bot
- Historial
- Notas
- Citas
- Acciones

### Agenda

- Vista dia
- Vista semana
- Vista mes
- Filtro Arturo
- Filtro Isa
- Filtro demos
- Filtro videollamadas

### Demos solicitadas

- SprintPilot
- ComerCia
- Estado de solicitud
- Responsable
- Fecha
- Seguimiento

### Newsletter

- Suscriptores
- Estado
- Origen
- Exportacion CSV

### Noticias IA

- Lista de noticias
- Estado activa / archivada
- Fecha de publicacion
- Fecha de expiracion
- Categoria

### Configuracion

- Telegram Bot Token
- Telegram Chat ID
- Correos internos
- Responsables
- Horarios disponibles
- Reglas de clasificacion
- Duracion de llamada
- Duracion de demo

## 12. Flujo de prospectos

1. El usuario envia formulario desde la landing.
2. Frontend envia `POST /api/leads`.
3. Backend valida, normaliza y aplica anti-bot.
4. Se crea el lead.
5. Se calcula score y clasificacion.
6. Se sugiere responsable.
7. Se registra actividad `lead_created`.
8. Se notifica por Telegram.
9. Si es caliente o si Telegram falla, se envia correo interno.
10. El panel muestra el lead en dashboard y listado.

## 13. Flujo de agenda con Arturo e Isa

1. Prospecto solicita llamada, videollamada o demo.
2. Sistema identifica `preferred_responsible` o sugiere uno.
3. Se consulta disponibilidad interna configurable.
4. Se crea `Appointment` con estado `requested`.
5. Telegram alerta al equipo.
6. Correo interno llega a Arturo o Isa.
7. Correo al prospecto confirma recepcion.
8. Si es videollamada, `video_link_status = pending`.
9. Responsable agrega la liga manualmente desde panel.
10. La cita pasa a `confirmed`.
11. En fase futura, la sincronizacion con Google Calendar podra activarse sin romper el flujo actual.

## 14. Integracion con Telegram

### Variables

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `RENPIA_ADMIN_URL`

### Eventos

- Nuevo prospecto
- Prospecto caliente
- Demo solicitada
- Llamada agendada
- Videollamada solicitada
- Prospecto sospechoso
- Cita cancelada
- Cita reagendada

### Plantilla base de mensaje

```text
[RENPIA] Nuevo prospecto
Nombre: {{full_name}}
Empresa: {{company}}
Solucion: {{solution_interest}}
Clasificacion: {{lead_classification}}
Responsable sugerido: {{assigned_to}}
Panel: {{RENPIA_ADMIN_URL}}/leads/{{id}}
```

### Politica de fallos

- 3 reintentos con backoff corto.
- Si falla, guardar `failed`.
- Disparar correo interno de respaldo.

## 15. Correo y newsletter

### Flujo de newsletter

1. Usuario ingresa correo.
2. Backend valida formato y duplicados.
3. Se crea registro `pending_confirmation`.
4. Se genera `confirmation_token`.
5. Se envia correo de confirmacion.
6. Al confirmar, estado cambia a `active`.
7. Se envia correo de bienvenida.
8. Si se da de baja, estado cambia a `unsubscribed`.

### Correos minimos

- Confirmacion de suscripcion.
- Bienvenida.
- Baja de suscripcion.
- Confirmacion de solicitud de llamada.
- Confirmacion de demo solicitada.
- Correo interno por prospecto caliente.
- Correo interno de respaldo si Telegram falla.

### Entregabilidad

Documentar y configurar en dominio:

- SPF
- DKIM
- DMARC

## 16. Seguridad anti-bot y panel

- Validacion estricta de campos obligatorios.
- Validacion de correo.
- Validacion de telefono.
- Honeypot invisible.
- Rate limit por IP y por correo.
- Revision de texto repetitivo.
- Lista basica de dominios descartables.
- Captura de IP y user-agent si la politica legal lo permite.
- Login obligatorio para `admin.renpia.com`.
- JWT o sesion con expiracion corta.
- Hash de passwords con Argon2 o bcrypt.

## 17. SEO / AEO tecnico

### Meta base

- Meta title:
  `RENPIA | IA, automatizacion y soluciones digitales para empresas`

- Meta description:
  `RENPIA impulsa inteligencia artificial, automatizacion, software comercial y desarrollos a la medida para mejorar procesos, ventas y operacion empresarial.`

### Schemas

- `Organization`
- `FAQPage`
- `Service`
- `SoftwareApplication` para:
  - SprintPilot
  - ComerCia
  - Nervia
  - JornadaLaboral360

### Slugs recomendados

- `/`
- `/soluciones/sprintpilot`
- `/soluciones/comercia`
- `/soluciones/nervia`
- `/soluciones/jornadalaboral360`
- `/desarrollo-a-la-medida`
- `/demos/sprintpilot`
- `/demos/comercia`
- `/noticias-ia`
- `/newsletter/confirmacion`

### Estructura H

- `H1`: propuesta principal RENPIA en hero.
- `H2`: que hacemos en RENPIA.
- `H2`: nuestros desarrollos.
- `H3`: SprintPilot.
- `H3`: ComerCia.
- `H3`: Nervia.
- `H3`: JornadaLaboral360.
- `H2`: desarrollo a la medida.
- `H2`: demos disponibles.
- `H2`: noticias IA y blog RENPIA.
- `H2`: preguntas frecuentes.
- `H2`: contacto / CTA final.

### Alt texts sugeridos

- Logo RENPIA: `Logo de RENPIA`
- Imagen SprintPilot: `Vista de la solucion SprintPilot para seguimiento operativo`
- Imagen ComerCia: `Vista de ComerCia para procesos comerciales y ventas`
- Imagen Nervia: `Vista de Nervia para automatizacion inteligente`
- Imagen JornadaLaboral360: `Vista de JornadaLaboral360 para control y productividad`

### FAQ optimizada

- `Que tipo de empresas pueden implementar soluciones de RENPIA?`
- `RENPIA ofrece demos antes de contratar?`
- `Cuanto tiempo toma implementar una solucion?`
- `RENPIA desarrolla software a la medida?`
- `Como agenda una llamada con RENPIA?`
- `Que incluye el seguimiento despues de una demo?`

## 18. Roadmap por fases

### Fase 1

- Landing funcional conectada a API.
- Formulario inteligente.
- Guardado de prospectos.
- Clasificacion inicial.
- Telegram.
- Panel basico de prospectos.

### Fase 2

- Agenda interna.
- Calendarios Arturo / Isa.
- Demos solicitadas.
- Estados de seguimiento.
- Correos internos y al prospecto.

### Fase 3

- Noticias IA.
- Newsletter con doble opt-in.
- Archivado automatico.
- Depuracion cada 7 meses.
- Exportaciones y metricas basicas.

### Fase 4

- Google Calendar.
- Correos automaticos ampliados.
- WhatsApp Business.
- Cotizaciones automaticas.
- Reglas avanzadas de scoring y atribucion.

## 19. Criterios de aceptacion

- La landing mantiene exactamente la UI aprobada.
- Todo formulario guarda informacion valida en base de datos.
- Todo lead genera score, clasificacion y responsable sugerido.
- Toda solicitud de demo o llamada queda visible en panel.
- Telegram notifica eventos criticos.
- Correo interno respalda fallos de Telegram.
- Newsletter aplica doble opt-in.
- Noticias IA respetan politica de 30 activas y expiracion a 7 meses.
- Panel admin requiere autenticacion.
- SEO tecnico y schemas quedan presentes sin cambiar layout.

## 20. Checklist para desarrollo

- Definir stack final y repositorio GitHub.
- Crear estructura monorepo.
- Configurar FastAPI, PostgreSQL y Alembic.
- Configurar React/Vite y rutas publicas/admin.
- Implementar esquema de datos.
- Implementar endpoints publicos y admin.
- Conectar formulario inteligente.
- Implementar scoring y anti-bot.
- Implementar Telegram y correo SMTP.
- Implementar panel de prospectos.
- Implementar agenda y demos.
- Implementar newsletter con doble opt-in.
- Implementar noticias IA y jobs.
- Configurar Nginx, SSL y VPS.
- Validar build, pruebas y despliegue.

## 21. Prompt para programador o Codex

```text
Implementa la plataforma RENPIA respetando al 100% el diseno visual aprobado de la landing.
No cambies colores, textos base, orden de secciones ni estructura visual.

Objetivo:
Conectar la landing a un backend FastAPI y una base PostgreSQL para gestionar leads, agenda, demos, newsletter, noticias IA, panel interno y notificaciones Telegram/correo.

Requisitos:
- Crear frontend React/Vite con rutas publicas y admin.
- Crear backend modular con endpoints REST.
- Implementar modelos Lead, Appointment, LeadActivity, InternalNote, NewsletterSubscriber, AINews, TelegramNotification y User.
- Implementar clasificacion de leads, riesgo bot y asignacion sugerida entre Arturo, Isa o pendiente.
- Implementar agenda con llamada, videollamada y demo; no crear Google Meet automatico en v1.
- Implementar newsletter con doble opt-in.
- Implementar noticias IA con una publicacion diaria, maximo 30 activas, archivo y expiracion a 7 meses.
- Implementar notificaciones Telegram y correo interno.
- Proteger el panel admin con login.
- Preparar despliegue en VPS con Nginx, SSL, GitHub y CI/CD manual.

Entregables:
- Codigo funcional.
- Migraciones.
- .env.example.
- README.
- Configuracion de Nginx y systemd o Docker.
- Validacion de build.
```
