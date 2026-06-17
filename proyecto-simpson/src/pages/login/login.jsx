import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, UserPlus, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { iniciarSesion, registrarUsuario } from '../../services/db';
import styles from './login.module.css';

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // States para el formulario
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [numero, setNumero] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Modo Login
        const data = await iniciarSesion(usuario, contrasena);
        localStorage.setItem('auth_user', JSON.stringify({ usuario: data.usuario, nombre: data.nombre }));
        setSuccess('¡Inicio de sesión exitoso!');
        setTimeout(() => {
          navigate('/'); // Redirigir al inicio después de 1 segundo
          window.location.reload(); // Recargar para que el navbar se actualice
        }, 1000);
      } else {
        // Modo Registro
        await registrarUsuario(usuario, contrasena, nombre, correo, numero);
        setSuccess('¡Usuario registrado exitosamente! Ahora puedes iniciar sesión.');
        setTimeout(() => {
          setIsLogin(true); // Cambiar a la vista de login
          setSuccess('');
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error. Inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isLogin ? <><LogIn size={32} color="var(--primary)" /> Iniciar Sesión</> : <><UserPlus size={32} color="var(--accent)" /> Crear Cuenta</>}
          </h1>
          <p className={styles.subtitle}>
            {isLogin ? 'Ingresa tus credenciales para continuar' : 'Únete a nuestra plataforma de cálculos numéricos'}
          </p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {success && (
          <div className={styles.successMessage}>
            <CheckCircle size={20} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campos comunes (Usuario y Contraseña) */}
          <div className={styles.formGroup}>
            <label>Nombre de Usuario</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input
                type="text"
                placeholder="ej. Sahid123"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div className={styles.formGroup}>
                <label>Nombre Completo</label>
                <div className={styles.inputWrapper}>
                  <User size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    placeholder="Tu nombre real"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Correo Electrónico</label>
                <div className={styles.inputWrapper}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Número Telefónico</label>
                <div className={styles.inputWrapper}>
                  <Phone size={18} className={styles.inputIcon} />
                  <input
                    type="tel"
                    placeholder="Tu número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type="password"
                placeholder="••••••••"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'Ingresar al sistema' : 'Registrarse ahora'}
          </button>
        </form>

        <div className={styles.toggleText}>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}
          <button
            type="button"
            className={styles.toggleLink}
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};
