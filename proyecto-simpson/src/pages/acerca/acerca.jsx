import React, { useEffect } from 'react';
import { registrarVisita } from '../../services/db';
import { Target, Lightbulb, Code2, Layers, Cpu, Database, Palette, ShieldCheck } from 'lucide-react';
import { TechBadge } from '../../components';
import styles from './acerca.module.css';

export const Acerca = () => {
  useEffect(() => {
    registrarVisita('Acerca').catch(() => {});
  }, []);

  const tecnologias = [
    { nombre: 'React 19', icono: <Layers size={18} /> },
    { nombre: 'Vite', icono: <Cpu size={18} /> },
    { nombre: 'React Router', icono: <Target size={18} /> },
    { nombre: 'MySQL', icono: <Database size={18} /> },
    { nombre: 'CSS Modules', icono: <Palette size={18} /> },
    { nombre: 'Lucide Icons', icono: <ShieldCheck size={18} /> }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Acerca del Proyecto</h1>
        <p className={styles.subtitle}>
          Un desarrollo enfocado en la integración de tecnologías web modernas para la resolución 
          de problemas de cálculo numérico mediante una interfaz interactiva y dinámica.
        </p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Target size={32} color="var(--primary)" />
          </div>
          <h2 className={styles.cardTitle}>Objetivo Principal</h2>
          <p className={styles.cardText}>
            Proporcionar a los estudiantes y profesionales una herramienta precisa e intuitiva para 
            el cálculo de integrales definidas utilizando el método de aproximación de la <strong>Regla de Simpson 1/3</strong>.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Lightbulb size={32} color="var(--accent)" />
          </div>
          <h2 className={styles.cardTitle}>Justificación Académica</h2>
          <p className={styles.cardText}>
            El proyecto permite aplicar de forma práctica los conocimientos teóricos adquiridos 
            en la asignatura, uniendo los métodos numéricos de las ciencias exactas con el 
            desarrollo de software y la arquitectura de componentes.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Code2 size={32} color="#10B981" />
          </div>
          <h2 className={styles.cardTitle}>Metodología de Desarrollo</h2>
          <p className={styles.cardText}>
            Se adoptó el paradigma de <em>Single Page Application (SPA)</em>, garantizando 
            una navegación fluida sin recargas, con un enfoque en la modularidad, escalabilidad y 
            un diseño visual "Premium".
          </p>
        </div>
      </div>

      <section className={styles.techSection}>
        <h2>Stack Tecnológico</h2>
        <div className={styles.techGrid}>
          {tecnologias.map((tech, index) => (
            <TechBadge key={index} icono={tech.icono} nombre={tech.nombre} />
          ))}
        </div>
      </section>
    </div>
  );
};
