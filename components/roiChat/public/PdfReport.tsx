'use client';

/**
 * Rendu DÉDIÉ à l'export PDF du mode public (demande Seb 07/08) : pleine
 * largeur A4 (794 px), monté hors écran dans DossierPanel — le PDF n'est
 * plus une capture du panneau étroit (tuiles écrasées, infos manquantes).
 *
 * Sections capturées par PDFGenerator (data-pdf-section) :
 *  1. qualification du dossier (la conversation résumée en données) ;
 *  2. résultats : métriques 4 colonnes, ou analyse différentielle par
 *     fonction (cas XL G2 MDC — y compris mesure seule, sans la photo),
 *     ou lecture coût de revient ;
 *  3. graphique d'évolution + timeline (modes adaptés) ;
 *  4. hypothèses de calcul + mention moteur.
 */

import dynamic from 'next/dynamic';
import HeroMetrics from '@/components/calculators/ROICalculator/results/HeroMetrics';
import BreakEvenTimeline from '@/components/calculators/ROICalculator/results/BreakEvenTimeline';
import { adaptEngineResults } from '@/lib/roiChat/adaptResults';
import { rehydratePublicResults, buildHypotheses } from '@/lib/roiChat/publicDisplay';
import {
  DOSSIER_CHECKLIST,
  DOSSIER_EXTRAS,
  formatDossierValue,
  type RoiPublicDossier,
} from '@/lib/roiChat/dossier';
import type { PublicRoiResults } from '@/lib/roiEngine';
import { PublicDifferentielCard, CoutRevientCard } from './PublicCalcCards';

const EvolutionChart = dynamic(
  () => import('@/components/calculators/ROICalculator/results/EvolutionChart'),
  { ssr: false }
);

export default function PdfReport({
  results,
  dossier,
}: {
  results: PublicRoiResults;
  dossier: RoiPublicDossier;
}) {
  const adapted =
    results.differentiel || results.coutRevient
      ? null
      : adaptEngineResults(rehydratePublicResults(results));
  const hypotheses = buildHypotheses(results);
  const qualification = [...DOSSIER_CHECKLIST, ...DOSSIER_EXTRAS]
    .map(({ key, label }) => ({ label, value: formatDossierValue(dossier, key) }))
    .filter((e): e is { label: string; value: string } => e.value !== null);

  return (
    <div className="w-[794px] bg-white p-4 space-y-4 text-text-dark">
      {/* 1. Qualification du dossier */}
      {qualification.length > 0 && (
        <div data-pdf-section className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-lg font-heading font-bold text-future-dusk-900 mb-3">
            Votre dossier
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {qualification.map(({ label, value }) => (
              <p key={label} className="text-sm">
                <span className="text-future-dusk-500">{label} : </span>
                <span className="text-future-dusk-900">{value}</span>
              </p>
            ))}
            {(dossier.autres ?? []).map((info, i) => (
              <p key={`autre-${i}`} className="text-sm text-future-dusk-900">
                {info}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 2. Résultats */}
      {adapted ? (
        <>
          <div data-pdf-section>
            <HeroMetrics results={adapted} locale="fr" columns={4} />
          </div>
          <div data-pdf-section>
            <EvolutionChart results={adapted} locale="fr" animate={false} />
          </div>
          <div data-pdf-section>
            <BreakEvenTimeline results={adapted} locale="fr" />
          </div>
        </>
      ) : results.differentiel ? (
        <div data-pdf-section>
          <PublicDifferentielCard results={results} />
        </div>
      ) : results.coutRevient ? (
        <div data-pdf-section>
          <CoutRevientCard results={results} />
        </div>
      ) : null}

      {/* 3. Hypothèses + mention moteur */}
      <div data-pdf-section className="rounded-2xl border border-neutral-200 p-5">
        <h3 className="text-sm font-heading font-bold text-future-dusk-900 mb-2">
          Hypothèses de calcul
        </h3>
        <ul className="space-y-1">
          {hypotheses.map((h) => (
            <li key={h.label} className="text-sm">
              <span className="text-future-dusk-500">{h.label} : </span>
              <span className="text-future-dusk-900">{h.value}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-future-dusk-400 mt-3 pt-3 border-t border-neutral-100">
          Montants calculés par le moteur ROI PackshotCreator (règles déterministes et vérifiées,
          identiques pour tous les clients) à partir de vos informations — l&apos;intelligence
          artificielle ne génère aucun chiffre. Estimations présentées avant impôt ; contactez
          notre équipe pour une analyse contractuelle personnalisée.
        </p>
      </div>
    </div>
  );
}
