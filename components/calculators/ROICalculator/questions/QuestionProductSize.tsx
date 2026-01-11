'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import type { FullFormData } from '../lib/validation';
import type { ProductSizeCategory } from '../lib/types';
import { TAILLE_LABELS } from '../lib/constants';

interface QuestionProductSizeProps {
  locale: 'fr' | 'en';
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
};

const SIZE_OPTIONS: ProductSizeCategory[] = ['petit', 'moyen', 'grand', 'tres-grand'];

export default function QuestionProductSize({ locale }: QuestionProductSizeProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const value = watch('tailleProduitsCategory') || 'moyen';

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium text-neutral-dark">
          {t.label}
        </Label>
        <p className="text-sm text-neutral-medium mt-1">{t.sublabel}</p>
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
                  'hover:border-primary-turquoise hover:bg-primary-turquoise/5',
                  isSelected
                    ? 'border-primary-turquoise bg-primary-turquoise/10'
                    : 'border-neutral-light bg-white'
                )}
              >
                <span className={cn(
                  'font-medium',
                  isSelected ? 'text-primary-turquoise' : 'text-neutral-dark'
                )}>
                  {locale === 'fr' ? label.fr : label.en}
                </span>
                <span className="text-xs text-neutral-medium mt-1">
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
