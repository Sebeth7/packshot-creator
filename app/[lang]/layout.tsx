import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Roboto } from 'next/font/google';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import CookieBanner from '@/components/cookies/CookieBanner';
import { SmoothScroll } from '@/components/animations';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['700'],
  display: 'swap'
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500'],
  display: 'swap'
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    openGraph: {
      title: isFr ? 'PackshotCreator - Studios Photo Automatises' : 'PackshotCreator - Automated Photo Studios',
      description: isFr
        ? 'Solutions de photographie produit automatisee. Studios photo Orbitvu, IA retouche, formations certifiantes.'
        : 'Automated product photography solutions. Orbitvu photo studios, AI retouching, certified training.',
      url: `https://www.packshot-creator.com/${lang}`,
      siteName: 'PackshotCreator',
      locale: isFr ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [{
        url: `/api/og?title=${encodeURIComponent(isFr ? 'PackshotCreator - Studios Photo Automatisés' : 'PackshotCreator - Automated Photo Studios')}&type=page&lang=${lang}`,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isFr ? 'PackshotCreator - Studios Photo Automatises' : 'PackshotCreator - Automated Photo Studios',
      description: isFr
        ? 'Solutions de photographie produit automatisee.'
        : 'Automated product photography solutions.',
      images: [`/api/og?title=${encodeURIComponent(isFr ? 'PackshotCreator - Studios Photo Automatisés' : 'PackshotCreator - Automated Photo Studios')}&type=page&lang=${lang}`],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(lang as 'fr' | 'en')) {
    notFound();
  }

  setRequestLocale(lang);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={lang} className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-body text-text-dark antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
