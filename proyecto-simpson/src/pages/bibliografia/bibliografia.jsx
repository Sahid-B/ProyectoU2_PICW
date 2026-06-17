import React, { useEffect } from 'react';
import { registrarVisita } from '../../services/db';
import { BookOpen, Globe, Book, ExternalLink, FileText } from 'lucide-react';
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

const articulos = [
  {
    id: 1,
    titulo: 'La integración numérica y su importancia en la ingeniería moderna',
    descripcion: 'Los métodos numéricos como Simpson 1/3 siguen siendo fundamentales para resolver problemas de ingeniería que no tienen solución analítica exacta.',
    url: 'https://es.wikipedia.org/wiki/Integraci%C3%B3n_num%C3%A9rica',
  },
  {
    id: 2,
    titulo: 'Aplicaciones del cálculo numérico en la ciencia de datos',
    descripcion: 'El cálculo numérico es la base de muchos algoritmos de machine learning y optimización usados en inteligencia artificial.',
    url: 'https://es.wikipedia.org/wiki/M%C3%A9todos_num%C3%A9ricos',
  },
  {
    id: 3,
    titulo: 'Regla de Simpson: historia y origen matemático',
    descripcion: 'Thomas Simpson publicó su famoso método en 1743. Hoy se usa en áreas como física, economía, medicina y computación.',
    url: 'https://es.wikipedia.org/wiki/Regla_de_Simpson',
  },
  {
    id: 4,
    titulo: 'React y el futuro del desarrollo web en educación',
    descripcion: 'React se ha convertido en una herramienta clave para crear aplicaciones educativas interactivas en universidades de todo el mundo.',
    url: 'https://react.dev',
  },
  {
    id: 5,
    titulo: 'Cómo elegir el valor de n en el método de Simpson',
    descripcion: 'El número de subintervalos n debe ser par. A mayor valor de n, mayor precisión en el resultado de la integral aproximada.',
    url: 'https://es.wikipedia.org/wiki/Regla_de_Simpson',
  },
];

export const Bibliografia = () => {
  useEffect(() => {
    registrarVisita('Bibliografia').catch(() => {});
  }, []);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Bibliografía</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', color: 'var(--text-main)' }}>
          Recursos, libros y documentación web utilizados como referencia para el desarrollo del proyecto 
          y la correcta implementación matemática del método de Simpson 1/3.
        </p>
      </div>

      <div className="grid-2">
        <section className="card">
          <h2 style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <BookOpen size={28} color="var(--primary)" /> Libros
          </h2>
          <div>
            {libros.map((libro) => (
              <div key={libro.id} className={`${styles.biblioItem} ${styles.bookItem}`}>
                <div className={styles.itemIcon}>
                  <Book size={20} color="var(--primary)" />
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemTitle}>{libro.titulo}</span>
                  <div className={styles.itemDesc}>
                    {libro.autores} <strong>({libro.anio})</strong>
                    <br />
                    <em>{libro.editorial}</em>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <Globe size={28} color="var(--accent)" /> Páginas Web
          </h2>
          <div>
            {paginasWeb.map((pagina) => (
              <div key={pagina.id} className={`${styles.biblioItem} ${styles.webItem}`}>
                <div className={styles.itemIcon}>
                  <Globe size={20} color="var(--accent)" />
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemTitle}>{pagina.nombre}</span>
                  <a
                    href={pagina.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.biblioLink}
                  >
                    Visitar recurso <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <section className="card">
          <h2 style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <FileText size={28} color="#F59E0B" /> Artículos y Apuntes
          </h2>
          <div className="grid-2" style={{ gap: '1rem' }}>
            {articulos.map((articulo) => (
              <div key={articulo.id} className={`${styles.biblioItem} ${styles.webItem}`} style={{ marginBottom: 0 }}>
                <div className={styles.itemIcon}>
                  <FileText size={20} color="#F59E0B" />
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemTitle}>{articulo.titulo}</span>
                  <p className={styles.itemDesc} style={{ margin: '0.5rem 0' }}>{articulo.descripcion}</p>
                  <a
                    href={articulo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.biblioLink}
                    style={{ color: '#F59E0B' }}
                  >
                    Leer artículo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
