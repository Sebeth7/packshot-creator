/**
 * Doublure du service externe de la landing catalogue : un client Resend
 * factice. Aucun appel réseau, aucun e-mail. Aucun CRM dans ce parcours
 * (décision de Sébastien du 09/10/2026).
 */
import { vi } from 'vitest';
import type { ClientCourriel } from '@/lib/catalogue/resend';

export type MessageEnvoye = Parameters<ClientCourriel['emails']['send']>[0];

export function fauxResend(reponse?: (m: MessageEnvoye) => { data: { id: string } | null; error: unknown }) {
  const envois: MessageEnvoye[] = [];
  const send = vi.fn(async (m: MessageEnvoye) => {
    envois.push(m);
    return reponse ? reponse(m) : { data: { id: `msg_${envois.length}` }, error: null };
  });
  const client: ClientCourriel = { emails: { send } };
  return { client, envois, send };
}
