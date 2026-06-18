// ============================================================
// CONEXIÓN DIRECTA A VITE SERVER API
// Todas estas funciones ahora hacen peticiones HTTP reales
// al middleware que inyectamos en vite.config.js
// ============================================================

// Exportamos la función para conectar a la base de datos, aunque en este frontend sólo simula la conexión
export const conectarBD = () => {
  // Imprimimos en consola que la conexión se maneja mediante el Middleware API de Vite
  console.log("Conectado vía Vite Middleware API.");
  // Retornamos null porque la conexión real la maneja el backend en vite.config.js
  return null; 
};

/**
 * Registra una nueva visita a una página específica.
 * Útil para mantener analíticas de uso dentro de la plataforma.
 * @param {string} pagina - Nombre de la ruta o vista visitada.
 * @returns {Object} Respuesta del servidor confirmando el registro.
 */
// Exportamos la función asíncrona para registrar una visita en una página dada
export const registrarVisita = async (pagina) => {
  // Iniciamos un bloque try-catch para manejar posibles errores en la petición
  try {
    // Hacemos una petición POST al endpoint '/api/visitas' con fetch
    const res = await fetch('/api/visitas', {
      // Indicamos que el método HTTP es POST
      method: 'POST',
      // Añadimos las cabeceras para indicar que el cuerpo es un JSON
      headers: { 'Content-Type': 'application/json' },
      // Convertimos el objeto con la página a un string JSON y lo pasamos en el cuerpo
      body: JSON.stringify({ pagina })
    });
    // Si la respuesta no es OK (código 2xx), lanzamos un error
    if (!res.ok) throw new Error('Error en API');
    // Parseamos y retornamos la respuesta JSON del servidor
    return await res.json();
  // Capturamos cualquier error en la petición
  } catch (error) {
    // Imprimimos el error en consola
    console.error("Error al registrar visita:", error);
    // Relanzamos el error para que quien llame a la función pueda manejarlo
    throw error;
  }
};

// Exportamos la función asíncrona para obtener el total de visitas registradas
export const obtenerVisitas = async () => {
  // Iniciamos un bloque try-catch
  try {
    // Hacemos una petición GET al endpoint '/api/visitas'
    const res = await fetch('/api/visitas');
    // Verificamos si hubo un error en la respuesta
    if (!res.ok) throw new Error('Error en API');
    // Parseamos la respuesta a JSON
    const data = await res.json();
    // Retornamos el total de visitas o 0 en caso de no estar definido
    return data.total || 0;
  // Capturamos cualquier error
  } catch (error) {
    // Imprimimos el error en consola
    console.error("Error al obtener visitas:", error);
    // Si hay error, simplemente devolvemos 0 para no romper la app
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
// Exportamos la función asíncrona para guardar el resultado de un cálculo
export const guardarCalculo = async (funcion, a, b, n, resultado) => {
  // Iniciamos el bloque try-catch
  try {
    // Hacemos una petición POST al endpoint '/api/calculos'
    const res = await fetch('/api/calculos', {
      // El método es POST
      method: 'POST',
      // Indicamos que enviaremos un JSON en las cabeceras
      headers: { 'Content-Type': 'application/json' },
      // Construimos el cuerpo JSON con los parámetros del cálculo
      body: JSON.stringify({ funcion, a, b, n, resultado })
    });
    // Validamos que la respuesta del servidor haya sido exitosa
    if (!res.ok) throw new Error('Error en API');
    // Retornamos el objeto JSON que devuelve la API (probablemente con el ID insertado)
    return await res.json();
  // Capturamos posibles errores de red o del servidor
  } catch (error) {
    // Registramos el error en consola
    console.error("Error al guardar cálculo:", error);
    // Relanzamos el error
    throw error;
  }
};

// Exportamos la función asíncrona para obtener los cálculos previos
export const obtenerCalculos = async (limite) => {
  // Iniciamos el bloque try-catch
  try {
    // Si se especificó un límite, lo agregamos como query parameter a la URL; si no, usamos la ruta base
    const url = limite ? `/api/calculos?limite=${limite}` : '/api/calculos';
    // Realizamos la petición GET a la URL determinada
    const res = await fetch(url);
    // Verificamos el estado de la respuesta
    if (!res.ok) throw new Error('Error en API');
    // Parseamos y retornamos la lista de cálculos en formato JSON
    return await res.json();
  // Manejamos los errores
  } catch (error) {
    // Imprimimos en consola que hubo un error
    console.error("Error al obtener cálculos:", error);
    // Retornamos un arreglo vacío en caso de error
    return [];
  }
};

/**
 * Almacena un mensaje enviado desde la vista de 'Contactos'.
 * @param {string} nombre - Nombre del remitente.
 * @param {string} email - Correo electrónico de contacto.
 * @param {string} mensaje - Cuerpo del mensaje o duda.
 */
// Exportamos la función asíncrona para guardar un mensaje de contacto
export const guardarContacto = async (nombre, email, mensaje) => {
  // Iniciamos el bloque try-catch
  try {
    // Realizamos una petición POST a '/api/contactos'
    const res = await fetch('/api/contactos', {
      // Método POST
      method: 'POST',
      // Cabeceras para enviar JSON
      headers: { 'Content-Type': 'application/json' },
      // Enviamos nombre, email y mensaje serializados como JSON
      body: JSON.stringify({ nombre, email, mensaje })
    });
    // Si la respuesta indica un fallo, lanzamos un error
    if (!res.ok) throw new Error('Error en API');
    // Retornamos los datos confirmando que se guardó
    return await res.json();
  // Capturamos el error
  } catch (error) {
    // Lo mostramos en consola
    console.error("Error al guardar contacto:", error);
    // Y lo relanzamos
    throw error;
  }
};

// Exportamos la función para recuperar los mensajes de contacto guardados
export const obtenerContactos = async () => {
  // Iniciamos el bloque try-catch
  try {
    // Hacemos una petición GET al endpoint de contactos
    const res = await fetch('/api/contactos');
    // Si hay error en la respuesta HTTP, lanzamos una excepción
    if (!res.ok) throw new Error('Error en API');
    // Parseamos el JSON con todos los contactos
    return await res.json();
  // Manejo de errores
  } catch (error) {
    // Mostrar error en consola
    console.error("Error al obtener contactos:", error);
    // Retornar arreglo vacío para no causar fallos en la UI
    return [];
  }
};

// Exportamos la función para obtener las funciones matemáticas registradas
export const obtenerFunciones = async () => {
  // Bloque try-catch para manejo de errores asíncronos
  try {
    // Hacemos petición GET a '/api/funciones'
    const res = await fetch('/api/funciones');
    // Verificamos respuesta
    if (!res.ok) throw new Error('Error en API');
    // Retornamos funciones parseadas a JSON
    return await res.json();
  // Atrapamos excepción si falla
  } catch (error) {
    // Mostramos error en consola
    console.error("Error al obtener funciones:", error);
    // Retornamos arreglo vacío como fallback
    return [];
  }
};

// Exportamos la función asíncrona para guardar una nueva función matemática
export const guardarFuncion = async (expresion, descripcion = 'Función personalizada') => {
  // Iniciamos bloque try-catch
  try {
    // Petición POST a la API para registrar una nueva función
    const res = await fetch('/api/funciones', {
      // Método POST
      method: 'POST',
      // Indicamos formato JSON en cabeceras
      headers: { 'Content-Type': 'application/json' },
      // Enviamos la expresión matemática y su descripción en el body
      body: JSON.stringify({ expresion, descripcion })
    });
    // Verificamos si la respuesta es satisfactoria
    if (!res.ok) throw new Error('Error en API');
    // Devolvemos el resultado del servidor
    return await res.json();
  // Manejo de error
  } catch (error) {
    // Imprimimos en consola
    console.error("Error al guardar función:", error);
    // Relanzamos excepción
    throw error;
  }
};

/**
 * Autentica a un usuario existente en el sistema.
 * @param {string} usuario - Nombre o alias del usuario.
 * @param {string} contrasena - Contraseña en texto plano (el backend debe hashearla).
 * @returns {Object} Datos del usuario si las credenciales son correctas.
 */
// Exportamos la función asíncrona para validar credenciales de login
export const iniciarSesion = async (usuario, contrasena) => {
  // Bloque try-catch
  try {
    // Petición POST a la ruta '/api/login'
    const res = await fetch('/api/login', {
      // Método HTTP POST
      method: 'POST',
      // Cabeceras JSON
      headers: { 'Content-Type': 'application/json' },
      // Enviamos el usuario y contraseña dentro del JSON del body
      body: JSON.stringify({ usuario, contrasena })
    });
    // Parseamos la respuesta para poder leer si hay errores del servidor (ej. "Credenciales inválidas")
    const data = await res.json();
    // Si el estado HTTP no es OK (por ejemplo 401), lanzamos el error devuelto o uno por defecto
    if (!res.ok) throw new Error(data.error || 'Error en login');
    // Retornamos los datos del usuario logueado
    return data;
  // Manejo de errores
  } catch (error) {
    // Imprimir en consola el error
    console.error("Error al iniciar sesión:", error);
    // Relanzar error para mostrar mensaje en la pantalla de login
    throw error;
  }
};

// Exportamos la función asíncrona para registrar un nuevo usuario
export const registrarUsuario = async (usuario, contrasena, nombre, correo, numero) => {
  // Iniciamos bloque try-catch
  try {
    // Hacemos una petición POST a la ruta '/api/register'
    const res = await fetch('/api/register', {
      // Usamos el método POST
      method: 'POST',
      // Configuramos el header para JSON
      headers: { 'Content-Type': 'application/json' },
      // Empaquetamos todos los datos del usuario en un JSON
      body: JSON.stringify({ usuario, contrasena, nombre, correo, numero })
    });
    // Parseamos el JSON devuelto
    const data = await res.json();
    // Validamos si la respuesta no es OK, para arrojar un error (ej. "El usuario ya existe")
    if (!res.ok) throw new Error(data.error || 'Error en registro');
    // Retornamos la data confirmando éxito en el registro
    return data;
  // Manejamos el fallo de red o del servidor
  } catch (error) {
    // Mostramos error en consola
    console.error("Error al registrar usuario:", error);
    // Relanzamos excepción para que la interfaz pueda mostrar alerta al usuario
    throw error;
  }
};
