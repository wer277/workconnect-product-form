import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { ProductDraft } from '../domain/product.schema';
import { ProductWizard } from './product-wizard';

export function AddProductDialog({ onProductAdded }: { onProductAdded: (product: ProductDraft) => void }) {
  const [open, setOpen] = useState(false);
  const [wizardKey, setWizardKey] = useState(0);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setWizardKey((key) => key + 1);
    setOpen(nextOpen);
  };

  const handleComplete = (product: ProductDraft) => {
    onProductAdded(product);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Dodaj produkt
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0 max-sm:h-dvh max-sm:max-h-dvh max-sm:max-w-none max-sm:rounded-none max-sm:border-0 sm:max-w-180">
        <DialogHeader className="mx-4 border-b pt-5 pb-3 text-left sm:mx-0 sm:px-4 sm:py-5">
          <DialogTitle className="text-base font-medium">Dodaj nowy produkt</DialogTitle>
          <DialogDescription className="sr-only">
            Formularz dodawania produktu w trzech krokach: informacje, cena, dostępność.
          </DialogDescription>
        </DialogHeader>
        <ProductWizard key={wizardKey} onComplete={handleComplete} />
      </DialogContent>
    </Dialog>
  );
}
