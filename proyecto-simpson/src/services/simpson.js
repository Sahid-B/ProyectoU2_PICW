/**
 * Servicio para calcular la integral definida usando el método de Simpson 1/3
 */

export const simpson13 = (funcionStr, a, b, n) => {
  // Validación estricta matemática: El método de Simpson 1/3 
  // requiere obligatoriamente un número par de subintervalos.
  if (n % 2 !== 0) {
    throw new Error("El número de segmentos (n) debe ser un número par.");
  }
  if (n <= 0) {
    throw new Error("El número de segmentos (n) debe ser mayor que 0.");
  }

  // Preprocesamiento de la cadena: Reemplazamos el operador matemático '^'
  // por '**' nativo de JavaScript para evitar errores de sintaxis en la evaluación.
  const expresionJS = funcionStr.replace(/\^/g, '**');
  
  // Compilamos la función en tiempo de ejecución. 
  // Usamos 'with(Math)' para que el usuario pueda ingresar funciones como 'sin(x)' 
  // en lugar de obligarlo a escribir 'Math.sin(x)'.
  const f = (x) => {
    try {
      // eslint-disable-next-line no-new-func
      const func = new Function('x', `with(Math) { return ${expresionJS}; }`);
      return func(x);
    } catch (error) {
      throw new Error(`Error al evaluar la función: ${expresionJS}`);
    }
  };

  // Tamaño de cada subintervalo
  const h = (b - a) / n;
  
  let sumaImpares = 0;
  let sumaPares = 0;

  // Bucle principal de sumatorias
  // Acumulamos de forma separada los índices pares e impares para aplicar la fórmula
  for (let i = 1; i < n; i++) {
    const xi = a + i * h;
    if (i % 2 === 0) {
      sumaPares += f(xi);
    } else {
      sumaImpares += f(xi);
    }
  }

  // Aplicamos la fórmula matemática de integración de Simpson 1/3
  const resultado = (h / 3) * (f(a) + 4 * sumaImpares + 2 * sumaPares + f(b));
  return resultado;
};
