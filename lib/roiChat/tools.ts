/**
 * Tools serveur du chat ROI (CDC §3). Le mode (interne/public) est déterminé
 * CÔTÉ SERVEUR par la session — jamais par un paramètre client.
 *
 * Garde-fous architecturaux mode public :
 *  - les prix catalogue ne sont JAMAIS dans les retours de tools publics
 *    (filterResultsForPublic + specs sans prix dans compare_machines) ;
 *  - price_list n'existe qu'en interne (le tool n'est pas déclaré en public,
 *    et son exécution revérifie le mode par défense en profondeur).
 */

import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import {
  selectEligibleMachines,
  CONTENT_TYPE_LABELS,
} from '@/components/calculators/ROICalculator/lib/machineSelector';
import type {
  ProductSizeCategory,
  ContentType,
} from '@/components/calculators/ROICalculator/lib/types';
import { computeRoi, filterResultsForPublic, roiDossierSchema } from '@/lib/roiEngine';
import type { RoiDossier } from '@/lib/roiEngine';
import { leasingMonthly, LEASING_MONTHS } from '@/lib/leasing';
import { getMarketCosts, getFunctionGains } from './referentiels';
import { sanitizeDossierUpdate, type RoiPublicDossier } from './dossier';
import type { ChatToolDefinition } from './provider';

export type ChatMode = 'interne' | 'public';

// ===== Schéma JSON du dossier de modélisation (miroir de roiDossierSchema) =====

const MACHINE_COST_SCHEMA = {
  type: 'object',
  description:
    "Coût machine. source='catalogue' : prix catalogue par machineId. source='fourni' : prix donné par l'utilisateur (devis, remise, occasion) — machineId optionnel pour récupérer les SPECS catalogue (capacité) sans toucher au prix.",
  properties: {
    source: { type: 'string', enum: ['catalogue', 'fourni'] },
    machineId: { type: 'string', description: 'Id machine catalogue (ex. alphashot-pro-g2)' },
    mode: { type: 'string', enum: ['achat', 'leasing'] },
    prix: { type: 'number', description: "Prix d'achat fourni (source='fourni', mode achat)" },
    mensualite: { type: 'number', description: 'Mensualité leasing € HT' },
    nbMois: { type: 'number', description: 'Durée leasing en mois (12-84)' },
    label: { type: 'string', description: 'Libellé si prix fourni (ex. « XL G2 MDC devis »)' },
    montantAccessoires: { type: 'number' },
    maintenanceAnnuelle: { type: 'number' },
    consommablesAnnuels: { type: 'number' },
    capaciteJour: { type: 'number' },
  },
  required: ['source', 'mode'],
} as const;

const CALCULATE_INPUT_SCHEMA = {
  type: 'object',
  description: 'Dossier de modélisation complet — le moteur serveur calcule, jamais toi.',
  properties: {
    mode: {
      type: 'string',
      enum: ['vs-existant', 'contrefactuel', 'differentiel'],
      description:
        "vs-existant : coûts actuels déclarés par le client. contrefactuel : création d'activité, baseline construite depuis le référentiel coûts de marché (baselineLabel OBLIGATOIRE, lignes source='referentiel'). differentiel : machine vs machine, gains par fonction.",
    },
    volumeAnnuel: { type: 'number', description: 'Produits/an visés' },
    capaciteJournaliereActuelle: {
      type: 'number',
      description: 'Produits/jour/opérateur déclarés (contrôle de cohérence volume)',
    },
    machine: MACHINE_COST_SCHEMA,
    baselineMachine: { ...MACHINE_COST_SCHEMA, description: 'Mode différentiel : machine de référence' },
    functionGains: {
      type: 'array',
      description: 'Mode différentiel : gains des fonctions supplémentaires (issus du tool function_gains)',
      items: {
        type: 'object',
        properties: {
          fonction: { type: 'string' },
          label: { type: 'string' },
          minutesParProduit: { type: 'number' },
          euroParProduit: { type: 'number' },
          coutMensuelEmployeur: { type: 'number' },
          source: { type: 'string', description: 'Provenance du chiffre (référentiel, donnée client…)' },
        },
        required: ['fonction', 'label', 'source'],
      },
    },
    cashLines: {
      type: 'array',
      description:
        'Coûts CASH du scénario de référence (prestataires, équipement, studio…). JAMAIS de salaires internes ici (ils vont en timeLines).',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
          frequence: { type: 'string', enum: ['recurrent', 'ponctuel'] },
          montantAnnuel: { type: 'number', description: '€/an si récurrent' },
          montant: { type: 'number', description: '€ au mois 0 si ponctuel (investissement évité)' },
          pourcentageSupprimable: { type: 'number', description: '0-100 : part réellement supprimée par la machine' },
          source: { type: 'string', enum: ['client', 'referentiel'] },
        },
        required: ['id', 'label', 'frequence', 'pourcentageSupprimable', 'source'],
      },
    },
    timeLines: {
      type: 'array',
      description:
        "Temps INTERNE (salariés) consacré à l'activité. Vide si 100 % sous-traité. joursParAn OU minutesParProduit.",
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
          joursParAn: { type: 'number' },
          minutesParProduit: { type: 'number' },
          coutMensuelEmployeur: { type: 'number', description: 'Coût employeur mensuel (défaut 4 000 €)' },
          pourcentageLiberable: { type: 'number', description: '0-100' },
        },
        required: ['id', 'label', 'pourcentageLiberable'],
      },
    },
    baselineLabel: {
      type: 'string',
      description:
        'OBLIGATOIRE en contrefactuel : étiquette honnête (ex. « par rapport à un scénario prestataire à 25 €/photo »), jamais « vos coûts actuels »',
    },
    prixReferenceParProduit: { type: 'number', description: 'Repli coût de revient : prix de référence €/produit' },
    dureeAnalyseMois: { type: 'number' },
  },
  required: ['mode', 'volumeAnnuel', 'machine', 'cashLines', 'timeLines'],
} as const;

// ===== Définitions =====

export function buildToolDefinitions(mode: ChatMode): ChatToolDefinition[] {
  const tools: ChatToolDefinition[] = [
    {
      name: 'calculate',
      description:
        "Calcule le ROI à partir du dossier de modélisation. C'est le SEUL endroit où l'arithmétique se fait — ne calcule jamais toi-même un ROI, un break-even ou une économie. Retourne les métriques (économie cash, temps libéré, break-even, ROI, capacité, alertes). Si le dossier est invalide, l'erreur retournée explique quoi corriger.",
      input_schema: CALCULATE_INPUT_SCHEMA as unknown as Record<string, unknown>,
    },
    {
      name: 'compare_machines',
      description:
        'Liste les machines du catalogue éligibles pour un besoin (volume, taille produits, types de contenu) avec leurs specs (capacité, dimensions max, fonctions, niveau d’automatisation), triées par pertinence. Utilise-le pour recommander un modèle.',
      input_schema: {
        type: 'object',
        properties: {
          volumeAnnuel: { type: 'number' },
          tailleProduitsCategory: {
            type: 'string',
            enum: ['petit', 'moyen', 'grand', 'tres-grand'],
            description: 'petit <30cm, moyen 30-60cm, grand 60-150cm, tres-grand >150cm',
          },
          typesContenu: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['packshot', '360', 'video', 'ghost-mannequin', 'flat-lay', 'lifestyle'],
            },
          },
          poidsKg: { type: 'number', description: 'Poids max des produits en kg' },
        },
        required: ['volumeAnnuel', 'tailleProduitsCategory'],
      },
    },
    {
      name: 'market_reference',
      description:
        "Référentiel des coûts de marché (prix/photo prestataire par type de contenu, studio/jour, photographe salarié) pour construire une baseline contrefactuelle. Chaque entrée porte un statut : 'valide' ou 'draft' (estimation à confirmer — étiquette-la comme telle).",
      input_schema: { type: 'object', properties: {} },
    },
    {
      name: 'function_gains',
      description:
        "Référentiel des gains par typologie de fonction (mesure/pesée+données, packshot, 360°, vidéo, ghost mannequin) en min/produit et €/produit, pour les analyses différentielles. Statut 'valide' ou 'draft' par entrée.",
      input_schema: { type: 'object', properties: {} },
    },
  ];

  if (mode === 'public') {
    tools.push({
      name: 'update_dossier',
      description:
        "Met à jour le panneau « Votre dossier » affiché au client. Appelle-le à CHAQUE information de qualification nouvelle ou corrigée (uniquement les champs concernés — ils écrasent l'existant). N'y mets jamais de montant lié aux prix des studios.",
      input_schema: {
        type: 'object',
        properties: {
          secteur: { type: 'string', description: "Secteur d'activité" },
          situation: {
            type: 'string',
            description: 'Situation actuelle (production interne / prestataire / mixte / création d\'activité)',
          },
          volumeAnnuel: { type: 'number', description: 'Produits/an visés' },
          croissance: { type: 'string', description: 'Croissance prévue' },
          typesContenu: { type: 'array', items: { type: 'string' }, description: 'packshot, 360°, vidéo…' },
          tailleProduits: { type: 'string', description: 'petit / moyen / grand / très grand (+ précision)' },
          prestataire: { type: 'string', description: 'Budget ou prix/photo du prestataire, part du flux' },
          tempsInterne: { type: 'string', description: 'Personnes, part du temps, coût employeur' },
          financement: { type: 'string', description: 'Achat ou leasing (mensualité/durée si connues)' },
          machineEnvisagee: { type: 'string', description: 'Modèle envisagé ou recommandé' },
          autres: { type: 'array', items: { type: 'string' }, description: 'Autres informations notables' },
        },
      },
    });
  }

  if (mode === 'interne') {
    tools.push({
      name: 'price_list',
      description:
        'MODE INTERNE UNIQUEMENT — grille tarifaire catalogue complète : prix d’achat HT, mensualité leasing publique (règle ×1,3/60 mois), statut (délistée, sur devis). Sert aux comparaisons remise vs catalogue et aux marges de négociation.',
      input_schema: { type: 'object', properties: {} },
    });
  }

  return tools;
}

// ===== Exécution =====

function machineSpecs(m: (typeof MACHINES)[number], mode: ChatMode) {
  return {
    id: m.id,
    nom: m.nom,
    capaciteJour: m.capaciteJour,
    tailleMax: m.tailleMax,
    poidsMax: m.poidsMax,
    dimensionsMax: m.dimensionsMax,
    features: m.features.map((f) => CONTENT_TYPE_LABELS[f]?.fr ?? f),
    automationLevel: m.automationLevel,
    volumeRecommande: m.volumeRange,
    delisted: m.delisted ?? false,
    // Prix uniquement en interne — garde-fou architectural
    ...(mode === 'interne'
      ? {
          prixAchatHT: m.prix,
          leasingMensualitePublique: leasingMonthly(m.prix),
          leasingDureeMois: LEASING_MONTHS,
          prixSurDevis: m.prixSurDevis ?? false,
        }
      : {}),
  };
}

export interface ToolExecutionResult {
  content: string;
  isError: boolean;
  /** Résultats de calcul complets pour l'UI (affichage composants) */
  calcResults?: unknown;
  /** Mise à jour du dossier vivant (mode public) à relayer en SSE */
  dossierUpdate?: Partial<RoiPublicDossier>;
}

export function executeTool(name: string, input: unknown, mode: ChatMode): ToolExecutionResult {
  try {
    switch (name) {
      case 'calculate': {
        const parsed = roiDossierSchema.safeParse(input);
        if (!parsed.success) {
          return {
            content: JSON.stringify({
              error: 'Dossier de modélisation invalide',
              details: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
            }),
            isError: true,
          };
        }
        // Le type zod inféré est plus lâche que l'union discriminée TS ;
        // les refinements du schéma garantissent un dossier valide.
        const results = computeRoi(parsed.data as RoiDossier);
        const exposed = mode === 'interne' ? results : filterResultsForPublic(results);
        return { content: JSON.stringify(exposed), isError: false, calcResults: exposed };
      }

      case 'compare_machines': {
        const q = input as {
          volumeAnnuel: number;
          tailleProduitsCategory: ProductSizeCategory;
          typesContenu?: ContentType[];
          poidsKg?: number;
        };
        const eligible = selectEligibleMachines(
          {
            annualVolume: q.volumeAnnuel,
            contentTypes: q.typesContenu ?? ['packshot'],
            productWeight: q.poidsKg,
          },
          q.tailleProduitsCategory
        );
        return {
          content: JSON.stringify({
            machines: eligible.map((e) => ({
              ...machineSpecs(e.machine, mode),
              score: e.score,
              atouts: e.matchingCriteria,
              limites: e.missingCriteria,
            })),
          }),
          isError: false,
        };
      }

      case 'update_dossier': {
        const update = sanitizeDossierUpdate(input);
        return {
          content: JSON.stringify({ ok: true, champsPrisEnCompte: Object.keys(update) }),
          isError: false,
          dossierUpdate: update,
        };
      }

      case 'market_reference':
        return { content: JSON.stringify(getMarketCosts()), isError: false };

      case 'function_gains':
        return { content: JSON.stringify(getFunctionGains()), isError: false };

      case 'price_list': {
        if (mode !== 'interne') {
          // Défense en profondeur : le tool n'est pas déclaré en public,
          // mais on revérifie ici quoi qu'il arrive.
          return { content: JSON.stringify({ error: 'Tool indisponible' }), isError: true };
        }
        return {
          content: JSON.stringify({
            regleLeasingPublique: `mensualité = prix × 1,3 / ${LEASING_MONTHS} mois, arrondie aux 5 € supérieurs`,
            machines: MACHINES.map((m) => ({
              id: m.id,
              nom: m.nom,
              prixAchatHT: m.prix,
              prixSurDevis: m.prixSurDevis ?? false,
              delisted: m.delisted ?? false,
              leasingMensualitePublique: leasingMonthly(m.prix),
              capaciteJour: m.capaciteJour,
            })),
          }),
          isError: false,
        };
      }

      default:
        return { content: JSON.stringify({ error: `Tool inconnu : ${name}` }), isError: true };
    }
  } catch (err) {
    return {
      content: JSON.stringify({ error: err instanceof Error ? err.message : 'Erreur interne' }),
      isError: true,
    };
  }
}
