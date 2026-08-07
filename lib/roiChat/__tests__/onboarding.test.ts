/**
 * Cadrage structuré pré-conversation (chantier UX Seb 07/08) : le profil
 * construit par l'écran de chips doit être capté par le prompt public et
 * pré-remplir le dossier sans passer par le LLM.
 */

import { describe, it, expect } from 'vitest';
import {
  ONBOARDING_QUESTIONS,
  ONBOARDING_SECTEURS,
  ONBOARDING_MESSAGE_PREFIX,
  buildOnboardingMessage,
  buildOnboardingDossier,
  type OnboardingAnswers,
} from '../onboarding';
import { sanitizeDossierUpdate, DOSSIER_GROUPS, dossierCompletion } from '../dossier';
import { SYSTEM_PROMPT_PUBLIC, SYSTEM_PROMPT_INTERNE } from '../systemPrompt';
import { buildToolDefinitions } from '../tools';

const FULL: OnboardingAnswers = {
  situation: 'Avec un prestataire externe',
  secteur: 'Cosmétiques & beauté',
  taille: 'Moins de 30 cm',
  contenus: ['Packshots', 'Vues 360°'],
  casUsage: ['E-commerce & marketplaces', 'Contrôle qualité & production'],
  dejaConseille: 'Non',
};

describe('Questions de cadrage', () => {
  it('6 questions, secteurs = catégories du site + Autre', () => {
    expect(ONBOARDING_QUESTIONS).toHaveLength(6);
    expect(ONBOARDING_SECTEURS).toContain('Automobile & pièces détachées');
    expect(ONBOARDING_SECTEURS).toContain('Aéronautique, défense & sécurité');
    expect(ONBOARDING_SECTEURS).toContain('Santé, médical & pharma');
    expect(ONBOARDING_SECTEURS).toContain('Industrie manufacturière');
    expect(ONBOARDING_SECTEURS[ONBOARDING_SECTEURS.length - 1]).toBe('Autre secteur');
  });

  it('chaque question porte sa raison (micro-pédagogie)', () => {
    for (const q of ONBOARDING_QUESTIONS) {
      expect(q.pourquoi.length).toBeGreaterThan(10);
    }
  });
});

describe('buildOnboardingMessage', () => {
  it('commence par le préfixe reconnu par le prompt et contient toutes les réponses', () => {
    const msg = buildOnboardingMessage(FULL);
    expect(msg.startsWith(ONBOARDING_MESSAGE_PREFIX)).toBe(true);
    expect(msg).toContain('Cosmétiques & beauté');
    expect(msg).toContain('prestataire externe');
    expect(msg).toContain('moins de 30 cm');
    expect(msg).toContain('packshots');
    expect(msg).toContain('contrôle qualité');
    expect(msg).toContain('aucun modèle');
  });

  it('signale un modèle déjà conseillé', () => {
    expect(buildOnboardingMessage({ ...FULL, dejaConseille: 'Oui' })).toContain(
      'déjà conseillé un modèle'
    );
  });
});

describe('buildOnboardingDossier', () => {
  it('pré-remplit les champs correspondants du dossier', () => {
    expect(buildOnboardingDossier(FULL)).toEqual({
      secteur: 'Cosmétiques & beauté',
      situation: 'Avec un prestataire externe',
      tailleProduits: 'Moins de 30 cm',
      typesContenu: ['Packshots', 'Vues 360°'],
      casUsage: ['E-commerce & marketplaces', 'Contrôle qualité & production'],
    });
  });

  it('« Autre secteur » ne pré-remplit pas le secteur (le chat le demandera)', () => {
    expect(buildOnboardingDossier({ ...FULL, secteur: 'Autre secteur' }).secteur).toBeUndefined();
  });
});

describe('casUsage — bout en bout dossier/tool', () => {
  it('sanitizeDossierUpdate accepte casUsage', () => {
    expect(sanitizeDossierUpdate({ casUsage: ['E-commerce', 42] })).toEqual({
      casUsage: ['E-commerce'],
    });
  });

  it('update_dossier public expose casUsage dans son schéma', () => {
    const tool = buildToolDefinitions('public').find((t) => t.name === 'update_dossier');
    expect(Object.keys(tool!.input_schema.properties as object)).toContain('casUsage');
  });

  it('les groupes du panneau couvrent casUsage et alimentent la complétion', () => {
    const keys = DOSSIER_GROUPS.flatMap((g) => g.items.map((i) => i.key));
    expect(keys).toContain('casUsage');
    expect(dossierCompletion({})).toBe(0);
    expect(dossierCompletion(buildOnboardingDossier(FULL))).toBeCloseTo(5 / keys.length, 5);
  });
});

describe('Prompt public — cadrage et minimum vital (piège des prompts jumeaux)', () => {
  it('le prompt PUBLIC connaît le profil de cadrage et les nouvelles règles', () => {
    expect(SYSTEM_PROMPT_PUBLIC).toContain(ONBOARDING_MESSAGE_PREFIX);
    expect(SYSTEM_PROMPT_PUBLIC).toContain('MINIMUM VITAL');
    expect(SYSTEM_PROMPT_PUBLIC).toContain('modifie le calcul OU la sélection du studio');
    expect(SYSTEM_PROMPT_PUBLIC).toContain('Micro-pédagogie');
    expect(SYSTEM_PROMPT_PUBLIC).toContain('Encore deux précisions');
    expect(SYSTEM_PROMPT_PUBLIC).toContain("Cas d'usage des visuels");
  });

  it("le prompt INTERNE n'a pas reçu les sections publiques (régression 07/08)", () => {
    expect(SYSTEM_PROMPT_INTERNE).not.toContain(ONBOARDING_MESSAGE_PREFIX);
    expect(SYSTEM_PROMPT_INTERNE).not.toContain('MINIMUM VITAL');
    expect(SYSTEM_PROMPT_INTERNE).not.toContain('Micro-pédagogie');
  });
});
