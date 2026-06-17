import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './navbar';

describe('Componente Navbar', () => {
  test('debe renderizar correctamente los enlaces de navegación', () => {
    // Al usar react-router, los componentes de enlace deben envolverse en un Router
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verificamos que el título/logo "Simpson 1/3" aparezca
    expect(screen.getByText('Simpson 1/3')).toBeInTheDocument();

    // Verificamos que los enlaces principales estén presentes
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Calculadora')).toBeInTheDocument();
    expect(screen.getByText('Estadísticas')).toBeInTheDocument();
  });
});
