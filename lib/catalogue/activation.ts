/**
 * Interrupteurs de la landing catalogue All-in-One.
 *
 * Basculer un interrupteur est un changement de code, relu en PR : une variable
 * d'environnement ne suffit ni à publier la page, ni à déclencher un appel réel.
 * Retour arrière : remettre l'interrupteur à `false` (page en 404 et route
 * fermée en production), ou `git revert` du commit de fusion.
 */

/**
 * Page servie en production Vercel, donc sur `www`. VRAI depuis le GO de
 * publication de Laurent du 09/10/2026 (PUBLICATION_AUTHORITY = LAURENT ;
 * validation de la copy par Sébastien non reçue). Faux : 404 en production,
 * page servie en local et sur les Preview seulement.
 */
export const PUBLICATION_AUTORISEE = true;

/**
 * Appels réels à Resend (e-mail du lien, notification interne) depuis
 * `/api/catalogue` ; aucun CRM depuis le 09/10/2026 (décision de Sébastien).
 * VRAI depuis le GO de publication de Laurent du 09/10/2026, après le test réel
 * depuis la Preview du même jour (deux demandes, quatre e-mails reçus). Même
 * vrai, la route reste fermée (503) sans PDF en ligne (`lib/catalogue/pdf.ts`),
 * sans `RESEND_API_KEY`, `RESEND_FROM_EMAIL` ou une adresse valide dans
 * `CATALOGUE_NOTIFICATION_EMAIL` (`lib/catalogue/services.ts`).
 */
export const SERVICES_REELS_AUTORISES = true;

type Env = Readonly<Record<string, string | undefined>>;

/** La page `/fr/catalogue-orbitvu-all-in-one` est-elle générée dans cet environnement ? */
export function pageCatalogueServie(env: Env = process.env): boolean {
  if (env.VERCEL_ENV === 'production') return PUBLICATION_AUTORISEE;
  return true;
}

/**
 * Simulation locale de la route `/api/catalogue` : uniquement sur un poste de
 * travail (`CATALOGUE_SIMULATION=1`), jamais sur Vercel (Preview ou production),
 * même si la variable y était définie par erreur.
 */
export function simulationAutorisee(env: Env = process.env): boolean {
  return env.CATALOGUE_SIMULATION === '1' && !env.VERCEL && !env.VERCEL_ENV;
}
