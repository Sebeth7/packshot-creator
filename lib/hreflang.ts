/**
 * Helper hreflang centralisé.
 *
 * Toutes les pages déclarent leurs alternates de langue via `buildLanguages`
 * dans leur `generateMetadata`. L'objet retourné alimente `alternates.languages`
 * (Next.js Metadata API), qui rend les `<link rel="alternate" hreflang="…">`.
 *
 * Règles de ciblage :
 * - `fr`    → URL /fr (ciblage France + francophonie générique)
 * - `fr-CH` → MÊME URL /fr : on déclare que la page FR sert aussi la Suisse
 *             romande, sans dupliquer ni diluer le ciblage France (Workstream A).
 * - `en`    → URL /en, uniquement si la page a un équivalent anglais indexable.
 * - `de-CH` → URL /de-ch, RÉSERVÉ au Workstream B (locale alémanique routée),
 *             différé tant que l'input de traduction allemande suisse n'est pas
 *             prêt. Param présent pour éviter de re-toucher les ~46 pages le jour
 *             où de-ch sera activé ; ne RIEN passer ici aujourd'hui.
 * - `x-default` → /fr (la version FR est la cible par défaut).
 *
 * Réciprocité : chaque page doit lister les mêmes annotations que ses
 * alternates pointent vers elle. Comme `fr-CH` pointe toujours sur l'URL `fr`
 * de la même page, la réciprocité fr↔fr-CH est automatique.
 */
export interface HreflangOpts {
  /**
   * URL /en équivalente. Omettre pour une page FR-only (legal, pages Suisse) :
   * aucun alternate `en` ne sera émis.
   */
  en?: string;
  /**
   * URL /de-ch équivalente. NE PAS renseigner aujourd'hui (Workstream B différé).
   */
  deCh?: string;
}

export function buildLanguages(
  frPath: string,
  opts: HreflangOpts = {},
): Record<string, string> {
  const languages: Record<string, string> = {
    fr: frPath,
    'fr-CH': frPath,
  };
  if (opts.en) languages.en = opts.en;
  if (opts.deCh) languages['de-CH'] = opts.deCh;
  languages['x-default'] = frPath;
  return languages;
}
