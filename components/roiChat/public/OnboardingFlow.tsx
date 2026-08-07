'use client';

/**
 * Écran de cadrage pré-conversation (chantier UX Seb 07/08) : les questions
 * fermées prédéterminables sont posées par chips instantanées AVANT le premier
 * tour LLM — zéro latence, progression visible, dossier pré-rempli. Les
 * réponses partent ensuite comme premier message « profil » du fil.
 */

import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import {
  ONBOARDING_QUESTIONS,
  type OnboardingAnswers,
} from '@/lib/roiChat/onboarding';

interface OnboardingFlowProps {
  onComplete: (answers: OnboardingAnswers) => void;
  onSkip: () => void;
}

export default function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [multiDraft, setMultiDraft] = useState<string[]>([]);

  const question = ONBOARDING_QUESTIONS[step];
  const total = ONBOARDING_QUESTIONS.length;

  function advance(next: OnboardingAnswers) {
    if (step + 1 >= total) {
      onComplete(next);
    } else {
      setAnswers(next);
      setMultiDraft([]);
      setStep(step + 1);
    }
  }

  function pick(option: string) {
    if (question.multi) {
      setMultiDraft((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      );
      return;
    }
    advance({ ...answers, [question.key]: option });
  }

  function validateMulti() {
    if (multiDraft.length === 0) return;
    advance({ ...answers, [question.key]: multiDraft });
  }

  function back() {
    if (step === 0) return;
    setMultiDraft([]);
    setStep(step - 1);
  }

  return (
    <div className="max-w-xl mx-auto mt-6 space-y-6">
      {/* Contrat : ce que ça coûte, ce qu'on obtient */}
      {step === 0 && (
        <div className="text-center space-y-2">
          <p className="text-2xl font-heading font-bold text-future-dusk-900">
            Votre analyse de rentabilité en 3 minutes
          </p>
          <p className="text-sm text-future-dusk-500">
            {total} réponses rapides, puis quelques précisions avec notre conseiller. Vous
            obtenez : économies annuelles, temps libéré, point d&apos;équilibre — et votre
            analyse complète en PDF.
          </p>
        </div>
      )}

      {/* Progression */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between text-xs text-future-dusk-400">
          <span>
            Question {step + 1}/{total}
          </span>
          <button
            type="button"
            onClick={onSkip}
            className="underline hover:text-future-dusk-700 transition-colors"
          >
            Passer — décrire librement
          </button>
        </div>
        <div className="h-1.5 rounded-full bg-neutral-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-very-peri-500 transition-all duration-300"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4">
        <div>
          <p className="text-base font-heading font-bold text-future-dusk-900">
            {question.question}
          </p>
          <p className="text-xs text-future-dusk-400 mt-1">{question.pourquoi}</p>
          {question.multi && (
            <p className="text-xs text-very-peri-600 mt-1">Plusieurs réponses possibles.</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label={question.question}>
          {question.options.map((option) => {
            const selected = question.multi && multiDraft.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => pick(option)}
                aria-pressed={question.multi ? selected : undefined}
                className={`inline-flex items-center gap-1.5 text-sm rounded-full px-3.5 py-1.5 border transition-colors ${
                  selected
                    ? 'bg-very-peri-600 border-very-peri-600 text-white'
                    : 'text-very-peri-700 bg-very-peri-50 border-very-peri-200 hover:bg-very-peri-100 hover:border-very-peri-400'
                }`}
              >
                {selected && <Check className="w-3.5 h-3.5" />}
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-1">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1 text-sm text-future-dusk-500 hover:text-future-dusk-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Précédent
            </button>
          ) : (
            <span />
          )}
          {question.multi && (
            <button
              type="button"
              onClick={validateMulti}
              disabled={multiDraft.length === 0}
              className="rounded-lg bg-very-peri-600 hover:bg-very-peri-700 text-white text-sm font-medium px-4 py-2 disabled:opacity-40 transition-colors"
            >
              Continuer
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-future-dusk-400 leading-relaxed text-center">
        Vous échangerez ensuite avec un assistant IA. Les chiffres, eux, ne sortent jamais de
        l&apos;IA : ils sont calculés par le moteur ROI PackshotCreator, avec des règles
        identiques pour tous les clients. Sans email, rien n&apos;est conservé à la fin de votre
        session.
      </p>
    </div>
  );
}
