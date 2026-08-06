/**
 * Couche d'appel LLM isolée (CDC §2 : architecture provider-agnostique).
 * Le reste du code (route, tools) ne connaît que les types de ce module —
 * changer de fournisseur = réécrire ce seul fichier.
 *
 * Implémentation actuelle : Anthropic claude-sonnet-5 (décision actée),
 * streaming, prompt caching sur le system prompt.
 */

import Anthropic from '@anthropic-ai/sdk';

export const ROI_CHAT_MODEL = process.env.ROI_CHAT_MODEL ?? 'claude-sonnet-5';

/** Définition de tool neutre (format JSON Schema). */
export interface ChatToolDefinition {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

/** Historique de conversation — blocs opaques du provider, gérés côté client. */
export type ChatMessage = Anthropic.MessageParam;

export type ProviderEvent =
  | { type: 'text'; text: string }
  | {
      type: 'turn_end';
      stopReason: string | null;
      /** Contenu assistant complet (texte + tool_use) à réinjecter dans l'historique */
      content: Anthropic.ContentBlock[];
      toolCalls: Array<{ id: string; name: string; input: unknown }>;
    };

let _client: Anthropic | null = null;
function client(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'ANTHROPIC_API_KEY manquante — à ajouter dans le dashboard Vercel (projet sysnext) ou .env.local'
    );
  }
  _client ??= new Anthropic();
  return _client;
}

export function isProviderConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/**
 * Streame un tour assistant. Émet les deltas de texte puis un événement
 * turn_end avec le contenu complet et les appels de tools éventuels.
 */
export async function* streamAssistantTurn(params: {
  system: string;
  messages: ChatMessage[];
  tools: ChatToolDefinition[];
  maxTokens?: number;
}): AsyncGenerator<ProviderEvent> {
  const stream = client().messages.stream({
    model: ROI_CHAT_MODEL,
    max_tokens: params.maxTokens ?? 4096,
    // Prompt caching : system prompt stable en tête, marqué en breakpoint
    system: [
      {
        type: 'text',
        text: params.system,
        cache_control: { type: 'ephemeral' },
      },
    ],
    tools: params.tools as Anthropic.Tool[],
    messages: params.messages,
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      yield { type: 'text', text: event.delta.text };
    }
  }

  const message = await stream.finalMessage();
  const toolCalls = message.content
    .filter((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use')
    .map((b) => ({ id: b.id, name: b.name, input: b.input }));

  yield {
    type: 'turn_end',
    stopReason: message.stop_reason,
    content: message.content,
    toolCalls,
  };
}

/** Construit le message user contenant les résultats de tools du tour. */
export function buildToolResultsMessage(
  results: Array<{ toolUseId: string; content: string; isError?: boolean }>
): ChatMessage {
  return {
    role: 'user',
    content: results.map((r) => ({
      type: 'tool_result' as const,
      tool_use_id: r.toolUseId,
      content: r.content,
      is_error: r.isError ?? false,
    })),
  };
}
