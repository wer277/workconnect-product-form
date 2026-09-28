import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Option } from '@/lib/option';
import { useFieldContext } from './form-context';
import { FormField } from './form-field';

type SelectFieldProps<T extends string | number> = {
  label: string;
  description?: string;
  placeholder?: string;
  options: readonly Option<T>[];
};

export function SelectField<T extends string | number>({
  label,
  description,
  placeholder = 'Wybierz',
  options,
}: SelectFieldProps<T>) {
  const field = useFieldContext<T | ''>();

  const handleValueChange = (raw: string) => {
    const option = options.find((candidate) => String(candidate.value) === raw);
    if (option) field.handleChange(option.value);
  };

  return (
    <FormField label={label} description={description}>
      {(control) => (
        <Select
          name={field.name}
          value={String(field.state.value)}
          onValueChange={handleValueChange}
          onOpenChange={(open) => !open && field.handleBlur()}
        >
          <SelectTrigger {...control} className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormField>
  );
}
