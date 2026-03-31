'use client';

import { useFormContext } from 'react-hook-form';
import QuestionAnnualVolume from '../questions/QuestionAnnualVolume';
import QuestionEquipmentBudget from '../questions/QuestionEquipmentBudget';
import QuestionProductSize from '../questions/QuestionProductSize';
import QuestionContentType from '../questions/QuestionContentType';
import QuestionAccessories from '../questions/QuestionAccessories';
import QuestionLeasing from '../questions/QuestionLeasing';
import type { FullFormData } from '../lib/validation';

interface Step2ProductionGoalsProps {
  locale: 'fr' | 'en';
}

export default function Step2ProductionGoals({ locale }: Step2ProductionGoalsProps) {
  const { watch } = useFormContext<FullFormData>();
  const isLeasing = watch('leasingActif') || false;

  return (
    <div className="space-y-8">
      <QuestionAnnualVolume locale={locale} />
      <QuestionEquipmentBudget locale={locale} />
      <QuestionProductSize locale={locale} />
      <QuestionContentType locale={locale} />
      <QuestionLeasing locale={locale} />
      {!isLeasing && <QuestionAccessories locale={locale} />}
    </div>
  );
}
