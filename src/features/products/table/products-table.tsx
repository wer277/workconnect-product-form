import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Product } from '../domain/product.schema';
import { getCategoryLabel, getGrossPriceLabel, getStockLabel } from './product-cells';
import { ProductStatusBadge } from './product-status-badge';

export function ProductsTable({ products }: { products: readonly Product[] }) {
  return (
    <Table className="table-fixed">
      <TableHeader className="bg-muted/40">
        <TableRow>
          <TableHead className="w-2/7">Nazwa</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Kategoria</TableHead>
          <TableHead>Cena Brutto</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Magazyn</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="truncate font-medium" title={product.name}>
              {product.name}
            </TableCell>
            <TableCell className="truncate text-xs text-muted-foreground" title={product.sku}>
              {product.sku}
            </TableCell>
            <TableCell className="text-muted-foreground">{getCategoryLabel(product)}</TableCell>
            <TableCell className="font-medium tabular-nums">{getGrossPriceLabel(product)}</TableCell>
            <TableCell>
              <ProductStatusBadge isAvailable={product.isAvailable} />
            </TableCell>
            <TableCell className="tabular-nums">{getStockLabel(product)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
