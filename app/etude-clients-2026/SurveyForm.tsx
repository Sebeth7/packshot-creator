'use client';

import { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  MACHINES,
  ANCIENNETE,
  FREQUENCE,
  TYPES_VISUELS,
  VOLUME_MENSUEL,
  CRITERES,
  BENEFICES,
  IA_MATURITE,
  IA_USAGES,
  type CritereKey,
  type Option,
} from './survey-config';

type FormState = {
  q1_machines: string[];
  q1_machines_autre: string;
  q2_anciennete: string | null;
  q3_frequence: string | null;
  q4_types_visuels: string[];
  q5_volume_mensuel: string | null;
  q6_satisfaction_globale: number | null;
  q7_qualite_images: number | null;
  q7_productivite: number | null;
  q7_logiciel: number | null;
  q7_detourage: number | null;
  q7_fiabilite: number | null;
  q7_support: number | null;
  q8_nps: number | null;
  q9_benefices: string[];
  q9_benefices_autre: string;
  q10_ia_maturite: string | null;
  q11_ia_usages: string[];
  q11_ia_usages_autre: string;
  q12_workflow: string;
  q13_signal_faible: string;
  remarques_libres: string;
  consent_recontact: boolean;
  consent_newsletter: boolean;
};

const INITIAL: FormState = {
  q1_machines: [],
  q1_machines_autre: '',
  q2_anciennete: null,
  q3_frequence: null,
  q4_types_visuels: [],
  q5_volume_mensuel: null,
  q6_satisfaction_globale: null,
  q7_qualite_images: null,
  q7_productivite: null,
  q7_logiciel: null,
  q7_detourage: null,
  q7_fiabilite: null,
  q7_support: null,
  q8_nps: null,
  q9_benefices: [],
  q9_benefices_autre: '',
  q10_ia_maturite: null,
  q11_ia_usages: [],
  q11_ia_usages_autre: '',
  q12_workflow: '',
  q13_signal_faible: '',
  remarques_libres: '',
  consent_recontact: false,
  consent_newsletter: false,
};

const TOTAL_QUESTIONS = 13;

type Props = {
  initialEmail: string;
  initialName: string;
  initialCompany: string;
  initialPid: string;
};

// ── Sous-composants UI ────────────────────────────────────────

function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--primary-orbitvu)] border-b border-black/5 pb-2">
      {children}
    </h2>
  );
}

function Question({
  num,
  title,
  hint,
  children,
}: {
  num: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-heading text-lg font-semibold text-[var(--heading-dark)]">
        <span className="text-[var(--primary-orbitvu)] mr-2">Q{num}.</span>
        {title}
      </p>
      {hint ? (
        <p className="mt-2 text-sm text-[var(--neutral-medium)] leading-relaxed">{hint}</p>
      ) : null}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function ChoicePills({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map(o => {
        const selected = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(selected ? null : o.value)}
            className={cn(
              'px-3.5 py-2 rounded-full border text-sm transition-colors',
              selected
                ? 'bg-[var(--primary-orbitvu)] border-[var(--primary-orbitvu)] text-white font-medium'
                : 'bg-white border-black/10 text-[var(--text-dark)] hover:border-[var(--primary-orbitvu)]/50'
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function MultiChoice({
  options,
  values,
  onChange,
  idPrefix,
}: {
  options: Option[];
  values: string[];
  onChange: (v: string[]) => void;
  idPrefix: string;
}) {
  const toggle = (v: string) =>
    onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  return (
    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
      {options.map(o => (
        <div key={o.value} className="flex items-start gap-3">
          <Checkbox
            id={`${idPrefix}-${o.value}`}
            checked={values.includes(o.value)}
            onCheckedChange={() => toggle(o.value)}
          />
          <label
            htmlFor={`${idPrefix}-${o.value}`}
            className="text-sm text-[var(--text-dark)] cursor-pointer leading-snug"
          >
            {o.label}
          </label>
        </div>
      ))}
    </div>
  );
}

function Scale({
  min,
  max,
  value,
  onChange,
  minLabel,
  maxLabel,
  compact = false,
}: {
  min: number;
  max: number;
  value: number | null;
  onChange: (v: number | null) => void;
  minLabel?: string;
  maxLabel?: string;
  compact?: boolean;
}) {
  const nums = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  return (
    <div>
      <div role="radiogroup" className="flex flex-wrap gap-1.5">
        {nums.map(n => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(selected ? null : n)}
              className={cn(
                compact ? 'size-8 text-sm' : 'size-10 text-base',
                'rounded-md border font-medium tabular-nums transition-colors',
                selected
                  ? 'bg-[var(--primary-orbitvu)] border-[var(--primary-orbitvu)] text-white'
                  : 'bg-white border-black/10 text-[var(--text-dark)] hover:border-[var(--primary-orbitvu)]/50'
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
      {minLabel || maxLabel ? (
        <div className="mt-1.5 flex justify-between text-xs text-[var(--neutral-medium)]">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      ) : null}
    </div>
  );
}

// ── Formulaire ────────────────────────────────────────────────

export default function SurveyForm({ initialEmail, initialName, initialCompany, initialPid }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const answeredCount = useMemo(() => {
    const flags = [
      form.q1_machines.length > 0,
      !!form.q2_anciennete,
      !!form.q3_frequence,
      form.q4_types_visuels.length > 0,
      !!form.q5_volume_mensuel,
      form.q6_satisfaction_globale !== null,
      CRITERES.some(c => form[c.key] !== null),
      form.q8_nps !== null,
      form.q9_benefices.length > 0,
      !!form.q10_ia_maturite,
      form.q11_ia_usages.length > 0,
      form.q12_workflow.trim().length > 5,
      form.q13_signal_faible.trim().length > 5,
    ];
    return flags.filter(Boolean).length;
  }, [form]);

  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  const firstName = (initialName || '').trim().split(/\s+/)[0];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (answeredCount === 0 && !form.remarques_libres.trim()) {
      setError('Merci de répondre à au moins une question avant d\'envoyer.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pipedrive_org_id: initialPid || null,
          client_email: initialEmail || null,
          client_name: initialName || null,
          client_company: initialCompany || null,
          ...form,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Erreur ${res.status}`);
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white border border-black/5 shadow-sm p-8 sm:p-12 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[var(--primary-orbitvu)]/10">
          <CheckCircle2 className="size-8 text-[var(--primary-orbitvu)]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--heading-dark)] mb-3">
          Merci beaucoup pour vos réponses
        </h1>
        <p className="text-[var(--neutral-medium)] max-w-xl mx-auto">
          Votre retour a bien été enregistré. Nous reviendrons vers vous si nous avons besoin
          d&apos;une précision. Merci pour votre participation au questionnaire&nbsp;!
        </p>
        <div className="mt-8">
          <Button asChild variant="outline">
            <a href="https://packshot-creator.com">Retour au site</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <header>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--heading-dark)] leading-tight">
          Étude clients PackshotCreator 2026
        </h1>
        {firstName ? (
          <p className="mt-4 text-lg text-[var(--text-dark)]">
            Bonjour {firstName}, merci de prendre le temps de répondre.
          </p>
        ) : null}
        <p className="mt-4 text-[var(--text-dark)]/85 leading-relaxed">
          Suite à notre échange téléphonique, voici un court questionnaire pour mieux comprendre
          vos usages et faire évoluer nos solutions dans la bonne direction. La plupart des
          questions sont à cocher — comptez 3 à 5 minutes. Toutes vos réponses sont précieuses.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-1 rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full bg-[var(--primary-orbitvu)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs tabular-nums text-[var(--neutral-medium)]">
            {answeredCount}/{TOTAL_QUESTIONS}
          </span>
        </div>
      </header>

      {/* ── Bloc 1 : équipement & utilisation ── */}
      <BlockTitle>1. Votre équipement &amp; votre utilisation</BlockTitle>

      <Question num={1} title="Quelle(s) solution(s) utilisez-vous ?" hint="Plusieurs réponses possibles.">
        <MultiChoice
          idPrefix="q1"
          options={MACHINES}
          values={form.q1_machines}
          onChange={v => set('q1_machines', v)}
        />
        {form.q1_machines.includes('autre') ? (
          <Input
            className="mt-3 bg-white"
            placeholder="Précisez : modèle, gamme…"
            value={form.q1_machines_autre}
            onChange={e => set('q1_machines_autre', e.target.value)}
          />
        ) : null}
      </Question>

      <Question num={2} title="Depuis combien de temps utilisez-vous votre solution ?">
        <ChoicePills
          options={ANCIENNETE}
          value={form.q2_anciennete}
          onChange={v => set('q2_anciennete', v)}
        />
      </Question>

      <Question num={3} title="À quelle fréquence l'utilisez-vous ?">
        <ChoicePills
          options={FREQUENCE}
          value={form.q3_frequence}
          onChange={v => set('q3_frequence', v)}
        />
      </Question>

      <Question num={4} title="Pour quels types de visuels l'utilisez-vous ?" hint="Plusieurs réponses possibles.">
        <MultiChoice
          idPrefix="q4"
          options={TYPES_VISUELS}
          values={form.q4_types_visuels}
          onChange={v => set('q4_types_visuels', v)}
        />
      </Question>

      <Question num={5} title="Combien de visuels produisez-vous en moyenne par mois ?">
        <ChoicePills
          options={VOLUME_MENSUEL}
          value={form.q5_volume_mensuel}
          onChange={v => set('q5_volume_mensuel', v)}
        />
      </Question>

      {/* ── Bloc 2 : satisfaction ── */}
      <BlockTitle>2. Votre satisfaction</BlockTitle>

      <Question num={6} title="Quel est votre niveau de satisfaction global vis-à-vis de votre solution ?">
        <Scale
          min={1}
          max={5}
          value={form.q6_satisfaction_globale}
          onChange={v => set('q6_satisfaction_globale', v)}
          minLabel="Très insatisfait"
          maxLabel="Très satisfait"
        />
      </Question>

      <Question num={7} title="Évaluez chaque aspect de votre solution" hint="1 = faible, 5 = excellent.">
        <div className="space-y-4">
          {CRITERES.map(c => (
            <div key={c.key} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-sm text-[var(--text-dark)] sm:flex-1">{c.label}</span>
              <Scale
                min={1}
                max={5}
                compact
                value={form[c.key as CritereKey]}
                onChange={v => set(c.key as CritereKey, v)}
              />
            </div>
          ))}
        </div>
      </Question>

      <Question num={8} title="Recommanderiez-vous notre solution à un confrère ou partenaire ?">
        <Scale
          min={0}
          max={10}
          value={form.q8_nps}
          onChange={v => set('q8_nps', v)}
          minLabel="Pas du tout"
          maxLabel="Tout à fait"
        />
      </Question>

      <Question num={9} title="Quels bénéfices principaux retirez-vous de votre solution ?" hint="Plusieurs réponses possibles.">
        <MultiChoice
          idPrefix="q9"
          options={BENEFICES}
          values={form.q9_benefices}
          onChange={v => set('q9_benefices', v)}
        />
        {form.q9_benefices.includes('autre') ? (
          <Input
            className="mt-3 bg-white"
            placeholder="Précisez…"
            value={form.q9_benefices_autre}
            onChange={e => set('q9_benefices_autre', e.target.value)}
          />
        ) : null}
      </Question>

      {/* ── Bloc 3 : vos projets ── */}
      <BlockTitle>3. Vos projets</BlockTitle>

      <Question num={10} title="Concernant l'IA générative pour vos visuels produits, où en êtes-vous ?">
        <ChoicePills
          options={IA_MATURITE}
          value={form.q10_ia_maturite}
          onChange={v => set('q10_ia_maturite', v)}
        />
      </Question>

      <Question
        num={11}
        title="Sur quels usages l'IA générative vous semblerait-elle la plus utile ?"
        hint="Plusieurs réponses possibles."
      >
        <MultiChoice
          idPrefix="q11"
          options={IA_USAGES}
          values={form.q11_ia_usages}
          onChange={v => set('q11_ia_usages', v)}
        />
        {form.q11_ia_usages.includes('autre') ? (
          <Input
            className="mt-3 bg-white"
            placeholder="Précisez…"
            value={form.q11_ia_usages_autre}
            onChange={e => set('q11_ia_usages_autre', e.target.value)}
          />
        ) : null}
      </Question>

      {/* ── Bloc 4 : en quelques mots ── */}
      <BlockTitle>4. En quelques mots</BlockTitle>

      <Question
        num={12}
        title="Le travail autour de la machine"
        hint="Au-delà de la prise de vue elle-même, comment se passe le travail en amont (préparation) et en aval (retouche, traitement, diffusion sur vos canaux) ? Vous gérez ça en interne, en externe, avec quels outils ?"
      >
        <Textarea
          className="min-h-32 bg-white text-base leading-relaxed"
          value={form.q12_workflow}
          onChange={e => set('q12_workflow', e.target.value)}
          placeholder="Votre réponse… (facultatif)"
        />
      </Question>

      <Question
        num={13}
        title="Si vous pouviez changer une seule chose"
        hint="Si vous deviez changer une seule chose demain dans votre chaîne de production photo, ce serait quoi ?"
      >
        <Textarea
          className="min-h-32 bg-white text-base leading-relaxed"
          value={form.q13_signal_faible}
          onChange={e => set('q13_signal_faible', e.target.value)}
          placeholder="Votre réponse… (facultatif)"
        />
      </Question>

      {/* Champ libre */}
      <div>
        <p className="font-heading text-lg font-semibold text-[var(--heading-dark)]">
          Améliorations, nouveaux besoins, remarques
        </p>
        <p className="mt-2 text-sm text-[var(--neutral-medium)]">
          Accessoires, formation, fonctionnalités… tout ce dont vous aimeriez nous faire part.
        </p>
        <Textarea
          className="mt-3 min-h-28 bg-white text-base leading-relaxed"
          value={form.remarques_libres}
          onChange={e => set('remarques_libres', e.target.value)}
          placeholder="Facultatif…"
        />
      </div>

      {/* Consentements */}
      <div className="rounded-xl border border-black/5 bg-white p-5 space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent-recontact"
            checked={form.consent_recontact}
            onCheckedChange={v => set('consent_recontact', v)}
          />
          <label htmlFor="consent-recontact" className="text-sm text-[var(--text-dark)] cursor-pointer">
            J&apos;accepte que PackshotCreator me recontacte au sujet de mes réponses si nécessaire.
          </label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent-newsletter"
            checked={form.consent_newsletter}
            onCheckedChange={v => set('consent_newsletter', v)}
          />
          <label htmlFor="consent-newsletter" className="text-sm text-[var(--text-dark)] cursor-pointer">
            Je souhaite recevoir occasionnellement les nouveautés PackshotCreator par email.
          </label>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-[var(--neutral-medium)]">
          En envoyant ce formulaire, vous autorisez PackshotCreator à traiter vos réponses dans le
          cadre de l&apos;amélioration de ses solutions.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="bg-[var(--primary-orbitvu)] hover:bg-[var(--primary-orbitvu)]/90 text-white min-w-56"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Envoi en cours…
            </>
          ) : (
            'Envoyer mes réponses'
          )}
        </Button>
      </div>
    </form>
  );
}
