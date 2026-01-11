'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';

interface QuestionAnnualVolumeProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    label: 'Combien de photos produit devez-vous réaliser par an ?',
    sublabel: 'Objectif total : existant + nouveautés + renouvellement',
    tooltip: 'Comptez TOUS les visuels produits',
    unit: 'photos/an',
  },
  en: {
    label: 'How many product photos do you need to produce per year?',
    sublabel: 'Total goal: existing + new + renewal',
    tooltip: 'Count ALL produced visuals',
    unit: 'photos/year',
  },
};

// Format large numbers with spaces
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function QuestionAnnualVolume({ locale }: QuestionAnnualVolumeProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const value = watch('photosAnnuelles') || 5000;

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
          onValueChange={(vals) => setValue('photosAnnuelles', vals[0], { shouldValidate: true })}
          min={100}
          max={100000}
          step={100}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-neutral-medium">100</span>
          <span className="text-lg font-bold text-primary-turquoise">
            {formatNumber(value)} {t.unit}
          </span>
          <span className="text-sm text-neutral-medium">100 000</span>
        </div>
      </div>

      {errors.photosAnnuelles && (
        <p className="text-sm text-red-500">{errors.photosAnnuelles.message}</p>
      )}
    </div>
  );
}
