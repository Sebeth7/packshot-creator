'use client';

/**
 * Affichage des résultats de calcul dans le fil du chat.
 * - Modes vs-existant / contrefactuel : réutilise les composants du wizard
 *   (HeroMetrics, EvolutionChart, BreakEvenTimeline) via l'adaptateur.
 * - Mode différentiel et repli coût de revient : cartes dédiées.
 */

import dynamic from 'next/dynamic';
import { Scale, Timer, TrendingUp, Calculator } from 'lucide-react';
import HeroMetrics from '@/components/calculators/ROICalculator/results/HeroMetrics';
import BreakEvenTimeline from '@/components/calculators/ROICalculator/results/BreakEvenTimeline';
import { formatEuro } from '@/components/calculators/ROICalculator/lib/calculations';
import { adaptEngineResults } from '@/lib/roiChat/adaptResults';
import type { RoiEngineResults } from '@/lib/roiEngine';

const EvolutionChart = dynamic(
  () => import('@/components/calculators/ROICalculator/results/EvolutionChart'),
  { ssr: false, loading: () => <div className="h-64 bg-neutral-100 rounded-xl animate-pulse" /> }
);

function Tile({
  icon: Icon,
  label,
  value,
  sublabel,
}: {
  icon: typeof Scale;
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="rounded-xl p-4 bg-very-peri-100">
      <Icon className="w-5 h-5 text-very-peri-600 mb-2" />
      <p className="text-sm text-future-dusk-500 mb-1">{label}</p>
      <p className="text-xl font-heading font-bold text-very-peri-600">{value}</p>
      {sublabel && <p className="text-xs text-future-dusk-500 mt-1">{sublabel}</p>}
    </div>
  );
}

function DifferentielCard({ results }: { results: RoiEngineResults }) {
  const d = results.differentiel!;
  return (
    <div className="bg-gradient-to-br from-very-peri-100 to-very-peri-50 rounded-2xl p-6 my-3">
      <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-1">
        Analyse différentielle{' '}
        {results.machine.machineNom && results.baselineMachineResolved?.machineNom
          ? `— ${results.machine.machineNom} vs ${results.baselineMachineResolved.machineNom}`
          : ''}
      </h3>
      <p className="text-xs text-future-dusk-500 mb-4">
        Gain en temps opérateur valorisé — hypothèses présentées comme un plancher.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Tile
          icon={Scale}
          label="Surcoût d'investissement"
          value={d.deltaInvestissement > 0 ? formatEuro(d.deltaInvestissement) : '—'}
          sublabel={`net après IS ~${formatEuro(d.deltaInvestissementNetIS)}`}
        />
        <Tile
          icon={Timer}
          label="Gain par produit"
          value={`${formatEuro(d.gainParProduit)}`}
          sublabel={`${d.minutesParProduit} min évitées/produit`}
        />
        <Tile
          icon={Calculator}
          label="Break-even"
          value={
            d.breakEvenProduits ? `${Math.round(d.breakEvenProduits).toLocaleString('fr-FR')} produits` : '—'
          }
          sublabel={
            d.breakEvenAnnees
              ? `≈ ${d.breakEvenAnnees.toFixed(1)} ans au volume déclaré`
              : undefined
          }
        />
        <Tile
          icon={TrendingUp}
          label="Gain annuel"
          value={formatEuro(d.gainAnnuel)}
          sublabel={`à ${results.volumeAnnuel.toLocaleString('fr-FR')} produits/an`}
        />
      </div>
      {d.parFonction.length > 1 && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-future-dusk-500">
                <th className="py-1 pr-4 font-medium">Fonction</th>
                <th className="py-1 pr-4 font-medium">min/produit</th>
                <th className="py-1 pr-4 font-medium">€/produit</th>
                <th className="py-1 font-medium">Gain annuel</th>
              </tr>
            </thead>
            <tbody>
              {d.parFonction.map((f) => (
                <tr key={f.fonction} className="border-t border-very-peri-200">
                  <td className="py-1.5 pr-4">{f.label}</td>
                  <td className="py-1.5 pr-4">{f.minutesParProduit}</td>
                  <td className="py-1.5 pr-4">{formatEuro(f.euroParProduit)}</td>
                  <td className="py-1.5">{formatEuro(f.gainAnnuel)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CoutRevientCard({ results }: { results: RoiEngineResults }) {
  const c = results.coutRevient!;
  return (
    <div className="bg-gradient-to-br from-very-peri-100 to-very-peri-50 rounded-2xl p-6 my-3">
      <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-4">
        Lecture coût de revient
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Tile
          icon={Calculator}
          label="Coût par produit"
          value={
            c.coutParProduit >= 1
              ? formatEuro(c.coutParProduit)
              : `${(c.coutParProduit * 100).toFixed(0)} cts`
          }
          sublabel="coût machine annuel / volume"
        />
        {c.capaciteAnnuelleMachine && (
          <Tile
            icon={TrendingUp}
            label="Capacité annuelle"
            value={`${c.capaciteAnnuelleMachine.toLocaleString('fr-FR')}`}
            sublabel="produits/an possibles"
          />
        )}
        {c.seuilRentabiliteProduitsAn && (
          <Tile
            icon={Scale}
            label="Seuil de rentabilité"
            value={`${Math.round(c.seuilRentabiliteProduitsAn).toLocaleString('fr-FR')} produits/an`}
            sublabel={`vs référence à ${formatEuro(c.prixReferenceParProduit ?? 0)}/produit`}
          />
        )}
      </div>
    </div>
  );
}

export default function CalcResultCards({ results }: { results: RoiEngineResults }) {
  if (results.differentiel) {
    return <DifferentielCard results={results} />;
  }
  if (results.coutRevient) {
    return <CoutRevientCard results={results} />;
  }
  const adapted = adaptEngineResults(results);
  if (!adapted) return null;
  return (
    <div className="my-3 space-y-4">
      <HeroMetrics results={adapted} locale="fr" />
      <EvolutionChart results={adapted} locale="fr" />
      <BreakEvenTimeline results={adapted} locale="fr" />
    </div>
  );
}
