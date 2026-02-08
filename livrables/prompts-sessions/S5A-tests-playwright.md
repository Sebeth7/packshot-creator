# SESSION 5A-tests - Tests Fonctionnels Playwright

**Modele requis : Claude Opus 4.6**
**Methode : Code-only (ecriture de tests Playwright + correction des bugs detectes)**
**Duree estimee : 1 session (~80K tokens)**
**Prerequis : `npm run dev` doit tourner sur port 3000 (config Playwright par defaut)**
**PARALLELISABLE avec 5B** (pas de conflit de fichiers)

---

## INSTRUCTION CRITIQUE

**LIS CE FICHIER EN ENTIER AVANT DE FAIRE QUOI QUE CE SOIT.**

---

## CONTEXTE

Le site packshot-creator.com a 366 tests Playwright existants dans `e2e/`. Cette session ajoute les tests fonctionnels manquants et corrige les bugs trouves.

### Working directory
`/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

### Playwright config
- Config : `playwright.config.ts`
- baseURL : `http://localhost:3000`
- Browsers : chromium, firefox, webkit, Mobile Chrome
- Reporter : html
- Tests : `e2e/` directory

### Tests existants (NE PAS MODIFIER)
```
e2e/seo.spec.ts              # 253 tests - meta, canonical, hreflang, JSON-LD, OG
e2e/redirections.spec.ts     # 62 tests - toutes les 301
e2e/responsive.spec.ts       # 48 tests - mobile/tablet/desktop
e2e/internal-links.spec.ts   # 3 tests - homepage FR/EN, studios
e2e/contact-form.spec.ts     # 10 tests - Pipedrive form, FAQ, responsive
e2e/opco-simulator.spec.ts   # 15 tests - parcours complet, edge cases
e2e/machine-selector.spec.ts # tests filtres, recherche, modale
```

### Stack
- Next.js 16.1.1, React 19, TypeScript
- next-intl (FR/EN, prefix 'always')
- 158 pages, 16 machines, 14 secteurs, ~89 articles blog

---

## MISSION

Ecrire les tests Playwright manquants, les executer, et corriger les bugs detectes. Chaque nouveau fichier de test cible un aspect fonctionnel precis.

---

## TESTS A ECRIRE

### 1. `e2e/roi-calculator.spec.ts` -- Calculateur ROI (PRIORITE HAUTE)
**Page** : `/fr/studios-photo-automatises` (section ROI)
**Composant** : `components/calculators/ROICalculator/`

Le calculateur ROI n'a AUCUN test. C'est un outil business critique.

Tests a ecrire :
```
- should display ROI calculator section on studios page
- should show step 1 with operator count slider
- should allow adjusting salary cost
- should allow adjusting time percentage
- should toggle external provider (yes/no)
- should allow adjusting daily photo count
- should navigate to step 2 with valid inputs
- should show step 2 with production goals
- should allow selecting product sizes (4 options: petit/moyen/grand/tres-grand)
- should allow adjusting equipment budget
- should navigate to step 3 (results)
- should display ROI metrics (temps/photo, jours production, capacite annuelle)
- should display break-even timeline
- should display comparison table (avant/apres)
- should recommend a machine with details
- should display email capture form
- should allow navigating back to step 1 from step 2
- should allow navigating back to step 2 from step 3
- should handle edge case: minimum values
- should handle edge case: maximum values
- should work in English locale (/en/studios-photo-automatises)
- should be responsive at 375px viewport
```

**Methode** : Utiliser `page.locator()`, `page.fill()`, `page.click()` pour interagir avec les sliders et boutons. Verifier les resultats avec `expect().toContainText()` ou `expect().toBeVisible()`.

### 2. `e2e/cookie-banner.spec.ts` -- Cookie Banner RGPD
**Composant** : `components/cookies/CookieBanner.tsx`

Tests a ecrire :
```
- should display cookie banner on first visit
- should have "Tout accepter", "Tout refuser", "Personnaliser" buttons
- should close banner when "Tout accepter" is clicked
- should load GA4 script after accepting cookies
- should close banner when "Tout refuser" is clicked
- should NOT load GA4 script after refusing cookies
- should open customization panel when "Personnaliser" is clicked
- should show 3 cookie categories (essentiels, analytiques, marketing)
- should have essentiels always enabled (not toggleable)
- should not show banner again after choice (cookie persists)
- should reopen banner via footer "Gerer les cookies" link
```

**Methode** : Utiliser `page.context().clearCookies()` avant chaque test pour un etat propre. Verifier GA4 avec `page.evaluate(() => typeof window.gtag)` ou en checkant les scripts charges.

### 3. `e2e/cta-destinations.spec.ts` -- Verification CTA (toutes pages)
**Objectif** : Verifier que chaque CTA pointe vers la bonne destination.

Tests a ecrire :
```
# Homepage /fr
- hero "Demander une demo gratuite" -> /fr/contact
- hero "Decouvrir nos studios" -> /fr/studios-photo-automatises
- product spotlight "Reserver une demo" -> /fr/contact (or /fr/contact?subject=demo)
- industries "Decouvrir toutes les industries" -> /fr/industrie
- blog "Voir tous les articles" -> /fr/blog
- final CTA "Demander une demo gratuite" -> /fr/contact
- final CTA "Calculer mon ROI" -> /fr/studios-photo-automatises (with #roi anchor)

# Studios /fr/studios-photo-automatises
- hero "Calculer mon ROI" -> scroll to #calculateur-roi or link
- hero "Trouver ma machine" -> /fr/studio-photo/selecteur-machines or scroll
- each machine card "En savoir plus" -> /fr/studio-photo/{slug}

# IA /fr/ia-photo-produit
- CTA buttons -> /fr/contact or external BlendAI

# Academy /fr/academy
- formation links -> /fr/academy/formations-packshot, /fr/academy/formations-ia
- simulator link -> /fr/academy/simulateur-opco
- calendar link -> /fr/academy/calendrier

# Header (global)
- "Demander une demo" button -> /fr/contact
- Logo -> /fr

# Footer (global)
- all footer links resolve (no 404)
```

**Methode** : Pour chaque CTA, verifier le `href` attribute plutot que cliquer + naviguer (plus rapide). Utiliser `page.locator('a').filter({ hasText: 'xxx' }).getAttribute('href')`.

### 4. `e2e/language-switch.spec.ts` -- Switch de Langue
Tests a ecrire :
```
- should switch homepage from /fr to /en
- should switch homepage from /en to /fr
- should switch studios page FR -> EN
- should switch blog page FR -> EN
- should switch contact page FR -> EN
- should preserve path when switching (only lang prefix changes)
- should translate page content after switch (h1 text different)
- should translate header and footer
```

**Methode** : Trouver le bouton de switch langue dans le header, cliquer, verifier l'URL et le contenu.

### 5. `e2e/anchors.spec.ts` -- Liens avec Ancres (#)
Tests a ecrire :
```
- every href with # should have a matching id in the DOM
- #calculateur-roi exists on /fr/studios-photo-automatises
- #secteurs exists on /fr/industrie
- #formations exists on /fr/academy
- #qualiopi exists on /fr/academy (KNOWN MISSING - fix it!)
- #technologies exists on /fr/industrie-defense
```

**Methode** :
1. Collecter tous les `a[href*="#"]` sur les pages principales
2. Extraire le fragment (#xxx)
3. Verifier que `document.getElementById('xxx')` existe
4. Ce test revelera l'ancre `#qualiopi` manquante -- la corriger dans `app/[lang]/academy/page.tsx`

### 6. `e2e/internal-links-all.spec.ts` -- Liens Internes (toutes pages)
**Etendre** le test existant `internal-links.spec.ts` (3 pages) a TOUTES les pages principales.

Tests a ecrire :
```
- no broken internal links on /fr (homepage)
- no broken internal links on /en (homepage)
- no broken internal links on /fr/studios-photo-automatises
- no broken internal links on /fr/ia-photo-produit
- no broken internal links on /fr/academy
- no broken internal links on /fr/industrie
- no broken internal links on /fr/contact
- no broken internal links on /fr/blog
- no broken internal links on /fr/a-propos
- no broken internal links on /fr/studio-photo/alphashot-pro-g2
- no broken internal links on /fr/industrie/chaussures
```

**Methode** : Meme pattern que `internal-links.spec.ts` existant. Collecter les `a[href^="/"]`, GET chaque URL, verifier status < 400.

### 7. `e2e/external-links.spec.ts` -- Liens Externes (attributs)
Tests a ecrire :
```
- all external links have target="_blank"
- all external links have rel="noopener noreferrer"
- no external link returns 404 (optional, slow - can be skipped)
```

**Methode** : Sur les pages principales, collecter les `a[href^="http"]` qui ne pointent pas vers localhost. Verifier les attributs `target` et `rel`.

### 8. `e2e/mobile-overflow.spec.ts` -- Overflow Mobile
Tests a ecrire :
```
- no horizontal overflow on /fr at 375px
- no horizontal overflow on /fr/studios-photo-automatises at 375px
- no horizontal overflow on /fr/ia-photo-produit at 375px
- no horizontal overflow on /fr/academy at 375px
- no horizontal overflow on /fr/contact at 375px
- no horizontal overflow on /fr/blog at 375px
- no horizontal overflow on /fr/a-propos at 375px
- no horizontal overflow on /fr/studio-photo/alphashot-pro-g2 at 375px
```

**Methode** :
```typescript
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(url);
const hasOverflow = await page.evaluate(() =>
  document.documentElement.scrollWidth > document.documentElement.clientWidth
);
expect(hasOverflow).toBe(false);
```

---

## EXECUTION

Apres avoir ecrit chaque fichier de test :

1. **Run le test seul** : `npx playwright test e2e/[nom].spec.ts --project=chromium`
2. **Si des tests echouent** :
   - Si c'est un vrai bug dans le code : **corriger le code** + re-run le test
   - Si c'est un probleme dans le test : ajuster le test
3. **Ne PAS modifier les tests existants** sauf pour corriger un faux positif avere
4. **Build** : `npm run build` doit passer apres les corrections

---

## ORDRE D'IMPLEMENTATION

1. `roi-calculator.spec.ts` (le plus critique, 0 test aujourd'hui)
2. `cookie-banner.spec.ts` (RGPD, critique)
3. `cta-destinations.spec.ts` (navigation, business)
4. `anchors.spec.ts` (+ fix #qualiopi)
5. `language-switch.spec.ts`
6. `mobile-overflow.spec.ts`
7. `internal-links-all.spec.ts`
8. `external-links.spec.ts`

---

## OUTPUT ATTENDU

### Rapport
Ecrire dans `livrables/prompts-sessions/S5A-tests-RAPPORT.md` :

```markdown
# Rapport Session 5A-tests - Tests Playwright

## Resume
- Fichiers de test crees : X/8
- Tests ecrits : X
- Tests passes : X
- Tests echoues puis corriges : X
- Bugs trouves et corriges dans le code : X
- Build : OK/FAIL

## Detail par fichier

### roi-calculator.spec.ts
- Tests : X
- Passes : X/X
- Bugs corriges : [liste]

[... pour chaque fichier ...]

## Bugs corriges dans le code
| Bug | Fichier | Correction |
|---|---|---|

## Tests run final
Resultat de `npx playwright test --project=chromium` (tous les tests)
```

---

## REGLES ANTI AUTO-COMPACT

1. **Ecrire + run apres chaque fichier** : ne pas ecrire les 8 fichiers d'un coup
2. **Rapport intermediaire** apres les tests 1-4 dans `livrables/S5A-tests-rapport-intermediaire.md`
3. **Si le contexte approche des 80%** : ecrire le rapport final et STOP
4. **Run final** : a la fin, lancer `npx playwright test --project=chromium` pour confirmer que TOUS les tests (anciens + nouveaux) passent
