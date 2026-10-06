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
 * R2 `packshot-videos` sous `videos.packshot-creator.com`. `enLigne` passe à
 * `true` dans un commit relu, une fois l'objet envoyé (GO R2 de Laurent) et son
 * empreinte contrôlée à cette URL. Tant qu'il est faux, `/api/catalogue` reste
 * fermée : aucun lien n'est remis vers un fichier absent.
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
  enLigne: false,
};
