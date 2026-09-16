# 03 — Les pièges

Chaque entrée correspond à un incident réel, daté. Ce ne sont pas des
précautions théoriques : ce sont des choses qui ont déjà cassé la production ou
fait perdre des jours.

**Lis ce fichier avant ton premier chantier. Relis la section concernée avant
d'attaquer un nouveau domaine.**

32 pièges au 16/09/2026, en sept familles : build et déploiement (A), ce qui
ment à la vérification (B), routage et internationalisation (C), indexation (D),
Worker et infrastructure (E), contenu et données (F), collaboration (G).

---

## A. Build et déploiement

### A1 — `next dev` ne fait pas le type-check strict

Le serveur de développement accepte du code que `next build` refuse.
**Incident (04/09/2026)** : une annotation `LinkHref` trop large passait en dev,
le build Vercel a échoué après le push sur `main`.
**Geste** : `npx next build` vert en local avant tout push. Toujours.

### A2 — Le build échoue sans variables d'environnement

`lib/supabase.ts` lit `NEXT_PUBLIC_SUPABASE_URL` au chargement du module et
**lève une exception** si elle est absente. Le build s'arrête, sans rapport avec
ton changement.
**Geste** : fournir des valeurs factices (voir `02-PROCEDURE.md`, étape 2).

### A3 — Jamais de CLI Vercel

`.vercel/project.json` pointe vers un projet obsolète nommé
`packshot-creator`. La production vit sur le projet **`sysnext`**.
**Incident** : un `npx vercel` a déployé sur le mauvais projet, ajouté des
variables d'environnement au mauvais endroit et généré de fausses alertes
d'échec.
**Geste** : dashboard uniquement. Les déploiements partent de git, pas du CLI.

### A4 — Vérifier la branche courante avant de commiter

**Incident (04/09/2026)** : un commit est parti sur `feat/roi-public` au lieu de
`main`. Rattrapé parce que la branche était par chance basée sur `origin/main`.
**Geste** : `git branch --show-current` avant chaque commit.

### A5 — Un push sur `main` est un déploiement en production

Pas de confirmation, pas d'étape intermédiaire. ~3 minutes.
**Geste** : on ne pousse jamais sur `main`. On merge une PR.

---

## B. Vérification — ce qui ment

### B1 — La production n'est pas testable par un script, même avec un user-agent de navigateur

Cloudflare renvoie **403 à tout client dont l'empreinte TLS n'est pas celle d'un
navigateur réel**. Changer le user-agent ne suffit pas : c'est la poignée de
main TLS qui est reconnue, pas l'en-tête.

**Mesuré le 16/09/2026** : sur `https://www.packshot-creator.com`, avec un
user-agent Chrome complet, 17 pages HTML sur 17 répondent 403. Les fichiers
statiques (`robots.txt`, `llms.txt`) passent — ce sont eux qui donnent
l'illusion que « le site répond ».

**Incident (04/09/2026)** : `/de-ch/packshot-amazon` avait été classée « code 0
au crawl », candidate 504 — elle répondait parfaitement en production.

**Geste** : trois cibles, selon ce qu'on veut prouver.

| Cible | Ce qu'elle prouve | Cloudflare | Worker |
|---|---|---|---|
| `https://sysnext.vercel.app` | Ce que l'application produit en production | non | non |
| `https://<preview>.vercel.app` | Ce que produira la branche | non | non |
| `https://www.packshot-creator.com` **dans Chrome** | Ce que voit un visiteur | oui | oui |

`sysnext.vercel.app` est l'origine du déploiement de production : le HTML y est
identique à celui servi par `www`, sans l'étage Cloudflare. C'est la cible du
`scripts/seo/smoke.mjs`.

Le script détecte le blocage et le dit explicitement au lieu de faire croire à
17 pannes.

### B2 — Les 301 restent en cache navigateur

Chrome met en cache les redirections permanentes sans `Cache-Control`. Un 301
testé avant un déploiement continue de s'afficher après.
**Incident (23/07/2026)** : des heures perdues à croire qu'un correctif Worker
n'avait pas pris.
**Geste** : toujours tester avec une chaîne de requête neuve
(`?v=<timestamp>`), ou en `fetch` avec `cache: 'no-store'`.

### B3 — Un `grep` qui ne trouve rien ne prouve rien

Les JSON de traduction ont des espaces de noms imbriqués. Un `grep` sur une clé
de premier niveau rate ses occurrences imbriquées.
**Incident (24/07/2026)** : un prix de 12 000-150 000 € HT affiché sur
`/fr/studios-photo-automatises` avait été manqué — il vivait dans
`studiosHardware.faqStudios.q1`, invisible à un grep sur `faqStudios`.
**Geste** : élargir systématiquement. Chercher la valeur, pas seulement la clé.
Croiser plusieurs formulations.

### B4 — Une donnée de crawl n'est pas la réalité

Un crawl Screaming Frog sous charge génère lui-même des erreurs.
**Incident (02/09/2026)** : le taux de 504 est monté à 24,7 % le jour du crawl
JS de 613 URL — le crawl fabriquait une partie des erreurs qu'il mesurait.
**Geste** : corréler avec `cf_traffic_daily` avant de conclure.

---

### B5 — Chrome traduit automatiquement les pages `de-ch` et fausse la lecture

Chrome propose, puis applique, une traduction automatique des pages allemandes
vers la langue du navigateur. La page est alors **réécrite dans le DOM** : le
texte, la navigation, et jusqu'au `<title>` de l'onglet.

**Incident (16/09/2026)** : contrôle visuel de `/de-ch/branchen/schmuck` après
déploiement. Le haut de la page en allemand, puis la FAQ, le formulaire et la
navigation en français, et le titre de l'onglet qui bascule en cours de
défilement. Diagnostic initial : une locale `de-ch` qui dégrade vers le français.

**C'était faux.** Le serveur renvoyait du 100 % allemand — `<title>` allemand,
« Häufige Fragen », « Vorname », « Demo anfragen », et **zéro** marqueur
français dans les 314 Ko de HTML.

**Ce qui aurait dû mettre la puce à l'oreille** : le vocabulaire. « Entraînement »
pour *Schulungen* là où le site dit « Formations », « Courriel professionnel » là
où le site dit « Email professionnel ». Une traduction automatique ne retrouve
pas la copie réelle du site.

**Geste** : avant de conclure sur la langue d'une page, comparer avec le HTML
**serveur** :

```bash
curl -s https://sysnext.vercel.app/de-ch/branchen/schmuck | grep -c "Häufige Fragen"
```

Et désactiver la traduction automatique de Chrome pour ce domaine avant toute
recette `de-ch`. Un `find` sur « translate bar » confirme sa présence.

---

## C. Routage et internationalisation

### C1 — `pathnames` dans `i18n/routing.ts` retype `Link` dans tout le projet

Dès qu'un chemin est déclaré dans `pathnames`, **tout `href` du projet** doit
être un chemin déclaré. Un href libre casse la compilation, pas seulement la
page concernée.
**Geste** : passer par `NavLink` et les helpers existants. Les href dynamiques
prennent la forme `{pathname, params}`.

### C2 — `localeCookie: false` et `alternateLinks: false` sont volontaires

Ce ne sont pas des oublis à « corriger ».

| Réglage | Raison |
|---|---|
| `localeCookie: false` | Le middleware posait un cookie sur chaque requête sans cookie — donc sur tous les bots Google et IA. La réponse passait en `private, no-store` : **toutes les pages prérendues étaient servies dynamiquement** au lieu d'être servies depuis l'edge |
| `alternateLinks: false` | L'en-tête `Link` hreflang émettait un `x-default` vers l'URL sans préfixe (307) et doublonnait, en divergeant, les alternates HTML |

**Geste** : ne pas les « corriger ». Si un chantier exige de toucher
`i18n/routing.ts`, c'est du rayon large : établir ce qui en dépend d'abord
(`01-RAYON-ACTION.md`).

### C3 — `de-ch` est à génération sélective, pas un fallback

Seules certaines pages sont prérendues en `de-ch` (`dynamicParams = false`).
Une URL `/de-ch/<non-traduit>` renvoie **404**, pas une version française.
**Geste** : avant de créer un lien `de-ch`, vérifier la couverture dans
`i18n/deChCoverage.ts`. Un lien vers une page non couverte est un 404.

### C4 — Ne jamais ajouter de `loading.tsx` au-dessus d'une route qui fait `notFound()`

Un `loading.tsx` parent transforme le 404 HTTP d'un `notFound()` enfant en 200.
Google indexe alors des pages vides. Sept routes de ce site utilisent
`notFound()`.
**Geste** : il n'existe aujourd'hui **aucun** `loading.tsx` dans `app/`. C'est
délibéré. Ne pas en introduire.

### C5 — Le sélecteur de langue est la surface la plus fragile du site

`i18n/deChCoverage.ts` → `localeSwitchHref`. C'est **la cause structurelle n°1**
identifiée par l'audit du 03/09/2026 : il déversait l'autorité sur des pages
`/en` en `noindex`.
**Geste** : tout changement ici se teste article par article contre
`content/blog/alternates.json` (61 entrées) et `content/guides/alternates.json`
(22 entrées). Jamais de règle globale.

---

## D. Indexation

### D1 — Les sets `NOINDEX_EN_*` pilotent trois choses à la fois

`lib/seo-config.ts` est importé par **sept fichiers** : `app/sitemap.ts`,
`lib/blog.ts`, `i18n/deChCoverage.ts`, et quatre gabarits de page
(`blog/[slug]`, `industrie/[slug]`, `academy/[slug]`, `solutions/[slug]`).

Retirer un slug d'un set **réactive la page partout à la fois** : balise robots,
sitemap et sélecteur de langue.
**Geste** : c'est puissant et voulu — mais ne retire jamais un slug « pour
essayer ». Une page `/en` qui sert du contenu français et redevient indexable
est un signal de qualité négatif.

### D2 — GSC ne valide pas un 410 comme correction d'un 404

Pour qu'une URL passe la validation dans le rapport « Pages > Introuvable »,
elle doit répondre **200** ou rediriger en **3xx vers une page 200**. Un 410
reste classé en erreur, indéfiniment.
De plus, GSC **arrête la validation à la première erreur trouvée** — un rapport
« 8 échecs sur 420 URL » ne décrit pas un échantillon.
**Incident (mai 2026)** : deux affirmations fausses successives avant
vérification de la documentation Google. Jours perdus.
**Geste** : 301 vers une cible pertinente pour les URL à valider. 410 reste
correct pour les suppressions réelles, mais ne pas les soumettre à validation.

### D3 — Le hub `/en/industrie` est indexable malgré un contenu français

Ce n'est pas une erreur de configuration : il n'est pas dans les sets `noindex`
et il est dans le sitemap. Il attend d'être traduit avec les 30 pages.
**Geste** : ne pas le basculer en `noindex` sans arbitrage — c'est de la zone
orange.

---

## E. Worker Cloudflare et infrastructure

### E1 — Le dépôt est la source, mais la production peut avoir divergé

Règle posée le 07/07/2026, **violée deux fois** avant d'être acceptée sans
réserve par Laurent le 24/07.
Au 04/09/2026, la production et le dépôt divergeaient encore (1 053 contre
1 143 mappings selon Laurent), et le fichier de production promis n'a jamais été
transmis.
**Geste** : **resynchroniser avant tout nouveau mapping.** Un déploiement depuis
le dépôt sans resync écrase des règles qui n'existent que côté production.

### E2 — Le WAF s'exécute AVANT les Workers

**Incident (23/07/2026)** : une règle WAF supprimée a fait rechallenger par
Super Bot Fight Mode les requêtes média vers `videos.packshot-creator.com`.
**Toutes les vidéos produit du site étaient cassées.** Symptôme trompeur : le
lecteur se fige à `ready=0` sans erreur visible.
**Geste** : aucune suppression de règle WAF sans vérifier ce qu'elle protège. Un
passthrough parfait dans le Worker ne sauve rien si le WAF a déjà bloqué.

### E3 — Le même jour, un passthrough vide a 301-é un sous-domaine actif

La route wildcard `*.packshot-creator.com/*` a capté `videos.` (proxifié, R2) et
l'a redirigé vers `www` → 404.
**Geste** : après tout changement de route Worker, tester **chaque sous-domaine
proxifié**, pas seulement `www`.

### E4 — Une clé dupliquée dans les tables du Worker gagne en silence

Deux entrées pour `/commun/packshot-pro-3d-hd.html` coexistaient : la seconde
l'emportait.
**Geste** : après édition des tables, contrôler l'unicité des clés avant
déploiement.

### E5 — Le Preview Vercel ne passe pas par le Worker

Un changement de redirection dans le Worker **n'est pas testable sur le
Preview**. Il ne se vérifie qu'après déploiement, en production.
**Geste** : les changements Worker méritent une fenêtre de contrôle
immédiatement après déploiement, et une liste d'URL témoins préparée à l'avance.

### E6 — Un `redirect` sans préfixe de langue dans `next.config.ts` ne sert à rien

Le Worker court-circuite tout ce qui n'a pas de préfixe `/fr/`, `/en/` ou
`/de-ch/`. Une redirection sans préfixe posée dans `next.config.ts` n'est jamais
atteinte.
**Geste** : préfixe de langue → `next.config.ts`. Sans préfixe → Worker.

---

## F. Contenu et données

### F1 — Le `+41 44 580 43 84` est un vrai numéro

Numéro suisse qui renvoie vers la ligne de Sébastien, testé par lui.
**Incident (22/08/2026)** : signalé à tort comme un reliquat à purger.
**Geste** : toute coordonnée fait l'objet d'un test factuel avant correction de
masse. Un numéro qui « a l'air faux » peut être opérationnel.

### F2 — Les textes légaux disent « propriété exclusive de SYSNEXT » — à ne pas toucher

La purge « exclusif » → « officiel » de 2026 porte sur les revendications
commerciales de distribution. Elle **ne concerne pas** les mentions légales.
**Incident (22/08/2026)** : un inventaire initial a compté cinq locales au lieu
de deux en incluant à tort ces textes légaux.
**Geste** : distinguer la revendication de distribution du texte juridique.

### F3 — Ne pas créer de nouveaux articles de blog

Arbitrage de Laurent du 03/09/2026 : 94 articles existent, dont **29 paires à
plus de 0,95 de similarité**. La cannibalisation est le problème, pas le volume.
**Geste** : optimiser, fusionner, désindexer. Ne pas ajouter.

### F4 — `messages/*.json` : jamais de reformatage global

Ces fichiers font environ 175 000 lignes et sont modifiés des deux côtés. Un
reformatage produit un diff intégral et rend le fichier immergeable.
**Geste** : modifications chirurgicales. Vérifier la validité JSON après
édition.

### F5 — Le `price` au niveau `Offer` est une mensualité de leasing

Décision de Sébastien du 04/09/2026 : prix comptant × 1,3 sur 60 mois. Google
lit `price` comme le prix du produit.
**Geste** : c'est assumé et documenté. Ne pas « corriger » en y mettant le prix
comptant sans arbitrage : les prix engagent la conformité distributeur Orbitvu.

---

## G. Collaboration

### G1 — Une instruction humaine peut être écrite en aveugle

Laurent et Sébastien n'ont pas toujours le fichier sous les yeux.
**Incidents** : « le dépôt contient une table à 71 entrées » — il en contenait
33 ; une liste « à ta charge » du 04/09 dont la moitié était déjà livrée en
branche la veille.
**Geste** : vérifier toute affirmation factuelle contre le code réel. Si elle
est contredite : le dire, ne pas appliquer, ne pas corriger en silence.

### G2 — Un fil de mails sur plusieurs jours : seul le dernier message compte

Les positions évoluent. Laurent a lui-même requalifié les 504 d'« exogène » à
« cause interne P0 » en une journée, et déclaré « caduque » sa propre règle sur
les prix le lendemain de l'avoir posée.
**Geste** : dans un fil long, ne traiter que le message le plus récent.

### G3 — Ne jamais nettoyer le working tree

Plusieurs sessions travaillent en parallèle. Un `git restore` ou `git clean`
détruit le travail en cours d'une autre session.
**Geste** : un working tree sale est normal. On n'y touche pas.

---

## Comment ajouter un piège

Tu viens d'en découvrir un ? Ajoute-le ici, dans la section qui convient, avec :
le symptôme, la date de l'incident, et le geste qui l'évite. Un piège non écrit
sera repayé.
