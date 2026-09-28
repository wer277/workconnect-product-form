import { useRef } from 'react';
import { withForm } from '@/components/form/form-hook';
import { CURRENCY_OPTIONS, VAT_OPTIONS } from '../../domain/options';
import { grossFromNet, netFromGross } from '../../domain/pricing';
import { priceSchema } from '../../domain/product.schema';
import { productFormOptions } from '../product-form-options';
import { validateAgainstStep } from '../step-validator';

type PriceSource = 'net' | 'gross';

const silentUpdate = { dontRunListeners: true, dontUpdateMeta: true } as const;

export const PriceStep = withForm({
  ...productFormOptions,
  render: function PriceStep({ form }) {
    const lastEdited = useRef<PriceSource>('net');

    const syncGross = (net: number | null, vatRate: number) =>
      form.setFieldValue('grossPrice', net === null ? null : grossFromNet(net, vatRate), silentUpdate);

    const syncNet = (gross: number | null, vatRate: number) =>
      form.setFieldValue('netPrice', gross === null ? null : netFromGross(gross, vatRate), silentUpdate);

    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <form.AppField
          name="netPrice"
          validators={{ onChange: validateAgainstStep(priceSchema, 'netPrice') }}
          listeners={{
            onChange: ({ value }) => {
              lastEdited.current = 'net';
              syncGross(value, form.getFieldValue('vatRate'));
            },
          }}
        >
          {(field) => <field.NumberField label="Cena netto" placeholder="0.00" />}
        </form.AppField>

        <form.AppField
          name="grossPrice"
          validators={{ onChange: validateAgainstStep(priceSchema, 'grossPrice') }}
          listeners={{
            onChange: ({ value }) => {
              lastEdited.current = 'gross';
              syncNet(value, form.getFieldValue('vatRate'));
            },
          }}
        >
          {(field) => <field.NumberField label="Cena brutto" placeholder="0.00" />}
        </form.AppField>

        <form.AppField
          name="vatRate"
          validators={{ onChange: validateAgainstStep(priceSchema, 'vatRate') }}
          listeners={{
            onChange: ({ value }) => {
              if (lastEdited.current === 'net') syncGross(form.getFieldValue('netPrice'), value);
              else syncNet(form.getFieldValue('grossPrice'), value);
            },
          }}
        >
          {(field) => <field.SelectField label="Stawka VAT" options={VAT_OPTIONS} />}
        </form.AppField>

        <form.AppField name="currency" validators={{ onChange: validateAgainstStep(priceSchema, 'currency') }}>
          {(field) => <field.SelectField label="Waluta" options={CURRENCY_OPTIONS} />}
        </form.AppField>
      </div>
    );
  },
});
