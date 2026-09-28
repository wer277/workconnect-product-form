export type PriceSource = 'net' | 'gross';

const toMinor = (amount: number) => Math.round((amount + Number.EPSILON) * 100);
const fromMinor = (minor: number) => minor / 100;

export const grossFromNet = (net: number, vatRate: number) =>
  fromMinor(Math.round((toMinor(net) * (100 + vatRate)) / 100));

export const netFromGross = (gross: number, vatRate: number) =>
  fromMinor(Math.round((toMinor(gross) * 100) / (100 + vatRate)));
