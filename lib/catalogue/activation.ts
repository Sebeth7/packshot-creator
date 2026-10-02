/**
 * Interrupteurs de la landing catalogue All-in-One.
 *
 * Tant que Laurent n'a pas donné le GO de publication (PDF paysage autorisé,
 * droits Orbitvu, contrôle des QR, stockage des demandes, règle CRM), la page
 * répond 404 sur l'environnement de production Vercel : une fusion accidentelle
 * ne la rend pas publique. Elle reste servie en local et sur les Preview Vercel,
 * protégées par le SSO de l'équipe.
 *
 * Basculer `PUBLICATION_AUTORISEE` est un changement de code, relu en PR : une
 * variable d'environnement ne suffit pas à publier la page.
 */
export const PUBLICATION_AUTORISEE = false;

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
