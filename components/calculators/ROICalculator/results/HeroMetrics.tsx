'use client';

import { cn } from '@/lib/utils';
import { Clock, PiggyBank, CalendarClock, TrendingUp } from 'lucide-react';
import { formatEuro } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface HeroMetricsProps {
  results: CalculationResults;
  locale: 'fr' | 'en' | 'de-ch';
  /** 2 pour les conteneurs étroits (panneau du chat ROI) — défaut 4 (wizard) */
  columns?: 2 | 4;
}

const LABELS = {
  fr: {
    title: 'Votre Analyse ROI Personnalisée',
    titleLeasing: 'Votre Analyse ROI en Leasing',
    breakeven: 'Machine rentabilisée en',
    breakevenLeasing: 'Rentable dès',
    netCost: 'Coût net mensuel',
    netCostNote: 'Loyer moins les coûts supprimés — avant valorisation du temps libéré',
    netCostNoteBuy: 'Coût annuel net — avant valorisation du temps libéré',
    savings: 'Économie directe annuelle',
    savingsNote: 'Prestataires et équipement remplacés, coût machine déduit',
    savingsNone: '—',
    savingsNoneNote: 'Production 100% interne : votre gain est le temps libéré',
    freedTime: 'Temps interne libéré',
    freedTimeUnit: 'jours/an',
    freedTimeNote: (val: string) => `≈ ${val}/an de temps de travail réaffectable`,
    roi5: 'ROI sur 5 ans',
    roiLeasing: 'ROI sur la durée du contrat',
    roi5Note: "d'économies nettes cumulées",
    capacity: 'Capacité de production',
    capacityNote: (val: string) => `${val} produits/an possibles`,
    months: 'mois',
    month1: 'le 1er mois',
    taxNote: 'Montants avant impôt — amortissement déductible (IS)',
    taxNoteLeasing: 'Montants avant impôt — loyers 100% déductibles (IS)',
  },
  en: {
    title: 'Your Personalized ROI Analysis',
    titleLeasing: 'Your Leasing ROI Analysis',
    breakeven: 'Machine pays for itself in',
    breakevenLeasing: 'Profitable from',
    netCost: 'Net monthly cost',
    netCostNote: 'Lease payment minus eliminated costs — before freed-time value',
    netCostNoteBuy: 'Net annual cost — before freed-time value',
    savings: 'Direct annual savings',
    savingsNote: 'External providers and equipment replaced, machine cost deducted',
    savingsNone: '—',
    savingsNoneNote: 'Fully in-house production: your gain is the freed time',
    freedTime: 'In-house time freed up',
    freedTimeUnit: 'days/year',
    freedTimeNote: (val: string) => `≈ ${val}/year of redeployable working time`,
    roi5: '5-year ROI',
    roiLeasing: 'ROI over contract duration',
    roi5Note: 'in cumulative net savings',
    capacity: 'Production capacity',
    capacityNote: (val: string) => `${val} products/year possible`,
    months: 'months',
    month1: 'month 1',
    taxNote: 'Pre-tax amounts — depreciation is tax-deductible',
    taxNoteLeasing: 'Pre-tax amounts — lease payments 100% deductible',
  },
  'de-ch': {
    title: 'Ihre personalisierte ROI-Analyse',
    titleLeasing: 'Ihre ROI-Analyse im Leasing',
    breakeven: 'Maschine amortisiert in',
    breakevenLeasing: 'Rentabel ab',
    netCost: 'Netto-Monatskosten',
    netCostNote: 'Leasingrate abzüglich wegfallender Kosten — vor Bewertung der freigesetzten Zeit',
    netCostNoteBuy: 'Netto-Jahreskosten — vor Bewertung der freigesetzten Zeit',
    savings: 'Direkte jährliche Einsparung',
    savingsNote: 'Externe Dienstleister und Ausrüstung ersetzt, Maschinenkosten abgezogen',
    savingsNone: '—',
    savingsNoneNote: 'Vollständig interne Produktion: Ihr Gewinn ist die freigesetzte Zeit',
    freedTime: 'Freigesetzte interne Zeit',
    freedTimeUnit: 'Tage/Jahr',
    freedTimeNote: (val: string) => `≈ ${val}/Jahr an umverteilbarer Arbeitszeit`,
    roi5: 'ROI über 5 Jahre',
    roiLeasing: 'ROI über die Vertragslaufzeit',
    roi5Note: 'an kumulierten Netto-Einsparungen',
    capacity: 'Produktionskapazität',
    capacityNote: (val: string) => `${val} Produkte/Jahr möglich`,
    months: 'Monate',
    month1: 'ab dem 1. Monat',
    taxNote: 'Beträge vor Steuern — Abschreibung steuerlich absetzbar',
    taxNoteLeasing: 'Beträge vor Steuern — Leasingraten zu 100% absetzbar',
  },
};

export default function HeroMetrics({ results, locale, columns = 4 }: HeroMetricsProps) {
  const t = LABELS[locale] ?? LABELS.en;

  // Si non rentable, ne pas afficher ces métriques
  if (!results.isRentable) {
    return null;
  }

  const isLeasing = results.isLeasing;
  const taxLabel = isLeasing ? t.taxNoteLeasing : t.taxNote;
  const cashPositif = results.economieAnnuelle > 0;

  // Tuile 1 : rentabilité cash, ou coût net quand le cash seul ne couvre pas
  const breakevenMetric = cashPositif || results.breakEvenMois
    ? {
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
      }
    : {
        icon: Clock,
        label: t.netCost,
        value: isLeasing
          ? formatEuro((results.tcoAnnuel - results.coutCashActuel) / 12)
          : formatEuro(results.tcoAnnuel - results.coutCashActuel),
        sublabel: isLeasing ? t.netCostNote : t.netCostNoteBuy,
        color: 'text-very-peri-600',
        bgColor: 'bg-very-peri-100',
        highlight: false,
      };

  // Tuile 4 : ROI cash, ou capacité quand le cash seul est négatif
  const roiMetric = cashPositif
    ? {
        icon: TrendingUp,
        label: isLeasing ? t.roiLeasing : t.roi5,
        value: `+${Math.round(results.roi5ans)}%`,
        sublabel: `${formatEuro(results.economie5ans)} ${t.roi5Note} — ${taxLabel}`,
        color: 'text-very-peri-600',
        bgColor: 'bg-very-peri-100',
        highlight: results.roi5ans > 200,
      }
    : {
        icon: TrendingUp,
        label: t.capacity,
        value: `×${Math.max(1, Math.round((results.potentielCroissance + 100) / 100))}`,
        sublabel: t.capacityNote(Math.round(results.capaciteAnnuelleMachine).toLocaleString('fr-FR')),
        color: 'text-very-peri-600',
        bgColor: 'bg-very-peri-100',
        highlight: false,
      };

  const metrics = [
    breakevenMetric,
    {
      icon: PiggyBank,
      label: t.savings,
      value: cashPositif ? formatEuro(results.economieAnnuelle) : t.savingsNone,
      sublabel: cashPositif ? `${t.savingsNote} — ${taxLabel}` : t.savingsNoneNote,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      highlight: cashPositif,
    },
    {
      icon: CalendarClock,
      label: t.freedTime,
      value: `${Math.round(results.tempsLibereJours)} ${t.freedTimeUnit}`,
      sublabel: t.freedTimeNote(formatEuro(results.valeurTempsLibere)),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      highlight: !cashPositif,
    },
    roiMetric,
  ];

  return (
    <div className="bg-gradient-to-br from-very-peri-100 to-very-peri-50 rounded-2xl p-6 md:p-8 mb-8">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-future-dusk-900 mb-6 text-center">
        {isLeasing ? t.titleLeasing : t.title}
      </h2>

      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 gap-4',
          columns === 4 && 'lg:grid-cols-4'
        )}
      >
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
