import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Acerca } from './acerca';

// Mockeamos los servicios
jest.mock('../../services/db', () => ({
  registrarVisita: jest.fn().mockResolvedValue(true),
}));

describe('Componente Acerca', () => {
  it('renderiza correctamente sin errores', () => {
    render(<Acerca />);
    const textoSubtitulo = screen.getByText(/Un desarrollo enfocado en la integración de tecnologías web modernas/i);
    expect(textoSubtitulo).toBeInTheDocument();
  });

  it('muestra el título principal', () => {
    render(<Acerca />);
    const tituloPrincipal = screen.getByRole('heading', { level: 1, name: /Acerca del Proyecto/i });
    expect(tituloPrincipal).toBeInTheDocument();
  });

  it('muestra la sección del stack tecnológico', () => {
    render(<Acerca />);
    const tituloStack = screen.getByRole('heading', { level: 2, name: /Stack Tecnológico/i });
    expect(tituloStack).toBeInTheDocument();
    
    // Verificamos que aparezcan algunas de las tecnologías
    expect(screen.getByText(/React 19/i)).toBeInTheDocument();
    expect(screen.getByText(/Vite/i)).toBeInTheDocument();
  });
});
