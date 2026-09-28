import { useRef, useState, type FormEvent } from 'react';
import { useAppForm } from '@/components/form/form-hook';
import { productSchema, type ProductDraft } from '../domain/product.schema';
import { productFormOptions } from './product-form-options';
import { LAST_STEP, WIZARD_STEPS, type WizardStepIndex } from './steps.config';

const nextStep = (step: WizardStepIndex): WizardStepIndex => (step === 0 ? 1 : 2);
const previousStep = (step: WizardStepIndex): WizardStepIndex => (step === 2 ? 1 : 0);

export function useProductWizard(onComplete: (product: ProductDraft) => void) {
  const [step, setStep] = useState<WizardStepIndex>(0);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useAppForm({
    ...productFormOptions,
    onSubmit: ({ value }) => onComplete(productSchema.parse(value)),
  });

  const focusFirstInvalid = () =>
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());

  const validateCurrentStep = async () => {
    const mountedFields = WIZARD_STEPS[step].fields.filter((name) => form.getFieldMeta(name) !== undefined);

    for (const name of mountedFields) {
      form.setFieldMeta(name, (meta) => ({ ...meta, isTouched: true }));
      await form.validateField(name, 'change');
    }

    const isValid = mountedFields.every((name) => (form.getFieldMeta(name)?.errors.length ?? 0) === 0);
    if (!isValid) focusFirstInvalid();
    return isValid;
  };

  const submitCurrentStep = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;
    if (step === LAST_STEP) await form.handleSubmit();
    else setStep(nextStep(step));
  };

  const goBack = () => setStep(previousStep(step));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitCurrentStep();
  };

  return {
    form,
    formRef,
    step,
    isFirstStep: step === 0,
    isLastStep: step === LAST_STEP,
    goBack,
    handleSubmit,
  };
}
