import { creerGestionnaireOccasion } from '@/lib/occasion/gestionnaire';
import { servicesOccasion } from '@/lib/occasion/services';
import { rateLimit } from '@/lib/rate-limit';

/**
 * Demande de recherche d'un studio Orbitvu d'occasion
 * (/fr/studios-photo-automatises/opportunites). Route distincte de /api/contact :
 * une recherche d'occasion n'est ni une demande de démonstration ni un projet
 * neuf, et elle ne crée aucune affaire (aucun CRM en V1).
 *
 * Tant que `COLLECTE_REELLE_AUTORISEE` est faux (lib/occasion/activation.ts),
 * la route répond 503 `occasion_unavailable` sans lire la demande, même si des
 * secrets Resend existaient. GO_COLLECTE_REELLE = NO, GO_TEST_REEL = NO (11/10/2026).
 */

// Deux envois Resend successifs (notification interne, puis accusé de réception).
export const maxDuration = 30;

// 5 demandes par adresse IP et par heure, comme /api/catalogue ; compteur en mémoire de l'instance.
const LIMITE = 5;
const FENETRE_MS = 60 * 60 * 1000;

// Jamais prérendue : l'état renvoyé par GET est celui de l'instance en service.
export const dynamic = 'force-dynamic';

const services = servicesOccasion();

const gestionnaire = creerGestionnaireOccasion({
  services,
  limiter: (cle) => rateLimit(cle, LIMITE, FENETRE_MS),
});

export async function POST(req: Request) {
  return gestionnaire(req);
}

/** État de la route, sans envoi ni donnée personnelle : `disponible` est vrai seulement si les services réels sont assemblés. */
export function GET() {
  return Response.json({ disponible: services.mode === 'reel' }, { headers: { 'Cache-Control': 'no-store' } });
}
