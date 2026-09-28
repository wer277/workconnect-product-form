import { withForm } from '@/components/form/form-hook';
import { CATEGORY_OPTIONS, FEATURE_OPTIONS, MANUFACTURER_OPTIONS } from '../../domain/options';
import { basicInfoSchema } from '../../domain/product.schema';
import { productFormOptions } from '../product-form-options';
import { validateAgainstStep } from '../step-validator';

export const BasicInfoStep = withForm({
  ...productFormOptions,
  render: function BasicInfoStep({ form }) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <form.AppField name="name" validators={{ onChange: validateAgainstStep(basicInfoSchema, 'name') }}>
          {(field) => <field.TextField label="Nazwa produktu" placeholder="np. MacBook Pro 14" />}
        </form.AppField>

        <form.AppField name="sku" validators={{ onChange: validateAgainstStep(basicInfoSchema, 'sku') }}>
          {(field) => <field.TextField label="SKU produktu" placeholder="np. MBP14M3PRO" maxLength={24} />}
        </form.AppField>

        <div className="sm:col-span-2">
          <form.AppField
            name="description"
            validators={{ onChange: validateAgainstStep(basicInfoSchema, 'description') }}
          >
            {(field) => <field.TextareaField label="Opis produktu" placeholder="Krótki opis produktu" />}
          </form.AppField>
        </div>

        <form.AppField
          name="manufacturer"
          validators={{ onChange: validateAgainstStep(basicInfoSchema, 'manufacturer') }}
        >
          {(field) => (
            <field.SelectField label="Producent" placeholder="Wybierz producenta" options={MANUFACTURER_OPTIONS} />
          )}
        </form.AppField>

        <form.AppField name="category" validators={{ onChange: validateAgainstStep(basicInfoSchema, 'category') }}>
          {(field) => (
            <field.SelectField label="Kategoria" placeholder="Wybierz kategorię" options={CATEGORY_OPTIONS} />
          )}
        </form.AppField>

        <div className="sm:col-span-2">
          <form.AppField name="features" validators={{ onChange: validateAgainstStep(basicInfoSchema, 'features') }}>
            {(field) => <field.ChipsField label="Cechy produktu" options={FEATURE_OPTIONS} />}
          </form.AppField>
        </div>
      </div>
    );
  },
});
