/**
 * Emplacements visuels K1–K6 de la landing (manifeste du kit du 02/10/2026,
 * 05_SPECIFICATIONS/03_ASSET_MANIFEST.md).
 *
 * `src: null` = visuel non intégré : un emplacement neutre est affiché. Les
 * exports K1–K6 viendront du PDF paysage brut autorisé, après accord écrit
 * d'Orbitvu, sous public/images/catalogue-all-in-one/ (AVIF/WebP). Les aperçus
 * de contrôle du kit, marqués « NE PAS PUBLIER », ne doivent jamais y être copiés.
 */

export type IdVisuel = 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6';

export interface VisuelCatalogue {
  id: IdVisuel;
  /** Pages du catalogue reproduites. */
  pages: string;
  /** Texte alternatif ou légende publiée avec le visuel. */
  texte: string;
  /** Rapport largeur / hauteur : page A4 paysage ≈ 1,414 ; double page ≈ 2,828. */
  ratio: number;
  src: string | null;
}

const PAGE = 297 / 210;

export const VISUELS: Record<IdVisuel, VisuelCatalogue> = {
  K1: {
    id: 'K1',
    pages: 'p. 1',
    texte: 'Couverture du catalogue Orbitvu All-in-One, édition française 2026, sur fond sombre.',
    ratio: PAGE,
    src: null,
  },
  K2: { id: 'K2', pages: 'p. 24', texte: 'Page Orbitvu Furniture Studio du catalogue', ratio: PAGE, src: null },
  K3: { id: 'K3', pages: 'p. 10', texte: 'Page Alphashot Pro G2 du catalogue', ratio: PAGE, src: null },
  K4: {
    id: 'K4',
    pages: 'pp. 24–25',
    texte: 'Orbitvu Furniture Studio — extrait, pages 24–25',
    ratio: PAGE * 2,
    src: null,
  },
  K5: {
    id: 'K5',
    pages: 'pp. 10–11',
    texte: 'Alphashot Pro G2 — aperçu, pages 10–11',
    ratio: PAGE * 2,
    src: null,
  },
  K6: {
    id: 'K6',
    pages: 'pp. 6–7',
    texte: 'Quel système pour quels produits\u00A0? — matrice de sélection, pages 6–7',
    ratio: PAGE * 2,
    src: null,
  },
};
