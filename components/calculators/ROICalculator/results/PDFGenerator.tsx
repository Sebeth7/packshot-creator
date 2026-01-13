'use client';

import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { CalculationResults } from '../lib/types';

/**
 * Remplace les couleurs lab() non supportées par des fallbacks RGB
 * Appliqué uniquement sur le clone pour le PDF, pas sur le site
 */
function sanitizeColorsForPDF(clone: Document) {
  // 1. Supprimer/modifier les stylesheets qui contiennent lab()
  const styleSheets = clone.querySelectorAll('style');
  styleSheets.forEach((style) => {
    if (style.textContent) {
      // Remplacer toutes les couleurs modernes non supportées par html2canvas
      style.textContent = style.textContent
        .replace(/lab\([^)]+\)/g, '#666666')
        .replace(/oklab\([^)]+\)/g, '#666666')
        .replace(/oklch\([^)]+\)/g, '#666666')
        .replace(/lch\([^)]+\)/g, '#666666');
    }
  });

  // 2. Ajouter une feuille de style de reset pour forcer des couleurs simples
  const resetStyle = clone.createElement('style');
  resetStyle.textContent = `
    * {
      --background: 255 255 255 !important;
      --foreground: 26 26 26 !important;
      --primary: 0 188 212 !important;
      --muted: 245 245 245 !important;
      --border: 229 229 229 !important;
    }
  `;
  clone.head.appendChild(resetStyle);

  // 3. Forcer les couleurs sur tous les éléments
  const allElements = clone.querySelectorAll('*');
  allElements.forEach((el) => {
    const element = el as HTMLElement;
    const style = element.getAttribute('style') || '';

    // Si le style inline contient des couleurs modernes, les remplacer
    if (style.match(/(?:ok)?l(?:ab|ch)\(/)) {
      element.setAttribute('style', style
        .replace(/lab\([^)]+\)/g, '#666666')
        .replace(/oklab\([^)]+\)/g, '#666666')
        .replace(/oklch\([^)]+\)/g, '#666666')
        .replace(/lch\([^)]+\)/g, '#666666'));
    }
  });
}

/**
 * Génère un PDF à partir du contenu HTML des résultats
 */
export async function generatePDF(
  contentRef: React.RefObject<HTMLDivElement | null>,
  results: CalculationResults,
  locale: 'fr' | 'en'
): Promise<Blob> {
  const content = contentRef.current;
  if (!content) throw new Error('Content not found');

  // Capturer le contenu HTML avec sanitization des couleurs
  const canvas = await html2canvas(content, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    onclone: (clonedDoc) => {
      sanitizeColorsForPDF(clonedDoc);
    },
  });

  const imgData = canvas.toDataURL('image/png');

  // Créer le PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Header
  pdf.setFillColor(0, 188, 212); // primary-turquoise
  pdf.rect(0, 0, pdfWidth, 30, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.text('PackshotCreator', 15, 15);
  pdf.setFontSize(12);
  pdf.text(
    locale === 'fr' ? 'Analyse ROI - Studios Photo Orbitvu' : 'ROI Analysis - Orbitvu Photo Studios',
    15,
    23
  );

  // Date
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  const date = new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US');
  pdf.text(date, pdfWidth - 35, 15);

  // Contenu capturé
  const imgWidth = pdfWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let yOffset = 40;
  let remainingHeight = imgHeight;
  let sourceY = 0;

  // Gestion du contenu multi-pages
  while (remainingHeight > 0) {
    const availableHeight = pdfHeight - yOffset - 20;
    const sliceHeight = Math.min(remainingHeight, availableHeight);

    // Calculer les proportions pour le slice
    const sliceRatio = sliceHeight / imgHeight;
    const sourceHeight = canvas.height * sliceRatio;

    // Créer un canvas temporaire pour le slice
    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = sourceHeight;
    const sliceCtx = sliceCanvas.getContext('2d');

    if (sliceCtx) {
      sliceCtx.drawImage(
        canvas,
        0, sourceY, canvas.width, sourceHeight,
        0, 0, canvas.width, sourceHeight
      );

      const sliceData = sliceCanvas.toDataURL('image/png');
      pdf.addImage(sliceData, 'PNG', 10, yOffset, imgWidth, sliceHeight);
    }

    remainingHeight -= sliceHeight;
    sourceY += sourceHeight;

    if (remainingHeight > 0) {
      pdf.addPage();
      yOffset = 20;
    }
  }

  // Footer sur chaque page
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setTextColor(117, 117, 117); // neutral-medium
    pdf.setFontSize(8);
    pdf.text(
      'www.packshotcreator.com | contact@packshotcreator.com',
      pdfWidth / 2,
      pdfHeight - 10,
      { align: 'center' }
    );
    pdf.text(
      `${i} / ${pageCount}`,
      pdfWidth - 15,
      pdfHeight - 10
    );
  }

  return pdf.output('blob');
}

/**
 * Hook pour télécharger le PDF
 */
export function useDownloadPDF(
  results: CalculationResults,
  locale: 'fr' | 'en'
) {
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadPDF = useCallback(async () => {
    const blob = await generatePDF(contentRef, results, locale);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ROI-Analysis-${results.machine.nom.replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [results, locale]);

  return { contentRef, downloadPDF };
}
