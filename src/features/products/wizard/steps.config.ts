import type { ProductFormValues } from '../domain/product.schema';

type WizardStep = {
  id: string;
  title: string;
  description: string;
  fields: readonly (keyof ProductFormValues)[];
};

export const WIZARD_STEPS = [
  {
    id: 'basic-info',
    title: 'Informacje',
    description: 'Dane podstawowe',
    fields: ['name', 'sku', 'description', 'manufacturer', 'category', 'features'],
  },
  {
    id: 'price',
    title: 'Cena',
    description: 'Dane cenowe',
    fields: ['netPrice', 'grossPrice', 'vatRate', 'currency'],
  },
  {
    id: 'availability',
    title: 'Dostępność',
    description: 'Stany magazynowe',
    fields: ['isAvailable', 'isLimited', 'stockQuantity', 'minPerCart', 'maxPerCart'],
  },
] as const satisfies readonly WizardStep[];

export type WizardStepIndex = 0 | 1 | 2;
export const LAST_STEP: WizardStepIndex = 2;
