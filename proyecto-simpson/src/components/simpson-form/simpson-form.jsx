import React, { useState, useEffect } from 'react';
import { guardarCalculo, guardarFuncion, registrarVisita } from '../../services/db';
import { simpson13 } from '../../services/simpson';
import styles from './simpson-form.module.css';

export const SimpsonForm = () => {
  const [funcionStr, setFuncionStr] = useState('x^2');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    registrarVisita('Calculadora').catch(() => { });
  }, []);

  const handleCalcular = async (e) => {
    e.preventDefault();
    setError(null);
    setResultado(null);

    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valN = parseInt(n, 10);

    if (isNaN(valA) || isNaN(valB) || isNaN(valN)) {
      setError("Por favor, ingresa números válidos.");
      return;
    }

    try {
      const res = simpson13(funcionStr, valA, valB, valN);
      setResultado(res);

      // Guardar el cálculo en BDD (fallará silenciosamente si no hay backend)
      guardarCalculo(funcionStr, valA, valB, valN, res).catch(() => {
        console.warn("Cálculo no guardado en la BDD (sin backend).");
      });
      
      // Guardar automáticamente la función ingresada para el registro histórico
      guardarFuncion(funcionStr).catch(() => {});
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`card ${styles.formContainer}`}>
      <form onSubmit={handleCalcular} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Función f(x):</label>
          <input 
            type="text"
            value={funcionStr} 
            onChange={(e) => setFuncionStr(e.target.value)}
            className={styles.input}
            placeholder="Ejemplo: x^2 + Math.sin(x) o 1 / (1 + x^2)"
            required
          />
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label>Límite Inferior (a):</label>
            <input
              type="number"
              step="any"
              value={a}
              onChange={(e) => setA(e.target.value)}
              required
              className={styles.input}
              placeholder="0"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Límite Superior (b):</label>
            <input
              type="number"
              step="any"
              value={b}
              onChange={(e) => setB(e.target.value)}
              required
              className={styles.input}
              placeholder="1"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Segmentos (n, debe ser par):</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
            required
            min="2"
            step="2"
            className={styles.input}
            placeholder="2"
          />
        </div>

        <button type="submit" className={styles.button}>Calcular Integral</button>
      </form>

      {error && (
        <div className={styles.errorAlert}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {resultado !== null && (
        <div className={styles.resultadoBox}>
          <h3>Resultado de la Integral:</h3>
          <p className={styles.resultadoValor}>{resultado.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
};
