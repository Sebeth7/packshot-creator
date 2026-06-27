'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';
import { tx } from '@/lib/locale-text';

interface QuestionInitialInvestmentProps {
  locale: 'fr' | 'en' | 'de-ch';
}

const LABELS = {
  fr: {
    label: 'Envisagez-vous un investissement initial ?',
    yes: 'Oui',
    no: 'Non',
    amountLabel: 'Montant de l\u2019investissement envisag\u00e9',
    tooltip: 'Cr\u00e9ation d\u2019un studio photo, achat d\u2019un \u00e9quipement\u2026 Indiquez le co\u00fbt d\u2019acquisition pour une comparaison compl\u00e8te.',
    placeholder: 'Ex: 20000',
    unit: '\u20ac HT',
  },
  en: {
    label: 'Are you considering an initial investment?',
    yes: 'Yes',
    no: 'No',
    amountLabel: 'Planned investment amount',
    tooltip: 'Setting up a photo studio, purchasing equipment\u2026 Enter the acquisition cost for a complete comparison.',
    placeholder: 'e.g.: 20000',
    unit: '\u20ac excl. tax',
  },
  'de-ch': {
    label: 'Planen Sie eine Anfangsinvestition?',
    yes: 'Ja',
    no: 'Nein',
    amountLabel: 'Geplanter Investitionsbetrag',
    tooltip: 'Einrichtung eines Fotostudios, Kauf einer Ausr\u00fcstung\u2026 Geben Sie die Anschaffungskosten f\u00fcr einen vollst\u00e4ndigen Vergleich an.',
    placeholder: 'z. B.: 20000',
    unit: '\u20ac exkl. MwSt.',
  },
};

export default function QuestionInitialInvestment({ locale }: QuestionInitialInvestmentProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale] ?? LABELS.en;

  const investissementInitialActif = watch('investissementInitialActif');
  const montantInvestissementInitial = watch('montantInvestissementInitial');

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
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

      <RadioGroup
        value={investissementInitialActif ? 'yes' : 'no'}
        onValueChange={(val) => {
          setValue('investissementInitialActif', val === 'yes', { shouldValidate: true });
          if (val === 'no') {
            setValue('montantInvestissementInitial', undefined);
          }
        }}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="investissement-yes" />
          <Label htmlFor="investissement-yes" className="cursor-pointer">{t.yes}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="investissement-no" />
          <Label htmlFor="investissement-no" className="cursor-pointer">{t.no}</Label>
        </div>
      </RadioGroup>

      {investissementInitialActif && (
        <div className="pt-4 space-y-2">
          <Label className="text-sm font-medium text-future-dusk-900">
            {t.amountLabel}
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder={t.placeholder}
              value={montantInvestissementInitial || ''}
              onChange={(e) => setValue('montantInvestissementInitial', Number(e.target.value) || 0, { shouldValidate: true })}
              className="max-w-[200px]"
              min={1000}
              max={500000}
            />
            <span className="text-future-dusk-500">{t.unit}</span>
          </div>
          {errors.montantInvestissementInitial && (
            <p className="text-sm text-red-500">{errors.montantInvestissementInitial.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
