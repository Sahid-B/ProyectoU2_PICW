import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Estadisticas } from './estadisticas';

// Mockeamos servicios
jest.mock('../../services/db', () => ({
  registrarVisita: jest.fn().mockResolvedValue(true),
  obtenerVisitas: jest.fn().mockResolvedValue(500),
  obtenerCalculos: jest.fn().mockResolvedValue([
    { id: 1, funcion: 'x^2', a: 0, b: 2, n: 4, resultado: 2.6667 }
  ]),
}));

describe('Componente Estadisticas', () => {
  it('renderiza correctamente sin errores', async () => {
    render(<Estadisticas />);
    
    await waitFor(() => {
      expect(screen.getByText(/visitas registradas en esta sesión/i)).toBeInTheDocument();
    });
  });

  it('muestra el título principal', async () => {
    render(<Estadisticas />);
    const tituloPrincipal = screen.getByRole('heading', { level: 1, name: /Estadísticas/i });
    expect(tituloPrincipal).toBeInTheDocument();
  });

  it('muestra las secciones de estadísticas', async () => {
    render(<Estadisticas />);
    
    expect(screen.getByRole('heading', { level: 2, name: /Total de Visitas/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Últimos Cálculos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Promedio de Resultados/i })).toBeInTheDocument();
    
    // Esperamos a que carguen los datos mockeados
    await waitFor(() => {
      expect(screen.getByText('500')).toBeInTheDocument();
    });
  });
});
