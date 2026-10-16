import { getClientIp } from '@/lib/rate-limit';
import {
  champsRechercheSchema,
  requeteRechercheSchema,
  PAGE_SOURCE_OCCASION,
  type ChampsRecherche,
  type DemandeRecherche,
  type RequeteRecherche,
  type ReponseRecherche,
} from './schema';
import { servicesOuverts, type ServicesOccasion } from './services';

/**
 * Traitement de `POST /api/occasion`, séparé de la route pour être testé avec des
 * services simulés (`lib/occasion/__tests__/recherche-gestionnaire.test.ts`).
 * Modèle : `lib/catalogue/gestionnaire.ts` (#82). Aucun appel à `/api/contact`.
 *
 * Ordre : limitation → services fermés (503, la demande n'est pas lue) →
 * validation → champ piège → idempotence de l'instance → référence disponible →
 * notification interne → accusé de réception.
 *
 * Règles de confirmation (mission S0 du 11/10/2026) :
 * - la notification interne part EN PREMIER ; sans identifiant Resend, réponse
 *   500 : aucun succès, aucun accusé, le visiteur peut réessayer ;
 * - l'accusé ne part qu'après une notification confirmée ; s'il échoue, la
 *   demande reste reçue (`ackSent: false`).
 *
 * Limites connues : la limitation (`lib/rate-limit.ts`) et le registre
 * d'idempotence vivent en mémoire de l'INSTANCE ; sur Vercel, plusieurs
 * instances ne les partagent pas. C'est un frein local, pas un anti-abus ni un
 * anti-doublon distribué. Le journal ne contient aucune donnée personnelle :
 * seulement `requestId`, tiré au hasard par le navigateur.
 */

export interface DependancesOccasion {
  services: ServicesOccasion;
  /** Limitation par clé (adresse IP) ; `resetInSec` sert l'en-tête Retry-After. */
  limiter: (cle: string) => { ok: boolean; resetInSec: number };
  maintenant?: () => Date;
  journal?: (evenement: string, details?: Record<string, string>) => void;
}

interface Resultat {
  status: number;
  body: ReponseRecherche;
  headers?: Record<string, string>;
}

const DUREE_IDEMPOTENCE_MS = 15 * 60 * 1000;
const TAILLE_MAX_IDEMPOTENCE = 2000;

function journalParDefaut(evenement: string, details?: Record<string, string>) {
  console.warn(`[api/occasion] ${evenement}`, details ?? {});
}

function repondre({ status, body, headers }: Resultat): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

const CHAMPS = Object.keys(champsRechercheSchema.shape) as Array<keyof ChampsRecherche>;

function erreursParChamp(issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey>; message: string }>) {
  const fieldErrors: Partial<Record<keyof ChampsRecherche, string>> = {};
  for (const issue of issues) {
    const champ = issue.path[0] as keyof ChampsRecherche;
    if (CHAMPS.includes(champ) && !fieldErrors[champ]) fieldErrors[champ] = issue.message;
  }
  return fieldErrors;
}

export function creerGestionnaireOccasion(deps: DependancesOccasion): (req: Request) => Promise<Response> {
  const maintenant = deps.maintenant ?? (() => new Date());
  const journal = deps.journal ?? journalParDefaut;
  const enCours = new Map<string, { expire: number; resultat: Promise<Resultat> }>();

  function purger(instant: number) {
    for (const [cle, entree] of enCours) {
      if (entree.expire <= instant) enCours.delete(cle);
    }
    while (enCours.size > TAILLE_MAX_IDEMPOTENCE) {
      const plusAncienne = enCours.keys().next().value;
      if (plusAncienne === undefined) break;
      enCours.delete(plusAncienne);
    }
  }

  async function traiter(requete: RequeteRecherche): Promise<Resultat> {
    const { services } = deps;
    if (services.mode !== 'reel' || !servicesOuverts(services, maintenant())) {
      return { status: 503, body: { ok: false, error: 'occasion_unavailable' } };
    }
    const contexte = { requestId: requete.requestId };

    // Une référence n'est acceptée que si la machine est réellement disponible
    // maintenant (registre, jamais les exemples fictifs).
    if (requete.reference && !services.referencesDisponibles().includes(requete.reference)) {
      journal('occasion.reference_indisponible', contexte);
      return { status: 409, body: { ok: false, error: 'reference_unavailable' } };
    }

    const demande: DemandeRecherche = {
      firstName: requete.firstName,
      email: requete.email,
      company: requete.company,
      besoin: requete.besoin,
      famille: requete.famille,
      telephone: requete.telephone,
      budget: requete.budget,
      horizon: requete.horizon,
      commentaire: requete.commentaire,
      reference: requete.reference,
      requestId: requete.requestId,
      recueLe: maintenant().toISOString(),
      pageSource: PAGE_SOURCE_OCCASION,
      langue: requete.langue,
      ...(requete.attribution ? { attribution: requete.attribution } : {}),
    };

    // 1. Notification interne : sans identifiant Resend, la demande n'est pas reçue.
    try {
      await services.notification.notifier(demande);
    } catch {
      journal('occasion.notification.echec', contexte);
      return { status: 500, body: { ok: false, error: 'technical' } };
    }

    // 2. Accusé de réception, seulement après une notification confirmée.
    let ackSent = false;
    try {
      ackSent = (await services.accuse.envoyer(demande)).envoye === true;
    } catch {
      ackSent = false;
    }
    if (!ackSent) journal('occasion.accuse.echec', contexte);

    return { status: 200, body: { ok: true, ackSent } };
  }

  return async function gestionnaire(req: Request): Promise<Response> {
    const limite = deps.limiter(`occasion:${getClientIp(req.headers)}`);
    if (!limite.ok) {
      return repondre({
        status: 429,
        body: { ok: false, error: 'rate_limited', retryAfterSec: limite.resetInSec },
        headers: { 'Retry-After': String(limite.resetInSec) },
      });
    }

    // Fermé par défaut (COLLECTE_REELLE_AUTORISEE = false) ou fenêtre de test
    // échue : la demande n'est ni lue, ni validée, ni transmise.
    if (!servicesOuverts(deps.services, maintenant())) {
      return repondre({ status: 503, body: { ok: false, error: 'occasion_unavailable' } });
    }

    let brut: unknown;
    try {
      brut = await req.json();
    } catch {
      return repondre({ status: 400, body: { ok: false, error: 'invalid' } });
    }

    const analyse = requeteRechercheSchema.safeParse(brut);
    if (!analyse.success) {
      const fieldErrors = erreursParChamp(analyse.error.issues);
      return repondre({
        status: 400,
        body: { ok: false, error: 'invalid', ...(Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}) },
      });
    }
    const requete = analyse.data;

    if (requete.siteWeb) {
      journal('occasion.piege', { requestId: requete.requestId });
      return repondre({ status: 400, body: { ok: false, error: 'invalid' } });
    }

    // Idempotence de l'instance : un double clic ou un nouvel essai avec le même
    // requestId ne rejoue aucun envoi. Seule une demande reçue reste mémorisée ;
    // un échec peut être retenté.
    const instant = maintenant().getTime();
    purger(instant);
    const cle = `${requete.requestId}:${requete.email.toLowerCase()}`;
    const existante = enCours.get(cle);
    if (existante) return repondre(await existante.resultat);

    const resultat = traiter(requete);
    enCours.set(cle, { expire: instant + DUREE_IDEMPOTENCE_MS, resultat });
    const fin = await resultat;
    if (fin.status !== 200) enCours.delete(cle);
    return repondre(fin);
  };
}
