import type { Resend } from 'resend';
import { composerConfirmationAlerte } from './courriel';
import type { InscriptionAlerte } from './schema';

/**
 * Adaptateur Resend de la liste d'alerte (serveur seulement), injectable : les
 * tests le remplacent par une doublure (`lib/occasion/__tests__/alertes-doublures.ts`).
 *
 * Fonctions Resend utilisées (SDK `resend` 6.9.3, vérifiées dans ses types) :
 * `emails.send`, `contacts.get/create/update`, `contacts.segments.list/add/remove`,
 * `contacts.topics.list/update`. Resend répond `{ data, error }` sans lever : un
 * appel n'est tenu pour réussi que sans `error` ET avec l'identifiant attendu.
 *
 * Contacts GLOBAUX chez Resend (un contact par adresse, partagé par toutes les
 * listes). Règles, pour ne jamais toucher aux autres communications :
 * - seuls le segment `OCCASION_ALERTES_SEGMENT_ID`, le topic
 *   `OCCASION_ALERTES_TOPIC_ID` (créé en « opt_out » par défaut : seuls les
 *   inscrits explicites reçoivent) et les propriétés `occasion_alertes_*` sont
 *   écrits ; jamais `unsubscribed`, jamais un autre topic, jamais prénom ou nom ;
 * - un contact globalement désinscrit (`unsubscribed: true`) n'est pas modifié ;
 * - un contact déjà passé par cette liste puis sorti du topic (désinscription
 *   par notre lien OU par la page de préférences de Resend) n'est pas
 *   réinscrit : réponse « desinscrit » ;
 * - rien n'est écrit avant la confirmation (double opt-in).
 *
 * Prérequis chez Resend, À CRÉER PAR UNE PERSONNE (aucune création par le code) :
 * le segment, le topic et les propriétés de contact de `PROPRIETES` (type texte).
 */

export const PROPRIETES = {
  etat: 'occasion_alertes_etat',
  demandeLe: 'occasion_alertes_demande_le',
  confirmeLe: 'occasion_alertes_confirme_le',
  version: 'occasion_alertes_version',
  source: 'occasion_alertes_source',
  famille: 'occasion_alertes_famille',
  desinscritLe: 'occasion_alertes_desinscrit_le',
} as const;

type ErreurResend = { name?: string; statusCode?: number | null; message?: string } | null;
type Resultat<T> = Promise<{ data: T | null; error: ErreurResend }>;
type Abonnement = 'opt_in' | 'opt_out';
type ValeurPropriete = { type: string; value: string | number };

/** Sous-ensemble du client Resend utilisé par la liste d'alerte. */
export interface ClientAlertes {
  emails: {
    send(m: { from: string; to: string[]; subject: string; html: string; text: string }): Resultat<{ id: string }>;
  };
  contacts: {
    get(o: { email: string }): Resultat<{ id: string; unsubscribed: boolean; properties?: Record<string, ValeurPropriete> }>;
    create(o: {
      email: string;
      segments: { id: string }[];
      topics: { id: string; subscription: Abonnement }[];
      properties: Record<string, string>;
    }): Resultat<{ id: string }>;
    update(o: { email: string; properties: Record<string, string> }): Resultat<{ id: string }>;
    segments: {
      list(o: { email: string; limit: number }): Resultat<{ data: { id: string }[]; has_more: boolean }>;
      add(o: { email: string; segmentId: string }): Resultat<{ id: string }>;
      remove(o: { email: string; segmentId: string }): Resultat<{ id: string }>;
    };
    topics: {
      list(o: { email: string; limit: number }): Resultat<{ data: { id: string; subscription: Abonnement }[]; has_more: boolean }>;
      update(o: { email: string; topics: { id: string; subscription: Abonnement }[] }): Resultat<{ id: string }>;
    };
  };
}

/** Branche le vrai client Resend sur l'interface, avec contrôle des types du SDK. */
export function clientAlertesResend(r: Resend): ClientAlertes {
  return {
    emails: { send: (m) => r.emails.send(m) },
    contacts: {
      get: (o) => r.contacts.get({ email: o.email }),
      create: (o) => r.contacts.create(o),
      update: (o) => r.contacts.update({ email: o.email, properties: o.properties }),
      segments: {
        list: (o) => r.contacts.segments.list({ email: o.email, limit: o.limit }),
        add: (o) => r.contacts.segments.add({ email: o.email, segmentId: o.segmentId }),
        remove: (o) => r.contacts.segments.remove({ email: o.email, segmentId: o.segmentId }),
      },
      topics: {
        list: (o) => r.contacts.topics.list({ email: o.email, limit: o.limit }),
        update: (o) => r.contacts.topics.update({ email: o.email, topics: o.topics }),
      },
    },
  };
}

/** Erreur d'un appel Resend, sans donnée personnelle (nom d'erreur seulement). */
export class ErreurFournisseur extends Error {
  constructor(public readonly etape: string, public readonly code: string) {
    super(`Resend ${etape} : ${code}`);
    this.name = 'ErreurFournisseur';
  }
}

function exiger<T extends { id: string }>(etape: string, r: { data: T | null; error: ErreurResend }): T {
  if (r.error) throw new ErreurFournisseur(etape, r.error.name ?? 'inconnue');
  if (!r.data || typeof r.data.id !== 'string' || r.data.id.length === 0) throw new ErreurFournisseur(etape, 'sans_identifiant');
  return r.data;
}

function estIntrouvable(e: ErreurResend): boolean {
  return Boolean(e && (e.name === 'not_found' || e.statusCode === 404));
}

// ── Envoi de l'e-mail de confirmation ─────────────────────────────────────────

export interface EnvoiConfirmation {
  /** Envoie l'e-mail de confirmation ; lève si Resend ne renvoie pas d'identifiant. */
  envoyer(p: { email: string; famille: string; lien: string; expireLe: number }): Promise<{ id: string }>;
}

export function envoiConfirmationResend(client: ClientAlertes, expediteur: string): EnvoiConfirmation {
  return {
    async envoyer(p) {
      const c = composerConfirmationAlerte({ lien: p.lien, famille: p.famille, expireLe: p.expireLe });
      const r = await client.emails.send({
        from: `PackshotCreator <${expediteur}>`,
        to: [p.email],
        subject: c.objet,
        text: c.texte,
        html: c.html,
      });
      return { id: exiger('emails.send', r).id };
    },
  };
}

// ── Registre des inscriptions (contacts Resend) ───────────────────────────────

export interface RegistreAlertes {
  /** Après le clic de confirmation. N'écrit rien si l'adresse est déjà inscrite ou désinscrite. */
  confirmer(i: InscriptionAlerte): Promise<'inscrit' | 'deja_inscrit' | 'desinscrit'>;
  /** Sort l'adresse de la liste Occasion seulement ; idempotent ; ne crée jamais de contact. */
  desinscrire(email: string, maintenant: Date): Promise<'desinscrit'>;
}

function proprietesInscription(i: InscriptionAlerte): Record<string, string> {
  return {
    [PROPRIETES.etat]: 'confirme',
    [PROPRIETES.demandeLe]: i.demandeLe,
    [PROPRIETES.confirmeLe]: i.confirmeLe,
    [PROPRIETES.version]: i.versionConsentement,
    [PROPRIETES.source]: i.source,
    [PROPRIETES.famille]: i.famille,
  };
}

export function registreAlertesResend(client: ClientAlertes, cfg: { segmentId: string; topicId: string }): RegistreAlertes {
  async function abonnement(email: string): Promise<Abonnement> {
    const r = await client.contacts.topics.list({ email, limit: 100 });
    if (r.error || !r.data) throw new ErreurFournisseur('contacts.topics.list', r.error?.name ?? 'sans_donnees');
    return r.data.data.find((t) => t.id === cfg.topicId)?.subscription ?? 'opt_out';
  }

  async function dansSegment(email: string): Promise<boolean> {
    const r = await client.contacts.segments.list({ email, limit: 100 });
    if (r.error || !r.data) throw new ErreurFournisseur('contacts.segments.list', r.error?.name ?? 'sans_donnees');
    return r.data.data.some((s) => s.id === cfg.segmentId);
  }

  return {
    async confirmer(i) {
      const lu = await client.contacts.get({ email: i.email });
      if (lu.error && !estIntrouvable(lu.error)) throw new ErreurFournisseur('contacts.get', lu.error.name ?? 'inconnue');

      if (!lu.data) {
        // Nouveau contact : segment, topic et preuve en un seul appel.
        exiger(
          'contacts.create',
          await client.contacts.create({
            email: i.email,
            segments: [{ id: cfg.segmentId }],
            topics: [{ id: cfg.topicId, subscription: 'opt_in' }],
            properties: proprietesInscription(i),
          }),
        );
        return 'inscrit';
      }

      // Contact existant : jamais de réabonnement global.
      if (lu.data.unsubscribed === true) return 'desinscrit';
      const etat = lu.data.properties?.[PROPRIETES.etat]?.value;
      const sub = await abonnement(i.email);
      if (sub === 'opt_out' && (etat === 'confirme' || etat === 'desinscrit')) return 'desinscrit';
      if (sub === 'opt_in' && etat === 'confirme') return 'deja_inscrit';

      // Première inscription Occasion d'un contact connu par ailleurs (ou reprise
      // d'une confirmation interrompue) : seulement notre segment, notre topic,
      // nos propriétés. Les autres préférences du contact restent intactes.
      if (!(await dansSegment(i.email))) {
        exiger('contacts.segments.add', await client.contacts.segments.add({ email: i.email, segmentId: cfg.segmentId }));
      }
      if (sub !== 'opt_in') {
        exiger('contacts.topics.update', await client.contacts.topics.update({ email: i.email, topics: [{ id: cfg.topicId, subscription: 'opt_in' }] }));
      }
      exiger('contacts.update', await client.contacts.update({ email: i.email, properties: proprietesInscription(i) }));
      return 'inscrit';
    },

    async desinscrire(email, maintenant) {
      const lu = await client.contacts.get({ email });
      if (lu.error && !estIntrouvable(lu.error)) throw new ErreurFournisseur('contacts.get', lu.error.name ?? 'inconnue');
      if (!lu.data) return 'desinscrit'; // rien à faire, aucun contact créé

      exiger('contacts.topics.update', await client.contacts.topics.update({ email, topics: [{ id: cfg.topicId, subscription: 'opt_out' }] }));
      if (await dansSegment(email)) {
        exiger('contacts.segments.remove', await client.contacts.segments.remove({ email, segmentId: cfg.segmentId }));
      }
      exiger(
        'contacts.update',
        await client.contacts.update({
          email,
          properties: { [PROPRIETES.etat]: 'desinscrit', [PROPRIETES.desinscritLe]: maintenant.toISOString() },
        }),
      );
      return 'desinscrit';
    },
  };
}
