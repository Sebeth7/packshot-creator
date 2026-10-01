import localFont from 'next/font/local';
import type { Metadata } from 'next';
import '../globals.css';
import '../fonts/inter-fallback.css';

// Inter auto-hébergée (app/fonts/inter/PROVENANCE.md). L'ancien appel chargeait
// 400 à 700 ; seuls 600 (SurveyForm.tsx, l. 110 et 542) et 700 sont rendus ici
// en font-heading. Déclarée dans ce layout pour n'être préchargée que sur cette route.
const inter = localFont({
  src: [
    { path: '../fonts/inter/Inter-SemiBold-subset.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/inter/Inter-Bold-subset.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
  // Repli et plages : mêmes que app/fonts/inter.ts (next/font exige des valeurs littérales).
  adjustFontFallback: false,
  fallback: ['Inter Fallback'],
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000, U+0020-007E, U+00A0-00AC, U+00AE-0148, U+014A-017F, U+0218-021B, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+1E9E, U+2002, U+2009, U+200B, U+2013-2014, U+2018-201A, U+201C-201E, U+2022, U+2026, U+2032-2033, U+2039-203A, U+2044, U+20AC, U+2122, U+2191, U+2193, U+2212, U+FEFF',
    },
  ],
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
      </body>
    </html>
  );
}
