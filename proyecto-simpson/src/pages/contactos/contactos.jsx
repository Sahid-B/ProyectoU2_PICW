import React, { useState, useEffect } from 'react';
import { guardarContacto, registrarVisita } from '../../services/db';
import { CheckCircle } from 'lucide-react';
import { InputField } from '../../components';
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
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={20} color="var(--accent)" /> ¡Mensaje enviado correctamente! Gracias por contactarnos.
          </p>
        </div>
      )}

      {error && (
        <div className="error-alert">
          <p>{error}</p>
        </div>
      )}

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <InputField
          id="nombre"
          label="Nombre"
          placeholder="Tu nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required={true}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />

        <InputField
          id="mensaje"
          label="Mensaje"
          type="textarea"
          placeholder="Escribe tu mensaje aquí..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows={5}
          required={true}
        />

        <button type="submit" className={styles.boton}>
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};
