import { toast } from 'sonner';
import { useProducts } from './data/use-products';
import { formatProductCount } from './domain/format';
import type { ProductDraft } from './domain/product.schema';
import { ProductCardList } from './table/product-card-list';
import { ProductsPagination } from './table/products-pagination';
import { ProductsTable } from './table/products-table';
import { useProductsPagination } from './table/use-products-pagination';
import { AddProductDialog } from './wizard/add-product-dialog';

export function ProductsPage() {
  const { products, addProduct } = useProducts();
  const { page, pageCount, pageSize, setPage } = useProductsPagination(products.length);

  const visibleProducts = products.slice((page - 1) * pageSize, page * pageSize);

  const handleProductAdded = (product: ProductDraft) => {
    addProduct(product);
    toast.success('Produkt został dodany');
  };

  return (
    <main className="mx-auto box-content max-w-310 px-4 py-6 sm:px-6 sm:py-12">
      <header className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <div>
          <h1 className="text-xl font-semibold">Produkty</h1>
          <p className="mt-1 text-sm text-muted-foreground">{formatProductCount(products.length)} w katalogu</p>
        </div>
        <AddProductDialog onProductAdded={handleProductAdded} />
      </header>

      <section aria-label="Lista produktów" className="lg:overflow-hidden lg:rounded-lg lg:border lg:bg-card">
        <div className="hidden lg:block">
          <ProductsTable products={visibleProducts} />
        </div>
        <div className="lg:hidden">
          <ProductCardList products={visibleProducts} />
        </div>
        <div className="pt-6 lg:border-t lg:bg-muted/40 lg:p-4">
          <ProductsPagination
            page={page}
            pageCount={pageCount}
            totalItems={products.length}
            onPageChange={(nextPage) => void setPage(nextPage)}
          />
        </div>
      </section>
    </main>
  );
}
