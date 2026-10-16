/**
 * E-mail transactionnel envoyé au prospect après une demande acceptée.
 *
 * Structure reprise du copydeck V2 du 02/10/2026 (§ 5.6), à relire par
 * Sébastien avant tout envoi. Cette fonction compose le message ; l'envoi est
 * fait par `resend.ts`. Le PDF n'est jamais joint : le message porte un lien.
 * Aucun contenu marketing, aucune relance.
 *
 * Chemins de retour vers le site (règles brochure de Sébastien du 02/10, § 3
 * règle 7 et § 5) : démonstration et calculateur ROI, avec les libellés déjà
 * publiés sur le site (`blogArticle.ctaDemo`, `blogArticle.ctaRoi`, mêmes
 * destinations que `ArticleCTA`). Adresses fixes, construites côté serveur :
 * rien n'est repris d'une URL envoyée par le navigateur. Aucun lien vers F5
 * avant le 23/11 (D37). Les téléphones France et Suisse restent visibles
 * (décision de Laurent du 06/10).
 */

const SITE = 'https://www.packshot-creator.com';
const URL_CONFIDENTIALITE = `${SITE}/fr/confidentialite`;

/** Chemins de retour : libellé publié → page du site. */
export const LIENS_RETOUR = [
  { libelle: 'Demander une démo', url: `${SITE}/fr/contact` },
  { libelle: 'Calculer mon ROI', url: `${SITE}/fr/calculateur-roi` },
] as const;

export interface CourrielCompose {
  objet: string;
  texte: string;
  html: string;
}

function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function composerCourrielCatalogue({ firstName, pdfUrl }: { firstName: string; pdfUrl: string }): CourrielCompose {
  const objet = 'Votre catalogue Orbitvu All-in-One';
  const orientation =
    'Si vous souhaitez être orienté dans la gamme, PackshotCreator est à votre disposition en France et en Suisse : +33 (0)1 47 42 66 66 / +41 44 580 43 84.';

  const texte = [
    `Bonjour ${firstName},`,
    '',
    `Merci pour votre demande. Vous pouvez accéder au catalogue Orbitvu All-in-One depuis ce lien : ${pdfUrl}`,
    '',
    orientation,
    '',
    ...LIENS_RETOUR.map((l) => `${l.libelle} : ${l.url}`),
    '',
    "L'équipe PackshotCreator.",
    '',
    `Politique de confidentialité : ${URL_CONFIDENTIALITE}`,
  ].join('\n');

  const html = [
    `<p>Bonjour ${echapper(firstName)},</p>`,
    `<p>Merci pour votre demande. Vous pouvez accéder au catalogue Orbitvu All-in-One depuis ce lien : <a href="${echapper(pdfUrl)}">Ouvrir le catalogue</a>.</p>`,
    `<p>${echapper(orientation)}</p>`,
    `<p>${LIENS_RETOUR.map((l) => `<a href="${l.url}">${echapper(l.libelle)}</a>`).join(' · ')}</p>`,
    `<p>L'équipe PackshotCreator.</p>`,
    `<p style="font-size:12px;color:#6b7280"><a href="${URL_CONFIDENTIALITE}">Politique de confidentialité</a></p>`,
  ].join('\n');

  return { objet, texte, html };
}
