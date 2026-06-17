import React, { useEffect } from 'react';
import { registrarVisita } from '../../services/db';
import { TeamCard } from '../../components';
import styles from './equipo.module.css';

const integrantes = [
  { 
    id: 1, 
    nombre: 'Jhonny Romero', 
    rol: 'Desarrollo de las páginas Equipo, Bibliografía y Noticias',
    imagen: 'https://i.postimg.cc/WbyFPmyP/image.png',
    descripcion: 'Encargado de la maquetación y estructura de las secciones informativas del proyecto. Apasionado por el desarrollo web y el diseño de interfaces limpias y usables.'
  },
  { 
    id: 2, 
    nombre: 'Sahid',         
    rol: 'Página Inicio, base de datos, servicios y calculadora Simpson 1/3', 
    imagen: 'https://i.postimg.cc/x8TYX7cw/image.png',
    descripcion: 'Especialista en React, HTML, CSS y JS. Con gran experiencia en automatizaciones y en la creación de arquitecturas de microservicios, tanto utilizando contenedores (Docker) como máquinas virtuales.'
  },
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
        Este proyecto fue desarrollado como parte del Parcial 2, combinando 
        conocimientos matemáticos con desarrollo de software moderno.
      </p>

      <div className="grid-2">
        {integrantes.map((integrante) => (
          <TeamCard 
            key={integrante.id}
            nombre={integrante.nombre}
            rol={integrante.rol}
            imagen={integrante.imagen}
            descripcion={integrante.descripcion}
          />
        ))}
      </div>
    </div>
  );
};
