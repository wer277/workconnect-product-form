import { createFormHook } from '@tanstack/react-form';
import { CheckboxField } from './checkbox-field';
import { ChipsField } from './chips-field';
import { fieldContext, formContext } from './form-context';
import { NumberField } from './number-field';
import { SelectField } from './select-field';
import { SwitchField } from './switch-field';
import { TextField } from './text-field';
import { TextareaField } from './textarea-field';

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    NumberField,
    SelectField,
    ChipsField,
    SwitchField,
    CheckboxField,
  },
  formComponents: {},
});
