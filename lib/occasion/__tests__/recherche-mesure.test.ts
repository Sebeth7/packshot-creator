/**
 * Mesure GA4 de la landing occasion : `form_submit` seulement sur notification
 * interne confirmée par la route ; aucune donnée personnelle (mission S0 du 11/10/2026).
 */
import { describe, it, expect } from 'vitest';
import {
  FORM_NAME_OCCASION,
  evenementsReponseOccasion,
  parametresContexteOccasion,
} from '@/components/landings/occasion/mesure';

describe('GA4 — occasion_recherche', () => {
  it('form_submit uniquement pour une demande reçue (notification confirmée)', () => {
    expect(evenementsReponseOccasion({ ok: true, ackSent: true }, true)).toEqual([
      { nom: 'form_submit', parametres: { ack_sent: 'true', reference_preselected: 'yes' } },
    ]);
    expect(evenementsReponseOccasion({ ok: true, ackSent: false }, false)[0].parametres.ack_sent).toBe('false');
  });

  it('form_error pour tout échec, y compris la route fermée et l’absence de réponse', () => {
    expect(evenementsReponseOccasion({ ok: false, error: 'occasion_unavailable' }, false)).toEqual([
      { nom: 'form_error', parametres: { reason: 'occasion_unavailable' } },
    ]);
    expect(evenementsReponseOccasion({ ok: false, error: 'technical' }, false)[0].nom).toBe('form_error');
    expect(evenementsReponseOccasion(null, false)).toEqual([{ nom: 'form_error', parametres: { reason: 'technical' } }]);
  });

  it('contexte sans donnée personnelle : utm avec « @ » écartés, chemin sans paramètres, domaine seul', () => {
    const p = parametresContexteOccasion({
      utmSource: 'claire@gmail.com',
      utmMedium: 'cpc',
      landingPage: '/fr/studios-photo-automatises/opportunites?email=claire@gmail.com',
      referrer: 'https://www.google.com/search?q=orbitvu+occasion',
    });
    expect(p).toEqual({
      form_name: FORM_NAME_OCCASION,
      page_type: 'landing_occasion',
      locale: 'fr',
      page_source: 'occasion_studios_orbitvu',
      utm_medium: 'cpc',
      first_landing_path: '/fr/studios-photo-automatises/opportunites',
      referrer_host: 'www.google.com',
    });
    expect(JSON.stringify(p)).not.toContain('@');
  });
});
