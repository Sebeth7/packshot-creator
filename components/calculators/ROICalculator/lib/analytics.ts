import type { CalculationResults } from './types';

// Types pour les events
interface CalculatorEvent {
  event: string;
  [key: string]: unknown;
}

/**
 * Track calculator completion
 */
export function trackCalculatorCompleted(results: CalculationResults): void {
  const event: CalculatorEvent = {
    event: 'calculator_completed',
    machine_recommended: results.machine.nom,
    machine_id: results.machine.id,
    roi_3_years: Math.round(results.roi3ans),
    break_even_months: results.breakEvenMois ? Math.round(results.breakEvenMois) : null,
    annual_savings: Math.round(results.economieAnnuelle),
    is_profitable: results.isRentable,
  };

  // Log pour debug (remplacer par gtag en prod)
  console.log('[GA4 Event]', event);

  // Prêt pour intégration:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', event.event, event);
  // }
}

/**
 * Track CTA click
 */
export function trackCTAClick(
  ctaType: 'demo' | 'product_page' | 'email_capture' | 'pdf_download' | 'study_request',
  results: CalculationResults
): void {
  const roiRange = results.roi3ans > 300
    ? 'exceptional'
    : results.roi3ans > 100
      ? 'good'
      : 'moderate';

  const event: CalculatorEvent = {
    event: 'calculator_cta_click',
    cta_type: ctaType,
    machine_id: results.machine.id,
    roi_range: roiRange,
  };

  console.log('[GA4 Event]', event);

  // Prêt pour intégration:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', event.event, event);
  // }
}

/**
 * Track step progression
 */
export function trackStepChange(step: number, direction: 'forward' | 'back'): void {
  const event: CalculatorEvent = {
    event: 'calculator_step_change',
    step_number: step,
    direction,
  };

  console.log('[GA4 Event]', event);

  // Prêt pour intégration:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', event.event, event);
  // }
}

/**
 * Track calculator abandonment (appelé si l'utilisateur quitte avant la fin)
 */
export function trackCalculatorAbandonment(lastStep: number): void {
  const event: CalculatorEvent = {
    event: 'calculator_abandoned',
    last_step: lastStep,
  };

  console.log('[GA4 Event]', event);

  // Prêt pour intégration:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', event.event, event);
  // }
}

/**
 * Track email capture
 */
export function trackEmailCapture(email: string, results: CalculationResults): void {
  const event: CalculatorEvent = {
    event: 'calculator_email_capture',
    machine_id: results.machine.id,
    roi_range: results.roi3ans > 300 ? 'exceptional' : results.roi3ans > 100 ? 'good' : 'moderate',
    // Ne pas logger l'email pour RGPD
  };

  console.log('[GA4 Event]', event);

  // Structure Pipedrive-ready
  console.log('[Pipedrive Ready]', {
    email,
    machine: results.machine.nom,
    machineId: results.machine.id,
    machinePrix: results.machine.prix,
    roi3ans: results.roi3ans,
    economieAnnuelle: results.economieAnnuelle,
    breakEvenMois: results.breakEvenMois,
    isRentable: results.isRentable,
  });
}
