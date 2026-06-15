import React, { useEffect, useState } from 'react';
import { registrarVisita } from '../../services/db';
import { obtenerNoticiasMatematicas } from '../../services/newsApi';
import styles from './noticias.module.css';

export const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    registrarVisita('Noticias').catch(() => {});
    const data = obtenerNoticiasMatematicas();
    setNoticias(data);
  }, []);

  return (
    <div className="container">
      <h1>Noticias</h1>
      <p>
        Artículos y recursos relacionados con métodos numéricos, matemáticas y
        desarrollo web.
      </p>

      <ul>
        {noticias.map((noticia) => (
          <li key={noticia.id} className={`card ${styles.newsCard}`} style={{ marginBottom: '1rem' }}>
            <h2 className={styles.newsTitle}>{noticia.titulo}</h2>
            <p>{noticia.descripcion}</p>
            <a
              href={noticia.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.newsLink}
            >
              Leer más →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
