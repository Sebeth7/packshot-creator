'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';

interface QuestionAccessoriesProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    label: 'Accessoires compl\u00e9mentaires',
    tooltip: 'Si votre devis PackshotCreator inclut des accessoires (plateaux, \u00e9clairages, fonds\u2026), indiquez leur montant total pour un calcul pr\u00e9cis.',
    placeholder: 'Ex: 3000',
    unit: '\u20ac HT',
  },
  en: {
    label: 'Additional accessories',
    tooltip: 'If your PackshotCreator quote includes accessories (turntables, lighting, backgrounds\u2026), enter the total amount for an accurate calculation.',
    placeholder: 'e.g.: 3000',
    unit: '\u20ac excl. tax',
  },
};

export default function QuestionAccessories({ locale }: QuestionAccessoriesProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const montantAccessoires = watch('montantAccessoires');

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <Label className="text-base font-medium text-future-dusk-900">
          {t.label}
        </Label>
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
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={t.placeholder}
          value={montantAccessoires || ''}
          onChange={(e) => setValue('montantAccessoires', e.target.value ? Number(e.target.value) : undefined, { shouldValidate: true })}
          className="max-w-[200px]"
          min={0}
          max={100000}
        />
        <span className="text-future-dusk-500">{t.unit}</span>
      </div>
      {errors.montantAccessoires && (
        <p className="text-sm text-red-500">{errors.montantAccessoires.message}</p>
      )}
    </div>
  );
}
