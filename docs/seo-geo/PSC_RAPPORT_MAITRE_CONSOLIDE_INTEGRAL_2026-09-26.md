# PackshotCreator — Rapport maître consolidé INTÉGRAL SEO/GEO

**Date de consolidation : 26/09/2026**  
**Freeze GitHub vérifié : `main = 1a8c3dee125505256b93415457eba9e9bcddec31`**  
**Objet : document unique de référence regroupant la synthèse arbitrée + les quatre livrables sources complets.**

> Ce fichier est volontairement plus long que la synthèse courte. Sa première partie est la synthèse arbitrée. Les annexes conservent ensuite l'intégralité des quatre rapports sources afin qu'aucune information, nuance, contradiction, liste exhaustive, point non prouvé ou détail de redirection ne soit perdu. En cas de divergence, la synthèse arbitrée en tête prévaut ; les annexes conservent l'historique de l'analyse.

## Vérification GitHub au 26/09/2026

- `main` est toujours `1a8c3de` ; aucun commit postérieur à la PR #37.
- Aucun fichier `PSC_RAPPORT_MAITRE*`, `PSC_POSTMORTEM*`, `PSC_INVENTAIRE_REDIRECTIONS*` ou `audit-maitre-consolide` n'est présent sur `main`.
- Les branches Claude encore présentes sont anciennes (`claude/lucid-mayer-tz2mk8`, `claude/claude-mastery-skills-gqkl1j`) et ne contiennent pas un nouveau rapport maître postérieur au freeze.
- PR #24 et #27 restent ouvertes ; #31 reste fermée sans fusion.
- Le ruleset `protect-main` est actif mais ne requiert pas de PR/review/status checks ; des pushs directs ont été possibles.
- Ce rapport n'a pas été écrit sur GitHub par cette session : la création d'une branche dédiée a été refusée par l'intégration GitHub (`403 Resource not accessible by integration`).

---

# PARTIE I — SYNTHÈSE ARBITRÉE

**Date de consolidation : 26 septembre 2026**  
**Dépôt audité : `Sebeth7/packshot-creator`**  
**Freeze de référence : `main = 1a8c3dee125505256b93415457eba9e9bcddec31` (fusion de la PR #37)**  
**Statut : document de référence transversal — audit, pas décision d'exécution**

> Ce rapport consolide et arbitre les audits ChatGPT, Claude Projet et Claude Code. Il remplace les post-mortems précédents comme document de synthèse, mais **ne remplace pas `DECISIONS.md`**, n'autorise aucune modification technique et ne vaut pas GO. Lorsqu'un fait métier manque, le rapport le laisse ouvert au lieu de l'inférer.

---

## 0. Pourquoi ce document existe

Entre juin et septembre 2026, le chantier SEO/GEO PackshotCreator a produit beaucoup de corrections utiles, mais aussi plusieurs erreurs, quasi-incidents et contradictions documentaires. Le problème n'était pas seulement « un bug de code » : les audits montrent des défaillances de méthode, de circulation d'information et de contrôle des interactions entre systèmes.

Ce document poursuit quatre objectifs :

1. établir l'état réellement prouvé au 26/09/2026 ;
2. conserver l'historique des erreurs et quasi-incidents sans réécrire le passé ;
3. distinguer fait technique, fait métier, décision, hypothèse et mesure ;
4. imposer une méthode qui rende les mêmes erreurs beaucoup plus difficiles à reproduire.

---

# 1. Sources et règle d'arbitrage

## 1.1 Sources consolidées

### Audits internes

- `PSC_RAPPORT_MAITRE_POSTMORTEM_2026-09-25.md` — Claude Projet, deuxième passe, 38 erreurs, 20 quasi-incidents, 18 points non prouvés, recherche dans 26 fils du projet.
- `PSC_INVENTAIRE_REDIRECTIONS_DEPOT_2026-09-25.md` — Claude Projet, extraction commit par commit du Worker et de `next.config.ts`.
- audit technique Claude Code du 25/09 — dépôt, GitHub, Worker, Supabase, n8n, CI, routes, locales, schema, article #36.
- `PSC_GAP_CLOSING_2026-09-26.md` — passe de fermeture des trous.
- `PSC_GAP_CLOSING_ANNEXE_DECH_SCHEMA_36_2026-09-26.md` — build local, DE-CH, schema, article #36, 223 tests.
- vérifications indépendantes ChatGPT : GitHub, historique, PR, ruleset, code, sources externes officielles.

### Sources techniques primaires

- Git et historique du dépôt ;
- `cloudflare-worker/src/index.js` ;
- `next.config.ts` ;
- tests Worker / Vitest / Playwright ;
- `.github/workflows/*` ;
- `docs/seo-geo/*` ;
- code applicatif et HTML rendu localement à `main = 1a8c3de` ;
- Worker Cloudflare déployé lu par API dans les sessions Claude Code / Claude Projet ;
- Supabase et n8n en lecture seule dans les sessions disposant des accès.

### Sources externes vérifiées

- Orbitvu officiel : usine en Silésie, équipe R&D de plus de 30 personnes ; Alphashot Pro G2 avec 74 sources/panneaux LED contrôlés ; Alphashot XL G2 avec 170 panneaux LED contrôlés.
- Microsoft officiel : fin du support Windows 10 le 14/10/2025.
- EUR-Lex : règlement UE 2024/1689, article 50 sur les obligations de transparence IA.
- Pappers : création juridique de SYSNEXT le 16/11/2001.

## 1.2 Hiérarchie de preuve — ne plus utiliser une hiérarchie unique

L'une des erreurs du Master V3 était d'utiliser une règle simple « code > Git > décisions ». Elle n'est pas valable pour les faits métier.

### Pour un état technique

`production visitée / API active > code déployé > main/git > build local > JOURNAL > mémoire`

### Pour un fait métier

`fait humain écrit et signé > source officielle externe compétente > DECISIONS/FAITS > contenu du site > code > inférence`

Le code peut prouver qu'un produit est `delisted`. Il **ne peut pas prouver** quel produit lui succède commercialement.

### Pour une intention historique

`décision humaine écrite / message de commit explicite > diff cohérent > JOURNAL > chat verbatim > résumé > inférence`

## 1.3 Niveaux de preuve à utiliser désormais

- **L0** — hypothèse.
- **L1** — dépôt / configuration observés.
- **L2** — test local.
- **L2b** — test croisé entre systèmes (ex. Next × Worker × cache × hreflang).
- **L3** — Preview contrôlée.
- **Lm** — fait métier confirmé par écrit par l'humain compétent.
- **L4** — production côté visiteur (`www`) contrôlée avec preuve brute.
- **L5** — effet mesuré après délai, avec baseline / témoin et gel du périmètre.

Aucun statut « DONE » ne doit être utilisé sans niveau de preuve explicite.

---

# 2. Résumé exécutif consolidé

1. **Le dépôt est gelé à `1a8c3de`** : aucune PR ni commit ultérieur détecté lors des passes de fermeture ; le Worker lu par API a été trouvé équivalent au code de `main`.
2. **L'incident #36/#37 est corrigé mais sa cause racine ne l'est pas** : le slug EN `migrate-old-packshotcreator-studio` a matché la règle générale Worker `-old-` → 410 ; #37 l'a renommé en `migrate-legacy-packshotcreator-studio`.
3. **La règle `-old-` n'a pas été créée par le chantier P0** : elle existe depuis avril 2026. L'erreur collective est de ne jamais avoir testé toutes les routes Next légitimes contre la logique Worker.
4. **Les 8 articles EN en 410 ne sont pas 8 bugs** : leur 410 est un arbitrage du 07/07, exécuté par `d3620bd`. Le problème actuel est principalement documentaire et de cohérence avec la réactivation / le noindex.
5. **Les 3 routes `alphashot-g2 → alphashot-xl-g2` ne sont pas prouvées fausses ni prouvées correctes** depuis la réintroduction du G2 le 07/08. Elles nécessitent un fait produit écrit.
6. **L'erreur la plus structurante est la confusion entre fait technique et fait métier** : `delisted` a été lu deux fois comme « remplacé par » (G2 puis XL v2), provoquant des redirections produit fragiles.
7. **Le CHF est désormais validé par Laurent pour la Suisse**. Le CHF n'est plus une anomalie. La dette restante est la cohérence entre fiches, pages de gamme, ROI, FAQ et structured data, plus la consignation formelle de la nouvelle décision.
8. **Le chantier DE-CH est loin d'être clos** : le gap closing trouve 284 chaînes non allemandes dans le HTML serveur des 45 pages de-ch du sitemap, plus 88 URL JSON-LD non canoniques selon sa méthode. P0-A a corrigé `WebSite.inLanguage`, pas l'ensemble de la locale.
9. **D31 est respectée au niveau application pour les Review/aggregateRating/témoignages de-ch**, mais les claims « Kundenstudie 2025 » restent rendus et doivent être qualifiés humainement ; `www` reste non contrôlé depuis les environnements Claude.
10. **Les tests existent mais ne protègent pas le merge** : 223 tests Vitest passent localement ; aucun Vitest ni Playwright n'est exécuté dans la CI ; ESLint est non bloquant ; aucun smoke post-merge sur `main`.
11. **Le ruleset GitHub actuel est insuffisant** : la lecture indépendante ChatGPT a établi que `protect-main` est actif mais n'impose ni PR, ni review, ni status checks ; deux pushs directs documentaires sur `main` ont effectivement eu lieu.
12. **La documentation est devenue une source de risque** : ETAT, JOURNAL, DECISIONS, 05-INFRA, 06-CHANTIERS, README, commentaires code, Master et mémoires peuvent porter des versions différentes d'un même fait.
13. **P0-H est sain mais encore en mesure**, P0-I est appliqué mais ses consommateurs réels ne sont pas encore tous observés, P0-J doit rester gelé jusqu'après le 08/10.
14. **#24 et #27 sont `REQUIRES_REAUDIT`**, pas « à fusionner » : bases anciennes, conflits documentaires et hypothèses devenues obsolètes.
15. **Le problème racine n'est pas un manque de contrôles, mais des contrôles parfois centrés sur la mauvaise propriété** : 200 à l'origine ≠ 200 sur `www`; `delisted` ≠ successeur ; tests verts locaux ≠ garde-fou de merge ; répétition documentaire ≠ preuve.

---

# 3. Freeze technique au 26/09/2026

| Élément | État consolidé | Preuve / réserve |
|---|---|---|
| `main` | `1a8c3de` | GitHub / git ; aucune PR après #37 dans les audits |
| PR #36 | fusionnée | article migration FR/EN/DE-CH |
| PR #37 | fusionnée | correctif slug EN `-old-` → `-legacy-` |
| PR #24 | ouverte, `REQUIRES_REAUDIT` | 40 commits de retard au moment du gap closing, conflit ETAT |
| PR #27 | ouverte, `REQUIRES_REAUDIT` | 36 commits de retard, conflits ETAT/JOURNAL |
| PR #31 | fermée, non fusionnée | D29 suspendue |
| Worker | code déployé ≈ `main` | équivalence vérifiée par les passes techniques ; `www` non visitable depuis les conteneurs Claude |
| CI | incomplète | build/type/JSON ; lint non bloquant ; pas Vitest/Playwright |
| GitHub main protection | insuffisante | PR/review/checks non requis dans le ruleset lu par ChatGPT |
| P0-H | APPLIED, mesure jusqu'au 08/10 | M5 en succès, définition inchangée |
| P0-I | APPLIED | 8 fonctions conformes ; consommateurs à observer |
| P0-J | OPEN / DEFERRED | device figé au 20/06, hors watchdog |
| P0-F | BLOCKED par l'accès de session | WAF/SBFM/rulesets non lisibles dans les connecteurs actuels |

**Conclusion de freeze : `SAFE_WITH_RESERVATIONS`**, pas « P0 clos ».

---

# 4. Chronologie causale condensée

## Juin-juillet : naissance des premières dettes

- 29/06 : séquencement prudent de la locale de-ch ; plusieurs erreurs potentielles sont arrêtées par `curl.exe` et par le refus de toucher le Worker avant disponibilité de la locale.
- 30/06-01/07 : premier précédent produit — G2 traité comme remplacé par XL G2 ; Laurent objecte que le G2 reste vendu. La leçon n'est pas transformée en règle durable.
- 07/07 : grand resync Worker ; arbitrage explicite sur les anciennes URL EN : traductions existantes préservées, 14 sans équivalent → 410, dont 8 TSX statiques. La décision n'est pas propagée proprement dans toute la documentation.
- 23-24/07 : contrôles Cloudflare/Worker ; cache et règles de sécurité montrent déjà qu'une lecture du seul dépôt n'est pas suffisante.

## 16-19 septembre : gouvernance et accélération

- Mise en place de CLAUDE.md, docs SEO/GEO, workflows CI, garde-journal et garde-conséquences.
- Diagnostic bots IA modifié plusieurs fois en 48 h : SBFM → règle managée → SBFM rétabli.
- Prompt de nuit : plusieurs hypothèses transformées en instructions, dont XL v2 → XL G2 ; la règle R7 signale la contradiction mais n'arrête pas l'application.
- Plusieurs PR fusionnées en lot.

## 20-23 septembre : déploiements et verrouillage d'hypothèses

- Tests Worker créés et exécutés localement, mais jamais branchés dans la CI.
- Worker #16 et lot F déployés.
- Deux commits JOURNAL poussés directement sur `main` (`bc81d9a`, `da2796f`) malgré D12.
- Le lot F renforce le mapping XL v2 → XL G2 et un test vient figer cette hypothèse.

## 24 septembre : correction des hypothèses

- Contrôle R7 relève plusieurs contradictions.
- D29/D30/D31 sont préparées ; un patch CHF → EUR est même préparé.
- Laurent rappelle que XL ancienne génération et XL G2 coexistent : D29 suspendue, PR #31 fermée, changement XL retiré de #30.
- D30 repasse en hors périmètre ; le patch CHF → EUR est abandonné.

## 25 septembre : P0-H/I, documentation, puis incident #36/#37

- Worker P0-D/E déployé ; P0-I appliqué.
- P0-K fusionné mais la documentation reste imparfaitement resynchronisée.
- #36 ajoute un article avec slug EN contenant `-old-`; l'origine Vercel est verte mais le Worker répond 410 sur `www`.
- Sébastien détecte l'incident dans Chrome ; #37 corrige le slug.
- La leçon n'est pas encore devenue un test transversal automatique.

## 26 septembre : audit contradictoire

- Trois circuits d'audit indépendants sont confrontés.
- Plusieurs accusations initiales sont requalifiées : 8 EN en 410 intentionnels ; 3 G2 ouverts ; claims #36 à distinguer entre faux, contradiction interne et fait métier.
- Le gap closing établit la taille réelle de la dette DE-CH et confirme 223 tests verts localement mais absents de la CI.

---

# 5. Causes racines consolidées

## RC1 — Frontière insuffisante entre fait métier et fait technique

Exemples :

- `delisted` → interprété comme « successeur » ;
- prix/devise dérivés du code alors que la décision est commerciale ;
- `foundingDate` traité comme une simple constante alors que l'entité représentée n'est pas définie ;
- wording de reprise lu comme engagement ou simple possibilité sans validation commerciale.

**Règle future :** un produit, prix, devise, date d'entreprise, claim commercial, équivalence ou intention historique ne peut pas être « prouvé » uniquement par le code.

## RC2 — Contrôle des composants au lieu du chemin utilisateur

`Next build = PASS` + `Vercel = 200` n'empêche pas `Worker = 410`.

Le test manquant est transversal : **route valide Next → Worker → cache → canonical/hreflang → `www`**.

## RC3 — Garde-fous non bloquants

- 223 tests verts localement, 0 dans la CI ;
- Playwright hors CI ;
- ESLint non bloquant ;
- ruleset ne requiert ni PR, ni review, ni checks ;
- aucune recette post-merge automatique.

## RC4 — Multiplication des sources de vérité

Code, commits, ETAT, JOURNAL, DECISIONS, Master, fichiers projet, mémoire Claude, chats et commentaires peuvent se contredire. P0-K a essayé de resynchroniser des copies manuelles au lieu de réduire le nombre de copies.

## RC5 — Prompts inducteurs

Formulations observées : « successeur de… », « classer comme incohérence à corriger », « tu ouvres quand même la PR », « résiduel confirmé ». Elles embarquent une conclusion au lieu de demander une preuve.

## RC6 — Preuve de production non persistée

Plusieurs contrôles `curl.exe` ou Chrome ont été déclarés mais pas conservés avec sortie brute sur `main`. La branche #27 contient une partie de la preuve lot F, mais pas `main`.

## RC7 — Mesures confondues

Beaucoup de changements techniques et éditoriaux se superposent aux fenêtres de mesure. Une amélioration ou une baisse future peut devenir non attribuable.

---

# 6. Registre consolidé des 38 erreurs — état après arbitrage

Le tableau ci-dessous conserve les identifiants du rapport maître afin de ne pas perdre l'historique. « Requalifié » signifie que l'audit final modifie l'interprétation sans supprimer le fait historique.

| ID | Sujet | État final / arbitrage |
|---|---|---|
| E1 | G2 traité comme remplacé par XL G2 | **OUVERT MÉTIER** — précédent de la même erreur ; 3 redirects subsistent, intention actuelle UNKNOWN |
| E2 | XL v2 → XL G2 posé comme successeur | **ERREUR DE MÉTHODE CONFIRMÉE** ; 13 redirections subsistent ; D29 suspendue |
| E3 | « xl-v2 absent de MACHINES » | **FAUX CONFIRMÉ** ; fiche `delisted`, servie en 200 |
| E4 | `delisted ⇒ successeur` | **ERREUR DE RAISONNEMENT CONFIRMÉE** |
| E5 | contre-audit « garanti par tests » | **INSUFFISANT** : les tests validaient la consigne, pas le fait produit |
| E6 | question Q16 fermée sur « le successeur » | **PROMPT INDUCTEUR CONFIRMÉ** |
| E7 | cadre EUR vs code CHF | **HISTORIQUEMENT VRAI ; MAINTENANT DÉPASSÉ** : Laurent valide le CHF pour la Suisse ; formalisation D37 à faire |
| E8 | patch CHF → EUR | **QUASI-INCIDENT** ; abandonné avant production |
| E9 | « 23 équivalents exacts » DE→DE-CH | **SURQUALIFICATION** ; HTTP 200 ne prouve pas l'équivalence sémantique |
| E10 | 8 EN en 410 présentés comme angle mort | **REQUALIFIÉ** : 410 intentionnels du 07/07 ; dette documentaire / réactivation |
| E11 | 7 règles Next mortes derrière Worker | **DETTE CONFIRMÉE** |
| E12 | #36 `-old-` → 410 | **INCIDENT CONFIRMÉ ET CORRIGÉ** ; garde-fou transversal toujours absent |
| E13 | prix dans #36 | **REQUALIFIÉ** : montants cohérents au calcul ; CHF accepté ; règle éditoriale/validation de placement à clarifier |
| E14 | R4 « production non testable par script » | **GÉNÉRALISATION FAUSSE / PÉRIMÉE** ; production inaccessible à certains environnements, pas par principe |
| E15 | diagnostic bots IA instable | **CONFIRMÉ** ; D22/P0-F à reposer sur une mesure actuelle |
| E16 | jeton Preview | **USAGE NON PROUVÉ / NON CONFIGURÉ** ; transmission hors dépôt probable mais pas suffisamment tracée |
| E17 | tests hors CI | **CONFIRMÉ — PRIORITÉ GOUVERNANCE** |
| E18 | deux pushs directs sur main | **CONFIRMÉ** (`bc81d9a`, `da2796f`) |
| E19 | e2e redirections périmé | **CONFIRMÉ** ; suite hors CI et contradictoire avec le Worker |
| E20 | commentaires code faux/périmés | **CONFIRMÉ** |
| E21 | clés GONE inertes / doublons | **DETTE CONFIRMÉE**, ne pas nettoyer pendant les fenêtres de mesure |
| E22 | contrôles prod non persistés | **CONFIRMÉ MAIS PARTIELLEMENT CORRIGÉ** : lot F tracé dans branche #27 ; autres sorties manquantes |
| E23 | clôtures par silence | **CONFIRMÉ** ; silence ≠ accord |
| E24 | décisions/questions hors dépôt | **CONFIRMÉ** |
| E25 | P0-K / docs périmées | **CONFIRMÉ** ; la solution doit réduire la documentation dérivée manuelle |
| E26 | Master V3 sans case fait métier | **CONFIRMÉ** ; nouvelle hiérarchie de preuve nécessaire |
| E27 | mémoire persistante fausse | **CONFIRMÉ** ; mémoire jamais source primaire |
| E28 | prompts inducteurs | **CONFIRMÉ** |
| E29 | mesures confondues | **CONFIRMÉ** ; gel de périmètre obligatoire |
| E30 | secrets exposés | **À REQUALIFIER** : gap closing recense 5 épisodes documentés, 2 révocations certaines, 3 statuts à confirmer ; aucun secret ne doit figurer dans ce rapport |
| E31 | copies projet prises pour dépôt | **CONFIRMÉ** ; R5/resync à conserver |
| E32 | faux bug « 30 DE → EN » | **CONFIRMÉ** ; simulation l'a arrêté |
| E33 | cache 86 400 s non intégré aux recettes | **CONFIRMÉ** ; purge ciblée + query neuve obligatoires |
| E34 | dette locale de-ch | **CONFIRMÉ ET PLUS LARGE** : 284 chaînes non DE, 88 URL JSON-LD non canoniques selon gap closing |
| E35 | faits d'entité divergents | **CONFIRMÉ MAIS À SÉPARER PAR ENTITÉ** ; 2001 = création juridique SYSNEXT, 2004 peut représenter un jalon de marque/activité |
| E36 | dettes anciennes récurrentes | **PARTIELLEMENT RÉSOLU** : `[object Object]` absent ; noindex calculateur absent ; dateRelative/datePublished restent à traiter |
| E37 | décisions fantômes D18-D20 | **CONFIRMÉ** ; une décision sans auteur/GO ne doit pas être exécutoire |
| E38 | décompte de PR imprécis | **CORRIGÉ** ; le problème de fond est la définition du périmètre, pas le chiffre |

---

# 7. Les 20 quasi-incidents — ce qu'ils enseignent

Le rapport maître recense 20 quasi-incidents, notamment :

- destruction potentielle de trafic de marque évitée par relecture humaine ;
- faux bug `/X` vs `/fr/X` infirmé par 17 `curl.exe` ;
- activation `/de → /de-ch` différée jusqu'à disponibilité réelle de la locale ;
- variante de routing corrigée après contrôle réel ;
- faux correctif de 30 chemins `/de → /en` arrêté par simulation ;
- premier cas G2→XL G2 arrêté partiellement par Laurent ;
- conservation de 45 traductions EN grâce au raffinement de Sébastien le 07/07 ;
- resync Worker évitant de déployer une copie périmée ;
- corrections des sous-domaines après tests `curl.exe` ;
- patch contenant `node_modules` retiré ;
- écart réel P0-E 23 annoncés / 30 modifiés identifié par simulation différentielle ;
- variante `/amp` du `-22` rattrapée avant déploiement ;
- D29 / #31 arrêtées quand Laurent rappelle la coexistence XL v2 / XL G2 ;
- patch CHF→EUR abandonné ;
- D32 obtenu à partir de faits commerciaux avant code ;
- #37 testé explicitement contre `shouldReturn410` avant fusion.

**Leçon transversale :** les quasi-incidents ont surtout été arrêtés par deux mécanismes :

1. une vérification mécanique exhaustive ;
2. un humain qui connaissait un fait métier que l'IA ne pouvait pas déduire.

Les leçons non mécanisées ont tendance à revenir.

---

# 8. Worker, redirections et interactions de routing

## 8.1 Architecture actuelle

Le Worker contient 11 tables principales :

- `BLOG_EN_REDIRECTS` ;
- `GUIDE_EN_REDIRECTS` ;
- `GONE_PATHS` ;
- `PASSTHROUGH_HOSTS` ;
- `HOST_HOME_MAP` ;
- `DE_CH_MAP` ;
- `LEGACY_REDIRECTS` ;
- `PRODUIT_REDIRECTS` ;
- `PRODUCT_REDIRECTS` ;
- `HOWTO_REDIRECTS` ;
- `LANG_SPECIFIC_REDIRECTS`.

`next.config.ts` intervient seulement après le Worker, à l'origine.

`shouldReturn410()` couvre notamment :

- `GONE_PATHS` ;
- suffixe `-mod` ;
- motif `-old-` ;
- `/ftp/`, `/resources/`, `/pages/`, `/commun/` ;
- `/en/en/` ;
- certaines variantes `/amp` ;
- motifs legacy `/industry/...examples|ejemplos|beispiele-`.

## 8.2 Incident #36/#37

**Cause immédiate** : slug EN contenant `-old-`.  
**Cause contributive** : règle legacy globale non documentée comme contrainte éditoriale.  
**Cause de process** : tests Next et Worker séparés.  
**Correction appliquée** : slug renommé en `-legacy-`.  
**Correction manquante** : test transversal automatisé.

Le test cible doit être :

`VALID_NEXT_ROUTE_MUST_NOT_MATCH_WORKER_GONE_RULE`

Il doit énumérer toutes les routes valides, les exécuter dans la logique Worker et échouer sur tout 301/410 inattendu.

## 8.3 Huit `/en/blog` en 410

Arbitrage du 07/07 **intentionnel**, commit `d3620bd`.

Leur problème actuel n'est pas « mauvais statut » mais :

- commentaires code et docs disant encore « 301 vers /fr » ;
- logique « noindex réversible » incompatible avec le 410 tant que le Worker n'est pas modifié ;
- pages statiques d'origine sans balise robots, donc indexables sur l'origine tant que D36 n'est pas exécutée.

## 8.4 G2 / XL / XL G2

État observé :

- `/fr/studio-photo/alphashot-xl` → XL G2 au Worker ;
- `/en/studio-photo/alphashot-xl` → passe Worker puis Next → XL v2 ;
- `/de/studio-photo/alphashot-xl` → de-ch XL G2 ;
- `/de/fotostudio/alphashot-xl` → machine finder ;
- `/de-ch/fotostudio/alphashot-xl` → 404 applicatif ;
- plusieurs routes `alphashot-g2` → XL G2 ;
- fiche G2 réintroduite `delisted` comme fallback conversationnel.

**Conclusion : D29 reste suspendue.** Ne pas « nettoyer » avant confirmation produit écrite.

## 8.5 Dettes connues

- règles `next.config.ts` inopérantes derrière des 410 Worker ;
- entrées `GONE_PATHS` absolues/query inatteignables ;
- doublons GONE × redirect ;
- chaînes de deux redirects, notamment certains chemins G2 ;
- mappings vers hubs noindex ;
- commentaires code périmés ;
- anciennes images/backlinks en 410 à arbitrer sur des critères SEO réels.

Aucun nettoyage massif pendant les fenêtres de mesure en cours.

---

# 9. DE-CH — état consolidé

## 9.1 Ce qui est réellement corrigé

- `WebSite.inLanguage` de-ch corrigé par P0-A ;
- D31 : `Review`, `aggregateRating` et blocs de témoignages supprimés de de-ch au niveau application ;
- plusieurs routes /de ont été remappées vers /de-ch ;
- héritage de-ch P0-D/E couvert par des tests spécifiques.

## 9.2 Ce qui reste ouvert

Le gap closing sur 45 pages de-ch du sitemap trouve, selon sa méthode :

- **284 chaînes distinctes FR/EN** au lieu de l'allemand ;
- **565 occurrences** page × chaîne ;
- **102 `alt`** concernés ;
- **16 `aria-label`** ;
- **5 dates** au format EN ;
- fallbacks `pickL()` vers EN lorsque de-ch manque ;
- `useCases` machines en français ;
- `SectorGrid` français ;
- `FloatingDashboard` français en dur ;
- ternaires `isFr ? fr : en` qui oublient de-ch ;
- 11 fiches machines avec meta descriptions DE+FR mixtes ;
- `og:locale` absent sur de nombreuses pages ;
- Twitter/OG hérités d'EN sur certains gabarits ;
- `/de-ch/academy` = 404 applicatif avec 404 racine en français ;
- 88 URL JSON-LD non canoniques selon l'annexe exhaustive.

**Formulation correcte :** `P0-A CLOSED` mais **locale DE-CH globale OPEN**.

## 9.3 D31 et « Kundenstudie »

Le claim « 60+ % Kostensenkung — Kundenstudie PackshotCreator 2025 » reste rendu sur de-ch. Ce n'est ni un `Review` ni un témoignage au sens littéral de D31. Son étude source n'est pas prouvée dans le dépôt.

Décision humaine nécessaire : conserver comme claim statistique sourcé, sourcer réellement l'étude, ou retirer.

---

# 10. Schema.org et données structurées

## 10.1 `foundingDate`

Le code et les pages affichent 2004 ; D33 voulait 2001.

Source externe : SYSNEXT a une date de création juridique au 16/11/2001. Cela ne prouve pas que la marque PackshotCreator « existe depuis 2001 ». Le site actuel revendique aussi un jalon 2004.

**Action correcte :** définir l'entité représentée par `Organization` et son jalon de fondation avant de modifier la valeur.

## 10.2 `courseSchema`

- `hasCourseInstance.inLanguage = 'fr'` en dur, y compris sur des pages EN ;
- `sameAs` / academy FR dans certains cas ;
- `courseMode: 'Blended'` en dur, même pour des formations pouvant être présentielles.

## 10.3 AggregateOffer

- 12 000–150 000 € ; 16 offres ;
- divergence avec la grille catalogue et avec les `Offer` CHF des fiches de-ch ;
- fourchette visible aussi dans la FAQ.

Ce n'est pas un bug de devise à corriger sans décision : CHF est désormais accepté. Il faut une règle de cohérence commerciale.

## 10.4 Ratings / testimonials

- `aggregateRating 4.9/100` sur BlendAI : JSON-LD FR/EN, non visible, absent de de-ch ;
- `GMB_AGGREGATE 4.7/83` : visible sur certaines pages FR/EN, jamais émis en JSON-LD ;
- `dateRelative` : valeurs françaises figées affichées aussi sur des pages EN ;
- helpers `aggregateRatingSchema` / `productWithRatingSchema` : code mort.

## 10.5 URL JSON-LD

La nouvelle annexe trouve **88 URL non canoniques dans le JSON-LD** sur les pages de-ch analysées. Ce chiffre remplace les inventaires partiels précédents (26 puis 33), car la méthode finale est plus large et déclarée.

---

# 11. Article #36 — fact-check consolidé

## 11.1 Ce qui est confirmé

- montants de mensualités cohérents avec `lib/leasing.ts` ;
- Windows 10 : fin du support Microsoft le 14/10/2025 ;
- Orbitvu Pro G2 : 74 sources/panneaux LED contrôlés ;
- Orbitvu XL G2 : 170 panneaux LED contrôlés ;
- Orbitvu : usine en Silésie et équipe R&D >30 confirmées par Orbitvu officiel ;
- règlement IA : article 50 existe et impose des obligations de transparence à certaines catégories de systèmes/outputs ; la formulation marketing doit rester prudente et ne pas sur-généraliser les obligations.

## 11.2 Ce qui était mal qualifié par les premiers audits

- « Silésie / R&D >30 » n'est pas une erreur : Orbitvu officiel le confirme.
- « 74 sources » est vrai pour le Pro G2 ; ce qui est incorrect est l'expression générique « jusqu'à 74 » si elle prétend couvrir toute la gamme, puisque XL G2 en annonce 170.
- `2003–2020` vs `2003–2024` est une contradiction éditoriale à clarifier, pas une preuve automatique de fausseté.

## 11.3 Erreur prouvée par le code

L'article promet « six étapes » pour le calculateur dans les versions EN/DE-CH, alors que les pages liées utilisent un wizard en trois étapes. C'est la contradiction applicative la plus nette.

## 11.4 Faits métier à confirmer

- date et périmètre exacts des anciens logiciels/support Ortery ;
- wording de reprise ;
- support « en français » vs en allemand/français ;
- installation/formation 1–3 jours ;
- arrêt ou non de production pendant migration ;
- compatibilités spécifiques non sourcées.

## 11.5 « Reprise comprise »

Formulation trop engageante au regard des autres contenus (« reprise étudiée », « évaluation de reprise »). Recommandation éditoriale : remplacer par une formulation explicitement conditionnelle après validation métier.

---

# 12. Prix / CHF — décision consolidée

**Fait humain nouveau : Laurent valide le CHF pour la Suisse.**

Conséquences :

- ne plus classer CHF comme anomalie de principe ;
- ne pas rejouer le patch CHF→EUR ;
- créer une décision append-only qui complète/remplace D30 sur ce point ;
- définir la règle de conversion / arrondi et sa date de révision ;
- harmoniser fiches, pages de gamme, ROI, FAQ, article #36, `AggregateOffer`, structured data ;
- conserver l'historique de D30 au lieu de le réécrire.

---

# 13. CI, GitHub et gouvernance technique

## 13.1 CI actuelle

Exécuté sur PR :

- `npm ci` ;
- `tsc --noEmit` ;
- vérification JSON ;
- ESLint **non bloquant** ;
- `next build` ;
- garde-journal ;
- garde-conséquences.

Absent de la CI :

- 223 tests Vitest ;
- 129 tests Worker ;
- 15 specs Playwright ;
- smoke post-merge ;
- test route Next × Worker ;
- test canonical/hreflang après Worker ;
- test documentaire d'ETAT ;
- validation automatique de décisions mécanisables.

## 13.2 Ruleset `main`

Lecture indépendante ChatGPT du ruleset `protect-main` : actif mais ne requiert actuellement ni PR, ni review, ni status checks. Il protège surtout contre suppression et non-fast-forward.

Deux pushs directs documentaires ont effectivement été acceptés :

- `bc81d9a` — 20/09 ;
- `da2796f` — 23/09.

## 13.3 Garde-fous ayant réellement fonctionné

- `garde-journal` a bloqué le premier push de #36 ;
- `garde-conséquences` a bloqué le premier push de #37 ;
- D29 a permis de fermer #31 sans fusion ;
- md5 + rollback P0-I ;
- gel P0-J pendant P0-H ;
- resync Worker + comparaison API ;
- simulations différentielles exhaustives ;
- séparation fusion / déploiement sur plusieurs opérations ;
- refus de toucher WAF/SBFM sans preuve suffisante.

Ils doivent être conservés, mais renforcés.

---

# 14. État consolidé P0 / décisions

| Sujet | État final |
|---|---|
| P0-A | correction `inLanguage` faite ; dette de-ch globale ouverte |
| P0-B | diagnostic MIXED ; pas de causalité unique démontrée ; pas de P1-Q massif |
| P0-C | analyse hors dépôt ; mesure marque à poursuivre ; historique Ads manquant |
| P0-D | tranche de corrections Worker déployée/contrôlée techniquement ; effet GSC non prouvé |
| P0-E | tranche de 17 mappings + héritage ; tout `/de` n'est pas « traité » ; REVIEW subsiste |
| P0-F | différé / blocage d'accès rulesets dans les sessions actuelles ; ne pas toucher sans mesure |
| P0-G / F5 | non lancé ; PR #24 requiert réaudit |
| P0-H | appliqué, mesure jusqu'au 08/10 |
| P0-I | appliqué ; fonctions conformes ; consommateurs à observer |
| P0-J | ouvert, différé jusqu'après P0-H |
| P0-K | fusionné mais docs encore divergentes ; ne plus présenter comme resync absolu |
| D29 | suspendue ; mappings produit à confirmer |
| D30 | historique « no change » ; CHF désormais validé par Laurent, nouvelle décision à écrire |
| D31 | appliquée au niveau application ; `www` à recontrôler ; Kundenstudie à qualifier |
| D32 | faits commerciaux partiellement établis ; vérifier wording #36 |
| D33 | décision entité/adresse/langue ; `foundingDate` à redéfinir sémantiquement avant modification |
| D34 | anciennes docs bots à resynchroniser |
| D35 | mesures à préserver sous gel |
| D36 | noindex origine Vercel non exécuté |

**P0 global : pas clos strictement.**

---

# 15. Ce qu'il ne faut pas toucher maintenant

Jusqu'au 08/10 :

- M5 ;
- `gsc_pull_bornes` ;
- dimension device / P0-J ;
- `data_freshness_expected` pour device.

Sans décision métier :

- 13 redirections XL → XL G2 ;
- règles XL de `next.config.ts` ;
- 3 redirects G2 → XL G2 ;
- claims entreprise/produits non confirmés.

Sans nouvelle mesure :

- WAF ;
- SBFM ;
- D22 ;
- règles Cloudflare historiques.

Sans réaudit :

- PR #24 ;
- PR #27.

Pendant les fenêtres d'octobre :

- pas de nettoyage massif des GONE/doublons ;
- pas de restructuration globale des pages sous mesure ;
- pas de nouvelles corrections simultanées rendant l'attribution impossible.

---

# 16. Questions humaines encore nécessaires

## Sébastien

1. Statut commercial exact G2 / XL v2 / XL Pro v2 / XL G2 ; cibles des anciennes URL.
2. Intention actuelle des 3 redirects G2 → XL G2.
3. Règle commerciale pour les prix CHF, conversion, arrondis et révision.
4. Claims #36 encore métier : support, reprise, installation, compatibilités, période logiciels.
5. Existence/source de la « Kundenstudie PackshotCreator 2025 ».
6. Motifs globaux `-old-`, `-mod`, `/pages/`, `/resources/`, `/commun/`, `/ftp/`, `/en/en/` : lesquels restent intentionnels ?
7. Sort de #24 et #27.
8. Définition de l'entité pour `foundingDate` : société juridique, marque ou activité.

## Laurent

1. Formaliser CHF dans une nouvelle décision append-only.
2. Effectuer / déposer le contrôle `www` depuis le poste autorisé quand souhaité.
3. Choisir si les 8 EN en 410 restent l'arbitrage cible au regard de la réactivation future.
4. Confirmer R7 comme règle bloquante.
5. Confirmer qu'une fusion par lot ne constitue plus un GO implicite.
6. Statut des anciens jetons encore non documenté comme révoqué.

## Laurent + Sébastien

1. `FAITS.md` : propriétaire et procédure de signature.
2. Circuit unique des deux Claude.
3. Protection de `main` : PR obligatoire, checks, review ?
4. Qui tient la responsabilité « contenu × Worker » ?

---

# 17. Nouveau protocole opérationnel

## Règle 1 — Trois registres seulement

- **`FAITS.md`** : produits, statuts, successeurs, devises, dates, claims, motifs Worker, intentions historiques. Signé humainement.
- **`DECISIONS.md`** : append-only ; chaque décision indique ce qu'elle remplace, sa date d'exécution et ce qui la rend caduque.
- **`JOURNAL.md`** : exécution, preuve, résultat, non-regardé, responsable, échéance.

`ETAT` doit devenir principalement dérivé, pas une copie manuelle de GitHub.

## Règle 2 — Classer avant de prouver

Chaque assertion = technique / mesure / fait métier / engagement commercial.

Un fait métier ne se déduit pas du code.

## Règle 3 — OBSERVE → PROVE → REFUTE → MAP CONSEQUENCES → PROPOSE → WAIT FOR GO → APPLY → VERIFY → MEASURE

Ajouter explicitement **REFUTE** : chercher une source qui contredit la conclusion avant de proposer un correctif.

## Règle 4 — R7 bloque

Si une consigne humaine contredit le dépôt ou un fait existant : draft + question. On n'applique pas « quand même ».

## Règle 5 — Une PR = un sujet

Pas de fusion en lot pour « gagner du temps ». Chaque GO correspond à la classe de décision compétente.

## Règle 6 — Le chemin visiteur définit DONE

Build/Preview/origine ne suffisent pas. Un changement routage/contenu est DONE seulement après contrôle du chemin réellement vu par `www` ou après simulation transversale équivalente + recette post-déploiement.

## Règle 7 — Toute leçon mécanisable devient un test

Exemple #36 : aucune nouvelle URL valide ne doit matcher une règle 410 générique.

## Règle 8 — Mesurer sous gel

Sans gel, la conclusion doit être « non attribuable ».

---

# 18. Garde-fous à implémenter avant la prochaine phase risquée

Priorité 1 :

1. `npm run test:unit` obligatoire dans `pr-checks.yml`.
2. test `VALID_NEXT_ROUTE_MUST_NOT_MATCH_WORKER_GONE_RULE`.
3. protection `main` : PR obligatoire + checks requis + pas de push direct.
4. smoke automatique post-merge sur `main`.

Priorité 2 :

5. lint slug : motifs interdits/réservés (`-old-`, suffixe `-mod`, etc.) sauf exception datée.
6. test Worker × `next.config.ts` : collisions et règles mortes.
7. test de cible : 200 canonique, non `delisted` sauf décision signée.
8. test hreflang/sitemap après Worker.
9. lint locale : ternaires FR/EN sans branche de-ch, `inLanguage`, `og:locale`, devises.
10. test JSON-LD URL = canonical.

Priorité 3 :

11. ETAT généré depuis GitHub/infrastructure.
12. test DECISIONS ↔ code pour les décisions mécanisables.
13. alerte diff Worker déployé ↔ `main`.
14. procédure secrets : éphémères, variable d'environnement, révocation consignée.
15. purge Cloudflare ciblée + query string neuve après changement 3xx/410.

---

# 19. Checklist avant merge — 15 points

1. Produit/prix/devise/date/claim/équivalence ? → fait humain écrit, sinon STOP.
2. Consigne contredit dépôt/historique ? → R7 STOP.
3. TypeScript + build + Vitest Worker/lib verts en CI.
4. Nouvelle URL/slug testée contre Worker et motifs réservés.
5. Redirection : un saut, cible 200 canonique, justification d'équivalence.
6. Locale : 0 fallback involontaire FR/EN ; `lang`, `og:locale`, `inLanguage`, devise, formats.
7. Schema testé ; facts issus de `FAITS.md`.
8. Rayon d'action dans les deux sens : dépendances et contraintes.
9. Preview contrôlée ou dérogation écrite.
10. Rollback nommé.
11. JOURNAL : vérifié / supposé / non regardé + responsable + échéance.
12. Aucun autre changement sur la famille sous mesure.
13. GO écrit par l'humain compétent.
14. Docs/faits/décisions/pièges mis à jour si nécessaire.
15. Aucun secret dans PR/chat/docs ; jetons éphémères révoqués.

---

# 20. Checklist après déploiement — 10 points

1. Version active = version attendue.
2. Production ↔ `main` = diff attendu, exactement.
3. Tous les chemins changés contrôlés sur `www` dans l'heure avec query neuve ; sortie brute conservée.
4. Purge ciblée des chemins dont la réponse 3xx/410 change ; re-test.
5. Chrome sur `www` pour rendu, traduction désactivée sur de-ch.
6. Smoke origine en complément, jamais comme seule preuve.
7. Sous-domaines passthrough/proxifiés testés si Worker/WAF touché.
8. Rollback réellement disponible.
9. JOURNAL + fenêtre de mesure J0 + témoins.
10. Accusé de lecture de l'autre côté avant clôture.

---

# 21. Matrice de confiance finale

| Sujet | Conclusion | Confiance |
|---|---|---|
| `main = 1a8c3de` | établi | très élevée |
| Worker ≈ main | établi dans les audits techniques | élevée |
| #36 `-old-` → 410 | établi | très élevée |
| 8 EN en 410 intentionnels | établi par `d3620bd` | très élevée |
| 3 G2 → XL G2 corrects commercialement | inconnu | faible sans Sébastien |
| 13 XL→XL G2 corrects commercialement | contesté / D29 suspendue | faible |
| CHF accepté pour de-ch | confirmé par Laurent dans ce fil | élevée humainement ; non encore consignée repo |
| DE-CH globalement propre | faux | très élevée |
| D31 appliquée au niveau application | établi | élevée ; `www` à revoir |
| `foundingDate = 2001` comme unique vérité | non établi sémantiquement | moyenne pour société SYSNEXT, faible pour marque |
| CI protège contre les erreurs Worker | faux | très élevée |
| `main` impose PR/review/checks | faux dans le ruleset lu par ChatGPT | élevée |
| P0-H sain à ce stade | établi | élevée, fenêtre encore ouverte |
| P0-I sans régression consommateur | pas encore totalement prouvé | moyenne |
| P0-J clos | faux | très élevée |
| P0-F résolu | faux | élevée |
| #24/#27 prêtes à merger | faux | très élevée |

---

# 22. Points encore non prouvés / inaccessibles

Ils ne doivent pas être « remplis » par une IA :

1. état réel de `www` sur tous les témoins après cache/WAF ;
2. durée réelle du 410 de #36 à l'edge et éventuel effet GSC ;
3. état WAF/SBFM/règle `54a4b8c2` actuel ;
4. intention produit actuelle G2/XL ;
5. certains faits métier de #36 ;
6. statut complet de révocation de plusieurs anciens jetons ;
7. relectures humaines non consignées dans GitHub ;
8. contenu de certains anciens chats / pièces absentes ;
9. rendu exclusivement client de quelques composants DE-CH ;
10. résultat de P0-I après les premiers vrais consommateurs.

---

# 23. Sources externes de vérification

- Orbitvu — About Us : https://orbitvu.com/about  
  Confirme usine en Silésie et équipe R&D >30.
- Orbitvu — Alphashot Pro G2 : https://orbitvu.com/products/alphashot-pro-g2  
  Et article Orbitvu Station 24.2 : 74 sources/panneaux LED autour du produit.
- Orbitvu — Alphashot XL G2 : https://orbitvu.com/products/alphashot-xl-g2  
  Confirme 170 panneaux LED contrôlés et, sur la variante MDC, mesure + poids.
- Microsoft Support — Windows 10 : support terminé le 14/10/2025.
- EUR-Lex — Règlement UE 2024/1689, article 50.
- Pappers — SYSNEXT : date de création juridique 16/11/2001.

Ces sources externes servent à arbitrer les claims publics. Elles ne remplacent pas les faits métier internes lorsque l'information relève de PackshotCreator.

---

# 24. Plan de reprise recommandé

## Immédiat, sans perturber les mesures

1. faire relire ce rapport par Laurent et Sébastien ;
2. créer `FAITS.md` et y déposer uniquement les faits métier nécessaires (XL/G2, CHF, date d'entité, claims #36, motifs Worker) ;
3. renforcer la CI et le ruleset **avant** de relancer une vague de correctifs ;
4. ne pas toucher M5/P0-J avant le 08/10 ;
5. ne pas merger #24/#27 avant réaudit.

## Après stabilisation de la gouvernance

6. corriger les dettes DE-CH par lots isolés et testables ;
7. corriger les structured data non canoniques ;
8. trancher D29 puis aligner Worker, Next et tests ;
9. resynchroniser les documents périmés en réduisant les données maintenues manuellement ;
10. seulement ensuite reprendre F5 / P1 contenus sous protocole nouveau.

---

# 25. Conclusion

La conclusion principale de ce post-mortem n'est pas « l'IA a fait trop d'erreurs » ni « il faut davantage relire ». Le chantier a déjà beaucoup relu et beaucoup testé.

Le problème est plus précis :

> **nous avons parfois contrôlé avec beaucoup de rigueur une propriété qui n'était pas celle qu'il fallait prouver.**

Un 200 ne prouve pas l'équivalence d'un produit.  
Un build vert ne prouve pas le comportement de `www`.  
Un test local vert ne protège pas un merge s'il n'est pas en CI.  
Une information répétée dans trois documents n'est pas plus vraie qu'une source primaire.  
Une décision commerciale ne peut pas être inventée par un diff Git.

La méthode future doit donc être simple : **faits métier signés, preuves techniques mécanisées, contrôles transversaux, GO explicites, production vérifiée, mesures sous gel**.

C'est cette combinaison — et non l'empilement de nouveaux audits — qui doit devenir le garde-fou permanent du projet.

---

## Statut final du rapport

- `REPOSITORY STATE = SAFE_WITH_RESERVATIONS`
- `P0 GLOBAL = NOT STRICTLY CLOSED`
- `SUFFICIENT FOR MASTER SYNTHESIS = YES`
- `NEXT SAFE ACTION = GOVERNANCE + FACTS BEFORE NEW CORRECTIONS`


---

# ANNEXE A — Rapport maître post-mortem Claude Projet — source intégrale

> Source : `PSC_RAPPORT_MAITRE_POSTMORTEM_2026-09-25.md`. Conservée intégralement pour éviter toute perte d'information. Les éventuelles conclusions dépassées ou contredites sont arbitrées dans la Partie I.

# PSC_RAPPORT_MAITRE_POSTMORTEM_2026-09-25

- **Statut** : rapport de référence, deuxième passe ; **remplace** `PSC_POSTMORTEM_METHODE_2026-09-25.md` (l'audit de ce premier rapport est en annexe A). Lecture seule : aucune modification du dépôt, de Cloudflare, de Vercel, de Supabase, de n8n. Aucun code, aucun correctif.
- **Date** : analyse au 25/09/2026 (soir), livrée le 26/09/2026 07 h (Paris). Dépôt lu à `main` = `1a8c3de` (fusion de #37, 15:05 +0200), clone de 400 commits (plus ancien : `e28f908`, 28/03/2026).
- **Sources primaires** : dépôt `Sebeth7/packshot-creator` (code, `git log`, messages de commit, tests, workflows CI, `docs/seo-geo/*`) ; pages GitHub des PR #31, #36, #37 ; 26 fils du projet claude.ai relus par recherche ciblée (06/06 → 25/09), dont les fils du 01/07, 07-14/07, 23-24/07, 30/06, 02/09, 16-19/09, 23-25/09 ; fichiers du projet (Master V3, exécution P0, prompts Claude Code, P0-D/P0-E, contre-audit @Seb, état des lieux 23/09, cleanup audit 24/09) ; mémoire du projet (6 fichiers).
- **Sources non accessibles** : corps et commentaires des PR #1-#30, #32-#35 ; sessions du Claude de Sébastien ; sorties de ChatGPT (hors les deux prompts de ce fil) ; état live Cloudflare (WAF, Bot Fight Mode, Security Events, versions du Worker), Vercel, Supabase, n8n ; Master V2 (PDF) ; comportement réel de `www` (R4) ; chats antérieurs au 06/06 et un chat masqué. Tout ce qui en dépend est marqué **NON PROUVÉ DANS LES SOURCES DU PROJET**.
- **Règle de conflit** : code et `git log` > message de commit > JOURNAL (état déclaré) > `DECISIONS.md` > fils du projet (verbatim) > fichiers du projet > résumés automatiques de chats > mémoire. Un résumé automatique de chat est une source secondaire : ce qu'il affirme seul est étiqueté [Vérifié : résumé de chat].
- **Étiquettes** : [Vérifié : <source>] ; [Inférence] ; [Non vérifié] ; [Spéculation] ; NON PROUVÉ DANS LES SOURCES DU PROJET. Toute [Inférence] repose sur des schémas observés.
- **Convention** : E1…E38 = inventaire de la section 4 ; Q1…Q18 = questions de `BOITE-AUX-LETTRES.md` ; D1…D36 = `DECISIONS.md` ; « nous » = Laurent + son Claude de projet + Claude Code sur son poste.

---

## 1. Résumé exécutif (15 points)

1. **L'erreur XL v2 → XL G2 a un précédent exact, connu et non consigné.** Le 01/07, le Claude de projet a posé « G2 remplacé par XL G2 » comme un fait à partir d'un commit de Sébastien ; Laurent a objecté que le G2 restait vendu ; la question « restaurer la fiche + retirer les 3 redirections » est restée ouverte ; la fiche a été réintroduite le 07/08 (`e385e14`, repli économique délisté) ; les 3 redirections sont toujours en production. Le 17/09, la même inférence (« délisté ⇒ successeur ») a été refaite sur l'Alphashot XL, sans que la leçon du 01/07 ait été écrite dans un piège ou une décision. [Vérifié : fil 01/07, `git log`]
2. **Le 410 des 8 articles `/en/blog` statiques n'est pas une interception inconnue : c'est un arbitrage de Laurent du 07/07**, exécuté par Sébastien et écrit dans le message de commit `d3620bd` (« 14 sans équivalent passées en 410, dont les 8 TSX statiques noindex dont le contenu vit en /fr »). L'erreur est documentaire : la décision n'existe que dans un message de commit ; `04-SURFACES-SEO.md`, `app/sitemap.ts` (commentaire l. 145 : « 301 vers /fr via le Worker ») et D3/D9 (« noindex réversible ») disent le contraire. Le premier post-mortem l'a traité comme un angle mort ; c'est corrigé ici. [Vérifié : `git show d3620bd`]
3. **Le jeton Preview a été transmis à Laurent par courriel le 16/09** (fil « Audit des accès Vercel », valeurs masquées) et retiré d'`ETAT.md` comme « fait » le 17/09 (`b11b588`) ; il n'a jamais été injecté dans une session Claude Code ni dans la CI, et le JOURNAL écrit « non transmis » du 20/09 au 25/09. La porte « Preview contrôlé » de D12 n'a aucune trace d'exécution pour les 33 PR fusionnées. La responsabilité n'est pas où le premier rapport la mettait. [Vérifié : résumé de chat 16/09 ; JOURNAL:1177, 1055, 612 ; ETAT:118]
4. **Treize redirections XL → XL G2 et deux règles `next.config.ts` → XL v2 coexistent en production**, sous une décision suspendue (D29) que ni les tests (`lot-f`, `legacy-redirects` : « aucun `alphashot-xl-v2` »), ni `e2e/redirections.spec.ts` (→ `xl-v2`) ne reflètent de manière cohérente. Aucune des trois vérités n'est signée par Sébastien. [Vérifié : dépôt]
5. **La devise de-ch a été décidée deux fois par Sébastien dans des commits** (`fd112ce` 24/07, `c7224e5` 04/08 : « CHF 775 sur de-ch »), contredite par le cadre du projet (« EUR »), niée par le fil du 11/06 (« no CHF »), retournée trois fois les 24-25/09 (EUR → hors périmètre → CHF), et n'est écrite dans `DECISIONS.md` sous aucune forme positive. Le patch EUR (17 fiches) a été préparé sans question à Sébastien. [Vérifié : `git log`, D30, fils]
6. **#36/#37 est un cas d'école d'interaction non testée** : documentation affirmant que le Worker ne touche pas les URL préfixées (`04-SURFACES` §4, piège E6), alors que `shouldReturn410` s'applique à tout chemin et que sept règles `next.config.ts` sont mortes sur `www` pour la même raison (`/en/packshot-secteur-*` ×6, `/en/packshot-packshotcreator`, toutes dans `GONE_PATHS`). Aucun test ne traverse Next.js et le Worker ; le seul contrôle qui le fait est humain, sur `www`, après fusion. [Vérifié : dépôt]
7. **Aucun contrôle de production n'est consigné avec sa sortie brute** : Worker #16 (20/09) « à faire par Laurent » jamais consigné ; lot F (23/09) « à reporter » encore au 25/09 ; P0-D/E (25/09) « Verdict de Laurent : PASS » sur 16 témoins + 3 variantes pour 30 chemins, sortie non reproduite. Le contrôle visiteur, seul à voir le Worker et le WAF, n'est jamais une donnée du dépôt. [Vérifié : JOURNAL, ETAT]
8. **Les tests existent et ne tournent pas** : `vitest` (4 suites Worker, 8 suites `lib`) et Playwright (15 specs) ne sont appelés par aucun des trois workflows ; `pr-checks.yml` exécute `tsc`, `verifier-json`, `eslint` (non bloquant) et `next build`. Les décomptes « 186/218/223 tests verts » sont ceux de sessions locales. Deux commits documentaires ont été poussés directement sur `main` (20/09, 23/09), contre D12. [Vérifié : `.github/workflows`, `git log --first-parent`]
9. **La boîte aux lettres n'a jamais reçu une réponse de Sébastien** : 10 questions déposées, 9 adressées à son Claude, 0 réponse de son côté ; les 7 réponses présentes sont signées Laurent et ajoutées par un seul commit le 25/09 (`8534799`). Deux clôtures (Q2, Q6) et une décision (D15) reposent sur « absence d'objection tenue pour acquise sur la déclaration de Laurent » (JOURNAL:280). [Vérifié : BOITE, JOURNAL]
10. **Six diagnostics ont changé de sens en cours de route sans que la version précédente soit marquée caduque** : bots IA (03/09 SBFM → 17/09 « règle managée, SBFM infirmé » → 18/09 D22 SBFM UA+IP → 24/09 P0-F rouvert), divergence Worker (03/09 → 17/09 « synchronisé » → 18/09 rouvert → D21 close), RSC (P0 absolu → artefact SF, 22/07), 504 (risque réel → artefact Early Hints, 17/09), R4 (16/09 → D23 18/09), racine `/` (302 conditionnelle 01/05 → 301 14/07, avec une copie projet périmée qui affirmait le contraire). Chaque version a été lue comme « la » vérité par au moins un document postérieur. [Vérifié : fils, DECISIONS]
11. **Le dépôt contient au moins onze contradictions internes vivantes** : `e2e` vs Worker (`/de` → `/en`, `alphashot-g2` chaîne à deux sauts), `i18n/routing.ts` l. 11 (« DE/ES/NL → blendai.studio », aucune règle), `app/sitemap.ts` l. 145, `04-SURFACES` §2/§4, `06-CHANTIERS` (« arrêté au 19/09 », C13 « clos » alors que #23 est fusionnée le 20/09 et que le texte est toujours présent le 23/09), `05-INFRA` bots, `CLAUDE.md` R4, `README` « 33 pièges », `00-BRIEFING` dates, cadre du projet EUR/D8, mémoire. [Vérifié : dépôt, fils 23/09]
12. **Quatre incidents de secrets en deux mois** : jeton Cloudflare en clair dans un fil (23/07), clé `service_role` Supabase en clair puis révoquée (02/09), deux secrets transmis par courriel (16/09), jeton API Cloudflare + jeton R2 collés dans un fil du projet et dans une session Claude Code puis révoqués (20/09). Le dépôt est public ; la règle « jamais dans un chat » est écrite depuis juin. [Vérifié : résumés de chats ; fil 20/09 verbatim]
13. **Ce qui a fonctionné a une signature commune** : contrôle mécanique exhaustif (simulation 3 691 puis 5 533 chemins, resync API octet par octet, md5, contrôle négatif des tests) ou humain compétent qui contredit (Laurent le 01/07 sur G2, le 24/09 sur XL ; Sébastien le 07/07 sur « tout en 410 » ; Claude Code sur les écarts R7). Ce qui a échoué a l'autre signature : une inférence produit avec le vocabulaire de la preuve (« vérifié », « confirmé », « garanti par tests », « équivalent exact », « clos »).
14. **Les mesures d'octobre sont confondues par construction** : 13 PR applicatives, 3 déploiements Worker, un article et une correction de slug entre le 16 et le 25/09, sur les mêmes familles de pages que les fenêtres #16 (04/10), lot F (07/10), P0-D/E (09/10), P0-H (08/10), M5 (14-28/10). Aucune attribution causale ne sera possible sans gel écrit.
15. **La cause racine tient en une phrase** : il n'existe aucun registre des faits d'entreprise (produits et statuts commerciaux, devise par locale, dates, claims, intention des règles Worker) signé par Sébastien ; en son absence, chaque agent déduit le fait du code ou d'un commit, l'étiquette « vérifié », et le système entier — tests, Master, contre-audit, décisions — le traite comme acquis.

---

## 2. État réel au 25/09/2026

Légende : **fait** (mesure ou décision prise), **codé** (dans une branche ou un patch), **fusionné** (`main`), **déployé** (production : Vercel automatique après fusion ; Worker par `wrangler deploy`), **vérifié** (contrôle consigné avec commande ou sortie), **en mesure** (fenêtre GSC ouverte), **différé**, **inconnu**.

| Sujet | Statut | Détail sourcé | Ce qui manque |
|---|---|---|---|
| P0-A `inLanguage` de-ch | fusionné #29 (24/09 17:49), déployé Vercel, vérifié sur `sysnext.vercel.app` (JOURNAL:303) | `lib/seo/locale-schema.ts` ; de-CH sur `/de-ch` à l'origine | Chrome `www` : ETAT:47 énonce un résultat sans URL ni date ; JOURNAL:112 le liste « non regardé ». `courseSchema` `inLanguage: 'fr'` (`SchemaOrg.tsx:398`) non traité |
| P0-B décrochage | fait (diagnostic hors dépôt : `PSC_P0B_…`) | « MIXED », rupture 23-25/07 | Livrable non dans le dépôt (JOURNAL:378 « tels que déclarés par Laurent ») |
| P0-C marque | fait (M1, M2, M6 le 23/09, #28) | position 17,6 = artefact ; propriétaire `/en` | Historique Google Ads : Sébastien ; M5 14-28/10 |
| P0-D/E Worker | fusionné #30 (24/09), **déployé 25/09 05:07 UTC** (`27b0153c`), vérifié partiellement : 16 témoins + 3 variantes `curl.exe`, verdict PASS, sortie non consignée (JOURNAL:316, 326) | 30 changements sur 3 691/5 533 chemins simulés ; rollback `05c5c47c` nommé | 11 chemins sur 30 non testés ; GSC J+14 (~09/10) ; variante `/amp` du `-22` remise en 410 |
| P0-F crawlers IA | différé, « BLOCKED_ACCESS » | D22 (18/09) en vigueur et **non exécutée** ; Master P0-F contredit D22 | Accès Security Events ; état réel de la règle `54a4b8c2` et de la liste PerplexityBot |
| P0-G / F5 `/fr/packshot-e-commerce` | codé (#24 ouverte depuis le 20/09, base `1ee8cfb`), non fusionné | prose = premier jet du modèle, « Likely AI » 100 ; chiffres contradictoires ; `REGLES_REDACTION_BLOG` absent du dépôt | Réécriture humaine ; claims SJ ; J0 non atteint ; conflit ETAT.md |
| P0-H `gsc_pull_bornes` | fait (migration `20260924135212`, GO LW 24/09) ; **en mesure** 25/09 → 08/10 | 1 206 ms → 3 ms ; M5 #3399/#3400 succès | 0 échec sur 14 jours à constater |
| P0-I filtre pollution | fait (migration `20260925061338`, 8 fonctions, md5, rollback) | « APPLIED / PASS » | Exécutions suivantes de M6 et `r3_measure_article` non relues (JOURNAL:189) ; nœuds n8n à filtre équivalent non relus |
| P0-J device | différé après le 08/10 (P0-K) | `gsc_metrics_device` figée au 20/06 ; aucun watchdog | GO publication n8n |
| P0-K resync documentaire | fusionné #35 (25/09 08:38) | ETAT § P0 et chantiers ; JOURNAL | 8 fichiers cadre et `06-CHANTIERS` non relus ; ~20 lignes périmées subsistent (section 16) |
| D29 XL | **suspendue** (`SUSPENDED / REVIEW_PRODUCT_MAPPING`) | 13 redirections Worker XL → XL G2 déployées (3 le 20/09, 10 le 23/09) ; `next.config.ts` l. 61/70 → XL v2 ; tests verrouillent « jamais xl-v2 » | Fait produit signé SJ ; décision de laisser ou de retirer |
| D30 devise de-ch | « OUT_OF_SCOPE_NO_CHANGE » | Code CHF (`lib/leasing.ts`, `EUR_CHF_RATE`), 17 fiches + JSON-LD `Offer` en CHF ; FAQ wine « 500 CHF » ; instruction CHF de Laurent le 25/09 : NON PROUVÉ DANS LE DÉPÔT | D37 ou équivalent ; correction du cadre du projet |
| D31 témoignages de-ch | fusionné #32, déployé, vérifié origine (48 pages) | `aggregateRating` retiré (`1c52eb7`) | Chrome `www` |
| D32, D33, D36 | **décidées, non exécutées** (25/09) | `foundingDate` 2004 → 2001 ; `hasMerchantReturnPolicy`/`shippingDetails` ; `noindex` de `sysnext.vercel.app` | PR applicatives |
| D22 WAF PerplexityBot | décidée 18/09, **non exécutée** (ETAT:86) | — | GO Cloudflare ; mesure avant/après |
| #36 article migration (SJ) | fusionné 25/09 14:21 ; #37 fusionné 15:05 | Slug EN `-old-` → 410 Worker 43 min côté dépôt ; nouveau slug testé contre la fonction extraite ; mensualités affichées en EUR (fr, en) et CHF (de-ch) dans l'article | État réel sur `www` (cache 410 `max-age=86400`) ; décision explicite SJ sur les prix (D16, Rayon) ; leçon consignée en JOURNAL seulement |
| Lot F (#26) | fusionné 23/09, déployé 23/09 07:41 UTC (`05c5c47c`) ; **en mesure** ~07/10 | 19 ajouts, 12 cibles, 4 sorties de 410 | `curl.exe` LW : fait selon `PSC_RAPPORT_ETAT_DES_LIEUX_2026-09-23` (fichier projet), jamais reporté au dépôt (ETAT:46) |
| Worker #16 | déployé 20/09 06:40 UTC (`167d7a15`) ; **en mesure** ~04/10 | 3 landings, XL → G2 ×3 | Contrôle témoins « déclaré par Laurent, non consigné » (JOURNAL:566) |
| Bulk Redirects `redirections_gsc` (Cloudflare) | 3 750 entrées à la migration, règle désactivée (23-24/07), jugée sans valeur (24/07), **0 entrée** au 18/09 [Vérifié : résumés de chats] | Suppression effective : NON PROUVÉ DANS LES SOURCES DU PROJET (état live) | — |
| Jeton Preview | créé 16/09 ; transmis par courriel à LW le 16/09 [Vérifié : résumé de chat] ; jamais utilisé | Aucun contrôle Preview consigné pour 33 PR | Injection dans la CI ou une session ; ou contrôle Chrome par LW, membre de l'équipe Vercel |
| Tests | 4 suites Worker + 8 `lib` (vitest), 15 specs Playwright ; **hors CI** ; `e2e/redirections.spec.ts` contredit le Worker sur `/de` et XL | JOURNAL 25/09 : 223/223 en local | Exécution en CI ; mise à jour de l'e2e |
| Documentation | P0-K partiel | Section 16 : lignes périmées dans 9 fichiers du dépôt, le cadre du projet et la mémoire | Resynchronisation par diff |
| Questions humaines | Q10 ouverte (cible de clics) ; Q16-Q18 jamais déposées | 7 réponses signées Laurent le 25/09 | Réponse de Sébastien : aucune dans le dépôt |
| PR ouvertes | #24 (F5), #27 (14 liens + clôture lot F) | #27 contient la « partie A » : `curl.exe` lot F et révocation du jeton | Preview contrôlé ; D15 non décomptée |

---

## 3. Chronologie complète, avec les changements de raisonnement

Sources : `git log` (sha, date, auteur), messages de commit, JOURNAL, fils du projet. Les changements de raisonnement sont marqués ⟲.

### 3.1 Avril – mai 2026 : naissance du Worker, deux moteurs, un dashboard

- 12-14/04 (Sébastien) : `af934c5` racine `/` → 301 `/fr` ; `9a1b1e9` `GONE_PATHS` (111) et `shouldReturn410` — **la règle `-mod`/`-old-` date de ce commit** ; `96f7e06` `LEGACY_REDIRECTS` déplacées depuis `next.config.ts` ; `4d55141` `LANG_SPECIFIC_REDIRECTS` ; `f979d88` `HOWTO`/`PRODUCT`/`PRODUIT`, règle `/amp`, `/secteur/`.
- 18/04 : `4a322ed` « commiter le nettoyage 404/410 du 16/04 (**déjà déployé**) » : le dashboard précède le dépôt.
- 01/05 : `94b37bb` racine en **302 conditionnelle `Accept-Language`** (fr → `/fr`, sinon `/en`). 09/05 : `6646787` cache edge (`cacheTtlByStatus` 301-399 = 86 400 s, HTML 60 s).
- Mi-mai : migration ; liste Bulk Redirects `redirections_gsc` (3 750) construite depuis GSC puis abandonnée ; Worker du 19/05 : catch-all `/de/*` → `/en` ; effondrement des impressions `/de` en Suisse (16 vs 1 370 en avril) [Vérifié : résumé du fil 11/06].
- 23/05 : `245f32f` « sync worker with deployed version » (+475 LEGACY, +128 GONE, +185 LANG_SPECIFIC) — première resynchronisation massive, bundle esbuild ; `7e351b7` crée `NOINDEX_EN_BLOG_SLUGS` (audit Semrush 18/05).

### 3.2 Juin : le pilotage par le Claude de projet commence ; premières erreurs et premiers rattrapages

- 06/06 (fil « Restructuration ») : Laurent relève quatre erreurs de raisonnement du Claude de projet ⟲ (« OLD clicks → 0 » aurait détruit la marque ; P3 aurait redirigé une landing forte vers une URL faible ; `CURRENT_DATE - 7` ; agrégat trompeur). Règle retenue : Laurent relit chaque livrable avant exécution.
- 10-11/06 : 8 redirections `/en/blog/<slug FR>` → `/fr/blog/<slug>` posées dans `LEGACY_REDIRECTS` (plan du Claude de projet) ; décision « **aucun prix, aucune devise, pas de CHF** » ; helvétismes ; `noindex` de-ch jusqu'à traduction native [Vérifié : résumé du fil 11/06].
- 12/06 : `d574e69` (SJ) « exécution plan Laurent — Phase A + hreflang, robots.txt B, noindex EN » ; `8f92146` retire 56 redirects `next.config.ts` court-circuités par le Worker (le commentaire l. 40-51 en fait la doctrine : « seuls des chemins `/fr/`, `/en/` ici »).
- 16-19/06 : crawls Screaming Frog bloqués par le WAF et les rate limits ; artefacts RSC (`?_rsc=`) ; règle d'accès IPv6 `966dd862` (20/06).
- 25/06 (fil « Questions préalables ») : ⟲ « bug de duplication `/X` vs `/fr/X` » qualifié de « découverte infra majeure », **infirmé** par 17 `curl.exe` de Laurent (tous 301) ; Claude reconnaît la sur-interprétation ; règle « fenêtre ≥ mi-mai ».
- 27-29/06 : locale de-ch (`6a1f2f3`, `818cac8`) ; 29/06 : Worker `/de → /de-ch` par Laurent, **seul déployeur** du Worker à cette date ; livrable `index.de-ch.js` (71 entrées) ; ⟲ hypothèse « `/de-ch/blog` en 410 » infirmée par `curl.exe` → Variante A ; deux corrections actées (cause réelle = `generateStaticParams` absent, établie par Claude Code ; sitemap de-ch codé en dur).

### 3.3 30/06 – 14/07 : le précédent G2, la source unique, la devise

- 30/06 : `d8b4156` (SJ) « remplace Alphashot G2 par Alphashot XL G2 dans tout le catalogue » : 3 clés `LEGACY` `/fr|/en|/de-ch/…/alphashot-g2` → `alphashot-xl-g2`, `e2e/redirections.spec.ts` mis à jour ; le même jour `3cfa2e7`/`74dff0c` retirent les prix Orbitvu publiés et « exclusif » des articles, quelques heures après le constat de conformité du Claude de projet (fil « Audit Supabase », 30/06).
- 01/07 (fil « Analyse et correction du build déployé ») : le Claude de projet livre les hunks G2 → XL G2 et un Worker ; ⟲ le bug « 30 chemins `/de` routés vers `/en` » annoncé la veille (fil « Migration Workers vers Vercel ») est **infirmé** par simulation exhaustive (confusion `LANG_SPECIFIC` / `LEGACY`) ; **Laurent objecte que l'Alphashot G2 est toujours vendu** ; Claude : « j'ai propagé « G2 remplacé par XL G2 » comme un fait acquis… J'aurais dû l'étiqueter » ; point à trancher : « restaurer la fiche + retirer les 3 redirections, ou confirmer la discontinuation ». La spec e2e est déclarée inutilisable (localhost, l. 107 périmée).
- 07/07 : `6df8f9b` (SJ) resync source ↔ déployé du 01/07 (+103 LEGACY, +157 GONE dont **98 URL absolues inatteignables par `pathname`**) ; `d3620bd` « variante A /de→/de-ch + **arbitrages Laurent 07/07** » : 45 `/en/blog|guide/<slug-fr>` → traduction EN, **14 sans équivalent → 410, dont les 8 TSX statiques noindex** ; 79 entrées `/de/*` retirées ; `1cbc569` délistage XL v2, XL Wine v2, Alphadesk (liens → XL Pro v2) ; `5f5e8b2` fiche XL G2. Le Claude de projet valide « le raffinement de Sébastien contre ma propre lettre » (« mon “tout en 410” était un raccourci ») ⟲ et note « ces 301 pointent vers du noindex ». **Le processus « repo = source » est acté des deux côtés.**
- 14/07 : `b778a88` (SJ) racine `/` en **301 inconditionnelle `/fr`** après arbitrage du Claude de projet ; ⟲ ce dernier affirme « ma copie de `src/index.js` contient un 301 fixe… la conditionnelle est entrée en prod sans passer par le repo » — faux : la 302 est dans le dépôt depuis `94b37bb` (01/05) ; la copie du projet était périmée. Angle mort relevé : `/en` classée n° 1 sur la marque alors que la doctrine dit `/en` noindex.

### 3.4 22/07 – 07/08 : P0 sous-domaines, D4, CHF, G2 réintroduit

- 22/07 : ⟲ RSC « P0 absolu » infirmé par `curl.exe` (328 k caractères) ; consigné en mémoire comme fausse piste.
- 23/07 : audit Cloudflare (fil `ea3bcf67`) : `DE_CH_MAP` déployée = 33, pas 71 (le fichier de 71 entrées n'a jamais été déployé) ; « la mention mémoire “resync = 1 ligne de retard” est fausse » ; jeton API collé en clair dans le fil (révocation demandée deux fois) ; Laurent déploie le correctif sous-domaines, ajoute la route `*.packshot-creator.com/*` au dashboard, désactive les règles 1-3 ; **une modification WAF casse les vidéos produit** (piège E2, D4 du 24/07).
- 24/07 : `9aa1e77` (SJ) resync + `HOST_HOME_MAP`, `PASSTHROUGH_HOSTS` ; `0e67bc2` ; **`fd112ce` : mensualités de-ch en CHF (SJ)** ; D4 « le dépôt est la source unique du Worker » ; liste Bulk jugée sans valeur (1 201 soft-404, 2 008 cibles mortes) → suppression recommandée ; ⟲ « Le P0 est terminé côté exécution » ; audit `curl.exe` du 24/07 : 307 internes, `noindex` calculateur non implémenté, `[object Object]` ×8 dans `ItemList`, `datePublished` tous au 08.
- 04/08 : `c7224e5` (SJ) « Alphashot XL G2 MDC à 38 450 € — leasing 835 €/mois (**CHF 775**) », « prix confirmé par Seb ». 07/08 : `e385e14` (SJ) « Alphashot G2 réintroduite (15 450 € HT) comme repli économique du Pro G2 : delisted (invisible du wizard), incluse par le conseiller via `CHAT_FALLBACK_IDS` » — **les 3 redirections G2 → XL G2 du 30/06 ne sont pas retirées.**

### 3.5 22/08 – 04/09 : audits, sélecteur de langue, secrets

- 22/08 – 02/09 : crawls ; sélecteur de langue générant ~470 liens vers 301/404/410 (DE-CH → `/en/<slug>`), présent depuis juin ; artefact RSC corrigé côté config SF ; YouTube 153 (`Referrer-Policy`) ; **clé `service_role` Supabase exposée dans le fil, révoquée** (02/09).
- 03-04/09 : audit expert du 03/09 (annexe K : 21 mappings ; L.1 : 17 URL rich results) ; « 548 redirections legacy vers `/en` » ; `0e8949f` (SJ, 04/09) correctifs sélecteur/rich results/footer **sur une branche, non fusionnée avant le 16/09** ; D5, D7-D10 (04/09) ; build Vercel rouge le 04/09 (R1).

### 3.6 16-19/09 : gouvernance, prompt de nuit, fusion en lot

- 16/09 : PR #2-#7 (SJ) : `CLAUDE.md` R1-R8, `docs/seo-geo/*`, 3 workflows CI (`c0f827f`, `f8ffd5b`), `smoke.mjs`, D11-D14, jeton Preview créé, deux secrets envoyés par courriel à Laurent ; **R4 rédigée sur une mesure faite hors liste blanche** (17/17 en 403) ; C1 clôturée (« Non regardé : les redirections du Worker, couvertes par aucun contrôle », JOURNAL:1211).
- 17/09 : PR #8-#14 (docs) ; C2 remesurée : ⟲ « les challenges viennent d'une règle managée, pas de SBFM » ; C4 « Worker synchronisé » (`18314f1`) ; « diagnostic bouclé » ; **prompt de nuit** (Claude de projet) : lot B « `/fr/studio-photo/alphashot-xl` → `alphashot-xl-g2` », « les cibles répondent 200 », règle 5 « tu ouvres quand même la PR » ; D17-D19 proposées par l'IA (renumérotées D18-D20). Nuit : PR #15-#19 ; #16 consigne l'écart R7 (« ciblaient xl-v2, consigne xl-g2 appliquée », JOURNAL:735).
- 18/09 : bilan v3 ; ⟲ SBFM **rétabli** comme source des défis (D22, UA + IP) ; ⟲ « divergence Worker » rouverte puis close par mesure de comportement (D21) ; ⟲ R4 amendée (D23) ; affirmation « xl-v2 absent de `MACHINES` » (fausse : `machines.ts:347`, `delisted: true`).
- 19/09 : **fusion des 5 PR de nuit en lot par Laurent (16:17-16:48 : #19, #15, #17, #18, #16 ; puis #20 à 17:31)** ; `38345f3` `DE_CH_MAP` XL → G2 ; D26-D28 ; nettoyage du suivi (`0c2972f`) : **C13 « clos, traité par la PR accents » alors que #23 n'est fusionnée que le 20/09 et que le texte est encore présent le 23/09** ; « Go pour tout ».

### 3.7 20-23/09 : déploiements, lot F, accord sur les 3 dernières entrées

- 20/09 : Worker #16 déployé (`167d7a15`, GO LW), JOURNAL poussé **directement sur `main`** (`bc81d9a`) ; #22 (`priceValidUntil`, `sku`, `EUR_CHF_RATE` en constante), #23 accents, #25 ; Preview en 302 SSO : « jeton non transmis à ce jour » ; **jeton Cloudflare collé par Laurent dans le fil du projet et dans une session Claude Code, révoqué**.
- 23/09 : lot F #26 : Claude Code liste 10 entrées xl-v2 (7 LEGACY + 3 hors LEGACY) ; le Claude de projet « décide » : « corriger les 3 entrées… Elles pointent vers une fiche retirée » ; Laurent transmet ; `e5a5dcc` ; test « aucune ligne du Worker ne contient `alphashot-xl-v2` » ; fusion 09:25, déploiement 07:41 UTC (`05c5c47c`), JOURNAL poussé directement (`da2796f`) ; « `curl.exe` à faire » ; M1/M2/M6 (#28) ; contre-audits et troisième passe (hors dépôt) ; TDE.

### 3.8 24/09 : la journée des quatre vérités

- 07:45 contrôle R7 (Claude de projet) : `ETAT.md` périmé sur 6 points ; **« le code utilise CHF (Seb 24/07) alors que le cadre dit EUR »** → Q16 proposée. Contre-audit @Seb (`Untitled (1).docx`) : « P1-02 déjà fait par la PR #26, garanti par tests » ; diagnostic bots repris du 16/09. ~11:50 Master V3 : « CHF décidé, consigner » ; T05 « xl-v2 : CLOS Worker / VERIFY Next » ; P0-F rouvert sans D22 ; hiérarchie « code > Git > décisions ».
- ~13:30 batch P0 : « Résiduel `alphashot-xl-v2` **confirmé** » ; le Claude de projet écrit aussi : « Question à Sébastien : [Non vérifié] XL G2 est-il le successeur commercial de la gamme XL v2 ? Les prix diffèrent (×2) ; XL Pro v2 est plus proche… c'est une décision de redirection » — la question est formulée, adressée à Sébastien, **jamais déposée** ; P0-E : 23 « équivalents exacts » (JOURNAL:430 : « Vérifié » = statut 200, pas contenu) ; P0-H appliqué (GO) ; patch P0-D/E V1 contient `node_modules` (retiré en V2).
- Après-midi : prompt « DÉCISION 1-3 » (texte au format ChatGPT, collé par Laurent) : D29 « successeur = XL G2 », D30 « mensualités de-ch en EUR… classer toute valeur CHF comme incohérence à corriger », D31 ; 4 patches préparés (dont **17 fiches CHF → EUR**) ; Claude Code : #29, #30 (`c5eaa86` : 30 changements pour 23 annoncés, écart R7 consigné ; `c8385ed` ajoute `/de/fotostudio/alphashot-xl` → XL G2), #31 ouverte (next.config → XL G2), #32, #33.
- Fin de journée : **Laurent : « l'Alphashot XL ancienne génération et l'Alphashot XL G2 coexistent »** → D29 `SUSPENDED`, #31 fermée, `e112460` retire la ligne de #30, D30 réécrite « hors périmètre » ; fusion de #29, #30, #32, #33 (17:49-18:10) ; les 13 redirections XL → XL G2 déjà en production restent.

### 3.9 25/09

- 05:07 UTC : Worker P0-D/E déployé (`27b0153c`), « CLOSED », 16 témoins + 3 variantes PASS (verdict rapporté), 11 chemins non testés. 06:19 : P0-I appliqué. 05:46 : #34 arbitrages Q2, Q4, Q6, Q12-Q15 → D32-D36 ; Q2 et Q6 closes « selon Laurent ». 08:38 : #35 P0-K (par mémoire, pas par diff).
- 12:37 : `b60f7b1` (SJ) article « Migrer un ancien PackshotCreator » (fr, en, de-ch) avec mensualités (EUR, CHF), slug EN `migrate-old-packshotcreator-studio` ; 14:21 fusion #36 ; 14:58 `c9f7e2c` correctif ; 15:05 fusion #37 (slug `migrate-legacy-…`), leçon au JOURNAL, pas de piège, pas de test.
- Instruction CHF de Laurent (« Laurent valide le CHF ») : présente dans le prompt ChatGPT du premier post-mortem ; **absente du dépôt et des fils lisibles** — NON PROUVÉ DANS LES SOURCES DU PROJET.
- 19 h : premier post-mortem ; 21 h - 26/09 07 h : ce rapport.

---

## 4. Inventaire des erreurs démontrées

Une ligne = une erreur prouvée par une source primaire. Les hypothèses non prouvées sont en section 25, pas ici. « Origine » = qui a produit l'erreur ; « Détection » = par quoi et quand ; « Récidive » = probabilité qualitative si rien ne change, [Inférence] fondée sur les motifs observés.

| # | Erreur | Origine | Impact | Détection | Correction | Récidive |
|---|---|---|---|---|---|---|
| E1 | « G2 remplacé par XL G2 » traité comme fait produit ; 3 redirections `alphashot-g2 → alphashot-xl-g2` (`d8b4156`) validées et propagées | SJ (commit 30/06) ; Claude de projet (01/07, « fait acquis ») | Entrée de gamme (15 450 €) envoyée sur le modèle industriel (38 450 €) ; encore actif au 25/09 | Laurent, 01/07 (« toujours vendu ») | Fiche réintroduite le 07/08 (délistée) ; redirections **jamais retirées** ; question jamais close | Élevée : même motif rejoué le 17/09 |
| E2 | « Alphashot XL v2 → XL G2 » posé comme successeur ; 13 redirections Worker (17, 19, 23/09) | Claude de projet (prompt de nuit 17/09, lot B ; §7.3 19/09 « toute cible -v2 → xl-g2 » ; 23/09 « mes décisions ») ; Laurent (accord 23/09, D29 24/09) | XL v2 (18 950 €) et XL Pro v2 (22 450 €) redirigées vers XL G2 (38 450 €) en production ; tests verrouillent l'hypothèse | Claude Code 17/09 (écart R7 consigné, non bloquant) ; Claude de projet 24/09 (question à SJ, non déposée) ; Laurent 24/09 (« coexistent ») | D29 suspendue ; **13 redirections + 2 règles Next laissées** | Élevée |
| E3 | « `alphashot-xl-v2` absent de `MACHINES` » | Claude de projet, 18/09 | Rationalise E2 | `machines.ts:347` `delisted: true` (19/09, JOURNAL:709) | Corrigé en « délisté, servie en 200 » | Moyenne |
| E4 | Généralisation « `delisted` ⇒ successeur » sans lire `git log` (`1cbc569` lie XL v2 à XL Pro v2) | Claude Code lot F (23/09), sur consigne | 7 + 3 bascules | Laurent 24/09 | D29 | Élevée |
| E5 | Contre-audit @Seb : « P1-02 déjà fait par #26, garanti par tests » | Claude de Sébastien (24/09) | Endosse E2 dans le Master V3 (T05 « CLOS ») | Ce rapport | — | Moyenne |
| E6 | « Successeur de l'Alphashot XL v2 » (Q16) formulé comme question **fermée sur un nom**, puis tranché par Laurent sans Sébastien | Claude de projet (Q16), Laurent (D29) | D29, #31, ligne #30 | Laurent le soir même | Suspension | Élevée |
| E7 | Cadre du projet « Devise EUR, /de-ch compris » écrit contre le code (CHF depuis `fd112ce`, confirmé `c7224e5`) | Laurent (cadre 09/2026) ; source amont : fil 11/06 « no CHF » | Master V3 « CHF décidé » vs cadre ; D30 EUR ; patch 17 fiches | Contrôle R7 07:45 24/09 | D30 réécrite « hors périmètre » ; cadre **non corrigé** ; instruction CHF du 25/09 non écrite | Élevée : le cadre sera relu par la prochaine session |
| E8 | Patch CHF → EUR (17 fiches, `Offer`, `UnitPriceSpecification`) préparé sur une consigne (« classer toute valeur CHF comme incohérence à corriger ») sans question à SJ | Prompt « DÉCISION 2 » (Laurent, format ChatGPT) ; Claude de projet (exécution) | Quasi-incident sur des prix affichés (D13) | Laurent, soir du 24/09 | Patch abandonné | Élevée |
| E9 | 23 « équivalents exacts » `/de → /de-ch` dont hubs et slugs différents ; « Vérifié » = HTTP 200 seulement | Claude de projet P0-E ; consigne « précédent déjà décidé dans le Worker » | 17 mappings déployés le 25/09 ; 4/13 paires `EXACT_EQUIVALENT` à slugs différents | Ce rapport (agent dépôt) ; JOURNAL:441 | Aucune | Moyenne |
| E10 | Le 410 des 8 `/en/blog` TSX (arbitrage 07/07) n'existe que dans un message de commit ; `04-SURFACES` §2 (« réversible par conception »), `app/sitemap.ts:145` (« 301 vers /fr via le Worker »), D3/D9 disent le contraire | SJ (commit) ; Laurent (arbitrage non consigné) ; auteurs des docs postérieures | D9 « traduire puis réactiver » impossible sur `www` sans toucher le Worker ; P0 et premier post-mortem l'ont pris pour un angle mort | `git show d3620bd` (ce rapport) | Aucune | Élevée |
| E11 | Sept règles `next.config.ts` mortes sur `www` (`/en/packshot-secteur-*` ×6, `/en/packshot-packshotcreator`) : clés dans `GONE_PATHS` | SJ (avril) ; jamais relu | Documentation §4 fausse (« le Worker ne touche pas les URL préfixées ») | Ce rapport | Aucune | — |
| E12 | #36 : slug `migrate-old-…` → 410 par la règle `-old-` du Worker ; « rendu derrière Cloudflare : non regardé » ; fusion | Claude de Sébastien (25/09) ; cause : E11-doc, aucun test Next × Worker | 410 sur `www` ≥ 43 min (dépôt) + cache `max-age=86400` (durée réelle NON PROUVÉE) | Sébastien, Chrome, après fusion | #37 ; leçon au JOURNAL seulement | Élevée : motifs `-mod`, `/pages/`, `/resources/`, `/commun/`, `/amp` toujours non documentés |
| E13 | #36 : mensualités (EUR, CHF) dans le corps d'un article et sa FAQ (cadre « jamais dans articles » ; D26.5 « prix = données structurées uniquement ») ; sans D16, sans Rayon | Claude de Sébastien / Sébastien | Prix affichés sans validation tracée ; contradiction avec le constat de conformité du 30/06 | Ce rapport | Aucune | Moyenne (décision délibérée de SJ : NON PROUVÉE) |
| E14 | R4 « la production n'est pas testable par un script » rédigée sur une mesure hors liste blanche (17/17 en 403) ; a qualifié une conformité de « divergence » | Claude de Sébastien (16/09) | Deux jours de diagnostic Worker ; R4 encore telle quelle dans `CLAUDE.md` | 18/09 (D23) | D23 ; texte de R4 non amendé | Faible |
| E15 | Diagnostic bots IA : 03/09 SBFM → 17/09 « règle managée, SBFM infirmé » → 18/09 D22 SBFM → 24/09 P0-F rouvert sans élément nouveau ; `05-INFRA` porte la version du 16/09 | Claude de projet (17/09, 24/09) ; Claude de Sébastien (contre-audit sans D22) | D22 non exécutée ; trois versions lisibles | D22 ; ce rapport | Aucune | Élevée |
| E16 | Jeton Preview : créé et transmis par courriel le 16/09 ; jamais utilisé ; `ETAT` « toujours pas transmis » ; porte D12 jamais franchie pour 33 PR ; D15 décomptée dessus | Laurent (non-injection) ; ETAT (formulation) | Aucun contrôle Preview consigné | JOURNAL 20/09 ; ce rapport | Aucune | Élevée |
| E17 | `vitest` et Playwright hors CI ; `eslint` `continue-on-error` ; aucun workflow après fusion | SJ (workflows 16/09) ; jamais amendé | Tests contradictoires non détectés (E19) | Ce rapport | Aucune | — |
| E18 | Deux commits documentaires poussés directement sur `main` (`bc81d9a` 20/09, `da2796f` 23/09) contre D12 (« pousser directement sur `main` » interdit) | Claude Code (Laurent) | Journal de déploiement hors PR, hors garde | Ce rapport | Aucune | Moyenne |
| E19 | `e2e/redirections.spec.ts` affirme `/de → /en`, `/de/fotostudio/alphashot-g2 → /en/…`, XL → `xl-v2`, chaîne `/en/photo-studio/alphashot-g2` à deux sauts ; contredit le Worker depuis `d3620bd` ; signalée périmée le 01/07 | SJ (spec) ; jamais corrigée | Une suite « vraie » et une suite « fausse », aucune en CI | 01/07 ; ce rapport | Aucune | — |
| E20 | Commentaires de code faux : `i18n/routing.ts:11` (« DE/ES/NL → blendai.studio », aucune règle), `app/sitemap.ts:145`, `next.config.ts:40-51` (doctrine partielle) | SJ | Une IA qui lit le code y trouve des « faits » faux | Ce rapport | Aucune | — |
| E21 | 98 clés `GONE_PATHS` en URL absolue et 12 clés avec query inatteignables par `pathname` (depuis `6df8f9b`) ; 59 doublons GONE × redirection | SJ (resync 07/07) | Code mort maintenu par un test (`DOUBLONS_GONE_CONNUS`) | 23/07 ; 23/09 | Décision « on n'y touche pas » (23/09) | — |
| E22 | Contrôles de production annoncés, jamais consignés : Worker #16 (20/09), lot F (23/09), Chrome `www` #22, #29, #32 ; P0-D/E : 11/30 chemins non testés, sortie non reproduite | Laurent (contrôle) ; Claude Code (consignation) | Aucune preuve du chemin visiteur dans le dépôt | JOURNAL:566, 633, 535 ; ETAT:46, 47 | Aucune | Élevée |
| E23 | Clôtures par silence : Q2, Q6 « selon Laurent » ; D15 « confirmée tacitement » ; 0 réponse de Sébastien dans la boîte | Laurent, Claude de projet | Engagement de SJ sans preuve de lecture | JOURNAL:280 | Aucune | Élevée |
| E24 | Q16-Q18 formulées dans un chat, jamais déposées ; « absence acceptée par Laurent le 24/09 » ; D11 violée aussi par `curl.exe` lot F (fichier projet), P0-B/P0-C, contre-audit, ChatGPT | Claude de projet, Laurent | Décisions produit prises hors dépôt | ETAT:144 | Aucune | Élevée |
| E25 | P0-K resync « par connaissance » ; C13 « clos le 19/09, traité par la PR accents » (#23 fusionnée le 20/09 ; texte présent le 23/09) ; `06-CHANTIERS` « arrêté au 19/09 » | Claude de projet (19/09, 25/09) | ~20 lignes périmées (section 16) | État des lieux 23/09 ; agent dépôt | Aucune | Élevée |
| E26 | Master V3 : hiérarchie « code > Git > décisions » sans case pour le fait métier ; P0-F contre D22 ; §37 vs D15 ; « CHF décidé » ; T05 « CLOS » | Claude de projet (24/09) | Endosse E2, E7, E15 | Ce rapport | Aucune | Moyenne |
| E27 | Mémoire persistante fausse : « Sébastien owns all deployments via wrangler » (3 déploiements par le Claude de Laurent), « Language selector BUG not yet fixed » (C1 close 16/09), « RESYNC pending » (×3 faites), « Master V3 remplace les anciens audits » | Passe mémoire / sessions | Relue par chaque session | Ce rapport | Aucune | Élevée |
| E28 | Prompts inducteurs : « vérifiées : répondent 200 » (mauvais attribut), « ouvre quand même la PR » (annule R7), « Successeur de… » (présuppose), « classer comme incohérence à corriger » (conclusion dans la consigne), « Résiduel confirmé » (qualification avant jugement) | Claude de projet, Laurent, ChatGPT (forme) | E2, E8 | Premier post-mortem | — | Élevée |
| E29 | Mesures confondues : 13 PR applicatives + 3 déploiements Worker + #36/#37 entre le 16 et le 25/09 sur les familles de pages des fenêtres d'octobre | Tous | Aucune attribution causale possible | Ce rapport | Aucune | Certaine si rien ne change |
| E30 | Quatre expositions de secrets (23/07 fil ; 02/09 fil ; 16/09 courriel ; 20/09 fil + session) | Laurent (collages), Sébastien (courriel) | Révocations ; dépôt public | Chaque fois par le Claude de projet | Révocations | Moyenne |
| E31 | Copies de fichiers du projet prises pour le dépôt : `index.js` du projet (03/09 : « prod 1 053 vs projet 1 143 »), copie « 301 fixe » (14/07), `index.de-ch.js` 71 entrées (23/07) | Claude de projet | Diagnostics de « divergence » sur une base périmée | 23/07, 14/07, 18/09 | R5 + resync | Moyenne |
| E32 | « 30 chemins `/de` → `/en` » (30/06) : bug annoncé, Worker « corrigé » livré, infirmé le lendemain (confusion de tables) | Claude de projet | Un correctif inutile préparé | Simulation 01/07 | Retiré | Moyenne |
| E33 | Cache : 410/301 du Worker `Cache-Control: public, max-age=86400` ; 3xx d'origine en cache edge 86 400 s ; jamais intégré aux fenêtres de contrôle (hors piège B2) ; purge Cloudflare oubliée au-delà de juillet | SJ (`6646787`), tous | Un correctif de redirection est invisible jusqu'à 24 h | 24/07 (purge), ce rapport | Aucune | Élevée |
| E34 | Locales : 28 ternaires `lang === 'fr' ?…` dont 18 sans branche de-ch ; `og:locale` `en_US` sur `/de-ch/academy` ; `courseSchema` `inLanguage: 'fr'` ; meta descriptions de-ch mixtes | SJ (code) ; P0-A partiel | Signaux de langue faux sur de-ch | P0-A 24/09 ; premier post-mortem | `websiteSchema` seul corrigé | — |
| E35 | Faits d'entité divergents : `foundingDate` 2004 (D33 : 2001), « 15 ans / 20 ans / 25 ans », adresse Lyon vs D1, `AggregateOffer` EUR sur `/de-ch` vs fiches CHF, FAQ wine « 500 CHF » vs « 500 EUR » | SJ (code) ; personne ne tient le registre | Données structurées contradictoires | 23-25/09 | D33 décidée, non exécutée | — |
| E36 | Dettes de juillet jamais traitées ni requalifiées : `noindex` du calculateur annoncé par `robots.txt` non implémenté (24/07, encore vrai le 23/09), `datePublished` des avis tous au 08 (24/07, encore vrai le 23/09), 307 internes, `[object Object]` `ItemList` (état au 25/09 : NON VÉRIFIÉ) | Tous | Constats redécouverts à chaque audit | 24/07, 23/09 | Aucune | Élevée |
| E37 | D18-D20 rédigées par une IA (prompt de nuit), « décidé par : non renseigné », « proposées » depuis le 17/09 ; D19 utilisée par le TDE/C15 comme si en vigueur | Claude de projet | Décisions fantômes | Ce rapport | Aucune | Moyenne |
| E38 | Décompte des PR « touchant le site » : 16 selon la règle docs/.github, 13 applicatives ; le premier post-mortem écrivait 14 | Premier post-mortem | Chiffre imprécis | Agent dépôt | Corrigé ici | — |

---

## 5. Quasi-incidents (erreurs interceptées avant conséquence)

| # | Quasi-incident | Ce qui l'a arrêté | Date | Leçon consignée ? |
|---|---|---|---|---|
| Q-A | P0 du 06/06 « OLD clicks → 0 » aurait détruit 59 % du trafic de marque ; P3 aurait redirigé une landing forte vers une URL faible | Relecture critique de Laurent | 06/06 | Non (fil seulement) |
| Q-B | « Bug de duplication `/X` vs `/fr/X` » = découverte infra majeure | 17 `curl.exe` de Laurent, tous 301 | 25/06 | Règle « fenêtre ≥ mi-mai » (mémoire) |
| Q-C | Activation du Worker `/de → /de-ch` alors que `feat/de-ch-locale` n'était pas en prod : `/de/*` seraient partis en 307 → 410 (cluster schmuck ~7 900 impr.) | Séquencement écrit (« tu ne touches pas au Worker ») + `curl.exe` de contrôle | 29/06 | Non |
| Q-D | Variante B (fallbacks neutres) fondée sur « `/de-ch/blog` en 410 » | `curl.exe` → 200 → Variante A | 29/06 | Non |
| Q-E | Worker « corrigé » pour 30 chemins `/de` → `/en` (bug inexistant) | Simulation exhaustive, 0 changement | 01/07 | Non |
| Q-F | G2 → XL G2 comme fait produit | Objection de Laurent (« toujours vendu ») ; **rattrapage partiel** : fiche réintroduite, redirections laissées | 01/07 → 07/08 | Non |
| Q-G | « Tout `/en/blog` en 410 » (lettre de Laurent) aurait détruit 45 traductions EN vivantes | Raffinement de Sébastien (45 → EN, 14 → 410), validé par Laurent | 07/07 | Message de commit seulement |
| Q-H | Déploiement du `src/index.js` du dépôt (sans Variante A) aurait régressé `/de → /de-ch` | Constat D1 du 01/07 ; resync du 07/07 | 01-07/07 | R5, D4 |
| Q-I | Liste Bulk Redirects (3 750, 1 201 soft-404, 2 008 cibles mortes) réactivée aurait écrasé 1 022 mappings | Analyse 24/07, règle laissée désactivée, suppression recommandée | 24/07 | Non (0 entrée au 18/09) |
| Q-J | RSC « P0 absolu » : correctif Worker prêt | `curl.exe` (HTML plein) → non déployé | 22/07 | Mémoire |
| Q-K | R4 aurait fait qualifier la production de « divergente » durablement | D23 (liste blanche IPv6) | 18/09 | D23 |
| Q-L | Prompt de nuit lot B : consigne XL → G2 contredite par le dépôt | Claude Code consigne l'écart R7… **puis applique** (règle 5) ; interception manquée | 17/09 | JOURNAL |
| Q-M | Patch P0-D/E V1 avec `node_modules` | Contrôle `grep node_modules` avant livraison | 24/09 | Non |
| Q-N | P0-E : 23 changements annoncés, 30 réels ; `/studio-photo/` non demandé | Simulation différentielle exhaustive de Claude Code ; écart R7 consigné | 24/09 | JOURNAL |
| Q-O | Variante `/amp` du `-22` passait de 410 à 404 | Relecture (`c8385ed`) | 24/09 | JOURNAL |
| Q-P | D29 : #31 (next.config → XL G2) et ligne `/de/fotostudio/alphashot-xl` dans #30 | Laurent (« coexistent ») → #31 fermée, `e112460` | 24/09 | DECISIONS (statut) |
| Q-Q | Patch 17 fiches CHF → EUR (données structurées `Offer`) | Retournement de D30 le soir | 24/09 | Non (cadre EUR intact) |
| Q-R | Jeton Cloudflare collé dans le fil | Claude de projet : « compromis, à révoquer » | 20/09 | Non |
| Q-S | Q13 (retours, livraison) : rien codé avant réponse humaine | Modèle Lm appliqué | 19-25/09 | D32 |
| Q-T | #37 : nouveau slug testé contre `shouldReturn410` extrait avant fusion | Claude de Sébastien | 25/09 | JOURNAL (pas de piège, pas de test) |

Constat : 20 quasi-incidents, 6 arrêtés par un humain qui contredit, 8 par un contrôle mécanique exhaustif, 3 par une relecture ; 4 leçons seulement sont dans un fichier du dépôt (D4/R5, D23, D32, JOURNAL) ; aucune n'est dans `03-PIEGES.md` avec un test.

---

## 6. Erreurs attribuables au Claude de Laurent / ChatGPT (démontrables)

**Claude de projet (Laurent)** : E1 (01/07, propagation), E2 (prompt 17/09, §7.3 19/09, « mes décisions » 23/09), E3, E6 (Q16 fermée sur un nom), E7 (cadre : rédaction), E8 (exécution du patch), E9, E15 (17/09 « infirmé », 24/09 P0-F), E24, E25, E26, E27 (contenu de mémoire), E28, E31, E32, E37 ; étiquette « [Vérifié] » sur un choix produit (19/09) ; « Résiduel confirmé » (24/09) ; règle 5 du prompt de nuit ; « Le P0 est terminé côté exécution » (24/07) ; « Le socle est clos et validé » (25/06) ; « C1, C2, C3, C12, C13 clos » (19/09).

**Claude Code (Laurent)** : E4 (généralisation sans `git log`), verrouillage par tests (lot F), application d'une consigne contredisant le dépôt (R7 signalée, non bloquante), E18 (pushs directs), E22 (consignation « à faire »), E25 (P0-K par connaissance). À son crédit : tous les écarts R7 consignés (#16, #26, P0-D/E), toutes les simulations exhaustives, tous les rollbacks nommés, `node_modules` retiré.

**ChatGPT** : aucune erreur démontrable dans les sources du projet — aucune sortie n'y est tracée, hormis les deux prompts de ce fil. Sa forme est reconnaissable dans le prompt « DÉCISION 1-3 » du 24/09 (E8, E28) : NON PROUVÉ que ChatGPT en soit l'auteur. Son influence sur les décisions viole D11 par construction (aucune trace dans le dépôt).

---

## 7. Erreurs attribuables au Claude de Sébastien (démontrables)

- E14 (R4, 16/09).
- E5 (contre-audit 24/09 : « garanti par tests ») ; diagnostic bots repris du 16/09 sans lire D22 ni le JOURNAL des 17-18/09 ; « 79 URL /de → /en ou 410 » présenté comme problème courant alors que `d3620bd` les route vers `/de-ch` depuis le 07/07.
- E12 (#36 : slug réservé, « rendu derrière Cloudflare : non regardé », fusion en 1 h 44).
- E13 (#36 : prix dans l'article, sans D16, sans Rayon) — décision délibérée de Sébastien : NON PROUVÉE.
- Leçon de #37 consignée au JOURNAL seulement.
- Quatre entrées du 16/09 sans rubrique « Supposé » (JOURNAL:1123, 1177, 1194, 1257) ; C1 close avec « redirections du Worker couvertes par aucun contrôle » en « Non regardé ».

---

## 8. Erreurs ou dettes préexistantes (à ne pas attribuer aux travaux récents)

| Dette | Origine | Depuis | État au 25/09 |
|---|---|---|---|
| Règles génériques 410 (`-mod`, `-old-`, `/ftp/`, `/resources/`, `/pages/`, `/commun/`, `/en/en/`, `/industry/…/examples-`, `/amp`) non documentées | `9a1b1e9`, `f979d88`, `4a322ed` (SJ, avril) | 13-18/04 | Actives ; cause de #36 ; aucune liste dans `docs/` |
| Ordre d'évaluation : tables avant `shouldReturn410` → 59 doublons GONE inertes ; 98 URL absolues + 12 clés query inatteignables | `6df8f9b` (resync 07/07) | 07/07 | Maintenus par test |
| `e2e/redirections.spec.ts` périmée ; Playwright sur `localhost:3000` sans Worker | SJ | ≤ 28/03 ; 12/06 | Inchangée |
| Sept règles `next.config.ts` mortes (E11) ; deux court-circuitées (l. 69, 151) ; deux vers fiche délistée (l. 61, 70) | SJ | ≤ 28/03 | Inchangées |
| `/de/impressum-copy` → `/fr/mentions-legales` (seule cible hors `/de-ch`) | `d3620bd` | 07/07 | Non justifié |
| Sélecteur de langue (~470 liens vers non-200 ; DE-CH → `/en`) | Code initial | ≤ 26/06 | Corrigé 04/09, fusionné 16/09 (#3) |
| `[object Object]` ×8 dans `ItemList` de `/fr` ; `datePublished` des avis au 08 ; 307 internes (`/fr/calculateur`, `/de-ch/contact`) ; `noindex` calculateur non implémenté ; HSTS dupliqué ; `Cache-Control: no-store` sur pages indexables | Code initial | 24/07 (audit `curl.exe`) | `datePublished` et calculateur encore présents le 23/09 ; les autres : NON VÉRIFIÉ |
| `foundingDate` 2004 ; Organization à Lyon ; `inLanguage` binaire ; 28 ternaires | Code initial | ≤ 06/2026 | D33 décidée ; P0-A partiel |
| Prix Orbitvu dans 5 articles et « exclusif » ×12 | Contenu initial | ≤ 30/06 | Corrigés le 30/06 (`3cfa2e7`, `74dff0c`) ; résidu « studio Orbitvu + BlendAI (35 000€ » l. 533 de `blendai-vs-flair-ai` : conformité NON VÉRIFIÉE |
| Absence de test Next × Worker ; absence de CI sur les tests | Architecture | Depuis avril ; CI depuis 16/09 | Inchangée |
| Deux catalogues machines (`ROICalculator/lib/machines.ts`, `machine-selector/lib/machines.ts`) | Code initial | — | Double source de faits produit |
| `gsc_metrics_device` figée ; `gsc_metrics_country` ≈ 21-26 % des clics ; pas de `page × country` | Pipeline n8n | 20/06 ; toujours | KPI FR+CH non mesurable en base |
| Bulk Redirects (3 750), règles Cloudflare 1-3 catch-all, sous-domaines legacy | Migration mai | Mai-juillet | Traités 23-24/07 |
| Secrets en clair dans des fils | Pratique | 23/07 | Récidive 02/09, 20/09 |

---

## 9. Interventions humaines qui ont évité une erreur

| Date | Qui | Intervention | Effet |
|---|---|---|---|
| 06/06 | Laurent | Audit critique de quatre erreurs du playbook | P0 « OLD → 0 » et P3 retirés |
| 25/06 | Laurent | 17 `curl.exe` | Faux bug de duplication infirmé |
| 29/06 | Laurent | `curl.exe` `/de-ch/blog` = 200 ; respect du séquencement | Variante A ; pas de 410 sur `/de` |
| 01/07 | Laurent | « L'Alphashot G2 est toujours vendu » | Prémisse produit contestée (rattrapage partiel) |
| 07/07 | Sébastien | Raffinement « pas d'équivalent EN → 410 » au lieu de « tout en 410 » | 45 traductions EN préservées |
| 07/07 | Laurent + Sébastien | « repo = source unique », acté des deux côtés | Fin des divergences dashboard/dépôt (D4 le 24/07) |
| 22/07 | Laurent | `curl.exe` HTML plein | RSC déclassé, correctif Worker non déployé |
| 23/07 | Laurent | Tests `curl.exe` sous-domaines ; correction de deux inférences (308, `cdn.`) | P0 sous-domaines ajusté avant déploiement |
| 24/07 | Laurent | Purge cache, règles Bulk laissées désactivées | Pas d'écrasement des mappings |
| 17/09 | Claude Code (sur consigne de Laurent : R7) | Écarts consignés (17/22 existaient ; xl-v2 → xl-g2) | Trace, pas d'arrêt |
| 18/09 | Laurent | `curl.exe` 14 URL lot C | D21 ; D23 |
| 23/09 | Laurent | GO séparés fusion / déploiement | Deux portes |
| 24/09 | Laurent | « XL v2 et XL G2 coexistent » ; « geler, pas inverser » | D29 suspendue ; #31 fermée ; pas de rollback à chaud |
| 24/09 | Laurent | Retour sur D30 | Patch 17 fiches abandonné |
| 25/09 | Laurent | Q13 → D32 : faits commerciaux donnés avant code | Modèle à suivre |
| 25/09 | Sébastien | Détection du 410 dans Chrome ; #37 en 43 min | Incident borné |
| 25/09 | Laurent | Question du post-mortem et de la deuxième passe | Ce rapport |

---

## 10. Redirections

Source : inventaire commit par commit du clone (`git log -S`, `git blame`, simulation `worker.fetch` du fichier de `main`, même méthode que `lot-f.test.ts`). L'inventaire complet (117 clés `/en/blog`, 27 `/amp`, 30 images, 50 `DE_CH_MAP`, 61 règles `next.config.ts`, historique 410 ↔ 301) est livré à part : `PSC_INVENTAIRE_REDIRECTIONS_DEPOT_2026-09-25.md`. **Tout ce qui suit décrit le dépôt à `1a8c3de` ; l'état de `www` est NON VÉRIFIÉ (R4).**

### 10.1 Architecture (faits)

- 11 tables dans `cloudflare-worker/src/index.js` (2 038 lignes) : `BLOG_EN_REDIRECTS` 33, `GUIDE_EN_REDIRECTS` 4, `GONE_PATHS` 644, `PASSTHROUGH_HOSTS` 3, `HOST_HOME_MAP` 19, `DE_CH_MAP` 50, `LEGACY_REDIRECTS` 773, `PRODUIT_REDIRECTS` 4, `PRODUCT_REDIRECTS` 12, `HOWTO_REDIRECTS` 118, `LANG_SPECIFIC_REDIRECTS` 139.
- Ordre d'évaluation : passthrough → hôtes legacy → `/` → `/de*` (`DE_CH_MAP` + replis) → `LEGACY` → règles de préfixe (`/blog`, `/guide`, `/industrie/`, `/studio-photo/`…) → `/secteur/` → `PRODUIT` → `PRODUCT` → `HOWTO` → `/blog/<slug>` → `/industry` → `/es|/nl` → **`shouldReturn410` sur tout chemin** → hôte legacy → proxy (cache 3xx 86 400 s, HTML 60 s).
- `next.config.ts` : 61 règles littérales + 17 générées, évaluées **après** le Worker (à l'origine).
- `shouldReturn410` : `GONE_PATHS`, suffixe `-mod`, motif `-old-`, préfixes `/ftp/ /resources/ /pages/ /commun/`, `/en/en/`, `/amp` (base dans `GONE`), `/industry/…/(examples|ejemplos|beispiele)-`.

### 10.2 Matrice par famille

| URL / famille | Proposition initiale | Décision finale connue | Exécutée ? | Vérifiée ? | Source | Certitude |
|---|---|---|---|---|---|---|
| Ancienne structure `/de/*` (catch-all → `/en`, Worker 19/05) | 11/06 : conquête de-ch ; 29/06 : Variante A `/de → /de-ch` (71 entrées, Claude de projet) | 07/07 `d3620bd` : 33 entrées reconstruites depuis la prod + replis par segment ; 24/09 `c5eaa86` : +17 « équivalents » ; 25/09 déployé | Oui (07/07 ; 25/09) | 07/07 : ~80 URL testées par SJ ; 25/09 : 16 témoins LW (verdict) | commit, JOURNAL:290-335 | L1 dépôt élevée ; L4 prod partielle |
| Replis `/de/fotostudio|studio-photo/*` → `maschinen-finder` ; `/de/blog/*` → `/de-ch/blog` ; `/de/guide*` → `/de-ch/guide` ; `/de/branchen|industrie*` → `/de-ch/branchen` ; sinon `/de-ch` | Variante A | En vigueur | Oui | Simulation | `index.js:829-836` | Élevée |
| `/de/fotostudio/alphashot-xl` | 24/09 `c8385ed` → XL G2 (D29) | `e112460` : retirée le jour même ; repli → `maschinen-finder` (REVIEW) | Oui (repli) | Témoin LW 25/09 : 301 `maschinen-finder` | JOURNAL:319, test `p0-de-ch-heritage:81-85` | Élevée |
| `/de/studio-photo/alphashot-xl` | 07/07 → `xl-v2` | 19/09 `38345f3` → `alphashot-xl-g2` ; D29 suspendue, laissée | Oui (déployé 20/09) | Témoin LW 25/09 : 301 XL G2 | JOURNAL:320 | Élevée (dépôt) ; équivalence NON PROUVÉE |
| `/de/fotostudio/alphashot-g2` | 13/04 → `/en/studio-photo/alphashot-g2` | 30/06 → `xl-g2` ; 07/07 → `/de-ch/fotostudio/alphashot-xl-g2` | Oui | e2e (périmée) affirme `/en/…` | `DE_CH_MAP:789` | Élevée ; équivalence NON PROUVÉE |
| `/de/impressum-copy` → `/fr/mentions-legales` | `d3620bd` | Seule cible hors `/de-ch` ; « exception correcte » selon le fil 07/07 | Oui | Non | `DE_CH_MAP:803` | Moyenne |
| 30 clés `/de/*` retirées sans clé exacte (8 blog, 5 branchen, 9 guide, 8 `packshot-*`) | — | Servies par les replis génériques | Oui | Simulation | `d3620bd`, inventaire §8.H | Élevée |
| Anciennes URL FR sans préfixe (`/studio-photo/*`, `/industrie/*`, `/blog`, `/guide`, `/academy`, `/accessoires*`, `/packshot-packshotcreator*`) | `96f7e06`, `b77f601` (avril) | Règles de préfixe → `/fr/…` ; 24/09 `frHit` (un saut si clé `LEGACY` `/fr`+path) | Oui | Simulation ; témoin `/industrie/bouteilles` 25/09 | `index.js:1618-1642` | Élevée |
| `/studio-photo/alphashot-xl-v2` (sans préfixe) | — | Règle générique → `/fr/studio-photo/alphashot-xl-v2` (fiche délistée, 200) | Oui | Simulation | inventaire §3.1 | Élevée |
| Landings `/packshot-amazon`, `/packshot-e-commerce`, `/packshot-mode` | 03/09 : cibles FR ; 17/09 #16 | `3213579` → `/fr/packshot-*` (au lieu de blog/guide) | Oui (déployé 20/09) | Contrôle LW « déclaré, non consigné » | JOURNAL:566 | Dépôt élevée ; prod NON PROUVÉE |
| Anciennes URL EN : 55 `/en/blog/<slug FR>` | 10/06 : 8 → `/fr/blog` ; 07/07 « tout en 410 » (lettre LW) | 07/07 : 45 → traduction EN existante (`LEGACY`), **14 → 410** dont 8 TSX statiques noindex ; 23/09 `orbitvu-vs-ortery…` sorti de GONE (D21) ; `produkt-vorstellen…` → FR (lot C) | Oui | 18/09 : 14 URL lot C, 0 écart (`curl.exe`) | `d3620bd`, D21, `unicite-tables.test.ts` | Élevée ; **intention 410 des 8 TSX = arbitrage LW 07/07, non consigné hors commit** |
| Les 8 TSX (`blendai-vs-flair-ai…`, `blendai-vs-photoroom…`, `comment-calculer-le-roi…`, `financement-formation-opco…`, `formation-photo-produit…`, `guide-achat-studio-2026`, `ia-photo-produit-guide-2026`, `orbitvu-vs-concurrents`) | noindex (`7e351b7` 23/05) + 301 (juin) | 410 Worker (07/07) **et** noindex Next (toujours) ; `sitemap.ts:145` dit « 301 » | Oui | Non (www) | inventaire §3.2, §7 | Élevée |
| 3 slugs `NOINDEX_EN_BLOG_SLUGS` restants (`photographie-2d…`, `photographie-3d…`, `photographie-de-produits-a-360…`) | — | Aucune règle Worker ; servis noindex à l'origine | — | Simulation | inventaire §7 | Élevée |
| Lot F annexe K (21 mappings du 03/09) | 03/09 | 19/09 : 1 conforme, 2 à corriger, 14 absentes, 4 en 410 → `90a43ec` : +19 `LEGACY`, 12 cibles, **4 sorties de `GONE`** (410 → 301) | Oui (déployé 23/09) | `curl.exe` LW : dans un fichier du projet, pas au dépôt | JOURNAL:539-570, ETAT:46 | Dépôt élevée ; prod NON CONSIGNÉE |
| Lot F : 10 entrées `alphashot-xl-v2 → xl-g2` (7 `LEGACY`, 1 `PRODUCT`, 2 `LANG_SPECIFIC`) + 2 (#16) + 1 (`DE_CH_MAP`) = **13** | 17/09 prompt de nuit ; 19/09 §7.3 ; 23/09 accord LW | D29 suspendue : laissées | Oui (20 et 23/09) | Tests (`lot-f`, `legacy-redirects`) ; prod non consignée | D29 l. 158-168 | Dépôt élevée ; **équivalence contestée par LW** |
| `next.config.ts` l. 61, 70 : `/en/photo-studio|studio-photo/alphashot-xl` → `alphashot-xl-v2` | 24/09 #31 → XL G2 | #31 fermée ; laissées (D29) | Oui (inchangées) | e2e (hors CI) l. 65/75 | inventaire §4 | Élevée |
| `alphashot-g2` : `/fr|/en|/de-ch/…/alphashot-g2` → `xl-g2` (`LEGACY`) ; `/produit/alphashot-g2`, `tocadiscos-orbitvu-g2` ×2, `/studio-photo/alphashot-g2` | 30/06 (SJ) | 01/07 : « retirer si G2 toujours vendu » ; 07/08 : G2 réintroduite **délistée, repli conversationnel** ; redirections laissées | Oui | 01/07 : 13/13 `curl` (sur la prémisse fausse) | `d8b4156`, `9aa1e77`, `e385e14` | **Décision produit jamais close** |
| `/en/photo-studio/alphashot-g2` | — | Next l. 66 générique → `/en/studio-photo/alphashot-g2` → Worker → XL G2 : **chaîne de deux 301**, affirmée par l'e2e | Oui | e2e | inventaire §4 | Élevée |
| Mappings vers hubs (`/fr/industrie` 37, `/en` 34, `/fr/studios-photo-automatises` 26, `/fr/academy` 24, `/fr/contact` 15, `selecteur-machines` 14, `/fr` 13, `/fr/blog` 11…) ; `DE_CH_MAP` : 9 vers hub | Historique | En vigueur ; P0-E : 84 `/de` « sur hub faute d'équivalent » | Oui | — | inventaire §3.5 | Élevée (dépôt) |
| Cibles Worker vers `/en/industrie/<slug>` en `NOINDEX_EN_INDUSTRIE_SLUGS` (10 slugs) | — | 301 vers du noindex (accepté le 07/07 : « bon pour l'UX, neutre pour l'indexation ») | Oui | — | inventaire §8.I | Élevée |
| URL 410 → 301 (`/home`, `/index.asp`, `/it`, 07/05 ; 4 clés lot F 23/09 ; `…-22` 24/09) | — | Faites | Oui | Simulation | inventaire §8.A | Élevée |
| URL 301 → 410 (14 `/en/blog` 07/07) | — | Faite | Oui | — | §8.B | Élevée |
| Chaînes supprimées : `/industrie/*` et `/studio-photo/*` à un saut (`frHit`, 24/09) ; `/en/quote-second-hand-photo-studio` avec/sans barre | — | Faites | Oui (25/09) | Témoin `/industrie/bouteilles` | JOURNAL:319 | Élevée |
| Doublons : 59 clés GONE × redirection (37 hors `/de`) ; `-22` | 10/06 signalé ; 23/09 « on n'y touche pas » | Conservés (variantes `/amp`) ; test les fige | Oui | Test | `unicite-tables.test.ts:56-122` | Élevée |
| Exceptions : 98 `GONE` en URL absolue, 12 clés avec query (inatteignables) | 23/07 signalé | Aucune décision | — | — | inventaire §1.2 | Élevée |
| AMP : 27 entrées + règle générique ; `/2018-guide-e-commerce-photos/amp` passe désormais à l'origine (clé retirée 23/09) | — | Non arbitré | — | Simulation | §3.4 | Élevée |
| Sous-domaines legacy : `HOST_HOME_MAP` 19 hôtes, `PASSTHROUGH_HOSTS` 3, route `*.packshot-creator.com/*` (dashboard, 23/07), règles Cloudflare 1-3 désactivées, DNS proxifiés | 23/07 P0 | En vigueur (D4) | Oui | 23/07 `curl.exe` LW ; 25/09 `videos.` 404 racine, `books.` 302, `trail.` 200 | JOURNAL:321, fil 24/07 | Élevée ; état DNS/règles live NON PROUVÉ |
| Images à backlinks : 281 liens (juillet) → 410 ; 30 clés fichiers dans `GONE` ; `/ftp/livre-blanc…pdf` → 301 (DA 49) | 23/07 | P0-D 24/09 : 28 URL en 410 avec backlinks dont 21 images, « KEEP_410 54 » | Oui | — | fil 23/07, P0-D | Moyenne (liste P0-D hors dépôt) |
| REVIEW laissés (`/de/workflow-management-shotflow`, `/de/altes-fotostudio`, `/de/automatisieren…`, `/de/produkte` → `/de-ch` ; `/de/guide/welche-einstellungen…` → `/de-ch/guide` ; `/packshot-packshotcreator/packshot-{mode,e-commerce}` → `/fr` ; `/de/fotostudio/alphashot-xl`) | P0-E | Inchangés, testés comme tels | Oui | Test | `p0-de-ch-heritage:87-97` | Élevée |
| Liste Bulk Redirects `redirections_gsc` (Cloudflare) | Migration mai | Désactivée ; sans valeur (24/07) ; 0 entrée (18/09) | Suppression : NON PROUVÉE | — | fils 24/07, 18/09 | Moyenne |
| Racine `/` | 301 (12/04) → 302 conditionnelle (01/05) → 301 `/fr` (14/07, `b778a88`) | D28 | Oui | 25/09 témoin `/` → `/fr` | `lot-f:122` | Élevée |

### 10.3 Les 24 entrées `alphashot-xl*` / `alphashot-g2` (clé ou cible) à `main`

| Clé | Table | Cible | Introduction | Dernière modification |
|---|---|---|---|---|
| `/es/studio-photo/alphashot-xl` | GONE (morte) + LANG_SPECIFIC | `/en/studio-photo/alphashot-xl-g2` | `245f32f` 23/05 (xl-v2) | `e5a5dcc` 23/09 |
| `/nl/studio-photo/alphashot-xl` | GONE (morte) + LANG_SPECIFIC | `/en/studio-photo/alphashot-xl-g2` | `245f32f` | `e5a5dcc` 23/09 |
| `/de/fotostudio/alphashot-g2` | DE_CH_MAP | `/de-ch/fotostudio/alphashot-xl-g2` | `4d55141` 13/04 | `d3620bd` 07/07 |
| `/de/studio-photo/alphashot-xl` | DE_CH_MAP | `/de-ch/fotostudio/alphashot-xl-g2` | `245f32f` (xl-v2) | `38345f3` 19/09 |
| `/commun/packshot-3d.html` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | `245f32f` (xl-v2) | `90a43ec` 23/09 |
| `/de-ch/fotostudio/alphashot-g2` | LEGACY | `/de-ch/fotostudio/alphashot-xl-g2` | `d8b4156` 30/06 | — |
| `/en/studio-photo/alphashot-g2` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | `d8b4156` | — |
| `/fr/studio-photo/alphashot-g2` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `d8b4156` | — |
| `/fr/studio-photo/alphashot-xl` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `6df8f9b` 07/07 (xl-v2) | `3213579` 17/09 |
| `/fr/studio-photo/tocadiscos-orbitvu-g2` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `e89cac4` 07/05 (g2) | `d8b4156` |
| `/gamme-studio/…packshot-r3/specifications` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | `245f32f` (xl-v2) | `90a43ec` |
| `/product/maestrobot-studio-3d` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | `245f32f` (xl-v2) | `90a43ec` |
| `/produit/alphashot-g2` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `245f32f` (g2) | `d8b4156` |
| `/produit/alphashot-xl` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `245f32f` (xl-v2) | `90a43ec` |
| `/produit/packshotcreator-r3` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `245f32f` (xl-v2) | `90a43ec` |
| `/produit/studio-photo-sans-detourage-packshot-r3` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `245f32f` (xl-v2) | `90a43ec` |
| `/commun/packshot-pro-3d-hd.html` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | `245f32f` (selecteur) | `9aa1e77` (xl-v2) → `90a43ec` |
| `/studio-photo/alphashot-g2` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `9aa1e77` 24/07 | — |
| `/studio-photo/alphashot-xl` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `9aa1e77` (xl-v2) | `3213579` |
| `/studio-photo/tocadiscos-orbitvu-g2` | GONE (morte) + LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `245f32f` (410) | `9aa1e77` |
| `/gamme-studio/plateforme-360-grand-format-spin-o9t/presentation` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | `90a43ec` 23/09 | — |
| `/product/photo-studio-r3` | PRODUCT | `/en/studio-photo/alphashot-xl-g2` | `f979d88` 14/04 (xl-v2) | `e5a5dcc` |
| `/en/photo-studio/alphashot-xl` (Next l. 61) | next.config | `/en/studio-photo/alphashot-xl-v2` | ≤ 28/03 | — |
| `/en/studio-photo/alphashot-xl` (Next l. 70) | next.config | `/en/studio-photo/alphashot-xl-v2` | ≤ 28/03 | — |

Faits : 13 bascules xl-v2 → xl-g2 (`3213579` ×2, `38345f3` ×1, `90a43ec` ×7, `e5a5dcc` ×3) = liste de D29 ; 0 occurrence de `alphashot-xl-v2`, `alphashot-xl-pro`, `alphashot-xl-wine` dans le Worker ; `/en/studio-photo/alphashot-xl` n'a aucune règle Worker et tombe sur Next (→ xl-v2) : **divergence FR (→ G2) / EN (→ v2)** sur le même produit.

---

## 11. Locales FR / EN / DE-CH

**Erreurs passées (prouvées)** : catch-all `/de/*` → `/en` (mai-juin, effondrement des impressions CH) ; `/de-ch` en 307 → `/fr/de-ch` → 410 avant fusion de la locale (29/06, arrêté) ; sélecteur de langue DE-CH → `/en/<slug FR>` (~470 liens, juin-septembre) ; `inLanguage` `en-US` sur `/de-ch` (corrigé #29) ; témoignages EN/FR sur de-ch (corrigé #32) ; chaînes `/de-ch/industrie/<slug FR>` 307 → 404 (corrigées #26) ; meta descriptions de-ch mixtes ; `og:locale` `en_US` sur `/de-ch/academy` ; « ß » et « Angebot » (règles posées 11/06).

**Erreurs encore possibles** : 18 ternaires `lang === 'fr' ? … : …` sans branche de-ch ; `courseSchema` `inLanguage: 'fr'` ; `PipedriveContactForm` et sélecteur de machines typés `'fr' | 'en'` ; devise : CHF sur 17 fiches + `Offer`, EUR sur `AggregateOffer` de la gamme, « 500 CHF » vs « 500 EUR » (FAQ wine), « 3 000 CHF » (`QuestionEquipmentBudget`) ; `fr-CH` → même URL que `fr` (aucun signal suisse, position 48 en Suisse en juin) ; 45 URL FR sans équivalent EN publié ; `/en/industrie/*` hors sitemap et hors hreflang (24/07) ; D9 « traduire puis réactiver » bloquée par le 410 Worker sur 8 slugs ; Chrome traduit de-ch (piège B5) — le contrôle visuel de-ch demandé le 25/09 n'a pas pu être exécuté (extension non connectée).

**Garde-fous** : aucun test de locale en CI ; balayage « 0 chaîne FR/EN sur 48 pages de-ch » fait à la main dans les Data Packs ; `deChCoverage.ts` non testé contre le sitemap.

---

## 12. Worker / Cloudflare / Vercel — #36/#37 comme cas d'école

**Chaîne** : contenu (`content/blog/*.json`, `alternates.json`) → Next.js (`generateStaticParams`, `noindex`, hreflang) → sitemap → Vercel (`sysnext.vercel.app`, `cacheTtl`) → Worker (tables, `shouldReturn410`, cache 3xx/410 86 400 s) → Cloudflare (WAF, SBFM, règle IPv6 `966dd862`, edge cache HTML 60 s) → `www` → Google.

**#36** : article créé le 25/09 12:37 par le Claude de Sébastien (fr, en, de-ch), slug EN `migrate-old-packshotcreator-studio`. Contrôles faits : build, JSON, smoke sur l'origine (déduit du corps de PR, NON PROUVÉ). Non regardé (écrit) : « rendu derrière Cloudflare ». Fusion 14:21. Sur `www`, `shouldReturn410` (`path.includes("-old-")`, règle du 13/04) renvoie 410 avec `Cache-Control: public, max-age=86400` et `X-Robots-Tag: noindex, nofollow`. Détection : Sébastien dans Chrome. #37 : slug `migrate-legacy-…`, testé contre la fonction extraite de `main`, fusion 15:05. Durée côté dépôt : 43 min. Durée côté clients et edge : jusqu'à 24 h — NON PROUVÉE. Effet GSC : inconnu.

**Pourquoi la chaîne n'a pas été contrôlée** : (1) `04-SURFACES` §4 et piège E6 disent que le Worker « court-circuite tout ce qui n'a pas de préfixe » — faux pour `shouldReturn410` (l. 1990, tout chemin) et pour sept règles Next mortes (E11) ; (2) `smoke.mjs` exclut explicitement « les redirections legacy, les 410 et les sous-domaines » (l. 14-16) et cible l'origine ; (3) `verifier-consequences.mjs` classe `cloudflare-worker/` « NON testable en Preview » et n'exige qu'un texte de 80 caractères ; (4) aucun test « toute route Next passe le Worker » ; (5) le circuit éditorial de Sébastien n'a pas de checklist « nouveau slug » ; (6) `02-PROCEDURE` est écrite pour le Claude de Laurent.

**Ce que le même défaut touche déjà** : 8 `/en/blog` TSX (410 voulu le 07/07, non documenté ailleurs), 7 règles `next.config.ts` mortes, 3 `alphashot-g2` (décision produit ouverte), 13 XL (décision suspendue), motifs `-mod`, `/pages/`, `/resources/`, `/commun/`, `/ftp/`, `/en/en/`, `/amp` pour tout futur segment.

**Worker / Cloudflare (état)** : 3 déploiements en septembre (`167d7a15` 20/09, `05c5c47c` 23/09, `27b0153c` 25/09), tous par `wrangler deploy` depuis `main` sur GO LW, resync API octet par octet avant chacun ; rollback nommé ; aucun déploiement par la CI. WAF : règle d'accès IPv6 `966dd862` (20/06) ; règle `54a4b8c2` « Skip SBFM videos R2 » désactivée depuis le 23/07 (D22) — état live NON PROUVÉ ; D22 (Skip PerplexityBot UA + IP) non exécutée ; Amazonbot autorisé par `robots.txt` (23/09) ; SBFM actif (D22). Bulk Redirects : 0 entrée (18/09). Vercel : projet `sysnext`, `.vercel/project.json` obsolète (R3), Preview protégé par SSO, jeton de contournement jamais utilisé ; `sysnext.vercel.app` indexable (D36 décidée, non exécutée) ; ISR 188 fonctions ; `industrie/[slug]` en Cache MISS 100 % (17/09).

---

## 13. GSC / Supabase / n8n — P0-H, P0-I, P0-J et fiabilité de la mesure

- **P0-H** : `gsc_pull_bornes` réécrite (24/09, GO LW), 1 206 ms → 3 ms ; échecs M5 des 21 et 24/09 expliqués ; fenêtre 25/09 → 08/10 ; **ne pas toucher M5 ni `wf_expected` pendant la fenêtre** (P0-K).
- **P0-I** : 8 fonctions SQL (`app_blog_reconversion_list`, `app_gsc_opportunities`, `app_gsc_top_queries`, `app_kpi_loop`, `app_page_conversion_loop`, `gsc_candidates_vertical`, `gsc_quick_wins_json`, `gsc_tracking_weekly_json`) : motif `vercel|todovirtual|amazon|orbitvu\.nl` → `(^|\s)site:|vercel|todovirtual|orbitvu\.nl` ; 103 requêtes « amazon » réadmises (4 778 impressions), 3 requêtes `site:` filtrées ; md5 avant/après, rollback SQL au JOURNAL. **Non relus** : exécutions suivantes de M6 et `r3_measure_article`, nœuds n8n à filtre équivalent, tableaux de bord ; règle §4 du cadre du projet toujours « `amazon` exclu ».
- **P0-J** : `gsc_metrics_device` figée au 20/06 (2 sites), M5 ne porte que `c`, `p`, `q` ; différé après le 08/10 ; aucun watchdog.
- **Fiabilité** : `gsc_metrics_country` ≈ 21-26 % des clics ; l'API GSC ne rend ~25 % des clics dès qu'une dimension page est demandée ; `date` seule = interface ; KPI FR+CH lu dans l'interface (D24) ; `gsc_metrics_query` n'existe plus (archive seulement) ; `cf_traffic_daily` trouée 23/07 → 25/08 et arrêtée au 13/09 (planificateur n8n à l'arrêt depuis le 15/09 05:01 UTC, constat du 17/09 — reprise NON PROUVÉE ici) ; rétention n8n ≈ 14 jours : exécutions 3292-3311 et 3379 purgées vers le 03 et le 07/10 (export recommandé avant le 01/10) ; `M5 · Bots IA` sans code HTTP (P0-F non mesurable) ; `ai_bot_hits` sans statut ; `firewallEventsAdaptiveGroups` 3 jours ; jeton n8n GitHub sans date d'expiration relevée.
- **Fenêtres en cours** : #16 (~04/10), lot F (~07/10), P0-D/E (~09/10), P0-H (08/10), M5 marque (14-28/10), F5 (J0 non atteint). Toutes lisent les mêmes familles de pages que 13 PR applicatives, 3 déploiements Worker, #36/#37, un update Google d'août et une saisonnalité +44 % (P0-B).

---

## 14. Schema / données structurées

| Élément | État au 25/09 (dépôt) | Source | Problème |
|---|---|---|---|
| `Organization` | `foundingDate: '2004'` (`SchemaOrg.tsx:72`), adresse 254 rue Vendôme Lyon, `areaServed [FR, CH]`, 2 `ContactPoint` (CH : `availableLanguage` German), `sameAs` LinkedIn seul | code ; D33 | D33 : 2001 ; D1 « près de Lyon » (éditorial, pas balisage) ; claims « 15/20/25 ans » divergents ; `twitter.com/packshot` inactif, absent (conforme) |
| `WebSite.inLanguage` | fr-FR / en-US / **de-CH** depuis #29 (`lib/seo/locale-schema.ts`) | code | Corrigé à l'origine ; `www` non contrôlé |
| `courseSchema.inLanguage` | `'fr'` en dur (l. 398) | code | Non traité par P0-A |
| `Product` / `Offer` (51 fiches) | `price` = mensualité leasing (D7), `priceCurrency` = `currencyForLang` (CHF de-ch), `priceValidUntil` glissant, `sku` (#22) ; D26.5 « conforme » sans commande | code ; JOURNAL:606 ; D26-5 | Devise non décidée dans `DECISIONS` ; `hasMerchantReturnPolicy`/`shippingDetails` manquants (Q13 → D32, non exécutée) ; test résultats enrichis jamais lancé (Preview 302) |
| `AggregateOffer` gamme | 12 000-150 000 EUR, `offerCount` 16, y compris sur `/de-ch` | code | EUR sur une page dont les fiches sont en CHF |
| `Review` ×8, `aggregateRating` | Retirés de `/de-ch` (#32, `1c52eb7`) ; sur `/fr` : `datePublished` tous au 08 (24/07, 23/09) ; `publisher` Google | code, relevé 23/09 | Dates suspectes non traitées |
| `FAQPage` | fr/de-ch ; FAQ wine de-ch « 500 CHF » vs FR « 500 EUR » | code | Montant identique, devise différente |
| `ItemList` `/fr` | 8 URL `[object Object]` (24/07) ; `/de-ch` : 2 URL `/fr` sans équivalent | relevé 24/07, 23/09 | État au 25/09 NON VÉRIFIÉ |
| `Service` `/de-ch/branchen/schmuck` | segment `industrie/schmuck` non localisé (24/07) | relevé | NON VÉRIFIÉ |
| JSON-LD `LocalBusiness` (Store) | Saint-Bonnet-de-Mure sur `/contact` ; aucun sur `/fr` | code | Fiche Lausanne = tiers (23/09) |

Aucun schema n'est couvert par un test ; `smoke.mjs` ne compte que les blocs.

---

## 15. Contenu / claims / informations métier

### 15.1 Informations que les IA ne pouvaient pas deviner

| Information | Qui pouvait la valider | L'IA l'a-t-elle supposée ? | Conséquence |
|---|---|---|---|
| Coexistence Alphashot XL v2 / XL G2 ; XL Pro v2 comme voisin commercial | Sébastien (catalogue), Laurent (histoire) | Oui : « délisté ⇒ successeur » (17-23/09) ; question rédigée le 24/09, non déposée | 13 redirections + D29 |
| Statut de l'Alphashot G2 chez Orbitvu ; réintroduction comme repli (07/08) | Sébastien | Oui (30/06-01/07) ; contestée par Laurent ; jamais close | 3 redirections |
| Successeur réel des fiches délistées (XL Wine v2, Alphadesk, XL v2) | Sébastien | Oui pour XL ; non instruite pour les autres | — |
| Devise de-ch (CHF : SJ 24/07 et 04/08 ; « no CHF » LW 11/06 ; EUR cadre ; CHF LW 25/09) | Sébastien (prix), Laurent (marché) | Oui : cadre écrit contre le code ; patch préparé | E7, E8 |
| Prix : XL G2 « sur devis » (24/07) puis 38 450 € (04/08) ; prix ROI XL G2 « [À CONFIRMER] avec Orbitvu » (30/06) | Sébastien / Orbitvu | Non (données de commit) | Mensualités dérivées (×1,3/60) |
| Prix dans les articles : interdiction contractuelle Orbitvu (30/06) vs mensualités dans #36 | Sébastien | — | E13 |
| Support / migration d'anciens studios (#36) | Sébastien | Non (article de SJ) | — |
| Date de création (2001 vs 2004 vs « 25 ans ») | Laurent / Sébastien | `foundingDate` du code pris pour vrai | D33 |
| Langues parlées (allemand « un peu ») | Laurent / Sébastien | Textes annoncent l'accompagnement en allemand | D33 |
| Conditions commerciales (retours, livraison, installation, délai) | Sébastien | Non : Q13 posée, D32 | Modèle Lm |
| Intention des règles Worker génériques (`-old-`, `/commun/`, `/pages/`…) et des 14 `/en/blog` en 410 | Sébastien (auteur), Laurent (arbitre 07/07) | Post-mortem 1 : « intention non prouvée » ; commit : arbitrage LW | E10 |
| Historique PackshotCreator (cession « fin 2025 » vs « janvier 2026 » ; interview du fondateur ; anciennes URL) | Laurent | Docs divergentes | `00-BRIEFING` vs `README` |
| Objection Google Ads historique de la marque | Sébastien | Non (BLOCKED_SJ) | P0-C incomplet |

### 15.2 Claims et règles éditoriales

- « Distributeur officiel », jamais « exclusif » (D6) : corrigé 30/06 ; à recontrôler dans #36 et #24.
- Prix : D7 (`price` = mensualité), D13 (validation SJ), D25 (aucun prix en comparatif), D26.5 (données structurées uniquement), cadre « jamais dans titres, CTA, articles » ; #36 affiche des mensualités dans un article (fr, en, de-ch) ; le 30/06 les prix de vente Orbitvu ont été retirés de 5 articles pour « interdiction contractuelle » — deux règles de nature différente (prix de vente vs mensualité) qu'aucun document ne relie.
- ROI : « 6-12 », « 9 », « 4-8 », « 5 mois » dans `messages/fr.json` (23/09) ; #24 : « 4-8 mois, 80 %, 500+/jour » vs REGLES §4 « 12-15 mois, −86 %, 300/jour » ; `REGLES_REDACTION_BLOG` absent du dépôt.
- Prose : D15 (tacite) en vigueur sur une confirmation par silence ; #24 = premier jet du modèle, « Likely AI » 100 ; F5 J0 non atteint.
- Défense : D10 abandon ; pages et liens « Défense & Sécurité » présents (23/09) ; lot F conserve `/industrie-defense` → `/fr/industrie/defense-securite`.

---

## 16. Gouvernance documentaire — ce qui est fiable, ce qui ne l'est pas

### 16.1 Fiable (à conditions)

- `git log`, messages de commit, diffs : fiables pour « ce qui est codé » et, souvent, pour « qui a arbitré » (`d3620bd`, `c7224e5`, `e385e14`). Pas pour « ce qui est déployé » ni « ce que voit un visiteur ».
- `JOURNAL.md` : fiable pour les commandes citées (versions Worker, md5, tests) ; ses rubriques « Vérifié / Supposé / Non regardé » sont sincères — c'est leur exploitation qui manque.
- `DECISIONS.md` : fiable pour le texte des décisions ; pas pour leur exécution (D22, D32, D33, D36 « non exécutées » ; D29 suspendue avec effets vivants ; D30 sans position ; D18-D20 sans auteur).
- Tests du Worker : fiables sur ce qu'ils affirment ; ils encodent des hypothèses produit (« jamais xl-v2 »).

### 16.2 Non fiable (lignes périmées ou contradictoires au 25/09)

| Fichier | Ligne | Réalité |
|---|---|---|
| `ETAT.md` l. 20, 46 | « reste le contrôle `curl.exe` de Laurent à reporter » (lot F) | Fait selon un fichier du projet ; jamais reporté |
| `ETAT.md` l. 47 | Chrome `www` « seul contrôle restant » + résultat énoncé | Sans URL, heure ni capture ; JOURNAL:112 « non regardé » |
| `ETAT.md` l. 118 | Jeton « toujours pas transmis » | Transmis par courriel le 16/09 (chat) ; jamais injecté |
| `ETAT.md` l. 97 | P0-D/E « CLOSED… vérifié (16 témoins PASS) » | 19 sur 30 chemins ; sortie non consignée |
| `06-CHANTIERS.md` | « arrêté au 19/09 » ; C13 « clos, traité par la PR accents » ; C14 « à ouvrir » ; « Rédaction des 3 articles : Sébastien » ; C7 « prose côté Sébastien » ; C2 « SBFM infirmé » et « clos par D22 (SBFM) » | #23 fusionnée le 20/09 ; C13 présent le 23/09 ; D15 ; D22 |
| `05-INFRA.md` § bots | « Amazonbot reste bloqué » ; Skip par user-agent ; règle 4 « Active » | D34 ; D22 (UA + IP) ; `54a4b8c2` désactivée depuis le 23/07 — état live NON PROUVÉ |
| `05-INFRA.md` § Vercel | « Accès Laurent : Observability et logs, en lecture » | D14 : Member |
| `04-SURFACES-SEO.md` §2, §4 | « noindex réversibles par conception » ; « le Worker court-circuite tout ce qui n'a pas de préfixe » | 8 slugs en 410 Worker ; `shouldReturn410` sur tout chemin ; 7 règles Next mortes |
| `03-PIEGES.md` E6, F3 | « règle morte côté Worker/Next » ; « ne pas créer d'articles » | E11 inverse ; D16/D27 |
| `01-RAYON-ACTION.md` | « Copywriting : Sébastien écrit… tu produis la structure » ; `content/blog/**` « c'est sa prose » | D15 ; #24 côté LW |
| `README.md` | « 33 pièges » ; « le Claude de Sébastien répond à sa session suivante » ; « rachetée fin 2025 » | 36 ; zéro réponse ; `00-BRIEFING` : « janvier 2026 » |
| `00-BRIEFING.md` | « août 2026 : 524 clics » ; « correctif livré non mergé » | C3 : 547 ; #3 fusionnée |
| `CLAUDE.md` R4 | « la production n'est pas testable par un script » | D23 |
| `app/sitemap.ts:145` | « Les slugs EN noindex sont 301 vers /fr via le Worker » | 8 en 410, 3 sans règle |
| `i18n/routing.ts:11` | « DE/ES/NL → blendai.studio » | Aucune règle |
| `next.config.ts:40-51` | Doctrine « Worker déployé = source des legacy ; ici `/fr/`, `/en/` seulement » | 61 règles dont 7 mortes, 2 court-circuitées |
| `e2e/redirections.spec.ts` | `/de → /en` ; XL → v2 ; G2 chaîne | Worker |
| `DECISIONS.md` D18-D20 | « décidé par » vide, « proposée » depuis le 17/09 | Rédigées par l'IA ; D19 utilisée |
| Instructions du projet §3, §4 | « Devise EUR, /de-ch compris » ; « Amazonbot bloqué (D8) » ; « D9 en réexamen, Q1 » ; « D13 en réexamen, Q2 » ; filtre `amazon` | Code CHF ; D34 ; Q1 close (D17) ; Q2 close ; P0-I |
| Mémoire `infrastructure.md`, `overview.md` | « Sébastien owns all deployments » ; « Language selector BUG not yet fixed » ; « RESYNC pending » ; « Master V3 remplace… » | Faux ×4 |
| Master V3 | « CHF décidé » ; T05 « CLOS » ; P0-F sans D22 ; hiérarchie sans fait métier ; « source maître » | Archive datée, pas source |
| États de reprise et « Résumés globaux » (une quinzaine) | Copies d'états à une date | Jamais sources |

### 16.3 Ce que révèle la structure

- Trois « sources maîtres » déclarées (dépôt/D11, Master V3, cadre du projet) et neuf couches recopiées à la main (dépôt, cadre, fichiers projet, mémoire, chats, Master, sessions Claude Code, contexte de Sébastien, ChatGPT), aucune dérivée des autres.
- Une décision peut vivre dans un message de commit (`d3620bd`, `fd112ce`, `c7224e5`, `e385e14`) sans jamais atteindre `DECISIONS.md` ; inversement une décision peut être « en vigueur » sans effet (D22, D32, D33, D36).
- Les clôtures sont prononcées par l'agent qui a fait le travail, sur ses propres contrôles, sans accusé de lecture de l'autre côté.
- Le circuit de Sébastien (D16, Rayon, checklist slug) n'est pas le même que celui de Laurent ; `DECISIONS.md` n'engage que l'un des deux dans les faits.

---

## 17. Garde-fous actuels — existe / fonctionne / insuffisant / absent

| Garde-fou | Existe | Fonctionne | Verdict | Incidents concernés |
|---|---|---|---|---|
| CI `pr-checks` : `tsc`, `verifier-json`, `next build` | Oui | Oui (bloquant) | **Fonctionne**, périmètre étroit | — |
| CI `eslint` | Oui | `continue-on-error` | **Insuffisant** | Avertissements ignorés |
| CI `garde-journal` (entrée JOURNAL ≥ 5 lignes si fichier site touché) | Oui | Oui | **Fonctionne**, mais n'exige rien sur le contenu ; exclut `scripts/`, `CLAUDE.md` | — |
| CI `garde-consequences` (section Rayon ≥ 80 car.) | Oui | Oui | **Insuffisant** : ne juge pas le contenu ; `cloudflare-worker/` « NON testable en Preview » | #36 (contenu = pas de rayon large) |
| `vitest` (Worker + `lib`) | Oui | **Hors CI** | **Existait, non exécuté** | E19, E2 (verrouillage) |
| Playwright (15 specs, dont `redirections.spec.ts`) | Oui | Hors CI ; `localhost:3000` sans Worker ; périmée | **Existait, non exécuté, ne couvrait pas le cas** | #36, XL |
| `smoke.mjs` (17 témoins, origine ou preview) | Oui | Manuel, après fusion | **Insuffisant** : exclut redirections/410/sous-domaines ; hôte = origine | #36 |
| Preview contrôlé (D12/D15) | Oui (procédure) | **Jamais exécuté** (jeton non injecté ; 302 SSO) | **Existait, non exécuté** | 33 PR |
| Contrôle Chrome/`curl.exe` sur `www` (R4/D23) | Oui (procédure) | Humain, différé, non consigné (#16, lot F, #22, #29, #32) | **Existait, non exécuté ou non consigné** | #36 (détecté après fusion), E22 |
| Resync API avant déploiement Worker (D4, R5) | Oui | Oui ×3, octet par octet | **Fonctionne** | Q-H |
| Simulation différentielle exhaustive | Oui (sessions) | Oui (3 691 / 5 533 chemins) | **Fonctionne**, hors CI | Q-N |
| Tests d'unicité intra/inter-tables + contrôle négatif | Oui | Oui, hors CI | **Fonctionne** en local | E21 |
| Rubriques Vérifié / Supposé / Non regardé | Oui | Remplies | **Insuffisant** : information sans condition d'arrêt ; « Supposé — Rien. » ×2 ; 4 entrées sans rubrique | #36 (« non regardé ») |
| R7 (consigne vérifiée contre le dépôt) | Oui | Écarts consignés ×3 | **Insuffisant** : non bloquant ; règle 5 du prompt de nuit l'annule | E2 |
| R8 / `01-RAYON-ACTION` | Oui | Carte à sens unique (« ce qui dépend de moi ») | **Insuffisant** : pas « ce qui me contraint » (Worker sur un slug) | #36 |
| Boîte aux lettres (D11) | Oui | 0 réponse de SJ ; clôtures par silence | **Insuffisant** | E23, E24 |
| GO explicite (Worker, n8n, DDL, Cloudflare) | Oui | Oui | **Fonctionne** | — |
| Séparation fusion / déploiement Worker | Oui | Oui | **Fonctionne** | — |
| Rollback nommé (Worker, SQL) | Oui | Oui | **Fonctionne** | — |
| md5 avant/après (P0-I) | Oui | Oui | **Fonctionne** | — |
| Gel de mesure | Une fois (P0-J pendant P0-H) | — | **Absent** comme règle | E29 |
| Test « toute route Next passe le Worker » | Non | — | **Absent** | #36, 8 `/en/blog`, 3 G2, 7 règles mortes |
| Liste des motifs réservés du Worker | Non | — | **Absent** | #36 |
| Registre des faits d'entreprise signé | Non | — | **Absent** | E1, E2, E7, E8, E10, E13, E35 |
| Question fermée obligatoire (produit, prix, devise, équivalence) | Non | Q13 seulement | **Absent** | E2, E6, E8, E9 |
| Accusé de lecture avant régime tacite | Non | — | **Absent** | E23 |
| Détection de documentation périmée | Non | — | **Absent** | E25 |
| Diff Worker déployé ↔ `main` quotidien | Non (manuel avant déploiement) | — | **Absent** | R5 |
| Protection de branche | Ruleset `protect-main` : suppression et force-push seulement (16/09) — état actuel NON PROUVÉ | — | **Insuffisant** : pushs directs possibles (E18) | E18 |
| Gestion des secrets | Règle écrite (`CLAUDE.md`, cadre) | 4 expositions | **Insuffisant** | E30 |

---

## 18. Garde-fous à ajouter — priorisés

| Priorité | Garde-fou | Classe | Ce qu'il aurait empêché | Forme |
|---|---|---|---|---|
| 1 | `FAITS.md` signé par Sébastien : produits et générations avec statut commercial (vendu / délisté / repli / successeur), devise et format de prix par locale, dates d'entreprise, claims autorisés, motifs réservés du Worker avec leur raison, intention des 14 `/en/blog` en 410 et des 3 G2 | HUMAIN | E1, E2, E7, E8, E10, E13, E35, #36 | Fichier append-only, une ligne datée par fait |
| 2 | Règle « question fermée obligatoire » : toute phrase contenant un nom de produit, un prix, une devise, une date d'entreprise, un engagement client ou le mot « équivalent » = question à l'humain compétent, déposée dans le dépôt, rien préparé en code avant réponse | HUMAIN + gabarit | E2, E6, E8, E9 | Procédure + gabarit BOITE |
| 3 | `vitest run` (Worker + `lib`) bloquant dans `pr-checks.yml` ; Playwright `redirections.spec.ts` corrigée puis bloquante sur Preview | AUTOMATISABLE | E17, E19 | CI |
| 4 | Test « toute route Next (sitemap + `generateStaticParams` + `content/**` + `alternates.json`) atteint l'origine à travers `worker.fetch` » ; test « aucune nouvelle route ne matche un motif générique 410 » | AUTOMATISABLE | #36, 8 `/en/blog`, 3 G2, 7 règles Next mortes | vitest, harnais de `lot-f` |
| 5 | Contrôle visiteur obligatoire dans l'heure après fusion touchant URL/redirect/schema/locale : `curl.exe` LW ou Chrome, query string neuve, **sortie brute au JOURNAL** ; sinon la PR n'est pas DONE | HYBRIDE | E22, #36 | Procédure + gabarit |
| 6 | R7 bloquant : une consigne contredite par le dépôt arrête le lot (PR en brouillon + question), ne s'applique pas « quand même » | HUMAIN (règle) + prompt | E2, Q-L | `CLAUDE.md`, prompts |
| 7 | Gel de mesure : une fenêtre par famille de pages, écrite dans `ETAT` ; alerte CI si une PR touche la famille gelée | HYBRIDE | E29 | CI + procédure |
| 8 | Accusé de lecture daté avant toute clôture tacite ; « non regardé » avec responsable et échéance | HUMAIN | E23, E22 | Gabarit JOURNAL/BOITE |
| 9 | Lint locale : ternaire `lang === 'fr' ?` sans branche de-ch ; `inLanguage`/`priceCurrency`/`locale` littéral | AUTOMATISABLE | E34 | eslint custom |
| 10 | hreflang / sitemap / liens internes contrôlés **après Worker** (simulation) : chaque `alternate` 200 et réciproque ; aucune URL du sitemap en 410/301 | AUTOMATISABLE | #36, E10 | script au build |
| 11 | Détection de documentation périmée en CI : futur sur PR fusionnée, décomptes vs `grep`, « à reporter » de plus de 48 h | AUTOMATISABLE | E25 | script sur `docs/` |
| 12 | `ETAT.generated.md` dérivé (PR par état, déploiements Worker par API, fenêtres de mesure, contrôles manquants) ; `ETAT.humain.md` ≤ 15 lignes | AUTOMATISABLE | E25, E27 | script CI quotidien |
| 13 | Cohérence `DECISIONS` ↔ code : un test par décision mécanisable (D31 : 0 `Review` de-ch ; D7 ; D22 via API ; D36) ; statut « exécutée le … » obligatoire | HYBRIDE | D22, D32, D33, D36 | vitest + API |
| 14 | Diff Worker déployé ↔ `main` quotidien ; alerte si `modified_on` change hors déploiement journalisé | AUTOMATISABLE | R5 | API + cron |
| 15 | Protection de branche : PR obligatoire, `pr-checks` requis, aucun push direct | AUTOMATISABLE | E18 | GitHub ruleset |
| 16 | Secrets : jeton éphémère injecté par variable d'environnement dans la session de déploiement, jamais dans un fil ; révocation consignée | HUMAIN | E30 | Procédure |
| 17 | Purge ciblée Cloudflare après tout changement de redirection ; contrôle avec query string neuve | HUMAIN | E33 | Procédure |
| 18 | Une seule procédure éditoriale pour les deux Claude (D16, Rayon, checklist « nouveau slug », test Worker) | HUMAIN | #36 | `02-PROCEDURE` commune |

---

## 19. Ce qu'il ne faut pas toucher maintenant

| Objet | Jusqu'à | Raison |
|---|---|---|
| M5 (`Sqdk2jygOSt9XEjL`), `gsc_pull_bornes`, `wf_expected`, P0-J | 08/10 | Fenêtre P0-H « 0 échec sur 14 jours » (P0-K : P0-J différé) |
| Les 13 redirections XL → XL G2 et les 2 règles `next.config.ts` XL → v2 | Réponse écrite de Sébastien (fait produit) | D29 suspendue ; une inversion à chaud serait une nouvelle hypothèse ; fenêtres #16 / lot F ouvertes |
| Les 8 `/en/blog` en 410 et les 3 `alphashot-g2` redirigées | Réponse écrite de Sébastien (intention) | Arbitrage du 07/07 et décision produit du 07/08 ; toute modification change l'index |
| `GONE_PATHS` (59 doublons, 98 URL absolues, 12 clés query) | Après P0-D/E J+14 (~09/10) | Test `DOUBLONS_GONE_CONNUS` ; variantes `/amp` |
| Devise de-ch (17 fiches, `Offer`, FAQ wine) | D37 écrite (SJ) | D30 hors périmètre ; deux commits SJ en CHF |
| WAF / SBFM / règle `54a4b8c2` / D22 | Mesure avant (ASN × UA) + GO | Précédent du 23/07 (vidéos) ; D22 non exécutée |
| Familles de pages sous mesure (3 landings, annexe K, `/de` → `/de-ch`, marque `/fr` vs `/en`, F5) | 04/10, 07/10, 09/10, 28/10 | Sinon aucune attribution |
| Master V3, états de reprise, mémoire | Jamais comme source | Archives |
| `robots.txt` (Amazonbot), `sysnext.vercel.app` (D36) | GO + mesure | Décidées, non exécutées : à exécuter par PR, pas à improviser |
| Cache Cloudflare (purge globale) | Jamais en réaction | Purger par chemin après un changement de redirection |

---

## 20. Questions humaines restantes

**À Sébastien (faits d'entreprise ; réponse écrite et datée dans le dépôt)**
1. Alphashot XL v2, XL Pro v2, XL G2 : lesquels sont vendus, à qui, lequel remplace lequel ? Où doivent atterrir les anciennes URL « Alphashot XL » (FR, EN, DE, ES, NL) ?
2. Alphashot G2 (repli délisté depuis le 07/08) : les URL publiques `/fr|/en|/de-ch/…/alphashot-g2` doivent-elles rediriger vers XL G2, vers Pro G2, ou servir la fiche ?
3. Devise et format des mensualités sur `/de-ch` (CHF 24/07 et 04/08) ; devise de l'`AggregateOffer` ; FAQ wine.
4. Les 14 `/en/blog` en 410 du 07/07 (dont 8 TSX noindex) : maintenir, ou revenir au 301 → `/fr` pour permettre D9 ?
5. Mensualités dans l'article #36 : décision délibérée ? Règle pour les articles (D26.5, cadre « jamais dans articles ») ?
6. Motifs génériques du Worker (`-old-`, `-mod`, `/pages/`, `/resources/`, `/commun/`, `/ftp/`, `/en/en/`, `/amp`) : lesquels sont encore voulus ?
7. `/de/impressum-copy` → `/fr/mentions-legales` : voulu ?
8. Historique Google Ads de la marque (P0-C).
9. Jeton Preview : accepter son injection en secret CI, ou tenir le Preview par Chrome (LW membre Vercel) ?
10. Accusé de lecture : Sébastien lit-il la boîte aux lettres ? À quel rythme ?

**À Laurent**
11. Mots exacts et date de l'instruction CHF du 25/09 ; où l'écrire (D37) ; correction du cadre du projet.
12. Résultats bruts `curl.exe` : lot F (23/09), P0-D/E (25/09, 16 témoins), Worker #16 (20/09) — à déposer.
13. R7 bloquant ou non bloquant ? Fusion en lot interdite ?
14. Gel de mesure : accepter qu'aucune PR ne touche les familles sous fenêtre jusqu'au 28/10 ?
15. Q10 (cible de clics) ; D18-D20 : confirmer, amender ou déclarer caduques.
16. `ETAT:47` : le contrôle Chrome `www` de #29/#32 a-t-il eu lieu, quand, sur quelles URL ?

**Aux deux**
17. `FAITS.md` : qui le signe, à quelle échéance ; qui tient l'intersection contenu × Worker.
18. Circuit unique pour les deux Claude (D16, Rayon, test Worker, checklist slug).

---

## 21. Nouveau protocole opérationnel (court)

1. **Trois registres, un seul propriétaire chacun.** `FAITS.md` (Sébastien signe : produits, statuts, devises, dates, claims, motifs Worker, intentions historiques). `DECISIONS.md` (append-only ; chaque D porte « remplace / remplacée par », « exécutée le », « ce qui la rend caduque » ; une orientation non confirmée sous 5 jours ouvrés est `CADUQUE`, pas tacite). `JOURNAL.md` (inchangé + « qui regarde le non-regardé, pour quand »). Tout le reste (cadre, mémoire, Master, états de reprise, ChatGPT) renvoie et ne recopie pas.
2. **Classer avant de prouver.** Chaque affirmation est étiquetée technique / mesure / fait métier / engagement. Un fait métier ne se prouve pas par le code : il se demande (question fermée, dans le dépôt, avant tout code).
3. **Prouver et réfuter.** Toute conclusion cite au moins une source qui pourrait la contredire (`git log` de l'autre côté, autre système, autre agent) et porte son niveau : L0 hypothèse · L1 dépôt lu · L2 test local · L2b test croisé (Next × Worker × cache × hreflang) · L3 Preview · Lm fait métier confirmé par écrit · L4 production visiteur (www, query string neuve, dans l'heure, sortie consignée) · L5 mesure datée avec témoins et gel.
4. **R7 arrête.** Une consigne contredite par le dépôt met la PR en brouillon et pose une question ; elle ne s'applique pas « quand même ».
5. **Une PR = un sujet ; jamais de fusion en lot ; GO écrit par l'humain compétent pour la classe** (SJ : produit, prix, claims, intention du code historique ; LW : marché, historique des URL, arbitrage SEO) ; le silence n'est jamais un accord.
6. **Vérifier sur le chemin du visiteur**, pas sur l'origine : `curl.exe` LW ou Chrome sur `www`, dans l'heure, avec la sortie brute au JOURNAL ; sinon pas DONE.
7. **Écrire une fois, au bon endroit**, en citant ce qui est remplacé ; toute leçon mécanisable devient un test et un piège.
8. **Mesurer sous gel** : une fenêtre par famille de pages, écrite, respectée ; sinon la conclusion est « confondue, non attribuable ».

---

## 22. Checklist avant merge (15 items)

1. La PR touche-t-elle un produit, un prix, une devise, une date, un claim, une « équivalence » ? → réponse écrite de l'humain compétent citée (Lm), sinon stop.
2. La consigne contredit-elle le dépôt (R7) ? → stop, brouillon, question.
3. `tsc`, `next build`, `vitest` (Worker inclus) verts **en CI**.
4. Nouvelle URL ou slug ? → testé contre `shouldReturn410`, `GONE_PATHS`, `LEGACY_REDIRECTS`, `DE_CH_MAP` et les motifs réservés ; hreflang croisés 200.
5. Redirection ? → un saut ; cible 200 canonique ; non capturée par l'autre moteur ; raison d'équivalence signée ; backlinks de la source listés.
6. Locale ? → 0 chaîne FR/EN involontaire ; `lang`, `og:locale`, `inLanguage`, devise et formats par locale ; Chrome sans traduction (B5).
7. Schema ? → test résultats enrichis ; faits d'entité issus de `FAITS`.
8. Rayon d'action rempli dans les deux sens (ce qui dépend de moi ; ce qui me contraint : Worker, cache, hreflang, sitemap).
9. Preview contrôlé (visuel + specs) ou dérogation écrite avec raison.
10. Rollback nommé (revert, version Worker, SQL gardé).
11. JOURNAL : Vérifié / Supposé / Non regardé avec responsable et échéance ; niveau de preuve atteint.
12. Aucune autre PR ne touche la famille de pages sous mesure (gel écrit).
13. GO écrit par la personne compétente ; pas de fusion en lot.
14. Docs : `ETAT` régénéré ; `DECISIONS` / `FAITS` / `PIÈGES` mis à jour si un fait, une décision ou une leçon est né.
15. Aucun secret dans la PR, le fil, le journal ; jetons éphémères révoqués.

## 23. Checklist après déploiement (10 items)

1. Version active = version attendue (`wrangler deployments status` ; Vercel deployment id).
2. Diff production ↔ `main` = diff de la PR, exactement (Worker : API, octet par octet).
3. Témoins sur `www` **dans l'heure**, query string neuve, `curl.exe` LW : tous les chemins changés (pas un échantillon) ; sortie brute au JOURNAL.
4. Purge Cloudflare ciblée sur les chemins dont la réponse 3xx/410 change ; re-test après purge.
5. Chrome sur `www` pour tout rendu, traduction désactivée sur de-ch ; capture datée.
6. `smoke.mjs` sur `sysnext.vercel.app` (application) — jamais seul.
7. Sous-domaines proxifiés et passthrough (`videos.`, `books.`, `trail.`) : un test chacun après tout changement Worker/WAF.
8. Rollback vérifié possible (commande écrite, version précédente connue).
9. JOURNAL : résultat, heure UTC, qui, quoi ; `ETAT` régénéré ; fenêtre de mesure ouverte avec J0 et témoins.
10. Accusé de lecture de l'autre côté (« lu le … par … ») avant toute clôture.

---

## 24. Matrice de confiance

| Sujet | Conclusion | Niveau de preuve | Source | Peut-on agir dessus ? |
|---|---|---|---|---|
| 13 redirections XL → XL G2 dans le Worker, déployées | Établi | L1 + L4 partiel (témoins 25/09 : 2 chemins) | inventaire §3.1, JOURNAL:319-320, D29 | Non sans Lm (SJ) |
| `next.config.ts` l. 61/70 → XL v2 ; e2e affirme v2 ; tests Worker affirment « jamais v2 » | Établi (contradiction) | L1 | inventaire §4, §5 | Non sans Lm |
| XL v2 et XL G2 coexistent commercialement | Déclaration de Laurent (24/09) | Lm partiel (LW), pas SJ | JOURNAL:365, D29 | Question à SJ |
| 8 `/en/blog` TSX en 410 = arbitrage LW 07/07 | Établi | L1 (commit) | `d3620bd` | Oui : documenter ; décision pour D9 |
| 7 règles Next mortes ; `shouldReturn410` sur tout chemin | Établi | L1 + simulation | inventaire §1.3, §4 | Oui : documenter, tester |
| 3 `alphashot-g2` → XL G2 ; G2 réintroduit délisté (repli) | Établi ; intention actuelle inconnue | L1 | `d8b4156`, `e385e14`, fil 01/07 | Question à SJ |
| Devise de-ch = CHF dans le code (SJ ×2) ; cadre EUR faux ; instruction CHF 25/09 non écrite | Établi | L1 ; NON PROUVÉ pour l'instruction | `fd112ce`, `c7224e5`, D30 | Oui : D37 + cadre |
| Jeton Preview transmis par courriel le 16/09 ; jamais utilisé | Probable | Source secondaire (résumé de chat) + JOURNAL | fil 16/09, JOURNAL:1177/1055/612 | Oui : injecter ou tenir par Chrome |
| Aucun contrôle Preview ni `www` consigné avec sortie | Établi | L1 (JOURNAL/ETAT) | agent B §A.9, §C.4 | Oui |
| Tests hors CI ; pushs directs sur `main` | Établi | L1 | workflows ; `git log --first-parent` | Oui |
| Cache 3xx/410 86 400 s | Établi (code) ; effet réel non mesuré | L1 | `index.js:1997, 2017` | Oui : procédure de purge |
| Diagnostic bots : D22 en vigueur, non exécutée, contredite par P0-F et `05-INFRA` | Établi | L1 | DECISIONS, ETAT:86 | GO Cloudflare après mesure |
| État live Cloudflare (règle `54a4b8c2`, Bulk list supprimée, WAF) | Inconnu | NON PROUVÉ | — | Non |
| Durée du 410 de #36 sur `www` et effet GSC | Inconnu | NON PROUVÉ | — | Mesurer (GSC, J+14) |
| Décision délibérée de SJ sur les prix dans #36 | Inconnu | NON PROUVÉ | — | Question |
| Boîte aux lettres : 0 réponse SJ ; clôtures par silence | Établi | L1 | BOITE, JOURNAL:280 | Oui : accusé de lecture |
| Précédent G2 (01/07) non clos | Établi | fil 01/07 (verbatim) + `git log` | — | Oui : `FAITS.md` |
| ~20 lignes périmées dans 9 fichiers + cadre + mémoire | Établi | L1 | section 16 | Oui |
| Mesures d'octobre confondues | Établi par construction | L1 (dates) | section 13 | Oui : gel |
| Influence de ChatGPT sur les décisions | Inconnue | NON PROUVÉ | — | Oui : tracer dans le dépôt |
| Causes racines (section 1.15) | [Inférence] fondée sur 38 erreurs et 20 quasi-incidents | — | ce rapport | Oui |

---

## 25. Registre des points non prouvés

Rien n'est retiré parce que la réponse est inconnue.

| # | Point | Pourquoi c'est important | Source qui trancherait | Qui | Bloquant ? |
|---|---|---|---|---|---|
| N1 | Comportement réel de `www` sur les 30 chemins P0-D/E (11 non testés), les 13 XL, les 8 `/en/blog`, les 3 G2, les 7 règles Next mortes | Seul état que voit Google | `curl.exe` depuis le poste LW (D23), sortie brute au dépôt | Laurent | Oui pour clore P0-D/E et D29 |
| N2 | Intention actuelle de Sébastien : successeur des XL, statut public du G2, devise de-ch, prix dans #36, 14 `/en/blog` en 410, motifs Worker, `/de/impressum-copy` | Décide 16 redirections et 17 fiches | Réponse écrite (`FAITS.md`) | Sébastien | Oui |
| N3 | Instruction CHF de Laurent du 25/09 (forme, date, portée) | Contredit D30 et le cadre | Laurent | Laurent | Oui pour D37 |
| N4 | Transmission effective du jeton Preview (courriel du 16/09 : source secondaire) et raison de sa non-utilisation | Porte D12/D15 | Courriel ; Laurent | Laurent | Non |
| N5 | Durée réelle du 410 de #36 à l'edge et chez les clients ; passage dans GSC | Mesure de l'incident | GSC URL Inspection ; Cloudflare | Laurent / SJ | Non |
| N6 | État live Cloudflare : règle `54a4b8c2`, existence de la règle D22, Bulk list supprimée, règles 1-3, DNS des 17 sous-domaines, liste PerplexityBot | P0-F, D22, sous-domaines | Dashboard ou API (jeton lecture) | Laurent | Oui pour P0-F |
| N7 | Corps et commentaires des PR #1-#30, #32-#35 (Rayon d'action, cases cochées, relectures) | Qui a relu quoi ; #16 « Rayon » | GitHub | Laurent (accès) | Non |
| N8 | Sessions et prompts du Claude de Sébastien (#36, contre-audit) | Attribution E5, E12, E13 | Sébastien | Sébastien | Non |
| N9 | Sorties de ChatGPT et leur chemin vers les décisions (24/09 : prompt « DÉCISION 1-3 ») | D11 ; E28 | Laurent | Laurent | Non |
| N10 | Master V2 (PDF), pièces S03, S09, S10, Data Pack v1 | Reconstruire le raisonnement du 23-24/09 | Fichiers absents | Laurent | Non |
| N11 | `curl.exe` du lot F (23/09) : fichier projet, pas dépôt ; Worker #16 (20/09) : « déclaré » | Preuve L4 | Laurent | Laurent | Non |
| N12 | État au 25/09 des constats du 24/07 : `[object Object]`, 307 internes, HSTS, `Cache-Control: no-store`, `Service` de-ch | Dettes E36 | `curl.exe` LW | Laurent | Non |
| N13 | Reprise du planificateur n8n après le 15/09 ; export des exécutions 3292-3311, 3379 avant purge | Continuité de `cf_traffic_daily`, preuves P0-H | n8n | Laurent | Oui avant le 01/10 |
| N14 | Résidu « studio Orbitvu + BlendAI (35 000€ » (`blendai-vs-flair-ai`, l. 533) : conforme au contrat Orbitvu ? | Conformité | Sébastien | Sébastien | Non |
| N15 | Ruleset `protect-main` actuel (état du 16/09 seul connu) | E18 | GitHub | Laurent / SJ | Non |
| N16 | Suites de tests réellement exécutées et leurs résultats (« 223/223 » = déclaration locale) | E17 | CI | — | Non |
| N17 | Contenu exact de la question « Laurent valide le CHF » dans le prompt ChatGPT : fait ou instruction ? | Point de départ 13/13 | Laurent | Laurent | Non |
| N18 | Chats antérieurs au 06/06 et chat masqué | Décisions de mai (migration, Bulk list) | Laurent | Laurent | Non |

---

## Annexe A — Audit du premier rapport (phase 1)

Classification : CONFIRMÉ · CONFIRMÉ MAIS INCOMPLET · À NUANCER · CONTREDIT · NON PROUVÉ. Seules les affirmations importantes sont reprises ; le premier rapport est remplacé par celui-ci.

| Affirmation du premier rapport | Verdict | Source primaire de cette passe |
|---|---|---|
| L'erreur XL est née dans notre consigne du 17/09, signalée par Claude Code, rationalisée le 18/09 (« slug mort »), généralisée le 19 et le 23/09, verrouillée par tests, endossée le 24/09, corrigée par Laurent le 24/09 | **CONFIRMÉ MAIS INCOMPLET** : précédent identique le 01/07 (G2) ; le 24/09 le Claude de projet avait rédigé la question à Sébastien (« XL G2 est-il le successeur… XL Pro v2 plus proche ») sans qu'elle soit déposée | fils 01/07, 24/09 ; JOURNAL:735 ; `git log` |
| 13 redirections XL en production, 2 règles Next vers v2 | **CONFIRMÉ** | inventaire §3.1 ; témoins 25/09 |
| « xl-v2 absent de MACHINES » (18/09) | **CONFIRMÉ** sous la forme « slug mort » (restitution du 18/09, §6.5) ; `machines.ts:347` `delisted: true` | fil 18/09 |
| Devise : cadre EUR, code CHF (24/07), D30 EUR → hors périmètre, instruction CHF 25/09 | **CONFIRMÉ MAIS INCOMPLET** : deuxième commit SJ en CHF (`c7224e5`, 04/08) ; fil du 11/06 « no CHF » ; « Laurent valide le CHF » = NON PROUVÉ dans les sources | `git log` ; fils |
| Patch CHF → EUR (17 fiches) préparé sans question à SJ | **CONFIRMÉ** ; nuance : la consigne « classer toute valeur CHF comme incohérence » venait du prompt « DÉCISION 2 » | fil 24/09 |
| Diagnostic crawlers IA en trois versions ; P0-F rouvert sans D22 | **CONFIRMÉ** | fils 17-18/09, D22, Master |
| #36 : doc affirmant que le Worker ne touche pas les URL préfixées ; aucun test Next ↔ Worker ; vérification sur l'origine ; Chrome post-merge ; deux circuits | **CONFIRMÉ**, complété par 7 règles Next mortes (E11) | inventaire §4 |
| 8 routes `/en/blog` en `GONE_PATHS` et `NOINDEX_EN_BLOG_SLUGS` ; « le Worker rend la réactivation impossible sans que personne ne le sache » ; intention « plausible, NON PROUVÉE » | **CONTREDIT sur l'intention** : arbitrage explicite de Laurent du 07/07, écrit dans `d3620bd` (« 14 sans équivalent passées en 410, dont les 8 TSX statiques noindex ») ; **CONFIRMÉ sur le mécanisme** et sur la contradiction documentaire (`sitemap.ts:145`, `04-SURFACES` §2, D3/D9) | `git show d3620bd` |
| 3 routes `alphashot-g2` redirigées alors que G2 est « réintroduit le 07/08 (repli économique) » | **À NUANCER** : réintroduit `delisted`, invisible du wizard, inclus via `CHAT_FALLBACK_IDS` (conseiller ROI) ; la page est prérendue mais rien n'établit qu'elle doive être servie ; question posée le 01/07, jamais close | `e385e14` ; fil 01/07 |
| Jeton Preview « non transmis en neuf jours » ; « quatorze PR fusionnées sous une condition non remplie » | **À NUANCER** : transmis par courriel de Sébastien le 16/09 (résumé de chat, valeurs masquées), retiré d'ETAT comme « fait » le 17/09, jamais injecté ; aucune trace de Preview pour 33 PR ; 13 applicatives (16 selon la règle docs/.github) | fil 16/09 ; JOURNAL:1177, 1055 ; agent B |
| Tests Worker hors CI ; e2e contredit lot-f | **CONFIRMÉ** ; e2e contredit aussi `/de → /de-ch` et affirme une chaîne G2 à deux sauts | `.github/workflows` ; inventaire §5 |
| Neuf mémoires concurrentes ; « chaque agent écrit sa synthèse dans sa couche » | **CONFIRMÉ** (une dixième couche : les messages de commit, seule trace de quatre décisions) | section 16 |
| Boîte : 10 questions, 0 réponse SJ, Q2/Q6 closes par silence, D15 tacite | **CONFIRMÉ** ; 7 réponses signées Laurent en un commit (`8534799`) | agent B §C.5 |
| P0-K par mémoire ; ~20 lignes périmées, 9 fichiers | **CONFIRMÉ MAIS INCOMPLET** : + `app/sitemap.ts`, `i18n/routing.ts`, `next.config.ts` (commentaires), C13 « clos » à tort, `06-CHANTIERS` « arrêté au 19/09 » | agent A/B |
| Hiérarchie du Master « code > Git > décisions » sans fait métier | **CONFIRMÉ** | Master V3 |
| Formulations de prompt inductrices (verbatim) | **CONFIRMÉ** | fils |
| « 33 PR fusionnées dont 14 touchant le site » | **À NUANCER** : 33 ; 13 applicatives (+3 outillage) | `git log --merges` |
| Trois déploiements Worker en neuf jours par le Claude de Laurent | **CONFIRMÉ** | JOURNAL |
| Deux commits directs sur `main` | **Nouveau** (absent du premier rapport) | `git log --first-parent` |
| Cache 86 400 s ; durée du 410 #36 non prouvée | **CONFIRMÉ** | `index.js` |
| Contre-audit : « 79 URL /de → /en ou 410 » présenté comme courant | **CONFIRMÉ** (`d3620bd` retire 79 entrées le 07/07) | commit |
| Points de départ du prompt : 12/13 vérifiés | **CONFIRMÉ** | — |
| D18-D20 proposées ; D19 utilisée | **CONFIRMÉ** ; auteur = prompt de nuit (IA) | fil 17/09 |
| « Trois faits faux dans la mémoire » | **CONFIRMÉ** (quatre) | mémoire |
| Leçon #37 au JOURNAL seulement | **CONFIRMÉ** | JOURNAL:37-53 |
| Sébastien : intention de `-old-` jamais écrite | **CONFIRMÉ** (règle du 13/04, aucune documentation) | `9a1b1e9` |
| Claude Code applique une consigne contredisant le dépôt (R7 non bloquante) | **CONFIRMÉ** | JOURNAL:735 |
| Racine en 301 `/fr` depuis le 14/07 | **CONFIRMÉ** ; 302 conditionnelle du 01/05 au 14/07 ; copie projet périmée le 14/07 | `94b37bb`, `b778a88`, fil 14/07 |
| P0-D/E : 16 témoins pour 30 chemins ; sortie non consignée | **CONFIRMÉ** (16 + 3 variantes = 19) | JOURNAL:316, 326 |
| « Le 24/09, D29/D30 prises sans poser la question à Sébastien ni relire le contrôle R7 du matin » | **CONFIRMÉ MAIS INCOMPLET** : la question existait, rédigée par le Claude de projet le 24/09 ; la décision est venue d'un prompt formaté | fil 24/09 |
| Aucune sortie ChatGPT tracée | **CONFIRMÉ** | — |
| Cause principale : « absence de frontière entre ce qui se prouve par le code et ce qui se demande à un humain » | **CONFIRMÉ** et renforcé par le précédent G2 et par E10 (une décision humaine qui n'a existé que dans un commit) | — |
| « Prochaine erreur la plus probable : nettoyage des 13 XL ou des 8 `/en/blog` préparé depuis le Master ou le cadre » | **À NUANCER** : s'y ajoute une variante déjà observée deux fois (G2 puis XL) : une fiche délistée ou réintroduite sans que les redirections suivent | — |
| Niveau de confiance 72 % | Remplacé par le contrôle de complétude ci-dessous | — |

Points du premier rapport **non re-vérifiés dans cette passe** (repris tels quels, étiquetés [Non re-vérifié]) : décompte « 28 ternaires dont 18 sans branche de-ch » ; « E07-a allowlist inutile » ; chiffres de P0-B (saisonnalité +44 %, rupture 23-25/07) ; « 15 ans / 20 ans » d'ancienneté selon les pages (Master annexe K).

---

## Annexe B — Fils du projet relus (recherche ciblée)

06/06 Restructuration ; 10-11/06 GSC/Supabase, Inventaire multilingue ; 16-19/06 Screaming Frog, Cloudflare sécurité ; 25/06 Questions préalables, Référencement Suisse ; 28-29/06 Optimisation Worker, Suivi prompts Claude Sébastien ; 30/06 Audit Supabase ; 01/07 Analyse et correction du build déployé, Migration Workers → Vercel ; 03/07 Clarification ; 07-14/07 Finaliser les workflows n8n ; 22-24/07 Audit Cloudflare, Fichiers manquants, Checking redirects, Audit SEO sources ; 07/08 Calculateur ROI ; 22/08-02/09 Analyse Screaming Frog ; 04/09 Audit workflows (audit expert) ; 16/09 Audit des accès Vercel ; 17/09 Diagnostic 504 et crawlers, Diagnostic de la baisse, GSC click decline (prompt de nuit) ; 18/09 Transcriptions partielles (restitution), Analyse complétude, Bilans V1-V5 ; 19/09 Phase 0 cadrage, Plan de solutions ; 19-23/09 Plan de solutions et exécution ; 23/09 Compléments B1-B4, Troisième passe, État des lieux, Contre-audit consolidé, TDE ; 24/09 Contrôle R7, Freeze Gate, Cleanup audit, Limite d'appels (P0 batch, décisions) ; 25/09 Production visual check.

Non relus : ~70 autres fils (n8n, TDE, veille, dashboard, Pipedrive, coûts IA, Perplexity, orbitvu.fr…), les fils antérieurs au 06/06, un fil masqué.

---

## Contrôle final de complétude

« Si Laurent me montrait demain un ancien chat du projet pris au hasard, quelle est la probabilité qu'il contienne une décision, une redirection ou une correction importante absente de ce rapport ? » — [Inférence] faible pour un fil de septembre (tous les fils SEO/Worker/décisions ont été ouverts), modérée pour un fil de juin-août hors Worker (n8n, dashboard, veille : hors périmètre de ce post-mortem mais porteurs de décisions de données), non évaluable pour les fils antérieurs au 06/06. Cela repose sur des schémas observés.

- **COUVERTURE DES CHATS ACCESSIBLES = PARTIELLE** — 26 fils relus par recherche ciblée sur ~100 ; verbatim pour une dizaine, résumé automatique pour les autres ; fils antérieurs au 06/06 et fil masqué non lus.
- **COUVERTURE DES DOCUMENTS DU PROJET = PARTIELLE** — 100 documents ; 12 lus intégralement, le reste par recherche ; Master V2 (PDF) non relu ; six pièces citées absentes.
- **COUVERTURE GITHUB = COMPLÈTE pour le code et l'historique** (400 commits, toutes tables, tous tests, tous workflows, toute la documentation) ; **PARTIELLE pour les PR** (pages de #31, #36, #37 seulement ; corps de #1-#30, #32-#35 non lus ; ruleset non lisible).
- **COUVERTURE INFRA EXTERNE = NON ACCESSIBLE** — Cloudflare (WAF, SBFM, Security Events, versions du Worker, Bulk list, DNS), Vercel, Supabase, n8n, `www` : aucune lecture live dans cette passe.

**NIVEAU GLOBAL DE COMPLÉTUDE = 78 %**

Ce qui sépare de 100 % : N1 à N18 ci-dessus ; en premier lieu N1 (état de `www`), N2 (faits de Sébastien), N6 (Cloudflare live), N7 (corps des PR), N18 (chats de mai).

**Les 5 choses dont je suis le moins certain**
1. Ce que voit réellement un visiteur ou Google aujourd'hui sur les 30 chemins P0-D/E, les 13 XL, les 8 `/en/blog`, les 3 G2 et les 7 règles Next mortes — tout ce rapport lit le dépôt, pas `www`.
2. L'intention actuelle de Sébastien sur les XL, le G2, la devise de-ch, les prix dans #36 et les 14 `/en/blog` en 410 — seule sa réponse écrite peut la fixer.
3. La transmission du jeton Preview (source secondaire : résumé d'un fil du 16/09) et la raison pour laquelle il n'a jamais servi.
4. La durée réelle et l'effet GSC du 410 de #36 (cache 86 400 s ; aucun relevé).
5. Ce que ChatGPT a produit entre le 23 et le 25/09 et ce qui en a été collé comme décision (prompt « DÉCISION 1-3 ») — aucune trace dans le dépôt.

**Les 5 choses que je considère désormais comme suffisamment prouvées pour ne plus les rediscuter**
1. À `main` = `1a8c3de`, 13 entrées du Worker redirigent une URL « Alphashot XL » vers `alphashot-xl-g2` (déployées les 20 et 23/09), 2 règles `next.config.ts` redirigent vers `alphashot-xl-v2`, et 3 tables de tests affirment des vérités contraires ; aucune n'est signée par Sébastien.
2. Le 410 des 8 articles `/en/blog` statiques est un arbitrage de Laurent du 07/07 exécuté par Sébastien (`d3620bd`) ; `app/sitemap.ts`, `04-SURFACES-SEO.md` et D3/D9 disent l'inverse ; la règle `-old-` date du 13/04 ; `shouldReturn410` s'applique à tout chemin et rend mortes 7 règles `next.config.ts`.
3. Aucun test (`vitest`, Playwright) ne tourne en CI ; aucun contrôle Preview n'est consigné pour les 33 PR ; aucun contrôle de production sur `www` n'est consigné avec sa sortie brute ; deux commits documentaires ont été poussés directement sur `main`.
4. La devise de-ch est CHF dans le code par deux commits de Sébastien (24/07, 04/08) ; le cadre du projet (« EUR ») est faux ; `DECISIONS.md` ne contient aucune décision positive sur la devise ; un patch EUR sur 17 fiches et le JSON-LD a été préparé le 24/09 sans question à Sébastien et abandonné le soir.
5. L'erreur XL est la répétition, deux mois et demi plus tard, de l'erreur G2 du 01/07 (fait produit déduit d'un commit, contesté par Laurent, jamais clos, 3 redirections toujours en place) ; entre les deux, aucune règle, aucun piège, aucun test n'a été écrit ; et la boîte aux lettres, seul canal prévu pour poser ces questions, n'a jamais reçu une réponse de Sébastien.


---

# ANNEXE B — Inventaire exhaustif des redirections — source intégrale

> Source : `PSC_INVENTAIRE_REDIRECTIONS_DEPOT_2026-09-25.md`. Conservée intégralement pour éviter toute perte d'information. Les éventuelles conclusions dépassées ou contredites sont arbitrées dans la Partie I.

# PSC_INVENTAIRE_REDIRECTIONS_DEPOT_2026-09-25

- **Statut** : annexe factuelle du rapport `PSC_RAPPORT_MAITRE_POSTMORTEM_2026-09-25.md` ; lecture seule du clone (400 commits) ; extraction commit par commit et simulation `worker.fetch` du fichier de `main` (même méthode que `lot-f.test.ts`). Décrit le dépôt à `main` = `1a8c3de`, pas la production.
- **Date** : 25/09/2026 (extraction), livré le 26/09/2026.
- **Sources** : `cloudflare-worker/src/index.js`, `cloudflare-worker/test/*`, `next.config.ts`, `e2e/redirections.spec.ts`, `lib/seo-config.ts`, `app/sitemap.ts`, `scripts/seo/*`, `docs/seo-geo/*`, `git log` / `git log -S` / `git blame`.
- **Règle de conflit** : code et `git log` > JOURNAL > DECISIONS. Tout ce qui n'est pas dans le clone est marqué NON PROUVÉ DANS LE DÉPÔT.
- **Production** : extraction réalisée par un agent de lecture du dépôt ; les numéros de ligne, sha et dates ont été relus par échantillon (tables §1.1, entrées XL/G2 §3.1, commits `d3620bd`, `d8b4156`, `e385e14`, `c7224e5`) et sont cohérents avec le clone.

---

# Inventaire sourcé des redirections / 410 — dépôt Sebeth7/packshot-creator, `main` = `1a8c3de`

**Cadre de lecture.** Clone shallow (400 commits) ; commit le plus ancien disponible : `e28f908` (2026-03-28 21:05 +0100, Sébastien). Tout ce qui précède est **NON PROUVÉ DANS LE DÉPÔT**. Les dates sont celles de `git log %ci` ; les auteurs sont les champs `author` de git (`Sébastien`, `Claude`, `Claude de Laurent (brouillon)`). Les lignes citées sont celles de `main` = `1a8c3de`. Les comportements « simulés » ci-dessous proviennent d'un appel direct à `worker.fetch` du fichier de `main` (même méthode que `cloudflare-worker/test/lot-f.test.ts`), origine interceptée (statut 299 = « passe à l'origine Next.js »). Ils décrivent le dépôt, pas la production.

---

## 1. `cloudflare-worker/src/index.js` (2038 lignes) — tables, fonctions, règles génériques

### 1.1 Tables

| Table | Lignes | Entrées | Type | Commit d'introduction dans le dépôt |
|---|---|---|---|---|
| `BLOG_EN_REDIRECTS` | 7-41 | 33 | Set de slugs | `4a322ed` 2026-04-18 |
| `GUIDE_EN_REDIRECTS` | 42-47 | 4 | Set de slugs | `4a322ed` 2026-04-18 (3) ; 4ᵉ ajoutée `94b37bb` 2026-05-01 |
| `GONE_PATHS` | 48-693 | 644 | Set de chemins → 410 | `9a1b1e9` 2026-04-13 (111 entrées) |
| `PASSTHROUGH_HOSTS` | 719-723 | 3 | Set d'hôtes | `9aa1e77` 2026-07-24 |
| `HOST_HOME_MAP` | 725-745 | 19 | hôte → cible de la racine | `9aa1e77` 2026-07-24 |
| `DE_CH_MAP` | 775-826 | 50 | `/de/*` → cible | `d3620bd` 2026-07-07 (33 entrées) |
| `LEGACY_REDIRECTS` | 839-1613 | 773 | chemin → cible 301 | `96f7e06` 2026-04-13 (23 entrées) |
| `PRODUIT_REDIRECTS` | 1660-1665 | 4 | chemin → cible 301 | `f979d88` 2026-04-14 |
| `PRODUCT_REDIRECTS` | 1669-1682 | 12 | chemin → cible 301 | `f979d88` 2026-04-14 (5) |
| `HOWTO_REDIRECTS` | 1687-1806 | 118 | chemin → cible 301 | `f979d88` 2026-04-14 (31) |
| `LANG_SPECIFIC_REDIRECTS` | 1845-1985 | 139 | `/es/*`, `/nl/*` → cible 301 | `4d55141` 2026-04-13 (14) |

Aucune clé dupliquée intra-table sur les 11 tables (contrôlé par script ; c'est aussi ce qu'impose `unicite-tables.test.ts`).

### 1.2 Fonction `shouldReturn410(path)` — lignes 694-709

| Règle | Ligne | Motif | Introduite par |
|---|---|---|---|
| 1 | 695 | `GONE_PATHS.has(path)` | `9a1b1e9` 2026-04-13 |
| 2 | 696 | `path.endsWith("-mod")` ou `path.includes("-old-")` | `9a1b1e9` 2026-04-13 |
| 3 | 697 | préfixes `/ftp/`, `/resources/`, `/pages/`, `/commun/` | `9a1b1e9` 2026-04-13 |
| 4 | 698 | préfixe `/en/en/` | `9a1b1e9` 2026-04-13 |
| 5 | 699-702 | suffixe `/amp` ou `/amp/` dont la base est dans `GONE_PATHS` | `f979d88` 2026-04-14 |
| 6 | 703-704 | chemin sans query dans `GONE_PATHS` | `9a1b1e9` 2026-04-13 |
| 7 | 705-706 | variante sans barre finale dans `GONE_PATHS` | `9a1b1e9` 2026-04-13 |
| 8 | 707 | `/industry/` + `/(examples?\|ejemplos\|beispiele)-` | `4a322ed` 2026-04-18 |

Fait : la fonction est toujours appelée avec `url.pathname` (l. 1811, 1818, 1825, 1990). Un `pathname` ne contient ni query ni fragment ni hôte ; les clés suivantes ne peuvent donc jamais être atteintes par la règle 1 : 98 clés de `GONE_PATHS` en URL absolue (`http://…`/`https://…`, lignes 595-692) ; 7 clés de `GONE_PATHS` contenant `?` ou `#` (l. 55, 224, 230, 232, 233, 236, 670) ; 5 clés de `LEGACY_REDIRECTS` contenant `?` (l. 860, 960, 1271, 1272, 1389). La règle 6 (query) est de ce fait sans effet. `GONE_PATHS` contient 36 clés « avec barre finale » redondantes avec la règle 7.

### 1.3 Ordre d'évaluation dans `fetch` (lignes 713-2033) et règles génériques

| Ordre | Lignes | Règle | Introduite par |
|---|---|---|---|
| 1 | 719-752 | hôte ∈ `PASSTHROUGH_HOSTS` (`videos.`, `books.`, `trail.`) → `fetch(request)` direct | `9aa1e77` 2026-07-24 |
| 2 | 753-764 | hôte legacy (`packshot-creator.com` ou `*.packshot-creator.com` ≠ `www`) : réécriture vers `www` ; si `pathname === "/"` → 301 vers `HOST_HOME_MAP[host]` ou `/fr` | `9aa1e77` 2026-07-24 (l'ancien `packshot-creator.com` → `www` datait de `af934c5` 2026-04-12) |
| 3 | 765-773 | `/` → 301 `/fr`, `Cache-Control: public, max-age=86400` | `af934c5` 2026-04-12 (301) → `94b37bb` 2026-05-01 (302 conditionnelle `Accept-Language`, fr→`/fr` sinon `/en`) → `b778a88` 2026-07-14 (301 inconditionnelle `/fr`) |
| 4 | 774-838 | `/de` ou `/de/*` : `DE_CH_MAP` (clé sans barre finale), sinon repli : `/de/blog/*`→`/de-ch/blog` ; `/de/guide*`→`/de-ch/guide` ; `/de/branchen*`/`/de/industrie*`→`/de-ch/branchen` ; `/de/studio-photo/*`/`/de/fotostudio/*`→`/de-ch/fotostudio/maschinen-finder` ; `/de/packshot-packshotcreator*`→`/de-ch/studios-photo-automatises` ; sinon `/de-ch` | `d3620bd` 2026-07-07 |
| 5 | 1614-1617 | `LEGACY_REDIRECTS[pathname]` ou sans barre finale → 301 | table `96f7e06` ; forme `legacyHit` `9aa1e77` |
| 6 | 1618-1626 | `/blog`→`/fr/blog`, `/guide`→`/fr/guide`, `/academy`→`/fr/academy` | `96f7e06` 2026-04-13 |
| 7 | 1627-1631 | `/industrie/*` → `LEGACY_REDIRECTS["/fr"+path]` si présent, sinon `/fr`+path | préfixe `96f7e06` ; recherche `frHit` (un saut) `c5eaa86` 2026-09-24 |
| 8 | 1632-1634 | `/packshot-packshotcreator*` → `/fr` | `96f7e06` 2026-04-13 |
| 9 | 1635-1639 | `/studio-photo/*` → idem règle 7 (`/fr`+path, ou clé `LEGACY`) | `b77f601` 2026-04-13 ; `frHit` `c5eaa86` |
| 10 | 1640-1642 | `/accessoires*` → `/fr/studios-photo-automatises` | `96f7e06` |
| 11 | 1643-1655 | `/secteur/*` contenant `/exemples-` → **410** | `f979d88` 2026-04-14 |
| 12 | 1656-1659 | `/secteur/<slug>` → `/fr/industrie/<slug>` | `f979d88` |
| 13 | 1660-1668 | `PRODUIT_REDIRECTS` | `f979d88` |
| 14 | 1669-1686 | `PRODUCT_REDIRECTS` (clé sans barre finale) | `f979d88` |
| 15 | 1687-1810 | `HOWTO_REDIRECTS` (clé sans barre finale) | `f979d88` |
| 16 | 1811-1817 | `/blog/<slug>` non-410 → `/en/blog/<slug>` si slug ∈ `BLOG_EN_REDIRECTS`, sinon `/fr/blog/<slug>` | catch-all `96f7e06`, retiré `7f0f471` 2026-04-13, rétabli avec `BLOG_EN_REDIRECTS` `4a322ed` 2026-04-18 |
| 17 | 1818-1824 | `/guide/<slug>` non-410 → `/en/guide/` si ∈ `GUIDE_EN_REDIRECTS`, sinon `/fr/guide/` | idem |
| 18 | 1825-1828 | `/academy/<slug>` non-410 → `/fr/academy/<slug>` | `96f7e06` |
| 19 | 1829-1841 | `/industry/*` + `/(examples?\|ejemplos\|beispiele)-` → **410** | `4a322ed` |
| 20 | 1842-1844 | `/industry` ou `/industry/*` → `/en/industrie` | `4a322ed` |
| 21 | 1845-1989 | `/de`, `/es`, `/nl` (+ sous-chemins) → `LANG_SPECIFIC_REDIRECTS[pathname]` ou `/en` (`/de/*` n'y arrive jamais : capté à l'étape 4) | `4d55141` 2026-04-13 |
| 22 | 1990-2002 | `shouldReturn410(pathname)` → **410** (HTML « Gone », `X-Robots-Tag: noindex, nofollow`, `Cache-Control: public, max-age=86400`, meta refresh 5 s vers `/fr`) | `9a1b1e9` |
| 23 | 2003-2007 | hôte legacy sans règle → 301 vers `www` + même chemin | `9aa1e77` |
| 24 | 2008-2032 | proxy vers `env.NEXTJS_ORIGIN`, cache CF (`cacheTtlByStatus` 301-399 : 86400 s), en-tête `X-Served-By: nextjs`, réécriture de `*.vercel.app` dans `Link` | cache `6646787` 2026-05-09 ; `X-Served-By` `f4762f3` 2026-04-12 |

Conséquence factuelle de cet ordre : toute clé présente à la fois dans `GONE_PATHS` et dans une table de redirection est servie en **301** (les tables sont évaluées avant l'étape 22) ; **59 clés** sont dans ce cas à `main` (23 `LEGACY_REDIRECTS`, 6 `PRODUCT_REDIRECTS`, 1 `HOWTO_REDIRECTS`, 29 `LANG_SPECIFIC_REDIRECTS` — liste identique à `DOUBLONS_GONE_CONNUS` de `unicite-tables.test.ts` l. 56-122). Pour ces clés, l'entrée `GONE_PATHS` ne sert plus qu'aux variantes `/amp` (règle 5).

Fichiers annexes du dossier : `redirections-410-backup.js` (273 l.), `redirections-410-final.js` (301 l.), `redirections-410-updated.js` (295 l.) : anciens Workers `addEventListener('fetch')`, inchangés depuis `e28f908`, non référencés par `wrangler.toml` (`main = "src/index.js"`). `src/routes.json` : documentation datée `2025-12-30`, `"migrated": []`. `wrangler.toml` : routes `www.packshot-creator.com/*`, `packshot-creator.com/*`, `*.packshot-creator.com/*` ; `NEXTJS_ORIGIN = https://sysnext.vercel.app`.

---

## 2. Commits touchant `cloudflare-worker/src/index.js` (36, du plus récent au plus ancien)

Comptes obtenus par extraction des tables à chaque commit et à son parent (clés distinctes ; `+` ajoutées, `−` retirées, `~` cible modifiée).

| Sha | Date | Auteur | Sujet | `--stat` index.js | Changements de tables |
|---|---|---|---|---|---|
| `e112460` | 2026-09-24 15:12 +0000 | Claude | fix(worker): P0-D/E — D29 annulée : /de/fotostudio/alphashot-xl revient à son état de main | 1 − ; test `p0-de-ch-heritage` 4 l. | `DE_CH_MAP` 51→50 : −`/de/fotostudio/alphashot-xl` |
| `c8385ed` | 2026-09-24 14:47 +0000 | Claude | fix(worker): P0-D/E — 410 conservé sur la variante /amp du doublon -22 ; D29 /de/fotostudio/alphashot-xl → alphashot-xl-g2 | 2 + ; test 19 l. | `DE_CH_MAP` +1 (`/de/fotostudio/alphashot-xl`→`…/alphashot-xl-g2`) ; `GONE_PATHS` +1 (`/blog/utilisez-…-22/amp`) |
| `c5eaa86` | 2026-09-24 14:22 +0000 | Claude de Laurent (brouillon) | fix(worker): P0-E héritage /de → équivalents /de-ch exacts ou successeurs documentés ; chaînes /industrie/* à un saut ; doublon -22 ; packshot-mannequin | 30 l. ; nouveau test `p0-de-ch-heritage.test.ts` (80 l.) | `DE_CH_MAP` 33→50 (+17) ; `GONE_PATHS` −1 (`/blog/utilisez-…-22`) ; `LEGACY_REDIRECTS` +2 ; code : `frHit` sur `/industrie/` et `/studio-photo/` |
| `e5a5dcc` | 2026-09-23 07:21 +0000 | Claude | fix(worker): alphashot-xl-g2 sur les 3 entrées hors LEGACY_REDIRECTS | 6 l. ; `lot-f.test.ts` 16 l. | `LANG_SPECIFIC_REDIRECTS` ~2 ; `PRODUCT_REDIRECTS` ~1 (xl-v2 → xl-g2) |
| `90a43ec` | 2026-09-23 07:11 +0000 | Claude | fix(worker): lot F — annexe K, lot C, alphashot-xl-g2, doublon D21, verticale de-ch | 49 l. ; `lot-f.test.ts` (168), `unicite-tables.test.ts` (178) nouveaux ; `next.config.ts` 36 l. | `GONE_PATHS` 648→644 (−4) ; `LEGACY_REDIRECTS` 752→771 (+19, ~12) |
| `38345f3` | 2026-09-19 14:13 +0000 | Claude | fix(worker): DE_CH_MAP — alphashot-xl vers la fiche G2 au lieu de la v2 delistee | 2 l. ; `legacy-redirects.test.ts` 18 l. | `DE_CH_MAP` ~1 |
| `3213579` | 2026-09-17 20:45 +0000 | Claude | fix(worker): redirections legacy des landings et des anciens slugs FR | 17 l. ; nouveau `legacy-redirects.test.ts` (127 l.) | `LEGACY_REDIRECTS` 747→752 (+5, ~5) ; 2 doublons de clé retirés (0 changement de comportement) |
| `0e67bc2` | 2026-07-24 07:21 +0200 | Sébastien | fix(worker): dédoublonne packshot-pro-3d-hd (arbitrage Laurent) + clé livre blanc DA 49 | 2 l. | `LEGACY_REDIRECTS` 746→747 (+`/ftp/livre-blanc-enjeux-ebusiness-fr.pdf`) |
| `9aa1e77` | 2026-07-24 00:07 +0200 | Sébastien | fix(worker): resync sur le correctif sous-domaines legacy de Laurent (23/07) + fix passthrough | 172 l. | `HOST_HOME_MAP` créée (19) ; `PASSTHROUGH_HOSTS` créée (3) ; `LEGACY_REDIRECTS` 698→746 (+50, −2, ~4) ; `PRODUCT_REDIRECTS` +1 ; hôtes legacy, `legacyHit` |
| `b778a88` | 2026-07-14 15:21 +0200 | Sébastien | fix(worker): racine / en 301 permanent vers /fr — purge la conditionnelle Accept-Language | 15 l. | aucune table ; racine 302 conditionnelle → 301 `/fr` |
| `d3620bd` | 2026-07-07 14:46 +0200 | Sébastien | feat(worker): variante A /de→/de-ch + arbitrages Laurent 07/07 (/en 410, traductions) | 253 l. | `DE_CH_MAP` créée (33) ; `GONE_PATHS` 650→648 (+14 `/en/blog/*`, −16 `/de/*`) ; `LANG_SPECIFIC_REDIRECTS` 202→139 (−63 `/de/*`) ; `LEGACY_REDIRECTS` 712→698 (−14, ~45) |
| `6df8f9b` | 2026-07-07 10:18 +0200 | Sébastien | fix(worker): resync source avec le worker déployé du 01/07 (+103 legacy, +157 gone, 6 valeurs corrigées) | 408 l. | `GONE_PATHS` 493→650 (+157) ; `LEGACY_REDIRECTS` 609→712 (+103, ~2) ; `HOWTO` ~3 ; `LANG_SPECIFIC` ~1 ; `PRODUIT` ~2 |
| `d8b4156` | 2026-06-30 23:21 +0200 | Sébastien | feat(catalogue): remplace Alphashot G2 par Alphashot XL G2 dans tout le catalogue | 9 l. ; `e2e/redirections.spec.ts` 19 l. | `LEGACY_REDIRECTS` 606→609 (+3, ~2) ; `LANG_SPECIFIC` ~1 |
| `42e59c5` | 2026-05-23 23:45 +0200 | Sébastien | fix(worker): redirect 9 anciens slugs industrie référencés dans les articles blog | 14 l. | `LEGACY_REDIRECTS` 594→606 (+12 : 9 `/fr/industrie/*`, 3 `/en/industrie/*`) |
| `245f32f` | 2026-05-23 22:50 +0200 | Sébastien | feat: sync worker with deployed version + fix /home regression + add llms.txt | 2520 l. (réécriture, bundle esbuild, guillemets doubles) | `GONE_PATHS` 365→493 (+128) ; `HOWTO` 32→118 (+86) ; `LANG_SPECIFIC` 17→202 (+185) ; `LEGACY_REDIRECTS` 119→594 (+475, ~2) ; `NEXTJS_BLOG_SLUGS` supprimée (125) |
| `6646787` | 2026-05-09 11:11 +0200 | Sébastien | perf(cwv): Sprint 2-3-4 audit mobile — bundle splitting + cache edge + redirects | 49 l. | `LEGACY_REDIRECTS` 107→119 (+12 `/fr/industrie/*` et `/industrie/*`) ; cache CF |
| `155ba03` | 2026-05-07 11:03 +0200 | Sébastien | seo(maillage): liens secteurs home + footer + redirects studio-photo et guide modifier-couleur | 8 l. ; `next.config.ts` 14 l. | `LEGACY_REDIRECTS` ~1 (`/guide/modifier-couleur-produit-photo`) |
| `e89cac4` | 2026-05-07 10:02 +0200 | Sébastien | fix(seo): nettoyage GSC 404 + correctif soft 404 structurel | 129 l. | `GONE_PATHS` 362→365 (+7, −4) ; `LEGACY_REDIRECTS` 47→107 (+60) |
| `b9a91cd` | 2026-05-02 01:21 +0200 | Sébastien | fix(worker): supprimer le fallback Webflow pour /(fr\|en)/blog/* | 9 l. | aucune table |
| `bda6ef5` | 2026-05-02 01:08 +0200 | Sébastien | feat(blog): nouvel article FR "generer-images-produit-ia" | 3 l. | `NEXTJS_BLOG_SLUGS` +1 |
| `3c6b67d` | 2026-05-02 00:57 +0200 | Sébastien | feat(worker): Phase 3 complète — bascule 55 EN blog + 22 EN guides vers Next.js | 62 l. | `NEXTJS_BLOG_SLUGS` 72→124 |
| `94b37bb` | 2026-05-01 23:49 +0200 | Sébastien | feat(worker): Phase 3 blog — extension NEXTJS_BLOG_SLUGS aux 60 FR + catch-up commits | 106 l. | `GONE_PATHS` 347→362 (+15 : 14 images hero + 1) ; `GUIDE_EN_REDIRECTS` +1 ; `LEGACY_REDIRECTS` +3 ; `NEXTJS_BLOG_SLUGS` 12→72 ; racine en 302 `Accept-Language` |
| `f2018f1` | 2026-04-18 11:42 +0200 | Sébastien | fix(worker): ajouter variantes URL-encoded pour le non-breaking hyphen | 2 l. | `GONE_PATHS` +2 |
| `cbe99aa` | 2026-04-18 11:37 +0200 | Sébastien | fix(worker): 15 landing legacy fr.packshot-creator → 410 Gone | 17 l. | `GONE_PATHS` 330→345 (+15) |
| `4a322ed` | 2026-04-18 11:36 +0200 | Sébastien | chore(worker): commiter le nettoyage 404/410 du 16/04 (déjà déployé) | 255 l. | `BLOG_EN_REDIRECTS` créée (33) ; `GUIDE_EN_REDIRECTS` créée (3) ; `GONE_PATHS` 191→330 (+139) ; `HOWTO` +1 ; `LEGACY` +5 ; `PRODUCT` 5→11 ; règles `/industry/` |
| `f979d88` | 2026-04-14 15:12 +0200 | Sébastien | fix(seo): corriger 182 URLs mortes dans le sitemap + enrichir Worker redirections | 225 l. | `GONE_PATHS` 111→191 (+80) ; `HOWTO_REDIRECTS` créée (31) ; `LEGACY` 23→39 ; `PRODUCT_REDIRECTS` créée (5) ; `PRODUIT_REDIRECTS` créée (4) ; règle `/amp`, `/secteur/` |
| `9a1b1e9` | 2026-04-13 22:58 +0200 | Sébastien | fix(seo): 128 pages 404 converties en 410 Gone dans le Worker | 154 l. | `GONE_PATHS` créée (111) ; `shouldReturn410` |
| `cfd7da5` | 2026-04-13 09:27 +0200 | Sébastien | fix: router articles blog/guide Webflow vers Webflow, pas Next.js | 33 l. | `NEXTJS_BLOG_SLUGS` créée (12) |
| `7f0f471` | 2026-04-13 00:53 +0200 | Sébastien | fix: supprimer catch-all /blog/:slug et /guide/:slug du Worker | 14 l. | aucune table |
| `a96ea00` | 2026-04-13 00:45 +0200 | Sébastien | fix: /produits → /fr/studios-photo-automatises (rang 2 SERP) | 2 l. | `LEGACY` ~1 |
| `b77f601` | 2026-04-13 00:40 +0200 | Sébastien | fix: ajouter catch-all /studio-photo/:slug → /fr/studio-photo/:slug | 3 l. | aucune table |
| `494f5d1` | 2026-04-13 00:34 +0200 | Sébastien | fix: ajouter 3 redirections guides ES/DE manquantes vers EN exact | 3 l. | `LANG_SPECIFIC` 14→17 |
| `96f7e06` | 2026-04-13 00:27 +0200 | Sébastien | fix: déplacer 35 redirections legacy FR du next.config.ts vers le Worker | 59 l. | `LEGACY_REDIRECTS` créée (23 clés + règles `/blog`, `/guide`, `/academy`, `/industrie/`, `/packshot-packshotcreator`, `/accessoires`) |
| `4d55141` | 2026-04-13 00:10 +0200 | Sébastien | fix: déplacer redirections DE/ES/NL du next.config.ts vers le Worker | 24 l. | `LANG_SPECIFIC_REDIRECTS` créée (14) |
| `ff0a390` | 2026-04-12 23:49 +0200 | Sébastien | fix: ajouter /logos/ aux patterns Worker pour routage Vercel | 1 l. | aucune table |
| `1305846` | 2026-04-12 21:46 +0200 | Sébastien | fix: route /images/, /favicon, /robots.txt vers Vercel dans le Worker | 3 l. | aucune table |
| `af934c5` | 2026-04-12 21:39 +0200 | Sébastien | fix: Worker redirect / → /fr + fix SSR visibility | 22 l. | racine → 301 `/fr` ; non-www → www |
| `f4762f3` | 2026-04-12 17:58 +0200 | Sébastien | fix: SSR animations, JSON-LD addresses, EN redirections, Cloudflare Worker | 51 l. ; `next.config.ts` 49 l. | proxy Webflow/Next.js, aucune table |
| `e28f908` | 2026-03-28 21:05 +0100 | Sébastien | fix: CTA formations Academy — gradient emerald unifié | 12 l. (limite shallow : fichier de 12 lignes, `MIGRATED_ROUTES = ['/calculateur-roi']`) | aucune table |

---

## 3. Entrées tracées individuellement

Format : Clé | Table | Cible actuelle | Ligne | commit d'introduction | modifications (`410+X` = clé simultanément dans `GONE_PATHS` et dans la table X). Le blame de la ligne actuelle est indiqué quand il diffère du dernier commit de modification.

### 3.1 `alphashot-xl*` et `alphashot-g2` (clé ou cible) — 24 entrées

| Clé | Table | Cible | L. | Intro | Modifs |
|---|---|---|---|---|---|
| `/es/studio-photo/alphashot-xl` | GONE | 410 (morte : `LANG_SPECIFIC` prime) | 371 | 245f32f 2026-05-23 | 6df8f9b 2026-07-07 : ajout en GONE (doublon) |
| `/nl/studio-photo/alphashot-xl` | GONE | 410 (morte) | 496 | 245f32f 2026-05-23 | 6df8f9b 2026-07-07 : ajout en GONE (doublon) |
| `/de/fotostudio/alphashot-g2` | DE_CH_MAP | `/de-ch/fotostudio/alphashot-xl-g2` | 789 | 4d55141 2026-04-13 (en `LANG_SPECIFIC`, cible `/en/studio-photo/alphashot-g2`) | d8b4156 2026-06-30 : → `/en/studio-photo/alphashot-xl-g2` ; d3620bd 2026-07-07 : déplacée en `DE_CH_MAP` → `/de-ch/fotostudio/alphashot-xl-g2` |
| `/de/studio-photo/alphashot-xl` | DE_CH_MAP | `/de-ch/fotostudio/alphashot-xl-g2` | 824 | 245f32f 2026-05-23 (`LANG_SPECIFIC` → `/en/studio-photo/alphashot-xl-v2`) | 6df8f9b : doublon GONE ; d3620bd 2026-07-07 : `DE_CH_MAP` → `/de-ch/fotostudio/alphashot-xl-v2` ; **38345f3 2026-09-19 : → `alphashot-xl-g2`** (blame 38345f3) |
| `/commun/packshot-3d.html` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | 926 | 245f32f 2026-05-23 (cible xl-v2) | **90a43ec 2026-09-23 : xl-v2 → xl-g2** |
| `/de-ch/fotostudio/alphashot-g2` | LEGACY | `/de-ch/fotostudio/alphashot-xl-g2` | 956 | d8b4156 2026-06-30 | — |
| `/en/studio-photo/alphashot-g2` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | 1069 | d8b4156 2026-06-30 | — |
| `/fr/studio-photo/alphashot-g2` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1228 | d8b4156 2026-06-30 | — |
| `/fr/studio-photo/alphashot-xl` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1230 | 6df8f9b 2026-07-07 (cible xl-v2) | **3213579 2026-09-17 : xl-v2 → xl-g2** |
| `/fr/studio-photo/tocadiscos-orbitvu-g2` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1236 | e89cac4 2026-05-07 (cible `alphashot-g2`) | d8b4156 2026-06-30 : g2 → xl-g2 |
| `/gamme-studio/studio-photo-sans-detourage-packshot-r3/specifications` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | 1237 | 245f32f (xl-v2) | 90a43ec 2026-09-23 : xl-v2 → xl-g2 |
| `/product/maestrobot-studio-3d` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | 1431 | 245f32f (xl-v2) | 90a43ec : xl-v2 → xl-g2 |
| `/produit/alphashot-g2` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1439 | 245f32f (cible `alphashot-g2`) | d8b4156 : g2 → xl-g2 |
| `/produit/alphashot-xl` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1441 | 245f32f (xl-v2) | 90a43ec : xl-v2 → xl-g2 |
| `/produit/packshotcreator-r3` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1452 | 245f32f (xl-v2) | 90a43ec : xl-v2 → xl-g2 |
| `/produit/studio-photo-sans-detourage-packshot-r3` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1471 | 245f32f (xl-v2) | 90a43ec : xl-v2 → xl-g2 |
| `/commun/packshot-pro-3d-hd.html` | LEGACY | `/en/studio-photo/alphashot-xl-g2` | 1551 | 245f32f (cible `/en/studio-photo/selecteur-machines`) | 9aa1e77 2026-07-24 : → xl-v2 ; 90a43ec : xl-v2 → xl-g2 |
| `/studio-photo/alphashot-g2` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1581 | 9aa1e77 2026-07-24 | — |
| `/studio-photo/alphashot-xl` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1583 | 9aa1e77 2026-07-24 (xl-v2) | **3213579 : xl-v2 → xl-g2** |
| `/studio-photo/tocadiscos-orbitvu-g2` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1587 | 245f32f (en GONE, 410) | 9aa1e77 2026-07-24 : ajout LEGACY → xl-g2 (clé GONE conservée, morte) |
| `/gamme-studio/plateforme-360-grand-format-spin-o9t/presentation` | LEGACY | `/fr/studio-photo/alphashot-xl-g2` | 1596 | 90a43ec 2026-09-23 | — |
| `/product/photo-studio-r3` | PRODUCT | `/en/studio-photo/alphashot-xl-g2` | 1680 | f979d88 2026-04-14 (xl-v2) | **e5a5dcc 2026-09-23 : xl-v2 → xl-g2** |
| `/es/studio-photo/alphashot-xl` | LANG_SPECIFIC | `/en/studio-photo/alphashot-xl-g2` | 1924 | 245f32f (xl-v2) | 6df8f9b : doublon GONE ; **e5a5dcc : xl-v2 → xl-g2** |
| `/nl/studio-photo/alphashot-xl` | LANG_SPECIFIC | `/en/studio-photo/alphashot-xl-g2` | 1984 | 245f32f (xl-v2) | 6df8f9b : doublon GONE ; **e5a5dcc : xl-v2 → xl-g2** |

Compléments factuels :
- Aucune entrée du Worker ne contient `alphashot-xl-v2`, `alphashot-xl-pro`, `alphashot-xl-wine` ni `alphashot-xl-pro-v2` (grep sur `main`). Aucune cible `/en/photo-studio/…` n'existe dans le Worker (`photo-studio` n'y apparaît que dans des slugs d'articles).
- `/de/fotostudio/alphashot-xl` : ajoutée `c8385ed` 2026-09-24 (→ `/de-ch/fotostudio/alphashot-xl-g2`), retirée `e112460` 2026-09-24 (même jour). À `main`, ce chemin tombe sur le repli l. 833 → `/de-ch/fotostudio/maschinen-finder` (simulation : 301). Il n'y a **aucune** clé `/de/fotostudio/alphashot-xl` dans le fichier.
- Simulation à `main` : `/studio-photo/alphashot-xl-v2` → 301 `/fr/studio-photo/alphashot-xl-v2` (règle générique l. 1635-1639, page `delisted: true` de `machines.ts` l. 347-349) ; `/en/studio-photo/alphashot-xl` → aucune règle Worker (passe à Next.js, cf. §4) ; `/fr/studio-photo/alphashot-g2` → 301 xl-g2 alors que `alphashot-g2` est un `id` de `MACHINES` (`machines.ts` l. 122, `delisted: true` l. 125) et que `generateStaticParams` de `app/[lang]/studio-photo/[slug]/page.tsx` l. 413-419 prérend toutes les machines en fr/en/de-ch.
- Total des bascules xl-v2 → xl-g2 dans le Worker : 13 (3213579 ×2, 38345f3 ×1, 90a43ec ×7, e5a5dcc ×3), soit exactement la liste de D29 (`DECISIONS.md` l. 165-168).

### 3.2 Clés `/en/blog/*` — 117 entrées (62 `GONE_PATHS`, 55 `LEGACY_REDIRECTS`)

| Clé | Table | Cible | L. | Intro | Modifs |
|---|---|---|---|---|---|
| `/en/blog/11-years-service-product-photography` | GONE | 410 | 239 | 9a1b1e9 2026-04-13 | — |
| `/en/blog/3-good-practices-for-organizing-the-production-of-your-internal-photo-studio2` | GONE | 410 | 240 | 9a1b1e9 | — |
| `/en/blog/3d-object-relief-communication` | GONE | 410 | 241 | 9a1b1e9 | — |
| `/en/blog/4-reasons-producing-ecommerce-visuals` | GONE | 410 | 242 | 9a1b1e9 | — |
| `/en/blog/automated-photography-solutions-comparison` | GONE | 410 | 243 | 9a1b1e9 | — |
| `/en/blog/awe-show-return` | GONE | 410 | 244 | 9a1b1e9 | — |
| `/en/blog/blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026` | GONE | 410 | 245 | 6df8f9b 2026-07-07 (LEGACY → `/fr/blog/…`) | d3620bd 2026-07-07 : 301 → **410** |
| `/en/blog/blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026` | GONE | 410 | 246 | 6df8f9b (LEGACY → `/fr/blog/…`) | d3620bd : 301 → **410** |
| `/en/blog/boost-your-conversion-rate-with-product-visuals-4-mistakes-to-avoid` | GONE | 410 | 247 | 9a1b1e9 | — |
| `/en/blog/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter` | GONE | 410 | 248 | 245f32f 2026-05-23 (LEGACY → `/fr/blog/…`) | d3620bd : 301 → **410** |
| `/en/blog/can-one-take-good-product-photos-without-good-material` | GONE | 410 | 249 | 9a1b1e9 | — |
| `/en/blog/comment-automatiser-la-creation-de-vos-photographies-animations-de-produits` | GONE + LEGACY | 301 `/en/blog/automate-creation-product-photographs-animations` (GONE morte) | 250 / 980 | 245f32f (GONE) | 6df8f9b : ajout LEGACY → `/fr/blog/…` ; d3620bd : → `/en/blog/automate-…` |
| `/en/blog/comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet` | GONE | 410 | 251 | 6df8f9b (LEGACY → `/fr/blog/…`) | d3620bd : 301 → **410** |
| `/en/blog/comparatif-de-solutions-de-photographie-automatisee` | GONE + LEGACY | 301 `/en/blog/comparison-of-automated-photography-solutions` | 252 / 991 | 245f32f (GONE) | 6df8f9b : LEGACY → `/fr/blog/…` ; d3620bd : → `/en/blog/comparison-…` |
| `/en/blog/display-clothes-photo-flatlay` | GONE | 410 | 253 | 9a1b1e9 | — |
| `/en/blog/e-commerce-8-elements-success-copy` | GONE | 410 | 254 | 9a1b1e9 | — |
| `/en/blog/e-commerce-million-users-seduce` | GONE | 410 | 255 | 9a1b1e9 | — |
| `/en/blog/e-commerce-stockroom-digital-inventory` | GONE | 410 | 256 | 9a1b1e9 | — |
| `/en/blog/e-commerce-tips-reduce-bounce-rate` | GONE | 410 | 257 | 9a1b1e9 | — |
| `/en/blog/evolution-e-commerce-packshot` | GONE + LEGACY | 301 `/en/blog/e-commerce-packshot-evolution` | 258 / 1003 | 9a1b1e9 (GONE) | 6df8f9b : LEGACY → `/fr/blog/evolution-e-commerce-packshot` ; d3620bd : → `/en/blog/e-commerce-packshot-evolution` |
| `/en/blog/expert-tips-product-photography` | GONE | 410 | 259 | 9a1b1e9 | — |
| `/en/blog/financement-formation-opco-guide-complet-pour-studios-photo-2026` | GONE | 410 | 260 | 6df8f9b (LEGACY → `/fr/blog/…`) | d3620bd : 301 → **410** |
| `/en/blog/formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026` | GONE | 410 | 261 | 6df8f9b (LEGACY → `/fr/blog/…`) | d3620bd : 301 → **410** |
| `/en/blog/generer-images-produit-ia` | GONE | 410 | 262 | 6df8f9b (LEGACY → `/en/blog`) | d3620bd : 301 → **410** |
| `/en/blog/guide-achat-studio-2026` | GONE | 410 | 263 | 6df8f9b (LEGACY → `/fr/blog/guide-achat-studio-2026`) | d3620bd : 301 → **410** |
| `/en/blog/guidelines-trends-social-media-images` | GONE | 410 | 264 | 9a1b1e9 | — |
| `/en/blog/homemade-photo-studio-product-photography` | GONE | 410 | 265 | 9a1b1e9 | — |
| `/en/blog/how-better-export-wine-china-role-e-commerce` | GONE | 410 | 266 | 9a1b1e9 | — |
| `/en/blog/how-visitors-see-products-multiple-perspectives` | GONE | 410 | 267 | 9a1b1e9 | — |
| `/en/blog/htlm5-360-animations-keys-success-e-commerce` | GONE | 410 | 268 | 9a1b1e9 | — |
| `/en/blog/ia-photo-produit-guide-2026` | GONE | 410 | 269 | 6df8f9b (LEGACY → `/fr/blog/…`) | d3620bd : 301 → **410** |
| `/en/blog/importance-visuals-e-commerce-website` | GONE | 410 | 270 | 9a1b1e9 | — |
| `/en/blog/in-house-photo-studio-economies-scale` | GONE | 410 | 271 | 9a1b1e9 | — |
| `/en/blog/instagram-pinterest-which-your-e-commerce` | GONE | 410 | 272 | 9a1b1e9 | — |
| `/en/blog/law-visual-attraction-ecommerce` | GONE | 410 | 273 | 9a1b1e9 | — |
| `/en/blog/les-visuels-au-service-du-referencement-de-votre-e-commerce` | GONE | 410 | 274 | 6df8f9b (LEGACY → `/en/blog`) | d3620bd : 301 → **410** |
| `/en/blog/luxury-shoes-elegance-online` | GONE | 410 | 275 | 9a1b1e9 | — |
| `/en/blog/magnifying-glass-good-zoom-better` | GONE | 410 | 276 | 9a1b1e9 | — |
| `/en/blog/news-e-commerce-photos` | GONE | 410 | 277 | 9a1b1e9 | — |
| `/en/blog/offer-e-shoppers-optimal-browsing` | GONE | 410 | 278 | 9a1b1e9 | — |
| `/en/blog/optimize-budget-management-photo-studio` | GONE | 410 | 279 | 9a1b1e9 | — |
| `/en/blog/orbitvu-vs-concurrents` | GONE | 410 | 280 | 6df8f9b (LEGACY → `/fr/blog/orbitvu-vs-concurrents`) | d3620bd : 301 → **410** |
| `/en/blog/oscaro-com-reduit-ses-retours-darticles-commandes-en-ligne-grace-aux-visuels-a-360deg` | GONE | 410 | 281 | 6df8f9b (LEGACY → `/en/blog`) | d3620bd : 301 → **410** |
| `/en/blog/packshot-invest-orbitvu-photo-studios` | GONE | 410 | 282 | 9a1b1e9 | — |
| `/en/blog/packshotcreator-white-book-e-commerce` | GONE | 410 | 283 | 9a1b1e9 | — |
| `/en/blog/photograph-a-ring-like-a-professional-in-8-steps` | GONE | 410 | 284 | 9a1b1e9 | — |
| `/en/blog/photograph-small-objetcs-e-commerce` | GONE | 410 | 285 | 9a1b1e9 | — |
| `/en/blog/photographing-ring-8-steps` | GONE | 410 | 286 | 9a1b1e9 | — |
| `/en/blog/product-photo-guide` | GONE | 410 | 287 | 9a1b1e9 | — |
| `/en/blog/product-photography-reflections-transparency` | GONE | 410 | 288 | 9a1b1e9 | — |
| `/en/blog/promod-revolutionne-ses-shootings-photos-de-mode` | GONE | 410 | 289 | 6df8f9b (LEGACY → `/en/blog`) | d3620bd : 301 → **410** |
| `/en/blog/revolution-e-commerce-les-animations-3d-spheriques-de-produits-pour-le-sport` | GONE | 410 | 290 | 6df8f9b (LEGACY → `/en/blog`) | d3620bd : 301 → **410** |
| `/en/blog/roi-in-house-photo-studio` | GONE | 410 | 291 | 9a1b1e9 | — |
| `/en/blog/second-life-products-pinterest-e-commerce` | GONE | 410 | 292 | 9a1b1e9 | — |
| `/en/blog/small-items-macrophotography-studio` | GONE | 410 | 293 | 9a1b1e9 | — |
| `/en/blog/story-e-commerce-failure` | GONE | 410 | 294 | 9a1b1e9 | — |
| `/en/blog/tips-wizishop-by-packshotcreator` | GONE | 410 | 295 | 9a1b1e9 | — |
| `/en/blog/use-photo-studio-virtual-reality-2` | GONE | 410 | 296 | 9a1b1e9 | — |
| `/en/blog/visuals-in-house-saves-time-budget` | GONE | 410 | 297 | 9a1b1e9 | — |
| `/en/blog/visuals-referencing-your-e-commerce` | GONE | 410 | 298 | 9a1b1e9 | — |
| `/en/blog/webinar-increase-conversion-rate` | GONE | 410 | 299 | 9a1b1e9 | — |
| `/en/blog/wizishop-new-version` | GONE | 410 | 300 | 9a1b1e9 | — |
| `/en/blog/5-appareils-photo-en-simultane-pour-de-lanimation-3d-realiste` | LEGACY | `/en/blog/5-cameras-realistic-3d-animation` | 974 | 245f32f (→ `/fr/blog/…`) | d3620bd : `/fr/blog/…` → `/en/blog/5-cameras-…` |
| `/en/blog/8-defis-prodution-contenu-visuel` | LEGACY | `/en/blog/8-challenges-producing-visual-content` | 975 | 6df8f9b | — |
| `/en/blog/acheter-studio-photo-packshot-occasion` | LEGACY | `/en/blog/second-hand-packshot-photo-studio` | 976 | 245f32f (→ `/fr/blog/…`) | d3620bd : → EN |
| `/en/blog/avantage-du-e-commerce-pour-les-entreprises` | LEGACY | `/en/blog/potential-advantages-e-commerce-businesses` | 977 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/avantages-toplight-photographie-produits` | LEGACY | `/en/blog/advantages-toplight-product-photography` | 978 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/choix-media-guide-de-la-photographie-packshot-4` | LEGACY | `/en/blog/media-photography-complete-guide-to-packshot-photography-4` | 979 | 6df8f9b | — |
| `/en/blog/comment-avoir-des-photos-professionnelles-guide-packshot-produit` | LEGACY | `/en/blog/how-to-ensure-consistency-between-photos-packshot-photography-guide` | 981 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/comment-avoir-meilleure-photo-produit-e-commerce` | LEGACY | `/en/blog/how-to-e-commerce-product-photography` | 982 | 6df8f9b (→ `/en/blog`) | d3620bd : → article EN |
| `/en/blog/comment-avoir-meilleures-images-amazon` | LEGACY | `/en/blog/how-to-get-best-amazon-product-photos` | 983 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/comment-choisir-objectif-en-photographie-packshot` | LEGACY | `/en/blog/how-to-choose-best-lens-for-product-photography` | 984 | 6df8f9b | — |
| `/en/blog/comment-ia-revolutionne-production-visuelle` | LEGACY | `/en/blog/how-ai-revolutionizing-visual-production` | 985 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/comment-maitriser-le-flou-dans-la-photographie-de-produits` | LEGACY | `/en/blog/how-to-avoid-blurry-product-photographs` | 986 | 6df8f9b | — |
| `/en/blog/comment-mettre-en-valeur-un-produit-guide-photographie-packshot` | LEGACY | `/en/blog/product-showcase-how-to-packshot-photography-guide` | 987 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/comment-shotflow-ameliore-suivi-taches-en-temps-reel` | LEGACY | `/en/blog/how-shotflow-improves-real-time-task-tracking` | 988 | 6df8f9b (→ `/en/blog`) | d3620bd : → article EN |
| `/en/blog/comment-shotflow-permet-accelerer-production-contenus-visuels-mode` | LEGACY | `/en/blog/how-shotflow-accelerates-fashion-visual-content-production` | 989 | 6df8f9b | — |
| `/en/blog/comment-shotflow-permet-optimiser-production-contenu` | LEGACY | `/en/blog/how-shotflow-helps-optimize-content-production` | 990 | 6df8f9b | — |
| `/en/blog/conseils-photo-le-cadrage-et-la-composition` | LEGACY | `/en/blog/tips-photo-framing-composition` | 992 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/de-la-photographie-2d-aux-modeles-3d-de-vos-produits-introduction-a-la-photogrammetrie` | LEGACY | `/en/blog/from-2d-photography-to-3d-models-of-your-products-introduction-to-photogrammetry` | 993 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator` | LEGACY | `/en/blog/interview-laurent-wainberg-founder-packshotcreator` | 994 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/e-commerce-4-fondamentaux-pour-reduire-les-abandons-de-panier` | LEGACY | `/en/blog/4-fundamentals-for-reducing-abandoned-shopping-carts` | 995 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/e-commerce-8-elements-indispensables-pour-reussir` | LEGACY | `/en/blog/e-commerce-8-elements-success` | 996 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/e-commerce-comment-mettre-en-place-votre-studio-photo` | LEGACY | `/en/blog/e-commerce-set-up-internal-packshots` | 997 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/e-commerce-quel-est-le-reel-impact-des-visuels` | LEGACY | `/en/blog/impact-photographs-product-sheet` | 998 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/eclairage-packshots-360-3d-produits` | LEGACY | `/en/blog/lighting-3d-packshots` | 999 | 6df8f9b (→ `/en/blog`) | d3620bd : → article EN |
| `/en/blog/eclairage-photos-produits` | LEGACY | `/en/blog/product-photo-lighting` | 1000 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/ecommerce-jewelry-photography-tutorial` | LEGACY | `/en/blog/technique-photograph-jewelry-tutorial` | 1001 | 245f32f | — |
| `/en/blog/est-il-utile-dinternaliser-sa-production-de-photos-packshot` | LEGACY | `/en/blog/5-questions-before-investing-in-an-in-house-photo-studio` | 1002 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/focus-sur-lhyperfocus` | LEGACY | `/en/blog/focus-on-the-focus-stacking` | 1004 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/guide-photographie-packshot-pourquoi-faire-packshots` | LEGACY | `/en/blog/packshot-photography-guide-why-make-product-packshots` | 1005 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/ia-lumieres-virtuelles-revolution-packshot` | LEGACY | `/en/blog/ai-virtual-lights-revolution-packshot` | 1006 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/interview-visuels-ecommerce-wizishop` | LEGACY | `/en/blog/interview-visuals-ecommerce-wizishop` | 1007 | 6df8f9b | — |
| `/en/blog/joailliers-nos-conseils-pour-reussir-vos-visuels-produits` | LEGACY | `/en/blog/technique-photograph-jewelry-tutorial` | 1008 | 6df8f9b (→ `/en/blog`) | d3620bd : → article EN |
| `/en/blog/la-chaussure-un-secteur-incontournable-du-e-commerce-dynamise-avec-packshotcreator` | LEGACY | `/en/blog/shoes-the-unmissable-e-business-sector-boosted-with-packshotcreator` | 1009 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/lancement-dune-serie-debooks-dediee-au-ecommerce` | LEGACY | `/en/blog/series-e-commerce-ebooks-shooting-products` | 1010 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/logiciel-packshotcreator-ortery-perdu-solution` | LEGACY | `/en/blog/lost-packshotcreator-ortery-software-solution` | 1011 | 6df8f9b | — |
| `/en/blog/materiel-photo-guide-photographie-packshot` | LEGACY | `/en/blog/packshot-photography-guide-product-photography-equipment` | 1012 | 6df8f9b | — |
| `/en/blog/meubles-decorations-comment-etre-plus-visibles-sur-le-web` | LEGACY | `/en/blog/furniture-decoration-e-commerce-photography` | 1013 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/optimiser-collaboration-equipe-success-story-shotflow` | LEGACY | `/en/blog/optimize-team-collaboration-success-story-shotflow` | 1014 | 6df8f9b | — |
| `/en/blog/optimiser-travail-production-visuelle` | LEGACY | `/en/blog/optimizing-visual-production-work` | 1015 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/orbitvu-lautomatisation-au-service-de-la-photographie-3d-360deg` | LEGACY | `/en/blog/orbitvu-automation-for-3d-360-product-photography` | 1016 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026` | LEGACY | `/en/blog/comparatif-orbitvu-ortery-styleshoots-2026` | 1017 | 245f32f (GONE + LEGACY) | **90a43ec 2026-09-23 : clé GONE retirée (D21)** |
| `/en/blog/photographie-360-amazon` | LEGACY | `/en/blog/360-photos-marketplaces` | 1018 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/photographie-de-produits-comment-presenter-vos-vetements` | LEGACY | `/en/blog/product-photography-how-to-showcase-your-clothing` | 1019 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/photographier-une-bague-comme-un-professionnel-en-8-etapes` | LEGACY | `/en/blog/8-steps-to-professional-jewelry-photography` | 1020 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/pourquoi-choisir-orbitvu-photographie-packshot` | LEGACY | `/en/blog/why-choose-orbitvu-for-packshot-photography` | 1021 | 6df8f9b | — |
| `/en/blog/quel-format-d-image-pour-le-web` | LEGACY | `/en/blog/best-image-format-for-the-web` | 1022 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/quel-retour-sur-investissement-avec-un-studio-photo-en-interne` | LEGACY | `/en/blog/what-return-on-investment-with-an-internal-photo-studio` | 1023 | 6df8f9b | — |
| `/en/blog/quel-studio-photo-type-pour-vos-shootings-produits-en-interne` | LEGACY | `/en/blog/best-photo-studio-in-house-photo-shoots` | 1024 | 6df8f9b | — |
| `/en/blog/taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques` | LEGACY | `/en/blog/e-commerce-6-practices-to-boost-your-conversion-rate` | 1025 | 6df8f9b | — |
| `/en/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle` | LEGACY | `/en/blog/use-photo-studio-virtual-reality` | 1026 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/votre-studio-photo-interne-3-bonnes-pratiques-pour-lorganiser` | LEGACY | `/en/blog/3-good-practices-for-organizing-the-production-of-your-internal-photo-studio` | 1027 | 245f32f (→ FR) | d3620bd : → EN |
| `/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie` | LEGACY | `/fr/blog/comment-mettre-en-valeur-un-produit-guide-photographie-packshot` | 1610 | 90a43ec 2026-09-23 (lot C) | — (blame c5eaa86 : déplacement de ligne) |

Fait de couverture : toutes les cibles `/en/blog/<slug>` des tables `LEGACY_REDIRECTS` et `LANG_SPECIFIC_REDIRECTS` correspondent à un article existant (`content/blog/en/*.json` ou dossier statique `app/[lang]/blog/<slug>/`) ; contrôle par script, 0 cible orpheline.

### 3.3 `-old-` : aucune entrée de table ; règle générique seule (l. 696, `9a1b1e9`). `JOURNAL.md` l. 37-53 documente l'incident du 25/09 (`/en/blog/migrate-old-packshotcreator-studio` → 410 par cette règle ; slug renommé `migrate-legacy-…` dans la PR #37). Simulation : `/x-old-y` → 410, `/x-mod` → 410.

### 3.4 `/amp` — 27 entrées + règle générique (l. 699-702, `f979d88`)

| Clé | Table | Cible | L. | Intro | Modifs |
|---|---|---|---|---|---|
| `/2d-product-photography/amp` | GONE | 410 | 49 | 4a322ed | — |
| `/2d-product-photography/amp/` | GONE | 410 | 50 | 245f32f | — |
| `/?amp` | GONE | 410 (inatteignable : query) | 55 | 245f32f | — |
| `/blog/amp/1` | GONE | 410 | 74 | 4a322ed | — |
| `/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22/amp` | GONE | 410 | 183 | **c8385ed 2026-09-24** | — |
| `/category/ecommerce/amp` | GONE | 410 | 201 | 4a322ed | — |
| `/category/ecommerce/amp/` | GONE | 410 | 202 | 245f32f | — |
| `/comparator-features-packshot-studios/amp` | GONE | 410 | 216 | 6df8f9b | — |
| `/comparator-features-packshot-studios/amp/` | GONE | 410 | 217 | 245f32f | — |
| `/comparator-funcionalidades-estudio-foto/amp/1` | GONE | 410 | 219 | 245f32f | — |
| `/e-commerce-6-good-practices-to-boost-your-conversion-rate/amp` | GONE | 410 | 231 | 4a322ed | — |
| `/e-commerce-6-good-practices-…/amp/?__hstc=…` | GONE | 410 (inatteignable) | 232 | 245f32f | — |
| `/fashion-automated-photo-studio/amp` | GONE | 410 | 374 | 4a322ed | — |
| `/fashion-automated-photo-studio/amp/` | GONE | 410 | 375 | 245f32f | — |
| `/home-2/amp` | GONE | 410 | 432 | 245f32f | — |
| `/html5-profiel-360-animaties/amp` | GONE | 410 | 436 | 245f32f | — |
| `/products-animations-360/amp` | GONE | 410 | 527 | 4a322ed | — |
| `/products-animations-360/amp/` | GONE | 410 | 528 | 245f32f | — |
| `/robotic-photo-studio-ecommerce/amp` | GONE | 410 | 556 | 4a322ed | — |
| `/robotic-photo-studio-ecommerce/amp/` | GONE | 410 | 557 | 245f32f | — |
| `https://de.packshot-creator.com/home-2/amp/` | GONE | inatteignable | 639 | 6df8f9b | — |
| `https://es.packshot-creator.com/comparator-funcionalidades-estudio-foto/amp/1/` | GONE | inatteignable | 650 | 6df8f9b | — |
| `https://nl.packshot-creator.com/?amp` | GONE | inatteignable | 670 | 6df8f9b | — |
| `https://nl.packshot-creator.com/html5-profiel-360-animaties/amp/` | GONE | inatteignable | 677 | 6df8f9b | — |
| `https://nl.packshot-creator.com/product/studio-packshotalto-mark-2/amp/` | GONE | inatteignable | 690 | 6df8f9b | — |
| `/3d/amp/1` | LEGACY | `/fr/blog/5-appareils-photo-en-simultane-pour-de-lanimation-3d-realiste` | 856 | 245f32f | — |
| `/amp` | LEGACY | `/fr/blog` | 870 | f979d88 | — |

Effet des retraits de `GONE_PATHS` sur les variantes `/amp` (simulation) : `/2018-guide-e-commerce-photos/amp` → passe à l'origine (clé retirée par `90a43ec`) ; `/blog/lost-packshotcreator-ortery-software-solution/amp` → 410 (clé GONE conservée) ; `/home-2/amp` → 410.

### 3.5 « hub »

- Chaînes contenant `hub` : `https://hub.packshot-creator.com/chunk` (GONE l. 667) et `https://hub.packshot-creator.com/crm/booking` (GONE l. 668), introduites `6df8f9b` 2026-07-07, inatteignables (URL absolue) ; `hub.packshot-creator.com` → `/fr/contact` dans `HOST_HOME_MAP` l. 739 (`9aa1e77`). `/crm/booking` (chemin nu) → `/fr/contact` (LEGACY l. 955, 245f32f). `/chunk` (GONE l. 206, 245f32f) → 410.
- Cibles « hub » des tables : dans `LEGACY_REDIRECTS` (773 entrées, 218 cibles distinctes) : `/fr/industrie` 37, `/en` 34, `/fr/studios-photo-automatises` 26, `/fr/academy` 24, `/fr/contact` 15, `/fr/studio-photo/selecteur-machines` 14, `/fr` 13, `/fr/blog` 11, `/en/studios-photo-automatises` 10, `/fr/ia-photo-produit` 8. `DE_CH_MAP` : voir §3.8.

### 3.6 Sous-domaines `packshot-creator.com`

- `HOST_HOME_MAP` (l. 725-745, `9aa1e77`) : `packshot-creator.com`→`/fr`, `fr.`→`/fr`, `de.`→`/de-ch`, `news.`→`/fr/blog`, `nl.`/`es.`/`it.`/`pl.`/`se.`/`fi.`/`eu.`/`en.`→`/en`, `on.`/`hub.`/`user.`/`esupport.`→`/fr/contact`, `store.`→`/fr/studios-photo-automatises`, `cdn.`/`cdn2.`→`/fr`. `PASSTHROUGH_HOSTS` (l. 719-723) : `videos.`, `books.`, `trail.`. `wrangler.toml` l. 15-19 : route `*.packshot-creator.com/*` « ajoutée au dashboard par Laurent le 23/07/2026 ».
- `GONE_PATHS`, 98 clés en URL absolue (l. 595-692), toutes introduites `6df8f9b` 2026-07-07, jamais modifiées, inatteignables par `pathname` : `de.` 33, `nl.` 26, `fr.` 25, `es.` 8, `hub.` 2, `esupport.` 1, `news.` 1, `on.` 1, `store.` 1.
- `LEGACY_REDIRECTS` : 2 clés `/esupport.packshot-creator.com/portal/en/kb/articles/…` retirées par `9aa1e77` et remplacées par `/portal/en/kb/articles/configuracion-camara` (l. 1556) et `/portal/en/kb/articles/software-foto-animada-360` (l. 1559).

### 3.7 Images et fichiers (`.jpg|.png|.avif|.pdf`) — 30 entrées

| Clé | Table | Cible | L. | Intro |
|---|---|---|---|---|
| `/ftp/SYSNEXT_CGV_EN.pdf` | GONE | 410 | 388 | 9a1b1e9 |
| `/ftp/Sysnext_CGS_EN.pdf` | GONE | 410 | 389 | 9a1b1e9 |
| `/ftp/Sysnext_CGS_FR.pdf` | GONE | 410 | 390 | 9a1b1e9 |
| `/ftp/libro-blanco-problematicas-e-business-fotografia-2-0.pdf` | GONE | 410 | 391 | 9a1b1e9 |
| `/images/hero/hero-landing-packshot-bijoux-md.avif` | GONE | 410 | 441 | 245f32f |
| `/images/hero/hero-landing-packshot-e-commerce-{lg,md,sm,xl,}.avif` (5) | GONE | 410 | 442-446 | 94b37bb 2026-05-01 |
| `/images/hero/hero-landing-packshot-industriel-{lg,md,sm,xl,}.avif` (5) | GONE | 410 | 447-451 | 94b37bb |
| `/images/hero/hero-landing-packshot-mode-lg.avif` | GONE | 410 | 452 | 4a322ed |
| `/images/hero/hero-landing-packshot-mode-{md,sm,xl,}.avif` (4) | GONE | 410 | 453-456 | 94b37bb |
| `/pdf/CP-XL-de.pdf` | GONE | 410 | 511 | 245f32f |
| `/products/Product-Datasheet-PackshotCreator-Classic-EN.pdf` | GONE | 410 | 529 | 245f32f |
| `/products/Product-Datasheet-PackshotOffice-EN.pdf` | GONE | 410 | 530 | 245f32f |
| `/resources/files/2013/09/hyperfocus-montre-small-1.png` | GONE | 410 (redondant avec le préfixe `/resources/`) | 545 | 245f32f |
| `/resources/files/2019/03/en-packshotcreator-r3-installation-guide.pdf` | GONE | 410 | 546 | 9a1b1e9 |
| `/resources/files/2019/04/packshot-packaging-product-photographer-jpg.jpg` | GONE | 410 | 547 | 245f32f |
| `/resources/files/2019/07/33oht3g8b2i-17.jpg` | GONE | 410 | 548 | 245f32f |
| `/resources/files/2020/01/6-shoes-360-animation-settings.jpg` | GONE | 410 | 549 | 245f32f |
| `http://de.packshot-creator.com/pdf/CP-XL-de.pdf` | GONE | inatteignable | 610 | 6df8f9b |
| `/ftp/livre-blanc-enjeux-ebusiness-fr.pdf` | LEGACY | `/fr/blog/lancement-dune-serie-debooks-dediee-au-ecommerce` (prime sur le préfixe `/ftp/`) | 1331 | 0e67bc2 2026-07-24 |

Aucune modification de cible sur ces 30 entrées. Aucune clé `.webp` ni `.gif`/`.svg`.

### 3.8 `DE_CH_MAP` (`/de/*`) — 50 entrées, synthèse

- Commits d'introduction (première apparition de la clé, toutes tables) : `245f32f` 2026-05-23 : 26 (alors dans `LANG_SPECIFIC_REDIRECTS` → cibles `/en/*`) ; `4d55141` 2026-04-13 : 4 (`/de/blog/welches-bildformat-…`, `/de/fotostudio/alphashot-g2`, `/de/guide/welche-ausrustung-…`, `/de/guide/welche-einstellungen-…`) ; `d3620bd` 2026-07-07 : 4 (`/de/branchen/schmuck`, `/de/fotostudio/alphashot-360`, `/de/kontakt`, `/de/wer-sind-wir`) ; `c5eaa86` 2026-09-24 : 16 nouvelles + 1 réintroduite (`/de/guide/quel-equipement-choisir-pour-photo-bijoux`, retirée par d3620bd).
- Historique de table : `d3620bd` crée `DE_CH_MAP` (33) à partir de 63 clés `/de/*` retirées de `LANG_SPECIFIC_REDIRECTS` (30 clés `/de/*` disparaissent sans équivalent — liste en §8, « Suppressions ») et retire 16 clés `/de/*` de `GONE_PATHS`. `38345f3` modifie 1 cible ; `c5eaa86` +17 ; `c8385ed` +1 ; `e112460` −1.
- 10 exemples (l. 776-826) : `/de/automatiser`→`/de-ch/studios-photo-automatises` ; `/de/blog-produits`→`/de-ch/blog` ; `/de/branchen/mode`→`/de-ch/branchen/mode` ; `/de/fotostudio/alphashot-360`→`/de-ch/fotostudio/alphashot-360` ; `/de/fotostudio/bike-studio`→`/de-ch/fotostudio/bike-studio` ; `/de/guides`→`/de-ch/guide` ; `/de/kontakt`→`/de-ch/kontakt` ; `/de/packshot-packshotcreator/packshot-e-commerce`→`/de-ch/packshot-e-commerce` ; `/de/produits`→`/de-ch/fotostudio/maschinen-finder` ; `/de/wer-sind-wir`→`/de-ch/wer-sind-wir`.
- Entrées vers un hub : l. 776 `/de/automatiser` ; 778 `/de/blog-produits` ; 802 `/de/guides` ; 806 `/de/packshot-automatise-PackshotCreator` ; 817 `/de/packshot-secteur-chaussures`→`/de-ch/branchen` ; 819 `/de/packshot-secteur-meuble`→`/de-ch/branchen` ; 821 `/de/packshot-secteur-pieces-techniques`→`/de-ch/branchen` ; 822 `/de/produits`→`maschinen-finder` ; 823 `/de/secteurs`→`/de-ch/branchen`.
- Entrées dont le slug cible diffère du slug source (hors hubs) : 777, 782 (`flaschen`→`wein`), 784 (`produktansichten-…`→`brillen`), 787 (→`wer-sind-wir`), 789 (`alphashot-g2`→`alphashot-xl-g2`), 790-792 (`alphashot-micro`, `alphastudio-compact`, `alphastudio-xxl` → `-v2`), 797 (→`ia-photo-produit`), 798, 808, 810, 811, 812, 813, 815, 816, 818, 820, 824 (`alphashot-xl`→`alphashot-xl-g2`).
- Anomalie : l. 803 `/de/impressum-copy` → `/fr/mentions-legales` est la seule cible hors `/de-ch` (introduite ainsi par `d3620bd`).
- Replis génériques (l. 829-836) simulés : `/de` et `/de/x` → `/de-ch` ; `/de/blog/8-schritte-…` → `/de-ch/blog` ; `/de/guide/x` → `/de-ch/guide` ; `/de/branchen/x`, `/de/industrie/x` → `/de-ch/branchen` ; `/de/fotostudio/x`, `/de/studio-photo/x`, `/de/fotostudio/alphashot-xl`, `/de/fotostudio/alphashot-xl-v2`, `/de/fotostudio/alphashot-xl-g2` → `/de-ch/fotostudio/maschinen-finder` ; `/de/packshot-packshotcreator/x` → `/de-ch/studios-photo-automatises`.

---

## 4. `next.config.ts`, bloc `redirects()` (lignes 39-175) — 61 règles littérales + 17 générées

Historique du fichier : `e28f908` (limite shallow) ; `f4762f3` 2026-04-12 ; `4593312` 2026-04-07 (hors redirects) ; `155ba03` 2026-05-07 ; `8f92146` 2026-06-12 « retire les 56 redirects court-circuités par le worker Cloudflare déployé » ; `421d120` 2026-06-26 ; `2abd020` 2026-07-07 ; `bd498f0` 2026-09-04 (bloc `images`) ; `90a43ec` 2026-09-23. Le commentaire l. 40-51 (blame `8f92146`) énonce que le Worker déployé est la source des redirects legacy et que seuls des chemins `/fr/`, `/en/` doivent figurer ici.

| L. | Source | Destination | Blame (sha, date) | Observation (simulation Worker de `main`) |
|---|---|---|---|---|
| 60 | `/en/photo-studio/alphashot-micro` | `/en/studio-photo/alphashot-micro-v2` | `^e28f908` ≤ 2026-03-28 | passe au Worker (299) : règle active |
| 61 | `/en/photo-studio/alphashot-xl` | `/en/studio-photo/alphashot-xl-v2` | `^e28f908` | active ; destination = fiche `delisted: true` (`machines.ts` l. 347-349), absente de `app/sitemap.ts` l. 29-35 |
| 62 | `/en/photo-studio/alphastudio-compact` | `/en/studio-photo/alphastudio-compact-v2` | `^e28f908` | active |
| 63 | `/en/photo-studio/alphastudio-xxl` | `/en/studio-photo/alphastudio-xxl-v2` | `^e28f908` | active |
| 64 | `/en/photo-studio/e-comm-studio` | `/en/studio-photo/e-comm-studio-plus` | `^e28f908` | active |
| 65 | `/en/photo-studio/360-turntables` | `/en/studios-photo-automatises` | `^e28f908` | active |
| 66 | `/en/photo-studio/:slug` | `/en/studio-photo/:slug` | `^e28f908` | **chaîne** : `/en/photo-studio/alphashot-g2` → `/en/studio-photo/alphashot-g2` → Worker l. 1069 → `/en/studio-photo/alphashot-xl-g2` ; `/en/photo-studio/alphatable-v2` → `/en/studio-photo/alphatable-v2` → Worker l. 1071 → `/en/studio-photo/alphatable` |
| 69 | `/en/studio-photo/alphashot-micro` | `/en/studio-photo/alphashot-micro-v2` | `^e28f908` | **court-circuitée** : Worker LEGACY l. 1070 renvoie déjà 301 vers la même cible (GONE l. 347 morte) |
| 70 | `/en/studio-photo/alphashot-xl` | `/en/studio-photo/alphashot-xl-v2` | `^e28f908` | active (aucune règle Worker) ; **divergence FR/EN** : `/fr/studio-photo/alphashot-xl` → Worker → `alphashot-xl-g2` (l. 1230) |
| 71 | `/en/studio-photo/alphastudio-compact` | `/en/studio-photo/alphastudio-compact-v2` | `^e28f908` | active |
| 72 | `/en/studio-photo/alphastudio-xxl` | `/en/studio-photo/alphastudio-xxl-v2` | `^e28f908` | active |
| 73 | `/en/studio-photo/e-comm-studio` | `/en/studio-photo/e-comm-studio-plus` | `^e28f908` | active |
| 74 | `/en/studio-photo/360-turntables` | `/en/studios-photo-automatises` | `^e28f908` | active |
| 79 | `/fr/studio-photo` | `/fr/studios-photo-automatises` | `155ba03` 2026-05-07 | active |
| 80 | `/en/studio-photo` | `/en/studios-photo-automatises` | `155ba03` | active |
| 88 | `/fr/packshot-bijoux` | `/fr/industrie/bijoux-joaillerie` | `421d120` 2026-06-26 | active |
| 89 | `/en/packshot-bijoux` | `/en/industrie/bijoux-joaillerie` | `421d120` | active ; **chaîne Worker→Next** : `LANG_SPECIFIC` l. 1897 et 1959 ciblent `/en/packshot-bijoux` |
| 92 | `/de-ch/packshot-schmuck` | `/de-ch/branchen/schmuck` | `2abd020` 2026-07-07 | active |
| 97-100 | `/fr/contact/demande-demo`, `/en/contact/request-demo`, `/fr/contact/demande-devis-formation`, `/en/contact/training-quote` | `/{fr,en}/contact?subject=…` | `^e28f908` | actives |
| 107 | `/en/workflow-management-shotflow` | `/en/ia-photo-produit` | `f4762f3` 2026-04-12 | active |
| 108 | `/en/industry` | `/en/industrie` | `f4762f3` | active |
| 109 | `/en/key-questions-product-photography` | `/en/questions-cles-photographie-produit` | `f4762f3` | active |
| 110 | `/en/trainings-product-photography` | `/en/academy` | `f4762f3` | active |
| 111 | `/en/products` | `/en/studio-photo/selecteur-machines` | `f4762f3` | active |
| 112 | `/en/creator-connected-photo-studios` | `/en/studios-photo-automatises` | `f4762f3` | active |
| 113 | `/en/automate-product-photography-packshotcreator` | `/en/studios-photo-automatises` | `f4762f3` | active |
| 114 | `/en/needs-product-photography` | `/en/besoins-photographie-produit` | `f4762f3` | active |
| 115 | `/en/old-photo-studio` | `/en/studios-photo-automatises` | `f4762f3` | active (la règle `-old-` du Worker teste `includes("-old-")` ; `/en/old-photo-studio` ne contient pas ce motif) |
| 116 | `/en/disclaimer` | `/en/mentions-legales` | `f4762f3` | active |
| 117 | `/en/confidentiality` | `/en/confidentialite` | `f4762f3` | active |
| 118-121 | `/en/actualites`, `/en/e-commerce`, `/en/blog-produits`, `/en/innovations` | `/en/blog` | `f4762f3` | actives |
| 122 | `/en/sitemap` | `/en` | `f4762f3` | active |
| 123 | `/en/guides` | `/en/guide` | `f4762f3` | active |
| 126-131 | `/en/packshot-secteur-{chaussures,e-commerce,bijouterie,mode-accessoires,pieces-techniques,meuble}` | `/en/industrie/…` ou `/en/blog` | `f4762f3` | **mortes sur www** : les 6 clés sont dans `GONE_PATHS` l. 339-344 → Worker 410 avant l'origine |
| 132 | `/en/packshot-packshotcreator` | `/en` | `f4762f3` | **morte** : GONE l. 318 → 410 |
| 133 | `/en/packshot-packshotcreator/:slug` | `/en` | `f4762f3` | morte pour les 20 slugs de GONE l. 319-338 (410) ; active pour un slug hors liste |
| 136-147 | `/en/sector/{art-and-antiquities,culinary,beauty,jewelry,wine-spirits,footwear,components,electronics,sport,eyewear,fashion,furniture}` | `/en/industrie[/…]` | `f4762f3` | actives ; 10 destinations ∈ `NOINDEX_EN_INDUSTRIE_SLUGS` (`lib/seo-config.ts` l. 18-36) |
| 151 | `/en/guide/modifier-couleur-produit-photo` | `/en/guide/change-product-photo-color` | `8f92146` 2026-06-12 | **court-circuitée** : Worker LEGACY l. 1050 → même cible (GONE l. 308 morte) |
| 161-165 | `/de-ch/industrie/<slug FR>` ×8 | `/de-ch/branchen/<slug DE>` | `90a43ec` 2026-09-23 | actives |
| 167-171 | `/de-ch/industrie/<slug DE>` ×8 | `/de-ch/branchen/<slug DE>` | `90a43ec` | actives |
| 173 | `/de-ch/industrie/:slug` | `/de-ch/branchen` | `90a43ec` | active |

Règles retirées par `8f92146` (56, dont 4 `/de/*` → `/en/*`, `/de/fotostudio/alphashot-g2` → `/en/studio-photo/alphashot-g2`, `/de`, `/de/:path*`, `/es*`, `/nl*` → `/en`, et 37 chemins sans préfixe langue). `vercel.json` : **absent du dépôt**.

---

## 5. Tests

### 5.1 `cloudflare-worker/test/legacy-redirects.test.ts` (créé `3213579` 2026-09-17, modifié `38345f3`) — lecture textuelle de `LEGACY_REDIRECTS`

| Lignes | Affirme |
|---|---|
| 52-54 | `LEGACY_REDIRECTS` > 700 entrées (le libellé dit « au moins un millier », l'assertion est `> 700`) |
| 56-71 | aucune clé en double |
| 73-78 | aucune cible qui soit elle-même une clé de la table (pas de chaîne 301→301 intra-table) |
| 80-83 | toutes les cibles commencent par `/` |
| 90-94 | `/packshot-amazon`→`/fr/packshot-amazon`, `/packshot-e-commerce`→`/fr/packshot-e-commerce`, `/packshot-mode`→`/fr/packshot-mode` |
| 105-126 | 11 couples avec et sans `/fr`, dont **l. 116 `/studio-photo/alphashot-xl` → `/fr/studio-photo/alphashot-xl-g2`** (et `/fr/studio-photo/alphashot-xl` idem) ; `/studio-photo/alphashot-micro`→`…micro-v2` ; `/industrie/{bijoux,meubles,beautes,sports,high-tech-…,simplifiez-…}` |
| 133-139 | texte du fichier contient `"/de/studio-photo/alphashot-xl": "/de-ch/fotostudio/alphashot-xl-g2"` |
| 141-144 | le fichier ne contient pas `"/de-ch/fotostudio/alphashot-xl-v2"` |

### 5.2 `cloudflare-worker/test/lot-f.test.ts` (créé `90a43ec`, modifié `e5a5dcc`) — appel réel de `worker.fetch`

| Lignes | Affirme |
|---|---|
| 42-62 | 17 mappings annexe K → 301 (dont l. 51 `/gamme-studio/plateforme-360-grand-format-spin-o9t/presentation` → `/fr/studio-photo/alphashot-xl-g2`) |
| 64-73 | 4 anciens 410 → 301 (`/commun/presse-details.html/3`, `/2018-guide-e-commerce-photos`, `/range-pro/…x2/prasentation`, `/range-studio/…r3/presentation`) |
| 75-77 | `/commun/presse-details.html/4` → 410 (préfixe `/commun/`) |
| 81 | `/industrie-defense` → `/fr/industrie/defense-securite` |
| 84-93 | 7 clés LEGACY → `alphashot-xl-g2` (`/commun/packshot-3d.html`, `/gamme-studio/…/specifications`, `/product/maestrobot-studio-3d`, `/produit/alphashot-xl`, `/produit/packshotcreator-r3`, `/produit/studio-photo-sans-detourage-packshot-r3`, `/commun/packshot-pro-3d-hd.html`) |
| 95-99 | **aucune ligne du Worker ne contient `alphashot-xl-v2`** |
| 102-108 | `/product/photo-studio-r3`, `/es/studio-photo/alphashot-xl`, `/nl/studio-photo/alphashot-xl` → `/en/studio-photo/alphashot-xl-g2` |
| 110-116 | lot C : `/fr/blog/potential-advantages-…`→FR, `/fr/blog/series-e-commerce-ebooks-…`→FR, `/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie`→`/fr/blog/comment-mettre-en-valeur-…` |
| 118-120 | `/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026` → 301 `/en/blog/comparatif-orbitvu-ortery-styleshoots-2026` |
| 122-127 | `/` → `/fr` ; **`/de/studio-photo/alphashot-xl` → `/de-ch/fotostudio/alphashot-xl-g2`** |
| 129-172 | `next.config.ts` : 8 secteurs de `DE_CH_SECTOR_MAP`, 16 règles `/de-ch/industrie/*` en 301, repli `/de-ch/branchen` en dernier, 17 règles au total |

### 5.3 `cloudflare-worker/test/p0-de-ch-heritage.test.ts` (créé `c5eaa86`, modifié `c8385ed`, `e112460`)

| Lignes | Affirme |
|---|---|
| 30-46 | 13 `EXACT_EQUIVALENT` `/de/*` → `/de-ch/*` (blog ×2, guide ×2, fotostudio ×4, branchen ×3, `/de/guides`, `/de/blog-produits`) |
| 48-56 | 5 `DOCUMENTED_SUCCESSOR` : `alphashot-micro`→`-v2`, `alphastudio-compact`→`-v2`, `alphastudio-xxl`→`-v2`, `flaschen`→`wein`, `/packshot-packshotcreator/packshot-mannequin`→`/fr/studio-photo/fashion-studio` |
| 58-67 | chaînes à un saut : `/industrie/{shootings-photo,bouteilles,art-de-table-photos-culinaires,pieces-techniques,lunetterie}` ; `/blog/…-22` → `/fr/blog/utilisez-…` |
| 69-79 | `/blog/…-22/amp` et `…/amp/` → **410** |
| 81-85 | **`/de/fotostudio/alphashot-xl` → `/de-ch/fotostudio/maschinen-finder`** (« REVIEW_PRODUCT_MAPPING — D29 annulée le 24/09/2026 ») |
| 87-97 | 7 REVIEW inchangés : `/de/workflow-management-shotflow`, `/de/altes-fotostudio`, `/de/automatisieren-…`, `/de/produkte` → `/de-ch` ; `/de/guide/welche-einstellungen-fur-schmuckfotografie` → `/de-ch/guide` ; `/packshot-packshotcreator/packshot-{mode,e-commerce}` → `/fr` |

### 5.4 `cloudflare-worker/test/unicite-tables.test.ts` (créé `90a43ec`)

| Lignes | Affirme |
|---|---|
| 124-137 | 0 clé dupliquée dans chacune des 11 tables |
| 140-151 | 0 clé partagée entre deux tables de redirection |
| 153-163 | intersection `GONE_PATHS` × chaque table de redirection = exactement `DOUBLONS_GONE_CONNUS` (59 clés listées l. 56-122) — toute nouvelle ou toute disparue fait échouer |
| 165-167 | `/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026` absent de `GONE_PATHS` |
| 169-177 | `/2018-guide-e-commerce-photos`, `/range-pro/…x2/prasentation`, `/range-studio/…r3/presentation` absents de `GONE_PATHS` |

### 5.5 `e2e/redirections.spec.ts` (Playwright ; `^e28f908`, modifié une seule fois par `d8b4156` 2026-06-30) — en-tête l. 4 : « Validates all configured redirections in next.config.ts »

| Lignes | Affirme |
|---|---|
| 7-33 | 14 chemins sans préfixe (`/contact`, `/blog`, `/guide`, `/e-commerce`→`/fr/blog`, `/formation(s)`→`/fr/academy`…) → 301 |
| 35-60 | 13 anciennes URL Webflow (`/packshot-secteur-*`, `/studio-photo`, `/blendai`, `/packshot-packshotcreator`→`/fr`, `/accessoires`…) → 301 |
| 64-65 / 75 | `/en/photo-studio/alphashot-xl` et `/en/studio-photo/alphashot-xl` → **`/en/studio-photo/alphashot-xl-v2`** |
| 72 | `/en/photo-studio/alphashot-g2` → `/en/studio-photo/alphashot-g2` |
| 92-99 | 7 `/es/*` → `/en/*` |
| 101-105 | `/de/blog/welches-bildformat-…` → **`/en/blog/best-image-format-for-the-web`** ; `/de/blog/8-schritte-…` → `/en/blog/8-steps-…` ; `/de/guide/welche-ausrustung-…` et `welche-einstellungen-…` → `/en/guide/…` |
| 107 | `/de/fotostudio/alphashot-g2` → **`/en/studio-photo/alphashot-xl-g2`** (modifié par `d8b4156`) |
| 109-111 | 2 `/nl/*` → `/en/*` |
| 126-132 | **`/de` → `/en`**, `/es`→`/en`, `/nl`→`/en`, `/de/some-random-page` → `/en` |
| 147-149 | `/fr/studio-photo/alphashot-g2`, `/en/studio-photo/alphashot-g2`, `/de-ch/fotostudio/alphashot-g2` → `…/alphashot-xl-g2` (ajouté par `d8b4156`) |
| 164-167 | 4 variantes contact |

### 5.6 Contradictions relevées entre tests (faits, sans interprétation)

1. `e2e` l. 65/75 : `alphashot-xl` (EN) → `alphashot-xl-v2` ; `legacy-redirects` l. 116 et `lot-f` l. 95-99 : `alphashot-xl` (FR, DE, ES, NL) → `alphashot-xl-g2`, et « aucune ligne du Worker ne contient `alphashot-xl-v2` ». Les deux ensembles portent sur des fichiers différents (`next.config.ts` vs Worker) et sont chacun vrais sur `main`.
2. `e2e` l. 101, 104, 105 (`/de/blog/welches-bildformat-…`, `/de/guide/welche-…` → `/en/…`) contredisent `DE_CH_MAP` l. 781, 799, 800 (→ `/de-ch/…`, depuis `d3620bd`). `e2e` l. 102 (`/de/blog/8-schritte-…` → `/en/blog/…`) : ce chemin tombe sur le repli `/de-ch/blog` (l. 830). `e2e` l. 107 (`/de/fotostudio/alphashot-g2` → `/en/studio-photo/alphashot-xl-g2`) contredit `DE_CH_MAP` l. 789 (→ `/de-ch/fotostudio/alphashot-xl-g2`). `e2e` l. 126 et 130 (`/de`, `/de/some-random-page` → `/en`) contredisent l. 774-838 (→ `/de-ch`, simulation confirmée). Ces assertions e2e correspondent aux règles `next.config.ts` retirées par `8f92146` (2026-06-12).
3. `e2e` l. 72 + l. 148 : `/en/photo-studio/alphashot-g2` → `/en/studio-photo/alphashot-g2` → `/en/studio-photo/alphashot-xl-g2` : le spec affirme une chaîne de deux 301.
4. `lot-f` l. 125 (`/de/studio-photo/alphashot-xl` → XL G2) et `p0-de-ch-heritage` l. 83 (`/de/fotostudio/alphashot-xl` → `maschinen-finder`) : deux chemins voisins, deux cibles, chacune testée comme attendue.
5. CI : `.github/workflows/pr-checks.yml` exécute `tsc`, `verifier-json.mjs`, `eslint`, `next build` (l. 38-60) ; ni `vitest` ni `playwright` n'apparaissent dans les 3 workflows. `vitest.config.ts` l. 11 inclut `cloudflare-worker/test/**/*.test.ts`. `playwright.config.ts` l. 20/30 : `baseURL` = `PLAYWRIGHT_BASE_URL` ou `http://localhost:3000` (serveur `next dev`, donc sans Worker).

---

## 6. Documentation `docs/seo-geo/`

### 6.1 `JOURNAL.md` — entrées mentionnant redirect/301/410/Worker/lot F/P0-D/E/XL/GONE/LEGACY/DE_CH/hub/AMP/sous-domaine/image/REVIEW

| Lignes | Date · titre · auteur | Résumé factuel (Quoi / Vérifié / Non regardé) |
|---|---|---|
| 37-53 | 2026-09-25 · Correctif : slug EN de l'article migration renvoyé en 410 par le Worker · Claude de Sébastien | Quoi : slug `migrate-old-…` → `migrate-legacy-…` (PR #37) car `shouldReturn410` renvoie 410 sur `-old-`. Vérifié : nouveau slug testé contre la fonction extraite de `main`. Non regardé : Worker réellement déployé. |
| 77-122 | 2026-09-25 · P0-K resynchronisation documentaire · Claude de Laurent | l. 103 : Worker #16 déployé le 20/09 06:40:14 UTC, version `167d7a15`. l. 108 : D29, D30, D31 conformes. |
| 290-336 | 2026-09-25 · Déploiement du Worker — P0-D/E · Claude de Laurent | Quoi : `wrangler deploy` depuis `main` `69cd647`, version CF `27b0153c…`, 25/09 05:07:25 UTC (PR #30). Vérifié : prod identique octet pour octet avant ; 30 premiers sauts changés (60 avec barre finale) ; « 0 chemin Alphashot XL » ; `/amp` du -22 en 410 ; témoins `curl.exe` de Laurent PASS, dont `/de/fotostudio/alphashot-xl` → `maschinen-finder` et `/de/studio-photo/alphashot-xl` → XL G2 (l. 319-320) ; `videos.` 404, `books.` 302 même hôte, `trail.` 200 (l. 321). Non regardé : les 30 chemins un par un ; GSC J+14. Rollback : `wrangler rollback 05c5c47c…` (l. 330). |
| 337-383 | 2026-09-24 · Gouvernance P0 — D29 à D31 · Claude de Laurent | Vérifié l. 363 : `/de-ch/fotostudio/alphashot-xl-v2` 200, `delisted: true`, absente du sitemap ; « 13 entrées passées de xl-v2 à xl-g2 entre le 17/09 et le 23/09 » ; `next.config.ts` : 2 règles vers xl-v2. l. 365-369 : D29 suspendue, PR #31 fermée, redirection `/de/fotostudio/alphashot-xl` retirée de #30 (`e112460`), 13 + 2 laissées en l'état. l. 373 : Worker non déployé au 24/09. |
| 424-465 | 2026-09-24 · P0-D/E — héritage /de → /de-ch, chaînes à un saut, doublon -22 · Claude de Laurent | Quoi : 17 clés `DE_CH_MAP`, 2 `LEGACY`, −1 `GONE`, `frHit` sur `/industrie/` et `/studio-photo/` (`c5eaa86`). Vérifié : 218/218 tests ; simulation 3 691 chemins, 30 changements. Écarts R7 l. 444-447 (consigne : 23 changements, patch : 30 ; `/studio-photo/` non demandé). Non regardé l. 451 : variante `/amp` du -22 (passait 410 → 404). Ajout l. 455-458 (`c8385ed`) : `/amp` remis en 410, D29 ajoutée. Correction l. 460-465 (`e112460`) : D29 annulée. |
| 515-537 | 2026-09-23 · Déploiement du Worker — lot F · Claude de Laurent | Quoi : `wrangler deploy` de `29ca657`, version `05c5c47c…`, 23/09 07:41:22 UTC. Vérifié l. 529 : écart prod→`main` = 38 lignes identiques au diff de la PR #26 (LEGACY 19 ajouts + 12 cibles, GONE 4 retraits, PRODUCT 1, LANG 2). Non regardé : `curl.exe` de Laurent. |
| 539-570 | 2026-09-23 · Lot F — annexe K, lot C, alphashot-xl-v2, doublon D21, verticale de-ch · Claude de Laurent | Quoi : LEGACY +19/~12, GONE −4, PRODUCT ~1, LANG ~2, `next.config.ts` de-ch. Vérifié l. 553 : `LEGACY_REDIRECTS` (l. 1595 alors) consultée avant `shouldReturn410` (l. 1967 alors) ; l. 557 : doublons GONE × redirection 60 → 59. Écarts R7 l. 560-564 : 10 entrées xl-v2 = 7 LEGACY + 3 hors LEGACY ; « le dépôt en compte 24 » doublons GONE/LEGACY + 36 autres. Non regardé l. 568 : variantes `/amp` des 4 clés retirées (410 → 404) ; `next.config.ts` renvoie encore `/en/photo-studio/alphashot-xl` et `/en/studio-photo/alphashot-xl` vers xl-v2. |
| 617-635 | 2026-09-20 · Déploiement du Worker — #16 seul · Claude de Laurent | Quoi : déploiement de `287caee`, version `167d7a15…`, 20/09 06:40:14 UTC : 3 landings, `alphashot-xl` → G2 sur 3 entrées, 5 clés `/industrie/`, 2 doublons retirés. Vérifié l. 629 : diff prod↔`main` = 11 `+` / 8 `−` = `git diff a117848^1 a117848` ; `modified_on` passé de 2026-07-24T05:20:47Z à 2026-09-20T06:40:15Z ; prod : 1055 entrées et 2 doublons. Non regardé : contrôle `curl.exe`. |
| 677-695 | 2026-09-19 · Chantier marque — M3, M4 ; inventaire du lot F · Claude de Laurent | Vérifié l. 689 : `/` en 302 `Accept-Language` du 01/05 au 14/07 ; 301 `/fr` depuis `b778a88`. Annexe K : 1 conforme, 2 à corriger, 14 absentes, 4 en 410. |
| 697-715 | 2026-09-19 · Nettoyage du suivi · Claude de Laurent | l. 709 : `alphashot-xl-v2` `delisted: true` (`machines.ts:347`), page servie mais hors sitemap et pied de page → correction `DE_CH_MAP` (`38345f3`) ; « 10 autres entrées du Worker ciblent encore `alphashot-xl-v2` (6 vers `/en`, 4 vers `/fr`) », reportées au lot F. |
| 719-743 | 2026-09-17 · Redirections legacy — landings packshot-* et anciens slugs FR · Claude de Laurent | Quoi (PR #16) : LEGACY 5 valeurs, 5 clés, 2 doublons ; DE_CH_MAP 1 valeur (ajout du 19/09). Écart R7 l. 735-737 : 17 des 22 entrées demandées existaient ; `/fr/studio-photo/alphashot-xl` et `/studio-photo/alphashot-xl` ciblaient xl-v2, consigne xl-g2 appliquée. Non regardé l. 741 : 10 autres entrées vers xl-v2 ; `/fr/industrie/objets-art-antiquite`, `/fr/studio-photo/orbitvu-kit-mini-midi` laissés. |
| 765-787 | 2026-09-17 · URL /en/blog/ en 404 dans GSC · Claude de Laurent | Vérifié l. 779 : sur 14 URL, Worker du dépôt : 5 × 410 (GONE), 5 × 301 (LEGACY), 4 à l'origine (3 × 404, 1 × 307). Non regardé l. 785 : sources externes ; 307 `/de-ch/industrie/mode-textile` → 404. Suite l. 787 : `/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie` sans règle (règle ajoutée depuis par `90a43ec`, l. 1610). |
| 824-866 | 2026-09-17 — Diagnostic de la baisse de trafic | l. 849 : crawl 17/09, pages 404/410 39 → 1 ; l. 851 : trois landings `packshot-*` avec canonique Google vers l'URL racine legacy. |
| 870-888 | 2026-09-17 · C2, C3 — Requalification 403 × ASN · Claude de Laurent | l. 882 : « Le Worker du dépôt ne contient aucune règle 403 par user-agent. » |
| 974-1027 | 2026-09-17 · C4 — Worker synchronisé entre dépôt et production (constat) · Claude de Laurent | Vérifié l. 992-1015 : 17/09, `modified_on` 2026-07-24T05:20:47Z, comptes de clés identiques prod/`main` (LEGACY 749, GONE 648, LANG 139, HOWTO 118, DE_CH 33, BLOG_EN 33, HOST_HOME 19, PRODUCT 12, GUIDE_EN 4, PRODUIT 4, PASSTHROUGH 3) ; 7 blocs de différence cosmétiques. Non regardé l. 1021-1024 : identifiant de déploiement, WAF, unicité des clés (E4). |
| 1194-1214 | 2026-09-16 · Clôture de C1 et piège de la traduction Chrome · Claude de Sébastien | l. 1211-1212 Non regardé : « Les redirections du Worker, qui ne sont couvertes par aucun de ces contrôles. » |
| 1216-1288 | 2026-09-16 · Correctifs de l'audit du 03/09 · Claude de Sébastien | l. 1225 : sélecteur de langue ne pointe plus vers une page `/en` en `noindex` (repli hub EN) ; l. 1229-1230 : `NavLink` pour corriger des chaînes 307→404. |
| 1333-1380 | 2026-09-16 · Reprise du mandat · Claude de Sébastien | l. 1419-1420 (Supposé) : « la production du Worker diverge encore du dépôt (dernier constat du 03/09) » ; l. 1427-1428 Non regardé : Worker déployé. |

### 6.2 `DECISIONS.md` — statuts verbatim

- **D4** (l. 550-567) · 2026-07-24 · Le dépôt est la source unique du Worker — `**Statut** : en vigueur`. Interdit : éditer au dashboard ; déployer sans resynchronisation. Contexte l. 559-562 : « un passthrough vide redirigeant un sous-domaine actif » a cassé les vidéos.
- **D21** (l. 275-286) · 2026-09-18 · Divergence Worker dépôt/production : close — `**Statut** : en vigueur`. l. 285 : doublon `/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026` « entre `LEGACY_REDIRECTS` l. 1006 et `GONE_PATHS` l. 282 est à retirer au lot F » (retiré par `90a43ec`).
- **D29** (l. 146-174) · 2026-09-24 · Alphashot XL v2 et XL G2 : mapping produit à valider — `**Statut** : \`SUSPENDED / REVIEW_PRODUCT_MAPPING\` — n'est **pas** en vigueur. L'orientation initiale du 24/09 (« le successeur de l'Alphashot XL v2 est l'Alphashot XL G2 ») est suspendue le jour même.` Tableau l. 158-168 : 13 redirections Worker + 2 règles `next.config.ts` + `/de/fotostudio/alphashot-xl`, toutes « laissées en l'état ». l. 170 : interdit toute nouvelle redirection XL, tout rollback automatique, toute modification des 2 règles Next ; note que `lot-f` et `legacy-redirects` vérifient l'absence de `alphashot-xl-v2`.
- **D30** (l. 133-145) · mensualités de-ch — `**Statut** : en vigueur` (sans redirection).
- **D3** (l. 569-578) · `noindex` sur `/en` réversible — `**Statut** : en vigueur` ; « pas en 301 ». **D9** (l. 483-496) · traduire les 30 pages `/en` plutôt que rediriger — `**Statut** : en vigueur` ; interdit « poser un 301 sur ces pages ».
- **D28** (l. 176-188) — `**Statut** : en vigueur` ; l. 181 : C6 = « redirections legacy vers `/fr` », pilote de 25 URL « dans un cycle distinct du lot F » ; l. 183 : racine conditionnelle jusqu'au 14/07 puis 301 `/fr`.
- **D23** (l. 247-260) — `**Statut** : en vigueur — **amende R4 (CLAUDE.md) et B1 (03-PIEGES.md)**` ; l. 252 : `curl.exe` depuis le poste de Laurent renvoie les codes réels, Worker compris.
- **D35** (l. 43-55) — `**Statut** : en vigueur` : article EN « ni supprimé, ni `noindex`, ni redirigé maintenant ».

### 6.3 `BOITE-AUX-LETTRES.md`

- **Q14** (l. 153-181) · article EN tenant une requête française · close 25/09 → D35 ; option C (« le rediriger vers la landing FR ») écartée (l. 173).
- **Q1** (l. 354-369) · close 17/09 → D17 ; option (c) « redirection ou noindex durable de tout ou partie des 30 pages » non retenue.
- **Q15** (l. 118-151) : l. 126 « la racine est redirigée en 301 vers /fr depuis le 14/07 ».
- Aucune question ne mentionne `alphashot-xl`, `GONE_PATHS`, `LEGACY_REDIRECTS` ni `de-ch` au sens redirection. Q16 à Q18 « non reconstituées » (`JOURNAL.md` l. 107, 380).

### 6.4 `ETAT.md`

- l. 3 : Worker P0-D/E `CLOSED`, version `27b0153c` ; D29 suspendue.
- l. 20 : lot F — PR #26 fusionnée, Worker déployé 23/09 (`05c5c47c`) ; reste le `curl.exe` de Laurent à reporter.
- l. 21, 48, 79, 103 : D29 `SUSPENDED / REVIEW_PRODUCT_MAPPING` ; 13 redirections + 2 règles Next laissées ; « aucun changement XL avant validation du mapping ».
- l. 24 : C6 — pilote 25 URL, cycle distinct du lot F, fichier `cloudflare-worker/src/index.js`, ouvert depuis 04/09.
- l. 46 : `curl.exe` du lot F à reporter au journal.
- l. 57-59 : mesures GSC attendues : #16 (~04/10), lot F (07/10), P0-D/E (09/10).
- l. 97 : P0-D/E `CLOSED` 25/09, Worker `69cd647` / `27b0153c…`, rollback `05c5c47c…`.
- l. 104 : #31 `CLOSED / NOT MERGED`.

---

## 7. Autres fichiers

- `middleware.ts` (9 l.) : `createMiddleware(routing)` next-intl ; matcher exclut `api`, `_next`, `_vercel`, `calculateur-roi`, `roi-pro`, `roi-preview`, `etude-clients-2026`, fichiers avec extension. Aucune redirection explicite.
- `i18n/routing.ts` : locales `fr`, `en`, `de-ch` ; `localePrefix: 'always'` ; `alternateLinks: false` (commentaire : l'en-tête `Link` émettait un x-default en 307) ; `localeCookie: false` ; commentaire l. 11 : « DE/ES/NL (sans suffixe région) restent redirigées vers https://blendai.studio » — **NON PROUVÉ DANS LE DÉPÔT** : aucune règle du Worker ni de `next.config.ts` ne cible `blendai.studio`. Segments localisés de-ch : `industrie`→`branchen`, `studio-photo`→`fotostudio`, `a-propos`→`wer-sind-wir`, `contact`→`kontakt`, etc.
- `lib/seo-config.ts` l. 1-13, `NOINDEX_EN_BLOG_SLUGS` (11) : `blendai-vs-flair-ai-…`, `blendai-vs-photoroom-…`, `comment-calculer-le-roi-…`, `financement-formation-opco-…`, `formation-photo-produit-professionnelle-…`, `guide-achat-studio-2026`, `ia-photo-produit-guide-2026`, `orbitvu-vs-concurrents`, `photographie-2d-de-produits`, `photographie-3d-de-produits-une-serie-complete-…`, `photographie-de-produits-a-360-degres-en-interne`. Historique : `7e351b7` 2026-05-23, `d574e69` 2026-06-12. Usage : `app/[lang]/blog/[slug]/page.tsx` l. 53, 62 (noindex + alternates), `lib/blog.ts` l. 182, `app/sitemap.ts` l. 147, 157. Autres sets : `NOINDEX_EN_INDUSTRIE_SLUGS` (17, l. 18-36), `NOINDEX_EN_ACADEMY_SLUGS` (6), `NOINDEX_EN_SOLUTIONS_SLUGS` (3).
- `app/sitemap.ts` : `MACHINES` (l. 29-35) = 13 ids, sans `alphashot-g2`, `alphashot-xl-v2`, `alphashot-xl-wine-v2`, `alphadesk` (les 4 `delisted: true` de `machines.ts` l. 125, 349, 401, 508) ; blog EN exclu si `NOINDEX_EN_BLOG_SLUGS` (l. 147, 157) ; commentaire l. 145 « Les slugs EN noindex sont 301 vers /fr via le Worker » — dans le Worker de `main`, 8 de ces 11 slugs sont en **410** (`GONE_PATHS` l. 245, 246, 251, 260, 261, 263, 269, 280) depuis `d3620bd`, et les 3 autres n'ont aucune règle ; de-ch : `DE_CH_SECTORS` 8 slugs (l. 174), machines ×13, blog/guide de-ch.
- `scripts/seo/smoke.mjs` (277 l.) : 17 URL témoins (l. 50-70 : `/fr`, `/en`, `/de-ch`, `/fr/studios-photo-automatises`, `/fr/industrie`, `/fr/industrie/bijoux-joaillerie`, `/fr/industrie/horlogerie`, `/fr/blog`, `/fr/guide`, `/fr/contact`, `/fr/distributeur-orbitvu-suisse`, `/fr/ia-photo-produit`, `/fr/academy`, `/de-ch/branchen/schmuck`, `/de-ch/kontakt`, `/en/blog`, `/fr/outil-financement` en `indexable: false`) ; l. 14-16 et 275 : « les redirections legacy, les 410 et les sous-domaines ne s'y testent pas ». `verifier-consequences.mjs` l. 74-77 : `cloudflare-worker/` dépend de « ~1 000 redirections legacy, les 410, les sous-domaines, la racine / », « NON testable en Preview ».
- Articles `/en/blog` réellement rendus : `content/blog/en/` = 57 JSON ; dossiers statiques `app/[lang]/blog/<slug>/` = 12 (`blendai-vs-flair-ai-…`, `blendai-vs-photoroom-…`, `budget-studio-photo-automatise`, `comment-calculer-le-roi-…`, `comparatif-orbitvu-ortery-styleshoots-2026`, `financement-formation-opco-…`, `formation-photo-produit-professionnelle-…`, `guide-achat-studio-2026`, `ia-photo-produit-guide-2026`, `orbitvu-vs-concurrents`, `prestataire-packshot-vs-studio-interne`, `studio-ia-vs-ia-generative`). Intersections : `GONE_PATHS` `/en/blog/*` (62) ∩ `content/blog/en` = ∅ ; `GONE` ∩ statiques = 8 (les 8 slugs FR ci-dessus, aussi dans `NOINDEX_EN_BLOG_SLUGS`) ; `NOINDEX` − `GONE` = 3 (`photographie-2d-…`, `photographie-3d-…`, `photographie-de-produits-a-360-…`, présents dans `content/blog/en/`, servis en `noindex`, simulation : passent à l'origine) ; `BLOG_EN_REDIRECTS` (33) ⊂ `content/blog/en`.
- CI : voir §5.6 point 5.

---

## 8. Historique 410 ↔ 301 et changements de cible (toutes tables, tout l'historique du clone)

Convention : `410` = clé dans `GONE_PATHS` ; `410+X` = clé dans `GONE_PATHS` et dans la table X (X prime à l'exécution, cf. §1.3).

#### A. 410 → 301 (clé retirée de `GONE_PATHS`, ajoutée à une table de redirection)

| Commit | Clé | Avant | Après |
|---|---|---|---|
| `e89cac4` 2026-05-07 | `/home` | 410 | LEGACY → `/` (puis `/fr` par `245f32f`) |
| `e89cac4` | `/index.asp` | 410 | LEGACY → `/` (→ `/fr` `245f32f` ; → `/en/studio-photo/selecteur-machines` `6df8f9b` ; → `/fr/studios-photo-automatises` `9aa1e77`) |
| `e89cac4` | `/it` | 410 | LEGACY → `/en` |
| `e89cac4` | `/packshotcreator-is-a-time-saving-and-stressless-solution-for-product-photography` | 410 | LEGACY → `/en` |
| `90a43ec` 2026-09-23 | `/2018-guide-e-commerce-photos` | 410 | LEGACY → `/fr/blog/lancement-dune-serie-debooks-dediee-au-ecommerce` |
| `90a43ec` | `/range-pro/foto-studio-enterprise-packshot-creator-x2/prasentation` | 410 | LEGACY → `/de-ch/studios-photo-automatises` |
| `90a43ec` | `/range-studio/studio-photo-without-clipping-packshot-r3/presentation` | 410 | LEGACY → `/en/studio-photo/alphashot-360` |
| `c5eaa86` 2026-09-24 | `/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22` | 410 | LEGACY → `/fr/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle` |

#### B. 301 → 410 (`d3620bd` 2026-07-07, 14 clés `/en/blog/*` retirées de `LEGACY_REDIRECTS` et mises dans `GONE_PATHS`)

`blendai-vs-flair-ai-…` (était → `/fr/blog/…`), `blendai-vs-photoroom-…` (→ FR), `boostez-votre-taux-de-conversion-…` (→ FR), `comment-calculer-le-roi-…` (→ FR), `financement-formation-opco-…` (→ FR), `formation-photo-produit-professionnelle-…` (→ FR), `generer-images-produit-ia` (→ `/en/blog`), `guide-achat-studio-2026` (→ FR), `ia-photo-produit-guide-2026` (→ FR), `les-visuels-au-service-du-referencement-…` (→ `/en/blog`), `orbitvu-vs-concurrents` (→ FR), `oscaro-com-reduit-…` (→ `/en/blog`), `promod-revolutionne-…` (→ `/en/blog`), `revolution-e-commerce-les-animations-3d-…` (→ `/en/blog`).

#### C. Clé déjà en 410, ajout d'une entrée 301 qui prime (clé GONE conservée, morte sauf `/amp`)

- `6df8f9b` 2026-07-07 (10) : `/blog/lost-packshotcreator-ortery-software-solution` → `/en/blog/lost-…` ; `/en/blog/comment-automatiser-…` → `/fr/blog/…` ; `/en/blog/comparatif-de-solutions-…` → `/fr/blog/…` ; `/en/blog/evolution-e-commerce-packshot` → `/fr/blog/…` ; `/en/guide/animation-360-focus-stacking` → `/fr/guide/…` ; `/en/guide/comment-photographier-lunettes-e-commerce` → `/fr/guide/…` ; `/en/guide/modifier-couleur-produit-photo` → `/fr/guide/…` ; `/en/guide/quel-equipement-choisir-pour-photo-bijoux` → `/fr/guide/…` ; `/en/guide/realiser-animation-360-professionnelle-chaussures` → `/fr/guide/…` ; `/en/industrie/high-tech-electromenager-informatique` → `/en/industrie/electronique-hightech`.
- `9aa1e77` 2026-07-24 (7) : `/commun/packshot-creator.html` → `/en/studios-photo-automatises` ; `/studio-photo/360-drehtische` → `/fr/studio-photo/selecteur-machines` ; `/studio-photo/alphashot-360-kleine-producten` → `/fr/studio-photo/alphashot-360` ; `/studio-photo/alphastudio-compact` → `…-v2` ; `/studio-photo/e-comm-studio` → `…-plus` ; `/studio-photo/studio-photo-360-alphastudio-xxl` → `alphastudio-xxl-v2` ; `/studio-photo/tocadiscos-orbitvu-g2` → `alphashot-xl-g2`.

#### D. Clé déjà en 301, ajout d'une entrée `GONE_PATHS` sans effet (`6df8f9b` 2026-07-07, 53 clés)

16 `/de/*` (`automatiser`, `besoins-photographie-produit`, `createur-des-studios-photos-connectes`, `gestion-workflow-shotflow`, `impressum-copy`, `industrie/schmuck`, `packshot-packshotcreator/packshot-amazon`, `packshot-secteur-{bijouterie,chaussures,e-commerce,meuble,mode-accessoires,pieces-techniques}`, `produits`, `secteurs`, `studio-photo/alphashot-xl`) — ces 16 clés GONE ont été retirées par `d3620bd` (groupe E) ; 20 `/es/*` ; 9 `/nl/*` ; `/en/quote-second-hand-photo-studio` ; `/how-to/how-to-photograph-eyewear` ; 6 `/product/*` (`360-photo-studio-diamonds-gemstones`, `livestudio-fotos-automatizada`, `livestudio-renews-image-capturing/caracteristiques-livestudio`, `packshot-rotating-plate/caracteristiques-packshotspin-series`, `packshotspin-jewelry`, `packshotstudio-modular-lighting`). Les 37 hors `/de/*` sont toujours en doublon à `main` (liste `DOUBLONS_GONE_CONNUS`).

#### E. Doublon 410 retiré (la 301 seule subsiste)

- `d3620bd` (16) : les 16 `/de/*` du groupe D, déplacées en `DE_CH_MAP` (cibles : `/de-ch/studios-photo-automatises`, `/de-ch/produktfotografie-bedarf`, `/de-ch/wer-sind-wir`, `/de-ch/ia-photo-produit`, `/fr/mentions-legales`, `/de-ch/branchen/schmuck` ×2, `/de-ch/packshot-amazon`, `/de-ch/branchen` ×4, `/de-ch/packshot-e-commerce`, `/de-ch/branchen/mode`, `/de-ch/fotostudio/maschinen-finder`, `/de-ch/fotostudio/alphashot-xl-v2`).
- `90a43ec` (1) : `/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026` (D21).

#### F. Cible modifiée, doublon GONE conservé

- `d3620bd` (8) : `/en/blog/comment-automatiser-…` → `/en/blog/automate-creation-product-photographs-animations` ; `/en/blog/comparatif-de-solutions-…` → `/en/blog/comparison-of-automated-photography-solutions` ; `/en/blog/evolution-e-commerce-packshot` → `/en/blog/e-commerce-packshot-evolution` ; `/en/guide/animation-360-focus-stacking` → `/en/guide/360-animation-focus-stacking` ; `/en/guide/comment-photographier-lunettes-e-commerce` → `/en/guide/how-to-photograph-glasses-for-e-commerce` ; `/en/guide/modifier-couleur-produit-photo` → `/en/guide/change-product-photo-color` ; `/en/guide/quel-equipement-choisir-pour-photo-bijoux` → `/en/guide/which-equipment-to-choose-for-jewelry-photo` ; `/en/guide/realiser-animation-360-professionnelle-chaussures` → `/en/guide/create-professional-360-animation-of-shoes`.
- `e5a5dcc` 2026-09-23 (2) : `/es/studio-photo/alphashot-xl`, `/nl/studio-photo/alphashot-xl` : xl-v2 → xl-g2.

#### G. Cible modifiée (sans doublon)

| Commit | Clé | Avant → Après |
|---|---|---|
| `a96ea00` 2026-04-13 | `/produits` | `/fr/studio-photo/selecteur-machines` → `/fr/studios-photo-automatises` |
| `155ba03` 2026-05-07 | `/guide/modifier-couleur-produit-photo` | `/fr/blog` → `/fr/guide/modifier-couleur-produit-photo` |
| `245f32f` 2026-05-23 | `/home`, `/index.asp` | `/` → `/fr` |
| `d8b4156` 2026-06-30 | `/de/fotostudio/alphashot-g2` (LANG) | `/en/studio-photo/alphashot-g2` → `/en/studio-photo/alphashot-xl-g2` |
| `d8b4156` | `/fr/studio-photo/tocadiscos-orbitvu-g2`, `/produit/alphashot-g2` | `/fr/studio-photo/alphashot-g2` → `…/alphashot-xl-g2` |
| `6df8f9b` 2026-07-07 | `/en/quote-second-hand-photo-studio/` | `/en/contact` → `/en/blog/second-hand-packshot-photo-studio` |
| `6df8f9b` | `/es/blog/ultimas-tendencias-fotos-productos` | `/en/blog/guide-achat-studio-2026` → `/fr/blog/guide-achat-studio-2026` |
| `6df8f9b` | `/how-to/fabriquer-plateau-tournant-360-bijoux`, `/how-to/photographie-360-colliers-suspendus` | `/fr/studio-photo/alphashot-micro` → `…-v2` |
| `6df8f9b` | `/index.asp` | `/fr` → `/en/studio-photo/selecteur-machines` |
| `6df8f9b` | `/produit/e-comm-studio` | `/fr/studio-photo/e-comm-studio` → `…-plus` |
| `6df8f9b` | `/produit/studio-photo-bijoux-gemmes` | `/fr/studio-photo/alphashot-micro` → `…-v2` |
| `d3620bd` 2026-07-07 | 13 `/de/*` (LANG → DE_CH_MAP) | `/de/blog/welches-bildformat-…` `/en/blog/best-image-format-for-the-web` → `/de-ch/blog/welches-bildformat-…` ; `/de/fotostudio/alphashot-g2` `/en/studio-photo/alphashot-xl-g2` → `/de-ch/fotostudio/alphashot-xl-g2` ; `/de/guide/welche-ausrustung-…` → `/de-ch/guide/…` ; `/de/guide/welche-einstellungen-…` → `/de-ch/guide/…` ; `/de/packshot-automatise-PackshotCreator` → `/de-ch/studios-photo-automatises` ; `/de/packshot-packshotcreator/packshot-bijoux` `/en/packshot-bijoux` → `/de-ch/branchen/schmuck` ; `…/packshot-e-commerce` → `/de-ch/packshot-e-commerce` ; `…/packshot-fashion` `/en/industrie/mode-textile` → `/de-ch/packshot-mode` ; `…/packshot-horlogerie` `/en/industrie/bijoux-joaillerie` → `/de-ch/branchen/uhren` ; `…/packshot-industriel` → `/de-ch/packshot-industrie` ; `…/packshot-mannequin` → `/de-ch/fotostudio/fashion-studio` ; `…/packshot-mode` → `/de-ch/packshot-mode` ; `…/packshot-pret-a-porter` `/en/industrie/mode-textile` → `/de-ch/branchen/mode` |
| `d3620bd` | 37 `/en/blog/*` et `/en/guide/*` (LEGACY) | cible `/fr/blog/<slug FR>` ou `/en/blog` → article/guide EN réel (détail intégral en §3.2 ; guides : `comment-faire-focus-stacking-pour-photographier-bracelet` → `how-to-do-focus-stacking-for-bracelet-photography`, `comment-mettre-en-valeur-textures-produits-packshot` → `how-to-enhance-product-textures-in-a-packshot`) |
| `9aa1e77` 2026-07-24 | `/3D-fotografie-erfahrung` | `/en` → `/de-ch/fotostudio/maschinen-finder` |
| `9aa1e77` | `/comment-mieux-exporter-son-vin-en-chine-quel-role-jouent-les-visuels-e-commerce` | `/fr` → `/fr/industrie/vin-spiritueux` |
| `9aa1e77` | `/commun/packshot-pro-3d-hd.html` | `/en/studio-photo/selecteur-machines` → `/en/studio-photo/alphashot-xl-v2` |
| `9aa1e77` | `/index.asp` | `/en/studio-photo/selecteur-machines` → `/fr/studios-photo-automatises` |
| `3213579` 2026-09-17 | `/fr/studio-photo/alphashot-xl`, `/studio-photo/alphashot-xl` | xl-v2 → xl-g2 |
| `3213579` | `/packshot-amazon` | `/fr/blog/photographie-360-amazon` → `/fr/packshot-amazon` |
| `3213579` | `/packshot-e-commerce` | `/fr/guide/comment-photographier-lunettes-e-commerce` → `/fr/packshot-e-commerce` |
| `3213579` | `/packshot-mode` | `/fr/blog/comment-shotflow-permet-accelerer-…` → `/fr/packshot-mode` |
| `38345f3` 2026-09-19 | `/de/studio-photo/alphashot-xl` (DE_CH_MAP) | xl-v2 → xl-g2 |
| `90a43ec` 2026-09-23 | `/commun/packshot-3d.html`, `/commun/packshot-pro-3d-hd.html`, `/gamme-studio/…r3/specifications`, `/product/maestrobot-studio-3d`, `/produit/alphashot-xl`, `/produit/packshotcreator-r3`, `/produit/studio-photo-sans-detourage-packshot-r3` | xl-v2 → xl-g2 |
| `90a43ec` | `/fr/blog/potential-advantages-e-commerce-businesses` | `/en/blog/…` → `/fr/blog/avantage-du-e-commerce-pour-les-entreprises` |
| `90a43ec` | `/fr/blog/series-e-commerce-ebooks-shooting-products` | `/en/blog/…` → `/fr/blog/lancement-dune-serie-debooks-dediee-au-ecommerce` |
| `90a43ec` | `/packshot-creator-new-photo-software-2018` et `…/` | `/en/ia-photo-produit` → `/fr/ia-photo-produit` |
| `90a43ec` | `/range-maestrobot/3d-scan-modeling-product` | `/en/blog/5-cameras-realistic-3d-animation` → `/fr/blog/5-appareils-photo-en-simultane-…` |
| `e5a5dcc` 2026-09-23 | `/product/photo-studio-r3` | xl-v2 → xl-g2 |

#### H. Clés retirées de toutes les tables (sans remplacement par clé exacte)

- `d3620bd` : 30 clés `/de/*` de `LANG_SPECIFIC_REDIRECTS` (8 `/de/blog/*`, 5 `/de/branchen/*`, 9 `/de/guide/*`, `/de/packshot-packshotcreator` et 7 sous-chemins `packshot-{fond-blanc,grands-produits,lille,luxe,lyon,orbitvu,petits-produits,photo-produit,photographe,produit,video}`) — désormais servies par les replis génériques l. 829-836 (`/de-ch/blog`, `/de-ch/branchen`, `/de-ch/guide`, `/de-ch/studios-photo-automatises`).
- `9aa1e77` : 2 clés `/esupport.packshot-creator.com/portal/en/kb/articles/*` (remplacées par leur forme `/portal/…`).
- `e112460` : `/de/fotostudio/alphashot-xl` (ajoutée le même jour par `c8385ed`).

#### I. Chaînes et ordres à `main` (simulation)

- Cibles du Worker que le Worker redirige lui-même : **aucune** (262 cibles distinctes testées).
- Cible du Worker qui est une source de `next.config.ts` : `/en/packshot-bijoux` (LANG l. 1897, 1959 → Next l. 89 → `/en/industrie/bijoux-joaillerie`).
- Cibles du Worker vers un hub `/en/industrie/<slug>` en `NOINDEX_EN_INDUSTRIE_SLUGS` : 10 slugs distincts.
- Cibles du Worker vers une fiche `delisted` : aucune par table ; une par règle générique (`/studio-photo/alphashot-xl-v2` → `/fr/studio-photo/alphashot-xl-v2`).

---

## Points non trouvés dans le dépôt

1. Tout état antérieur à `e28f908` (2026-03-28) : origine des règles `next.config.ts` l. 60-74 et 97-100 (blame `^e28f908`), des fichiers `redirections-410-*.js`, et du premier Worker déployé.
2. La source non bundlée du Worker (`JOURNAL.md` l. 1014-1015 : « la source non bundlée ne vit pas dans le dépôt ») ; le fichier de `main` est un bundle esbuild depuis `245f32f`.
3. Le code réellement déployé sur Cloudflare et ses versions (`167d7a15`, `05c5c47c`, `27b0153c`) : cités dans `JOURNAL.md`/`ETAT.md`, non vérifiables ici.
4. Les résultats `curl.exe` du lot F (« à reporter au journal », `ETAT.md` l. 46) : absents.
5. Les documents de consigne P0 (« Master SEO/GEO V3 », patches `PSC_PATCH_*`, annexe K, tableaux REVIEW) : hors dépôt ; seules leurs traces dans le JOURNAL et les tests existent.
6. Le contenu de Q16 à Q18 (`JOURNAL.md` l. 107, 380).
7. Une preuve de la redirection « DE/ES/NL vers https://blendai.studio » annoncée dans `i18n/routing.ts` l. 11 : aucune règle correspondante dans le Worker ni dans `next.config.ts`.
8. La PR #31 (`next.config.ts`, fermée sans fusion) : aucun de ses commits n'est sur `main` (`JOURNAL.md` l. 375) ; son contenu n'est pas dans le clone.
9. Une exécution des suites `vitest`/Playwright dans ce clone (pas de `node_modules`) : les affirmations des tests sont lues, non exécutées ; seule la simulation directe de `worker.fetch` a été faite.
10. Une justification écrite, dans le dépôt, du choix `/de/impressum-copy` → `/fr/mentions-legales` (`DE_CH_MAP` l. 803) et du maintien des 98 clés `GONE_PATHS` en URL absolue et des 12 clés avec query, inatteignables par `pathname`.


---

# ANNEXE C — Gap closing audit final — source intégrale

> Source : `PSC_GAP_CLOSING_2026-09-26.md`. Conservée intégralement pour éviter toute perte d'information. Les éventuelles conclusions dépassées ou contredites sont arbitrées dans la Partie I.

# PSC_GAP_CLOSING_2026-09-26

- **Statut** : passe de fermeture des trous, lecture seule absolue. Aucune modification du dépôt, de Cloudflare, de Vercel, de Supabase, de n8n. Aucun workflow déclenché. Aucun secret lu ni affiché.
- **Date** : 26/09/2026, 07 h 30 – 09 h (Paris).
- **Portée** : exécutée depuis le projet claude.ai (pas depuis Claude Code sur le poste de Laurent). Accès réels de cette session : clone Git + `git fetch` du dépôt public ; API Cloudflare **Workers** (lecture du code déployé) ; n8n (lecture des exécutions) ; Supabase (SELECT) ; build local du site. **Non accessibles** : `www.packshot-creator.com` (403 challenge Cloudflare depuis ce conteneur, R4/D23) ; `sysnext.vercel.app` (proxy : CONNECT 403) ; API GitHub (rulesets, corps de PR hors pages publiques) ; rulesets Cloudflare (WAF, Super Bot Fight Mode, Security Events).
- **Sources** : `claude/PSC_RAPPORT_MAITRE_POSTMORTEM_2026-09-25.md`, `claude/PSC_INVENTAIRE_REDIRECTIONS_DEPOT_2026-09-25.md` (lus intégralement) ; dépôt à `origin/main` ; code du Worker déployé (API Cloudflare, 26/09) ; n8n ; Supabase ; build local ; pages publiques GitHub des PR #24 et #27 ; fils du projet.
- **Annexe** : `PSC_GAP_CLOSING_ANNEXE_DECH_SCHEMA_36_2026-09-26.md` (listes exactes des points 10, 11, 12).
- **Règle de conflit** : code déployé et `git` > build local > JOURNAL > DECISIONS > fils. Une simulation du Worker décrit la couche Worker, **jamais** `www`.
- **Classement** : PROUVÉ · CONTREDIT · NON PROUVÉ · INACCESSIBLE.

---

## Réponses point par point

### 1. Freeze actuel — **FREEZE = 1a8c3de CONFIRMÉ** · PROUVÉ

- `git fetch origin main` (26/09) : `origin/main` = `1a8c3de` (fusion de #37, 25/09 15:05 +0200). Aucun commit depuis.
- Références de PR sur le dépôt : #24 à #37 ; aucune au-delà de #37.
- Worker : le code déployé (`packshot-router`, id `dba3dfac…`, lu par l'API le 26/09) est **identique à `cloudflare-worker/src/index.js` de `main`** après normalisation du bundle wrangler (commentaires et helpers `__name` retirés) : 2 024 lignes de part et d'autre, même empreinte (`70e3fed291c2781c`). Aucune modification du Worker depuis le déploiement P0-D/E du 25/09 05:07 UTC n'est détectable dans le code. La date `modified_on` n'est pas exposée par l'outil de cette session : NON PROUVÉ au niveau des métadonnées de version.

### 2. Production `www` — **INACCESSIBLE**

- Une requête depuis ce conteneur : `HTTP/1.1 403` (challenge Cloudflare). Conforme à D23 : seul le poste de Laurent (liste blanche IPv6) ou Chrome voit `www`. Aucune substitution par l'origine Vercel.
- **Ce qui est prouvé à la place, et qui ne vaut pas contrôle `www`** : comportement de la **couche Worker** par exécution du **code déployé** (origine simulée, statut 299 = « passe à Next ») :

| Chemin | Worker déployé | Suite côté Next (code de `main`) |
|---|---|---|
| `/fr`, `/en`, `/de-ch` | passe | 200 |
| `/en/blog/migrate-old-packshotcreator-studio` | **410**, `Cache-Control: public, max-age=86400`, `X-Robots-Tag: noindex, nofollow` | — |
| `/en/blog/migrate-legacy-packshotcreator-studio` | passe | 200 (article #37) |
| `/fr/studio-photo/alphashot-xl` | 301 → `/fr/studio-photo/alphashot-xl-g2` | — |
| `/en/studio-photo/alphashot-xl` | passe | `next.config.ts:70` → 301 `/en/studio-photo/alphashot-xl-v2` (fiche délistée, 200) |
| `/en/photo-studio/alphashot-xl` | passe | `next.config.ts:61` → 301 `…/alphashot-xl-v2` |
| `/de/studio-photo/alphashot-xl` | 301 → `/de-ch/fotostudio/alphashot-xl-g2` | — |
| `/de/fotostudio/alphashot-xl` | 301 → `/de-ch/fotostudio/maschinen-finder` | — |
| `/de-ch/fotostudio/alphashot-xl` | passe | slug hors catalogue → `notFound()` (404) (`page.tsx:505`) |
| `/fr\|/en\|/de-ch/…/alphashot-g2` | 301 → `…/alphashot-xl-g2` | — |
| `/de/fotostudio/alphashot-g2` | 301 → `/de-ch/fotostudio/alphashot-xl-g2` | — |
| `/en/photo-studio/alphashot-g2` | passe | `next.config.ts:66` → 301 `/en/studio-photo/alphashot-g2` → Worker 301 → `alphashot-xl-g2` (**2 sauts**) |
| `/fr\|/en\|/de-ch/…/alphashot-xl-v2` | passe | 200 (fiche `delisted`, hors sitemap) |
| `/studio-photo/alphashot-xl-v2` | 301 → `/fr/studio-photo/alphashot-xl-v2` | 200 |
| `/fr\|/en\|/de-ch/…/alphashot-xl-g2` | passe | 200 |
| `/de/fotostudio/alphashot-xl-g2` | 301 → `/de-ch/fotostudio/maschinen-finder` (repli) | — |

- Les 301 de tables du Worker ne portent pas d'en-tête `Cache-Control` dans le code ; les 410 portent `max-age=86400` ; les 3xx de l'origine sont mis en cache edge 86 400 s (`cacheTtlByStatus`).
- **D31 sur `/de-ch` (build local, pas `www`)** : `Review` = 0, `aggregateRating` = 0, bloc de témoignages non rendu (`TestimonialsSection.tsx:15`) sur `/de-ch`, `/de-ch/studios-photo-automatises`, `/de-ch/ia-photo-produit` · PROUVÉ au niveau application. **Statistique « 60+ % Kostensenkung — Kundenstudie PackshotCreator 2025 »** rendue sur ces trois pages (`messages/de-ch.json:26`) : ce n'est ni un avis ni un témoignage au sens de la lettre de D31 ; c'est un claim chiffré sourcé à une étude dont l'existence n'est pas dans le dépôt → FAIT MÉTIER À CONFIRMER.
- Canonical et robots des pages `www` : INACCESSIBLE. Au niveau application, les canonicals sont auto-référents sur `https://www.packshot-creator.com` (build local).
- **Commande pour obtenir `www` (poste de Laurent, PowerShell 5.1, une ligne, lecture seule)** :
  `& { foreach($u in '/fr','/en','/de-ch','/en/blog/migrate-old-packshotcreator-studio','/en/blog/migrate-legacy-packshotcreator-studio','/fr/studio-photo/alphashot-xl','/en/studio-photo/alphashot-xl','/de/studio-photo/alphashot-xl','/de/fotostudio/alphashot-xl','/de-ch/fotostudio/alphashot-xl','/fr/studio-photo/alphashot-g2','/en/studio-photo/alphashot-g2','/de-ch/fotostudio/alphashot-g2','/en/photo-studio/alphashot-g2','/fr/studio-photo/alphashot-xl-v2','/en/studio-photo/alphashot-xl-v2','/de-ch/fotostudio/alphashot-xl-v2','/fr/studio-photo/alphashot-xl-g2','/en/studio-photo/alphashot-xl-g2','/de-ch/fotostudio/alphashot-xl-g2','/en/blog/guide-achat-studio-2026'){ "=== $u"; curl.exe -s -o NUL -D - "https://www.packshot-creator.com$($u)?v=gap26" | Select-String -Pattern '^(HTTP|location|cache-control|x-robots-tag|cf-cache-status|x-served-by)' } } | Out-File -Encoding utf8 "$HOME\Downloads\PSC_WWW_2026-09-26.txt"`

### 3. Les 8 articles EN en 410 — **INTENTION DU 410 = PROUVÉE** · **PROBLÈME ACTUEL = DOCUMENTATION**

- `d3620bd` (Sébastien, 07/07 14:46) : message « variante A /de→/de-ch + **arbitrages Laurent 07/07** (/en 410, traductions) » ; corps : « 45 entrées /en/blog|guide/<slug-fr> repointées vers leur traduction EN existante, **14 sans équivalent passées en 410 (dont les 8 TSX statiques noindex dont le contenu vit en /fr)** ». Diff : les 8 clés sortent de `LEGACY_REDIRECTS` (où elles pointaient vers `/fr/blog/<même slug>`) et entrent dans `GONE_PATHS`. Fil du projet du 07/07 : le Claude de projet valide ce raffinement « contre ma propre lettre ». · PROUVÉ
- Les 8 : `blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026`, `blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026`, `comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet`, `financement-formation-opco-guide-complet-pour-studios-photo-2026`, `formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026`, `guide-achat-studio-2026`, `ia-photo-produit-guide-2026`, `orbitvu-vs-concurrents`.
- Comportement : 410 dans le Worker déployé ; absents du sitemap (`app/sitemap.ts:147`) ; exclus du listing EN (`lib/blog.ts:182`) et des alternates. Aucun lien interne depuis une page `/en` servie en 200 n'a été trouvé (les liens croisés entre ces 8 pages ne sont servis que par des pages elles-mêmes en 410). · PROUVÉ (code)
- **Fait nouveau** : à l'origine, ces 8 pages statiques **ne portent aucune balise `robots`** et ont un canonical auto-référent `/en/blog/<slug>` (build local, 3 pages vérifiées ; aucun commit du clone n'y a jamais posé de `robots`). `NOINDEX_EN_BLOG_SLUGS` n'agit que sur le sitemap et sur le gabarit `blog/[slug]`, que ces pages n'utilisent pas. · PROUVÉ (L2)
- Dette documentaire : `app/sitemap.ts:145` (« Les slugs EN noindex sont 301 vers /fr via le Worker ») ; `04-SURFACES-SEO.md` §2 (« noindex réversibles par conception ») ; nom trompeur du set pour ces 8 slugs ; conflit de lecture avec D3/D9 (réactivation par retrait du set impossible sur `www`). Effet résiduel non documentaire : ces 8 URL sont indexables sur `sysnext.vercel.app` tant que D36 n'est pas exécutée (hôte non contrôlé ici).

### 4. Les 11 URL « interceptées » — reclassement

| URL | Comportement (Worker déployé) | Intention connue ? | Anomalie réelle ? | Preuve |
|---|---|---|---|---|
| 8 × `/en/blog/<slug TSX>` (liste au point 3) | 410, `max-age=86400`, `noindex` | **Oui** : arbitrage LW 07/07 exécuté par SJ | **Non** sur le comportement ; **dette documentaire** (sitemap.ts, 04-SURFACES, nom du set) ; pages non `noindex` à l'origine | `d3620bd` ; fil 07/07 ; build local |
| `/fr/studio-photo/alphashot-g2` | 301 → `alphashot-xl-g2` | 30/06 : oui (SJ, « remplace G2 par XL G2 », `d8b4156`) ; après le 07/08 (G2 réintroduit `delisted`, repli du conseiller ROI, `e385e14`) : **UNKNOWN** | **UNKNOWN** — décision produit ouverte depuis le 01/07 (objection LW) | `d8b4156`, `e385e14`, fil 01/07 |
| `/en/studio-photo/alphashot-g2` | idem | idem | **UNKNOWN** | idem |
| `/de-ch/fotostudio/alphashot-g2` | idem | idem | **UNKNOWN** | idem ; fiche prérendue en de-ch (`DE_CH_MACHINES` = toutes les machines, `page.tsx:25` ; le commentaire l. 416 « 3 machines cœur » est périmé) |

Aucune des 11 n'est une « erreur » démontrée. 8 sont intentionnelles (dette documentaire) ; 3 relèvent d'une décision produit non close.

### 5. Cloudflare — D22 / P0-F — **P0-F = BLOCKED BY CURRENT TOKEN**

| Question | Réponse | Classement |
|---|---|---|
| Règle WAF de D22 existe-t-elle ? | Le connecteur Cloudflare de cette session ne couvre que Workers/KV/R2/D1 : rulesets non lisibles | INACCESSIBLE |
| Super Bot Fight Mode : état observable ? | Idem | INACCESSIBLE |
| Règle `54a4b8c2` ? | Idem ; seule source : D22 (« Skip SBFM videos R2, désactivée depuis le 23/07 ») | INACCESSIBLE |
| Security Events accessibles ? | Pas par cette session. Le credential n8n « PSC - Cloudflare Analytics » a lu `firewallEventsAdaptiveGroups` (rétention 3 jours) le 17/09 (exécution 3249, fil du 17/09) ; « P0-F : pas d'accès aux Security Events » est donc inexact sur le jeu d'événements — le blocage porte sur la configuration des règles | PROUVÉ (17/09, résumé de fil) ; état actuel NON PROUVÉ |
| Jeton actuel `zone.analytics.read` ? | Le credential n8n d'analytics fonctionne : `M5 · Bots IA` (3410) et `M5 · CF Traffic` (3411) en succès le 25/09 ; `cf_traffic_daily` alimentée jusqu'au 24/09. Portée exacte du jeton : non lisible sans afficher le credential | PROUVÉ (fonctionnel) ; portée NON PROUVÉE |

Ce blocage ne signifie pas que Cloudflare est inaccessible à Laurent.

### 6. Vercel Preview

- Secret disponible dans l'environnement actuel : **NON** (aucune variable de nom Vercel ou bypass ; vérifié sur les noms seuls).
- CI configurée pour l'utiliser : **NON** (aucune référence `secrets.` ni `VERCEL_AUTOMATION_BYPASS_SECRET` dans `.github/`). `scripts/seo/smoke.mjs:34` sait le lire, mais la CI n'exécute pas `smoke.mjs`.
- Preuve d'un contrôle Preview antérieur : **NON** (aucune entrée JOURNAL ; pages publiques de #24 et #27 : déploiements Preview « Ready », aucun contrôle consigné).
- Contrôle Preview automatisé aujourd'hui : **NON**.
- Transmission du 16/09 par courriel : toujours source secondaire (résumé de fil) — NON PROUVÉ au-delà.

### 7. CI — couverture exacte · PROUVÉ

- `vitest run` (build local, 26/09) : **12 fichiers, 223 tests, 223 réussis**. Worker : 4 fichiers, **129 tests** (`legacy-redirects` 31, `lot-f` 44, `p0-de-ch-heritage` 34, `unicite-tables` 20). `lib` : 8 fichiers, 94 tests, dont `locale-schema` **3**. Playwright : **15 specs**, non exécutées.
- `npm run test:unit` IN CI = **NO** · playwright IN CI = **NO** · eslint BLOCKING = **NO** (`pr-checks.yml:48` `continue-on-error: true`) · post-merge smoke ON main = **NO** (aucun workflow sur `push`).
- Ce qui tourne sur `pull_request` → `main` : `npm ci`, `tsc --noEmit`, `verifier-json.mjs`, `eslint` (non bloquant), `next build` ; `garde-journal` ; `garde-consequences`.

### 8. Ruleset `main` — **INACCESSIBLE**

- API GitHub (`rules/branches/main`, `branches/main/protection`, `rulesets`) : 403 « GitHub access to this repository is not enabled for this session ». Non contourné (l'ouverture exigerait d'attacher le dépôt avec des droits d'écriture).
- Fait historique prouvé : deux pushs directs ont été acceptés les 20/09 et 23/09 (point 9) ; à ces dates, la configuration n'empêchait pas le push direct de ce compte. État actuel : INACCESSIBLE.

### 9. Deux pushs directs sur `main` · PROUVÉ

| SHA | Date | Auteur / committer | Fichiers | Raison apparente | Preuve de non-merge |
|---|---|---|---|---|---|
| `bc81d9a` | 20/09/2026 06:42:57 UTC | Claude / Claude | `docs/seo-geo/JOURNAL.md` (+20) | Journal du déploiement Worker #16 (`167d7a15`), écrit juste après `wrangler deploy` | Un seul parent (`287caee`, fusion #21) ; commit du chemin premier-parent de `main` ; committer ≠ « GitHub » (un merge par l'interface ou une fusion squash porte le committer GitHub) |
| `da2796f` | 23/09/2026 07:42:12 UTC | Claude / Claude | `docs/seo-geo/JOURNAL.md` (+24) | Journal du déploiement Worker lot F (`05c5c47c`) | Un seul parent (`29ca657`, fusion #26) ; idem |

Contre D12 (« Pousser directement sur `main` » interdit). Documentation seule ; `garde-journal` et `garde-consequences` ne s'exécutent que sur PR.

### 10. Locale de-ch — listes exactes · PROUVÉ (application, build local ; `www` INACCESSIBLE)

Listes intégrales dans l'annexe (tableaux 2.a à 2.e). Synthèse :
- 45 pages de-ch au sitemap local, toutes en 200 ; `/de-ch/academy` = **404** (page 404 racine en français, `lang="fr"`).
- **284 chaînes distinctes non allemandes** (565 occurrences) : 166 textes dont 5 dates, 102 `alt`, 16 `aria-label`. Cause principale : `pickL()` renvoie la version EN quand la clé de-ch manque (`lib/locale-text.ts:28`) ; `useCases` des machines en FR seul (`components/calculators/ROICalculator/lib/machines.ts`) ; `SectorGrid` FR ; `FloatingDashboard` FR codé en dur ; `isFr ? fr : en` dans plusieurs pages.
- Meta descriptions mixtes DE + FR : **11 fiches machines** (`description` = `og:description` = `twitter:description`), gabarit `studio-photo/[slug]/page.tsx:473`.
- Dates au format EN : `/de-ch/blog` seulement (5 dates), `app/[lang]/blog/page.tsx:64-65`.
- `og:locale` absent sur 38 pages ; `og:*` hérités d'EN sur `/de-ch/roi-rechner` ; `twitter:*` hérités d'EN sur 18 pages ; `og:url` absent sur 34 pages.
- JSON-LD : **88 URL non canoniques** sur 496 (6 `/fr/`, 27 relatives, 55 segments non localisés, dont `Product.url`/`Offer.url`/fil d'Ariane des 13 fiches en `/de-ch/studio-photo/<slug>` → 307, et `Service.url` des 8 secteurs en `/de-ch/industrie/<slug>` → 301). 0 `sysnext.vercel.app`, 0 `localhost`, 0 `[object Object]`.
- Sélecteur de langue des 8 pages `br/*` (HTML serveur) : liens FR/EN vers `/fr|/en/industrie/<slug allemand>` → 404 en local ; comportement après hydratation NON PROUVÉ.
- Les chiffres du rapport Claude Code (« 9 chaînes anglaises », « 8 alt français », « 15 meta descriptions mixtes », « 26 URL JSON-LD ») ne sont pas reproduits : ils dépendent de sa méthode, non transmise. Les listes de l'annexe sont exhaustives au sens de la méthode déclarée (HTML serveur, liste de mots, accents, égalité avec FR/EN) — une chaîne rendue uniquement côté client peut manquer.

### 11. Schema — statut exact · PROUVÉ (application)

| Élément | Statut | Détail |
|---|---|---|
| `foundingDate` 2004 | **JSON-LD** (257 pages : fr 126, en 90, de-ch 41) | `SchemaOrg.tsx:72` ; le texte **visible** « Depuis 2004 / Since 2004 / Seit 2004 », « (2004-2024) » (`messages/*.json`) dit la même chose ; D33 fixe 2001, non exécutée |
| `courseSchema` | **JSON-LD** sur 10 pages du sitemap (8 `/fr/academy/*`, 2 `/en/academy/*`) + 6 `/en/academy/<slug>` `noindex` ; 0 de-ch | Appelants : `academy/[slug]/page.tsx:225`, `formations-packshot/page.tsx:417`, `formations-ia/page.tsx:458`. `inLanguage` absent du nœud Course ; `'fr'` en dur dans `hasCourseInstance` (`:398`), y compris sur `/en` ; `courseMode: 'Blended'` en dur y compris pour 3 formations présentielles |
| `AggregateOffer` | **JSON-LD** + fourchette **visible** dans la FAQ | Seul appelant `studios-photo-automatises/page.tsx:444` ; EUR, 12 000–150 000, `offerCount` 16, sur fr/en/de-ch ; écarts : minimum catalogue 12 450, E-Comm Studio+ 130 000, 17 machines dont 4 délistées ; EUR sur de-ch face aux `Offer` CHF |
| `aggregateRating` 4,9 / 100 | **JSON-LD, non visible** | `ia-photo-produit/page.tsx:701-712` (`SoftwareApplication` BlendAI), `lang !== 'de-ch'` ; `aggregateRatingSchema` et `productWithRatingSchema` (`SchemaOrg.tsx:263-320`) = **CODE MORT** |
| `GMB_AGGREGATE` 4,7 / 83 | **VISIBLE**, jamais JSON-LD | `data/testimonials.ts:14` → `TestimonialsSection.tsx:80-81` ; fr/en (home, academy, studios) ; non rendu sur de-ch |
| `dateRelative` | **VISIBLE** | 10 valeurs FR en dur (`data/testimonials.ts`) affichées aussi sur les pages EN ; statiques (calcul figé, [Inférence] au 08/05/2026) ; non rendu sur de-ch |
| `Review` | **JSON-LD** (40 nœuds fr/en) ; 0 de-ch | `datePublished` tous au 8 du mois (2014-05-08 → 2026-04-08) |
| `[object Object]` dans `ItemList` (constat du 24/07) | **Absent** du build de `1a8c3de` | — |
| `noindex` du calculateur annoncé par `robots.txt:75` | **Absent** (`/fr` et `/en/calculateur-roi` sans `robots`, présents au sitemap) | Constat du 24/07 toujours vrai au niveau application |

### 12. Article #36 — contradiction ≠ faux · PROUVÉ (dépôt)

Tableau intégral (33 lignes) en annexe §4. Points demandés :

| Claim #36 | Source contradictoire du dépôt | Le dépôt prouve-t-il que #36 est faux ? |
|---|---|---|
| « jusqu'à 74 sources de lumière pilotées » (générique, tableau) | XL G2 : « 170 panneaux LED pilotés par IA » (`machines.ts:188-190`, article XL G2) | **CONTRADICTION INTERNE** |
| « L'Alphashot Pro G2 compte 74 sources lumineuses » | `messages/fr.json:1651` (74) | FAIT MÉTIER À CONFIRMER (cohérent) |
| Versions livrées « entre 2003 et 2020 » | Article Ortery : « entre 2003 et 2020 » (cohérent) ; « Depuis 2004 », `foundingDate` 2004 ; D33 : création 2001 | **CONTRADICTION INTERNE** (2003 vs 2004) ; D33 (2001) ne contredit pas une livraison dès 2003 |
| Usine « de Silésie » ; R&D « de plus de 30 personnes » | Silésie : aucune source (Cracovie = lieu de fondation) ; R&D > 30 : cohérent avec un autre article | FAIT MÉTIER À CONFIRMER |
| Reprise au cas par cas après diagnostic gratuit | Article Ortery : « évaluation de reprise… remise commerciale » | FAIT MÉTIER À CONFIRMER (cohérent) |
| Support technique « en français » | 4 textes : accompagnement « auf Deutsch und Französisch » ; D33 : allemand « un peu parlé » | **CONTRADICTION INTERNE** (D33 ne contredit pas #36) |
| « Showroom de Lyon » / « in Lyon » | D1 : éditorial « près de Lyon », commune établie Saint-Bonnet-de-Mure | **AMBIGU** (écart à la formulation de D1) |
| Mensualités 270 / 335 / 445 / 490 € et CHF 255 / 315 / 415 / 455 | Montants = calcul du dépôt (`lib/leasing.ts`) sur les prix catalogue | Non faux ; question de **placement** (D26 §5 : prix en données structurées uniquement ; D15 : prix affiché = validation explicite SJ) |
| Calculateur « en six étapes… PDF » | FR : conseiller conversationnel (6 questions, PDF) — cohérent. **EN et DE-CH** : l'article renvoie vers `/en/calculateur-roi` et `/de-ch/roi-rechner`, qui rendent l'assistant en **3 étapes** (`calculateur-roi/page.tsx:20-28`, `ROICalculatorWizard.tsx:30-34`) | **FAUX PROUVÉ au niveau du code** pour EN et DE-CH (le code est ce que fait la page liée ; rendu `www` non contrôlé) |
| Installation et formation « de un à trois jours » ; « la production ne s'arrête à aucun moment » | Installation « quelques heures » (`messages/fr.json:1399`) ; aucune source sur l'arrêt | AMBIGU ; FAIT MÉTIER À CONFIRMER |

### 13. Secrets — statut uniquement (aucune valeur) · sources : fils du projet

| # | Type générique | Date | Exposition alléguée | Révocation confirmée | Risque encore actif |
|---|---|---|---|---|---|
| 1 | Jeton API Cloudflare (lecture de listes) | 23/07 | Collé dans un fil du projet | INCONNUE (révocation demandée deux fois) | INCONNU |
| 2 | Clé `service_role` Supabase | 02/09 | Collée dans un fil du projet | OUI (déclarée par Laurent dans le fil) | NON (si la déclaration est exacte) |
| 3 | Jeton GitHub + secret de contournement Vercel | 16/09 | Transmis par courriel (SJ → LW) | INCONNUE | INCONNU |
| 4 | Jeton API Cloudflare + jeton R2 | 20/09 | Collés dans une session Claude Code et un fil | OUI (« tous deux révoqués », fil 20/09) | NON (si exact) |
| 5 | Jeton API Cloudflare (+ R2) | 23/09 | Collé dans un fil du projet avant le déploiement lot F | Jeton de déploiement : OUI, consigné dans la PR #27 (non fusionnée) ; jeton collé dans le fil : INCONNUE | INCONNU |

Le rapport maître comptait quatre incidents : **cinq** sont documentés.

### 14. PR #24 et #27 — **REQUIRES_REAUDIT = CONFIRMÉ** · PROUVÉ

| PR | État | Retard sur `main` | Conflits (fusion à blanc) | Chevauchements | Hypothèses devenues obsolètes |
|---|---|---|---|---|---|
| #24 `content/f5-packshot-e-commerce` (head `d03f372`, 20/09) | Ouverte ; revue de Sebeth7 demandée | 40 commits (base `1ee8cfb`, 20/09) ; 4 d'avance | `docs/seo-geo/ETAT.md` | `components/templates/PackshotLandingTemplate.tsx` (modifié sur `main` par #18 et #32), `ETAT.md`, `JOURNAL.md` | Prose = premier jet du modèle ; J0 F5 non atteint ; fenêtres de mesure postérieures ; D15 non décomptée (Preview non contrôlé) ; D31 a modifié le gabarit ; D35 (article EN) postérieure |
| #27 `content/maillage-q3` (head `e81e5c0`, 23/09) | Ouverte ; revue de Sebeth7 demandée | 36 commits (base `da2796f`, 23/09) ; 1 d'avance | `ETAT.md`, `JOURNAL.md` | `ETAT.md`, `JOURNAL.md` | Mélange deux objets (14 liens + clôture lot F) ; la clôture lot F et la révocation du jeton ne sont pas sur `main` ; D15 non décomptée ; un lien est posé dans `guide-achat-studio-2026` (version EN en 410 sur `www`) |

**Fait nouveau** : le contrôle `curl.exe` du lot F (23/09 07:45-07:46 UTC, « tout conforme », chaîne neuve) et la révocation du jeton de déploiement **sont consignés dans le dépôt**, dans la branche de #27, pas sur `main`.

### 15. P0-H / P0-I — delta depuis le rapport · PROUVÉ

- M5 GSC pull (`Sqdk2jygOSt9XEjL`) : exécutions **3404** (25/09 05:00 UTC) et **3416** (26/09 05:00 UTC) en **succès** ; 0 échec depuis le 25/09 (`wf_runs`). Dernier échec : 3385 (24/09, avant P0-H).
- `max(data_date)` : 2026-09-23 pour `gsc_metrics`, `gsc_metrics_page`, `gsc_metrics_country` (sites 2 et 3) — J-3 respecté.
- `gsc_pull_bornes` : dernière migration qui la touche = `20260924135212` (P0-H) ; aucune migration postérieure à `20260925061338` (P0-I) → définition inchangée.
- P0-J : `gsc_metrics_device` toujours au 2026-06-20 → inchangé.
- P0-I : les 8 fonctions portent `site:` et plus aucune occurrence d'`amazon`. Consommateurs : aucun workflow n8n connu des 8 fonctions n'a tourné depuis la migration (exécutions depuis le 25/09 06:13 : Heartbeat, Bots IA, CF Traffic, Orchestrateur amont — sans idée à traiter, 0,5 s —, Pipedrive, Referrers GA4, GSC pull, Démos) ; M6 : dernière exécution le 06/07 ; appels du tableau de bord : **NON OBSERVABLES** (`track_functions = none`).
- Planificateur n8n : actif (exécutions quotidiennes du 24 au 26/09) ; `cf_traffic_daily` alimentée jusqu'au 24/09. Les exécutions du 14/09 sont encore conservées au 26/09.

### 16. Les 18 points non prouvés du rapport maître

| N | Point | Après cette passe | Statut |
|---|---|---|---|
| N1 | Comportement réel de `www` | Couche Worker prouvée sur le code déployé (point 2) ; `www` non joignable d'ici | **INACCESSIBLE** (commande fournie au point 2) |
| N2 | Intention actuelle de SJ (XL, G2, devise, prix #36, 14 `/en/blog`, motifs, impressum) | 14 `/en/blog` : intention du 07/07 prouvée ; le reste inchangé | **DÉCISION HUMAINE** (partiellement résolu) |
| N3 | Instruction CHF du 25/09 | — | **DÉCISION HUMAINE** |
| N4 | Transmission du jeton Preview | Absent de l'environnement et de la CI ; transmission : source secondaire | **TOUJOURS NON PROUVÉ** |
| N5 | Durée réelle du 410 de #36 | `max-age=86400` confirmé dans le code déployé ; durée réelle sans journaux edge | **INACCESSIBLE** |
| N6 | État live Cloudflare | Worker : **résolu** (déployé = `main`) ; WAF/SBFM/`54a4b8c2`/règle D22 : connecteur limité | Worker **RÉSOLU** ; reste **INACCESSIBLE** |
| N7 | Corps des PR | #24 et #27 lus (pages publiques) ; les autres non | **TOUJOURS NON PROUVÉ** (partiel) |
| N8 | Sessions du Claude de SJ | — | **INACCESSIBLE** |
| N9 | Sorties ChatGPT | — | **INACCESSIBLE** |
| N10 | Master V2, S03, S09, S10 | Non relus | **TOUJOURS NON PROUVÉ** |
| N11 | `curl.exe` lot F et Worker #16 | Lot F : **consigné dans la branche de #27** (verdict « tout conforme », sortie brute non incluse) ; #16 : toujours « déclaré » | Lot F **RÉSOLU** (hors `main`) ; #16 **TOUJOURS NON PROUVÉ** |
| N12 | Constats du 24/07 | `[object Object]` : **absent** ; `datePublished` au 08 : **présent** ; `noindex` calculateur : **absent** ; en-têtes HSTS / `Cache-Control` : prod non joignable | **RÉSOLU** (application) ; en-têtes **INACCESSIBLE** |
| N13 | Planificateur n8n, purge | Planificateur actif ; exécutions du 14/09 encore conservées | Planificateur **RÉSOLU** ; export avant purge **DÉCISION HUMAINE** |
| N14 | « studio Orbitvu + BlendAI (35 000€ » | — | **DÉCISION HUMAINE** |
| N15 | Ruleset `protect-main` | API non ouverte ; pushs directs acceptés les 20 et 23/09 | **INACCESSIBLE** |
| N16 | Tests réellement exécutés | 223/223 en local ; aucun en CI | **RÉSOLU** |
| N17 | « Laurent valide le CHF » : fait ou instruction | — | **DÉCISION HUMAINE** |
| N18 | Chats antérieurs au 06/06 | — | **TOUJOURS NON PROUVÉ** |

---

## A. Delta depuis les deux rapports

1. Rien n'a bougé depuis le gel : `origin/main` = `1a8c3de`, aucune PR nouvelle, Worker déployé ≡ `main`.
2. Le Worker déployé est désormais **prouvé** identique au dépôt (ce n'était qu'un constat de JOURNAL du 25/09).
3. M5 : deux exécutions de plus, toutes deux en succès ; fenêtre P0-H saine à J+2.
4. Le contrôle `curl.exe` du lot F existe dans le dépôt (branche #27), pas sur `main`.
5. Les 8 articles EN en 410 : intention prouvée ; en revanche leurs pages d'origine ne sont **pas** `noindex` (fait nouveau).
6. Les listes exactes de-ch et schema existent (annexe) ; elles sont plus larges que les chiffres du rapport Claude Code.
7. #36 : aucun claim prouvé faux par une source établie ; un claim prouvé faux par le code (« six étapes » en EN et DE-CH) ; quatre contradictions internes.

## B. Corrections à apporter aux rapports

| Rapport | Affirmation | Correction |
|---|---|---|
| Maître §2, §4 E22, §16, N11 | Lot F : `curl.exe` « jamais reporté au dépôt » | **Reformuler** : consigné dans la branche de la PR #27 (non fusionnée) — « tout conforme », 23/09 07:45-07:46 UTC, + révocation du jeton de déploiement ; absent de `main` |
| Maître §10.2 ; premier post-mortem ; `04-SURFACES` | Les 8 TSX : « 410 Worker **et** noindex Next » ; « mécanisme noindex réversible » | **Contredit** : pas de `robots` sur ces 8 pages à l'origine ; `NOINDEX_EN_BLOG_SLUGS` ne les touche que via le sitemap |
| Rapport Claude Code | « 11 routes interceptées » présentées comme une classe d'erreur | **Retirer** : 8 intentionnelles (dette documentaire), 3 UNKNOWN (décision produit) |
| Rapport Claude Code ; premier post-mortem | 8 `/en/blog` = anomalies techniques | **Retirer** : arbitrage LW 07/07 exécuté par SJ |
| Tous | Jeton Preview « jamais transmis » | **Reformuler** : « transmis à LW par courriel le 16/09 (source secondaire), jamais exploité (ni session, ni CI) » |
| Maître §1 point 12, E30 | « Quatre expositions de secrets » | **Nuancer** : cinq (ajout du 23/09) ; révocations confirmées pour 2, partielle pour 1, inconnues pour 2 |
| Maître §14 | `[object Object]` : « NON VÉRIFIÉ » | **Contredit** : absent du build de `1a8c3de` (application) |
| Maître §11 | « `og:locale en_US` sur `/de-ch/academy` » | **Contredit** : `/de-ch/academy` répond 404 (page 404 FR, `lang="fr"`) ; le défaut `og:*` réel est sur `/de-ch/roi-rechner` (hérité d'EN) et l'absence d'`og:locale` sur 38 pages |
| Maître §11, §14 | « `courseSchema inLanguage: 'fr'` » | **Préciser** : absent du nœud Course, `'fr'` dans `hasCourseInstance`, émis sur 10 pages du sitemap + 6 EN `noindex`, jamais en de-ch ; `courseMode` « Blended » en dur |
| Maître §2, §13 ; Master V3 P0-F | « P0-F : pas d'accès aux Security Events » | **Reformuler** : P0-F = BLOCKED BY CURRENT TOKEN pour la configuration (rulesets, SBFM) ; le jeu d'événements a été lu le 17/09 par le credential n8n d'analytics |
| Maître §13 | `cf_traffic_daily` arrêtée au 13/09, planificateur à l'arrêt (constat du 17/09) | **Périmé** : planificateur actif, table au 24/09 |
| Maître §2 (P0-I) | « M6 et `r3_measure_article` non relus » | **Préciser** : aucun consommateur n8n n'a tourné depuis la migration ; M6 inactif depuis le 06/07 ; appels du tableau de bord non observables |
| Maître §15.1 | Faits indevinables | **Ajouter** : langue du support (#36 « en français » vs 4 textes « Deutsch und Französisch » vs D33) ; « 74 sources » générique vs 170 panneaux ; « Kundenstudie 2025 » |
| Maître §4 E13 | #36 : prix | **Préciser** : montants conformes au calcul du dépôt ; le problème est le placement (D26 §5, D15) |
| Rapport Claude Code | 9 chaînes EN / 8 alt / 15 meta / 26 URL | **Remplacer** par les listes de l'annexe (284 / 102 alt / 11 fiches / 88 URL) avec leur méthode |
| Code | Commentaire `page.tsx:416` « de-ch : uniquement les 3 machines cœur » | Ajouter aux commentaires périmés (E20) : `DE_CH_MACHINES` = toutes les machines |

## C. Faits nouvellement prouvés

1. `FREEZE = 1a8c3de` au 26/09 ; aucune PR après #37.
2. Worker déployé ≡ `main` (code normalisé, empreinte identique).
3. Couche Worker, code déployé, pour les 24 routes demandées (point 2), dont la divergence FR (→ XL G2) / EN (→ XL v2) sur l'URL « alphashot-xl », la chaîne à deux sauts `/en/photo-studio/alphashot-g2`, et le 404 de `/de-ch/fotostudio/alphashot-xl`.
4. Intention du 410 des 8 `/en/blog` : arbitrage LW du 07/07, commit `d3620bd`.
5. Ces 8 pages ne sont pas `noindex` à l'origine.
6. `vitest` : 223/223 en local ; hors CI.
7. Deux pushs directs : committer « Claude », un seul parent, chemin premier-parent.
8. PR #24 et #27 : conflits, chevauchements, retards chiffrés ; contrôle lot F consigné dans #27.
9. M5 : 0 échec depuis P0-H ; `gsc_pull_bornes` et P0-J inchangés ; P0-I conforme ; aucun consommateur n8n exécuté.
10. D31 respectée au niveau application ; statistique « Kundenstudie 2025 » rendue sur de-ch.
11. Listes exactes de-ch et schema (annexe) ; `/de-ch/academy` en 404 ; `[object Object]` disparu ; `noindex` calculateur absent ; `datePublished` au 08 ; `dateRelative` FR sur les pages EN ; `GMB_AGGREGATE` visible ; `aggregateRating` 4,9/100 JSON-LD non visible ; deux schémas en code mort.
12. #36 : « six étapes » faux au niveau du code pour EN et DE-CH ; quatre contradictions internes ; aucun claim contredit par une décision.

## D. Points toujours non prouvés

- État de `www` (N1) et durée réelle du 410 de #36 (N5).
- WAF, SBFM, règle `54a4b8c2`, existence de la règle D22 (N6, partie Cloudflare hors Worker).
- Ruleset `main` actuel (N15).
- Transmission effective du jeton Preview (N4) ; contrôle du Worker #16 (N11).
- Corps des PR autres que #24, #27, #31, #36, #37 (N7) ; Master V2 et pièces absentes (N10) ; chats antérieurs au 06/06 (N18).
- Rendu côté client (sélecteur de langue après hydratation, modales, assistant ROI) sur de-ch.
- Faits externes de #36 (Windows 10, règlement IA art. 50, Orbitvu Station 26.2, compatibilité Canon, usine de Silésie).

## E. Décisions humaines restantes

**Sébastien** : (1) produit XL v2 / XL Pro v2 / XL G2 et cible des anciennes URL « Alphashot XL » ; (2) statut public de la fiche G2 et des 3 redirections ; (3) devise de-ch (mensualités, `AggregateOffer`, FAQ wine) ; (4) mensualités dans l'article #36 ; (5) claims #36 : « 74 sources » générique, langue du support, « showroom de Lyon », « six étapes » EN/DE-CH, usine de Silésie, installation 1-3 jours ; (6) « Kundenstudie PackshotCreator 2025 » (existence de l'étude) ; (7) motifs génériques 410 du Worker ; (8) `/de/impressum-copy` ; (9) « studio Orbitvu + BlendAI (35 000€ » ; (10) historique Google Ads ; (11) Preview : secret CI ou contrôle Chrome ; (12) sort de #24 et #27.
**Laurent** : (13) forme et consignation de l'instruction CHF (D37) et correction du cadre du projet ; (14) exécution de la commande `www` du point 2 et dépôt de sa sortie brute ; (15) export des exécutions n8n avant purge ; (16) statut des jetons des incidents 1, 3 et 5 ; (17) maintien des 8 `/en/blog` en 410 face à D9 (réactivation) ; (18) R7 bloquant, fusion en lot, gel de mesure.

## F. Tableau de clôture

| Point | Avant | Après vérification | Preuve | Statut final |
|---|---|---|---|---|
| Freeze | `1a8c3de` au 25/09 15:05 | Inchangé au 26/09 | `git fetch` | PROUVÉ |
| Worker déployé vs dépôt | Constat JOURNAL (25/09) | Identique (code normalisé) | API Cloudflare Workers | PROUVÉ |
| `www` | Non vérifié | Non joignable depuis cette session | 403 challenge | INACCESSIBLE |
| Couche Worker sur les routes XL/G2/#36 | Simulation sur `main` | Simulation sur le code déployé | exécution `worker.fetch` | PROUVÉ (Worker) |
| 8 `/en/blog` en 410 | « Anomalie » (Claude Code) ; « arbitrage LW » (maître) | Arbitrage prouvé ; pages non `noindex` à l'origine | `d3620bd`, fil 07/07, build | PROUVÉ — problème = DOCUMENTATION |
| 3 `alphashot-g2` | « Interceptées » | Intention postérieure au 07/08 inconnue | `d8b4156`, `e385e14` | NON PROUVÉ → DÉCISION HUMAINE |
| D22 / P0-F | BLOCKED_ACCESS | Configuration illisible par ce connecteur ; événements lus le 17/09 | connecteur, fil 17/09 | BLOCKED BY CURRENT TOKEN |
| Jeton Preview | « Non transmis » / « transmis par courriel » | Ni environnement, ni CI, ni contrôle consigné | noms d'env., `.github/`, JOURNAL | PROUVÉ (non exploité) ; transmission NON PROUVÉE |
| CI | Tests hors CI | Confirmé ; 223/223 en local | workflows, `vitest` | PROUVÉ |
| Ruleset `main` | État du 16/09 | API non ouverte | 403 | INACCESSIBLE |
| Pushs directs | 2 affirmés | Confirmés, non-merge prouvé | `git log --first-parent`, committer | PROUVÉ |
| Locale de-ch | Chiffres partiels | Listes exactes (284 / 11 / 88) | build local | PROUVÉ (application) |
| Schema | Constats partiels | Statuts VISIBLE / JSON-LD / CODE MORT établis | build local | PROUVÉ (application) |
| #36 claims | « Faux » allégués | 1 faux au niveau du code, 4 contradictions, reste à confirmer | dépôt | PROUVÉ (classement) |
| Secrets | 4 incidents | 5 incidents ; 2 révocations confirmées | fils | NON PROUVÉ pour 3 |
| #24, #27 | À rebaser | Conflits et obsolescence chiffrés ; lot F consigné dans #27 | fusion à blanc | REQUIRES_REAUDIT CONFIRMÉ |
| P0-H | Fenêtre ouverte | 2 succès, 0 échec, définition inchangée | n8n, migrations | PROUVÉ (en mesure jusqu'au 08/10) |
| P0-I | Appliqué | Conforme ; aucun consommateur n8n exécuté | `pg_get_functiondef`, `wf_runs` | PROUVÉ ; dashboard NON OBSERVABLE |
| P0-J | Différé | `gsc_metrics_device` au 20/06 | SELECT | PROUVÉ (inchangé) |

---

**SUFFICIENT_FOR_MASTER_SYNTHESIS = YES**

Les trous restants ne se ferment pas par un nouvel audit : ils sont soit des décisions humaines (section E), soit inaccessibles à toute session Claude hors du poste de Laurent (`www`, rulesets Cloudflare, ruleset GitHub). La synthèse peut être rédigée à condition de porter explicitement trois réserves : (1) « `www` non contrôlé » — la commande du point 2, exécutée par Laurent, suffit à la lever ; (2) « configuration WAF/SBFM non lue » — lecture par Laurent au dashboard ou jeton rulesets en lecture ; (3) « ruleset GitHub non lu » — lecture par Sébastien ou Laurent dans les réglages du dépôt. Aucune de ces trois lectures ne peut changer les conclusions des sections A à C ; elles conditionnent seulement la clôture de P0-D/E, de D29 et de P0-F.


---

# ANNEXE D — Annexe gap closing DE-CH / Schema / article #36 — source intégrale

> Source : `PSC_GAP_CLOSING_ANNEXE_DECH_SCHEMA_36_2026-09-26.md`. Conservée intégralement pour éviter toute perte d'information. Les éventuelles conclusions dépassées ou contredites sont arbitrées dans la Partie I.

# PSC_GAP_CLOSING_ANNEXE_DECH_SCHEMA_36_2026-09-26

- **Statut** : annexe factuelle de `PSC_GAP_CLOSING_2026-09-26.md` (points 7, 10, 11, 12) ; lecture seule. Build local d'une copie du dépôt à `main` = `1a8c3de` (Next 16.1.1), analyse du HTML rendu serveur de 45 pages de-ch + `/de-ch/academy`, exécution de `vitest`.
- **Date** : 26/09/2026.
- **Sources** : HTML prérendu et servi par `next start` en local ; code du dépôt (fichier:ligne) ; `docs/seo-geo/DECISIONS.md`.
- **Règle de conflit** : le HTML local décrit ce que l'application produit à `1a8c3de` ; il ne décrit ni le Worker, ni le cache, ni `www` (non contrôlé). Code > page > décision pour « ce qui est rendu » ; `DECISIONS.md` pour « ce qui est établi comme fait d'entreprise ».
- **Modifications de la copie (non commitées, sans effet sur le texte)** : stub `next/font/google` (5 layouts) ; variables d'environnement factices Supabase.
- **Production** : extraction par un agent de lecture ; chiffres et fichier:ligne relus par échantillon (D31, `Kundenstudie`, `[object Object]`, robots des pages statiques EN, calculateur ROI EN/DE-CH en 3 étapes).

---

Le build local a réussi et les 12 fichiers de test (223 tests) passent. Sur les 45 pages de-ch rendues, j'ai relevé 284 chaînes en français ou en anglais au lieu de l'allemand, et 88 URL non canoniques dans le JSON-LD. Pour l'article #36, le dépôt ne prouve aucun claim faux. Il contient en revanche 4 contradictions internes.

## Ce qui a été modifié dans la COPIE pour builder
- **Copie** : `/tmp/claude-0/-home-claude/d288fc9d-bd18-5153-8c51-0feb8e40dbf9/scratchpad/build`. Le clone de référence est intact (`git status` vide, HEAD 1a8c3de).
- **Polices** : fonts.googleapis.com est bloqué par le proxy (403). J'ai créé un stub non commité, `_stub/font-google-stub.ts`, qui exporte `Inter()` et renvoie `{className, variable, style}`. L'import `next/font/google` a été remplacé par `@/_stub/font-google-stub` à la ligne 1 de `app/roi-preview/layout.tsx`, `app/roi-pro/layout.tsx`, `app/calculateur-roi/layout.tsx` et `app/etude-clients-2026/layout.tsx`, et à la ligne 4 de `app/[lang]/layout.tsx`. Aucun effet sur le texte rendu.
- **Variables factices** : `NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co`, `NEXT_PUBLIC_SUPABASE_ANON_KEY=x`, `SUPABASE_SERVICE_ROLE_KEY=x`, `NEXT_TELEMETRY_DISABLED=1`. Aucune autre variable n'a été réclamée.
- **npm ci** : lancé avec `PUPPETEER_SKIP_DOWNLOAD=1 PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`.
- **Réseau** : les seules requêtes émises vont vers registry.npmjs.org, localhost:3055 et un test vers fonts.googleapis.com (refusé). Aucune vers la production, Vercel, Cloudflare ou Supabase. Le serveur local est arrêté.

## 1. Build local
- `npm ci` a réussi (670 paquets). `npx next build` (Next 16.1.1) a réussi (exit 0). `npx next start -p 3055` a servi les pages.
- Le `sitemap.xml` local contient 325 URL, dont 45 en `/de-ch…` (`/de-ch` compris).
- 46 pages ont été testées : les 45 du sitemap plus `/de-ch/academy`.
  - Les 45 répondent 200.
  - `/de-ch/academy` répond **404** : aucun `{lang:'de-ch'}` pour l'academy (`app/[lang]/layout.tsx:60-66`, `dynamicParams=false`). La page 404 servie est la 404 racine, en français avec `lang="fr"` (`app/not-found.tsx:12-18`, `:23`).

## 2. Pages de-ch : défauts de locale (HTML rendu serveur)

**Méthode** : retrait de `script`, `style`, `noscript`, `template` et `head`, extraction des nœuds texte, des `alt`, des `aria-label` et des `placeholder`. Une chaîne est signalée si elle remplit au moins une de ces conditions :
- elle contient un mot FR ou EN d'une liste de référence (mots communs à l'allemand exclus) ou un accent français ;
- elle est identique à une chaîne des pages FR ou EN équivalentes (82 pages, plus les 8 `/en/industrie/*`).

Chaque candidat a été relu à la main. Ont été écartés : les noms propres et de produits, et les emprunts courants en allemand (Return on Investment, Best Practices, Lifestyle, Templates, Distributor, Galerie…).

### 2.a et 2.b Texte visible et `alt`

- **Volume** : 284 chaînes distinctes (166 textes dont 5 dates, 102 `alt`, 16 `aria-label`), soit 565 occurrences page × chaîne.
- **Répartition** : 39 pages ont au moins un défaut hors en-tête. 6 pages n'ont que les deux `aria-label` d'en-tête : `/de-ch/guide`, ses 3 guides, `/de-ch/kontakt` et `/de-ch/roi-rechner`.
- **Cause principale** : `pickL()` renvoie `obj.en` quand la clé de-ch manque (`lib/locale-text.ts:28`, noté « fallback LT »).
- **Lecture de la colonne URL** : les chemins sont sans le préfixe `/de-ch` ; `/ (home)` = `/de-ch`, `fs/` = `/de-ch/fotostudio/`, `br/` = `/de-ch/branchen/`, `blog/` = `/de-ch/blog/`.
- **Abréviations des fichiers** :
  - SP = `app/[lang]/studio-photo/[slug]/page.tsx`
  - RC = `components/calculators/ROICalculator/lib/machines.ts`
  - MS = `components/machine-selector/lib/machines.ts`
  - MC = `components/machine-selector/components/MachineCard.tsx`
  - IS = `app/[lang]/industrie/[slug]/page.tsx`
  - SG = `components/shared/SectorGrid.tsx`
  - FD = `components/animations/FloatingDashboard.tsx`
  - PLT = `components/templates/PackshotLandingTemplate.tsx`

| # | URL | type d'erreur | valeur actuelle | valeur/locale attendue | fichier:ligne |
|---|---|---|---|---|---|
| 1 | /branchen, br/elektronik, br/sport, fs/alphashot-xl-g2 | nom de secteur FR / useCase FR | « Automobile » | allemand (de-CH) | /branchen, br/elektronik, br/sport : `SG:89` → `SG:63` / `IS:832` ; fs/alphashot-xl-g2 : `RC:167` → `SP:961` |
| 2 | fs/alphashot-micro-v2, fs/alphashot-pro-g2 | badge « Ideale Branchen » = clé brute EN (absente de sectorLabels) | « watchmaking » | allemand (de-CH) | `RC:27`, `RC:279` (idealSectors) → `SP:975` (`?? { fr: sector, en: sector }`) |
| 3 | fs/alphashot-micro-v2, fs/alphashot-pro-g2, fs/alphashot-xl-g2 | idem | « health » | allemand (de-CH) | `RC:27`, `RC:174`, `RC:279` → `SP:975` |
| 4 | fs/alphashot-pro-g2 | idem | « optics » | allemand (de-CH) | `RC:279` → `SP:975` |
| 5 | fs/alphashot-pro-g2, fs/alphashot-xl-g2, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2 | idem | « industrial » | allemand (de-CH) | `RC:174`, `RC:279`, `RC:465`, `RC:629`, `RC:680` → `SP:975` |
| 6 | wer-sind-wir | alt FR | « Équipe PackshotCreator dans le showroom » | allemand (de-CH) | `app/[lang]/a-propos/page.tsx:106` |
| 7 | produktfotografie-bedarf, wichtige-fragen-produktfotografie | alt FR | « Résultat packshot professionnel » | allemand (de-CH) | `app/[lang]/besoins-photographie-produit/page.tsx:294` ; `app/[lang]/questions-cles-photographie-produit/page.tsx:196` |
| 8 | produktfotografie-bedarf | texte EN (`isFr ? fr : en`) | « Solution guide » (l. 91) / « View all 14 sectors » (l. 216) / « Have more questions? Contact our experts for a free diagnostic. » (l. 236-238) / « The 9 key questions » (l. 243) | allemand (de-CH) | `app/[lang]/besoins-photographie-produit/page.tsx` |
| 9 | produktfotografie-bedarf, wichtige-fragen-produktfotografie | texte EN (`isFr ? fr : en`) | « View studios » | allemand (de-CH) | `app/[lang]/besoins-photographie-produit/page.tsx:98` ; `app/[lang]/questions-cles-photographie-produit/page.tsx:83` |
| 10 | blog | date format EN | « January 8, 2024 » / « February 8, 2024 » / « February 14, 2024 » / « July 14, 2026 » / « September 25, 2026 » | format `de-CH` (ex. « 8. Januar 2024 ») | `app/[lang]/blog/page.tsx:64-65` (`isFr ? 'fr-FR' : 'en-US'`) |
| 11 | ia-photo-produit | alt FR | « BlendAI — Cosmétiques lifestyle » (l. 39) / « BlendAI — Bijoux mise en scène » (l. 41) / « BlendAI — Décoration intérieure » (l. 42) / « BlendAI — Lifestyle produit » (l. 43) / « BlendAI — Mise en ambiance » (l. 44) / « BlendAI — Scène créative » (l. 45) / « BlendAI — Spiritueux lifestyle » (l. 46) / « BlendAI — Visuel e-commerce » (l. 47) / « BlendAI — Déclinaison lifestyle » (l. 49) / « Packshot mobilier » (l. 120) / « Lifestyle mobilier BlendAI » (l. 121) / « Résultat BlendAI - fidèle au produit » (l. 417) / « Résultat IA générative pure » (l. 457) | allemand (de-CH) | `app/[lang]/ia-photo-produit/page.tsx` |
| 12 | packshot-amazon | badge EN (heroBadge sans clé de-ch) | « Amazon & Marketplaces » | allemand (de-CH) | `app/[lang]/packshot-amazon/page.tsx:12` → `PLT:110` (fallback LT) |
| 13 | packshot-e-commerce | idem | « E-commerce & Marketplaces » | allemand (de-CH) | `app/[lang]/packshot-e-commerce/page.tsx:12` → `PLT:110` |
| 14 | packshot-industrie | idem | « Industry & Technical » | allemand (de-CH) | `app/[lang]/packshot-industriel/page.tsx:12` → `PLT:110` |
| 15 | packshot-mode | idem | « Fashion & Textile » | allemand (de-CH) | `app/[lang]/packshot-mode/page.tsx:12` → `PLT:110` |
| 16 | / (home), /branchen | abréviation non allemande | « sec » (« 3 sec pro Packshot ») | « Sek. » | `app/[lang]/page.tsx:74` ; `app/[lang]/industrie/page.tsx:385` |
| 17 | / (home) | alt FR | « Studio Orbitvu en action » (l. 85) / « BlendAI — génération de visuels » (l. 86) / « Formation en situation » (l. 87) / « Showroom PackshotCreator — gamme complète de studios photo automatisés Orbitvu » (l. 335) / « Alphashot Pro G2 — studio photo automatisé » (l. 435) | allemand (de-CH) | `app/[lang]/page.tsx` |
| 18 | wichtige-fragen-produktfotografie | texte EN (`isFr ? fr : en`) | « Expert guide » (l. 76) / « Answers to all your questions to make the right choice. » (l. 138-140) / « Identify my need » (l. 145) | allemand (de-CH) | `app/[lang]/questions-cles-photographie-produit/page.tsx` |
| 19 | fs/alphashot-360 | alt EN | « Camera packshot » (l. 146) / « Perfume packshot » (l. 147) / « Toy packshot » (l. 148) / « Wallet packshot » (l. 143) | allemand (de-CH) | `SP` (fallback LT) |
| 20 | fs/alphashot-360, fs/alphashot-micro-v2, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/alphatable, fs/bike-studio, fs/e-comm-studio-plus, fs/furniture-studio | alt EN | « Auto background removal » (l. 128, 150, 172, 195, 218, 241, 262, 326, 348, 371) / « Background removal » (l. 135, 157, 179, 202, 225, 248, 268, 333, 355, 377) | allemand (de-CH) | `SP` (fallback LT) |
| 21 | fs/alphashot-360, fs/alphashot-pro-g2, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/e-comm-studio-plus, fs/furniture-studio | alt EN | « Lighting control » | allemand (de-CH) | `SP:112, 159, 181, 204, 227, 357, 379` (fallback LT) |
| 22 | fs/alphashot-360, fs/alphashot-pro-g2, fs/alphashot-xl-pro-v2, fs/alphastudio-xxl-v2, fs/alphatable | alt EN | « Multi-channel export » | allemand (de-CH) | `SP:114, 160, 182, 228, 250, 270` (fallback LT) |
| 23 | fs/alphashot-micro-v2 | alt EN | « Auto retouch » (l. 137) / « Gold ring packshot » (l. 126) / « Necklace packshot » (l. 124) / « Ring packshot white background » (l. 120) / « Super Focus macro » (l. 136) / « Watch 360° packshot » (l. 125) | allemand (de-CH) | `SP` (fallback LT) |
| 24 | fs/alphashot-micro-v2, fs/fashion-studio, fs/fashion-studio-basic | alt EN | « Custom templates » | allemand (de-CH) | `SP:138, 290, 311` (fallback LT) |
| 25 | fs/alphashot-pro-g2 | alt EN | « AI background removal » (l. 106, 115) / « Auto post-production » (l. 113) / « Eyeshadow palette packshot » (l. 102) / « NARS mascara packshot » (l. 98) / « Popcorn maker packshot » (l. 103) / « Sunglasses packshot » (l. 104) | allemand (de-CH) | `SP` (fallback LT) |
| 26 | fs/alphashot-xl-g2 | alt EN | « AI label reading and product data structuring » (l. 93) / « Alphashot XL G2, angled studio view » (l. 81) / « Alphashot XL G2, studio view » (l. 78) / « Example of industrial photography achievable with the Alphashot XL G2 » (l. 82) / « Open chamber of the Alphashot XL G2, LED lighting and camera arm » (l. 85) / « Operator using the Alphashot XL G2 for a shoot » (l. 83) / « Orbitvu Station capture interface on the Alphashot XL MDC G2 » (l. 92) | allemand (de-CH) | `SP` (fallback LT) |
| 27 | fs/alphashot-xl-pro-v2 | alt EN | « Keyboard packshot » (l. 165) / « Shoe 360° packshot » (l. 169) | allemand (de-CH) | `SP` (fallback LT) |
| 28 | fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2 | alt EN | « Bag packshot » (l. 170, 192) / « Speaker packshot » (l. 168, 193) | allemand (de-CH) | `SP` (fallback LT) |
| 29 | fs/alphastudio-compact-v2 | alt EN | « Chair packshot » (l. 187) / « E-commerce integration » (l. 205) / « Pressure washer packshot » (l. 191) | allemand (de-CH) | `SP` (fallback LT) |
| 30 | fs/alphastudio-xxl-v2 | alt EN | « Jacket packshot » (l. 210) / « Skirt packshot » (l. 214) / « Suitcase 360° packshot » (l. 215) | allemand (de-CH) | `SP` (fallback LT) |
| 31 | fs/alphastudio-xxl-v2, fs/fashion-studio, fs/fashion-studio-basic | alt EN | « Model video » | allemand (de-CH) | `SP:216, 281, 302` (fallback LT) |
| 32 | fs/alphatable | alt EN | « Dungarees packshot » (l. 238, 259) / « Flat-lay coat packshot » (l. 233, 254) / « Kid blouse packshot » (l. 237, 258) / « Kid dress packshot » (l. 239, 260) | allemand (de-CH) | `SP` (fallback LT) |
| 33 | fs/bike-studio | alt EN | « Bike 360° view » (l. 324) / « Bike angle packshot » (l. 318) / « Bike front packshot » (l. 322) / « Bike tire packshot » (l. 323) / « Orbitvu Station templates » (l. 334) | allemand (de-CH) | `SP` (fallback LT) |
| 34 | fs/bike-studio, fs/e-comm-studio-plus, fs/fashion-studio, fs/fashion-studio-basic, fs/furniture-studio | alt EN | « Direct publishing » | allemand (de-CH) | `SP:292, 313, 335, 358, 380` (fallback LT) |
| 35 | fs/e-comm-studio-plus | alt EN | « Fridge packshot » (l. 344) / « Quad packshot » (l. 346) / « Red cabinet packshot » (l. 340) | allemand (de-CH) | `SP` (fallback LT) |
| 36 | fs/fashion-studio, fs/fashion-studio-basic | alt EN | « Clip merging » (l. 291, 312) / « Software-controlled lighting » (l. 283, 304) / « Sport fashion photo » (l. 275, 296) / « Sport fashion photo 2 » (l. 279, 300) / « Sport fashion photo 4 » (l. 280, 301) | allemand (de-CH) | `SP` (fallback LT) |
| 37 | fs/furniture-studio | alt EN | « Red chair packshot » (l. 363) / « Red shelf packshot » (l. 368) / « Yellow lamp packshot » (l. 367) | allemand (de-CH) | `SP` (fallback LT) |
| 38 | fs/alphashot-360, fs/alphashot-micro-v2, fs/alphashot-pro-g2, fs/alphashot-xl-g2, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/bike-studio, fs/e-comm-studio-plus, fs/fashion-studio, fs/fashion-studio-basic, fs/furniture-studio | badge EN | « 360° View » | allemand (de-CH) | `SP:528` (featureLabels fr/en) → `SP:942` (fallback LT) |
| 39 | fs/alphashot-360, fs/alphashot-micro-v2, fs/alphashot-pro-g2, fs/alphashot-xl-g2 | badge FR (« IA » ; allemand « KI ») | « IA Ready » | allemand (de-CH) | `SP:590` ; `SP:647` |
| 40 | fs/alphashot-360, fs/alphashot-micro-v2, fs/alphashot-pro-g2 | badge « Ideale Branchen » EN | « Cosmetics » | allemand (de-CH) | `SP:537` (sectorLabels fr/en) → `SP:975` (fallback LT) |
| 41 | fs/alphashot-360, fs/alphashot-pro-g2, fs/alphashot-xl-g2, fs/alphashot-xl-pro-v2 | idem | « Electronics » | allemand (de-CH) | `SP:538` → `SP:975` |
| 42 | fs/alphashot-360, fs/alphashot-pro-g2, fs/alphashot-xl-g2, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/alphatable | idem | « General » | allemand (de-CH) | `SP:539` → `SP:975` |
| 43 | fs/alphashot-micro-v2 | idem | « Jewelry » | allemand (de-CH) | `SP:536` → `SP:975` |
| 44 | fs/alphashot-pro-g2, fs/alphashot-xl-g2, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2 | idem | « Automotive » | allemand (de-CH) | `SP:548` → `SP:975` |
| 45 | fs/alphashot-xl-g2, fs/alphashot-xl-pro-v2 | idem | « Footwear » (l. 540) / « Wine & Spirits » (l. 542) | allemand (de-CH) | `SP` → `SP:975` |
| 46 | fs/alphashot-xl-g2, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/furniture-studio | idem | « Appliances » | allemand (de-CH) | `SP:547` → `SP:975` |
| 47 | fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2 | idem | « Bags » | allemand (de-CH) | `SP:541` → `SP:975` |
| 48 | fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/bike-studio | idem | « Sports » | allemand (de-CH) | `SP:545` → `SP:975` |
| 49 | fs/bike-studio | idem | « Cycling » | allemand (de-CH) | `SP:546` → `SP:975` |
| 50 | fs/alphashot-360, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/alphatable, fs/bike-studio, fs/e-comm-studio-plus, fs/furniture-studio | titre h3 EN (label galerie) | « Removal » | allemand (de-CH) | `SP:157, 179, 202, 225, 248, 268, 333, 355, 377` (fallback LT, rendu `SP:1032`) |
| 51 | fs/alphashot-360, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/e-comm-studio-plus, fs/furniture-studio | idem | « Lighting » | allemand (de-CH) | `SP:132, 159, 181, 204, 227, 243, 264, 330, 352, 357, 379` |
| 52 | fs/alphashot-micro-v2 | idem | « Auto removal » (l. 135) / « Retouch » (l. 137) | allemand (de-CH) | `SP` |
| 53 | fs/alphashot-pro-g2 | idem | « AI removal » (l. 115) / « Lighting control » (l. 112) / « Multi-channel export » (l. 114) / « Post-production » (l. 113) | allemand (de-CH) | `SP` |
| 54 | fs/alphashot-xl-g2 | idem | « Capture » | allemand (de-CH) | `SP:92` |
| 55 | fs/bike-studio, fs/e-comm-studio-plus, fs/fashion-studio, fs/fashion-studio-basic, fs/furniture-studio | idem | « Publishing » | allemand (de-CH) | `SP:292, 313, 335, 358, 380` |
| 56 | fs/fashion-studio, fs/fashion-studio-basic | idem | « Clip merging » | allemand (de-CH) | `SP:291, 312` |
| 57 | / (home) | alt FR | « Réservez votre démo — calendrier » | allemand (de-CH) | `components/animations/FloatingCalendar.tsx:30` |
| 58 | / (home) | texte FR (codé en dur, toutes locales) | « Cadence » (l. 48) / « photos/jour » (l. 50) / « Coût » (l. 53) / « par image » (l. 55) / « Impact » (l. 58) / « influencés » (l. 60) / « Capacité production » (l. 68) / « Saturée » (l. 69) / « Budget photo externalisé » (l. 80) / « Élevé » (l. 81) / « Cohérence visuels » (l. 92) / « Critique » (l. 93) / « Temps de production par visuel » (l. 106) | allemand (de-CH) | `FD` |
| 59 | fs/alphashot-360, fs/alphashot-micro-v2 | carte « Ähnliche Studios » FR (useCases joints) | « Produits réfléchissants/transparents, Cosmétiques, Électronique » | allemand (de-CH) | `RC:272` (useCases, FR seul) → `SP:1122` |
| 60 | fs/alphashot-360, fs/alphashot-pro-g2 | idem | « Bijoux, Montres, Pierres précieuses » | allemand (de-CH) | `RC:20` → `SP:1122` |
| 61 | fs/alphashot-micro-v2, fs/alphashot-pro-g2 | idem | « Lunettes, Petits appareils électroniques, Cosmétiques » | allemand (de-CH) | `RC:71` → `SP:1122` |
| 62 | fs/alphashot-xl-g2, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/fashion-studio, fs/fashion-studio-basic | idem | « Grands vêtements, Tapis, Carrelage » | allemand (de-CH) | `RC:566` → `SP:1122` |
| 63 | fs/alphashot-xl-g2, fs/alphastudio-xxl-v2, fs/alphatable, fs/fashion-studio, fs/fashion-studio-basic | idem | « Valises, Petits meubles, Sacs » | allemand (de-CH) | `RC:622` → `SP:1122` |
| 64 | fs/alphashot-xl-g2, fs/alphatable | idem | « Version Pro du XL, Éclairage avancé, Haute qualité » | allemand (de-CH) | `RC:458` → `SP:1122` |
| 65 | fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/alphatable, fs/fashion-studio, fs/fashion-studio-basic | idem | « Électroménager, Industrie, Automobile » | allemand (de-CH) | `RC:167` → `SP:1122` |
| 66 | fs/alphastudio-compact-v2, fs/bike-studio, fs/e-comm-studio-plus, fs/furniture-studio | idem | « Mannequins vivants, Vêtements (Ghost), Gros bagages » | allemand (de-CH) | `RC:673` → `SP:1122` |
| 67 | fs/bike-studio, fs/e-comm-studio-plus, fs/furniture-studio | idem | « Mode portée, Défilé vidéo, Stylisme complet » | allemand (de-CH) | `RC:779` → `SP:1122` |
| 68 | fs/alphashot-360 | sous-titre hero FR (useCases joints) | « Lunettes • Petits appareils électroniques • Cosmétiques • Chaussures (petites) » | allemand (de-CH) | `RC:71` → `SP:562` |
| 69 | fs/alphashot-micro-v2 | idem | « Bijoux • Montres • Pierres précieuses • Pièces de monnaie • Petits composants » | allemand (de-CH) | `RC:20` → `SP:562` |
| 70 | fs/alphashot-pro-g2 | idem | « Produits réfléchissants/transparents • Cosmétiques • Électronique » | allemand (de-CH) | `RC:272` → `SP:562` |
| 71 | fs/alphashot-xl-g2 | idem | « Électroménager • Industrie • Automobile • Mode • Électronique » | allemand (de-CH) | `RC:167` → `SP:562` |
| 72 | fs/alphashot-xl-pro-v2 | idem | « Version Pro du XL • Éclairage avancé • Haute qualité » | allemand (de-CH) | `RC:458` → `SP:562` |
| 73 | fs/alphastudio-compact-v2 | idem | « Valises • Petits meubles • Sacs • Outils » | allemand (de-CH) | `RC:622` → `SP:562` |
| 74 | fs/alphastudio-xxl-v2 | idem | « Mannequins vivants • Vêtements (Ghost) • Gros bagages • Meubles » | allemand (de-CH) | `RC:673` → `SP:562` |
| 75 | fs/alphatable | idem | « Grands vêtements • Tapis • Carrelage • Tissus grands formats » | allemand (de-CH) | `RC:566` → `SP:562` |
| 76 | fs/bike-studio | idem | « Vélos • Cycles • Trottinettes • Équipements cyclistes » | allemand (de-CH) | `RC:831` → `SP:562` |
| 77 | fs/e-comm-studio-plus | idem | « Canapés • Meubles volumineux • Motos • Électroménager lourd » | allemand (de-CH) | `RC:935` → `SP:562` |
| 78 | fs/fashion-studio | idem | « Mode portée • Défilé vidéo • Stylisme complet » | allemand (de-CH) | `RC:779` → `SP:562` |
| 79 | fs/furniture-studio | idem | « Canapés • Lits • Mobilier grande taille » | allemand (de-CH) | `RC:883` → `SP:562` |
| 80 | fs/bike-studio | spec « Max. Gewicht » FR/EN | « 35 kg (point) / 200 kg (surface) » | allemand (de-CH) | `RC:829` → `SP:607`, `SP:922` |
| 81 | fs/e-comm-studio-plus | idem | « 1000 kg (4000 kg option) » | allemand (de-CH) | `RC:933` → `SP:607`, `SP:922` |
| 82 | fs/fashion-studio-basic | spec « Max. Gewicht », abréviation EN | « N/A » | allemand (de-CH) | `RC:726` → `SP:607`, `SP:922` |
| 83 | fs/alphashot-360, fs/alphashot-micro-v2 | spec « Platzbedarf » FR | « Bureau » | allemand (de-CH) | `RC:37` ; `RC:88` → `SP:619`, `SP:924` |
| 84 | fs/alphashot-pro-g2 | idem | « Sol/Table robuste » | allemand (de-CH) | `RC:316` → `SP:619`, `SP:924` |
| 85 | fs/alphashot-xl-pro-v2, fs/alphatable | idem | « Sol » | allemand (de-CH) | `RC:475` ; `RC:584` → `SP:619`, `SP:924` |
| 86 | fs/alphastudio-xxl-v2 | idem | « Grand Studio » | allemand (de-CH) | `RC:690` → `SP:619`, `SP:924` |
| 87 | fs/bike-studio, fs/e-comm-studio-plus, fs/furniture-studio | idem | « Entrepôt » | allemand (de-CH) | `RC:849` ; `RC:901` ; `RC:953` → `SP:619`, `SP:924` |
| 88 | fs/fashion-studio, fs/fashion-studio-basic | idem | « Très Grand Studio » | allemand (de-CH) | `RC:745` ; `RC:797` → `SP:619`, `SP:924` |
| 89 | fs/bike-studio, fs/e-comm-studio-plus, fs/fashion-studio-basic, fs/furniture-studio | texte FR (useCases) | « Mode portée (version simplifiée) » | allemand (de-CH) | `RC:728` → `SP:961` (fiche) et `SP:1122` (« Ähnliche Studios ») |
| 90 | fs/alphashot-360 | texte FR (useCases, liste) | « Lunettes » / « Petits appareils électroniques » / « Chaussures (petites) » | allemand (de-CH) | `RC:71` → `SP:961` |
| 91 | fs/alphashot-360, fs/alphashot-pro-g2 | idem | « Cosmétiques » | allemand (de-CH) | `RC:71` ; `RC:272` → `SP:961` |
| 92 | fs/alphashot-micro-v2 | idem | « Bijoux » / « Montres » / « Pierres précieuses » / « Pièces de monnaie » / « Petits composants » | allemand (de-CH) | `RC:20` → `SP:961` |
| 93 | fs/alphashot-pro-g2 | idem | « Produits réfléchissants/transparents » | allemand (de-CH) | `RC:272` → `SP:961` |
| 94 | fs/alphashot-pro-g2, fs/alphashot-xl-g2 | idem | « Électronique » | allemand (de-CH) | `RC:167` ; `RC:272` → `SP:961` |
| 95 | fs/alphashot-xl-g2 | idem | « Électroménager » | allemand (de-CH) | `RC:167` → `SP:961` |
| 96 | fs/alphashot-xl-pro-v2 | idem | « Version Pro du XL » / « Éclairage avancé » / « Haute qualité » | allemand (de-CH) | `RC:458` → `SP:961` |
| 97 | fs/alphastudio-compact-v2 | idem | « Valises » / « Petits meubles » / « Sacs » / « Outils » | allemand (de-CH) | `RC:622` → `SP:961` |
| 98 | fs/alphastudio-xxl-v2 | idem | « Mannequins vivants » / « Vêtements (Ghost) » / « Gros bagages » / « Meubles » | allemand (de-CH) | `RC:673` → `SP:961` |
| 99 | fs/alphatable | idem | « Grands vêtements » / « Tapis » / « Carrelage » / « Tissus grands formats » | allemand (de-CH) | `RC:566` → `SP:961` |
| 100 | fs/bike-studio | idem | « Vélos » / « Cycles » / « Trottinettes » / « Équipements cyclistes » | allemand (de-CH) | `RC:831` → `SP:961` |
| 101 | fs/e-comm-studio-plus | idem | « Meubles volumineux » / « Motos » / « Électroménager lourd » | allemand (de-CH) | `RC:935` → `SP:961` |
| 102 | fs/e-comm-studio-plus, fs/furniture-studio | idem | « Canapés » | allemand (de-CH) | `RC:883` ; `RC:935` → `SP:961` |
| 103 | fs/fashion-studio | idem | « Mode portée » / « Défilé vidéo » / « Stylisme complet » | allemand (de-CH) | `RC:779` → `SP:961` |
| 104 | fs/furniture-studio | idem | « Lits » / « Mobilier grande taille » | allemand (de-CH) | `RC:883` → `SP:961` |
| 105 | 45 pages (toutes) | aria-label EN | « Language » (l. 308) / « Main navigation » (l. 509) | allemand (de-CH) | `components/layout/Header.tsx` |
| 106 | ia-photo-produit | aria-label FR | « Curseur avant/après » | allemand (de-CH) | `components/media/BeforeAfterSlider.tsx:176` |
| 107 | /branchen | description de secteur FR (DEFAULT_SECTORS) | « Packshot, 360° et lifestyle pour sneakers, luxe et sport » (l. 81) / « Macro focus stacking et visuels lifestyle haute joaillerie » (l. 82) / « Grands formats et mises en scène IA multi-ambiances » (l. 83) / « Packshot bouteilles, fidélité étiquettes et lifestyle cave & bar par IA » (l. 84) / « Rendu textures, reflets et ambiances spa par IA » (l. 85) / « Ghost mannequin, porté et flat-lay automatisés » (l. 86) / « Packshot reflets maîtrisés et visuels lifestyle tech » (l. 87) / « Catalogage 360° haute précision et nomenclature » (l. 88) / « Pièces détachées, 360° et intégration catalogue » (l. 89) / « Couleurs fidèles et mises en ambiance enfants par IA » (l. 90) / « Packshot technique et lifestyle outdoor immersif » (l. 91) / « Macro focus stacking et gestion des reflets verre saphir & boîtiers » (l. 97) | allemand (de-CH) | `SG` → `SG:69` |
| 108 | /branchen | nom de secteur FR (DEFAULT_SECTORS) | « Électronique & High-Tech » | allemand (de-CH) | `SG:87` → `SG:63` (/branchen) ; `IS:832` (br/*) |
| 109 | /branchen, br/brillen, br/mode, br/schmuck | idem | « Horlogerie » | allemand (de-CH) | `SG:97` → idem |
| 110 | /branchen, br/brillen, br/mode, br/schoenheit, br/uhren, br/wein | idem | « Bijoux & Joaillerie » | allemand (de-CH) | `SG:82` → idem |
| 111 | /branchen, br/brillen, br/mode, br/sport | idem | « Chaussures » | allemand (de-CH) | `SG:81` → idem |
| 112 | /branchen, br/brillen, br/schmuck, br/schoenheit, br/sport, br/uhren | idem | « Mode & Textile » | allemand (de-CH) | `SG:86` → idem |
| 113 | /branchen, br/brillen, br/schmuck, br/uhren, br/wein | idem | « Cosmétiques & Beauté » | allemand (de-CH) | `SG:85` → idem |
| 114 | /branchen, br/elektronik | idem | « Pièces Techniques » | allemand (de-CH) | `SG:88` → idem |
| 115 | /branchen, br/elektronik, br/sport | idem | « Jouets & Puériculture » | allemand (de-CH) | `SG:90` → idem |
| 116 | /branchen, br/schmuck, br/wein | idem | « Mobilier & Décoration » | allemand (de-CH) | `SG:83` → idem |
| 117 | /branchen, br/schoenheit | idem | « Vin & Spiritueux » | allemand (de-CH) | `SG:84` → idem |
| 118 | br/elektronik | idem | « Industrie Manufacturière » | allemand (de-CH) | `SG:93` → `IS:832` |
| 119 | br/mode, br/schmuck, br/uhren | idem | « Lunetterie & Optique » | allemand (de-CH) | `SG:95` → `IS:832` |
| 120 | br/schoenheit | idem | « Santé & Médical » | allemand (de-CH) | `SG:92` → `IS:832` |
| 121 | br/schoenheit, br/wein | idem | « Food & Alimentaire » | allemand (de-CH) | `SG:96` → `IS:832` |
| 122 | blog, blog/alphashot-xl-g2-produktfotos-masse-gewicht-daten, blog/altes-packshotcreator-studio-migrieren, blog/leitfaden-packshot-fotografie-warum-packshots-machen, blog/produkt-vorstellen-leitfaden-packshot-fotografie, blog/welches-bildformat-ist-das-beste-fur-das-web | catégorie EN/FR (allemand « Innovationen ») | « Innovations » | allemand (de-CH) | `content/blog/de-ch/alphashot-xl-g2-produktfotos-masse-gewicht-daten.json:12` |
| 123 | blog/leitfaden-packshot-fotografie-warum-packshots-machen, blog/welches-bildformat-ist-das-beste-fur-das-web | alt = artefact Webflow | « __wf_reserved_inherit » | alt descriptif en allemand | `content/blog/de-ch/leitfaden-packshot-fotografie-warum-packshots-machen.json:16` ; `content/blog/de-ch/welches-bildformat-ist-das-beste-fur-das-web.json:16` |
| 124 | blog/leitfaden-packshot-fotografie-warum-packshots-machen | alt FR (contenu importé) | « exemple d'une image lifestyle d'une montre » / « exemple de photo de montre pour e-commerce sur Google » / « Exemple photographies packshot produits taille moyenne » / « Packshot multi vues d'un casque moto » / « photo de chaussures en nature morte » / « photo détails produit photographie packshot » / « photographie packshot sur un site e-commerce » | allemand (de-CH) | `content/blog/de-ch/leitfaden-packshot-fotografie-warum-packshots-machen.json:16` |
| 125 | blog/welches-bildformat-ist-das-beste-fur-das-web | texte EN (légende) | « Credit: » | allemand (de-CH) | `content/blog/de-ch/welches-bildformat-ist-das-beste-fur-das-web.json:16` |
| 126 | br/elektronik | texte FR (data/solutions.ts) | « Documentation composants obsolescents (DMSMS), inspection PCB par focus stacking, base de référence macro. » (l. 157) / « Inspection PCB par focus stacking, détection micro-défauts soudure, documentation composants. » (l. 292) | allemand (de-CH) | `data/solutions.ts` → `IS:547` |
| 127 | br/elektronik | titre h3 FR (data/solutions.ts) | « DOCUMENTATION TECHNIQUE » (l. 60) / « QUALITÉ & TRAÇABILITÉ » (l. 208) | allemand (de-CH) | `data/solutions.ts` → `IS:543` |
| 128 | fs/furniture-studio, fs/maschinen-finder, studios-photo-automatises | spec « Max. Grösse » FR | « Mobilier XXL » | allemand (de-CH) | fiche : `RC:880` → `SP:601`, `SP:921` ; maschinen-finder et studios-photo-automatises : `MS:465` → `MC:113` |
| 129 | br/mode, br/sport, fs/bike-studio, fs/e-comm-studio-plus, fs/fashion-studio-basic, fs/furniture-studio, fs/maschinen-finder, studios-photo-automatises | idem | « Mannequin taille réelle » | allemand (de-CH) | fiches et br/* : `RC:725` → `SP:601`, `SP:921`, `SP:1129`, `IS:633` ; maschinen-finder et studios : `MS:376` → `MC:113` |
| 130 | br/mode, fs/bike-studio, fs/e-comm-studio-plus, fs/fashion-studio, fs/furniture-studio, fs/maschinen-finder, studios-photo-automatises | idem | « 200×100×200 cm (Espace scénique 3×3m) » | allemand (de-CH) | fiches et br/mode : `RC:776` → `SP:601`, `SP:921`, `SP:1129`, `IS:633` ; maschinen-finder et studios : `MS:405` → `MC:113` |
| 131 | 13 fiches fs/* (une valeur par fiche) | alt FR (gabarit) | « Studio photo Alphashot 360 » / « … Alphashot Micro Pro v2 » / « … Alphashot Pro G2 » / « … Alphashot XL G2 » / « … Alphashot XL Pro v2 » / « … Alphastudio Compact Pro v2 » / « … Alphastudio XXL Pro v2 » / « … Alphatable v2 » / « … Bike Studio » / « … E-Comm Studio+ » / « … Fashion Studio Pro v2 » / « … Fashion Studio Basic » / « … Furniture Studio » | allemand (de-CH) | `SP:571` (`alt={`Studio photo ${machine.nom}`}`) |
| 132 | 13 fiches fs/* (une valeur par fiche) | aria-label mixte FR+DE | « Lire la vidéo : <nom machine> in Aktion », pour les 13 noms de la ligne 131 | libellé entièrement allemand | `components/video/VideoPlayer.tsx:95` (« Lire la vidéo : » codé en dur) |

### 2.c Balises `<head>`

| URL | type d'erreur | valeur actuelle | attendu | fichier:ligne |
|---|---|---|---|---|
| 45 pages | `<html lang>` | `de-ch` (conforme) | — | `app/[lang]/layout.tsx:89` |
| /de-ch/academy (404) | `<html lang>` + texte | `lang="fr"`, « Page introuvable » | de-CH | `app/not-found.tsx:12-18`, `:23` |
| fs/alphashot-micro-v2, fs/alphashot-pro-g2, fs/alphashot-xl-pro-v2, fs/alphastudio-compact-v2, fs/alphastudio-xxl-v2, fs/alphatable, fs/bike-studio, fs/e-comm-studio-plus, fs/fashion-studio, fs/fashion-studio-basic, fs/furniture-studio (11 fiches) | `description` = `og:description` = `twitter:description` : allemand et français mélangés | « … Automatisiertes Fotostudio für » suivi des useCases FR : « Bijoux, Montres, Pierres précieuses, Pièces de monnaie, Petits composants » ; « Produits réfléchissants/transparents, Cosmétiques, Électronique » ; « Version Pro du XL, Éclairage avancé, Haute qualité » ; « Valises, Petits meubles, Sacs, Outils » ; « Mannequins vivants, Vêtements (Ghost), Gros bagages, Meubles » ; « Grands vêtements, Tapis, Carrelage, Tissus grands formats » ; « Vélos, Cycles, Trottinettes, Équipements cyclistes » ; « Canapés, Meubles volumineux, Motos, Électroménager lourd » ; « Mode portée, Défilé vidéo, Stylisme complet » ; « Mode portée (version simplifiée) » ; « Canapés, Lits, Mobilier grande taille » | allemand | `SP:473` (gabarit de-ch avec `machine.useCases`) ; les fiches alphashot-360 et alphashot-xl-g2 utilisent une surcharge et sont conformes |
| 38 pages : blog/* (5 articles), br/* (8), fs/* (14 dont maschinen-finder), guide et ses 3 guides, packshot-* (4), produktfotografie-bedarf, wer-sind-wir, wichtige-fragen-produktfotografie | `og:locale` absent | — | `de_CH` | `openGraph` de page sans `locale`, qui remplace celui du layout (ex. `SP:487-490`, `IS:146`, `app/[lang]/blog/[slug]/page.tsx:72-80`, `app/[lang]/packshot-amazon/page.tsx:37-41`, `app/[lang]/guide/page.tsx:44`) |
| 6 pages : /de-ch, blog, /branchen, ia-photo-produit, kontakt, studios-photo-automatises | `og:locale` | `de_CH` (conforme) | — | ex. `app/[lang]/page.tsx:136` |
| roi-rechner | `og:locale` / `og:title` / `og:description` / `og:url` / `og:image` hérités de EN | `en_US` / « PackshotCreator - Automated Photo Studios » / « Automated product photography solutions. Orbitvu photo studios, AI retouching, certified training. » / `https://www.packshot-creator.com/de-ch` / image au titre EN | `de_CH` / titre et description allemands / canonique `/de-ch/roi-rechner` | `app/[lang]/layout.tsx:27-43` (choix binaire `isFr`) ; `app/[lang]/calculateur-roi/layout.tsx` n'a pas d'`openGraph` |
| 18 pages : blog/* (5), fs/maschinen-finder, guide et ses 3 guides, packshot-* (4), produktfotografie-bedarf, roi-rechner, wer-sind-wir, wichtige-fragen-produktfotografie | `twitter:title` / `twitter:description` / `twitter:image` hérités de EN | « PackshotCreator - Automated Photo Studios » / « Automated product photography solutions. » / image au titre EN | allemand | `app/[lang]/layout.tsx:44-51` (ces pages n'ont pas de bloc `twitter`) |
| ia-photo-produit | `meta keywords` mélangé | « ki produktfoto, blendai, photoroom alternative, ki packshot, lifestyle generator, produktfoto ki, blendai vs photoroom » | allemand | `messages/de-ch.json:420` |
| 34 pages (blog/* 5, br/* 8, fs/* 14, packshot-* 4, produktfotografie-bedarf, wer-sind-wir, wichtige-fragen-produktfotografie) | `og:url` absent | — | canonique de-ch | `openGraph` de page sans `url` (mêmes fichiers) |

`og:title` = `<title>` (allemand) sur 44 pages ; seule exception, roi-rechner (ligne ci-dessus).

### 2.d Dates
- La seule page de-ch avec des dates au format anglais est `/de-ch/blog` (5 dates, ligne 10 du tableau 2.a). Correspondance : leitfaden… 2024-01-08, welches-bildformat… 2024-02-08, produkt-vorstellen… 2024-02-14, alphashot-xl-g2… 2026-07-14, altes-packshotcreator… 2026-09-25 (champ `"date"` ligne 9 des JSON de-ch).
- Cause : `app/[lang]/blog/page.tsx:64-65`. La locale `de-CH` est déjà utilisée par `app/[lang]/blog/[slug]/page.tsx:146` et `components/blog/RelatedArticles.tsx:67`.
- Aucune date au format français. « 25. September 2026 », « im Februar 2024 » et « 7. Mai 2026 » sont en format allemand.

### 2.e URL dans le JSON-LD des 45 pages de-ch

J'ai relevé 496 valeurs d'URL, dont **88 non canoniques** au sens de la demande :

| Critère | Nombre |
|---|---|
| URL `/fr/` ou `/en/` sur page de-ch | 6 |
| URL relative | 27 |
| Segment non localisé, page absente du sitemap | 55 |
| `sysnext.vercel.app`, `localhost`, `[object Object]` | 0 |
| Autre page absente du sitemap | 0 |

Hors défaut :
- 101 hôtes externes légitimes : linkedin.com 45, énumérations schema.org 28, videos.packshot-creator.com 26, blendai.studio 1, google.com/maps 1.
- 55 assets (images machines et logo) hors sitemap, tous en 200 en local.

| URL (page) | type d'erreur | valeur actuelle | attendu | fichier:ligne |
|---|---|---|---|---|
| /de-ch | `/fr/` dans ItemList | `…/fr/industrie/mobilier-decoration` ([3].url), `…/fr/industrie/chaussures` ([6].url) | URL de-ch : aucune n'existe, secteurs non couverts | `app/[lang]/page.tsx:742-756` (resolveNavHref renvoie vers fr) |
| blog/alphashot-xl-g2…, blog/altes-packshotcreator…, blog/leitfaden…, blog/welches-bildformat… | `/fr/` dans `author.url` (Person) | `https://www.packshot-creator.com/fr/a-propos` | `/de-ch/wer-sind-wir` | `components/seo/SchemaOrg.tsx:247` |
| br/brillen, br/elektronik, br/mode, br/schmuck, br/schoenheit, br/sport, br/uhren, br/wein | `Service.url` à segment non localisé, 301 en local | `…/de-ch/industrie/<slug allemand>` | `…/de-ch/branchen/<slug>` | `IS:855` |
| 13 fiches fs/* | BreadcrumbList `[2].item`, `Product.url`, `Offer.url` (39 valeurs), 307 en local | `…/de-ch/studio-photo/<slug>` | `…/de-ch/fotostudio/<slug>` | `SP:523` (breadcrumb) ; `SP:1335` → `components/seo/SchemaOrg.tsx:154` et `:169` |
| fs/maschinen-finder | breadcrumb `[2].item` (307) | `…/de-ch/studio-photo/selecteur-machines` | `…/de-ch/fotostudio/maschinen-finder` | `app/[lang]/studio-photo/selecteur-machines/page.tsx:61` |
| wer-sind-wir | breadcrumb `[1].item` (307) | `…/de-ch/a-propos` | `…/de-ch/wer-sind-wir` | `app/[lang]/a-propos/page.tsx:59` |
| produktfotografie-bedarf | idem | `…/de-ch/besoins-photographie-produit` | `…/de-ch/produktfotografie-bedarf` | `app/[lang]/besoins-photographie-produit/page.tsx:76` |
| roi-rechner | idem | `…/de-ch/calculateur-roi` | `…/de-ch/roi-rechner` | `app/[lang]/calculateur-roi/layout.tsx:49` |
| kontakt | idem | `…/de-ch/contact` | `…/de-ch/kontakt` | `app/[lang]/contact/page.tsx:57` |
| /branchen | idem | `…/de-ch/industrie` | `…/de-ch/branchen` | `app/[lang]/industrie/page.tsx:76` |
| packshot-industrie | idem | `…/de-ch/packshot-industriel` | `…/de-ch/packshot-industrie` | `components/templates/PackshotLandingTemplate.tsx:94` |
| wichtige-fragen-produktfotografie | idem | `…/de-ch/questions-cles-photographie-produit` | `…/de-ch/wichtige-fragen-produktfotografie` | `app/[lang]/questions-cles-photographie-produit/page.tsx:62` |
| blog/* (5) | `Article.image` relative | `/images/blog/alphashot-xl-g2-photo-mesures-donnees-produit/cover.avif` ; `/images/blog/migrer-ancien-packshotcreator/cover.avif` ; `/images/blog/67dbae71504f03ad3bf5accd.avif` ; `/images/blog/67dbae7374e3ee07a6f50304.avif` ; `/images/blog/67dd2ff25622e5086d8a6d85.avif` | URL absolue | `app/[lang]/blog/[slug]/page.tsx:114`, `:265` |
| guide/welche-ausrustung… (6), guide/welche-einstellungen… (11), guide/wie-uhr… (5) | `HowTo.image` / `HowToStep.image` relatives | ausrustung : `/images/guides/67d991842f685a27fca1fc35`, `…fc32`, `…fc3a`, `…fc28`, `67d99183a2299f1c17eaaa90`, `67d991831d2c1c71ab213bca` ; einstellungen : `67d9918505afdf485e76deea`, `…deed`, `…df02`, `…deff`, `…def6`, `…defc`, `…df0b`, `…def0`, `…def9`, `…df1b`, `…def3` ; wie-uhr : `67d99183a2299f1c17eaaa90`, `…aa9b`, `…aa94`, `…aa8d`, `…aa97` (tous `.avif`) | URL absolue | `app/[lang]/guide/[slug]/page.tsx:82`, `:90` |

**Textes du JSON-LD en FR ou EN sur les pages de-ch (complément, hors URL)** :
- `Organization.description` en FR sur 41 pages : `components/seo/SchemaOrg.tsx:41`.
- `Person.jobTitle` « Dirigeant & Expert Photo Produit » sur 4 articles : `SchemaOrg.tsx:246`.
- `Product.description` « <nom> : <useCases FR> » sur les 13 fiches : `SP:1333`.
- `VideoObject.description` « Demonstration … : <useCases FR>. » sur les 13 fiches : `SP:1357`.
- Noms de breadcrumb : « IA Photo Produit » (`app/[lang]/ia-photo-produit/page.tsx:107`), « Contact » (`app/[lang]/contact/page.tsx:57`), « Industries » (`app/[lang]/industrie/page.tsx:76`).

**Autre constat de locale** : sur les 8 pages br/*, les liens FR et EN du sélecteur de langue dans le HTML serveur pointent vers `/fr/industrie/<slug allemand>` et `/en/industrie/<slug allemand>`. Ces 16 URL répondent 404 en local. La chaîne est `components/layout/Header.tsx:319` → `i18n/deChCoverage.ts:297-307`. Le comportement après hydratation n'est pas établi.

## 3. Schema : statut exact

| Élément | Statut | Définition | Émission / visibilité (preuve) |
|---|---|---|---|
| `foundingDate` | JSON-LD | `'2004'`, `components/seo/SchemaOrg.tsx:72`, dans `organizationSchema()` (appelée dans 28 fichiers) | Présent sur 257 des 325 pages du sitemap : fr 126/162, en 90/118, de-ch 41/45 (dont /fr, /en, /de-ch). Absent de /de-ch/guide et ses 3 guides, de l'ensemble des guides fr/en, de /fr et /en academy/simulateur-opco et de 12 articles de blog (fichiers scratch). Ce n'est pas un texte visible. Le texte visible voisin dit « Depuis 2004 », « Since 2004 », « Seit 2004 » et « (2004-2024) » : `messages/fr.json:1891,1896,1921`, `messages/en.json:1888,1893,1918`, `messages/de-ch.json:1802,1807,1832`. D33 (`docs/seo-geo/DECISIONS.md:81-83`) fixe la création à 2001 ; la valeur 2004 n'est pas alignée dans 1a8c3de. |
| `courseSchema` | JSON-LD | `SchemaOrg.tsx:375-401`. Appelants : `app/[lang]/academy/[slug]/page.tsx:225`, `app/[lang]/academy/formations-packshot/page.tsx:417`, `app/[lang]/academy/formations-ia/page.tsx:458` | Émis sur 10 pages du sitemap : /fr/academy/{formations-ia, formations-packshot, elearning-autonome-niveau-1, niveau-1-fondation-blended, niveau-1-fondation-presentiel, niveau-2-maitrise-blended, niveau-2-maitrise-presentiel, niveau-3-expert-presentiel} et /en/academy/{formations-ia, formations-packshot}. Aussi sur 6 pages /en/academy/<slug> hors sitemap (`noindex, follow`). 0 page de-ch. `inLanguage` est absent du nœud Course ; il vaut `'fr'` en dur dans `hasCourseInstance` (`SchemaOrg.tsx:398`), y compris sur les pages /en. `courseMode: 'Blended'` est en dur (`:397`), y compris pour les 3 formations `"format": "presentiel"` (`content/formations/niveau-1-fondation-presentiel.json:6`, `niveau-2-maitrise-presentiel.json:6`, `niveau-3-expert-presentiel.json:6`). Noms et descriptions en FR sur les hubs /en (`formations-packshot/page.tsx:417`, `formations-ia/page.tsx:458`). |
| `AggregateOffer` | JSON-LD | `SchemaOrg.tsx:457-468`, dans `serviceSchema` (`:426`). Seul appelant : `app/[lang]/studios-photo-automatises/page.tsx:444` | Émis sur /fr, /en et /de-ch studios-photo-automatises : `priceCurrency` EUR, `lowPrice` 12000, `highPrice` 150000, `offerCount` 16, InStock. La fourchette est visible dans la FAQ des 3 locales (de-ch : `messages/de-ch.json:851`). Écarts dans le dépôt : prix minimal 12 450 (`RC:66`) ; E-Comm Studio+ `prix: 130000 // … (précédemment 150 000)` (`RC:930`) ; 17 machines dans RC, dont 4 `delisted` (`RC:125, 349, 401, 508`) ; EUR sur de-ch alors que les `Offer` des fiches de-ch sont en CHF (`lib/leasing.ts:32-34`). |
| `aggregateRating` 4.9 / 100 | JSON-LD, non visible | Inline dans `app/[lang]/ia-photo-produit/page.tsx:701-712` (`SoftwareApplication` BlendAI, `ratingValue: 4.9`, `reviewCount: 100`), conditionné par `lang !== 'de-ch'` | Émis sur /fr et /en ia-photo-produit uniquement ; aucune occurrence de « 4,9 », « 4.9 » ou « 100 avis » dans le texte rendu. Code mort : `aggregateRatingSchema` (`SchemaOrg.tsx:263-281`) et `productWithRatingSchema` (`:283-320`) n'ont aucun appelant. |
| `GMB_AGGREGATE` | Visible (texte), jamais en JSON-LD | `data/testimonials.ts:14` : `{ ratingValue: 4.7, reviewCount: 83 }` | Rendu par `components/testimonials/TestimonialsSection.tsx:80-81` : « (4,7/5 sur 83 avis) » en FR, « (4.7/5 over 83 reviews) » en EN, sur /fr, /en, /fr/academy, /en/academy, /fr et /en studios-photo-automatises. Non rendu sur de-ch (`TestimonialsSection.tsx:15`). |
| `dateRelative` | Visible | Type `data/testimonials.ts:5` ; 10 valeurs FR en dur aux lignes 21, 32, 43, 53, 63, 73, 84, 94, 104, 114 (« il y a 2 mois », « modifié il y a 6 mois », « il y a 9 mois », « il y a 1 an », « il y a 1 mois », « il y a 12 ans », « il y a 3 ans », « il y a 12 ans », « il y a 11 ans », « il y a 12 ans ») | Rendu tel quel par `TestimonialsSection.tsx:72`, sans localisation : visible en français sur les pages FR et aussi EN (/en, /en/academy, /en/studios-photo-automatises). Non rendu sur de-ch. Chaîne statique : « il y a 2 mois » ↔ `dateISO` 2026-03-08 (l. 21-22). [Inférence] Les couples dateRelative/dateISO correspondent à un calcul fait au 08/05/2026. |
| `Review` | JSON-LD | `reviewSchema`, `SchemaOrg.tsx:403-424` ; `datePublished = t.dateISO` (`TestimonialsSection.tsx:27`, émis `:93`) | 40 nœuds : /fr et /en (8 chacun), /fr et /en studios-photo-automatises (8 chacun), /fr et /en academy (4 chacun). 0 sur de-ch (`TestimonialsSection.tsx:15`, D31 `DECISIONS.md:114-129`). `datePublished` : home et studios 2026-03-08, 2025-11-08, 2025-08-08, 2025-05-08, 2026-04-08, 2014-05-08, 2023-05-08, 2014-05-08 ; academy 2025-05-08, 2023-05-08, 2015-05-08, 2014-05-08. |

**Types JSON-LD des trois accueils** :
- **/fr** : 12 blocs. Racine : Review ×8, Organization, WebSite, FAQPage, ItemList. Types imbriqués : Answer, ContactPoint, ImageObject, ListItem, Person, PostalAddress, QuantitativeValue, Question, Rating. `WebSite.inLanguage` = `fr-FR`.
- **/en** : mêmes types. `WebSite.inLanguage` = `en-US`.
- **/de-ch** : 4 blocs (Organization, WebSite, FAQPage, ItemList) plus Answer, ContactPoint, ImageObject, ListItem, PostalAddress, QuantitativeValue, Question. `WebSite.inLanguage` = `de-CH`.
- Source de `inLanguage` : `SchemaOrg.tsx:85` → `lib/seo/locale-schema.ts` ; appel `app/[lang]/page.tsx:737`.

## 4. Article « Migrer un ancien PackshotCreator » (#36)

Fichiers :
- FR36 = `content/blog/fr/migrer-ancien-packshotcreator.json`
- EN36 = `content/blog/en/migrate-legacy-packshotcreator-studio.json`
- DE36 = `content/blog/de-ch/altes-packshotcreator-studio-migrieren.json`

Le corps de l'article est à la ligne 16 de chaque fichier. Les FAQ sont aux lignes 20, 24, 28, 32, 36, 40, 44 et 48, identiques dans les trois fichiers. #36 ne contient ni « exclusif », ni garantie de délai, ni livraison ou installation présentée comme incluse (D6 et D32 non contredits).

| Claim #36 (fichier:ligne, citation) | Source du dépôt sur le même sujet | Le dépôt prouve-t-il que #36 est faux ? |
|---|---|---|
| FR36:16 « depuis que j'ai repris PackshotCreator en décembre 2025 » ; même claim dans la bio (EN36:16, DE36:16) | Aucune autre occurrence de « décembre / December / Dezember 2025 » | FAIT METIER A CONFIRMER |
| FR36:16 et FR36:20 : support des anciens logiciels arrêté le « 31 décembre 2024 » | `content/blog/fr/logiciel-packshotcreator-ortery-perdu-solution.json:16` « Le support PackshotCreator sur ces solutions a officiellement pris fin au 31 décembre 2024 » ; `docs/seo-geo/JOURNAL.md:63` | FAIT METIER A CONFIRMER (cohérent ; page, pas décision) |
| FR36:16 et FR36:24 : versions « livrées … entre 2003 et 2020 » sous Windows XP, 7 ou 10 | `logiciel-packshotcreator-ortery-perdu-solution.json:20` « versions livrées … entre 2003 et 2020 ne le sont généralement pas » ; `:16` « entre 2003 et 2024 … développés par Ortery » | FAIT METIER A CONFIRMER (cohérent) |
| Borne « 2003 » (FR36:16, :24 ; « 2003 » idem EN et DE) | `messages/fr.json:1896` « Depuis 2004 … premiers studios connectés » ; `messages/fr.json:1921` « (2004-2024) » ; `SchemaOrg.tsx:72` foundingDate 2004 ; `content/blog/fr/decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator.json:16` « Créée en 2003, la société Sysnext » ; `DECISIONS.md:81` (D33) « date de création : 2001 » | CONTRADICTION INTERNE (2003 contre 2004 selon les pages) ; D33 (2001) ne contredit pas une livraison dès 2003 |
| FR36:16, :24 : fin du support de Windows 10 le « 14 octobre 2025 » | Aucune | FAIT METIER A CONFIRMER (fait externe) |
| FR36:16 : Ortery « fabricant taïwanais que PackshotCreator ne distribue plus » | `messages/fr.json:2792` « Ortery (Taiwan/USA) » ; `logiciel-…-perdu-solution.json:16` « ne distribue plus les logiciels Ortery » | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16 « depuis son siège de Rotterdam » (EN « Rotterdam head office », DE « Hauptsitz in Rotterdam »), « pratiquement sans relais en France ni en Suisse » ; FR36:20 | `messages/fr.json:2807` « QG européen à Capelle aan den IJssel (Rotterdam) en juillet 2023 » ; `:2922` « Showroom européen à Rotterdam depuis 2023 » ; `content/blog/fr/comparatif-de-solutions-de-photographie-automatisee.json:36` « n'est plus présent en France depuis 2023 » | AMBIGU (« siège » contre « QG européen ») |
| FR36:16 : les studios Orbitvu actuels « se chargent par le côté » | `RC:469` (XL Pro v2) « portes coulissantes des deux côtés » ; aucune source générale | FAIT METIER A CONFIRMER |
| FR36:16 « pilotent jusqu'à 74 sources de lumière » ; tableau « Jusqu'à 74 sources pilotées » (DE « bis zu 74 Lichtquellen ») | `RC:188-190` (Alphashot XL G2) « 170 panneaux LED pilotés par IA » ; `SP:87` ; `content/blog/fr/alphashot-xl-g2-photo-mesures-donnees-produit.json:16` « 170 panneaux LED pilotés par IA » | CONTRADICTION INTERNE |
| FR36:16 « L'Alphashot Pro G2 compte 74 sources lumineuses pilotées une par une » | `messages/fr.json:1651` « l'Alphashot Pro G2 offre 74 sources lumineuses » ; `:2483` | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16 : XL Pro v2 « portes coulissantes des deux côtés et un laser de centrage », Alphashot 360 « une double porte » | `RC:469` « Laser de centrage et portes coulissantes des deux côtés » ; « double porte » : aucune source | FAIT METIER A CONFIRMER |
| FR36:16 : Micro Pro v2, « portes LED rétroéclairées » | `content/blog/de-ch/produkt-vorstellen-leitfaden-packshot-fotografie.json:28` « hinterleuchteten Seitentüren » | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16 : XL G2 « photographie, mesure au laser et pèse l'objet dans le même cycle » | `content/blog/fr/alphashot-xl-g2-photo-mesures-donnees-produit.json:16` | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16 (tableau) : anciens studios avec « 4 à 9 zones LED réglables », fond rétroéclairé | Aucune | FAIT METIER A CONFIRMER |
| FR36:16, :24 : Orbitvu Station sous « Windows 10 et 11, macOS » | `logiciel-…-perdu-solution.json:16` « Windows 11 et MacOS » ; `app/[lang]/blog/orbitvu-vs-concurrents/page.tsx:438` | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16, :28 : version 26.2 « publiée le 23 juin 2026 », détourage IA en capture, retoucheur IA, OCR bêta « sur six images au plus », autres fonctions « d'ici fin 2026 » | Aucune | FAIT METIER A CONFIRMER (externe) |
| FR36:16 : article 50 du règlement IA applicable le « 2 août 2026 » | `content/blog/fr/generer-images-produit-ia.json:16` (mention générale, sans date) | FAIT METIER A CONFIRMER (externe) |
| FR36:16, :40 : Orbitvu « conçoit et fabrique ses studios en Pologne » ; « conçus et fabriqués en Europe » | `comparatif-de-solutions-de-photographie-automatisee.json:20` « fabrication 100% interne en Pologne (180 salariés) » ; `orbitvu-vs-concurrents/page.tsx:82` « fabriqué en Pologne » | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16 « dans son usine de Silésie » (EN « Silesia », DE « Schlesien ») | Aucune mention de la Silésie ; `messages/fr.json:2798` « Fondé en 2010 à Cracovie » (lieu de fondation, pas d'usine) | FAIT METIER A CONFIRMER |
| FR36:16 : équipe « R&D de plus de 30 personnes », développement interne | `comparatif-de-solutions-de-photographie-automatisee.json:20` « Une équipe R&D de plus de 30 personnes » ; `content/blog/fr/pourquoi-choisir-orbitvu-photographie-packshot.json:16` « plus de 20 ingénieurs » (compatible) | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16, :20, :40 : « distributeur officiel des studios Orbitvu en France et en Suisse » | `DECISIONS.md:522-535` (D6) « distributeur officiel » | Aucune des quatre valeurs : conforme à D6, qui est un fait établi |
| FR36:16, :40 : support technique « en français » (DE « auf Französisch ») | `messages/de-ch.json:167` « auf Deutsch und Französisch » ; `messages/fr.json:189` ; `app/[lang]/distributeur-orbitvu-suisse/page.tsx:36` ; `DECISIONS.md:78`, `:88` (D33) | CONTRADICTION INTERNE avec ces 4 textes ; D33 ne contredit pas #36 |
| FR36:16, :40 : formations Qualiopi, OPCO « jusqu'à 100 % » en France | `messages/de-ch.json:67` « OPCO bis zu 100 % » ; `SP:1198-1206` | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16, :40 : « showroom de Lyon », « lyonnais », « à Lyon » (DE « Showroom in Lyon », « ab Lyon ») | `DECISIONS.md:599-601` (D1) « L'éditorial dit « près de Lyon ». La commune exacte (Saint-Bonnet-de-Mure)… » | AMBIGU (écart à la formulation D1 ; « in Lyon » pris au sens strict est contraire à la commune établie par D1) |
| FR36:16, :40 : à « moins de deux heures » de Genève | `data/secteurs-de-ch.ts:143` « weniger als 2 Stunden von Genf entfernt » | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16, :32 : profils non importables, « recréés en quelques jours » | Aucune | FAIT METIER A CONFIRMER |
| FR36:16 : export RAW et PSD, flux vers Shopify, PrestaShop, Magento | `content/guides/fr/comment-sublimer-texture-rouge-a-levres-photo-avec-ia.json:78,81` (PSD, Magento) ; `messages/fr.json:1090` (Shopify) | FAIT METIER A CONFIRMER |
| FR36:16, :36 : appareil non fourni d'office ; EOS R recommandés (R5, R5 II, R6, R6 II/III, R7, R8) ; 5D Mark III et 6D exclus | `RC:227` « système Canon EOS R » (XL G2) ; aucune liste de compatibilité | FAIT METIER A CONFIRMER |
| FR36:16 : anecdotes (installé « il y a neuf ans », « six ans sans problème », appels « chaque semaine », script sur mesure pour une grande marque cosmétique) | Aucune | FAIT METIER A CONFIRMER |
| FR36:16, :44 : 270, 335, 445 et 490 € HT par mois sur 60 mois (EN idem) ; DE36:16, :44 : CHF 255, 315, 415 et 455 | `lib/leasing.ts:14-17`, `:40-49` (prix × 1,3 ÷ 60, arrondi à 5, CHF × 0,93) appliqué à `RC:66` (12 450), `RC:15` (15 450), `RC:267` (20 450), `RC:453` (22 450) : même résultat. `Offer.price` identiques dans le JSON-LD des fiches. D7 (`DECISIONS.md:509-518`) | Aucune des quatre valeurs : les montants sont ceux que calcule le dépôt. Règle à part : D26 §5 (`DECISIONS.md:213`) « Les prix affichés … relèvent exclusivement des données structurées » ; D15 (`:349`) : tout prix affiché exige une validation explicite de SJ |
| FR36:16, :44 : durées « dès 36 mois » | `RC:54` « leasing sur 36 ou 60 mois » | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16, :20, :44 : reprise au cas par cas après « diagnostic gratuit » (EN trade-in, DE Rücknahme) | `logiciel-…-perdu-solution.json:36` « diagnostic gratuit, une évaluation de reprise … une remise commerciale » ; `content/blog/fr/evolution-e-commerce-packshot.json:16` | FAIT METIER A CONFIRMER (cohérent) |
| FR36:16, :48 : installation et formation sur site « de un à trois jours » | `messages/fr.json:1399` « L'installation du studio prend quelques heures » ; durées de formation dans RC : une demi-journée (`RC:101`) jusqu'à 2 ou 3 jours (`RC:758`, `RC:966`) ; `app/[lang]/academy/calendrier/page.tsx:177` « 1 à 3 jours » | AMBIGU |
| FR36:16, :48 : « La production ne s'arrête à aucun moment » / « n'est jamais interrompue » | Aucune (D32 ne couvre que retours, livraison et délai) | FAIT METIER A CONFIRMER |
| FR36:16 : calculateur « En six étapes … compare achat et leasing … analyse complète en PDF » ; EN36:16 « In six steps » ; DE36:16 « In sechs Schritten » | FR : `app/[lang]/calculateur-roi/page.tsx:20-28` affiche RoiPublicChat ; 6 questions (`lib/roiChat/onboarding.ts:57`, test `lib/roiChat/__tests__/onboarding.test.ts:31`) ; PDF (`components/roiChat/public/DossierPanel.tsx:87-88`). EN et DE-CH : assistant en 3 étapes (`components/calculators/ROICalculator/ROICalculatorWizard.tsx:30-34`, affichage « Schritt x/3 » `:154`) | FR : non contredit par le code. EN et DE-CH : CONTRADICTION INTERNE (c'est le code qui contredit, pas une page) |

## 5. Tests
- `npx vitest run` (motifs d'inclusion à `vitest.config.ts:11`) : **12 fichiers, 223 tests, 223 réussis, 0 échec.**
- Worker (4 fichiers, 129 tests) :
  - `cloudflare-worker/test/legacy-redirects.test.ts` : 31
  - `lot-f.test.ts` : 44
  - `p0-de-ch-heritage.test.ts` : 34
  - `unicite-tables.test.ts` : 20
- lib (8 fichiers, 94 tests) :
  - `lib/roiChat/__tests__/auth.test.ts` : 6
  - `chips.test.ts` : 6
  - `dossier.test.ts` : 6
  - `onboarding.test.ts` : 11
  - `publicMode.test.ts` : 19
  - `tools.test.ts` : 8
  - `lib/roiEngine/__tests__/engine.test.ts` : 35
  - `lib/seo/__tests__/locale-schema.test.ts` : 3 (fr → fr-FR, en → en-US, de-ch → de-CH)
- Playwright : 15 specs dans `e2e/*.spec.ts`, non exécutées.

## Non établi
- **Production** (Worker Cloudflare, redirections réelles, en-têtes) : non testée, requêtes interdites. Les 301 et 307 cités sont ceux de Next en local.
- **Textes rendus uniquement côté client** : seul le HTML serveur a été analysé.
  - L'assistant ROI de `/de-ch/roi-rechner` n'est pas dans le HTML serveur (placeholder `animate-pulse`).
  - La modale du sélecteur de machines ne s'ouvre qu'au clic ; son code annonce un fallback de-ch vers en (`components/machine-selector/components/MachineModal.tsx:19`).
  - Les liens du sélecteur de langue après hydratation.
  - Cela exigerait un navigateur (Playwright non exécuté).
- **Exhaustivité de 2.a** : la méthode combine une liste de mots, les accents et l'égalité avec les pages FR/EN. Une chaîne FR ou EN propre à une donnée de-ch, sans accent ni mot de la liste et absente des pages FR/EN, peut avoir échappé.
- **#36, faits externes** : Microsoft (Windows 10), règlement IA (article 50), Orbitvu Station 26.2, compatibilité Canon, usine de Silésie. Non vérifiés : la vérification demandée porte sur le dépôt seul.
- **Chaînes FR présentes dans `messages/de-ch.json`** (ex. `:205`, `:678`, `:685`, `:736`, `:2371`, `:2394`, `:2709`, `:2833`) : non rendues sur les 45 pages de-ch. Leur rendu sur d'autres routes de-ch n'est pas établi.

Les fichiers de travail (HTML rendus, extractions JSON, tables complètes page par page) sont dans `/tmp/claude-0/-home-claude/d288fc9d-bd18-5153-8c51-0feb8e40dbf9/scratchpad/`, notamment `table_final2.md`, `jsonld_rows.json`, `schema_found.json`, `meta_issues.json` et `vitest.json`.