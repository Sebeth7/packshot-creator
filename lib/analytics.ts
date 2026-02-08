/**
 * Global GA4 event tracking utilities.
 * ROI Calculator has its own analytics in components/calculators/ROICalculator/lib/analytics.ts
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export function trackFormSubmit(formName: string) {
  trackEvent('form_submit', { form_name: formName });
}

export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('cta_click', { cta_name: ctaName, cta_location: location });
}

export function trackLanguageSwitch(from: string, to: string) {
  trackEvent('language_switch', { from_lang: from, to_lang: to });
}

export function trackROICalculatorStart() {
  trackEvent('roi_calculator_start');
}

export function trackROICalculatorComplete(machineName: string, roi: number) {
  trackEvent('roi_calculator_complete', { machine_name: machineName, roi_5_years: Math.round(roi) });
}

export function trackOPCOSimulatorComplete() {
  trackEvent('opco_simulator_complete');
}
