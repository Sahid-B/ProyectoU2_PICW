import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Noticias } from './noticias';

// Mockeamos servicios
jest.mock('../../services/db', () => ({
  registrarVisita: jest.fn().mockResolvedValue(true),
}));

jest.mock('../../services/newsApi', () => ({
  obtenerNoticiasMatematicas: jest.fn().mockResolvedValue([
    {
      id: 1,
      titulo: 'Noticia de Prueba',
      autor: 'Autor de Prueba',
      fecha: '2023-01-01',
      descripcion: 'Descripción de prueba',
      enlace: 'http://ejemplo.com'
    }
  ])
}));

describe('Componente Noticias', () => {
  it('renderiza correctamente sin errores', async () => {
    render(<Noticias />);
    
    await waitFor(() => {
      expect(screen.getByText(/Noticia de Prueba/i)).toBeInTheDocument();
    });
  });

  it('muestra el título principal', async () => {
    render(<Noticias />);
    const tituloPrincipal = screen.getByRole('heading', { level: 1, name: /Noticias/i });
    expect(tituloPrincipal).toBeInTheDocument();
  });
});
