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
 * Mémoire de session dans `sessionStorage` (heure d'arrivée, apparition déjà
 * faite). Faux : la qualification « vie privée » de ce stockage n'est pas
 * établie par la gouvernance au 09/10/2026 (point P4 ouvert). La pop-in garde
 * alors cet état en mémoire seulement : il survit aux navigations internes,
 * pas à un rechargement complet ni à un nouvel onglet.
 */
export const STOCKAGE_SESSION_AUTORISE = false;

/** La pop-in est-elle montée dans cet environnement ? Évalué au rendu serveur. */
export function popinServie(env: Record<string, string | undefined> = process.env): boolean {
  if (env.VERCEL_ENV === 'production') return POPIN_PUBLICATION_AUTORISEE;
  return true;
}
