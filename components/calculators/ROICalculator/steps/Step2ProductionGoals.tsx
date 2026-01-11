'use client';

import QuestionAnnualVolume from '../questions/QuestionAnnualVolume';
import QuestionEquipmentBudget from '../questions/QuestionEquipmentBudget';
import QuestionProductionSplit from '../questions/QuestionProductionSplit';
import QuestionProductSize from '../questions/QuestionProductSize';

interface Step2ProductionGoalsProps {
  locale: 'fr' | 'en';
}

export default function Step2ProductionGoals({ locale }: Step2ProductionGoalsProps) {
  return (
    <div className="space-y-8">
      <QuestionAnnualVolume locale={locale} />
      <QuestionEquipmentBudget locale={locale} />
      <QuestionProductionSplit locale={locale} />
      <QuestionProductSize locale={locale} />
    </div>
  );
}
