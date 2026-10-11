import { getClientIp } from '@/lib/rate-limit';
import { lienConfirmation } from './courriel';
import { DUREE_CONFIRMATION_MS, creerJeton, lireJetonConfirmation, lireJetonDesinscription } from './jeton';
import { requeteAlerteSchema, requeteJetonSchema, sourceAlertes, type ReponseAlertes } from './schema';
import { alertesOuvertes, type ServicesAlertes } from './services';

/**
 * Traitement des trois routes de la liste d'alerte, séparé des routes pour être
 * testé avec des services simulés (`lib/occasion/__tests__/alertes-*.test.ts`).
 * Aucune de ces routes ne passe par `/api/occasion` (demande commerciale), ni
 * par `/api/contact`, ni par un CRM.
 *
 * - `inscription` : e-mail + famille + case d'accord → e-mail de confirmation
 *   (jeton chiffré, 48 h). AUCUNE écriture chez Resend à ce stade.
 * - `confirmation` : jeton valide → contact Resend (segment, topic, preuve).
 * - `desinscription` : jeton de désinscription → sortie de la liste Occasion.
 *
 * Ordre commun : limitation → services fermés (503, la demande n'est pas lue) →
 * validation stricte → traitement. Limitation et anti-doublon vivent en mémoire
 * de l'INSTANCE : frein local, pas un anti-abus distribué. Le journal ne porte
 * aucune donnée personnelle.
 */

export interface DependancesAlertes {
  services: ServicesAlertes;
  limiter: (cle: string) => { ok: boolean; resetInSec: number };
  maintenant?: () => Date;
  journal?: (evenement: string, details?: Record<string, string>) => void;
}

interface Resultat {
  status: number;
  body: ReponseAlertes;
  headers?: Record<string, string>;
}

/** Une adresse ne reçoit pas plus d'un e-mail de confirmation par période. */
export const DELAI_RENVOI_MS = 15 * 60 * 1000;
const TAILLE_MAX_MEMOIRE = 2000;

function journalParDefaut(evenement: string, details?: Record<string, string>) {
  console.warn(`[api/occasion/alertes] ${evenement}`, details ?? {});
}

function repondre({ status, body, headers }: Resultat): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

const FERMEE: Resultat = { status: 503, body: { ok: false, error: 'alertes_unavailable' } };
const TECHNIQUE: Resultat = { status: 500, body: { ok: false, error: 'technical' } };

function origine(req: Request, urlBase: string | null): string {
  return urlBase ?? new URL(req.url).origin;
}

async function lireCorps(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return undefined;
  }
}

export function creerGestionnairesAlertes(deps: DependancesAlertes) {
  const maintenant = deps.maintenant ?? (() => new Date());
  const journal = deps.journal ?? journalParDefaut;
  const confirmationsEnvoyees = new Map<string, { expire: number; resultat: Promise<Resultat> }>();
  const confirmationsEnCours = new Map<string, Promise<Resultat>>();

  function purger(instant: number) {
    for (const [cle, e] of confirmationsEnvoyees) if (e.expire <= instant) confirmationsEnvoyees.delete(cle);
    while (confirmationsEnvoyees.size > TAILLE_MAX_MEMOIRE) {
      const ancienne = confirmationsEnvoyees.keys().next().value;
      if (ancienne === undefined) break;
      confirmationsEnvoyees.delete(ancienne);
    }
  }

  /** Préambule commun : limitation puis verrou. `null` = continuer. */
  function preambule(req: Request, prefixe: string): Resultat | null {
    const limite = deps.limiter(`${prefixe}:${getClientIp(req.headers)}`);
    if (!limite.ok) {
      return {
        status: 429,
        body: { ok: false, error: 'rate_limited', retryAfterSec: limite.resetInSec },
        headers: { 'Retry-After': String(limite.resetInSec) },
      };
    }
    if (!alertesOuvertes(deps.services, maintenant())) return FERMEE;
    return null;
  }

  async function inscription(req: Request): Promise<Response> {
    const arret = preambule(req, 'occasion-alertes');
    if (arret) return repondre(arret);
    const services = deps.services;
    if (services.mode !== 'reel') return repondre(FERMEE);

    const analyse = requeteAlerteSchema.safeParse(await lireCorps(req));
    if (!analyse.success) {
      const fieldErrors: Partial<Record<'email' | 'famille' | 'consentement', string>> = {};
      for (const i of analyse.error.issues) {
        const champ = i.path[0] === 'versionConsentement' ? 'consentement' : i.path[0];
        if ((champ === 'email' || champ === 'famille' || champ === 'consentement') && !fieldErrors[champ]) fieldErrors[champ] = i.message;
      }
      return repondre({ status: 400, body: { ok: false, error: 'invalid', ...(Object.keys(fieldErrors).length ? { fieldErrors } : {}) } });
    }
    const r = analyse.data;
    if (r.siteWeb) {
      journal('alertes.piege');
      return repondre({ status: 400, body: { ok: false, error: 'invalid' } });
    }

    // Double clic, nouvel essai ou rafale sur la même adresse : un seul e-mail
    // de confirmation par période ; la même réponse est renvoyée.
    const instant = maintenant().getTime();
    purger(instant);
    const existante = confirmationsEnvoyees.get(r.email);
    if (existante) return repondre(await existante.resultat);

    const traitement = (async (): Promise<Resultat> => {
      const expireLe = instant + DUREE_CONFIRMATION_MS;
      const jeton = creerJeton(
        {
          type: 'confirmation',
          email: r.email,
          langue: r.langue,
          famille: r.famille,
          versionConsentement: r.versionConsentement,
          source: sourceAlertes(r.langue),
          demandeLe: new Date(instant).toISOString(),
          expireLe,
        },
        services.secret,
      );
      try {
        await services.confirmation.envoyer({
          email: r.email,
          famille: r.famille,
          lien: lienConfirmation(origine(req, services.urlBase), jeton, r.langue),
          expireLe,
          langue: r.langue,
        });
      } catch {
        journal('alertes.confirmation.echec_envoi');
        return TECHNIQUE;
      }
      return { status: 200, body: { ok: true, etat: 'confirmation_envoyee' } };
    })();
    confirmationsEnvoyees.set(r.email, { expire: instant + DELAI_RENVOI_MS, resultat: traitement });
    const fin = await traitement;
    if (fin.status !== 200) confirmationsEnvoyees.delete(r.email);
    return repondre(fin);
  }

  async function lireJetonRequete(req: Request): Promise<string | Resultat> {
    const analyse = requeteJetonSchema.safeParse(await lireCorps(req));
    if (!analyse.success) return { status: 400, body: { ok: false, error: 'invalid' } };
    return analyse.data.jeton;
  }

  async function confirmation(req: Request): Promise<Response> {
    const arret = preambule(req, 'occasion-alertes-jeton');
    if (arret) return repondre(arret);
    const services = deps.services;
    if (services.mode !== 'reel') return repondre(FERMEE);

    const jeton = await lireJetonRequete(req);
    if (typeof jeton !== 'string') return repondre(jeton);
    const lu = lireJetonConfirmation(jeton, services.secret, maintenant());
    if (!lu.ok) {
      return repondre(
        lu.raison === 'expire'
          ? { status: 410, body: { ok: false, error: 'jeton_expire' } }
          : { status: 400, body: { ok: false, error: 'jeton_invalide' } },
      );
    }
    const d = lu.donnees;

    // Deux clics simultanés sur le même lien : un seul traitement.
    const enCours = confirmationsEnCours.get(d.email);
    if (enCours) return repondre(await enCours);
    const traitement = (async (): Promise<Resultat> => {
      try {
        const etat = await services.registre.confirmer({
          email: d.email,
          famille: d.famille,
          versionConsentement: d.versionConsentement,
          source: d.source,
          demandeLe: d.demandeLe,
          confirmeLe: maintenant().toISOString(),
        });
        return { status: 200, body: { ok: true, etat } };
      } catch (e) {
        journal('alertes.confirmation.echec', { etape: e instanceof Error && 'etape' in e ? String(e.etape) : 'inconnue' });
        return TECHNIQUE;
      }
    })();
    confirmationsEnCours.set(d.email, traitement);
    try {
      return repondre(await traitement);
    } finally {
      confirmationsEnCours.delete(d.email);
    }
  }

  async function desinscription(req: Request): Promise<Response> {
    const arret = preambule(req, 'occasion-alertes-jeton');
    if (arret) return repondre(arret);
    const services = deps.services;
    if (services.mode !== 'reel') return repondre(FERMEE);

    const jeton = await lireJetonRequete(req);
    if (typeof jeton !== 'string') return repondre(jeton);
    const lu = lireJetonDesinscription(jeton, services.secret);
    if (!lu.ok) return repondre({ status: 400, body: { ok: false, error: 'jeton_invalide' } });
    try {
      const etat = await services.registre.desinscrire(lu.donnees.email, maintenant());
      return repondre({ status: 200, body: { ok: true, etat } });
    } catch (e) {
      journal('alertes.desinscription.echec', { etape: e instanceof Error && 'etape' in e ? String(e.etape) : 'inconnue' });
      return repondre(TECHNIQUE);
    }
  }

  return { inscription, confirmation, desinscription };
}
