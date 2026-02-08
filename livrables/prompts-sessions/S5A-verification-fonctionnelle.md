# SESSION 5A - Verification Fonctionnelle Complete (Browser + Code)

**Modele requis : Claude Opus 4.6**
**Methode : Browser (Chrome MCP) + correction code directe**
**Duree estimee : 1 session (~100K tokens)**
**Prerequis : `npm run dev -- -p 3333` doit tourner**

---

## CONTEXTE

Tu es une session d'implementation autonome sur le site **packshot-creator.com** (Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl FR/EN). Le site est LIVE sur Vercel. Tu travailles sur localhost:3333.

### Working directory
`/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

### Stack
- Next.js 16.1.1 (App Router), React 19, TypeScript strict
- Tailwind CSS v4, next-intl (FR/EN, prefix 'always')
- Framer Motion (animations), Pipedrive WebForms (contact)
- GA4 conditionne au consentement cookies

### Patterns critiques
- **Link** : `import { Link } from '@/i18n/routing'` (JAMAIS `next/link`, sauf `not-found.tsx`)
- **Params** : `{ params }: { params: Promise<{ lang: string }> }`
- **Pages** : Self-contained, PAS d'import Header/Footer (layout.tsx les gere)
- **Animations** : `FadeInView`, `StaggerContainer`, `StaggerItem` depuis `@/components/animations`
- **Reduce motion** : Le PO a "Reduce motion" active sur Mac. Toujours verifier le fallback.
- **Pas d'emojis** -- Lucide icons uniquement

---

## MISSION

Tester visuellement chaque fonctionnalite interactive du site via Chrome, identifier les bugs, et les corriger directement dans le code. Ecrire un rapport de chaque test.

---

## PLAN DE TEST (dans cet ordre)

### TEST 1 : Cookie Banner
**URL** : `http://localhost:3333/fr` (ouvrir en navigation privee ou vider les cookies)
**Composant** : `components/cookies/CookieBanner.tsx`

Verifier :
- [ ] Le banner s'affiche au premier chargement
- [ ] Bouton "Tout accepter" : ferme le banner, stocke le consentement, GA4 se charge
- [ ] Bouton "Tout refuser" : ferme le banner, GA4 ne se charge PAS
- [ ] Bouton "Personnaliser" : ouvre les options detaillees
- [ ] Le banner ne reapparait pas apres un choix (cookie persiste)
- [ ] Lien "Gestion des cookies" dans le footer : reouvre le banner
- [ ] Verifier que le cookie banner est conforme visuellement (pas de debordement, responsive)

**Si bug** : corriger dans `CookieBanner.tsx` et/ou `GoogleAnalytics.tsx`

### TEST 2 : Formulaire de Contact (Pipedrive)
**URL** : `http://localhost:3333/fr/contact`
**Composant** : `components/forms/PipedriveContactForm.tsx`

Verifier :
- [ ] Le formulaire Pipedrive se charge correctement (iframe ou script)
- [ ] Les champs sont visibles et interactifs
- [ ] Le formulaire est responsive (tester en 375px)
- [ ] Le parametre `?subject=demo` pre-remplit un champ si applicable
- [ ] La page contact a les informations de contact visibles (tel, email, adresse)
- [ ] Le CTA "Demander une demo" du header mene bien a /contact

**Si bug** : corriger dans `PipedriveContactForm.tsx` et/ou `app/[lang]/contact/page.tsx`

### TEST 3 : Tous les CTA principaux
**Methode** : Naviguer sur chaque page principale et cliquer chaque bouton CTA

Pages a tester :
- Homepage `/fr` : "Demander une demo gratuite", "Decouvrir nos studios", "Reserver une demo", "Decouvrir toutes les industries", "Voir tous les articles", "Calculer mon ROI"
- Studios `/fr/studios-photo-automatises` : "Calculer mon ROI", "Trouver ma machine", liens "En savoir plus" des machines
- IA `/fr/ia-photo-produit` : CTA BlendAI, "Demander une demo"
- Academy `/fr/academy` : CTA formations, simulateur
- Fiches machines `/fr/studio-photo/alphashot-pro-g2` : tous les CTA

Verifier pour chaque CTA :
- [ ] Le lien pointe vers la bonne destination
- [ ] Pas de 404
- [ ] Les liens vers /contact incluent le bon `?subject=` si applicable
- [ ] Les liens externes (orbitvu.com, blendai.studio) s'ouvrent en nouvelle fenetre

**Si bug** : corriger les href dans les pages concernees

### TEST 4 : Calculateur ROI (Parcours Complet)
**URL** : `http://localhost:3333/fr/studios-photo-automatises` (section ROI)
**Composant** : `components/calculators/ROICalculator/`

Parcours a tester :
- [ ] Step 1 : Remplir nombre d'operateurs, cout, pourcentage temps, prestataire externe, photos/jour
- [ ] Les sliders et inputs reagissent correctement
- [ ] Les validations fonctionnent (pas de valeurs negatives, etc.)
- [ ] Step 2 : Volume annuel, taille produits, budget equipement
- [ ] Step 3 : Les resultats s'affichent (HeroMetrics, BreakEvenTimeline, ComparisonTable)
- [ ] La machine recommandee s'affiche avec ses details
- [ ] Le bouton "Precedent" permet de revenir en arriere
- [ ] Le formulaire email capture fonctionne (verifier le DOM, pas besoin de soumettre reellement)
- [ ] Responsive : tester en 375px le wizard complet

**Note** : Il y a un TODO dans Step3Results.tsx pour l'envoi API Pipedrive. Ne PAS implementer cet envoi, juste verifier que le parcours UI fonctionne.

**Si bug** : corriger dans les fichiers du ROICalculator

### TEST 5 : Simulateur OPCO
**URL** : `http://localhost:3333/fr/academy/simulateur-opco`
**Composant** : `components/simulators/opco/`

Parcours a tester :
- [ ] Step 1 Profil : Selection du type de structure
- [ ] Step 2 Entreprise : Taille, secteur
- [ ] Step 3 Formation : Selection de la formation
- [ ] Step 4 Resultat : Montant eligible affiche, details du calcul
- [ ] Navigation avant/arriere entre les etapes
- [ ] Responsive 375px

**Si bug** : corriger dans les fichiers du simulateur OPCO

### TEST 6 : Selecteur de Machines
**URL** : `http://localhost:3333/fr/studio-photo/selecteur-machines`
**Composant** : `components/machine-selector/`

Verifier :
- [ ] Le selecteur se charge (dynamic import)
- [ ] Les filtres fonctionnent (taille, type de produit, budget)
- [ ] Les cartes machines s'affichent avec les bonnes infos
- [ ] Le modal de detail s'ouvre au clic sur une carte
- [ ] Les liens "En savoir plus" menent aux bonnes fiches machines
- [ ] Responsive 375px

**Note** : Les images sont des placeholders SVG (connu, hors scope de cette session)

**Si bug** : corriger dans les fichiers du machine-selector

### TEST 7 : Switch de Langue FR/EN
**Methode** : Sur chaque type de page, cliquer sur le switch de langue et verifier

Pages a tester :
- Homepage `/fr` -> `/en`
- Studios `/fr/studios-photo-automatises` -> `/en/studios-photo-automatises`
- Fiche machine `/fr/studio-photo/alphashot-pro-g2` -> `/en/studio-photo/alphashot-pro-g2`
- Blog `/fr/blog` -> `/en/blog`
- Contact `/fr/contact` -> `/en/contact`

Verifier pour chaque switch :
- [ ] L'URL change correctement
- [ ] Le contenu est traduit (titres, textes, boutons)
- [ ] Le header/footer sont traduits
- [ ] Le switch inverse fonctionne (EN -> FR)

**Si bug** : verifier les fichiers de traduction dans `messages/` et le composant de switch dans `Header.tsx`

### TEST 8 : Navigation Mobile
**Methode** : Redimensionner le navigateur a 375px de large

Verifier :
- [ ] Le menu hamburger apparait
- [ ] Le menu s'ouvre au clic
- [ ] Tous les liens du menu fonctionnent
- [ ] Les sous-menus (Solutions, Academy) se deploient
- [ ] Le menu se ferme apres un clic sur un lien
- [ ] Le bouton "Demander une demo" est visible et fonctionnel
- [ ] Le switch de langue est accessible

**Si bug** : corriger dans `components/layout/Header.tsx`

### TEST 9 : Liens Externes
**Methode** : Verifier dans le code que tous les liens externes sont corrects

Liens a verifier :
- [ ] orbitvu.com (ou orbitvu.co) -- site Orbitvu officiel
- [ ] blendai.studio -- solution IA
- [ ] LinkedIn PackshotCreator
- [ ] Liens vers les guides Webflow

Verifier :
- [ ] Les URLs sont correctes (pas de 404)
- [ ] `target="_blank"` + `rel="noopener noreferrer"` sur les liens externes
- [ ] Pas de liens morts dans le footer

**Methode** : Grep dans le code pour `https://` et verifier les URLs

### TEST 10 : Verification des ancres (#)
**Methode** : Verifier les liens internes avec des ancres

- [ ] Homepage : les liens avec # (ex: vers FAQ, vers sections) fonctionnent
- [ ] Les ancres existent dans le DOM (id correspondant)

---

## REGLES DE CORRECTION

1. **Corriger uniquement les bugs fonctionnels** - pas de refactoring, pas d'ajout de features
2. **`npm run build`** doit passer apres chaque correction
3. **Les 366 tests existants** ne doivent pas casser
4. **Chaque correction** : noter dans le rapport (fichier, ligne, nature du bug, fix applique)
5. **Si un bug est trop complexe** (necessite un changement architectural), le noter dans le rapport sans corriger

---

## OUTPUT ATTENDU

A la fin de la session, ecrire un rapport dans :
`livrables/prompts-sessions/S5A-RAPPORT.md`

Format du rapport :
```markdown
# Rapport Session 5A - Verification Fonctionnelle

## Resume
- Tests passes : X/10
- Bugs trouves : X
- Bugs corriges : X
- Bugs non corriges (complexes) : X

## Detail par test

### TEST 1 : Cookie Banner
- Statut : PASS / FAIL
- Bugs trouves : [description]
- Corrections : [fichier:ligne, nature du fix]

[... pour chaque test ...]

## Bugs non corriges
| Bug | Raison | Fichier | Impact |
|---|---|---|---|

## Recommandations pour sessions suivantes
[...]
```

---

## REGLES ANTI AUTO-COMPACT

1. **Ne teste pas tout d'un coup** : fais les tests 1 a 5 d'abord, ecris un rapport intermediaire dans `livrables/S5A-rapport-intermediaire.md`, puis continue avec 6 a 10
2. **Ecris d'abord, analyse ensuite** : apres chaque test, note immediatement le resultat dans le rapport
3. **Si le contexte approche des 80%** : ecris le rapport final avec ce qui a ete fait et STOP
4. **Pas d'agents en background** pour les tests browser (ils ne peuvent pas utiliser Chrome MCP)
