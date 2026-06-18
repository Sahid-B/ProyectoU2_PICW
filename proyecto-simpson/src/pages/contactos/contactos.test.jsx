import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Contactos } from './contactos';

// Mockeamos servicios
jest.mock('../../services/db', () => ({
  registrarVisita: jest.fn().mockResolvedValue(true),
  guardarContacto: jest.fn().mockResolvedValue(true),
}));

describe('Componente Contactos', () => {
  it('renderiza correctamente sin errores', () => {
    render(<Contactos />);
    const descripcion = screen.getByText(/¿Tienes alguna pregunta o comentario\?/i);
    expect(descripcion).toBeInTheDocument();
  });

  it('muestra el título principal', () => {
    render(<Contactos />);
    const tituloPrincipal = screen.getByRole('heading', { level: 1, name: /Contactos/i });
    expect(tituloPrincipal).toBeInTheDocument();
  });

  it('renderiza el formulario correctamente con sus campos principales', () => {
    render(<Contactos />);
    
    // Verificamos que existen los inputs principales buscando por placeholder o label
    expect(screen.getByPlaceholderText(/Tu nombre completo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu@correo.com/i)).toBeInTheDocument();
    
    // Verificamos que exista el botón de envío
    const botonEnviar = screen.getByRole('button', { name: /Enviar Mensaje/i });
    expect(botonEnviar).toBeInTheDocument();
  });
});
