'use client';

/**
 * Rendu DÉDIÉ à l'export PDF du mode public (demande Seb 07/08) : pleine
 * largeur A4 (794 px), monté hors écran dans DossierPanel — le PDF n'est
 * plus une capture du panneau étroit (tuiles écrasées, infos manquantes).
 *
 * Sections capturées par PDFGenerator (data-pdf-section) :
 *  1. qualification du dossier (la conversation résumée en données) ;
 *  2. chaque étude épinglée (arbitrage multi-modèles possible) : métriques
 *     4 colonnes + graphique + timeline — ou analyse différentielle par
 *     fonction (cas XL G2 MDC, y compris mesure seule), ou coût de revient ;
 *  3. arguments commerciaux (parité wizard) : atouts clés du modèle
 *     recommandé + bénéfices additionnels ;
 *  4. hypothèses de calcul + mention moteur.
 */

import dynamic from 'next/dynamic';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import HeroMetrics from '@/components/calculators/ROICalculator/results/HeroMetrics';
import BreakEvenTimeline from '@/components/calculators/ROICalculator/results/BreakEvenTimeline';
import AdditionalBenefits from '@/components/calculators/ROICalculator/results/AdditionalBenefits';
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

/** Atouts clés du modèle (parité « arguments commerciaux » du wizard). */
function MachineAdvantages({ machineId }: { machineId: string }) {
  const machine = MACHINES.find((m) => m.id === machineId);
  if (!machine || machine.keyAdvantages.length === 0) return null;
  return (
    <div data-pdf-section className="rounded-2xl border border-neutral-200 p-5">
      <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-3">
        Pourquoi le {machine.nom} ?
      </h3>
      <ul className="space-y-2.5">
        {machine.keyAdvantages.map((adv, i) => (
          <li key={i}>
            <p className="text-sm font-medium text-future-dusk-900">✓ {adv.fr}</p>
            {adv.description?.fr && (
              <p className="text-xs text-future-dusk-500 leading-relaxed mt-0.5">
                {adv.description.fr}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PdfReport({
  studies,
  dossier,
}: {
  studies: PublicRoiResults[];
  dossier: RoiPublicDossier;
}) {
  const qualification = [...DOSSIER_CHECKLIST, ...DOSSIER_EXTRAS]
    .map(({ key, label }) => ({ label, value: formatDossierValue(dossier, key) }))
    .filter((e): e is { label: string; value: string } => e.value !== null);

  const primary = studies[0] ?? null;
  const primaryAdapted =
    primary && !primary.differentiel && !primary.coutRevient
      ? adaptEngineResults(rehydratePublicResults(primary))
      : null;

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

      {/* 2. Études épinglées */}
      {studies.map((study, i) => {
        const adapted =
          study.differentiel || study.coutRevient
            ? null
            : adaptEngineResults(rehydratePublicResults(study));
        const key = `${study.machine.machineId ?? study.machine.machineNom ?? i}|${study.mode}`;
        return (
          <div key={key} className="space-y-4">
            {studies.length > 1 && (
              <div data-pdf-section>
                <p className="text-base font-heading font-bold text-very-peri-600 border-b border-very-peri-200 pb-1">
                  Étude {i + 1} — {study.machine.machineNom ?? 'analyse'}
                  {study.isLeasing ? ' (leasing)' : ' (achat)'}
                </p>
              </div>
            )}
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
            ) : study.differentiel ? (
              <div data-pdf-section>
                <PublicDifferentielCard results={study} />
              </div>
            ) : study.coutRevient ? (
              <div data-pdf-section>
                <CoutRevientCard results={study} />
              </div>
            ) : null}
          </div>
        );
      })}

      {/* 3. Arguments commerciaux (parité wizard) */}
      {primary?.machine.machineId && <MachineAdvantages machineId={primary.machine.machineId} />}
      {primaryAdapted && (
        <div data-pdf-section>
          <AdditionalBenefits results={primaryAdapted} locale="fr" />
        </div>
      )}

      {/* 4. Hypothèses + mention moteur */}
      {primary && (
        <div data-pdf-section className="rounded-2xl border border-neutral-200 p-5">
          <h3 className="text-sm font-heading font-bold text-future-dusk-900 mb-2">
            Hypothèses de calcul
          </h3>
          <ul className="space-y-1">
            {buildHypotheses(primary).map((h) => (
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
      )}
    </div>
  );
}
