'use client';

/**
 * Cartes de résultats du mode public (UX §3 et §5) : composants du wizard
 * réutilisés + transparence IA vs moteur (badge « Calculé par le moteur
 * ROI », lien méthodologie) + hypothèses toujours visibles et modifiables.
 * Le différentiel masque les écarts d'investissement catalogue (« sur
 * devis ») — conformément au filtre public.
 */

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Cog, HelpCircle, Scale, Timer, TrendingUp, Calculator } from 'lucide-react';
import HeroMetrics from '@/components/calculators/ROICalculator/results/HeroMetrics';
import BreakEvenTimeline from '@/components/calculators/ROICalculator/results/BreakEvenTimeline';
import MethodologyModal from '@/components/calculators/ROICalculator/results/MethodologyModal';
import { formatEuro } from '@/components/calculators/ROICalculator/lib/calculations';
import { adaptEngineResults } from '@/lib/roiChat/adaptResults';
import { rehydratePublicResults, buildHypotheses } from '@/lib/roiChat/publicDisplay';
import type { PublicRoiResults } from '@/lib/roiEngine';

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

/** Variante publique de la carte différentielle : écarts de prix « sur devis ». */
function PublicDifferentielCard({ results }: { results: PublicRoiResults }) {
  const d = results.differentiel!;
  return (
    <div className="bg-gradient-to-br from-very-peri-100 to-very-peri-50 rounded-2xl p-6">
      <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-1">
        Analyse comparative{' '}
        {results.machine.machineNom && results.baselineMachineResolved?.machineNom
          ? `— ${results.machine.machineNom} vs ${results.baselineMachineResolved.machineNom}`
          : ''}
      </h3>
      <p className="text-xs text-future-dusk-500 mb-4">
        Gain en temps opérateur valorisé — hypothèses présentées comme un minimum.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Tile
          icon={Timer}
          label="Gain par produit"
          value={formatEuro(d.gainParProduit)}
          sublabel={`${d.minutesParProduit} min évitées/produit`}
        />
        <Tile
          icon={Calculator}
          label="Amortissement du surcoût"
          value={
            d.breakEvenProduits
              ? `${Math.round(d.breakEvenProduits).toLocaleString('fr-FR')} produits`
              : 'sur devis'
          }
          sublabel={
            d.breakEvenAnnees ? `≈ ${d.breakEvenAnnees.toFixed(1)} ans au volume déclaré` : undefined
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

function CoutRevientCard({ results }: { results: PublicRoiResults }) {
  const c = results.coutRevient!;
  return (
    <div className="bg-gradient-to-br from-very-peri-100 to-very-peri-50 rounded-2xl p-6">
      <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-4">
        Lecture coût de revient
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <Tile
          icon={Calculator}
          label="Coût par produit"
          value={
            c.coutParProduit >= 1
              ? formatEuro(c.coutParProduit)
              : `${(c.coutParProduit * 100).toFixed(0)} cts`
          }
          sublabel="coût studio annuel / volume"
        />
        {c.capaciteAnnuelleMachine && (
          <Tile
            icon={TrendingUp}
            label="Capacité annuelle"
            value={c.capaciteAnnuelleMachine.toLocaleString('fr-FR')}
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

export default function PublicCalcCards({
  results,
  onEditHypothese,
}: {
  results: PublicRoiResults;
  /** Clic « modifier » sur une hypothèse → reprise dans la conversation */
  onEditHypothese?: (label: string, value: string) => void;
}) {
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const hypotheses = buildHypotheses(results);

  let cards: React.ReactNode;
  if (results.differentiel) {
    cards = <PublicDifferentielCard results={results} />;
  } else if (results.coutRevient) {
    cards = <CoutRevientCard results={results} />;
  } else {
    const adapted = adaptEngineResults(rehydratePublicResults(results));
    if (!adapted) return null;
    cards = (
      <div className="space-y-4">
        <HeroMetrics results={adapted} locale="fr" />
        <div data-pdf-exclude-chart-animation>
          <EvolutionChart results={adapted} locale="fr" />
        </div>
        <BreakEvenTimeline results={adapted} locale="fr" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div data-pdf-section>{cards}</div>

      {/* Badge moteur + méthodologie (UX §3) */}
      <div className="flex items-center justify-between gap-2 flex-wrap" data-pdf-exclude>
        <span className="inline-flex items-center gap-1.5 text-xs text-future-dusk-500 bg-neutral-100 rounded-full px-3 py-1">
          <Cog className="w-3.5 h-3.5" />
          Calculé par le moteur ROI — pas par l&apos;IA
        </span>
        <button
          type="button"
          onClick={() => setMethodologyOpen(true)}
          className="inline-flex items-center gap-1 text-xs text-very-peri-600 hover:text-very-peri-800 underline underline-offset-2 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Comment ces chiffres sont-ils calculés ?
        </button>
      </div>

      {/* Hypothèses toujours visibles, modifiables (UX §5) */}
      <div className="rounded-xl border border-neutral-200 bg-white p-3" data-pdf-section>
        <p className="text-xs font-medium text-future-dusk-700 mb-1.5">Hypothèses de calcul</p>
        <ul className="space-y-1">
          {hypotheses.map((h) => (
            <li key={h.label} className="flex items-baseline justify-between gap-2 text-xs">
              <span className="text-future-dusk-500">
                {h.label} : <span className="text-future-dusk-900">{h.value}</span>
              </span>
              {onEditHypothese && (
                <button
                  type="button"
                  onClick={() => onEditHypothese(h.label, h.value)}
                  className="text-very-peri-600 hover:text-very-peri-800 underline underline-offset-2 shrink-0 transition-colors"
                  data-pdf-exclude
                >
                  modifier
                </button>
              )}
            </li>
          ))}
        </ul>
        {/* Rappel discret sous chaque bloc de chiffres (UX §3) — inclus au PDF */}
        <p className="text-[11px] text-future-dusk-400 mt-2 pt-2 border-t border-neutral-100">
          Montants calculés par le moteur ROI PackshotCreator (règles déterministes) à partir de vos
          informations — l&apos;intelligence artificielle ne génère aucun chiffre.
        </p>
      </div>

      <MethodologyModal
        isOpen={methodologyOpen}
        onClose={() => setMethodologyOpen(false)}
        locale="fr"
      />
    </div>
  );
}
