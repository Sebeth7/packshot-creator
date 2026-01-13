'use client';

import { useState, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react';

import Step1CurrentSituation from './steps/Step1CurrentSituation';
import Step2ProductionGoals from './steps/Step2ProductionGoals';
import Step3Results from './steps/Step3Results';

import { fullSchema, type FullFormData } from './lib/validation';
import { DEFAULT_VALUES } from './lib/constants';
import { calculateROI } from './lib/calculations';
import type { CalculationResults, UserInputs } from './lib/types';

interface ROICalculatorWizardProps {
  className?: string;
  locale?: 'fr' | 'en';
}

const STEPS = [
  { id: 1, title: { fr: 'Situation actuelle', en: 'Current situation' } },
  { id: 2, title: { fr: 'Objectifs de production', en: 'Production goals' } },
  { id: 3, title: { fr: 'Votre analyse ROI', en: 'Your ROI analysis' } },
];

export default function ROICalculatorWizard({
  className,
  locale = 'fr'
}: ROICalculatorWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const methods = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: DEFAULT_VALUES as FullFormData,
    mode: 'onChange',
  });

  const { trigger, getValues } = methods;

  const handleNext = useCallback(async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        'nbOperateurs',
        'pourcentageTemps',
        'utiliseSolutionExterne',
        'budgetMensuelExterne',
        'capaciteJournaliere',
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        'photosAnnuelles',
        'budgetEquipement',
        'repartition',
        'tailleProduitsCategory',
      ]);

      if (isValid) {
        // Calculer les résultats
        setIsCalculating(true);
        const values = getValues();

        // Simuler un délai pour l'UX
        await new Promise(resolve => setTimeout(resolve, 800));

        const calculatedResults = calculateROI(values as UserInputs);
        setResults(calculatedResults);
        setIsCalculating(false);
      }
    }

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  }, [currentStep, trigger, getValues]);

  const handleBack = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    if (currentStep === 3) {
      setResults(null);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    methods.reset(DEFAULT_VALUES as FullFormData);
    setCurrentStep(1);
    setResults(null);
  }, [methods]);

  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className={cn('bg-white rounded-2xl shadow-xl overflow-hidden', className)}>
      {/* Header avec progression */}
      <div className="bg-gradient-to-r from-primary-turquoise to-primary-dark px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-heading font-bold text-lg">
            {STEPS[currentStep - 1].title[locale]}
          </h3>
          <span className="text-white/80 text-sm">
            {locale === 'fr' ? 'Étape' : 'Step'} {currentStep}/{STEPS.length}
          </span>
        </div>
        <Progress value={progressPercent} className="h-2 bg-white/20" />
      </div>

      {/* Contenu */}
      <FormProvider {...methods}>
        <form className="p-6 md:p-8">
          {currentStep === 1 && <Step1CurrentSituation locale={locale} />}
          {currentStep === 2 && <Step2ProductionGoals locale={locale} />}
          {currentStep === 3 && results && (
            <Step3Results
              results={results}
              inputs={getValues() as UserInputs}
              locale={locale}
            />
          )}

          {/* Loading state */}
          {isCalculating && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-turquoise border-t-transparent mb-4" />
              <p className="text-neutral-medium">
                {locale === 'fr' ? 'Calcul de votre ROI en cours...' : 'Calculating your ROI...'}
              </p>
            </div>
          )}

          {/* Navigation */}
          {!isCalculating && (
            <div className="flex justify-between mt-8 pt-6 border-t border-neutral-light">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {locale === 'fr' ? 'Retour' : 'Back'}
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="gap-2 bg-primary-turquoise hover:bg-primary-dark"
                >
                  {currentStep === 2 ? (
                    <>
                      <Calculator className="w-4 h-4" />
                      {locale === 'fr' ? 'Calculer mon ROI' : 'Calculate my ROI'}
                    </>
                  ) : (
                    <>
                      {locale === 'fr' ? 'Suivant' : 'Next'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                >
                  {locale === 'fr' ? 'Recommencer' : 'Start over'}
                </Button>
              )}
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
