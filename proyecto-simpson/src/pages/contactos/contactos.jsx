import React, { useState, useEffect } from 'react';
import { guardarContacto, registrarVisita } from '../../services/db';
import styles from './contactos.module.css';

export const Contactos = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    registrarVisita('Contactos').catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito(false);

    try {
      await guardarContacto(nombre, email, mensaje);
      setExito(true);
      setNombre('');
      setEmail('');
      setMensaje('');
    } catch (err) {
      setError('Ocurrió un error al enviar el mensaje. Intenta de nuevo.');
    }
  };

  return (
    <div className="container">
      <h1 className={styles.title}>Contactos</h1>
      <p className={styles.descripcion}>
        ¿Tienes alguna pregunta o comentario? Envíanos un mensaje y te responderemos pronto.
      </p>

      {exito && (
        <div className={styles.exitoAlert}>
          <p>✅ ¡Mensaje enviado correctamente! Gracias por contactarnos.</p>
        </div>
      )}

      {error && (
        <div className="error-alert">
          <p>{error}</p>
        </div>
      )}

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.campo}>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            placeholder="Escribe tu mensaje aquí..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={5}
            required
          />
        </div>

        <button type="submit" className={styles.boton}>
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};
