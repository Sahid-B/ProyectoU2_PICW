import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Calculadora } from './calculadora';

// Mockeamos servicios que puedan ser llamados por componentes hijos
jest.mock('../../services/db', () => ({
  registrarVisita: jest.fn().mockResolvedValue(true),
  guardarCalculo: jest.fn().mockResolvedValue(true),
}));

describe('Componente Calculadora', () => {
  it('renderiza correctamente sin errores', () => {
    render(<Calculadora />);
    const descripcion = screen.getByText(/La regla de Simpson 1\/3 es un método de integración/i);
    expect(descripcion).toBeInTheDocument();
  });

  it('muestra el título principal', () => {
    render(<Calculadora />);
    const tituloPrincipal = screen.getByRole('heading', { level: 1, name: /Calculadora Simpson 1\/3/i });
    expect(tituloPrincipal).toBeInTheDocument();
  });

  it('muestra la fórmula principal', () => {
    render(<Calculadora />);
    const tituloFormula = screen.getByRole('heading', { level: 3, name: /Fórmula Principal/i });
    expect(tituloFormula).toBeInTheDocument();
  });
});
