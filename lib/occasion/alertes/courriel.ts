import { SOURCE_ALERTES } from './schema';

/**
 * E-mail de confirmation de la liste d'alerte (double opt-in). C'est le seul
 * envoi de ce parcours : aucune offre, aucune campagne, aucun e-mail de
 * bienvenue (GO_CAMPAGNE_EMAIL = NO).
 *
 * Le jeton est placé dans le FRAGMENT de l'URL (`#confirmer-alerte=…`) : il n'est
 * pas transmis au serveur qui sert la page, donc absent de ses journaux. La page
 * affiche un bouton ; seul ce clic confirme (un robot de messagerie qui ouvre le
 * lien ne confirme rien).
 */

export const ANCRE_CONFIRMATION = 'confirmer-alerte';
export const ANCRE_DESINSCRIPTION = 'desinscrire-alerte';

export function lienConfirmation(base: string, jeton: string): string {
  return `${base.replace(/\/+$/, '')}${SOURCE_ALERTES}#${ANCRE_CONFIRMATION}=${jeton}`;
}

/** Lien de désinscription, à placer dans les futurs envois de la liste (non utilisé en V1). */
export function lienDesinscription(base: string, jeton: string): string {
  return `${base.replace(/\/+$/, '')}${SOURCE_ALERTES}#${ANCRE_DESINSCRIPTION}=${jeton}`;
}

function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function dateFr(ms: number): string {
  return new Date(ms).toLocaleString('fr-FR', { timeZone: 'Europe/Paris', dateStyle: 'long', timeStyle: 'short' });
}

export interface CourrielConfirmation {
  objet: string;
  texte: string;
  html: string;
}

export function composerConfirmationAlerte(p: { lien: string; famille: string; expireLe: number }): CourrielConfirmation {
  const famille = p.famille || 'tous les équipements Orbitvu';
  const objet = "Confirmez votre inscription aux alertes Orbitvu d'occasion";
  const lignes = [
    'Bonjour,',
    '',
    `Vous avez demandé à être informé des prochaines disponibilités d'équipements Orbitvu d'occasion (${famille}).`,
    'Pour confirmer votre inscription, ouvrez ce lien puis cliquez sur « Confirmer mon inscription » :',
    p.lien,
    '',
    `Ce lien expire le ${dateFr(p.expireLe)}. Sans confirmation, aucune inscription n'est enregistrée.`,
    "Cette liste est indépendante de la newsletter : elle ne vous abonne à aucune autre communication.",
    "Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.",
    '',
    'PackshotCreator',
  ];
  const html = [
    '<p>Bonjour,</p>',
    `<p>Vous avez demandé à être informé des prochaines disponibilités d'équipements Orbitvu d'occasion (${echapper(famille)}).</p>`,
    `<p><a href="${echapper(p.lien)}">Confirmer mon inscription</a></p>`,
    `<p>Ce lien expire le ${echapper(dateFr(p.expireLe))}. Sans confirmation, aucune inscription n'est enregistrée.</p>`,
    "<p>Cette liste est indépendante de la newsletter : elle ne vous abonne à aucune autre communication.</p>",
    "<p>Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.</p>",
    '<p>PackshotCreator</p>',
  ].join('\n');
  return { objet, texte: lignes.join('\n'), html };
}
