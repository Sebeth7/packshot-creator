import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Les 5 langues supportées
  locales: ['fr', 'en', 'de', 'es', 'nl'],

  // Langue par défaut (français)
  defaultLocale: 'fr',

  // Préfixe de locale: 'always' signifie que toutes les URLs auront un préfixe (/fr/, /en/, etc.)
  localePrefix: 'always'
});

// Navigation helpers légèrement typés
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
