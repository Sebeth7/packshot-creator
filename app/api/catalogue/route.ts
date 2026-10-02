import { creerGestionnaireCatalogue } from '@/lib/catalogue/gestionnaire';
import { servicesCatalogue } from '@/lib/catalogue/services';
import { rateLimit } from '@/lib/rate-limit';

/**
 * Demande du catalogue Orbitvu All-in-One (landing /fr/catalogue-orbitvu-all-in-one).
 * Route distincte de /api/contact : une demande de catalogue n'est ni une demande
 * de démonstration ni une demande de devis.
 *
 * Au 02/10/2026, aucun service externe n'est branché (lib/catalogue/services.ts) :
 * la route valide, limite et répond 503 `catalogue_unavailable`. Aucun appel
 * Pipedrive ni Resend, aucun enregistrement.
 */

// 5 demandes par adresse IP et par fenêtre de 10 minutes (compteur en mémoire de l'instance).
const LIMITE = 5;
const FENETRE_MS = 10 * 60 * 1000;

const gestionnaire = creerGestionnaireCatalogue({
  services: servicesCatalogue(),
  limiter: (cle) => rateLimit(cle, LIMITE, FENETRE_MS),
});

export async function POST(req: Request) {
  return gestionnaire(req);
}
