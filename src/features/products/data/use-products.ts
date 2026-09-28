import { useState } from 'react';
import type { Product, ProductDraft } from '../domain/product.schema';
import { MOCK_PRODUCTS } from './mock-products';

export function useProducts(initialProducts: readonly Product[] = MOCK_PRODUCTS) {
  const [products, setProducts] = useState<readonly Product[]>(initialProducts);

  const addProduct = (draft: ProductDraft) =>
    setProducts((current) => [...current, { ...draft, id: crypto.randomUUID() }]);

  return { products, addProduct };
}
