import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mysql from 'mysql2/promise'

// Helper to parse JSON body
function getJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

const dbPlugin = () => {
  let pool;
  return {
    name: 'db-plugin',
    async configureServer(server) {
      pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'simpson_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');

        try {
          const url = new URL(req.url, `http://${req.headers.host}`);
          const path = url.pathname;

          if (path === '/api/visitas' && req.method === 'POST') {
            const { pagina } = await getJsonBody(req);
            const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const [result] = await pool.query('INSERT INTO visitas (pagina, fecha) VALUES (?, ?)', [pagina, fecha]);
            res.end(JSON.stringify({ id: result.insertId, pagina, fecha }));
          } 
          else if (path === '/api/visitas' && req.method === 'GET') {
            const [rows] = await pool.query('SELECT COUNT(*) as total FROM visitas');
            res.end(JSON.stringify({ total: rows[0].total }));
          }
          else if (path === '/api/calculos' && req.method === 'POST') {
            const { funcion, a, b, n, resultado } = await getJsonBody(req);
            const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const [result] = await pool.query('INSERT INTO calculos (funcion, a, b, n, resultado, fecha) VALUES (?, ?, ?, ?, ?, ?)', [funcion, a, b, n, resultado, fecha]);
            res.end(JSON.stringify({ id: result.insertId, funcion, a, b, n, resultado, fecha }));
          }
          else if (path === '/api/calculos' && req.method === 'GET') {
            const limite = parseInt(url.searchParams.get('limite') || '10', 10);
            const [rows] = await pool.query('SELECT * FROM calculos ORDER BY id DESC LIMIT ?', [limite]);
            res.end(JSON.stringify(rows));
          }
          else if (path === '/api/contactos' && req.method === 'POST') {
            const { nombre, email, mensaje } = await getJsonBody(req);
            const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const [result] = await pool.query('INSERT INTO contactos (nombre, email, mensaje, fecha) VALUES (?, ?, ?, ?)', [nombre, email, mensaje, fecha]);
            res.end(JSON.stringify({ id: result.insertId, nombre, email, mensaje, fecha }));
          }
          else if (path === '/api/contactos' && req.method === 'GET') {
            const [rows] = await pool.query('SELECT * FROM contactos ORDER BY id DESC');
            res.end(JSON.stringify(rows));
          }
          else if (path === '/api/funciones' && req.method === 'GET') {
            const [rows] = await pool.query('SELECT * FROM funciones');
            res.end(JSON.stringify(rows));
          }
          else if (path === '/api/noticias' && req.method === 'GET') {
            // Proxy para arXiv API (Science & Math API)
            try {
              const arxivRes = await fetch('http://export.arxiv.org/api/query?search_query=cat:math.NA&sortBy=submittedDate&sortOrder=descending&max_results=10');
              const text = await arxivRes.text();
              res.setHeader('Content-Type', 'application/xml');
              res.end(text);
            } catch (err) {
              console.error("Error fetching arxiv:", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          }
          else if (path === '/api/register' && req.method === 'POST') {
            const { usuario, contrasena, nombre, correo, numero } = await getJsonBody(req);
            
            const [existing] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
            if (existing.length > 0) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'El usuario ya existe' }));
            }

            await pool.query(
              'INSERT INTO usuarios (usuario, contrasena, nombre, correo, numero) VALUES (?, ?, ?, ?, ?)', 
              [usuario, contrasena, nombre, correo, numero]
            );
            res.end(JSON.stringify({ success: true, message: 'Usuario registrado exitosamente' }));
          }
          else if (path === '/api/login' && req.method === 'POST') {
            const { usuario, contrasena } = await getJsonBody(req);
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);
            
            if (rows.length > 0) {
              const user = rows[0];
              res.end(JSON.stringify({ success: true, usuario: user.usuario, nombre: user.nombre }));
            } else {
              res.statusCode = 401;
              res.end(JSON.stringify({ error: 'Credenciales inválidas' }));
            }
          }
          else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not found' }));
          }
        } catch (error) {
          console.error('API Error:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    }
  };
};

export default defineConfig({
  plugins: [react(), dbPlugin()],
  test: {
    environment: 'node',
  },
})
