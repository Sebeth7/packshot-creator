# SESSION S2c - Landing Premium Industrie & Defense

**Modele requis : Claude Opus 4.6**
**Duree estimee : ~2h**
**Prerequis : S2a/S2b terminees (pour reprendre le pattern de pages)**

---

## Contexte

Tu travailles sur le projet PackshotCreator (migration Webflow -> Next.js).
- **Working directory** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`
- **Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (FR/EN)
- Le site est LIVE sur packshot-creator.com.

## Documents de reference (LIS-LES AVANT DE COMMENCER)

1. **Brandbook** : `livrables/BRANDBOOK_WEB_COMPLET.md`
2. **Brandbook annexes** : `livrables/BRANDBOOK_WEB_ANNEXES.md`
3. **Landing SEOs existantes** : Lis une des 5 landing SEO creees (ex: `app/[lang]/packshot-bijoux/page.tsx`) pour reprendre le meme pattern technique
4. **Rapport S2a** : `livrables/prompts-sessions/S2a-RAPPORT.md`

## Ta mission

Creer une landing page premium **Industrie & Defense** basee sur l'etude de marche SYSNEXT. Cette page est plus longue et riche que les landing SEO classiques -- c'est une page de generation de leads B2B haut de gamme.

**Route** : `app/[lang]/industrie-defense/page.tsx`
**URL** : `/fr/industrie-defense` et `/en/industrie-defense` (meme slug FR/EN, pattern existant)

---

## DONNEES CLES DE L'ETUDE DE MARCHE (a integrer dans la page)

### Positionnement
PackshotCreator/SYSNEXT est distributeur exclusif Orbitvu France & Suisse avec 20 ans d'expertise en photographie de precision. Les solutions Orbitvu ont une base technologique adaptee aux exigences industrielles et militaires au-dela du e-commerce.

### Technologies Orbitvu applicables a l'industrie (8 technologies)

| Technologie | Application industrielle |
|---|---|
| **Templates sauvegardes** | Repetabilite certifiable pour documentation qualite AS9100/ISO 13485 |
| **Rotation 360 motorisee** | Documentation exhaustive de pieces pour catalogues et inspections |
| **SuperFocus** (focus stacking) | Inspection micro-composants, detection micro-defauts, soudures |
| **IQ Mask** (detourage auto) | Production de visuels catalogues standardises sans post-production |
| **Ghost Image** | Comparaison avant/apres, suivi degradation temporelle |
| **74 LED individuelles** | Conditions d'eclairage certifiables pour conformite reglementaire |
| **Export automatise** | Integration directe ERP/DAM/PIM avec nommage SKU/NSN |
| **AI Photo Assistant** | Utilisation par operateurs non-photographes sur ligne de production |

### Segments cibles (6 segments a presenter)

**1. Aeronautique & Spatial**
- Marche : 374 milliards USD, croissance 7,8%/an
- Normes : AS9100, zero defaut, tracabilite complete
- Cas d'usage : First Article Inspection (FAI), documentation MRO avant/apres, catalogage pieces
- Argument : "Zero defaut documentaire -- conformite AS9100 facilitee"

**2. Defense terrestre & navale**
- Normes : ITAR, CMMC, MIL-STD
- 130 000+ vehicules dans les programmes MRO
- Cas d'usage : Inventaire pieces, anti-contrefacon, suivi usure, doc avant/apres MCO
- Argument : "L'expertise reste dans la machine -- independence du turnover"

**3. Automobile & Equipementiers**
- Aftermarket mondial : 500+ milliards USD
- Norme IATF 16949
- Cas d'usage : QC sortie production, catalogage aftermarket, inspection fournisseurs
- Argument : "500+ pieces/jour, publication e-commerce en 2 minutes"

**4. Medical & Pharma**
- Normes FDA, ISO 13485, GMP
- Cas d'usage : Documentation lots, catalogage instruments, inspection emballages
- Argument : "Documentation de lot inattaquable, prets pour audits FDA"

**5. Electronique & Semi-conducteurs**
- Normes IPC, RoHS
- Taux erreur inspection manuelle : 20-30%
- Cas d'usage : Inspection PCB, doc composants obsolescents
- Argument : "Detection micro-defauts soudure par focus stacking"

**6. Logistique militaire & Supply Chain**
- 91 milliards USD de stock secondaire DoD
- 5,1 milliards USD de stock inutilisable (identification defaillante)
- Cas d'usage : Identification anti-contrefacon, doc stock UID/IUID
- Argument : "Chaque NSN illustre, chaque etat documente"

### Points de douleur transversaux (4 themes)

1. **Documentation visuelle non standardisee** : Photos smartphone, eclairages variables, impossible a auditer
2. **Controle qualite defaillant** : Fatigue inspecteur, 20-30% erreur manuelle, pas de reference photo
3. **Catalogues obsoletes** : 5-50 EUR/image en sous-traitance, catalogues en retard de plusieurs annees
4. **Dependance au photographe** : Savoir-faire perdu au turnover, pas de processus formalise

### Chiffres ROI a mettre en avant

- Reduction 90% du cout de documentation photo
- Reduction 60% du temps d'inspection de reception
- 500+ pieces photographiees par jour
- 1 EUR/piece vs 5-50 EUR en sous-traitance
- Marche inspection visuelle automatisee : 30 milliards USD d'ici 2029

---

## STRUCTURE DE LA PAGE (10 sections)

Cette page est plus longue qu'une landing SEO classique. Elle doit donner l'impression d'expertise et de credibilite pour un public B2B industriel/defense.

### 1. Hero Premium
- **Fond** : `bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800`
- **H1 FR** : "Documentation Visuelle Industrielle et Defense : Automatisee, Repetable, Certifiable"
- **H1 EN** : "Industrial & Defense Visual Documentation: Automated, Repeatable, Certifiable"
- Sous-titre mentionnant les normes (AS9100, ISO 13485, MIL-STD)
- 2 CTA : "Demander une etude personnalisee" (vers /contact) + "Voir les technologies" (ancre vers section techno)
- Boutons fond sombre : `bg-transparent border border-white/40`

### 2. Section "Pourquoi automatiser" (Points de douleur)
- 4 cards presentant les problemes actuels (documentation non standardisee, QC defaillant, catalogues obsoletes, dependance photographe)
- Style cards : `rounded-2xl border border-neutral-100 bg-white`
- Icones Lucide : AlertTriangle, Eye, BookOpen, UserX (ou similaires)

### 3. Section Technologies (8 technologies Orbitvu)
- Grille 2x4 ou 4x2 avec les 8 technologies
- Chaque techno : icone Lucide + nom + application industrielle (1 ligne)
- Fond leger : `bg-neutral-50`

### 4. Section Segments industriels (6 onglets ou cards)
- Presenter les 6 segments avec pour chacun : nom, normes, cas d'usage cles, argument marketing
- Possibilite d'utiliser des onglets/tabs cliquables ou un accordion
- Si trop complexe en server component, utiliser des cards simples

### 5. Section Chiffres cles
- 4-5 stats impactantes en grand format
- "90% de reduction des couts", "500+ pieces/jour", "1 EUR par piece", "30 Mrd USD marche 2029"
- Style accent Very Peri

### 6. Section Cas d'usage (3-4 cas phares)
- Selectionner les cas d'usage les plus parlants de la matrice :
  - First Article Inspection (aeronautique)
  - Inventaire anti-contrefacon (defense)
  - Catalogage aftermarket (automobile)
  - Documentation MRO avant/apres
- Pour chaque cas : titre, description, technologies mobilisees, resultat

### 7. Section Machines recommandees
- 3-4 machines adaptees aux besoins industriels :
  - **Alphashot XL v2** : pieces de taille moyenne, macro
  - **Alphashot Pro G2** : pieces volumineuses, haute precision
  - **Alphastudio XXL Pro v2** : grandes pieces industrielles
- Importer depuis `components/calculators/ROICalculator/lib/machines.ts`
- CTA vers fiche machine

### 8. Section Conformite & Normes
- Lister les normes couvertes : AS9100, ISO 13485, IATF 16949, FDA, GMP, MIL-STD, ITAR
- Expliquer comment Orbitvu facilite la conformite (templates = repetabilite, export = tracabilite)
- Design sobre et professionnel

### 9. FAQ (5-7 questions)
- Schema FAQPage obligatoire
- Questions :
  - Comment automatiser la documentation photographique industrielle ?
  - Les solutions Orbitvu sont-elles compatibles avec les normes AS9100 ?
  - Quel est le ROI d'un studio photo automatise pour l'industrie ?
  - Les operateurs non-photographes peuvent-ils utiliser le systeme ?
  - Comment integrer les photos dans notre ERP/PIM ?
  - Les solutions sont-elles adaptees aux environnements militaires ?
  - Quel studio choisir pour des pieces volumineuses ?

### 10. CTA Final Premium
- `bg-gradient-to-r from-very-peri-600 to-very-peri-700`
- Titre : "Etudions ensemble votre projet industriel"
- Sous-titre : "20 ans d'expertise en photographie de precision"
- Bouton : "Demander une etude personnalisee" (vers /contact?subject=industrie)

---

## SEO

**Meta FR** :
- Title (55 chars max) : "Documentation Visuelle Industrie & Defense | PackshotCreator"
- Description (150 chars max) : "Solutions de photographie automatisee pour l'industrie et la defense. Conformite AS9100, ISO 13485, MIL-STD. 20 ans d'expertise. Demandez une etude."

**Meta EN** :
- Title : "Industrial & Defense Visual Documentation | PackshotCreator"
- Description : "Automated photography solutions for industry and defense. AS9100, ISO 13485, MIL-STD compliant. 20 years of expertise. Request a study."

**Schemas JSON-LD** : Organization + Breadcrumb + FAQPage

**Canonical** : `https://www.packshot-creator.com/${lang}/industrie-defense`

---

## Patterns CRITIQUES

- **Link** : `import { Link } from '@/i18n/routing'` (JAMAIS `next/link`)
- **Params** : `{ params }: { params: Promise<{ lang: string }> }`
- **No Header/Footer** : self-contained (layout.tsx les ajoute)
- **SchemaOrg** : `import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg'`
- **faqSchema** : Utilise la fonction faqSchema si elle existe dans SchemaOrg.tsx (creee en S2a ou S3). Sinon, cree-la.
- **Animations** : `FadeInView`, `StaggerContainer`, `StaggerItem` depuis `@/components/animations`
- **Bouton primaire** : `bg-very-peri-500 hover:bg-very-peri-600 text-white`
- **Bouton fond sombre** : `bg-transparent border border-white/40`
- **Texte** : `text-future-dusk-900` (titres), `text-future-dusk-600` (body)
- **Pas d'emojis** -- Lucide icons uniquement
- **Traductions** : Ajoute les cles dans `messages/fr.json` et `messages/en.json` via `getTranslations` de `next-intl/server`
- **Meme slug FR/EN** (pattern du site)

## IMPORTANT : Gestion de la taille

Cette page est longue (10 sections). Pour eviter un fichier de 500+ lignes :
- Extraire les donnees (technologies, segments, cas d'usage, FAQ) dans un fichier `data/industrie-defense.ts`
- La page importe les donnees et mappe les composants
- Cela rend aussi le contenu plus maintenable

---

## Criteres de done

- [ ] Page creee avec 10 sections
- [ ] Donnees dans `data/industrie-defense.ts`
- [ ] Traductions FR/EN dans messages
- [ ] Schema FAQPage
- [ ] Meta SEO (title, description, canonical, hreflang, OG)
- [ ] `npm run build` passe sans erreur
- [ ] Design conforme au brandbook
- [ ] Commit propre

## Compte-rendu

Ecris `/livrables/prompts-sessions/S2c-RAPPORT.md` avec :
- Nombre de sections implementees
- Fichiers crees/modifies
- Problemes rencontres
- Suggestions d'amelioration
