# Prompt Session - Vérification Phase 2

## Objectif
Vérifier et valider les implémentations de la Phase 2 après compaction de contexte.

## Fichiers à lire en premier
1. `OPCO_Qualiopi_Specs_Simulateur.md` - Specs complètes du simulateur OPCO
2. `PLAN_ACTION_MASTER.md` - Plan d'action global

## Composants implémentés à vérifier

### 1. Sélecteur de Machines (`/components/machine-selector/`)
- [ ] Vérifier que tous les 20 machines Orbitvu sont présentes dans `lib/machines.ts`
- [ ] Vérifier les filtres (catégorie, taille, budget)
- [ ] Vérifier le responsive
- [ ] Page : `/app/[lang]/studio-photo/selecteur-machines/page.tsx`
- [ ] Tests E2E : `/e2e/machine-selector.spec.ts`

### 2. Formulaire Contact Pipedrive (`/components/forms/`)
- [ ] Vérifier l'intégration du WebForm Pipedrive
- [ ] Page : `/app/[lang]/contact/page.tsx`
- [ ] Tests E2E : `/e2e/contact-form.spec.ts`

### 3. Simulateur OPCO (`/components/simulators/opco/`)

**Structure à vérifier :**
```
components/simulators/opco/
├── index.ts
├── OPCOSimulator.tsx       # Composant principal (wizard 4 étapes)
├── lib/
│   ├── types.ts            # Types TypeScript
│   ├── constants.ts        # OPCO_DATA, FORMATIONS, LABELS
│   └── eligibility.ts      # Logique de calcul d'éligibilité
└── steps/
    ├── Step1Profil.tsx     # Statut professionnel
    ├── Step2Entreprise.tsx # Effectif, secteur, cotisations
    ├── Step3Formation.tsx  # Sélection formation + lien pro
    └── Step4Resultat.tsx   # Résultat + formulaire contact
```

**Points de vérification critiques :**

1. **constants.ts** - Vérifier contre OPCO_Qualiopi_Specs_Simulateur.md :
   - [ ] 11 OPCO avec leurs plafonds 2026 corrects
   - [ ] Mapping secteur → OPCO correct
   - [ ] 6 formations avec prix HT corrects

2. **eligibility.ts** - Vérifier l'arbre de décision :
   - [ ] Cas 1 : Salarié → OPCO selon secteur → Éligible
   - [ ] Cas 2 : Dirigeant → OPCO selon secteur → Éligible
   - [ ] Cas 3 : Auto-entrepreneur → Redirection FAF/AGEFICE
   - [ ] Cas 4 : Demandeur emploi → Redirection CPF/France Travail
   - [ ] Cas 5 : Formation hors champ pro → Redirection CPF
   - [ ] Cas 6 : Cotisations non à jour → Avertissement
   - [ ] Cas 7 : TPE (< 11) → Plafonds favorables + message adapté

3. **Step4Resultat.tsx** :
   - [ ] Affichage correct des estimations financières
   - [ ] Formulaire de contact avec tous les champs
   - [ ] Lien OPCO externe correct

4. **Page et intégration** :
   - [ ] Page accessible : `/fr/academy/simulateur-opco`
   - [ ] CTA présent sur `/fr/academy` ("Vérifier mon Éligibilité OPCO")

5. **Tests E2E** :
   - [ ] `/e2e/opco-simulator.spec.ts` - Exécuter et vérifier passage

## Actions si erreurs trouvées

1. Corriger les erreurs identifiées
2. Relancer le build : `npm run build`
3. Exécuter les tests E2E : `npm run test:e2e`

## Tâche optionnelle

Si temps disponible et validation OK :
- Implémenter le **Slider Avant/Après** (`/components/BeforeAfterSlider/`)
- Voir specs dans `PROMPT_SESSION_PHASE2.md` section "4. Slider Avant/Après"

## Commandes utiles

```bash
# Build
npm run build

# Tests E2E (tous)
npm run test:e2e

# Tests E2E spécifiques
npx playwright test e2e/opco-simulator.spec.ts

# Dev server
npm run dev
```

## État actuel (2026-01-29)

| Tâche | Statut | Notes |
|-------|--------|-------|
| Sélecteur Machines | ✅ Complété | Build OK, tests E2E créés |
| Formulaires Pipedrive | ✅ Complété | Build OK, tests E2E créés |
| Simulateur OPCO | ✅ Complété | Build OK, tests E2E créés, CTA ajouté |
| Slider Avant/Après | ⏸️ Optionnel | Non démarré |

**Note importante** : L'implémentation a été faite avec contexte compacté. Une vérification approfondie des specs OPCO est recommandée pour s'assurer de la cohérence des données (plafonds, secteurs, messages).
