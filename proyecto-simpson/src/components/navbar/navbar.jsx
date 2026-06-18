import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrarVisita } from '../../services/db';
import styles from './navbar.module.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('auth_user');
    if (auth) {
      setUser(JSON.parse(auth));
    }
  }, []);

  const handleClick = (pagina) => {
    // Intentar registrar la visita silenciosamente
    registrarVisita(pagina).catch(() => {
      // Ignorar error de backend faltante
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={() => handleClick('Inicio')}>IntegraWEB</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/" onClick={() => handleClick('Inicio')}>Inicio</Link></li>
        <li><Link to="/equipo" onClick={() => handleClick('Equipo')}>Equipo</Link></li>
        <li><Link to="/acerca" onClick={() => handleClick('Acerca')}>Acerca del Proyecto</Link></li>
        <li><Link to="/noticias" onClick={() => handleClick('Noticias')}>Noticias</Link></li>
        <li><Link to="/calculadora" onClick={() => handleClick('Calculadora')}>Calculadora</Link></li>
        <li><Link to="/contactos" onClick={() => handleClick('Contactos')}>Contactos</Link></li>
        <li><Link to="/estadisticas" onClick={() => handleClick('Estadisticas')}>Estadísticas</Link></li>
        {user ? (
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Hola, {user.nombre}</span>
            <button
              onClick={handleLogout}
              style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Salir
            </button>
          </li>
        ) : (
          <li><Link to="/login" onClick={() => handleClick('Login')} style={{ background: 'var(--primary)', color: 'white', padding: '5px 15px', borderRadius: '5px' }}>Ingresar</Link></li>
        )}
      </ul>
    </nav>
  );
};
