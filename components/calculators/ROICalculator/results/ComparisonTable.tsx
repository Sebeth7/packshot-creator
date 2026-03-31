'use client';

import { cn } from '@/lib/utils';
import { Check, X, ArrowRight } from 'lucide-react';
import { formatHeures } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface ComparisonTableProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    title: 'Gains de Temps & Production',
    metric: 'Métrique',
    current: 'Actuellement',
    withOrbitvu: 'Avec PackshotCreator',
    difference: 'Différence',
    timePerPhoto: 'Temps par produit',
    productionDays: 'Jours de production',
    annualCapacity: 'Capacité annuelle',
    photos: 'produits',
    days: 'jours',
    faster: 'plus rapide',
    less: 'en moins',
  },
  en: {
    title: 'Time & Production Gains',
    metric: 'Metric',
    current: 'Currently',
    withOrbitvu: 'With PackshotCreator',
    difference: 'Difference',
    timePerPhoto: 'Time per product',
    productionDays: 'Production days',
    annualCapacity: 'Annual capacity',
    photos: 'products',
    days: 'days',
    faster: 'faster',
    less: 'less',
  },
};

export default function ComparisonTable({ results, locale }: ComparisonTableProps) {
  const t = LABELS[locale];

  const rows = [
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
      <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-6">
        {t.title}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-future-dusk-500">
                {t.metric}
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-future-dusk-500">
                {t.current}
              </th>
              <th className="text-center py-3 px-4">
                <ArrowRight className="w-4 h-4 text-future-dusk-500 mx-auto" />
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-very-peri-600">
                {t.withOrbitvu}
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-future-dusk-500">
                {t.difference}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  'border-b border-neutral-100',
                  index % 2 === 0 && 'bg-neutral-50'
                )}
              >
                <td className="py-4 px-4 text-sm font-medium text-future-dusk-900">
                  {row.label}
                </td>
                <td className="py-4 px-4 text-center text-sm text-future-dusk-500">
                  {row.current}
                </td>
                <td className="py-4 px-4 text-center">
                  <ArrowRight className="w-4 h-4 text-neutral-300 mx-auto" />
                </td>
                <td className="py-4 px-4 text-center text-sm font-bold text-very-peri-600">
                  {row.orbitvu}
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                      row.isPositive
                        ? 'bg-emerald-50 text-emerald-600'
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
