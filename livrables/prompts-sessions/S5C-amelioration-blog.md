# SESSION 5C - Amelioration Template Blog (peut tourner en parallele avec 5A et 5B)

**Modele requis : Claude Opus 4.6**
**Methode : Code-only (pas besoin de Chrome MCP, mais utile pour verification visuelle)**
**Duree estimee : 1 session (~60K tokens)**
**Prerequis : `npm run dev -- -p 3333` si verification visuelle souhaitee**
**PARALLELISABLE avec 5A et 5B** : cette session ne touche QUE les fichiers blog.

---

## INSTRUCTION CRITIQUE

**LIS CE FICHIER EN ENTIER AVANT DE FAIRE QUOI QUE CE SOIT.**

---

## CONTEXTE

Le site packshot-creator.com a 80 articles Webflow (HTML) + 9 articles Sanity (Portable Text). Le template blog actuel (`app/[lang]/blog/[slug]/page.tsx`, 331 lignes) rend le contenu brut sans mise en forme professionnelle.

### Working directory
`/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

### Stack & Patterns
- Next.js 16.1.1, React 19, TypeScript, Tailwind v4, next-intl
- Blog : Sanity (prioritaire) + Webflow (fallback) dans `lib/blog.ts`
- Portable Text : `@portabletext/react` dans `components/blog/PortableTextComponents.tsx`
- Composants blog existants : `components/blog/` (Callout, ComparisonTable, PortableTextComponents, TableOfContents, index)
- **Link** : `import { Link } from '@/i18n/routing'`
- **Pas d'emojis** -- Lucide icons uniquement

### Brandbook
- **Sections** : `py-20`, `max-w-7xl mx-auto px-4 sm:px-6`
- **Cards** : `rounded-2xl border border-neutral-100 bg-white`
- **Texte titres** : `text-future-dusk-900`
- **Texte body** : `text-future-dusk-600`
- **Bouton primaire** : `bg-very-peri-500 hover:bg-very-peri-600 text-white`

---

## MISSION

Ameliorer le template de rendu blog pour que TOUS les articles (Webflow et Sanity) beneficient automatiquement d'une mise en page professionnelle, sans modifier le contenu des articles eux-memes.

---

## FICHIERS CONCERNES (scope strict)

Tu ne dois modifier QUE ces fichiers (et en creer dans `components/blog/` si necessaire) :

```
app/[lang]/blog/[slug]/page.tsx          # Template article
app/[lang]/blog/page.tsx                 # Hub blog (optionnel)
components/blog/PortableTextComponents.tsx # Rendu Sanity
components/blog/TableOfContents.tsx       # Sommaire (existe deja)
components/blog/Callout.tsx              # Callout (existe deja)
components/blog/ComparisonTable.tsx       # Table comparaison (existe deja)
components/blog/index.ts                 # Barrel exports
messages/fr.json                         # Cles i18n (section blog)
messages/en.json                         # Cles i18n (section blog)
```

**NE TOUCHE PAS** aux fichiers de pages principales (`app/[lang]/page.tsx`, etc.), aux composants hors `blog/`, ni a `lib/blog.ts`.

---

## AMELIORATIONS A IMPLEMENTER

### 1. Sommaire automatique (Table of Contents)
**Fichier** : `components/blog/TableOfContents.tsx` (existe, verifier son etat)

- Extraire automatiquement les H2/H3 du contenu HTML (Webflow) ou Portable Text (Sanity)
- Afficher un sommaire sticky en sidebar desktop (>1024px)
- En mobile : sommaire collapsible en haut de l'article
- Highlight de la section active au scroll (Intersection Observer)
- Smooth scroll au clic

**Methode pour Webflow HTML** : parser le HTML cote serveur avec regex ou DOM parser pour extraire les headings et generer des IDs d'ancre.
**Methode pour Sanity** : extraire les blocks de type `heading` du Portable Text.

### 2. Temps de lecture estime
**Position** : dans le header de l'article, a cote de la date et categorie

- Calculer : `Math.ceil(wordCount / 200)` minutes
- Pour Webflow HTML : strip tags puis compter les mots
- Pour Sanity : extraire le texte brut du Portable Text
- Afficher : icone Clock (Lucide) + "X min de lecture" / "X min read"

### 3. Typographie et lisibilite ameliorees
**Fichier** : styles du contenu article dans `blog/[slug]/page.tsx`

- `max-w-prose` (65ch) pour le corps de l'article
- `leading-relaxed` (line-height 1.625)
- Spacing entre paragraphes : `space-y-6`
- Headings H2 : `text-2xl font-bold text-future-dusk-900 mt-12 mb-4`
- Headings H3 : `text-xl font-semibold text-future-dusk-800 mt-8 mb-3`
- Listes : `list-disc pl-6 space-y-2`
- Blockquotes : bordure gauche Very Peri, italic, padding
- Code inline : `bg-neutral-100 rounded px-1.5 py-0.5 font-mono text-sm`
- Images inline : `rounded-lg shadow-sm my-8`
- Separateurs visuels entre sections majeures

**Pour Webflow HTML** : ces styles doivent s'appliquer via une classe wrapper `prose` ou des styles cibles sur les elements HTML.

### 4. CTA en fin d'article
**Position** : apres le contenu, avant les articles lies

Creer un composant `components/blog/ArticleCTA.tsx` :
- Fond gradient (brandbook CTA)
- Titre : "Decouvrez nos solutions" / "Discover our solutions"
- Sous-titre contextuel selon la categorie de l'article
- 2 boutons : "Demander une demo" (lien /contact) + "Calculer mon ROI" (lien /studios-photo-automatises#roi)
- Responsive

### 5. Articles lies (Related Articles)
**Position** : en bas de page, apres le CTA

Creer un composant `components/blog/RelatedArticles.tsx` :
- Afficher 3 articles de la meme categorie (ou les plus recents si pas assez)
- Utiliser `getAllArticles()` de `lib/blog.ts` pour recuperer les articles
- Card : image, titre, categorie badge, date, extrait (2 lignes)
- Grille 3 colonnes desktop, 1 colonne mobile

### 6. Ameliorer le hub blog (`app/[lang]/blog/page.tsx`)
**Optionnel, si le temps le permet** :
- Ajouter un filtre par categorie
- Ajouter une pagination (ou infinite scroll)
- Mettre en avant le dernier article (hero card)

---

## REGLES

1. **Build** : `npm run build` doit passer apres chaque amelioration
2. **Tests** : les tests existants ne doivent pas casser
3. **i18n** : tous les textes via `next-intl`
4. **SSR-safe** : pas de `window` ou `document` sans `useEffect`
5. **Reduce motion** : les animations doivent respecter `prefers-reduced-motion`
6. **Performance** : lazy load pour les composants lourds (Intersection Observer pour TOC)
7. **Pas de nouvelles dependances** sauf necessite absolue

---

## OUTPUT ATTENDU

### Rapport
Ecrire dans `livrables/prompts-sessions/S5C-RAPPORT.md` :

```markdown
# Rapport Session 5C - Amelioration Blog

## Resume
- Ameliorations implementees : X/6
- Composants crees : [liste]
- Composants modifies : [liste]
- Build : OK/FAIL

## Detail

### 1. Sommaire automatique
- Statut : FAIT / PARTIEL / NON FAIT
- Approche : [description technique]
- Fichiers : [liste]

[... pour chaque amelioration ...]

## Captures d'ecran
- Avant : [description]
- Apres : [description]

## Recommandations
[...]
```

---

## REGLES ANTI AUTO-COMPACT

1. **Implementer dans l'ordre** : sommaire -> temps de lecture -> typo -> CTA -> articles lies -> hub
2. **Build apres chaque feature** : verifier que ca compile avant de passer a la suivante
3. **Si le contexte approche des 80%** : ecrire le rapport et STOP
4. **Rapport intermediaire** : apres les features 1-3, ecrire un rapport intermediaire dans `livrables/S5C-rapport-intermediaire.md`
