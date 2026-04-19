import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Roboto, IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import HeaderGate from '@/components/layout/HeaderGate';
import FooterGate from '@/components/layout/FooterGate';
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

// Polices Sysnext Industrial Solutions — usage exclusif sous /industrie-solutions/*
// Chargées globalement pour éviter un second FOUT au changement de route.
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  variable: '--font-ibm-plex-serif',
  weight: ['400', '600'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500'],
  display: 'swap',
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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={lang} className={`${inter.variable} ${roboto.variable} ${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable}`}>
      <body className="font-body text-text-dark antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
          <HeaderGate />
          <main>{children}</main>
          <FooterGate />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
