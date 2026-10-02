/**
 * E-mail transactionnel envoyé au prospect après une demande acceptée.
 *
 * Structure reprise du copydeck V2 du 02/10/2026 (§ 5.6), à relire par
 * Sébastien avant tout envoi. AUCUN ENVOI N'EST BRANCHÉ : cette fonction compose
 * le message, elle n'appelle aucun service. Le PDF n'est pas joint : le message
 * porte un lien. Aucun contenu marketing.
 */

const URL_CONFIDENTIALITE = 'https://www.packshot-creator.com/fr/confidentialite';

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
    "L'équipe PackshotCreator.",
    '',
    `Politique de confidentialité : ${URL_CONFIDENTIALITE}`,
  ].join('\n');

  const html = [
    `<p>Bonjour ${echapper(firstName)},</p>`,
    `<p>Merci pour votre demande. Vous pouvez accéder au catalogue Orbitvu All-in-One depuis ce lien : <a href="${echapper(pdfUrl)}">Ouvrir le catalogue</a>.</p>`,
    `<p>${echapper(orientation)}</p>`,
    `<p>L'équipe PackshotCreator.</p>`,
    `<p style="font-size:12px;color:#6b7280"><a href="${URL_CONFIDENTIALITE}">Politique de confidentialité</a></p>`,
  ].join('\n');

  return { objet, texte, html };
}
