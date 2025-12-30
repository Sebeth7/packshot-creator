import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Les 5 langues supportées
  locales: ['fr', 'en', 'de', 'es', 'nl'],

  // Langue par défaut (français)
  defaultLocale: 'fr',

  // Préfixe de locale: 'as-needed' signifie que /fr n'aura pas de préfixe
  localePrefix: 'as-needed'
});

// Navigation helpers légèrement typés
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
