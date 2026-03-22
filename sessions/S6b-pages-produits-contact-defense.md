# Session S6b : Pages Produits + Contact + Defense — Redesign "Studio Light"

## Objectif
Appliquer le redesign "Studio Light" aux 16 pages produit (via leur template), a la page Contact (form qualifiant), et a la page Industrie-Defense (adapter au contexte reel).

## Contexte projet

**PackshotCreator** — distributeur exclusif Orbitvu France/Suisse. 25 ans d'expertise, equipe de photographes. Cibles : fabricants/revendeurs avec 500+ photos/an. Pain points clients : time to market, reproductibilite, automatisation.

**Design "Studio Light"** : Chaque section a un layout UNIQUE. Voir `app/[lang]/studios-photo-automatises/page.tsx` comme REFERENCE qualite.

**Dossier projet** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

**Composants motion** (dans `@/components/animations`) : TextReveal, ScrollReveal, SpringCard, FadeInView, StaggerContainer, StaggerItem

## Pages a traiter

### 1. Pages Produit x16 (`app/[lang]/studio-photo/[slug]/page.tsx`)

**Ce fichier est un template partage** qui genere les 16 pages machines. Les donnees viennent de :
- `components/calculators/ROICalculator/lib/machines.ts` — array MACHINES avec specs, stats, FAQ, use cases
- `getMachineById(slug)` et `getSimilarMachines()` — helpers dans le meme fichier

**Structure ACTUELLE (12-13 sections) :**
| # | Section | Layout actuel | Ce qui change |
|---|---------|--------------|---------------|
| 1 | Hero Product | HeroSection split (texte + image machine + Quick Specs 4 cartes) | OK — garder, ajouter badge "Distributeur Exclusif Orbitvu France & Suisse" |
| 2 | IA Ready Banner | Full-width gradient (conditionnel si isIAReady) | OK — garder |
| 3 | Key Stats | Grid 3 cols centre | Transformer en **ruban stats** : fond sombre, chiffres 7xl blanc, gradient lateral |
| 4 | Key Advantages | Grid 3 cols cartes | Transformer en **split 4/8** : heading sticky gauche, cartes numerotees (ghost numbers) ScrollReveal + SpringCard droite |
| 5 | Technical Specs | Grid 2 cols (Dimensions + Features) | Transformer en **fond sombre** : gradient + tableau specs sur carte blanche flottante shadow-2xl |
| 6 | Use Cases + Limitations | Grid 2 cols (vert/amber) | Garder 2 cols mais ajouter SpringCard, FadeInView direction left/right |
| 7 | Intermediate CTA | Full-width gradient | OK — garder tel quel |
| 8 | Similar Machines | Grid 3 cols cartes | Ajouter ScrollReveal + SpringCard sur chaque carte machine |
| 9 | ROI Calculator CTA | Centre | Integrer dans le CTA intermediaire (section 7) pour eviter 2 CTAs de suite |
| 10 | Training Recommendation | Grid 2 cols | Transformer en **split inversé** : contenu gauche, gradient droite avec badges Qualiopi/OPCO |
| 11 | FAQ | Details/summary max-w-3xl | Transformer en **FAQ split** : heading sticky gauche, accordeon droite |
| 12 | Final CTA | Full-width gradient very-peri | Transformer en **CTA asymetrique 3/5+2/5** |
| 13 | SchemaOrg | Pas de rendu | OK — garder |

**Clés de traduction** : AUCUNE — tout est dans machines.ts (donnees hardcodees en FR/EN). Si des textes doivent etre ajoutes (ex: badge distributeur, headings de section), les mettre dans un nouveau namespace `studioProduct.*` dans messages/*.json.

**Attention** : Ce template impacte 16 pages. Tester avec au moins 2 machines differentes (ex: alphashot-pro-g2 et fashion-studio) pour verifier que le layout fonctionne avec des donnees differentes.

### 2. Contact (`app/[lang]/contact/page.tsx`)

**Structure ACTUELLE (4 sections) :**
| # | Section | Layout actuel | Ce qui change |
|---|---------|--------------|---------------|
| 1 | Hero | HeroSection simple | OK — garder minimaliste |
| 2 | Trust Bar | 3 badges inline horizontal (CheckCircle2 icons) | Transformer en **ruban** plus visible : fond clair, 3 badges plus grands avec icones, chiffres ("25 ans", "500+ clients", "Reponse 24h") |
| 3 | Main Content | Grid lg:5cols (3/5 form + 2/5 infos) | Garder le layout mais ameliorer : |
|   | — Form (gauche) | PipedriveContactForm dynamic import | **AJOUTER des questions de tri** dans le form : radio/select avec 4 options : Demo / Devis / Support / Formation. Modifier PipedriveContactForm (`components/forms/PipedriveContactForm.tsx`) |
|   | — Infos (droite) | Contact info + Showroom + FAQ 3Q | Ameliorer : ajouter badge "Reponse sous 24h", enrichir la FAQ (ajouter 2-3 questions), ajouter Schema FAQ |
| 4 | SchemaOrg | organizationSchema + localBusinessSchema | OK — garder |

**Namespace traduction** : `contact.*`
**Formulaire** : Le composant `PipedriveContactForm` est dans `components/forms/PipedriveContactForm.tsx`. Lire ce fichier pour comprendre les champs actuels avant de modifier.

**Questions de tri a ajouter au form :**
- Label : "Quel est l'objet de votre demande ?" / "What is your request about?"
- Options :
  1. "Demande de demonstration" / "Demo request"
  2. "Demande de devis" / "Quote request"
  3. "Support technique" / "Technical support"
  4. "Formation / Academy" / "Training / Academy"
- Placement : en debut de formulaire, avant les champs nom/email
- Type : radio buttons ou select (au choix selon l'UX)
- IMPORTANT : `type="button"` sur tout Button dans un form (convention du projet)

### 3. Industrie-Defense (`app/[lang]/industrie-defense/page.tsx`)

**Structure ACTUELLE (10 sections) :**
| # | Section | Contenu actuel |
|---|---------|---------------|
| 1 | Hero | Badge ShieldCheck, titre, 2 CTAs |
| 2 | Pain Points | 4 pain points industriels (AlertTriangle, Eye, BookOpen, UserX) |
| 3 | Technologies Orbitvu | 8 technologies en grid 4 cols |
| 4 | Segments Industriels | 6 secteurs (aero, defense, auto, medical, electronique, logistique) avec NORMES |
| 5 | Chiffres Cles | 4 stats (-90%, 500+, 1 EUR, 30 Mrd USD) |
| 6 | Cas d'Usage | 4 use cases (FAI, anti-contrefacon, aftermarket, MRO) |
| 7 | Machines Recommandees | 3 machines (alphashot-xl-v2, alphashot-pro-g2, alphastudio-xxl-v2) |
| 8 | Conformite & Normes | 8 normes badges + 4 points conformite |
| 9 | FAQ | 7 questions |
| 10 | CTA Final | Gradient very-peri |

**Namespace traduction** : `industrieDefense.*`

**POINTS CRITIQUES A VERIFIER :**

**A. Normes et certifications**
La page mentionne ces normes : AS9100, ISO 13485, IATF 16949, FDA/GMP, MIL-STD, ITAR/CMMC, IPC/RoHS, UID/IUID, NSN.

**ACTION REQUISE** : Avant de modifier la page, VERIFIER sur orbitvu.com que ces normes sont bien mentionnees en rapport avec les produits Orbitvu. Si elles ne sont PAS sur orbitvu.com, c'est qu'elles ont ete inventees par une session precedente et doivent etre SUPPRIMEES ou reformulees. Les machines Orbitvu ne sont probablement pas elles-memes certifiees a ces normes — ce sont les CLIENTS qui operent dans ces secteurs normes. La page doit dire "nos systemes s'integrent dans vos processus certifies AS9100" et non "nos systemes sont certifies AS9100".

**B. Client unique : Safran**
Le seul client defense actuel est Safran. C'est trop maigre pour une section "logos clients" (prevue dans le CRO audit). Options :
- Mentionner Safran comme cas client dans le texte (sans section logos dediee)
- Reformuler la page pour mettre l'accent sur les CAPACITES plutot que sur les references clients
- Si d'autres clients industriels non-defense existent (ex: automobile, electronique), les mentionner

**C. Redesign layout**
| # | Section | Ce qui change |
|---|---------|---------------|
| 1 | Hero | OK — garder |
| 2 | Pain Points | Transformer en **split 4/8** : heading sticky gauche, 4 cartes empilees ScrollReveal droite |
| 3 | Technologies | Garder grid 4 cols mais ajouter SpringCard + FadeInView |
| 4 | Segments | Transformer en **bento grid** : hero segment (aero) grand gauche + 5 compacts droite |
| 5 | Chiffres | Transformer en **ruban stats** : fond sombre, chiffres 7xl blanc |
| 6 | Cas d'Usage | Transformer en **timeline editoriale** : numeros geants, separateurs |
| 7 | Machines | Ajouter ScrollReveal + SpringCard |
| 8 | Conformite | Transformer en **fond sombre** : gradient, badges normes sur carte blanche flottante |
| 9 | FAQ | Transformer en **FAQ split** : heading sticky gauche, accordeon droite |
| 10 | CTA Final | Transformer en **CTA asymetrique 3/5+2/5** |

## Regles de design

1. Chaque section = layout UNIQUE (pas de grilles monotones)
2. Alternance fond clair / fond sombre
3. Composants motion partout (TextReveal, ScrollReveal, SpringCard, FadeInView)
4. Design epure, professionnel, pas de surcharge
5. Patterns CSS : `py-16 lg:py-28`, `gap-10 lg:gap-16`, ghost numbers `text-4xl lg:text-6xl`
6. Terminologie : "systemes" (pas "machines"), "Photo studio + IA" (pas "hybride")
7. Boutons dans un form : TOUJOURS `type="button"` (sauf le submit)

## Fichiers modifiables
- `app/[lang]/studio-photo/[slug]/page.tsx` — template pages produit
- `app/[lang]/contact/page.tsx` — page contact
- `app/[lang]/industrie-defense/page.tsx` — page defense
- `components/forms/PipedriveContactForm.tsx` — ajout questions de tri
- `messages/fr.json` et `messages/en.json` — cles pour ces pages uniquement
- `data/industrie-defense.ts` — si les normes doivent etre corrigees

## Fichiers INTERDITS
- Pages batch 1 (academy, formations, a-propos)
- Pages deja traitees (Home, Studios, IA, Industrie hub, packshot-*)
- Composants partages (animations, seo, hero) sauf si necessaire

## Livrable
- Template produit redesigne (tester avec 2 machines differentes)
- Contact : form avec questions de tri fonctionnel
- Defense : normes verifiees, page adaptee au contexte reel
- Build OK (`npm run build` sans erreur)
- Rapport dans `sessions/S6b-rapport.md`
