# PLAN DE PRODUCTION - PackshotCreator
> Document vivant. Source de verite pour toutes les sessions Claude Code.
> Derniere MAJ : 2026-03-22 (session 3 complete)

## 0. RESUME SESSION 3 (22/03/2026)

### Phase 1 : Contenu & Structure (fait)
- **Page /studios-photo-automatises RESTRUCTUREE** (plan 5.1) : 10 sections, copy reecrit PAS/AIDA FR+EN, ROI Calculator embarque supprime (teaser vers /calculateur-roi), FAQ pricing-first, maillage cross-links
- **Hub /industrie ENRICHI** (plan 5.3) : "12"→"14 secteurs", descriptions SectorGrid, 4 mini case studies, FAQ transversale 5Q + FAQPage schema, maillage cross-links
- **Terminologie** : "machines"→"systemes" + "hybride"→"Photo studio + IA" dans toutes les traductions FR+EN
- **Maillage** : cross-links sur Studios, IA, Industrie (3 pages x 3 liens)

### Phase 2 : Infrastructure motion (fait)
- **Lenis smooth scroll** installe globalement (layout.tsx)
- **4 composants motion crees** dans components/animations/ :
  - `TextReveal` : titre mot par mot avec stagger (whileInView)
  - `ScrollReveal` : parallax Y + opacity lies au scroll (useScroll/useTransform)
  - `SpringCard` : micro-interactions spring hover/tap (whileHover/whileTap)
  - `SmoothScroll` : provider Lenis global
- Tous respectent prefers-reduced-motion

### Phase 3 : Redesign layout radical Studios (fait)
Concept "Studio Light" — chaque section a un layout unique :
- Section 2 Social Proof : **ruban sombre, stats 7xl blanc**, logos inverses
- Section 3 Piliers : **split 4/8**, heading sticky gauche, cartes horizontales image+texte droite, ghost numbers 6xl
- Section 4 Photo Types : **bento grid**, 1 hero card grande gauche + 3 compactes empilees droite
- Section 5 Selecteur : **fond sombre**, selecteur sur carte blanche flottante shadow-2xl
- Section 6 Accompagnement : **timeline editoriale**, numeros geants 9xl, lignes horizontales + separateurs
- Section 7 ROI Teaser : **gradient violet plein**, carte blanche flottante shadow-2xl + dot pattern
- Section 8 FAQ : **split layout**, heading sticky gauche, accordeon droite
- Section 9 CTA Final : **asymetrique 3/5 + 2/5**, demo dominante gradient violet
- Section 10 Cross-links : **style editorial**, separateurs verticaux, pas de cartes

### A faire en session 4
1. **PRIORITE : Appliquer le meme redesign layout sur /ia-photo-produit** — meme approche "Studio Light", chaque section unique, utiliser TextReveal/ScrollReveal/SpringCard
2. **Appliquer le meme redesign sur /industrie hub** — adapter les layouts bento/split/timeline au contenu secteur
3. **Appliquer sur la Home** — aligner sur le nouveau niveau (la Home est deja mieux que les autres mais certaines sections peuvent etre elevees)
4. **Pages /packshot-*** (bijoux, mode, e-commerce, amazon, industriel) : CRO + terminologie "systemes" + layouts modernes
5. **Contenus GEO** : article "Studio auto + IA vs IA generative pure", page budget
6. **Academy** : enrichissement formations detail
7. **Images** : Seb doit fournir (temoignages Home, types de photo Studios)

## 0.1 RESUME SESSION 2 (22/03/2026)

### Fait en session 2
- Chantier 1 TERMINE : Home — validation visuelle (3 fixes), traduction EN complete, Schema.org (AggregateRating, Product, ItemList, LocalBusiness)
- Chantier 2 CRO quick wins : Studios (vrais logos), IA (stats bar), Academy (badge OPCO), Contact (trust bar + schema)
- Fondations transversales : page /[lang]/calculateur-roi integree, ajoutee au menu dropdown Solutions, /calculateur interne noindex
- Page IA RESTRUCTUREE (10 sections) : hero, manifeste, "pourquoi la qualite de la base compte", BlendAI.studio plateforme, fonctionnalites, 4 before/after, preuve sociale, compatible systemes, FAQ 5 questions, CTA final. Schema SoftwareApplication. Traductions FR + EN.
- Audits complets realises : Studios (6.5/10), IA (6.2/10→8.5 apres restructuration), Industrie hub (5/10 hub, 8/10 pages secteur)

## 0.1 RESUME SESSION 1 (22/03/2026)
Chantier 0 FAIT : XSS fix, error.tsx, loading.tsx x4, console.log cleanup, 4 redirects.
Chantier 1 EN COURS : Home restructuree (13→11 sections), copy rewrite, build OK. Reste : validation visuelle, Schema.org, images, traduction EN.
Chantiers 2-4 : audits realises (CRO, SEO, GEO), plan documente, pas encore d'implementation.
Skills installes : frontend-design, copywriting, page-cro, claude-seo (13), geo-seo-claude (14), image-generation.

---

## 1. VISION & OBJECTIFS

**Mission du site** : Convaincre en < 1 minute que PackshotCreator est le leader de la photo produit automatisee, generer 10 leads qualifies/semaine (vs 10/mois actuellement), et filtrer le bruit (etudiants, petits budgets, comparateurs).

**Triple vocation de chaque page** :
1. LLM-friendly : comprehensible immediatement par ChatGPT, Perplexity, Claude
2. SEO : positionne sur les mots-cles strategiques
3. Conversion : le visiteur comprend, est convaincu, et agit

**Marche cible** : France + Suisse. Fabricants/revendeurs >500 photos/an. Tous secteurs. Nouveaux marches : industrie + defense.

**Concurrents** : Ortery, Styleshoots, Photorobot, Scancube. Concurrence SEO : SaaS IA (Photoroom, etc.)

**Differenciateurs** : 25 ans expertise, equipe de photographes, Orbitvu (leader mondial, fab europeenne), approche hybride hardware+IA+formation, 360/3D/detourage natifs.

---

## 2. CHANTIERS

### Chantier 0 : Fondations techniques
| Action | Statut | Priorite |
|--------|--------|----------|
| Fix XSS (dangerouslySetInnerHTML → DOMPurify) | FAIT 22/03 | CRITIQUE |
| Ajout error.tsx routes principales | FAIT 22/03 | CRITIQUE |
| Ajout loading.tsx routes principales (x4) | FAIT 22/03 | IMPORTANT |
| Nettoyage console.log (3 instances) | FAIT 22/03 | CRITIQUE |
| 4 redirects manquantes (produits, bouteilles, guide) | FAIT 22/03 | IMPORTANT |
| Deps inutiles (dotenv, gray-matter) | A FAIRE | FAIBLE |

### Chantier 1 : Home page — refonte impact & conversion
| Action | Statut | Notes |
|--------|--------|-------|
| Audit CRO actuel | FAIT | Score 8/10 |
| Plan nouveau deroulé (11 sections) | VALIDE 22/03 | Probleme → Solution → Preuve → Action |
| Redaction copy fr.json | FAIT 22/03 | Toutes les 11 sections, nouvelles clés painPoints + testimonials + socialProof |
| Restructuration page.tsx | FAIT 22/03 | 13 → 11 sections, build OK |
| Schema.org (AggregateRating, Product, ItemList) | FAIT 22/03 S2 | Home: AggregateRating, Product Alphashot, ItemList industries. Contact: LocalBusiness |
| Traduction EN (nouvelles cles) | FAIT 22/03 S2 | painPoints, socialProof, testimonials, hero/midCta/finalCta aligns. 7 cles obsoletes supprimees |
| Validation visuelle + fixes design | FAIT 22/03 S2 | Logos gap, tel nowrap, hybrid numbers color |
| Images manquantes | A FAIRE | Inventaire a faire |

**Structure validee (11 sections)** :
1. Hero (rewrite H1 "Packshot pro en 3 sec. Sans photographe.")
2. Social Proof Bar (fusion logos+stats conversion)
3. Pain Points (NOUVEAU — trop lent, trop cher, trop dependant)
4. Approche Hybride (rewrite, deplacement)
5. Product Spotlight + Gallery (fusion)
6. Temoignages (NOUVEAU — 3 resultats clients chiffres)
7. Pourquoi Automatiser (compacte, 3 colonnes)
8. Industries (garder, minor rewrite)
9. Mid CTA (rewrite + tel)
10. FAQ (rewrite 2/6 questions, dont pricing)
11. Final CTA (rewrite + micro-temoignage)
Supprime : 3 Piliers (absorbe), Blog (pas de job conversion)

### Chantier 2 : Pages principales — conversion page par page
| Page | CRO | Top probleme | Quick win | Copy | SEO | Images | Statut |
|------|-----|-------------|-----------|------|-----|--------|--------|
| /studios-photo-automatises | 7.5→9 | REDESIGN LAYOUT S3 | Copy + structure + layout radical "Studio Light" | FAIT S3 | FAIT S3 | - | FAIT 22/03 S3 — redesign complet (bento, split, timeline, asymetrique) |
| /ia-photo-produit | 8 | Pas de stats/garanties | Ajouter "60% plus rapide" pres before/after | - | - | - | FAIT 22/03 S2 — barre 60%/10x/100% |
| /studio-photo/[machines] | - | - | - | - | - | - | A FAIRE |
| /academy (hub) | 7.5 | Pas de pricing visible | Montrer "From X€" ou "100% OPCO" | - | - | - | FAIT 22/03 S2 — badge OPCO 100% + Qualiopi |
| /academy/formations-packshot | - | - | - | - | - | - | A FAIRE |
| /academy/formations-ia | - | - | - | - | - | - | A FAIRE |
| /industrie (hub) | 7→8.5 | ENRICHI S3 | Descriptions, case studies, FAQ, maillage | FAIT S3 | FAIT S3 | - | FAIT 22/03 S3 — 14 secteurs, FAQ, case studies |
| /industrie/[secteurs] x14 | - | - | - | - | - | - | A FAIRE |
| /industrie-defense | 7.5 | Pas de logos/cas clients | Ajouter 2-3 logos defense | - | - | - | A FAIRE |
| /contact | 8.5 | Form non qualifiant | Ajouter questions de tri | - | - | - | PARTIEL 22/03 S2 — trust bar + LocalBusiness schema |
| /a-propos | 7 | Pas de story fondateur | Ajouter bio fondateur + equipe | - | - | - | A FAIRE |
| /blog (hub) | - | - | - | - | - | - | A FAIRE |
| /blendai | - | - | - | - | - | - | A FAIRE |
| /packshot-amazon | - | - | - | - | - | - | A FAIRE |
| /packshot-e-commerce | - | - | - | - | - | - | A FAIRE |
| /packshot-bijoux | - | - | - | - | - | - | A FAIRE |
| /packshot-mode | - | - | - | - | - | - | A FAIRE |
| /packshot-industriel | - | - | - | - | - | - | A FAIRE |
| /calculateur | - | - | - | - | - | - | A FAIRE |
| /questions-cles | - | - | - | - | - | - | A FAIRE |
| /besoins-photographie | - | - | - | - | - | - | A FAIRE |
| /guide (hub) | - | - | - | - | - | - | A FAIRE |

### Patterns CRO transversaux identifies
1. **Social proof gap** : Seule la HOME a de vrais logos. STUDIOS=placeholder, IA/INDUSTRIE/ACADEMY/DEFENSE = aucun logo
2. **Schema.org gaps** : Manque ProductSchema (IA), FAQSchema (INDUSTRIE), LocalBusiness (CONTACT)
3. **Maillage faible** : STUDIOS ne lie pas vers IA, ACADEMY pas vers cours detail, INDUSTRIE pas vers secteurs
4. **Pas de qualification** : Aucune page ne filtre "ideal pour entreprises >500 photos/an"
5. **CTAs monotones** : 80% vont vers /contact. Manque variete (demo, devis, essai, guide)

### Chantier 3 : SEO / GEO
| Action | Statut | Resultats |
|--------|--------|-----------|
| Donnees Search Console | FAIT | 19,869 clics/an, "packshot" pos 8.3 = opportunite massive |
| Mots-cles strategiques | FAIT | 4 clusters identifies (hardware, IA, formation, sectoriel) |
| Schema.org audit | FAIT | OK sauf AggregateRating, LocalBusiness, SoftwareApplication |
| Quick Wins SEO restants (13/15) | A FAIRE | +325-655 clics/an potentiels |
| Test reponses LLMs | EN COURS | Agent en arriere-plan |
| Ajouter AggregateRating/Review | FAIT 22/03 S2 | Home: Org 4.8/127 + Product 4.9/45 |
| Ajouter LocalBusiness (contact) | FAIT 22/03 S2 | Adresse Villeurbanne, tel, horaires |
| Ajouter SoftwareApplication (BlendAI) | A FAIRE | |
| Pages definitoires manquantes | A FAIRE | "packshot", "photo 360", "studio automatise" |
| Pages comparaison | A FAIRE | "Orbitvu vs Ortery", "studio auto vs photographe" |
| Contenu TAYA (pricing, problems) | A FAIRE | Ref LLM.md |
| llms.txt | A FAIRE | |
| Maillage inter-pages | FAIT S3 | Cross-links sur Studios, IA, Industrie (3 pages x 3 liens) |
| YouTube / Reddit / PR digitales | A FAIRE | Hors scope code, mais impact GEO majeur |

### Chantier 4 : Images
| Action | Statut | Notes |
|--------|--------|-------|
| Inventaire images manquantes par page | A FAIRE | |
| Strategie : vraies photos vs IA | A FAIRE | Photos resultats = vraies. Concepts/ambiances = IA ok |
| Avant/apres par secteur (BlendAI) | A FAIRE | Lunettes, bijoux, bouteilles, mobilier... |
| Photos machines en situation | A FAIRE | |
| Style illustrations unifie | A FAIRE | |
| Optimisation (AVIF, responsive, alt texts SEO) | A FAIRE | |

---

## 3. AUDIT SEO/GEO — RESULTATS

### 3.1 Donnees Search Console (baseline, 3 mois)
Source : /DOCS FINAUX/Phase 4 de plan action/livrables/Pages.csv & Requetes.csv

**Trafic organique** : ~19,869 clics/an | 610 pages indexees

**Top requetes** :
| Requete | Clics | Impressions | CTR | Position |
|---------|-------|-------------|-----|----------|
| packshot creator | 330 | 1,093 | 30% | 2.0 |
| packshotcreator | 93 | 708 | 13% | 1.8 |
| packshot | 40 | 18,279 | 0.2% | 8.3 |
| ecommerce photo studio | 24 | 221 | 11% | 5.1 |
| orbitvu | 15 | 3,941 | 0.4% | 10.8 |

**Opportunite massive** : "packshot" = 18K impressions, position 8.3, CTR 0.2%. Monter en top 3 = potentiel x10-20 clics.

**Top pages par clics** :
- /en (419 clics, pos 12.3) — version EN performe mieux que FR
- /guide/modifier-couleur-produit-photo (249 clics)
- / homepage FR (195 clics, pos 16.1) — position trop basse
- /en/guide/jewelry-photo (188 clics, pos 6.9)
- /blog/format-image-web (173 clics)

### 3.2 Mots-cles strategiques (identifies dans LLM.md + GSC)

**Cluster Hardware (fort)** :
- "packshot" (2,400/mo) — pos 8.3
- "studio photo automatise" (880/mo) — pos 15.6
- "photo 360 produit" — volume moyen
- "orbitvu" / "alphashot" — brand match fort

**Cluster IA (a developper)** :
- "ia photo produit" (320/mo)
- "alternative photoroom" (500-1K)
- "generer photo produit ia" (300-700)
- "creer visuels lifestyle ia" (200-400)

**Cluster Formation** :
- "formation photo produit" (210/mo)
- "formation packshot" — a creer
- "financement OPCO formation photo" — niche

**Cluster Sectoriel (long tail)** :
- "photo bijoux professionnel", "photo vetement e-commerce"
- "packshot amazon", "photo cosmetique luxe"

**Requetes manquantes (contenu a creer)** :
- "Qu'est-ce qu'un packshot ?" — page definitoire manquante
- "Studio photo automatique prix" — page pricing/ROI
- "Comparatif solutions photo produit" — page comparaison
- "Comment photographier 100+ produits/jour ?" — pain point direct

### 3.3 Schema.org — etat actuel
| Schema | Couverture | Manque |
|--------|-----------|-------|
| Organization | Toutes pages | OK |
| FAQPage | 70+ FAQ (home, industries, guides) | Manque sur /industrie hub |
| Product | 16 machines | OK |
| Article | Blog + guides | OK |
| HowTo | 22 guides | OK |
| Course | Academy | OK |
| Breadcrumb | Toutes | OK |
| **AggregateRating** | Home (Org + Product) | FAIT 22/03 S2 |
| **LocalBusiness** | Contact | FAIT 22/03 S2 |
| **SoftwareApplication** | AUCUNE page | BlendAI non marquee |

### 3.4 Strategie LLM/GEO (deja documentee dans LLM.md)
**Lacunes critiques** :
1. **YouTube** : pas de chaine structuree (29.5% des AI Overviews citent YouTube)
2. **Reddit/Community** : aucune presence r/ecommerce, forums photo
3. **Mentions de marque externes** : faible, PackshotCreator peu cite hors site propre
4. **Contenu TAYA manquant** : pricing, problems, comparisons, reviews, best-of guides
5. **Pages definitoires** : "Qu'est-ce qu'un packshot", "Photo 360", "Studio automatise"

### 3.5 Quick Wins SEO (15 identifies, 2 appliques)
- QW#1 FAIT : Homepage "packshot" optimise (+200-400 clics/an)
- QW#7 FAIT : Hub IA "packshot logiciel" (+25-45 clics/an)
- Gain realise : +225-445 clics/an (40-50% du potentiel)
- Gain restant si 13 QW appliques : +325-655 clics/an supplementaires
- Ref: /docs/GAP_ANALYSIS/02-seo-gap.md, /docs/06-seo-performance/README.md

### 3.6 Visibilite dans les moteurs de recherche et LLMs (teste 2026-03-22)

**Bien positionne** :
| Requete | Position | Notes |
|---------|----------|-------|
| "automatiser photos produits e-commerce" (FR) | 1er | Meilleure perf, a consolider |
| "Orbitvu distributeur France" | 1er | Exclusivite territoriale claire |
| "studio photo produit automatique prix" | 3 resultats | Mais AUCUN prix affiche = moteurs IA passent |
| "formation photo produit Qualiopi" | Present | Signal Qualiopi pas assez explicite |
| "PackshotCreator" (marque) | 1er | Normal, mais avis tiers = 0 |

**Points aveugles critiques** :
| Requete | Probleme | Opportunite |
|---------|----------|-------------|
| "photo produit IA" | ABSENT TOTAL — capte par Claid, Flair, Pebblely | Article "Studio auto + IA vs IA pure" |
| "solution packshot e-commerce" | 1 lien vs 8 concurrents | Page landing dediee |
| "studio packshot professionnel France" | Confondu avec prestataires service | Guide "prestataire vs studio interne" |
| "meilleur studio photo automatise" | orbitvu.com devance packshot-creator.com | Cannibalisation par marque parente |
| "PackshotCreator review/avis" | 0 presence Trustpilot/G2/Capterra | URGENT creer profils avis tiers |

**Alertes** :
- packshotcreators.com (avec S) = domaine parasite, peut capter du trafic
- fr.packshot-creator.com vs packshot-creator.com = 2 domaines indexes, dilution autorite
- Article comparatif Orbitvu vs Ortery date de 2023 — LLMs penalisent l'anciennete
- Fil negatif dpreview.com indexe (client mecontent ancien)

**Contenus a creer en priorite (GEO Tier 1)** :
1. "Studio automatise + IA vs IA generative pure" — entrer dans le cluster IA
2. "Quel budget pour un studio photo automatise ?" — capter l'intention pricing
3. Profils Trustpilot + Capterra — les LLMs citent les avis tiers independants
4. "Prestataire packshot vs studio interne — que choisir ?"
5. MAJ comparatif Orbitvu vs Ortery vs Styleshoots 2026

---

## 4. AUDIT CRO — PAGE PAR PAGE (realise 2026-03-22)

### 4.1 Home (/) — 8/10
Forces : 10 vrais logos clients (Chanel, Amazon, Bosch...), gallery 6 images, video hero, structure claire 3 piliers.
Faiblesses : pas de temoignages quantifies, stats sans metrics conversion ("3x plus rapide"), pas de ProductSchema.
Actions : (1) 3-4 temoignages clients + resultats chiffres (2) ROI metrics en haut (3) Schema ProductCollection gallery

### 4.2 Studios photo automatises — 7.5/10
Forces : badge Orbitvu Partner, double CTA hero, MachineSelector, FAQ+schema, stats confiance.
Faiblesses : LOGOS CLIENTS = PLACEHOLDER ("PO ajoutera"), pas de before/after, pas de qualification volume, ROI calculator trop bas.
Actions : (1) URGENT remplacer placeholder logos (2) Ajouter before/after gallery (3) Bloc qualification "Ideal pour >100 SKUs"

### 4.3 IA photo produit — 8/10
Forces : hero split+badge BlendAI, manifesto 3 principes, 2 before/after sliders reels, 4 features, dual CTA final.
Faiblesses : pas de stats/garanties, pas de temoignages, features trop generiques, pas de ProductSchema.
Actions : (1) Stats pres before/after "80% plus rapide" (2) 2-3 temoignages mode/cosmetiques (3) Pricing anchor "ROI en 6 mois"

### 4.4 Industrie hub — 7/10
Forces : 12+ secteurs en grid, benefits avec metrics (50-300 produits/jour, 60-85% reduction couts), workflow 3 etapes.
Faiblesses : pas de pain points sectoriels, grid pas lié aux pages detail, pas de case study, pas de FAQ.
Actions : (1) Lier tuiles vers /industrie/[secteur] (2) 1-2 mini case studies (3) Pain points par secteur

### 4.5 Academy — 7.5/10
Forces : badge Qualiopi, 2 tracks (Packshot+IA), outils (simulateur OPCO, calendrier), FAQ+schema.
Faiblesses : pas de pricing, pas de temoignages diplomes, simulateur OPCO pas assez visible.
Actions : (1) Transparence prix "A partir de X€" ou "100% OPCO" (2) Success stories (3) Promouvoir simulateur OPCO plus haut

### 4.6 Contact — 8.5/10
Forces : page focalisee, form Pipedrive + infos contact, showroom adresse, Google Maps, 3 FAQ.
Faiblesses : form non qualifiant (pas de questions de tri), pas de badges confiance, pas de SLA reponse.
Actions : (1) Question qualification "Demo/Devis/Support/Formation" (2) Badges confiance (3) "Reponse sous 24h"

### 4.7 A propos — 7/10
Forces : mission+valeurs claires, timeline 9 ans, stats (20+ ans, 150 clients, 4000m²).
Faiblesses : stats sans contexte, pas de story fondateur, pas de photos equipe.
Actions : (1) Bio fondateur (2) Contextualiser stats "dont 5 Fortune 500" (3) Section equipe avec photos

### 4.8 Industrie Defense — 7.5/10
Forces : positionnement specialise, 10 sections completes, badges conformite (ISO, MIL), use cases + resultats.
Faiblesses : zero logo client defense, pas de case study nomme, conformite superficielle.
Actions : (1) 2-3 logos defense/industriels (2) Approfondir conformite "comment on assure ISO 9001" (3) Detail par segment

---

## 5. PLANS DE RESTRUCTURATION (Session 2, a valider)

> Objectif commun : UX parfaite pour la conversion, le visiteur trouve immediatement ce qu'il cherche et est convaincu de prendre RDV demo.
> Terminologie : "systemes" (pas "machines"). BlendAI.studio = solution proprietaire customisable.
> Concept IA : "Packshot pro + IA" (pas "hybride"). L'IA part d'un packshot de qualite studio (idealement Orbitvu). Pas de "photo reelle" generique (un tel portable ne suffit pas).

### 5.1 Page /studios-photo-automatises — FAIT (Session 3)

**Vocation** : Convaincre que les systemes Orbitvu sont LA solution pour internaliser sa production photo. Orienter le plus simplement possible vers le bon systeme. Convertir en demande de demo (si le prospect a le budget).

**Flux propose (10 sections)** :

| # | Section | Role | Heading propose |
|---|---------|------|-----------------|
| 1 | Hero | Accroche concrete, pas de jargon | "Produisez vos photos produit en interne. En 3 secondes." |
| 2 | Social Proof rapide | Credibilite immediate | Barre logos clients (Chanel, Amazon, Bosch...) + "500+ entreprises equipees" |
| 3 | 3 Piliers (garde) | Differenciation | "L'approche PackshotCreator : Photo studio + IA + Formation" |
| 4 | Types de photo | Segmentation par besoin — IMAGES A FOURNIR PAR SEB | "Quel type de visuel produisez-vous ?" (packshot, 360, mode, flat-lay) |
| 5 | Selecteur de systemes | Decouverte interactive, intro narrative | "Trouvez le systeme adapte a votre production" |
| 6 | Accompagnement | Reduction du risque | "Un accompagnement de A a Z" (inchange + SLA 24h) |
| 7 | Teaser Calculateur ROI | Renvoyer vers page dediee | "Calculez votre ROI en 2 minutes" — lien vers /calculateur-roi + apercu |
| 8 | FAQ | Objections, reordonnee par intent | "Questions frequentes" (6 questions, pricing en Q2) |
| 9 | CTA final | Double voie : demo ou guide | "Pret a voir nos systemes en action ?" — Demo 30min + Guide PDF |
| 10 | Maillage | SEO interne | Liens vers /ia-photo-produit, /industrie/*, /academy |

**Changements cles vs actuel** :
- SUPPRIME : Section ROI Calculator embarquee (deplacee vers page dediee /calculateur-roi)
- AJOUTE : Section 2 (social proof rapide), Section 7 (teaser calculateur), Section 10 (maillage)
- MODIFIE : Hero reecrit (concret), Types de photo (avec images, Seb les fournira), Selecteur (intro narrative + terminologie "systemes")
- GARDE : 3 Piliers, Accompagnement, FAQ (reordonnee), CTA final (clarifie)

**Navigation** : Ajouter "Calculateur ROI" dans le dropdown Solutions du Header.

**Terminologie** : Remplacer "machine(s)" par "systeme(s)" dans toute la page + traductions.

---

### 5.2 Page /ia-photo-produit — PLAN

**Vocation** : Convaincre que BlendAI (IA sur packshot pro) bat les solutions IA generative pure (Photoroom, Claid, Flair) pour le B2B. Positionner BlendAI.studio comme solution proprietaire customisable.

**Flux propose (10 sections)** :

| # | Section | Role | Heading propose |
|---|---------|------|-----------------|
| 1 | Hero | Accroche differenciante | "IA Photo Produit : vos produits, des declinaisons infinies" |
| 2 | Manifeste (garde) | Philosophie packshot pro + IA | "L'IA ne remplace pas la photo, elle la prolonge" (enrichi avec exemples concrets) |
| 3 | Pourquoi la qualite de la base compte (NOUVEAU) | Explication packshot pro + IA vs IA generative | "Pourquoi la qualite de la photo d'origine change tout" — 2 colonnes |
| 4 | BlendAI.studio (NOUVEAU) | Presenter la plateforme proprietaire | "BlendAI.studio : notre plateforme IA, votre avantage concurrentiel" |
| 5 | 4 Fonctionnalites (garde) | Capacites de BlendAI | "Ce que BlendAI fait pour vous" |
| 6 | Cas d'usage (enrichi) | Before/after multi-secteur | "Resultats concrets" — 4-6 secteurs (cosmetiques, mode, bijoux, deco, electronique) |
| 7 | Preuve sociale (NOUVEAU) | Clients + chiffres sources | "100+ marques, 5000+ visuels crees" + quotes |
| 8 | Compatible Studios (garde) | Pont vers offre hardware | "Compatible avec tous les systemes Orbitvu" |
| 9 | FAQ + Comparatif | Objections + table comparative | "BlendAI vs les autres solutions IA" — table Photoroom/Claid/Flair |
| 10 | CTA final (clarifie) | Double voie | "Tester BlendAI" (essai gratuit) vs "Demo Studio + IA" |

**Section 3 — Pourquoi la qualite de la base compte (contenu cle)** :
- Colonne gauche "IA generative pure (Photoroom, Claid, Flair)" : genere le produit de zero, approximations possibles (textures, couleurs, details), ok pour prototypes/basique
- Colonne droite "Packshot pro + IA (BlendAI)" : part d'un packshot de qualite studio, l'IA ne touche pas au produit, elle cree le decor autour. Fidelite 100%, zero hallucination.
- Message cle : "La qualite de votre photo de depart determine la qualite de toutes vos declinaisons. Un packshot professionnel Orbitvu = la meilleure base possible."

**Section 4 — BlendAI.studio (contenu cle)** :
- BlendAI.studio est la solution proprietaire de PackshotCreator
- Plateforme SaaS : upload packshot pro → choix style → generation → export
- 100+ styles professionnels, creation de styles personnalises
- Retouche experte humaine incluse (24-72h, garantie 100%)
- Zero prompts, zero complexite IA
- **Customisable** : developpement de fonctions specifiques par client (workflows post-prod, traitements par lots, retouche auto, integration API)
- Pricing transparent : a partir de 75€/mois, 3 credits gratuits pour tester

**Section 9 — Table comparative** :
| Critere | BlendAI (Packshot pro + IA) | Photoroom / Claid / Flair (IA generative) |
|---------|----------------------------|-------------------------------------------|
| Base | Packshot qualite studio | Pas de photo requise (generation pure) |
| Fidelite produit | 100% garantie | ~80-85% (hallucinations possibles) |
| Retouche humaine | Incluse (24-72h) | Non |
| Styles personnalises | Oui, reutilisables a l'infini | Limites |
| Dev sur mesure | Oui (solution proprietaire) | Non |
| Cas ideal | B2B >500 photos/an, luxe, fidelite critique | Prototypes, e-commerce basique |

**Schema.org a ajouter** : SoftwareApplication (BlendAI)

---

### 5.3 Page /industrie (hub) — FAIT (Session 3)

**Vocation** : Hub de navigation vers les pages secteur. Doit donner envie de cliquer en montrant que PackshotCreator comprend les contraintes de chaque industrie.

**Flux propose (7 sections)** :

| # | Section | Role | Heading propose |
|---|---------|------|-----------------|
| 1 | Hero | Accroche sectorielle | "Votre secteur, notre expertise" (garde) |
| 2 | Grille secteurs (enrichie) | Navigation avec contexte | Chaque tuile = icone + nom + 1 ligne description + lien |
| 3 | Chiffres cles (garde) | Value props | "Production acceleree, ROI rapide, coherence garantie" |
| 4 | Mini case studies (NOUVEAU) | Preuve cross-secteur | 3-4 resultats clients de secteurs differents |
| 5 | Workflow (garde, compact) | Process universel | "Packshot → IA → Diffusion" |
| 6 | FAQ transversale (NOUVEAU) | Objections communes | 4-5 questions tous secteurs + schema FAQPage |
| 7 | CTA final (contextualise) | Conversion | "Quel est votre secteur ?" + Demo + Devis |

**Changements cles** :
- Grille : activer le champ `description` deja present dans SectorGrid mais non affiche
- Corriger "12 secteurs" → "14 secteurs" (ou le vrai nombre)
- Ajouter FAQ avec schema
- Ajouter mini case studies (puiser dans /data/secteurs.ts qui a deja les cas clients)

---

### 5.4 Fondations transversales — PLAN

| Action | Detail |
|--------|--------|
| Page /calculateur-roi | Integrer comme page i18n (/[lang]/calculateur-roi) au lieu de standalone. Garder exclusion middleware pour URL legacy. Mettre a jour Cloudflare si besoin. |
| Navigation Header | Ajouter "Calculateur ROI" dans dropdown Solutions (avec icone Calculator) |
| /calculateur (interne) | S'assurer qu'il n'apparait pas dans sitemap, pas de lien public, meta noindex |
| Terminologie | "machine(s)" → "systeme(s)" dans toutes les pages modifiees + traductions |
| Maillage inter-pages | Studios ↔ IA ↔ Industrie ↔ Academy — liens contextuels en fin de chaque page |

---

## 6. DECISIONS PRISES

| Date | Decision | Raison |
|------|----------|--------|
| 2026-03-22 | Approche B : strategie d'abord, code ensuite | Eviter de refaire le travail sans vision SEO/GEO |
| 2026-03-22 | Document vivant PLAN_PROD.md comme cerveau persistant | Transfert de contexte entre sessions |
| 2026-03-22 | "systemes" pas "machines" | Terminologie commerciale PackshotCreator |
| 2026-03-22 | "Packshot pro + IA" pas "hybride" | "Hybride" n'explique rien au client. Le message = qualite de la photo d'origine est critique, un tel ne suffit pas |
| 2026-03-22 | BlendAI.studio = solution proprietaire customisable | Pas un outil generique. On peut developper des fonctions sur mesure par client (workflows, batch, retouche auto, API) |
| 2026-03-22 | ROI Calculator dans page dediee /calculateur-roi | Sorti de la page Studios pour alleger. Accessible via menu dropdown Solutions |
| 2026-03-22 | /calculateur = page interne uniquement | Ne doit JAMAIS apparaitre publiquement, noindex |
| 2026-03-22 | Studios : objectif = convaincre + orienter vers le bon systeme + demo | Mais seulement si le prospect a le budget (sinon perte de temps en demos) |
| 2026-03-22 | Images types de photo : Seb les fournira | Ne pas generer d'images placeholder pour les cartes types de photo (packshot, 360, mode, flat-lay) |
| 2026-03-22 | Images IA ok pour concepts, vraies photos pour resultats | Credibilite (on vend des solutions photo) |

---

## 6. SKILLS INSTALLES (session 2026-03-22)

- frontend-design (Anthropic) — UI bold, anti-generique
- copywriting (marketingskills) — copy conversion PAS/AIDA
- page-cro (marketingskills) — optimisation conversion
- claude-seo (13 sub-skills) — audit SEO complet
- geo-seo-claude (14 sub-skills) — audit GEO, citabilite IA
- image-generation (Gemini) — creation images depuis Claude Code
