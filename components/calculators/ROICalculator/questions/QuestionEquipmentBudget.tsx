'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';

interface QuestionEquipmentBudgetProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    label: 'Budget annuel actuel pour l\'équipement photo et logiciels ?',
    sublabel: 'Matériel, éclairage, licences, espace (optionnel)',
    tooltip: 'Amortissement matériel + licences + loyer espace dédié',
    placeholder: '7 500€ (valeur suggérée)',
    unit: '€/an',
  },
  en: {
    label: 'Current annual budget for photo equipment and software?',
    sublabel: 'Equipment, lighting, licenses, space (optional)',
    tooltip: 'Equipment depreciation + licenses + dedicated space rent',
    placeholder: '€7,500 (suggested value)',
    unit: '€/year',
  },
};

export default function QuestionEquipmentBudget({ locale }: QuestionEquipmentBudgetProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const value = watch('budgetEquipement');

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

      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={t.placeholder}
          value={value || ''}
          onChange={(e) => setValue('budgetEquipement', Number(e.target.value) || undefined, { shouldValidate: true })}
          className="max-w-[200px]"
          min={0}
          max={50000}
        />
        <span className="text-neutral-medium">{t.unit}</span>
      </div>

      <p className="text-xs text-neutral-medium italic">
        {locale === 'fr'
          ? 'Si non renseigné, nous utiliserons 7 500€ comme estimation'
          : 'If not provided, we will use €7,500 as an estimate'
        }
      </p>

      {errors.budgetEquipement && (
        <p className="text-sm text-red-500">{errors.budgetEquipement.message}</p>
      )}
    </div>
  );
}
