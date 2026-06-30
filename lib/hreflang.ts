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
 *             romande (francophone), sans dupliquer ni diluer le ciblage
 *             France (Workstream A, décision assumée — pas d'URL dédiée
 *             pour la Suisse romande, contrairement à de-CH ci-dessous).
 * - `en`    → URL /en, uniquement si la page a un équivalent anglais indexable.
 * - `de-CH` → URL /de-ch, locale dédiée à la Suisse ALÉMANIQUE (germanophone),
 *             Workstream B. Activée depuis le 29/06 (Paliers 1+2 déployés,
 *             cf. commits 6a1f2f3/818cac8) : la plupart des pages passent
 *             déjà `deCh` à `buildLanguages`. Sans rapport avec fr-CH
 *             ci-dessus — de-CH ne couvre PAS la Suisse romande.
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
   * URL /de-ch équivalente (Suisse alémanique, Workstream B — actif depuis le 29/06).
   * Omettre uniquement si la page n'a pas encore d'équivalent de-ch indexable.
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
