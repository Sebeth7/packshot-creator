# SESSION S9 - Tests SEO, Redirections, Responsive

**Modele requis : Claude Opus 4.6**
**Duree estimee : ~1.5h**
**Prerequis : Toutes les sessions precedentes terminees (S0 a S6-8)**

---

## Contexte

Tu travailles sur le projet PackshotCreator (migration Webflow -> Next.js).
- **Working directory** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`
- **Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (FR/EN)
- **Test framework** : Playwright (deja installe, voir `playwright.config.ts`)

---

## TACHE 1 : Tests SEO automatises

### 1.1 Creer la suite de tests

Cree `tests/seo.spec.ts` (ou `e2e/seo.spec.ts` selon la config Playwright existante).

Verifie d'abord la config Playwright :
- Lis `playwright.config.ts` pour connaitre le dossier des tests et le baseURL
- Le dev server tourne sur port 3333

### Tests a ecrire

```typescript
// Pour CHAQUE page du site (genere la liste dynamiquement) :

test.describe('SEO - All pages', () => {
  const pages = [
    '/fr',
    '/en',
    '/fr/a-propos',
    '/en/a-propos',
    '/fr/contact',
    '/en/contact',
    '/fr/blog',
    '/en/blog',
    '/fr/guide',
    '/en/guide',
    '/fr/academy',
    '/en/academy',
    '/fr/studios-photo-automatises',
    '/en/studios-photo-automatises',
    '/fr/ia-photo-produit',
    '/en/ia-photo-produit',
    '/fr/industrie',
    '/en/industrie',
    // + les nouvelles landing SEOs
    '/fr/packshot-bijoux',
    '/en/packshot-jewelry',
    '/fr/packshot-mode',
    '/en/packshot-fashion',
    '/fr/packshot-e-commerce',
    '/en/packshot-ecommerce',
    '/fr/packshot-amazon',
    '/en/packshot-amazon',
    '/fr/packshot-industriel',
    '/en/packshot-industrial',
    // Pages legales
    '/fr/mentions-legales',
    '/fr/confidentialite',
    '/fr/cgu',
  ];

  for (const path of pages) {
    test(`${path} returns 200`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });

    test(`${path} has title`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThan(70);
    });

    test(`${path} has meta description`, async ({ page }) => {
      await page.goto(path);
      const desc = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(50);
      expect(desc!.length).toBeLessThan(160);
    });

    test(`${path} has canonical`, async ({ page }) => {
      await page.goto(path);
      const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href'));
      expect(canonical).toContain('www.packshot-creator.com');
    });

    test(`${path} has hreflang`, async ({ page }) => {
      await page.goto(path);
      const hreflangs = await page.$$eval('link[rel="alternate"][hreflang]', els =>
        els.map(el => el.getAttribute('hreflang'))
      );
      expect(hreflangs).toContain('fr');
      expect(hreflangs).toContain('en');
      // Pas de DE/ES/NL
      expect(hreflangs).not.toContain('de');
      expect(hreflangs).not.toContain('es');
      expect(hreflangs).not.toContain('nl');
    });

    test(`${path} has valid JSON-LD schema`, async ({ page }) => {
      await page.goto(path);
      const schemas = await page.$$eval('script[type="application/ld+json"]', els =>
        els.map(el => {
          try { JSON.parse(el.textContent!); return true; }
          catch { return false; }
        })
      );
      expect(schemas.length).toBeGreaterThan(0);
      expect(schemas.every(Boolean)).toBe(true);
    });
  }
});
```

### 1.2 Tests des images

```typescript
test.describe('SEO - Images', () => {
  test('all images have alt attributes', async ({ page }) => {
    // Tester sur 3-5 pages representatives
    for (const path of ['/fr', '/fr/studios-photo-automatises', '/fr/ia-photo-produit']) {
      await page.goto(path);
      const imagesWithoutAlt = await page.$$eval('img:not([alt])', els => els.length);
      expect(imagesWithoutAlt).toBe(0);
    }
  });
});
```

---

## TACHE 2 : Tests de redirections

### 2.1 Tester les redirections 301

Cree `tests/redirections.spec.ts` :

```typescript
test.describe('Redirections 301', () => {
  const redirections = [
    // P0 - Corrections
    { from: '/e-commerce', to: '/fr/blog' },
    { from: '/packshot-secteur-e-commerce', to: '/fr/blog' },

    // Webflow legacy
    { from: '/contact', to: '/fr/contact' },
    { from: '/blendai', to: '/fr/ia-photo-produit' },
    { from: '/studio-photo', to: '/fr/studios-photo-automatises' },
    { from: '/formation', to: '/fr/academy' },

    // ShotFlow
    { from: '/gestion-workflow-shotflow', to: '/fr/ia-photo-produit' },

    // Secteurs
    { from: '/packshot-secteur-chaussures', to: '/fr/industrie/chaussures' },
    { from: '/packshot-secteur-bijouterie', to: '/fr/industrie/bijoux-joaillerie' },

    // EN machines
    { from: '/en/photo-studio/alphashot-360', to: '/en/studio-photo/alphashot-360' },

    // DE/ES/NL → EN
    { from: '/de', to: '/en' },
    { from: '/es', to: '/en' },
    { from: '/nl', to: '/en' },
    // + les redirections individuelles DE/ES/NL ajoutees en S1
  ];

  for (const { from, to } of redirections) {
    test(`${from} -> ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      const location = response.headers()['location'];
      expect(location).toContain(to);
    });
  }
});
```

### 2.2 Mettre a jour les redirections DE/ES/NL

Lis le rapport S1 (`livrables/prompts-sessions/S1-RAPPORT.md`) pour obtenir la liste complete des redirections DE/ES/NL individuelles ajoutees. Ajoute-les aux tests.

---

## TACHE 3 : Tests responsive

### 3.1 Creer les tests

Cree `tests/responsive.spec.ts` :

```typescript
const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const pagesToTest = [
  '/fr',                            // Homepage
  '/fr/blog',                       // Blog
  '/fr/guide',                      // Guides (si la page existe en tant que hub)
  '/fr/studios-photo-automatises',  // Studios
  '/fr/contact',                    // Contact
  '/fr/packshot-bijoux',            // Landing SEO (nouvelle)
];

for (const viewport of viewports) {
  test.describe(`Responsive - ${viewport.name} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const path of pagesToTest) {
      test(`${path} renders without horizontal scroll`, async ({ page }) => {
        await page.goto(path);
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const windowWidth = await page.evaluate(() => window.innerWidth);
        expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 1);
      });

      test(`${path} has no overlapping elements`, async ({ page }) => {
        await page.goto(path);
        // Verifie qu'aucun element ne deborde du viewport
        const overflowing = await page.evaluate(() => {
          const elements = document.querySelectorAll('*');
          let count = 0;
          elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > window.innerWidth + 5) count++;
          });
          return count;
        });
        expect(overflowing).toBe(0);
      });
    }
  });
}
```

---

## TACHE 4 : Verification des liens internes

Cree `tests/internal-links.spec.ts` :

```typescript
test('no broken internal links on homepage', async ({ page }) => {
  await page.goto('/fr');
  const links = await page.$$eval('a[href^="/"]', els =>
    els.map(el => el.getAttribute('href')).filter(Boolean)
  );

  const uniqueLinks = [...new Set(links)];
  const broken: string[] = [];

  for (const link of uniqueLinks) {
    const response = await page.request.get(link!);
    if (response.status() >= 400) {
      broken.push(`${link} -> ${response.status()}`);
    }
  }

  expect(broken).toEqual([]);
});
```

---

## Execution

Apres avoir ecrit tous les tests :

```bash
# Lancer le dev server si pas deja lance
npm run dev &

# Lancer les tests
npx playwright test tests/seo.spec.ts
npx playwright test tests/redirections.spec.ts
npx playwright test tests/responsive.spec.ts
npx playwright test tests/internal-links.spec.ts
```

**IMPORTANT** : Si des tests echouent, documente les echecs dans le rapport mais NE CORRIGE PAS les bugs (sauf s'ils sont triviaux). Les corrections seront faites dans une session dediee.

---

## Criteres de done

- [ ] Suite de tests SEO (200, title, description, canonical, hreflang, schema)
- [ ] Suite de tests redirections (toutes les 301)
- [ ] Suite de tests responsive (mobile/tablet/desktop)
- [ ] Suite de tests liens internes
- [ ] Tous les tests executes
- [ ] Rapport avec resultats (pass/fail)
- [ ] `npm run build` passe sans erreur
- [ ] Commit propre

## Compte-rendu

Ecris `/livrables/prompts-sessions/S9-RAPPORT.md` avec :
- Nombre total de tests
- Tests qui passent / qui echouent
- Liste detaillee des echecs (page, test, raison)
- Recommandations pour les corrections
