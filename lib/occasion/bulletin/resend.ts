import type { Resend } from 'resend';
import type { ContactLu } from './abonnes';
import type { ClientEnvoiBulletin } from './envoi';

/**
 * Adaptateur Resend du bulletin d'arrivage (script seulement, jamais une route).
 *
 * LECTURE des inscrits : contacts du segment Occasion (`contacts.list`), puis,
 * pour chacun, ses propriétés (`contacts.get`) et son abonnement au topic
 * Occasion (`contacts.topics.list`). Aucune écriture. ENVOI : `batch.send` avec
 * clé d'idempotence. Fonctions vérifiées dans les types du SDK `resend` 6.9.3 ;
 * comportement réel NON VÉRIFIÉ (aucune clé Resend dans cette session) : à
 * contrôler au test réel autorisé, après Q25.
 *
 * Volume : deux lectures par contact. Une pause entre les appels (`pauseMs`)
 * ménage la limite de débit de l'API.
 */

type ErreurResend = { name?: string; statusCode?: number | null; message?: string } | null;
type Resultat<T> = Promise<{ data: T | null; error: ErreurResend }>;
type ValeurPropriete = { type: string; value: string | number };

export interface ClientLectureAbonnes {
  contacts: {
    list(o: { segmentId: string; limit: number; after?: string }): Resultat<{ data: { id: string; email: string; unsubscribed: boolean }[]; has_more: boolean }>;
    get(o: { email: string }): Resultat<{ id: string; unsubscribed: boolean; properties?: Record<string, ValeurPropriete> }>;
    topics: {
      list(o: { email: string; limit: number }): Resultat<{ data: { id: string; subscription: 'opt_in' | 'opt_out' }[]; has_more: boolean }>;
    };
  };
}

export class ErreurLecture extends Error {
  constructor(public readonly etape: string, public readonly code: string) {
    super(`Resend ${etape} : ${code}`);
    this.name = 'ErreurLecture';
  }
}

const attendre = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Contacts du segment Occasion, avec propriétés et abonnement au topic. Lève à la première erreur. */
export async function lireContactsOccasion(
  client: ClientLectureAbonnes,
  cfg: { segmentId: string; topicId: string; pauseMs?: number },
): Promise<ContactLu[]> {
  const pause = cfg.pauseMs ?? 600;
  const contacts: ContactLu[] = [];
  let apres: string | undefined;
  for (;;) {
    const page = await client.contacts.list({ segmentId: cfg.segmentId, limit: 100, ...(apres ? { after: apres } : {}) });
    if (page.error || !page.data) throw new ErreurLecture('contacts.list', page.error?.name ?? 'sans_donnees');
    for (const c of page.data.data) {
      if (pause) await attendre(pause);
      const lu = await client.contacts.get({ email: c.email });
      if (lu.error || !lu.data) throw new ErreurLecture('contacts.get', lu.error?.name ?? 'sans_donnees');
      if (pause) await attendre(pause);
      const t = await client.contacts.topics.list({ email: c.email, limit: 100 });
      if (t.error || !t.data) throw new ErreurLecture('contacts.topics.list', t.error?.name ?? 'sans_donnees');
      const proprietes: Record<string, string | undefined> = {};
      for (const [k, v] of Object.entries(lu.data.properties ?? {})) proprietes[k] = String(v.value);
      contacts.push({
        email: c.email,
        unsubscribed: lu.data.unsubscribed === true || c.unsubscribed === true,
        topic: t.data.data.find((x) => x.id === cfg.topicId)?.subscription ?? null,
        proprietes,
      });
    }
    if (!page.data.has_more || page.data.data.length === 0) break;
    apres = page.data.data[page.data.data.length - 1].id;
  }
  return contacts;
}

/** Branche le vrai client Resend sur les deux interfaces, avec contrôle des types du SDK. */
export function clientBulletinResend(r: Resend): ClientLectureAbonnes & ClientEnvoiBulletin {
  return {
    contacts: {
      list: (o) => r.contacts.list(o.after ? { segmentId: o.segmentId, limit: o.limit, after: o.after } : { segmentId: o.segmentId, limit: o.limit }),
      get: (o) => r.contacts.get({ email: o.email }),
      topics: { list: (o) => r.contacts.topics.list({ email: o.email, limit: o.limit }) },
    },
    batch: { send: (messages, o) => r.batch.send(messages, { idempotencyKey: o.idempotencyKey }) },
  };
}
