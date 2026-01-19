'use client';

import { cn } from '@/lib/utils';
import { Clock, PiggyBank, Camera, TrendingUp } from 'lucide-react';
import { formatEuro } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface HeroMetricsProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    title: 'Votre Analyse ROI Personnalisée',
    breakeven: 'Machine rentabilisée en',
    savings: 'Économie annuelle',
    savingsNote: "Dès l'année 2",
    perPhoto: 'Économie par photo',
    roi5: 'ROI sur 5 ans',
    roi5Note: 'de bénéfices nets',
    months: 'mois',
    savedPerPhoto: 'économisés/photo',
  },
  en: {
    title: 'Your Personalized ROI Analysis',
    breakeven: 'Machine pays for itself in',
    savings: 'Annual savings',
    savingsNote: 'From year 2',
    perPhoto: 'Savings per photo',
    roi5: '5-year ROI',
    roi5Note: 'net benefits',
    months: 'months',
    savedPerPhoto: 'saved/photo',
  },
};

export default function HeroMetrics({ results, locale }: HeroMetricsProps) {
  const t = LABELS[locale];

  // Si non rentable, ne pas afficher ces métriques
  if (!results.isRentable) {
    return null;
  }

  const metrics = [
    {
      icon: Clock,
      label: t.breakeven,
      value: results.breakEvenMois
        ? `${Math.round(results.breakEvenMois)} ${t.months}`
        : '-',
      color: 'text-secondary-orbitvu',
      bgColor: 'bg-secondary-orbitvu/10',
      highlight: results.breakEvenMois !== null && results.breakEvenMois < 18,
    },
    {
      icon: PiggyBank,
      label: t.savings,
      value: formatEuro(results.economieAnnuelle),
      sublabel: t.savingsNote,
      color: 'text-accent-success',
      bgColor: 'bg-accent-success/10',
      highlight: true,
    },
    {
      icon: Camera,
      label: t.perPhoto,
      value: `${Math.round(results.economieParPhotoPourcent)}%`,
      sublabel: `${formatEuro(results.economieParPhoto)} ${t.savedPerPhoto}`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      highlight: false,
    },
    {
      icon: TrendingUp,
      label: t.roi5,
      value: `+${Math.round(results.roi5ans)}%`,
      sublabel: `${formatEuro(results.economie5ans)} ${t.roi5Note}`,
      color: 'text-secondary-orbitvu',
      bgColor: 'bg-secondary-orbitvu/10',
      highlight: results.roi5ans > 200,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-secondary-orbitvu/10 to-secondary-orbitvu/5 rounded-2xl p-6 md:p-8 mb-8">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-dark mb-6 text-center">
        {t.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={cn(
              'rounded-xl p-4 transition-all',
              metric.bgColor,
              metric.highlight && 'ring-2 ring-secondary-orbitvu ring-offset-2'
            )}
          >
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', metric.bgColor)}>
              <metric.icon className={cn('w-5 h-5', metric.color)} />
            </div>
            <p className="text-sm text-neutral-medium mb-1">{metric.label}</p>
            <p className={cn('text-2xl font-heading font-bold', metric.color)}>
              {metric.value}
            </p>
            {metric.sublabel && (
              <p className="text-xs text-neutral-medium mt-1">{metric.sublabel}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
