# Despliegue y Operacion RENPIA

## 1. GitHub y control de versiones

### Reglas

- Repositorio oficial en GitHub.
- `main` como rama estable.
- `develop` como rama de integracion.
- Ramas `feature/*` por modulo.
- Todo cambio debe quedar versionado.
- No subir secretos.
- Validar build y pruebas antes de push a `main`.

### Flujo recomendado

1. Crear rama desde `develop`.
2. Implementar modulo.
3. Validar localmente.
4. Commit atomico.
5. Pull request a `develop`.
6. Merge a `main` solo para release.

## 2. Topologia de produccion

### Dominios

- `https://renpia.com`: landing publica
- `https://www.renpia.com`: redireccion a dominio canonico
- `https://admin.renpia.com`: panel interno
- `https://api.renpia.com`: backend/API

### Componentes en VPS Ubuntu

- Nginx como reverse proxy
- FastAPI para API
- Worker para tareas programadas
- PostgreSQL
- Certbot para SSL
- Logs en journald y/o archivos rotados

## 3. Estrategia de despliegue

### Opcion A: manual inicial

1. Desarrollar localmente.
2. `git push` a GitHub.
3. Entrar por SSH al VPS.
4. `git pull`.
5. Instalar dependencias.
6. Ejecutar migraciones.
7. Compilar frontend.
8. Reiniciar servicios.

### Opcion B: automatica posterior

- GitHub Actions con `workflow_dispatch` primero.
- Despliegue por SSH.
- Pull, migraciones, build y restart.
- Activar solo cuando VPS, llaves SSH, secretos y dominios ya esten listos.

## 4. Nginx

### Responsabilidades

- Redirigir HTTP a HTTPS.
- Servir frontend publico.
- Servir admin si se publica como build independiente.
- Proxy a `api.renpia.com`.
- Comprimir respuestas con gzip.
- Limitar tamano basico de request.
- Bloquear rutas sensibles.

### Rutas sensibles a bloquear

- `.env`
- `.git`
- backups
- archivos internos de deploy

## 5. SSL

- Usar Let's Encrypt.
- Renovacion automatica con `certbot renew`.
- Forzar TLS en todos los dominios publicos.

## 6. Servicio de aplicaciones

### Recomendacion operativa

- API FastAPI bajo `systemd`.
- Worker de jobs bajo `systemd`.
- Frontend como build estatico servido por Nginx.
- PostgreSQL administrado por el sistema o contenedor dedicado.

### Reinicio automatico

- `Restart=always` en servicios systemd.
- Health check simple para API.

## 7. Correo y SMTP

### Proveedores compatibles

- Zoho Mail
- Google Workspace
- Brevo
- Mailgun
- SendGrid
- Amazon SES

### Reglas

- Credenciales solo por variables de entorno.
- Validar SPF, DKIM y DMARC en DNS.
- Correo interno como respaldo si Telegram falla.

## 8. Backups

### Minimos

- Backup diario de PostgreSQL.
- Backup de archivos de configuracion.
- Rotacion de backups.
- Restauracion documentada.

### Politica sugerida

- 7 diarios
- 4 semanales
- 6 mensuales

## 9. Monitoreo y logs

- `journalctl` para servicios systemd.
- Rotacion de logs.
- Carpeta central de logs si se requiere.
- Alerta manual o futura integracion con uptime monitoring.

## 10. Rollback

### Concepto

1. Identificar ultimo commit estable o tag release.
2. Revertir codigo en VPS.
3. Restaurar build frontend estable.
4. Reiniciar servicios.
5. Restaurar backup DB solo si la migracion fue destructiva.

## 11. Checklist de salida a produccion

- Repositorio GitHub creado.
- `.gitignore` configurado.
- `.env.example` creado.
- `.env` real fuera de Git.
- VPS actualizado.
- Dominio apuntando.
- Nginx configurado.
- SSL activo.
- PostgreSQL activo.
- API corriendo.
- Frontend servido.
- Panel admin protegido.
- Telegram probado.
- SMTP probado.
- Newsletter probado.
- Formulario probado.
- Agenda probada.
- Correos internos probados.
- Logs revisados.
- Backup configurado.
