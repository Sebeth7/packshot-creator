# 📚 PackshotCreator - Documentation

> **Note du 28/09/2026 — document historique.** L'intégration Webflow décrite ici n'existe plus : Webflow est débranché depuis le 24/05/2026, et `lib/webflow.ts`, `lib/webflow-guides.ts`, le script d'extraction et `WEBFLOW_ORIGIN` (`cloudflare-worker/wrangler.toml`) ont été supprimés le 28/09/2026 ; plus aucun code ne lit de variable `WEBFLOW_*`. Le blog et les guides sont servis depuis `content/**` par `lib/content.ts`. Ce document ne décrit pas l'état actuel du site.

Documentation complète du projet **PackshotCreator** (Orbitvu Marketing Website).

> Site web marketing Next.js avec CMS Sanity, système de design Brandbook 2025, et architecture hybride Vercel + Cloudflare Workers.

---

## 🎯 Navigation Rapide

### Par Rôle

#### 👨‍💻 **Développeurs**
- [🚀 Guide Technique & Setup](./02-technical-developer/README.md) - Installation, stack, architecture
- [🏗️ Architecture & Intégrations](./05-architecture-integrations/README.md) - App Router, i18n, APIs
- [🧩 Composants & UI](./04-components-ui/README.md) - Catalogue composants, patterns

#### 🎨 **Designers**
- [🎨 Design & Branding](./01-design-branding/README.md) - Brandbook 2025, couleurs, typographie
- [🧩 Composants & UI](./04-components-ui/README.md) - Bibliothèque composants UI

#### ✍️ **Éditeurs de Contenu**
- [📝 CMS & Contenu](./03-cms-content/README.md) - Sanity Studio, workflow publication
- [🔍 SEO & Performance](./06-seo-performance/README.md) - Métadonnées, bonnes pratiques

#### 📈 **Marketing & SEO**
- [🔍 SEO & Performance](./06-seo-performance/README.md) - Stratégie SEO, Quick Wins, analytics
- [📝 CMS & Contenu](./03-cms-content/README.md) - Gestion contenu blog

---

## 📖 Documentation Complète

### 1. [🎨 Design & Branding](./01-design-branding/README.md)
**Brandbook 2025 & Système de Design**

- ✅ Palette de couleurs complète (primaire, secondaire, sections, accents)
- ✅ Typographie (Inter + Roboto)
- ✅ 100+ variables CSS documentées
- ✅ Système de thème par section
- ✅ Accessibilité WCAG AA
- ✅ Guidelines composants
- ✅ 10 exemples de code

**Pour :** Designers, développeurs frontend

---

### 2. [💻 Technique Développeur](./02-technical-developer/README.md)
**Setup, Stack & Architecture**

- ✅ Guide Quick Start (5 minutes)
- ✅ Stack technique complet (Next.js 16, React 19, TypeScript, Sanity)
- ✅ Structure projet & App Router
- ✅ Configuration environnement
- ✅ Build & Déploiement (Vercel + Cloudflare Workers)
- ✅ Conventions de code
- ✅ Patterns architecturaux
- ✅ Troubleshooting

**Pour :** Développeurs (nouveaux et existants)

---

### 3. [📝 CMS & Contenu](./03-cms-content/README.md)
**Sanity Studio & Gestion de Contenu**

- ✅ Sanity Studio (accès + configuration)
- ✅ Schémas de contenu (blogPost, formation, callout, comparisonTable)
- ✅ Composants Portable Text
- ✅ Workflow éditeur (guide non-technique)
- ✅ Requêtes GROQ avec exemples
- ✅ Système dual source (Sanity + Webflow)
- ✅ Guide migration MDX → Sanity
- ✅ Gestion médias et SEO

**Pour :** Éditeurs de contenu, développeurs CMS

---

### 4. [🧩 Composants & UI](./04-components-ui/README.md)
**Bibliothèque de Composants**

- ✅ Catalogue composants UI (Radix)
- ✅ Composants partagés (Badge, BeforeAfter, ProductGrid)
- ✅ Composants sections (Hero, ThreePillars, AIFeatures)
- ✅ Composants blog (Callout, ComparisonTable, TOC)
- ✅ ROI Calculator (architecture complète)
- ✅ Patterns formulaires (React Hook Form + Zod)
- ✅ Patterns styling (CVA, Tailwind)
- ✅ Internationalisation (next-intl)

**Pour :** Développeurs frontend, designers

---

### 5. [🏗️ Architecture & Intégrations](./05-architecture-integrations/README.md)
**Architecture Système & APIs**

- ✅ Architecture système (diagrammes)
- ✅ Next.js App Router détaillé
- ✅ Stratégie i18n (middleware, next-intl)
- ✅ Dual content sources (Sanity + Webflow)
- ✅ Migration progressive (Cloudflare Worker)
- ✅ Intégrations API (GROQ, REST)
- ✅ Optimisation images (Sanity + Cloudinary)
- ✅ Routing & redirections
- ✅ Diagrammes data flow

**Pour :** Architectes, développeurs backend/fullstack

---

### 6. [🔍 SEO & Performance](./06-seo-performance/README.md)
**Optimisation SEO & Performance**

- ✅ Stratégie SEO (3 piliers : Hardware, IA, Formation)
- ✅ Patterns métadonnées (exemples code)
- ✅ 18 redirections documentées
- ✅ 15 liens internes (maillage P1.4)
- ✅ i18n SEO (hreflang)
- ✅ Optimisation images (Next.js + CDN)
- ✅ Core Web Vitals
- ✅ Sitemap & Robots.txt (guide implémentation)
- ✅ Analytics GA4 (setup prêt)
- ✅ Quick Wins (+415-775 clics/an)

**Pour :** Marketing, SEO, développeurs performance

---

## 🚀 Quick Start

### Pour les Nouveaux Développeurs

1. **Lire le guide technique**
   ```bash
   docs/02-technical-developer/README.md
   ```

2. **Installer le projet**
   ```bash
   npm install
   cp .env.example .env.local
   # Configurer les variables d'environnement
   npm run dev
   ```

3. **Explorer le design system**
   ```bash
   docs/01-design-branding/README.md
   ```

4. **Comprendre l'architecture**
   ```bash
   docs/05-architecture-integrations/README.md
   ```

### Pour les Éditeurs de Contenu

1. **Accéder au Sanity Studio**
   - Local : http://localhost:3000/studio
   - Production : https://packshot-creator.vercel.app/studio

2. **Lire le guide CMS**
   ```bash
   docs/03-cms-content/README.md
   ```

3. **Consulter les bonnes pratiques SEO**
   ```bash
   docs/06-seo-performance/README.md
   ```

---

## 🏗️ Vue d'Ensemble du Projet

### Stack Technique

```
Frontend
├─ Next.js 16.1.1 (App Router)
├─ React 19.2.3
├─ TypeScript 5
├─ Tailwind CSS v4
└─ Radix UI + shadcn/ui

CMS & Contenu
├─ Sanity.io 5.2.0
├─ Portable Text
├─ Webflow (legacy fallback)
└─ MDX (migration en cours)

i18n & SEO
├─ next-intl 4.6.1 (FR/EN)
├─ next-sitemap (à déployer)
└─ Metadata API (Next.js 16)

Déploiement
├─ Vercel (Next.js hosting)
├─ Cloudflare Workers (edge routing)
├─ Sanity Cloud (CMS backend)
└─ Cloudinary (images CDN)
```

### Architecture Système

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Worker                         │
│              (Edge Router - Migration Progressive)           │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐        ┌──────────────┐
│   Webflow    │        │   Vercel     │
│   (Legacy)   │        │  (Next.js)   │
└──────────────┘        └───────┬──────┘
                                │
                    ┌───────────┴────────────┐
                    │                        │
                    ▼                        ▼
            ┌──────────────┐        ┌──────────────┐
            │  Sanity CMS  │        │  Cloudinary  │
            │  (Primary)   │        │   (Images)   │
            └──────────────┘        └──────────────┘
```

### Sections du Site

| Section | URL | Couleur | Objectif |
|---------|-----|---------|----------|
| **Création** | `/ia-photo-produit` | Orange `#ff7809` | IA génération photos |
| **Formation** | `/academy` | Bleu `#8585ee` | Formations & calendrier |
| **Blog** | `/blog` | Lime `#CBE857` | Articles & ressources |
| **Hardware** | `/studios-photo-automatises` | Primary `#6667AB` | Studios automatisés |
| **Industries** | `/industrie/*` | Future Dusk `#4c5578` | Chaussures, bijoux, mobilier |

---

## 📂 Structure du Projet

```
packshot-creator/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # Routes i18n (fr, en)
│   │   ├── blog/                 # Blog (Sanity + Webflow)
│   │   ├── academy/              # Formation
│   │   ├── ia-photo-produit/     # Création IA
│   │   ├── studios-photo-automatises/  # Hardware
│   │   └── industrie/            # Pages industrie
│   ├── studio/                   # Sanity Studio
│   └── globals.css               # Design system CSS
│
├── components/                   # Composants React
│   ├── ui/                       # Composants UI (Radix)
│   ├── blog/                     # Composants blog
│   ├── sections/                 # Sections pages
│   ├── shared/                   # Composants partagés
│   └── calculators/              # ROI Calculator
│
├── lib/                          # Utilities
│   ├── sanity-blog.ts            # Client Sanity
│   └── utils.ts                  # Utilitaires généraux
│
├── sanity/                       # Configuration Sanity
│   ├── schemas/                  # Schémas de contenu
│   └── lib/                      # Client Sanity
│
├── i18n/                         # Internationalisation
│   ├── routing.ts                # Configuration routes
│   └── request.ts                # next-intl config
│
├── messages/                     # Traductions
│   ├── fr.json                   # Français
│   └── en.json                   # Anglais
│
├── cloudflare-worker/            # Edge routing
│   └── src/                      # Worker code
│
├── scripts/                      # Scripts utilitaires
│   ├── migrate-mdx-to-sanity.js  # Migration blog
│   └── publish-draft.js          # Publication
│
└── docs/                         # 📚 DOCUMENTATION
    ├── 01-design-branding/       # Design system
    ├── 02-technical-developer/   # Guide dev
    ├── 03-cms-content/           # Sanity CMS
    ├── 04-components-ui/         # Composants
    ├── 05-architecture-integrations/  # Architecture
    └── 06-seo-performance/       # SEO & perf
```

---

## 🔗 Liens Utiles

### Ressources Officielles
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity.io Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [next-intl](https://next-intl-docs.vercel.app/)

### Ressources Projet
- [Brandbook 2025](../PROJECT_GUIDELINES.md) - Guidelines officiels
- [Design System](../DESIGN_SYSTEM.md) - Système de design technique
- [Migration Sessions](../) - Historique sessions (MIGRATION_SESSION_*.md)

### Environnements
- **Production** : https://packshot-creator.vercel.app
- **Sanity Studio** : https://packshot-creator.vercel.app/studio
- **Sanity Manage** : https://www.sanity.io/manage

---

## 🛠️ Scripts Utiles

```bash
# Développement
npm run dev                    # Serveur dev (port 3000)
npm run build                  # Build production
npm run start                  # Serveur production
npm run lint                   # Linter

# CMS & Contenu
npm run migrate:blog           # Migrer MDX → Sanity
npm run publish-draft          # Publier brouillons

# Sanity Studio
# Studio accessible à http://localhost:3000/studio
```

---

## 📋 État du Projet

### ✅ Complété
- ✅ Migration Brandbook 2025 (Janvier 2026)
- ✅ 52+ composants migrés
- ✅ Design system complet (CSS variables)
- ✅ Blog Sanity CMS (8 articles migrés)
- ✅ ROI Calculator
- ✅ i18n FR/EN
- ✅ SEO Quick Wins P1.4 (+415-775 clics/an)
- ✅ 18 redirections SEO
- ✅ 15 liens internes (maillage)

### 🚧 En Cours
- 🚧 Migration MDX → Sanity (70% - 8/8 articles P1)
- 🚧 Migration Webflow → Next.js (progressive)
- 🚧 Formation section (contenu à finaliser)

### 📅 À Venir (Phase P2)
- ⏸️ Sitemap.xml déploiement
- ⏸️ Robots.txt déploiement
- ⏸️ Hreflang tags (i18n SEO)
- ⏸️ Schema.org markup (Product, FAQ)
- ⏸️ Google Analytics 4 activation
- ⏸️ Tests automatisés (E2E, unit)

---

## 🤝 Contribution

### Workflow Git

```bash
# Créer une branche
git checkout -b feature/ma-fonctionnalite

# Développer et commiter
git add .
git commit -m "feat: description de la fonctionnalité"

# Pousser et créer PR
git push origin feature/ma-fonctionnalite
```

### Conventions de Commit

```
feat:     Nouvelle fonctionnalité
fix:      Correction de bug
docs:     Documentation uniquement
style:    Formatage, point-virgules manquants, etc.
refactor: Refactorisation du code
test:     Ajout de tests
chore:    Maintenance, dépendances, config
```

---

## 📞 Support

### Questions Techniques
- Consulter la documentation appropriée ci-dessus
- Vérifier les sessions de migration (MIGRATION_SESSION_*.md)
- Consulter les rapports (RAPPORT_*.md)

### Questions CMS / Contenu
- Lire [CMS & Contenu](./03-cms-content/README.md)
- Accéder au Sanity Studio : `/studio`

### Questions Design
- Lire [Design & Branding](./01-design-branding/README.md)
- Consulter [PROJECT_GUIDELINES.md](../PROJECT_GUIDELINES.md)

---

## 📊 Métriques Clés

### Performance
- **First Load JS** : 87-92 kB
- **Core Web Vitals Target** : LCP <2.5s, FID <100ms, CLS <0.1
- **Images** : Optimisation Sanity + Cloudinary

### SEO
- **Articles Blog** : 70+ articles (Sanity + Webflow)
- **Redirections** : 18 redirections actives
- **Maillage Interne** : 15 liens stratégiques
- **Quick Wins** : +415-775 clics/an estimés

### Contenu
- **Langues** : FR (principal), EN (secondaire)
- **Schémas Sanity** : 4 types de contenu
- **Composants Portable Text** : 5+ composants custom

---

## 🎓 Glossaire

| Terme | Description |
|-------|-------------|
| **App Router** | Nouveau système de routing Next.js 13+ (basé sur le dossier `app/`) |
| **Brandbook 2025** | Système de design officiel Orbitvu (couleurs, typographie, guidelines) |
| **CVA** | Class Variance Authority - Gestion des variants de composants |
| **GROQ** | Graph-Relational Object Queries - Langage de requête Sanity |
| **i18n** | Internationalisation (support multilingue) |
| **Portable Text** | Format de contenu riche Sanity (alternative à Markdown) |
| **Quick Wins** | Optimisations SEO rapides avec impact mesurable |
| **SSG** | Static Site Generation - Pages générées au build |

---

## 📄 Licence

Propriétaire - Orbitvu / SYSNEXT

---

**Dernière mise à jour** : Janvier 2026
**Version de la documentation** : 1.0.0

---

<div align="center">

**[⬆ Retour en haut](#-packshot-creator---documentation)**

Made with ❤️ by the PackshotCreator Team

</div>
