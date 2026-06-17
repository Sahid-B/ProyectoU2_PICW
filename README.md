[README.md](https://github.com/user-attachments/files/29065416/README.md)
# Proyecto Simpson 1/3 - Web App de Integración Numérica

Este proyecto es una aplicación web interactiva desarrollada con **React** y **Vite** diseñada para calcular la integral definida de diversas funciones matemáticas aplicando el **Método Numérico de Simpson 1/3**. Cuenta con una interfaz moderna y fluida con estética oscura, efectos de Glassmorphism, y conexión en tiempo real a una base de datos MySQL.

---

## 🚀 Características Principales

*   **Método Simpson 1/3:** Explicación e implementación teórica del método que aproxima el área bajo la curva mediante parábolas.
*   **Diseño Premium UI/UX:** Interfaz elegante en modo oscuro con variables CSS personalizadas, tipografía moderna, íconos vectoriales (`lucide-react`), efectos de difuminado por vidrio (`backdrop-filter`) y microanimaciones interactivas.
*   **Calculadora Universal:** Interfaz de texto libre donde puedes ingresar cualquier expresión matemática compatible con JavaScript (ej. `Math.sin(x)`, `x^2`, `1/(1+x^2)`) para integrarla dinámicamente sin depender de funciones preestablecidas.
*   **Conexión a MySQL "Serverless":** A través de un middleware de Vite en `vite.config.js`, el frontend se conecta directamente a la base de datos MySQL sin necesidad de un backend tradicional como Express.
*   **Sistema de Autenticación:** Inicio de sesión y registro de usuarios completamente funcionales, guardando datos directamente en la base de datos MySQL.
*   **API en Tiempo Real:** Sección de noticias conectada directamente a la API oficial de **arXiv** (mediante un proxy CORS seguro) para proveer los últimos papers y discusiones matemáticas académicas.

---

## 📂 Estructura del Proyecto

La arquitectura del proyecto está modularizada de la siguiente manera:

```text
proyecto-simpson/
├── database.sql           # Script SQL para estructurar la BD en MySQL
├── index.html             # Plantilla HTML base
├── vite.config.js         # Configuración de Vite + MIDDLEWARE DE MYSQL
├── package.json           # Dependencias y scripts de ejecución
└── src/
    ├── App.jsx            # Enrutador principal de React
    ├── App.css            # Estilos base específicos
    ├── index.css          # Sistema de diseño global y variables
    ├── components/        # Componentes UI (Navbar, Footer, InputField, TeamCard, TechBadge)
    ├── pages/             # Páginas principales:
    │   ├── inicio/        # Dashboard principal
    │   ├── equipo/        # Información de los desarrolladores
    │   ├── acerca/        # Acerca del proyecto y tecnologías usadas
    │   ├── noticias/      # Consume API de arXiv (Papers Matemáticos)
    │   ├── calculadora/   # Sistema de cálculo numérico universal Simpson 1/3
    │   ├── contactos/     # Formulario de mensajería modularizado (Guardado en DB)
    │   ├── estadisticas/  # Dashboard de la BD en tiempo real
    │   └── login/         # Sistema de autenticación de Usuarios
    └── services/          # Capa de servicios (Llamadas a /api/*)
```

---

## 🗄️ Esquema de Base de Datos (`simpson_db`)

El proyecto utiliza XAMPP/MySQL de forma local. Importa o corre el archivo `database.sql` para generar las tablas:

1.  **`calculos`**: Almacena las integraciones ejecutadas por los usuarios.
2.  **`contactos`**: Registra los mensajes enviados.
3.  **`visitas`**: Rastreo de tráfico web por página.
4.  **`funciones`**: Preajustes de funciones matemáticas usadas en la app.
5.  **`usuarios`**: Registra las credenciales y datos de las personas que crean cuentas en la web.

---

## 🛠️ Rutas Disponibles

| Ruta | Descripción |
|---|---|
| `/` | Panel principal: explicación del método, visitas y datos rápidos |
| `/equipo` | Información y avatares del equipo de desarrollo usando `TeamCard` |
| `/acerca` | Explicación del proyecto y listado de tecnologías con `TechBadge` |
| `/noticias` | Feed de investigaciones y papers desde la API de arXiv |
| `/calculadora` | Módulo matemático para resolver integrales por Simpson 1/3 |
| `/contactos` | Formulario conectado a la BD |
| `/estadisticas` | Estadísticas globales extraídas de MySQL |
| `/login` | Pasarela para iniciar sesión o registrarse |

---

## 📋 Instalación y Ejecución

### 1. Requisitos Previos
Debes tener instalado **Node.js** y **XAMPP** (con MySQL corriendo).

### 2. Configurar la Base de Datos
- Abre XAMPP y enciende **MySQL**.
- Importa el archivo `database.sql` en phpMyAdmin o ejecuta el script directamente en la terminal de MySQL para crear `simpson_db` y las tablas necesarias.

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto (al mismo nivel que `package.json`) y agrega la siguiente línea para que funcione la página de noticias:
```env
VITE_API_URL=http://export.arxiv.org/api/query?search_query=cat:math.NA&sortBy=submittedDate&sortOrder=descending&max_results=10
```

### 4. Instalar y Ejecutar
```bash
# Clonar y entrar a la carpeta
git clone https://github.com/Sahid-B/ProyectoU2_PICW.git
cd ProyectoU2_PICW/proyecto-simpson

# Instalar los paquetes (lucide-react, mysql2, etc.)
npm install

# Lanzar el servidor en desarrollo
npm run dev
```

El servidor local se abrirá en `http://localhost:5173/`. 
> **Nota:** El archivo `vite.config.js` contiene un proxy interno en `/api/*` que se comunica con tu XAMPP automáticamente usando la librería `mysql2`.

---

## 👥 Equipo de Desarrollo

**Sahid** — Arquitectura base, base de datos y calculadora
- Conexión del proyecto con base de datos real a través de Vite Config Middleware.
- Sistema de Auth (Login/Registro) interactivo y tabla `usuarios`.
- Lógica matemática del método Simpson 1/3 (`simpson.js`).
- Páginas `/inicio`, `Navbar`, y diseño Glassmorphism general.

**Jhonny** — Páginas informativas, refactorización y UI
- Integración segura de API externa de **arXiv** mediante proxies CORS en `/noticias`.
- Modularización de componentes UI (`TeamCard`, `InputField`, `TechBadge`).
- Creación de la página `/acerca` y reestructuración de `/contactos` y `/estadisticas`.
- Pruebas unitarias con **Vitest** en la lógica numérica.
