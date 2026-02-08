# Rapport Session 5A-tests - Tests Playwright

## Resume
- Fichiers de test crees : 8/8
- Tests ecrits : 89
- Tests passes : 86
- Tests echoues (bugs reels dans le code) : 3
- Bugs trouves et corriges dans le code : 1
- Build : OK

## Detail par fichier

### roi-calculator.spec.ts
- Tests : 21
- Passes : 21/21
- Bugs corriges : accent `Etape` -> `Etape` (test fix), scoping `#calculateur-roi` (test fix), dismiss cookie banner en mobile (test fix)

### cookie-banner.spec.ts
- Tests : 10
- Passes : 10/10
- Bugs corriges : strict mode `getByText` avec `{ exact: true }` (test fix)

### cta-destinations.spec.ts
- Tests : 12
- Passes : 12/12
- Bugs corriges : texte CTA machine cards ("Voir les details" pas "En savoir plus"), `waitUntil: 'domcontentloaded'` pour academy

### anchors.spec.ts
- Tests : 9
- Passes : 9/9
- Note : `#qualiopi` existait deja dans `app/[lang]/academy/page.tsx:97`, pas de fix necessaire

### language-switch.spec.ts
- Tests : 8
- Passes : 8/8

### mobile-overflow.spec.ts
- Tests : 8
- Passes : 5/8
- **Bugs reels detectes (3 pages avec overflow horizontal a 375px)** :
  - `/fr` (homepage)
  - `/fr/contact`
  - `/fr/studio-photo/alphashot-pro-g2`

### internal-links-all.spec.ts
- Tests : 8
- Passes : 8/8
- Bugs corriges : `/fr/blog/undefined` lien casse (article sans slug dans BlogGrid)

### external-links.spec.ts
- Tests : 12
- Passes : 12/12

## Bugs corriges dans le code
| Bug | Fichier | Correction |
|---|---|---|
| Articles blog sans slug generent `/fr/blog/undefined` (404) | `components/blog/BlogGrid.tsx` | Filtre defensif `articles.filter((a) => a.slug)` avant affichage |

## Bugs detectes (non corriges - overflow mobile)
| Page | Probleme |
|---|---|
| `/fr` | Overflow horizontal a 375px |
| `/fr/contact` | Overflow horizontal a 375px |
| `/fr/studio-photo/alphashot-pro-g2` | Overflow horizontal a 375px |

## Run final
```
89 tests, 86 passed, 3 failed (bugs reels overflow mobile)
Duration: 17.9s (build prod)
Project: chromium
```
