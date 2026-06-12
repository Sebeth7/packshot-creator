import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '../globals.css';
import LemlistTracker from '@/components/analytics/LemlistTracker';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Body font: native system stack (--font-body in globals.css)

export const metadata: Metadata = {
  title: 'Étude clients PackshotCreator 2026',
  description: 'Questionnaire de satisfaction — Opération clients existants PackshotCreator.',
  robots: { index: false, follow: false },
};

export default function EtudeClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-body text-[var(--text-dark)] antialiased overflow-x-hidden bg-[var(--bg-warm-white)]">
        {children}
        <LemlistTracker />
      </body>
    </html>
  );
}
