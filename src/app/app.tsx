import { NuqsAdapter } from 'nuqs/adapters/react';
import { Toaster } from '@/components/ui/sonner';
import { ProductsPage } from '@/features/products/products-page';

export function App() {
  return (
    <NuqsAdapter>
      <ProductsPage />
      <Toaster position="bottom-right" />
    </NuqsAdapter>
  );
}
