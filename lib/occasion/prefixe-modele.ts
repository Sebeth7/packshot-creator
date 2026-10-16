/**
 * Préfixe automatique du message de recherche quand le visiteur clique sur
 * « Demander des informations » d'une carte de modèle (landing occasion).
 *
 * Le dernier modèle choisi fait foi : son préfixe remplace celui du clic précédent.
 * Seul le préfixe que la page a elle-même inséré (`precedent`) est remplacé, et
 * seulement s'il est encore en tête du texte, intact ; tout texte du visiteur est
 * conservé tel quel. Un texte vide reçoit le préfixe ; un texte que le visiteur a
 * rédigé ou dont il a modifié le préfixe n'est jamais touché.
 */
export interface PrefixeSynchronise {
  /** Nouveau contenu du champ. */
  texte: string;
  /** Préfixe automatique encore présent en tête du champ, `null` s'il n'y en a plus. */
  prefixe: string | null;
}

export function synchroniserPrefixeModele(actuel: string, precedent: string | null, nouveau: string): PrefixeSynchronise {
  if (actuel.trim() === '') return { texte: nouveau, prefixe: nouveau };
  if (precedent !== null && actuel.startsWith(precedent)) {
    return { texte: nouveau + actuel.slice(precedent.length), prefixe: nouveau };
  }
  return { texte: actuel, prefixe: null };
}
