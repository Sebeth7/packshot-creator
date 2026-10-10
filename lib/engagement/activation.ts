/**
 * Interrupteurs de la pop-in d'engagement. Ils séparent la fusion de la
 * publication (GO distincts, mission du 09/10/2026).
 */

/**
 * Publication en production, donc sur www.packshot-creator.com. VRAI depuis le
 * GO de fusion et de publication de Laurent du 10/10/2026 (D55 ; copy publiée
 * sur son autorité, validation de Sébastien non reçue). Préalable rempli : la
 * landing catalogue (#82) est publiée depuis le 10/10/2026. Faux : pop-in
 * absente de la production, présente sur les Preview et en local.
 */
export const POPIN_PUBLICATION_AUTORISEE = true;

/**
 * État de session dans `sessionStorage` (instant d'arrivée ; apparition faite,
 * fermée ou convertie). Vrai sur décision de Laurent du 09/10/2026 : une
 * seule apparition par session, rechargement compris, et 60 s cumulées sur le
 * site. Usage : état fonctionnel de session seulement. Statut retenu par
 * Laurent le 10/10/2026 (D55) : stockage fonctionnel, sans consentement,
 * mentionné dans la politique de confidentialité (article 6). Faux : repli
 * sur la mémoire de la page (navigations internes seulement).
 */
export const STOCKAGE_SESSION_AUTORISE = true;

/** La pop-in est-elle montée dans cet environnement ? Évalué au rendu serveur. */
export function popinServie(env: Record<string, string | undefined> = process.env): boolean {
  if (env.VERCEL_ENV === 'production') return POPIN_PUBLICATION_AUTORISEE;
  return true;
}
