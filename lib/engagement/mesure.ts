import { trackCTAClick, trackEvent } from '@/lib/analytics';

/**
 * Mesure GA4 de la pop-in, sur les primitives existantes (`cta_click`).
 * Aucune donnée personnelle : seuls des libellés fixes sont envoyés. GA4 n'est
 * chargé qu'après consentement « mesure d'audience » (GoogleAnalytics.tsx).
 */

export const EMPLACEMENT = 'exit_modal';

/** Impression : dénominateur, aucun événement existant ne le mesure. */
export function signalerImpression(): void {
  trackEvent('exit_modal_view', { cta_location: EMPLACEMENT });
}

/** Clic sur « Demander une démo » (`demo`) ou « Recevoir le catalogue » (`brochure`). */
export function signalerClic(cta: 'demo' | 'brochure'): void {
  trackCTAClick(cta, EMPLACEMENT);
}

export type ModeFermeture = 'button' | 'escape' | 'backdrop';

/** Fermeture sans conversion, même schéma compact que les deux CTA. */
export function signalerFermeture(mode: ModeFermeture): void {
  trackEvent('cta_click', { cta_name: 'close', cta_location: EMPLACEMENT, close_method: mode });
}
