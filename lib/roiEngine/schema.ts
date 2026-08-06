/**
 * Validation zod du dossier de modélisation — c'est CE schéma qui protège
 * l'arithmétique verrouillée : l'IA compose librement les primitives, mais
 * un dossier incohérent est rejeté avant tout calcul.
 */

import { z } from 'zod';

export const cashCostLineSchema = z
  .object({
    id: z.string().min(1),
    label: z.string().min(1),
    frequence: z.enum(['recurrent', 'ponctuel']),
    montantAnnuel: z.number().min(0).max(5_000_000).optional(),
    montant: z.number().min(0).max(5_000_000).optional(),
    pourcentageSupprimable: z.number().min(0).max(100),
    source: z.enum(['client', 'referentiel']),
  })
  .refine(
    (l) => (l.frequence === 'recurrent' ? l.montantAnnuel !== undefined : l.montant !== undefined),
    { message: 'Ligne récurrente : montantAnnuel requis ; ligne ponctuelle : montant requis' }
  );

export const timeLineSchema = z
  .object({
    id: z.string().min(1),
    label: z.string().min(1),
    joursParAn: z.number().min(0).max(5000).optional(),
    minutesParProduit: z.number().min(0).max(480).optional(),
    coutMensuelEmployeur: z.number().min(1500).max(15000).optional(),
    pourcentageLiberable: z.number().min(0).max(100),
  })
  .refine((l) => l.joursParAn !== undefined || l.minutesParProduit !== undefined, {
    message: 'Ligne de temps : joursParAn ou minutesParProduit requis',
  });

export const machineCostInputSchema = z.discriminatedUnion('source', [
  z.object({
    source: z.literal('catalogue'),
    machineId: z.string().min(1),
    mode: z.enum(['achat', 'leasing']),
    montantAccessoires: z.number().min(0).max(100_000).optional(),
    mensualite: z.number().min(100).max(20_000).optional(),
    nbMois: z.number().min(12).max(84).optional(),
  }),
  z
    .object({
      source: z.literal('fourni'),
      mode: z.enum(['achat', 'leasing']),
      prix: z.number().min(1000).max(500_000).optional(),
      mensualite: z.number().min(100).max(20_000).optional(),
      nbMois: z.number().min(12).max(84).optional(),
      label: z.string().optional(),
      machineId: z.string().optional(),
      maintenanceAnnuelle: z.number().min(0).max(50_000).optional(),
      consommablesAnnuels: z.number().min(0).max(50_000).optional(),
      capaciteJour: z.number().min(1).max(1000).optional(),
    })
    .refine((m) => (m.mode === 'achat' ? m.prix !== undefined : true), {
      message: 'Prix fourni en achat : prix requis',
    })
    .refine(
      (m) => (m.mode === 'leasing' ? m.mensualite !== undefined && m.nbMois !== undefined : true),
      { message: 'Prix fourni en leasing : mensualite et nbMois requis' }
    ),
]);

export const functionGainSchema = z
  .object({
    fonction: z.string().min(1),
    label: z.string().min(1),
    minutesParProduit: z.number().min(0).max(120).optional(),
    euroParProduit: z.number().min(0).max(500).optional(),
    coutMensuelEmployeur: z.number().min(1500).max(15000).optional(),
    source: z.string().min(1),
  })
  .refine((g) => g.minutesParProduit !== undefined || g.euroParProduit !== undefined, {
    message: 'Gain par fonction : minutesParProduit ou euroParProduit requis',
  });

export const roiDossierSchema = z
  .object({
    mode: z.enum(['vs-existant', 'contrefactuel', 'differentiel']),
    volumeAnnuel: z.number().min(1).max(1_000_000),
    capaciteJournaliereActuelle: z.number().min(1).max(1000).optional(),
    machine: machineCostInputSchema,
    baselineMachine: machineCostInputSchema.optional(),
    functionGains: z.array(functionGainSchema).max(10).optional(),
    cashLines: z.array(cashCostLineSchema).max(20),
    timeLines: z.array(timeLineSchema).max(20),
    baselineLabel: z.string().min(5).optional(),
    prixReferenceParProduit: z.number().min(0.1).max(10_000).optional(),
    dureeAnalyseMois: z.number().min(12).max(84).optional(),
  })
  // Étiquetage honnête : un contrefactuel sans étiquette de baseline est refusé
  .refine((d) => (d.mode === 'contrefactuel' ? d.baselineLabel !== undefined : true), {
    message:
      'Mode contrefactuel : baselineLabel obligatoire (ex. « scénario prestataire à X €/photo »)',
  })
  // Un contrefactuel ne peut pas se présenter comme des coûts actuels du client
  .refine(
    (d) =>
      d.mode === 'contrefactuel'
        ? d.cashLines.every((l) => l.source === 'referentiel')
        : true,
    {
      message:
        'Mode contrefactuel : toutes les lignes cash doivent venir du référentiel (source: referentiel)',
    }
  )
  .refine(
    (d) =>
      d.mode === 'differentiel'
        ? d.baselineMachine !== undefined && (d.functionGains?.length ?? 0) > 0
        : true,
    { message: 'Mode différentiel : baselineMachine et functionGains requis' }
  );

export type RoiDossierInput = z.infer<typeof roiDossierSchema>;
