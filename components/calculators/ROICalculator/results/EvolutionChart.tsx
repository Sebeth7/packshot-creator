'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { generateChartData, formatEuro } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';
import { CHART_COLORS } from '../lib/chartColors';

interface EvolutionChartProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    title: 'Évolution des Coûts sur 5 Ans',
    current: 'Situation actuelle',
    orbitvu: 'Avec Orbitvu',
    breakeven: 'Break-even',
    month: 'Mois',
    cost: 'Coût cumulé',
    breakevenNote: 'À partir du mois',
    savingsNote: ', chaque euro dépensé génère des économies pures.',
  },
  en: {
    title: 'Cost Evolution Over 5 Years',
    current: 'Current situation',
    orbitvu: 'With Orbitvu',
    breakeven: 'Break-even',
    month: 'Month',
    cost: 'Cumulative cost',
    breakevenNote: 'From month',
    savingsNote: ', every euro spent generates pure savings.',
  },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: number;
  locale: 'fr' | 'en';
}

function CustomTooltip({ active, payload, label, locale }: CustomTooltipProps) {
  const t = LABELS[locale];

  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-neutral-light">
        <p className="font-bold text-neutral-dark mb-2">{t.month} {label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {formatEuro(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function EvolutionChart({ results, locale }: EvolutionChartProps) {
  const t = LABELS[locale];
  const data = generateChartData(results);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-heading font-bold text-neutral-dark mb-6">
        {t.title}
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActuel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.current} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.current} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrbitvu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.orbitvu} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.orbitvu} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />

            <XAxis
              dataKey="mois"
              tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
              tickLine={{ stroke: CHART_COLORS.grid }}
            />

            <YAxis
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
              tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
              tickLine={{ stroke: CHART_COLORS.grid }}
            />

            <Tooltip content={<CustomTooltip locale={locale} />} />

            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-neutral-dark">{value}</span>
              )}
            />

            {/* Ligne de break-even */}
            {results.breakEvenMois && (
              <ReferenceLine
                x={Math.round(results.breakEvenMois)}
                stroke={CHART_COLORS.breakEven}
                strokeDasharray="5 5"
                label={{
                  value: t.breakeven,
                  fill: CHART_COLORS.breakEven,
                  fontSize: 12,
                  position: 'top',
                }}
              />
            )}

            <Area
              type="monotone"
              dataKey="actuel"
              name={t.current}
              stroke={CHART_COLORS.current}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorActuel)"
            />

            <Area
              type="monotone"
              dataKey="orbitvu"
              name={t.orbitvu}
              stroke={CHART_COLORS.orbitvu}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrbitvu)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Légende explicative */}
      {results.breakEvenMois && (
        <div className="mt-4 p-4 bg-accent-success/10 rounded-lg">
          <p className="text-sm text-accent-success font-medium">
            {t.breakevenNote} {Math.round(results.breakEvenMois)}{t.savingsNote}
          </p>
        </div>
      )}
    </div>
  );
}
