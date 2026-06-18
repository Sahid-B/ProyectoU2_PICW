// Importamos la función defineConfig de vite para definir la configuración del proyecto
import { defineConfig } from 'vite'
// Importamos el plugin de react para vite, que permite integración con React (Fast Refresh, etc.)
import react from '@vitejs/plugin-react'
// Importamos la librería mysql2/promise para interactuar con la base de datos MySQL de forma asíncrona
import mysql from 'mysql2/promise'

// Definimos una función de ayuda para parsear el cuerpo JSON de las peticiones HTTP
function getJsonBody(req) {
  // Retornamos una nueva Promesa para manejar la asincronía de la lectura del stream de datos
  return new Promise((resolve, reject) => {
    // Inicializamos una variable para almacenar el cuerpo de la petición como cadena
    let body = '';
    // Escuchamos el evento 'data' de la petición, que se dispara cada vez que llega un trozo (chunk) de datos
    req.on('data', chunk => {
      // Concatenamos el trozo recibido (convertido a string) a nuestra variable body
      body += chunk.toString();
    });
    // Escuchamos el evento 'end', que indica que ya se recibieron todos los datos de la petición
    req.on('end', () => {
      // Intentamos parsear el cuerpo concatenado usando un bloque try-catch
      try {
        // Si el body tiene contenido, lo parseamos como JSON y resolvemos la promesa; si está vacío, resolvemos con un objeto vacío
        resolve(body ? JSON.parse(body) : {});
      // Atrapamos cualquier error de parseo (por ejemplo, si el JSON es inválido)
      } catch (e) {
        // Rechazamos la promesa con el error capturado
        reject(e);
      }
    });
  });
}

// Definimos un plugin personalizado de Vite para manejar las conexiones a la base de datos y la API
const dbPlugin = () => {
  // Declaramos una variable para almacenar el pool de conexiones de la base de datos
  let pool;
  // Retornamos el objeto de configuración del plugin
  return {
    // Le damos un nombre identificativo a nuestro plugin
    name: 'db-plugin',
    // Usamos el hook configureServer de Vite para acceder al servidor de desarrollo
    async configureServer(server) {
      // Creamos un pool de conexiones a MySQL y lo asignamos a la variable 'pool'
      pool = mysql.createPool({
        // El host donde se encuentra la base de datos (local)
        host: 'localhost',
        // El usuario de la base de datos
        user: 'root',
        // La contraseña del usuario de la base de datos (vacía por defecto en XAMPP)
        password: '',
        // El nombre de la base de datos a la que nos conectamos
        database: 'simpson_db',
        // Le decimos al pool que espere por conexiones si todas están ocupadas
        waitForConnections: true,
        // El número máximo de conexiones simultáneas que puede mantener el pool
        connectionLimit: 10,
        // El límite de peticiones en cola (0 significa sin límite)
        queueLimit: 0
      });

      // Añadimos un middleware al servidor de Vite para interceptar las peticiones
      server.middlewares.use(async (req, res, next) => {
        // Verificamos si la URL de la petición NO comienza con '/api/'
        if (!req.url.startsWith('/api/')) {
          // Si no es una ruta de la API, pasamos el control al siguiente middleware
          return next();
        }

        // Si es una ruta de la API, establecemos el encabezado de la respuesta indicando que será JSON
        res.setHeader('Content-Type', 'application/json');

        // Iniciamos un bloque try-catch para manejar las operaciones de la API
        try {
          // Parseamos la URL completa de la petición basándonos en el host actual
          const url = new URL(req.url, `http://${req.headers.host}`);
          // Extraemos la ruta (pathname) de la URL parseada
          const path = url.pathname;

          // Comprobamos si la ruta es '/api/visitas' y el método es 'POST'
          if (path === '/api/visitas' && req.method === 'POST') {
            // Parseamos el cuerpo JSON de la petición y extraemos la variable 'pagina'
            const { pagina } = await getJsonBody(req);
            // Obtenemos la fecha actual en formato ISO y la formateamos para MySQL (YYYY-MM-DD HH:MM:SS)
            const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
            // Ejecutamos la consulta SQL para insertar la nueva visita en la tabla 'visitas'
            const [result] = await pool.query('INSERT INTO visitas (pagina, fecha) VALUES (?, ?)', [pagina, fecha]);
            // Terminamos la respuesta enviando un JSON con el ID insertado, la página y la fecha
            res.end(JSON.stringify({ id: result.insertId, pagina, fecha }));
          } 
          // Comprobamos si la ruta es '/api/visitas' y el método es 'GET'
          else if (path === '/api/visitas' && req.method === 'GET') {
            // Ejecutamos la consulta SQL para contar el total de registros en la tabla 'visitas'
            const [rows] = await pool.query('SELECT COUNT(*) as total FROM visitas');
            // Terminamos la respuesta enviando el total en formato JSON
            res.end(JSON.stringify({ total: rows[0].total }));
          }
          // Comprobamos si la ruta es '/api/calculos' y el método es 'POST'
          else if (path === '/api/calculos' && req.method === 'POST') {
            // Parseamos el cuerpo JSON de la petición y extraemos los datos del cálculo
            const { funcion, a, b, n, resultado } = await getJsonBody(req);
            // Obtenemos la fecha actual formateada para MySQL
            const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
            // Ejecutamos la consulta SQL para insertar el nuevo cálculo en la tabla 'calculos'
            const [result] = await pool.query('INSERT INTO calculos (funcion, a, b, n, resultado, fecha) VALUES (?, ?, ?, ?, ?, ?)', [funcion, a, b, n, resultado, fecha]);
            // Terminamos la respuesta enviando los datos del cálculo insertado
            res.end(JSON.stringify({ id: result.insertId, funcion, a, b, n, resultado, fecha }));
          }
          // Comprobamos si la ruta es '/api/calculos' y el método es 'GET'
          else if (path === '/api/calculos' && req.method === 'GET') {
            // Obtenemos el parámetro 'limite' de la URL (por defecto '10') y lo convertimos a entero
            const limite = parseInt(url.searchParams.get('limite') || '10', 10);
            // Ejecutamos la consulta SQL para obtener los cálculos más recientes, limitados al valor especificado
            const [rows] = await pool.query('SELECT * FROM calculos ORDER BY id DESC LIMIT ?', [limite]);
            // Terminamos la respuesta enviando la lista de cálculos en formato JSON
            res.end(JSON.stringify(rows));
          }
          // Comprobamos si la ruta es '/api/contactos' y el método es 'POST'
          else if (path === '/api/contactos' && req.method === 'POST') {
            // Parseamos el cuerpo JSON de la petición y extraemos los datos de contacto
            const { nombre, email, mensaje } = await getJsonBody(req);
            // Obtenemos la fecha actual formateada para MySQL
            const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
            // Ejecutamos la consulta SQL para insertar el nuevo contacto en la tabla 'contactos'
            const [result] = await pool.query('INSERT INTO contactos (nombre, email, mensaje, fecha) VALUES (?, ?, ?, ?)', [nombre, email, mensaje, fecha]);
            // Terminamos la respuesta enviando los datos del contacto insertado
            res.end(JSON.stringify({ id: result.insertId, nombre, email, mensaje, fecha }));
          }
          // Comprobamos si la ruta es '/api/contactos' y el método es 'GET'
          else if (path === '/api/contactos' && req.method === 'GET') {
            // Ejecutamos la consulta SQL para obtener todos los contactos ordenados del más reciente al más antiguo
            const [rows] = await pool.query('SELECT * FROM contactos ORDER BY id DESC');
            // Terminamos la respuesta enviando la lista de contactos en formato JSON
            res.end(JSON.stringify(rows));
          }
          // Comprobamos si la ruta es '/api/funciones' y el método es 'GET'
          else if (path === '/api/funciones' && req.method === 'GET') {
            // Ejecutamos la consulta SQL para obtener todas las funciones guardadas
            const [rows] = await pool.query('SELECT * FROM funciones');
            // Terminamos la respuesta enviando la lista de funciones en formato JSON
            res.end(JSON.stringify(rows));
          }
          // Comprobamos si la ruta es '/api/funciones' y el método es 'POST'
          else if (path === '/api/funciones' && req.method === 'POST') {
            // Parseamos el cuerpo JSON de la petición y extraemos la expresión y descripción de la función
            const { expresion, descripcion } = await getJsonBody(req);
            
            // Verificar si la función ya existe para no tener duplicados
            const [existing] = await pool.query('SELECT * FROM funciones WHERE expresion = ?', [expresion]);
            // Si la función ya existe en la base de datos
            if (existing.length > 0) {
              // Terminamos la respuesta devolviendo un mensaje indicando que ya existe
              return res.end(JSON.stringify({ success: true, message: 'La función ya existe' }));
            }

            // Ejecutamos la consulta SQL para insertar la nueva función (si no tiene descripción, le asignamos una por defecto)
            const [result] = await pool.query('INSERT INTO funciones (expresion, descripcion) VALUES (?, ?)', [expresion, descripcion || 'Función personalizada']);
            // Terminamos la respuesta enviando los datos de la función insertada
            res.end(JSON.stringify({ id: result.insertId, expresion, descripcion }));
          }
          // Comprobamos si la ruta es '/api/register' y el método es 'POST'
          else if (path === '/api/register' && req.method === 'POST') {
            // Parseamos el cuerpo JSON de la petición y extraemos los datos de registro del usuario
            const { usuario, contrasena, nombre, correo, numero } = await getJsonBody(req);
            
            // Verificamos si el nombre de usuario ya existe en la base de datos
            const [existing] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
            // Si el usuario ya existe
            if (existing.length > 0) {
              // Establecemos el código de estado 400 (Bad Request)
              res.statusCode = 400;
              // Terminamos la respuesta enviando un mensaje de error
              return res.end(JSON.stringify({ error: 'El usuario ya existe' }));
            }

            // Si el usuario no existe, insertamos los nuevos datos del usuario en la tabla 'usuarios'
            await pool.query(
              'INSERT INTO usuarios (usuario, contrasena, nombre, correo, numero) VALUES (?, ?, ?, ?, ?)', 
              [usuario, contrasena, nombre, correo, numero]
            );
            // Terminamos la respuesta enviando un mensaje de éxito
            res.end(JSON.stringify({ success: true, message: 'Usuario registrado exitosamente' }));
          }
          // Comprobamos si la ruta es '/api/login' y el método es 'POST'
          else if (path === '/api/login' && req.method === 'POST') {
            // Parseamos el cuerpo JSON de la petición y extraemos las credenciales
            const { usuario, contrasena } = await getJsonBody(req);
            // Consultamos en la base de datos para buscar un usuario que coincida con las credenciales
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);
            
            // Si encontramos alguna fila que coincida (credenciales válidas)
            if (rows.length > 0) {
              // Extraemos el primer usuario encontrado
              const user = rows[0];
              // Terminamos la respuesta indicando éxito y devolviendo el usuario y nombre
              res.end(JSON.stringify({ success: true, usuario: user.usuario, nombre: user.nombre }));
            // Si no se encontró ningún usuario (credenciales inválidas)
            } else {
              // Establecemos el código de estado 401 (Unauthorized)
              res.statusCode = 401;
              // Terminamos la respuesta enviando un mensaje de error
              res.end(JSON.stringify({ error: 'Credenciales inválidas' }));
            }
          }
          // Si ninguna de las rutas de la API coincide con las anteriores
          else {
            // Establecemos el código de estado 404 (Not Found)
            res.statusCode = 404;
            // Terminamos la respuesta enviando un mensaje de error "Not found"
            res.end(JSON.stringify({ error: 'Not found' }));
          }
        // Atrapamos cualquier error ocurrido durante el procesamiento de la petición API
        } catch (error) {
          // Imprimimos el error en la consola para propósitos de depuración
          console.error('API Error:', error);
          // Establecemos el código de estado 500 (Internal Server Error)
          res.statusCode = 500;
          // Terminamos la respuesta enviando el mensaje de la excepción ocurrida
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    }
  };
};

// Exportamos la configuración por defecto de Vite
export default defineConfig({
  // Añadimos los plugins que hemos importado/creado (React y el de Base de Datos)
  plugins: [react(), dbPlugin()],
  // Configuramos el entorno de pruebas usando un entorno tipo Node (útil si hay test con Vitest u otro runner)
  test: {
    environment: 'node',
  },
})
