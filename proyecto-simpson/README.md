# Proyecto Simpson 1/3 - Web App de Integración Numérica

Este proyecto es una aplicación web interactiva desarrollada con **React** y **Vite** diseñada para calcular la integral definida de diversas funciones matemáticas aplicando el **Método Numérico de Simpson 1/3**. Cuenta con una interfaz moderna y fluida con estética oscura y efectos de Glassmorphism.

---

## 🚀 Características Principales

*   **Método Simpson 1/3:** Explicación e implementación teórica del método que aproxima el área bajo la curva mediante parábolas.
*   **Diseño Premium UI/UX:** Interfaz elegante en modo oscuro con variables CSS personalizadas, tipografía moderna (*Inter*), efectos de difuminado por vidrio (`backdrop-filter`) y microanimaciones interactivas.
*   **Datos en Memoria (Mock):** Capa de servicios simulada en el cliente que registra visitas, cálculos y contactos sin necesidad de un servidor activo.
*   **Diseño Responsivo:** Adaptado completamente para dispositivos móviles, tabletas y ordenadores de escritorio.

---

## 📂 Estructura del Proyecto

La arquitectura del proyecto está modularizada de la siguiente manera:

```text
proyecto-simpson/
├── database.sql           # Script SQL para la base de datos de MySQL (uso futuro)
├── index.html             # Plantilla HTML base
├── vite.config.js         # Configuración del empaquetador Vite
├── package.json           # Dependencias y scripts de ejecución
└── src/
    ├── main.jsx           # Punto de entrada de la aplicación React
    ├── App.jsx            # Enrutador principal y rastreador de visitas
    ├── App.css            # Estilos base específicos de la App
    ├── index.css          # Sistema de diseño global (variables CSS y clases reutilizables)
    ├── components/        # Componentes reutilizables de la aplicación
    │   ├── index.jsx      # Exportador centralizado de componentes
    │   ├── navbar/        # Barra de navegación interactiva y dinámica
    │   └── footer/        # Pie de página dinámico con año actualizado
    ├── pages/             # Páginas y secciones del sitio
    │   ├── index.jsx      # Exportador centralizado de páginas
    │   ├── inicio/        # Página principal con datos y estadísticas
    │   ├── equipo/        # Información del equipo de desarrollo
    │   ├── bibliografia/  # Referencias teóricas y páginas web consultadas
    │   ├── noticias/      # Noticias y artículos sobre métodos numéricos
    │   ├── calculadora/   # Módulo de cálculo Simpson 1/3
    │   ├── contactos/     # Formulario de contacto con guardarContacto()
    │   └── estadisticas/  # Panel de métricas: visitas, cálculos y funciones
    └── services/          # Capa de servicios y acceso a datos
        ├── db.js          # Datos mock en memoria (visitas, cálculos, contactos)
        ├── newsApi.js     # Servicio mock de noticias matemáticas (datos locales)
        ├── simpson.js     # Lógica pura del método numérico Simpson 1/3
        └── simpson.test.js# Pruebas unitarias con Vitest (3 casos)
```

---

## 🗄️ Esquema de Base de Datos (`simpson_db`)

El proyecto incluye un archivo `database.sql` para levantar las siguientes tablas en MySQL (para uso futuro con un backend):

1.  **`calculos`**: Almacena las integraciones ejecutadas por los usuarios.
    *   `id` (PK, Auto), `funcion` (VARCHAR), `a` (DOUBLE), `b` (DOUBLE), `n` (INT), `resultado` (DOUBLE), `fecha` (DATETIME).
2.  **`contactos`**: Registra los mensajes enviados por usuarios.
    *   `id` (PK, Auto), `nombre` (VARCHAR), `email` (VARCHAR), `mensaje` (TEXT), `fecha` (DATETIME).
3.  **`visitas`**: Rastreo de tráfico por sección de navegación.
    *   `id` (PK, Auto), `pagina` (VARCHAR), `fecha` (DATETIME).
4.  **`funciones`**: Lista de funciones predefinidas para el cálculo.
    *   `id` (PK, Auto), `expresion` (VARCHAR), `descripcion` (VARCHAR).

---

## 🛠️ Rutas Disponibles

El enrutador (`src/App.jsx`) utiliza `react-router-dom` para gestionar la navegación:

| Ruta | Estado | Descripción |
|---|---|---|
| `/` | ✅ Activa | Panel principal: explicación del método, visitas y últimos datos de la BD |
| `/equipo` | ✅ Activa | Información del equipo de desarrollo y roles |
| `/bibliografia` | ✅ Activa | Lista de libros y páginas web consultadas |
| `/noticias` | ✅ Activa | Artículos sobre métodos numéricos y desarrollo web |
| `/calculadora` | ✅ Activa | Módulo interactivo de cálculo de Simpson 1/3 |
| `/contactos` | ✅ Activa | Formulario para enviar mensajes con confirmación de éxito |
| `/estadisticas` | ✅ Activa | Métricas de sesión: visitas, cálculos, promedio y funciones disponibles |

---

## 📋 Requisitos e Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/Sahid-B/ProyectoU2_PICW.git
cd ProyectoU2_PICW/proyecto-simpson
```

### 2. Instalar dependencias de Node
```bash
npm install
```

### 3. Lanzar el Servidor en Desarrollo
```bash
npm run dev
```

El servidor local se abrirá en `http://localhost:5173/` por defecto.

> [!NOTE]
> **Modo Mock activo:** El archivo `src/services/db.js` simula la base de datos directamente en el navegador con datos en memoria. No se requiere MySQL para ejecutar el proyecto en desarrollo. Cuando se implemente el backend (Node.js/Express), las funciones de `db.js` se reemplazarán por llamadas `fetch()` a la API REST.

---

## 👥 Equipo de Desarrollo

**Sahid** — Arquitectura base, lógica de cálculo y formulario interactivo
- Configuración del proyecto (Vite + React + react-router-dom).
- Base de datos MySQL (`database.sql`) y capa mock en memoria (`db.js`).
- Página de Inicio, Navbar, Footer y sistema de registro de visitas.
- Lógica matemática pura del método Simpson 1/3 (`simpson.js`).
- Componente `SimpsonForm` y página `/calculadora`.

**Jhonny** — Páginas informativas, contacto, estadísticas y pruebas unitarias
- Páginas `/equipo`, `/bibliografia` y `/noticias`.
- Página `/contactos`: formulario con validación, llamada a `guardarContacto()` y mensaje de éxito.
- Página `/estadisticas`: total de visitas, últimos cálculos, promedio de resultados y funciones disponibles.
- Pruebas unitarias con **Vitest** para `simpson13` (caso correcto, n impar y n no numérico).
