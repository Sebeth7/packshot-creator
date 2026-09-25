# JOURNAL

Une entrée par intervention. **Plus récent en haut. On n'efface jamais.**

Un contrôle d'intégration refuse toute pull request modifiant le site sans
ajouter d'entrée ici.

---

## Gabarit — à copier

```markdown
## AAAA-MM-JJ · <titre court> · <Claude de Laurent | Claude de Sébastien>

**Chantier** : <référence 06-CHANTIERS, ex. C5> | **PR** : #<n> | **Commit** : `<sha>`

**Quoi** — ce qui a changé, en deux lignes maximum.

**Pourquoi** — le constat ou la mesure qui le justifie. Chiffré si possible.

**Fichiers** — `chemin/a.ts`, `chemin/b.json`

**Effet attendu** — ce qui devrait bouger, et sous quel délai.

**Vérifié** — commandes lancées, URL contrôlées, résultat.
**Supposé** — ce qui est tenu pour vrai sans contrôle, et pourquoi.
**Non regardé** — ce qui sort du champ de ce chantier. Ne pas laisser vide sans raison.

**Suite** — ce que ça ouvre, ce que ça bloque, ce qu'il reste.
```

Les trois rubriques **Vérifié / Supposé / Non regardé** ne sont pas
décoratives : le silence sur une dimension laisse croire qu'elle a été couverte.

---

## 2026-09-25 · Correctif : slug EN de l'article migration renvoyé en 410 par le Worker · Claude de Sébastien

**Chantier** : correctif de la PR #36 | **PR** : #37 | **Commit** : voir PR

**Quoi** — Le slug EN `migrate-old-packshotcreator-studio` devient `migrate-legacy-packshotcreator-studio` (fichier, `alternates.json`, `CONTENT_PRODUCT_MAP`).

**Pourquoi** — Sur www, la page EN répondait 410 « Gone » alors que sysnext.vercel.app la servait en 200 : `shouldReturn410()` du Worker renvoie 410 pour tout chemin contenant `-old-` (nettoyage de l'ancien site). Signalé par Sébastien le 25/09, constaté dans Chrome (status 410, titre « Gone | PackshotCreator »).

**Fichiers** — `content/blog/en/migrate-legacy-packshotcreator-studio.json` (renommé), `content/blog/alternates.json`, `data/content-maillage.ts`.

**Effet attendu** — Page EN en 200 sur www dès le déploiement ; hreflang croisés FR/EN/DE-CH vers la nouvelle URL.

**Vérifié** — Nouveau slug et slugs FR/DE-CH testés contre la fonction `shouldReturn410` extraite de `cloudflare-worker/src/index.js` (main) : ancien slug `true`, nouveau `false`, FR et DE-CH `false`. Plus aucune référence à l'ancien slug dans le dépôt (hors journal).
**Supposé** — Qu'aucune autre règle du Worker (redirections, GONE_PATHS) ne touche le nouveau chemin : le slug n'apparaît nulle part dans le Worker.
**Non regardé** — La version du Worker réellement déployée (le dépôt fait foi mais la prod peut avoir divergé, R5) ; le Worker n'est pas modifié ici.

**Suite** — Avant tout nouveau slug, le tester contre `shouldReturn410` : le motif `-old-` et le suffixe `-mod` sont réservés au nettoyage de l'ancien site. L'ancienne URL EN n'a été servie en 410 qu'environ une heure, sans lien entrant externe connu : pas de redirection prévue (elle serait de toute façon interceptée par le 410).

---

## 2026-09-25 · Article blog « Migrer un ancien studio PackshotCreator vers Orbitvu » (FR, EN, DE-CH) · Claude de Sébastien

**Chantier** : contenu blog (hors chantier numéroté) | **PR** : #36 | **Commit** : `b60f7b1`

**Quoi** — Nouvel article natif en trois langues (FR rédigé par Sébastien, EN et DE-CH adaptés), 5 visuels AVIF, entrée hreflang, tunnel Alphashot Pro G2 et liens entrants depuis 2 hubs secteurs et 1 money page.

**Pourquoi** — Les utilisateurs historiques de PackshotCreator appellent chaque semaine sur la fin de support des anciens logiciels (31/12/2024) ; aucune page ne traitait la migration vers la gamme Orbitvu actuelle.

**Fichiers** — `content/blog/{fr,en,de-ch}/*.json` (3 nouveaux), `content/blog/alternates.json` (1 entrée ajoutée), `data/content-maillage.ts` (ajouts seulement : CONTENT_PRODUCT_MAP ×3, SECTOR_RESOURCES_MAP cosmetiques-beaute + jouets-puericulture, MONEY_PAGE_RESOURCES_MAP studios-photo-automatises), `public/images/blog/migrer-ancien-packshotcreator/` (5 AVIF, 236 Ko).

**Effet attendu** — Indexation des 3 URL sous quelques jours ; requêtes « ancien studio PackshotCreator », « logiciel PackshotCreator Windows 11 » et équivalents EN/DE.

**Vérifié** — `next build` vert, 3 pages prérendues ; en local : HTTP 200, canonical, hreflang (fr, fr-CH, en, de-CH, x-default) croisés, FAQPage, tunnel « Studio recommandé » dans les 3 langues, listing blog, sitemap, liens entrants sur les 2 hubs et la money page, 5 images servies. Prix leasing recalculés contre `lib/leasing.ts` (EUR et CHF).
**Supposé** — Rendu mobile de l'image portrait XL G2 (limitée à 60 % de largeur) : seul l'affichage bureau a été contrôlé.
**Non regardé** — Test détecteur IA et relecture native des versions EN et DE-CH (à faire par Sébastien avant fusion) ; rendu derrière Cloudflare.

**Suite** — Couverture à remplacer par une photo du showroom (Sébastien) ; transmettre URL et date de mise en ligne à Laurent ; supprimer l'ancien brouillon non suivi du 04/09 dans le checkout principal.

---

## 2026-09-25 · P0-K — resynchronisation documentaire P0 ; P0-J différé · Claude de Laurent

**Chantier** : P0-K (et état de P0-J) | **PR** : #35 (documentation seule) | **Non fusionnée**

**Quoi** — `ETAT.md` remis dans l'état réel, sans aucun changement en base, dans n8n ni sur le site :
- P0-I passe à **APPLIED / PASS**, P0-H à **APPLIED / MEASUREMENT WINDOW OPEN** jusqu'au 08/10, et P0-F à **DEFERRED_BLOCKED_ACCESS**.
- P0-J (device + watchdog) et P0-K entrent dans le tableau P0. P0-J est aussi ajouté aux chantiers ouverts, en **OPEN, différé**.
- P0-A et D31, appliqués, sortent des chantiers ouverts. Le contrôle post-déploiement de #29 et #32 est scindé :
  - `smoke.mjs` et `sysnext.vercel.app` : faits le 24/09 ;
  - contrôle visuel Chrome sur `www` : seul restant.
- La ligne « déploiement du Worker portant uniquement #16 » est retirée : ce déploiement a eu lieu le 20/09. La mesure « Canonique des 3 landings après #16 » est datée : déployée le 20/09, lisible vers le 04/10.
- #31 figure explicitement en **CLOSED / NOT MERGED**.
- P0-C et P0-G sont signalés hors de cette resynchronisation : aucune source du dépôt n'établit leur état.

**Pourquoi** — Contrôle final ciblé P0-J / P0-K du 25/09. Laurent a décidé de faire P0-K maintenant et de différer P0-J après la fenêtre P0-H. Modifier M5 et `gsc_pull_bornes` pendant la mesure P0-H, dont le critère est « 0 échec de M5 », affaiblirait cette preuve.

**Fichiers** — `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun sur le site. À la fusion de #35, `main` décrit l'état réel pendant la fenêtre de mesure.

**Vérifié** (le 25/09, lecture seule) —
- *P0-J* :
  - `gsc_metrics_device` : dernière `data_date` au 20/06/2026 pour les sites 2 et 3, dernière récupération le 23/06. `gsc_metrics` est à jour au 22/09.
  - M5 (`Sqdk2jygOSt9XEjL`, actif, dernière modification le 21/07) ne collecte que les dimensions `query`, `country` et `page`. `gsc_pull_bornes()` ne renvoie aucune borne `device`.
  - La fonction `upsert_gsc_device(jsonb)` existe, mais aucun workflow n8n ne l'appelle : la recherche « device » ne renvoie rien.
  - Watchdog M0 (`Uxpnp2YDkYVAq52L`, actif, tous les jours à 08h) : il lit `data_freshness_expected`, qui liste 14 sources dont `gsc_metrics_device` ne fait pas partie. `m0_watchdog_json`, `data_freshness` et `gsc_freshness` ne mentionnent pas le device.
- *#16* : Worker déployé le 20/09 à 06:40:14 UTC, version `167d7a15` (entrée du 20/09).
- *Cohérence* :
  - `DECISIONS.md` et la boîte aux lettres ne mentionnent aucun P0 et ne contredisent pas l'ETAT ;
  - seule Q10 est ouverte ;
  - Q16 à Q18 ne sont pas reconstituées ;
  - D29, D30 et D31 sont conformes.

**Supposé** — Rien.

**Non regardé** — Le contrôle visuel Chrome sur `www`, fait par Laurent. Les définitions de P0-C et P0-G dans le Master, qui est hors dépôt.

**Suite** —
- Contrôle visuel Chrome sur `www` (`/fr`, `/en`, `/de-ch`), par Laurent.
- Fusion de #35 sur GO.
- Après le 08/10, P0-J sur GO :
  - dimension device dans M5 ;
  - borne device dans `gsc_pull_bornes` ;
  - reprise de l'historique depuis le 21/06 ;
  - inscription de `gsc_metrics_device` dans `data_freshness_expected`.
- Ensuite, une dernière PR documentaire fermera le P0.

## 2026-09-25 · P0-I — filtre pollution GSC appliqué (8 fonctions SQL) · Claude de Laurent

**Chantier** : P0-I | **Supabase** : `gsc-crawl-seo`, migration `20260925061338` `p0i_filtre_pollution_gsc_site_20260925` | **PR** : documentation seule | **P0-I = APPLIED**

**Quoi** — Le 25/09/2026 à 06:13:38 UTC, sur `GO_P0_I` de Laurent : dans les 8 fonctions, le littéral `amazon` est retiré des motifs d'exclusion et remplacé par `(^|\s)site:`. Aucun autre changement. Les 8 fonctions :
- `app_blog_reconversion_list`
- `app_gsc_opportunities`
- `app_gsc_top_queries`
- `app_kpi_loop`
- `app_page_conversion_loop`
- `gsc_candidates_vertical`
- `gsc_quick_wins_json`
- `gsc_tracking_weekly_json`

Motifs modifiés, 10 occurrences :
- `vercel|todovirtual|amazon|orbitvu.nl` (ou `orbitvu\.nl`) devient `vercel|todovirtual|(^|\s)site:|orbitvu.nl` ;
- dans `gsc_quick_wins_json`, `p_brand_regex` `(creator|ortery|orbitvu|vercel|todovirtual|amazon)` devient `(creator|ortery|orbitvu|vercel|todovirtual|(^|\s)site:)`.

Application en une seule transaction, gardée par md5 avant et après écriture. Aucun changement n8n, applicatif ni Cloudflare.

**Pourquoi** — P0-I, dry-run validé. La marque `amazon` écartait des requêtes légitimes, alors que les requêtes opérateur `site:` gonflaient les impressions.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. En base : les 8 fonctions ci-dessus.

**Effet attendu** — Immédiat dans les RPC de pilotage :
- les requêtes contenant « amazon » sans autre motif de pollution sont réadmises ;
- les requêtes `site:` sont exclues ;
- aucun clic n'est gagné ni perdu.

**Vérifié** —
- *Snapshot avant écriture* :
  - les 8 définitions sont relues par `pg_get_functiondef` et sont dans l'état audité le 24/09 (`amazon` présent, 0 `site:`) ;
  - elles sont copiées hors dépôt, et les 8 copies sont identiques à la production par md5 ;
  - une seule version de chaque fonction.
- *Dry-run rejoué avant écriture*, logique identique à la validation, fenêtre `data_date >= ancre − 90`, 0 clic dans chaque cas :

| Mesure | Ancre du dry-run (21/09) | Ancre actuelle (22/09) |
|---|---|---|
| PSC, requêtes réadmises | 40 / 1 694 impressions | 41 / 1 684 |
| PSC, nouvelles filtrées `site:` | 3 / 2 239 | 3 / 2 239 |
| PSC, pollution filtrée après changement | 71 / 5 595 | 71 / 5 608 |
| Orbitvu, requêtes Amazon réadmises | 15 / 45 | 15 / 45 |

  Les valeurs du dry-run sont reproduites **exactement**. L'écart avec l'ancre actuelle ne vient que du jour de données du 22/09, récupéré le 25/09. Aucune ligne antérieure n'a été réécrite : chaque jour n'est récupéré qu'une fois.
- *Après écriture* :
  - 8/8 md5 conformes, 0 occurrence d'`amazon`, 10 occurrences de `(^|\s)site:` ;
  - propriétaire, droits, `SECURITY DEFINER`, `search_path`, volatilité et commentaires inchangés ;
  - aucune fonction dupliquée ;
  - le remplacement inverse redonne exactement les md5 d'origine.
- *Contrôle fonctionnel avant/après* :
  - **clics inchangés partout** (452, 314 + 127, 17, 16, 99, 7, 2), conversions et `global_web` inchangés ;
  - `app_gsc_top_queries` et `app_gsc_opportunities` inchangés ;
  - `gsc_quick_wins_json` : 2 requêtes Amazon ajoutées (+279 impressions), aucune requête `site:` avant ni après ;
  - `gsc_candidates_vertical` : 2 requêtes Amazon ajoutées (+14) ;
  - `gsc_tracking_weekly_json` : `site:www.packshot-creator.com` exclue, « 360 images for amazon » réadmise ;
  - écarts d'impressions **égaux au calcul attendu** : `app_page_conversion_loop` −864, `app_kpi_loop` −307 et −557, `app_blog_reconversion_list` +23.
- *Dépendants* :
  - `app_recommendations` (appelle `app_gsc_opportunities`) s'exécute sans erreur ;
  - `r3_measure_article` (appelle `gsc_tracking_weekly_json`) écrit en base : non appelé, sa dépendance a été testée directement.
- *n8n, lecture seule* : le nœud `Init` de « M6 · Scoring MICRO » (`3FtFKh8649fi03TZ`) ne porte que le lexique, pas le filtre de pollution : aucune synchronisation n'est requise. Workflow non modifié (dernière mise à jour le 02/07).

**Écart avec la référence du dry-run** — Orbitvu : la référence annonçait « 1 requête Amazon reste filtrée ». En réalité, les 15 requêtes Amazon sont réadmises. La seule requête Orbitvu qui reste filtrée est `orbitvu.nl` (8 impressions), sans « amazon », et elle l'était déjà avant. C'est un écart de formulation, pas de logique.

**Supposé** — Que les workflows n8n appelant ces RPC par REST gardent le même contrat : les signatures et types de retour sont inchangés.

**Non regardé** — Les prochaines exécutions des workflows consommateurs, dont M6, et de `r3_measure_article`. L'effet sur les tableaux de bord au-delà des RPC testées.

**Suite** — Rollback disponible. Le bloc ci-dessous restaure exactement les 8 définitions d'origine. Il est gardé par md5 et refuse de s'exécuter si une fonction a divergé depuis le 25/09. Les 8 définitions d'origine en clair ont aussi été transmises à Laurent, hors dépôt.

```sql
-- ROLLBACK P0-I · restaure exactement les 8 définitions d'avant le 25/09/2026.
-- Remplacement inverse '(^|\s)site:' → 'amazon', gardé par md5 avant et après : tout écart annule la transaction.
DO $p0i_rb$
DECLARE
  r record;
  v_actuel constant jsonb := '{
    "app_blog_reconversion_list":"1e6d513cd29a0369b5d67caff8f7b2e5",
    "app_gsc_opportunities":"ed590889d54f3acd785f425585fa851a",
    "app_gsc_top_queries":"6611063a0688c1a5c5ad947f60cc3ec1",
    "app_kpi_loop":"b521c4aaca83e47ffbae9dd6c346cde0",
    "app_page_conversion_loop":"0136e49c080af368be89a38332cdddb7",
    "gsc_candidates_vertical":"3b97141a28ccd1026ab264c96e707a3a",
    "gsc_quick_wins_json":"0c01cf57a4b7ba7f30ca8159e9341e05",
    "gsc_tracking_weekly_json":"f7f648bcaae09f184067621525e459c0"}';
  v_origine constant jsonb := '{
    "app_blog_reconversion_list":"f14f0f4f0310e5ae48a826d3a4337915",
    "app_gsc_opportunities":"84453d8df1589d76ff897c9685edff46",
    "app_gsc_top_queries":"b9f3268c367be551bf3f8f92ae1374a6",
    "app_kpi_loop":"b409b2fab018d311740a0320ed85e6bd",
    "app_page_conversion_loop":"d9865c4fd75347825070a496d13e1118",
    "gsc_candidates_vertical":"03e1ef08dc09627520004f6e70100513",
    "gsc_quick_wins_json":"7a7716d53582b70f5e6b099c476b1e4a",
    "gsc_tracking_weekly_json":"44a01ea21784b5eaedc79025002a2261"}';
  n int := 0;
BEGIN
  FOR r IN SELECT p.oid, p.proname, md5(pg_get_functiondef(p.oid)) AS m
           FROM pg_proc p JOIN pg_namespace ns ON ns.oid = p.pronamespace
           WHERE ns.nspname = 'public' AND p.proname IN (SELECT jsonb_object_keys(v_actuel))
  LOOP
    IF r.m IS DISTINCT FROM v_actuel->>r.proname THEN
      RAISE EXCEPTION 'Rollback P0-I refusé : % a divergé (md5 %)', r.proname, r.m;
    END IF;
    EXECUTE replace(pg_get_functiondef(r.oid), '(^|\s)site:', 'amazon');
    n := n + 1;
  END LOOP;
  IF n <> 8 THEN RAISE EXCEPTION 'Rollback P0-I : % fonctions au lieu de 8', n; END IF;
  FOR r IN SELECT p.proname, md5(pg_get_functiondef(p.oid)) AS m
           FROM pg_proc p JOIN pg_namespace ns ON ns.oid = p.pronamespace
           WHERE ns.nspname = 'public' AND p.proname IN (SELECT jsonb_object_keys(v_origine))
  LOOP
    IF r.m IS DISTINCT FROM v_origine->>r.proname THEN
      RAISE EXCEPTION 'Rollback P0-I : md5 inattendu pour % (%)', r.proname, r.m;
    END IF;
  END LOOP;
END
$p0i_rb$;
```

## 2026-09-25 · Arbitrages de Laurent — Q2, Q4, Q6, Q12 à Q15 · Claude de Laurent

**Chantier** : gouvernance | **PR** : #34, branche `claude/lucid-mayer-tz2mk8` (documentation seule) | **Non fusionnée**

**Quoi** — Sept questions de la boîte aux lettres sont closes sur décision de Laurent du 25/09. Quatre deviennent des décisions nouvelles (D32, D33, D35, D36), une en clôt une ancienne (D34 clôt D8), et deux confirment des décisions existantes :

| Question | Réponse | Consignée en |
|---|---|---|
| Q13 | Aucune politique de retour B2B ; livraison et installation facturées en supplément ; délai indicatif d'environ 10 jours, jamais présenté comme une garantie contractuelle ; même règle en France et en Suisse | D32 |
| Q15 | Allemand un peu parlé : accompagnement commercial en allemand possible en Suisse, équipe ni bilingue ni germanophone native ; espagnol non parlé ; `twitter.com/packshot` à Sysnext, inactif ; date de création 2001, `foundingDate` à aligner | D33 |
| Q4 | D8 close comme devenue sans objet | D34, statut de D8 |
| Q14 | Requête française → page FR ; article EN inchangé ; mesure F5 conservée | D35 |
| Q12 | `noindex` de `sysnext.vercel.app` validé, à exécuter puis à vérifier | D36 |
| Q6 | Aucune objection reçue avant le 25/09 : décision prévue conservée | D22 |
| Q2 | Close selon le régime tacite prévu au 24/09 | D15, désormais « en vigueur » |

`ETAT.md` :
- les questions closes sortent de « Balle chez Sébastien » ;
- les actions à exécuter entrent dans « Prochaines actions » ;
- seule Q10 reste ouverte.

**Précisions de Laurent du 25/09, avant fusion** — D33 : « allemand non parlé » est remplacé par « un peu parlé ». L'accompagnement commercial en allemand en Suisse est possible, sans présenter l'équipe comme bilingue ni germanophone native, et les mentions actuelles sont conservées. D32 : la règle est la même pour la France et la Suisse. L'écart R7 sur l'allemand, consigné dans une première version de cette PR, est levé.

**Pourquoi** — Arbitrages rendus par Laurent le 25/09, à consigner avant toute mise en œuvre.

**Fichiers** — `docs/seo-geo/BOITE-AUX-LETTRES.md`, `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun sur le site : aucun fichier applicatif touché, aucune règle Cloudflare modifiée.

**Vérifié** (le 25/09, R7) —
- `components/seo/SchemaOrg.tsx:72` : `foundingDate: '2004'`.
- `components/seo/SchemaOrg.tsx:69-71` : le `sameAs` de l'organisation ne contient que LinkedIn, pas `twitter.com/packshot`.
- Mentions d'accompagnement en allemand, compatibles avec D33 et conservées : `messages/fr.json:189`, `messages/de-ch.json:167`, `messages/en.json:93` et `app/[lang]/distributeur-orbitvu-suisse/page.tsx:36`, et `components/seo/SchemaOrg.tsx:66` (`availableLanguage` avec `German` sur le `ContactPoint` commercial suisse).
- Recherche de formulations « bilingue », « germanophone », « natif », « couramment », et de leurs équivalents allemands et anglais, dans `messages/`, `app/`, `components/` et `content/` : aucune ne vise la langue de l'équipe. Les quatre textes ci-dessus annoncent en allemand l'ensemble du service, formation et SAV compris : ils sont signalés pour une relecture ultérieure.
- `https://sysnext.vercel.app/fr` : ni en-tête `X-Robots-Tag` ni balise `robots`, l'origine est indexable.
- `scripts/seo/smoke.mjs` ne lit que la balise `robots`.
- Aucun texte d'origine perdu dans `BOITE-AUX-LETTRES.md` : 0 ligne manquante après déplacement.

**Supposé** — Les faits commerciaux et d'entreprise (Q13, Q15) sont ceux déclarés par Laurent ; le dépôt ne permet pas de les vérifier. L'absence d'objection avant le 25/09 (Q6) et au 24/09 (Q2) est tenue pour acquise sur la déclaration de Laurent.

**Non regardé** — La fiche Google elle-même, en particulier ses mentions « Espagnol » et « Allemand non parlé ». Les règles WAF actuelles (P0-F sans accès).

**Suite** —
- Q10 est la seule question encore ouverte.
- Relecture éventuelle des quatre textes qui annoncent en allemand l'ensemble du service (D33), sans modification dans cette PR.
- Mises en œuvre distinctes, hors de cette PR : D32 (données structurées des fiches) ; D33 (`foundingDate` 2001) ; D36 (`noindex` de l'origine) ; D22 (règle WAF PerplexityBot).
- P0-I et P1 ne sont pas touchés.

## 2026-09-25 · Déploiement du Worker — P0-D/E · Claude de Laurent

**Chantier** : P0-D/E | **PR** : #30, fusionnée (`665f5ef`) | **Commit déployé** : `69cd647` (`main`) | **Version Cloudflare** : `27b0153c-5516-432a-91a4-20cddce250ca` | **P0-D/E WORKER = CLOSED**

**Quoi** — `packshot-router` déployé depuis `main` par `wrangler deploy` (wrangler 4.136.3), le 25/09/2026 à 05:07:25 UTC, sur GO de Laurent (`GO_WORKER_DEPLOY`). Le déploiement porte la PR #30 et rien d'autre. Aucune édition au dashboard (D4, R5). Ni P0-I, ni P1.

**Pourquoi** — P0-D/E, fusionné le 24/09 : héritage `/de` → `/de-ch`, chaînes `/industrie/*` et `/studio-photo/*` à un saut, doublon « -22 », `packshot-mannequin`. Vercel ne déploie pas le Worker.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. Déployé : `cloudflare-worker/src/index.js` de `69cd647`.

**Effet attendu** — Immédiat côté Worker : 30 chemins changent de premier saut (60 avec la barre finale), vers une page 200 à canonique auto-référente. Lisible dans la couverture GSC et les pages de destination à J+14 (09/10).

**Vérifié** —
- *Contrôle post-fusion du 24/09*, sur `sysnext.vercel.app` : Vercel, P0-A et D31 PASS ; `smoke.mjs` vert, 17 pages et 3 ressources.
- *Avant déploiement* :
  - code de production relu par l'API, identique octet pour octet aux relevés du 24/09 : **aucune divergence** ;
  - version `05c5c47c-4b60-41af-9acd-b3778be1e508` à 100 % (déploiement `3c88c9cb` du 23/09) ;
  - routes (`www.packshot-creator.com/*`, `packshot-creator.com/*`, `*.packshot-creator.com/*`) et réglages (`compatibility_date` 2024-01-01, `NEXTJS_ORIGIN`, `WEBFLOW_ORIGIN`) identiques à `wrangler.toml` ;
  - bundle construit à blanc depuis `main` : 0 écart de comportement avec le source sur 5 530 chemins ;
  - écart production → `main` : 30 premiers sauts (60 avec la barre finale), la liste validée dans la PR #30 ; 0 chemin Alphashot XL ; variante `/amp` du « -22 » en 410 ; 30 destinations finales sur 30 en 200, en un saut, canonique auto-référente, sur `sysnext.vercel.app` ;
  - `npm run test:unit` : 223/223.
- *Après déploiement, par l'API* :
  - déploiement `80f41b94-d560-4a9a-91a1-60f577ef4535`, version `27b0153c` à 100 % ;
  - code relu identique octet pour octet au bundle de `main`, 0 écart de comportement avec `main` sur 5 530 chemins ;
  - par rapport à `05c5c47c`, exactement les 30 changements validés ;
  - routes et réglages identiques avant et après.
- *Témoins en production*, depuis le poste de Laurent : `curl.exe` sous PowerShell, chaîne `v=p0de-5`, 16 témoins et 3 variantes avec barre finale. **Verdict de Laurent : PASS, aucun rollback.**
  - Redirections P0-D/E → destinations finales en 200, canoniques cohérentes.
  - `/amp` du « -22 » : 410 avec et sans barre finale.
  - `/de/fotostudio/alphashot-xl` → `/de-ch/fotostudio/maschinen-finder` : D29 non réintroduite.
  - `/de/studio-photo/alphashot-xl` → XL G2 : comportement antérieur, `REVIEW_PRODUCT_MAPPING`, inchangé par ce déploiement.
  - `videos.` : 404, sans redirection vers `www`. `books.` : 302 sur le même hôte puis 200, sans redirection vers `www`. `trail.` : 200.
- *Depuis le conteneur* : `www.` et `videos.` en 403 `cf-mitigated: challenge` (R4) ; `books.` et `trail.` en 200, sans redirection vers `www`.

**Supposé** — Que le 404 de la racine de `videos.` vient de son origine : le Worker laisse passer cet hôte (`PASSTHROUGH_HOSTS`), et la simulation donne le même passage avant et après ce déploiement.

**Non regardé** — L'état de la racine de `videos.` avant ce déploiement, depuis le poste de Laurent. Les 30 chemins un par un en production (19 témoins seulement). GSC, à J+14.

**Suite** —
- Mesure à J+14 (09/10), dans GSC.
- Rollback si besoin, depuis `cloudflare-worker/` : `npx wrangler@4.136.3 rollback 05c5c47c-4b60-41af-9acd-b3778be1e508`. Jamais au dashboard.
- Mappings XL existants maintenus en `REVIEW_PRODUCT_MAPPING` (D29 suspendue) : aucun changement XL avant validation du mapping produit.
- P0-I : opération indépendante, sur GO séparé, avec son rollback SQL.
- Hors P0, nettoyage ultérieur (classement de Laurent) :
  - phrase anglaise en dur sur `/de-ch/wichtige-fragen-produktfotografie` ;
  - deux chaînes de satisfaction dans `messages/de-ch.json`, non rendues.

## 2026-09-24 · Gouvernance P0 — D29 à D31, état des P0 · Claude de Laurent

**Chantier** : clôture technique P0 du 24/09 | **PR** : #33, branche `docs/gouvernance-p0-2026-09-24` (documentation seule) | **Fusionnée en dernier**, après #29, #30 et #32

**Quoi** — `DECISIONS.md` : D29 (`SUSPENDED / REVIEW_PRODUCT_MAPPING` — mapping produit Alphashot XL v2 / XL G2 à valider, aucun changement XL d'ici là), D30 (mensualités de-ch hors périmètre, aucun changement), D31 (aucun témoignage ni avis client sur `/de-ch`, `Review` et `aggregateRating` compris ; l'`aggregateRating` de `/de-ch/ia-photo-produit` est retiré dans la PR #32, `1c52eb7`). `ETAT.md` : lignes P0-A, P0-D/E, D29, D31, P0-I, P0-F ; lot F fusionné et déployé le 23/09 ; P0-H en attente de mesure ; nouvelle section « P0 du 24/09 — état ».

**Pourquoi** — Contrôle de clôture du 24/09 : aucun des points P0 du jour n'était reflété sur `main` dans `ETAT.md`, `DECISIONS.md`, `JOURNAL.md` ou `BOITE-AUX-LETTRES.md`, et `ETAT.md` présentait encore le lot F comme non déployé.

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun sur le site.

**Vérifié** (le 24/09, en lecture seule) —
- *P0-H* :
  - migration `20260924135212_p0h_gsc_pull_bornes_index_backward_20260924` présente ; la fonction déployée est identique à son texte ;
  - sortie identique à l'ancienne requête, rejouée en `SELECT` ; `EXPLAIN ANALYZE` 2,9 ms ; bornes au 21/09 sur les 6 couples ;
  - M5 #3399 en succès le 24/09 à 13:52 UTC ; la définition précédente est conservée dans la migration `20260721144023`.
- *P0-I* : les 8 fonctions (`gsc_quick_wins_json`, `gsc_tracking_weekly_json`, `gsc_candidates_vertical`, `app_gsc_top_queries`, `app_kpi_loop`, `app_page_conversion_loop`, `app_gsc_opportunities`, `app_blog_reconversion_list`) excluent encore `amazon` ; aucune ne filtre `site:`. Aucune migration P0-I.
- *P1-Q* : 0 commit touchant `content/blog` sur `main` depuis le 01/08, 0 fichier supprimé.
- *Workflow n8n `mXBXhmlutu26YMTY`* (jetable du test SERP) :
  - l'historique ne garde que « TEMP P0-B » (14:03) et « Restauration jsCode 23/09 » (14:05) ;
  - les 53 tâches générées par le code restauré sont identiques, par lecture élément par élément, à la sortie de l'exécution #3379 du 23/09 faite avec la version d'origine ;
  - le workflow est inactif et non archivé.
- *Test SERP* : exécution #3400 (5 requêtes sur 10). AI Overview sur 3, PSC hors top 10 sur 5, orbitvu.fr dans le top 10 sur 3 et devant PSC à chaque fois.
- *Worker de production* : comportement identique à `main` sur 3 691 chemins ; P0-D/E non déployé.
- *Origine de production* (`sysnext.vercel.app`) : `/de-ch` sort encore `inLanguage` `en-US` et rend les témoignages.
- *D29, XL v2* : `/de-ch/fotostudio/alphashot-xl-v2` répond 200, titre et H1 « Alphashot XL v2 », canonique auto-référente, aucune balise `robots`, absente du sitemap (`delisted: true`). Worker de `main` : 13 entrées sont passées de `alphashot-xl-v2` à `alphashot-xl-g2` entre le 17/09 et le 23/09, et 0 entrée ne vise plus `alphashot-xl-v2`. `next.config.ts` de `main` : 2 règles vers `alphashot-xl-v2`.

**Correction du 24/09 — D29 suspendue** — Laurent : l'Alphashot XL ancienne génération et l'Alphashot XL G2 coexistent. En conséquence :
- D29 passe de « en vigueur » à `SUSPENDED / REVIEW_PRODUCT_MAPPING` ;
- la PR #31 est fermée sans fusion ;
- la redirection `/de/fotostudio/alphashot-xl` → XL G2 est retirée de la PR #30 (`e112460`) ;
- les 13 redirections en production vers XL G2 et les 2 règles de `next.config.ts` vers XL v2 sont laissées en l'état, sans rollback automatique.

**Fusion du 24/09** — GO de Laurent, ordre strict, `main` fusionnée dans chaque PR suivante avant sa fusion ; seul conflit rencontré : `JOURNAL.md`, résolu en gardant toutes les entrées :
- #29 (P0-A) → `6c16108` ;
- #30 (P0-D/E) → `665f5ef` ; le Worker de production **n'est pas déployé** ;
- #32 (D31) → `c9f8aa5` ;
- #31 reste fermée sans fusion ; aucun de ses commits n'est sur `main`.
P0-I non appliqué. `ETAT.md` mis à jour dans cette PR pour refléter cet état.

**Supposé** — Le verdict `MIXED` de P0-B et les constats de marque de P0-C, tels que déclarés par Laurent : leurs livrables ne sont pas dans le dépôt.

**Non regardé** — `BOITE-AUX-LETTRES.md` n'est pas modifié : le texte de Q16 à Q18 n'a pas été transmis et n'est pas reconstitué. Les 5 autres requêtes du test SERP. Les Security Events Cloudflare (P0-F, pas d'accès).

**Suite** — Contrôle post-déploiement de #29 et #32 (`smoke.mjs`, `sysnext.vercel.app`, Chrome). Déploiement du Worker de #30 sur GO séparé de Laurent, après resynchronisation. GO P0-I. Validation du mapping produit XL v2 / XL G2 avant tout changement de redirection XL. Q16 à Q18 : absence acceptée par Laurent, aucune entrée reconstituée. Archiver le workflow jetable ; à l'avenir, dupliquer un workflow avant tout usage temporaire.

## 2026-09-24 · D31 — aucun témoignage ni avis client sur `/de-ch` · Claude de Laurent

**Chantier** : D31 (décision de Laurent du 24/09 : aucun témoignage ou avis client sur `/de-ch` ; les avis français ne sont ni traduits ni remplacés) | **PR** : branche `fix/de-ch-masquer-temoignages-2026-09` | **Commits** : `ba7b0fe`, `06f493c`, `9f6ca60` | **Non fusionnée** — fusion sur GO de Laurent

**Quoi** — Sur `/de-ch` uniquement, plus aucun des éléments suivants n'est rendu :
- `TestimonialsSection` (avis Google et leurs JSON-LD `Review`) ;
- la section témoignages de la home et son micro-témoignage ;
- le carrousel de `/ia-photo-produit` ;
- la citation des landings `packshot-*`.

Les clés correspondantes sont retirées de `messages/de-ch.json`. Patch `PSC_PATCH_DECH_TEMOIGNAGES_2026-09-24.patch` (3 commits) appliqué tel quel par `git am`, empreinte SHA-256 `170c377f…b09492c5a` vérifiée.

**Pourquoi** — Relevé sur `sysnext.vercel.app` le 24/09 : `/de-ch` rendait « What our clients say », « Reviews published on Google », 6 avis Google en français et 8 blocs JSON-LD `Review`. `TestimonialsSection` n'acceptait que `'fr' | 'en'`.

**Fichiers** — `components/testimonials/TestimonialsSection.tsx`, `components/templates/PackshotLandingTemplate.tsx`, `app/[lang]/page.tsx`, `app/[lang]/studios-photo-automatises/page.tsx`, `app/[lang]/academy/page.tsx`, `app/[lang]/ia-photo-produit/page.tsx`, `messages/de-ch.json`

**Effet attendu** — À la fusion (Vercel, ~3 min) : plus aucun texte FR ou EN de témoignage sur `/de-ch`, plus aucun bloc `Review` en de-ch. `/fr` et `/en` inchangés.

**Vérifié** —
- Tests et build : `npx vitest run` 186/186 ; `npx tsc --noEmit` 0 erreur ; `node scripts/seo/verifier-json.mjs` 183 fichiers valides ; `npx next build` vert (R1), 380 pages, **0 `MISSING_MESSAGE`**.
- *`/fr` et `/en` inchangés* : les 316 pages prérendues sont comparées au build de `main`, après neutralisation de l'identifiant de build et des empreintes des ressources `/_next/static`.
  - DOM (HTML hors charge utile RSC) identique sur **316/316**.
  - Charge utile RSC identique sur 314/316.
  - Écart sur `/fr` et `/en/studios-photo-automatises` : numérotation et ordre des références de composants client (`$L61`/`$L62`), dans un sens opposé entre `/fr` et `/en`. [Inférence] Ordre de sérialisation d'un build à l'autre, sans rapport avec le patch. Cela repose sur des schémas observés.
  - **F5 `/fr/packshot-e-commerce` : identique, DOM et charge utile RSC.**
- *48 pages `/de-ch`*, recherche de 22 fragments (titres, sources, auteurs et JSON-LD des témoignages et avis). Sur `main` : 7 pages concernées, dont 16 blocs `Review`. Après : 0 texte de témoignage, 0 bloc `Review`. Restent deux occurrences :
  - « Kundenstudie PackshotCreator 2025 » : source d'une statistique de la home, pas un témoignage ;
  - le JSON-LD `SoftwareApplication` de `/de-ch/ia-photo-produit`, qui porte `aggregateRating` (4,9, `reviewCount` 100), comme en `/fr` et `/en`. Non traité par le patch.

**Supposé** — Que les données agrégées d'avis de BlendAI (`aggregateRating`) relèvent ou non de D31 : question laissée à Laurent.

**Non regardé** — Le Preview Vercel : jeton de contournement non transmis. Le rendu dans Chrome sur `www` (R4).

**Suite** — Fusion sur GO de Laurent. Contrôle visiteur dans Chrome (traduction automatique désactivée, piège B5) sur `/de-ch`, `/de-ch/studios-photo-automatises`, `/de-ch/ia-photo-produit` et une landing de-ch. Décision de Laurent sur l'`aggregateRating` de `/de-ch/ia-photo-produit`.

**Ajout du 24/09 — `aggregateRating` retiré sur `/de-ch`** — Décision de Laurent : l'`aggregateRating` de BlendAI (4,9, `reviewCount` 100) relève aussi des avis clients (D31). Dans `app/[lang]/ia-photo-produit/page.tsx`, la propriété n'est plus émise dans le JSON-LD `SoftwareApplication` quand `lang === 'de-ch'`. En `/fr` et `/en`, même objet, mêmes clés, même ordre.
- *Vérifié* : `npx vitest run` 186/186 ; `npx tsc --noEmit` 0 erreur ; `npx next build` vert (R1), 380 pages, 0 `MISSING_MESSAGE`.
- *48 pages `/de-ch`*, HTML complet charge utile RSC comprise : 0 bloc `Review`, 0 `aggregateRating`, `AggregateRating`, `reviewCount` ou `ratingValue`, 0 texte de témoignage.
- *`/fr` et `/en`*, comparés au build de `main` : DOM identique sur 316/316. `/fr/packshot-e-commerce`, `/fr/ia-photo-produit` et `/en/ia-photo-produit` sont identiques, charge utile RSC comprise, et l'`aggregateRating` y est toujours émis.

## 2026-09-24 · P0-D/E — héritage `/de` → `/de-ch`, chaînes à un saut, doublon « -22 » · Claude de Laurent

**Chantier** : P0-D/E (Master SEO/GEO V3, hors dépôt) | **PR** : branche `fix/p0-de-ch-heritage-chaines-2026-09` | **Commit** : `c5eaa86` | **Circuit** : (a) | **Non fusionnée**, **Worker non déployé** — deux GO séparés de Laurent (D4, R5)

**Quoi** — `cloudflare-worker/src/index.js` : 17 clés ajoutées à `DE_CH_MAP` ; 2 clés ajoutées à `LEGACY_REDIRECTS` (doublon « -22 », `packshot-mannequin`) ; 1 clé retirée de `GONE_PATHS` (« -22 ») ; préfixes `/industrie/` et `/studio-photo/` : la cible `/fr<chemin>` est d'abord cherchée dans `LEGACY_REDIRECTS`, un saut au lieu de deux. Nouveau test `p0-de-ch-heritage.test.ts` (32 cas). Patch V2 appliqué tel quel par `git am`, empreinte SHA-256 `8d3017ed…894e68b` vérifiée avant application.

**Pourquoi** — Sur `main`, 17 URL `/de/*` tombent sur un hub (`/de-ch`, `/de-ch/blog`, `/de-ch/guide`, `/de-ch/branchen`, `maschinen-finder`) alors qu'un équivalent exact ou un successeur documenté existe en de-ch ; `packshot-mannequin` tombe sur `/fr` ; les chaînes `/industrie/<x>` → `/fr/industrie/<x>` → cible font deux sauts ; `/blog/…-22` répond 410 alors que `/…-22` redirige vers l'article (l. 1519).

**Fichiers** — `cloudflare-worker/src/index.js`, `cloudflare-worker/test/p0-de-ch-heritage.test.ts` (nouveau)

**Effet attendu** — Après déploiement du Worker seulement : 30 chemins changent de premier saut (60 avec la barre finale). Lisible dans la couverture GSC et les pages de destination à J+14.

**Vérifié** —
- `node --check` vert. `npx vitest run` : 11 fichiers, **218/218** ; `lot-f` 44/44, `unicite-tables` 20/20, `legacy-redirects` 31/31, `p0-de-ch-heritage` 32/32.
- *Contrôle négatif* : le nouveau test lancé sur le Worker de `main` donne 23 rouges (13 EXACT_EQUIVALENT, 5 DOCUMENTED_SUCCESSOR, 5 déterministes) et 9 verts (8 REVIEW, `/industrie/lunetterie`).
- *Simulation différentielle `main` → branche* (import des deux modules, origine interceptée) sur 3 691 chemins : toutes les chaînes du fichier commençant par `/`, plus les variantes `/industrie/<x>` et `/studio-photo/<x>` dérivées des clés `/fr/…`, avec et sans barre finale. **30 chemins** changent de premier saut : 17 `/de/*`, `packshot-mannequin`, « -22 », **10** chaînes `/industrie/*`, **1** chaîne `/studio-photo/*`. Chaînes raccourcies : destination finale identique dans les 22 cas (11 avec et sans barre finale), 2 sauts → 1.
- *REVIEW* : les 8 chemins, avec et sans barre finale, gardent premier saut et chaîne complète.
- *Cibles* : `next build` puis `next start` (build de la branche P0-A, pages cibles identiques à `main`) : 28 cibles sur 28 en 200, canonique auto-référente, aucune balise `robots`.
- `git status` avant commit : aucun fichier sous `node_modules`, aucun cache de test.

**Écarts entre la consigne et le patch (R7)** — patch appliqué sans correction, conformément à la consigne.
1. La consigne annonce 23 changements, dont 4 chaînes `/industrie/*`. La règle du patch est générique : elle raccourcit **toute** chaîne `/industrie/<x>` dont `/fr/industrie/<x>` est une clé de `LEGACY_REDIRECTS`. La simulation en relève 10, soit 30 changements au total. [Inférence] L'échantillon de 637 URL du bac à sable n'en contenait que 4. Cela repose sur des schémas observés.
2. Le patch modifie aussi le préfixe `/studio-photo/`, absent de la consigne : 1 chaîne raccourcie, `/studio-photo/360-draaitafels` → `/fr/studio-photo/selecteur-machines`, destination inchangée.
3. La consigne parle de 6 mappings REVIEW ; le patch en teste 8 (7 lignes du tableau, la dernière couvrant 2 URL). Les 8 sont inchangés.

**Supposé** — Que la production porte encore `main` au 23/09 (`29ca657`, version `05c5c47c`) : la resynchronisation reste à faire avant déploiement (D4, R5, `05-INFRA.md`). Que le comportement simulé se reproduit en production (R4, B1).

**Non regardé** — Variante `/amp` : `/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22/amp` passait en 410 via `shouldReturn410` ; elle fera 301 vers `/fr/blog/…-22/amp`, qui répond 404 sur `next start`. Même nature que le constat du lot F sur les clés retirées de `GONE_PATHS`. Les requêtes GSC citées par la consigne (« weinflaschen fotografieren », « brille fotografieren », « packshot mannequin ») : non relevées ici. Backlinks des 30 chemins. `ETAT.md` : non modifié, pour ne pas créer de conflit avec la PR P0-A ouverte le même jour.

**Suite** — Fusion sur GO de Laurent. Puis GO séparé de déploiement du Worker : resynchronisation, `wrangler deploy` depuis `main`, témoins `curl.exe` listés dans la PR, résultat à reporter ici.

**Ajout du 24/09, seconde passe (batch final P0)** — Deux changements sur la même branche, sur consigne de Laurent.
- *Variante `/amp` du « -22 »* : `"/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22/amp"` est ajoutée à `GONE_PATHS`, selon la convention des 9 entrées `/amp` déjà présentes. `/amp` et `/amp/` répondent de nouveau 410, comme sur `main`. Le « Non regardé » ci-dessus est levé.
- *D29* : `"/de/fotostudio/alphashot-xl": "/de-ch/fotostudio/alphashot-xl-g2"` est ajoutée à `DE_CH_MAP`. Ce chemin sort de REVIEW, qui compte désormais 7 chemins.
- *Vérifié* : `node --check` vert ; `npx vitest run` 220/220, dont `p0-de-ch-heritage` 34/34 (+2 cas `/amp`, +1 cas D29, −1 cas REVIEW), `lot-f` 44/44, `legacy-redirects` 31/31, `unicite-tables` 20/20. Simulation différentielle sur 5 533 chemins, dont les variantes `/amp` : 4 écarts avec la tête précédente `699872d` (les 2 variantes `/amp`, `/de/fotostudio/alphashot-xl` avec et sans barre finale) ; 31 chemins modifiés par rapport à `main` (62 avec la barre finale), aucune variante `/amp`. Cible `/de-ch/fotostudio/alphashot-xl-g2` sur `sysnext.vercel.app` : 200, canonique auto-référente, aucune balise `robots`. Worker de production : 0 écart de comportement avec `main`.

**Correction du 24/09 — D29 annulée** — Correction de Laurent : l'Alphashot XL ancienne génération (« Alphashot XL v2 ») et l'Alphashot XL G2 coexistent. La redirection `/de/fotostudio/alphashot-xl` → `/de-ch/fotostudio/alphashot-xl-g2` est retirée de `DE_CH_MAP` ; le chemin retrouve son état de `main` (301 vers `/de-ch/fotostudio/maschinen-finder`) et passe en **REVIEW_PRODUCT_MAPPING**.
- *Vérifié* :
  - `node --check` vert ; `npx vitest run` 220/220, dont `p0-de-ch-heritage` 34/34 (le cas D29 devient un cas REVIEW_PRODUCT_MAPPING), `lot-f` 44/44, `legacy-redirects` 31/31, `unicite-tables` 20/20.
  - Simulation différentielle sur 5 533 chemins : 2 écarts avec la tête précédente `c8385ed` (`/de/fotostudio/alphashot-xl` avec et sans barre finale) ; 30 chemins modifiés par rapport à `main` (60 avec la barre finale), aucun `alphashot-xl`, aucune variante `/amp`.
  - `/de-ch/fotostudio/alphashot-xl-v2` existe sur `sysnext.vercel.app` : 200, titre et H1 « Alphashot XL v2 », canonique auto-référente, aucune balise `robots`, absente du sitemap (`delisted: true`).
- *Non modifié* : les 13 entrées du Worker déjà en production qui sont passées de `alphashot-xl-v2` à `alphashot-xl-g2` entre le 17/09 et le 23/09, et les 2 redirections de `next.config.ts` vers `alphashot-xl-v2`. À instruire en REVIEW_PRODUCT_MAPPING.

## 2026-09-24 · P0-A — `WebSite.inLanguage` en `de-CH` sur `/de-ch` · Claude de Laurent

**Chantier** : P0-A (Master SEO/GEO V3, hors dépôt) | **PR** : branche `fix/de-ch-inlanguage-2026-09` | **Commit** : `3b254c3` | **Circuit** : (a) | **Non fusionnée** — fusion sur GO de Laurent

**Quoi** — Le bloc JSON-LD `WebSite` de la home déclare `inLanguage: "de-CH"` sur `/de-ch` au lieu de `en-US`. `/fr` (`fr-FR`) et `/en` (`en-US`) inchangés. Patch V2 appliqué tel quel par `git am`, empreinte SHA-256 `f75dd2bb…bcc197db4` vérifiée avant application.

**Pourquoi** — Sur `main`, `websiteSchema()` ne connaît que `'fr' | 'en'` et calcule `lang === 'fr' ? 'fr-FR' : 'en-US'` (`components/seo/SchemaOrg.tsx` l. 83) : `/de-ch` sort `en-US`, en contradiction avec `<html lang="de-ch">`.

**Fichiers** — `lib/seo/locale-schema.ts` (nouveau), `lib/seo/__tests__/locale-schema.test.ts` (nouveau), `components/seo/SchemaOrg.tsx`, `app/[lang]/page.tsx`

**Effet attendu** — Données structurées de `/de-ch` cohérentes avec la langue servie, dès le déploiement Vercel. [Inférence] Aucun effet de classement mesurable isolément ; lisible au test des résultats enrichis de Google.

**Vérifié** —
- `npx vitest run` : 11 fichiers, **189/189** (186 sur `main`, + 3 cas `locale-schema`).
- `npx tsc --noEmit` : 0 erreur.
- `npx next build` vert (R1), variables factices de la CI, **sans stub de police** : Google Fonts joignable depuis cet environnement, 14 fichiers `woff2` téléchargés. 380 pages générées.
- `next start` (port 3024, arrêté ensuite) : JSON-LD `WebSite` rendu `/fr` → `fr-FR`, `/en` → `en-US`, `/de-ch` → `de-CH`. Un seul bloc `WebSite` par home, `@id` inchangé (`/#website`), 12 blocs JSON-LD par home.
- Textes FR/EN relevés par le bac à sable sur `/de-ch`, recherchés dans le HTML prérendu : présents sur `/de-ch` et `/de-ch/studios-photo-automatises` (« What our clients say », « A selection of reviews published on Google by our clients. », « Reviews published on Google », avis Rogozyk, Altunkaya, Facon) et sur `/de-ch/questions-cles-photographie-produit` (« Answers to all your questions to make the right choice. »). Non touchés.

**Supposé** — [Inférence] Que Google accepte `de-CH` comme valeur `inLanguage` : conforme à la spécification schema.org (code IETF BCP 47), non testé dans l'outil de test des résultats enrichis.

**Non regardé** — `courseSchema` (`inLanguage: 'fr'` en dur, l. 396 de `SchemaOrg.tsx`), hors périmètre. Le relevé heuristique complet des 48 pages `/de-ch` : seules les chaînes listées dans la consigne ont été recherchées. Le Preview Vercel : jeton de contournement non transmis. `ETAT.md` : non modifié, pour ne pas créer de conflit avec la PR P0-D/E ouverte le même jour.

**Suite** — Fusion sur GO de Laurent. Après fusion : `node scripts/seo/smoke.mjs https://sysnext.vercel.app`, lecture du JSON-LD de `/de-ch` sur `sysnext.vercel.app`, puis contrôle dans Chrome sur `www`. Décision éditoriale de Sébastien sur `TestimonialsSection` (`'fr' | 'en'` seulement).

## 2026-09-23 · Chantier marque — mesures M1, M2, M6 · Claude de Laurent
**Quoi** — Relevés GSC (propriété de domaine) et Google Maps du 23/09,
en lecture seule ; modification de la fiche Google France par Laurent.
**Vérifié** — M1 : /fr indexée, canonique Google = canonique déclarée ;
/ non indexée (« Page avec redirection »), canonique /fr. La 301 du
14/07 est consolidée (H1 écartée). M2, France, P1 = 01/04-30/06,
P2 = 01/07-20/09 : « packshot creator » impressions 321 → 191, clics
90 → 43, page servie /en (position 1,2), /fr à 23,6 ; « packshotcreator »
impressions 417 → 104, clics 38 → 19, /fr position 1. Total marque
France : impressions -60 % (738 → 295), clics 128 → 62. M6 : fiche
France « PackshotCreator - Orbitvu », bouton Site Web vers la racine /
(redirigée). Fiche modifiée par Laurent le 23/09 : Site Web → /fr,
téléphone principal → 01 47 42 66 66, en attente de validation Google.
Fiche « Location du packshot creator » (Lausanne) : n'appartient pas à
Sysnext ; décision de Laurent : aucune action.
**Supposé** — [Inférence] La baisse de la marque vient d'abord d'une
baisse de la demande (recherches), que le SEO ne recrée pas ; Google
préfère /en sur la requête en deux mots (H3).
**Non regardé** — M5 (lecture du correctif C1, 14-28/10) ; anomalie
« Erreur de traitement temporaire » sur la ligne Sitemaps des deux URL.
**Suite** — Q15 ; correction du chiffrage du chantier marque dans ETAT ;
Q10 mise à jour.

## 2026-09-23 · Déploiement du Worker — lot F · Claude de Laurent

**Chantier** : C4 (lot F) | **PR** : #26, fusionnée (`29ca657`) | **Commit déployé** : `29ca657` | **Version Cloudflare** : `05c5c47c-4b60-41af-9acd-b3778be1e508`

**Quoi** — `packshot-router` déployé depuis `main` par `wrangler deploy` (wrangler 4.136.3), le 23/09/2026 à 07:41:22 UTC, sur GO de Laurent du 23/09. Le déploiement porte la PR #26 et rien d'autre. Aucune édition au dashboard (D4, R5). Ni pilote C6, ni règle WAF ou de cache.

**Pourquoi** — PR #26 : annexe K, lot C, 10 redirections `alphashot-xl-v2` → `alphashot-xl-g2`, doublon D21. La partie `next.config.ts` de la PR est en production depuis la fusion, par Vercel.

**Fichiers** — `cloudflare-worker/src/index.js` (déployé) ; `docs/seo-geo/JOURNAL.md` (cette entrée)

**Effet attendu** — Immédiat côté Worker : 14 chemins de l'annexe K et 1 du lot C qui finissaient en 404, et 4 en 410, redirigent en 301 vers une page 200 ; 4 bascules `/en` → `/fr` ; plus aucune redirection vers `alphashot-xl-v2`. Lisible dans la couverture GSC à J+14.

**Vérifié** —
- `wrangler whoami` : compte Sysnext, `a51802d1e09d29095ca7ba45d63bf0f2`.
- *Resynchronisation (05-INFRA)* : code de production lu par l'API avant déploiement, identique octet pour octet au relevé du 23/09 matin. Écart production → `main` sur les 11 tables : 38 lignes, **identiques ligne à ligne au diff de la PR #26** (`1ee8cfb` → `29ca657`) : `LEGACY_REDIRECTS` 19 ajouts et 12 cibles, `GONE_PATHS` 4 retraits, `PRODUCT_REDIRECTS` 1 cible, `LANG_SPECIFIC_REDIRECTS` 2 cibles. Hors tables : commentaires retirés par esbuild et une couche `__name22` de wrapper de bundle. Aucune règle n'existait en production sans exister dans `main`.
- Avant déploiement : version `167d7a15-c673-4cd2-a538-bd65f8e80145` à 100 %. `node --check` vert ; `npm run test:unit` : 186 tests verts.
- Après déploiement : `wrangler deployments status` donne `05c5c47c-4b60-41af-9acd-b3778be1e508` à 100 % : **versionId = activeVersionId**. Code relu par l'API : 0 écart avec `main` sur les 1 780 entrées des 11 tables. Routes relues par l'API avant et après, identiques : `www.packshot-creator.com/*`, `packshot-creator.com/*`, `*.packshot-creator.com/*`. Variables relues avant et après, identiques : `NEXTJS_ORIGIN`, `WEBFLOW_ORIGIN` ; `compatibility_date` 2024-01-01, aucun drapeau.

**Supposé** — Que le comportement simulé en test (import du module, 38 chemins) se reproduit en production : le Worker n'est pas testable par script sur `www` (R4, B1).

**Non regardé** — Contrôle `curl.exe` depuis le poste de Laurent, à faire : les 4 chemins par catégorie, le chemin de-ch et les 5 témoins obligatoires listés dans la PR #26, chaîne de requête neuve (B2).

**Suite** — `curl.exe` par Laurent, résultat à reporter ici. Révocation du jeton Cloudflare fourni pour ce seul déploiement. Rollback si besoin : redéploiement de la version `167d7a15`. Pilote C6 au cycle suivant.

## 2026-09-23 · Lot F — annexe K, lot C, `alphashot-xl-v2`, doublon D21, verticale de-ch · Claude de Laurent

**Chantier** : C4 (lot F) | **PR** : branche `fix/worker-lot-f` | **Circuit** : (a) | **Worker non déployé** — le déploiement attend un GO séparé de Laurent (D4)

**Quoi** — `cloudflare-worker/src/index.js` : `LEGACY_REDIRECTS` (19 clés ajoutées, 12 cibles corrigées), `GONE_PATHS` (4 clés retirées) ; puis, sur accord de Laurent du 23/09, 1 cible dans `PRODUCT_REDIRECTS` et 2 dans `LANG_SPECIFIC_REDIRECTS` (`alphashot-xl-v2` → `alphashot-xl-g2`). `next.config.ts` : `/de-ch/industrie/<slug>` → `/de-ch/branchen/<slug allemand>` en 301, repli sur `/de-ch/branchen`. Deux fichiers de test.

**Pourquoi** — Inventaire du 19/09 : annexe K à 1 conforme, 2 à corriger, 14 absentes, 4 en 410 ; lot C à 1 URL sans règle ; 10 entrées du Worker vers `alphashot-xl-v2` (`delisted: true`, hors sitemap et pied de page) ; doublon `GONE_PATHS` / `LEGACY_REDIRECTS` relevé par D21. Sur de-ch, `/de-ch/industrie/mode-textile` répond 307 vers `/de-ch/branchen/mode-textile`, qui répond 404 (relevé sur `sysnext.vercel.app` le 23/09).

**Fichiers** — `cloudflare-worker/src/index.js`, `next.config.ts`, `cloudflare-worker/test/lot-f.test.ts` (nouveau), `cloudflare-worker/test/unicite-tables.test.ts` (nouveau)

**Effet attendu** — Après fusion (Vercel, ~3 min) : les 16 URL `/de-ch/industrie/<slug FR ou allemand>` des 8 secteurs suisses mènent à leur page `branchen` en un saut 301 ; les autres à `/de-ch/branchen`. Après déploiement du Worker (GO séparé) : 14 chemins de l'annexe K qui finissaient en 404 et 4 chemins en 410 redirigent en 301 vers une page 200 ; 2 bascules `/en` → `/fr` sur l'annexe K et 2 sur le lot C ; les 10 redirections du Worker qui visaient la fiche `delisted` pointent vers `alphashot-xl-g2`. Lisible dans la couverture GSC à J+14.

**Vérifié** —
- *Resynchronisation (05-INFRA)* : code de `packshot-router` lu le 23/09 par l'API Cloudflare. Comparé à `main` (`1ee8cfb`) : 11 tables, 1 765 entrées de chaque côté, **0 clé ajoutée, 0 retirée, 0 valeur différente**. Diff textuel restant : commentaires retirés par esbuild et une couche `__name22` de wrapper de bundle — même nature que le constat du 20/09. Aucune règle n'existe en production sans exister dans `main`.
- *Ordre d'évaluation, `/commun/presse-details.html/3`* : ce chemin n'était pas dans `GONE_PATHS` ; son 410 venait du préfixe `/commun/` de `shouldReturn410`. `LEGACY_REDIRECTS` est consultée (l. 1595) **avant** `shouldReturn410` (l. 1967) : la clé suffit, aucune exception à la règle de préfixe n'est nécessaire. Test : `/commun/presse-details.html/3` → 301, `/commun/presse-details.html/4` → 410.
- *Simulation du Worker* (import du module, origine interceptée) sur 38 chemins, avant et après : 0 écart à l'attendu ; `/`, `/de/studio-photo/alphashot-xl`, `/industrie-defense` inchangés. Comparaison des tables avant/après : seules `LEGACY_REDIRECTS`, `GONE_PATHS` et, après l'accord du 23/09, `PRODUCT_REDIRECTS` (1 valeur) et `LANG_SPECIFIC_REDIRECTS` (2 valeurs) bougent. Plus aucune occurrence de `alphashot-xl-v2` dans le Worker.
- *Cibles* : `next build` puis `next start` (port 3021, arrêté par PID) — **30 cibles sur 30 en 200**, canonique auto-référente, aucune balise `robots`. Aucune cible absente.
- *de-ch sur le serveur local* : 8 slugs FR et 8 slugs allemands → 301 vers `/de-ch/branchen/<slug allemand>` ; `chaussures`, `defense-securite`, slug inexistant → 301 `/de-ch/branchen`. Inchangés : `/de-ch/industrie` (307 next-intl vers `/de-ch/branchen`), `/fr/industrie/mode-textile` et `/en/industrie/mode-textile` (200).
- *Unicité* : 0 doublon intra-table sur les 11 tables ; 0 clé partagée entre deux tables de redirection ; doublons `GONE_PATHS` × redirection : 60 avant, 59 après, aucun nouveau. Contrôles négatifs : les nouveaux tests échouent sur le fichier de `main`, et sur une clé injectée à la fois dans `LEGACY_REDIRECTS` et `PRODUCT_REDIRECTS` ou `GONE_PATHS`.
- `node --check` vert. `npx tsc --noEmit` vert. `npm run test:unit` : 10 fichiers, **186 tests** verts (122 avant). `npx next build` vert (R1), relancé après l'accord du 23/09. `/en/studio-photo/alphashot-xl-g2` : 200 sur `next start`, canonique auto-référente, sans balise `robots`.

**Écarts entre la consigne et le dépôt (R7)** —
1. « Les 10 entrées dont la cible est `alphashot-xl-v2` » : 7 sont dans `LEGACY_REDIRECTS` et ont été corrigées. Les 3 autres étaient dans des tables que la consigne interdisait de toucher : `PRODUCT_REDIRECTS` (`/product/photo-studio-r3`) et `LANG_SPECIFIC_REDIRECTS` (`/es/studio-photo/alphashot-xl`, `/nl/studio-photo/alphashot-xl`). Signalées, puis **corrigées sur accord de Laurent du 23/09**, cible `/en/studio-photo/alphashot-xl-g2`.
2. « Doublon `GONE_PATHS` / `LEGACY_REDIRECTS` » : la consigne et D21 en visent un (`/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026`), retiré. Le dépôt en compte **24**, et 36 autres entre `GONE_PATHS` et `PRODUCT_REDIRECTS`, `HOWTO_REDIRECTS` ou `LANG_SPECIFIC_REDIRECTS`. Les 59 restants sont recensés dans `unicite-tables.test.ts`, non retirés : côté chemin exact, l'entrée `GONE_PATHS` est morte, mais elle fait encore répondre 410 aux variantes `/amp` via `shouldReturn410`.
3. `/packshot-creator-new-photo-software-2018/` (avec barre finale) est une clé distincte qui ciblait aussi `/en` : corrigée avec la forme sans barre, sinon la bascule n'était que partielle.
4. `/de-ch/industrie/<slug allemand>` (ex. `schmuck`) : lu comme couvert par « selon `DE_CH_SECTOR_MAP` », dont les clés sont les slugs allemands. Il mène à sa propre page, comme le 307 actuel. L'appliquer au repli aurait dégradé ces 8 URL vers le hub.

**Supposé** — Que le code lu par l'API est celui de la version active (`167d7a15`) : l'identifiant de version n'a pas pu être relu, le jeton de cette session n'a pas le droit de lecture des déploiements Workers. Que le contrôle PS1/PS2 du 20/09 est conforme : déclaré par Laurent, non consigné dans le dépôt. Que les règles `redirects()` de `next.config.ts` passent avant le middleware next-intl sur Vercel comme en local.

**Non regardé** — Les backlinks des 21 sources de l'annexe K. Les variantes `/amp` des 4 clés retirées de `GONE_PATHS` : elles passent de 410 à l'origine (404). `next.config.ts` renvoie encore `/en/photo-studio/alphashot-xl` et `/en/studio-photo/alphashot-xl` vers `alphashot-xl-v2` : hors des 10 entrées du Worker, non touché. Le commentaire du bloc `images` de `next.config.ts` que `05-INFRA` prévoit de corriger « dans la prochaine PR qui touche ce fichier » : laissé, la consigne excluant les règles de cache. `/de-ch/industrie/<slug>/` avec barre finale : 308 puis 301, deux sauts, comportement Next.js commun à tout le site. Le Preview Vercel : le Worker n'y passe pas (E5), et le jeton de contournement n'est toujours pas transmis.

**Suite** — GO de Laurent pour le déploiement du Worker, puis `curl.exe` sur les témoins listés dans la PR. Pilote C6 au cycle suivant.

## 2026-09-20 · Accents du français restaurés — `fr.json`, `machines.ts`, meta `alphashot-360` · Claude de Laurent

**Chantier** : accents et champs marchands (C14) | **PR** : #23 | **Aucun déploiement**

**Quoi** — 425 chaînes réaccentuées, sans une reformulation : 265 dans les sept sections désaccentuées de `messages/fr.json` (cookies, blogPrestataire, blogComparatif, besoinsPhoto, questionsCles, packshotIndustriel, packshotAmazon), 159 valeurs `fr` de `machines.ts` (questions et réponses des `faqItems`, chaînes FR visibles), et la meta description FR d'`alphashot-360`. Aucune clé, aucun ordre, aucun prix, aucun slug, aucun `delisted` touché.

**Pourquoi** — `PSC_PLAN_SOLUTIONS_2026-09-19.md` §1.8. Sept sections de `fr.json` étaient à 0 – 4 ‰ d'accents quand les sections saines sont à 16 – 48 ‰ ; les titres et descriptions concernés partent tels quels en SERP et dans les données structurées des fiches.

**Fichiers** — `messages/fr.json`, `components/calculators/ROICalculator/lib/machines.ts`, `app/[lang]/studio-photo/[slug]/page.tsx`

**Effet attendu** — Titres et descriptions correctement accentués en SERP à J+14 ; FAQ et JSON-LD `FAQPage` des fiches machines corrigés, lisible sur les « Fiches marchand » à J+21.

**Vérifié** — Garde mécanique sur les trois fichiers : une fois les accents retirés (NFD, plus œ/Œ), le contenu est identique au caractère près à celui de `HEAD`. Aucune reformulation n'est donc possible. Ensemble des clés de `fr.json` : 1848 avant, 1848 après, identique. Taux d'accents des sept sections : cookies 0,0 → 15,5 ‰ ; blogPrestataire 0,0 → 21,3 ; blogComparatif 0,1 → 25,4 ; besoinsPhoto 0,9 → 20,5 ; questionsCles 2,0 → 20,1 ; packshotIndustriel 3,6 → 33,0 ; packshotAmazon 4,1 → 16,9. Les 22 sections hors périmètre sont inchangées. Homographes tranchés en contexte : les 64 « a » de `machines.ts` sont tous la préposition, un seul « des » était « dès », les 37 « ou » sont tous la conjonction ; `utilise`, `assure`, `capture`, `forme`, `publie`, `verrouille`, `dispense` restés sans accent comme formes verbales. `npx tsc --noEmit`, `npm run test:unit` (122 tests) et `npx next build` verts.

**Supposé** — Que les sept sections listées au §1.8 sont bien les seules à traiter dans `fr.json`, et que le seuil de 15 ‰ est le bon critère de sortie.

**Non regardé** — `de-ch.json` et `en.json`, hors périmètre. Les sections `blog` (8,3 ‰) et `blogArticle` (12,1 ‰), également sous le seuil mais non listées au §1.8. Le contrôle du Preview Vercel, à faire par Laurent dans Chrome.

**Suite** — CC3, données structurées (`priceValidUntil` glissant, `sku`).

## 2026-09-20 · Données structurées des fiches — `priceValidUntil` glissant et `sku` · Claude de Laurent

**Chantier** : données structurées des fiches | **PR** : #22, fusionnée le 20/09 à 07:20 UTC (`f529bd5`) | **Circuit** : (a) — aucun texte visible, aucun prix, aucune devise, aucune mensualité

**Quoi** — (1) `PRICE_VALID_UNTIL` n'est plus la constante `'2026-12-31'` : elle vaut le 31 décembre de l'année suivant celle du build, calculée au chargement du module. (2) Le `productSchema` porte désormais `sku`, alimenté par l'`id` de la machine dans `machines.ts`. Pas de `mpn` ni de `gtin`.

**Pourquoi** — Google signale 10 fiches marchand non valides (relevé du 19/09, Q13). `sku` est l'un des quatre champs manquants et ne dépend d'aucun fait commercial. La date de validité, elle, serait tombée le 31/12/2026 sans que rien ne le signale : 51 blocs `Product` seraient passés en avertissement le 1er janvier.

**Fichiers** — `lib/leasing.ts`, `components/seo/SchemaOrg.tsx`, `app/[lang]/studio-photo/[slug]/page.tsx`

**Constat incident, sans rapport avec ce changement** — En production, `/de-ch/studio-photo/<slug>` répond **307** vers `/de-ch/fotostudio/<slug>` : le segment de chemin est localisé sur la verticale suisse. Comportement préexistant, hors du champ de ce chantier, mais à connaître avant tout contrôle par script sur de-ch — testé sur la mauvaise URL, il conclut à tort à un écart.

**Effet attendu** — Deux des quatre champs manquants comblés sur les 51 blocs `Product` des fiches (3 locales × 17 machines). Lisible dans Search Console, rapport « Fiches marchand », à J+7 à J+14 après le merge. Les deux champs restants (`hasMerchantReturnPolicy`, `shippingDetails`) restent suspendus à la réponse de Sébastien sur Q13.

**Vérifié** — *Avant le merge* : `npx tsc --noEmit` vert. `npx next build` vert (R1). Sur le HTML prérendu du build : 51 blocs `Product`, **0 sans `sku`**, et une seule valeur de `priceValidUntil` sur l'ensemble — `2027-12-31`. `npm run test:unit` : 122 tests passés. `node scripts/seo/verifier-json.mjs` : 183 fichiers valides. Absence de champ de référence constructeur confirmée dans l'interface `Machine` de `components/calculators/ROICalculator/lib/types.ts` : `mpn` ne pouvait donc pas être renseigné sans l'inventer. AVANT/APRÈS du bloc `Offer` relevé sur deux builds réels (`bc81d9a` contre `6bbf5d3`) : `price` 445 → 445, `priceCurrency` EUR → EUR, `priceSpecification` inchangé, seul `priceValidUntil` bouge.

*Après le merge, contrôle post-déploiement du 20/09 à 07:22-07:32 UTC sur `https://sysnext.vercel.app`* : `node scripts/seo/smoke.mjs` **tout vert — 17 pages, 3 ressources**. Relevé exhaustif des **51 fiches en production** (17 machines × 3 locales) : **51/51 portent `sku` égal au slug et `priceValidUntil` = `2027-12-31`**, mensualités et devises inchangées (`CHF` sur de-ch, `EUR` ailleurs). Deux URL ont d'abord échoué sur un `curl: (28) Connection timed out` : re-testées une à une, conformes toutes les deux — c'étaient des délais réseau, pas des écarts.

**Supposé** — Que les fiches sont redéployées au moins une fois tous les douze mois. Les pages sont prérendues (SSG) : la date est figée au build. Un site non déployé pendant plus d'un an verrait la date expirer de nouveau — le risque passe de « certain au 31/12/2026 » à « conditionné à une année sans déploiement ».

**Non regardé** — `productWithRatingSchema`, qui n'alimente aucune fiche machine et n'a pas été touché. Les champs `gtin*` : hors sujet sans code fabricant. L'effet des `sku` sur le flux Merchant Center, qui n'est pas alimenté depuis ce dépôt. Le contrôle dans Chrome sur `www.packshot-creator.com`, Worker et WAF compris, reste à faire par Laurent (R4) : un script n'atteint pas le domaine de production. Le test des résultats enrichis de Google sur 3 fiches n'a pas pu être lancé — outil interactif, et le Preview répondait 302 vers le SSO Vercel faute du jeton de contournement, non transmis à ce jour.

**Suite** — Q13 pour les deux champs restants (`hasMerchantReturnPolicy`, `shippingDetails`). CC2 (accents) touche le même fichier `app/[lang]/studio-photo/[slug]/page.tsx` : rebaser CC2 sur `main` après ce merge. Relever le rapport « Fiches marchand » de Search Console à J+7 et J+14.


## 2026-09-20 · Déploiement du Worker — #16 seul, canonique des 3 landings · Claude de Laurent

**Chantier** : déploiement du Worker portant uniquement #16 | **Commit déployé** : `287caee` | **Version Cloudflare** : `167d7a15-c673-4cd2-a538-bd65f8e80145`

**Quoi** — `packshot-router` déployé depuis `main` par `wrangler deploy`, le 20/09/2026 à 06:40:14 UTC. Le déploiement porte **#16 et rien d'autre** : 3 landings `packshot-*` rendues à leur page d'offre, `alphashot-xl` pointant vers la fiche G2 sur les trois entrées (`/fr/studio-photo/`, `/studio-photo/`, `DE_CH_MAP`), 5 clés `/industrie/` ajoutées, 2 clés dupliquées retirées. Aucune édition au dashboard (D4, R5). Ni lot F, ni pilote C6, ni règle WAF ou de cache.

**Pourquoi** — `PSC_PLAN_SOLUTIONS_2026-09-19.md` §2.1, S2. La PR de notification préalable à Sébastien (#21) est fusionnée depuis 06:11 UTC ; GO explicite de Laurent reçu le 20/09.

**Fichiers** — `cloudflare-worker/src/index.js`

**Effet attendu** — Canonique des 3 landings restaurée, lisible à J+14 (GSC, inspection d'URL).

**Vérifié** — Procédure de resynchronisation de `05-INFRA` exécutée avant déploiement : le diff production ↔ `main` donne 11 lignes `+` et 8 lignes `−`, soit **exactement** le jeu de `git diff a117848^1 a117848` (#16), ligne pour ligne. Aucune règle n'existait en production sans exister dans `main` ; le reste du diff était des commentaires retirés par esbuild et une couche de wrapper de bundle. `node --check` vert sur les deux fichiers. Unicité des clés sur les 6 tables : `main` 1058 entrées, 0 doublon, contre 1055 et 2 doublons en production. `npm run test:unit` : 122 tests passés. Après déploiement, `wrangler deployments status` donne la version `167d7a15-c673-4cd2-a538-bd65f8e80145` à 100 % : **versionId = activeVersionId**. Le `modified_on` du service, lu par un second accès indépendant, est passé de `2026-07-24T05:20:47Z` à `2026-09-20T06:40:15Z`.

**Supposé** — Aucun autre écart entre la production d'avant déploiement et `main` que ceux de #16.

**Non regardé** — Contrôle post-déploiement sur URL témoins, à faire par Laurent via `curl.exe` depuis son poste (R4, D23) : le Preview Vercel ne passe pas par le Worker (piège E5) et la chaîne de requête doit être neuve (piège B2). Inclure la racine, un sous-domaine proxifié et une bascule `/de/*`.

**Suite** — PS2, puis lot F.

## 2026-09-19 · Plan de solutions — quick wins, chantiers de fond, D27-D28 · Claude de Laurent

**Chantier** : pilotage | **PR** : docs/plan-solutions-2026-09-19 | **Aucun déploiement**

**Quoi** — Dépôt du plan de solutions issu de l'audit : 20 quick wins en trois groupes, 4 chantiers de fond, décisions D27 (critère de similarité de D16 mesuré sur le brief) et D28 (C6 reclassé en hygiène, chantier « choix de page sur la marque » ouvert), question Q13 (champs marchands), élément nouveau sur Q10, deux pièges. **Notification préalable à Sébastien** : un déploiement du Worker portant uniquement #16 est prévu cette semaine ; un second cycle (lot F, puis pilote C6 de 25 URL) suivra séparément, après contrôle du premier.

**Pourquoi** — L'audit est clos (bilan v5). Le chiffrage montre que les quick wins rapportent 5 à 50 clics FR+CH par mois contre un écart de 60 à 160 pour atteindre D24 ; côté français, la marque est passée de 50-118 clics par mois (février-juin) à 16 en juillet et 5 en août.

**Fichiers** — `docs/seo-geo/{JOURNAL,ETAT,BOITE-AUX-LETTRES,DECISIONS,03-PIEGES,06-CHANTIERS}.md`

**Effet attendu** — Aucun sur le site. Sébastien est informé des déploiements avant qu'ils aient lieu.

**Vérifié** — Supabase (SELECT) ; code de production du Worker lu le 19/09 : les mappings `/fr/blog/orbitvu-vs-ortery-vs-styleshoots-2026` et `/fr/blog/optimize-team-collaboration-success-story-shotflow` → FR sont en production ; #16 ne l'est pas (`/fr/studio-photo/alphashot-xl` cible encore `alphashot-xl-v2`). Mesure d'embedding des 53 idées (0,466 à 0,720 ; workflow jetable archivé). Consolidation du cluster comparatif débloquée : 0 backlink sur 8 URL, témoin à 20 backlinks, mesure du 19/09 16h28 UTC postérieure à la ligne d'ETAT qui la disait bloquée.

**Supposé** — Clics de marque en tous pays ; la part française est à relever dans l'interface (mesure M2).

**Non regardé** — Addendum Suisse A1-A6 ; causes de l'absence de `/en` en mai 2026 sur la marque.

**Suite** — CC2 (accents `fr.json` + `machines.ts`), CC3 (données structurées), déploiement du Worker #16 (GO Laurent), mesures M1-M5 du chantier marque.

## 2026-09-19 · Chantier — substitution de page sur les requêtes commerciales · Claude de Laurent

**Chantier** : substitution de page (nouveau) | **Aucun déploiement**

**Quoi** — Ouverture d'un chantier de fond : sur 71 requêtes commerciales à plus de 100 impressions, 51 sont servies par un article (65 064 impressions) et 7 par une page d'offre (1 886). Page témoin : `/fr/packshot-e-commerce`, portée de 711 à environ 2 200 mots.

**Pourquoi** — Les landings font 640 à 734 mots ; les articles qui les devancent, 2 903 à 3 460. Le Link Score de 84 des landings est identique sur les six : il vient du pied de page. Sur « packshot e-commerce », l'article EN tient la position 2,0 à 2,8 : 1 351 impressions, 0 clic en 120 jours.

**Fichiers** — aucun à ce stade (brief CC5).

**Effet attendu** — [Inférence] 10 à 35 clics FR+CH par mois si la substitution réussit, lisible à 8-12 semaines. Critère de succès unique : la landing devance l'article EN en position pondérée sur les trois variantes à J+56 ; sinon arrêt. Cela repose sur des schémas observés.

**Vérifié** — `sf_pages` (mots, Link Score, liens entrants) et `gsc_metrics` (page servie par requête), le 19/09.

**Supposé** — Part FR+CH de 40 % sur ces requêtes (mesurée sur l'ensemble du site, pas sur elles).

**Non regardé** — Présence d'AI Overview au-delà de la liste du 17/09.

**Suite** — CC5 ; question Q14 sur l'article EN.

## 2026-09-19 · Chantier marque — mesures M3 et M4 ; valeur de départ substitution de page ; inventaire du lot F · Claude de Laurent

**Chantier** : marque (D28), substitution de page, lot F | **Aucun déploiement**

**Quoi** — (1) SERP de marque France et Suisse (DataForSEO, 7 tâches, 0,0215 $, workflow jetable archivé). (2) Chronologie de la racine dans l'historique du Worker. (3) Valeur de départ de la page témoin. (4) Inventaire de l'annexe K, du lot C et des verticales de-ch contre `main`.

**Pourquoi** — Instruire le chantier marque avant toute action (D28) ; figer la mesure de la page témoin ; préparer le lot F.

**Fichiers** — aucun.

**Effet attendu** — Aucun sur le site.

**Vérifié** — Du 01/05 au 14/07, `/` faisait une 302 selon `Accept-Language` (Googlebot → `/en`) ; 301 vers `/fr` depuis `b778a88` (14/07). « packshotcreator » : `/fr` n°1 en France. « packshot creator » : `/en` n°1 en France et en Suisse. La fiche d'établissement du pack local suisse pointe vers la racine. Landing `packshot-e-commerce` absente des trois variantes sur 28 jours ; article EN en 3,2. Annexe K : 1 conforme, 2 à corriger, 14 absentes, 4 en 410. Lot C : 1 URL sans règle, pas 3.

**Supposé** — Consolidation de la 301 en cours (tendance de `/fr` : 28,9 → 19,8 → 12,8).

**Non regardé** — M1, M2, M5, M6 ; requête « packshot creator avis » France (tâche en erreur).

**Suite** — CH1 (M1, M2), M6, lecture de C1 (14/10-28/10), CC6, CC7.

## 2026-09-19 · Nettoyage du suivi — 5 PR fusionnées, D21 à D26, 10 lignes fermées, 11 branches supprimées · Claude de Laurent

**Chantier** : transverse | **PR** : #20

**Quoi** — Fusion des cinq PR restées en brouillon depuis le 17/09. Dépôt des décisions D21 à D26 et des questions Q6, Q10 et Q12, qui étaient citées par le suivi sans exister. Réécriture d'`ETAT.md`, requalification de `06-CHANTIERS.md` (C1, C2, C3, C12, C13 clos ; C4 renommé en lot F ; C5 gelé sous D17 ; C8 fusionné avec le chantier accents ; C14 et C15 créés). Suppression de 11 branches distantes.

**Pourquoi** — Cinq PR terminées, vertes et fusionnables dormaient en brouillon, et `main` annonçait « aucun chantier ouvert ». Dix lignes de suivi étaient périmées, faites, ou sans objet depuis les arbitrages du 19/09. Six renvois pointaient vers des décisions et des questions inexistantes.

**Fichiers** — `docs/seo-geo/{DECISIONS,BOITE-AUX-LETTRES,ETAT,06-CHANTIERS,JOURNAL}.md`

**Effet attendu** — Aucun sur le site. L'état du dépôt redevient lisible par les deux Claude. Priorité 1 rendue visible : la liste du lot pilote C6, ouverte depuis le 04/09.

**Vérifié** — Relevé GitHub du 19/09 14:02 UTC : 5 PR ouvertes, toutes `MERGEABLE` / `clean`, 0 commit de retard sur `main`, CI verte (15 workflows, 5 déploiements Vercel), **toutes en brouillon**. Aucune issue dans le dépôt. 21 branches distantes : 7 de PR fusionnée non supprimées (0 d'avance), 1 de PR abandonnée, 3 sans PR entièrement dans `main`, 5 sans PR portant des commits absents de `main` (399, 372, 51, 5, 2 — toutes de Sébastien). Les 11 branches supprimées étaient toutes à 0 commit d'avance sur `main` : rien n'est perdu ; `claude/claude-mastery-skills-gqkl1j` pointait sur `fd112ce`, la base de la PR #1, le commit des skills n'y étant déjà plus. Réglage « Automatically delete head branches » **désactivé** : constaté directement, les branches des PR #15 à #19 sont restées en place après fusion. `alphashot-xl-v2` porte `delisted: true` dans `machines.ts:347`, le type documentant ce drapeau par « exclue de tout affichage/recommandation ; la page produit reste servie » — page servie en 200 mais exclue du sitemap et du pied de page, d'où la correction de `DE_CH_MAP` vers `alphashot-xl-g2` (`38345f3`), 122 tests verts. 10 autres entrées du Worker ciblent encore `alphashot-xl-v2` (6 vers `/en`, 4 vers `/fr`) : hors périmètre de #16, reportées au lot F. **Table des routes de `next build` du 19/09** : `blog/[slug]`, `industrie/[slug]` et `studio-photo/[slug]` en `●` SSG — #15 a produit son effet ; seul `academy/[slug]` reste en `ƒ`, faute de `generateStaticParams` sur sa feuille. L'hypothèse `setRequestLocale` est écartée : absent des cinq gabarits, y compris des quatre prérendus et du témoin `guide/[slug]`. Smoke test sur `sysnext.vercel.app` après #19 et #15 : 17 pages, 322 URL au sitemap, tout vert.

**Supposé** — Que les 5 branches sans PR de Sébastien relèvent d'une divergence d'historique plutôt que de travaux en attente : leurs diffs n'ont pas été lus.

**Non regardé** — Diffs des 5 branches de Sébastien. Labels des PR (champ non exposé par la voie utilisée). Le `x-vercel-cache` des trois gabarits après déploiement complet : le relevé de 14:24 montrait encore `MISS`, trois minutes après la fusion, ce qui n'est pas un signal exploitable — le cache est purgé à chaque déploiement, et c'est la table des routes qui tranche.

**Suite** — Lot accents et champs marchands (C14), liste du lot pilote C6, lot F (C4). Déploiement du Worker en porte séparée (D4). Réponse attendue : Q10.

---

## 2026-09-17 · Redirections legacy — landings `packshot-*` et anciens slugs FR · Claude de Laurent

**Chantier** : C6 | **PR** : #16 | **Aucun déploiement** — porte séparée (D4)

**Quoi** — `cloudflare-worker/src/index.js` : table `LEGACY_REDIRECTS` — 5 valeurs corrigées, 5 clés ajoutées, 2 doublons de clés préexistants retirés sans changement de comportement ; table `DE_CH_MAP` — 1 valeur corrigée (ajout du 19/09). Test unitaire sur les deux tables. `GONE_PATHS`, les routes et `robots.txt` ne sont pas touchés. **Le Worker n'est pas déployé** : le déploiement attend le GO de Laurent.

**Pourquoi** — Constat du 17/09 : trois landings commerciales sont vues par Google comme des doublons de leur URL racine legacy, parce que la racine redirigeait vers un article ou un guide au lieu de la page commerciale.

**Fichiers** — `cloudflare-worker/src/index.js`, `cloudflare-worker/test/legacy-redirects.test.ts` (nouveau), `vitest.config.ts`

**Ajout du 19/09 — `DE_CH_MAP`** — `/de/studio-photo/alphashot-xl` ciblait `/de-ch/fotostudio/alphashot-xl-v2`. Vérifié contre le code : `alphashot-xl-v2` porte `delisted: true` dans `components/calculators/ROICalculator/lib/machines.ts` (l. 347). Le commentaire du type dit « exclue de tout affichage/recommandation ; la page produit reste servie » — la cible répond donc 200, mais elle est absente d'`app/sitemap.ts` et du pied de page (`components/layout/Footer.tsx`, qui liste `alphashot-xl-g2`). La cible devient `/de-ch/fotostudio/alphashot-xl-g2`, même motif que la correction `/fr/studio-photo/alphashot-xl` de ce lot. `DE_CH_MAP` est consultée avant `LEGACY_REDIRECTS` pour tout chemin commençant par `/de`.

**Effet attendu** — Après déploiement du Worker : les trois URL racine `packshot-*` cessent d'être des doublons canoniques des landings ; les anciens slugs FR sortent des statistiques d'exploration en 200. Lisible dans la couverture GSC à J+14.

**Vérifié** — `npm run test:unit` : 8 fichiers, 120 tests verts, dont 29 nouveaux sur la table. Contrôle négatif : un doublon injecté fait bien échouer le test (« ligne 1266 puis ligne 1267 — la première est silencieusement écrasée »), fichier restauré ensuite. `npx next build` vert. Cibles contrôlées contre le code : les 6 slugs secteurs cibles sont dans `data/secteurs.ts`, les 5 ids machines cibles dans `components/calculators/ROICalculator/lib/machines.ts`, les 3 landings ont leur route dans `app/[lang]/`.

**Écart entre la consigne et le dépôt (R7)** — 17 des 22 entrées demandées à l'ajout **existaient déjà** dans le dépôt, avec la cible demandée. Seules 5 manquaient, toutes des variantes sans préfixe : `/industrie/{beautes, meubles, sports, high-tech-electromenager-informatique, simplifiez-production-de-vos-visuels-optique-lunetterie}`. Le symptôme observé en production (200 + `noindex`) n'est donc pas explicable par le dépôt : [Inférence] il pointe vers une divergence entre le Worker déployé et le dépôt, que R5 annonce comme possible. À resynchroniser avant déploiement.

Une entrée demandée **contredisait** le dépôt : `/fr/studio-photo/alphashot-xl` et `/studio-photo/alphashot-xl` ciblaient `alphashot-xl-v2`, la consigne demande `alphashot-xl-g2`. Les deux machines existent dans `machines.ts` et répondent 200 ; `alphashot-xl-v2` est absent de `app/sitemap.ts`, `alphashot-xl-g2` y figure. La consigne a été appliquée.

**Supposé** — Que les cibles répondent 200 en production, sur la foi du crawl du 17/09 ; le Worker n'est pas testable en Preview (piège E5). Que retirer la première occurrence d'une clé dupliquée ne change rien : en JavaScript c'est la dernière qui gagne, et c'est elle qui est conservée.

**Non regardé** — L'état réel de la table dans le Worker déployé (resync à faire). Les 10 autres entrées du Worker qui ciblent encore `alphashot-xl-v2` après ce lot (6 vers `/en`, 4 vers `/fr`) : même motif, hors périmètre de ce lot. `/fr/industrie/objets-art-antiquite` et `/fr/studio-photo/orbitvu-kit-mini-midi` : laissés tels quels faute d'équivalent établi. Les variantes `/en` et `/de-ch` de ces slugs. Les backlinks pointant vers les anciennes cibles.

**Suite** — Resynchroniser le Worker déployé avec le dépôt, puis déployer après GO de Laurent. Contrôle post-déploiement : crawl en mode liste des 14 URL, attendu 301 vers la cible, avec query string neuve.
## 2026-09-17 · Maillage contextuel des hubs et money pages vers le blog et les guides · Claude de Laurent

**Chantier** : maillage interne | **PR** : #18 | **Circuit** : (a) — les ancres reprennent les titres existants des contenus, lus dans leur JSON ; aucune prose nouvelle

**Quoi** — Extension du dispositif de maillage existant : `SECTOR_RESOURCES_MAP` passe de 8 à **17 hubs** secteurs, et une table `MONEY_PAGE_RESOURCES_MAP` couvre **6 money pages** (les 4 landings `packshot-*`, `/studios-photo-automatises`, `/ia-photo-produit`). Le rendu est extrait dans un composant partagé `ResourcesSection`. Aucune prose, aucune page, aucune URL créée.

**Pourquoi** — Crawl du 17/09 : Link Score du blog = 1 sur 74 pages et des guides = 1 sur 22 pages, contre 84 à 89 pour les hubs, fiches machines et money pages ; 5,8 et 6,9 liens entrants uniques en moyenne contre 165 à 188. Le blog et les guides produisent l'essentiel des clics FR et ne reçoivent presque aucun lien interne.

**Fichiers** — `data/content-maillage.ts`, `components/maillage/MaillageSections.tsx`, `components/templates/PackshotLandingTemplate.tsx`, `app/[lang]/studios-photo-automatises/page.tsx`, `app/[lang]/ia-photo-produit/page.tsx`, `app/[lang]/industrie/[slug]/page.tsx`

**Effet attendu** — **78 liens internes FR** ajoutés vers 43 contenus, dont 41 qui n'en recevaient aucun depuis un hub ou une money page. Link Score du blog et des guides attendu en hausse au prochain crawl ; effet sur les positions à 2 à 6 semaines.

**Vérifié** — `npx tsc --noEmit` vert. `npx next build` vert. `npx eslint` sur les fichiers modifiés : 0 problème (la référence sur `main` en compte 318, inchangée). Table validée **avant écriture** par un script de contrôle : existence du contenu dans chaque locale, absence des clés de `LEGACY_REDIRECTS` et de `GONE_PATHS`, absence de `NOINDEX_EN_BLOG_SLUGS`, absence des 11 URL du lot `/en/blog` en 404. Comptage des liens réellement rendus sur les 23 pages × 3 locales : **FR 78 · EN 73 · de-ch 4**, conforme à la table. Contrôle final des cibles : **86 URL distinctes, toutes en 200 et indexables**. `node scripts/seo/smoke.mjs` : 17 pages, 3 ressources, tout vert.

**Deux correctifs apportés en cours de route** : les tables sont indexées par slug FR, or (1) les slugs EN et de-ch des contenus sont différents — la résolution passe désormais par `alternates.json`, la même source que le sélecteur de langue, au lieu de supposer un slug identique ; (2) le hub `/de-ch/branchen/<slug-allemand>` passait son slug allemand au composant, qui ne trouvait donc jamais d'entrée. Sans ces deux correctifs, le bloc était vide hors FR.

**Supposé** — Que les 6 « money pages » du relevé de crawl sont bien les 4 landings `packshot-*`, `/studios-photo-automatises` et `/ia-photo-produit` : le relevé les compte sans les nommer. L'association secteur → contenus est un choix éditorial de pertinence thématique, pas une mesure.

**Non regardé** — Les fiches machines (Link Score 84, déjà irriguées). Les hubs `/en/industrie/*`, tous `noindex` : le bloc s'y affiche et pointe vers des cibles indexables, mais l'apport d'autorité y est nul. La couverture de-ch reste très mince (4 liens au total) faute de contenus traduits. L'effet sur le temps de rendu des 23 pages.

**Suite** — Recrawl Screaming Frog à J+7 pour mesurer le Link Score du blog et des guides. Étendre la couverture de-ch quand des traductions arriveront.
## 2026-09-17 · URL `/en/blog/` en 404 dans GSC — cartographie du mécanisme d'exposition · Claude de Laurent

**Chantier** : couverture / budget d'exploration | **PR** : #17

**Quoi** — Recherche de la source d'exposition des 11 URL `/en/blog/…` listées « Introuvable (404) » par GSC au 17/09, plus `/fr/solutions`, `/en/solutions/niveau-1-fondation-presentiel` et `/de-ch/industrie/mode-textile`. **Aucune des 14 n'est exposée par le code actuel.** Une seule correction appliquée, hors de ce lot de 14 : un lien de la page d'accueil vers un slug machine inexistant.

**Pourquoi** — Consigne du lot : corriger la source de l'exposition, pas le symptôme. Il fallait d'abord établir s'il y avait une source dans le code.

**Fichiers** — `app/[lang]/page.tsx` (ligne 500)

**Effet attendu** — Un lien de moins, depuis les trois pages d'accueil, vers une URL qui n'existe pas et que seul le Worker rattrape en 301. Lisible au prochain crawl.

**Vérifié** — Build local puis `next start` sur le port 3018, crawl des 322 URL du sitemap plus 12 pages de listing, collecte de tous les `<a href>` et de tous les `<link rel="alternate">`. Pour chacune des 14 URL : **absente du sitemap** (322 `<loc>`, aucune correspondance), **aucun lien interne**, **aucun hreflang**, absente de `llms.txt`. `content/blog/alternates.json` : 4 des 11 slugs y figurent, mais toujours du **côté `fr` ou `de-ch`** de la correspondance, jamais du côté `en` — ils ne peuvent donc pas produire d'URL `/en/blog/<slug>`. Pas de pagination sur `/en/blog`.

Comportement réel du Worker du dépôt, simulé en important `cloudflare-worker/src/index.js` et en interceptant le proxy d'origine : 5 URL en **410** (`GONE_PATHS`), 5 en **301** vers leur équivalent anglais réel (`LEGACY_REDIRECTS`), 4 passent à l'origine Next.js dont 3 y répondent 404 et 1 en 307. Onze des quatorze sont donc déjà traitées **dans le dépôt**.

Le crawl a par ailleurs relevé 7 liens internes vers des non-200 : 6 sont rattrapés en 301 par le Worker, 1 seul vient du code (`app/[lang]/page.tsx:500`, slug `alphatable-v2` au lieu d'`alphatable`, présent dans `machines.ts` et au sitemap). C'est la seule correction appliquée.

**Supposé** — [Inférence] Que GSC range un 410 sous « Introuvable (404) ». [Inférence] Que l'écart entre le comportement du Worker du dépôt (410 ou 301 sur 11 des 14) et le symptôme rapporté (404) s'explique par une divergence entre le Worker déployé et le dépôt — même constat que dans le lot des redirections legacy, et exactement ce que R5 annonce comme possible.

**Non regardé** — L'historique : anciens sitemaps, liens externes, soumissions manuelles. Ce sont des sources d'exposition plausibles qu'aucune lecture du dépôt ne peut confirmer. Les 6 liens internes cassés qui vivent dans `content/**` (`introText`, `content`) : c'est la prose de Sébastien, et le Worker les rattrape déjà. La date d'entrée des 14 URL dans GSC. Le 307 de `/de-ch/industrie/mode-textile` vers `/de-ch/branchen/mode-textile`, qui aboutit lui-même à un 404.

**Suite** — Resynchroniser le Worker déployé avec le dépôt, puis recontrôler ces 14 URL : la majorité devrait sortir d'elle-même. Trois points restent ouverts et sont décrits dans la PR : `/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie`, `/fr/solutions` et `/en/solutions/niveau-1-fondation-presentiel`, qui tombent en 404 sans règle Worker.
## 2026-09-17 · Prérendu des gabarits `[slug]` — retrait des `not-found.tsx` de segment · Claude de Laurent

**Chantier** : rendu / budget d'exploration | **PR** : #15

**Quoi** — Suppression des quatre `not-found.tsx` placés au niveau du segment `[slug]` de `blog`, `industrie`, `studio-photo` et `academy`. Chacun ne contenait qu'un ré-export d'une ligne du `not-found` parent. Aucun `generateStaticParams`, `dynamic`, `revalidate` ou `dynamicParams` modifié.

**Pourquoi** — Mesure du 17/09 en production : ces quatre gabarits répondent `Cache-Control: private, no-cache, no-store`, `x-vercel-cache: MISS` aux deux passages, exécution `iad1`, alors que leurs paramètres sont connus à la compilation. 87 000 requêtes CDN en MISS sur 30 jours.

**Fichiers** — `app/[lang]/blog/[slug]/not-found.tsx`, `app/[lang]/industrie/[slug]/not-found.tsx`, `app/[lang]/studio-photo/[slug]/not-found.tsx`, `app/[lang]/academy/[slug]/not-found.tsx` (supprimés)

**Effet attendu** — Prérendu et mise en cache CDN de `blog/[slug]`, `industrie/[slug]` et `studio-photo/[slug]` : baisse des MISS et du temps de réponse vu par Googlebot. Lisible dans les statistiques d'exploration GSC et le cache Vercel à J+7 à J+14.

**Vérifié** — `npx next build` vert avant et après. Tableau des routes dans la sortie du build :

| Route | Avant | Après |
|---|---|---|
| `/[lang]/blog/[slug]` | `ƒ` Dynamic | `●` SSG |
| `/[lang]/industrie/[slug]` | `ƒ` Dynamic | `●` SSG |
| `/[lang]/studio-photo/[slug]` | `ƒ` Dynamic | `●` SSG |
| `/[lang]/academy/[slug]` | `ƒ` Dynamic | `ƒ` Dynamic — inchangé |
| `/[lang]/guide/[slug]` (témoin, n'avait pas de `not-found.tsx`) | `●` SSG | `●` SSG |

Serveur `next start` local (port 3017, PID écrit dans un fichier, arrêté par ce PID) :
`/fr/industrie/vin-spiritueux` 200 · `/fr/industrie/slug-inexistant-xyz` **404** ·
`/fr/blog/generer-images-produit-ia` 200 · `/fr/studio-photo/alphashot-360` 200 ·
`/fr/blog/slug-inexistant-xyz` 404 · `/fr/studio-photo/slug-inexistant-xyz` 404 ·
`/fr/academy/elearning-autonome-niveau-1` 200 · `/fr/academy/slug-inexistant-xyz` 404.
Le corps du 404 rend bien `app/[lang]/not-found.tsx` (`<h1>Page introuvable</h1>`).
`node scripts/seo/smoke.mjs http://localhost:3017` : 17 pages, 3 ressources, tout vert, 322 URL au sitemap.
`node scripts/seo/verifier-consequences.mjs` : effet local, rien qui déborde.

**Supposé** — Que le comportement de cache observé en local (`next start`) se reproduira sur Vercel. Seul le classement `●` du build est directement vérifiable ici ; les en-têtes `x-vercel-cache` ne se contrôlent qu'en Preview ou en production.

**Non regardé** — `academy/[slug]` reste dynamique : ce gabarit n'a pas de `generateStaticParams` sur sa feuille, et la consigne du lot interdit d'en ajouter un. Le `Cache-Control` réel en Preview. Le rendu `de-ch` des trois gabarits passés en SSG. L'effet sur le temps de build.

**Suite** — Contrôler `x-vercel-cache` sur le Preview de la branche, puis sur `sysnext.vercel.app` après fusion. Ouvrir séparément la question du `generateStaticParams` d'`academy/[slug]`.
## 2026-09-17 — Diagnostic de la baisse de trafic : requalifications et socle de mots clés

**Quoi** — Mesures Cloudflare GraphQL, relevés GSC, Vercel et Cloudflare, crawl Screaming Frog,
exports de couverture, SERP DataForSEO et référentiel de mots clés France et Suisse.

**Pourquoi** — Le diagnostic reposait sur des constats non vérifiés : 504 subis, blocage de
Googlebot et des crawlers IA, pénalité de liens.

**Fichiers** — aucun fichier de code modifié dans cette PR.

**Effet attendu** — un diagnostic reposant sur des mesures, et un plan hiérarchisé.

**Vérifié**
- 504 : 213 490 réponses sur 30 jours, toutes avec la source de requête `earlyHintsCache`.
  0 réponse 504 pour les visiteurs et robots réels, chacun des 30 jours. GSC ne montre
  aucune ligne 5xx sur 90 jours.
- Googlebot AS15169 : 2 réponses 403 sur 17 210 requêtes.
- Les 34 620 réponses 403 « amazonbot » portent à 94 % l'user-agent Amzn-SearchBot, dont
  aucune IP ne figure dans la liste publiée par Amazon ; trafic concentré du 27 au 29/08.
- Amazonbot authentique (AS14618) : 0 réponse 403, action `skip`.
- PerplexityBot authentique : 9 IP sur 9 dans la liste publiée, 383 challenges managés
  sur 519 requêtes.
- Browser Integrity Check : 13 réponses 403 sur 30 jours.
- Vercel : aucun blocage, aucun 5xx, plan Pro sans limite approchée ; 4 gabarits `[slug]`
  rendus dynamiquement, 87 000 requêtes en MISS sur 30 jours, exécution `iad1`.
- Crawl du 17/09 : liens d'en-tête vers des non-200 546 → 0 ; pages 404/410 39 → 1 ;
  Link Score blog et guides = 1 contre 84 à 89 pour les pages commerciales.
- Trois landings `packshot-*` ont une canonique Google pointant vers l'URL racine legacy.
- Référentiel de mots clés France : 554 mots clés pertinents ; intention d'achat
  d'équipement = 1 620 recherches/mois ; univers packshot = 4 810 ; marque = 80.
- Suisse : 2 630 recherches/mois en français, 8 110 en allemand, CPC médian 2,20 et 3,36 $,
  pointes à 20 et 35 $.

**Supposé**
- Le trafic Amzn-SearchBot n'est pas authentique : la liste d'IP consultée date du 08/09 et
  le trafic observé du 27/08.
- L'origine des 403 sans action Cloudflare (54 728 sur 30 jours) n'est pas établie.

**Non regardé**
- Règles WAF actuelles et règle d'accès IP du 20/06.
- Demandes de devis Pipedrive sur la période.

**Suite** — PR de prérendu, de redirections legacy, de maillage, puis mesure à J+14.

---

## 2026-09-17 · C2, C3 — Requalification par la mesure 403 × ASN et 504 × client · Claude de Laurent

**Chantier** : C2, C3 | **PR** : #14

**Quoi** — Mesure en lecture seule du 18/08 au 16/09 (hôtes www, apex et fr) : 403 des crawlers par ASN, origine des 403, 504 par chemin et par client, par un workflow n8n jetable non publié (`0aTm18tNM4FhZX1P`, exécutions 3256 et 3257, archivé). Contrôle des en-têtes de production sur `sysnext.vercel.app`. Mise à jour des textes C2, C3, Amazonbot et planificateur n8n. Aucune modification de code, de Cloudflare, de Vercel ni de workflow en production.

**Pourquoi** — Mesure 403 × ASN exigée avant toute règle WAF (entrées C2 du 17/09) ; rétention GraphQL de 31 jours ; les 504 étaient présentés comme piste n°1 du recul de trafic sans identification des clients touchés.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/06-CHANTIERS.md`, `docs/seo-geo/00-BRIEFING.md`, `docs/seo-geo/05-INFRA.md`

**Effet attendu** — Aucun sur le site. Le dépôt cesse de présenter les 504 et le blocage des crawlers IA comme causes démontrées de la baisse.

**Vérifié** — GraphQL `httpRequestsAdaptiveGroups`, 210 requêtes, aucune erreur. **504** : 213 490 en 30 jours, **100 % avec le user-agent `nginx-ssl early hints`** (requêtes internes de Cloudflare liées à Early Hints) ; sur 9 pages HTML témoins, navigateurs déclarés 45 951 requêtes et 0 réponse 504 ; Googlebot, Bingbot et robots déclarés : 0 réponse 504. **Googlebot** depuis AS15169 (Google) : 17 210 requêtes, 2 réponses 403, 0 réponse 504 ; les 403 « Googlebot » viennent d'autres ASN (user-agents usurpés). **Crawlers IA** : 403 concentrés sur AS396982 (Google Cloud) ; depuis les ASN des éditeurs, 0 à 2 % de 403 — ChatGPT-User (Microsoft) 0 sur 2 002, OAI-SearchBot (Microsoft) 68 sur 3 216, ClaudeBot (Amazon) 0 sur 506, Claude-SearchBot (Amazon) 0 sur 2 429, Applebot (Apple) 0 sur 4 655 ; exception : PerplexityBot depuis AS14618 (Amazon) 383 sur 519. **Origine des 403** des crawlers IA : action de sécurité Cloudflare présente sur 99,9 % (26 exceptions sur 21 970) ; le constat « environ 20 % des 403 laissent un événement » venait de la rétention de 3 jours de `firewallEventsAdaptiveGroups`. **Amazonbot** : depuis AS14618, 0 réponse 403 sur 2 626 requêtes au libellé exact « Amazonbot » ; 34 620 réponses 403 sur l'ensemble des variantes du libellé, dont 21 656 sans action Cloudflare, ASN non ventilé. Le Worker du dépôt ne contient aucune règle 403 par user-agent. **Rendu en production** (`sysnext.vercel.app`, 17/09, deux passages par URL) : `/fr/industrie/bijoux-joaillerie`, `/fr/studio-photo/alphashot-360`, `/fr/blog/generer-images-produit-ia`, `/de-ch/branchen/schmuck` → `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`, `x-vercel-cache: MISS` aux deux passages, `x-vercel-id: cdg1::iad1::…` ; `/fr`, `/fr/cgu`, guide bijoux → `public, max-age=0, must-revalidate`, `HIT` ou `PRERENDER`. Build local : les 4 gabarits `[slug]` possédant un `not-found.tsx` de segment sont classés dynamiques ; retrait du fichier sur `industrie/[slug]` → prérendu. **Planificateur n8n** : exécutions planifiées reprises le 17/09 à 07:00 UTC ; `cf_traffic_daily` complète jusqu'au 16/09 ; données GSC disponibles jusqu'au 14/09 après la reprise du 17/09.
**Supposé** — Que l'ASN distingue le trafic authentique des user-agents usurpés (plages d'IP officielles non comparées). Que `nginx-ssl early hints` désigne les requêtes internes Early Hints (documentation Cloudflare et fil communautaire Cloudflare, signature identique : statut d'origine 0, cache miss). Que les 32 166 réponses 403 « amazonbot » hors libellé exact portent une variante de casse.
**Non regardé** — Période antérieure au 18/08 (hors rétention). Firewall et protection anti-bots Vercel. IP des PerplexityBot AS14618. ASN des 34 620 réponses 403 « amazonbot ». Date d'activation d'Early Hints. Temps de réponse vu par Googlebot (statistiques d'exploration GSC).

**Suite** — Lectures en cours (statistiques d'exploration GSC, Vercel, Cloudflare dont Early Hints et journal d'audit). Mesure complémentaire : Amazonbot par ASN, PerplexityBot par IP. Exclure le user-agent `nginx-ssl early hints` des mesures de 504. Aucune règle WAF justifiée par la mesure en l'état, hors cas PerplexityBot à qualifier. La prémisse de D8 (« tant que durent les 504 ») est à réexaminer par la voie de D11.

---

## 2026-09-17 · C2 — Cohérence du texte du chantier avec la mesure du 17/09 · Claude de Laurent

**Chantier** : C2 | **PR** : #13

**Quoi** — Mise en cohérence de la section C2 de `06-CHANTIERS.md` avec la mesure du 17/09 déposée par la PR #12. Aucune mesure nouvelle, aucun chiffre modifié.

**Pourquoi** — Deux énoncés du fichier contredisaient la mesure qu'il portait déjà : le diagnostic Super Bot Fight Mode du 16/09 en tête de section, et « Amazonbot reste bloqué » en fin de section.

**Fichiers** — `docs/seo-geo/06-CHANTIERS.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun. Lisibilité du chantier pour les deux Claude.

**Vérifié** — `06-CHANTIERS.md` : la phrase « Le blocage vient de Super Bot Fight Mode (« Definitely automated » → Managed Challenge, avec Javascript Detections actif), et le vrai correctif est une règle WAF de Skip. » devient « Diagnostic du 16/09 (Super Bot Fight Mode) infirmé par la mesure du 17/09 : les challenges viennent d'une règle managée — voir ci-dessous. » Le reste du paragraphe est conservé : AI bot policies déjà sur Allow, renvoi vers `05-INFRA.md`. En fin de section, « Amazonbot reste bloqué (décision du 04/09). » devient « Amazonbot : D8 (04/09) prévoit son blocage tant que durent les 504 ; mesuré à 31,4 % de 403 le 17/09. » Le paragraphe Amazonbot de la PR #12, redondant avec ce texte, est retiré : le chiffre de 583 réponses 200 reste consigné dans l'entrée C2 du 17/09.

**Supposé** — Rien.

**Non regardé** — `05-INFRA.md`, dont la section bots reprend le même diagnostic Super Bot Fight Mode et reste à réviser.

**Suite** — Réviser la section bots de `05-INFRA.md`. Mesure 403 × ASN, puis décision de Laurent sur la règle WAF.

---

## 2026-09-17 · C3 — Effet de `images.minimumCacheTTL` sur les 504 (mesure) · Claude de Laurent

**Chantier** : C3 | **PR** : #12

**Quoi** — Lecture de `cf_traffic_daily` (www) du 05/07 au 13/09, complétée par GraphQL Cloudflare du 14 au 16/09, et répartition horaire des 5xx sur 7 jours. Aucune modification de code, de Cloudflare ni de workflow en production.

**Pourquoi** — Correctif `images.minimumCacheTTL` = 1 an déployé le 04/09, lisible depuis le 05/09, jamais lu.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/06-CHANTIERS.md`

**Effet attendu** — Aucun (mesure).

**Vérifié** — Jours de crawl exclus : dimanches (crawl hebdomadaire `sf_crawl_snapshots`), 22/07, 22/08, 02/09 (exports `sf_*`). Avant (26-29 et 31/08, 5 j) : 12,6 % pondéré, médiane 10,9 %, min 9,0, max 16,7. Après (05-16/09 hors dimanches, 10 j) : 14,4 % pondéré, médiane 11,0 %, min 6,9, max 23,8 ; sans le 09/09 : 11,2 %, médiane 10,9 %. **Aucun effet mesurable sur le taux.** Totaux GraphQL du 10 au 13/09 identiques à `cf_traffic_daily`. Horaire (10-16/09, 5xx = 504) : taux de 4,4 à 15,3 % selon l'heure, sans heure dominante. Crawl Screaming Frog du dimanche 13/09 (00-03h UTC) : 2,0 %. Fenêtre n8n du lundi 14/09 (04-10h UTC) : 10,1 %, au niveau du socle de 9,2 %. Épisode du 14/09 17h UTC au 15/09 13h UTC : 18,2 %, sans tâche planifiée correspondante.
**Supposé** — Que `cf_traffic_daily.data_date` est un jour UTC (cohérent avec les totaux GraphQL). Que le pic du 09/09 (95 353 requêtes, 23,8 %) relève d'une charge de type crawl non enregistrée en base.
**Non regardé** — Vercel Observability (erreurs par route, durées). Répartition des 504 par chemin. Hôtes apex et fr. Données du 23/07 au 25/08, absentes de `cf_traffic_daily`.

**Suite** — Correctif `minimumCacheTTL` à conserver sans lui attribuer d'effet. Instruction C3 par Vercel Observability et par les 504 par chemin, en priorité sur l'épisode du 14-15/09. Le trou du 23/07 au 25/08 dans `cf_traffic_daily` n'est pas récupérable (rétention GraphQL de 31 jours).

---

## 2026-09-17 · C2 — Remesure des 403 des crawlers IA · Claude de Laurent

**Chantier** : C2 | **PR** : #12

**Quoi** — Remesure sur 7 jours (10-16/09) des 403 par user-agent et des actions de sécurité, par un workflow n8n jetable non publié (`Dr0FVkUVD1Pdqom7`, exécution 3249, archivé). Aucune modification Cloudflare.

**Pourquoi** — Préalable exigé par `05-INFRA.md` avant toute règle WAF : chiffres du 04/09 potentiellement périmés.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/06-CHANTIERS.md`

**Effet attendu** — Aucun (mesure).

**Vérifié** — Hôtes www, apex et fr. Taux de 403 (hors redirections 3xx) : GPTBot 77,9 % (96,3), Perplexity-User 75,7 % (95,0), PerplexityBot 74,9 % (91,9), ChatGPT-User 64,6 % (80,1), ClaudeBot 59,1 % (86,8), OAI-SearchBot 51,0 % (60,9), Claude-SearchBot 45,9 % (59,8), Googlebot 11,7 % (18,3), Amazonbot 31,4 % (43,3). Rétention `firewallEventsAdaptiveGroups` de 3 jours, donc événements lus sur les 15-16/09 seulement : challenges = règle managée `874a3e31…`, blocages = règle personnalisée `8d1512b8…`, skips = `5affda26…` + `e1bc7d73…` ; aucun événement de source Super Bot Fight Mode.
**Supposé** — Que la règle `5affda26…` est la règle 1 « Known Bots » et `8d1512b8…` la règle 3 (identifiants non rapprochés du dashboard). Que la mesure du 04/09 est comparable (méthode non documentée).
**Non regardé** — ASN des requêtes en 403 (part de user-agents usurpés). Origine des 403 sans événement de sécurité (GPTBot et Perplexity-User : environ 20 % tracés). Hôtes hors production.

**Suite** — Mesure 403 × ASN, puis règle WAF à décider par Laurent (GO). Écart à D8 constaté : Amazonbot n'est plus bloqué qu'à 31,4 %, avec 583 réponses 200 en 7 jours. Diagnostic Super Bot Fight Mode de `05-INFRA.md` à réviser : les challenges observés viennent d'une règle managée.

---

## 2026-09-17 · Jeton n8n `psc-n8n-publisher` renouvelé et testé · Claude de Laurent

**Chantier** : infrastructure n8n | **PR** : #11

**Quoi** — Le jeton régénéré le 16/09 est installé par Laurent dans le credential n8n « PSC - GitHub site (SJ) » et testé. Nettoyage d'`ETAT.md` : la demande de transmission disparaît, les deux lignes du chantier C2 fusionnent.

**Pourquoi** — L'ancien jeton avait expiré le 10/09 ; l'état du credential GitHub de n8n n'avait pas été vérifié depuis.

**Fichiers** — `docs/seo-geo/ETAT.md`, `docs/seo-geo/05-INFRA.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun effet SEO. Credential GitHub de n8n de nouveau utilisable.

**Vérifié** — `M0 · Test connexions` (`HPZw7pblQrhFQTLc`), exécution `3244` du 17/09/2026 06:45 (manuel) : 17/17 OK. Nœud `GitHub` : `executionStatus: success`, `error: null`, `full_name = Sebeth7/packshot-creator`, `permissions.push: true`, `default_branch: main`. Cloudflare, seul KO du run du 04/09, repasse OK. Aucune exécution n'avait échoué faute de ce jeton depuis le 10/09 : son unique consommateur est manuel et n'avait pas tourné depuis le 04/09.

**Supposé** — Qu'aucun workflow de publication n'existe : recherche sur les noms et descriptions des 37 workflows, sans ouverture un à un.

**Non regardé** — Portée exacte du jeton fine-grained (les `permissions` lues sont celles de l'identité appelante sur le dépôt). Date d'expiration et statut HTTP : non capturés par le nœud M0 (pas de `fullResponse`).

**Suite** — Relever la date d'expiration du jeton lors d'une prochaine intervention sur n8n (option `fullResponse` du nœud GitHub de M0). Aucune action côté Sébastien.

---

## 2026-09-17 · C4 — Worker synchronisé entre dépôt et production (constat) · Claude de Laurent

**Chantier** : C4 | **PR** : #10

**Quoi** — Constat de synchronisation entre `cloudflare-worker/src/index.js` et
le code déployé. Aucune modification du Worker, aucun déploiement. `ETAT.md` et
`06-CHANTIERS.md` nettoyés en conséquence.

**Pourquoi** — C4 était bloqué depuis le 03/09 sur un « fichier Worker de
production » promis et jamais transmis. La lecture directe du code déployé par
le connecteur Cloudflare rend ce fichier inutile : le blocage n'a plus d'objet.

**Fichiers** — `docs/seo-geo/05-INFRA.md`, `docs/seo-geo/06-CHANTIERS.md`,
`docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun effet en production : rien n'est déployé ni modifié
hors documentation. L'annexe K est débloquée.

**Vérifié** — Le 17/09/2026, par lecture seule via le connecteur Cloudflare
Developer Platform. Worker `packshot-router`, id `dba3dfacdbc14d698ecd8033e2cb79ca`,
`modified_on` au 2026-07-24T05:20:47Z. Comptes de clés identiques en production
et sur `main` pour les 11 tables :

| Table | Clés |
|---|---|
| `LEGACY_REDIRECTS` | 749 |
| `GONE_PATHS` | 648 |
| `LANG_SPECIFIC_REDIRECTS` | 139 |
| `HOWTO_REDIRECTS` | 118 |
| `DE_CH_MAP` | 33 |
| `BLOG_EN_REDIRECTS` | 33 |
| `HOST_HOME_MAP` | 19 |
| `PRODUCT_REDIRECTS` | 12 |
| `GUIDE_EN_REDIRECTS` | 4 |
| `PRODUIT_REDIRECTS` | 4 |
| `PASSTHROUGH_HOSTS` | 3 |

Comparaison intégrale des deux fichiers : **7 blocs de différence, tous
cosmétiques** — commentaires français retirés au bundling, plus les helpers
`__defProp22` / `__name22` d'un double bundling. Aucune différence de règle, de
table ni de logique. Les deux fichiers sont des bundles esbuild ; la source non
bundlée ne vit pas dans le dépôt.

**Supposé** — Que le compte Cloudflare lu est bien
`a51802d1e09d29095ca7ba45d63bf0f2` : le connecteur n'expose aucun identifiant de
compte, et `packshot-router` y est le seul Worker visible.

**Non regardé** — L'identifiant du déploiement actif, non exposé par le
connecteur. Les règles WAF. L'unicité des clés dans les tables (piège E4) : le
comptage porte sur les entrées écrites, pas sur les clés distinctes — un doublon
passerait inaperçu des deux côtés à la fois.

**Suite** — Établir la procédure de déploiement du Worker avant d'ouvrir la PR
de l'annexe K ; puis l'annexe K ; puis C6.

---

## 2026-09-17 · Allègement de la charge de Sébastien, D17, correction de date · Claude de Laurent

**Chantier** : gouvernance | **PR** : #9

**Quoi** — Q1 close : tranchée par Laurent, consignée en **D17** (C5 après C1 à
C4 et C6). Q3 close : les quatre écarts sont corrigés directement. Q2 passe en
régime tacite au 24/09. Les dates de la PR #8 sont ramenées du 18/09 au 17/09.

**Pourquoi** — Sébastien est surchargé et la PR #8 lui laissait trois réponses à
fournir ; il n'en reste aucune. La PR #8 datait ses ajouts du 18/09 sur la foi
de son prompt, alors que la date réelle est le 17/09.

**Fichiers** — `docs/seo-geo/BOITE-AUX-LETTRES.md`,
`docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`,
`docs/seo-geo/06-CHANTIERS.md`, `docs/seo-geo/README.md`, `CLAUDE.md`

**Effet attendu** — Aucun effet SEO : documentation seule. Zéro action requise
côté Sébastien, hors objection éventuelle sur Q2 avant le 24/09.

**Vérifié** — Les quatre écarts de Q3, corrigés ligne à ligne :

| Écart | Avant | Après |
|---|---|---|
| `06-CHANTIERS.md` C1, ligne 17 | « Livrée, poussée, **non mergée depuis le 04/09/2026** » | « Mergée le 16/09/2026 (PR #3), en production — mesure en attente » |
| `ETAT.md`, « Balle chez Sébastien » | 2 lignes d'accès Vercel (équipe, jeton de contournement) | retirées — faites, section « Accès de Laurent » du même fichier |
| `CLAUDE.md` ligne 18, `README.md` ligne 60 | « sept règles dures » | « huit règles dures » — R1 à R8, `CLAUDE.md` lignes 23 à 78 |
| `README.md` ligne 7 | « rachetée en janvier 2026 » | « rachetée fin 2025 » |

Dates : les cinq titres datés du 18/09 par la PR #8 (Q1, Q2, Q3, D15, D16) plus
l'en-tête et les lignes d'`ETAT.md` et l'entrée de journal correspondante sont
au 17/09. Aucune autre date du dépôt n'est touchée. D1 à D14 ne sont pas
modifiées, D9 non plus : D17 ne change que le rang de C5 dans l'ordre d'attaque.

**Supposé** — La date de cession de la société, « fin 2025 » selon Laurent :
fait externe, non vérifiable dans le dépôt.

**Non regardé** — Les fichiers de cadre non cités : `00-BRIEFING.md`,
`01-RAYON-ACTION.md`, `02-PROCEDURE.md`, `03-PIEGES.md`, `04-SURFACES-SEO.md`,
`05-INFRA.md`, `07-VERIFICATION.md`.

**Suite** — Réponse courte de Laurent au mail de Sébastien du 16/09 ; mesures C2
et C3 côté données.

---

## 2026-09-17 · Cadrage du pilotage SEO/GEO — questions Q1-Q3, décisions D15-D16 · Claude de Laurent

**Chantier** : gouvernance | **PR** : #8

**Quoi** — Dépôt de Q1 (priorité de C5), Q2 (production et validation du
contenu) et Q3 (écarts de documentation) dans la boîte aux lettres. D16 en
vigueur (amende D5), D15 proposée, en attente de confirmation de Sébastien.

**Pourquoi** — Cadrage de Laurent du 17/09, après le transfert du pilotage
SEO/GEO annoncé par le mail de Sébastien du 16/09.

**Fichiers** — `docs/seo-geo/BOITE-AUX-LETTRES.md`,
`docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun effet SEO : documentation seule. Réponses de Sébastien
attendues sous quelques jours.

**Vérifié** — Numérotation libre avant dépôt : `BOITE-AUX-LETTRES.md` ne
contenait aucune question (« *(aucune)* », ligne 70) et `DECISIONS.md` s'arrêtait
à D14 (ligne 28). Les écarts de Q3 constatés dans les fichiers sur `main` à la
date du dépôt :

| Écart | Où |
|---|---|
| C1 « non mergée depuis le 04/09/2026 » | `06-CHANTIERS.md` ligne 17, contre `JOURNAL.md` (PR #3, 16/09) et `ETAT.md` ligne 17 |
| Accès Vercel demandés alors que faits | `ETAT.md` lignes 27 et 28, contre les lignes 63 et 64 du même fichier |
| « sept règles dures » pour huit règles | `CLAUDE.md` ligne 18 et `README.md` ligne 60, contre `CLAUDE.md` lignes 23 à 78 (R1 à R8) |

**Supposé** — La date de cession de la société (décembre 2025, selon Laurent,
contre « janvier 2026 » au `README.md` ligne 7) : fait externe, non vérifiable
dans le dépôt.

**Non regardé** — `00-BRIEFING.md`, `02-PROCEDURE.md`, `04-SURFACES-SEO.md`,
`07-VERIFICATION.md`.

**Suite** — Réponse de Laurent au mail de Sébastien du 16/09 ; mesures C2 et C3
côté données.

---

## 2026-09-16 · Audit des accès de Laurent, GitHub et Vercel · Claude de Sébastien

**Chantier** : gouvernance | **PR** : #7

**Quoi** — Contrôle du périmètre réel des accès de Laurent, sur les deux
systèmes. Décision **D14** consignée.

**GitHub — rien à corriger.** `Sebeth7` est un compte personnel : l'accès
collaborateur y est strictement par dépôt, sans appartenance globale qui
pourrait fuir. Sur les 9 dépôts, `lwainberg` n'a que `packshot-creator`, en
écriture. Aucune invitation en attente.

**Vercel — exposition réelle, assumée.** L'équipe `sebs-projects-ca1e93a7`
héberge 8 projets et le rôle `Member` porte sur tous. Le cloisonnement par
projet est réservé au plan Enterprise. Trois sorties existaient — passer en
`Viewer`, migrer `sysnext` dans une équipe dédiée, ou retirer l'accès —
aucune retenue. Arbitrage de Sébastien, consigné en D14.

**Pourquoi** — Question posée par Sébastien sur GitHub. La réponse y était
nette, mais la même préoccupation valait sur Vercel sans avoir été posée. Un
périmètre d'accès qu'on croit cloisonné et qui ne l'est pas vaut mieux su.

**Vérifié** — Collaborateurs et invitations des 9 dépôts via l'API GitHub. Liste
des projets de l'équipe Vercel et rôles disponibles, au dashboard.

**Non regardé** — Si le rôle `Viewer` donne accès à Observability sur le plan
Pro. Sans objet tant que D14 tient.

---

## 2026-09-16 · Dénombrement des pièges corrigé · Claude de Sébastien

**Chantier** : gouvernance | **PR** : #6

**Quoi** — Le `README.md` annonçait « 26 pièges ». Il y en a **32**. Corrigé, et
le décompte est désormais posé dans l'en-tête de `03-PIEGES.md` avec les sept
familles, pour qu'un écart se voie.

**Pourquoi** — Chiffre écrit de mémoire, jamais compté. Repéré en rédigeant le
mail à Laurent, qui annonçait encore un troisième chiffre. Un document qui donne
un nombre faux sur lui-même entame la confiance dans les autres nombres qu'il
donne — et celui-ci en donne beaucoup.

**Vérifié** — `grep -cE "^### [A-G][0-9]+ —"` sur `03-PIEGES.md` : 32.
Répartition : A1-A5, B1-B5, C1-C5, D1-D3, E1-E6, F1-F5, G1-G3.

**Non regardé** — Les autres chiffres de la documentation n'ont pas été
re-comptés un à un.

---

## 2026-09-16 · Accès de Laurent vérifiés — deux prérequis n'en étaient pas · Claude de Sébastien

**Chantier** : gouvernance | **PR** : #5

**Quoi** — Contrôle au dashboard des accès listés comme prérequis au démarrage
de Laurent. Deux des trois étaient déjà satisfaits.

| Prérequis annoncé | État réel |
|---|---|
| Ajouter `lwainberg` à l'équipe Vercel | **Déjà membre** — `laurent.wainberg@sysnext.com`, rôle Member, 2FA active |
| Créer le jeton de contournement des Preview | **Créé** le 16/09 |
| Transmettre le jeton à Laurent | Reste à faire, canal privé |

**Pourquoi** — J'avais inscrit « ajouter `lwainberg` à l'équipe Vercel » sans
l'avoir vérifié. C'est la règle R7 retournée contre moi : une affirmation se
vérifie contre le réel, y compris quand c'est moi qui l'écris. Un `ETAT.md` qui
demande un geste déjà fait perd sa valeur de source de vérité.

**Vérifié** — Page Members de l'équipe Vercel, page Deployment Protection,
collaborateurs du dépôt GitHub.

**Non regardé** — Ce que le rôle « Member » de Vercel autorise exactement en
matière d'Observability sur le plan Pro. À confirmer avec Laurent quand il
ouvrira le chantier 504.

---

## 2026-09-16 · Clôture de C1 et piège de la traduction Chrome · Claude de Sébastien

**Chantier** : C1 | **PR** : #4

**Quoi** — Trois suites du déploiement de C1. `/fr/outil-financement` passe
d'« écart attendu » à **contrôle ferme** dans `smoke.mjs` : le `noindex` étant
en production, une page redevenue indexable serait désormais une régression.
Nouveau piège **B5** sur la traduction automatique de Chrome. `ETAT.md` clôturé.

**Pourquoi** — Une attente qu'on ne referme pas devient un contrôle qui ne
contrôle plus rien. Et le piège B5 a coûté un faux diagnostic dans l'heure : il
en coûtera d'autres à qui fera une recette `de-ch` sans le savoir.

**Vérifié** — Smoke test post-déploiement, 17 pages, 3 ressources, 0 écart.
HTML serveur de `/de-ch/branchen/schmuck` : 314 Ko, zéro marqueur français,
barre de traduction Chrome confirmée par `find`.

**Non regardé** — Le rendu mobile de la nouvelle colonne de footer. Les
redirections du Worker, qui ne sont couvertes par aucun de ces contrôles.

---

## 2026-09-16 · Correctifs de l'audit du 03/09 — sélecteur de langue, rich results, footer · Claude de Sébastien

**Chantier** : C1 | **PR** : #3 | **Commit** : `0e8949f`, livré le 04/09, mergé le 16/09

**Quoi** — Mise en production des correctifs de l'audit SEO du 03/09, livrés en
branche le 04/09 et restés douze jours sans merge.

● **Sélecteur de langue**, article par article via `alternates.json` : une ancre
  DE-CH ne pointe plus jamais vers `/en`, et aucune ancre ne pointe vers une page
  `/en` en `noindex` — repli sur le hub EN indexable
● `resolveNavHref` réécrit les 8 secteurs traduits en slug allemand
● Couverture `de-ch` blog et guides dérivée d'`alternates.json`, ce qui répare
  les « articles liés » en DE
● `besoins-photographie-produit` et `PackshotLandingTemplate` passés en `NavLink`
  — c'étaient les `Link` bruts à l'origine des chaînes 307→404 sur les secteurs
  DE-CH et du 404 sur `/de-ch/academy`
● Messages blog `de-ch` et listing des guides en allemand, au lieu de copies FR
● `price` au niveau `Offer` sur 42 fiches — mensualité de leasing, décision D7
● E-Comm Studio+ à 130 000 € HT dans les deux catalogues
● Product isolé retiré de la page d'accueil
● Footer : colonne « Nos studios », 13 fiches machines plus le sélecteur
● `/fr/outil-financement` en `noindex,follow` et hors sitemap

**Pourquoi** — L'audit du 03/09 identifie le sélecteur de langue comme **cause
structurelle n°1** du recul : il déversait le Link Score sur des pages `/en` en
`noindex`. 20 pages `/en` à 99-100 contre 86 pour `/fr`, et des fiches machines
à 5-30. Trafic organique : 1 857 clics/mois en janvier, 524 en août.

**Fichiers** — 16 : `i18n/deChCoverage.ts`, `components/seo/SchemaOrg.tsx`,
`app/sitemap.ts`, `components/layout/{Footer,NavLink}.tsx`,
`components/blog/RelatedArticles.tsx`,
`components/templates/PackshotLandingTemplate.tsx`, `app/[lang]/page.tsx`,
`app/[lang]/besoins-photographie-produit/page.tsx`, `app/[lang]/guide/page.tsx`,
`app/[lang]/outil-financement/layout.tsx`, les 2 catalogues de machines, et
`messages/{fr,en,de-ch}.json`.

**Effet attendu** — Link Score `/fr` supérieur à `/en` au prochain crawl
Screaming Frog. Position sur « packshot creator » : `/fr` à 28,9 contre `/en` à
1,9 aujourd'hui, à mesurer sur 4 à 6 semaines. Retour des rich results Product
avec un `Offer` valide. Fin des 404 sur les secteurs DE-CH.

**Vérifié** — `tsc` vert, 183 JSON valides, merge de `main` sans conflit, CI de
la PR vert avant merge. 23 URL avaient été contrôlées en local à la livraison du
04/09. Smoke test sur l'origine après déploiement.

**Supposé** — Que les 23 URL contrôlées le 04/09 couvrent les cas de bord du
sélecteur. Le diff n'a pas été relu ligne à ligne dans cette session.

**Non regardé** — Le rendu visuel de la nouvelle colonne de footer sur mobile.
L'effet réel sur le Link Score, qui dépend du prochain crawl de Laurent.

**Résultat du contrôle post-déploiement, 16/09** — `smoke.mjs` sur l'origine de
production, les quatre signaux attendus sont là :

| Signal | Avant | Après |
|---|---|---|
| `/fr/outil-financement` | `index` | **`noindex`** |
| Sitemap | 323 URL | **322 URL** |
| JSON-LD page d'accueil | 26 blocs | **24 blocs** (Product isolé retiré) |
| Écarts attendus | 1 | **0** |

17 pages témoins vertes sur les trois locales. Contrôle visuel de
`/de-ch/branchen/schmuck` en production : rendu allemand correct — voir le piège
B5, la traduction automatique de Chrome a d'abord fait croire à une dégradation
vers le français.

**Suite** — Laurent doit lancer le contrôle post-déploiement L.3 : recrawl
Screaming Frog (liens d'en-tête non-200 ramenés à 0, Link Score `/fr` > `/en`)
et inspection d'URL sur les 17 URL de l'annexe L.1. C'est son test, il l'attend
depuis le 04/09.

---

## 2026-09-16 · Vérification au dashboard — le diagnostic bots IA était faux · Claude de Sébastien

**Chantier** : C2 | **PR** : #2

**Quoi** — Contrôle de la configuration Cloudflare et GitHub avant de prescrire
quoi que ce soit à Laurent. Deux corrections.

**① Le correctif « allowlist des 7 bots IA, 10 minutes » ne s'applique pas.**
Les AI bot policies sont **déjà toutes sur Allow** (Search, Agent, Training),
AI Labyrinth désactivé. Le blocage vient de Super Bot Fight Mode — « Definitely
automated traffic » → Managed Challenge, avec Javascript Detections actif : un
crawler IA n'exécute pas de JS, donc il est classé automated et reçoit un
challenge insoluble. La règle WAF n°1 ne fait un Skip que sur `Known Bots`, la
liste vérifiée par IP de Cloudflare, où les crawlers IA ne figurent pas tous.
Le vrai correctif est une règle WAF de Skip, sur le modèle de la règle n°4
« Skip SBFM videos R2 ».

**② Le jeton `psc-n8n-publisher` est bien expiré** — confirmé au dashboard
GitHub, dernier usage il y a moins de trois semaines. Le pipeline n8n de Laurent
est à l'arrêt. Quatre autres jetons (Jade) n'ont aucune date d'expiration.

**Pourquoi** — Règle R7 : une instruction humaine se vérifie contre le réel.
Laurent a écrit cette prescription sans accès au dashboard. Envoyer son Claude
ouvrir une allowlist déjà ouverte lui aurait fait perdre une session.

**Vérifié** — Au dashboard, le 16/09 : AI bot policies (3 sur Allow), AI
Labyrinth off, Bot Preference Sync off, Super Bot Fight Mode (Definitely
automated = Managed Challenge, JS Detections on, Static resource protection off,
Verified bots on), les 4 règles WAF personnalisées avec leur ordre et leur état,
et l'expiration du jeton GitHub.

**Supposé** — Que les taux de blocage mesurés par Laurent le 04/09 valent
encore. Les AI bot policies étant aujourd'hui permissives, elles ont pu changer
depuis.

**Non regardé** — Les analytics de bots de Cloudflare sur les 7 derniers jours,
qui trancheraient. C'est le premier geste du chantier C2 : remesurer.

**Suite** — Aucune règle WAF n'a été modifiée. C'est une modification de règle
WAF qui a cassé toutes les vidéos produit le 23/07 : ce geste demande une mesure
fraîche et une main humaine.

---

## 2026-09-16 · Reprise du mandat — de la permission à la conséquence · Claude de Sébastien

**Chantier** : gouvernance | **PR** : #2

**Quoi** — Le cadre passe d'un modèle de permissions à un modèle de
conséquences. `01-PERIMETRE.md` (zones verte, orange, rouge) devient
`01-RAYON-ACTION.md` : une carte des dépendances. Le contrôle
`garde-perimetre`, qui bloquait des fichiers, devient `garde-consequences`, qui
affiche ce qui dépend de ce qui est touché et exige que la PR le déclare.

**Pourquoi** — Correction de Sébastien : « Laurent est l'ancien propriétaire de
la société, c'est une personne de confiance. Le seul risque qu'il faut ôter est
celui d'une dégradation de l'existant par des actions dont les pleines
conséquences n'auraient pas été prises en compte. Pour le reste il a quartier
libre. »

La première version était calibrée sur un prestataire extérieur inconnu et
interdisait des fichiers qui sont, en pratique, du cœur du SEO :
`i18n/routing.ts` porte l'architecture des URL, `middleware.ts` le routage de
langue, `next.config.ts` le bloc `images` qui est la piste n°1 des 504. Les
fermer revenait à interdire le diagnostic en même temps que le risque.

**Fichiers** — `docs/seo-geo/01-RAYON-ACTION.md` (remplace `01-PERIMETRE.md`),
`scripts/seo/verifier-consequences.mjs` (remplace `verifier-perimetre.mjs`),
`.github/workflows/garde-consequences.yml`, `.github/pull_request_template.md`,
`.github/CODEOWNERS`, `CLAUDE.md` (règle R8), et les 8 documents qui s'y
référaient.

**Effet attendu** — Laurent peut instruire les 504 et l'architecture d'URL, qui
étaient fermés par erreur. Le seul point de passage est la déclaration des
conséquences, qui est justement ce que Sébastien demande.

**Vérifié** — `garde-consequences` testé sur trois scénarios : diff local
(passe sans rien exiger), rayon large sans déclaration (bloque en affichant la
carte), rayon large déclaré (passe). Plus aucune référence aux zones dans la
documentation, hors l'historique de `DECISIONS.md` qui doit la garder.

**Supposé** — Que la section « Rayon d'action » sera remplie de bonne foi. Le
contrôle vérifie qu'elle existe et qu'elle a de la substance, pas qu'elle est
juste. C'est assumé : le but est de faire poser la question, pas de noter la
réponse.

**Non regardé** — L'avis de Laurent sur ce cadre, toujours pas sollicité.

**Suite** — D13 consigne l'arbitrage. D12 est réécrite dans ses termes.

---

## 2026-09-16 · Mise en place de la gouvernance SEO/GEO · Claude de Sébastien

**Chantier** : gouvernance | **PR** : à ouvrir | **Commit** : branche `docs/gouvernance-seo-geo`

**Quoi** — Création du cadre permettant à Laurent et à son Claude de conduire le
SEO/GEO en autonomie : `CLAUDE.md` à la racine, huit documents dans
`docs/seo-geo/`, quatre fichiers de passerelle vivants, trois workflows
d'intégration continue, un gabarit de pull request, un script de contrôle de
production.

**Pourquoi** — `main` n'avait pas bougé depuis le 04/09/2026, soit douze jours,
alors que le correctif de la cause structurelle n°1 attendait en branche. Le
goulot n'était ni la compétence ni les idées, mais la disponibilité de
Sébastien pour relire et merger. Le trafic organique est passé de 1 857 à
524 clics par mois entre janvier et août, soit -71,8 %.

**Fichiers** — `CLAUDE.md`, `docs/seo-geo/**` (13 fichiers),
`.github/workflows/**` (3), `.github/pull_request_template.md`,
`.github/CODEOWNERS`, `scripts/seo/smoke.mjs`, `playwright.config.ts`

**Effet attendu** — Laurent peut livrer sans attendre Sébastien sur la zone
verte. Les régressions mécaniques sont interceptées avant la production. Les
deux Claude restent synchronisés sans échange de mails.

**Vérifié** — Périmètre technique établi par lecture directe du dépôt et de
l'API GitHub : `origin/main` figé à `ff5658b` depuis le 04/09 · branche
`feat/audit-laurent-0309` poussée et non mergée · `lwainberg` dispose du droit
d'écriture · le ruleset `protect-main` ne bloque que la suppression et le
force-push, sans exiger de PR ni de contrôle · aucun workflow d'intégration
continue n'existait · aucun `CLAUDE.md` n'existait · 26 des 30 documents suivis
à la racine datent de janvier à mars 2026 · Vercel déploie automatiquement, en
Production sur `main` et en Preview sur branche · `lib/supabase.ts` lève au
chargement du module sans `NEXT_PUBLIC_SUPABASE_URL`, donc le build échoue sans
variables d'environnement · `lib/seo-config.ts` est importé par sept fichiers ·
aucun `loading.tsx` n'existe dans `app/` · `alternates.json` contient 61 entrées
pour le blog et 22 pour les guides.

**Supposé** — Le jeton `psc-n8n-publisher` a expiré le 10/09 (date issue de
l'historique projet, non vérifiable via l'API avec les droits actuels) · la
production du Worker diverge encore du dépôt (dernier constat du 03/09) · les
taux de blocage des bots IA sont ceux mesurés par Laurent le 04/09 · les taux de
504 proviennent de `cf_traffic_daily`, base à laquelle cette session n'a pas
accès.

**Non regardé** — L'état réel de la production ce jour (aucun test en ligne
n'a été fait) · le contenu détaillé de la branche `feat/audit-laurent-0309`,
non relu ligne à ligne · la configuration Cloudflare actuelle, WAF, bots et
Worker déployé · la base Supabase de Laurent · le comportement réel des trois
workflows d'intégration continue, qui ne peuvent s'exécuter qu'une fois la
première pull request ouverte.

**Suite** — Le document `06-CHANTIERS.md` liste treize chantiers, dont trois en
P0.

---

### Complément du 16/09 — le cadre a été testé sur lui-même

La PR #2 a servi de premier passage. **Les trois workflows sont verts** :
garde-périmètre 8 s, garde-journal 7 s, contrôles de PR 1 min 48 s — `npm ci`,
`tsc`, intégrité des 186 JSON, lint et `next build` complet avec variables
d'environnement factices.

Deux protections ont été découvertes en écrivant, et closes :

**1. Cloudflare bloque les scripts par empreinte TLS.** Sur
`www.packshot-creator.com`, 17 pages HTML sur 17 répondent 403 malgré un
user-agent Chrome complet ; seuls les fichiers statiques passent, ce qui donne
l'illusion que le site répond. La cible de contrôle automatisé est donc
`https://sysnext.vercel.app`, origine du déploiement de production — même HTML,
sans l'étage Cloudflare.

**2. Les Preview Vercel sont protégés par SSO.** 20 requêtes sur 20 redirigées
vers `vercel.com/sso-api`. Sans jeton de contournement, la porte « Preview
contrôlée » de la procédure ne peut pas être franchie. Le smoke test accepte
désormais `VERCEL_AUTOMATION_BYPASS_SECRET` et reconnaît les deux protections
au lieu de les signaler comme des pannes.

Trois gestes deviennent des prérequis à l'autonomie de Laurent, inscrits dans
`ETAT.md` : créer le jeton de contournement Vercel, ajouter `lwainberg` à
l'équipe Vercel, créer le libellé `zone-rouge-autorisee`.

**Écart réel remonté par le premier contrôle** : `/fr/outil-financement` n'est
pas en `noindex` en production — le correctif attend dans
`feat/audit-laurent-0309` (chantier C1). Marqué comme écart attendu dans le
script, à repasser en contrôle ferme au merge de C1.
