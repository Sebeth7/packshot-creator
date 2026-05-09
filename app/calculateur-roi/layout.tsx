import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['700'],
  display: 'swap'
});

// Body font: native system stack (--font-body in globals.css)

export const metadata: Metadata = {
  title: 'Calculateur ROI - Studios Photo PackshotCreator',
  description: 'Calculez gratuitement le retour sur investissement d\'un studio photo automatisé. Comparez achat et leasing.',
  robots: { index: false, follow: false },
};

export default function CalculateurROILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-body text-text-dark antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
