import { describe, expect, it } from 'vitest';
import { grossFromNet, netFromGross } from './pricing';

describe('grossFromNet', () => {
  it.each([
    [100, 23, 123],
    [100, 8, 108],
    [100, 0, 100],
    [9.99, 23, 12.29],
    [0.01, 23, 0.01],
    [1.005, 23, 1.24],
  ])('%d netto + %d%% VAT = %d brutto', (net, vat, gross) => {
    expect(grossFromNet(net, vat)).toBe(gross);
  });
});

describe('netFromGross', () => {
  it.each([
    [123, 23, 100],
    [108, 8, 100],
    [100, 0, 100],
    [12.29, 23, 9.99],
  ])('%d brutto - %d%% VAT = %d netto', (gross, vat, net) => {
    expect(netFromGross(gross, vat)).toBe(net);
  });
});
