/**
 * `POST /api/roi-pdf` avec des doublures exclusivement (G5 du 11/10/2026,
 * arbitrage L09) : Resend et Pipedrive (fetch) sont simulés ; aucune requête
 * réseau, aucun e-mail.
 *
 * Vérifie : validation runtime des deux appelants réels du calculateur
 * (`Step3Results`, `MachineRecommendation`), machine en liste fermée et nom tiré
 * du catalogue, échappement, champ piège, limites, contrat de succès, aucun
 * identifiant CRM renvoyé.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextRequest } from 'next/server';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import { calculateROI } from '@/components/calculators/ROICalculator/lib/calculations';
import type { UserInputs } from '@/components/calculators/ROICalculator/lib/types';

const etat = vi.hoisted(() => ({
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
  },
}));

import { POST } from '@/app/api/roi-pdf/route';

let panneAffaire: 'http500' | 'reseau' | null = null;
let panneNote = false;
const notes: string[] = [];
const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
  if (!url.startsWith('https://api.pipedrive.com/')) throw new Error(`réseau interdit : ${url}`);
  if (url.includes('/persons/search')) return new Response(JSON.stringify({ data: { items: [] } }));
  if (url.includes('/persons')) return new Response(JSON.stringify({ data: { id: 11 } }));
  if (url.includes('/deals')) {
    if (panneAffaire === 'reseau') throw new TypeError('fetch failed');
    if (panneAffaire === 'http500') return new Response('{}', { status: 500 });
    return new Response(JSON.stringify({ data: { id: 33 } }));
  }
  if (url.includes('/notes')) {
    if (panneNote) throw new TypeError('fetch failed');
    notes.push(JSON.parse(String(init?.body)).content);
    return new Response(JSON.stringify({ data: { id: 44 } }));
  }
  throw new Error(`requête inattendue : ${url}`);
});

const XL_PRO = MACHINES.find((m) => m.id === 'alphashot-xl-pro-v2')!;

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

vi.spyOn(console, 'warn').mockImplementation(() => {});

beforeEach(() => {
  etat.envois.length = 0;
  etat.reponsesResend.length = 0;
  panneAffaire = null;
  panneNote = false;
  notes.length = 0;
  fetchMock.mockClear();
  vi.stubGlobal('fetch', fetchMock);
  process.env.RESEND_API_KEY = 're_test';
  process.env.RESEND_FROM_EMAIL = 'expediteur@example.invalid';
  process.env.PIPEDRIVE_API_TOKEN = 'jeton-test';
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('POST /api/roi-pdf — parcours légitimes', () => {
  it('envoi du PDF (Step3Results) : 200, e-mail accepté, aucun identifiant CRM', async () => {
    const res = await POST(requete(corpsPdf()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, emailSent: true });
    expect(etat.envois).toHaveLength(1);
    expect(etat.envois[0].subject).toBe(`Votre analyse ROI PackshotCreator - ${XL_PRO.nom}`);
    expect(notes[0]).toContain('Calculateur ROI');
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
    expect(etat.envois).toHaveLength(1);
  });

  it('« être recontacté » (MachineRecommendation, données à zéro, catégorie vide) : 200, notification interne', async () => {
    const res = await POST(requete(corpsRecontact()));
    expect(res.status).toBe(200);
    expect(etat.envois).toHaveLength(1);
    expect(etat.envois[0].subject).toBe(`[ROI Calculator] Nouvelle demande de contact - ${XL_PRO.nom}`);
    expect(etat.envois[0].to).not.toContain(expect.stringContaining('example.fr'));
  });

  it('le nom de machine envoyé par le navigateur est ignoré : seul le catalogue fait foi', async () => {
    const res = await POST(requete(corpsPdf({}, { machineNom: '<img src=x onerror=alert(1)> Gagnez 1000 €' })));
    expect(res.status).toBe(200);
    expect(etat.envois[0].subject).not.toContain('Gagnez');
    expect(etat.envois[0].html).not.toContain('<img');
    expect(etat.envois[0].html).toContain(XL_PRO.nom);
  });

  it('échappe la société et le téléphone dans la notification et la note Pipedrive', async () => {
    await POST(requete(corpsRecontact()));
    expect(etat.envois[0].html).toContain('Atelier &amp; Fils &lt;SARL&gt;');
    expect(etat.envois[0].html).not.toContain('<SARL>');
    expect(notes[0]).toContain('Atelier &amp; Fils &lt;SARL&gt;');
  });
});

describe('POST /api/roi-pdf — contrat de succès', () => {
  it('PDF : e-mail refusé par Resend et jeton absent : 502', async () => {
    delete process.env.PIPEDRIVE_API_TOKEN;
    etat.reponsesResend.push({ data: null, error: { name: 'validation_error' } });
    expect((await POST(requete(corpsPdf()))).status).toBe(502);
  });

  it('PDF : e-mail refusé mais affaire créée : 200, emailSent false', async () => {
    etat.reponsesResend.push({ data: null, error: { name: 'validation_error' } });
    const res = await POST(requete(corpsPdf()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, emailSent: false });
  });

  it('recontact : notification refusée et affaire en échec : 502', async () => {
    panneAffaire = 'http500';
    etat.reponsesResend.push({ data: null, error: { name: 'internal_server_error' } });
    expect((await POST(requete(corpsRecontact()))).status).toBe(502);
  });

  it('recontact : notification en exception, affaire créée : 200', async () => {
    etat.reponsesResend.push(new Error('timeout'));
    expect((await POST(requete(corpsRecontact()))).status).toBe(200);
  });

  it('note en échec réseau après l’affaire : l’affaire reste comptée (lib/pipedrive)', async () => {
    panneNote = true;
    etat.reponsesResend.push({ data: null, error: { name: 'x' } });
    expect((await POST(requete(corpsRecontact()))).status).toBe(200);
  });

  it('affaire en échec réseau, notification acceptée : 200', async () => {
    panneAffaire = 'reseau';
    expect((await POST(requete(corpsRecontact()))).status).toBe(200);
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
    expect(fetchMock).not.toHaveBeenCalled();
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
    const corps = corpsPdf();
    for (let i = 0; i < 3; i++) expect((await POST(requete(corps, `10.5.0.${i}`))).status).toBe(200);
    expect((await POST(requete(corps, '10.5.0.99'))).status).toBe(429);
  });

  it('limite par IP : 11e demande de la même IP dans l’heure : 429', async () => {
    for (let i = 0; i < 10; i++) expect((await POST(requete(corpsPdf(), '10.6.0.1'))).status).toBe(200);
    expect((await POST(requete(corpsPdf(), '10.6.0.1'))).status).toBe(429);
  });
});
