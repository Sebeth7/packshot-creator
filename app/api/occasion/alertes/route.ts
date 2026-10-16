import { alertesOuvertes } from '@/lib/occasion/alertes/services';
import { gestionnaires, services } from '@/lib/occasion/alertes/instance';

/**
 * Inscription à la liste d'alerte « prochaines occasions Orbitvu » (double
 * opt-in). Route distincte de `/api/occasion` (demande commerciale) : une alerte
 * n'est ni une recherche, ni une demande de démonstration, ni un abonnement à la
 * newsletter. Fermée (503 sans lecture de la demande) tant que
 * `ALERTES_REELLES_AUTORISEES` est faux (lib/occasion/activation.ts).
 * GO_TEST_REEL_ALERTES = NO (11/10/2026).
 */

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  return gestionnaires.inscription(req);
}

/** État de la route, sans envoi ni donnée personnelle. */
export function GET() {
  return Response.json({ disponible: alertesOuvertes(services) }, { headers: { 'Cache-Control': 'no-store' } });
}
