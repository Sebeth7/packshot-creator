# Prompt Session - Corrections Phase 2

## Contexte Critique

La Phase 2 a été implémentée mais **plusieurs problèmes majeurs** ont été identifiés :

### ❌ Problèmes à Corriger

1. **Simulateur OPCO ne fonctionne pas**
   - Page : `/fr/academy/simulateur-opco`
   - Le composant existe mais ne fonctionne pas correctement
   - À débugger et corriger

2. **Formulaire Contact NON intégré**
   - Page : `/fr/contact`
   - Le composant `PipedriveContactForm` existe dans `/components/forms/`
   - Mais il n'est PAS utilisé dans la page contact
   - URL Pipedrive WebForm : `https://webforms.pipedrive.com/f/bYWdVxnLz0TYyp1nhD7ozQ4DfK9LrjLf0YPTVMKvZXFY3nxPmDO5cwGWNOis0hrlRh`

3. **Composants inaccessibles**
   - Les pages `/simulateur-opco` et `/selecteur-machines` existent mais ne sont liées nulle part
   - Aucun CTA ni lien dans la navigation

### 🎯 Mission

**AVANT de coder, poser ces questions au user :**

1. **Simulateur OPCO** :
   - Où doit-il être intégré ? (page Academy ? page dédiée ? les deux ?)
   - Quel CTA pour y accéder ? Depuis quelles pages ?

2. **Sélecteur Machines** :
   - Où doit-il être intégré ? (page Studios Photo ? page dédiée ? les deux ?)
   - Quel CTA pour y accéder ?

3. **Formulaire Contact** :
   - Doit-il remplacer le formulaire actuel sur `/contact` ?
   - Y a-t-il d'autres pages où l'intégrer ?

4. **Navigation** :
   - Faut-il ajouter des liens dans le Header/Footer vers ces outils ?

### Fichiers Clés

```
# Composants créés (à vérifier/corriger)
components/simulators/opco/OPCOSimulator.tsx
components/machine-selector/MachineSelector.tsx
components/forms/PipedriveContactForm.tsx

# Pages existantes (à modifier)
app/[lang]/contact/page.tsx
app/[lang]/academy/page.tsx
app/[lang]/studios-photo-automatises/page.tsx

# Pages créées (à intégrer)
app/[lang]/academy/simulateur-opco/page.tsx
app/[lang]/studio-photo/selecteur-machines/page.tsx
```

### Site de Test

**URL Vercel** : https://sysnext.vercel.app
(packshot-creator.com pointe encore vers Webflow)

### Commandes Utiles

```bash
npm run dev      # Dev local
npm run build    # Build
```

## Instructions pour Claude

1. **Lire ce fichier en premier**
2. **Poser TOUTES les questions listées** avant de commencer
3. **Attendre les réponses** du user
4. **Débugger le simulateur OPCO** - comprendre pourquoi il ne fonctionne pas
5. **Intégrer les composants** aux bons endroits selon les réponses
6. **Tester sur sysnext.vercel.app** après chaque fix
