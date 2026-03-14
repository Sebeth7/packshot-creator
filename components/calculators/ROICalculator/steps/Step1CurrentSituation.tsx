'use client';

import QuestionOperators from '../questions/QuestionOperators';
import QuestionSalaryCost from '../questions/QuestionSalaryCost';
import QuestionTimePercentage from '../questions/QuestionTimePercentage';
import QuestionExternalProvider from '../questions/QuestionExternalProvider';
import QuestionDailyCapacity from '../questions/QuestionDailyCapacity';

interface Step1CurrentSituationProps {
  locale: 'fr' | 'en';
}

export default function Step1CurrentSituation({ locale }: Step1CurrentSituationProps) {
  return (
    <div className="space-y-8">
      <QuestionOperators locale={locale} />
      <QuestionTimePercentage locale={locale} />
      <QuestionSalaryCost locale={locale} />
      <QuestionExternalProvider locale={locale} />
      <QuestionDailyCapacity locale={locale} />
    </div>
  );
}
