# 05 — Infrastructure

Quatre systèmes vivent hors du dépôt. Chacun a un propriétaire, des gestes
autorisés et des gestes interdits.

```
Visiteur
   │
   ▼
Cloudflare  ── DNS, WAF, Super Bot Fight Mode, cache
   │            puis le Worker « packshot-router » (routage + redirections)
   ▼
Vercel (projet « sysnext »)  ── Next.js, rendu, optimisation d'images
   │
   ▼
Supabase (questionnaire, leads)  ·  Pipedrive  ·  Resend
```

**L'ordre compte** : le WAF s'exécute **avant** le Worker, qui s'exécute avant
Vercel. Un blocage en amont rend invisible tout ce qui est en aval.

---

## Cloudflare

| | |
|---|---|
| Zone | `packshot-creator.com` |
| Zone ID | `b51d039e5159fc409b22cd37c0221475` |
| Propriétaire opérationnel | Laurent, en coordination avec Sébastien |
| Worker | `packshot-router` |

### Autorisé

● Lire la configuration, les règles, les analytics
● Modifier la configuration WAF et bots **après** l'avoir écrit dans
  `JOURNAL.md`, avec ce que la règle protège

### Interdit

● **Éditer le Worker au dashboard.** Le dépôt est la source unique depuis le
  07/07/2026. Règle violée deux fois, acceptée sans réserve par Laurent le
  24/07/2026
● Supprimer une règle WAF sans avoir vérifié ce qu'elle protège

### La procédure de resynchronisation du Worker — à faire avant tout mapping

**Constat du 17/09/2026** — dépôt et production synchronisés (11 tables, comptes
de clés identiques ; différences cosmétiques seules ; production modifiée pour la
dernière fois le 24/07/2026). Le fichier du dépôt est un bundle esbuild : toute
modification de table se fait sans reformater le fichier. Refaire la comparaison
avant chaque nouveau déploiement.

Au 04/09/2026, une divergence était supposée ; elle est levée par le constat du
17/09/2026.

```
1. Récupérer le code réellement déployé (dashboard Cloudflare, ou demander
   à Laurent le fichier de production)
2. Le comparer à cloudflare-worker/src/index.js
3. Intégrer au dépôt tout ce qui n'existe qu'en production
4. node --check cloudflare-worker/src/index.js
5. Vérifier l'unicité des clés dans les tables (piège E4)
6. Commiter cette resynchronisation SEULE, sans y mêler de nouveau mapping
7. Seulement ensuite, ouvrir le chantier des nouveaux mappings
```

**Un déploiement sans resynchronisation écrase des règles qui n'existent qu'en
production.** C'est arrivé.

### Après tout déploiement du Worker

Le Preview Vercel ne passe pas par le Worker (piège E5). Le contrôle se fait
donc en production, immédiatement, sur une liste d'URL témoins préparée à
l'avance. Inclure obligatoirement :

● la racine `/` → `/fr`
● une redirection legacy connue
● **chaque sous-domaine proxifié** : `videos.`, `books.`, `trail.` — c'est là
  qu'a eu lieu l'incident du 23/07
● une bascule `/de/*` → `/de-ch/*`

Toujours avec une chaîne de requête neuve (piège B2).

### Le dossier bots IA — chantier ouvert

Mesuré par Laurent sur sept jours (04/09/2026) :

| Bot | Taux de blocage |
|---|---|
| GPTBot | **100 %** (233/233) |
| Perplexity-User | **100 %** |
| PerplexityBot | 77 % |
| ClaudeBot | 36 % |
| Claude-User | 31 % |
| ChatGPT-User | 30 % |
| OAI-SearchBot | 22 % |
| Googlebot | 0,2 % |
| Bingbot | 2,3 % |
| Amazonbot | 97 % (18 946 requêtes) |

**Le correctif prescrit par Laurent — « allowlist explicite des sept bots IA
dans Security → Bots, 10 minutes » — ne s'applique pas tel quel.** Vérifié au
dashboard le 16/09/2026 :

| Réglage | État réel |
|---|---|
| AI bot policies → Search | **Allow (do not block)** |
| AI bot policies → Agent | **Allow (do not block)** |
| AI bot policies → Training | **Allow (do not block)** |
| AI Labyrinth | désactivé |
| Bot Preference Sync | désactivé |

L'allowlist est donc **déjà ouverte**. Le blocage vient d'ailleurs :

**Super Bot Fight Mode** → « Definitely automated traffic » → **Managed
Challenge**, avec **Javascript Detections activé**. Un crawler IA n'exécute pas
de JavaScript : il est classé « automated » et reçoit un challenge qu'il ne peut
pas résoudre. D'où le 403.

Les règles WAF personnalisées (4 sur 20) confirment le mécanisme :

| Ordre | Nom | Condition | Action | État |
|---|---|---|---|---|
| 1 | Autoriser bots vérifiés (Skip-first) | `Known Bots equals true` | Skip | Active |
| 2 | Défier bots inconnus ou suspects | `Known Bots ≠ true` sauf Screaming Frog | Non-Interactive Challenge | **Désactivée** |
| 3 | Bloquer chemins sensibles | URI contient `/wp-`, `/admin`… | Block | Active |
| 4 | Skip SBFM videos R2 | `hostname = videos.packshot-creator.com` | Skip | Active |

La règle 1 ne laisse passer que les **Known Bots**, c'est-à-dire la liste de bots
vérifiés par Cloudflare, qui repose sur une vérification d'adresse IP. Googlebot
en fait partie — 0,2 % de blocage. Les crawlers IA qui n'y sont pas tombent dans
Super Bot Fight Mode.

**Le correctif réel** : une règle personnalisée supplémentaire, ordonnée avant
l'évaluation de Super Bot Fight Mode, qui fait un Skip des règles SBFM pour les
user-agents des sept crawlers. La règle 4 en fournit le modèle exact.

**Deux réserves avant d'agir**, et elles comptent :

1. **Un user-agent se falsifie.** Autoriser sur la seule chaîne de user-agent
   ouvre une porte aux scrapers qui se déclarent GPTBot. Les 156 780 requêtes
   sans user-agent et les 26 569 requêtes curl actuellement bloquées montrent
   qu'il y a du trafic qui cherche à entrer.
2. **Les chiffres de Laurent datent du 04/09.** Les AI bot policies étant
   aujourd'hui sur Allow, il se peut qu'elles aient été changées depuis, et que
   les taux aient déjà bougé. **Remesurer avant de modifier une règle WAF** —
   c'est une modification de règle WAF qui a cassé toutes les vidéos produit le
   23/07/2026.

**Décisions déjà prises** : Amazonbot **reste bloqué** tant que durent les 504
(Sébastien, 04/09/2026). Les 156 780 requêtes sans user-agent et les 26 569
requêtes curl sont du scan — elles restent bloquées.

Remarque mesurée : Perplexity cite PackshotCreator **malgré** un blocage à 77 %
— les citations transitent par des index tiers. « Bot bloqué » n'équivaut pas à
« invisible ».

Le `robots.txt` du site suit une orientation explicite : ouvrir les crawlers de
**citation** (visibilité GEO), bloquer ceux d'**entraînement**. Il porte un
en-tête `Content-Signal: search=yes, ai-input=yes, ai-train=no`. Ce réglage
suppose que « Block AI bots » et « AI Labyrinth » soient désactivés côté
Cloudflare — sinon le `robots.txt` ne sert à rien.

---

## Vercel

| | |
|---|---|
| Projet de production | **`sysnext`** |
| URL dashboard | `https://vercel.com/sebs-projects-ca1e93a7/sysnext` |
| Origine de production | `https://sysnext.vercel.app` — même HTML que `www`, hors Cloudflare |
| Déploiement | Automatique depuis GitHub |
| Accès Laurent | Observability et logs, **en lecture** |

| Événement git | Conséquence |
|---|---|
| Push sur une branche | Déploiement **Preview**, URL automatique en commentaire de PR |
| Push ou merge sur `main` | **PRODUCTION**, ~3 minutes, sans confirmation |

### La protection de déploiement — à connaître avant le premier Preview

**Les Preview sont protégés par le SSO Vercel.** Toute requête sans
authentification est redirigée (302) vers `vercel.com/sso-api`. Vérifié le
16/09/2026 : 20 requêtes sur 20, pages et fichiers statiques compris.

Conséquences :

| Pour | Effet |
|---|---|
| Ouvrir un Preview dans un navigateur | Nécessite d'être membre de l'équipe Vercel `sebs-projects-ca1e93a7` |
| Contrôler un Preview par script | Nécessite un **jeton de contournement** |

Le jeton se crée dans Vercel → projet `sysnext` → Settings → Deployment
Protection → **Protection Bypass for Automation**. Il s'utilise ainsi :

```bash
VERCEL_AUTOMATION_BYPASS_SECRET=<jeton> \
  node scripts/seo/smoke.mjs https://<preview>.vercel.app
```

Le smoke test détecte la protection et l'explique au lieu de faire croire à une
panne.

**Sans ce jeton, la porte « Preview contrôlée » de `02-PROCEDURE.md` ne peut pas
être franchie.** C'est un prérequis à l'autonomie, pas un confort.

### L'origine, outil de contrôle

`https://sysnext.vercel.app` sert le déploiement de production **sans passer par
Cloudflare**. C'est la cible du smoke test : un script ne peut pas atteindre
`www` (403 sur 17 pages sur 17, mesuré le 16/09/2026, malgré un user-agent
Chrome — Cloudflare reconnaît l'empreinte TLS).

Ce que l'origine **ne montre pas** : tout ce que fait le Worker. Redirections
legacy, 410, sous-domaines, racine `/`. Pour ça, un navigateur sur `www`.

### Interdit

● **Le CLI Vercel**, sous toutes ses formes. `.vercel/project.json` pointe vers
  un projet obsolète nommé `packshot-creator` (piège A3)
● Modifier les variables d'environnement

### Le chantier 504 — pourquoi l'accès Observability

Les 504 représentent 8 à 23 % des requêtes par jour depuis au moins le
05/07/2026, **pages HTML comprises**. C'est la piste n°1 du recul de trafic
(1 857 → 524 clics/mois).

Un correctif partiel a été déployé le 04/09 : `images.minimumCacheTTL` porté à
un an, sur l'hypothèse que `/_next/image` représentait une part majeure des
timeouts. L'effet est lisible dans `cf_traffic_daily` à partir du 05/09.

Ce qui reste à instruire dans Observability : erreurs par route, durées
d'exécution, optimisation d'images. **Les 504 sur des pages HTML ne s'expliquent
pas par les images** — une seconde hypothèse porte sur un dépassement de délai
dans la chaîne Worker Cloudflare → Vercel.

`next.config.ts`, bloc `images` : **rayon large**, et une mesure est en cours
depuis le 04/09. Déclare les conséquences dans la PR, et n'empile pas un second
changement sur une mesure non terminée.

---

## Supabase

Deux bases distinctes, à ne pas confondre.

| Base | Contenu | Propriétaire |
|---|---|---|
| **`gsc-crawl-seo`** | Données GSC, crawls Screaming Frog, `cf_traffic_daily`, veille, calendrier éditorial, dashboard | Laurent |
| **Sysnext** (`hioxrshzhcmbqqaabshz`) | Questionnaire client, leads — schéma `survey` | Sébastien |

La base Sysnext contient des **données personnelles**. Lecture pour diagnostic.
Aucune écriture sans demande explicite.

Le code du site n'accède qu'à la base Sysnext, via `lib/supabase.ts`
(rayon large — voir `01-RAYON-ACTION.md`).

### Le pont geo-ultimate

Un export mensuel alimente la base de Laurent avec les résultats des audits GEO
de Sébastien (dernier export : 06/07/2026, 83 constats).

État au 16/09/2026 : **en retard depuis environ le 10/08**. Laurent avait gelé
le pont de son côté avant de le dégeler le 04/09. Le dashboard affiche donc des
constats P0 obsolètes, dont plusieurs sont couverts par le chantier suisse livré
fin août.

C'est un chantier côté Sébastien. Ne pas l'entreprendre, mais ne pas s'étonner
que le dashboard mente sur ces lignes.

---

## Google Search Console

| | |
|---|---|
| Propriété | `www.packshot-creator.com` |
| Accès Laurent | Oui |

C'est l'outil de **mesure et de validation**, jamais de modification.

### Les deux règles

**1. GSC ne valide pas un 410 comme correction d'un 404.** Il faut un 200 ou un
3xx vers un 200. Un 410 reste classé en erreur indéfiniment (piège D2).

**2. GSC arrête la validation à la première erreur trouvée.** Un rapport
« N échecs » n'est pas un échantillon représentatif.

### Après un déploiement structurant

Inspection d'URL sur les pages touchées, avec demande de réindexation. Compter
**3 à 14 jours** avant que le rapport reflète la correction, et **2 à 6
semaines** avant de pouvoir conclure sur un effet de trafic.

---

## GitHub

| | |
|---|---|
| Dépôt | `Sebeth7/packshot-creator`, **public** |
| Accès Laurent | `lwainberg`, droit d'écriture |
| Protection de `main` | Ruleset `protect-main` |

Le dépôt étant public : **jamais de secret, de jeton, de mot de passe ni de
donnée personnelle dans un commit, un message de commit, ou le journal.**

### Jeton n8n au 17/09/2026

Jeton fine-grained `psc-n8n-publisher` renouvelé le 16/09/2026, installé dans le
credential n8n « PSC - GitHub site (SJ) » (`El17IlM75qXppo9D`) et testé le
17/09/2026 (lecture du dépôt : OK — `full_name` renvoyé, `permissions.push: true`).
Seul consommateur identifié : le workflow `M0 · Test connexions`
(`HPZw7pblQrhFQTLc`, manuel, inactif). Aucun workflow de publication n'existe à ce
jour. Date d'expiration : non relevée.

---

## Tableau de synthèse

| Système | Accès Laurent | La seule réserve |
|---|---|---|
| Dépôt GitHub | Écriture, merge de ses PR | On merge une PR, on ne pousse pas sur `main` : `main` = production |
| Vercel | Observability et logs | Pas de CLI (il vise un projet obsolète), pas de variables d'environnement |
| Cloudflare WAF / bots | Configuration | Journaliser ce que protège une règle avant de la retirer — le 23/07, une suppression a cassé toutes les vidéos |
| Worker `packshot-router` | Commit puis déploiement depuis le dépôt | Resynchroniser d'abord ; pas d'édition dashboard (sa propre décision du 24/07) |
| Supabase `gsc-crawl-seo` | Complet — c'est sa base | — |
| Supabase Sysnext | Lecture pour diagnostic | Données personnelles : pas d'écriture sans demande |
| Search Console | Complet | — |

Aucune de ces réserves n'est une question de confiance. Chacune correspond à un
effet qui survit à un `git revert`.
