# S1-bis - Rapport d'audit images complet (section par section)

> Date : 2026-03-22
> Methode : Audit visuel (screenshots navigateur Chrome) + lecture code source via agents
> Pages auditees : 15 pages (10 principales + 2 templates + 3 secteurs)
> Sections analysees : ~102

---

## Synthese executive

**24 images identifiees** a generer ou integrer.

| Priorite | Nombre | Description |
|----------|--------|-------------|
| HAUTE | 15 | Bloquant conversion : hero manquants, illustrations absentes sur sections de demonstration |
| MOYENNE | 5 | Amelioration significative : screenshots, resultats features, cas d'usage |
| BASSE | 4 | Nice-to-have : milestones timeline, resultats techs |
| Integration code (pas de generation) | 7 | Images qui EXISTENT deja mais ne sont pas utilisees dans le code |

**Probleme structurel identifie** : le site decrit des resultats VISUELS (types de photos, fonctionnalites IA, cas d'usage industriels) sans les montrer. Paradoxe pour un site de photographie.

**Decouverte positive** : 5 images galerie listees MANQUANTE dans S1 existent en fait (creees le 15 fev 2026).

---

## Methode d'audit

1. Navigation sur chaque page via `https://sysnext.vercel.app/fr/{path}`
2. Screenshot section par section (scroll progressif)
3. Evaluation visuelle : "cette section montre-t-elle ce qu'elle decrit ?"
4. Pour les templates : audit du template + 1 page representative
5. Lecture code source en parallele via 6 agents (validation des images referencees vs affichees)

**Note** : le Mac de l'utilisateur a "Reduire les mouvements" active. Plusieurs sections utilisent des animations scroll-reveal qui ne se declenchent pas, laissant des zones visuellement vides (hero industrie-defense, cards philosophie IA, valeurs a-propos). Ce n'est pas un probleme d'image mais un bug d'accessibilite a traiter separement.

---

## Audit page par page

### 1. Homepage (`/fr`) — 11 sections

| # | Section | Image actuelle | Verdict | Recommandation |
|---|---------|---------------|---------|----------------|
| 1 | Hero (video/image Orbitvu) | Video + poster AVIF EN PLACE | OK | - |
| 2 | Social Proof (stats + 10 logos) | Logos SVG EN PLACE | OK | - |
| 3 | Pain Points (3 cards stats) | Icones Lucide | C | Stats chiffrees font office de visuel |
| 4 | **Piliers (Capture/IA/Formation)** | **Pas d'image** (pillar-*.avif existent mais PAS utilisees ici) | **A INTEGRER** | Les memes pilier images sont utilisees sur la page Studios mais PAS sur la Homepage. Incoherence. **Changement code uniquement.** |
| 5 | Machine Spotlight + mini-galerie | Machine AVIF + 3 gallery EN PLACE | OK | - |
| 6 | Temoignages (3 citations anonymes) | Pas d'image | C | Anonymes, stats (65%, 8 mois, 90%) servent de visuel |
| 7 | Why Automate (3 raisons) | Icones Lucide | C | Stats (1h, 10x, 100%) suffisent. why-automate/*.avif NON recommandees |
| 8 | Secteurs (12 grid) | 12 icones SVG EN PLACE | OK | - |
| 9 | CTA mid-page | Pas d'image | C | - |
| 10 | FAQ (6 questions) | Pas d'image | C | - |
| 11 | Final CTA (2 cards) | Pas d'image | C | - |

**Bilan Homepage** : 1 image a generer (`gallery/furniture-large.avif`) + 3 images a INTEGRER dans le code (pillar-*.avif).

---

### 2. Studios Photo Automatises (`/fr/studios-photo-automatises`) — 10 sections — PAGE REFERENCE

| # | Section | Image actuelle | Verdict | Recommandation |
|---|---------|---------------|---------|----------------|
| 1 | Hero (panorama gamme Orbitvu) | hero-studios-wide.avif EN PLACE | OK | Tres impactant |
| 2 | Social Proof (stats + 8 logos) | Logos SVG EN PLACE | OK | - |
| 3 | Approche 3 piliers (sticky + cards) | pillar-hardware visible, pillar-ia/formation probablement lazy | OK (verifier reduce motion) | - |
| 4 | **Types de visuels (4 cards bento)** | **AUCUNE image** | **PROBLEME MAJEUR** | 4 cards decrivant Packshot/360/Mode/FlatLay SANS montrer un seul exemple. Les images EXISTENT dans `gallery/`. **Changement code uniquement.** |
| 5 | Grille 16 machines | 16 AVIF machines EN PLACE | OK | - |
| 6 | Accompagnement (3 etapes) | Pas d'image | C | Timeline texte, fonctionnel |
| 7 | CTA ROI | Pas d'image | C | - |
| 8 | FAQ (6 questions) | Pas d'image | C | - |
| 9 | Final CTA (2 cards) | Pas d'image | C | - |
| 10 | Cross-links (3 cards) | Pas d'image | C | - |

**Bilan Studios** : 0 image a generer, mais 4 images a INTEGRER dans le code (`gallery/*.avif` dans cards "Types de visuels"). **C'est le probleme le plus visible du site : la page reference qualite photo ne montre pas de photos dans sa section-cle.**

---

### 3. IA Photo Produit (`/fr/ia-photo-produit`) — 11 sections

| # | Section | Image actuelle | Verdict | Recommandation |
|---|---------|---------------|---------|----------------|
| 1 | Hero (gradient + pillar-ia) | pillar-ia.avif (possiblement non rendu reduce motion) | A verifier | - |
| 2 | Philosophie (3 cards conceptuelles) | Icones Lucide | C | Texte conceptuel, before/after suit juste apres |
| 3 | **Comparatif "Packshot+IA vs IA pure"** | **Pas d'image** | **A GENERER** | Section CLE de differenciation. 2 images side-by-side : resultat BlendAI fidele vs resultat IA pure avec hallucinations. **HAUTE** |
| 4 | **BlendAI Platform (floating card)** | **Pas d'image** | **A GENERER** | Screenshot interface BlendAI.studio pour concretiser l'outil. **MOYENNE** |
| 5 | **Fonctionnalites (4 cards bento)** | 2 illustrations probablement EN PLACE mais non rendues | **A GENERER** | Hero card "Lifestyle" aux 2/3 vide. Besoin : exemple resultat lifestyle + grille multi-fonds. **HAUTE** |
| 6 | Resultats concrets (4 before/after) | 4 paires AVIF EN PLACE | OK | Section la plus impactante — les sliders fonctionnent |
| 7 | Stats + Testimonial | Pas d'image | C | Chiffres (100+, 5000+, 4.9/5) |
| 8 | Integration Orbitvu | ia-feature-integration.avif EN PLACE | OK | - |
| 9 | FAQ (5 questions) | Pas d'image | C | - |
| 10 | CTA (2 cards) | Pas d'image | C | - |
| 11 | Cross-links | Pas d'image | C | - |

**Bilan IA** : 4 images a generer (1 comparatif HAUTE, 2 features HAUTE, 1 screenshot MOYENNE).

---

### 4. Industrie Hub (`/fr/industrie`) — 8 sections

| # | Section | Image actuelle | Verdict | Recommandation |
|---|---------|---------------|---------|----------------|
| 1 | Hero | hero-industries.avif EN PLACE | OK | - |
| 2-8 | Secteurs grid, cas concrets, avantages, processus, FAQ, CTA, cross-links | Texte + icones | C | Contenu B2B dense mais scannable. Fonctionnel. |

**Bilan Industrie Hub** : 0 image a generer. Hero en place, rest text-only adequat.

---

### 5-7. Academy + Formations Packshot + Formations IA

Toutes trois suivent le meme pattern : hero avec pillar-*.avif EN PLACE, reste en cards texte + icones Lucide. Design informatif coherent.

**Bilan Academy (3 pages)** : 0 image a generer. Pages formation sont naturellement text-heavy.

---

### 8. Contact (`/fr/contact`) — 3 sections

Page formulaire. Aucune image necessaire. hero-contact.avif EXISTE mais n'est PAS recommande (design formulaire-first).

**Bilan Contact** : 0 image a generer.

---

### 9. A propos (`/fr/a-propos`) — 6 sections

| # | Section | Image actuelle | Verdict | Recommandation |
|---|---------|---------------|---------|----------------|
| 1 | **Hero** | **Pas d'image** (hero-a-propos existe mais pas utilise) | **A GENERER** | Page entreprise sans visage humain = froid. Photo equipe/showroom avec studios Orbitvu. **HAUTE** |
| 2 | Notre Histoire | Texte | C | - |
| 3 | Nos Valeurs (3 cards) | Icones | C | - |
| 4 | **Timeline Innovation (9 dates)** | 1 image supposee EN PLACE mais non rendue | **A INTEGRER** | 20 ans d'innovations PHYSIQUES sans photos des produits. Au minimum reutiliser machines/*.avif pour 2023-2024. **BASSE** |
| 5 | Chiffres (4 stats) | Pas d'image | C | - |
| 6 | CTA | Pas d'image | C | - |

**Bilan A propos** : 1 image HAUTE (equipe) + 2-3 BASSE (timeline).

---

### 10. Industrie-Defense (`/fr/industrie-defense`) — 10 sections

| # | Section | Image actuelle | Verdict | Recommandation |
|---|---------|---------------|---------|----------------|
| 1 | **Hero** | **ECRAN NOIR VIDE** (pas d'image, texte non rendu) | **CRITIQUE** | Hero background industriel (atelier, inspection). **HAUTE** |
| 2 | Problematiques (4 cards) | Icones rouges | C | Texte B2B suffisant |
| 3 | 8 Technologies (grid 4x2) | Icones | C / BASSE | Monotone mais fonctionnel. 2-3 exemples resultats (SuperFocus, Ghost Image) en BASSE |
| 4 | 6 Segments (grid 3x2) | Icones + badges normes | C | - |
| 5 | Resultats mesures (4 stats) | Pas d'image | C | - |
| 6 | **Cas d'usage (4 use cases)** | **Pas d'image** | **A GENERER** | FAI, anti-contrefacon, catalogage, MRO : resultats VISUELS decrits sans etre montres. 2 images min. **MOYENNE** |
| 7 | Systemes recommandes (3 machines) | Images machines EN PLACE | OK | - |
| 8 | Conformite normes | Badges texte | C | - |
| 9 | FAQ (7 questions) | Pas d'image | C | - |
| 10 | CTA | Pas d'image | C | - |

**Bilan Industrie-Defense** : 1 hero HAUTE + 2 cas d'usage MOYENNE + 2 techs BASSE = 5 images. Page la plus text-heavy du site.

---

### 11. Landings SEO (x5 via PackshotLandingTemplate)

Audite sur `/fr/packshot-bijoux` (representatif).

| # | Section | Image actuelle | Verdict | Recommandation |
|---|---------|---------------|---------|----------------|
| 1 | **Hero** | **Pas d'image** | **A GENERER** | Chaque landing vend un TYPE de photo sans en montrer un seul exemple. 5 hero specifiques par niche. **HAUTE** |
| 2 | Stats (3 chiffres) | Pas d'image | C | - |
| 3 | Avantages (5 cards) | Icones | C | - |
| 4 | Machines recommandees | Images machines EN PLACE | OK | - |
| 5 | FAQ (3 questions) | Pas d'image | C | - |
| 6 | CTA | Pas d'image | C | - |
| 7 | Cross-links | Pas d'image | C | - |

**Bilan Landings SEO** : 5 hero images a generer (1 par landing). Non-sens commercial actuel.

---

### 12. Machine Product Page (template x16)

Audite sur `/fr/studio-photo/alphashot-pro-g2`.

Image machine hero EN PLACE. Reste en cards texte/specs. Sections similaires + ROI + formation = OK.

**Bilan Machines** : 0 image a generer. 5 machines avec placeholders SVG (BASSE priorite de remplacement).

---

### 13-15. Secteurs (template x14, spot-check cosmetiques/automobile/bijoux)

Hero secteur-specific EN PLACE (12/12). Reste en texte (defis, solutions, cas client, FAQ). Design coherent.

**Bilan Secteurs** : 2 hero a generer pour les 2 nouveaux secteurs (industrie-manufacturiere, defense-securite).

---

## Actions prioritaires

### Sprint 1 — Images a GENERER (Banana 2 / Gemini)

| # | Image | Type | Pour | Priorite |
|---|-------|------|------|----------|
| 1 | Hero industrie-defense | B (background) | /industrie-defense | HAUTE |
| 2 | Hero secteur industrie-manufacturiere | B | /industrie/industrie-manufacturiere | HAUTE |
| 3 | Hero secteur defense-securite | B | /industrie/defense-securite | HAUTE |
| 4 | Hero landing bijoux | A (transparent) | /packshot-bijoux | HAUTE |
| 5 | Hero landing mode | A | /packshot-mode | HAUTE |
| 6 | Hero landing e-commerce | A | /packshot-e-commerce | HAUTE |
| 7 | Hero landing Amazon | A | /packshot-amazon | HAUTE |
| 8 | Hero landing industriel | A | /packshot-industriel | HAUTE |
| 9 | Photo equipe/showroom | A | /a-propos | HAUTE |
| 10 | Comparatif BlendAI vs IA pure | A | /ia-photo-produit | HAUTE |
| 11 | Galerie furniture | A | / (galerie homepage) | HAUTE |
| 12 | Feature IA lifestyle result | A | /ia-photo-produit | MOYENNE |
| 13 | Feature IA backgrounds grid | A | /ia-photo-produit | MOYENNE |
| 14 | Screenshot interface BlendAI | A | /ia-photo-produit | MOYENNE |
| 15 | Cas usage FAI inspection | A | /industrie-defense | MOYENNE |
| 16 | Cas usage MRO before/after | A | /industrie-defense | MOYENNE |
| 17-20 | Timeline milestones + techs industrie | A | /a-propos + /industrie-defense | BASSE |

### Sprint 2 — Integration CODE (images existantes, 0 generation)

| # | Action | Fichiers existants | Page cible |
|---|--------|-------------------|------------|
| A | Integrer pillar-*.avif dans cards piliers | pillar-hardware/ia/formation.avif | Homepage S4 |
| B | Integrer gallery/*.avif dans cards "Types visuels" | packshot-fondBlanc/360-product/fashion-model/flatlay-composition.avif | Studios S4 |
| C | Verifier rendu pillar-*.avif avec reduce motion | pillar-ia/formation.avif | Studios S3 |
| D | Verifier rendu hero IA avec reduce motion | pillar-ia.avif | IA S1 |

---

## Bug connexe identifie

**Reduce motion** : Le Mac de l'utilisateur a "Reduire les mouvements" active. Plusieurs sections utilisent des animations `whileInView` / `ScrollReveal` qui ne se declenchent pas, laissant des zones visuellement VIDES :
- Hero industrie-defense : ecran noir complet
- Cards philosophie IA : texte a peine visible
- Valeurs a-propos : cards fantomes
- Cas d'usage industrie-defense : section blanche vide

Ce n'est PAS un probleme d'image mais un bug d'accessibilite. Le fallback `useReducedMotion()` devrait afficher le contenu statiquement. A traiter dans une session dediee.
