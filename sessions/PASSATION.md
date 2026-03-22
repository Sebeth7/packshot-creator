# PASSATION SESSION PILOTE

> Ce document est destine a la prochaine session Claude Code qui prendra le relais.
> Il contient TOUT le contexte necessaire pour reprendre le travail.
> La session precedente (22/03/2026) a produit du code correct mais des prompts de sessions specialisees mediocres. Tous les prompts dans sessions/S1-S6b.md sont A REFAIRE.

---

## 1. QUI EST LE CLIENT

**Seb** — Photographe expert (25 ans), dirigeant de PackshotCreator/Sysnext. Distributeur exclusif Orbitvu (fabricant tcheque, leader mondial studios photo automatises) pour la France et la Suisse.

**Ce qu'il attend** :
- Du travail EN PROFONDEUR, pas du survol
- Si quelque chose n'est pas clair : poser la question, ne JAMAIS improviser
- Ne pas modifier la mission sans demander
- Ne pas mettre des images partout "par defaut" — garder les pages aerees
- Utiliser Banana 2 (gemini-3.1-flash-image-preview) pour la generation d'images, PAS Imagen
- Cle API Gemini dans `/Users/photodif/Documents/Clarisse/config/env.sh`
- URL de verification du site : `https://sysnext.vercel.app/fr` (PAS packshot-creator.com qui est l'ancien site)
- Ne JAMAIS utiliser le CLI Vercel, uniquement le dashboard
- Ne JAMAIS lancer le dev server local sans demander

---

## 2. ETAT DU PROJET

### Architecture technique
- **Framework** : Next.js App Router (app/[lang]/...)
- **i18n** : next-intl, fichiers `messages/fr.json` et `messages/en.json`
- **Styling** : Tailwind CSS avec couleurs custom (future-dusk-*, very-peri-*, etc.)
- **Animations** : Framer Motion via composants custom dans `components/animations/` :
  - `TextReveal` : titre mot par mot (stagger whileInView)
  - `ScrollReveal` : parallax Y + opacity lies au scroll
  - `SpringCard` : micro-interactions spring hover/tap
  - `SmoothScroll` : Lenis global (dans layout.tsx)
  - `FadeInView`, `StaggerContainer`, `StaggerItem` : pre-existants
- **Smooth scroll** : Lenis installe globalement
- **Images** : format AVIF privilegie, Next.js `<Image>` component
- **Schema.org** : composant `SchemaOrg` dans `components/seo/`
- **CMS** : Sanity (blog) + Webflow API (guides) — pas touche dans ces sessions

### Ce qui a ete fait (sessions 1-4, 22/03/2026)

**Session 1** : Fondations techniques
- Fix XSS (DOMPurify), error.tsx, loading.tsx x4, console.log cleanup, 4 redirects
- Home restructuree 13→11 sections, copy rewrite
- Audits complets CRO (8 pages), SEO, GEO

**Session 2** : Home finalisee + quick wins
- Home : validation visuelle, Schema.org, traduction EN complete
- CRO quick wins : Studios (vrais logos), IA (stats bar), Academy (badge OPCO), Contact (trust bar + schema)
- Page /calculateur-roi integree
- Page IA restructuree (10 sections, BlendAI.studio, Schema SoftwareApplication)

**Session 3** : Studios + Industrie + Infrastructure motion
- Studios restructure (10 sections, copy FR+EN)
- Industrie hub enrichi (14 secteurs, case studies, FAQ)
- Terminologie "systemes" partout (pas "machines")
- Maillage cross-links 3 pages
- Lenis smooth scroll + 4 composants motion crees
- REDESIGN RADICAL Studios ("Studio Light" — chaque section un layout unique)

**Session 4** (la session actuelle, problematique) :
- Redesign "Studio Light" applique sur : IA (9 sections), Industrie (6 sections), Home (4 sections), template packshot-* (toutes sections)
- Fixes responsive mobile (py-28→py-16 lg:py-28, ghost numbers, paddings, gaps)
- 3 images test Imagen generees puis SUPPRIMEES (mauvaise approche)
- Prompts sessions specialisees crees mais MEDIOCRES (a refaire)

### Bug critique decouvert par S1
**Animations opacity cassees sur 6 pages** — le hero apparait vide quand prefers-reduced-motion est actif. Pages touchees : IA, Contact, A propos, Industrie-Defense, pages produit, Academy. A corriger AVANT toute integration d'images.

---

## 3. FICHIERS CLES A LIRE

| Fichier | Contenu | Priorite |
|---------|---------|----------|
| `PLAN_PROD.md` | Document vivant, etat complet du projet, audits, decisions | CRITIQUE — lire en entier |
| `livrables/hero-assets-checklist.md` | Inventaire images existantes + specs pour nouvelles images (mis a jour par S1) | CRITIQUE pour les prompts images |
| `sessions/00-ORCHESTRATION.md` | Plan de parallelisation des sessions | A REFAIRE avec les nouveaux prompts |
| `sessions/S1-audit-images.md` | Prompt S1 (mediocre) | Exemple de ce qu'il ne faut PAS faire |
| `sessions/S2-S6b*.md` | Prompts S2-S6b (mediocres) | A REFAIRE |
| `messages/fr.json` | Traductions FR | ~1800 lignes, namespace par page |
| `messages/en.json` | Traductions EN | Miroir de fr.json |

### Pages principales et leurs fichiers

| Page | Fichier | Sections | Etat |
|------|---------|----------|------|
| Home | `app/[lang]/page.tsx` | 11 sections | Redesign Studio Light S4 (4 sections modifiees) |
| Studios | `app/[lang]/studios-photo-automatises/page.tsx` | 10 sections | Redesign radical S3 (REFERENCE de qualite) |
| IA | `app/[lang]/ia-photo-produit/page.tsx` | 10 sections + cross-links | Redesign Studio Light S4 |
| Industrie hub | `app/[lang]/industrie/page.tsx` | 8 sections + cross-links | Redesign Studio Light S4 |
| Packshot-* (x5) | `components/templates/PackshotLandingTemplate.tsx` | 7 sections | Redesign Studio Light S4 (via template) |
| Pages secteurs (x14) | `app/[lang]/industrie/[slug]/page.tsx` | Variable | PAS TOUCHE |
| Pages produits (x16) | `app/[lang]/studio-photo/[slug]/page.tsx` | Variable | PAS TOUCHE |
| Academy hub | `app/[lang]/academy/page.tsx` | Variable | Quick win OPCO seulement |
| Academy formations | `app/[lang]/academy/formations-packshot/`, `formations-ia/` | Variable | PAS TOUCHE |
| Contact | `app/[lang]/contact/page.tsx` | Variable | Partiel (trust bar + schema) |
| A propos | `app/[lang]/a-propos/page.tsx` | Variable | PAS TOUCHE |
| Industrie-Defense | `app/[lang]/industrie-defense/page.tsx` | Variable | PAS TOUCHE |
| Blog hub | `app/[lang]/blog/page.tsx` | Variable | PAS TOUCHE |

---

## 4. DECISIONS CLES (section 6 du PLAN_PROD.md)

- **"systemes"** pas "machines" — partout dans le site
- **"Packshot pro + IA"** pas "hybride" — dans toute la communication
- **BlendAI.studio** = solution IA proprietaire, customisable par client
- **/calculateur** = page interne, ne doit JAMAIS apparaitre publiquement (noindex)
- **Images** : AVIF partout (supporte la transparence comme PNG, ~10x plus leger)
- **3 types d'images** : A (AVIF transparent flottant avec ombre), B (photo full-width arriere-plan), C (pas d'image)
- Les animations motion (SpringCard, ScrollReveal) fonctionnent avec AVIF transparent
- **Banana 2** (gemini-3.1-flash-image-preview) pour generer les images, PAS Imagen

---

## 5. CE QUI RESTE A FAIRE — DETAILLE

### 5.1 Refaire TOUS les prompts de sessions specialisees

Les prompts actuels dans `sessions/S1-S6b.md` sont trop vagues. Chaque prompt doit contenir :

**Pour chaque session :**
- Le contexte COMPLET (pas "lire PLAN_PROD.md", mais les infos pertinentes DANS le prompt)
- La liste EXACTE des fichiers a modifier, avec leur chemin complet
- La structure ACTUELLE du fichier (combien de sections, quels layouts, quelles images deja presentes)
- Ce qui doit changer SPECIFIQUEMENT dans chaque section
- Les decisions de design a respecter (terminologie, couleurs, composants motion)
- Les anti-patterns a eviter (pas de grilles monotones, pas d'images partout, garder aere)
- Un exemple concret du niveau de qualite attendu (reference : page Studios `app/[lang]/studios-photo-automatises/page.tsx`)

**Problemes specifiques de chaque prompt actuel :**

**S1 (audit images)** — DEJA EXECUTE mais mal :
- N'a pas demande d'auditer les sections qui ont DEJA des images (pour verifier si elles sont au bon format)
- A injecte des biais "C" (pas d'image) de la session pilote
- N'a pas demande d'auditer les pages produits `/studio-photo/[slug]` en profondeur
- N'a pas specifie qu'il fallait analyser CHAQUE section de CHAQUE page individuellement
- Resultat : seulement 7 images haute priorite identifiees, probablement insuffisant
- **Action** : Ecrire un prompt S1-bis qui couvre les manques, OU integrer ces manques dans S5

**S2 (verif mobile)** — PAS ENCORE EXECUTE :
- Le prompt est OK dans sa structure mais ne pointe pas les problemes specifiques connus
- Il devrait mentionner le bug critique animations opacity decouvert par S1
- Il devrait lister les patterns CSS specifiques a verifier (py-16 lg:py-28, text-4xl lg:text-6xl, etc.)
- **Action** : Enrichir avec les patterns CSS et le bug opacity

**S3 (SEO Quick Wins)** — PAS ENCORE EXECUTE :
- Dit "chercher dans docs/" sans pointer les fichiers exacts
- Les 15 quick wins identifies sont dans PLAN_PROD.md section 3.5 mais seuls 2 sont detailles
- Il faudrait lister les 13 restants explicitement (ou au minimum pointer le fichier exact qui les contient)
- Les fichiers d'analyse sont probablement dans `docs/GAP_ANALYSIS/` ou `docs/06-seo-performance/`
- **Action** : Lire les fichiers d'audit SEO, extraire les 13 QW, les lister dans le prompt

**S4 (contenu GEO)** — PAS ENCORE EXECUTE :
- Ne donne pas la structure des pages existantes comme modele
- Ne specifie pas ou creer les nouvelles pages (sous /blog ? sous / directement ?)
- Ne donne pas les mots-cles cibles avec leurs volumes
- Ne donne pas d'outline de contenu
- **Action** : Definir la structure (route, sections, mots-cles), donner un outline

**S5 (integration images)** — DEPEND DE S1-bis ET de la generation par Seb :
- Le prompt est raisonnablement structure mais ne donne pas les specs techniques d'integration
- Il faudrait expliquer comment integrer chaque type (A et B) avec du code concret
- **Action** : Ajouter des exemples de code pour type A et type B

**S6a (Academy, Blog, A propos)** — PAS ENCORE EXECUTE :
- Ne decrit pas le contenu ACTUEL de chaque page
- Ne dit pas ce qui doit changer specifiquement
- "Enrichir contenu" c'est vague — enrichir QUOI ?
- Pour Academy : quelles formations existent ? quel contenu manque ?
- Pour Blog : c'est dynamique (Sanity) — que peut-on changer cote code ?
- Pour A propos : quelle est la story a raconter ? qui sont les membres de l'equipe ?
- **Action** : Lire chaque page actuelle, decrire son contenu, lister les changements specifiques

**S6b (Produits, Contact, Defense)** — PAS ENCORE EXECUTE :
- Ne decrit pas le template des pages produits
- Pour Contact : "ajouter questions de tri" — quelles questions ?
- Pour Defense : "ajouter logos" — quels logos ? quels cas clients ?
- **Action** : Lire les fichiers, decrire le contenu actuel, specifier les changements

### 5.2 Bug critique a corriger
Les animations opacity sont cassees sur 6 pages (hero apparait vide avec prefers-reduced-motion). Ce bug doit etre corrige soit :
- Dans une session dediee courte
- Soit integre dans S2 (qui deviendrait S2 "verif mobile + fix bugs")
- Pages touchees : IA, Contact, A propos, Industrie-Defense, pages produit, Academy

### 5.3 Le fichier hero-assets-checklist.md
Ce fichier (`livrables/hero-assets-checklist.md`) a ete mis a jour par la session S1.
Il contient l'inventaire complet des images existantes ET les specs pour les nouvelles images a generer.
C'est le document de reference pour Seb quand il generera les images avec Banana 2.
Mais il est probablement INCOMPLET (voir 5.1 sur les manques de S1).

### 5.4 Anti-collision pour les sessions paralleles
Le plan de parallelisation dans `sessions/00-ORCHESTRATION.md` est correct dans sa structure.
Le probleme c'est que `messages/fr.json` et `messages/en.json` sont partages par toutes les pages.
Regles :
- S3 (SEO) modifie les cles META existantes
- S4 (GEO) CREE de nouvelles cles (ne touche pas les existantes)
- S6a et S6b touchent des namespaces differents dans les fichiers de traduction
- Il ne faut JAMAIS que 2 sessions modifient le meme namespace en meme temps

---

## 6. METHODOLOGIE VALIDEE

### Approche sessions specialisees
- La session pilote cree des prompts detailles en fichiers .md
- Seb copie-colle ces prompts pour lancer des sessions Claude Code separees
- Les sessions parallelisables peuvent tourner en meme temps (respect des zones de fichiers exclusives)
- Chaque session produit un rapport dans `sessions/`
- Les resultats sont valides par la session pilote ou par Seb

### Approche images
- Auditer visuellement CHAQUE section via browser (chrome tools sur sysnext.vercel.app)
- Screenshoter chaque section
- Pour chaque section, decider type A/B/C en voyant le rendu REEL
- Ne PAS mettre des images partout — certaines sections sont mieux aerees
- Produire les specs dans hero-assets-checklist.md
- Seb genere les images lui-meme avec Banana 2
- Une session d'integration (S5) monte les images dans le code

### Conventions de code
- Composants motion : TextReveal, ScrollReveal, SpringCard (dans components/animations/)
- Layouts "Studio Light" : chaque section doit avoir un layout UNIQUE (pas de grilles monotones)
- Pattern sections : py-16 lg:py-28, gap-10 lg:gap-16, p-5 lg:p-10
- Ghost numbers : text-4xl lg:text-6xl (jamais de grande taille sans prefixe mobile)
- FAQ : toujours split sticky heading gauche + accordeon droite
- CTA final : toujours asymetrique 3/5 + 2/5
- Cross-links : style editorial avec separateurs verticaux
- La page Studios (`app/[lang]/studios-photo-automatises/page.tsx`) est LA REFERENCE du niveau de qualite attendu

---

## 7. MEMOIRE

Les fichiers memoire sont dans `~/.claude/projects/-Users-photodif-Documents-SYSNEXT-SITE-WEB/memory/` :
- `user_seb.md` — profil du client
- `feedback_images_approach.md` — types A/B/C, AVIF transparent, Banana 2
- `feedback_work_method.md` — travailler en profondeur, poser des questions
- `feedback_button_type.md` — type="button" sur les Button dans un form
- `feedback_vercel_project.md` — pas de CLI Vercel
- `reference_api_keys.md` — cles API dans Clarisse/config/env.sh
- `project_site_strategy.md` — strategie site, objectifs conversion
- `project_roi_calculator_status.md` — etat calculateur ROI

---

## 8. PREMIERE ACTION RECOMMANDEE

1. Lire ce document EN ENTIER
2. Lire `PLAN_PROD.md` EN ENTIER
3. Lire `livrables/hero-assets-checklist.md` EN ENTIER
4. Lire la page Studios (`app/[lang]/studios-photo-automatises/page.tsx`) EN ENTIER — c'est la reference de qualite
5. Pour CHAQUE session a refaire (S1-bis, S2, S3, S4, S5, S6a, S6b) :
   a. Lire les fichiers CONCERNES par cette session
   b. Comprendre le contenu ACTUEL
   c. Ecrire un prompt qui contient TOUTES les informations necessaires pour que la session puisse executer SANS chercher ni deviner
6. Presenter le plan a Seb pour validation AVANT de lancer les sessions
