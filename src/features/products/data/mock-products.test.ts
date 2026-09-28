import { describe, expect, it } from 'vitest';
import { grossFromNet } from '../domain/pricing';
import { productSchema } from '../domain/product.schema';
import { MOCK_PRODUCTS } from './mock-products';

describe('MOCK_PRODUCTS', () => {
  it.each(MOCK_PRODUCTS)('$sku is a valid product', (product) => {
    expect(productSchema.safeParse(product).success).toBe(true);
  });

  it.each(MOCK_PRODUCTS)('$sku has consistent prices', ({ netPrice, grossPrice, vatRate }) => {
    expect(grossFromNet(netPrice, vatRate)).toBeCloseTo(grossPrice, 1);
  });
});
