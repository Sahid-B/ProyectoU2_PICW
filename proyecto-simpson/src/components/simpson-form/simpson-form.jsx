import React, { useState, useEffect } from 'react';
import { obtenerFunciones, guardarCalculo, registrarVisita } from '../../services/db';
import { simpson13 } from '../../services/simpson';
import styles from './simpson-form.module.css';

export const SimpsonForm = () => {
  const [funciones, setFunciones] = useState([]);
  const [funcionStr, setFuncionStr] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    registrarVisita('Calculadora').catch(() => {});

    const loadFunciones = async () => {
      try {
        const data = await obtenerFunciones();
        if (data && data.length > 0) {
          setFunciones(data);
          setFuncionStr(data[0].expresion);
        } else {
          throw new Error("Sin datos");
        }
      } catch (err) {
        console.warn("No se pudo conectar a BDD. Usando funciones mockeadas.");
        const mock = [
          { id: 1, expresion: 'x^2', descripcion: 'Función cuadrática' },
          { id: 2, expresion: 'x^3', descripcion: 'Función cúbica' },
          { id: 3, expresion: 'Math.sin(x)', descripcion: 'Seno de x' },
          { id: 4, expresion: 'Math.cos(x)', descripcion: 'Coseno de x' },
          { id: 5, expresion: 'Math.exp(x)', descripcion: 'Exponencial de x' }
        ];
        setFunciones(mock);
        setFuncionStr(mock[0].expresion);
      }
    };
    
    loadFunciones();
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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`card ${styles.formContainer}`}>
      <form onSubmit={handleCalcular} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Función f(x):</label>
          <select 
            value={funcionStr} 
            onChange={(e) => setFuncionStr(e.target.value)}
            className={styles.input}
          >
            {funciones.map(f => (
              <option key={f.id} value={f.expresion}>
                {f.expresion} - {f.descripcion}
              </option>
            ))}
          </select>
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
