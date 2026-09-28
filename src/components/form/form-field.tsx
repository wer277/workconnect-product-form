import { useId, type ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useFieldContext } from './form-context';

export type ControlProps = {
  id: string;
  'aria-invalid': boolean;
  'aria-describedby': string | undefined;
};

type FormFieldProps = {
  label: string;
  description?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  children: (control: ControlProps) => ReactNode;
};

const toMessage = (error: unknown) => {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return null;
};

export function FormField({ label, description, orientation = 'vertical', className, children }: FormFieldProps) {
  const field = useFieldContext<unknown>();
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  const { isTouched, errors } = field.state.meta;
  const message = isTouched ? errors.map(toMessage).find(Boolean) : undefined;
  const describedBy = [description && descriptionId, message && errorId].filter(Boolean).join(' ') || undefined;

  const control = children({ id, 'aria-invalid': Boolean(message), 'aria-describedby': describedBy });

  const labelNode = (
    <Label htmlFor={id} className={cn(message && 'text-destructive')}>
      {label}
    </Label>
  );

  return (
    <div className={cn('grid content-start gap-2', className)}>
      {orientation === 'horizontal' ? (
        <div className="flex items-center gap-2">
          {control}
          {labelNode}
        </div>
      ) : (
        <>
          {labelNode}
          {control}
        </>
      )}
      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {message && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {message}
        </p>
      )}
    </div>
  );
}
