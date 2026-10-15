/**
 * `POST /api/roi-pdf` avec des doublures exclusivement (G5 ; P0 sécurité du
 * 11/10/2026, contrat sans CRM du 15/10/2026) : Resend est simulé, et tout appel
 * réseau échoue le test. Aucun e-mail, aucune dépense.
 *
 * Vérifié :
 * - aucune dépendance Pipedrive : la route n'appelle plus `fetch` ;
 * - deux parcours, deux contrats : « envoi du PDF » (analyse au prospect +
 *   notification interne, nouvelle le 15/10) et « être recontacté »
 *   (notification interne seule, obligatoire) ;
 * - échec partiel déclaré tel quel (`emailSent`, `leadRecorded`), jamais masqué ;
 * - les sept situations d'envoi demandées le 15/10, pour chaque parcours ;
 * - validation runtime des deux appelants réels (`Step3Results`,
 *   `MachineRecommendation`), machine en liste fermée, échappement, piège,
 *   limites, journal sans donnée personnelle.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextRequest } from 'next/server';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import { calculateROI } from '@/components/calculators/ROICalculator/lib/calculations';
import type { UserInputs } from '@/components/calculators/ROICalculator/lib/types';

const etat = vi.hoisted(() => ({
  resendIndisponible: false,
  envois: [] as Array<{ to: string[]; subject: string; html: string }>,
  reponsesResend: [] as Array<unknown>,
}));

vi.mock('resend', () => ({
  Resend: class {
    emails = {
      send: async (message: { to: string[]; subject: string; html: string }) => {
        etat.envois.push(message);
        const r = etat.reponsesResend.shift() ?? { data: { id: `msg_${etat.envois.length}` }, error: null };
        if (r instanceof Error) throw r;
        return r;
      },
    };
    constructor() {
      if (etat.resendIndisponible) throw new Error('Missing API key');
    }
  },
}));

import { POST } from '@/app/api/roi-pdf/route';

/** Aucun appel réseau n'est attendu : plus de CRM dans cette route. */
const fetchMock = vi.fn(async (url: string) => {
  throw new Error(`réseau interdit : ${url}`);
});

const XL_PRO = MACHINES.find((m) => m.id === 'alphashot-xl-pro-v2')!;
const INTERNES = ['sebastien.jourdan@sysnext.com', 'stephane.gormand@sysnext.com'];

let compteur = 0;
/** Corps envoyé par `Step3Results.tsx` (envoi du PDF par e-mail). */
function corpsPdf(surcharges: Record<string, unknown> = {}, calcul: Record<string, unknown> = {}) {
  compteur += 1;
  return {
    email: `client.${compteur}@example.fr`,
    calculatorData: {
      nbOperateurs: 1,
      pourcentageTemps: 80,
      photosAnnuelles: 5000,
      tailleProduitsCategory: 'moyen',
      typesContenu: ['packshot', '360'],
      leasingActif: true,
      leasingMensualite: 1200,
      leasingNbMois: 60,
      investissementInitialActif: false,
      montantAccessoires: 0,
      machineNom: XL_PRO.nom,
      machineId: XL_PRO.id,
      economieAnnuelle: 12345.6,
      tempsLibereJours: 42,
      valeurTempsLibere: 8000,
      roi5ans: 180.5,
      breakEvenMois: 18,
      economie5ans: 45000,
      isRentable: true,
      isLeasing: true,
      coutTotalActuel: 60000,
      coutTotalMachine: 30000,
      ...calcul,
    },
    locale: 'fr',
    ...surcharges,
  };
}

/** Corps envoyé par `MachineRecommendation.tsx` (« être recontacté »). */
function corpsRecontact(surcharges: Record<string, unknown> = {}) {
  compteur += 1;
  return {
    email: `contact.${compteur}@example.fr`,
    phone: '+33 6 12 34 56 78',
    company: 'Atelier & Fils <SARL>',
    calculatorData: {
      machineNom: XL_PRO.nom,
      machineId: XL_PRO.id,
      nbOperateurs: 0,
      pourcentageTemps: 0,
      photosAnnuelles: 0,
      tailleProduitsCategory: '',
      typesContenu: [],
      leasingActif: false,
      investissementInitialActif: false,
      economieAnnuelle: 0,
      roi5ans: 0,
      breakEvenMois: null,
      economie5ans: 0,
      isRentable: true,
      isLeasing: false,
      coutTotalActuel: 0,
      coutTotalMachine: 0,
    },
    locale: 'en',
    contactRequest: true,
    ...surcharges,
  };
}

function requete(corps: unknown, ip = `10.3.0.${compteur}`): NextRequest {
  return new Request('http://localhost/api/roi-pdf', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(corps),
  }) as unknown as NextRequest;
}

const journal = vi.spyOn(console, 'warn').mockImplementation(() => {});

beforeEach(() => {
  etat.resendIndisponible = false;
  etat.envois.length = 0;
  etat.reponsesResend.length = 0;
  fetchMock.mockClear();
  journal.mockClear();
  vi.stubGlobal('fetch', fetchMock);
  process.env.RESEND_API_KEY = 're_test';
  process.env.RESEND_FROM_EMAIL = 'expediteur@example.invalid';
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const REFUS = { data: null, error: { name: 'validation_error' } };
const SANS_IDENTIFIANT = { data: { id: '' }, error: null };

describe('POST /api/roi-pdf — aucun CRM (15/10/2026)', () => {
  it('la route n’appelle aucune API externe : seul Resend est sollicité', async () => {
    const res = await POST(requete(corpsPdf()));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('aucun identifiant interne dans la réponse', async () => {
    const res = await POST(requete(corpsPdf()));
    expect(await res.json()).toEqual({ success: true, emailSent: true, leadRecorded: true });
  });

  it('le jeton Pipedrive, s’il traîne encore dans l’environnement, n’a plus d’effet', async () => {
    process.env.PIPEDRIVE_API_TOKEN = 'jeton-residuel';
    expect((await POST(requete(corpsPdf()))).status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    delete process.env.PIPEDRIVE_API_TOKEN;
  });
});

describe('POST /api/roi-pdf — parcours « envoi du PDF » : notification interne nouvelle', () => {
  it('analyse au prospect puis notification interne portant les données de suivi', async () => {
    const corps = corpsPdf();
    const res = await POST(requete(corps));
    expect(res.status).toBe(200);
    expect(etat.envois).toHaveLength(2);
    const [analyse, notification] = etat.envois;
    expect(analyse.to).toEqual([corps.email]);
    expect(analyse.subject).toBe(`Votre analyse ROI PackshotCreator - ${XL_PRO.nom}`);
    expect(notification.to).toEqual(INTERNES);
    expect(notification.subject).toBe(`[ROI Calculator] Analyse ROI - ${XL_PRO.nom}`);
    expect(notification.html).toContain('Analyse ROI envoyée au prospect :</strong> Oui');
    expect(notification.html).toContain(XL_PRO.nom);
    expect(notification.html).toContain('Break-even : 18 mois');
    expect(notification.html).toContain('Photos/an : 5');
    expect(notification.html).toContain(corps.email);
  });

  it('analyse refusée : 200, échec déclaré dans la réponse et dans la notification', async () => {
    etat.reponsesResend.push(REFUS);
    const res = await POST(requete(corpsPdf()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, emailSent: false, leadRecorded: true });
    expect(etat.envois[1].html).toContain('Non (échec de l’envoi)');
    expect(JSON.stringify(journal.mock.calls)).toContain('courriel_pdf.non_accepte');
  });

  it('notification refusée mais analyse envoyée : 200, lead non enregistré déclaré', async () => {
    etat.reponsesResend.push({ data: { id: 'msg_analyse' }, error: null }, REFUS);
    const res = await POST(requete(corpsPdf()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, emailSent: true, leadRecorded: false });
    expect(JSON.stringify(journal.mock.calls)).toContain('notification.non_acceptee');
  });

  it('les deux envois refusés : 500, aucune trace', async () => {
    etat.reponsesResend.push(REFUS, REFUS);
    const res = await POST(requete(corpsPdf()));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Request not recorded' });
    expect(JSON.stringify(journal.mock.calls)).toContain('aucune_trace');
  });

  it('réponses sans identifiant : traitées comme des refus (500)', async () => {
    etat.reponsesResend.push(SANS_IDENTIFIANT, SANS_IDENTIFIANT);
    expect((await POST(requete(corpsPdf()))).status).toBe(500);
  });

  it('erreur réseau sur les deux envois : 500', async () => {
    etat.reponsesResend.push(new Error('fetch failed'), new Error('fetch failed'));
    expect((await POST(requete(corpsPdf()))).status).toBe(500);
  });

  it('téléphone seul : aucune analyse tentée, la notification ne prétend pas le contraire', async () => {
    const res = await POST(requete({ ...corpsPdf(), email: undefined, phone: '+33 6 00 00 00 01' }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, emailSent: false, leadRecorded: true });
    expect(etat.envois).toHaveLength(1);
    expect(etat.envois[0].to).toEqual(INTERNES);
    expect(etat.envois[0].html).not.toContain('Analyse ROI envoyée au prospect');
  });

  it('break-even très long issu d’un calcul réel (plus de 10 000 mois) : 200, aucune perte de lead', async () => {
    // Entrées valides du formulaire (`validation.ts`), trouvées par échantillonnage le 12/10.
    const entrees: UserInputs = {
      nbOperateurs: 11, pourcentageTemps: 42, utiliseSolutionExterne: false, budgetMensuelExterne: 24609,
      capaciteJournaliere: 159, investissementInitialActif: false, photosAnnuelles: 12432, budgetEquipement: 520,
      tailleProduitsCategory: 'petit', typesContenu: ['360', 'ghost-mannequin', 'lifestyle'], montantAccessoires: 67770,
      leasingActif: false,
    };
    const r = calculateROI(entrees);
    expect(r.breakEvenMois).toBeGreaterThan(10_000);
    const res = await POST(requete(corpsPdf({}, {
      leasingActif: false, leasingMensualite: undefined, leasingNbMois: undefined, montantAccessoires: 67770,
      machineNom: r.machine.nom, machineId: r.machine.id, economieAnnuelle: r.economieAnnuelle,
      tempsLibereJours: Math.round(r.tempsLibereJours), valeurTempsLibere: Math.round(r.valeurTempsLibere),
      roi5ans: r.roi5ans, breakEvenMois: r.breakEvenMois, economie5ans: r.economie5ans, isRentable: r.isRentable,
      isLeasing: r.isLeasing, coutTotalActuel: r.coutTotalActuel, coutTotalMachine: r.coutTotalMachine,
    })));
    expect(res.status).toBe(200);
    expect(etat.envois).toHaveLength(2);
  });

  it('le nom de machine envoyé par le navigateur est ignoré : seul le catalogue fait foi', async () => {
    const res = await POST(requete(corpsPdf({}, { machineNom: '<img src=x onerror=alert(1)> Gagnez 1000 €' })));
    expect(res.status).toBe(200);
    expect(etat.envois[0].subject).not.toContain('Gagnez');
    expect(etat.envois[0].html).not.toContain('<img');
    expect(etat.envois[0].html).toContain(XL_PRO.nom);
    expect(etat.envois[1].html).not.toContain('<img');
  });
});

describe('POST /api/roi-pdf — parcours « être recontacté » : notification obligatoire', () => {
  it('notification acceptée : 200, aucun e-mail au prospect', async () => {
    const corps = corpsRecontact();
    const res = await POST(requete(corps));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, emailSent: false, leadRecorded: true });
    expect(etat.envois).toHaveLength(1);
    expect(etat.envois[0].to).toEqual(INTERNES);
    expect(etat.envois[0].subject).toBe(`[ROI Calculator] Nouvelle demande de contact - ${XL_PRO.nom}`);
    expect(etat.envois[0].html).not.toContain('Analyse ROI envoyée au prospect');
    expect(etat.envois[0].html).not.toContain('--- RÉSULTATS ROI ---');
  });

  it('notification refusée : 500, la demande n’est pas enregistrée', async () => {
    etat.reponsesResend.push(REFUS);
    const res = await POST(requete(corpsRecontact()));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Request not recorded' });
    expect(JSON.stringify(journal.mock.calls)).toContain('aucune_trace');
  });

  it('réponse sans identifiant : 500', async () => {
    etat.reponsesResend.push(SANS_IDENTIFIANT);
    expect((await POST(requete(corpsRecontact()))).status).toBe(500);
  });

  it('erreur réseau : 500', async () => {
    etat.reponsesResend.push(new Error('timeout'));
    expect((await POST(requete(corpsRecontact()))).status).toBe(500);
  });

  it('échappe la société et le téléphone dans la notification', async () => {
    await POST(requete(corpsRecontact()));
    expect(etat.envois[0].html).toContain('Atelier &amp; Fils &lt;SARL&gt;');
    expect(etat.envois[0].html).not.toContain('<SARL>');
  });
});

describe('POST /api/roi-pdf — configuration absente : 503, rien n’est tenté', () => {
  it('clé API absente : 503 sans aucun envoi', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(requete(corpsPdf()));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: 'Service unavailable' });
    expect(etat.envois).toHaveLength(0);
    expect(JSON.stringify(journal.mock.calls)).toContain('configuration.absente');
  });

  it('adresse d’expédition absente : 503, y compris pour « être recontacté »', async () => {
    delete process.env.RESEND_FROM_EMAIL;
    expect((await POST(requete(corpsRecontact()))).status).toBe(503);
    expect(etat.envois).toHaveLength(0);
  });

  it('client Resend impossible à construire : 503, pas 500', async () => {
    etat.resendIndisponible = true;
    expect((await POST(requete(corpsPdf()))).status).toBe(503);
    expect(JSON.stringify(journal.mock.calls)).toContain('resend.indisponible');
  });
});

describe('POST /api/roi-pdf — double clic et nouvelle tentative', () => {
  it('double clic sur « recevoir par e-mail » : un seul lot d’envois', async () => {
    const corps = corpsPdf();
    const premiere = await POST(requete(corps, '10.7.0.1'));
    const seconde = await POST(requete(corps, '10.7.0.1'));
    expect(premiere.status).toBe(200);
    expect(seconde.status).toBe(200);
    expect(await seconde.json()).toEqual({ success: true, emailSent: true, leadRecorded: true });
    expect(etat.envois).toHaveLength(2);
    expect(JSON.stringify(journal.mock.calls)).toContain('demande.dupliquee');
  });

  it('double clic sur « être recontacté » : une seule notification', async () => {
    const corps = corpsRecontact();
    await POST(requete(corps, '10.7.1.1'));
    await POST(requete(corps, '10.7.1.1'));
    expect(etat.envois).toHaveLength(1);
  });

  it('nouvelle tentative après échec : rejouée, et acceptée cette fois', async () => {
    const corps = corpsRecontact();
    etat.reponsesResend.push(REFUS);
    expect((await POST(requete(corps, '10.7.2.1'))).status).toBe(500);
    expect((await POST(requete(corps, '10.7.2.1'))).status).toBe(200);
    expect(etat.envois).toHaveLength(2);
  });

  it('demande modifiée : traitée comme une nouvelle demande', async () => {
    const corps = corpsRecontact();
    await POST(requete(corps, '10.7.3.1'));
    await POST(requete({ ...corps, company: 'Autre société' }, '10.7.3.1'));
    expect(etat.envois).toHaveLength(2);
  });
});

describe('POST /api/roi-pdf — validation, piège, limites', () => {
  it.each([
    ['machine inconnue', corpsPdf({}, { machineId: 'machine-inventee' })],
    ['ni e-mail ni téléphone', { ...corpsPdf(), email: undefined }],
    ['nombre transmis en texte', corpsPdf({}, { photosAnnuelles: '5000' })],
    ['montant démesuré', corpsPdf({}, { coutTotalActuel: 1e12 })],
    ['type de contenu inconnu', corpsPdf({}, { typesContenu: ['<script>'] })],
    ['catégorie inconnue', corpsPdf({}, { tailleProduitsCategory: 'geant' })],
    ['e-mail invalide', corpsPdf({ email: 'pas-un-email' })],
    ['retour à la ligne dans la société', corpsRecontact({ company: 'A\nBcc: x@example.com' })],
    ['calculatorData absent', { email: 'a@example.fr', locale: 'fr' }],
  ])('refuse : %s (400, aucun envoi)', async (_libelle, corps) => {
    const res = await POST(requete(corps));
    expect(res.status).toBe(400);
    expect(etat.envois).toHaveLength(0);
  });

  it('corps non JSON : 400', async () => {
    const res = await POST(
      new Request('http://localhost/api/roi-pdf', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.4.0.1' },
        body: '{pas du json',
      }) as unknown as NextRequest,
    );
    expect(res.status).toBe(400);
  });

  it('champ piège rempli : 400, aucun envoi', async () => {
    const res = await POST(requete(corpsPdf({ siteWeb: 'https://spam.example' })));
    expect(res.status).toBe(400);
    expect(etat.envois).toHaveLength(0);
  });

  it('limite par destinataire : 4e envoi vers la même adresse dans l’heure : 429', async () => {
    const base = corpsPdf();
    for (let i = 0; i < 3; i++) {
      const corps = { ...base, calculatorData: { ...base.calculatorData, photosAnnuelles: 5000 + i } };
      expect((await POST(requete(corps, `10.5.0.${i}`))).status).toBe(200);
    }
    const dernier = { ...base, calculatorData: { ...base.calculatorData, photosAnnuelles: 5100 } };
    expect((await POST(requete(dernier, '10.5.0.99'))).status).toBe(429);
  });

  it('limite par IP : 11e demande de la même IP dans l’heure : 429', async () => {
    for (let i = 0; i < 10; i++) expect((await POST(requete(corpsPdf(), '10.6.0.1'))).status).toBe(200);
    expect((await POST(requete(corpsPdf(), '10.6.0.1'))).status).toBe(429);
  });

  it('le journal ne contient aucune coordonnée', async () => {
    etat.reponsesResend.push(REFUS, REFUS);
    const corps = corpsPdf();
    await POST(requete(corps));
    const texte = JSON.stringify(journal.mock.calls);
    expect(texte).not.toContain(corps.email);
    expect(texte).toContain('aucune_trace');
  });
});
