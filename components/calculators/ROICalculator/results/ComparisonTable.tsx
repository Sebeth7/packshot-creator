'use client';

import { cn } from '@/lib/utils';
import { Check, X, ArrowRight } from 'lucide-react';
import { formatEuro, formatHeures } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface ComparisonTableProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    title: 'Comparaison Avant / Après',
    metric: 'Métrique',
    current: 'Actuellement',
    withOrbitvu: 'Avec Orbitvu',
    difference: 'Différence',
    annualCost: 'Coût annuel total',
    costPerPhoto: 'Coût par photo',
    timePerPhoto: 'Temps par photo',
    productionDays: 'Jours de production',
    annualCapacity: 'Capacité annuelle',
    photos: 'photos',
    days: 'jours',
    saved: 'économisés',
    faster: 'plus rapide',
    less: 'en moins',
  },
  en: {
    title: 'Before / After Comparison',
    metric: 'Metric',
    current: 'Currently',
    withOrbitvu: 'With Orbitvu',
    difference: 'Difference',
    annualCost: 'Total annual cost',
    costPerPhoto: 'Cost per photo',
    timePerPhoto: 'Time per photo',
    productionDays: 'Production days',
    annualCapacity: 'Annual capacity',
    photos: 'photos',
    days: 'days',
    saved: 'saved',
    faster: 'faster',
    less: 'less',
  },
};

export default function ComparisonTable({ results, locale }: ComparisonTableProps) {
  const t = LABELS[locale];

  const rows = [
    {
      label: t.annualCost,
      current: formatEuro(results.coutTotalActuel),
      orbitvu: formatEuro(results.coutTotalMachine),
      diff: `-${formatEuro(results.economieAnnuelle)}`,
      isPositive: results.economieAnnuelle > 0,
    },
    {
      label: t.costPerPhoto,
      current: formatEuro(results.coutParPhotoActuel),
      orbitvu: formatEuro(results.coutParPhotoMachine),
      diff: `-${Math.round(results.economieParPhotoPourcent)}%`,
      isPositive: results.economieParPhoto > 0,
    },
    {
      label: t.timePerPhoto,
      current: formatHeures(results.tempsParPhotoHeures),
      orbitvu: formatHeures(results.tempsParPhotoMachine),
      diff: `${Math.round(results.gainTempsPourcent)}% ${t.faster}`,
      isPositive: results.gainTempsPourcent > 0,
    },
    {
      label: t.productionDays,
      current: `${Math.round(results.joursProductionActuels)} ${t.days}`,
      orbitvu: `${Math.round(results.joursProductionMachine)} ${t.days}`,
      diff: `${Math.round(results.joursEconomises)} ${t.days} ${t.less}`,
      isPositive: results.joursEconomises > 0,
    },
    {
      label: t.annualCapacity,
      current: `${Math.round(results.capaciteAnnuelleActuelle).toLocaleString()} ${t.photos}`,
      orbitvu: `${Math.round(results.capaciteAnnuelleMachine).toLocaleString()} ${t.photos}`,
      diff: `+${Math.round(results.potentielCroissance)}%`,
      isPositive: results.potentielCroissance > 0,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 overflow-hidden">
      <h3 className="text-xl font-heading font-bold text-neutral-dark mb-6">
        {t.title}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-light">
              <th className="text-left py-3 px-4 text-sm font-medium text-neutral-medium">
                {t.metric}
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-neutral-medium">
                {t.current}
              </th>
              <th className="text-center py-3 px-4">
                <ArrowRight className="w-4 h-4 text-neutral-medium mx-auto" />
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-primary-turquoise">
                {t.withOrbitvu}
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-neutral-medium">
                {t.difference}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  'border-b border-neutral-lighter',
                  index % 2 === 0 && 'bg-neutral-lighter/30'
                )}
              >
                <td className="py-4 px-4 text-sm font-medium text-neutral-dark">
                  {row.label}
                </td>
                <td className="py-4 px-4 text-center text-sm text-neutral-medium">
                  {row.current}
                </td>
                <td className="py-4 px-4 text-center">
                  <ArrowRight className="w-4 h-4 text-neutral-light mx-auto" />
                </td>
                <td className="py-4 px-4 text-center text-sm font-bold text-primary-turquoise">
                  {row.orbitvu}
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                      row.isPositive
                        ? 'bg-accent-success/10 text-accent-success'
                        : 'bg-red-100 text-red-600'
                    )}
                  >
                    {row.isPositive ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <X className="w-3 h-3" />
                    )}
                    {row.diff}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
