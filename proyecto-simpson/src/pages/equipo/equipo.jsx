import React, { useEffect } from 'react';
import { registrarVisita } from '../../services/db';

const integrantes = [
  { id: 1, nombre: 'Jhonny Romero', rol: 'Desarrollo de las páginas Equipo, Bibliografía y Noticias' },
  { id: 2, nombre: 'Sahid',         rol: 'Página Inicio, base de datos, servicios y calculadora Simpson 1/3' },
];

export const Equipo = () => {
  useEffect(() => {
    registrarVisita('Equipo').catch(() => { });
  }, []);

  return (
    <div className="container">
      <h1>Nuestro Equipo</h1>
      <p>
        Somos estudiantes de Programación Integrativa de Componentes Web.
        Este proyecto fue desarrollado como parte del Parcial 2.
      </p>

      <div className="grid-2">
        {integrantes.map((integrante) => (
          <div key={integrante.id} className="card">
            <h2>{integrante.nombre}</h2>
            <p>{integrante.rol}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
