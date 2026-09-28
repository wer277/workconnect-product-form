import { Switch } from '@/components/ui/switch';
import { useFieldContext } from './form-context';
import { FormField } from './form-field';

type SwitchFieldProps = {
  label: string;
  description?: string;
};

export function SwitchField({ label, description }: SwitchFieldProps) {
  const field = useFieldContext<boolean>();

  return (
    <FormField label={label} description={description} orientation="horizontal">
      {(control) => (
        <Switch
          {...control}
          name={field.name}
          checked={field.state.value}
          onCheckedChange={field.handleChange}
          onBlur={field.handleBlur}
        />
      )}
    </FormField>
  );
}
