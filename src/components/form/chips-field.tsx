import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { Option } from '@/lib/option';
import { useFieldContext } from './form-context';
import { FormField } from './form-field';

type ChipsFieldProps<T extends string> = {
  label: string;
  description?: string;
  options: readonly Option<T>[];
};

export function ChipsField<T extends string>({ label, description, options }: ChipsFieldProps<T>) {
  const field = useFieldContext<T[]>();

  const isOptionValue = (value: string): value is T => options.some((option) => option.value === value);

  return (
    <FormField label={label} description={description}>
      {(control) => (
        <ToggleGroup
          {...control}
          type="multiple"
          variant="outline"
          size="sm"
          value={field.state.value}
          onValueChange={(values) => field.handleChange(values.filter(isOptionValue))}
          onBlur={field.handleBlur}
          className="flex w-full flex-wrap justify-start gap-2"
        >
          {options.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className="h-6 rounded-full px-2 font-normal data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </FormField>
  );
}
