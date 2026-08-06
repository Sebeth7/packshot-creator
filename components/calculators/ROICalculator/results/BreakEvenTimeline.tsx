'use client';

import { cn } from '@/lib/utils';
import { Check, Clock, TrendingUp, Rocket } from 'lucide-react';
import { formatEuro } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface BreakEvenTimelineProps {
  results: CalculationResults;
  locale: 'fr' | 'en' | 'de-ch';
}

const LABELS = {
  fr: {
    title: 'Votre Parcours ROI',
    titleLeasing: 'Votre Parcours ROI en Leasing',
    today: "Aujourd'hui",
    todayDesc: 'Investissement initial',
    todayDescLeasing: 'Début du leasing',
    breakeven: 'Break-even',
    breakevenDesc: 'Investissement rentabilisé',
    breakevenDescLeasing: 'Rentable immédiatement',
    year1: 'Année 1',
    year1Desc: 'Premiers bénéfices',
    year1DescLeasing: 'Bénéfice net année 1',
    year5: 'Année 5',
    year5Desc: 'Bénéfices cumulés',
    year5DescLeasing: 'Bénéfices cumulés (fin contrat)',
    month: 'Mois',
    months: 'mois',
  },
  en: {
    title: 'Your ROI Journey',
    titleLeasing: 'Your Leasing ROI Journey',
    today: 'Today',
    todayDesc: 'Initial investment',
    todayDescLeasing: 'Lease start',
    breakeven: 'Break-even',
    breakevenDesc: 'Investment recovered',
    breakevenDescLeasing: 'Profitable immediately',
    year1: 'Year 1',
    year1Desc: 'First benefits',
    year1DescLeasing: 'Year 1 net benefit',
    year5: 'Year 5',
    year5Desc: 'Cumulated benefits',
    year5DescLeasing: 'Cumulated benefits (end of contract)',
    month: 'Month',
    months: 'months',
  },
  'de-ch': {
    title: 'Ihr ROI-Verlauf',
    titleLeasing: 'Ihr ROI-Verlauf im Leasing',
    today: 'Heute',
    todayDesc: 'Anfangsinvestition',
    todayDescLeasing: 'Leasing-Beginn',
    breakeven: 'Amortisation',
    breakevenDesc: 'Investition amortisiert',
    breakevenDescLeasing: 'Sofort rentabel',
    year1: 'Jahr 1',
    year1Desc: 'Erste Gewinne',
    year1DescLeasing: 'Netto-Gewinn Jahr 1',
    year5: 'Jahr 5',
    year5Desc: 'Kumulierte Gewinne',
    year5DescLeasing: 'Kumulierte Gewinne (Vertragsende)',
    month: 'Monat',
    months: 'Monate',
  },
};

export default function BreakEvenTimeline({ results, locale }: BreakEvenTimelineProps) {
  const t = LABELS[locale] ?? LABELS.en;

  if (!results.breakEvenMois) {
    return null;
  }

  const breakEvenMonths = Math.round(results.breakEvenMois);
  const dureeMois = results.dureeAnalyseMois;
  const progressPercent = Math.min((breakEvenMonths / dureeMois) * 100, 100);

  const isLeasing = results.isLeasing;

  const milestones = [
    {
      icon: Clock,
      label: t.today,
      description: isLeasing ? t.todayDescLeasing : t.todayDesc,
      value: '',
      position: 0,
      color: 'bg-very-peri-500',
      textColor: 'text-very-peri-600',
    },
    ...(isLeasing ? [] : [{
      icon: Check,
      label: t.breakeven,
      description: t.breakevenDesc,
      value: `${breakEvenMonths} ${t.months}`,
      position: progressPercent,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
    }]),
    {
      icon: TrendingUp,
      label: t.year1,
      description: isLeasing ? t.year1DescLeasing : t.year1Desc,
      value: results.economieAn1 > 0
        ? `+${formatEuro(results.economieAn1)}`
        : '-',
      position: (12 / dureeMois) * 100,
      color: results.economieAn1 > 0 ? 'bg-purple-500' : 'bg-neutral-400',
      textColor: results.economieAn1 > 0 ? 'text-purple-500' : 'text-future-dusk-500',
    },
    {
      icon: Rocket,
      label: isLeasing ? t.year5DescLeasing : t.year5,
      description: isLeasing ? t.year5DescLeasing : t.year5Desc,
      value: `+${formatEuro(results.economie5ans)}`,
      position: 100,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-8">
        {isLeasing ? t.titleLeasing : t.title}
      </h3>

      {/* Timeline visuelle */}
      <div className="relative">
        {/* Ligne de base */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-neutral-100 rounded-full" />

        {/* Ligne de progression */}
        <div
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-very-peri-500 via-emerald-500 to-emerald-500 rounded-full transition-all duration-1000"
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
                <p className="text-xs text-future-dusk-500 mt-1">
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

      {/* Indicateur de mois — gradué sur la durée réelle d'analyse (contrat ou 5 ans) */}
      <div className="mt-8 flex justify-between text-xs text-future-dusk-500">
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
          <span key={frac}>{t.month} {Math.round(dureeMois * frac)}</span>
        ))}
      </div>
    </div>
  );
}
