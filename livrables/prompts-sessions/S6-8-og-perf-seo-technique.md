# SESSION S6-8 - Open Graph + Performance + SEO Technique

**Modele requis : Claude Opus 4.6**
**Duree estimee : ~1.5h**
**Prerequis : S0 a S3 terminees (toutes les pages doivent exister)**

---

## Contexte

Tu travailles sur le projet PackshotCreator (migration Webflow -> Next.js).
- **Working directory** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`
- **Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (FR/EN)

---

## TACHE 1 : Meta Open Graph (Phase 6)

### 1.1 Meta OG par defaut dans le layout

**Fichier** : `app/[lang]/layout.tsx`

Lis le fichier et verifie si `generateMetadata()` ou `metadata` existent deja. Ajoute/complete les meta OG :

```typescript
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    // ... meta existantes ...
    openGraph: {
      title: isFr ? 'PackshotCreator - Studios Photo Automatises' : 'PackshotCreator - Automated Photo Studios',
      description: isFr
        ? 'Solutions de photographie produit automatisee. Studios photo Orbitvu, IA retouche, formations certifiantes.'
        : 'Automated product photography solutions. Orbitvu photo studios, AI retouching, certified training.',
      url: `https://www.packshot-creator.com/${lang}`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [{
        url: 'https://www.packshot-creator.com/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'PackshotCreator - Automated Photo Studios',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isFr ? 'PackshotCreator - Studios Photo Automatises' : 'PackshotCreator - Automated Photo Studios',
      description: isFr
        ? 'Solutions de photographie produit automatisee.'
        : 'Automated product photography solutions.',
      images: ['https://www.packshot-creator.com/og/default.jpg'],
    },
  };
}
```

### 1.2 Creer le dossier OG

```bash
mkdir -p public/og
```

Cree un fichier `public/og/.gitkeep` pour que le dossier soit tracke par git.

**Note** : Les images OG sont hors scope (le PO les gerera manuellement). Le code doit juste prevoir le champ `images` dans `generateMetadata()`.

### 1.3 Verifier les pages individuelles

Pour chaque page qui a deja un `generateMetadata()`, verifie qu'elle definit `openGraph` et `twitter`. Si ce n'est pas le cas, ajoute-les avec des valeurs specifiques a la page.

**Pages prioritaires a verifier** :
- `app/[lang]/page.tsx` (homepage)
- `app/[lang]/studios-photo-automatises/page.tsx`
- `app/[lang]/ia-photo-produit/page.tsx`
- `app/[lang]/academy/page.tsx`
- `app/[lang]/contact/page.tsx`
- `app/[lang]/blog/page.tsx`
- `app/[lang]/industrie/page.tsx`

Les pages dynamiques (blog/[slug], guide/[slug], etc.) heritent du layout par defaut si elles ne surchargent pas -- c'est OK pour le moment.

---

## TACHE 2 : Performance / Core Web Vitals (Phase 7)

### 2.1 Audit des images

Cherche dans tout le codebase les balises `<img>` qui n'utilisent pas `next/image` :

```bash
grep -rn '<img ' app/ components/ --include="*.tsx" | grep -v 'next/image'
```

Pour chaque image trouvee :
- Remplace par `import Image from 'next/image'` et `<Image />`
- Ajoute `width`, `height`, et `alt`
- Ajoute `priority` si l'image est above-the-fold (hero, premier ecran)

### 2.2 Lazy loading des composants lourds

Verifie si ces composants utilisent `dynamic` import :
- ROI Calculator (`components/calculators/ROICalculator/`)
- OPCO Simulator (`components/calculators/` ou `app/[lang]/academy/simulateur-opco/`)
- Pipedrive Contact Form (`components/forms/PipedriveContactForm.tsx`)

Si un composant lourd est importe statiquement dans une page, envisage `next/dynamic` avec `{ ssr: false }` si c'est un composant purement client-side.

### 2.3 Preload des fonts

Verifie dans `app/[lang]/layout.tsx` ou `app/layout.tsx` :
- Les fonts sont-elles importees depuis `next/font` ?
- Sont-elles preloadees ?
- Si pas de `next/font`, ajouter le preload dans `<head>`

### 2.4 Scripts tiers

Verifie que tous les scripts tiers (Pipedrive embed, futur GA4, etc.) utilisent :
- `strategy="afterInteractive"` pour les scripts non-critiques
- `strategy="lazyOnload"` pour les scripts encore moins critiques

---

## TACHE 3 : SEO Technique (Phase 8)

### 3.1 Verifier hreflang

Pour chaque page, verifie que `generateMetadata()` inclut :
```typescript
alternates: {
  canonical: `https://www.packshot-creator.com/${lang}/...`,
  languages: {
    fr: '/fr/...',
    en: '/en/...',
  },
},
```

**IMPORTANT** : S'assurer qu'il n'y a AUCUN hreflang pour DE/ES/NL (ces langues ont ete supprimees).

Cherche dans le codebase :
```bash
grep -rn "de:" app/ --include="*.tsx" | grep -i "languages\|hreflang\|alternate"
```

### 3.2 Verifier les canonicals

Toutes les canonicals doivent pointer vers `https://www.packshot-creator.com/...` (avec www).

Cherche les canonicals sans www :
```bash
grep -rn "packshot-creator.com" app/ --include="*.tsx" | grep -v "www."
```

Corrige toutes les occurrences.

### 3.3 Verifier le sitemap

**Fichier** : `app/sitemap.ts`

Lis-le et verifie :
- Toutes les nouvelles pages (landing SEOs, secteurs) sont incluses
- Les URLs utilisent `https://www.packshot-creator.com/` (avec www)
- Les pages dynamiques (blog, guides, machines, secteurs) sont generees dynamiquement
- Le `lastModified` est raisonnable

Si des pages manquent (en particulier les nouvelles landing SEOs), ajoute-les.

### 3.4 Verifier robots.txt

**Fichier** : `public/robots.txt`

Verifie :
- Le sitemap pointe vers `https://www.packshot-creator.com/sitemap.xml`
- `/studio` est bloque (Sanity Studio)
- Pas de blocage accidentel de pages importantes

---

## Patterns CRITIQUES

- **Metadata** : Utilise l'API `Metadata` de Next.js (pas de `<head>` manuel)
- **Images** : Toujours `next/image` avec `width`, `height`, `alt`
- **Pas d'emojis**
- **www** : Toujours `https://www.packshot-creator.com/`

## Criteres de done

- [ ] Meta OG et Twitter dans layout.tsx
- [ ] Meta OG verifiees sur les 7 pages prioritaires
- [ ] Dossier `public/og/` cree
- [ ] Aucune balise `<img>` sans `next/image` (sauf exception justifiee)
- [ ] Fonts preloadees
- [ ] hreflang FR/EN sur toutes les pages, aucun hreflang DE/ES/NL
- [ ] Canonicals avec www sur toutes les pages
- [ ] Sitemap a jour avec toutes les nouvelles pages
- [ ] `npm run build` passe sans erreur
- [ ] Commits propres (1 par tache)

## Compte-rendu

Ecris `/livrables/prompts-sessions/S6-8-RAPPORT.md` avec :
- Pages modifiees pour OG
- Nombre d'images converties en next/image
- Composants dynamic-imported (le cas echeant)
- Problemes hreflang ou canonical trouves et corriges
- Pages ajoutees au sitemap
