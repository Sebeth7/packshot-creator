import { z } from 'zod/v4';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';

/**
 * Corps de `POST /api/roi-pdf`, validé au runtime (P0 sécurité, G5 du
 * 11/10/2026). Avant cette date, la route ne s'appuyait que sur un type
 * TypeScript : n'importe quel corps était accepté, et `machineNom` reçu du
 * navigateur entrait tel quel dans l'objet et le HTML d'un e-mail envoyé à
 * une adresse libre.
 *
 * Deux appelants, tous deux dans le calculateur :
 * - `Step3Results.tsx` (envoi du PDF par e-mail) : résultats complets ;
 * - `MachineRecommendation.tsx` (« être recontacté ») : `contactRequest: true`,
 *   données de calcul à zéro, catégorie vide, aucun type de contenu.
 * Les bornes reprennent celles du formulaire (`ROICalculator/lib/validation.ts`)
 * en les élargissant, pour ne refuser aucune demande légitime ; les résultats
 * calculés sont seulement contraints à des nombres finis et raisonnables.
 *
 * La machine est une liste fermée : l'identifiant doit exister dans le
 * catalogue du calculateur, et le nom affiché est celui du catalogue, jamais
 * celui envoyé par le navigateur.
 */

const IDS_MACHINES = MACHINES.map((m) => m.id) as [string, ...string[]];

/** Nom de la machine selon le catalogue du calculateur. */
export function nomMachineRoi(machineId: string): string {
  return MACHINES.find((m) => m.id === machineId)?.nom ?? machineId;
}

const SANS_CONTROLE = /^[^\u0000-\u001f\u007f]*$/;
const ligne = (max: number) => z.string().max(max).regex(SANS_CONTROLE);
const MONTANT_MAX = 100_000_000;
const montant = z.number().min(-MONTANT_MAX).max(MONTANT_MAX);
const positif = (max: number) => z.number().min(0).max(max);

export const TYPES_CONTENU_ROI = ['packshot', '360', 'video', 'ghost-mannequin', 'flat-lay', 'lifestyle'] as const;
export const CATEGORIES_TAILLE_ROI = ['petit', 'moyen', 'grand', 'tres-grand'] as const;

export const roiPdfCalculatorSchema = z.object({
  // Inputs
  nbOperateurs: positif(100),
  pourcentageTemps: positif(100),
  photosAnnuelles: positif(10_000_000),
  // Vide pour la demande « être recontacté »
  tailleProduitsCategory: z.union([z.enum(CATEGORIES_TAILLE_ROI), z.literal('')]),
  typesContenu: z.array(z.enum(TYPES_CONTENU_ROI)).max(TYPES_CONTENU_ROI.length),
  leasingActif: z.boolean(),
  leasingMensualite: positif(MONTANT_MAX).optional(),
  leasingNbMois: positif(240).optional(),
  investissementInitialActif: z.boolean(),
  montantInvestissementInitial: positif(MONTANT_MAX).optional(),
  montantAccessoires: positif(MONTANT_MAX).optional(),
  // Machine (liste fermée) ; le nom reçu est ignoré
  machineNom: ligne(200).optional(),
  machineId: z.enum(IDS_MACHINES),
  // Résultats
  economieAnnuelle: montant,
  tempsLibereJours: positif(1_000_000).optional(),
  valeurTempsLibere: montant.optional(),
  roi5ans: montant,
  // Sans plafond : `calculations.ts` divise l'investissement par un flux annuel
  // qui peut être très faible. Un plafond de 10 000 mois refusait des calculs
  // légitimes (0,25 % d'un échantillon d'entrées valides du formulaire, 12/10).
  breakEvenMois: z.number().min(0).nullable(),
  economie5ans: montant,
  isRentable: z.boolean(),
  isLeasing: z.boolean(),
  coutTotalActuel: montant,
  coutTotalMachine: montant,
});

export const roiPdfRequestSchema = z
  .object({
    email: z.email().max(254).optional(),
    phone: ligne(50).optional(),
    company: ligne(200).optional(),
    contactRequest: z.boolean().optional(),
    calculatorData: roiPdfCalculatorSchema,
    locale: z.enum(['fr', 'en', 'de-ch']).default('fr'),
    // Attribution first-touch de session (mesure GEO : trafic IA / SEO / campagnes)
    attribution: z
      .object({
        utmSource: z.string().max(200).optional(),
        utmMedium: z.string().max(200).optional(),
        utmCampaign: z.string().max(200).optional(),
        utmTerm: z.string().max(200).optional(),
        utmContent: z.string().max(200).optional(),
        referrer: z.string().max(500).optional(),
        landingPage: z.string().max(500).optional(),
      })
      .optional(),
    // Champ piège : invisible pour un visiteur ; rempli = automate.
    siteWeb: z.string().max(200).optional(),
  })
  .refine((d) => !!d.email || !!d.phone, { message: 'Email or phone is required', path: ['email'] });

export type RoiPdfRequest = z.output<typeof roiPdfRequestSchema>;
