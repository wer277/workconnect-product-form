import { Check } from 'lucide-react';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { LAST_STEP, WIZARD_STEPS, type WizardStepIndex } from './steps.config';

type StepStatus = 'complete' | 'current' | 'upcoming';

const getStatus = (index: number, currentStep: WizardStepIndex): StepStatus => {
  if (index < currentStep) return 'complete';
  if (index === currentStep) return 'current';
  return 'upcoming';
};

export function WizardStepper({ currentStep }: { currentStep: WizardStepIndex }) {
  return (
    <ol className="flex items-start gap-4 sm:items-center">
      {WIZARD_STEPS.map((step, index) => {
        const status = getStatus(index, currentStep);
        return (
          <Fragment key={step.id}>
            <li
              aria-current={status === 'current' ? 'step' : undefined}
              className="flex flex-1 flex-col gap-3 sm:flex-none sm:flex-row sm:items-center"
            >
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium',
                  status === 'upcoming'
                    ? 'border bg-muted text-muted-foreground'
                    : 'bg-primary text-primary-foreground',
                )}
              >
                {status === 'complete' ? <Check className="size-4" aria-label="Ukończony" /> : index + 1}
              </span>
              <span className="grid">
                <span className={cn('text-sm font-medium', status === 'upcoming' && 'text-muted-foreground')}>
                  {step.title}
                </span>
                <span className="text-xs text-muted-foreground">{step.description}</span>
              </span>
            </li>
            {index < LAST_STEP && (
              <li
                aria-hidden
                className={cn(
                  'hidden h-px w-17 shrink-0 sm:block',
                  index < currentStep ? 'bg-primary/50' : 'bg-border',
                )}
              />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
