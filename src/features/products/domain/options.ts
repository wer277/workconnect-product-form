import type { Option } from '@/lib/option';

export const MANUFACTURERS = ['apple', 'samsung', 'sony', 'bosch', 'xiaomi', 'lenovo'] as const;
export type Manufacturer = (typeof MANUFACTURERS)[number];

export const MANUFACTURER_LABELS: Record<Manufacturer, string> = {
  apple: 'Apple',
  samsung: 'Samsung',
  sony: 'Sony',
  bosch: 'Bosch',
  xiaomi: 'Xiaomi',
  lenovo: 'Lenovo',
};

export const CATEGORIES = ['computers', 'phones', 'rtv', 'agd', 'accessories'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  computers: 'Komputery',
  phones: 'Telefony',
  rtv: 'RTV',
  agd: 'AGD',
  accessories: 'Akcesoria',
};

export const FEATURES = ['bluetooth', 'wifi', 'usbC', 'waterproof', 'wireless', 'eco', 'premium'] as const;
export type Feature = (typeof FEATURES)[number];

export const FEATURE_LABELS: Record<Feature, string> = {
  bluetooth: 'Bluetooth',
  wifi: 'WiFi',
  usbC: 'USB-C',
  waterproof: 'Wodoodporny',
  wireless: 'Bezprzewodowy',
  eco: 'Ekologiczny',
  premium: 'Premium',
};

export const VAT_RATES = [0, 5, 8, 23] as const;
export type VatRate = (typeof VAT_RATES)[number];

export const CURRENCIES = ['PLN', 'EUR', 'USD'] as const;
export type Currency = (typeof CURRENCIES)[number];

const toOptions = <T extends string>(values: readonly T[], labels: Record<T, string>): Option<T>[] =>
  values.map((value) => ({ value, label: labels[value] }));

export const MANUFACTURER_OPTIONS = toOptions(MANUFACTURERS, MANUFACTURER_LABELS);
export const CATEGORY_OPTIONS = toOptions(CATEGORIES, CATEGORY_LABELS);
export const FEATURE_OPTIONS = toOptions(FEATURES, FEATURE_LABELS);
export const CURRENCY_OPTIONS: Option<Currency>[] = CURRENCIES.map((value) => ({ value, label: value }));
export const VAT_OPTIONS: Option<VatRate>[] = VAT_RATES.map((value) => ({ value, label: `${value}%` }));
