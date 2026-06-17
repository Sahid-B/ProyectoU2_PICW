import React, { useState, useEffect } from 'react';
import { obtenerVisitas, obtenerCalculos, registrarVisita } from '../../services/db';
import styles from './estadisticas.module.css';

export const Estadisticas = () => {
  const [totalVisitas, setTotalVisitas] = useState(0);
  const [calculos, setCalculos] = useState([]);
  const [promedio, setPromedio] = useState(null);

  useEffect(() => {
    registrarVisita('Estadisticas').catch(() => {});
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const visitas = await obtenerVisitas();
    setTotalVisitas(visitas);

    const ultimosCalculos = await obtenerCalculos(5);
    setCalculos(ultimosCalculos);

    if (ultimosCalculos.length > 0) {
      const suma = ultimosCalculos.reduce((acc, c) => acc + c.resultado, 0);
      setPromedio((suma / ultimosCalculos.length).toFixed(4));
    }
  };

  return (
    <div className="container">
      <h1 className={styles.title}>Estadísticas</h1>
      <p className={styles.descripcion}>
        Resumen de actividad del sistema: visitas, cálculos realizados y funciones disponibles.
      </p>

      {/* Total de visitas */}
      <div className={styles.seccion}>
        <h2>Total de Visitas</h2>
        <div className={styles.statBox}>
          <span className={styles.statNumero}>{totalVisitas}</span>
          <span className={styles.statLabel}>visitas registradas en esta sesión</span>
        </div>
      </div>

      {/* Últimos cálculos */}
      <div className={styles.seccion}>
        <h2>Últimos Cálculos</h2>
        {calculos.length === 0 ? (
          <p>No hay cálculos registrados aún.</p>
        ) : (
          <ul className={styles.listaCalculos}>
            {calculos.map((c) => (
              <li key={c.id} className={styles.itemCalculo}>
                <span className={styles.funcion}>{c.funcion}</span>
                <span className={styles.detalle}>
                  a={c.a}, b={c.b}, n={c.n}
                </span>
                <span className={styles.resultado}>= {c.resultado}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Promedio de resultados */}
      <div className={styles.seccion}>
        <h2>Promedio de Resultados</h2>
        <div className={styles.statBox}>
          <span className={styles.statNumero}>
            {promedio !== null ? promedio : '—'}
          </span>
          <span className={styles.statLabel}>promedio de los últimos 5 cálculos</span>
        </div>
      </div>
    </div>
  );
};
