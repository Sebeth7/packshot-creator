# 00 — Briefing

## L'entreprise

**PackshotCreator**, marque de **Sysnext SAS** (Lyon / Saint-Bonnet-de-Mure).
Vend et installe des **studios photo automatisés** — des machines de prise de
vue produit, de 12 000 à 150 000 € HT. Distributeur **officiel** (jamais
« exclusif ») d'**Orbitvu** pour la France et la Suisse.

Sébastien Jourdan a racheté la société en janvier 2026 **à Laurent Wainberg**,
qui en reste proche et pilote aujourd'hui le SEO/GEO. Laurent connaît donc
l'historique du site, ses URL, ses clients et ses arbitrages passés de
l'intérieur — c'est une ressource, et la boîte aux lettres sert aussi à
l'interroger. Il connaît le métier de
l'intérieur : 25 ans de photographie technique, ingénieur d'affaires en
composants électroniques, il a lui-même conçu un système équivalent à Orbitvu.
Il comprend le code mais ne code pas. Il vérifie tout en direct dans le
navigateur.

**Le pivot stratégique en cours** : ouvrir des machines conçues pour
l'e-commerce aux marchés **industriels** (aéronautique, automobile, pièces
techniques). Le vertical « défense » a été abandonné le 04/09/2026 au profit de
industrie / aéronautique / automobile.

## Le site

| | |
|---|---|
| Domaine | `www.packshot-creator.com` |
| Stack | Next.js 16 (App Router), React 19, next-intl 4, Tailwind 4, TypeScript |
| Hébergement | Vercel, projet **`sysnext`** (pas `packshot-creator`) |
| Devant | Cloudflare — proxy, WAF, et un Worker `packshot-router` qui route et redirige |
| Dépôt | `Sebeth7/packshot-creator`, **public** |
| Langues servies | `fr` (défaut), `en`, `de-ch` (Suisse alémanique, couverture partielle) |
| Langues redirigées | `de`, `es`, `nl` → `blendai.studio` |

**Origine** : le site a été migré de Webflow vers Next.js au printemps 2026.
Webflow a été débranché le 24/05/2026. Cette migration explique l'essentiel de
la dette : des centaines de redirections legacy, des slugs renommés, des
contenus EN qui servent encore du texte français.

### Volumétrie

| Objet | Nombre |
|---|---|
| Articles de blog FR | 65 |
| Articles toutes langues | ~94 |
| Pages secteurs (`/industrie/*`) | 17 |
| Fiches machines (`/studio-photo/*`) | 13 |
| Fiches formation | 6 |
| Mappings dans le Worker | ~1 018 dans le dépôt, davantage en production |
| Clés de traduction | `messages/fr.json` ≈ 175 000 lignes |

## Les acteurs

| Qui | Rôle | Canal |
|---|---|---|
| **Sébastien Jourdan** | Dirigeant, décideur, propriétaire du site. 8 h/semaine disponibles | Mail, décisions |
| **Laurent Wainberg** | **Ancien propriétaire de la société.** Consultant SEO/GEO depuis juin 2026, avec son propre outillage de mesure | Mail avec Sébastien |
| **Claude de Sébastien** | Implémentation générale, produit, contenu, infrastructure | Ce dépôt |
| **Claude de Laurent** | SEO/GEO en autonomie | Ce dépôt |

### L'outillage de mesure de Laurent

Il ne vit pas dans ce dépôt, mais il est le thermomètre du chantier :

● Base Supabase `gsc-crawl-seo` — pull GSC quotidien (~1,07 M lignes)
● Crawl Screaming Frog hebdomadaire (Link Score, liens internes, statuts)
● `cf_traffic_daily` — trafic et codes d'erreur Cloudflare par jour
● Alerte quotidienne sur le taux de 5xx (seuil 3 %)
● Panel GEO Perplexity hebdomadaire
● Un dashboard de pilotage

**Conséquence pratique** : ne jamais extrapoler un chiffre de trafic ou de
position. Demander à Laurent — il l'a. Toi, tu vérifies le code et le rendu.

### L'outillage de mesure côté Sébastien

`geo-ultimate` : un audit GEO sur mesure (visibilité dans ChatGPT, Claude,
Perplexity, Gemini, Le Chat ; share of voice ; mentions de marque ; audit
technique). Résultats dans `SITE WEB/audits/`, hors dépôt. Dernier run : #5 du
20/08/2026.

## L'histoire du chantier SEO/GEO

| Date | Événement |
|---|---|
| Avril-mai 2026 | Migration Webflow → Next.js. Nettoyage des 404 GSC. Refonte du schema. Sprints Core Web Vitals |
| 06/06/2026 | Arrivée de Laurent. Audit SEO complet |
| 12/06/2026 | Grande journée multi-sessions : robots.txt, mentions légales, pages Suisse, llms.txt, hreflang fr-CH, audit Cloudflare |
| 23-24/06 | Maillage V4, hreflang fr-CH en production |
| 27/06 | Locale `de-ch` (Suisse alémanique) |
| 30/06 | Correction d'une violation de politique tarifaire Orbitvu sur ~9 articles. Alphashot G2 → XL G2 |
| 07/07 | **Gouvernance du Worker : le dépôt devient la source unique.** Maillage corrigé. Remapping des secteurs |
| 23-24/07 | Incident : règle WAF supprimée → toutes les vidéos produit cassées en production. Prix leasing publics |
| 20-22/08 | Chantier Suisse GEO : purge « exclusif » → « officiel », blocs de réponse directe, schema FAQ |
| 03/09 | Audit SEO expert de Laurent |
| 04/09 | Correctifs livrés en branche `feat/audit-laurent-0309`. **Dernier push sur `main`** |
| 16/09 | Mise en place de cette gouvernance |

## L'état du trafic — le problème à résoudre

| Métrique | Valeur |
|---|---|
| Clics organiques janvier 2026 | 1 857 / mois |
| Clics organiques août 2026 | 524 / mois |
| Variation | **-71,8 %**, soit -1 333 clics/mois |

### Les trois pistes identifiées, par ordre de force

**1. Erreurs 504 — requalifiées le 17/09.** La mesure du 18/08 au 16/09 montre
que 100 % des 504 portent le user-agent `nginx-ssl early hints` (requêtes
internes de Cloudflare liées à Early Hints) : aucune 504 servie aux navigateurs
ni à Googlebot sur la fenêtre mesurée. Ce n'est plus une piste démontrée du
recul. Voir `06-CHANTIERS.md` C3.

**2. Sélecteur de langue qui déverse l'autorité sur des pages `noindex`.**
20 pages `/en` à 99-100 de Link Score contre 86 pour `/fr`, et des fiches
machines à 5-30. Correctif **livré mais non mergé** (branche
`feat/audit-laurent-0309`).

**3. Crawlers IA bloqués par Cloudflare — requalifié le 17/09.** La mesure par
ASN montre que les 403 visent surtout des user-agents usurpés émis depuis Google
Cloud ; depuis les réseaux des éditeurs, 0 à 2 % de 403, sauf PerplexityBot
(AS14618, 383 sur 519), à qualifier. Voir `06-CHANTIERS.md` C2.

Note mesurée : Perplexity cite malgré tout PackshotCreator bien que
PerplexityBot soit bloqué à 77 % — les citations passent par des index tiers.
Ne pas lire « bot bloqué » comme « invisible ».

## Ce que « GEO » veut dire ici

Generative Engine Optimization : être cité et recommandé par les moteurs de
réponse IA, pas seulement classé par Google. Concrètement sur ce site :

● `public/llms.txt` — le plan du site destiné aux modèles
● Schema JSON-LD riche (Organization, Product, Offer, FAQPage, ItemList)
● Des **blocs de réponse directe** : la question posée mot pour mot, la réponse
  factuelle juste après (voir `/fr/distributeur-orbitvu-suisse`)
● L'accessibilité aux crawlers IA (le point 3 ci-dessus)
● Des sources d'autorité externes : Wikidata, presse spécialisée, Reddit

### Le dossier suisse — à connaître avant d'y toucher

Les moteurs IA affirmaient que le distributeur Orbitvu en Suisse était
**Light + Byte AG**, « en distribution exclusive ». **Cette société n'existe
plus** : magasin de Zurich fermé le 25/07/2025, liquidation à l'automne 2025,
domaines morts. Les moteurs citaient des entrées d'index zombies et un article
de presse de 2018.

Contre-mesures déjà déployées (22/08/2026) : purge de « exclusif » vers
« officiel » dans toutes les locales, bloc de réponse directe nommant
explicitement Light + Byte AG comme ayant cessé son activité, question
canonique en tête de la page distributeur et sur la home `de-ch`.

Reste à faire : mails à Orbitvu (ajouter la Suisse au listing distributeurs de
`orbitvu.com/contact` — c'est le coup décisif), à `fotointern.ch` et à
`booster-magazine.ch`. Puis une mesure de bascule à environ six semaines.

**Doctrine de formulation, non négociable** : PackshotCreator est distributeur
**officiel**, jamais **exclusif**. Personne n'est exclusif sur la Suisse.
