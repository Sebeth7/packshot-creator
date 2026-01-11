'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';

interface QuestionTimePercentageProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    label: 'Quel pourcentage de leur temps est consacré à la production visuelle ?',
    sublabel: 'Moyenne pondérée si plusieurs opérateurs',
    tooltip: 'Temps réel : shooting + retouches + gestion (hors pauses, admin)',
  },
  en: {
    label: 'What percentage of their time is dedicated to visual production?',
    sublabel: 'Weighted average if multiple operators',
    tooltip: 'Real time: shooting + retouching + management (excluding breaks, admin)',
  },
};

export default function QuestionTimePercentage({ locale }: QuestionTimePercentageProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const value = watch('pourcentageTemps') || 80;

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
          onValueChange={(vals) => setValue('pourcentageTemps', vals[0], { shouldValidate: true })}
          min={10}
          max={100}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-neutral-medium">10%</span>
          <span className="text-lg font-bold text-primary-turquoise">
            {value}%
          </span>
          <span className="text-sm text-neutral-medium">100%</span>
        </div>
      </div>

      {errors.pourcentageTemps && (
        <p className="text-sm text-red-500">{errors.pourcentageTemps.message}</p>
      )}
    </div>
  );
}
