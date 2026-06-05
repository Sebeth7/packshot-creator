import Link from 'next/link';
import { Home, Search } from 'lucide-react';

// IMPORTANT — ne PAS lire cookies()/headers() ici.
// Ce not-found racine fait partie de l'arbre de rendu partagé par TOUTES les routes :
// y appeler une API dynamique (cookies/headers) opte l'intégralité du site en rendu
// dynamique (x-vercel-cache: MISS, cache-control: no-store) et désactive l'ISR/edge.
// Ce composant ne couvre QUE les 404 hors préfixe de langue (rares : localePrefix
// 'always' + Worker CF redirigent vers /fr|/en). Les 404 DANS une langue sont gérées,
// localisées, par app/[lang]/not-found.tsx (via getLocale()). On rend donc ce fallback
// en langue par défaut (fr), statiquement.
const t = {
  heading: 'Page introuvable',
  description: 'La page que vous recherchez n’existe pas ou a été déplacée.',
  backHome: 'Retour à l’accueil',
  contact: 'Nous contacter',
} as const;
const locale = 'fr';

export default function NotFound() {

  return (
    <html lang={locale}>
      <body className="font-body text-text-dark antialiased">
        <div className="min-h-screen bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-8xl font-heading font-bold text-white/20">404</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t.heading}
            </h1>
            <p className="text-lg text-white/70 mb-10 max-w-lg mx-auto">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-very-peri-500 hover:bg-very-peri-600 text-white font-medium rounded-xl transition-colors"
              >
                <Home className="w-4 h-4" />
                {t.backHome}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/40 hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
              >
                <Search className="w-4 h-4" />
                {t.contact}
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
