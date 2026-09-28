import { z } from 'zod';
import { CATEGORIES, CURRENCIES, FEATURES, MANUFACTURERS, VAT_RATES } from './options';

const requiredSelect = <const T extends readonly [string, ...string[]]>(values: T, error: string) =>
  z.string().pipe(z.enum(values, { error }));

const fromNullable = <T extends z.ZodType<number, number>>(schema: T) => z.number().nullable().pipe(schema);

export const basicInfoSchema = z.object({
  name: z.string().trim().min(1, 'Nazwa jest wymagana').min(3, 'Nazwa musi mieć co najmniej 3 znaki'),
  sku: z
    .string()
    .trim()
    .min(1, 'SKU jest wymagane')
    .max(24, 'SKU może mieć maksymalnie 24 znaki')
    .regex(/^[A-Za-z0-9]+$/, 'SKU może zawierać tylko litery i cyfry'),
  description: z.string().trim().max(1000, 'Opis może mieć maksymalnie 1000 znaków'),
  manufacturer: requiredSelect(MANUFACTURERS, 'Wybierz producenta'),
  category: requiredSelect(CATEGORIES, 'Wybierz kategorię'),
  features: z.array(z.enum(FEATURES)).min(1, 'Wybierz co najmniej jedną cechę'),
});

export const priceSchema = z.object({
  netPrice: fromNullable(z.number({ error: 'Podaj cenę netto' }).positive('Cena musi być większa od 0')),
  grossPrice: fromNullable(z.number({ error: 'Podaj cenę brutto' }).positive('Cena musi być większa od 0')),
  vatRate: z.literal(VAT_RATES, { error: 'Wybierz stawkę VAT' }),
  currency: requiredSelect(CURRENCIES, 'Wybierz walutę'),
});

const availabilityBaseSchema = z.object({
  isAvailable: z.boolean(),
  isLimited: z.boolean(),
  stockQuantity: z.number().int('Ilość musi być liczbą całkowitą').nonnegative('Ilość nie może być ujemna').nullable(),
  minPerCart: fromNullable(
    z.number({ error: 'Podaj minimalną ilość' }).int('Podaj liczbę całkowitą').min(1, 'Minimum to 1'),
  ),
  maxPerCart: fromNullable(
    z.number({ error: 'Podaj maksymalną ilość' }).int('Podaj liczbę całkowitą').min(1, 'Minimum to 1'),
  ),
});

type AvailabilityValues = z.output<typeof availabilityBaseSchema>;

const refineAvailability = (values: AvailabilityValues, ctx: z.RefinementCtx) => {
  if (values.isLimited && values.stockQuantity === null) {
    ctx.addIssue({ code: 'custom', path: ['stockQuantity'], message: 'Podaj ilość na magazynie' });
  }
  if (values.minPerCart > values.maxPerCart) {
    ctx.addIssue({ code: 'custom', path: ['minPerCart'], message: 'Minimum nie może przekraczać maksimum' });
    ctx.addIssue({ code: 'custom', path: ['maxPerCart'], message: 'Maksimum nie może być mniejsze niż minimum' });
  }
};

export const availabilitySchema = availabilityBaseSchema.superRefine(refineAvailability);

export const productSchema = basicInfoSchema
  .extend(priceSchema.shape)
  .extend(availabilityBaseSchema.shape)
  .superRefine(refineAvailability)
  .transform((product) => ({
    ...product,
    stockQuantity: product.isLimited ? product.stockQuantity : null,
  }));

export type ProductFormValues = z.input<typeof productSchema>;
export type ProductDraft = z.output<typeof productSchema>;
export type Product = ProductDraft & { id: string };
