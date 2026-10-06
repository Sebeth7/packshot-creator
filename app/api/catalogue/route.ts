import { creerGestionnaireCatalogue } from '@/lib/catalogue/gestionnaire';
import { servicesCatalogue } from '@/lib/catalogue/services';
import { rateLimit } from '@/lib/rate-limit';

/**
 * Demande du catalogue Orbitvu All-in-One (landing /fr/catalogue-orbitvu-all-in-one).
 * Route distincte de /api/contact : une demande de catalogue n'est ni une demande
 * de démonstration ni une demande de devis, et elle ne crée aucune affaire.
 *
 * Au 06/10/2026, les adaptateurs Pipedrive et Resend sont écrits mais aucun
 * appel réel n'est possible (lib/catalogue/services.ts : interrupteurs du code,
 * PDF non encore en ligne). La route valide, limite et répond 503
 * `catalogue_unavailable`.
 */

// Recherche et écritures Pipedrive successives, puis Resend.
export const maxDuration = 30;

// 5 demandes par adresse IP et par heure, comme /api/roi-lead (règles brochure de
// Sébastien, § 4) ; compteur en mémoire de l'instance.
const LIMITE = 5;
const FENETRE_MS = 60 * 60 * 1000;

const gestionnaire = creerGestionnaireCatalogue({
  services: servicesCatalogue(),
  limiter: (cle) => rateLimit(cle, LIMITE, FENETRE_MS),
});

export async function POST(req: Request) {
  return gestionnaire(req);
}
