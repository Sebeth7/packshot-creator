# Implementation : Envoi PDF par email + Integration Pipedrive

## Objectif

Quand un utilisateur entre son email dans le calculateur ROI pour recevoir le PDF :
1. Il recoit le PDF sur son adresse email
2. L'equipe commerciale recoit le PDF + tous les parametres sur son email
3. Une fiche Person + Deal est creee dans Pipedrive avec tous les parametres

## Stack technique

- **Email** : Resend (SDK npm `resend`)
- **CRM** : Pipedrive REST API v1 (pas de SDK, fetch direct)
- **PDF** : Deja genere client-side par `html2canvas-pro` + `jsPDF` (retourne un `Blob`). Envoye en base64 a l'API route.
- **Validation** : Zod (deja installe)
- **Framework** : Next.js 16.1.1, React 19, TypeScript

## Prerequis

Avant de commencer, l'utilisateur doit fournir :
- **Cle API Resend** : creer un compte sur resend.com (100 emails/jour gratuits)
- **Token API Pipedrive** : Settings > Personal preferences > API
- **Pipeline ID et Stage ID Pipedrive** : IDs du pipeline et de l'etape initiale pour les deals
- **Email du proprietaire** : adresse qui recevra les notifications

---

## Variables d'environnement a ajouter dans `.env.local`

```env
# Resend (Email transactionnel)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@packshotcreator.com
ROI_OWNER_EMAIL=commercial@packshotcreator.com

# Pipedrive (CRM)
PIPEDRIVE_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx
PIPEDRIVE_PIPELINE_ID=1
PIPEDRIVE_STAGE_ID=1
```

Notes :
- Toutes server-side only (pas de prefix `NEXT_PUBLIC_`)
- En dev, utiliser `onboarding@resend.dev` comme `RESEND_FROM_EMAIL` (pas besoin de verification domaine)
- En prod, verifier le domaine `packshotcreator.com` dans Resend (SPF + DKIM)

## Dependance a installer

```bash
npm install resend
```

---

## Architecture des fichiers

```
NOUVEAUX FICHIERS :
  app/api/roi-pdf/validation.ts    -- Schema Zod pour le body POST
  app/api/roi-pdf/route.ts         -- API Route handler
  lib/pipedrive.ts                 -- Helper Pipedrive REST API
  lib/email-templates.ts           -- Templates HTML emails (inline CSS)

FICHIER MODIFIE :
  components/calculators/ROICalculator/steps/Step3Results.tsx  -- handleSendPDF

FICHIERS INCHANGES (pour reference) :
  components/calculators/ROICalculator/results/EmailCapture.tsx     -- Interface deja correcte
  components/calculators/ROICalculator/results/PDFGenerator.tsx     -- Genere le Blob PDF
  components/calculators/ROICalculator/lib/types.ts                 -- Types UserInputs, CalculationResults
  components/calculators/ROICalculator/lib/analytics.ts             -- trackEmailCapture() deja pret
```

---

## Fichier 1 : `app/api/roi-pdf/validation.ts`

Schema Zod pour valider le body de la requete POST.

```typescript
import { z } from 'zod';

export const roiPdfRequestSchema = z.object({
  email: z.string().email(),
  pdfBase64: z.string().min(100),
  locale: z.enum(['fr', 'en']),
  inputs: z.object({
    nbOperateurs: z.number(),
    pourcentageTemps: z.number(),
    coutSalarialMensuel: z.number().optional(),
    utiliseSolutionExterne: z.boolean(),
    budgetMensuelExterne: z.number().optional(),
    capaciteJournaliere: z.number(),
    photosAnnuelles: z.number(),
    budgetEquipement: z.number().optional(),
    tailleProduitsCategory: z.enum(['petit', 'moyen', 'grand', 'tres-grand']),
  }),
  results: z.object({
    machineNom: z.string(),
    machinePrix: z.number(),
    economieAnnuelle: z.number(),
    roi5ans: z.number(),
    breakEvenMois: z.number().nullable(),
    coutTotalActuel: z.number(),
    coutTotalMachine: z.number(),
    isRentable: z.boolean(),
  }),
});

export type RoiPdfRequest = z.infer<typeof roiPdfRequestSchema>;
```

Notes :
- `results` est un **resume** (pas le type complet `CalculationResults` qui contient l'objet `Machine` entier)
- `pdfBase64` : un PDF typique fait 200-500 KB, soit 300-700 KB en base64. Bien en dessous de la limite de 4 MB de Next.js API routes.

---

## Fichier 2 : `lib/pipedrive.ts`

Helper pour l'API REST Pipedrive v1. Pas de SDK, juste `fetch`.

```typescript
const PIPEDRIVE_BASE = 'https://api.pipedrive.com/v1';

interface PipedrivePersonResponse {
  success: boolean;
  data: { id: number };
}

interface PipedriveDealResponse {
  success: boolean;
  data: { id: number };
}

/**
 * Cree un Person dans Pipedrive
 * Le nom est derive du prefix email (jean.dupont@company.com → "jean dupont")
 */
export async function createPerson(email: string): Promise<number> {
  const token = process.env.PIPEDRIVE_API_TOKEN;
  if (!token) throw new Error('PIPEDRIVE_API_TOKEN not configured');

  const name = email.split('@')[0].replace(/[._-]/g, ' ');

  const res = await fetch(`${PIPEDRIVE_BASE}/persons?api_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email: [{ value: email, primary: true, label: 'work' }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pipedrive createPerson failed: ${res.status} ${text}`);
  }

  const data: PipedrivePersonResponse = await res.json();
  return data.data.id;
}

/**
 * Cree un Deal dans Pipedrive lie a un Person, avec une note contenant les donnees ROI
 */
export async function createDeal(params: {
  personId: number;
  machineNom: string;
  machinePrix: number;
  economieAnnuelle: number;
  roi5ans: number;
  breakEvenMois: number | null;
  coutTotalActuel: number;
  coutTotalMachine: number;
  isRentable: boolean;
  locale: string;
}): Promise<number> {
  const token = process.env.PIPEDRIVE_API_TOKEN;
  if (!token) throw new Error('PIPEDRIVE_API_TOKEN not configured');

  const pipelineId = process.env.PIPEDRIVE_PIPELINE_ID
    ? parseInt(process.env.PIPEDRIVE_PIPELINE_ID)
    : undefined;
  const stageId = process.env.PIPEDRIVE_STAGE_ID
    ? parseInt(process.env.PIPEDRIVE_STAGE_ID)
    : undefined;

  const title = `ROI Calculator - ${params.machineNom}`;

  const res = await fetch(`${PIPEDRIVE_BASE}/deals?api_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      person_id: params.personId,
      value: params.machinePrix,
      currency: 'EUR',
      ...(pipelineId && { pipeline_id: pipelineId }),
      ...(stageId && { stage_id: stageId }),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pipedrive createDeal failed: ${res.status} ${text}`);
  }

  const data: PipedriveDealResponse = await res.json();
  const dealId = data.data.id;

  // Ajouter une note avec tous les details ROI
  const noteContent = buildDealNote(params);
  await fetch(`${PIPEDRIVE_BASE}/notes?api_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      deal_id: dealId,
      content: noteContent,
    }),
  });

  return dealId;
}

function buildDealNote(params: {
  machineNom: string;
  machinePrix: number;
  economieAnnuelle: number;
  roi5ans: number;
  breakEvenMois: number | null;
  coutTotalActuel: number;
  coutTotalMachine: number;
  isRentable: boolean;
  locale: string;
}): string {
  const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(Math.round(n));

  return `<b>Analyse ROI - Calculateur PackshotCreator</b><br><br>
<b>Machine recommandee:</b> ${params.machineNom}<br>
<b>Prix machine:</b> ${fmt(params.machinePrix)} EUR<br>
<b>Rentable:</b> ${params.isRentable ? 'Oui' : 'Non'}<br><br>
<b>Situation actuelle:</b> ${fmt(params.coutTotalActuel)} EUR/an<br>
<b>Avec Orbitvu:</b> ${fmt(params.coutTotalMachine)} EUR/an<br>
<b>Economie annuelle:</b> ${fmt(params.economieAnnuelle)} EUR<br>
<b>ROI 5 ans:</b> ${fmt(params.roi5ans)}%<br>
<b>Break-even:</b> ${params.breakEvenMois ? `${Math.round(params.breakEvenMois)} mois` : 'N/A'}<br><br>
<i>Source: Calculateur ROI site web (${params.locale})</i>`;
}
```

Notes :
- **Pas de gestion des doublons** en v1 : Pipedrive a sa propre detection de doublons. Pour v2, on pourrait chercher le Person existant par email via `GET /v1/persons/search?term={email}`.
- Le token Pipedrive passe en query param (methode standard de l'API v1).
- La note utilise du HTML (supporte par Pipedrive).

---

## Fichier 3 : `lib/email-templates.ts`

Templates HTML inline (les clients mail strippent les balises `<style>` et CSS externe).
Couleurs brandbook : `#4c5578` (Future Dusk), `#6667AB` (Very Peri).

```typescript
interface ClientEmailParams {
  machineNom: string;
  economieAnnuelle: number;
  roi5ans: number;
  locale: 'fr' | 'en';
}

interface OwnerEmailParams {
  email: string;
  locale: 'fr' | 'en';
  inputs: {
    nbOperateurs: number;
    pourcentageTemps: number;
    coutSalarialMensuel?: number;
    utiliseSolutionExterne: boolean;
    budgetMensuelExterne?: number;
    capaciteJournaliere: number;
    photosAnnuelles: number;
    budgetEquipement?: number;
    tailleProduitsCategory: string;
  };
  results: {
    machineNom: string;
    machinePrix: number;
    economieAnnuelle: number;
    roi5ans: number;
    breakEvenMois: number | null;
    coutTotalActuel: number;
    coutTotalMachine: number;
    isRentable: boolean;
  };
}

const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(Math.round(n));

export function buildClientEmailHtml(params: ClientEmailParams): string {
  const { machineNom, economieAnnuelle, roi5ans, locale } = params;

  if (locale === 'en') {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #4c5578, #6667AB); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">PackshotCreator</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Your ROI Analysis</p>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          <p>Hello,</p>
          <p>Please find attached your personalized ROI analysis for the <strong>${machineNom}</strong>.</p>
          <div style="background: #f0f0ff; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 8px;"><strong>Annual savings:</strong> ${fmt(economieAnnuelle)} EUR</p>
            <p style="margin: 0;"><strong>5-year ROI:</strong> ${fmt(roi5ans)}%</p>
          </div>
          <p>Our team is available to discuss these results and help you find the best solution for your needs.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.packshotcreator.com/en/contact"
               style="background: #6667AB; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Request a Demo
            </a>
          </div>
        </div>
        <div style="padding: 20px; text-align: center; color: #6E7592; font-size: 12px;">
          <p>PackshotCreator by Orbitvu | www.packshotcreator.com</p>
        </div>
      </div>`;
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #4c5578, #6667AB); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">PackshotCreator</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Votre Analyse ROI</p>
      </div>
      <div style="padding: 30px; background: #ffffff;">
        <p>Bonjour,</p>
        <p>Veuillez trouver ci-joint votre analyse ROI personnalisee pour la machine <strong>${machineNom}</strong>.</p>
        <div style="background: #f0f0ff; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 8px;"><strong>Economie annuelle :</strong> ${fmt(economieAnnuelle)} EUR</p>
          <p style="margin: 0;"><strong>ROI sur 5 ans :</strong> ${fmt(roi5ans)}%</p>
        </div>
        <p>Notre equipe est a votre disposition pour echanger sur ces resultats et vous aider a trouver la solution la plus adaptee.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.packshotcreator.com/fr/contact"
             style="background: #6667AB; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Demander une demo
          </a>
        </div>
      </div>
      <div style="padding: 20px; text-align: center; color: #6E7592; font-size: 12px;">
        <p>PackshotCreator by Orbitvu | www.packshotcreator.com</p>
      </div>
    </div>`;
}

export function buildOwnerEmailHtml(params: OwnerEmailParams): string {
  const { email, locale, inputs, results } = params;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
      <div style="background: #4c5578; padding: 20px; color: white;">
        <h2 style="margin: 0;">Nouveau lead ROI Calculator</h2>
        <p style="margin: 8px 0 0; opacity: 0.8;">${email} | ${locale.toUpperCase()}</p>
      </div>
      <div style="padding: 20px;">
        <h3 style="color: #4c5578; border-bottom: 2px solid #6667AB; padding-bottom: 8px;">Resultat</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Machine</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${results.machineNom}</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Prix</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${fmt(results.machinePrix)} EUR</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Rentable</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${results.isRentable ? 'OUI' : 'NON'}</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Economie annuelle</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${fmt(results.economieAnnuelle)} EUR</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>ROI 5 ans</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${fmt(results.roi5ans)}%</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Break-even</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${results.breakEvenMois ? `${Math.round(results.breakEvenMois)} mois` : 'N/A'}</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Cout actuel</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${fmt(results.coutTotalActuel)} EUR/an</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Cout avec machine</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${fmt(results.coutTotalMachine)} EUR/an</td></tr>
        </table>

        <h3 style="color: #4c5578; border-bottom: 2px solid #6667AB; padding-bottom: 8px; margin-top: 24px;">Parametres saisis</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Operateurs</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${inputs.nbOperateurs}</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>% temps photo</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${inputs.pourcentageTemps}%</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Cout salarial</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${fmt(inputs.coutSalarialMensuel || 4000)} EUR/mois</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Prestataire externe</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${inputs.utiliseSolutionExterne ? `Oui (${fmt(inputs.budgetMensuelExterne || 0)} EUR/mois)` : 'Non'}</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Capacite/jour</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${inputs.capaciteJournaliere} photos</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Photos/an</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${fmt(inputs.photosAnnuelles)}</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Budget equipement</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${fmt(inputs.budgetEquipement || 3000)} EUR/an</td></tr>
          <tr><td style="padding: 6px; border-bottom: 1px solid #eee;"><strong>Taille produits</strong></td><td style="padding: 6px; border-bottom: 1px solid #eee;">${inputs.tailleProduitsCategory}</td></tr>
        </table>
      </div>
    </div>`;
}
```

---

## Fichier 4 : `app/api/roi-pdf/route.ts`

API Route Next.js. Les 3 operations (email client, email owner, Pipedrive) tournent en concurrence via `Promise.allSettled`. Si Pipedrive ou l'email owner echouent, le client recoit quand meme son PDF.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { roiPdfRequestSchema } from './validation';
import { createPerson, createDeal } from '@/lib/pipedrive';
import { buildClientEmailHtml, buildOwnerEmailHtml } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = roiPdfRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, pdfBase64, locale, inputs, results } = parsed.data;

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const filename = `ROI-Analysis-${results.machineNom.replace(/\s+/g, '-')}.pdf`;

    const [clientEmailResult, ownerEmailResult, pipedriveResult] = await Promise.allSettled([
      // Email au client
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'PackshotCreator <onboarding@resend.dev>',
        to: email,
        subject: locale === 'fr'
          ? `Votre analyse ROI - ${results.machineNom}`
          : `Your ROI Analysis - ${results.machineNom}`,
        html: buildClientEmailHtml({
          machineNom: results.machineNom,
          economieAnnuelle: results.economieAnnuelle,
          roi5ans: results.roi5ans,
          locale,
        }),
        attachments: [{ filename, content: pdfBuffer }],
      }),

      // Email au proprietaire
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'PackshotCreator <onboarding@resend.dev>',
        to: process.env.ROI_OWNER_EMAIL || 'commercial@packshotcreator.com',
        subject: `[ROI Calculator] ${email} - ${results.machineNom}`,
        html: buildOwnerEmailHtml({ email, locale, inputs, results }),
        attachments: [{ filename, content: pdfBuffer }],
      }),

      // Pipedrive : Person + Deal
      (async () => {
        const personId = await createPerson(email);
        const dealId = await createDeal({
          personId,
          ...results,
          locale,
        });
        return { personId, dealId };
      })(),
    ]);

    // Log des erreurs partielles
    const errors: string[] = [];
    if (clientEmailResult.status === 'rejected') {
      console.error('Client email failed:', clientEmailResult.reason);
      errors.push('client_email');
    }
    if (ownerEmailResult.status === 'rejected') {
      console.error('Owner email failed:', ownerEmailResult.reason);
      errors.push('owner_email');
    }
    if (pipedriveResult.status === 'rejected') {
      console.error('Pipedrive failed:', pipedriveResult.reason);
      errors.push('pipedrive');
    }

    // Si l'email client echoue, c'est une erreur utilisateur
    if (errors.includes('client_email')) {
      return NextResponse.json(
        { success: false, error: 'email_failed', partialErrors: errors },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      ...(errors.length > 0 && { partialErrors: errors }),
    });

  } catch (error) {
    console.error('ROI PDF API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Modification : `Step3Results.tsx`

### 1. Ajouter `trackEmailCapture` a l'import (ligne 17)

AVANT :
```typescript
import { trackCalculatorCompleted, trackCTAClick } from '../lib/analytics';
```

APRES :
```typescript
import { trackCalculatorCompleted, trackCTAClick, trackEmailCapture } from '../lib/analytics';
```

### 2. Remplacer `handleSendPDF` (lignes 82-98)

AVANT :
```typescript
const handleSendPDF = async (email: string) => {
    trackCTAClick('email_capture', results);

    // Generer le PDF
    const pdfBlob = await generatePDF(contentRef, results, locale);

    // TODO: Envoyer via API (Pipedrive + email)
    // Pour l'instant, telechargement direct
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ROI-Analysis-${results.machine.nom.replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
```

APRES :
```typescript
const handleSendPDF = async (email: string) => {
    trackCTAClick('email_capture', results);

    // 1. Generer le PDF client-side
    const pdfBlob = await generatePDF(contentRef, results, locale);

    // 2. Convertir Blob en base64
    const pdfBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // strip "data:application/pdf;base64," prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(pdfBlob);
    });

    // 3. Resume des resultats pour l'API
    const resultsSummary = {
      machineNom: results.machine.nom,
      machinePrix: results.machine.prix,
      economieAnnuelle: results.economieAnnuelle,
      roi5ans: results.roi5ans,
      breakEvenMois: results.breakEvenMois,
      coutTotalActuel: results.coutTotalActuel,
      coutTotalMachine: results.coutTotalMachine,
      isRentable: results.isRentable,
    };

    // 4. Appel API
    const response = await fetch('/api/roi-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        pdfBase64,
        locale,
        inputs,
        results: resultsSummary,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    // 5. Track
    trackEmailCapture(email, results);
  };
```

Note : `inputs` est deja disponible comme prop de `Step3Results`. Le `throw new Error` est intercepte par le `try/catch` dans `EmailCapture.tsx` qui affiche le message d'erreur.

---

## Ordre d'execution

1. `npm install resend`
2. Ajouter les 6 variables d'environnement dans `.env.local`
3. Creer `app/api/roi-pdf/validation.ts` (copier le code ci-dessus)
4. Creer `lib/pipedrive.ts` (copier le code ci-dessus)
5. Creer `lib/email-templates.ts` (copier le code ci-dessus)
6. Creer `app/api/roi-pdf/route.ts` (copier le code ci-dessus)
7. Modifier `Step3Results.tsx` (2 edits decrits ci-dessus)
8. `npm run build` pour verifier absence d'erreurs TypeScript
9. `npm run dev` et tester le flux complet

---

## Verification

1. **Build** : `npm run build` sans erreur TypeScript
2. **Email client** : Remplir le calculateur, entrer un email, verifier que l'email arrive avec le PDF en piece jointe
3. **Email owner** : Verifier que l'email commercial arrive avec le tableau complet des parametres + PDF
4. **Pipedrive** : Verifier dans Pipedrive qu'un Person et un Deal sont crees, avec une note contenant les donnees ROI
5. **Erreur 400** : Tester avec un email invalide → message d'erreur dans l'UI
6. **Resilience** : Si le token Pipedrive est invalide, l'email client doit quand meme etre envoye (grace a `Promise.allSettled`)
7. **Bilingue** : Tester en FR et en EN, verifier les sujets d'email et le contenu HTML

---

## Points d'attention pour la mise en production

- **Domaine Resend** : Verifier `packshotcreator.com` dans Resend (ajouter les records DNS SPF + DKIM)
- **Doublons Pipedrive** : En v1 on cree toujours un nouveau Person. Pour v2, chercher d'abord par email via `GET /v1/persons/search?term={email}`
- **Rate limiting** : Le composant EmailCapture affiche `isSent = true` apres succes, empechant la resoumission. Pour une protection serveur, ajouter un rate limiter (Vercel KV ou in-memory) si besoin.
- **Taille PDF** : Si le PDF depasse 4 MB en base64, reduire le scale dans `PDFGenerator.tsx` (ligne ~96) de 2 a 1.5.
