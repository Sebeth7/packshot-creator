'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import type { FullFormData } from '../lib/validation';
import type { ProductSizeCategory } from '../lib/types';
import { TAILLE_LABELS } from '../lib/constants';
import { pickL } from '@/lib/locale-text';

interface QuestionProductSizeProps {
  locale: 'fr' | 'en' | 'de-ch';
}

const LABELS = {
  fr: {
    label: 'Quelle est la taille principale de vos produits ?',
    sublabel: 'Pour recommander le studio adapté',
  },
  en: {
    label: 'What is the main size of your products?',
    sublabel: 'To recommend the right studio',
  },
  'de-ch': {
    label: 'Welche Grösse haben Ihre Produkte hauptsächlich?',
    sublabel: 'Um das passende Studio zu empfehlen',
  },
};

const SIZE_OPTIONS: ProductSizeCategory[] = ['petit', 'moyen', 'grand', 'tres-grand'];

export default function QuestionProductSize({ locale }: QuestionProductSizeProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale] ?? LABELS.en;

  const value = watch('tailleProduitsCategory') || 'moyen';

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium text-future-dusk-900">
          {t.label}
        </Label>
        <p className="text-sm text-future-dusk-500 mt-1">{t.sublabel}</p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={(val) => setValue('tailleProduitsCategory', val as ProductSizeCategory, { shouldValidate: true })}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {SIZE_OPTIONS.map((size) => {
          const label = TAILLE_LABELS[size];
          const isSelected = value === size;

          return (
            <div key={size}>
              <RadioGroupItem
                value={size}
                id={`size-${size}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`size-${size}`}
                className={cn(
                  'flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all',
                  'hover:border-very-peri-500 hover:bg-very-peri-50',
                  isSelected
                    ? 'border-very-peri-500 bg-very-peri-100'
                    : 'border-neutral-200 bg-white'
                )}
              >
                <span className={cn(
                  'font-medium',
                  isSelected ? 'text-very-peri-600' : 'text-future-dusk-900'
                )}>
                  {pickL(locale, label)}
                </span>
                <span className="text-xs text-future-dusk-500 mt-1">
                  {label.examples}
                </span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {errors.tailleProduitsCategory && (
        <p className="text-sm text-red-500">{errors.tailleProduitsCategory.message}</p>
      )}
    </div>
  );
}
