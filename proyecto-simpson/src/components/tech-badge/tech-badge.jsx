import React from 'react';
import styles from './tech-badge.module.css';

export const TechBadge = ({ icono, nombre }) => {
  return (
    <div className={styles.techBadge}>
      {icono}
      <span>{nombre}</span>
    </div>
  );
};
