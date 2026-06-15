import mysql from 'mysql2/promise';

// NOTA IMPORTANTE: mysql2 no funciona directamente en el navegador (React/Vite).
// Normalmente se requiere un backend (Node.js/Express) para hacer estas consultas.
// Se ha creado el archivo exactamente como se solicitó para la Ronda 1.

let pool = null;

export const conectarBD = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'simpson_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log("Conectado a la base de datos.");
  }
  return pool;
};

export const registrarVisita = async (pagina) => {
  try {
    const conexion = conectarBD();
    const [rows] = await conexion.query(
      'INSERT INTO visitas (pagina, fecha) VALUES (?, NOW())',
      [pagina]
    );
    return rows;
  } catch (error) {
    console.error("Error al registrar visita:", error);
    throw error;
  }
};

export const obtenerVisitas = async () => {
  try {
    const conexion = conectarBD();
    const [rows] = await conexion.query('SELECT COUNT(*) as total FROM visitas');
    return rows[0].total;
  } catch (error) {
    console.error("Error al obtener visitas:", error);
    return 0; // fallback en caso de error
  }
};

export const guardarCalculo = async (funcion, a, b, n, resultado) => {
  try {
    const conexion = conectarBD();
    const [rows] = await conexion.query(
      'INSERT INTO calculos (funcion, a, b, n, resultado, fecha) VALUES (?, ?, ?, ?, ?, NOW())',
      [funcion, a, b, n, resultado]
    );
    return rows;
  } catch (error) {
    console.error("Error al guardar cálculo:", error);
    throw error;
  }
};

export const obtenerCalculos = async (limite) => {
  try {
    const conexion = conectarBD();
    const [rows] = await conexion.query(`SELECT * FROM calculos ORDER BY id DESC LIMIT ?`, [limite]);
    return rows;
  } catch (error) {
    console.error("Error al obtener cálculos:", error);
    return [];
  }
};

export const guardarContacto = async (nombre, email, mensaje) => {
  try {
    const conexion = conectarBD();
    const [rows] = await conexion.query(
      'INSERT INTO contactos (nombre, email, mensaje, fecha) VALUES (?, ?, ?, NOW())',
      [nombre, email, mensaje]
    );
    return rows;
  } catch (error) {
    console.error("Error al guardar contacto:", error);
    throw error;
  }
};

export const obtenerContactos = async () => {
  try {
    const conexion = conectarBD();
    const [rows] = await conexion.query('SELECT * FROM contactos ORDER BY id DESC');
    return rows;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    return [];
  }
};

export const obtenerFunciones = async () => {
  try {
    const conexion = conectarBD();
    const [rows] = await conexion.query('SELECT * FROM funciones');
    return rows;
  } catch (error) {
    console.error("Error al obtener funciones:", error);
    return [];
  }
};
