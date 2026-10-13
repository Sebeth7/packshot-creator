/**
 * I — GA4 de la landing catalogue : événements émis seulement après une réponse
 * applicable du serveur, aucune donnée personnelle dans les paramètres.
 */
import { afterEach, describe, it, expect, vi } from 'vitest';
import {
  evenementsReponse,
  mesurerOuverturePdf,
  mesurerReponse,
  parametresContexte,
} from '@/components/landings/catalogue-all-in-one/mesure';

const PII = ['claire@gmail.com', 'Claire', 'Atelier Exemple', 'Montres'];

afterEach(() => vi.unstubAllGlobals());

function navigateur(attribution: Record<string, string> | null) {
  const gtag = vi.fn();
  vi.stubGlobal('window', { gtag, location: { hostname: 'www.packshot-creator.com' } });
  vi.stubGlobal('sessionStorage', { getItem: () => (attribution ? JSON.stringify(attribution) : null) });
  return gtag;
}

describe('événements selon la réponse du serveur', () => {
  it('succès serveur : un seul form_submit, la demande de consultant en paramètre (aucun double comptage)', () => {
    const ok = { ok: true as const, pdfUrl: 'https://x.test/c.pdf', emailSent: true, contactRequestAccepted: false };
    expect(evenementsReponse(ok, 'FR')).toEqual([
      { nom: 'form_submit', parametres: { country: 'FR', email_sent: 'true', consultant_request: 'none' } },
    ]);
    const accepte = evenementsReponse({ ...ok, contactRequestAccepted: true }, 'CH', true);
    expect(accepte).toHaveLength(1);
    expect(accepte[0]).toMatchObject({ nom: 'form_submit', parametres: { consultant_request: 'accepted' } });
    // Consultant demandé mais transmission non confirmée : jamais « accepted ».
    expect(evenementsReponse(ok, 'FR', true)[0].parametres.consultant_request).toBe('not_confirmed');
  });

  it('simulation locale : aucun événement', () => {
    expect(evenementsReponse({ ok: true, pdfUrl: 'about:blank', emailSent: false, contactRequestAccepted: false, simulated: true }, 'FR')).toEqual([]);
  });

  it('échecs : form_error avec la raison, jamais un form_submit', () => {
    expect(evenementsReponse({ ok: false, error: 'catalogue_unavailable' }, 'FR', true)).toEqual([
      { nom: 'form_error', parametres: { reason: 'catalogue_unavailable' } },
    ]);
    expect(evenementsReponse({ ok: false, error: 'rate_limited', retryAfterSec: 60 }, 'FR')[0].parametres.reason).toBe('rate_limited');
    expect(evenementsReponse(null, 'FR')).toEqual([{ nom: 'form_error', parametres: { reason: 'technical' } }]);
  });
});

describe('paramètres de contexte sans donnée personnelle', () => {
  it('page_source, emplacement, utm_*, chemin sans paramètres, domaine du referrer seul', () => {
    expect(
      parametresContexte({
        utmSource: 'perplexity.ai',
        utmMedium: 'referral',
        utmCampaign: 'brochure',
        utmContent: 'signature',
        referrer: 'https://www.perplexity.ai/search?q=studio+photo&email=x',
        landingPage: '/fr/catalogue-orbitvu-all-in-one?utm_source=perplexity.ai&email=claire@gmail.com',
      }),
    ).toEqual({
      form_name: 'brochure_form',
      brochure_id: 'orbitvu_all_in_one_2026_fr',
      page_type: 'landing_catalogue',
      locale: 'fr',
      page_source: 'catalogue_all_in_one',
      cta_location: 'landing_catalogue_formulaire',
      utm_source: 'perplexity.ai',
      utm_medium: 'referral',
      utm_campaign: 'brochure',
      utm_content: 'signature',
      first_landing_path: '/fr/catalogue-orbitvu-all-in-one',
      referrer_host: 'www.perplexity.ai',
    });
  });

  it('une valeur utm contenant une adresse e-mail est écartée ; valeurs bornées à 100 caractères', () => {
    const p = parametresContexte({ utmSource: 'claire@gmail.com', utmCampaign: 'x'.repeat(300) });
    expect(p.utm_source).toBeUndefined();
    expect(p.utm_campaign).toHaveLength(100);
  });

  it('sans attribution : seuls les paramètres fixes', () => {
    expect(parametresContexte(null)).toEqual({
      form_name: 'brochure_form',
      brochure_id: 'orbitvu_all_in_one_2026_fr',
      page_type: 'landing_catalogue',
      locale: 'fr',
      page_source: 'catalogue_all_in_one',
      cta_location: 'landing_catalogue_formulaire',
    });
  });
});

describe('émission réelle par gtag (consentement donné)', () => {
  it('succès : paramètres de contexte joints, aucune donnée saisie', () => {
    const gtag = navigateur({ utmSource: 'google', landingPage: '/fr/catalogue-orbitvu-all-in-one' });
    mesurerReponse({ ok: true, pdfUrl: 'https://x.test/c.pdf', emailSent: false, contactRequestAccepted: true }, 'CH', true);
    expect(gtag.mock.calls.map((c) => c[1])).toEqual(['form_submit']);
    expect(gtag.mock.calls[0][2]).toMatchObject({
      form_name: 'brochure_form',
      brochure_id: 'orbitvu_all_in_one_2026_fr',
      page_source: 'catalogue_all_in_one',
      utm_source: 'google',
      country: 'CH',
      email_sent: 'false',
      consultant_request: 'accepted',
    });
    const tout = JSON.stringify(gtag.mock.calls);
    for (const pii of PII) expect(tout).not.toContain(pii);
  });

  it('téléchargement : brochure_download au clic seulement, avec l’identifiant de la brochure', () => {
    const gtag = navigateur(null);
    mesurerReponse({ ok: true, pdfUrl: 'https://x.test/c.pdf', emailSent: true, contactRequestAccepted: false }, 'FR');
    expect(gtag.mock.calls.map((c) => c[1])).not.toContain('brochure_download');
    mesurerOuverturePdf();
    expect(gtag).toHaveBeenLastCalledWith(
      'event',
      'brochure_download',
      expect.objectContaining({ brochure_id: 'orbitvu_all_in_one_2026_fr', page_source: 'catalogue_all_in_one' }),
    );
  });

  it('simulation locale : aucun form_submit', () => {
    const gtag = navigateur(null);
    mesurerReponse({ ok: true, pdfUrl: 'about:blank', emailSent: false, contactRequestAccepted: false, simulated: true }, 'FR');
    expect(gtag).not.toHaveBeenCalled();
  });

  it('sans consentement (gtag absent) : rien n’est émis, aucune erreur', () => {
    vi.stubGlobal('window', { location: { hostname: 'www.packshot-creator.com' } });
    vi.stubGlobal('sessionStorage', { getItem: () => null });
    expect(() => mesurerReponse({ ok: false, error: 'technical' }, 'FR')).not.toThrow();
  });
});
