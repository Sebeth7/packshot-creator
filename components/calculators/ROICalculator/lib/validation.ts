import { z } from 'zod';

export const step1Schema = z.object({
  nbOperateurs: z.number()
    .min(0.5, 'Minimum 0.5 opérateur')
    .max(20, 'Maximum 20 opérateurs'),
  pourcentageTemps: z.number()
    .min(10, 'Minimum 10%')
    .max(100, 'Maximum 100%'),
  utiliseSolutionExterne: z.boolean(),
  budgetMensuelExterne: z.number()
    .min(0)
    .max(50000)
    .optional(),
  capaciteJournaliere: z.number()
    .min(5, 'Minimum 5 photos/jour')
    .max(300, 'Maximum 300 photos/jour'),
});

export const step2Schema = z.object({
  photosAnnuelles: z.number()
    .min(100, 'Minimum 100 photos/an')
    .max(100000, 'Maximum 100 000 photos/an'),
  budgetEquipement: z.number()
    .min(0)
    .max(50000)
    .optional(),
  repartition: z.object({
    packshot: z.number().min(0).max(100),
    lifestyle: z.number().min(0).max(100),
  }).refine(data => data.packshot + data.lifestyle === 100, {
    message: 'Le total doit faire 100%',
  }),
  tailleProduitsCategory: z.enum(['petit', 'moyen', 'grand', 'tres-grand']),
});

export const fullSchema = step1Schema.merge(step2Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type FullFormData = z.infer<typeof fullSchema>;
