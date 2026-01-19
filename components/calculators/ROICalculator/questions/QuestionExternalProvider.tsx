'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';

interface QuestionExternalProviderProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    label: 'Faites-vous appel à un prestataire externe ?',
    yes: 'Oui',
    no: 'Non',
    budgetLabel: 'Budget mensuel moyen prestataire externe',
    tooltip: 'Montant moyen facturé par mois',
    placeholder: 'Ex: 2000',
    unit: '€/mois',
  },
  en: {
    label: 'Do you use an external provider?',
    yes: 'Yes',
    no: 'No',
    budgetLabel: 'Average monthly external provider budget',
    tooltip: 'Average amount billed per month',
    placeholder: 'e.g.: 2000',
    unit: '€/month',
  },
};

export default function QuestionExternalProvider({ locale }: QuestionExternalProviderProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const utiliseSolutionExterne = watch('utiliseSolutionExterne');
  const budgetMensuelExterne = watch('budgetMensuelExterne');

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <Label className="text-base font-medium text-neutral-dark">
          {t.label}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-neutral-medium hover:text-secondary-orbitvu">
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
        value={utiliseSolutionExterne ? 'yes' : 'no'}
        onValueChange={(val) => {
          setValue('utiliseSolutionExterne', val === 'yes', { shouldValidate: true });
          if (val === 'no') {
            setValue('budgetMensuelExterne', undefined);
          }
        }}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="externe-yes" />
          <Label htmlFor="externe-yes" className="cursor-pointer">{t.yes}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="externe-no" />
          <Label htmlFor="externe-no" className="cursor-pointer">{t.no}</Label>
        </div>
      </RadioGroup>

      {utiliseSolutionExterne && (
        <div className="pt-4 space-y-2">
          <Label className="text-sm font-medium text-neutral-dark">
            {t.budgetLabel}
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder={t.placeholder}
              value={budgetMensuelExterne || ''}
              onChange={(e) => setValue('budgetMensuelExterne', Number(e.target.value) || 0, { shouldValidate: true })}
              className="max-w-[200px]"
              min={0}
              max={50000}
            />
            <span className="text-neutral-medium">{t.unit}</span>
          </div>
          {errors.budgetMensuelExterne && (
            <p className="text-sm text-red-500">{errors.budgetMensuelExterne.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
