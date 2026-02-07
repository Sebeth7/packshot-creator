'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';

interface QuestionOperatorsProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    label: 'Combien de personnes travaillent sur la production de vos visuels ?',
    sublabel: 'Inclus packshot + lifestyle + retouches',
    tooltip: 'Comptez tous les collaborateurs impliqués, même partiellement',
    unit: 'personne(s)',
  },
  en: {
    label: 'How many people work on your visual production?',
    sublabel: 'Including packshot + lifestyle + retouching',
    tooltip: 'Count all involved collaborators, even part-time',
    unit: 'person(s)',
  },
};

export default function QuestionOperators({ locale }: QuestionOperatorsProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const value = watch('nbOperateurs') || 1;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Label className="text-base font-medium text-future-dusk-900">
            {t.label}
          </Label>
          <p className="text-sm text-future-dusk-500 mt-1">{t.sublabel}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-future-dusk-500 hover:text-very-peri-600">
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
          onValueChange={(vals) => setValue('nbOperateurs', vals[0], { shouldValidate: true })}
          min={0.5}
          max={20}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-future-dusk-500">0.5</span>
          <span className="text-lg font-bold text-very-peri-600">
            {value % 1 === 0 ? value : value.toFixed(1)} {value <= 1 ? (locale === 'fr' ? 'personne' : 'person') : t.unit}
          </span>
          <span className="text-sm text-future-dusk-500">20</span>
        </div>
      </div>

      {errors.nbOperateurs && (
        <p className="text-sm text-red-500">{errors.nbOperateurs.message}</p>
      )}
    </div>
  );
}
