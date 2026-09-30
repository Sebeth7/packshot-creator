import localFont from 'next/font/local';

// Inter auto-hébergée : fichiers officiels Inter 4.1 (rsms/inter), sans
// modification. Source, licence et SHA-256 : app/fonts/inter/PROVENANCE.md.
// Remplace le chargeur Google Fonts de next/font, qui téléchargeait Inter à
// chaque build.

// Inter 700 seule, comme l'ancien Inter({ weight: ['700'] }) : toute classe
// font-heading s'affiche en Bold, quelle que soit la graisse demandée.
// unicode-range : les 1 622 caractères que les 7 sous-ensembles Google
// contenaient réellement (latin, latin-ext, cyrillique, grec, vietnamien ;
// calcul dans app/fonts/inter/PROVENANCE.md). Un caractère absent de ces
// fichiers (ex. « → », espace fine insécable U+202F) reste rendu par la police
// de repli, comme avant.
// Un seul appel par module : chaque police déclarée ici serait préchargée sur
// toutes les pages des layouts qui importent ce module.
export const inter = localFont({
  src: './inter/Inter-Bold.woff2',
  weight: '700',
  style: 'normal',
  display: 'swap',
  variable: '--font-inter',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000, U+0020-007E, U+00A0-00AC, U+00AE-0148, U+014A-01C3, U+01C5-0254, U+0256-027B, U+027E-0284, U+0286-0290, U+0292-02A4, U+02A6-02CC, U+02CE-02D7, U+02DA, U+02DC-0301, U+0303-0304, U+0308-0309, U+0323, U+0374-0376, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03D7, U+03DC-03DD, U+03F0-03F6, U+03F9-03FA, U+03FC-0479, U+0480-049D, U+04A0-04FF, U+052F, U+1D00, U+1D0D, U+1D1B, U+1D43, U+1D47-1D49, U+1D4D, U+1D4F-1D50, U+1D52, U+1D56-1D58, U+1D5B, U+1D62-1D65, U+1D9C, U+1DA0, U+1DBB, U+1DBF, U+1E00-1E9B, U+1E9D-1F15, U+1F18-1F1D, U+1F20-1F45, U+1F48-1F4D, U+1F50-1F57, U+1F59, U+1F5B, U+1F5D, U+1F5F-1F7D, U+1F80-1FB4, U+1FB6-1FC4, U+1FC6-1FD3, U+1FD6-1FDB, U+1FDD-1FEF, U+1FF2-1FF4, U+1FF6-1FFE, U+2002, U+2009, U+200B, U+2013-2014, U+2018-201A, U+201C-201E, U+2020, U+2022, U+2026, U+2032-2033, U+2039-203A, U+2044, U+20A0-20AF, U+20B1-20B5, U+20B8-20BA, U+20BC-20BF, U+2113, U+2116, U+2122, U+2191, U+2193, U+2212, U+2C7C, U+2C7F, U+2DFF, U+A69F, U+A7FF, U+FEFF',
    },
  ],
});
