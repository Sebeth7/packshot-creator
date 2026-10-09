/**
 * Interrupteurs de la landing catalogue All-in-One.
 *
 * Tant que Laurent n'a pas donné le GO de publication, la page répond 404 sur
 * l'environnement de production Vercel : une fusion accidentelle ne la rend pas
 * publique. Elle reste servie en local et sur les Preview Vercel, protégées par
 * le SSO de l'équipe.
 *
 * Basculer un interrupteur est un changement de code, relu en PR : une variable
 * d'environnement ne suffit ni à publier la page, ni à déclencher un appel réel.
 */
export const PUBLICATION_AUTORISEE = false;

/**
 * Appels réels à Resend (e-mail du lien, notification interne) depuis
 * `/api/catalogue` ; aucun CRM depuis le 09/10/2026 (décision de Sébastien).
 * Faux hors test réel autorisé (missions de Laurent des 06/10 : aucun e-mail ni
 * prospect réel sans GO). Même vrai, la route reste fermée sans PDF en ligne
 * (`lib/catalogue/pdf.ts`), sans secrets ni destinataire de notification, et en
 * production sans `PUBLICATION_AUTORISEE` (`lib/catalogue/services.ts`).
 */
export const SERVICES_REELS_AUTORISES = false;

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
