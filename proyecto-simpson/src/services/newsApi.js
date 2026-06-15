// ============================================================
// Servicio de noticias — datos mock locales.
// Sin llamadas a APIs externas.
// ============================================================

const _noticias = [
  {
    id: 1,
    titulo: 'La integración numérica y su importancia en la ingeniería moderna',
    descripcion:
      'Los métodos numéricos como Simpson 1/3 siguen siendo fundamentales para resolver problemas de ingeniería que no tienen solución analítica exacta.',
    enlace: 'https://es.wikipedia.org/wiki/Integraci%C3%B3n_num%C3%A9rica',
  },
  {
    id: 2,
    titulo: 'Aplicaciones del cálculo numérico en la ciencia de datos',
    descripcion:
      'El cálculo numérico es la base de muchos algoritmos de machine learning y optimización usados en inteligencia artificial.',
    enlace: 'https://es.wikipedia.org/wiki/M%C3%A9todos_num%C3%A9ricos',
  },
  {
    id: 3,
    titulo: 'Regla de Simpson: historia y origen matemático',
    descripcion:
      'Thomas Simpson publicó su famoso método en 1743. Hoy se usa en áreas como física, economía, medicina y computación.',
    enlace: 'https://es.wikipedia.org/wiki/Regla_de_Simpson',
  },
  {
    id: 4,
    titulo: 'React y el futuro del desarrollo web en educación',
    descripcion:
      'React se ha convertido en una herramienta clave para crear aplicaciones educativas interactivas en universidades de todo el mundo.',
    enlace: 'https://react.dev',
  },
  {
    id: 5,
    titulo: 'Cómo elegir el valor de n en el método de Simpson',
    descripcion:
      'El número de subintervalos n debe ser par. A mayor valor de n, mayor precisión en el resultado de la integral aproximada.',
    enlace: 'https://es.wikipedia.org/wiki/Regla_de_Simpson',
  },
];

/**
 * Devuelve la lista de noticias de matemáticas y métodos numéricos.
 */
export const obtenerNoticiasMatematicas = () => {
  return _noticias;
};
