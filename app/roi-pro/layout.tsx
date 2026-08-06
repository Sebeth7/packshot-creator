import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ROI Pro — Calculateur interne PackshotCreator',
  robots: { index: false, follow: false },
};

export default function RoiProLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-body text-text-dark antialiased overflow-x-hidden bg-neutral-50">
        {children}
      </body>
    </html>
  );
}
