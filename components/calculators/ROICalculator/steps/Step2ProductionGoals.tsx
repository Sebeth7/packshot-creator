'use client';

import QuestionAnnualVolume from '../questions/QuestionAnnualVolume';
import QuestionEquipmentBudget from '../questions/QuestionEquipmentBudget';
import QuestionProductSize from '../questions/QuestionProductSize';
import QuestionContentType from '../questions/QuestionContentType';
import QuestionLeasing from '../questions/QuestionLeasing';

interface Step2ProductionGoalsProps {
  locale: 'fr' | 'en';
}

export default function Step2ProductionGoals({ locale }: Step2ProductionGoalsProps) {
  return (
    <div className="space-y-8">
      <QuestionAnnualVolume locale={locale} />
      <QuestionEquipmentBudget locale={locale} />
      <QuestionProductSize locale={locale} />
      <QuestionContentType locale={locale} />
      <QuestionLeasing locale={locale} />
    </div>
  );
}
