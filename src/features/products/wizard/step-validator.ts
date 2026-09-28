import type { z } from 'zod';

type ValidatorContext = {
  fieldApi: { form: { state: { values: unknown } } };
};

export const validateAgainstStep =
  (schema: z.ZodType, fieldName: string) =>
  ({ fieldApi }: ValidatorContext) => {
    const result = schema.safeParse(fieldApi.form.state.values);
    if (result.success) return undefined;
    return result.error.issues.find((issue) => issue.path[0] === fieldName)?.message;
  };
