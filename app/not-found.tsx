import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { cookies } from 'next/headers';

const texts = {
  fr: {
    heading: 'Page introuvable',
    description: 'La page que vous recherchez n’existe pas ou a été déplacée.',
    backHome: 'Retour à l’accueil',
    contact: 'Nous contacter',
  },
  en: {
    heading: 'Page not found',
    description: 'The page you’re looking for doesn’t exist or has been moved.',
    backHome: 'Back to homepage',
    contact: 'Contact us',
  },
} as const;

export default async function NotFound() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value === 'en' ? 'en' : 'fr';
  const t = texts[locale];

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
