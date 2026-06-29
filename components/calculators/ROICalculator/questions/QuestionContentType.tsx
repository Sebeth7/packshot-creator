'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { FullFormData } from '../lib/validation';
import type { ContentType } from '../lib/types';
import { CONTENT_TYPE_LABELS } from '../lib/machineSelector';

interface QuestionContentTypeProps {
  locale: 'fr' | 'en' | 'de-ch';
}

const LABELS = {
  fr: {
    label: 'Quels types de contenu souhaitez-vous produire ?',
    sublabel: 'Sélectionnez un ou plusieurs types (influence la recommandation)',
  },
  en: {
    label: 'What types of content do you want to produce?',
    sublabel: 'Select one or more types (influences recommendation)',
  },
  'de-ch': {
    label: 'Welche Arten von Inhalten möchten Sie produzieren?',
    sublabel: 'Wählen Sie einen oder mehrere Typen (beeinflusst die Empfehlung)',
  },
};

const CONTENT_OPTIONS: { type: ContentType; icon: string }[] = [
  { type: 'packshot', icon: '📷' },
  { type: '360', icon: '🔄' },
  { type: 'video', icon: '🎬' },
  { type: 'flat-lay', icon: '👕' },
  { type: 'ghost-mannequin', icon: '👤' },
];

export default function QuestionContentType({ locale }: QuestionContentTypeProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale] ?? LABELS.en;

  const selected: ContentType[] = watch('typesContenu') || ['packshot'];

  const toggleType = (type: ContentType) => {
    const newSelection = selected.includes(type)
      ? selected.filter(t => t !== type)
      : [...selected, type];

    // Au moins 1 type doit être sélectionné
    if (newSelection.length > 0) {
      setValue('typesContenu', newSelection, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium text-future-dusk-900">
          {t.label}
        </Label>
        <p className="text-sm text-future-dusk-500 mt-1">{t.sublabel}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CONTENT_OPTIONS.map(({ type, icon }) => {
          const isSelected = selected.includes(type);
          const label = CONTENT_TYPE_LABELS[type][locale] ?? CONTENT_TYPE_LABELS[type].en;

          return (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={cn(
                'flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all text-left',
                'hover:border-very-peri-500 hover:bg-very-peri-50',
                isSelected
                  ? 'border-very-peri-500 bg-very-peri-100'
                  : 'border-neutral-200 bg-white'
              )}
            >
              <span className="text-lg">{icon}</span>
              <span className={cn(
                'text-sm font-medium',
                isSelected ? 'text-very-peri-600' : 'text-future-dusk-900'
              )}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {errors.typesContenu && (
        <p className="text-sm text-red-500">{String(errors.typesContenu.message)}</p>
      )}
    </div>
  );
}
