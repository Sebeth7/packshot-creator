import { useEffect, useState } from 'react';
import type { CollecteAffichee } from './contenu';

/** Délai maximal accepté par `setTimeout` (environ 24,8 jours). */
const DELAI_MAX_MS = 2 ** 31 - 1;

/**
 * État de la collecte tel qu'il doit être affiché MAINTENANT dans le navigateur.
 *
 * La page est prérendue au build : l'état reçu du serveur est celui du moment de
 * la construction. Pendant une fenêtre de test (`FENETRE_TEST_JUSQUA`), la route
 * se ferme seule à l'heure de fin ; sans cette bascule, le bandeau d'un
 * déploiement plus ancien continuerait d'annoncer « Test réel en cours ».
 * Le premier rendu reprend l'état du serveur (aucun écart d'hydratation) ; la
 * bascule a lieu à l'heure de fin, ou dès le montage si elle est passée.
 */
export function useCollecteCourante(collecte: CollecteAffichee): CollecteAffichee {
  const [echue, setEchue] = useState(false);
  const { active, jusqua } = collecte;

  useEffect(() => {
    if (!active || !jusqua) return;
    const reste = Math.max(0, Date.parse(jusqua) - Date.now());
    const minuteur = setTimeout(() => setEchue(true), Math.min(reste, DELAI_MAX_MS));
    return () => clearTimeout(minuteur);
  }, [active, jusqua]);

  return echue ? { active: false, jusqua: null } : collecte;
}
