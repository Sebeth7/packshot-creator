/**
 * Services de /api/occasion et envois Resend, avec un client Resend factice :
 * aucun appel réseau, aucun e-mail (mission S0 du 11/10/2026).
 */
import { describe, it, expect } from 'vitest';
import { fauxResend } from '@/lib/catalogue/__tests__/doublures';
import { COLLECTE_REELLE_AUTORISEE } from '@/lib/occasion/activation';
import { collecteAffichee, servicesOccasion, servicesOuverts, referencesDuRegistre, SERVICES_OCCASION_DESACTIVES } from '@/lib/occasion/services';
import { accuseOccasionResend, notificationOccasionResend } from '@/lib/occasion/resend';
import { lignesFicheOccasion } from '@/lib/occasion/fiche';
import { champsRechercheSchema, type DemandeRecherche } from '@/lib/occasion/schema';

const ENV_COMPLET = {
  RESEND_API_KEY: 're_factice',
  RESEND_FROM_EMAIL: 'contact@exemple.test',
  OCCASION_NOTIFICATION_EMAIL: 'equipe@exemple.test',
};
// Simulation d'une fenêtre de test d'une heure : verrous du code remplacés pour le test seulement.
const MAINTENANT = new Date('2026-10-11T12:00:00Z');
const OUVERT = {
  verrous: { collecte: true, publication: false, fenetreJusqua: '2026-10-11T13:00:00Z' },
  maintenant: MAINTENANT,
};

const demande: DemandeRecherche = {
  firstName: 'Claire',
  email: 'claire@gmail.com',
  company: 'Atelier <b>Exemple</b>',
  besoin: '<script>alert(1)</script> bijoux 360',
  famille: 'Alphashot (Micro, 360, Pro, XL)',
  telephone: '0102030405',
  budget: '15 k€',
  horizon: 'De 3 à 6 mois',
  commentaire: '',
  reference: '',
  requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b',
  recueLe: '2026-10-11T12:00:00.000Z',
  pageSource: 'occasion_studios_orbitvu',
  langue: 'fr',
};

describe('servicesOccasion — fermés sans GO ni configuration', () => {
  it('verrou du code : COLLECTE_REELLE_AUTORISEE est vrai, mais hors production et sans fenêtre de test les services restent fermés, même avec tous les secrets', () => {
    expect(COLLECTE_REELLE_AUTORISEE).toBe(true);
    expect(servicesOccasion(ENV_COMPLET).mode).toBe('desactive');
  });

  it('sans OCCASION_NOTIFICATION_EMAIL : fermés, aucun repli sur les variables catalogue ou questionnaire', () => {
    const env = { RESEND_API_KEY: 're', RESEND_FROM_EMAIL: 'a@b.test', CATALOGUE_NOTIFICATION_EMAIL: 'c@d.test', NOTIFICATION_EMAIL: 'e@f.test' };
    expect(servicesOccasion(env, OUVERT).mode).toBe('desactive');
  });

  it('sans clé ou expéditeur Resend : fermés', () => {
    expect(servicesOccasion({ ...ENV_COMPLET, RESEND_API_KEY: '' }, OUVERT).mode).toBe('desactive');
    expect(servicesOccasion({ ...ENV_COMPLET, RESEND_FROM_EMAIL: undefined }, OUVERT).mode).toBe('desactive');
  });

  it('production sans GO de publication : fermés, même collecte autorisée', () => {
    expect(servicesOccasion({ ...ENV_COMPLET, VERCEL_ENV: 'production' }, OUVERT).mode).toBe('desactive');
  });

  it('collecte autorisée sans fenêtre de test (Preview) : fermés', () => {
    const verrous = { collecte: true, publication: false, fenetreJusqua: null };
    expect(servicesOccasion({ ...ENV_COMPLET, VERCEL_ENV: 'preview' }, { verrous, maintenant: MAINTENANT }).mode).toBe('desactive');
  });

  it('fenêtre de test échue : fermés dès la construction', () => {
    const verrous = { collecte: true, publication: false, fenetreJusqua: '2026-10-11T11:59:59Z' };
    expect(servicesOccasion(ENV_COMPLET, { verrous, maintenant: MAINTENANT }).mode).toBe('desactive');
  });

  it('tout réuni (simulation de test) : services réels assemblés avec le client factice, fin de fenêtre portée', () => {
    const { client } = fauxResend();
    const s = servicesOccasion(ENV_COMPLET, { ...OUVERT, clientCourriel: () => client });
    expect(s.mode).toBe('reel');
    if (s.mode === 'reel') expect(s.ouverteJusqua).toBe(Date.parse('2026-10-11T13:00:00Z'));
  });

  it('registre réel : aucune référence disponible, les exemples fictifs n’y sont jamais', () => {
    expect(referencesDuRegistre(new Date('2026-10-11T12:00:00Z'))).toEqual([]);
  });
});

describe('État ouvert / affiché (bandeau et avis du formulaire)', () => {
  it('services désactivés : jamais ouverts, collecte affichée inactive', () => {
    expect(servicesOuverts(SERVICES_OCCASION_DESACTIVES, MAINTENANT)).toBe(false);
    expect(collecteAffichee(SERVICES_OCCASION_DESACTIVES, MAINTENANT)).toEqual({ active: false, jusqua: null });
  });

  it('fenêtre en cours : ouverts, collecte affichée ACTIVE avec son heure de fin', () => {
    const { client } = fauxResend();
    const s = servicesOccasion(ENV_COMPLET, { ...OUVERT, clientCourriel: () => client });
    expect(servicesOuverts(s, MAINTENANT)).toBe(true);
    expect(collecteAffichee(s, MAINTENANT)).toEqual({ active: true, jusqua: '2026-10-11T13:00:00.000Z' });
  });

  it('après la fin : fermés et affichés inactifs, sur la même instance', () => {
    const { client } = fauxResend();
    const s = servicesOccasion(ENV_COMPLET, { ...OUVERT, clientCourriel: () => client });
    const apres = new Date('2026-10-11T13:00:00Z');
    expect(servicesOuverts(s, apres)).toBe(false);
    expect(collecteAffichee(s, apres)).toEqual({ active: false, jusqua: null });
  });
});

describe('Notification interne [Occasion]', () => {
  it('objet, destinataires, fiche complète et HTML échappé', async () => {
    const r = fauxResend();
    const { id } = await notificationOccasionResend(r.client, 'contact@exemple.test', ['equipe@exemple.test']).notifier(demande);
    expect(id).toBe('msg_1');
    const m = r.envois[0];
    expect(m.to).toEqual(['equipe@exemple.test']);
    expect(m.from).toBe('PackshotCreator <contact@exemple.test>');
    expect(m.subject).toBe('[Occasion] Recherche de studio — Atelier <b>Exemple</b>');
    expect(m.html).not.toContain('<script>');
    expect(m.html).toContain('&lt;script&gt;');
    expect(m.html).not.toContain('<b>Exemple</b>');
    for (const attendu of ['Prénom : Claire', 'E-mail : claire@gmail.com', 'Téléphone : 0102030405', 'Budget HT indicatif : 15 k€', "Horizon d'achat : De 3 à 6 mois", `Identifiant : ${demande.requestId}`, 'Machine présélectionnée : aucune']) {
      expect(m.text).toContain(attendu);
    }
  });

  it('Resend renvoie une erreur ou aucun identifiant : la notification lève', async () => {
    const r1 = fauxResend(() => ({ data: null, error: { message: 'refus' } }));
    await expect(notificationOccasionResend(r1.client, 'a@b.test', ['c@d.test']).notifier(demande)).rejects.toThrow();
    const r2 = fauxResend(() => ({ data: { id: '' }, error: null }));
    await expect(notificationOccasionResend(r2.client, 'a@b.test', ['c@d.test']).notifier(demande)).rejects.toThrow();
  });

  it('fiche : aucune promesse de disponibilité, de prix ou de délai', () => {
    const texte = lignesFicheOccasion(demande).join('\n');
    expect(texte).toContain("[Occasion] Recherche d'un studio Orbitvu d'occasion");
    expect(texte).not.toMatch(/disponible imm|garanti|sous \d+ ?(h|heures|jours)|24 ?h/i);
  });
});

describe('Accusé de réception au prospect', () => {
  it('au seul prospect, prénom échappé, sans promesse ni lien vers le neuf', async () => {
    const r = fauxResend();
    const res = await accuseOccasionResend(r.client, 'contact@exemple.test').envoyer({ ...demande, firstName: '<i>Claire</i>' });
    expect(res.envoye).toBe(true);
    const m = r.envois[0];
    expect(m.to).toEqual(['claire@gmail.com']);
    expect(m.html).toContain('&lt;i&gt;Claire&lt;/i&gt;');
    expect(m.text).toContain('ne vaut ni offre, ni confirmation de disponibilité');
    expect(m.text).not.toMatch(/€|prix|délai|sous \d+|24 ?h|\/contact|calculateur/i);
  });

  it('erreur Resend : envoye false', async () => {
    const r = fauxResend(() => ({ data: null, error: { message: 'x' } }));
    expect((await accuseOccasionResend(r.client, 'a@b.test').envoyer(demande)).envoye).toBe(false);
  });
});

describe('Schéma partagé client / serveur', () => {
  it('obligatoires : prénom, e-mail, entreprise, besoin ; référence facultative', () => {
    const ok = champsRechercheSchema.safeParse({ firstName: 'A', email: 'a@b.fr', company: 'C', besoin: 'Bijoux' });
    expect(ok.success).toBe(true);
    if (ok.success) expect(ok.data).toMatchObject({ reference: '', telephone: '', budget: '', horizon: '', famille: '' });
    const ko = champsRechercheSchema.safeParse({});
    expect(ko.success).toBe(false);
    if (!ko.success) expect(new Set(ko.error.issues.map((i) => i.path[0]))).toEqual(new Set(['firstName', 'email', 'company', 'besoin']));
  });

  it('aucun opt-in marketing exigé ; un champ inconnu est ignoré', () => {
    const r = champsRechercheSchema.safeParse({ firstName: 'A', email: 'a@b.fr', company: 'C', besoin: 'Bijoux', newsletter: true });
    expect(r.success).toBe(true);
    if (r.success) expect('newsletter' in r.data).toBe(false);
  });
});
