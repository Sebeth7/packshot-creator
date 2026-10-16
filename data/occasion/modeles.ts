import type { OrigineOccasion } from './machines';
import type { Famille } from '@/lib/occasion/formulaires';
import type { LangueOccasion } from '@/lib/occasion/langues';

/**
 * Trois modèles Orbitvu présentés sur la landing d'occasion quand aucune machine
 * réelle n'est affichée (décision de Laurent du 16/10/2026). C'est une
 * PRÉSENTATION DE MODÈLES, pas un stock :
 * - aucune unité n'est annoncée disponible, aucun prix, aucune référence d'unité,
 *   aucune garantie, aucun état ni inspection ;
 * - les visuels sont ceux des modèles déjà utilisés sur le site (jamais la photo
 *   d'une unité commercialisée) ;
 * - les caractéristiques viennent du référentiel `data/produits/fiches-techniques.ts`
 *   (D45, fiches Orbitvu) : un test les confronte ;
 * - le registre réel `machines.ts` reste séparé, avec ses contrôles de fiabilité ;
 *   dès qu'il affiche une machine réelle, cette présentation disparaît.
 * Contextes validés par Laurent : Alphadesk, showroom PackshotCreator (exposition et
 * démonstrations) ; Alphashot Micro v2, démonstrations clients (bijoux et horlogerie) ;
 * Alphastudio XXL v2, retour de salon professionnel. Aucun balisage `Offer`.
 */

export interface ContexteModele {
  origineDetail: string;
  usage: string;
  /** Objet maximal, tel que le donne la fiche Orbitvu du modèle. */
  objet: string;
  /** Charge maximale de l'objet. */
  charge: string;
}

export interface ModelePresente {
  id: 'alphadesk' | 'alphashot-micro-v2' | 'alphastudio-xxl-v2';
  /** Nom affiché (celui de la présentation validée par Laurent). */
  nom: string;
  /** Identifiant du référentiel `data/produits/fiches-techniques.ts` (D45). */
  modeleId: string;
  origine: OrigineOccasion;
  /** Famille présélectionnée dans le formulaire de recherche. */
  famille: Famille;
  /** Visuel du MODÈLE, jamais celui d'une unité. */
  visuel: { src: string; alt: Record<LangueOccasion, string> };
  contextes: Record<LangueOccasion, ContexteModele>;
}

export const MODELES_PRESENTES: readonly ModelePresente[] = [
  {
    id: 'alphadesk',
    nom: 'Alphadesk',
    modeleId: 'alphadesk',
    origine: 'showroom',
    famille: 'Alphatable / Alphadesk',
    visuel: {
      src: '/images/machines/alphatable-alphadesk.avif',
      alt: { fr: 'Orbitvu Alphadesk, visuel du modèle', en: 'Orbitvu Alphadesk, model visual', 'de-ch': 'Orbitvu Alphadesk, Abbildung des Modells' },
    },
    contextes: {
      fr: { origineDetail: 'Showroom PackshotCreator', usage: 'Exposition et démonstrations', objet: '85 × 70 × 5 cm', charge: '10 kg' },
      en: { origineDetail: 'PackshotCreator showroom', usage: 'Display and demonstrations', objet: '85 × 70 × 5 cm', charge: '10 kg' },
      'de-ch': { origineDetail: 'Showroom PackshotCreator', usage: 'Ausstellung und Vorführungen', objet: '85 × 70 × 5 cm', charge: '10 kg' },
    },
  },
  {
    id: 'alphashot-micro-v2',
    nom: 'Alphashot Micro v2',
    modeleId: 'alphashot-micro-v2',
    origine: 'demonstration',
    famille: 'Alphashot (Micro, 360, Pro, XL)',
    visuel: {
      src: '/images/machines/alphashot-micro-v2.avif',
      alt: { fr: 'Orbitvu Alphashot Micro v2, visuel du modèle', en: 'Orbitvu Alphashot Micro v2, model visual', 'de-ch': 'Orbitvu Alphashot Micro v2, Abbildung des Modells' },
    },
    contextes: {
      fr: { origineDetail: 'Démonstrations clients', usage: 'Bijoux et horlogerie', objet: '18 cm de long', charge: '1 kg' },
      en: { origineDetail: 'Customer demonstrations', usage: 'Jewellery and watches', objet: '18 cm long', charge: '1 kg' },
      'de-ch': { origineDetail: 'Kundenvorführungen', usage: 'Schmuck und Uhren', objet: '18 cm lang', charge: '1 kg' },
    },
  },
  {
    id: 'alphastudio-xxl-v2',
    nom: 'Alphastudio XXL v2',
    modeleId: 'alphastudio-xxl-v2',
    origine: 'salon',
    famille: 'Alphastudio (Compact, XXL)',
    visuel: {
      src: '/images/machines/alphastudio-xxl.avif',
      alt: { fr: 'Orbitvu Alphastudio XXL v2, visuel du modèle', en: 'Orbitvu Alphastudio XXL v2, model visual', 'de-ch': 'Orbitvu Alphastudio XXL v2, Abbildung des Modells' },
    },
    contextes: {
      fr: { origineDetail: 'Salon professionnel', usage: 'Présentation sur stand', objet: '190 × 90 × 100 cm', charge: '100 kg' },
      en: { origineDetail: 'Trade show', usage: 'Stand presentation', objet: '190 × 90 × 100 cm', charge: '100 kg' },
      'de-ch': { origineDetail: 'Fachmesse', usage: 'Präsentation am Messestand', objet: '190 × 90 × 100 cm', charge: '100 kg' },
    },
  },
];
