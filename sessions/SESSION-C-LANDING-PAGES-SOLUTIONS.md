# Session C — Creation des landing pages Solutions par besoin

## Prerequis

Cette session ne peut demarrer QU'APRES la session B, qui aura produit :
- Le fichier `sessions/RESEARCH-LANDING-PAGES-SOLUTIONS.md` avec les requetes validees
- La validation de l'utilisateur sur les pages a creer

## Contexte

Tu travailles sur le site PackshotCreator — distributeur exclusif
Orbitvu (systemes photo automatises) pour la France et la Suisse.

- Framework : Next.js App Router, next-intl (FR/EN), Tailwind CSS v4, Framer Motion
- URL : https://sysnext.vercel.app/fr
- Dossier : /Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator

## Skills a activer

- `/frontend-design` — Design UI premium
- `/page-cro` — Conversion
- `/copywriting` — Redaction du contenu
- `/seo` ou `/geo` — Optimisation des pages pour les requetes ciblees

## Ta mission

Creer les landing pages verticales organisees par BESOIN (pas par secteur).
Ce sont des pages transversales qui montrent comment nos systemes resolvent
un probleme specifique QUEL QUE SOIT le secteur.

### Architecture proposee (a valider avec recherche session B)

```
/solutions/                        → Hub page (optionnel)
/solutions/controle-qualite-visuel → QC industrielle
/solutions/documentation-mro       → Maintenance, Reparation, Revision
/solutions/catalogage-pieces       → Aftermarket, SAV, inventaire
/solutions/formation-technique-3d  → AR/VR, manuels interactifs
```

### Approche technique

**Option A — Pages statiques independantes**
Chaque page est un fichier page.tsx autonome. Plus simple, plus de controle.
Adapte si les pages ont des structures tres differentes.

**Option B — Template factorise (comme industrie)**
Un template commun `/solutions/[slug]/page.tsx` avec donnees dans un fichier data.
Adapte si les pages ont une structure similaire.

→ A determiner apres analyse des requetes (session B).

### Structure de contenu par page (proposition)

1. **Hero** — Probleme metier adresse (pas le produit)
2. **Le probleme en chiffres** — Stats sectorielles (taux d'erreur, couts, etc.)
3. **Comment nos systemes resolvent ca** — Demo du workflow Orbitvu
4. **Secteurs concernes** — Liens vers les pages industrie correspondantes
5. **Systemes recommandes** — Cartes machines (reutiliser SECTOR_MACHINE_MAP)
6. **FAQ** — Questions specifiques au besoin
7. **CTA** — Pattern ADN

### Maillage interne CRITIQUE

Ces pages doivent creer un reseau de liens :
- Depuis les pages industrie → vers la page solution correspondante
- Depuis la page solution → vers les pages industrie concernees
- Depuis la page solution → vers les pages produit (machines)
- Depuis la page solution → vers le calculateur ROI
- Depuis le footer → vers le hub solutions

### Source de contenu

Le document de reference est :
`/Users/photodif/Documents/SYSNEXT/MARKETING/Etude de marché industrie défense.pdf`

Sections pertinentes :
- Section 5 : Matrice des 21 cas d'usage (pages 10-11)
- Section 6 : Points de douleur identifies (pages 12-13)
- Section 7 : Modules recommandes (pages 14-15)
- Section 8 : Argumentaires marketing par segment (pages 16-17)

## Methode

### Etape 1 — Lire les documents
1. `design-system.md`
2. `sessions/TEMPLATE-SESSION-DESIGN.md`
3. `sessions/RESEARCH-LANDING-PAGES-SOLUTIONS.md` (produit en session B)
4. L'etude de marche PDF

### Etape 2 — Analyse visuelle Home + Apple

### Etape 3 — Plan detaille
Pour chaque page a creer :
- URL + titre + meta description
- Requete principale + secondaires
- Structure section par section
- Maillage interne prevu
Attends validation.

### Etape 4 — Implementation

### Etape 5 — Build + commit + push

## Regles strictes
- Requetes SEO = celles validees en session B, pas d'improvisation
- Ne JAMAIS inventer de chiffres/stats sans validation
- Terminologie : "systemes", "Photo studio + IA", BlendAI.studio
- Traductions FR + EN synchronisees
- Ne JAMAIS lancer le dev server
- Ne JAMAIS utiliser le CLI Vercel
