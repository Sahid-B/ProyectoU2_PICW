// ============================================================
// MODO MOCK — datos en memoria para desarrollo en el navegador.
// mysql2/promise es un módulo de Node.js y NO puede ejecutarse
// en Vite/browser. Estas funciones simulan la BD localmente.
// Cuando se implemente el backend (Node.js/Express) se
// sustituirán por llamadas fetch() a la API REST.
// ============================================================

// ── Almacenes en memoria ──────────────────────────────────────
let _visitas = [
  { id: 1, pagina: 'Inicio', fecha: new Date().toISOString() },
];

let _calculos = [
  { id: 1, funcion: 'x^2',         a: 0, b: 2,      n: 4, resultado: 2.6667, fecha: new Date().toISOString() },
  { id: 2, funcion: 'Math.sin(x)', a: 0, b: 3.1416,  n: 6, resultado: 2.0001, fecha: new Date().toISOString() },
  { id: 3, funcion: 'x^3',         a: 1, b: 3,       n: 4, resultado: 20.0,   fecha: new Date().toISOString() },
];

let _contactos = [
  { id: 1, nombre: 'Juan',  email: 'juan@mail.com',  mensaje: 'Excelente herramienta numérica.',          fecha: new Date().toISOString() },
  { id: 2, nombre: 'María', email: 'maria@mail.com', mensaje: 'Me ayudó mucho con mis tareas de cálculo.', fecha: new Date().toISOString() },
];

const _funciones = [
  { id: 1, expresion: 'x^2',         descripcion: 'Función cuadrática' },
  { id: 2, expresion: 'x^3',         descripcion: 'Función cúbica'     },
  { id: 3, expresion: 'Math.sin(x)', descripcion: 'Seno de x'          },
  { id: 4, expresion: 'Math.cos(x)', descripcion: 'Coseno de x'        },
  { id: 5, expresion: 'Math.exp(x)', descripcion: 'Exponencial de x'   },
];

// ── Helpers internos ─────────────────────────────────────────
const _nextId = (arr) => (arr.length > 0 ? Math.max(...arr.map((r) => r.id)) + 1 : 1);
const _now    = ()    => new Date().toISOString();

// ── API pública (mismas firmas que la versión MySQL) ──────────

/**
 * Devuelve el "pool" simulado.
 * Se conserva para no romper código que llame a conectarBD().
 */
export const conectarBD = () => {
  console.log("[MOCK] conectarBD() — usando datos en memoria.");
  return null; // no se usa en modo mock
};

/** Registra una visita a la página indicada. */
export const registrarVisita = async (pagina) => {
  try {
    const row = { id: _nextId(_visitas), pagina, fecha: _now() };
    _visitas.push(row);
    return row;
  } catch (error) {
    console.error("Error al registrar visita:", error);
    throw error;
  }
};

/** Devuelve el total de visitas registradas. */
export const obtenerVisitas = async () => {
  try {
    return _visitas.length;
  } catch (error) {
    console.error("Error al obtener visitas:", error);
    return 0;
  }
};

/** Guarda un cálculo de Simpson en el almacén local. */
export const guardarCalculo = async (funcion, a, b, n, resultado) => {
  try {
    const row = { id: _nextId(_calculos), funcion, a, b, n, resultado, fecha: _now() };
    _calculos.push(row);
    return row;
  } catch (error) {
    console.error("Error al guardar cálculo:", error);
    throw error;
  }
};

/** Devuelve los últimos `limite` cálculos (más recientes primero). */
export const obtenerCalculos = async (limite) => {
  try {
    return [..._calculos].reverse().slice(0, limite);
  } catch (error) {
    console.error("Error al obtener cálculos:", error);
    return [];
  }
};

/** Guarda un mensaje de contacto. */
export const guardarContacto = async (nombre, email, mensaje) => {
  try {
    const row = { id: _nextId(_contactos), nombre, email, mensaje, fecha: _now() };
    _contactos.push(row);
    return row;
  } catch (error) {
    console.error("Error al guardar contacto:", error);
    throw error;
  }
};

/** Devuelve todos los mensajes de contacto (más recientes primero). */
export const obtenerContactos = async () => {
  try {
    return [..._contactos].reverse();
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    return [];
  }
};

/** Devuelve las funciones predefinidas disponibles para el cálculo. */
export const obtenerFunciones = async () => {
  try {
    return [..._funciones];
  } catch (error) {
    console.error("Error al obtener funciones:", error);
    return [];
  }
};
