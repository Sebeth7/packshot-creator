'use client';

import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import type { CalculationResults } from '../lib/types';
import { PDF_COLORS } from '../lib/chartColors';

/**
 * Génère un PDF à partir du contenu HTML des résultats
 * Utilise les sections data-pdf-section pour éviter les coupures
 */
export async function generatePDF(
  contentRef: React.RefObject<HTMLDivElement | null>,
  results: CalculationResults,
  locale: 'fr' | 'en',
  contactEmail?: string
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

  // Charger l'image hero pour le header
  let heroImageData: string | null = null;
  try {
    const heroResponse = await fetch('/images/hero/hero-studios-wide.jpg');
    const heroBlob = await heroResponse.blob();
    heroImageData = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(heroBlob);
    });
  } catch (e) {
    console.error('Failed to load hero image for PDF:', e);
  }

  const HEADER_HEIGHT = 40;

  // Header
  const addHeader = () => {
    if (heroImageData) {
      // Image hero en fond de header (couvre toute la largeur, cropped en hauteur)
      const imgRatio = 1200 / 411; // ratio original de l'image
      const imgWidthMm = pdfWidth;
      const imgHeightMm = imgWidthMm / imgRatio;
      // Centrer verticalement dans le header
      const yOffset = (HEADER_HEIGHT - imgHeightMm) / 2;
      pdf.addImage(heroImageData, 'JPEG', 0, Math.min(yOffset, 0), imgWidthMm, Math.max(imgHeightMm, HEADER_HEIGHT));

      // Overlay semi-transparent pour la lisibilité du texte
      pdf.setFillColor(0, 0, 0);
      pdf.setGState(new (pdf as any).GState({ opacity: 0.4 }));
      pdf.rect(0, 0, pdfWidth, HEADER_HEIGHT, 'F');
      pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
    } else {
      // Fallback: header bleu
      const headerColor = PDF_COLORS.header!;
      pdf.setFillColor(headerColor.r, headerColor.g, headerColor.b);
      pdf.rect(0, 0, pdfWidth, HEADER_HEIGHT, 'F');
    }

    // Texte par-dessus
    pdf.setTextColor(PDF_COLORS.white.r, PDF_COLORS.white.g, PDF_COLORS.white.b);
    pdf.setFontSize(22);
    pdf.text('PackshotCreator', 15, 18);
    pdf.setFontSize(12);
    pdf.text(
      locale === 'fr' ? 'Analyse ROI - Studios Photo Orbitvu' : 'ROI Analysis - Orbitvu Photo Studios',
      15,
      28
    );

    // Date
    pdf.setFontSize(10);
    const date = new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US');
    pdf.text(date, pdfWidth - 35, 18);
  };

  // Footer
  const addFooter = (pageNum: number, totalPages: number) => {
    const textColor = PDF_COLORS.text!;
    pdf.setTextColor(textColor.r, textColor.g, textColor.b);
    pdf.setFontSize(8);
    pdf.text(
      'www.packshot-creator.com | contact@sysnext.com',
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
  let currentY = HEADER_HEIGHT + 5; // Position après header + marge
  const availableFirstPage = pdfHeight - (HEADER_HEIGHT + 5) - 20; // header + marge, 20 footer
  const availableOtherPages = pdfHeight - 20 - 20; // 20 margin, 20 footer

  // Pré-calculer le nombre de pages nécessaires
  let tempY = currentY;
  let pageCount = 1;

  for (const { height } of sectionCanvases) {
    const remainingOnPage = (pdfHeight - 20) - tempY;

    if (height > remainingOnPage && tempY > (pageCount === 1 ? HEADER_HEIGHT + 5 : 20)) {
      pageCount++;
      tempY = 20;
    }
    tempY += height + 5; // 5mm de marge entre sections
  }

  // Générer le PDF
  addHeader();
  currentY = HEADER_HEIGHT + 5;
  let currentPage = 1;

  for (let i = 0; i < sectionCanvases.length; i++) {
    const { canvas, height } = sectionCanvases[i];
    const remainingOnPage = pdfHeight - 20 - currentY; // 20mm pour footer

    // Si la section ne rentre pas et qu'on n'est pas au début de la page
    if (height > remainingOnPage && currentY > (currentPage === 1 ? HEADER_HEIGHT + 5 : 20)) {
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

  // CTA cliquable sur la dernière page
  const ctaY = currentY + 5;
  const ctaLabel = locale === 'fr' ? 'Être recontacté par l\'équipe PackshotCreator' : 'Get in touch with the PackshotCreator team';
  const mailtoSubject = encodeURIComponent(locale === 'fr'
    ? 'Calculateur ROI PackshotCreator - Demande de contact'
    : 'PackshotCreator ROI Calculator - Contact request');
  const mailtoBody = encodeURIComponent(locale === 'fr'
    ? `Bonjour,\n\nJ'ai utilisé le calculateur ROI PackshotCreator et souhaite être recontacté.\n\nMachine recommandée : ${results.machine.nom}\n${contactEmail ? `Mon email : ${contactEmail}\n` : ''}\nCordialement`
    : `Hello,\n\nI used the PackshotCreator ROI calculator and would like to be contacted.\n\nRecommended machine: ${results.machine.nom}\n${contactEmail ? `My email: ${contactEmail}\n` : ''}\nBest regards`);
  const mailtoUrl = `mailto:sebastien.jourdan@sysnext.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Bouton CTA
  const ctaWidth = 120;
  const ctaHeight = 12;
  const ctaX = (pdfWidth - ctaWidth) / 2;
  const headerColor = PDF_COLORS.header!;
  pdf.setFillColor(headerColor.r, headerColor.g, headerColor.b);
  pdf.roundedRect(ctaX, ctaY, ctaWidth, ctaHeight, 3, 3, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(11);
  pdf.text(ctaLabel, pdfWidth / 2, ctaY + 7.5, { align: 'center' });
  pdf.link(ctaX, ctaY, ctaWidth, ctaHeight, { url: mailtoUrl });

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

  // Header (legacy) — même image hero si disponible
  const LEGACY_HEADER_HEIGHT = 40;
  let legacyHeroImage: string | null = null;
  try {
    const heroRes = await fetch('/images/hero/hero-studios-wide.jpg');
    const heroBlob = await heroRes.blob();
    legacyHeroImage = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(heroBlob);
    });
  } catch (e) {
    // fallback to colored header
  }

  if (legacyHeroImage) {
    const imgRatio = 1200 / 411;
    const imgW = pdfWidth;
    const imgH = imgW / imgRatio;
    const yOff = (LEGACY_HEADER_HEIGHT - imgH) / 2;
    pdf.addImage(legacyHeroImage, 'JPEG', 0, Math.min(yOff, 0), imgW, Math.max(imgH, LEGACY_HEADER_HEIGHT));
    pdf.setFillColor(0, 0, 0);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.4 }));
    pdf.rect(0, 0, pdfWidth, LEGACY_HEADER_HEIGHT, 'F');
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  } else {
    const headerColor = PDF_COLORS.header!;
    pdf.setFillColor(headerColor.r, headerColor.g, headerColor.b);
    pdf.rect(0, 0, pdfWidth, LEGACY_HEADER_HEIGHT, 'F');
  }

  pdf.setTextColor(PDF_COLORS.white.r, PDF_COLORS.white.g, PDF_COLORS.white.b);
  pdf.setFontSize(22);
  pdf.text('PackshotCreator', 15, 18);
  pdf.setFontSize(12);
  pdf.text(
    locale === 'fr' ? 'Analyse ROI - Studios Photo Orbitvu' : 'ROI Analysis - Orbitvu Photo Studios',
    15,
    28
  );

  // Date
  pdf.setFontSize(10);
  const date = new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US');
  pdf.text(date, pdfWidth - 35, 18);

  // Contenu capturé
  const imgWidth = pdfWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let yOffset = LEGACY_HEADER_HEIGHT + 5;
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
  const textColor = PDF_COLORS.text!;
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setTextColor(textColor.r, textColor.g, textColor.b);
    pdf.setFontSize(8);
    pdf.text(
      'www.packshot-creator.com | contact@sysnext.com',
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
