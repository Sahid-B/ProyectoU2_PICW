import React, { useEffect } from 'react';
import { registrarVisita } from '../../services/db';
import styles from './bibliografia.module.css';

const libros = [
  {
    id: 1,
    titulo: 'Métodos Numéricos para Ingenieros',
    autores: 'Chapra, S. C. & Canale, R. P.',
    anio: '2010',
    editorial: 'McGraw-Hill, 6ta edición',
  },
  {
    id: 2,
    titulo: 'Análisis Numérico',
    autores: 'Burden, R. L. & Faires, J. D.',
    anio: '2011',
    editorial: 'Cengage Learning, 9na edición',
  },
  {
    id: 3,
    titulo: 'Introducción al Análisis Numérico',
    autores: 'Kincaid, D. & Cheney, W.',
    anio: '2002',
    editorial: 'Addison-Wesley',
  },
];

const paginasWeb = [
  {
    id: 1,
    nombre: 'Wikipedia — Regla de Simpson',
    url: 'https://es.wikipedia.org/wiki/Regla_de_Simpson',
  },
  {
    id: 2,
    nombre: 'Wikipedia — Integración Numérica',
    url: 'https://es.wikipedia.org/wiki/Integraci%C3%B3n_num%C3%A9rica',
  },
  {
    id: 3,
    nombre: 'Documentación oficial de React',
    url: 'https://react.dev',
  },
  {
    id: 4,
    nombre: 'Documentación de Vite',
    url: 'https://vitejs.dev',
  },
];

export const Bibliografia = () => {
  useEffect(() => {
    registrarVisita('Bibliografia').catch(() => {});
  }, []);

  return (
    <div className="container">
      <h1>Bibliografía</h1>
      <p>
        Recursos utilizados para el desarrollo del proyecto y la implementación
        del método de Simpson 1/3.
      </p>

      <div className="grid-2">
        <section className="card">
          <h2>📚 Libros</h2>
          <ul>
            {libros.map((libro) => (
              <li key={libro.id} className={styles.biblioItem}>
                <strong>{libro.titulo}</strong>
                <br />
                {libro.autores} ({libro.anio}) — {libro.editorial}
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>🌐 Páginas Web</h2>
          <ul>
            {paginasWeb.map((pagina) => (
              <li key={pagina.id} className={styles.biblioItem}>
                <a
                  href={pagina.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.biblioLink}
                >
                  {pagina.nombre}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
