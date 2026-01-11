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
    roi3: 'ROI sur 3 ans',
    roi3Note: 'de bénéfices nets',
    months: 'mois',
    savedPerPhoto: 'économisés/photo',
  },
  en: {
    title: 'Your Personalized ROI Analysis',
    breakeven: 'Machine pays for itself in',
    savings: 'Annual savings',
    savingsNote: 'From year 2',
    perPhoto: 'Savings per photo',
    roi3: '3-year ROI',
    roi3Note: 'net benefits',
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
      color: 'text-primary-turquoise',
      bgColor: 'bg-primary-turquoise/10',
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
      label: t.roi3,
      value: `+${Math.round(results.roi3ans)}%`,
      sublabel: `${formatEuro(results.economie3ans)} ${t.roi3Note}`,
      color: 'text-primary-turquoise',
      bgColor: 'bg-primary-turquoise/10',
      highlight: results.roi3ans > 200,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary-turquoise/10 to-primary-turquoise/5 rounded-2xl p-6 md:p-8 mb-8">
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
              metric.highlight && 'ring-2 ring-primary-turquoise ring-offset-2'
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
