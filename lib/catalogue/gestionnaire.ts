import { getClientIp } from '@/lib/rate-limit';
import {
  champsCatalogueSchema,
  requeteCatalogueSchema,
  PAGE_SOURCE_CATALOGUE,
  type ChampsCatalogue,
  type DemandeCatalogue,
  type RequeteCatalogue,
  type ReponseCatalogue,
} from './schema';
import type { ServicesCatalogue } from './services';

/**
 * Traitement de `POST /api/catalogue`, séparé de la route pour être testé avec
 * des services simulés (`lib/catalogue/__tests__/gestionnaire.test.ts`).
 *
 * Ordre : limitation → validation → champ piège → idempotence de l'instance →
 * disponibilité (PDF, e-mail et notification configurés) → e-mail du lien au
 * prospect → notification interne (demande de consultant comprise, sort de
 * l'e-mail du lien indiqué).
 *
 * Aucun CRM (décision de Sébastien du 09/10/2026) : la trace de la demande est
 * la notification interne, et à défaut l'e-mail du lien, conservé dans le
 * journal d'envoi Resend. Aucun succès n'est renvoyé si Resend ne confirme ni
 * l'un ni l'autre : la demande n'a laissé aucune trace, le visiteur peut
 * réessayer.
 *
 * Limites connues :
 * - la limitation (`lib/rate-limit.ts`) et le registre d'idempotence vivent en
 *   mémoire de l'instance : sur Vercel, plusieurs instances ne partagent pas
 *   leurs compteurs. C'est un frein, pas un anti-abus distribué ; un même
 *   requestId reçu par deux instances est traité deux fois.
 * - le journal ne contient aucune donnée personnelle (ni e-mail, ni prénom, ni
 *   entreprise) : seulement `requestId`, tiré au hasard par le navigateur, et le pays.
 */

export interface DependancesCatalogue {
  services: ServicesCatalogue;
  /** Limitation par clé (adresse IP) ; `resetInSec` sert l'en-tête Retry-After. */
  limiter: (cle: string) => { ok: boolean; resetInSec: number };
  maintenant?: () => Date;
  journal?: (evenement: string, details?: Record<string, string>) => void;
}

interface Resultat {
  status: number;
  body: ReponseCatalogue;
  headers?: Record<string, string>;
}

const DUREE_IDEMPOTENCE_MS = 15 * 60 * 1000;
const TAILLE_MAX_IDEMPOTENCE = 2000;

function journalParDefaut(evenement: string, details?: Record<string, string>) {
  console.warn(`[api/catalogue] ${evenement}`, details ?? {});
}

function repondre({ status, body, headers }: Resultat): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

const CHAMPS = Object.keys(champsCatalogueSchema.shape) as Array<keyof ChampsCatalogue>;

function erreursParChamp(issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey>; message: string }>) {
  const fieldErrors: Partial<Record<keyof ChampsCatalogue, string>> = {};
  for (const issue of issues) {
    const champ = issue.path[0] as keyof ChampsCatalogue;
    if (CHAMPS.includes(champ) && !fieldErrors[champ]) fieldErrors[champ] = issue.message;
  }
  return fieldErrors;
}

export function creerGestionnaireCatalogue(deps: DependancesCatalogue): (req: Request) => Promise<Response> {
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

  async function traiter(requete: RequeteCatalogue): Promise<Resultat> {
    const { services } = deps;
    const contexte = { requestId: requete.requestId, country: requete.country };

    // Fermé par défaut : sans services ni PDF autorisé, rien n'est accepté.
    let pdfUrl: string | null = null;
    if (services.mode !== 'desactive') {
      try {
        pdfUrl = await services.pdfUrl();
      } catch {
        pdfUrl = null;
      }
    }
    if (!pdfUrl) {
      journal('catalogue.indisponible', { ...contexte, mode: services.mode });
      return { status: 503, body: { ok: false, error: 'catalogue_unavailable' } };
    }

    // Simulation locale : rien n'est envoyé ni transmis, rien n'est déclaré fait.
    if (services.mode !== 'reel') {
      return {
        status: 200,
        body: { ok: true, pdfUrl, emailSent: false, contactRequestAccepted: false, simulated: true },
      };
    }

    const demande: DemandeCatalogue = {
      requestId: requete.requestId,
      recueLe: maintenant().toISOString(),
      firstName: requete.firstName,
      email: requete.email,
      company: requete.company,
      country: requete.country,
      products: requete.products,
      consultantOptIn: requete.consultantOptIn,
      pageSource: PAGE_SOURCE_CATALOGUE,
      ...(requete.attribution ? { attribution: requete.attribution } : {}),
    };

    // E-mail du lien d'abord : la notification dit à l'équipe s'il est parti.
    let emailSent = false;
    try {
      emailSent = (await services.courriel.envoyerLien(demande, pdfUrl)).envoye === true;
    } catch {
      emailSent = false;
    }
    if (!emailSent) journal('catalogue.courriel.echec', contexte);

    // Chaque nouveau lead brochure est notifié à l'équipe ; la notification porte
    // aussi la demande de consultant, qui n'est déclarée prise en compte que si
    // elle a été transmise.
    let notificationTransmise = false;
    try {
      await services.notification.notifier(demande, { emailSent });
      notificationTransmise = true;
    } catch {
      journal('catalogue.notification.echec', contexte);
    }

    if (!emailSent && !notificationTransmise) {
      journal('catalogue.aucune_trace', contexte);
      return { status: 500, body: { ok: false, error: 'technical' } };
    }

    return {
      status: 200,
      body: {
        ok: true,
        pdfUrl,
        emailSent,
        contactRequestAccepted: demande.consultantOptIn && notificationTransmise,
      },
    };
  }

  return async function gestionnaire(req: Request): Promise<Response> {
    const limite = deps.limiter(`catalogue:${getClientIp(req.headers)}`);
    if (!limite.ok) {
      return repondre({
        status: 429,
        body: { ok: false, error: 'rate_limited', retryAfterSec: limite.resetInSec },
        headers: { 'Retry-After': String(limite.resetInSec) },
      });
    }

    let brut: unknown;
    try {
      brut = await req.json();
    } catch {
      return repondre({ status: 400, body: { ok: false, error: 'invalid' } });
    }

    const analyse = requeteCatalogueSchema.safeParse(brut);
    if (!analyse.success) {
      const fieldErrors = erreursParChamp(analyse.error.issues);
      return repondre({
        status: 400,
        body: { ok: false, error: 'invalid', ...(Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}) },
      });
    }
    const requete = analyse.data;

    if (requete.siteWeb) {
      journal('catalogue.piege', { requestId: requete.requestId });
      return repondre({ status: 400, body: { ok: false, error: 'invalid' } });
    }

    // Idempotence : un double clic ou un nouvel essai avec le même requestId ne
    // rejoue aucun effet. Seule une demande acceptée reste mémorisée ; un échec
    // peut être retenté.
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
