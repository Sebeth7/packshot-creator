'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';
import { tx } from '@/lib/locale-text';

interface QuestionDailyCapacityProps {
  locale: 'fr' | 'en' | 'de-ch';
}

const LABELS = {
  fr: {
    label: 'Combien de produits finalisés photographiez-vous par jour ?',
    sublabel: 'Par opérateur, prises de vues + retouches complètes',
    tooltip: 'Produits 100% prêts à être mis en ligne',
    unit: 'produits/jour/opérateur',
  },
  en: {
    label: 'How many finalized products do you photograph per day?',
    sublabel: 'Per operator, including shooting + complete retouching',
    tooltip: 'Products 100% ready to be published online',
    unit: 'products/day/operator',
  },
  'de-ch': {
    label: 'Wie viele fertige Produkte fotografieren Sie pro Tag?',
    sublabel: 'Pro Bediener, Aufnahmen + vollständige Retusche',
    tooltip: 'Produkte, die zu 100% bereit für die Veröffentlichung sind',
    unit: 'Produkte/Tag/Bediener',
  },
};

export default function QuestionDailyCapacity({ locale }: QuestionDailyCapacityProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale] ?? LABELS.en;

  const value = watch('capaciteJournaliere') || 30;

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

      <div className="pt-4">
        <Slider
          value={[value]}
          onValueChange={(vals) => setValue('capaciteJournaliere', vals[0], { shouldValidate: true })}
          min={5}
          max={300}
          step={5}
          className="w-full"
          aria-label={t.label}
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-future-dusk-500">5</span>
          <span className="text-lg font-bold text-very-peri-600">
            {value} {t.unit}
          </span>
          <span className="text-sm text-future-dusk-500">300</span>
        </div>
      </div>

      {errors.capaciteJournaliere && (
        <p className="text-sm text-red-500">{errors.capaciteJournaliere.message}</p>
      )}
    </div>
  );
}
