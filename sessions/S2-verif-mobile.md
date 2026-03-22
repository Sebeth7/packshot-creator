# Session S2 : Verification mobile + responsive

## Objectif
Verifier visuellement le rendu mobile et tablette de toutes les pages modifiees lors des sessions 1-4. Produire un rapport structure avec screenshots des problemes et les fixes CSS exacts a appliquer.

## Contexte projet

**PackshotCreator** — site Next.js App Router avec Tailwind CSS v4. Le redesign "Studio Light" a ete applique sur Home, Studios, IA, Industrie hub, et le template PackshotLandingTemplate (5 pages packshot-*). Des fixes responsive ont deja ete appliques (py-16 lg:py-28, ghost numbers text-4xl lg:text-6xl, gaps gap-10 lg:gap-16) mais ils n'ont PAS ete verifies visuellement.

**URL du site** : `https://sysnext.vercel.app/fr`
**Dossier projet** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

## Viewports a tester

Pour chaque page, tester 3 viewports :
1. **360x800** (petit Android)
2. **375x812** (iPhone standard)
3. **768x1024** (tablette portrait)

Utiliser `resize_window` pour chaque viewport.

## Pages a verifier (11 pages)

### Priorite HAUTE (pages redesignees "Studio Light")
1. `https://sysnext.vercel.app/fr` — Home (11 sections, 4 modifiees en S4)
2. `https://sysnext.vercel.app/fr/studios-photo-automatises` — Studios (10 sections, redesign radical S3)
3. `https://sysnext.vercel.app/fr/ia-photo-produit` — IA (10 sections, redesign S4)
4. `https://sysnext.vercel.app/fr/industrie` — Industrie hub (8 sections, redesign S4)
5. `https://sysnext.vercel.app/fr/packshot-bijoux` — Representatif du template PackshotLandingTemplate (7 sections, redesign S4)

### Priorite MOYENNE (pages avec quick wins CRO)
6. `https://sysnext.vercel.app/fr/academy` — Academy (6 sections, badge OPCO ajoute en S2)
7. `https://sysnext.vercel.app/fr/contact` — Contact (4 sections, trust bar ajoutee en S2)
8. `https://sysnext.vercel.app/fr/industrie-defense` — Defense (10 sections)

### Priorite BASSE (pages non modifiees mais a verifier)
9. `https://sysnext.vercel.app/fr/a-propos` — A propos (6 sections)
10. `https://sysnext.vercel.app/fr/studio-photo/alphashot-pro-g2` — Page produit representative (~12 sections)
11. `https://sysnext.vercel.app/fr/calculateur-roi` — Calculateur ROI (2 sections)

## Patterns CSS connus a verifier

Ces patterns ont ete appliques lors du redesign. Verifier qu'ils fonctionnent correctement sur mobile :

| Pattern | Probleme potentiel | Ou chercher |
|---------|-------------------|-------------|
| `py-16 lg:py-28` ou `py-28` sans prefix mobile | Padding excessif sur mobile | Toutes les sections |
| `text-4xl lg:text-6xl` ou `text-6xl` sans prefix | Ghost numbers qui ecrasent le contenu | Studios S3 (piliers), Home S2 (stats), IA (stats), template (stats) |
| `gap-10 lg:gap-16` ou `gap-16` sans prefix | Espacement excessif sur mobile | Grids de cartes |
| `lg:grid-cols-12` avec `lg:col-span-4` + `lg:col-span-8` | Split layout qui stack mal sur mobile | Studios S3, IA S4, Industrie S4, Home S4 |
| `lg:sticky lg:top-32` | Heading sticky qui prend trop de place sur mobile | Studios (piliers, FAQ), IA (manifeste, FAQ), Industrie (case studies, FAQ) |
| `text-7xl` ou `text-9xl` sans prefix mobile | Nombres geants qui debordent | Timelines (Studios S6, Industrie S5), stats rubans |
| `md:grid-cols-5` (3+2 colonnes) | Layout 5 colonnes trop serre | Studios S3 (piliers : image 2/5 + texte 3/5) |
| `hidden lg:block` ou `lg:hidden` | Elements qui apparaissent/disparaissent | Verifier que rien d'important est cache sur mobile |

## Point specifique : animations et prefers-reduced-motion

Tous les composants d'animation (TextReveal, FadeInView, ScrollReveal, SpringCard, StaggerContainer) gerent `useReducedMotion()`. Le bug d'opacite signale precedemment semble etre deja corrige. VERIFIER que :
1. Le hero de chaque page s'affiche correctement (pas de contenu invisible)
2. Activer prefers-reduced-motion dans les dev tools et verifier que le contenu reste visible
3. Si le bug existe encore, noter les pages et composants concernes

## Criteres de severite

| Severite | Definition | Exemple |
|----------|-----------|---------|
| **CRITIQUE** | Contenu illisible ou inaccessible | Texte qui deborde, bouton non cliquable, hero vide |
| **IMPORTANT** | UX degradee mais contenu accessible | Padding excessif, image trop petite, alignement casse |
| **MINEUR** | Imperfection cosmetique | Espacement un peu grand, bordure invisible, micro-alignement |

## Livrable

Creer `sessions/S2-rapport-mobile.md` avec pour chaque probleme :

```markdown
### [CRITIQUE/IMPORTANT/MINEUR] — Page X, Section Y — Viewport Zpx

**Probleme** : Description du probleme visuel
**Fichier** : `app/[lang]/path/page.tsx` ligne ~N
**Classes CSS** : `text-6xl` (pas de prefix mobile)
**Fix recommande** : Remplacer par `text-3xl lg:text-6xl`
```

## Contraintes
- Session READ-ONLY. Ne modifier AUCUN fichier du projet.
- Produire uniquement le rapport dans sessions/S2-rapport-mobile.md
- Les fixes seront appliques dans une session ulterieure ou directement par la session pilote
