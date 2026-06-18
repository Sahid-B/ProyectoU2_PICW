// ============================================================
// CONEXIÓN DIRECTA A VITE SERVER API
// Todas estas funciones ahora hacen peticiones HTTP reales
// al middleware que inyectamos en vite.config.js
// ============================================================

export const conectarBD = () => {
  console.log("Conectado vía Vite Middleware API.");
  return null; 
};

/**
 * Registra una nueva visita a una página específica.
 * Útil para mantener analíticas de uso dentro de la plataforma.
 * @param {string} pagina - Nombre de la ruta o vista visitada.
 * @returns {Object} Respuesta del servidor confirmando el registro.
 */
export const registrarVisita = async (pagina) => {
  try {
    const res = await fetch('/api/visitas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina })
    });
    if (!res.ok) throw new Error('Error en API');
    return await res.json();
  } catch (error) {
    console.error("Error al registrar visita:", error);
    throw error;
  }
};

export const obtenerVisitas = async () => {
  try {
    const res = await fetch('/api/visitas');
    if (!res.ok) throw new Error('Error en API');
    const data = await res.json();
    return data.total || 0;
  } catch (error) {
    console.error("Error al obtener visitas:", error);
    return 0;
  }
};

/**
 * Guarda un cálculo de Simpson 1/3 en el historial de la base de datos.
 * Esto permite revisar resultados anteriores sin recalcularlos.
 * @param {string} funcion - Expresión matemática evaluada.
 * @param {number} a - Límite inferior.
 * @param {number} b - Límite superior.
 * @param {number} n - Número de segmentos (debe ser par).
 * @param {number} resultado - Área aproximada calculada.
 */
export const guardarCalculo = async (funcion, a, b, n, resultado) => {
  try {
    const res = await fetch('/api/calculos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ funcion, a, b, n, resultado })
    });
    if (!res.ok) throw new Error('Error en API');
    return await res.json();
  } catch (error) {
    console.error("Error al guardar cálculo:", error);
    throw error;
  }
};

export const obtenerCalculos = async (limite) => {
  try {
    const url = limite ? `/api/calculos?limite=${limite}` : '/api/calculos';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error en API');
    return await res.json();
  } catch (error) {
    console.error("Error al obtener cálculos:", error);
    return [];
  }
};

/**
 * Almacena un mensaje enviado desde la vista de 'Contactos'.
 * @param {string} nombre - Nombre del remitente.
 * @param {string} email - Correo electrónico de contacto.
 * @param {string} mensaje - Cuerpo del mensaje o duda.
 */
export const guardarContacto = async (nombre, email, mensaje) => {
  try {
    const res = await fetch('/api/contactos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, mensaje })
    });
    if (!res.ok) throw new Error('Error en API');
    return await res.json();
  } catch (error) {
    console.error("Error al guardar contacto:", error);
    throw error;
  }
};

export const obtenerContactos = async () => {
  try {
    const res = await fetch('/api/contactos');
    if (!res.ok) throw new Error('Error en API');
    return await res.json();
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    return [];
  }
};

export const obtenerFunciones = async () => {
  try {
    const res = await fetch('/api/funciones');
    if (!res.ok) throw new Error('Error en API');
    return await res.json();
  } catch (error) {
    console.error("Error al obtener funciones:", error);
    return [];
  }
};

export const guardarFuncion = async (expresion, descripcion = 'Función personalizada') => {
  try {
    const res = await fetch('/api/funciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expresion, descripcion })
    });
    if (!res.ok) throw new Error('Error en API');
    return await res.json();
  } catch (error) {
    console.error("Error al guardar función:", error);
    throw error;
  }
};

/**
 * Autentica a un usuario existente en el sistema.
 * @param {string} usuario - Nombre o alias del usuario.
 * @param {string} contrasena - Contraseña en texto plano (el backend debe hashearla).
 * @returns {Object} Datos del usuario si las credenciales son correctas.
 */
export const iniciarSesion = async (usuario, contrasena) => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error en login');
    return data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const registrarUsuario = async (usuario, contrasena, nombre, correo, numero) => {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena, nombre, correo, numero })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error en registro');
    return data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};
