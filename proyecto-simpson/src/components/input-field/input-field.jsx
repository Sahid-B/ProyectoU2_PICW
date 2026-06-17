import React from 'react';
import styles from './input-field.module.css';

export const InputField = ({ id, label, type = 'text', placeholder, value, onChange, required, rows }) => {
  return (
    <div className={styles.campo}>
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows || 5}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};
