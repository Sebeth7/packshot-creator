# 06 — Chantiers SEO / GEO

Le backlog, arrêté au **16/09/2026**. `ETAT.md` dit ce qui est en cours
maintenant ; ce fichier dit ce qu'il y a à faire et pourquoi.

Priorités : **P0** bloque ou coûte du trafic tous les jours · **P1** effet fort
attendu · **P2** utile, sans urgence.

---

## P0 — Bloquants

### C1 · Merger `feat/audit-laurent-0309`

| | |
|---|---|
| État | Mergée le 16/09/2026 (PR #3), en production — mesure en attente (`ETAT.md`) |
| Commit | `0e8949f` |
| Rayon | Engage l'entreprise (prix E-Comm Studio+) — arbitrage Sébastien |

Contient le correctif de la **cause structurelle n°1** identifiée par l'audit :
le sélecteur de langue déversait l'autorité sur des pages `/en` en `noindex`.

Détail du contenu : sélecteur article par article via `alternates.json` ·
ancre `de-ch` ne pointant jamais vers `/en` · aucune ancre vers une page `/en`
en `noindex` · `resolveNavHref` réécrivant les 8 secteurs traduits en slug
allemand · couverture `de-ch` blog et guides dérivée d'`alternates.json` ·
`besoins` et `PackshotLandingTemplate` passés en `NavLink` · messages blog
`de-ch` et listing guides en allemand · `price` au niveau `Offer` · E-Comm
Studio+ à 130 000 € · Product isolé retiré de la home · colonne footer « Nos
studios » (13 fiches) · `/fr/outil-financement` en `noindex,follow` et hors
sitemap.

Build vert, 23 URL contrôlées en local au moment de la livraison.

**Attention** : la branche est basée sur `ff5658b`. Si `main` a avancé depuis,
rebaser et **relancer un build** avant de merger.

C'est aussi le test que Laurent attend pour mesurer : Link Score `/fr` contre
`/en` (86 contre 93), position sur « packshot creator » (`/fr` 28,9 contre
`/en` 1,9), clics français atterrissant sur `/en` (48/mois).

### C2 · Accès des crawlers IA — requalifié par la mesure ASN (17/09)

| | |
|---|---|
| État | Mesure 403 × ASN faite le 17/09 (18/08-16/09) : le blocage massif mesuré jusqu'ici vise surtout des user-agents usurpés. Aucune règle WAF justifiée en l'état ; deux points à qualifier |
| Rayon | Infrastructure Cloudflare — voir `05-INFRA.md` |

**Ce que la mesure établit** (hôtes www, apex et fr, 30 jours) :

| Crawler | Depuis le réseau de l'éditeur | Depuis Google Cloud (AS396982) |
|---|---|---|
| Googlebot | AS15169 : 17 210 requêtes, 2 réponses 403, 0 réponse 504 | 696 requêtes, 382 réponses 403 (usurpés) |
| ChatGPT-User | Microsoft : 0 réponse 403 sur 2 002 | 4 117 réponses 403 sur 4 852 |
| OAI-SearchBot | Microsoft : 68 sur 3 216 | 2 597 sur 3 086 |
| ClaudeBot / Claude-SearchBot | Amazon : 0 sur 506 / 0 sur 2 429 | 1 853 sur 2 350 / 1 165 sur 1 423 |
| Applebot | Apple : 0 sur 4 655 | 1 192 sur 1 540 |
| GPTBot, Perplexity-User | aucune requête hors Google Cloud | 100 % des requêtes, 403 majoritaires |
| **PerplexityBot** | **AS14618 (Amazon) : 383 sur 519** | 1 777 sur 2 241 |

Les 403 des crawlers IA portent une action de sécurité Cloudflare dans 99,9 % des cas (ensemble managé : challenge ; règle personnalisée : blocage). Le constat « environ 20 % des 403 laissent un événement » est retiré : il tenait à la rétention de 3 jours des événements de sécurité.

**Statut** :
Qualifié le 17/09. Seul blocage réel d'un robot légitime : PerplexityBot authentique,
383 challenges managés sur 519 requêtes. Exception WAF à instruire (GO Laurent).
Amazonbot authentique n'est pas bloqué ; D8 repose sur une prémisse invalidée.

### C3 · 504 — requalifiés en artefact de mesure (17/09)

| | |
|---|---|
| État | Mesure du 17/09 (18/08-16/09) : les 504 ne sont servis ni aux visiteurs ni aux robots mesurés. Confirmation côté Google en attente (statistiques d'exploration GSC) |
| Rayon | Mesure seulement — aucun changement de code attendu à ce titre |

213 490 réponses 504 en 30 jours, **toutes avec le user-agent `nginx-ssl early hints`** : requêtes internes de Cloudflare liées à la fonction Early Hints (réglage de zone), statut d'origine 0, cache miss. Sur 9 pages HTML témoins, les navigateurs déclarés (45 951 requêtes) ne reçoivent aucune 504 ; Googlebot depuis AS15169 non plus (17 210 requêtes).

Conséquences :
● Les 504 ne sont plus une piste démontrée du recul de trafic. Le chiffre de 1 857 clics/mois (janvier 2026) correspond à `gsc_metrics_page`, tous pays, sans filtre ; août 2026 vaut 547 sur la même base (et non 524). Comparaison à travers les migrations d'avril et de mai : décomposition en cours.
● Le taux de 504 de `cf_traffic_daily` mesure ces requêtes internes, pas la disponibilité : à lire en excluant ce user-agent.
● Le correctif `images.minimumCacheTTL` (04/09) est conservé, sans effet attendu sur ce taux.
● Période antérieure au 18/08 : non vérifiable (rétention GraphQL de 31 jours).

Reste ouvert, sans lien avec les 504 : les gabarits `[slug]` des secteurs, fiches machines et articles JSON (et formations, d'après le build) sont rendus dynamiquement. Constaté en production le 17/09 sur `sysnext.vercel.app` : `Cache-Control: private, no-cache, no-store`, `x-vercel-cache: MISS` à deux passages, exécution `iad1`. Cause identifiée en build local : `not-found.tsx` au niveau du segment `[slug]`. Effet sur l'exploration en cours d'instruction.

---

## P1 — Effet fort attendu

### C4 · Resynchroniser le Worker, puis appliquer l'annexe K

| | |
|---|---|
| État | Dépôt et production synchronisés — constat du 17/09/2026 (comptes de clés identiques sur 11 tables, différences cosmétiques seules). Annexe K à ouvrir. |

Procédure complète dans `05-INFRA.md`. **Rien ne doit être mappé avant la
resynchronisation.**

Ensuite, l'annexe K : 21 mappings — 2 bascules `/en` → `/fr`, 15 réparations de
404, 2 sorties en 410, et une fusion `industrie-defense` **à revoir** : le
vertical défense a été abandonné au profit de industrie / aéronautique /
automobile le 04/09.

### C5 · Traduire les 30 pages `/en` en `noindex`

| | |
|---|---|
| Décidé | 04/09/2026 |
| Rayon | Large — les sets `NOINDEX_EN_*` réactivent partout à la fois |

Composition : 19 secteurs (`data/secteurs.ts`, français uniquement) + le hub
`/en/industrie` · 3 pages solutions · 6 fiches formation
(`content/formations`) · la page distributeur EN · 3 articles migrés.

**Mécanisme de réactivation** : les sets `NOINDEX_EN_*` de `lib/seo-config.ts`
pilotent robots, sitemap et sélecteur simultanément. Traduire, puis retirer le
slug du set → la page se réactive partout (voir `04-SURFACES-SEO.md`).

### C6 · Arbitrer les redirections legacy vers `/fr`

| | |
|---|---|
| État | En attente de la liste du lot pilote, côté Laurent |
| Rayon | Large — backlinks et autorité |

Le Worker route aujourd'hui 556 URL legacy vers `/fr` et 548 vers `/en`.
Constat : sur « packshot creator », `/en` est en position 1,9 avec 98 clics,
`/fr` en position 28,9 avec 0 — et la France est le premier pays du trafic
`/en`.

Proposition de Laurent : rebasculer vers `/fr` les URL legacy à autorité.
Décision de Sébastien (04/09) : **pilote d'abord**, mesure GSC à quatre
semaines, puis généralisation.

Réserve à connaître : le lot pilote `/fr` est quasi inexistant — 2 URL legacy
seulement. Le Worker route déjà 69 % des backlinks de valeur vers `/fr`. Le
vrai test est le correctif du sélecteur de langue (C1).

Lot pilote proposé : les 3 landings packshot-* et les 13 anciens slugs FR (PR en cours).

### C7 · Créer la page du vertical industrie / aéronautique / automobile

| | |
|---|---|
| Décidé | 04/09/2026, en remplacement du vertical défense |
| Rayon | Copy par Sébastien ; structure et SEO par toi |

La page cible reste à définir. Le contexte a été fourni par Sébastien. Structure
et SEO côté Claude, prose côté Sébastien.

---

## P2 — Utile, sans urgence

### C8 · Retirer « PackshotCreator » des `title` d'articles

Point 2.b de l'audit du 03/09. **Piège** : le `title` provient du champ
`metaTitle` de chaque JSON d'article — ce n'est pas un gabarit centralisé. Donc
25 fichiers JSON à éditer, ou une règle de suppression à poser.

### C9 · Wikidata

Créer et compléter les éléments **Sysnext SAS** et **PackshotCreator** :
descriptions en français, allemand et anglais, « distributeur officiel Orbitvu
France et Suisse », siège, site, références vers `orbitvu.com` et les registres.

Opération ponctuelle, à fort effet sur les moteurs de réponse. Aucune mention
Wikipedia ni Reddit n'existe dans l'index des 1 388 mentions relevées.

### C10 · Plan Reddit

Zéro mention dans l'index. Plan sur 3 à 6 mois : compte transparent → réponses
expertes sans lien → contenus riches → mesure. **Manuel** : préparation côté
Claude, publication par un humain.

### C11 · Lien sortant d'autorité depuis la page d'accueil

Relevé par l'audit GEO du 20/08 : la page d'accueil ne porte aucun lien sortant
vers une source d'autorité. Signal E-E-A-T faible.

### C12 · Mesure de bascule du dossier suisse

Environ six semaines après l'envoi des mails à Orbitvu, `fotointern.ch` et
`booster-magazine.ch` — donc **début octobre 2026 au plus tôt**, à condition que
les mails soient partis. Sonde ciblée sur les thèmes « distributeur suisse ».

### C13 · Coquille dans l'article Ortery

« en sur la zone EMEA ». Mineure, jamais corrigée.

---

## Hors périmètre — ne pas entreprendre

| Sujet | Propriétaire | Raison |
|---|---|---|
| Rédaction des 3 articles en cours | Sébastien | Prose française, brouillons en attente de sa réécriture |
| Calculateur ROI, questionnaire client | Sébastien | Chantiers actifs de son côté — collision, pas interdiction |
| Export mensuel geo-ultimate → Supabase | Sébastien | Son outillage, ses clés |
| Marquage `published` des publications | Sébastien → Laurent | Boucle de mesure entre eux |
| Jeton GitHub `psc-n8n-publisher` expiré | Sébastien | Probablement expiré depuis le 10/09 |
| Mails à Orbitvu, fotointern, booster | Sébastien | Brouillons créés le 22/08, à envoyer |

---

## Ordre d'attaque conseillé

```
1. C2  Qualifier PerplexityBot (IP publiées) et Amazonbot (ASN) — aucune règle WAF justifiée en l'état
2. C3  Confirmer côté Google (statistiques d'exploration GSC) — 504 requalifiés en requêtes internes Early Hints
3. C1  Mesurer le correctif (contrôle L.3) — Laurent
4. C4  Annexe K — le resync est acquis (17/09) ; débloque C6 et les 15 réparations de 404
5. C6  Redirections legacy vers /fr — après le resync du Worker
6. C5  Traduction par lots — le plus gros volume, le plus prévisible (D17)
```

C2 et C3 sont en phase de qualification : aucune modification de code ni de règle Cloudflare avant les résultats.
