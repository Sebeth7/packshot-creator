import { trackEvent } from '@/lib/analytics';

/**
 * Événements GA4 de la landing catalogue. `trackEvent` n'émet rien sans
 * consentement analytique (gtag absent tant que le visiteur n'a pas accepté).
 * Aucune donnée personnelle : seulement le pays choisi et l'emplacement du clic.
 * KPI principal : `catalogue_request_accepted`, émis après réponse acceptée du
 * serveur, jamais au clic ni en simulation.
 */
export const FORM_NAME = 'catalogue_all_in_one';

export type LieuClic = 'hero' | 'formulaire' | 'consultant';

export function mesurerDemandeAcceptee(country: 'FR' | 'CH') {
  trackEvent('catalogue_request_accepted', { form_name: FORM_NAME, country });
}

export function mesurerDemandeConsultantAcceptee(country: 'FR' | 'CH') {
  trackEvent('consultant_request_accepted', { form_name: FORM_NAME, country });
}

export function mesurerOuverturePdf() {
  trackEvent('catalogue_pdf_open_click', { form_name: FORM_NAME });
}

export function mesurerEchec(reason: 'invalid' | 'rate_limited' | 'catalogue_unavailable' | 'technical') {
  trackEvent('catalogue_request_failed', { form_name: FORM_NAME, reason });
}

export function mesurerAppel(country_target: 'FR' | 'CH', location: LieuClic) {
  trackEvent('catalogue_click_to_call', { form_name: FORM_NAME, country_target, location });
}
