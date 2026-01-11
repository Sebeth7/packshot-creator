'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import type { FullFormData } from '../lib/validation';

interface QuestionProductionSplitProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    label: 'Répartition de votre production',
    sublabel: 'Packshot fond blanc vs Lifestyle/mises en scène',
    packshot: 'Packshots fond blanc',
    lifestyle: 'Lifestyle / Mises en scène',
  },
  en: {
    label: 'Your production split',
    sublabel: 'White background packshot vs Lifestyle/staged',
    packshot: 'White background packshots',
    lifestyle: 'Lifestyle / Staged',
  },
};

export default function QuestionProductionSplit({ locale }: QuestionProductionSplitProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale];

  const repartition = watch('repartition') || { packshot: 70, lifestyle: 30 };

  const handleChange = (vals: number[]) => {
    const packshot = vals[0];
    setValue('repartition', {
      packshot,
      lifestyle: 100 - packshot,
    }, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium text-neutral-dark">
          {t.label}
        </Label>
        <p className="text-sm text-neutral-medium mt-1">{t.sublabel}</p>
      </div>

      <div className="pt-4">
        <Slider
          value={[repartition.packshot]}
          onValueChange={handleChange}
          min={0}
          max={100}
          step={5}
          className="w-full"
        />

        <div className="flex justify-between mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-turquoise">
              {repartition.packshot}%
            </div>
            <div className="text-sm text-neutral-medium">{t.packshot}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-gold">
              {repartition.lifestyle}%
            </div>
            <div className="text-sm text-neutral-medium">{t.lifestyle}</div>
          </div>
        </div>
      </div>

      {errors.repartition && (
        <p className="text-sm text-red-500">
          {typeof errors.repartition.message === 'string'
            ? errors.repartition.message
            : 'Invalid split'}
        </p>
      )}
    </div>
  );
}
