import React, { useEffect, useState } from 'react';
import { obtenerCalculos, obtenerContactos, obtenerVisitas } from '../../services/db';
import { Calculator, Database, LineChart, Cpu } from 'lucide-react';
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
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Simpson 1/3</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-main)' }}>
          Una herramienta web avanzada para integración numérica.
        </p>
        <p style={{ marginTop: '1rem' }}>
          El método de Simpson 1/3 utiliza interpolación cuadrática (parábolas) para aproximar 
          el área bajo una curva con alta precisión. Desarrollado como proyecto integrador usando 
          arquitecturas modernas web.
        </p>
        <div className="visitas-badge" style={{ marginTop: '1.5rem', display: 'inline-block', padding: '0.6rem 1.2rem', background: 'var(--primary)', borderRadius: '2rem', fontWeight: '600' }}>
          Visitas totales al sistema: {visitas}
        </div>
      </div>

      {error && (
        <div className="error-alert">
          <p>{error}</p>
          <p>Se requiere que el servidor y la base de datos MySQL estén activos.</p>
        </div>
      )}

      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Características Principales</h2>
      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <Calculator size={32} color="var(--primary)" />
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Cálculo Dinámico</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Evaluador de expresiones matemáticas integrado para calcular cualquier función (seno, coseno, logaritmos).</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <Database size={32} color="var(--accent)" />
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Persistencia de Datos</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Arquitectura conectada a MySQL mediante Vite Middleware, almacenando historiales y visitas de forma eficiente.</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <LineChart size={32} color="#F59E0B" />
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Métricas en Tiempo Real</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Visualización de estadísticas globales y desempeño del método numérico en cada iteración.</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <Cpu size={32} color="#8B5CF6" />
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Infraestructura Ágil</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Diseñado para soportar despliegues automatizados y microservicios escalables bajo demanda.</p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <section className="card">
          <h2>Últimos Cálculos Registrados</h2>
          {calculos.length > 0 ? (
            <ul>
              {calculos.map((calc, index) => (
                <li key={index} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.25rem' }}>f(x) = {calc.funcion}</div>
                  <div style={{ fontSize: '0.85rem' }}>Intervalo: [{calc.a}, {calc.b}] | Segmentos (n): {calc.n}</div>
                  <div style={{ color: 'var(--accent)', marginTop: '0.5rem' }}>Resultado: <strong>{calc.resultado}</strong></div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay cálculos registrados en la base de datos.</p>
          )}
        </section>

        <section className="card">
          <h2>Últimos Mensajes de Contacto</h2>
          {contactos.length > 0 ? (
            <ul>
              {contactos.map((cont, index) => (
                <li key={index} style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>{cont.nombre}</strong> <span style={{ fontSize: '0.8rem' }}>({cont.email})</span>
                  <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>"{cont.mensaje}"</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay mensajes en la bandeja de entrada.</p>
          )}
        </section>
      </div>
    </div>
  );
};
