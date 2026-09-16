# 01 — Périmètre

Trois zones. Elles ne décrivent pas une politesse : la zone rouge est **appliquée
par le contrôle d'intégration**, qui fait échouer la pull request.

---

## ZONE VERTE — autonomie complète

Tu modifies, tu ouvres la PR, le CI valide, **tu merges toi-même**.
Aucune validation humaine requise.

### Fichiers

| Chemin | Ce que tu y fais |
|---|---|
| `lib/seo-config.ts` | Les sets `NOINDEX_EN_*`. Attention : ils pilotent robots + sitemap + sélecteur simultanément |
| `app/sitemap.ts` | Composition du sitemap |
| `public/robots.txt` | Directives crawlers |
| `public/llms.txt` | Plan du site pour les modèles |
| `components/seo/SchemaOrg.tsx` | Tout le JSON-LD : Organization, Product, Offer, FAQPage, ItemList |
| `lib/hreflang.ts` | Génération des alternates |
| `content/blog/alternates.json`, `content/guides/alternates.json` | Tables de correspondance entre langues |
| `i18n/deChCoverage.ts` | Couverture `de-ch` et résolution du sélecteur de langue |
| `data/content-maillage.ts` | Maillage interne : tunnels de conversion, hubs |
| `components/maillage/MaillageSections.tsx` | Rendu du maillage |
| `components/layout/Footer.tsx`, `Header.tsx`, `NavLink.tsx` | Liens de navigation, ancres |
| `next.config.ts` — **uniquement le bloc `redirects()`** | Redirections avec préfixe de langue |
| `cloudflare-worker/src/index.js` | Mappings du Worker (lire R5 et `05-INFRA.md` avant) |
| `data/secteurs.ts`, `secteurs-de-ch.ts`, `sector-machine-map.ts`, `sector-related-map.ts` | Contenu et rattachement des pages secteurs |
| `messages/*.json` — clés `metaTitle`, `metaDescription`, `title`, `alt` | Metas et textes alternatifs |
| `content/blog/**/*.json` — champs `metaTitle`, `metaDescription`, `tags` | Metas d'articles |
| `docs/seo-geo/**` | Ta propre documentation et le journal |
| `e2e/seo.spec.ts`, `internal-links*.spec.ts`, `redirections.spec.ts`, `language-switch.spec.ts` | Tes filets de test |

### Gestes

● Corriger un titre, une meta description, un attribut `alt`
● Poser, retirer ou déplacer un `noindex`
● Ajouter ou corriger une redirection 301 (dépôt ou Worker)
● Corriger un hreflang, un canonical, un alternate
● Enrichir ou réparer le schema JSON-LD
● Retravailler le maillage interne, les ancres, les liens de tunnel
● Réparer un lien mort, une chaîne de redirection, un 404
● Ajouter un test Playwright

---

## ZONE ORANGE — tu proposes, Sébastien arbitre

Tu ouvres la PR **complète et prête à merger**, puis tu attends son feu vert.
Tu ne merges pas. Tu inscris l'attente dans `ETAT.md`.

| Sujet | Pourquoi Sébastien doit trancher |
|---|---|
| **Prix affichés** (fiches, schema `Offer`, `priceSpecification`) | Dimension de conformité distributeur Orbitvu. Une violation a déjà dû être corrigée sur ~9 articles le 30/06/2026. Laurent a lui-même changé d'avis sur ce sujet le 24/07 |
| **Copywriting français client-facing** | Sébastien écrit la voix de la marque. Tu produis la structure, pas la prose |
| **Création ou suppression d'une page** | Change la surface indexable et le maillage |
| **Changement d'architecture d'URL** | Irréversible en pratique : chaînes de redirection, perte d'autorité |
| **Traduction des 30 pages `/en` en `noindex`** | Décidé le 04/09/2026, mais par lots validés |
| **Passage d'un `noindex` à un 301, ou l'inverse, sur une page à backlinks** | Perte d'autorité définitive si la cible est mauvaise |
| **Toute suppression de schema existant** | Garde-fou posé par Laurent lui-même en juin 2026 |
| **Modification du fichier `alternates.json` supprimant une correspondance** | Casse le sélecteur de langue en silence |

---

## ZONE ROUGE — interdite

Le CI fait échouer la PR si le diff y touche. Si un chantier SEO **exige**
vraiment d'y toucher, écris-le dans `BOITE-AUX-LETTRES.md` et attends.

| Chemin | Nature |
|---|---|
| `lib/roiChat/**`, `lib/roiEngine/**` | Calculateur ROI conversationnel — consomme l'API Anthropic, coûte de l'argent par requête |
| `app/calculateur-roi/**`, `app/roi-pro/**`, `app/roi-preview/**` | Interfaces du calculateur |
| `app/api/**` | Routes serveur : leads, mails, Pipedrive, Supabase |
| `components/forms/**` | Formulaires de capture — chaque régression est un lead perdu |
| `lib/pipedrive.ts`, `lib/supabase.ts`, `lib/lead-enrichment.ts`, `lib/rate-limit.ts` | Intégrations CRM et base |
| `app/etude-clients-2026/**` | Questionnaire client, données personnelles |
| `middleware.ts` | Routage de locale — un faux pas rend le site entier inaccessible |
| `next.config.ts` **hors du bloc `redirects()`** | `images`, `remotePatterns` : touche la performance et les 504 |
| `i18n/routing.ts` | `pathnames` retype `Link` dans tout le projet |
| `package.json`, `package-lock.json` | Dépendances |
| `.env*`, toute variable d'environnement | Secrets |
| `app/globals.css`, `DESIGN_SYSTEM.md`, `CHARTE_GRAPHIQUE.md` | Design system |
| `lib/analytics.ts`, `components/analytics/**` | Mesure GA4 — Laurent en dépend pour ses rapports |

### Les branches à ne jamais toucher

| Branche | Raison |
|---|---|
| `feat/sysnext-vera` | Autre marque, sous-arbre autonome, 12 règles d'étanchéité |
| `feat/roi-public`, `feat/roi-chat` | Calculateur ROI |
| `feat/geo-referentiels-prix` | Chantier de Sébastien, non mergé, contient des prix |
| `feat/de-ch-locale` | Chantier `de-ch` de Sébastien |

---

## Les zones de recouvrement — là où naissent les conflits

Ces fichiers sont en zone verte pour toi **et** modifiés par Sébastien. Ils
demandent une précaution supplémentaire.

| Fichier | Sébastien y fait | Toi | Protocole |
|---|---|---|---|
| `messages/fr.json` / `en.json` / `de-ch.json` (≈ 175 000 lignes) | Contenu de pages, textes marketing | Metas, titres | **Annonce-le dans `ETAT.md` avant d'ouvrir le chantier.** Fais des modifications chirurgicales, jamais de reformatage global. Un reformatage rend le fichier immergeable |
| `content/blog/**` | Crée et rédige des articles | Metas, tags, maillage | Ne touche jamais `content`, `body`, `faqs`. Uniquement `metaTitle`, `metaDescription`, `tags` |
| `data/content-maillage.ts` | Ajoute les tunnels de ses nouveaux articles | Retravaille le maillage global | Rebase avant de pousser. En cas de conflit, garde ses ajouts |
| `components/seo/SchemaOrg.tsx` | Rarement, mais le fait | Régulièrement | À toi en priorité. S'il y touche, il le note dans `ETAT.md` |

### Règle anti-collision

**Un chantier annoncé dans `ETAT.md` réserve les fichiers qu'il nomme.**
Avant d'ouvrir un chantier touchant une zone de recouvrement :

1. `git pull origin main`
2. Lis `ETAT.md` : si le fichier est déjà réservé par l'autre côté, attends ou
   choisis un autre chantier
3. Inscris ton chantier dans `ETAT.md` avec la liste des fichiers touchés
4. Pousse cette inscription **immédiatement**, avant de commencer à travailler

C'est une réservation coopérative, pas un verrou technique. Elle fonctionne
parce que les deux côtés la respectent.
