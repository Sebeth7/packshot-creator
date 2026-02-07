'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';

interface QuestionSalaryCostProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    label: 'Coût mensuel moyen par opérateur (charges incluses)',
    sublabel: 'Salaire brut × 1,7 environ. Inclut charges patronales, mutuelle, etc.',
    tooltip: 'Coût total employeur mensuel : salaire brut + charges patronales (~42%) + mutuelle + prévoyance. En moyenne, multipliez le salaire brut par 1,7.',
    placeholder: '4 000',
    unit: '€/mois',
    defaultNote: 'Si non renseigné, nous utiliserons 4 000€ comme estimation',
  },
  en: {
    label: 'Average monthly cost per operator (all charges included)',
    sublabel: 'Gross salary × ~1.7. Includes employer contributions, insurance, etc.',
    tooltip: 'Total employer cost per month: gross salary + employer contributions (~42%) + health insurance. On average, multiply gross salary by 1.7.',
    placeholder: '4,000',
    unit: '€/month',
    defaultNote: 'If not provided, we will use €4,000 as an estimate',
  },
};

export default function QuestionSalaryCost({ locale }: QuestionSalaryCostProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const value = watch('coutSalarialMensuel');

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

      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={t.placeholder}
          value={value || ''}
          onChange={(e) => setValue('coutSalarialMensuel', Number(e.target.value) || undefined, { shouldValidate: true })}
          className="max-w-[200px]"
          min={1500}
          max={15000}
        />
        <span className="text-future-dusk-500">{t.unit}</span>
      </div>

      <p className="text-xs text-future-dusk-500 italic">
        {t.defaultNote}
      </p>

      {errors.coutSalarialMensuel && (
        <p className="text-sm text-red-500">{errors.coutSalarialMensuel.message}</p>
      )}
    </div>
  );
}
