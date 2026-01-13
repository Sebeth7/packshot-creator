'use client';

import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import type { CalculationResults } from '../lib/types';

/**
 * Génère un PDF à partir du contenu HTML des résultats
 * Utilise les sections data-pdf-section pour éviter les coupures
 */
export async function generatePDF(
  contentRef: React.RefObject<HTMLDivElement | null>,
  results: CalculationResults,
  locale: 'fr' | 'en'
): Promise<Blob> {
  const content = contentRef.current;
  if (!content) throw new Error('Content not found');

  // Créer le PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Header
  const addHeader = () => {
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
  };

  // Footer
  const addFooter = (pageNum: number, totalPages: number) => {
    pdf.setTextColor(117, 117, 117); // neutral-medium
    pdf.setFontSize(8);
    pdf.text(
      'www.packshotcreator.com | contact@packshotcreator.com',
      pdfWidth / 2,
      pdfHeight - 10,
      { align: 'center' }
    );
    pdf.text(
      `${pageNum} / ${totalPages}`,
      pdfWidth - 15,
      pdfHeight - 10
    );
  };

  // Récupérer toutes les sections
  const sections = content.querySelectorAll('[data-pdf-section]');
  const sectionElements = Array.from(sections) as HTMLElement[];

  // Si pas de sections définies, utiliser l'ancienne méthode
  if (sectionElements.length === 0) {
    return generatePDFLegacy(contentRef, results, locale);
  }

  // Masquer temporairement les éléments exclus
  const excludedElements = content.querySelectorAll('[data-pdf-exclude]');
  const originalDisplay: string[] = [];
  excludedElements.forEach((el, i) => {
    const htmlEl = el as HTMLElement;
    originalDisplay[i] = htmlEl.style.display;
    htmlEl.style.display = 'none';
  });

  // Capturer chaque section séparément
  const sectionCanvases: { canvas: HTMLCanvasElement; height: number }[] = [];

  for (const section of sectionElements) {
    try {
      const canvas = await html2canvas(section, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      sectionCanvases.push({ canvas, height: imgHeight });
    } catch (error) {
      console.error('Error capturing section:', error);
    }
  }

  // Restaurer les éléments exclus
  excludedElements.forEach((el, i) => {
    const htmlEl = el as HTMLElement;
    htmlEl.style.display = originalDisplay[i];
  });

  // Calculer le nombre total de pages pour les numéros
  let currentY = 40; // Position après header
  const availableFirstPage = pdfHeight - 40 - 20; // 40 header, 20 footer
  const availableOtherPages = pdfHeight - 20 - 20; // 20 margin, 20 footer

  // Pré-calculer le nombre de pages nécessaires
  let tempY = currentY;
  let pageCount = 1;

  for (const { height } of sectionCanvases) {
    const availableHeight = pageCount === 1 ? availableFirstPage : availableOtherPages;
    const remainingOnPage = (pageCount === 1 ? pdfHeight - 20 : pdfHeight - 20) - tempY;

    if (height > remainingOnPage && tempY > (pageCount === 1 ? 40 : 20)) {
      pageCount++;
      tempY = 20;
    }
    tempY += height + 5; // 5mm de marge entre sections
  }

  // Générer le PDF
  addHeader();
  currentY = 40;
  let currentPage = 1;

  for (let i = 0; i < sectionCanvases.length; i++) {
    const { canvas, height } = sectionCanvases[i];
    const remainingOnPage = pdfHeight - 20 - currentY; // 20mm pour footer

    // Si la section ne rentre pas et qu'on n'est pas au début de la page
    if (height > remainingOnPage && currentY > (currentPage === 1 ? 40 : 20)) {
      // Ajouter footer à la page courante
      addFooter(currentPage, pageCount);

      // Nouvelle page
      pdf.addPage();
      currentPage++;
      currentY = 20;
    }

    // Ajouter l'image de la section
    const imgWidth = pdfWidth - 20;
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, currentY, imgWidth, height);

    currentY += height + 5; // 5mm de marge entre sections
  }

  // Footer sur la dernière page
  addFooter(currentPage, pageCount);

  return pdf.output('blob');
}

/**
 * Méthode legacy pour le PDF (fallback)
 */
async function generatePDFLegacy(
  contentRef: React.RefObject<HTMLDivElement | null>,
  results: CalculationResults,
  locale: 'fr' | 'en'
): Promise<Blob> {
  const content = contentRef.current;
  if (!content) throw new Error('Content not found');

  // Masquer temporairement les éléments exclus
  const excludedElements = content.querySelectorAll('[data-pdf-exclude]');
  const originalDisplay: string[] = [];
  excludedElements.forEach((el, i) => {
    const htmlEl = el as HTMLElement;
    originalDisplay[i] = htmlEl.style.display;
    htmlEl.style.display = 'none';
  });

  // Capturer le contenu HTML (html2canvas-pro supporte oklab/oklch)
  const canvas = await html2canvas(content, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  // Restaurer les éléments exclus
  excludedElements.forEach((el, i) => {
    const htmlEl = el as HTMLElement;
    htmlEl.style.display = originalDisplay[i];
  });

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
