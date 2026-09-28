import type { ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { useFieldContext } from './form-context';
import { FormField } from './form-field';

type TextFieldProps = Omit<ComponentProps<typeof Input>, 'value' | 'onChange' | 'onBlur' | 'id'> & {
  label: string;
  description?: string;
};

export function TextField({ label, description, ...inputProps }: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <FormField label={label} description={description}>
      {(control) => (
        <Input
          {...inputProps}
          {...control}
          name={field.name}
          value={field.state.value}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
        />
      )}
    </FormField>
  );
}
