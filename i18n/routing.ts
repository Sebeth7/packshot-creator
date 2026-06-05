import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Scope projet : FR/EN uniquement
  // DE/ES/NL redirectionnées vers https://blendai.studio
  locales: ['fr', 'en'],

  // Langue par défaut (français)
  defaultLocale: 'fr',

  // Préfixe de locale: 'always' signifie que toutes les URLs auront un préfixe (/fr/, /en/, etc.)
  localePrefix: 'always',

  // Désactive le cookie NEXT_LOCALE. Le middleware next-intl le posait sur chaque
  // requête cookieless (= tous les bots Google/IA), ce qui rendait la réponse
  // `Set-Cookie` → `cache-control: private, no-store` côté Vercel : toutes les pages
  // ISR prérendues étaient servies dynamiquement (x-vercel-cache: MISS) au lieu d'être
  // servies statiquement depuis l'edge. Avec localePrefix:'always', la locale est
  // toujours résolue depuis l'URL ; le cookie est inutile (root `/` géré par le Worker CF).
  localeCookie: false
});

// Navigation helpers légèrement typés
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
