import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['700'],
  display: 'swap',
});

// Route de TEST du mode public (UX_PROPOSITION_ROI_PUBLIC.md) — jamais
// indexée. La bascule sur /calculateur-roi est le lot 7, sur GO explicite.
export const metadata: Metadata = {
  title: 'Calculateur ROI — Conseiller virtuel PackshotCreator (préversion)',
  robots: { index: false, follow: false },
};

export default function RoiPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-body text-text-dark antialiased overflow-x-hidden bg-neutral-50">
        {children}
      </body>
    </html>
  );
}
