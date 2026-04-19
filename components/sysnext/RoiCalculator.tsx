'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Calculator, CheckCircle2, Loader2 } from 'lucide-react';

/**
 * Calculateur ROI industrie — Sysnext Industrial Solutions.
 *
 * Règle R8 cohabitation : fork dédié du calculateur PKC existant avec
 * presets industrie (aftermarket auto, QC, MRO).
 *
 * Submit → /api/roi-industrie qui enregistre un deal Pipedrive tagué sysnext
 * et envoie notif à industriel@sysnext.com + Seb.
 *
 * Draft matière brute — wording à retravailler par Seb (règle d'or 2).
 */

type Segment = 'aftermarket-auto' | 'qc-inspection' | 'mro-aero' | 'autre';

interface Preset {
  refs: number;
  cost: number;
  delay: number;
  sites: number;
}

const PRESETS: Record<Segment, Preset> = {
  'aftermarket-auto': { refs: 8000, cost: 15, delay: 14, sites: 1 },
  'qc-inspection': { refs: 2500, cost: 25, delay: 7, sites: 2 },
  'mro-aero': { refs: 1500, cost: 40, delay: 10, sites: 3 },
  autre: { refs: 3000, cost: 20, delay: 10, sites: 1 },
};

const SEGMENT_LABELS: Record<Segment, { fr: string; en: string }> = {
  'aftermarket-auto': { fr: 'Aftermarket auto & équipementiers', en: 'Automotive aftermarket' },
  'qc-inspection': { fr: 'Contrôle qualité & inspection', en: 'Quality control & inspection' },
  'mro-aero': { fr: 'MRO aéronautique civile', en: 'Civil aeronautical MRO' },
  autre: { fr: 'Autre / à préciser', en: 'Other / to specify' },
};

const CAPEX_ESTIMATE_EUR = 60000; // Pack Standard moyen
const COST_PER_IMAGE_SYSNEXT_EUR = 1; // Amorti 3 ans
const DELAY_SYSNEXT_DAYS = 1; // < 1 jour, on arrondit à 1
const VOLUME_PER_DAY_OPERATOR = 350;
const WORKING_DAYS_YEAR = 220;

function formatEur(n: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

interface RoiCalculatorProps {
  lang: string;
}

export default function RoiCalculator({ lang }: RoiCalculatorProps) {
  const isFr = lang === 'fr';

  const [segment, setSegment] = useState<Segment>('aftermarket-auto');
  const [refs, setRefs] = useState(PRESETS['aftermarket-auto'].refs);
  const [cost, setCost] = useState(PRESETS['aftermarket-auto'].cost);
  const [delay, setDelay] = useState(PRESETS['aftermarket-auto'].delay);
  const [sites, setSites] = useState(PRESETS['aftermarket-auto'].sites);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [rgpd, setRgpd] = useState(false);

  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const applyPreset = (seg: Segment) => {
    setSegment(seg);
    const p = PRESETS[seg];
    setRefs(p.refs);
    setCost(p.cost);
    setDelay(p.delay);
    setSites(p.sites);
  };

  const outputs = useMemo(() => {
    const annualCostCurrent = refs * cost;
    const annualCostSysnext = refs * COST_PER_IMAGE_SYSNEXT_EUR;
    const annualSavings = Math.max(0, annualCostCurrent - annualCostSysnext);
    const timeToMarketReductionPct = delay > 0 ? Math.max(0, ((delay - DELAY_SYSNEXT_DAYS) / delay) * 100) : 0;
    const amortizationMonths = annualSavings > 0 ? Math.ceil((CAPEX_ESTIMATE_EUR / annualSavings) * 12) : 0;
    const volumePerYear = sites * VOLUME_PER_DAY_OPERATOR * WORKING_DAYS_YEAR;
    return { annualSavings, timeToMarketReductionPct, amortizationMonths, volumePerYear };
  }, [refs, cost, delay, sites]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rgpd) return;
    setSubmitState('loading');

    const utmSource = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('utm_source') ?? undefined
      : undefined;
    const utmCampaign = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('utm_campaign') ?? undefined
      : undefined;

    try {
      const res = await fetch('/api/roi-industrie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          segment,
          inputs: {
            referencesPerYear: refs,
            costPerPhotoEur: cost,
            delayPerPhotoDays: delay,
            sitesCount: sites,
          },
          outputs,
          contact: {
            firstName,
            lastName,
            email,
            company,
            jobTitle: jobTitle || undefined,
            phone: phone || undefined,
            rgpdConsent: true,
          },
          locale: isFr ? 'fr' : 'en',
          utmSource,
          utmCampaign,
        }),
      });
      if (!res.ok) throw new Error('API error');
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-graphite-200 p-8 md:p-10 shadow-sm">
      {/* Segment picker */}
      <div className="mb-8">
        <label className="block text-xs font-semibold tracking-wider uppercase text-sysnext-700 mb-3">
          {isFr ? 'Votre segment' : 'Your segment'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(Object.keys(PRESETS) as Segment[]).map((seg) => {
            const active = seg === segment;
            return (
              <button
                key={seg}
                type="button"
                onClick={() => applyPreset(seg)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-sysnext-900 text-white'
                    : 'bg-graphite-50 text-graphite-700 hover:bg-sysnext-50 hover:text-sysnext-700'
                }`}
              >
                {isFr ? SEGMENT_LABELS[seg].fr : SEGMENT_LABELS[seg].en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <NumberField
          label={isFr ? 'Nouvelles références par an' : 'New SKUs per year'}
          value={refs}
          onChange={setRefs}
          min={0}
          step={100}
          suffix=""
        />
        <NumberField
          label={isFr ? 'Coût actuel par photo (EUR)' : 'Current cost per photo (EUR)'}
          value={cost}
          onChange={setCost}
          min={0}
          step={1}
          suffix="€"
        />
        <NumberField
          label={isFr ? 'Délai actuel par photo (jours)' : 'Current lead time per photo (days)'}
          value={delay}
          onChange={setDelay}
          min={0}
          step={1}
          suffix={isFr ? 'j' : 'd'}
        />
        <NumberField
          label={isFr ? 'Nombre de sites de production' : 'Production sites'}
          value={sites}
          onChange={setSites}
          min={1}
          step={1}
          suffix=""
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 rounded-xl bg-sysnext-900 text-white">
        <ResultCard
          label={isFr ? 'Économie annuelle estimée' : 'Estimated annual savings'}
          value={formatEur(outputs.annualSavings)}
          accent
        />
        <ResultCard
          label={isFr ? 'Réduction time-to-market' : 'Time-to-market reduction'}
          value={`${outputs.timeToMarketReductionPct.toFixed(0)} %`}
        />
        <ResultCard
          label={isFr ? 'Amortissement' : 'Amortisation'}
          value={`${outputs.amortizationMonths} ${isFr ? 'mois' : 'months'}`}
        />
        <ResultCard
          label={isFr ? 'Volume traitable / an' : 'Processable volume / year'}
          value={new Intl.NumberFormat('fr-FR').format(outputs.volumePerYear)}
        />
      </div>
      <p className="text-xs text-graphite-500 italic mb-10 -mt-6">
        {isFr
          ? `Hypothèses : CAPEX Sysnext ${formatEur(CAPEX_ESTIMATE_EUR)} (pack Standard moyen), coût/image Sysnext ${COST_PER_IMAGE_SYSNEXT_EUR} € amorti 3 ans, volume ${VOLUME_PER_DAY_OPERATOR} pièces/jour/opérateur × ${WORKING_DAYS_YEAR} jours ouvrés. Chiffres à affiner en RDV avec Seb Ducros.`
          : `Assumptions: Sysnext CAPEX ${formatEur(CAPEX_ESTIMATE_EUR)} (Standard pack avg), Sysnext cost/image ${COST_PER_IMAGE_SYSNEXT_EUR} € amortised over 3 years, volume ${VOLUME_PER_DAY_OPERATOR} parts/day/operator × ${WORKING_DAYS_YEAR} working days. Figures to refine in meeting with Seb Ducros.`}
      </p>

      {/* Form */}
      {submitState === 'success' ? (
        <div className="rounded-xl bg-calibration-200/40 border border-calibration-500 p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-calibration-500 mb-3" aria-hidden="true" />
          <p className="font-sysnext-sans font-semibold text-sysnext-900">
            {isFr
              ? 'Votre analyse ROI personnalisée arrive par email.'
              : 'Your personalised ROI analysis is on its way by email.'}
          </p>
          <p className="text-sm text-graphite-700 mt-2">
            {isFr
              ? 'Seb Ducros vous contactera sous 24 heures ouvrées pour échanger sur votre cas.'
              : 'Seb Ducros will contact you within 24 business hours to discuss your case.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-5 w-5 text-sysnext-700" aria-hidden="true" />
            <h3 className="font-sysnext-sans font-semibold text-lg text-sysnext-900">
              {isFr
                ? 'Recevez l\'analyse complète par email'
                : 'Receive the full analysis by email'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField label={isFr ? 'Prénom' : 'First name'} value={firstName} onChange={setFirstName} required />
            <TextField label={isFr ? 'Nom' : 'Last name'} value={lastName} onChange={setLastName} required />
            <TextField label={isFr ? 'Email professionnel' : 'Work email'} value={email} onChange={setEmail} required type="email" />
            <TextField label={isFr ? 'Société' : 'Company'} value={company} onChange={setCompany} required />
            <TextField label={isFr ? 'Fonction' : 'Job title'} value={jobTitle} onChange={setJobTitle} />
            <TextField label={isFr ? 'Téléphone' : 'Phone'} value={phone} onChange={setPhone} type="tel" />
          </div>
          <label className="flex items-start gap-2 text-sm text-graphite-700 pt-2">
            <input
              type="checkbox"
              checked={rgpd}
              onChange={(e) => setRgpd(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 rounded border-graphite-200 text-sysnext-700 focus:ring-sysnext-500"
            />
            <span>
              {isFr
                ? "J'accepte d'être recontacté par Sysnext Industrial Solutions au sujet de cette simulation. Données utilisées selon notre politique de confidentialité, base légale : intérêt légitime B2B."
                : 'I agree to be contacted by Sysnext Industrial Solutions regarding this simulation. Data used under our privacy policy, legal basis: B2B legitimate interest.'}
            </span>
          </label>

          {submitState === 'error' && (
            <p className="text-sm text-red-600">
              {isFr ? 'Erreur technique. Réessayez ou écrivez-nous à industriel@sysnext.com.' : 'Technical error. Please retry or email industriel@sysnext.com.'}
            </p>
          )}

          <button
            type="submit"
            disabled={!rgpd || submitState === 'loading'}
            className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitState === 'loading' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                {isFr ? 'Envoi…' : 'Sending…'}
              </>
            ) : (
              <>
                {isFr ? 'Recevoir mon analyse personnalisée' : 'Receive my personalised analysis'}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  step: number;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-wider uppercase text-sysnext-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
          className="w-full rounded-md border border-graphite-200 bg-white px-4 py-3 text-lg font-sysnext-sans font-semibold text-sysnext-900 focus:border-sysnext-500 focus:outline-none focus:ring-2 focus:ring-sysnext-500/20"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-graphite-500 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-wider uppercase text-sysnext-700 mb-1">
        {label} {required && <span className="text-proof-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-graphite-200 bg-white px-3 py-2 text-sm focus:border-sysnext-500 focus:outline-none focus:ring-2 focus:ring-sysnext-500/20"
      />
    </div>
  );
}

function ResultCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className={`font-sysnext-sans font-bold text-2xl md:text-3xl mb-1 ${accent ? 'text-calibration-500' : 'text-white'}`}>
        {value}
      </div>
      <div className="text-[11px] text-sysnext-200 leading-tight">{label}</div>
    </div>
  );
}
