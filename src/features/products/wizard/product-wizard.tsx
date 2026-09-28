import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProductDraft } from '../domain/product.schema';
import { AvailabilityStep } from './steps/availability-step';
import { BasicInfoStep } from './steps/basic-info-step';
import { PriceStep } from './steps/price-step';
import { useProductWizard } from './use-product-wizard';
import { WizardStepper } from './wizard-stepper';

export function ProductWizard({ onComplete }: { onComplete: (product: ProductDraft) => void }) {
  const { form, formRef, step, isFirstStep, isLastStep, lastEditedPrice, setLastEditedPrice, goBack, handleSubmit } =
    useProductWizard(onComplete);

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="mx-4 border-b py-6 sm:mx-0 sm:px-4 sm:py-3">
        <WizardStepper currentStep={step} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {step === 0 && <BasicInfoStep form={form} />}
        {step === 1 && <PriceStep form={form} lastEditedPrice={lastEditedPrice} onPriceEdited={setLastEditedPrice} />}
        {step === 2 && <AvailabilityStep form={form} />}
      </div>

      <div className="flex items-center border-t bg-muted/50 p-4">
        {!isFirstStep && (
          <Button type="button" variant="outline" onClick={goBack}>
            <ArrowLeft />
            Wstecz
          </Button>
        )}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" className="ml-auto" disabled={isSubmitting}>
              {isLastStep ? (
                'Zapisz produkt'
              ) : (
                <>
                  Dalej
                  <ArrowRight />
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
