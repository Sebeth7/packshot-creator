'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';
import { tx } from '@/lib/locale-text';

interface QuestionAccessoriesProps {
  locale: 'fr' | 'en' | 'de-ch';
}

const LABELS = {
  fr: {
    label: 'Accessoires compl\u00e9mentaires',
    tooltip: 'Montant des accessoires Orbitvu (hors appareils photo) figurant sur votre devis PackshotCreator. Ce montant s\u2019ajoute au tarif du studio pour le calcul du ROI.',
    placeholder: 'Ex: 3000',
    unit: '\u20ac HT',
  },
  en: {
    label: 'Additional accessories',
    tooltip: 'Amount of Orbitvu accessories (excluding cameras) listed on your PackshotCreator quote. This amount is added to the studio price for ROI calculation.',
    placeholder: 'e.g.: 3000',
    unit: '\u20ac excl. tax',
  },
  'de-ch': {
    label: 'Zus\u00e4tzliches Zubeh\u00f6r',
    tooltip: 'Betrag des Orbitvu-Zubeh\u00f6rs (ohne Kameras), der auf Ihrer PackshotCreator-Offerte aufgef\u00fchrt ist. Dieser Betrag wird f\u00fcr die ROI-Berechnung zum Studiopreis hinzugerechnet.',
    placeholder: 'z. B.: 3000',
    unit: '\u20ac exkl. MwSt.',
  },
};

export default function QuestionAccessories({ locale }: QuestionAccessoriesProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale] ?? LABELS.en;

  const montantAccessoires = watch('montantAccessoires');

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-base font-medium text-future-dusk-900">
          {t.label}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-future-dusk-500 hover:text-very-peri-600" aria-label={tx(locale, 'Aide', 'Help', 'Hilfe')}>
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
