import { Separator } from '@/components/ui/separator';
import { withForm } from '@/components/form/form-hook';
import { availabilitySchema } from '../../domain/product.schema';
import { productFormOptions } from '../product-form-options';
import { validateAgainstStep } from '../step-validator';

export const AvailabilityStep = withForm({
  ...productFormOptions,
  render: function AvailabilityStep({ form }) {
    return (
      <div className="grid gap-4">
        <form.AppField name="isAvailable">
          {(field) => <field.SwitchField label="Produkt jest dostępny" />}
        </form.AppField>

        <Separator />

        <form.AppField
          name="isLimited"
          listeners={{
            onChange: ({ value }) => {
              if (!value) form.setFieldValue('stockQuantity', null, { dontUpdateMeta: true });
            },
          }}
        >
          {(field) => <field.CheckboxField label="Produkt limitowany" />}
        </form.AppField>

        <form.Subscribe selector={(state) => state.values.isLimited}>
          {(isLimited) =>
            isLimited && (
              <div className="grid gap-4 sm:grid-cols-2">
                <form.AppField
                  name="stockQuantity"
                  validators={{ onChange: validateAgainstStep(availabilitySchema, 'stockQuantity') }}
                >
                  {(field) => <field.NumberField label="Ilość na magazynie" mode="integer" placeholder="0" />}
                </form.AppField>
              </div>
            )
          }
        </form.Subscribe>

        <Separator />

        <fieldset className="grid gap-4">
          <legend className="mb-4 font-medium">Limity koszyka</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <form.AppField
              name="minPerCart"
              validators={{
                onChangeListenTo: ['maxPerCart'],
                onChange: validateAgainstStep(availabilitySchema, 'minPerCart'),
              }}
            >
              {(field) => <field.NumberField label="Minimalna ilość" mode="integer" />}
            </form.AppField>

            <form.AppField
              name="maxPerCart"
              validators={{
                onChangeListenTo: ['minPerCart'],
                onChange: validateAgainstStep(availabilitySchema, 'maxPerCart'),
              }}
            >
              {(field) => <field.NumberField label="Maksymalna ilość" mode="integer" />}
            </form.AppField>
          </div>
        </fieldset>
      </div>
    );
  },
});
