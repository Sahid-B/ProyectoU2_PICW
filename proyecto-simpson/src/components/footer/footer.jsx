import React from 'react';
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Proyecto Simpson. Creado para Cálculo.</p>
      </div>
    </footer>
  );
};
