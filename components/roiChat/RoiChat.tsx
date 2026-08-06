'use client';

/**
 * Fil de chat du calculateur ROI conversationnel — mode interne.
 * L'historique API (blocs provider opaques) est conservé côté client et
 * renvoyé à chaque tour ; la route est stateless.
 */

import { useRef, useState, useEffect } from 'react';
import { Send, Loader2, Wrench, RotateCcw } from 'lucide-react';
import CalcResultCards from './CalcResultCards';
import type { RoiEngineResults } from '@/lib/roiEngine';

interface UiMessage {
  role: 'user' | 'assistant';
  text: string;
  calcs: RoiEngineResults[];
}

const TOOL_LABELS: Record<string, string> = {
  calculate: 'Calcul du ROI…',
  compare_machines: 'Comparaison des machines…',
  market_reference: 'Consultation des coûts de marché…',
  function_gains: 'Consultation des gains par fonction…',
  price_list: 'Consultation de la grille tarifaire…',
};

export default function RoiChat({ userEmail }: { userEmail: string }) {
  const [uiMessages, setUiMessages] = useState<UiMessage[]>([]);
  const [apiMessages, setApiMessages] = useState<unknown[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [toolStatus, setToolStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [uiMessages, toolStatus]);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;
    setInput('');
    setError(null);
    setStreaming(true);

    const nextApiMessages = [...apiMessages, { role: 'user', content: text }];
    setUiMessages((prev) => [
      ...prev,
      { role: 'user', text, calcs: [] },
      { role: 'assistant', text: '', calcs: [] },
    ]);

    try {
      const res = await fetch('/api/roi-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextApiMessages }),
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
              setToolStatus(TOOL_LABELS[event.name as string] ?? 'Outil en cours…');
              break;
            case 'calc':
              appendToAssistant((m) => ({
                ...m,
                calcs: [...m.calcs, event.results as RoiEngineResults],
              }));
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
      setError(err instanceof Error ? err.message : 'Erreur réseau');
    } finally {
      setStreaming(false);
      setToolStatus(null);
    }
  }

  function reset() {
    if (streaming) return;
    setUiMessages([]);
    setApiMessages([]);
    setError(null);
  }

  return (
    <main className="min-h-screen flex flex-col max-w-4xl mx-auto px-4">
      <header className="flex items-center justify-between py-4 border-b border-neutral-200">
        <div>
          <h1 className="text-xl font-heading font-bold text-future-dusk-900">
            Calculateur ROI — mode interne
          </h1>
          <p className="text-xs text-future-dusk-500">
            Connecté : {userEmail} · accès grille tarifaire complet · ne pas partager les prix bruts
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 text-sm text-future-dusk-500 hover:text-future-dusk-900 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Nouvelle analyse
        </button>
      </header>

      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {uiMessages.length === 0 && (
          <div className="text-center text-future-dusk-500 text-sm mt-16 space-y-2">
            <p className="text-lg font-heading font-bold text-future-dusk-700">
              Décrivez la situation du client
            </p>
            <p>
              En vrac ou pas à pas : volume, types de contenu, prestataire actuel, temps interne,
              achat ou leasing, conditions tarifaires particulières…
            </p>
            <p className="text-xs">
              Exemples : « Client e-commerce mode, 8 000 produits/an, presta à 4 700 €/mois, 1,5
              opérateur interne » · « Différentiel XL G2 MDC à 38 900 € devis vs XL »
            </p>
          </div>
        )}

        {uiMessages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div className="bg-very-peri-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%] whitespace-pre-wrap text-sm">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i} className="space-y-1">
              {m.text && (
                <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[95%] whitespace-pre-wrap text-sm text-future-dusk-900">
                  {m.text}
                </div>
              )}
              {m.calcs.map((c, j) => (
                <CalcResultCards key={j} results={c} />
              ))}
            </div>
          )
        )}

        {toolStatus && (
          <div className="flex items-center gap-2 text-sm text-future-dusk-500 px-2">
            <Wrench className="w-4 h-4 animate-pulse" />
            {toolStatus}
          </div>
        )}
        {streaming && !toolStatus && (
          <div className="flex items-center gap-2 text-sm text-future-dusk-400 px-2">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3">{error}</div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-0 bg-neutral-50 pb-4 pt-2">
        <div className="flex gap-2 items-end bg-white border border-neutral-300 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-very-peri-500">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Décrivez la situation client… (Entrée pour envoyer, Maj+Entrée pour un saut de ligne)"
            rows={Math.min(5, Math.max(1, input.split('\n').length))}
            className="flex-1 resize-none border-0 focus:outline-none text-sm px-2 py-1.5 bg-transparent"
            disabled={streaming}
          />
          <button
            type="button"
            onClick={send}
            disabled={streaming || !input.trim()}
            className="p-2.5 rounded-xl bg-very-peri-600 text-white hover:bg-very-peri-700 disabled:opacity-40 transition-colors"
            aria-label="Envoyer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
