/**
 * Doublure du client Resend de la liste d'alerte : contacts, segments et topics
 * en mémoire, au comportement modelé sur l'API (contacts globaux, `{ data, error }`
 * sans exception). Aucun appel réseau, aucun e-mail, aucune écriture réelle.
 */
import { vi } from 'vitest';
import type { ClientAlertes } from '@/lib/occasion/alertes/resend';

type Abonnement = 'opt_in' | 'opt_out';

export interface ContactFactice {
  id: string;
  unsubscribed: boolean;
  properties: Record<string, string>;
  segments: Set<string>;
  topics: Map<string, Abonnement>;
}

export type Methode =
  | 'emails.send'
  | 'contacts.get'
  | 'contacts.create'
  | 'contacts.update'
  | 'segments.list'
  | 'segments.add'
  | 'segments.remove'
  | 'topics.list'
  | 'topics.update';

type Erreur = { name: string; statusCode: number | null; message: string };
type Panne = { error: Erreur } | { sansIdentifiant: true };

export const SEGMENT = 'seg_occasion';
export const TOPIC = 'top_occasion';

export function fauxClientAlertes(options: { segmentsExistants?: string[]; topicsExistants?: string[] } = {}) {
  const segmentsExistants = new Set(options.segmentsExistants ?? [SEGMENT, 'seg_newsletter']);
  const topicsExistants = new Set(options.topicsExistants ?? [TOPIC, 'top_newsletter']);
  const contacts = new Map<string, ContactFactice>();
  const appels: { methode: Methode; args: unknown }[] = [];
  const pannes = new Map<Methode, Panne>();
  let n = 0;

  const ok = <T>(data: T) => ({ data, error: null });
  const ko = (e: Erreur) => ({ data: null, error: e });
  const introuvable = (quoi: string) => ko({ name: 'not_found', statusCode: 404, message: `${quoi} introuvable` });

  function enregistrer(methode: Methode, args: unknown) {
    appels.push({ methode, args });
    const p = pannes.get(methode);
    if (!p) return null;
    return 'error' in p ? ko(p.error) : ok({ id: '' });
  }

  const client: ClientAlertes = {
    emails: {
      send: vi.fn(async (m) => enregistrer('emails.send', m) ?? ok({ id: `msg_${++n}` })),
    },
    contacts: {
      get: vi.fn(async (o) => {
        const panne = enregistrer('contacts.get', o);
        if (panne) return panne as never;
        const c = contacts.get(o.email);
        if (!c) return introuvable('contact');
        const properties = Object.fromEntries(Object.entries(c.properties).map(([k, v]) => [k, { type: 'string', value: v }]));
        return ok({ id: c.id, unsubscribed: c.unsubscribed, properties });
      }),
      create: vi.fn(async (o: Parameters<ClientAlertes['contacts']['create']>[0]) => {
        const panne = enregistrer('contacts.create', o);
        if (panne) return panne;
        if (contacts.has(o.email)) return ko({ name: 'validation_error', statusCode: 422, message: 'existe déjà' });
        for (const s of o.segments) if (!segmentsExistants.has(s.id)) return introuvable('segment');
        for (const t of o.topics) if (!topicsExistants.has(t.id)) return introuvable('topic');
        const c: ContactFactice = {
          id: `ct_${++n}`,
          unsubscribed: false,
          properties: { ...o.properties },
          segments: new Set(o.segments.map((s) => s.id)),
          topics: new Map(o.topics.map((t) => [t.id, t.subscription])),
        };
        contacts.set(o.email, c);
        return ok({ id: c.id });
      }),
      update: vi.fn(async (o: Parameters<ClientAlertes['contacts']['update']>[0]) => {
        const panne = enregistrer('contacts.update', o);
        if (panne) return panne;
        const c = contacts.get(o.email);
        if (!c) return introuvable('contact');
        // `null` efface la propriété, comme le prévoient les types du SDK.
        for (const [k, v] of Object.entries(o.properties)) {
          if (v === null) delete c.properties[k];
          else c.properties[k] = v;
        }
        return ok({ id: c.id });
      }),
      segments: {
        list: vi.fn(async (o) => {
          const panne = enregistrer('segments.list', o);
          if (panne) return panne as never;
          const c = contacts.get(o.email);
          if (!c) return introuvable('contact');
          return ok({ data: [...c.segments].map((id) => ({ id })), has_more: false });
        }),
        add: vi.fn(async (o) => {
          const panne = enregistrer('segments.add', o);
          if (panne) return panne;
          const c = contacts.get(o.email);
          if (!c) return introuvable('contact');
          if (!segmentsExistants.has(o.segmentId)) return introuvable('segment');
          c.segments.add(o.segmentId);
          return ok({ id: o.segmentId });
        }),
        remove: vi.fn(async (o) => {
          const panne = enregistrer('segments.remove', o);
          if (panne) return panne;
          const c = contacts.get(o.email);
          if (!c) return introuvable('contact');
          c.segments.delete(o.segmentId);
          return ok({ id: o.segmentId });
        }),
      },
      topics: {
        list: vi.fn(async (o) => {
          const panne = enregistrer('topics.list', o);
          if (panne) return panne as never;
          const c = contacts.get(o.email);
          if (!c) return introuvable('contact');
          return ok({ data: [...c.topics].map(([id, subscription]) => ({ id, subscription })), has_more: false });
        }),
        update: vi.fn(async (o) => {
          const panne = enregistrer('topics.update', o);
          if (panne) return panne;
          const c = contacts.get(o.email);
          if (!c) return introuvable('contact');
          for (const t of o.topics) {
            if (!topicsExistants.has(t.id)) return introuvable('topic');
            c.topics.set(t.id, t.subscription);
          }
          return ok({ id: c.id });
        }),
      },
    },
  };

  return {
    client,
    contacts,
    appels,
    /** Fait échouer une méthode : erreur Resend, ou réponse sans identifiant. */
    panne(methode: Methode, p: Panne = { error: { name: 'internal_server_error', statusCode: 500, message: 'panne' } }) {
      pannes.set(methode, p);
    },
    retablir(methode: Methode) {
      pannes.delete(methode);
    },
    /** Contact préexistant (newsletter, autres listes…). */
    ajouterContact(email: string, c: Partial<Omit<ContactFactice, 'id'>> = {}) {
      const contact: ContactFactice = {
        id: `ct_${++n}`,
        unsubscribed: c.unsubscribed ?? false,
        properties: c.properties ?? {},
        segments: c.segments ?? new Set(),
        topics: c.topics ?? new Map(),
      };
      contacts.set(email, contact);
      return contact;
    },
    ecritures() {
      return appels.filter((a) => !['contacts.get', 'segments.list', 'topics.list'].includes(a.methode));
    },
  };
}
