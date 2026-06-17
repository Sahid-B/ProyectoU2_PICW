import React from 'react';
import styles from './team-card.module.css';

export const TeamCard = ({ imagen, nombre, rol, descripcion }) => {
  return (
    <div className={`card ${styles.equipoCard}`}>
      {imagen ? (
        <img src={imagen} alt={nombre} className={styles.avatar} />
      ) : (
        <div className={styles.avatarPlaceholder}></div>
      )}
      <h2>{nombre}</h2>
      <p className={styles.rolText}>{rol}</p>
      {descripcion && (
        <p className={styles.descripcionText}>
          {descripcion}
        </p>
      )}
    </div>
  );
};
