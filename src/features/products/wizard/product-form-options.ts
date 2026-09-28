import { formOptions } from '@tanstack/react-form';
import type { ProductFormValues } from '../domain/product.schema';

export const productFormDefaults: ProductFormValues = {
  name: '',
  sku: '',
  description: '',
  manufacturer: '',
  category: '',
  features: [],
  netPrice: null,
  grossPrice: null,
  vatRate: 23,
  currency: 'PLN',
  isAvailable: true,
  isLimited: false,
  stockQuantity: null,
  minPerCart: 1,
  maxPerCart: 10,
};

export const productFormOptions = formOptions({ defaultValues: productFormDefaults });
