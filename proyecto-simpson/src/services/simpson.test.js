import { simpson13 } from './simpson';

describe('Pruebas Unitarias: Algoritmo de Simpson 1/3', () => {

  // Comprobamos el camino feliz (Happy Path) con un cálculo matemático conocido.
  // La integral definida de x^2 entre 0 y 2 es exactamente 8/3 (2.666...).
  test('caso correcto: integral de x^2 entre 0 y 2 con n=4', () => {
    const resultado = simpson13('x^2', 0, 2, 4);
    
    // Utilizamos 'toBeCloseTo' en lugar de 'toBe' o 'toEqual' porque
    // estamos trabajando con números de punto flotante y aproximaciones numéricas,
    // por lo que esperamos una exactitud de hasta 3 decimales para evitar fallos por redondeo.
    expect(resultado).toBeCloseTo(2.6667, 3);
  });

  // Validamos el manejo de errores (Caminos Alternativos).
  // Matemáticamente, Simpson 1/3 fallará si los subintervalos (n) son impares.
  test('error si n es impar', () => {
    // Usamos una función anónima dentro de expect para poder capturar 
    // la excepción sin que rompa la ejecución de la prueba.
    expect(() => simpson13('x^2', 0, 2, 3)).toThrow();
  });

  // Validamos escenarios donde se introduzcan tipos de datos incorrectos o nulos.
  test('error si n no es numérico (NaN)', () => {
    expect(() => simpson13('x^2', 0, 2, NaN)).toThrow();
  });

});
