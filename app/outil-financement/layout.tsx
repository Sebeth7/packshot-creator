import { Inter, Roboto } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['700'],
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Outil financement - PackshotCreator',
  description: 'Comparatif leasing / prêt bancaire / achat direct. Usage interne.',
  robots: { index: false, follow: false },
};

export default function OutilFinancementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-body text-text-dark antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
