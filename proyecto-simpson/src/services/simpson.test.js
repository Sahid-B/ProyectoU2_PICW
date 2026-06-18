// Importamos la función del algoritmo de simpson13 desde el archivo principal
import { simpson13 } from './simpson';

// Declaramos un bloque descriptivo (describe) para agrupar todas las pruebas relacionadas al algoritmo de Simpson
describe('Pruebas Unitarias: Algoritmo de Simpson 1/3', () => {

  // Comprobamos el camino feliz (Happy Path) con un cálculo matemático conocido.
  // La integral definida de x^2 entre 0 y 2 es exactamente 8/3 (2.666...).
  // Definimos un caso de prueba individual con test()
  test('caso correcto: integral de x^2 entre 0 y 2 con n=4', () => {
    // Ejecutamos la función de prueba enviando 'x^2', límite a=0, b=2, y número de segmentos par n=4
    const resultado = simpson13('x^2', 0, 2, 4);
    
    // Utilizamos 'toBeCloseTo' en lugar de 'toBe' o 'toEqual' porque
    // estamos trabajando con números de punto flotante y aproximaciones numéricas,
    // por lo que esperamos una exactitud de hasta 3 decimales para evitar fallos por redondeo.
    // Validamos que el resultado esté cerca del valor analítico 2.6667 con precisión de 3 decimales
    expect(resultado).toBeCloseTo(2.6667, 3);
  });

  // Validamos el manejo de errores (Caminos Alternativos).
  // Matemáticamente, Simpson 1/3 fallará si los subintervalos (n) son impares.
  // Definimos otro test para evaluar qué sucede cuando ocurre esta situación
  test('error si n es impar', () => {
    // Usamos una función anónima dentro de expect para poder capturar 
    // la excepción sin que rompa la ejecución de la prueba.
    // Verificamos que al usar n=3 (impar), el método lance explícitamente un error con toThrow()
    expect(() => simpson13('x^2', 0, 2, 3)).toThrow();
  });

  // Validamos escenarios donde se introduzcan tipos de datos incorrectos o nulos.
  // Definimos un tercer caso de prueba
  test('error si n no es numérico (NaN)', () => {
    // Pasamos un valor no numérico 'NaN' en la posición de los intervalos (n)
    // El método debería fallar, por lo que esperamos que se levante un Error y toThrow() retorne exitoso
    expect(() => simpson13('x^2', 0, 2, NaN)).toThrow();
  });

});
