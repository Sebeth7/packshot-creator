import localFont from 'next/font/local';
import './inter-fallback.css';

// Inter auto-hébergée : sous-ensembles des fichiers officiels Inter 4.1
// (rsms/inter), générés par pyftsubset. Source, commande, codepoints, licence
// et SHA-256 : app/fonts/inter/PROVENANCE.md. Remplace le chargeur Google Fonts
// de next/font, qui téléchargeait Inter à chaque build.

// Inter 700 seule, comme l'ancien Inter({ weight: ['700'] }) : toute classe
// font-heading s'affiche en Bold, quelle que soit la graisse demandée.
// unicode-range : les caractères du fichier (app/fonts/inter/subset-unicodes.txt)
// que Google servait aussi avant #72. Les autres (ex. « → », espace fine
// insécable U+202F) restent rendus par la police de repli, comme avant.
// Repli : 'Inter Fallback' de inter-fallback.css, mêmes métriques qu'avant #72,
// à la place du repli recalculé par next/font/local (adjustFontFallback).
// Un seul appel par module : chaque police déclarée ici serait préchargée sur
// toutes les pages des layouts qui importent ce module.
export const inter = localFont({
  src: './inter/Inter-Bold-subset.woff2',
  weight: '700',
  style: 'normal',
  display: 'swap',
  variable: '--font-inter',
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
