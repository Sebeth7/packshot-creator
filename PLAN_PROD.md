# PLAN DE PRODUCTION - PackshotCreator
> Document vivant. Source de verite pour toutes les sessions Claude Code.
> Derniere MAJ : 2026-03-22 (session 2)

## 0. RESUME SESSION 2 (22/03/2026)
Chantier 1 TERMINE : Validation visuelle home (3 fixes : logos gap, tel nowrap, hybrid numbers), traduction EN complete (7 keys obsoletes supprimees, 3 nouvelles ajoutees : painPoints, socialProof, testimonials), Schema.org ajoute (AggregateRating, Product Alphashot, ItemList industries, LocalBusiness contact).
Chantier 2 EN COURS : CRO quick wins pages secondaires.

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
| /studios-photo-automatises | 7.5 | LOGOS PLACEHOLDER | Mettre vrais logos clients | - | - | - | FAIT 22/03 S2 — 8 vrais logos clients |
| /ia-photo-produit | 8 | Pas de stats/garanties | Ajouter "60% plus rapide" pres before/after | - | - | - | FAIT 22/03 S2 — barre 60%/10x/100% |
| /studio-photo/[machines] | - | - | - | - | - | - | A FAIRE |
| /academy (hub) | 7.5 | Pas de pricing visible | Montrer "From X€" ou "100% OPCO" | - | - | - | FAIT 22/03 S2 — badge OPCO 100% + Qualiopi |
| /academy/formations-packshot | - | - | - | - | - | - | A FAIRE |
| /academy/formations-ia | - | - | - | - | - | - | A FAIRE |
| /industrie (hub) | 7 | Pas de pages secteur liees | Creer liens vers /industrie/[secteur] | - | - | - | A FAIRE |
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
| Maillage inter-pages | PARTIEL | 15 liens ajoutes en S1, mais insuffisant |
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

## 5. DECISIONS PRISES

| Date | Decision | Raison |
|------|----------|--------|
| 2026-03-22 | Approche B : strategie d'abord, code ensuite | Eviter de refaire le travail sans vision SEO/GEO |
| 2026-03-22 | Document vivant PLAN_PROD.md comme cerveau persistant | Transfert de contexte entre sessions |
| 2026-03-22 | Images IA ok pour concepts, vraies photos pour resultats | Credibilite (on vend des solutions photo) |

---

## 6. SKILLS INSTALLES (session 2026-03-22)

- frontend-design (Anthropic) — UI bold, anti-generique
- copywriting (marketingskills) — copy conversion PAS/AIDA
- page-cro (marketingskills) — optimisation conversion
- claude-seo (13 sub-skills) — audit SEO complet
- geo-seo-claude (14 sub-skills) — audit GEO, citabilite IA
- image-generation (Gemini) — creation images depuis Claude Code
