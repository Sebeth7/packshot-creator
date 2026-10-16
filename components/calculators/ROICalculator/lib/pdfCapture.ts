/**
 * Garde-fous de la capture PDF (PDFGenerator), sans dépendance au DOM pour
 * être testés par Vitest.
 *
 * Incident du 16/10/2026 : une section capturée dans un conteneur masqué
 * (`display: none`) donnait un canvas de 0 × 0 ; la hauteur d'image
 * (0 × largeur) / 0 valait NaN et jsPDF levait « Invalid argument passed to
 * jsPDF.scale ». Ces fonctions refusent ces cas avec une erreur explicite,
 * au lieu d'un NaN ou d'un PDF amputé en silence.
 */

export type PdfGenerationErrorCode =
  | 'section-non-rendue'
  | 'capture-impossible'
  | 'capture-vide'
  | 'graphique-non-pret';

export class PdfGenerationError extends Error {
  readonly code: PdfGenerationErrorCode;

  constructor(code: PdfGenerationErrorCode, message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'PdfGenerationError';
    this.code = code;
  }
}

function positif(n: number): boolean {
  return Number.isFinite(n) && n > 0;
}

/**
 * État d'une section avant capture, d'après sa boîte à l'écran :
 * - `non-rendue` : largeur nulle, la section n'est pas mise en page (ancêtre
 *   masqué) — la capturer produirait un canvas vide ;
 * - `vide` : mise en page mais sans hauteur (composant qui ne rend rien) —
 *   rien à perdre en l'omettant ;
 * - `a-capturer` : sinon.
 */
export function etatSection(largeurPx: number, hauteurPx: number): 'non-rendue' | 'vide' | 'a-capturer' {
  if (!positif(largeurPx)) return 'non-rendue';
  if (!positif(hauteurPx)) return 'vide';
  return 'a-capturer';
}

/** Hauteur en mm d'une capture posée sur `largeurMm`, ou erreur si elle n'est pas un nombre fini positif. */
export function hauteurImageMm(canvasLargeurPx: number, canvasHauteurPx: number, largeurMm: number): number {
  if (!positif(canvasLargeurPx) || !positif(canvasHauteurPx)) {
    throw new PdfGenerationError(
      'capture-vide',
      `Capture vide (${canvasLargeurPx} × ${canvasHauteurPx} px) : section non rendue au moment de la capture`
    );
  }
  const hauteur = (canvasHauteurPx * largeurMm) / canvasLargeurPx;
  if (!positif(hauteur)) {
    throw new PdfGenerationError('capture-vide', `Hauteur d'image invalide (${hauteur} mm)`);
  }
  return hauteur;
}
