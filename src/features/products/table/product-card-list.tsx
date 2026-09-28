import type { Product } from '../domain/product.schema';
import { getCategoryLabel, getGrossPriceLabel, getStockLabel } from './product-cells';
import { ProductStatusBadge } from './product-status-badge';

function ProductCard({ product }: { product: Product }) {
  return (
    <li className="rounded-lg border bg-card p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium">{product.name}</p>
          <p className="truncate text-xs text-muted-foreground">{product.sku}</p>
        </div>
        <ProductStatusBadge isAvailable={product.isAvailable} />
      </div>
      <dl className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] gap-x-4 gap-y-3 rounded-lg bg-muted/50 p-3 text-sm">
        <div className="grid gap-1">
          <dt className="text-xs text-muted-foreground">Kategoria</dt>
          <dd>{getCategoryLabel(product)}</dd>
        </div>
        <div className="grid gap-1">
          <dt className="text-xs text-muted-foreground">Cena brutto</dt>
          <dd className="font-medium tabular-nums">{getGrossPriceLabel(product)}</dd>
        </div>
        <div className="grid gap-1">
          <dt className="text-xs text-muted-foreground">Magazyn</dt>
          <dd className="tabular-nums">{getStockLabel(product)}</dd>
        </div>
      </dl>
    </li>
  );
}

export function ProductCardList({ products }: { products: readonly Product[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
