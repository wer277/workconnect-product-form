import { describe, expect, it } from 'vitest';
import { availabilitySchema, basicInfoSchema, priceSchema, productSchema } from './product.schema';
import type { ProductFormValues } from './product.schema';

const validProduct: ProductFormValues = {
  name: 'Lampka biurkowa',
  sku: 'LMP2024',
  description: '',
  manufacturer: 'apple',
  category: 'computers',
  features: ['wifi'],
  netPrice: 100,
  grossPrice: 123,
  vatRate: 23,
  currency: 'PLN',
  isAvailable: true,
  isLimited: false,
  stockQuantity: null,
  minPerCart: 1,
  maxPerCart: 5,
};

const issuePaths = (result: { success: boolean; error?: { issues: { path: PropertyKey[] }[] } }) =>
  result.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('basicInfoSchema', () => {
  it('accepts a valid step', () => {
    expect(basicInfoSchema.safeParse(validProduct).success).toBe(true);
  });

  it.each([
    ['name', 'ab'],
    ['name', '  ab  '],
    ['sku', ''],
    ['sku', 'A'.repeat(25)],
    ['sku', 'ABC 123'],
    ['sku', 'ABC-123'],
    ['sku', 'ŻÓŁW1'],
    ['manufacturer', ''],
    ['category', ''],
  ])('rejects %s = "%s"', (field, value) => {
    const result = basicInfoSchema.safeParse({ ...validProduct, [field]: value });
    expect(issuePaths(result)).toContain(field);
  });

  it.each(['', '   '])('shows the required message first for name = "%s"', (name) => {
    const result = basicInfoSchema.safeParse({ ...validProduct, name });
    expect(result.error?.issues[0]?.message).toBe('Nazwa jest wymagana');
  });

  it('accepts sku with exactly 24 characters', () => {
    expect(basicInfoSchema.safeParse({ ...validProduct, sku: 'A1'.repeat(12) }).success).toBe(true);
  });

  it('requires at least one feature', () => {
    expect(issuePaths(basicInfoSchema.safeParse({ ...validProduct, features: [] }))).toContain('features');
  });
});

describe('priceSchema', () => {
  it('rejects empty prices with a readable message', () => {
    const result = priceSchema.safeParse({ ...validProduct, netPrice: null });
    expect(result.error?.issues[0]?.message).toBe('Podaj cenę netto');
  });

  it('rejects zero price', () => {
    expect(issuePaths(priceSchema.safeParse({ ...validProduct, grossPrice: 0 }))).toContain('grossPrice');
  });
});

describe('availabilitySchema', () => {
  it('requires stock quantity for limited products', () => {
    const result = availabilitySchema.safeParse({ ...validProduct, isLimited: true, stockQuantity: null });
    expect(issuePaths(result)).toEqual(['stockQuantity']);
  });

  it.each([-1, 1.5])('rejects stock quantity %d', (stockQuantity) => {
    const result = availabilitySchema.safeParse({ ...validProduct, isLimited: true, stockQuantity });
    expect(issuePaths(result)).toContain('stockQuantity');
  });

  it('marks both fields when min exceeds max', () => {
    const result = availabilitySchema.safeParse({ ...validProduct, minPerCart: 6, maxPerCart: 5 });
    expect(issuePaths(result)).toEqual(['minPerCart', 'maxPerCart']);
  });

  it('accepts min equal to max', () => {
    expect(availabilitySchema.safeParse({ ...validProduct, minPerCart: 5, maxPerCart: 5 }).success).toBe(true);
  });
});

describe('productSchema', () => {
  it('drops stock quantity when the product is not limited', () => {
    const result = productSchema.parse({ ...validProduct, isLimited: false, stockQuantity: 40 });
    expect(result.stockQuantity).toBeNull();
  });
});
