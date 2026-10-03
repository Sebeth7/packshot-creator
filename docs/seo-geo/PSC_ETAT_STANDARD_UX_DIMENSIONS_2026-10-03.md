# PSC — État du chantier « Standard UX des pages longues et fiabilité des données produit »

Photographie du **03/10/2026**, Claude de Laurent. Base de toutes les branches : `main` `de6c4cd`. Aucune fusion, aucune publication, aucun appel payant, aucune modification Supabase, n8n ou Cloudflare, aucune redirection touchée.

Document de reprise pour le pilotage global : il suffit pour reprendre les travaux sans relire la conversation.

---

## 1. Les deux règles

| Règle | Décision | Statut | Référence stable | Registre | Contrôle |
|---|---|---|---|---|---|
| R-UX-LONG — navigation des pages longues | D44 | Inscrite dans `DECISIONS.md` par #87 (brouillon) | `docs/standards/R-UX-LONG.md` | `data/navigation/pages-longues.ts` (#85) | Vitest `lib/navigation/__tests__/` (#85) ; specs `e2e/navigation-pages-longues.spec.ts` (#85), `e2e/sommaire-blog.spec.ts` (#84) |
| R-PRODUCT-DIM — dimensions, encombrements, charges | D45 | Idem | `docs/standards/R-PRODUCT-DIM.md` | `data/produits/fiches-techniques.ts`, `data/produits/ecarts-connus.ts`, `docs/standards/registre-ecarts-dimensions.md` (#83) | Vitest `lib/produits/__tests__/coherence-dimensions.test.ts` (#83) |

Index : `docs/standards/README.md`, avec renvois depuis `docs/seo-geo/README.md` et `02-PROCEDURE.md` (étape 2).

`/CLAUDE.md` n'est pas modifié : sa modification relève de Sébastien (Q19, option A). Le texte du renvoi est proposé dans Q21.

---

## 2. PR brouillon créées

| PR | Objet | Branche | Tête | Fichiers principaux | GO restant |
|---|---|---|---|---|---|
| #83 PRODUCT-TEST | Référentiel, test de cohérence (23 tests), registre des écarts, script d'inventaire, Q20 | `ccr-79f70eb9-product-test` | `9297461` | `data/produits/*`, `lib/produits/*`, `scripts/produits/*`, `docs/standards/registre-ecarts-dimensions.md`, `BOITE-AUX-LETTRES.md` | Fusion (Laurent) |
| #84 UX-BLOG | Sommaire du blog : titre visé atteint, liste latérale plafonnée, ARIA | `ccr-79f70eb9-ux-blog` | `a4b27c6` | `components/blog/TableOfContents.tsx`, `e2e/sommaire-blog.spec.ts` | Preview par Laurent ; information de Sébastien (pages de #64 et #27) ; fusion |
| #85 UX-STICKY | Barre collante mutualisée, registre, 96 pages ; ancre `#calculateur-roi` réparée | `ccr-79f70eb9-ux-sticky` | `1e0118b` | `components/navigation/SommaireCollant.tsx`, `data/navigation/pages-longues.ts`, 7 gabarits, spec et test | Décision de conception (libellé actif) ; Preview ; information de Sébastien ; fusion |
| #86 CI | Vitest et Playwright ciblés dans `pr-checks`, garde-conséquences étendu, spec du sélecteur réécrit | `ccr-79f70eb9-ci` | `894c26b` | `.github/workflows/pr-checks.yml`, `scripts/seo/verifier-consequences.mjs`, `01-RAYON-ACTION.md`, `e2e/machine-selector.spec.ts` | GO d'infrastructure ; information de Sébastien ; fusion |
| #87 UX-GOV | D44, D45, `docs/standards/`, Q21, `ETAT.md`, ce document | `ccr-79f70eb9-7ls0wm` | `3d3444e` et suivants | `docs/**` seulement | Fusion |

Ordre de fusion proposé : #87 (UX-GOV), #83, #86, #84, #85. Les specs de #84 et #85 s'exécutent en CI dès leur fusion, sans retoucher le workflow (`--pass-with-no-tests`).

CI sur la tête de chaque PR au 03/10 : verte pour #83, #84, #85 et #86 (types, build, journal, conséquences). #86 exécute déjà Vitest et le spec du sélecteur (12/12) ; les specs de #84 et #85 s'y ajoutent à leur fusion.

Conflits attendus, sans enjeu :
- haut de `JOURNAL.md` entre ces cinq PR, comme pour toutes les PR ouvertes ;
- `BOITE-AUX-LETTRES.md` : Q20 (#83) et Q21 (UX-GOV) s'insèrent au même endroit ;
- `docs/seo-geo/README.md` avec #65.

---

## 3. Pages et gabarits couverts (D44)

| Famille | Forme | Pages | Statut |
|---|---|---|---|
| Guides | A (barre) | 44 équipées ; tout guide futur | ADOPT ; 3 guides FR gelés par #27 |
| Fiches machines | A | 39 ; toute fiche future | ADAPT |
| IA photo produit | A | 3 | ADAPT |
| Gamme des studios | A | 3 | ADAPT |
| Solutions | A | 3 | ADAPT |
| Articles dédiés sans sommaire | A | `studio-ia-vs-ia-generative`, `comparatif-orbitvu-ortery-styleshoots-2026` (FR, EN) | ADOPT |
| Blog, gabarit commun | B (latéral corrigé) | 122 | KEEP |
| Articles dédiés à sommaire latéral ou repliable | B | 6 FR | KEEP ; HOLD pour toute autre modification (#64, #27) ; le correctif de #84 s'y applique sans toucher leurs fichiers |
| Mode | A (composant d'origine) | 3 | HOLD jusqu'au 26/11/2026 |
| F5 | C (sommaire statique) | 3 | HOLD jusqu'au 23/11/2026 |
| Hub mode-textile | C | 1 | HOLD jusqu'au 26/11/2026 |
| Accueil | C | 3 | HOLD jusqu'au 28/10/2026 (M5) |
| Hubs sectoriels, landings Amazon / Industriel, défense, pédagogiques, légales, distributeur, hubs de liste, outils | C | — | EXCLUDE (seuils non atteints, D10 pour la défense) |
| `budget-studio-photo-automatise` | — | 2 | HOLD (#27) |
| `prestataire-packshot-vs-studio-interne` | C | 2 | EXCLUDE (6 362 à 6 613 px, sous le seuil de 7 200 px) |
| AI Act | — | aucune page publiée | HOLD (#59, #60, #77, #79 ; D41, D42) |

Contrôle du registre sur build local : 116 pages, 116 conformes (96 équipées, 20 gelées ou exclues sans barre).

---

## 4. Défauts UX corrigés

| Défaut | Mesure sur `main` | Après correction | PR |
|---|---|---|---|
| Blog mobile : titre visé hors écran après clic | −810 px et −191 px à 390 px | Titre sous l'en-tête et entièrement visible (spec 8/8) | #84 |
| Blog desktop : liste latérale plus haute que la fenêtre | 29 sommaires, jusqu'à 1 670 px ; 16 cas sur l'échantillon de 77 combinaisons | 0 | #84 |
| Blog : clic sur une entrée lointaine arrêté trop haut (images sans dimensions chargées en route) | Titre à 1 372 px et 3 759 px du haut | Titre à l'arrivée sous l'en-tête | #84 |
| 47 guides, 39 fiches, landings longues sans navigation | — | 96 pages équipées | #85 |
| Lien « Calculer mon ROI » du sélecteur vers une ancre absente | `#calculateur-roi` introuvable | Ancre présente ; `anchors.spec` vert | #85 |
| Spec du sélecteur périmé | 11 échecs sur 14 | 12/12 | #86 |

Mesures de non-régression de #85, comparées à `main` : 344 combinaisons, soit 116 pages à 390 et 1 440 px, et 16 pages aux 7 largeurs. Aucun écart de hauteur, de largeur de contenu, de débordement ni de CLS.

Décision à prendre : sur la barre, le libellé actif est placé dans un emplacement fixe. CLS de défilement : 0 pour le composant commun, 0,036 à 1 024 px pour la barre de Mode.

---

## 5. Dimensions : tests et contradictions (D45)

Tests de cohérence : 23, verts. Détection prouvée par trois mutations : 6, 4 et 1 échecs.

Limites fonctionnelles vérifiées :
- XXL : 90 cm accepté, 91 refusé ; rotation prise en compte ; 100 kg accepté, 101 refusé ;
- chaque machine : son objet maximal accepté, 1 cm de plus refusé ;
- chaque charge chiffrée acceptée, 1 kg de plus refusé.

Les deux catalogues ont des dimensions identiques entre eux.

Comparaison avec les fiches Orbitvu du 03/10 :

| Statut | Produits |
|---|---|
| Objet maximal conforme | 11 : 360, Pro G2, XL G2, XL v2, Compact, XXL, Alphatable, Alphadesk, Fashion Studio, Bike, E-Comm |
| Écart démontré, catégorie A | Encombrement XL G2 (le site reprend l'XL ancienne génération) ; encombrement Micro (52 contre 54 cm) |
| À arbitrer, catégorie B | Furniture Studio (trois sources divergentes) ; encombrements XXL, Alphatable, Alphadesk ; charges E-Comm et Fashion Studio ; versions « Pro v2 » ; axes XL Pro v2 |
| Non vérifiable | XL Wine v2, Fashion Studio Basic, Alphashot G2, XL Pro v2 (pas de page Orbitvu) |

Écarts commerciaux entre catalogues, inscrits : catégories de taille (5 machines), cadences (3).

Aucune valeur commerciale ni affichée modifiée.

Contenus historiques : 19 entrées au registre (H1 à H19). Parmi elles :
- guide d'achat 2026 et comparatif Orbitvu (« AlphaShot G2 » 100 × 80 × 80, « AlphaShot XXL » 200 × 150 × 150) ;
- article Pro G2 « 50 × 50 × 50 cm » ;
- hub mobilier « 2,5 m » ;
- prompt des leads (gabarits faux ; XXL, Compact, XL G2 absents ; sortie interne seulement).

Q20 (#83) : prête, 16 points, avec chaque fois les deux valeurs et leur provenance. Aucun courriel envoyé.

---

## 6. Prochaines autorisations nécessaires

1. GO de fusion de Laurent pour chaque PR, dans l'ordre proposé.
2. Contrôle des Preview de #84 et #85 : desktop, tablette, mobile ; une page par famille.
3. Décision de conception du libellé actif (#85) ; plus tard, bascule de Mode après le 26/11.
4. GO d'infrastructure pour #86. Sa CI est verte au premier passage : 40 s d'étapes ajoutées (Vitest 4 s, Chromium 22 s, parcours 14 s).
5. Réponse de Sébastien à Q20, puis PR PRODUCT-DATA : catégorie A d'abord, puis dérivation des catalogues depuis le référentiel.
6. Réponse de Sébastien à Q21 : renvoi dans `/CLAUDE.md`.
7. Après chaque fusion : `smoke.mjs` sur `sysnext.vercel.app`, puis Chrome sur `www` (R4).

---

## 7. Reprendre les travaux

```bash
git fetch origin
npx vitest run lib/produits lib/navigation          # règles D45 et D44
npx tsx scripts/produits/inventaire-mentions.mts    # triplets libres sans correspondance
PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test sommaire-blog navigation-pages-longues machine-selector --project=chromium
```

Livrables de l'audit (scratchpad de la session du 03/10, non versionnés) : `01-AUDIT-SOMMAIRES-EXISTANTS.md` à `05-PLAN-GENERALISATION-UX-DIMENSIONS.md`. Leur contenu utile est repris dans `docs/standards/` et dans les descriptions des PR.
