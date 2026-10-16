import type { MachineOccasion } from '@/data/occasion/machines';
import { confirmationRecente, elementsManquants, nomModele } from '../stock';

/**
 * Machines qu'un bulletin d'arrivage peut annoncer (décision du 12/10/2026 :
 * « Nouvelles occasions Orbitvu disponibles », une ou plusieurs machines, sur
 * nouvel arrivage vérifié seulement).
 *
 * Une machine est annonçable si, et seulement si :
 * - elle vient du registre réel et n'est pas un exemple fictif ;
 * - son statut est « disponible », confirmé depuis `FRAICHEUR_MAX_JOURS` jours
 *   au plus (valeur provisoire, `lib/occasion/stock.ts`) ;
 * - son modèle est connu du référentiel produit et sa fiche est complète
 *   (`elementsManquants` vide : origine, historique, état, vérifications,
 *   garantie écrite, photos, textes EN et DE-CH) ;
 * - elle n'a jamais été annoncée (`annonce` absent). Une correction de fiche
 *   n'est donc jamais un nouvel arrivage.
 * Rien n'est déduit, rien n'est inventé : un registre vide ne produit aucun
 * bulletin.
 */

export type RaisonEcart =
  | 'fictive'
  | 'non_disponible'
  | 'confirmation_ancienne'
  | 'modele_inconnu'
  | 'fiche_incomplete'
  | 'deja_annoncee'
  | 'non_retenue';

export interface SelectionArrivage {
  machines: MachineOccasion[];
  /** Machines du registre écartées, avec la raison : affichées à la validation. */
  ecartees: { ref: string; raison: RaisonEcart }[];
}

/**
 * @param refs Références retenues par la personne qui prépare le bulletin ;
 *   absent : toutes les machines annonçables.
 */
export function machinesAnnoncables(
  source: readonly MachineOccasion[],
  maintenant: Date,
  refs?: readonly string[],
): SelectionArrivage {
  const machines: MachineOccasion[] = [];
  const ecartees: SelectionArrivage['ecartees'] = [];
  for (const m of source) {
    const raison: RaisonEcart | null = m.fictif
      ? 'fictive'
      : m.statut !== 'disponible'
        ? 'non_disponible'
        : !confirmationRecente(m.statutConfirmeLe, maintenant)
          ? 'confirmation_ancienne'
          : nomModele(m) === undefined
            ? 'modele_inconnu'
            : elementsManquants(m).length > 0
              ? 'fiche_incomplete'
              : m.annonce
                ? 'deja_annoncee'
                : refs && !refs.includes(m.ref)
                  ? 'non_retenue'
                  : null;
    if (raison) ecartees.push({ ref: m.ref, raison });
    else machines.push(m);
  }
  return { machines, ecartees };
}
