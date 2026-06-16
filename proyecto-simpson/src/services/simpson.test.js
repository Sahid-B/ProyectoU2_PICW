import { describe, test, expect } from 'vitest';
import { simpson13 } from './simpson';

describe('simpson13', () => {

  test('caso correcto: integral de x^2 entre 0 y 2 con n=4', () => {
    const resultado = simpson13('x^2', 0, 2, 4);
    // El resultado exacto es 8/3 ≈ 2.6667
    expect(resultado).toBeCloseTo(2.6667, 3);
  });

  test('error si n es impar', () => {
    expect(() => simpson13('x^2', 0, 2, 3)).toThrow();
  });

  test('error si n no es numérico (NaN)', () => {
    expect(() => simpson13('x^2', 0, 2, NaN)).toThrow();
  });

});
