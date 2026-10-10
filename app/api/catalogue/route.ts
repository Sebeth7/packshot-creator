import { creerGestionnaireCatalogue } from '@/lib/catalogue/gestionnaire';
import { servicesCatalogue } from '@/lib/catalogue/services';
import { rateLimit } from '@/lib/rate-limit';

/**
 * Demande du catalogue Orbitvu All-in-One (landing /fr/catalogue-orbitvu-all-in-one).
 * Route distincte de /api/contact : une demande de catalogue n'est ni une demande
 * de démonstration ni une demande de devis, et elle ne crée aucune affaire.
 *
 * Le PDF est en ligne sur R2 (06/10/2026) et les envois Resend sont écrits ;
 * aucun CRM (décision de Sébastien du 09/10/2026). Tant que
 * `SERVICES_REELS_AUTORISES` est faux (lib/catalogue/services.ts), aucun appel
 * réel n'est possible : la route valide, limite et répond 503
 * `catalogue_unavailable`.
 */

// Deux envois Resend successifs (lien au prospect, puis notification interne).
export const maxDuration = 30;

// 5 demandes par adresse IP et par heure, comme /api/roi-lead (règles brochure de
// Sébastien, § 4) ; compteur en mémoire de l'instance.
const LIMITE = 5;
const FENETRE_MS = 60 * 60 * 1000;

// Jamais prérendue : l'état renvoyé par GET est celui de l'instance en service,
// pas celui de la construction.
export const dynamic = 'force-dynamic';

const services = servicesCatalogue();

const gestionnaire = creerGestionnaireCatalogue({
  services,
  limiter: (cle) => rateLimit(cle, LIMITE, FENETRE_MS),
});

export async function POST(req: Request) {
  return gestionnaire(req);
}

/**
 * État de la route, sans envoi ni donnée personnelle : `disponible` est vrai
 * seulement si les services réels sont assemblés (interrupteurs du code, PDF en
 * ligne, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CATALOGUE_NOTIFICATION_EMAIL`).
 * Permet de contrôler une publication sans soumettre de vraie demande.
 */
export function GET() {
  return Response.json({ disponible: services.mode === 'reel' }, { headers: { 'Cache-Control': 'no-store' } });
}
