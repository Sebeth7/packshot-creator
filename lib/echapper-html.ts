/**
 * Échappement HTML des valeurs insérées dans un e-mail.
 *
 * Depuis le 15/10/2026, ses appelants n'écrivent plus de note Pipedrive :
 * `/api/contact` et `/api/roi-pdf` n'envoient que des e-mails. Les notes des
 * routes encore reliées au CRM (`/api/roi-lead`, `/api/submit-survey`) ont leur
 * propre échappement.
 *
 * Toute valeur venue d'un visiteur, d'un service tiers (INSEE, site web,
 * modèle d'IA) ou d'un paramètre d'URL passe par cette fonction avant d'être
 * interpolée dans du HTML. Aucun HTML fourni par un client n'est jamais inséré
 * tel quel.
 */
export function echapperHtml(valeur: string | number | null | undefined): string {
  if (valeur === null || valeur === undefined) return '';
  return String(valeur)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Texte sur plusieurs lignes : échappé, puis retours à la ligne en `<br/>`. */
export function echapperHtmlMultiligne(valeur: string): string {
  return echapperHtml(valeur).replace(/\r?\n/g, '<br/>');
}
