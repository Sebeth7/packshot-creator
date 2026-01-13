'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import HeroMetrics from '../results/HeroMetrics';
import MachineRecommendation from '../results/MachineRecommendation';
import MachineComparator from '../results/MachineComparator';
import EvolutionChart from '../results/EvolutionChart';
import ComparisonTable from '../results/ComparisonTable';
import BreakEvenTimeline from '../results/BreakEvenTimeline';
import AdditionalBenefits from '../results/AdditionalBenefits';
import ContextualCTA from '../results/ContextualCTA';
import NotProfitableCTA from '../results/NotProfitableCTA';
import EmailCapture from '../results/EmailCapture';
import { generatePDF } from '../results/PDFGenerator';
import { trackCalculatorCompleted, trackCTAClick } from '../lib/analytics';
import type { CalculationResults, UserInputs } from '../lib/types';

interface Step3ResultsProps {
  results: CalculationResults;
  inputs: UserInputs;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    downloadPDF: 'Télécharger le PDF',
    downloading: 'Génération...',
  },
  en: {
    downloadPDF: 'Download PDF',
    downloading: 'Generating...',
  },
};

export default function Step3Results({ results, inputs, locale }: Step3ResultsProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const t = LABELS[locale];

  // Track completion au montage
  useEffect(() => {
    trackCalculatorCompleted(results);
  }, [results]);

  // Téléchargement direct du PDF (bouton temporaire)
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    trackCTAClick('pdf_download', results);

    try {
      console.log('PDF Generation - Starting...', { contentRef: contentRef.current });

      if (!contentRef.current) {
        console.error('PDF Generation - Content ref is null');
        alert('Erreur: Contenu non trouvé');
        return;
      }

      const pdfBlob = await generatePDF(contentRef, results, locale);
      console.log('PDF Generation - Blob created:', pdfBlob.size, 'bytes');

      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ROI-Analysis-${results.machine.nom.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('PDF Generation - Download triggered');
    } catch (error) {
      console.error('PDF Generation - Error:', error);
      alert(`Erreur lors de la génération du PDF: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendPDF = async (email: string) => {
    trackCTAClick('email_capture', results);

    // Générer le PDF
    const pdfBlob = await generatePDF(contentRef, results, locale);

    // TODO: Envoyer via API (Pipedrive + email)
    // Pour l'instant, téléchargement direct
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ROI-Analysis-${results.machine.nom.replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={contentRef}>
      {results.isRentable ? (
        <>
          {/* Métriques héro */}
          <div data-pdf-section="hero">
            <HeroMetrics results={results} locale={locale} />
          </div>

          {/* Bouton téléchargement PDF (temporaire) - exclu du PDF */}
          <div className="flex justify-end mb-6" data-pdf-exclude>
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              variant="outline"
              className="gap-2"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.downloading}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {t.downloadPDF}
                </>
              )}
            </Button>
          </div>

          {/* Machine recommandée */}
          <div data-pdf-section="machine">
            <MachineRecommendation machine={results.machine} locale={locale} />
          </div>

          {/* Comparateur de machines */}
          <div data-pdf-section="comparator">
            <MachineComparator
              inputs={inputs}
              currentResults={results}
              locale={locale}
            />
          </div>

          {/* Graphique évolution */}
          <div data-pdf-section="chart">
            <EvolutionChart results={results} locale={locale} />
          </div>

          {/* Tableau comparatif */}
          <div data-pdf-section="table">
            <ComparisonTable results={results} locale={locale} />
          </div>

          {/* Timeline break-even */}
          <div data-pdf-section="timeline">
            <BreakEvenTimeline results={results} locale={locale} />
          </div>

          {/* Bénéfices additionnels */}
          <div data-pdf-section="benefits">
            <AdditionalBenefits results={results} locale={locale} />
          </div>

          {/* CTA contextuel - exclu du PDF */}
          <div data-pdf-exclude>
            <ContextualCTA results={results} locale={locale} />
          </div>

          {/* Capture email - exclu du PDF */}
          <div className="mt-8" data-pdf-exclude>
            <EmailCapture
              results={results}
              locale={locale}
              onSendPDF={handleSendPDF}
            />
          </div>

          {/* Disclaimer */}
          <div data-pdf-section="disclaimer">
            <p className="mt-8 text-xs text-neutral-medium text-center">
              {locale === 'fr'
                ? 'Ces calculs sont réalisés de manière automatique et vous permettent d\'avoir un aperçu au plus juste de votre ROI. Nous vous recommandons de contacter notre équipe pour affiner la sélection de machine et les calculs ROI en fonction de vos besoins spécifiques.'
                : 'These calculations are performed automatically and give you the most accurate overview of your ROI. We recommend contacting our team to refine the machine selection and ROI calculations based on your specific needs.'}
            </p>
          </div>
        </>
      ) : (
        <>
          {/* CTA non rentable - Option B */}
          <NotProfitableCTA locale={locale} />

          {/* Quand même proposer un contact */}
          <div className="mt-8">
            <EmailCapture
              results={results}
              locale={locale}
              onSendPDF={handleSendPDF}
            />
          </div>
        </>
      )}
    </div>
  );
}
