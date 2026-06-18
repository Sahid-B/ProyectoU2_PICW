/**
 * Servicio para calcular la integral definida usando el método de Simpson 1/3
 */

// Exportamos la función que implementa el algoritmo de Simpson 1/3
// Recibe la expresión de la función como texto, el límite inferior (a), superior (b) y número de intervalos (n)
export const simpson13 = (funcionStr, a, b, n) => {
  // Validación estricta matemática: El método de Simpson 1/3 
  // requiere obligatoriamente un número par de subintervalos.
  // Comprobamos si el residuo de n entre 2 no es cero (lo que significa que es impar)
  if (n % 2 !== 0) {
    // Si es impar, lanzamos un error deteniendo la ejecución porque la fórmula no aplica
    throw new Error("El número de segmentos (n) debe ser un número par.");
  }
  // También comprobamos que n sea un número positivo, ya que no puede haber intervalos nulos o negativos
  if (n <= 0) {
    // Lanzamos error si n no es válido
    throw new Error("El número de segmentos (n) debe ser mayor que 0.");
  }

  // Preprocesamiento de la cadena: Reemplazamos el operador matemático '^'
  // por '**' nativo de JavaScript para evitar errores de sintaxis en la evaluación.
  // Usamos una expresión regular global para cambiar todos los '^'
  const expresionJS = funcionStr.replace(/\^/g, '**');
  
  // Compilamos la función en tiempo de ejecución. 
  // Usamos 'with(Math)' para que el usuario pueda ingresar funciones como 'sin(x)' 
  // en lugar de obligarlo a escribir 'Math.sin(x)'.
  // Definimos una función (lambda) interna f(x)
  const f = (x) => {
    // Bloque try para capturar errores de sintaxis en la expresión de la función que puso el usuario
    try {
      // eslint-disable-next-line no-new-func
      // Utilizamos el constructor Function para crear dinámicamente el bloque de código evaluable
      // Incorporamos la sintaxis 'with(Math)' para incluir las funciones y constantes matemáticas por defecto
      const func = new Function('x', `with(Math) { return ${expresionJS}; }`);
      // Ejecutamos la función dinámica generada pasando el valor 'x'
      return func(x);
    // Si la cadena tenía una sintaxis incorrecta, atrapamos el error
    } catch (error) {
      // Lanzamos un nuevo error avisando sobre el fallo en la evaluación de la expresión
      throw new Error(`Error al evaluar la función: ${expresionJS}`);
    }
  };

  // Tamaño de cada subintervalo
  // El ancho 'h' es igual a la diferencia de los límites dividida entre n
  const h = (b - a) / n;
  
  // Inicializamos una variable para sumar los valores donde el índice es impar
  let sumaImpares = 0;
  // Inicializamos una variable para sumar los valores donde el índice es par
  let sumaPares = 0;

  // Bucle principal de sumatorias
  // Acumulamos de forma separada los índices pares e impares para aplicar la fórmula
  // Comenzamos desde i = 1 y terminamos en i < n (los límites externos 0 y n se manejan luego)
  for (let i = 1; i < n; i++) {
    // Calculamos el valor actual de x_i (punto de evaluación)
    const xi = a + i * h;
    // Verificamos si el índice actual 'i' es par
    if (i % 2 === 0) {
      // Si es par, calculamos f(x_i) y lo acumulamos en la suma de pares
      sumaPares += f(xi);
    // Si no es par, entonces es impar
    } else {
      // Calculamos f(x_i) y lo acumulamos en la suma de impares
      sumaImpares += f(xi);
    }
  }

  // Aplicamos la fórmula matemática de integración de Simpson 1/3
  // Resultado = (h / 3) * [f(x_0) + 4 * sumatoria_impares + 2 * sumatoria_pares + f(x_n)]
  const resultado = (h / 3) * (f(a) + 4 * sumaImpares + 2 * sumaPares + f(b));
  // Retornamos el área calculada por el algoritmo
  return resultado;
};
