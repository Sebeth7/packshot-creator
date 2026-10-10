/**
 * PDF du catalogue Orbitvu All-in-One remis après une demande acceptée.
 *
 * Source désignée par Laurent le 06/10/2026 (fait métier) : fichier
 * `All_in_One_FR_online_pages_web_version.pdf`, utilisé tel quel. Erreurs
 * éditoriales connues et acceptées ; texte, contacts, produits et QR non
 * modifiés. Contrôle technique du 06/10 : 28 pages A4 paysage, MediaBox et
 * CropBox identiques, polices incorporées, aucun lien cliquable (JOURNAL).
 *
 * Le fichier n'est jamais versionné dans le dépôt : il est servi par le bucket
 * R2 `packshot-videos` sous `videos.packshot-creator.com`.
 *
 * EN LIGNE depuis le 06/10/2026 : envoyé sur R2 par Laurent, contrôlé depuis son
 * poste (HTTP 200, `application/pdf`, 15 380 434 octets, SHA-256 identique,
 * en-tête d'indexation `noindex` présent), puis relu depuis la session de
 * Claude (mêmes résultats ; l'en-tête `noindex` y apparaît deux fois, origine non
 * établie). Relu de nouveau le 09/10 avant publication : identique. L'en-tête
 * n'est pas nommé ici en toutes lettres : la garde D36
 * (`lib/seo/__tests__/origine-noindex-d36.test.ts`) réserve ce nom à `next.config.ts`.
 * `enLigne` ne dit que la disponibilité du fichier : la route reste fermée tant
 * que `SERVICES_REELS_AUTORISES` est faux (`services.ts`).
 */
export interface PdfCatalogue {
  url: string;
  sha256: string;
  octets: number;
  pages: number;
  enLigne: boolean;
}

export const PDF_CATALOGUE: PdfCatalogue = {
  url: 'https://videos.packshot-creator.com/catalogues/orbitvu-all-in-one-2026-fr.pdf',
  sha256: '0d72b2079706546e241f029f38836985e152ef2af956104322fd343bfc6730e5',
  octets: 15_380_434,
  pages: 28,
  enLigne: true,
};
