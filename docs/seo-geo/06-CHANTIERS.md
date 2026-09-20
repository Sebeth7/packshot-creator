# 06 — Chantiers SEO / GEO

Le backlog, arrêté au **19/09/2026**. `ETAT.md` dit ce qui est en cours
maintenant ; ce fichier dit ce qu'il y a à faire et pourquoi.

Priorités : **P0** bloque ou coûte du trafic tous les jours · **P1** effet fort
attendu · **P2** utile, sans urgence.

---

## P0 — Bloquants

### C1 · Merger `feat/audit-laurent-0309`

| | |
|---|---|
| État | **Clos le 19/09.** Mergée le 16/09/2026 (PR #3), en production. La mesure vit dans « En attente de mesure » d'`ETAT.md`, pas ici |
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
| État | **Clos le 19/09, tranché par D22.** Super Bot Fight Mode est la source des défis ; PerplexityBot a été retiré de la liste des bots vérifiés de Cloudflare en 2025, d'où les défis depuis ses adresses publiées. Ce qui reste est une action Cloudflare sous GO (Q6), pas un chantier de qualification |
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
Clos le 19/09 par **D22**, qui fait foi et remplace la section « bots » de `05-INFRA.md`.
Seul blocage réel d'un robot légitime : PerplexityBot authentique, 383 défis sur
519 requêtes. Correctif retenu : règle WAF conditionnée au user-agent **et** à
l'adresse IP publiée, déposée pour information en Q6. Amazonbot authentique n'est
pas bloqué ; D8 repose sur une prémisse invalidée.

### C3 · 504 — requalifiés en artefact de mesure (17/09)

| | |
|---|---|
| État | **Clos le 19/09.** Les 504 sont un artefact de mesure : requêtes internes Cloudflare liées aux Early Hints, servies ni aux visiteurs ni aux robots. Confirmation côté Google suivie dans « En attente de mesure » d'`ETAT.md` |
| Rayon | Mesure seulement — aucun changement de code attendu à ce titre |

213 490 réponses 504 en 30 jours, **toutes avec le user-agent `nginx-ssl early hints`** : requêtes internes de Cloudflare liées à la fonction Early Hints (réglage de zone), statut d'origine 0, cache miss. Sur 9 pages HTML témoins, les navigateurs déclarés (45 951 requêtes) ne reçoivent aucune 504 ; Googlebot depuis AS15169 non plus (17 210 requêtes).

Conséquences :
● Les 504 ne sont plus une piste démontrée du recul de trafic. Le chiffre de 1 857 clics/mois (janvier 2026) correspond à `gsc_metrics_page`, tous pays, sans filtre ; août 2026 vaut 547 sur la même base (et non 524). Comparaison à travers les migrations d'avril et de mai : décomposition en cours.
● Le taux de 504 de `cf_traffic_daily` mesure ces requêtes internes, pas la disponibilité : à lire en excluant ce user-agent.
● Le correctif `images.minimumCacheTTL` (04/09) est conservé, sans effet attendu sur ce taux.
● Période antérieure au 18/08 : non vérifiable (rétention GraphQL de 31 jours).

**Soldé le 19/09, sans lien avec les 504.** Les gabarits `[slug]` étaient rendus dynamiquement à cause d'un `not-found.tsx` au niveau du segment. La PR #15 les a retirés : la table des routes de `next build` du 19/09 donne `blog/[slug]`, `industrie/[slug]` et `studio-photo/[slug]` en `●` SSG. Seul `academy/[slug]` reste en `ƒ`, parce que sa feuille ne déclare pas de `generateStaticParams` — documenté dans la PR #15, à instruire séparément. L'hypothèse `setRequestLocale` est écartée : il est absent des cinq gabarits, y compris des quatre prérendus.

---

### C14 · Accents et champs marchands

| | |
|---|---|
| État | À ouvrir — **P0**, effort faible |
| Rayon | `messages/fr.json` (partagé avec Sébastien), FAQ des fiches machines, `lib/seo-config.ts` |

Ouvert le 19/09. Absorbe **C8** (retrait de « PackshotCreator » des `title`
d'articles, 25 JSON ou une règle de suppression) et **C13** (coquille « en sur
la zone EMEA » dans l'article Ortery) : même famille de défauts, même PR.

`messages/fr.json` est partagé avec le Claude de Sébastien : modifications
chirurgicales, jamais de reformatage global (piège F4), et réservation dans
`ETAT.md` avant d'ouvrir.

---

## P1 — Effet fort attendu

### C4 · Lot F — annexe K

| | |
|---|---|
| État | Le Worker est **synchronisé (D21)**, mesuré par comportement le 18/09 : zéro écart sur les 14 URL du lot C. Il ne reste que l'annexe K et les correctifs du lot F |

Procédure complète dans `05-INFRA.md`. La resynchronisation est acquise (D21) ;
R5 reste entière : tout déploiement part du dépôt, jamais du dashboard, et reste
précédé d'un contrôle d'unicité des clés (piège E4).

Ensuite, l'annexe K : 21 mappings — 2 bascules `/en` → `/fr`, 15 réparations de
404, 2 sorties en 410, et une fusion `industrie-defense` **à revoir** : le
vertical défense a été abandonné au profit de industrie / aéronautique /
automobile le 04/09.

### C5 · Traduire les 30 pages `/en` en `noindex`

| | |
|---|---|
| État | **Gelé (D17)** — aucun effort sur `/en` tant que des chantiers FR/CH sont ouverts. D9 n'est pas modifiée : la traduction reste décidée, seul son rang change |
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
| État | Liste du pilote constituée (25 URL, 16 destinations) — hygiène de locale (D28) |
| Rayon | Large — backlinks et autorité |

542 entrées vers `/en` hors hôtes, 550 avec les 8 hôtes de `HOST_HOME_MAP` (parsing du 19/09).
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

### C15 · Renverser l'axe GEO

| | |
|---|---|
| État | À instruire — **P1** |
| Rayon | `content/**` |

Ouvert le 19/09. Piloté par un indicateur de citation en réponse générative,
pas par une position ni par un volume de clics — **D19**. Les contenus IA
visent l'intention prestataire avec un angle d'internalisation (**D18**), et
la création d'articles reste soumise au critère de **D16**.

---

## P2 — Utile, sans urgence

### C8 · Retirer « PackshotCreator » des `title` d'articles — fusionné avec « accents et champs marchands »

**Fusionné le 19/09** dans le chantier « accents et champs marchands » : même famille de défauts, mêmes fichiers, même PR.

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

### C12 · Mesure de bascule du dossier suisse — clos

**Clos le 19/09** : dépendait des trois courriels suisses, sortis du plan le 19/09.

Environ six semaines après l'envoi des mails à Orbitvu, `fotointern.ch` et
`booster-magazine.ch` — donc **début octobre 2026 au plus tôt**, à condition que
les mails soient partis. Sonde ciblée sur les thèmes « distributeur suisse ».

### C13 · Coquille dans l'article Ortery — clos

« en sur la zone EMEA ». **Clos le 19/09** : traité par la PR « accents et champs marchands », même famille de défauts.

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

## Chantiers de fond — hors nomenclature C

Ouverts le 19/09 par D28. Ils ne portent pas de numéro `C<n>` : la lettre `F` est
déjà prise par la famille de pièges de `03-PIEGES.md`.

### Chantier — Choix de page sur la marque

Marque — choix de page sur « packshot creator », mesures M1-M6.

### Chantier — Substitution de page sur les requêtes commerciales

Substitution de page sur les requêtes commerciales, page témoin `/fr/packshot-e-commerce`.

---

## Ordre d'attaque conseillé

```
1. Marque, bloquée par ses mesures
2. Substitution de page, premier chantier exécutable
3. C14 Accents et champs marchands
4. C4 Lot F
5. C15 Renverser l'axe GEO
6. C6 pilote (hygiène)
7. C7 Vertical industrie
8. C5 Traduction (gelé, D17)
```

C1, C2, C3, C12 et C13 sont clos le 19/09. Le déploiement du Worker reste une
porte séparée (D4) : il ne suit pas la fusion d'une PR.
