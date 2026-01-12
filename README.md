# ZOODEX

Esta es una **API/backend** para una plataforma informativa sobre animales llamada **ZOODEX**, diseñada para ofrecer funcionalidades completas de **consulta, filtrado, rankings y administración de un extenso catálogo de animales**, siendo **robusta, segura y escalable**.

⚠️ **Dependencia:** Esta aplicación está construida para ser consumida por el frontend de **ZOODEX**.

---

### Funcionalidades de la API

- **Autenticación completa**:
  - Login de administrador mediante **JWT** y **COOKEIS**
- **Gestión de animales**:
  - Visualización de animales con toda su información detallada.
  - Edición completa de animales (solo admin):
    - Categoría (mamíferos, reptiles, anfibios, aves, marinos).
    - Subcategoría (felinos, caninos, bovinos, ovinos, caprinos, osos, etc.).
    - Tipo (terrestre, volador, acuático, semiacuático, arbóreo, doméstico).
    - Dieta (carnívoro, herbívoro, omnívoro).
    - Propiedades específicas según la categoría.
- **Catálogo avanzado de animales**:
  - Listado por categorías.
  - Listado por subcategorías.
  - Listado por tipo.
  - Listado por dieta.
  - Paginación para mostrar todos o casi todos los animales.
- **Animales destacados**:
  - Obtención de animales aleatorios para mostrar en la página de inicio.
- **Rankings de animales**:
  - Rankings por distintas métricas:
    - Más inteligentes.
    - Más altos.
    - Más pesados.
    - Más longevos.
    - Más rápidos.
    - Más peligrosos.
  - Visualización de rankings completos.
  - Inclusión del valor asociado y posición en el ranking.
- **Buscador**:
  - Búsqueda de animales por nombre.
  - Búsqueda de animales por ID.
- **Sistema de administración**:
  - Acceso exclusivo para administradores.
  - Edición total de los datos de los animales.
- **Protección de rutas** mediante **JWT**.
- **Middleware de seguridad**:
  - Validación de tokens JWT.
  - Restricción de acceso a endpoints administrativos.
- **Validación de datos**:
  - Uso de **express-validator** para sanitizar y validar datos:
    - `.escape()` para evitar inyecciones HTML.
    - Expresiones regulares para validaciones avanzadas.
    - Validación de tipos estrictos para números decimales e enteros.
- **CORS habilitado**, preparado para trabajar con frontend externo.
- **Envío de emails automáticos**:
  - Notificaciones del sistema.
  - Usando el servicio de **Brevo** (`@getbrevo/brevo`).

---

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto y añade tus propios datos:

```env
SECRET_KEY=
JWT_SECRET_KEY=

MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB=
MYSQL_PORT=

CORREO=
BREVO_API_KEY=

FRONTEND_URL=

COOKIE_HTTPONLY=
COOKIE_SECURE=
COOKIE_SAMESITE=

PORT=
```

### Requisitos

Para ejecutar este proyecto necesitas:

- **Node.js >= 18.x**
- **MySQL** (local o en la nube, en este caso Clever Cloud)
- Paquetes de Node.js incluidos en `package.json`:
  - `express`
  - `cors`
  - `dotenv`
  - `mysql2`
  - `jsonwebtoken`
  - `bcryptjs`
  - `cookie-parser`
  - `express-validator`
  - `nodemon`
  - `cross-env`
  - `@getbrevo/brevo`

---


## Instalación

1. **Clona el repositorio**  
   Ejecuta el siguiente comando en tu terminal:
   ```bash
   git clone https://github.com/DavidKal29/ZOODEX-BACKEND.git
   cd ZOODEX-BACKEND

2. **Instala las dependencias**  
   ```bash
    npm install

3. **Modo Desarrollo**
   ```bash
    npm run dev

4. **Modo Producción**
   ```bash
    npm start
 

