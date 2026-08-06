/**
 * Route API du calculateur ROI conversationnel — streaming SSE (CDC §3).
 *
 * MVP interne : la route exige le cookie de session @sysnext.com. Le mode
 * public (remplacement du wizard) est un chantier ultérieur — quand il
 * ouvrira, le mode restera déterminé ICI, côté serveur, par la session.
 *
 * Protocole côté client (SSE, une ligne JSON par événement `data:`) :
 *  - {type:'text', text}        delta de texte assistant
 *  - {type:'tool', name}        début d'exécution d'un tool (indicateur UI)
 *  - {type:'calc', results}     résultats de calcul (affichage composants)
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
import { SYSTEM_PROMPT_INTERNE } from '@/lib/roiChat/systemPrompt';

export const maxDuration = 120;

const MAX_TOOL_ROUNDS = 8;
const MAX_MESSAGES = 80;

function sse(controller: ReadableStreamDefaultController, encoder: TextEncoder, data: unknown) {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
}

export async function POST(request: NextRequest) {
  // ===== Auth : mode déterminé côté serveur par le cookie signé =====
  const session = verifySessionCookieValue(request.cookies.get(ROI_SESSION_COOKIE)?.value);
  if (!session) {
    return Response.json({ error: 'Authentification requise' }, { status: 401 });
  }
  const mode: ChatMode = 'interne';

  // ===== Rate limiting (30 requêtes/heure/utilisateur) =====
  const ip = getClientIp(request.headers);
  const limited = rateLimit(`roi-chat:${session.email}:${ip}`, 30);
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

  let messages: ChatMessage[];
  try {
    const body = await request.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      throw new Error('invalid');
    }
  } catch {
    return Response.json({ error: 'Requête invalide' }, { status: 400 });
  }

  const tools = buildToolDefinitions(mode);
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Boucle agentique : tours assistant + exécutions de tools serveur
        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          let stopReason: string | null = null;
          let toolCalls: Array<{ id: string; name: string; input: unknown }> = [];

          for await (const event of streamAssistantTurn({
            system: SYSTEM_PROMPT_INTERNE,
            messages,
            tools,
          })) {
            if (event.type === 'text') {
              sse(controller, encoder, { type: 'text', text: event.text });
            } else if (event.type === 'turn_end') {
              messages = [...messages, { role: 'assistant', content: event.content }];
              stopReason = event.stopReason;
              toolCalls = event.toolCalls;
            }
          }

          if (stopReason !== 'tool_use' || toolCalls.length === 0) break;

          // Exécution des tools (tous les résultats dans UN message user)
          const results = toolCalls.map((call) => {
            sse(controller, encoder, { type: 'tool', name: call.name });
            const result = executeTool(call.name, call.input, mode);
            if (call.name === 'calculate' && !result.isError && result.calcResults) {
              sse(controller, encoder, { type: 'calc', results: result.calcResults });
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
