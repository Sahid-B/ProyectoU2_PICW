import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Login } from './login';

// Mockeamos el router de react y los servicios
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../services/db', () => ({
  iniciarSesion: jest.fn().mockResolvedValue({ usuario: 'test', nombre: 'Test User' }),
  registrarUsuario: jest.fn().mockResolvedValue(true),
}));

describe('Componente Login', () => {
  it('renderiza correctamente sin errores', () => {
    render(<Login />);
    const textoSubtitulo = screen.getByText(/Ingresa tus credenciales para continuar/i);
    expect(textoSubtitulo).toBeInTheDocument();
  });

  it('muestra el título de Iniciar Sesión por defecto', () => {
    render(<Login />);
    const tituloPrincipal = screen.getByRole('heading', { level: 1, name: /Iniciar Sesión/i });
    expect(tituloPrincipal).toBeInTheDocument();
  });

  it('muestra los campos básicos para inicio de sesión', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/ej. Sahid123/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    
    const botonIngresar = screen.getByRole('button', { name: /Ingresar al sistema/i });
    expect(botonIngresar).toBeInTheDocument();
  });

  it('permite cambiar a la vista de registro', () => {
    render(<Login />);
    
    // Buscar y clickear el botón de cambiar vista
    const botonCambiar = screen.getByText(/Regístrate aquí/i);
    fireEvent.click(botonCambiar);
    
    // Verificar que cambió el título a Crear Cuenta
    const tituloPrincipal = screen.getByRole('heading', { level: 1, name: /Crear Cuenta/i });
    expect(tituloPrincipal).toBeInTheDocument();
    
    // Verificar que aparece el campo adicional
    expect(screen.getByPlaceholderText(/correo@ejemplo.com/i)).toBeInTheDocument();
  });
});
