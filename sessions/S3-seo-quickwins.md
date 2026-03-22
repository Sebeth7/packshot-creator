# Session S3 : SEO Quick Wins

## Objectif
Implementer les 7 quick wins SEO restants sur des pages existantes. Pas de creation de nouvelles pages.

## Contexte projet

**PackshotCreator** distribue les systemes photo automatises Orbitvu en France et Suisse. Le site Next.js App Router genere ~19,869 clics/an en organique. L'opportunite massive est "packshot" (18K impressions, position 8.3, CTR 0.2%). 4 QW sur 15 ont deja ete appliques, et 3 QW qui necessitent la creation de nouvelles pages sont reportes.

**Dossier projet** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

**Terminologie obligatoire** : "systemes" (pas "machines"), "Photo studio + IA" (pas "hybride"), BlendAI.studio = solution proprietaire customisable.

## Quick Wins a implementer

### QW#3 — Schema Product enrichi sur AlphaShot G2
- **Page** : `/studio-photo/alphashot-g2`
- **Fichier** : `app/[lang]/studio-photo/[slug]/page.tsx` (template partage)
- **Etat actuel** : productSchema existe deja (importe de components/seo/SchemaOrg.tsx). VERIFIER s'il inclut deja brand, offers, availability.
- **Action** : Si manquant, enrichir le productSchema pour inclure :
  - `brand: { "@type": "Brand", "name": "Orbitvu" }`
  - `manufacturer: { "@type": "Organization", "name": "Orbitvu" }`
  - `offers` avec `priceCurrency: "EUR"`, `availability: "InStock"`, `seller: PackshotCreator`
  - NOTE : ne PAS mettre de prix (PackshotCreator ne publie pas ses prix). Utiliser `priceSpecification` avec `"eligibleQuantity"` ou simplement omettre le prix.
- **Impact** : +40-70 clics/an (QW#3 + QW#4 ensemble)
- **Fichier schema** : `components/seo/SchemaOrg.tsx` — verifier/modifier la fonction `productSchema()`

### QW#4 — Schema Product enrichi sur AlphaShot 360
- **Page** : `/studio-photo/alphashot-360`
- **Action** : Identique a QW#3 (meme template, la modification s'applique automatiquement a toutes les pages produit)

### QW#6 — Badge "Distributeur Officiel Orbitvu" sur les pages produit
- **Page principale** : `/studio-photo/alphashot-g2` (mais s'applique a toutes via le template)
- **Fichier** : `app/[lang]/studio-photo/[slug]/page.tsx`
- **Action** :
  - Ajouter dans le hero ou juste en dessous un badge visible : "Distributeur Exclusif Orbitvu France & Suisse"
  - Ajouter dans generateMetadata une mention "Distributeur officiel Orbitvu" dans la meta description
  - Le badge doit etre discret mais visible (style similaire au badge "Orbitvu Partner" sur la page Studios)
- **Impact** : +25-50 clics/an
- **Traductions** : Ajouter dans messages/fr.json et messages/en.json, namespace qui correspond aux pages produit (verifier le namespace utilise — c'est probablement dans les donnees machines.ts, PAS dans les fichiers de traduction)

### QW#9 — Schema FAQ sur les pages guide
- **Page** : `/guide/equipement-photo-bijoux` et potentiellement autres guides avec FAQ
- **Fichier** : `app/[lang]/guide/[slug]/page.tsx` (template guide)
- **Etat actuel** : Les guides viennent de Webflow API (`lib/webflow-guides.ts`). Verifier si le template guide a deja un schema FAQ.
- **Action** : Si des FAQ existent dans le rendu de la page, ajouter `faqSchema()` dans le composant SchemaOrg du template
- **Impact** : +20-35 clics/an
- **Attention** : Si les FAQ viennent du contenu Webflow (pas du code), il faudra extraire les Q&A du HTML rendu pour construire le schema. Si c'est trop complexe, documenter et passer.

### QW#2 — Optimisation page EN "best lens"
- **Page** : `/en/blog/best-lens-product-photography` (ou equivalent)
- **Action** : Verifier que cette page existe. Si oui, optimiser meta title et meta description pour le mot-cle "best lens for product photography"
- **Impact** : Faible (page EN, marche France/Suisse)
- **Priorite** : BASSE — faire seulement si le temps le permet

### QW#11 — Rafraichir meta article "materiel photo produit"
- **Page** : `/blog/materiel-photo-produit` ou similaire
- **Action** : Verifier que cette page existe et est accessible dans le code (pas uniquement Webflow/Sanity). Si accessible, optimiser meta title pour inclure "2026" et le mot-cle "materiel photo produit".
- **Impact** : +25-40 clics/an
- **Attention** : Si le contenu est dans Sanity/Webflow, seul le template de rendu est modifiable. Documenter et passer si non actionnable.

### QW#12 — Optimiser meta CTR "photo 360 produit"
- **Page** : Page contenant "photo 360 produit" (chercher dans le site)
- **Action** : Optimiser meta title et description pour maximiser le CTR sur "photo 360 produit". Inclure un call-to-action dans la meta description.
- **Impact** : +20-35 clics/an

## Fichiers modifiables
- `components/seo/SchemaOrg.tsx` — enrichir productSchema si necessaire
- `app/[lang]/studio-photo/[slug]/page.tsx` — badge distributeur + generateMetadata
- `app/[lang]/guide/[slug]/page.tsx` — schema FAQ si applicable
- `messages/fr.json` et `messages/en.json` — UNIQUEMENT les cles meta existantes ou nouvelles cles pour badge distributeur
- Templates blog/guide — UNIQUEMENT les blocs generateMetadata et SchemaOrg

## Fichiers INTERDITS
- Ne PAS modifier le contenu des sections (body)
- Ne PAS toucher aux layouts ou composants d'animation
- Ne PAS creer de nouvelles pages
- Ne PAS modifier les pages Home, Studios, IA, Industrie, packshot-*, Academy, Contact, A propos, Defense

## Livrable
- Les QW appliques (au minimum QW#3-4 et QW#6 qui sont les plus impactants et les plus surs)
- Liste des changements dans `sessions/S3-rapport-seo.md` avec avant/apres pour chaque modification
- Pour les QW non appliques (Webflow/Sanity), documenter pourquoi et ce qui serait necessaire
