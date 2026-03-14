'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Info, AlertTriangle } from 'lucide-react';
import MethodologyModal from '../results/MethodologyModal';
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
import { formatEuro } from '../lib/calculations';
import type { CalculationResults, UserInputs } from '../lib/types';

interface Step3ResultsProps {
  results: CalculationResults;
  inputs: UserInputs;
  locale: 'fr' | 'en';
  onSelectMachine?: (machineId: string) => void;
}

const LABELS = {
  fr: {
    downloadPDF: 'Télécharger le PDF',
    downloading: 'Génération...',
    methodology: 'Méthode de calcul',
    capacityWarningTitle: 'Volume supérieur à la capacité de cette machine',
    capacityWarningBody: (machineName: string, capaciteMax: number, demande: number) =>
      `La ${machineName} peut produire jusqu'à ${capaciteMax.toLocaleString('fr-FR')} photos/an (${Math.round(capaciteMax / 230)} photos/jour × 230 jours). Votre besoin de ${demande.toLocaleString('fr-FR')} photos/an dépasse cette capacité.`,
    capacityWarningSolutions: 'Solutions possibles :',
    capacitySolution1: 'Ajouter un 2ème opérateur en relais (+50% de capacité effective)',
    capacitySolution2: 'Opter pour une machine à plus forte capacité de production',
    capacitySolution3: 'Contacter notre équipe pour une étude multi-machines personnalisée',
    capacityWarningNote: 'Les résultats ci-dessous sont calculés à titre indicatif et ne reflètent pas une configuration de production réaliste.',
  },
  en: {
    downloadPDF: 'Download PDF',
    downloading: 'Generating...',
    methodology: 'Calculation method',
    capacityWarningTitle: 'Volume exceeds this machine\'s capacity',
    capacityWarningBody: (machineName: string, capaciteMax: number, demande: number) =>
      `The ${machineName} can produce up to ${capaciteMax.toLocaleString('en-US')} photos/year (${Math.round(capaciteMax / 230)} photos/day × 230 days). Your need of ${demande.toLocaleString('en-US')} photos/year exceeds this capacity.`,
    capacityWarningSolutions: 'Possible solutions:',
    capacitySolution1: 'Add a 2nd operator in relay (+50% effective capacity)',
    capacitySolution2: 'Choose a machine with higher production capacity',
    capacitySolution3: 'Contact our team for a custom multi-machine study',
    capacityWarningNote: 'The results below are calculated for reference only and do not reflect a realistic production setup.',
  },
};

export default function Step3Results({ results, inputs, locale, onSelectMachine }: Step3ResultsProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
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

          {/* Alerte capacité insuffisante */}
          {results.capaciteInsuffisante && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 mb-6" data-pdf-section="capacity-warning">
              <div className="flex gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-amber-800 mb-2">
                    {t.capacityWarningTitle}
                  </h4>
                  <p className="text-sm text-amber-700 mb-3">
                    {t.capacityWarningBody(
                      results.machine.nom,
                      results.capaciteAnnuelleMachine,
                      inputs.photosAnnuelles
                    )}
                  </p>
                  <p className="text-sm font-medium text-amber-800 mb-2">
                    {t.capacityWarningSolutions}
                  </p>
                  <ul className="text-sm text-amber-700 space-y-1 mb-3">
                    <li className="flex gap-2">
                      <span>1.</span>
                      <span>{t.capacitySolution1}</span>
                    </li>
                    <li className="flex gap-2">
                      <span>2.</span>
                      <span>{t.capacitySolution2}</span>
                    </li>
                    <li className="flex gap-2">
                      <span>3.</span>
                      <span>{t.capacitySolution3}</span>
                    </li>
                  </ul>
                  <p className="text-xs text-amber-600 italic">
                    {t.capacityWarningNote}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Boutons actions - exclu du PDF */}
          <div className="flex justify-end gap-2 mb-6" data-pdf-exclude>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowMethodology(true)}
              className="gap-2 text-future-dusk-600"
            >
              <Info className="w-4 h-4" />
              {t.methodology}
            </Button>
            <Button
              type="button"
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
          <div data-pdf-exclude>
            <MachineComparator
              inputs={inputs}
              currentResults={results}
              locale={locale}
              onSelectMachine={onSelectMachine}
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
            <p className="mt-8 text-xs text-future-dusk-500 text-center">
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

      {/* Modale méthodologie */}
      <MethodologyModal
        isOpen={showMethodology}
        onClose={() => setShowMethodology(false)}
        locale={locale}
      />
    </div>
  );
}
