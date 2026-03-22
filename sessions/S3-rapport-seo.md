# S3 — Rapport SEO Quick Wins

Date : 2026-03-22

## QW appliques

### QW#3-4 — Schema Product enrichi (AlphaShot G2 + 360)

**Fichier** : `components/seo/SchemaOrg.tsx`

**Avant** : `productSchema()` contenait `brand` (Orbitvu) et `manufacturer` (Orbitvu) mais aucun `offers`.

**Apres** : Ajout du bloc `offers` dans `productSchema()` :
```json
"offers": {
  "@type": "Offer",
  "availability": "https://schema.org/InStock",
  "priceCurrency": "EUR",
  "seller": {
    "@type": "Organization",
    "name": "PackshotCreator",
    "url": "https://www.packshot-creator.com"
  }
}
```

Pas de prix affiche (conforme a la politique commerciale).
S'applique automatiquement a toutes les 16 pages produit via le template partage.

**Impact estime** : +40-70 clics/an

---

### QW#6 — Badge "Distributeur Exclusif Orbitvu" sur pages produit

**Fichier** : `app/[lang]/studio-photo/[slug]/page.tsx`

**Avant** : Badges hero = "Orbitvu" + "IA Ready" (conditionnel). Pas de mention distributeur.
Meta description = `"{machine.nom} : studio photo automatise pour ..."`

**Apres** :
1. Nouveau badge emerald dans le hero : "Distributeur Exclusif Orbitvu France & Suisse" (FR) / "Exclusive Orbitvu Distributor France & Switzerland" (EN)
2. Meta description enrichie : `"{machine.nom} — Distributeur officiel Orbitvu. Studio photo automatise pour ..."`

Le badge est place en premiere position (avant Orbitvu et IA Ready) pour visibilite maximale.
Traductions inline dans le template (pas de cle i18n necessaire car le contenu est statique et court).

**Impact estime** : +25-50 clics/an

---

### QW#12 — Optimisation meta CTR "photo 360 produit"

**Fichier** : `app/[lang]/studio-photo/[slug]/page.tsx`

**Page ciblee** : `/studio-photo/alphashot-360` (meilleur candidat pour le mot-cle "photo 360 produit")

**Avant** :
- Title : `Alphashot 360 | Studio Photo Automatise Orbitvu`
- Description : `Alphashot 360 : studio photo automatise pour {useCases}. {keyAdvantage}`

**Apres** :
- Title : `Photo 360 Produit | Alphashot 360 — Studio Automatise Orbitvu`
- Description : `Creez des photos 360 produit automatisees avec l'Alphashot 360 Orbitvu. Rotation interactive, fond blanc, detourage automatique. Demandez une demo gratuite.`

Le mot-cle "photo 360 produit" est en position 1 du title. La description inclut un CTA ("Demandez une demo gratuite").
Implemente via un systeme de `seoOverrides` par slug, extensible pour d'autres pages si besoin.

**Impact estime** : +20-35 clics/an

---

## QW non appliques (avec justification)

### QW#9 — Schema FAQ sur les pages guide

**Status** : DEJA IMPLEMENTE

Le template `app/[lang]/guide/[slug]/page.tsx` contient deja un schema FAQ (lignes 72-81) qui se construit automatiquement a partir de `guide.faqs`. Le schema est inclus dans le SchemaOrg a la ligne 91 : `...(faqSchema ? [faqSchema] : [])`.

Aucune action necessaire.

---

### QW#2 — Optimisation page EN "best lens"

**Status** : NON ACTIONNABLE (contenu externe)

La page `/en/blog/how-to-choose-best-lens-for-product-photography` est un article blog dont le contenu et les meta viennent de Sanity (primaire) ou Webflow (fallback). Le template `app/[lang]/blog/[slug]/page.tsx` lit les meta directement depuis le CMS :
- Sanity : `sanityPost.seo?.seoTitle` / `sanityPost.seo?.seoDescription`
- Webflow : `webflowArticle.title` / `webflowArticle.description`

**Pour l'appliquer** : Modifier le title et la description directement dans Sanity Studio (ou Webflow si c'est un article Webflow). Le mot-cle cible est "best lens for product photography".

---

### QW#11 — Rafraichir meta article "materiel photo produit"

**Status** : NON ACTIONNABLE (contenu externe)

Meme raison que QW#2. L'article `/fr/blog/materiel-photo-produit` (s'il existe) a ses meta dans Sanity/Webflow.

**Pour l'appliquer** : Modifier dans Sanity Studio le seoTitle pour inclure "2026" et le mot-cle "materiel photo produit". Exemple : "Materiel Photo Produit 2026 : Guide Complet pour Choisir Son Equipement".

---

## Resume des fichiers modifies

| Fichier | Modification |
|---------|-------------|
| `components/seo/SchemaOrg.tsx` | Ajout `offers` dans `productSchema()` |
| `app/[lang]/studio-photo/[slug]/page.tsx` | Badge distributeur, meta description enrichie, seoOverrides alphashot-360 |

## Impact total estime

QW#3-4 + QW#6 + QW#12 = **+85 a +155 clics/an** sur les pages produit.
