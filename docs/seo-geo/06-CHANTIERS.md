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
| État | Livrée, poussée, **non mergée depuis le 04/09/2026** |
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

### C2 · Débloquer les crawlers IA au niveau Cloudflare

| | |
|---|---|
| Effort | Plus que les « 10 minutes » annoncées — le diagnostic de départ est faux |
| Rayon | Infrastructure Cloudflare — voir `05-INFRA.md` |

GPTBot bloqué à 100 %, Perplexity-User à 100 %, PerplexityBot à 77 %. Le
`robots.txt` du site les autorise explicitement : **la configuration Cloudflare
contredit la politique du site.** Tout l'investissement GEO est amputé tant que
ce point tient.

**Attention : le correctif prescrit ne s'applique pas tel quel.** Vérifié au
dashboard le 16/09/2026, les AI bot policies sont **déjà toutes sur Allow**. Le
blocage vient de Super Bot Fight Mode (« Definitely automated » → Managed
Challenge, avec Javascript Detections actif), et le vrai correctif est une règle
WAF de Skip. Le détail, les règles existantes et les deux réserves sont dans
`05-INFRA.md`.

Premier geste : **remesurer**. Les chiffres datent du 04/09 et la configuration
a peut-être bougé depuis.

Amazonbot reste bloqué (décision du 04/09). Les requêtes sans user-agent et curl
restent bloquées.

### C3 · Instruire les 504

| | |
|---|---|
| État | Correctif partiel déployé le 04/09, effet non mesuré |
| Rayon | Large — `next.config.ts` bloc `images`, en cours de mesure |

8 à 23 % des requêtes par jour depuis au moins le 05/07/2026, pages HTML
comprises. Piste n°1 du recul de 1 857 à 524 clics/mois.

Fait : `images.minimumCacheTTL` porté à un an (04/09). Lisible dans
`cf_traffic_daily` à partir du 05/09 — **à lire maintenant, personne ne l'a
fait.**

À instruire dans Vercel Observability : erreurs par route, durées, optimisation
d'images. Les 504 sur pages HTML ne s'expliquent pas par les images. Seconde
hypothèse : dépassement de délai dans la chaîne Worker → Vercel.

`next.config.ts` bloc `images` est à rayon large, et la mesure du correctif du
04/09 est encore en cours : déclare les conséquences dans la PR, et n'empile pas
un second changement sur une mesure non terminée.

---

## P1 — Effet fort attendu

### C4 · Resynchroniser le Worker, puis appliquer l'annexe K

| | |
|---|---|
| État | Bloqué : le fichier de production promis le 03/09 n'a jamais été transmis |

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
1. C2  Bots IA          — 10 minutes, débloque tout l'investissement GEO
2. C3  Lire cf_traffic_daily depuis le 05/09 — l'effet du correctif 504 attend
3. C1  Faire merger la branche — rebaser, rebuilder, demander l'arbitrage
4. C4  Resync Worker    — débloque C6 et les 15 réparations de 404
5. C5  Traduction par lots — le plus gros volume, le plus prévisible
```

C2 et C3 ne demandent aucune modification de code et se font immédiatement.
C1 attend un geste de Sébastien — le réclamer dans `ETAT.md`.
