'use client';

/**
 * Consultation ROI publique — layout deux volets (UX §2) :
 * conversation (~60 %) + panneau « Votre dossier » (~40 %, sticky).
 * Mobile : le dossier devient un tiroir dépliable au-dessus du champ de saisie.
 *
 * L'historique API (blocs provider opaques) est conservé côté client et
 * renvoyé à chaque tour ; la route /api/roi-chat est stateless et détermine
 * le mode public côté serveur (absence de cookie interne).
 */

import { useEffect, useRef, useState } from 'react';
import { Send, Loader2, Cog, RotateCcw, Bot, ChevronDown, FolderOpen } from 'lucide-react';
import { parseAssistantText } from '@/lib/roiChat/chips';
import { mergeDossier, type RoiPublicDossier } from '@/lib/roiChat/dossier';
import { captureAttribution } from '@/lib/attribution';
import type { PublicRoiResults } from '@/lib/roiEngine';
import DossierPanel from './DossierPanel';

interface UiMessage {
  role: 'user' | 'assistant';
  text: string;
}

const TOOL_LABELS: Record<string, string> = {
  calculate: 'Calcul par le moteur ROI…',
  compare_machines: 'Recherche du modèle adapté…',
  market_reference: 'Consultation des coûts de marché…',
  function_gains: 'Consultation des gains par fonction…',
  update_dossier: 'Mise à jour de votre dossier…',
};

const EXAMPLES = [
  'Nous produisons 3 000 photos par an avec un prestataire à 25 €/photo, et une personne en interne prépare les produits.',
  'Nous lançons une marque de cosmétiques : 800 produits à photographier par an, rien d\'existant.',
];

export default function RoiPublicChat() {
  const [uiMessages, setUiMessages] = useState<UiMessage[]>([]);
  const [apiMessages, setApiMessages] = useState<unknown[]>([]);
  const [dossier, setDossier] = useState<RoiPublicDossier>({});
  const [results, setResults] = useState<PublicRoiResults | null>(null);
  const [calcCount, setCalcCount] = useState(0);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [toolStatus, setToolStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    captureAttribution();
  }, []);

  // Suivi du fil : on ne fait défiler QUE le conteneur de messages (jamais la
  // page entière), et seulement si l'utilisateur est déjà proche du bas — pas
  // de saut forcé quand il relit le début de la conversation.
  useEffect(() => {
    const el = listRef.current;
    if (!el || el.scrollHeight <= el.clientHeight) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 250;
    if (nearBottom) el.scrollTop = el.scrollHeight;
  }, [uiMessages, toolStatus]);

  async function send(rawText?: string) {
    const text = (rawText ?? input).trim();
    if (!text || streaming) return;
    setInput('');
    setError(null);
    setStreaming(true);

    const nextApiMessages = [...apiMessages, { role: 'user', content: text }];
    setUiMessages((prev) => [
      ...prev,
      { role: 'user', text },
      { role: 'assistant', text: '' },
    ]);

    try {
      const res = await fetch('/api/roi-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextApiMessages, surface: 'public' }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Erreur ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const appendToAssistant = (updater: (m: UiMessage) => UiMessage) => {
        setUiMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = updater(next[next.length - 1]);
          return next;
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const chunks = buffer.split('\n\n');
        buffer = chunks.pop() ?? '';
        for (const chunk of chunks) {
          const line = chunk.trim();
          if (!line.startsWith('data: ')) continue;
          let event: Record<string, unknown>;
          try {
            event = JSON.parse(line.slice(6));
          } catch {
            continue;
          }

          switch (event.type) {
            case 'text':
              setToolStatus(null);
              appendToAssistant((m) => ({ ...m, text: m.text + (event.text as string) }));
              break;
            case 'tool':
              setToolStatus(TOOL_LABELS[event.name as string] ?? 'Analyse en cours…');
              break;
            case 'calc':
              setResults(event.results as PublicRoiResults);
              setCalcCount((n) => n + 1);
              break;
            case 'dossier':
              setDossier((prev) => mergeDossier(prev, event.update as Partial<RoiPublicDossier>));
              break;
            case 'state':
              setApiMessages(event.messages as unknown[]);
              break;
            case 'error':
              setError(event.message as string);
              break;
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur réseau — votre analyse reprend où elle en était, réessayez.');
    } finally {
      // Jamais de bulle assistant muette : repli si le flux s'est terminé sans texte
      setUiMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role !== 'assistant' || last.text.trim() !== '') return prev;
        const next = [...prev];
        next[next.length - 1] = {
          ...last,
          text: 'Je n’ai pas pu terminer ma réponse. Pouvez-vous renvoyer votre message ou écrire « continuez » ?',
        };
        return next;
      });
      setStreaming(false);
      setToolStatus(null);
    }
  }

  function reset() {
    if (streaming) return;
    setUiMessages([]);
    setApiMessages([]);
    setDossier({});
    setResults(null);
    setCalcCount(0);
    setError(null);
  }

  /** Correction depuis le dossier ou une hypothèse (UX §2 et §5). */
  function correctFromPanel(label: string, value: string) {
    if (streaming) return;
    setDrawerOpen(false);
    setInput(`Je souhaite corriger « ${label} » (actuellement : ${value}) : `);
    inputRef.current?.focus();
  }

  // Transcript pour le résumé CRM : textes affichés, marqueurs chips retirés
  const transcript = uiMessages
    .map((m) =>
      m.role === 'assistant' ? { ...m, text: parseAssistantText(m.text).text } : m
    )
    .filter((m) => m.text.trim() !== '');
  const lastIndex = uiMessages.length - 1;
  const isCalcRunning = toolStatus === TOOL_LABELS.calculate;

  return (
    // --roi-offset : hauteur du chrome au-dessus de l'app (header sticky du
    // site sur /fr/calculateur-roi) — garantit la barre de saisie visible
    // sans défilement. 0 par défaut (pages standalone).
    <main className="min-h-[calc(100dvh-var(--roi-offset,0px))] flex flex-col max-w-7xl mx-auto lg:h-[calc(100dvh-var(--roi-offset,0px))]">
      {/* En-tête : badge permanent de transparence (UX §3) */}
      <header className="flex items-center justify-between gap-3 py-4 px-4 border-b border-neutral-200">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-heading font-bold text-future-dusk-900 truncate">
            Votre analyse de rentabilité personnalisée
          </h1>
          <p className="flex items-center gap-1.5 text-xs text-future-dusk-500">
            <Bot className="w-3.5 h-3.5 shrink-0" />
            Conseiller virtuel PackshotCreator — assistant IA · les calculs sont exécutés par le
            moteur ROI
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 text-sm text-future-dusk-500 hover:text-future-dusk-900 shrink-0 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Recommencer</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        {/* ===== Volet conversation (~60 %) ===== */}
        <section className="flex-1 lg:w-3/5 flex flex-col lg:overflow-hidden" aria-label="Conversation">
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {uiMessages.length === 0 && (
              <div className="max-w-xl mx-auto text-center mt-10 space-y-5">
                <p className="text-2xl font-heading font-bold text-future-dusk-900">
                  Décrivez votre production photo
                </p>
                <p className="text-sm text-future-dusk-500">
                  Notre conseiller construit votre analyse de rentabilité personnalisée : économies,
                  temps libéré, retour sur investissement — à votre rythme, en quelques questions.
                </p>
                <div className="space-y-2 text-left">
                  <p className="text-xs font-medium text-future-dusk-400 uppercase tracking-wide">
                    Exemples de description
                  </p>
                  {EXAMPLES.map((ex) => (
                    <p
                      key={ex}
                      className="text-sm italic text-future-dusk-500 bg-white border border-neutral-100 rounded-xl px-4 py-3"
                    >
                      « {ex} »
                    </p>
                  ))}
                </div>
                <p className="text-xs text-future-dusk-400 leading-relaxed">
                  Vous échangez avec un assistant IA. Les chiffres, eux, ne sortent jamais de
                  l&apos;IA : ils sont calculés par le moteur ROI PackshotCreator, avec des règles
                  identiques pour tous les clients. Sans email, rien n&apos;est conservé à la fin de
                  votre session.
                </p>
              </div>
            )}

            {uiMessages.map((m, i) => {
              if (m.role === 'user') {
                return (
                  <div key={i} className="flex justify-end">
                    <div className="bg-very-peri-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%] whitespace-pre-wrap text-sm">
                      {m.text}
                    </div>
                  </div>
                );
              }
              const { text, chips } = parseAssistantText(m.text);
              const showChips = i === lastIndex && !streaming && chips.length > 0;
              return (
                <div key={i} className="space-y-2">
                  {text && (
                    <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[95%] whitespace-pre-wrap text-sm text-future-dusk-900">
                      {text}
                    </div>
                  )}
                  {showChips && (
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Réponses rapides">
                      {chips.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => send(chip)}
                          className="text-sm text-very-peri-700 bg-very-peri-50 border border-very-peri-200 hover:bg-very-peri-100 hover:border-very-peri-400 rounded-full px-3.5 py-1.5 transition-colors"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* États : IA écrit vs moteur calcule (UX §3) */}
            {toolStatus && (
              <div
                className={`flex items-center gap-2 text-sm px-2 ${
                  isCalcRunning ? 'text-very-peri-700 font-medium' : 'text-future-dusk-500'
                }`}
                role="status"
              >
                <Cog className={`w-4 h-4 ${isCalcRunning ? 'animate-spin' : 'animate-pulse'}`} />
                {toolStatus}
                {isCalcRunning && (
                  <span className="text-xs text-future-dusk-400 font-normal">(~15 s)</span>
                )}
              </div>
            )}
            {streaming && !toolStatus && (
              <div className="flex items-center gap-2 text-sm text-future-dusk-400 px-2" role="status">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            )}
            {error && (
              <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3">{error}</div>
            )}
          </div>

          {/* Tiroir dossier mobile (UX §2) */}
          <div className="lg:hidden border-t border-neutral-200 bg-white">
            <button
              type="button"
              onClick={() => setDrawerOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-future-dusk-700"
              aria-expanded={drawerOpen}
            >
              <span className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-very-peri-600" />
                Votre dossier
                {results && (
                  <span className="text-[11px] bg-very-peri-100 text-very-peri-700 rounded-full px-2 py-0.5">
                    résultats
                  </span>
                )}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${drawerOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {drawerOpen && (
              <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
                <DossierPanel
                  dossier={dossier}
                  results={results}
                  calcCount={calcCount}
                  transcript={transcript}
                  onCorrect={correctFromPanel}
                />
              </div>
            )}
          </div>

          {/* Saisie */}
          <div className="sticky bottom-0 lg:static bg-neutral-50 px-4 pb-4 pt-2">
            <div className="flex gap-2 items-end bg-white border border-neutral-300 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-very-peri-500">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Décrivez votre situation ou répondez librement…"
                rows={Math.min(5, Math.max(1, input.split('\n').length))}
                className="flex-1 resize-none border-0 focus:outline-none text-sm px-2 py-1.5 bg-transparent"
                disabled={streaming}
                aria-label="Votre message"
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={streaming || !input.trim()}
                className="p-2.5 rounded-xl bg-very-peri-600 text-white hover:bg-very-peri-700 disabled:opacity-40 transition-colors"
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ===== Volet dossier (~40 %, desktop) ===== */}
        <aside
          className="hidden lg:block lg:w-2/5 border-l border-neutral-200 bg-bg-warm-white overflow-y-auto px-5 py-6"
          aria-label="Votre dossier"
        >
          <DossierPanel
            dossier={dossier}
            results={results}
            calcCount={calcCount}
            transcript={transcript}
            onCorrect={correctFromPanel}
          />
        </aside>
      </div>
    </main>
  );
}
