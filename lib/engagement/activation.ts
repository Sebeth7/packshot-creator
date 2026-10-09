/**
 * Interrupteurs de la pop-in d'engagement. Ils séparent la fusion de la
 * publication (GO distincts, mission du 09/10/2026).
 */

/**
 * Publication en production. Faux tant que Laurent n'a pas donné le GO de
 * publication : la pop-in n'est alors montée ni sur la production Vercel, ni
 * donc sur www.packshot-creator.com. Elle l'est sur les Preview et en local.
 * Préalable : la landing catalogue (#82) publiée, sans quoi le lien
 * « Recevoir le catalogue » mènerait à une 404.
 */
export const POPIN_PUBLICATION_AUTORISEE = false;

/**
 * État de session dans `sessionStorage` (instant d'arrivée ; apparition faite,
 * fermée ou convertie). Vrai sur décision de Laurent du 09/10/2026 : une
 * seule apparition par session, rechargement compris, et 60 s cumulées sur le
 * site. Usage : état fonctionnel de session seulement. Statut juridique
 * « vie privée » NON ÉTABLI, à intégrer à P4 avant publication. Faux : repli
 * sur la mémoire de la page (navigations internes seulement).
 */
export const STOCKAGE_SESSION_AUTORISE = true;

/** La pop-in est-elle montée dans cet environnement ? Évalué au rendu serveur. */
export function popinServie(env: Record<string, string | undefined> = process.env): boolean {
  if (env.VERCEL_ENV === 'production') return POPIN_PUBLICATION_AUTORISEE;
  return true;
}
