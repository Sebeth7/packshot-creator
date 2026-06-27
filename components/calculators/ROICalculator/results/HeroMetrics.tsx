'use client';

import { cn } from '@/lib/utils';
import { Clock, PiggyBank, Camera, TrendingUp } from 'lucide-react';
import { formatEuro } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface HeroMetricsProps {
  results: CalculationResults;
  locale: 'fr' | 'en' | 'de-ch';
}

const LABELS = {
  fr: {
    title: 'Votre Analyse ROI Personnalisée',
    titleLeasing: 'Votre Analyse ROI en Leasing',
    breakeven: 'Machine rentabilisée en',
    breakevenLeasing: 'Rentable dès',
    savings: 'Économie annuelle',
    savingsNote: "Dès l'année 2",
    savingsNoteLeasing: 'Économie nette annuelle',
    perPhoto: 'Économie par produit',
    roi5: 'ROI sur 5 ans',
    roiLeasing: 'ROI sur la durée du contrat',
    roi5Note: 'de bénéfices nets',
    months: 'mois',
    month1: 'le 1er mois',
    savedPerPhoto: 'économisés/produit',
    taxNote: "Incl. avantage fiscal IS 25%",
    taxNoteLeasing: "Loyers 100% déductibles (IS 25%)",
  },
  en: {
    title: 'Your Personalized ROI Analysis',
    titleLeasing: 'Your Leasing ROI Analysis',
    breakeven: 'Machine pays for itself in',
    breakevenLeasing: 'Profitable from',
    savings: 'Annual savings',
    savingsNote: 'From year 2',
    savingsNoteLeasing: 'Net annual savings',
    perPhoto: 'Savings per product',
    roi5: '5-year ROI',
    roiLeasing: 'ROI over contract duration',
    roi5Note: 'net benefits',
    months: 'months',
    month1: 'month 1',
    savedPerPhoto: 'saved/product',
    taxNote: 'Incl. 25% corporate tax benefit',
    taxNoteLeasing: 'Lease payments 100% deductible (25% CT)',
  },
  'de-ch': {
    title: 'Ihre personalisierte ROI-Analyse',
    titleLeasing: 'Ihre ROI-Analyse im Leasing',
    breakeven: 'Maschine amortisiert in',
    breakevenLeasing: 'Rentabel ab',
    savings: 'Jährliche Einsparung',
    savingsNote: 'Ab dem 2. Jahr',
    savingsNoteLeasing: 'Jährliche Netto-Einsparung',
    perPhoto: 'Einsparung pro Produkt',
    roi5: 'ROI über 5 Jahre',
    roiLeasing: 'ROI über die Vertragslaufzeit',
    roi5Note: 'an Netto-Gewinn',
    months: 'Monate',
    month1: 'ab dem 1. Monat',
    savedPerPhoto: 'gespart/Produkt',
    taxNote: 'Inkl. Steuervorteil (25%)',
    taxNoteLeasing: 'Leasingraten zu 100% absetzbar (25%)',
  },
};

export default function HeroMetrics({ results, locale }: HeroMetricsProps) {
  const t = LABELS[locale] ?? LABELS.en;

  // Si non rentable, ne pas afficher ces métriques
  if (!results.isRentable) {
    return null;
  }

  const isLeasing = results.isLeasing;
  const taxLabel = isLeasing ? t.taxNoteLeasing : t.taxNote;

  const metrics = [
    {
      icon: Clock,
      label: isLeasing ? t.breakevenLeasing : t.breakeven,
      value: isLeasing
        ? t.month1
        : results.breakEvenMois
          ? `${Math.round(results.breakEvenMois)} ${t.months}`
          : '-',
      sublabel: taxLabel,
      color: 'text-very-peri-600',
      bgColor: 'bg-very-peri-100',
      highlight: isLeasing || (results.breakEvenMois !== null && results.breakEvenMois < 18),
    },
    {
      icon: PiggyBank,
      label: t.savings,
      value: formatEuro(results.economieAnnuelle + results.avantageFiscalAnnuel),
      sublabel: `${isLeasing ? t.savingsNoteLeasing : t.savingsNote} — ${taxLabel}`,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
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
      label: isLeasing ? t.roiLeasing : t.roi5,
      value: `+${Math.round(results.roi5ans)}%`,
      sublabel: `${formatEuro(results.economie5ans)} ${t.roi5Note} — ${taxLabel}`,
      color: 'text-very-peri-600',
      bgColor: 'bg-very-peri-100',
      highlight: results.roi5ans > 200,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-very-peri-100 to-very-peri-50 rounded-2xl p-6 md:p-8 mb-8">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-future-dusk-900 mb-6 text-center">
        {isLeasing ? t.titleLeasing : t.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={cn(
              'rounded-xl p-4 transition-all',
              metric.bgColor,
              metric.highlight && 'ring-2 ring-very-peri-500 ring-offset-2'
            )}
          >
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', metric.bgColor)}>
              <metric.icon className={cn('w-5 h-5', metric.color)} />
            </div>
            <p className="text-sm text-future-dusk-500 mb-1">{metric.label}</p>
            <p className={cn('text-2xl font-heading font-bold', metric.color)}>
              {metric.value}
            </p>
            {metric.sublabel && (
              <p className="text-xs text-future-dusk-500 mt-1">{metric.sublabel}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
