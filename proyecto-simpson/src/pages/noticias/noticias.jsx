import React, { useEffect, useState } from 'react';
import { registrarVisita } from '../../services/db';
import { obtenerNoticiasMatematicas } from '../../services/newsApi';
import { Newspaper, ArrowRight, Loader2 } from 'lucide-react';
import styles from './noticias.module.css';

export const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    registrarVisita('Noticias').catch(() => {});
    
    const fetchNoticias = async () => {
      setCargando(true);
      const data = await obtenerNoticiasMatematicas();
      setNoticias(data);
      setCargando(false);
    };

    fetchNoticias();
  }, []);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <Newspaper size={40} color="var(--primary)" /> Noticias
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', color: 'var(--text-main)' }}>
          Artículos en tiempo real, discusiones y novedades sobre matemáticas, 
          métodos numéricos y ciencia desde la comunidad de Hacker News.
        </p>
      </div>

      {cargando ? (
        <div className={styles.loadingContainer}>
          <Loader2 size={48} className={styles.spinner} color="var(--accent)" />
          <p>Conectando con la API y obteniendo las últimas noticias...</p>
        </div>
      ) : noticias.length > 0 ? (
        <div className={styles.newsGrid}>
          {noticias.map((noticia) => (
            <div key={noticia.id} className={styles.newsCard}>
              <h2 className={styles.newsTitle}>{noticia.titulo}</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                {noticia.autor} • {noticia.fecha}
              </div>
              <p className={styles.newsDesc}>{noticia.descripcion}</p>
              <a
                href={noticia.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.newsLink}
              >
                Leer abstract completo <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No se encontraron noticias recientes o hubo un error al conectar con el servidor.</p>
        </div>
      )}
    </div>
  );
};
