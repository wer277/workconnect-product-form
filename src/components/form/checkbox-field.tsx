import { Checkbox } from '@/components/ui/checkbox';
import { useFieldContext } from './form-context';
import { FormField } from './form-field';

type CheckboxFieldProps = {
  label: string;
  description?: string;
};

export function CheckboxField({ label, description }: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();

  return (
    <FormField label={label} description={description} orientation="horizontal">
      {(control) => (
        <Checkbox
          {...control}
          name={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked === true)}
          onBlur={field.handleBlur}
        />
      )}
    </FormField>
  );
}
