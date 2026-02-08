# SESSION S2a - Landing SEOs (Bijoux, Mode, E-commerce)

**Modele requis : Claude Opus 4.6**
**Duree estimee : ~2h**
**Prerequis : S0 terminee**

---

## Contexte

Tu travailles sur le projet PackshotCreator (migration Webflow -> Next.js).
- **Working directory** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`
- **Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (FR/EN)
- Le site est LIVE sur packshot-creator.com.

## Documents de reference (LIS-LES AVANT DE COMMENCER)

1. **Brandbook** : `livrables/BRANDBOOK_WEB_COMPLET.md` -- OBLIGATOIRE pour tout composant visuel
2. **Brandbook annexes** : `livrables/BRANDBOOK_WEB_ANNEXES.md` -- icones, animations, etats
3. **Landing SEOs Webflow** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/data-webflow/pages/INDEX.md` -- structure de reference
4. **Requetes GSC** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/Requetes.csv` -- mots-cles cibles
5. **Secteurs existants** : `data/secteurs.ts` -- reference pour la structure de donnees
6. **Page industrie existante** : `app/[lang]/industrie/[slug]/page.tsx` -- reference pour le layout

## Ta mission

Creer 3 landing pages SEO optimisees : Packshot Bijoux, Packshot Mode, Packshot E-commerce.

---

## Architecture

### Option recommandee : Pages statiques dediees

Cree des pages statiques sous `app/[lang]/` :
```
app/[lang]/packshot-bijoux/page.tsx
app/[lang]/packshot-mode/page.tsx
app/[lang]/packshot-e-commerce/page.tsx
```

Ajoute les pathnames dans `i18n/routing.ts` pour le mapping FR/EN :
```typescript
'/packshot-bijoux': { fr: '/packshot-bijoux', en: '/packshot-jewelry' },
'/packshot-mode': { fr: '/packshot-mode', en: '/packshot-fashion' },
'/packshot-e-commerce': { fr: '/packshot-e-commerce', en: '/packshot-ecommerce' },
```

### Structure de chaque landing (6 sections)

Inspire-toi de la structure des pages industrie existantes mais adaptee pour le SEO :

1. **Hero** (H1 optimise pour la requete cible)
   - `bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800`
   - H1 avec le mot-cle principal (ex: "Packshot Bijoux : Photos Professionnelles pour Joaillerie")
   - Sous-titre avec benefice principal
   - CTA "Recevoir une offre" (lien vers /contact)
   - Bouton sur fond sombre : `bg-transparent border border-white/40`

2. **Section benefices** (3-5 points avec icones Lucide)
   - `py-20`, `max-w-7xl mx-auto px-4 sm:px-6`
   - Cards : `rounded-2xl border border-neutral-100 bg-white`
   - Icones Lucide adaptees au secteur

3. **Chiffres cles** (3 stats)
   - Format : nombre + label (ex: "10x plus rapide", "100% automatise", "-80% de couts")
   - Style : fond gradient ou accent Very Peri

4. **Machines recommandees** (2-3 machines pertinentes pour le secteur)
   - Importer les machines depuis `components/calculators/ROICalculator/lib/machines.ts`
   - Afficher nom, image placeholder, description courte, CTA vers la fiche machine
   - Bijoux : Alphashot Micro V2, Alphashot XL (petits objets + details macro)
   - Mode : Alphashot XL, Viso 360 (mannequins, vetements a plat)
   - E-commerce : Alphashot 360, Alphashot G2 (polyvalence, volume)

5. **FAQ** (3-5 questions/reponses)
   - Questions basees sur les requetes GSC pertinentes
   - Integrer le schema FAQPage via `SchemaOrg`
   - Import : `import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg'`
   - Si `faqSchema` n'existe pas dans SchemaOrg.tsx, CREE-LE

6. **CTA final**
   - `bg-gradient-to-r from-very-peri-600 to-very-peri-700`
   - Titre accrocheur + bouton "Demander une demo"

---

## Contenu specifique par landing

### 1. Packshot Bijoux (`/fr/packshot-bijoux` | `/en/packshot-jewelry`)

**Mot-cle cible FR** : "packshot bijoux", "photo bijoux professionnel", "photographie joaillerie"
**Mot-cle cible EN** : "jewelry packshot", "jewelry photography", "product photography jewelry"

**H1 FR** : "Packshot Bijoux : Sublimez Vos Creations en Photo"
**H1 EN** : "Jewelry Packshot: Stunning Product Photos for Your Creations"

**Benefices** :
- Rendu macro ultra-detaille (chaque facette, chaque reflet)
- Photo 360 interactive pour sites e-commerce
- Fond parfaitement neutre, sans retouche
- Automatisation : 50 bijoux/heure
- Compatible marketplaces (Amazon, Etsy, etc.)

**FAQ** :
- Comment photographier des bijoux brillants sans reflets parasites ?
- Quel fond utiliser pour la photo de bijoux ?
- Combien coute un studio photo pour bijoux ?

**Machines** : Alphashot Micro V2, Alphashot XL

### 2. Packshot Mode (`/fr/packshot-mode` | `/en/packshot-fashion`)

**Mot-cle cible FR** : "packshot mode", "photo vetement e-commerce", "photographie textile"
**Mot-cle cible EN** : "fashion packshot", "clothing photography", "apparel product photography"

**H1 FR** : "Packshot Mode : Photos E-commerce pour Textile et Vetements"
**H1 EN** : "Fashion Packshot: E-commerce Photography for Clothing & Apparel"

**Benefices** :
- Photos a plat ou sur mannequin
- Rendu des textures et couleurs fideles
- Photo 360 pour experience client immersive
- Volume : centaines de pieces par jour
- Integration directe catalogue e-commerce

**FAQ** :
- Comment photographier des vetements pour un site e-commerce ?
- Photo a plat vs mannequin : quelle methode choisir ?
- Quel eclairage pour la photo de mode ?

**Machines** : Alphashot XL, Viso 360

### 3. Packshot E-commerce (`/fr/packshot-e-commerce` | `/en/packshot-ecommerce`)

**Mot-cle cible FR** : "packshot e-commerce", "photo produit e-commerce", "studio photo e-commerce"
**Mot-cle cible EN** : "ecommerce packshot", "product photography ecommerce", "ecommerce photo studio"

**H1 FR** : "Packshot E-commerce : Photos Produit Professionnelles en Volume"
**H1 EN** : "E-commerce Packshot: Professional Product Photos at Scale"

**Benefices** :
- Production photo en volume (500+ produits/jour)
- Fond blanc detour automatique (Amazon-ready)
- Photo 360 interactive
- Reduction des couts de 80% vs studio externe
- ROI mesurable (utiliser le calculateur ROI)

**FAQ** :
- Quel studio photo pour l'e-commerce en 2026 ?
- Comment reduire les couts de photo produit ?
- Quels formats d'image pour les marketplaces ?

**Machines** : Alphashot 360, Alphashot G2, Alphashot Micro V2

---

## Patterns CRITIQUES

- **Link** : `import { Link } from '@/i18n/routing'` (JAMAIS `next/link`)
- **Params** : `{ params }: { params: Promise<{ lang: string }> }`
- **No Header/Footer** : les pages sont self-contained (layout.tsx les ajoute)
- **SchemaOrg** : `import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg'` (default export)
- **Animations** : Utilise `FadeInView`, `StaggerContainer`, `StaggerItem` depuis `@/components/animations`
- **Bouton primaire** : `bg-very-peri-500 hover:bg-very-peri-600 text-white`
- **Bouton sur fond sombre** : `bg-transparent border border-white/40`
- **Pas d'emojis** -- Lucide icons uniquement
- **Traductions** : Ajoute les cles necessaires dans `messages/fr.json` et `messages/en.json`. Utilise `getTranslations` de `next-intl/server`

## SEO de chaque page

Chaque page DOIT avoir :
- `generateMetadata()` avec title (50-60 chars), description (120-155 chars), `alternates.languages`
- Schema JSON-LD : Organization + Breadcrumb + FAQPage
- Canonical vers `https://www.packshot-creator.com/...`
- H1 unique et optimise

## Criteres de done

- [ ] 3 pages creees (FR + EN via i18n)
- [ ] Pathnames ajoutes dans `i18n/routing.ts`
- [ ] Traductions dans `messages/fr.json` et `messages/en.json`
- [ ] Schema FAQPage sur chaque page
- [ ] `npm run build` passe sans erreur
- [ ] Design conforme au brandbook (gradient hero, cards, CTA)
- [ ] Commits propres

## Compte-rendu

Ecris `/livrables/prompts-sessions/S2a-RAPPORT.md` avec :
- Pages creees et leurs URLs
- Cles de traduction ajoutees
- Machines recommandees par page
- Problemes rencontres
- Si `faqSchema` a du etre cree dans SchemaOrg.tsx
