import React from 'react';
import { Link } from 'react-router-dom';
import { registrarVisita } from '../../services/db';
import styles from './navbar.module.css';

export const Navbar = () => {
  const handleClick = (pagina) => {
    // Intentar registrar la visita silenciosamente
    registrarVisita(pagina).catch(() => {
      // Ignorar error de backend faltante
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={() => handleClick('Inicio')}>Simpson 1/3</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/" onClick={() => handleClick('Inicio')}>Inicio</Link></li>
        <li><Link to="/equipo" onClick={() => handleClick('Equipo')}>Equipo</Link></li>
        <li><Link to="/bibliografia" onClick={() => handleClick('Bibliografia')}>Bibliografía</Link></li>
        <li><Link to="/noticias" onClick={() => handleClick('Noticias')}>Noticias</Link></li>
        <li><Link to="/calculadora" onClick={() => handleClick('Calculadora')}>Calculadora</Link></li>
        <li><Link to="/contactos" onClick={() => handleClick('Contactos')}>Contactos</Link></li>
        <li><Link to="/estadisticas" onClick={() => handleClick('Estadisticas')}>Estadísticas</Link></li>
      </ul>
    </nav>
  );
};
