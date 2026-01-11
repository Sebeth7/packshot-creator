'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';

interface QuestionDailyCapacityProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    label: 'Combien de photos finalisées produisez-vous par jour ?',
    sublabel: 'Par opérateur, prises de vues + retouches complètes',
    tooltip: 'Photos 100% prêtes à être mises en ligne',
    unit: 'photos/jour/opérateur',
  },
  en: {
    label: 'How many finalized photos do you produce per day?',
    sublabel: 'Per operator, including shooting + complete retouching',
    tooltip: 'Photos 100% ready to be published online',
    unit: 'photos/day/operator',
  },
};

export default function QuestionDailyCapacity({ locale }: QuestionDailyCapacityProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const value = watch('capaciteJournaliere') || 30;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Label className="text-base font-medium text-neutral-dark">
            {t.label}
          </Label>
          <p className="text-sm text-neutral-medium mt-1">{t.sublabel}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-neutral-medium hover:text-primary-turquoise">
                <HelpCircle className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{t.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="pt-4">
        <Slider
          value={[value]}
          onValueChange={(vals) => setValue('capaciteJournaliere', vals[0], { shouldValidate: true })}
          min={5}
          max={300}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-neutral-medium">5</span>
          <span className="text-lg font-bold text-primary-turquoise">
            {value} {t.unit}
          </span>
          <span className="text-sm text-neutral-medium">300</span>
        </div>
      </div>

      {errors.capaciteJournaliere && (
        <p className="text-sm text-red-500">{errors.capaciteJournaliere.message}</p>
      )}
    </div>
  );
}
