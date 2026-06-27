import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Scope projet : FR/EN + de-ch (Suisse alémanique, Workstream B).
  // de-ch est une locale RÉELLE mais à génération SÉLECTIVE : seules quelques
  // pages prioritaires sont prérendues en de-ch (cf generateStaticParams par-page
  // + dynamicParams=false dans app/[lang]/layout.tsx). Les /de-ch/<non-traduit>
  // renvoient donc 404 (pas un fallback FR), ce qui protège le séquencement Worker.
  // DE/ES/NL (sans suffixe région) restent redirigées vers https://blendai.studio.
  locales: ['fr', 'en', 'de-ch'],

  // Langue par défaut (français)
  defaultLocale: 'fr',

  // Préfixe de locale: 'always' signifie que toutes les URLs auront un préfixe (/fr/, /en/, etc.)
  localePrefix: 'always',

  // Désactive l'en-tête HTTP `Link` hreflang du middleware : il émettait un
  // x-default vers l'URL sans préfixe (307) et doublonnait — en divergeant —
  // les alternates HTML posés par generateMetadata (seule source conservée).
  alternateLinks: false,

  // Désactive le cookie NEXT_LOCALE. Le middleware next-intl le posait sur chaque
  // requête cookieless (= tous les bots Google/IA), ce qui rendait la réponse
  // `Set-Cookie` → `cache-control: private, no-store` côté Vercel : toutes les pages
  // ISR prérendues étaient servies dynamiquement (x-vercel-cache: MISS) au lieu d'être
  // servies statiquement depuis l'edge. Avec localePrefix:'always', la locale est
  // toujours résolue depuis l'URL ; le cookie est inutile (root `/` géré par le Worker CF).
  localeCookie: false,

  // ── Localized pathnames (Workstream B) ───────────────────────────────────
  // next-intl traduit les SEGMENTS de chemin par locale. Les valeurs string sont
  // identiques pour toutes les locales ; les objets {locale: path} ne diffèrent
  // que pour de-ch (Suisse alémanique). Le param dynamique [slug] N'EST PAS traduit
  // par next-intl : pour /branchen/schmuck c'est le generateStaticParams de-ch qui
  // émet slug='schmuck' (cf app/[lang]/industrie/[slug]). Les machines gardent leur
  // id de slug (seul le segment studio-photo→fotostudio est localisé).
  // ⚠️ Définir `pathnames` retype Link/redirect : tout href doit être un pathname
  // déclaré ci-dessous (les hrefs dynamiques passent en {pathname, params}).
  pathnames: {
    '/': '/',
    '/studios-photo-automatises': '/studios-photo-automatises',
    '/ia-photo-produit': '/ia-photo-produit',
    '/calculateur-roi': '/calculateur-roi',
    '/calculateur': '/calculateur',
    '/contact': '/contact',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/guide': '/guide',
    '/guide/[slug]': '/guide/[slug]',
    '/academy': '/academy',
    '/academy/[slug]': '/academy/[slug]',
    '/academy/calendrier': '/academy/calendrier',
    '/academy/formations-ia': '/academy/formations-ia',
    '/academy/formations-packshot': '/academy/formations-packshot',
    '/academy/simulateur-opco': '/academy/simulateur-opco',
    '/besoins-photographie-produit': '/besoins-photographie-produit',
    '/questions-cles-photographie-produit': '/questions-cles-photographie-produit',
    '/studio-photo/selecteur-machines': '/studio-photo/selecteur-machines',
    '/solutions/[slug]': '/solutions/[slug]',
    '/distributeur-orbitvu-suisse': '/distributeur-orbitvu-suisse',
    '/industrie-defense': '/industrie-defense',
    '/mentions-legales': '/mentions-legales',
    '/cgu': '/cgu',
    '/confidentialite': '/confidentialite',
    '/outil-financement': '/outil-financement',
    '/packshot-amazon': '/packshot-amazon',
    '/packshot-bijoux': '/packshot-bijoux',
    '/packshot-e-commerce': '/packshot-e-commerce',
    '/packshot-industriel': '/packshot-industriel',
    '/packshot-mode': '/packshot-mode',

    // Segments localisés en de-ch (Suisse alémanique)
    '/industrie': { fr: '/industrie', en: '/industrie', 'de-ch': '/branchen' },
    '/industrie/[slug]': {
      fr: '/industrie/[slug]',
      en: '/industrie/[slug]',
      'de-ch': '/branchen/[slug]',
    },
    '/studio-photo/[slug]': {
      fr: '/studio-photo/[slug]',
      en: '/studio-photo/[slug]',
      'de-ch': '/fotostudio/[slug]',
    },
    '/a-propos': { fr: '/a-propos', en: '/a-propos', 'de-ch': '/wer-sind-wir' },
  },
});

// Navigation helpers légèrement typés
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
