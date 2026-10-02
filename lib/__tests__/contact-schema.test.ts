/**
 * `/api/contact` doit accepter toutes les langues du site. Jusqu'au 02/10/2026,
 * son schéma n'acceptait que `fr` et `en` : `ContactForm` envoyait `de-ch` depuis
 * /de-ch/kontakt, les fiches, les secteurs et les landings, et chaque demande
 * recevait un 400, sans trace côté Pipedrive.
 */
import { describe, it, expect } from 'vitest';
import { routing } from '@/i18n/routing';
import { CONTACT_LOCALES, contactSchema } from '@/lib/contact-schema';

const demande = {
  firstName: 'Anna',
  lastName: 'Muster',
  email: 'anna.muster@example.ch',
  company: 'Muster AG',
  sector: 'autre',
  requestType: 'demo',
  rgpdConsent: true,
  newsletter: 'no',
};

describe('schéma de /api/contact', () => {
  it('accepte chaque langue du site', () => {
    for (const locale of routing.locales) {
      expect(CONTACT_LOCALES).toContain(locale);
      expect(contactSchema.safeParse({ ...demande, locale }).success).toBe(true);
    }
  });

  it('accepte une demande envoyée depuis /de-ch/kontakt', () => {
    const parsed = contactSchema.safeParse({ ...demande, locale: 'de-ch', pageSource: '/de-ch/kontakt' });
    expect(parsed.success).toBe(true);
    expect(parsed.data?.locale).toBe('de-ch');
  });

  it('applique fr par défaut quand la langue manque', () => {
    expect(contactSchema.parse(demande).locale).toBe('fr');
  });

  it('refuse une langue inconnue', () => {
    expect(contactSchema.safeParse({ ...demande, locale: 'de' }).success).toBe(false);
  });
});
