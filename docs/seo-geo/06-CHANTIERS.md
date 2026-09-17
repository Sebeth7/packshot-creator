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

**Remesuré le 17/09/2026** (10-16/09, hôtes www, apex et fr) — taux de 403 (hors
3xx) : GPTBot 77,9 % (96,3), Perplexity-User 75,7 % (95,0), PerplexityBot 74,9 %
(91,9), ChatGPT-User 64,6 % (80,1), ClaudeBot 59,1 % (86,8), OAI-SearchBot 51,0 %
(60,9), Claude-SearchBot 45,9 % (59,8), Googlebot 11,7 %, Amazonbot 31,4 %. Le
blocage persiste et s'étend à ClaudeBot, ChatGPT-User et OAI-SearchBot.

Événements de sécurité (15-16/09, rétention de 3 jours) : les challenges viennent
d'une **règle managée**, les blocages d'une règle personnalisée ; aucun événement
Super Bot Fight Mode. Environ 20 % seulement des 403 de GPTBot et Perplexity-User
laissent un événement. Une règle de Skip limitée à Super Bot Fight Mode risque
donc de ne pas suffire.

Prochain geste : mesure 403 × ASN (part de user-agents usurpés), puis décision de
Laurent sur la règle (GO).

Amazonbot n'est plus bloqué qu'à 31,4 % (583 réponses 200 en 7 jours) : écart à D8
à signaler. Les requêtes sans user-agent et curl restent bloquées.

Amazonbot reste bloqué (décision du 04/09). Les requêtes sans user-agent et curl
restent bloquées.

### C3 · Instruire les 504

| | |
|---|---|
| État | Correctif partiel du 04/09 lu le 17/09 : aucun effet mesurable |
| Rayon | Large — `next.config.ts` bloc `images`, en cours de mesure |

8 à 23 % des requêtes par jour depuis au moins le 05/07/2026, pages HTML
comprises. Piste n°1 du recul de 1 857 à 524 clics/mois.

Fait : `images.minimumCacheTTL` porté à un an (04/09). **Lu le 17/09** : médiane
journalière 10,9 % avant (26-31/08) contre 11,0 % après (05-16/09), jours de
crawl exclus ; socle de 9-11 % inchangé depuis juillet. Répartition horaire
(10-16/09) : aucune heure dominante (4,4 à 15,3 %) ; le crawl Screaming Frog du
dimanche (2,0 %) et la fenêtre n8n du lundi (10,1 %) ne produisent pas de 504.
Épisode non expliqué du 14/09 17h UTC au 15/09 13h UTC à 18,2 %.

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
1. C2  Mesure 403 × ASN, puis décision WAF (GO Laurent) — pas « 10 minutes »
2. C3  Vercel Observability + 504 par chemin (épisode 14-15/09) — le correctif du 04/09 est sans effet mesurable
3. C1  Mesurer le correctif (contrôle L.3) — Laurent
4. C4  Annexe K — le resync est acquis (17/09) ; débloque C6 et les 15 réparations de 404
5. C6  Redirections legacy vers /fr — après le resync du Worker
6. C5  Traduction par lots — le plus gros volume, le plus prévisible (D17)
```

C2 et C3 sont en phase de mesure : aucune modification de code avant les résultats.
