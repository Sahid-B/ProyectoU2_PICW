import React, { useEffect, useState } from 'react';
import { obtenerCalculos, obtenerContactos, obtenerVisitas } from '../../services/db';
import styles from './inicio.module.css';

export const Inicio = () => {
  const [calculos, setCalculos] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [visitas, setVisitas] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const calcData = await obtenerCalculos(3); // Mostrar últimos 3
        const contData = await obtenerContactos();
        const totalVisitas = await obtenerVisitas();
        
        setCalculos(calcData);
        setContactos(contData.slice(0, 2)); // Mostrar últimos 2
        setVisitas(totalVisitas);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("No se pudo conectar a la base de datos.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Simpson 1/3</h1>
      <p>
        El método de Simpson 1/3 es una técnica de integración numérica que utiliza parábolas 
        para aproximar el área bajo una curva. Es especialmente útil cuando se requiere alta precisión.
      </p>

      <div className="visitas-badge" style={{ marginBottom: '2rem', display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--primary)', borderRadius: '0.5rem' }}>
        Total de visitas al sitio: <strong>{visitas}</strong>
      </div>

      {error && (
        <div className="error-alert">
          <p>{error}</p>
          <p>Se requiere el servidor backend para cargar los datos reales.</p>
        </div>
      )}

      <div className="grid-2">
        <section className="card">
          <h2>Últimos 3 Cálculos</h2>
          {calculos.length > 0 ? (
            <ul>
              {calculos.map((calc, index) => (
                <li key={index}>
                  f(x)={calc.funcion} | a={calc.a}, b={calc.b}, n={calc.n} <br/> 
                  <strong>Resultado: {calc.resultado}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay cálculos registrados.</p>
          )}
        </section>

        <section className="card">
          <h2>Últimos 2 Mensajes</h2>
          {contactos.length > 0 ? (
            <ul>
              {contactos.map((cont, index) => (
                <li key={index}>
                  <strong>{cont.nombre}:</strong> {cont.mensaje}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay mensajes registrados.</p>
          )}
        </section>
      </div>
    </div>
  );
};
