/**
 * Servicio para calcular la integral definida usando el método de Simpson 1/3
 */

export const simpson13 = (funcionStr, a, b, n) => {
  // Validar que n sea par
  if (n % 2 !== 0) {
    throw new Error("El número de segmentos (n) debe ser un número par.");
  }
  if (n <= 0) {
    throw new Error("El número de segmentos (n) debe ser mayor que 0.");
  }

  // Preprocesar la función para convertir x^2 a x**2 de JS, y permitir uso de Math
  const expresionJS = funcionStr.replace(/\^/g, '**');
  
  // Crear función evaluadora
  // Se usa 'Math' directamente o las funciones dentro de Math si es necesario
  const f = (x) => {
    try {
      // eslint-disable-next-line no-new-func
      const func = new Function('x', `with(Math) { return ${expresionJS}; }`);
      return func(x);
    } catch (error) {
      throw new Error(`Error al evaluar la función: ${expresionJS}`);
    }
  };

  const h = (b - a) / n;
  
  let sumaImpares = 0;
  let sumaPares = 0;

  for (let i = 1; i < n; i++) {
    const xi = a + i * h;
    if (i % 2 === 0) {
      sumaPares += f(xi);
    } else {
      sumaImpares += f(xi);
    }
  }

  const resultado = (h / 3) * (f(a) + 4 * sumaImpares + 2 * sumaPares + f(b));
  return resultado;
};
