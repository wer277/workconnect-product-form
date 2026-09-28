import { formatPrice } from '../domain/format';
import { CATEGORY_LABELS } from '../domain/options';
import type { Product } from '../domain/product.schema';

export const EMPTY_VALUE = '—';

export const getCategoryLabel = (product: Product) => CATEGORY_LABELS[product.category];

export const getGrossPriceLabel = (product: Product) => formatPrice(product.grossPrice, product.currency);

export const getStockLabel = (product: Product) =>
  product.isLimited && product.stockQuantity !== null ? String(product.stockQuantity) : EMPTY_VALUE;
