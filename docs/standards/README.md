# Standards permanents de PackshotCreator

Référence stable des règles structurelles qui s'appliquent à toutes les pages, présentes et futures, quel que soit l'environnement Claude qui intervient. Chaque standard renvoie à sa décision dans `docs/seo-geo/DECISIONS.md`, qui fait foi.

| Standard | Décision | Objet | Contrôle automatique |
|---|---|---|---|
| [R-UX-LONG](R-UX-LONG.md) | D44 | Navigation des pages longues : barre horizontale collante, sommaire latéral du blog ou navigation statique, selon la famille de gabarits | `lib/navigation/__tests__/registre-pages-longues.test.ts`, `e2e/navigation-pages-longues.spec.ts`, `e2e/sommaire-blog.spec.ts` |
| [R-PRODUCT-DIM](R-PRODUCT-DIM.md) | D45 | Caractéristiques dimensionnelles des produits : définitions, source, version, cohérence entre catalogues, fiches, landings et traductions | `lib/produits/__tests__/coherence-dimensions.test.ts` |

Statut au 03/10/2026 : principes approuvés par Laurent ; inscription et mise en œuvre en PR brouillon (#83 à #87) ; application effective à la fusion de chacune. Une règle n'est opposable sur `main` qu'une fois sa PR fusionnée.

Registres vivants :
- `data/navigation/pages-longues.ts` — familles de gabarits, forme de navigation, pages gelées et exceptions motivées ;
- `data/produits/fiches-techniques.ts` — valeurs du site, fiche fabricant datée, statut par caractéristique ;
- `data/produits/ecarts-connus.ts` — écarts commerciaux inscrits entre les deux catalogues ;
- [registre-ecarts-dimensions.md](registre-ecarts-dimensions.md) — écarts de dimensions dans les catalogues et les contenus.

## Avant de créer ou de modifier une page

1. **Page longue ?** Mesurer la longueur rendue et compter les sections (R-UX-LONG, § 2). Une page d'une famille déjà équipée reçoit la navigation sans autre geste ; un nouveau gabarit s'inscrit au registre (§ 5).
2. **Une dimension, une charge, un encombrement ?** La valeur vient du référentiel, avec sa source. Pas de valeur saisie à la main dans un texte sans vérification contre `data/produits/fiches-techniques.ts` (R-PRODUCT-DIM, § 3).
3. **Une page gelée ?** Consulter le registre de navigation et `docs/seo-geo/ETAT.md`, section E.
4. **Tests** : `npx vitest run` et les specs Playwright citées ci-dessus, avant la PR.
