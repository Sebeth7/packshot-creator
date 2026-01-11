'use client';

import { cn } from '@/lib/utils';
import { Check, Clock, TrendingUp, Rocket } from 'lucide-react';
import { formatEuro } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface BreakEvenTimelineProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    title: 'Votre Parcours ROI',
    today: "Aujourd'hui",
    todayDesc: 'Investissement initial',
    breakeven: 'Break-even',
    breakevenDesc: 'Investissement rentabilisé',
    year1: 'Année 1',
    year1Desc: 'Premiers bénéfices',
    year3: 'Année 3',
    year3Desc: 'Bénéfices cumulés',
    month: 'Mois',
    months: 'mois',
  },
  en: {
    title: 'Your ROI Journey',
    today: 'Today',
    todayDesc: 'Initial investment',
    breakeven: 'Break-even',
    breakevenDesc: 'Investment recovered',
    year1: 'Year 1',
    year1Desc: 'First benefits',
    year3: 'Year 3',
    year3Desc: 'Cumulated benefits',
    month: 'Month',
    months: 'months',
  },
};

export default function BreakEvenTimeline({ results, locale }: BreakEvenTimelineProps) {
  const t = LABELS[locale];

  if (!results.breakEvenMois) {
    return null;
  }

  const breakEvenMonths = Math.round(results.breakEvenMois);
  const progressPercent = Math.min((breakEvenMonths / 36) * 100, 100);

  const milestones = [
    {
      icon: Clock,
      label: t.today,
      description: t.todayDesc,
      value: formatEuro(results.machine.prix),
      position: 0,
      color: 'bg-primary-turquoise',
      textColor: 'text-primary-turquoise',
    },
    {
      icon: Check,
      label: t.breakeven,
      description: t.breakevenDesc,
      value: `${breakEvenMonths} ${t.months}`,
      position: progressPercent,
      color: 'bg-accent-success',
      textColor: 'text-accent-success',
    },
    {
      icon: TrendingUp,
      label: t.year1,
      description: t.year1Desc,
      value: results.roiAn1 > 0 ? `+${formatEuro(results.economieAnnuelle - results.machine.prix)}` : '-',
      position: (12 / 36) * 100,
      color: results.roiAn1 > 0 ? 'bg-purple-500' : 'bg-neutral-medium',
      textColor: results.roiAn1 > 0 ? 'text-purple-500' : 'text-neutral-medium',
    },
    {
      icon: Rocket,
      label: t.year3,
      description: t.year3Desc,
      value: `+${formatEuro(results.economie3ans)}`,
      position: 100,
      color: 'bg-accent-success',
      textColor: 'text-accent-success',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-heading font-bold text-neutral-dark mb-8">
        {t.title}
      </h3>

      {/* Timeline visuelle */}
      <div className="relative">
        {/* Ligne de base */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-neutral-lighter rounded-full" />

        {/* Ligne de progression */}
        <div
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-primary-turquoise via-accent-success to-accent-success rounded-full transition-all duration-1000"
          style={{ width: '100%' }}
        />

        {/* Points de milestone */}
        <div className="relative flex justify-between">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: index === 0 || index === milestones.length - 1 ? 'auto' : '25%' }}
            >
              {/* Icône */}
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center text-white z-10',
                  milestone.color
                )}
              >
                <milestone.icon className="w-5 h-5" />
              </div>

              {/* Label */}
              <div className="mt-3 text-center">
                <p className={cn('text-sm font-bold', milestone.textColor)}>
                  {milestone.label}
                </p>
                <p className="text-xs text-neutral-medium mt-1">
                  {milestone.description}
                </p>
                <p className={cn('text-sm font-bold mt-1', milestone.textColor)}>
                  {milestone.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur de mois */}
      <div className="mt-8 flex justify-between text-xs text-neutral-medium">
        <span>{t.month} 0</span>
        <span>{t.month} 12</span>
        <span>{t.month} 24</span>
        <span>{t.month} 36</span>
      </div>
    </div>
  );
}
