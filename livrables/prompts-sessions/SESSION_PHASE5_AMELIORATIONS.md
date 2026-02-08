# SESSION PHASE 5 - Ameliorations UX, Contenu, Fonctionnel & Medias

**Modele requis : Claude Opus 4.6**
**Date de creation : 8 fevrier 2026**
**Contexte : Session pilote d'amelioration post-implementation**

---

## CONTEXTE GLOBAL

### Le projet
Migration du site **packshot-creator.com** de Webflow vers Next.js. Le site est **LIVE en production** sur Vercel. Toutes les phases d'implementation initiales sont terminees (P0 a P9). Le site comporte **158 pages**, **366 tests Playwright**, un **GA4** fonctionnel et un **cookie banner RGPD**.

### Working directory
`/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

### Stack technique
- **Framework** : Next.js 16.1.1 (App Router)
- **React** : 19
- **TypeScript** : strict
- **CSS** : Tailwind CSS v4
- **i18n** : next-intl (FR/EN, prefix 'always')
- **CMS** : Sanity (blog recents, formations) + Webflow API v2 (guides, blog legacy)
- **Forms** : Pipedrive WebForms
- **Animations** : Framer Motion (pattern whileInView, SSR-safe)
- **Deploiement** : Vercel
- **Tests** : Playwright (e2e/)
- **Analytics** : GA4 (G-3SDSW22JWZ) conditionne au consentement cookies

### Positionnement
PackshotCreator = distributeur exclusif Orbitvu France & Suisse, 3 piliers :
1. **Capture** (Hardware) - Studios photo automatises Orbitvu (16 machines)
2. **Creation** (IA) - BlendAI, retouche IA, lifestyle IA
3. **Formation** - Academy certifiee Qualiopi

### Design System (Brandbook)
- **Couleurs** : Very Peri `#6667AB`, Future Dusk `#4c5578`
- **Hero** : `bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800`
- **Sections** : `py-20`, `max-w-7xl mx-auto px-4 sm:px-6`
- **Cards** : `rounded-2xl border border-neutral-100 bg-white`
- **CTA gradient** : `bg-gradient-to-r from-very-peri-600 to-very-peri-700`
- **Bouton primaire** : `bg-very-peri-500 hover:bg-very-peri-600 text-white`
- **Bouton fond sombre** : `bg-transparent border border-white/40`
- **Texte titres** : `text-future-dusk-900`
- **Texte body** : `text-future-dusk-600`
- **Icones** : Lucide uniquement. **JAMAIS d'emojis.**
- **Brandbook complet** : `livrables/BRANDBOOK_WEB_COMPLET.md` + `livrables/BRANDBOOK_WEB_ANNEXES.md`

### Patterns critiques
- **Link** : `import { Link } from '@/i18n/routing'` (JAMAIS `next/link`, sauf `not-found.tsx`)
- **Params** : `{ params }: { params: Promise<{ lang: string }> }`
- **Pages** : Self-contained, PAS d'import Header/Footer (layout.tsx les gere)
- **SchemaOrg** : `import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg'` (default export)
- **Animations** : `FadeInView`, `StaggerContainer`, `StaggerItem` depuis `@/components/animations`
- **Traductions** : `getTranslations` de `next-intl/server`. Cles en objets imbriques (PAS de `.` dans les noms de cles)
- **Reduce motion** : Le PO a "Reduce motion" active sur Mac. Toujours verifier le fallback.

---

## DOCUMENTS DE REFERENCE

| Document | Chemin | Contenu |
|----------|--------|---------|
| **Master reference** | `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/SESSION_PILOTE_MASTER_REFERENCE.md` | Plan d'action complet, suivi d'avancement |
| **Brandbook** | `livrables/BRANDBOOK_WEB_COMPLET.md` | Spacing, grids, 13 composants, 6 templates de page |
| **Brandbook annexes** | `livrables/BRANDBOOK_WEB_ANNEXES.md` | Icones, images, animations, etats interactifs |
| **Audit initial** | `livrables/prompts-sessions/AUDIT_INITIAL_2026-02-08.md` | Etat du codebase au 8 fevrier |
| **Rapports sessions** | `livrables/prompts-sessions/S*-RAPPORT.md` | Comptes-rendus de chaque session |
| **Etude industrie/defense** | Integree dans `data/industrie-defense.ts` | Donnees marche industriel/militaire |
| **Donnees GSC** | `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/Pages.csv` | 808 URLs avec clics/impressions |

---

## ARCHITECTURE DES PAGES (158 pages)

### Pages principales (a analyser en priorite)
```
app/[lang]/page.tsx                              # Homepage
app/[lang]/studios-photo-automatises/page.tsx     # Hub studios (6 machines)
app/[lang]/studio-photo/[slug]/page.tsx           # Fiche machine (16 machines)
app/[lang]/ia-photo-produit/page.tsx              # BlendAI / IA
app/[lang]/academy/page.tsx                       # Hub academy
app/[lang]/academy/formations-packshot/page.tsx   # Formations packshot
app/[lang]/academy/formations-ia/page.tsx         # Formations IA
app/[lang]/industrie/page.tsx                     # Hub industrie (14 secteurs)
app/[lang]/industrie/[slug]/page.tsx              # Fiche secteur
app/[lang]/contact/page.tsx                       # Contact (Pipedrive form)
app/[lang]/blog/page.tsx                          # Hub blog
app/[lang]/blog/[slug]/page.tsx                   # Article blog
app/[lang]/guide/page.tsx                         # Hub guides
app/[lang]/guide/[slug]/page.tsx                  # Guide detail
```

### Landing pages SEO (creees le 8 fev)
```
app/[lang]/packshot-bijoux/page.tsx
app/[lang]/packshot-mode/page.tsx
app/[lang]/packshot-e-commerce/page.tsx
app/[lang]/packshot-amazon/page.tsx
app/[lang]/packshot-industriel/page.tsx
app/[lang]/industrie-defense/page.tsx
app/[lang]/besoins-photographie-produit/page.tsx
app/[lang]/questions-cles-photographie-produit/page.tsx
```

### Pages legales et autres
```
app/[lang]/a-propos/page.tsx
app/[lang]/mentions-legales/page.tsx
app/[lang]/confidentialite/page.tsx
app/[lang]/cgu/page.tsx
app/[lang]/academy/calendrier/page.tsx
app/[lang]/academy/simulateur-opco/page.tsx
app/[lang]/studio-photo/selecteur-machines/page.tsx
```

---

## LES 4 CHANTIERS D'AMELIORATION

### CHANTIER 1 : Etoffer les sections des pages

**Probleme** : Certaines pages sont trop legeres, manquent de contenu, donnent une impression de "site vide". Il faut ajouter des sections informatives qui apportent de la valeur.

**Methode** :
1. Parcourir chaque page principale sur localhost:3333 (ou lire le code source)
2. Identifier les pages qui manquent de contenu (moins de 4-5 sections)
3. Proposer des sections a ajouter avec leur contenu
4. Implementer apres validation PO

**Pages a auditer en priorite** :
- Homepage (`/fr`) : pilier central, doit etre riche et convaincante
- Studios hub (`/fr/studios-photo-automatises`) : vitrine produits
- IA (`/fr/ia-photo-produit`) : page BlendAI
- Academy (`/fr/academy`) : offre de formation
- Fiches machines (`/fr/studio-photo/[slug]`) : 16 fiches produit
- A propos (`/fr/a-propos`) : credibilite de l'entreprise

**Types de sections a envisager** :
- Temoignages clients / logos clients
- Comparatifs (avant/apres, nous vs concurrence)
- Chiffres cles / stats
- Process en etapes (comment ca marche)
- Video de demo / galerie
- FAQ enrichie
- Cas d'usage concrets
- Certifications / garanties

### CHANTIER 2 : Gestion des images et videos

**Probleme** : Les images sont souvent des placeholders, des images generiques, ou absentes. Les videos de demo n'existent pas. Le site manque d'impact visuel.

**Etat actuel** :
- Images machines : dans `/public/images/machines/` (format .avif)
- Images hero : dans `/public/images/hero/`
- Pas de dossier `/public/og/` rempli (juste `.gitkeep`)
- Pas de videos
- Pas de galerie de realisations clients

**Methode** :
1. Inventorier toutes les images utilisees et manquantes
2. Identifier les emplacements ou des visuels auraient un fort impact
3. Proposer une strategie : quelles images creer/obtenir, formats, hebergement
4. Pour les videos : proposer une integration (YouTube embed, Vimeo, fichiers locaux)
5. Implementer le code (composants, lazy loading, formats optimises)

**Points d'attention** :
- Toutes les images doivent utiliser `next/image` avec `width`, `height`, `alt`
- Images above-the-fold : `priority`
- Format recommande : AVIF > WebP > JPEG
- Videos : strategy `lazyOnload`, facade pattern (thumbnail cliquable qui charge le player)
- Le PO gerera le remplacement des placeholders par les vraies images a la fin

### CHANTIER 3 : Verification fonctionnelle complete

**Probleme** : Certains liens, formulaires ou interactions peuvent etre casses ou dysfonctionnels malgre les 366 tests Playwright existants.

**Methode** :
1. Tester manuellement le formulaire de contact Pipedrive (soumission reelle)
2. Verifier tous les CTA (liens vers /contact, /contact?subject=demo, etc.)
3. Tester le cookie banner (accepter, refuser, personnaliser, reouverture via footer)
4. Verifier le calculateur ROI (parcours complet)
5. Verifier le simulateur OPCO (parcours complet)
6. Verifier le selecteur de machines
7. Tester le switch de langue FR/EN sur chaque type de page
8. Verifier les ancres (liens internes avec #)
9. Tester la navigation mobile (menu hamburger)
10. Verifier les liens externes (Orbitvu, BlendAI, etc.)

**Tests existants** (dans `e2e/`) :
- `seo.spec.ts` : 253 tests (status, title, desc, canonical, hreflang, JSON-LD, OG)
- `redirections.spec.ts` : 62 tests (toutes les 301)
- `responsive.spec.ts` : 48 tests (mobile/tablet/desktop)
- `internal-links.spec.ts` : 3 tests (liens homepage)

**Tests a ajouter** :
- Test du formulaire contact (mock ou verif DOM)
- Test du parcours ROI calculator
- Test du parcours OPCO simulator
- Test du cookie banner
- Test du switch langue

### CHANTIER 4 : Ameliorer les articles de blog

**Probleme** : Les articles de blog (80 depuis Webflow) sont du texte brut, sans mise en forme professionnelle, sans visuels, sans structure engageante.

**Etat actuel** :
- 80 articles Webflow (HTML) + 9 articles Sanity (Portable Text)
- Le template blog (`app/[lang]/blog/[slug]/page.tsx`) rend le HTML Webflow tel quel et le Portable Text Sanity via `@portabletext/react`
- Pas de sommaire, pas de callouts, pas d'illustrations inline, pas de CTA inter-articles

**Methode** :
1. Ameliorer le template de rendu blog pour les articles Webflow :
   - Ajouter un sommaire automatique (table of contents depuis les H2/H3)
   - Ajouter un CTA en fin d'article (newsletter, contact, produit lie)
   - Ameliorer la typographie (line-height, spacing, max-width pour la lisibilite)
   - Ajouter un composant "Articles lies" en bas
   - Ajouter un temps de lecture estime
   - Ajouter des separateurs visuels entre sections

2. Pour les articles Sanity, ameliorer les `portableTextComponents` :
   - Composant Callout (info, warning, tip)
   - Composant Image avec caption
   - Composant CTA inline

3. **Migration progressive** des 8 top articles Webflow vers Sanity (optionnel, moyen terme) :
   - Les 8 articles a plus forte impression (155K impressions/3 mois)
   - Conversion HTML -> Portable Text
   - Enrichissement avec visuels et structure

**Les 8 articles prioritaires** (par impressions GSC) :
| Slug | Impressions/3m | Source |
|------|---------------|--------|
| `packshot-photography-guide-why-make-product-packshots` | 29 683 | Webflow EN |
| `quel-format-d-image-pour-le-web` | 26 366 | Webflow FR |
| `guide-photographie-packshot-pourquoi-faire-packshots` | 19 105 | Webflow FR |
| `best-image-format-for-the-web` | 16 946 | Webflow EN |
| `how-to-choose-best-lens-for-product-photography` | 16 778 | Webflow EN |
| `how-to-e-commerce-product-photography` | 11 067 | Webflow EN |
| `comment-maitriser-le-flou` | 8 480 | Webflow FR |
| `avantage-du-e-commerce-pour-les-entreprises` | 6 605 | Webflow FR |

---

## DONNEES CLES DU CODEBASE

### Machines (16) - dans `components/calculators/ROICalculator/lib/machines.ts`
Alphashot 360, Alphashot G2, Alphashot Pro G2, Alphashot Micro Pro v2, Alphashot XL v2, Alphashot XL Wine v2, Alphashot XL Pro v2, Alphadesk v2, Alphastudio Compact v2, Alphastudio XXL v2, Alphastudio XXL Pro v2, E-Comm Studio Plus, Fashion Studio, Fashion Studio Basic, Bike Studio, Furniture Studio

### Secteurs (14) - dans `data/secteurs.ts`
chaussures, bijoux-joaillerie, mobilier-decoration, food-alimentaire, cosmetiques-beaute, mode-textile, electronique-hightech, pieces-techniques-industrie, automobile-pieces-detachees, jouets-puericulture, sport-outdoor, sante-medical, industrie-manufacturiere, defense-securite

### Blog
- **Sanity** (prioritaire) : 9 articles recents (BlendAI, Orbitvu, ROI, formations)
- **Webflow** (fallback) : 80 articles legacy FR + EN
- **Merge** : `lib/blog.ts` fusionne les deux sources, Sanity prioritaire si meme slug

### Guides
- **Webflow API** : 22 guides (`lib/webflow-guides.ts`), cache 1h
- Non modifiables dans le code, contenu editable dans Webflow CMS

### Formulaire contact
- Pipedrive WebForms dans `components/forms/PipedriveContactForm.tsx`
- Charge en `next/dynamic` (client-side)

### Analytics
- GA4 : `components/analytics/GoogleAnalytics.tsx` (conditionne au consentement)
- Events : `lib/analytics.ts` + `ROICalculator/lib/analytics.ts`
- Cookie banner : `components/cookies/CookieBanner.tsx`

---

## REGLES ANTI AUTO-COMPACT

1. **Decouper les taches** : Chaque chantier doit etre traite independamment. Ne pas tout faire en une session.
2. **Ecrire d'abord, analyser ensuite** : Tout output d'audit/analyse doit etre ecrit dans un fichier avant de faire le resume.
3. **Sauvegarder regulierement** : Ecrire un fichier d'etat dans `/livrables/` tous les ~80K tokens.
4. **Ne pas lancer d'agents lourds en background** si le contexte approche des 100K tokens.
5. **Pas d'agents recursifs** : Ne pas lancer un agent qui lance lui-meme des sous-agents.

---

## ORGANISATION RECOMMANDEE

Cette session peut etre organisee en sous-sessions si le contexte devient trop large :

| Sous-session | Chantier | Action |
|---|---|---|
| **5A** | #3 Fonctionnel | Audit fonctionnel complet (Chrome + tests) |
| **5B** | #1 Contenu | Audit des pages legeres + propositions de sections |
| **5C** | #4 Blog | Amelioration template blog + enrichissement |
| **5D** | #2 Images/Videos | Strategie medias + implementation |

L'ordre 5A -> 5B -> 5C -> 5D est recommande (du plus urgent au plus lourd).

**Pour chaque sous-session**, ecrire un rapport dans `livrables/prompts-sessions/S5x-RAPPORT.md`.

---

## CRITERES DE QUALITE

- Le site doit etre **"ultra canon"** (directive PO)
- Chaque page doit donner une impression de **completude et de professionnalisme**
- **Pas de placeholders visibles**, pas de "Lorem ipsum", pas de sections vides
- **Pas d'emojis** -- Lucide icons uniquement
- **Mobile-first** : tout doit etre beau sur 375px
- **Performance** : objectif Lighthouse 90+ sur les 4 categories
- **`npm run build`** doit passer sans erreur apres chaque modification
- **Tests existants** ne doivent pas casser (366 tests)
