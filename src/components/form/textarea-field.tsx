import type { ComponentProps } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useFieldContext } from './form-context';
import { FormField } from './form-field';

type TextareaFieldProps = Omit<ComponentProps<typeof Textarea>, 'value' | 'onChange' | 'onBlur' | 'id'> & {
  label: string;
  description?: string;
};

export function TextareaField({ label, description, ...textareaProps }: TextareaFieldProps) {
  const field = useFieldContext<string>();

  return (
    <FormField label={label} description={description}>
      {(control) => (
        <Textarea
          {...textareaProps}
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
