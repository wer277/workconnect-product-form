import { useState, type ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { useFieldContext } from './form-context';
import { FormField } from './form-field';

type NumberFieldProps = Omit<
  ComponentProps<typeof Input>,
  'value' | 'onChange' | 'onBlur' | 'id' | 'type' | 'inputMode'
> & {
  label: string;
  description?: string;
  mode?: 'decimal' | 'integer';
};

const PATTERNS = {
  decimal: /^\d*([.,]\d{0,2})?$/,
  integer: /^\d*$/,
} as const;

const parse = (text: string) => {
  if (text.trim() === '') return null;
  const value = Number(text.replace(',', '.'));
  return Number.isFinite(value) ? value : null;
};

const format = (value: number | null) => (value === null ? '' : String(value).replace('.', ','));

export function NumberField({ label, description, mode = 'decimal', ...inputProps }: NumberFieldProps) {
  const field = useFieldContext<number | null>();
  const [text, setText] = useState(() => format(field.state.value));

  const displayed = parse(text) === field.state.value ? text : format(field.state.value);

  const handleChange = (next: string) => {
    if (!PATTERNS[mode].test(next)) return;
    setText(next);
    field.handleChange(parse(next));
  };

  return (
    <FormField label={label} description={description}>
      {(control) => (
        <Input
          {...inputProps}
          {...control}
          type="text"
          inputMode={mode === 'decimal' ? 'decimal' : 'numeric'}
          name={field.name}
          value={displayed}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={field.handleBlur}
        />
      )}
    </FormField>
  );
}
