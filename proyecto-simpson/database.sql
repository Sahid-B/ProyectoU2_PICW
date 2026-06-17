CREATE DATABASE IF NOT EXISTS simpson_db;
USE simpson_db;

CREATE TABLE IF NOT EXISTS calculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    funcion VARCHAR(255) NOT NULL,
    a DOUBLE NOT NULL,
    b DOUBLE NOT NULL,
    n INT NOT NULL,
    resultado DOUBLE NOT NULL,
    fecha DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS visitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pagina VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS funciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expresion VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL
);

-- Insertar funciones de ejemplo
INSERT INTO funciones (expresion, descripcion) VALUES
('x^2', 'Función cuadrática'),
('x^3', 'Función cúbica'),
('Math.sin(x)', 'Seno de x'),
('Math.cos(x)', 'Coseno de x'),
('Math.exp(x)', 'Exponencial de x');

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    numero VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(255) NOT NULL UNIQUE,
      contrasena VARCHAR(255) NOT NULL,
      nombre VARCHAR(255) NOT NULL,
      correo VARCHAR(255) NOT NULL,
      numero VARCHAR(50) NOT NULL);