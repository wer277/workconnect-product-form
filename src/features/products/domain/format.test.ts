import { describe, expect, it } from 'vitest';
import { formatPrice, formatProductCount } from './format';

const normalizeSpaces = (text: string) => text.replace(/\s/g, ' ');

describe('formatPrice', () => {
  it.each([
    [9999, 'PLN', '9999,00 PLN'],
    [179, 'PLN', '179,00 PLN'],
    [12345.5, 'EUR', '12 345,50 EUR'],
  ] as const)('formats %d %s', (amount, currency, expected) => {
    expect(normalizeSpaces(formatPrice(amount, currency))).toBe(expected);
  });
});

describe('formatProductCount', () => {
  it.each([
    [1, '1 produkt'],
    [2, '2 produkty'],
    [5, '5 produktów'],
    [7, '7 produktów'],
    [22, '22 produkty'],
  ])('%d', (count, expected) => {
    expect(formatProductCount(count)).toBe(expected);
  });
});
