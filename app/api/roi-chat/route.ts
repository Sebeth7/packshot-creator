/**
 * Route API du calculateur ROI conversationnel — streaming SSE (CDC §3).
 *
 * Le mode est déterminé ICI, côté serveur, par la session :
 *  - cookie signé @sysnext.com valide → mode INTERNE (prompt interne, tools
 *    élargis dont price_list, limites larges) ;
 *  - sinon → mode PUBLIC (prompt public, tools restreints — les prix
 *    catalogue ne passent JAMAIS dans le contexte LLM — et caps anti-abus).
 *
 * Protocole côté client (SSE, une ligne JSON par événement `data:`) :
 *  - {type:'text', text}        delta de texte assistant
 *  - {type:'tool', name}        début d'exécution d'un tool (indicateur UI)
 *  - {type:'calc', results}     résultats de calcul (affichage composants)
 *  - {type:'dossier', update}   mise à jour du dossier vivant (mode public)
 *  - {type:'state', messages}   historique complet à renvoyer au tour suivant
 *  - {type:'error', message}
 *  - {type:'done'}
 */

import { NextRequest } from 'next/server';
import { verifySessionCookieValue, ROI_SESSION_COOKIE } from '@/lib/roiChat/auth';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import {
  streamAssistantTurn,
  buildToolResultsMessage,
  isProviderConfigured,
  type ChatMessage,
} from '@/lib/roiChat/provider';
import { buildToolDefinitions, executeTool, type ChatMode } from '@/lib/roiChat/tools';
import { SYSTEM_PROMPT_INTERNE, SYSTEM_PROMPT_PUBLIC } from '@/lib/roiChat/systemPrompt';
import {
  PUBLIC_RATE_LIMIT_PER_HOUR,
  PUBLIC_MAX_MESSAGES,
  PUBLIC_MAX_INPUT_CHARS,
  PUBLIC_MAX_TOKENS_PER_TURN,
  PUBLIC_MAX_TOOL_ROUNDS,
  recordTokenUsage,
} from '@/lib/roiChat/antiAbuse';

export const maxDuration = 120;

const INTERNE_MAX_TOOL_ROUNDS = 8;
const INTERNE_MAX_MESSAGES = 80;

function sse(controller: ReadableStreamDefaultController, encoder: TextEncoder, data: unknown) {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
}

/** Longueur cumulée des blocs texte utilisateur d'un message (caps publics). */
function userTextLength(message: ChatMessage): number {
  if (typeof message.content === 'string') return message.content.length;
  if (!Array.isArray(message.content)) return 0;
  return message.content.reduce(
    (sum, block) =>
      sum + (typeof block === 'object' && block?.type === 'text' ? block.text.length : 0),
    0
  );
}

export async function POST(request: NextRequest) {
  // ===== Mode déterminé côté serveur par le cookie signé =====
  // Le client peut uniquement DEMANDER le mode public (surface: 'public',
  // envoyé par l'UI publique) : c'est une dé-élévation, jamais l'inverse —
  // sans cookie valide, le mode interne est inatteignable. Évite qu'un
  // membre @sysnext connecté à /roi-pro voie le registre interne (prix,
  // analyse sans filtre) s'afficher sur la page client.
  let body: { messages?: unknown; surface?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Requête invalide' }, { status: 400 });
  }
  const session = verifySessionCookieValue(request.cookies.get(ROI_SESSION_COOKIE)?.value);
  const mode: ChatMode = session && body.surface !== 'public' ? 'interne' : 'public';
  const ip = getClientIp(request.headers);

  // ===== Rate limiting =====
  const limited = session
    ? rateLimit(`roi-chat:${session.email}:${ip}`, 30)
    : rateLimit(`roi-chat-public:${ip}`, PUBLIC_RATE_LIMIT_PER_HOUR);
  if (!limited.ok) {
    return Response.json(
      { error: `Limite atteinte. Réessayez dans ${Math.ceil(limited.resetInSec / 60)} min.` },
      { status: 429 }
    );
  }

  if (!isProviderConfigured()) {
    return Response.json(
      { error: 'ANTHROPIC_API_KEY non configurée — chat indisponible (voir CDC §9).' },
      { status: 503 }
    );
  }

  const maxMessages = mode === 'interne' ? INTERNE_MAX_MESSAGES : PUBLIC_MAX_MESSAGES;
  let messages: ChatMessage[];
  {
    const candidate = body.messages;
    if (
      !Array.isArray(candidate) ||
      candidate.length === 0 ||
      candidate.length > maxMessages
    ) {
      return Response.json({ error: 'Requête invalide' }, { status: 400 });
    }
    messages = candidate as ChatMessage[];
    // Cap public sur la taille du dernier message utilisateur
    const last = messages[messages.length - 1];
    if (mode === 'public' && last?.role === 'user' && userTextLength(last) > PUBLIC_MAX_INPUT_CHARS) {
      return Response.json(
        { error: `Message trop long (max ${PUBLIC_MAX_INPUT_CHARS.toLocaleString('fr-FR')} caractères).` },
        { status: 400 }
      );
    }
  }

  const tools = buildToolDefinitions(mode);
  const system = mode === 'interne' ? SYSTEM_PROMPT_INTERNE : SYSTEM_PROMPT_PUBLIC;
  const maxToolRounds = mode === 'interne' ? INTERNE_MAX_TOOL_ROUNDS : PUBLIC_MAX_TOOL_ROUNDS;
  const maxTokens = mode === 'interne' ? undefined : PUBLIC_MAX_TOKENS_PER_TURN;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Boucle agentique : tours assistant + exécutions de tools serveur
        for (let round = 0; round <= maxToolRounds; round++) {
          let stopReason: string | null = null;
          let toolCalls: Array<{ id: string; name: string; input: unknown }> = [];

          for await (const event of streamAssistantTurn({
            system,
            messages,
            tools,
            maxTokens,
          })) {
            if (event.type === 'text') {
              sse(controller, encoder, { type: 'text', text: event.text });
            } else if (event.type === 'turn_end') {
              messages = [...messages, { role: 'assistant', content: event.content }];
              stopReason = event.stopReason;
              toolCalls = event.toolCalls;
              recordTokenUsage(mode, event.usage.inputTokens, event.usage.outputTokens);
            }
          }

          // Exécute les tools dès qu'il y en a, même si le tour a été tronqué
          // (stop_reason max_tokens) : ne jamais laisser un tour muet — les
          // blocs tool_use présents dans finalMessage sont complets.
          if (toolCalls.length === 0) {
            if (stopReason === 'max_tokens') {
              sse(controller, encoder, {
                type: 'text',
                text: 'Ma réponse a été interrompue par une limite de longueur. Envoyez « continuez » pour que je reprenne.',
              });
            }
            break;
          }

          // Exécution des tools (tous les résultats dans UN message user)
          const results = toolCalls.map((call) => {
            sse(controller, encoder, { type: 'tool', name: call.name });
            const result = executeTool(call.name, call.input, mode);
            if (call.name === 'calculate' && !result.isError && result.calcResults) {
              sse(controller, encoder, { type: 'calc', results: result.calcResults });
            }
            if (result.dossierUpdate && Object.keys(result.dossierUpdate).length > 0) {
              sse(controller, encoder, { type: 'dossier', update: result.dossierUpdate });
            }
            return { toolUseId: call.id, content: result.content, isError: result.isError };
          });
          messages = [...messages, buildToolResultsMessage(results)];
        }

        sse(controller, encoder, { type: 'state', messages });
        sse(controller, encoder, { type: 'done' });
      } catch (err) {
        console.error('[roi-chat]', err);
        sse(controller, encoder, {
          type: 'error',
          message: err instanceof Error ? err.message : 'Erreur interne',
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
