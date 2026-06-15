import React from 'react';
import { SimpsonForm } from '../../components';
import styles from './calculadora.module.css';

export const Calculadora = () => {
  return (
    <div className="container">
      <h1 className={styles.title}>Calculadora Simpson 1/3</h1>
      
      <p className={styles.description}>
        La regla de Simpson 1/3 es un método de integración numérica que se utiliza para obtener la aproximación de la integral. 
        Este método asume que los subintervalos tienen el mismo ancho (h).
      </p>

      <div className={styles.formulaBox}>
        <h3>Fórmula Principal:</h3>
        <p className={styles.formula}>
          I ≈ (h / 3) * [ f(x₀) + 4 ∑ f(xᵢ)<sub>impares</sub> + 2 ∑ f(xⱼ)<sub>pares</sub> + f(xₙ) ]
        </p>
        <p className={styles.formulaDetails}>
          Donde <strong>h = (b - a) / n</strong>, y <strong>n</strong> debe ser un número par.
        </p>
      </div>

      <div className={styles.formWrapper}>
        <SimpsonForm />
      </div>
    </div>
  );
};
