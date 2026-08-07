'use client';

/**
 * Panneau « Votre dossier » (UX §2) : la conversation construit visiblement
 * quelque chose. Checklist de qualification en temps réel (cliquable pour
 * corriger), résultats épinglés qui survivent au défilement, encart de
 * transparence au premier résultat, capture email → PDF → CRM (UX §6).
 */

import { useRef, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Pencil,
  FileDown,
  Loader2,
  Check,
  ShieldCheck,
  Cog,
} from 'lucide-react';
import type { CalculationResults } from '@/components/calculators/ROICalculator/lib/types';
import { adaptEngineResults } from '@/lib/roiChat/adaptResults';
import { rehydratePublicResults } from '@/lib/roiChat/publicDisplay';
import {
  DOSSIER_EXTRAS,
  DOSSIER_GROUPS,
  dossierCompletion,
  formatDossierValue,
  type RoiPublicDossier,
} from '@/lib/roiChat/dossier';
import { getAttribution } from '@/lib/attribution';
import type { PublicRoiResults } from '@/lib/roiEngine';
import PublicCalcCards from './PublicCalcCards';
import PdfReport from './PdfReport';

interface DossierPanelProps {
  dossier: RoiPublicDossier;
  /** Études épinglées (une par modèle — arbitrage possible), vides avant le premier calcul */
  studies: PublicRoiResults[];
  /** Textes du fil (pour le résumé CRM côté serveur) */
  transcript: Array<{ role: 'user' | 'assistant'; text: string }>;
  /** Clic sur une donnée du dossier ou une hypothèse → reprise en conversation */
  onCorrect: (label: string, value: string) => void;
}

function LeadCapture({
  dossier,
  studies,
  transcript,
  pdfRef,
}: {
  dossier: RoiPublicDossier;
  studies: PublicRoiResults[];
  transcript: DossierPanelProps['transcript'];
  pdfRef: React.RefObject<HTMLDivElement | null>;
}) {
  const results = studies[0];
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function submit() {
    if (state === 'sending') return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState('error');
      return;
    }
    setState('sending');
    try {
      const res = await fetch('/api/roi-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim() || undefined,
          optInRecontact: optIn,
          dossier,
          results,
          studies,
          transcript: transcript.map((t) => ({ role: t.role, text: t.text.slice(0, 2000) })),
          attribution: getAttribution() ?? undefined,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // PDF côté client (parité wizard — jamais en pièce jointe)
      const { generatePDF } = await import(
        '@/components/calculators/ROICalculator/results/PDFGenerator'
      );
      const adapted =
        results.differentiel || results.coutRevient
          ? ({
              machine: { nom: results.machine.machineNom ?? 'Analyse ROI' },
            } as CalculationResults)
          : adaptEngineResults(rehydratePublicResults(results));
      if (pdfRef.current && adapted) {
        const blob = await generatePDF(pdfRef, adapted, 'fr', email.trim());
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ROI-${(results.machine.machineNom ?? 'analyse').replace(/\s+/g, '-')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      setState('done');
    } catch (err) {
      console.error('[roi-preview] lead:', err);
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="bg-emerald-50 rounded-xl p-4 text-center">
        <Check className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
        <p className="text-sm text-emerald-700 font-medium">
          Votre analyse a été téléchargée et envoyée par email.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 rounded-xl p-4 space-y-2.5">
      <div className="flex items-center gap-2">
        <FileDown className="w-4 h-4 text-very-peri-600 shrink-0" />
        <p className="text-sm font-heading font-bold text-future-dusk-900">
          Recevoir mon analyse en PDF
        </p>
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state === 'error') setState('idle');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="votre@email.com"
        className="w-full text-sm rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-very-peri-500 bg-white"
        aria-label="Votre email"
      />
      <label className="flex items-start gap-2 text-xs text-future-dusk-500 cursor-pointer">
        <input
          type="checkbox"
          checked={optIn}
          onChange={(e) => setOptIn(e.target.checked)}
          className="mt-0.5 accent-very-peri-600"
        />
        Je souhaite être recontacté(e) par un expert PackshotCreator
      </label>
      {optIn && (
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Téléphone (optionnel)"
          className="w-full text-sm rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-very-peri-500 bg-white"
          aria-label="Votre téléphone (optionnel)"
        />
      )}
      <button
        type="button"
        onClick={submit}
        disabled={state === 'sending'}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-very-peri-600 hover:bg-very-peri-700 text-white text-sm font-medium py-2.5 disabled:opacity-50 transition-colors"
      >
        {state === 'sending' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Préparation…
          </>
        ) : (
          'Télécharger le PDF'
        )}
      </button>
      {state === 'error' && (
        <p className="text-xs text-red-600">Email invalide ou envoi impossible — réessayez.</p>
      )}
      <p className="text-[11px] leading-snug text-future-dusk-400">
        Sans email, rien de votre session n&apos;est conservé. Avec votre accord, vos réponses et ce
        résumé sont transmis à notre équipe pour vous accompagner.
      </p>
    </div>
  );
}

export default function DossierPanel({
  dossier,
  studies,
  transcript,
  onCorrect,
}: DossierPanelProps) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const extras = DOSSIER_EXTRAS.filter(({ key }) => formatDossierValue(dossier, key) !== null);
  const completion = dossierCompletion(dossier);

  return (
    <div className="space-y-5">
      {/* Checklist de qualification, groupée par thématique (UX 07/08) */}
      <div>
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <h2 className="text-sm font-heading font-bold text-future-dusk-900 uppercase tracking-wide">
            Votre dossier
          </h2>
          {completion > 0 && completion < 1 && (
            <span className="text-[11px] text-future-dusk-400">
              {Math.round(completion * 100)} % complété
            </span>
          )}
        </div>
        <div className="h-1 rounded-full bg-neutral-200 overflow-hidden mb-3">
          <div
            className="h-full rounded-full bg-very-peri-500 transition-all duration-300"
            style={{ width: `${Math.round(completion * 100)}%` }}
          />
        </div>
        {DOSSIER_GROUPS.map((group) => (
          <div key={group.titre} className="mb-3 last:mb-0">
            <p className="text-[11px] font-medium text-future-dusk-400 uppercase tracking-wide mb-1.5">
              {group.titre}
            </p>
            <ul className="space-y-2">
              {group.items.map(({ key, label }) => {
                const value = formatDossierValue(dossier, key);
                return (
                  <li key={key} className="text-sm">
                    {value ? (
                      <button
                        type="button"
                        onClick={() => onCorrect(label, value)}
                        className="group flex items-start gap-2 text-left w-full rounded-lg -mx-1 px-1 py-0.5 hover:bg-very-peri-50 transition-colors"
                        title="Corriger cette information"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="flex-1 text-future-dusk-900">
                          <span className="text-future-dusk-500">{label} : </span>
                          {value}
                        </span>
                        <Pencil className="w-3.5 h-3.5 text-future-dusk-300 opacity-0 group-hover:opacity-100 shrink-0 mt-0.5 transition-opacity" />
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 text-future-dusk-400">
                        <Circle className="w-4 h-4 shrink-0" />
                        {label}…
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {(extras.length > 0 || (dossier.autres ?? []).length > 0) && (
          <ul className="space-y-2 mt-3">
            {extras.map(({ key, label }) => {
              const value = formatDossierValue(dossier, key)!;
              return (
                <li key={key} className="text-sm">
                  <button
                    type="button"
                    onClick={() => onCorrect(label, value)}
                    className="group flex items-start gap-2 text-left w-full rounded-lg -mx-1 px-1 py-0.5 hover:bg-very-peri-50 transition-colors"
                    title="Corriger cette information"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="flex-1 text-future-dusk-900">
                      <span className="text-future-dusk-500">{label} : </span>
                      {value}
                    </span>
                    <Pencil className="w-3.5 h-3.5 text-future-dusk-300 opacity-0 group-hover:opacity-100 shrink-0 mt-0.5 transition-opacity" />
                  </button>
                </li>
              );
            })}
            {(dossier.autres ?? []).map((info, i) => (
              <li key={`autre-${i}`} className="flex items-start gap-2 text-sm text-future-dusk-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                {info}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Études épinglées */}
      {studies.length > 0 && (
        <div className="border-t border-neutral-200 pt-4 space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-sm font-heading font-bold text-future-dusk-900 uppercase tracking-wide">
              Résultats
            </h2>
            {studies.length > 1 && (
              <span className="text-[11px] text-future-dusk-400">
                {studies.length} études comparées
              </span>
            )}
          </div>

          {/* Encart de transparence (UX §3) */}
          <div className="flex gap-2 rounded-xl bg-very-peri-50 border border-very-peri-100 p-3 text-xs leading-relaxed text-future-dusk-700">
            <Cog className="w-4 h-4 text-very-peri-600 shrink-0 mt-0.5" />
            <p>
              Les montants affichés ne sont pas générés par l&apos;intelligence artificielle.
              L&apos;IA recueille vos informations ; les calculs sont exécutés par le moteur de
              calcul PackshotCreator (règles déterministes et vérifiées, identiques pour tous les
              clients).
            </p>
          </div>

          {studies.map((study, i) => (
            <div key={`${study.machine.machineId ?? study.machine.machineNom ?? i}|${study.mode}`}>
              {studies.length > 1 && (
                <p className="text-xs font-medium text-future-dusk-700 mb-2">
                  Étude {i + 1} — {study.machine.machineNom ?? 'analyse'}
                  {study.isLeasing ? ' (leasing)' : ' (achat)'}
                </p>
              )}
              <PublicCalcCards
                results={study}
                onEditHypothese={(label, value) => onCorrect(label, value)}
              />
            </div>
          ))}

          <LeadCapture dossier={dossier} studies={studies} transcript={transcript} pdfRef={pdfRef} />

          {/* Rendu dédié à l'export PDF — pleine largeur A4, hors écran.
              Monté en permanence pour que les graphiques soient prêts au
              moment de la capture. */}
          <div
            ref={pdfRef}
            aria-hidden="true"
            className="fixed top-0 -left-[2000px] w-[794px] pointer-events-none"
          >
            <PdfReport studies={studies} dossier={dossier} />
          </div>
        </div>
      )}

      {/* Réassurance (UX §7) */}
      <div className="border-t border-neutral-200 pt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-future-dusk-400">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Orbitvu Official Partner
        </span>
        <span>Vos données restent en Europe</span>
      </div>
    </div>
  );
}
