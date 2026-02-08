# S1-RAPPORT - SEO : Redirections et Meta

**Date** : 2026-02-08
**Modele** : Claude Opus 4.6
**Fichier modifie** : `next.config.ts`

---

## Tache 1 : Redirections DE/ES/NL vers /en

### Resultat
- **14 redirections individuelles** ajoutees (URLs >20 clics GSC sur 3 mois)
- **6 catch-all** modifies (`/de`, `/de/:path*`, `/es`, `/es/:path*`, `/nl`, `/nl/:path*`) pointant desormais vers `/en` au lieu de `https://blendai.studio`

### Detail des redirections individuelles

| # | Source (DE/ES/NL) | Destination (EN) | Clics |
|---|---|---|---|
| 1 | `/es/blog/como-elige-mejor-objectivo-foto-paquete` | `/en/blog/how-to-choose-best-lens-for-product-photography` | 117 |
| 2 | `/es/guide/que-equipo-elegir-para-foto-joyas` | `/en/guide/which-equipment-to-choose-for-jewelry-photo` | 115 |
| 3 | `/de/guide/welche-ausrustung-fur-schmuckfotografie-wahlen` | `/en/guide/which-equipment-to-choose-for-jewelry-photo` | 46 |
| 4 | `/es/guide/que-ajustes-para-fotografiar-joyas` | `/en/guide/what-settings-to-photograph-jewelry` | 31 |
| 5 | `/nl/blog/8-stappen-voor-professionele-sieradenfotografie` | `/en/blog/8-steps-to-professional-jewelry-photography` | 28 |
| 6 | `/es/blog/aprender-fotografia-joyas-ecommerce` | `/en/blog/technique-photograph-jewelry-tutorial` | 26 |
| 7 | `/nl/guide/welke-instellingen-om-sieraden-te-fotograferen` | `/en/guide/what-settings-to-photograph-jewelry` | 26 |
| 8 | `/es/guide/como-fotografiar-gafas-para-e-commerce` | `/en/guide/how-to-photograph-glasses-for-e-commerce` | 26 |
| 9 | `/es/guide/como-posicionar-reloj-para-fotos-producto` | `/en/guide/how-to-position-watch-before-shooting-photo` | 26 |
| 10 | `/es/blog/8-pasos-para-fotografiar-joyas-profesionalmente` | `/en/blog/8-steps-to-professional-jewelry-photography` | 25 |
| 11 | `/de/blog/welches-bildformat-ist-das-beste-fur-das-web` | `/en/blog/best-image-format-for-the-web` | 22 |
| 12 | `/de/fotostudio/alphashot-g2` | `/en/studio-photo/alphashot-g2` | 22 |
| 13 | `/de/guide/welche-einstellungen-zum-fotografieren-von-schmuck` | `/en/guide/what-settings-to-photograph-jewelry` | 20 |
| 14 | `/de/blog/8-schritte-zur-professionellen-schmuckfotografie` | `/en/blog/8-steps-to-professional-jewelry-photography` | 20 |

### URLs couvertes par catch-all (pas de redirection individuelle)
- `/de` (114 clics) -> `/en`
- `/nl` (22 clics) -> `/en`
- Toutes les autres URLs DE/ES/NL <20 clics -> `/en`

### Note sur le mapping
- `/es/blog/aprender-fotografia-joyas-ecommerce` : pas d'equivalent EN exact. Mappe vers `/en/blog/technique-photograph-jewelry-tutorial` (sujet le plus proche : tutoriel photo bijoux).

---

## Tache 2 : Verification redirections EN machines

### Etat du catch-all existant
Le catch-all `/en/photo-studio/:slug` -> `/en/studio-photo/:slug` fonctionne pour les machines dont le slug n'a pas change :
- `alphashot-360`, `alphashot-g2`, `alphashot-pro-g2`, `alphatable`, `alphadesk`, `bike-studio`, `fashion-studio`, `fashion-studio-basic`, `furniture-studio`

### Slugs qui ont change (Webflow -> Next.js)
**6 redirections individuelles ajoutees AVANT le catch-all** dans `/en/photo-studio/` :

| Ancien slug Webflow | Nouveau slug Next.js |
|---|---|
| `alphashot-micro` | `alphashot-micro-v2` |
| `alphashot-xl` | `alphashot-xl-v2` |
| `alphastudio-compact` | `alphastudio-compact-v2` |
| `alphastudio-xxl` | `alphastudio-xxl-v2` |
| `e-comm-studio` | `e-comm-studio-plus` |
| `360-turntables` | Pas de machine -> redirige vers `/en/studios-photo-automatises` (hub) |

**6 redirections supplementaires** dans `/en/studio-photo/` (acces direct avec ancien slug) vers les nouveaux slugs.

**Total Tache 2 : 12 redirections individuelles + 1 catch-all existant.**

---

## Tache 3 : Meta title/description (10 pages prioritaires)

### Resultat : HORS SCOPE CODE

Toutes les 10 pages ont leurs meta sourcees depuis le CMS. Aucune modification possible dans le code Next.js.

| Page | Source meta | Champs a modifier |
|---|---|---|
| `/en/blog/packshot-photography-guide-why-make-product-packshots` | Sanity ou Webflow | `seo.seoTitle` / `seo.seoDescription` (Sanity) ou `title`/`description` (Webflow) |
| `/en/guide/which-equipment-to-choose-for-jewelry-photo` | Webflow API | `meta-titre` / `meta-description` |
| `/blog/quel-format-d-image-pour-le-web` | Sanity ou Webflow | idem blog |
| `/blog/guide-photographie-packshot-pourquoi-faire-packshots` | Sanity ou Webflow | idem blog |
| `/en/blog/best-image-format-for-the-web` | Sanity ou Webflow | idem blog |
| `/en/blog/how-to-choose-best-lens-for-product-photography` | Sanity ou Webflow | idem blog |
| `/en/blog/how-to-e-commerce-product-photography` | Sanity ou Webflow | idem blog |
| `/blog/comment-maitriser-le-flou` | Sanity ou Webflow | idem blog |
| `/en/guide/what-settings-to-photograph-jewelry` | Webflow API | `meta-titre` / `meta-description` |
| `/blog/avantage-du-e-commerce-pour-les-entreprises` | Sanity ou Webflow | idem blog |

### Comment optimiser les meta (action PO)
1. **Articles blog Sanity** : dans Sanity Studio, champ `seo.seoTitle` et `seo.seoDescription` de chaque article
2. **Articles blog Webflow** : dans Webflow CMS, champs `title` et `description`
3. **Guides Webflow** : dans Webflow CMS, champs `meta-titre` et `meta-description`

### Recommandations meta (a appliquer dans le CMS)

| Page | Meta title recommande | Meta description recommandee |
|---|---|---|
| packshot-photography-guide... | Packshot Photography: 7 Reasons Your Products Need Pro Shots (2026) | Transform your product images with professional packshot photography. Learn why 87% of buyers rely on visuals. Get started now. |
| which-equipment-to-choose-for-jewelry-photo | Jewelry Photography Equipment: Complete 2026 Setup Guide | Find the best camera, lighting and studio for stunning jewelry photos. Step-by-step equipment guide with budget tips. |
| quel-format-d-image-pour-le-web | Format d'image web : AVIF, WebP ou JPEG ? Guide comparatif 2026 | Choisissez le bon format d'image pour votre site e-commerce. Comparaison AVIF vs WebP vs JPEG avec exemples concrets. |
| guide-photographie-packshot... | Photographie packshot : 7 raisons de faire vos propres visuels produit | Decouvrez pourquoi internaliser vos photos packshot booste vos ventes en ligne. Guide complet avec ROI et conseils pratiques. |
| best-image-format-for-the-web | Best Image Format for Web: AVIF vs WebP vs JPEG (2026 Guide) | Compare AVIF, WebP and JPEG for e-commerce. Find the optimal format for fast loading and sharp product images. |
| how-to-choose-best-lens... | Product Photography Lens Guide: 5 Best Options for Packshots (2026) | Choose the right lens for stunning product photos. Compare macro, prime and zoom options with real packshot examples. |
| how-to-e-commerce-product-photography | E-Commerce Product Photography: Complete Beginner's Guide (2026) | Master product photography for your online store. Lighting, backgrounds, editing tips to boost conversions by 30%+. |
| comment-maitriser-le-flou | Flou en photo produit : 5 techniques pour des images nettes | Eliminez le flou de vos photos e-commerce. Techniques de mise au point, stabilisation et focus stacking expliquees simplement. |
| what-settings-to-photograph-jewelry | Jewelry Photography Settings: Camera Setup for Stunning Shots | Get the exact aperture, ISO and lighting settings for professional jewelry photos. Works with any DSLR or mirrorless camera. |
| avantage-du-e-commerce... | E-commerce : 8 avantages cles pour votre entreprise en 2026 | Decouvrez comment le e-commerce augmente vos revenus, reduit vos couts et touche de nouveaux marches. Chiffres et exemples. |

---

## Problemes rencontres
- Aucun probleme technique (build OK)
- Les meta de toutes les pages cibles sont CMS-sourced, donc aucune modification code n'est possible

## Resume des commits
- **Commit 1** : Taches 1 + 2 (redirections DE/ES/NL + machines EN) dans `next.config.ts`
- **Commit 2** : N/A (Tache 3 = hors scope code, rapport uniquement)

## Build
`npm run build` passe sans erreur.
