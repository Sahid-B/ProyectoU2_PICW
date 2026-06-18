import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Equipo } from './equipo';

// Mockeamos los servicios para que no intenten conectarse a la BD real
jest.mock('../../services/db', () => ({
  registrarVisita: jest.fn().mockResolvedValue(true),
}));

describe('Componente Equipo', () => {
  it('renderiza correctamente sin errores', () => {
    render(<Equipo />);
    const textoDescripcion = screen.getByText(/Somos estudiantes de Programación Integrativa de Componentes Web/i);
    expect(textoDescripcion).toBeInTheDocument();
  });

  it('muestra el título principal', () => {
    render(<Equipo />);
    const tituloPrincipal = screen.getByRole('heading', { level: 1, name: /Nuestro Equipo/i });
    expect(tituloPrincipal).toBeInTheDocument();
  });

  it('muestra la información de los integrantes', () => {
    render(<Equipo />);
    // Verificamos que se rendericen los nombres de los integrantes
    const integrante1 = screen.getByText(/Jhonny Romero/i);
    const integrante2 = screen.getByText(/Sahid/i);
    
    expect(integrante1).toBeInTheDocument();
    expect(integrante2).toBeInTheDocument();
  });
});
