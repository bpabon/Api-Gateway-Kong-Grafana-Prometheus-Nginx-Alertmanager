## 📡 API Gateway con Kong + Observabilidad con Grafana & Prometheus + Alertas vía Email + Nginx

Este proyecto implementa un API Gateway robusto con Kong, habilitando tanto rutas públicas como protegidas por JWT RS256 por NestJs, y complementado con un stack completo de observabilidad (Prometheus + Grafana + Alertmanager). Además, se incluye un reverso proxy con NGINX y se provee configuración para habilitar certificados SSL usando Certbot.

### 🚀 Objetivos Principales
- Gestionar peticiones a microservicios a través de Kong API Gateway
- Exponer rutas públicas y protegidas (JWT RS256)
- Tener observabilidad completa del sistema (métricas + alertas)
- Configurar NGINX como puerta de entrada bajo dominio personalizado
- Facilitar la emisión de certificados SSL (Certbot) de forma manual

### Autor
- [Branm Aldair Pabon Villamizar](https://github.com/bpabon)

### 🧱 Arquitectura de Servicios
A continuación se muestra un diagrama que ilustra cómo interactúan los diferentes componentes del sistema, desde la entrada del tráfico HTTPS hasta la capa de observabilidad y alertas:
![Arquitectura de software](./img/arquitectura.png)

```bash
graph TD
  A[Cliente] -->|HTTPS| NGINX
  NGINX -->|proxy_pass| Kong
  Kong --> NestJS
  Kong -->|/metrics| Prometheus
  Prometheus --> Alertmanager
  Prometheus --> Grafana
  Alertmanager -->|Email| Usuario
  Grafana --> Usuario Administrador
```
### 📦 Servicios Incluidos
| Servicio              | Puerto Host | Función Principal                             |
| --------------------- | ----------- | --------------------------------------------- |
| **Kong**              | 8000/8443   | API Gateway (proxy público y HTTPS)           |
|                       | 8001/8444   | API de administración de Kong                 |
| **NestJS**            | 3000        | Microservicio backend de ejemplo              |
| **Prometheus**        | 9090        | Recolección de métricas                       |
| **Grafana**           | 3001        | Visualización de métricas                     |
| **Alertmanager**      | 9093        | Envío de alertas vía correo electrónico       |
| **Blackbox Exporter** | 9115        | Chequeo de disponibilidad de endpoints (Ping) |
| **NGINX**             | 80/443      | Proxy reverso + futuro soporte HTTPS          |

### 🔐 Seguridad
- Rutas de Kong configuradas con y sin JWT RS256
- Puedes usar claves públicas/privadas para generar tokens seguros
- No se requiere JWT para ciertas rutas públicas
- Certificados SSL gestionados con Certbot (requiere paso manual)

### 📈 Observabilidad
🔍 Prometheus recolecta métricas de Kong y otros servicios

📊 Grafana incluye dashboards prediseñados y plugin de pie chart

📬 Alertmanager dispara alertas por correo si un servicio falla

🔎 Blackbox Exporter para verificar disponibilidad HTTP(s)

### 🛡️ SSL con Certbot (paso manual)
El proyecto incluye configuración preliminar para emitir certificados SSL con Certbot. Para usarlo:

- Descomenta el bloque certbot en docker-compose.yml 
- Asegúrate de tener puertos 80 y 443 libres
- Agregue dominios y direcciones de correo electrónico a init-letsencrypt.sh y en en nginx/nginx.conf "Dominio usado de prueba midominio.com"
- Ejecute el script de inicio GIT BASH antes de iniciar los contenedores:
```bash
  ./init-letsencrypt.sh
```
### 📁 Estructura del Proyecto
.
├── docker-compose.yml
├── kong/
│   ├── kong.yml                      # Configuración declarativa de rutas y plugins
│   └── kong.conf                     # Configuración base de Kong
├── nestjs-service/                   # Microservicio NestJS
├── prometheus/   
│   ├── prometheus.yml                # Scrape targets
│   └── alert.rules.yml               # Reglas de alerta
├── grafana/    
│   └── provisioning/                 # Dashboards y datasources prediseñados
│       └── dashboards                # Carpeta de dashboard para usar en grafana
│       |    ├── dashboards.yml       # Configuración del dashboard
│       |    └── kong-dashboard.json  # JSON para la observabilidad del dashboard
│       └── datasources               # Carpeta para funte de datos con prometheus
│            └── prometheus.yml       # Configuración de datasources para grafana con el type prometheus 
├── alertmanager/   
│   └── alertmanager.yml              # Configuración de envío de alertas por correo
│   └── Dockerfile                    # Archivo de docker requerido para el uso de variables de entorno
│   └── entrypoint.sh                 # Remplaza los valores de las variables de entorno
├── blackbox/   
│   └── blackbox.yml                  # Configuración de chequeos HTTP
├── nginx/    
│   ├── nginx.conf                    # Configuración del reverse proxy
│   └── logs/                         # Logs de NGINX
└── certbot/                          # (Ajustar manualmente) Certificados SSL

### 🛠️ Cómo generar un token JWT (RS256)
- Tener tu par de claves (privada y pública):
```bash
🔐 Clave privada
openssl genrsa -out private.key 2048
🔓 Clave pública
openssl rsa -in private.key -pubout -out public.key
```
- Payload requerida para generar token (datos en kong.yml):
```bash
{
  "iss": "my-issuer",
  "sub": "test-user",
} 
```
- Enviar el token en la cabecera Authorization:
```bash
GET http://localhost:8000/api/users/jwt
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6...
```
- Remplazar el archivo de llave publica ./public.key
### 🌐 Configurar dominio local con NGINX (midominio.com)
Para que puedas acceder a tu API Gateway a través de un dominio personalizado (como http://midominio.com) en lugar de localhost, es necesario agregar una entrada en el archivo hosts de tu máquina.

🧭 Pasos por sistema operativo:
🪟 Windows
- Abrir el Bloc de Notas como Administrador
- Editar el archivo:
```bash
  C:\Windows\System32\drivers\etc\hosts
```
- Agregar la siguiente línea al final del archivo:
```bash
  127.0.0.1   midominio.com
```

🐧 Linux / macOS
- Editar el archivo /etc/hosts con privilegios de superusuario:
```bash
  sudo nano /etc/hosts
```
- Agregar la línea al final del archivo:
```bash
  127.0.0.1   midominio.com
```
✅ Verificación
Una vez hecho el cambio, puedes probar accediendo a:
```bash
  http://midominio.com/public/hello
```
### 🧪 Comandos para iniciar o eliminar el entorno
▶️ Iniciar el proyecto
Levanta todos los servicios en segundo plano:
```bash
  docker-compose up -d
```
🛑 Detener y eliminar todos los contenedores, volúmenes y redes
```bash
  docker-compose down -v
```
### Configurar el archivo .env
- Copia el archivo de ejemplo para crear tu archivo .env local:
```bash
  cp .env.example .env
```
- Edita el archivo .env con tus valores reales, por ejemplo:
```bash
  SMTP_SMARTHOST=smtp.gmail.com:587
  SMTP_FROM=email@gmail.com
  SMTP_USER=email@gmail.com
  SMTP_PASS=tu_contraseña_app_o_token
  ALERT_EMAIL=notify@gmail.com

```
- Guarda los cambios. Este archivo será leído por Docker y Alertmanager para configurar el envío de alertas vía correo electrónico.
### 📢 Recomendaciones
- Cambia las credenciales por defecto de Grafana
- Asegúrate de que tu dominio esté correctamente apuntado a tu servidor
- Crear unas nuevas llaves publicas y privadas para brindar mas seguridad en el proyecto
### ✅ Próximos pasos sugeridos
- Automatizar renovación SSL con cron + Certbot
- Agregar nuevos microservicios detrás del gateway
- Configurar integración con Slack o Discord para alertas