import type { Currency } from './options';

const priceFormatters = new Map<Currency, Intl.NumberFormat>();

export const formatPrice = (amount: number, currency: Currency) => {
  let formatter = priceFormatters.get(currency);
  if (!formatter) {
    formatter = new Intl.NumberFormat('pl-PL', { style: 'currency', currency, currencyDisplay: 'code' });
    priceFormatters.set(currency, formatter);
  }
  return formatter.format(amount);
};

const pluralRules = new Intl.PluralRules('pl-PL');

const PRODUCT_FORMS: Record<Intl.LDMLPluralRule, string> = {
  zero: 'produktów',
  one: 'produkt',
  two: 'produkty',
  few: 'produkty',
  many: 'produktów',
  other: 'produktu',
};

export const formatProductCount = (count: number) => `${count} ${PRODUCT_FORMS[pluralRules.select(count)]}`;
