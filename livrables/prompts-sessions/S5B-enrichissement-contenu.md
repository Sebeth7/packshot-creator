# SESSION 5B - Enrichissement Contenu des Pages (Orbitvu-first + Validation PO)

**Modele requis : Claude Opus 4.6**
**Methode : Analyse Orbitvu.com -> Proposition -> Validation PO -> Implementation**
**Duree estimee : 1 session (~120K tokens)**
**Prerequis : `npm run dev -- -p 3333` doit tourner, acces Chrome MCP**

---

## INSTRUCTION CRITIQUE

**LIS CE FICHIER EN ENTIER AVANT DE FAIRE QUOI QUE CE SOIT.**
Ne commence aucun travail sans avoir lu et compris l'integralite de ce prompt.

---

## DOCUMENTS UX/UI OBLIGATOIRES (a lire AVANT toute implementation)

Avant d'implementer la moindre section, tu DOIS lire et respecter ces 3 fichiers. Ils definissent les regles UX/UI du projet et sont la reference absolue pour le design :

1. **`livrables/BRANDBOOK_WEB_COMPLET.md`** -- Spacing, grids, 13 composants standards, 6 templates de page. Lis les sections pertinentes a chaque page que tu enrichis (pas besoin de tout lire d'un coup).
2. **`livrables/BRANDBOOK_WEB_ANNEXES.md`** -- Icones (Lucide uniquement), conventions images, animations (Framer Motion), etats interactifs (hover, focus, disabled, loading).
3. **`livrables/validation-brandbook.md`** -- Validation technique du brandbook : compatibilite CSS, accessibilite WCAG AA, recommandations. Contient 3 reserves mineures et 5 recommandations a respecter.

**Regle** : Toute section creee doit etre coherente avec ces 3 documents. En cas de doute, les regles du brandbook priment sur l'inspiration Orbitvu.

---

## COMPOSANTS MEDIA DISPONIBLES (crees en session 5D)

Les composants suivants sont prets a l'emploi dans `components/media/`. Utilise-les quand c'est pertinent dans les nouvelles sections :

```tsx
// Video YouTube/Vimeo avec facade (thumbnail + chargement au clic)
import { VideoFacade } from '@/components/media';
<VideoFacade videoId="xxx" provider="youtube" title="Demo" />

// Galerie d'images avec lightbox natif
import { ImageGallery } from '@/components/media';
<ImageGallery images={[{ src, alt, width, height, caption }]} columns={3} />

// Slider avant/apres interactif (draggable)
import { BeforeAfterSlider } from '@/components/media';
<BeforeAfterSlider before={{ src, alt }} after={{ src, alt }} width={1200} height={800} />
```

**OG Images dynamiques** : route `/api/og?title=...&type=blog|product|page|formation&lang=fr` disponible pour les `generateMetadata()`.

Voir `livrables/prompts-sessions/S5D-RAPPORT.md` pour la doc complete et les snippets.

---

## QUICK-FIXES DE SESSION 5A (a faire en debut de session)

Avant de commencer l'enrichissement contenu, corrige ces 2 points mineurs identifies par la session 5A :

1. **Ancre `#qualiopi` manquante** : ajouter `id="qualiopi"` sur la section Qualiopi de `/fr/academy` (`app/[lang]/academy/page.tsx`). Le lien `href="/academy#qualiopi"` existe deja dans les fiches formation.

2. **Lien fiche machine dans la modale** : dans `components/machine-selector/components/MachineModal.tsx`, ajouter un lien "Voir la fiche complete" vers `/studio-photo/{slug}` pour chaque machine qui a une fiche dediee.

---

## CONTEXTE

Tu es une session d'implementation sur le site **packshot-creator.com** (Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl FR/EN). Le site est LIVE sur Vercel. Tu travailles sur localhost:3333.

### Working directory
`/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

### Stack & Patterns
- Next.js 16.1.1 (App Router), React 19, TypeScript strict
- Tailwind CSS v4, next-intl (FR/EN, prefix 'always')
- **Link** : `import { Link } from '@/i18n/routing'` (JAMAIS `next/link`)
- **Params** : `{ params }: { params: Promise<{ lang: string }> }`
- **Pages** : Self-contained, PAS d'import Header/Footer
- **Animations** : `FadeInView`, `StaggerContainer`, `StaggerItem` depuis `@/components/animations`
- **Reduce motion** : Le PO a "Reduce motion" active. Toujours verifier le fallback.
- **Pas d'emojis** -- Lucide icons uniquement

### Brandbook (Quick reference -- les 3 fichiers UX/UI font foi)
- **Hero** : `bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800`
- **Sections** : `py-20`, `max-w-7xl mx-auto px-4 sm:px-6`
- **Cards** : `rounded-2xl border border-neutral-100 bg-white`
- **CTA gradient** : `bg-gradient-to-r from-very-peri-600 to-very-peri-700`
- **Bouton primaire** : `bg-very-peri-500 hover:bg-very-peri-600 text-white`
- **Bouton fond sombre** : `bg-transparent border border-white/40`
- **Texte titres** : `text-future-dusk-900`
- **Texte body** : `text-future-dusk-600`
- **Reference complete** : voir section "DOCUMENTS UX/UI OBLIGATOIRES" ci-dessus

### Reference : Audit comparatif
Lire `livrables/audit-phase5-codebase.md` section "Comparaison Orbitvu.com vs PackshotCreator" pour le detail des gaps.

---

## MISSION

Enrichir les pages principales du site en s'inspirant de **orbitvu.com** pour les sections manquantes. Le site doit donner une impression de **completude et de professionnalisme** ("ultra canon" selon le PO).

---

## METHODE DE TRAVAIL (CRITIQUE)

Pour **chaque page** a enrichir, tu suis ce cycle en 3 etapes :

### Etape 1 : Analyse (toi)
1. Ouvre la page equivalente sur **orbitvu.com** (Chrome MCP)
2. Ouvre la page **localhost:3333** correspondante
3. Compare les sections : qu'est-ce qu'Orbitvu a que PackshotCreator n'a pas ?
4. Lis le code source de la page PackshotCreator

### Etape 2 : Proposition (toi -> PO)
Presente au PO un tableau clair :

```
## Page : [nom de la page]

### Sections existantes
1. [section] - OK
2. [section] - OK

### Sections proposees (inspirees d'Orbitvu)
| # | Section | Description | Inspiration Orbitvu | Position |
|---|---------|-------------|---------------------|----------|
| A | [nom] | [ce qu'elle contient] | [URL/section orbitvu] | Apres [section X] |
| B | [nom] | [ce qu'elle contient] | [URL/section orbitvu] | Apres [section Y] |

### Sections NON proposees (et pourquoi)
- [section orbitvu] : pas pertinent car [raison]

Quelles sections veux-tu que j'implemente ? (A, B, toutes, aucune, autre chose ?)
```

### Etape 3 : Implementation (apres validation PO)
- Implemente UNIQUEMENT les sections validees par le PO
- Respecte le brandbook a la lettre
- Textes en FR et EN (next-intl)
- Animations FadeInView/StaggerContainer
- Mobile-first (375px)
- `npm run build` doit passer

**IMPORTANT** : Ne passe PAS a la page suivante sans validation du PO.

---

## PAGES A TRAITER (dans cet ordre)

### PAGE 1 : Studios Hub (`/fr/studios-photo-automatises`)
**Equivalent Orbitvu** : `https://orbitvu.com/products/`
**Etat actuel** : 250 lignes, 5 sections (Hero, Three Pillars, 6 machines/16, ROI Calculator, CTA)

**Gaps identifies dans l'audit** :
- Pas de filtrage par categorie (Orbitvu a 4 categories cliquables)
- Seulement 6 machines affichees sur 16
- Pas de descriptions detaillees par categorie de photo
- Pas de section trust/social proof
- Pas de FAQ specifique studios
- Pas de section support/accompagnement

### PAGE 2 : Homepage (`/fr`)
**Equivalent Orbitvu** : `https://orbitvu.com/`
**Etat actuel** : 595 lignes, 10 sections (deja riche)

**Gaps identifies** :
- Pas de gamme complete produits (1 seul best-seller vs 10+ chez Orbitvu)
- Pas de CTA intermediaire (band "Get offer / Calculate ROI")
- Pas de section accompagnement/support
- Pas de case studies / temoignages clients
- Section industries pourrait etre enrichie (visuels)

### PAGE 3 : IA Photo Produit (`/fr/ia-photo-produit`)
**Equivalent Orbitvu** : `https://orbitvu.com/software/` (partiellement)
**Etat actuel** : 262 lignes

**A analyser** : l'approche IA de PackshotCreator est unique (BlendAI), pas directement comparable a Orbitvu. Chercher l'inspiration aussi sur blendai.studio si pertinent.

### PAGE 4 : Academy (`/fr/academy`)
**Equivalent Orbitvu** : Pas d'equivalent direct (Orbitvu n'a pas de section formation)
**Etat actuel** : 311 lignes

**A analyser** : C'est un avantage competitif PackshotCreator. Enrichir avec : programme detaille, temoignages stagiaires, chiffres (nb formes, satisfaction), parcours certifiant.

### PAGE 5 : A Propos (`/fr/a-propos`)
**Equivalent Orbitvu** : `https://orbitvu.com/about-us/` (si existant)
**Etat actuel** : 241 lignes

**A analyser** : Credibilite entreprise. Ajouter potentiellement : equipe, partenaires, certifications, presence geographique.

### PAGE 6 : Fiches Machines (`/fr/studio-photo/[slug]`)
**Equivalent Orbitvu** : Pages produit individuelles Orbitvu
**Etat actuel** : 503 lignes (deja la plus grosse page dynamique)

**A analyser** : Comparer avec les fiches produit Orbitvu. Les fiches PackshotCreator sont deja riches mais peuvent manquer de : galerie photos, video demo, comparaison avec autres modeles, FAQ specifique machine.

---

## REGLES

1. **Pas de contenu invente** : les chiffres, temoignages, et donnees doivent etre verifiables ou clairement identifies comme placeholders a remplacer par le PO
2. **Images** : utiliser `ImagePlaceholder` ou `next/image` avec les images existantes. Le PO gerera les vraies images a la fin
3. **Composants media** : utiliser `VideoFacade`, `ImageGallery`, `BeforeAfterSlider` de `@/components/media` quand pertinent (voir section composants 5D ci-dessus)
4. **OG images** : integrer `/api/og` dans les `generateMetadata()` des pages enrichies
5. **Pas de nouvelles dependances npm** sauf absolue necessite (et validation PO)
6. **Texte** : toujours via `next-intl` (cles dans `messages/fr.json` et `messages/en.json`)
7. **Build** : `npm run build` doit passer apres chaque page implementee
8. **Brandbook** : toute section creee doit etre conforme aux 3 fichiers UX/UI. En cas de doute, le brandbook prime sur Orbitvu

---

## OUTPUT ATTENDU

### Rapport final
Ecrire dans `livrables/prompts-sessions/S5B-RAPPORT.md` :

```markdown
# Rapport Session 5B - Enrichissement Contenu

## Resume
- Pages traitees : X/6
- Sections ajoutees : X
- Sections refusees par PO : X
- Build : OK/FAIL

## Detail par page

### PAGE 1 : Studios Hub
- Sections proposees : [liste]
- Validation PO : [ce qui a ete accepte/refuse]
- Sections implementees : [liste]
- Fichiers modifies : [liste]
- Cles i18n ajoutees : X

[... pour chaque page ...]
```

---

## REGLES ANTI AUTO-COMPACT

1. **Max 2 pages par bloc de travail** : apres 2 pages implementees, ecris un rapport intermediaire dans `livrables/S5B-rapport-intermediaire.md`
2. **Si le contexte approche des 80%** : ecris le rapport final avec ce qui a ete fait et STOP
3. **Ne lis PAS le brandbook en entier** : lis seulement les sections pertinentes a la page en cours
4. **Screenshots** : prends un screenshot AVANT et APRES chaque page modifiee pour documenter le changement
