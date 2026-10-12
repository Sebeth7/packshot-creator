/**
 * Registre des équipements Orbitvu d'occasion proposés sur
 * /fr/studios-photo-automatises/opportunites. Source unique de l'état de la page :
 * avec ou sans machine disponible.
 *
 * VIDE PAR DÉFAUT. Aucune machine réelle n'est établie au 10/10/2026 (éléments non
 * établis de la V4.1, point 1). Une machine n'y entre qu'avec ses données réelles :
 * photos de l'unité commercialisée, historique, état, vérifications réellement
 * faites, conditions de garantie écrites. Le test
 * `lib/occasion/__tests__/occasion.test.ts` refuse une machine « disponible »
 * incomplète.
 *
 * Retrait d'une machine vendue : passer son `statut` à `vendue` (commit, puis
 * déploiement). Une machine « disponible » dont la confirmation date de plus de
 * `FRAICHEUR_MAX_JOURS` jours (lib/occasion/stock.ts) n'est plus affichée.
 *
 * Les trois exemples de la maquette ne sont pas ici : `exemples-fictifs.ts`.
 *
 * Ajouter une machine : `data/occasion/AJOUT-MACHINE.md` (guide de saisie).
 */

export type StatutOccasion = 'disponible' | 'reservee' | 'vendue' | 'retiree';

export type OrigineOccasion = 'showroom' | 'demonstration' | 'salon' | 'location' | 'reprise' | 'renouvellement';

export interface GarantieOccasion {
  /** Qui porte la garantie (la garantie constructeur Orbitvu ne suit pas la machine). */
  garant: string;
  duree: string;
  pointDeDepart: string;
  exclusions: string;
}

export interface PhotoOccasion {
  src: string;
  alt: string;
  /** Légende ou crédit affiché sur la photo. */
  credit: string;
}

export interface MachineOccasion {
  /** Référence affichée et transmise par la demande, ex. « OCC-2026-01 ». */
  ref: string;
  /** Identifiant du référentiel `data/produits/fiches-techniques.ts` (D45). */
  modeleId: string;
  origine: OrigineOccasion;
  /** Précision de l'origine, affichée sur la carte, ex. « Showroom PackshotCreator ». */
  origineDetail: string;
  /** Usage passé, affiché sur la carte, ex. « Exposition et démonstrations ». */
  usage: string;
  statut: StatutOccasion;
  /** Date de la dernière confirmation du statut, ISO `AAAA-MM-JJ`. */
  statutConfirmeLe: string;
  historique: string;
  etat: string;
  /** Ce qui a réellement été vérifié, par qui, sous quelle forme. */
  verifications: string;
  logiciel: { stationVersion?: string; licence: string };
  /** Images test réalisées sur la machine, seulement si elles existent. */
  essais?: { images: string[] };
  garantie: GarantieOccasion;
  /** Photos de l'unité commercialisée, jamais une photo générique. */
  photos: PhotoOccasion[];
  /** Vrai seulement pour les exemples fictifs de contrôle : jamais dans ce registre. */
  fictif?: boolean;
  /**
   * Textes affichés sur la carte dans les pages EN et DE-CH (le reste de la fiche
   * est en français). Exigés pour une machine réelle « disponible »
   * (`elementsManquants`) : une carte anglaise ou allemande n'affiche jamais un
   * texte français.
   */
  traductions?: Partial<Record<'en' | 'de-ch', TraductionCarte>>;
  /**
   * Bulletin d'arrivage qui a annoncé cette machine aux inscrits
   * (`lib/occasion/bulletin/**`). Renseigné PAR COMMIT juste après l'envoi : une
   * machine annoncée ne l'est plus jamais (une correction de fiche, un passage
   * réservée → disponible ne sont pas un nouvel arrivage). Absent : jamais annoncée.
   */
  annonce?: AnnonceOccasion;
}

/** Trace de l'annonce d'une machine, conservée dans le registre (dédoublonnage durable). */
export interface AnnonceOccasion {
  /** Identifiant du bulletin (`arrivage-AAAA-MM-JJ-…`), tel qu'affiché par l'aperçu. */
  bulletin: string;
  /** Date de l'envoi, ISO `AAAA-MM-JJ`. */
  envoyeLe: string;
}

/** Textes d'une carte dans une autre langue que le français. */
export interface TraductionCarte {
  origineDetail: string;
  usage: string;
  /** Mention de la photo, si elle diffère du français. */
  credit?: string;
}

/** Stock réel. Vide tant qu'aucune machine n'est établie. */
export const MACHINES_OCCASION: readonly MachineOccasion[] = [];
