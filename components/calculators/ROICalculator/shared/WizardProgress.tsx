'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
}

interface WizardProgressProps {
  steps: Step[];
  currentStep: number;
  locale: 'fr' | 'en';
}

export default function WizardProgress({ steps, currentStep, locale }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
                  isCompleted && 'bg-accent-success text-white',
                  isCurrent && 'bg-primary-turquoise text-white',
                  !isCompleted && !isCurrent && 'bg-neutral-light text-neutral-medium'
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  'text-xs mt-2 text-center max-w-[80px]',
                  isCurrent ? 'text-primary-turquoise font-medium' : 'text-neutral-medium'
                )}
              >
                {step.title}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-16 md:w-24 h-1 mx-2',
                  currentStep > step.id ? 'bg-accent-success' : 'bg-neutral-light'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
