import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Inicio } from './inicio';

// Mockeamos los servicios para que no intenten conectarse a la BD real
jest.mock('../../services/db', () => ({
  obtenerCalculos: jest.fn().mockResolvedValue([]),
  obtenerContactos: jest.fn().mockResolvedValue([]),
  obtenerVisitas: jest.fn().mockResolvedValue(100),
}));

describe('Componente Inicio', () => {
  it('renderiza correctamente sin errores', async () => {
    render(<Inicio />);
    
    // Esperamos a que se resuelvan las promesas del useEffect
    await waitFor(() => {
      expect(screen.getByText(/Visitas totales al sistema/i)).toBeInTheDocument();
    });
  });

  it('muestra el título principal', () => {
    render(<Inicio />);
    const tituloPrincipal = screen.getByRole('heading', { level: 1, name: /Simpson 1\/3/i });
    expect(tituloPrincipal).toBeInTheDocument();
  });

  it('muestra la sección de Características Principales', () => {
    render(<Inicio />);
    const subtitulo = screen.getByRole('heading', { level: 2, name: /Características Principales/i });
    expect(subtitulo).toBeInTheDocument();
  });
});
