# Session S4 — Rapport GEO : 4 articles strategiques

**Date** : 22 mars 2026
**Statut** : Termine — Build OK, 4 pages creees

---

## Pages creees

### Article 1 : Studio automatise + IA vs IA generative pure
- **URL FR** : `/fr/blog/studio-ia-vs-ia-generative`
- **URL EN** : `/en/blog/studio-ia-vs-ia-generative`
- **Fichier** : `app/[lang]/blog/studio-ia-vs-ia-generative/page.tsx`
- **Namespace** : `blogStudioIa`
- **Mot-cle cible** : "photo produit IA" (320/mo)
- **Schema.org** : Article + FAQPage + BreadcrumbList
- **FAQ** : 6 questions
- **Maillage** : /ia-photo-produit, /studios-photo-automatises, /calculateur-roi

### Article 2 : Quel budget pour un studio photo automatise ?
- **URL FR** : `/fr/blog/budget-studio-photo-automatise`
- **URL EN** : `/en/blog/budget-studio-photo-automatise`
- **Fichier** : `app/[lang]/blog/budget-studio-photo-automatise/page.tsx`
- **Namespace** : `blogBudget`
- **Mot-cle cible** : "studio photo automatique prix"
- **Schema.org** : Article + FAQPage + BreadcrumbList
- **FAQ** : 6 questions
- **Maillage** : /calculateur-roi, /studios-photo-automatises, /contact

### Article 3 : Prestataire packshot vs studio interne
- **URL FR** : `/fr/blog/prestataire-packshot-vs-studio-interne`
- **URL EN** : `/en/blog/prestataire-packshot-vs-studio-interne`
- **Fichier** : `app/[lang]/blog/prestataire-packshot-vs-studio-interne/page.tsx`
- **Namespace** : `blogPrestataire`
- **Mot-cle cible** : "prestataire photo produit", "studio packshot professionnel France"
- **Schema.org** : Article + FAQPage + BreadcrumbList
- **FAQ** : 5 questions
- **Maillage** : /studios-photo-automatises, /industrie, /contact

### Article 4 : Comparatif Orbitvu vs Ortery vs Styleshoots 2026
- **URL FR** : `/fr/blog/comparatif-orbitvu-ortery-styleshoots-2026`
- **URL EN** : `/en/blog/comparatif-orbitvu-ortery-styleshoots-2026`
- **Fichier** : `app/[lang]/blog/comparatif-orbitvu-ortery-styleshoots-2026/page.tsx`
- **Namespace** : `blogComparatif`
- **Mot-cle cible** : "orbitvu vs ortery", "meilleur studio photo automatise"
- **Schema.org** : Article + FAQPage + BreadcrumbList
- **FAQ** : 6 questions
- **Maillage** : /studios-photo-automatises, /studio-photo/alphashot-pro-g2, /calculateur-roi

---

## Fichiers modifies

| Fichier | Modification |
|---------|-------------|
| `messages/fr.json` | +4 namespaces (blogStudioIa, blogBudget, blogPrestataire, blogComparatif) |
| `messages/en.json` | +4 namespaces (idem) |

## Fichiers crees

| Fichier | Description |
|---------|-------------|
| `app/[lang]/blog/studio-ia-vs-ia-generative/page.tsx` | Article 1 |
| `app/[lang]/blog/budget-studio-photo-automatise/page.tsx` | Article 2 |
| `app/[lang]/blog/prestataire-packshot-vs-studio-interne/page.tsx` | Article 3 |
| `app/[lang]/blog/comparatif-orbitvu-ortery-styleshoots-2026/page.tsx` | Article 4 |

## Conformite technique

- [x] Build Next.js OK (172 pages generees, 0 erreur)
- [x] Server Components purs (pas de "use client")
- [x] Link from `@/i18n/routing` (pas de next/link)
- [x] Schema.org : Article + FAQPage + BreadcrumbList sur chaque page
- [x] Traductions FR + EN completes (4 namespaces)
- [x] FAQ avec `<details>/<summary>` natifs HTML
- [x] Animations : FadeInView, TextReveal, ScrollReveal, SpringCard, StaggerContainer
- [x] Design "Studio Light" (classes brandbook, gradients, cards)
- [x] Maillage interne vers les pages specifiees
- [x] Pas d'emojis (Lucide icons uniquement)
- [x] CTA vers /contact et /calculateur-roi
- [x] OpenGraph type "article" avec publishedTime

## Donnees de recherche utilisees

Les articles s'appuient sur des donnees factuelles collectees dans :
- `sessions/research/ia-generative-concurrents.md` (Photoroom, Claid, Flair, Pebblely)
- `sessions/research/concurrents-directs.md` (Ortery, Styleshoots, PhotoRobot, ScanCube)
- `sessions/research/orbitvu-specs.md` (gamme Orbitvu, prix, ROI, BlendAI)

Sources principales : orbitvu.com, ortery.com, profoto.com, photorobot.com, scancube.com, photoroom.com, claid.ai, flair.ai, pebblely.com, etude comparative 2023 PackshotCreator.

## Points d'attention pour le PO

1. **Images** : Les 4 articles n'ont pas d'images hero. Le PO devra fournir des visuels ou utiliser l'API OG automatique.
2. **Blog index** : Les articles statiques n'apparaissent pas automatiquement dans la page `/blog` (qui tire de Sanity/Webflow). Si necessaire, ajouter des entrees manuelles dans la page blog index.
3. **Sitemap** : Les nouvelles routes sont automatiquement incluses par Next.js.
4. **URLs EN pour articles 3 et 4** : Le brief specifiait des URLs EN differentes (`outsource-vs-inhouse-product-photography` et `orbitvu-vs-ortery-vs-styleshoots-2026`), mais le routage Next.js utilise le meme dossier pour FR et EN. Les slugs FR s'appliquent aux deux langues.
