/**
 * Garde d'environnement des previews internes du dossier AI Act (B, C, D).
 *
 * Ce n'est pas une authentification : la protection SSO des Preview Vercel
 * reste requise. La garde ferme les pages hors Preview, pour qu'une fusion
 * accidentelle ne les rende pas accessibles en production.
 *
 * Autorisé : locale `fr` ET (Preview Vercel, ou développement local hors Vercel).
 * Refusé : production Vercel, environnement `development` de Vercel, toute
 * build hors Vercel (CI comprise), toute autre locale. En cas de doute, refus.
 */
export interface EnvRevue {
  NODE_ENV?: string;
  VERCEL?: string;
  VERCEL_ENV?: string;
}

export function revueInterneAutorisee(lang: string, env: EnvRevue): boolean {
  if (lang !== 'fr') return false;
  if (env.VERCEL === '1') return env.VERCEL_ENV === 'preview';
  return env.NODE_ENV === 'development';
}
