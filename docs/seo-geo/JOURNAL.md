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

## 2026-10-10 · #128 fusionnée (`f3ca6f9`) : pop-in active sur la landing Mode en production ; contrôle passif de `sysnext.vercel.app` · Claude de Laurent

**Chantier** : pop-in d'engagement, D56 | **PR** : #128 (fusionnée), documentation : #126 (brouillon) | **Commit** : fusion `f3ca6f9`

**Quoi** — #128 sortie du brouillon et fusionnée par commit de fusion le 10/10 à 09:58:08 UTC (`f3ca6f9`, parents `0bd8d60` et `6677eeb`), sur le GO de Laurent (D56). **Début de l'activation de la pop-in sur `/fr/packshot-mode` pour l'interprétation des conversions : 10/10, 09:58:08 UTC (fusion) ; production servie à partir de 09:59:36 UTC (déploiement).**

**Pourquoi** — D56 ; CI 4/4 verte sur `6677eeb` (build terminé à 09:57:39 UTC).

**Fichiers** — Aucun fichier du site dans cette entrée ; `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md` (ligne `main`, ligne de mesure Mode, #128 en G, contrôle `www` en C).

**Effet attendu** — Pop-in possible sur `/fr/packshot-mode` (desktop FR, 60 s, 70 %, sortie haute, une fois par session).

**Vérifié** — Statut Vercel de `f3ca6f9` : « success » à 09:59:36 UTC (déploiement `3fjoX2wR93LyrFmcgxPrExkjJjUG`). `sysnext.vercel.app` (lecture `curl`, 09:58 puis 10:00 UTC) : avant le déploiement, le code des règles servi portait le motif de gel « Mode (D39) » ; après, il ne le porte plus, et porte toujours « Accueil, mesure M5 (D44) », « F5 (D37) », « Hub mode-textile, mesure Mode » et les exclusions (catalogue, pages légales, Academy) ; composant de la pop-in référencé dans le rendu de `/fr/packshot-mode` (200) ; `smoke.mjs` : vert, 17 pages.

**Supposé** — Aucun.

**Non regardé** — Apparition effective dans un navigateur sur la production (`www`, R4 ; test automatisé contre la production refusé plus tôt par le mode automatique). GA4.

**Suite** — Contrôle Chrome sur `www` : `/fr/packshot-mode` (apparition après 60 s, 70 % et sortie haute) et `/fr/industrie/mode-textile` (aucune pop-in) ; lecture de la mesure Mode à J+28 (29/10) et J+56 (26/11) avec cet événement.

---

## 2026-10-10 · Pop-in d'engagement active sur la landing Mode `/fr/packshot-mode` (D56) · Claude de Laurent

**Chantier** : pop-in d'engagement (suite de #122) | **PR** : voir l'historique de `feat/popin-mode-eligible` | **Commit** : voir PR

**Quoi** — `/fr/packshot-mode` retirée de `ROUTES_GELEES` (`lib/engagement/regles.ts`) : la landing Mode devient éligible à la pop-in, avec les mêmes déclencheurs (desktop dès 1 024 px, 60 s cumulées, 70 % de lecture, sortie par le haut, une apparition par session). `/fr`, `/fr/packshot-e-commerce` et `/fr/industrie/mode-textile` restent gelées ; exclusions inchangées.

**Pourquoi** — Décision de Laurent du 10/10 (D56) : « Cette landing est publiée. Je souhaite qu'elle bénéficie du dispositif de conversion déjà en production. » Exception propre à la pop-in.

**Fichiers** — `lib/engagement/regles.ts` (une ligne retirée, commentaire), `lib/engagement/__tests__/popin-engagement.test.ts`, `e2e/popin-engagement.spec.ts`, `docs/seo-geo/DECISIONS.md` (D56), `docs/seo-geo/ETAT.md` (ligne de mesure Mode). Landing Mode non modifiée : ni texte, ni visuel, ni CTA, ni métadonnée, ni composant.

**Effet attendu** — À la fusion (production en environ 3 minutes) : la pop-in peut s'ouvrir sur `/fr/packshot-mode`. Fenêtre de mesure Mode (D39) inchangée, **J+28 le 29/10, J+56 le 26/11** : l'heure de fusion de cette PR marque le début de l'activation, à prendre en compte dans l'interprétation des conversions de la landing (clics démo, demandes de catalogue avec `origine=brochure_exit_sitewide`).

**Vérifié** — `main` `0bd8d60` au départ ; `npx tsc --noEmit` vert ; Vitest `lib/engagement` : 34/34 (nouveau test : `/fr/packshot-mode` couverte, avec barre finale et paramètres ; `/fr/industrie/mode-textile` et `/en/packshot-mode` exclues ; gels restants `/fr`, `/fr/packshot-e-commerce`, `/fr/industrie/mode-textile`) ; ESLint ciblé : aucune erreur ; `verifier-json` : 195 ; `npx next build` vert (387 pages) ; Playwright Chromium sur `next start` local : 11/11 (apparition sur `/fr/packshot-mode` après 60 s, 70 % et sortie haute ; aucune apparition sur `/fr`, `/fr/packshot-e-commerce`, `/fr/industrie/mode-textile`, contact, calculateur, mentions légales, Academy, EN, de-ch ; apparition de référence sur un article).

**Supposé** — Aucun.

**Non regardé** — `www` (R4) ; GA4 ; effet de la pop-in sur la mesure GSC de la landing (sans objet attendu : aucun contenu prérendu modifié).

**Suite** — Fusion ; contrôle de `sysnext.vercel.app` ; contrôle de `www` dans Chrome sur `/fr/packshot-mode` (apparition après 60 s, 70 % et sortie haute ; hub `mode-textile` sans pop-in).

---

## 2026-10-10 · #122 fusionnée et publiée (`0bd8d60`) : pop-in d'engagement active en production ; contrôle passif de `sysnext.vercel.app` · Claude de Laurent

**Chantier** : pop-in d'engagement (#122) | **PR** : #122 (fusionnée), documentation : #126 (brouillon) | **Commit** : fusion `0bd8d60`

**Quoi** — Mission de Laurent du 10/10 « GO final pop-in #122 » (GO_CODAGE_122, GO_MERGE_122, GO_PUBLICATION_122 = YES) : #122 sortie du brouillon, titre sans « DO NOT MERGE », fusionnée par commit de fusion le 10/10 à 08:37:22 UTC (`0bd8d60`, parents `48a2ce2` et `f724809`), comme #82 et les fusions récentes de `main` (`02-PROCEDURE.md`, étape 6, prescrit `--squash` : écart de pratique déjà constaté en D54). Branche conservée.

**Pourquoi** — D55 : préalables levés par décision de Laurent ; CI 4/4 verte sur `f724809` (build terminé à 08:36:14 UTC).

**Fichiers** — Aucun fichier du site dans cette entrée ; `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md` (#122 sort de B, entre en G ; contrôle `www` en C ; ligne `main`).

**Effet attendu** — Pop-in active sur les pages FR desktop éligibles de `www` ; mesure GA4 sur 7 à 14 jours (`exit_modal_view`, `cta_click` à `exit_modal`, consentement requis).

**Vérifié** —
- `main` = `0bd8d60` ; `lib/engagement/activation.ts` sur `main` : `POPIN_PUBLICATION_AUTORISEE = true`, `STOCKAGE_SESSION_AUTORISE = true`.
- Statut Vercel de `0bd8d60` : « Deployment has completed » à 08:38:51 UTC (déploiement `FA256LRkqtbEcgJTmwRd5DCGMs6c`).
- `sysnext.vercel.app`, lecture du HTML servi (`curl`), 08:39 UTC : avant le déploiement, aucun code de la pop-in ; après, la référence client du composant (module contenant `popin-debug`) figure dans le rendu de `/fr` et de `/fr/blog/guide-achat-studio-2026`, et pas dans celui de `/en` : montage en FR seulement, conforme au layout.
- `smoke.mjs https://sysnext.vercel.app` : vert, 17 pages, 3 ressources.
- Politique de confidentialité : entrée « Stockage de session (fenêtre de suggestion) » servie sur `/fr/confidentialite`, « Session storage (suggestion window) » sur `/en/confidentialite`.

**Supposé** — Que les exclusions et gels, appliqués côté navigateur (le composant est monté sur toutes les pages FR, dont `/fr`), se comportent en production comme dans les 38 tests Playwright du build local de `f724809`.

**Non regardé** — Comportement de la pop-in en navigateur sur la production : l'exécution de la spec Playwright contre `sysnext.vercel.app` a été refusée par le mode automatique de Claude Code (« Production Reads ») ; non contournée. `www` (R4). GA4 : aucun accès ; réception non vérifiée.

**Suite** — Contrôle Claude dans Chrome sur `www` (ETAT, C) : déclenchement, X, Échap, non-réapparition, liens, absence sur `/fr`, pages gelées, EN, mobile ; GA4 en temps réel si le consentement est accepté. Fusion de #126 : GO distinct de Laurent.

---

## 2026-10-10 · #122 — publication autorisée (D55) : interrupteur ouvert, stockage de session mentionné dans la politique de confidentialité · Claude de Laurent

**Chantier** : pop-in d'engagement (#122) | **PR** : #122 | **Commit** : voir l'historique de #122

**Quoi** — GO_MERGE et GO_PUBLICATION de Laurent du 10/10 et ses réponses aux quatre points ouverts (D55) : `POPIN_PUBLICATION_AUTORISEE = true` ; article 6 de la politique de confidentialité complété d'une entrée « Stockage de session (fenêtre de suggestion) » en FR, EN et de-ch ; commentaires et test des interrupteurs alignés.

**Pourquoi** — Les préalables documentés sur #122 sont levés par décision de Laurent : copy publiée sur son autorité (`SEBASTIEN_COPY_VALIDATION = NOT_RECEIVED`) ; `sessionStorage` tenu pour fonctionnel, sans consentement, et mentionné ; fermeture par X et Échap validée par les tests automatisés ; droits du visuel confirmés.

**Fichiers** — `lib/engagement/activation.ts`, `lib/engagement/session.ts` (commentaire), `lib/engagement/__tests__/popin-engagement.test.ts`, `e2e/popin-engagement.spec.ts` (commentaire), `app/[lang]/confidentialite/page.tsx` (une entrée), `messages/fr.json`, `messages/en.json`, `messages/de-ch.json` (clé `privacy.article6.sessionStorage` ajoutée, aucune clé existante modifiée, mise en forme conservée), `docs/seo-geo/DECISIONS.md` (D55), `docs/seo-geo/ETAT.md`.

**Effet attendu** — À la fusion : pop-in montée en production, donc sur `www`, desktop FR seulement ; exclusions, gels et périodes de mesure inchangés. Politique de confidentialité : une entrée de plus à l'article 6. Mesure sur 7 à 14 jours : `exit_modal_view` et `cta_click` (`exit_modal`) dans GA4, consentement requis.

**Vérifié** — `npx tsc --noEmit` vert ; `verifier-json` : 195 fichiers valides ; Vitest : 34 fichiers, 626 tests ; ESLint (`lib/engagement`, `components/engagement`, politique, spec) : aucune erreur ; `npx next build` vert (valeurs factices), 387 pages ; `next start` local : entrée de l'article 6 rendue sur `/fr/confidentialite` et `/en/confidentialite` (`/de-ch/confidentialite` : 404, comme sur `main`) ; Playwright Chromium, `e2e/popin-engagement.spec.ts` : 38/38 (conditions, X, Échap, rechargement, exclusions, gels, mobile, session). Sources CNIL relues le 10/10 : page « Cookies et traceurs : comment mettre mon site web en conformité ? » (le stockage local relève des traceurs) ; lignes directrices, délibération n° 2020-091, article 5, point 49 (liste des exemptions).

**Supposé** — Aucun.

**Non regardé** — `www` (R4) ; contrôle humain en Chrome de la fermeture (D55 : tests automatisés tenus pour suffisants). `pkc_attribution` (`lib/attribution.ts`, monté dans le layout) : écrit en production dans le `sessionStorage` (UTM, referrer, première page) sans consentement ni mention dans la politique ; hors #122, non modifié, à signaler à Laurent.

**Suite** — CI, sortie du brouillon et fusion ; contrôle de `sysnext.vercel.app` (smoke, pop-in montée), puis de `www` dans Chrome (Laurent) ; mesure sur 7 à 14 jours ; validation de la copy par Sébastien, non bloquante (D55).

---

## 2026-10-10 · Clôture de #123 et #124 : `main` `3619e75` intégré dans #125, exception renumérotée D54, contrôle de `www` dans Chrome · Claude de Laurent

**Chantier** : maillage et cocons, clôture (mission de Laurent du 10/10 « Réconciliation finale de la PR #125 ») | **PR** : #125, brouillon, documentation seule | **Commit** : fusion de `main` `3619e75` dans la branche `claude/gracious-cerf-rbj12m` (ce commit)

**Quoi**
- `main` `3619e75` (fusion de #82, 10/10 à 05:00:17 UTC) fusionné dans #125, sans rebase ; conflits des trois fichiers résolus dans l'éditeur de conflits de GitHub.
- L'exception D15/D48 de #123 et #124, proposée D53 sur la branche de #125 le 09/10 (tête `6813cbf`), est inscrite **D54** : la D53 de `main` est celle de #82 (landing catalogue). Le texte de Laurent (« Inscrire cette décision comme D53 ») est reproduit sans modification ; la ligne « Statut » de D54 explique la renumérotation. Dans les lignes propres à #125 (titre et deuxième puce de l'entrée du 09/10 ci-dessous, `ETAT.md` § G), « D53 » devient « D54 » ; aucune ligne de `main` n'est renumérotée.
- Contrôle Chrome de `www` du 10/10 consigné (`ETAT.md` C, E, G) ; J0 de la mesure de #123 fixé.

**Pourquoi** — Collision de numéro : #82 a inscrit D53 sur `main` (ex-D52 de sa branche, renumérotée le 09/10) avant #125, qui proposait aussi une D53. Règle appliquée le 09/10 pour #82 : la décision déjà fusionnée garde son numéro. Aucun « D54 » dans `DECISIONS.md`, `ETAT.md` et `JOURNAL.md` de `main`, de #125 ni de #126 avant cette écriture.

**Fichiers** — `docs/seo-geo/DECISIONS.md` (D54 au-dessus de la D53 de `main`) ; `docs/seo-geo/ETAT.md` (version de `main` ; lignes actualisées : `main`, mise à jour documentaire, règle D37/D39/D52, #123 et #124 sortis de B, contrôles `www` en C, événement D52 et mesure de #123 en E, livraisons en G) ; `docs/seo-geo/JOURNAL.md` (cette entrée ; entrée de #125 du 09/10 placée sous l'entrée de #82 du 10/10).

**Effet attendu** — Aucun effet sur le site (documentation). Mesure de #123 : J0 le 10/10, J+28 le 07/11, J+56 le 05/12.

**Vérifié**
- GitHub, 10/10 vers 05:20 UTC, dans Chrome : `main` = `3619e75` (parents `f143f61` et `d7331c1`) ; #125 brouillon, tête `6813cbf` (parent `f143f61`), en conflit sur les trois fichiers ; #126 brouillon (#82, branche `claude/magical-clarke-rkqimg`), `DECISIONS.md` identique à `main`.
- Fusion : `DECISIONS.md` et `JOURNAL.md` contiennent toutes les lignes de `main`, dans l'ordre ; `ETAT.md` les contient toutes sauf les lignes actualisées listées sous « Fichiers » ; un seul titre « D53 » (#82) et un seul titre « D54 ».
- `www.packshot-creator.com`, 10/10 de 06:46 à 06:54 CEST (04:46–04:54 UTC, avant la fusion de #82), Claude dans Chrome pour Laurent, aucun formulaire soumis :
  - accessible dans Chrome (HTTP 200, aucun blocage Cloudflare) ;
  - A, Studios : l'ancre corrigée de `/fr/blog/les-visuels-au-service-du-referencement-de-votre-e-commerce` mène à `/fr/studios-photo-automatises` (clic réel) ;
  - B, Mode : « fashion » de `/en/blog/how-shotflow-accelerates-fashion-visual-content-production` mène à `/en/packshot-mode`, page en anglais ;
  - C, F5 : « packshots professionnels en série » du pilier FR mène à `/fr/packshot-e-commerce`, lien distinct de « studio photo automatisé » (Studios) ;
  - D, Amazon : liens réciproques entre `comment-avoir-meilleures-images-amazon` et `photographie-360-amazon` ; F5 depuis le guide Amazon ;
  - E, de-ch : `leitfaden-packshot-fotografie-warum-packshots-machen` vers `/de-ch/packshot-e-commerce` ; `produkt-vorstellen-leitfaden-packshot-fotografie` vers le pilier de-ch et `/de-ch/packshot-mode` ; destinations en `de-ch` ;
  - F : `/fr/packshot-e-commerce`, `/fr/packshot-mode`, `/fr/industrie/mode-textile`, `/fr/distributeur-orbitvu-suisse`, `/fr/studio-photo/alphashot-pro-g2` : 200, un H1, aucune image cassée ;
  - G, guides `/fr/guide/modifier-couleur-produit-photo` et `/en/guide/change-product-photo-color` : liens éditoriaux soulignés, cliquables (clic et Entrée), focus clavier visible ;
  - 390 px : 2 guides, pilier FR, F5, `/fr/distributeur-orbitvu-suisse` : aucun débordement horizontal, aucun lien masqué ;
  - verdict : 7 groupes sur 7 PASS, aucune anomalie bloquante.
- Défauts préexistants, présents dans les sources à `085b005` (avant #124), non corrigés : liens de pages de-ch vers des contenus FR (4 dans `leitfaden-packshot-fotografie-warum-packshots-machen`, 20 dans `produkt-vorstellen-leitfaden-packshot-fotografie`, nombres inchangés par #124) ; « les studio photo automatisé » (accord) dans le pilier FR ; ancre « intelligence artificielle » du guide Amazon FR vers `/fr/studio-photo/alphashot-g2`, redirigée vers `alphashot-xl-g2`.

**Supposé** — `www` servait `f143f61` pendant le contrôle : déploiement Production `f143f61` « Active » sur la page des déploiements GitHub vers 04:53 UTC et liens de #124 rendus ; aucun identifiant de commit dans les pages.

**Non regardé** — Les 97 pages sur `www` : seul l'échantillon ci-dessus (contrôle exhaustif 97/97 : `sysnext.vercel.app`, 09/10) ; guide `/fr/guide/comment-faire-photos-multi-angles-chaussures` prévu le 09/10 ; correspondance avec les groupes 2, 3, 5, 9, 11 et 15 de la mission de #124 ; Firefox, Safari, appareils réels (390 px via une iframe de même origine, largeur utile 375 px) ; `www` après la fusion de #82 ; claims déjà inventoriés ; lignes de #82 dans `ETAT.md` (B, C, G), laissées à #126 ; build local (session sans clone du dépôt) : CI de la tête de #125.

**Suite**
- Fusion de #125 : GO_MERGE distinct de Laurent.
- #125 et #126 modifient toutes deux la ligne « Dernière mise à jour documentaire » d'`ETAT.md` et le haut de `JOURNAL.md` : la seconde fusionnée devra intégrer `main`. La ligne `main` d'`ETAT.md` est identique dans les deux PR.

## 2026-10-10 · #122 — `main` `3619e75` (fusion de #82) intégré ; dépendance « catalogue 404 » levée · Claude de Laurent

**Chantier** : pop-in d'engagement (#122) | **PR** : #122, brouillon | **Commit** : fusion de `main` `3619e75` (voir l'historique de #122)

**Quoi** — `main` `3619e75` (fusion de #82, 10/10 à 05:00 UTC) fusionné dans #122, sans rebase. Conflits dans `JOURNAL.md` (union, entrées placées par heure UTC) et `ETAT.md` (historique « Dernière mise à jour » des deux côtés conservé). Aucun fichier de code commun. Ligne #122 d'`ETAT.md` : la landing catalogue est publiée, le CTA secondaire ne mène plus à une 404.

**Pourquoi** — #82 fusionnée et publiée ; #122 en conflit documentaire avec `main`.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `e2e/popin-engagement.spec.ts` (aide `lire`).

**Effet attendu** — Aucun ; #122 reste en brouillon, GO_MERGE et GO_PUBLICATION non donnés.

**Vérifié** — `sysnext.vercel.app/fr/catalogue-orbitvu-all-in-one?origine=brochure_exit_sitewide` : 200 le 10/10 (05:0x UTC) ; #82 lit `origine` (liste fermée) et l'écrit dans la notification interne. Aucune entrée de `main` ni de #122 absente du JOURNAL fusionné. `tsc`, `verifier-json`, Vitest 626/626, `next build` (387 pages).

Test rendu robuste (`e2e/popin-engagement.spec.ts`, aide `lire`) : la cible de défilement est recalculée jusqu'à stabilisation. L'ancienne aide figeait la cible au premier calcul ; sur `/fr`, la hauteur de page peut changer après le chargement, et le test « aucune apparition sur /fr » échouait par intermittence (délai de 30 s). Contre-épreuve sur serveur relancé à froid : ancienne aide 1 échec sur 3 ; nouvelle aide 3 sur 3 ; spec complète en Chromium 76/76 sur deux répétitions.

**Correction** — Le relevé « `e2e/popin-engagement.spec.ts` 52/52 » sur `f5c3bbb` (description de #122, 09/10) était inexact : la commande n'affichait que la dernière ligne du résumé. La configuration locale exécute 4 projets × 38 tests ; Firefox et WebKit ne démarrent pas avec le binaire Chromium imposé, et le projet Mobile Chrome ne s'applique pas à une pop-in desktop. Le chiffre de référence est le projet Chromium : 38/38.

**Supposé** — Aucun.

**Non regardé** — `www` (R4).

**Suite** — Restent pour #122 : GO de fusion et de publication de Laurent, P4 `sessionStorage` (statut juridique NON ÉTABLI), QA de Laurent (X puis rechargement, Échap), spec hors CI jusqu'à #117.

---

## 2026-10-10 · Landing catalogue All-in-One (#82) fusionnée et publiée ; contrôle de `sysnext.vercel.app` · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, fusionnée | **Commit** : `3619e75` (fusion, 10/10 à 05:00:17 UTC)

**Quoi** — #82 sortie du brouillon puis fusionnée dans `main` (méthode « merge », tête `d7331c1`), sur le GO de fusion et de publication de Laurent du 09/10 (D53). Déploiement de production Vercel réussi (statut `success` à 05:01:23 UTC). `/fr/catalogue-orbitvu-all-in-one` est publique, `noindex, nofollow`.

**Pourquoi** — Conditions de D53 réunies : CI verte sur `d7331c1` (4 contrôles sur 4), fusion sans conflit, variables de Production présentes (relevé de Laurent du 10/10, entrée précédente).

**Fichiers** — Aucun dans ce commit de documentation ; contenu publié : description de #82.

**Effet attendu** — Leads brochure depuis la landing : e-mail du lien au prospect, notification à `CATALOGUE_NOTIFICATION_EMAIL`. Aucun effet d'indexation (D53). #122 : le CTA « Recevoir le catalogue » ne mène plus à une 404.

**Vérifié** — Sur `sysnext.vercel.app`, 10/10 entre 05:01 et 05:10 UTC :
- avant la fusion (04:5x UTC) : page et `/api/catalogue` en 404, politique en 200 ;
- après : page 200 (05:01:35 UTC) ; `<title>` « Studios photo Orbitvu : recevez le catalogue | PackshotCreator » ; H1 attendu ; `robots` `noindex, nofollow` ; ni canonique ni hreflang ; en-têtes D36 de l'origine présents (`x-robots-tag: noindex`, `x-packshot-origin-noindex: 1`) ; aucun bandeau d'aperçu ; mention P3 présente, ancienne mention absente ; téléphones FR et CH ; aucun lien vers F5 dans `<main>` ;
- `GET /api/catalogue` : 200, `cache-control: no-store`, `{"disponible":true}` (route ouverte : interrupteurs, PDF et trois variables présents) ;
- `?origine=brochure_exit_sitewide` : 200 ; `/en/…` et `/de-ch/…` : 404 ; `sitemap.xml` : aucune URL catalogue ;
- `/fr/confidentialite` et `/en/confidentialite` : article 8 présent ;
- PDF : 200, `application/pdf`, 15 380 434 octets ;
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` : 17 pages et 3 ressources au vert.

**Supposé** — Que la clé Resend de production envoie correctement : non testé en production (aucune soumission sans autorisation) ; elle sert déjà `/api/contact`, et le test réel de la Preview du 09/10 a réussi.

**Non regardé** — `www.packshot-creator.com` : sondé par script le 10/10 (page, API, politique) → 403 pour les trois, politique existante comprise ; ne prouve rien (R4), contrôle dans Chrome par Laurent ; formulaire réel en production ; badge « Needs Attention » de `RESEND_API_KEY` dans Vercel ; [Inférence] limitation de débit derrière le Worker (adresse Cloudflare possible), cela repose sur des schémas observés.

**Suite** — Contrôle de `www` dans Chrome (landing et politique, desktop et mobile, sans soumission). #122 : dépendance à #82 levée côté application ; #122 reste en HOLD pour ses propres points (GO, P4 `sessionStorage`, QA de Laurent).

---

## 2026-10-10 · Landing catalogue All-in-One (#82) : variables de Production relevées, `CATALOGUE_NOTIFICATION_EMAIL` créée · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82 | **Commit** : ce commit (documentation seule)

**Quoi** — Mission de Laurent du 10/10 (« #82 / Vercel production ») : variables du parcours relevées dans le tableau de bord Vercel, projet `sysnext`, environnement Production ; `CATALOGUE_NOTIFICATION_EMAIL` créée, seule écriture autorisée. Geste fait par Laurent avec Claude dans Chrome : la session cloud n'a aucun accès à Vercel (ni connecteur, ni jeton ; R3).

**Pourquoi** — Condition de fusion de la mission du 09/10 (D53) : « variables Production présentes ». Relevé de Sébastien du 09/10 : `CATALOGUE_NOTIFICATION_EMAIL` absente en Production.

**Fichiers** — Aucun fichier du site. Vercel : `CATALOGUE_NOTIFICATION_EMAIL` ajoutée en Production seule.

**Effet attendu** — Au prochain déploiement de production (fusion de #82), `GET /api/catalogue` répond `{"disponible":true}`. [Inférence] Une variable ajoutée ne s'applique qu'aux déploiements suivants. Cela repose sur des schémas observés.

**Vérifié** — Rapport de Laurent du 10/10 (Claude dans Chrome), valeurs non affichées :
- `RESEND_API_KEY` : PRESENT (« All Environments », donc Production) ;
- `RESEND_FROM_EMAIL` : PRESENT (« All Environments ») ;
- `CATALOGUE_NOTIFICATION_EMAIL` : PRESENT, créée en Production seule, type « Config » (le choix « Secret » était proposé par défaut, non imposé), destinataire attendu confirmé dans le formulaire avant enregistrement ;
- aucune autre variable modifiée ; message « A new deployment is required » fermé par « Dismiss », sans redéploiement ; formulaire non soumis, aucun e-mail envoyé ; variable de la Preview de la branche de #82 non modifiée.

**Supposé** — Aucun.

**Non regardé** — Badge « Needs Attention » affiché par Vercel sur `RESEND_API_KEY` : détail non ouvert, signification non établie. Captures d'écran du formulaire de saisie prises par l'outil (valeur du destinataire visible), ni partagées ni enregistrées comme livrable.

**Suite** — Fusion de #82 (D53), puis contrôle de `sysnext.vercel.app` (`GET /api/catalogue`, page, politique) et de `www` dans Chrome (R4).

---

## 2026-10-09 · #122 — `main` `f143f61` intégré (#123, #124), sans changement de code · Claude de Laurent

**Chantier** : pop-in d'engagement (#122) | **PR** : #122, brouillon | **Commit** : fusion de `main` `f143f61` (voir l'historique de #122)

**Quoi** — `main` `f143f61` (fusions de #123 et #124) fusionné dans #122, sans rebase. Conflits dans `JOURNAL.md` (union, entrées placées par heure UTC) et `ETAT.md` (lignes #122, #123 et #124 conservées). Aucun fichier de code commun. Ligne #122 d'`ETAT.md` : `main` intégré, `origine` désormais lue par #82 sur sa branche.

**Pourquoi** — Point de contrôle de 20:49 UTC : `main` avancé, #122 en conflit documentaire.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Aucun. #122 de nouveau fusionnable ; GO_MERGE et GO_PUBLICATION toujours non donnés.

**Vérifié** — Aucune entrée de `main` ni de #122 absente du JOURNAL fusionné ; contrôles de la tête : description de #122.

**Supposé** — Aucun.

**Non regardé** — La D52 de `main` (#124 : liens éditoriaux vers Mode et F5 sans attendre les fenêtres de mesure) ne vise pas la pop-in ; les gels de `ROUTES_GELEES` (F5 jusqu'au 23/11, Mode jusqu'au 26/11) restent ceux de la mission de Laurent du 09/10, non modifiés.

**Suite** — Inchangée : dépendance à #82 (publication de la landing), P4 `sessionStorage`, QA de Laurent (X puis rechargement, Échap).

## 2026-10-09 · Fusion et publication de #123 puis #124 (exception D54), contrôles de production · Claude de Laurent

**Chantier** : maillage et cocons, clôture (missions de Laurent du 09/10 « GO final — fusion et publication PR #123 puis #124 » et « Reprise autorisée — PR #124 après fusion de #123 ») | **PR** : #123 (`085b005`), #124 (`f143f61`) ; documentation : PR brouillon de la branche `claude/gracious-cerf-rbj12m` | **`main`** : `3c0909b` → `085b005` → `f143f61`

**Quoi**
- #123 fusionnée le 09/10 à 20:18:55 UTC par commit de fusion (`085b005`), tête `6bc15f4` ; #124 à 20:42:37 UTC (`f143f61`), tête `9a76bc1`. Chaque PR est sortie du brouillon, « DO NOT MERGE » retiré du titre, juste avant sa fusion.
- D54 inscrite : exception ponctuelle D15/D48 (fusion sans attendre l'échéance de D15 ; pour #124, sans nouvelle information de Sébastien selon D48 a) et fusion par commit de fusion, en dérogation ponctuelle à `02-PROCEDURE.md`.
- `ETAT.md` : `main` et règle D37/D39/D52 (A) ; #123 et #124 sortis de B ; contrôle Chrome de `www` (C) ; événement D52 daté et mesure de #123 (E) ; livraisons (G).

**Pourquoi** — Décision de Laurent du 09/10 : GO_EXCEPTION_D15_123, GO_EXCEPTION_D15_124, GO_EXCEPTION_INFORMATION_D48A_124, GO_MERGE et GO_PUBLICATION des deux PR, GO_QA_PRODUCTION, GO_DOCUMENTATION_CLOTURE. Sans exception : #123 attendait l'échéance D15 du 16/10 ; pour #124, l'information de Sébastien n'était pas publiée et D15 n'avait pas démarré.

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun effet sur le site (documentation). Effets des deux PR : mesures en E (#123 : J+28 et J+56 ; événement D52 pour F5, Mode et Studios ; événement de baseline de M5, la fusion précédant la fenêtre du 14 au 28/10).

**Vérifié**
- Avant chaque fusion : tête inchangée (`6bc15f4`, puis `9a76bc1`), CI 4/4 verte (14:59:49 et 16:39:50 UTC), aucune revue, aucune objection ; `main` protégée, comme pour les fusions précédentes.
- Arbres git, relevés en local après les fusions : `085b005` porte l'arbre de `6bc15f4` (`039c999`) ; `f143f61` celui de `9a76bc1` (`dd921d4`) ; parents `3c0909b` + `6bc15f4`, puis `085b005` + `9a76bc1`. Différentiel de `f143f61` contre `085b005` (GitHub) : 85 fichiers, 82 contenus + `DECISIONS.md`, `ETAT.md`, `JOURNAL.md`.
- `sysnext.vercel.app` après #123 : `smoke.mjs` vert (17 pages, 3 ressources) ; 3 liens de #123 lus sur les pages (L1, E-BIJ-2, F-MON-1) ; liens rendus des 97 pages touchées par les deux PR : 97/97 HTTP 200, état `6bc15f4` (28 pages sources de #123 conformes, 69 pages de #124 encore inchangées).
- `sysnext.vercel.app` après #124 (20:43:58 UTC) : `smoke.mjs` vert ; 97/97 HTTP 200, état `9a76bc1` (82 pages propres à cet état, 15 identiques en `6bc15f4` et `9a76bc1`) : les 34 liens de #123 et les 126 opérations de #124 sont rendus.
- Worker déployé `packshot-router` (lu par l'API Cloudflare, sans modification ; dernière modification le 09/10 à 10:33 UTC), rejoué hors ligne avec une origine simulée : 61/61 destinations distinctes des 129 liens ajoutés ou re-ciblés transmises sans redirection ni 410 ; témoins : `/fr/studio-photo/alphashot-g2` et `/fr/studio-photo/alphashot-xl` en 301 vers XL G2.
- Contrôle négatif du 09/10 vers 19:30 UTC, avant les fusions : 97/97 pages conformes à `main` `3c0909b`.

**Supposé**
- Le déploiement de production Vercel sert `f143f61` : déduit du contenu rendu sur `sysnext` (97 pages à l'état `9a76bc1`) ; identifiant du déploiement non consulté (dashboard, R3).
- QA Chrome des Preview (#123 PASS ; #124 15/15 PASS et non-régression de #123) : déclarée par Laurent le 09/10, heure non communiquée.

**Non regardé**
- `www.packshot-creator.com` : 403 Cloudflare au client de la session (R4) ; surface publique non contrôlée (ETAT, C).
- Specs Playwright sur la production ; données GSC (lecture à J+28).
- Outillage : pendant la mission, le mode automatique de Claude Code a refusé 3 commandes Bash de vérification (catégorie « Production Deploy ») ; reprise sur confirmation de Laurent ; aucune permission modifiée.

**Suite**
- Chrome sur `www` : groupes 2, 3, 5, 9, 11 et 15 de la mission de #124, pages de la QA de #123 et 2 guides ; la date du constat fixe J0 de #123 et complète l'événement D52 (E).
- Arbitrages G1 à G5 de #124 et pages en reconstruction (#104, #105, #107, #108) : chantiers propriétaires, inchangés.
- Fusion de cette PR documentaire : GO_MERGE distinct de Laurent.

---

## 2026-10-09 · Landing catalogue All-in-One (#82) : `main` `f143f61` intégré (#123, #124), décision de #82 renumérotée D53 · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82 | **Commit** : fusion de `main` `f143f61` (voir l'historique de #82)

**Quoi** — `main` `f143f61` (fusions de #123 à 20:18 UTC et de #124 à 20:42 UTC) fusionné dans #82, sans rebase. #124 a inscrit sur `main` une D52 (maillage vers Mode, Packshot e-commerce et Amazon) : la décision de publication de #82, numérotée « D52 » sur la branche, devient **D53**, placée au-dessus. Mentions renommées dans les seules lignes de #82 (`DECISIONS.md`, `ETAT.md`, Q24, entrée du JOURNAL de #82 du 09/10, non fusionnée) ; la D52 de `main` et ses mentions sont inchangées.

**Pourquoi** — Point de contrôle de 20:49 UTC : `main` avancé, collision de numéro de décision. Règle de résolution : la décision déjà fusionnée garde son numéro.

**Fichiers** — Conflits : `docs/seo-geo/DECISIONS.md` (D53 au-dessus de la D52 de `main`), `docs/seo-geo/JOURNAL.md` (union ; entrée de #82 de 16:4x UTC au-dessus de celles de #124 et #123). `ETAT.md` fusionné sans conflit. Aucun fichier du site de #82 commun avec #123 et #124.

**Effet attendu** — Aucun pour le visiteur. #82 de nouveau fusionnable.

**Vérifié** — Aucune ligne de `main` absente de `JOURNAL.md` ni de `DECISIONS.md` fusionnés ; seules les lignes renommées D52 → D53 diffèrent du côté de #82. Contrôles de la tête : description de #82.

**Supposé** — Aucun.

**Non regardé** — Effet de la D52 de `main` (liens éditoriaux vers Mode et F5) sur les exclusions de la pop-in #122 : D52 ne vise que les liens éditoriaux ; les gels de #122 viennent de la mission de Laurent du 09/10 et ne sont pas modifiés.

**Suite** — Inchangée : `CATALOGUE_NOTIFICATION_EMAIL` en Production avant la fusion.

---

## 2026-10-09 · Landing catalogue All-in-One (#82) : `main` intégré, P3, P4, origine de la pop-in, interrupteurs ouverts (D53) · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82 | **Commits** : `783b55e` (fusion de `main` `3c0909b`), `34b8a5f` (P3, P4, origine, état GET), `1846fd5` (interrupteurs)

**Quoi** — Mission de Laurent du 09/10 (« #82 finalisation et publication ») : `main` fusionné sans rebase ; mention P3 du formulaire ; P4 dans la politique de confidentialité (Resend) ; `?origine=brochure_exit_sitewide` lu et remonté dans la notification interne ; `GET /api/catalogue` (état seul) ; `PUBLICATION_AUTORISEE` et `SERVICES_REELS_AUTORISES` passés à `true`. D53 inscrite.

**Pourquoi** — GO de finalisation, de fusion et de publication de Laurent du 09/10 (D53), après la décision de Sébastien « aucun CRM » et le test réel depuis la Preview du même jour (entrées précédentes du Claude de Sébastien).

**Fichiers** —
- Fusion : `docs/seo-geo/JOURNAL.md` (union, entrées de #82 du 09/10 placées par heure), `ETAT.md` (état de `main` conservé, ligne #82 du 09/10 reportée), `BOITE-AUX-LETTRES.md` (question de #82 renumérotée **Q24** : #82 est la seconde des deux PR porteuses d'une « Q23 » ; texte conservé). Aucun fichier du site en conflit.
- P3 : `components/landings/catalogue-all-in-one/contenu.ts` (`FORMULAIRE.donnees.avant`, formulation de Laurent du 06/10, reprise mot pour mot).
- P4 : `messages/fr.json`, `messages/en.json`, `messages/de-ch.json` (`privacy` : `article2.catalogueForm`, `article3.purpose6`, `article8`), `app/[lang]/confidentialite/page.tsx`.
- Origine : `lib/catalogue/schema.ts` (`ORIGINES_CATALOGUE`, `origineCatalogue`), `gestionnaire.ts`, `fiche.ts` (ligne « Origine : brochure_exit_sitewide »), `CatalogueForm.tsx`.
- `app/api/catalogue/route.ts` (`GET` → `{ disponible }`), `lib/catalogue/activation.ts`, `lib/catalogue/pdf.ts` (commentaire, garde D36 de `main`), tests `lib/catalogue/__tests__/`, `e2e/catalogue-all-in-one.spec.ts`. `docs/seo-geo/DECISIONS.md` (D53).

**Effet attendu** — Après fusion : `/fr/catalogue-orbitvu-all-in-one` servie en production (`noindex, nofollow`, ni canonique ni sitemap), formulaire ouvert si les trois variables Resend du catalogue sont présentes en Production ; sinon 503 `catalogue_unavailable` et message de repli avec les téléphones. #122 peut quitter son HOLD « catalogue 404 » après contrôle de la publication.

**Vérifié** —
- P4, sources Resend relues le 09/10 : https://resend.com/security/gdpr (mise à jour du 21/09/2026) : « Resend's primary processing operations take place in the United States » ; « Transfers out of the EEA are made under the EU Standard Contractual Clauses, which are incorporated into the DPA » ; participation au EU-U.S. Data Privacy Framework (« additional transfer mechanism ») ; transferts suisses : SCC de l'UE avec les modifications prévues au DPA ; DPA « GDPR Article 28 » en vigueur pour chaque compte. https://www.resend.com/security : données stockées aux États-Unis ; SOC 2 Type II. Texte publié : sous-traitant, traitement principal aux États-Unis, SCC du DPA, DPF, Suisse ; ni « conforme RGPD », ni hébergement en Europe, ni durée. Pipedrive non cité.
- Origine : liste fermée côté navigateur et serveur ; valeur inconnue, casse différente, UTM, balise, nombre ou tableau ignorés sans rejet de la demande ; rien dans l'e-mail du prospect. Contre-épreuves (code remis à l'identique, `cmp`) : origine recopiée sans liste fermée → 3 échecs ; ligne « Origine » retirée → 1 échec.
- PDF relu le 09/10 depuis la session : HTTP 200, `application/pdf`, 15 380 434 octets, SHA-256 `0d72b207…6730e5` identique, 28 pages (`pdfinfo`), en-tête `noindex` présent (deux fois, comme le 06/10).
- Worker (`cloudflare-worker/src/index.js`, dépôt) : aucune règle ne capte `/fr/catalogue-orbitvu-all-in-one` ni `/api/catalogue` ; relais vers l'origine Next, méthode et corps transmis.
- `npx tsc --noEmit` vert ; ESLint ciblé : 0 erreur ; `verifier-json` : 195 fichiers ; Vitest : 33 fichiers, 593 tests ; `npx next build` vert (valeurs factices, 387 pages) ; Playwright sur `next start` local : `catalogue-all-in-one.spec.ts` 72/72 (Chromium et Mobile Chrome), specs de la CI (`machine-selector`, `sommaire-blog`, `navigation-pages-longues`) 81/81.
- Rendu local, 1440 et 390 px : hero, film, formulaire, mention P3, article 8 ; aucun bandeau d'aperçu ; `noindex, nofollow` ; aucune réponse 4xx ou 5xx interne. `GET /api/catalogue` local : `{"disponible":false}` (aucun secret local).
- Preview de la branche : 302 vers le SSO Vercel ; non contrôlable par script depuis la session (jeton `VERCEL_AUTOMATION_BYPASS_SECRET` absent).

**Supposé** — Que les variables de Production lues par Sébastien dans le tableau de bord le 09/10 (`RESEND_API_KEY`, `RESEND_FROM_EMAIL` présentes en Production ; `CATALOGUE_NOTIFICATION_EMAIL` sur la Preview de la branche seule) n'aient pas changé : aucun accès Vercel depuis la session (R3, pas de jeton).

**Non regardé** — Variables Vercel de Production (aucun accès) ; Preview dans Chrome (SSO) ; `www` (R4) ; formulaire réel en production (aucun envoi sans autorisation) ; limitation de débit derrière le Worker : [Inférence] l'adresse lue par `getClientIp` peut être celle de Cloudflare et non celle du visiteur, comme pour `/api/roi-lead`, cela repose sur des schémas observés ; `/api/contact` utilise aussi Resend et Pipedrive sans que la politique les nomme (chantier séparé, signalé en Q24 le 06/10).

**Suite** — Avant la fusion : `CATALOGUE_NOTIFICATION_EMAIL` = `sebastien.jourdan@sysnext.com` à créer en Production dans le tableau de bord Vercel (projet `sysnext`), présence de `RESEND_API_KEY` et `RESEND_FROM_EMAIL` en Production à confirmer ; CI verte sur la tête. Après la fusion : déploiement de production, `GET /api/catalogue` sur `sysnext.vercel.app` (`disponible: true` attendu), page et politique sur `sysnext.vercel.app`, contrôle Chrome de `www` (R4). #122 : dépendance à lever après ce contrôle, sans fusion automatique.
## 2026-10-09 · Réparation globale des ancres et finalisation des cocons — 99 défauts traités, 22 arbitrages résolus, 25 liens nouveaux, D52 · Claude de Laurent

**Chantier** : maillage et cocons, campagne consolidée (mission de Laurent du 09/10 « Réparation globale des ancres et finalisation des cocons SEO/GEO » ; GO_CODE et GO_PR_DRAFT = YES ; GO_MERGE, GO_PUBLICATION, GO_PAID = NO) | **PR** : #124, brouillon, « DO NOT MERGE », branche `claude/reparation-ancres-cocons` | **Base** : tête de #123 (`6bc15f4`), elle-même sur `main` `3c0909b`. **Dépendance** : la PR contient les commits de #123 tant que #123 n'est pas fusionnée ; aucun de ses 34 liens n'est modifié (contrôle ci-dessous)

**Quoi**
- Les 99 corrections de l'inventaire du 09/10 (1 611 ancres, `ANCRES_CORRECTIONS_2026-10-09.csv`, hors dépôt) reprises ligne à ligne contre le code : 71 appliquées, 28 conservées en l'état avec motif.
- 22 des 54 lignes « à arbitrer » résolues par une preuve déjà disponible ; 32 regroupées en 5 décisions (description de la PR).
- 25 liens nouveaux sur un texte existant (D48 b) pour les relations manquantes des cocons ; 8 ancres mode EN re-ciblées du hub EN `noindex` (contenu FR, D9) vers la landing Mode EN indexable.
- D52 inscrite (décision de Laurent du 09/10 sur Mode, Packshot e-commerce et Amazon).

| Famille | Lignes | Opération | Régime |
|---|---|---|---|
| Destinations fausses | ANC-001 à ANC-010 | href corrigé : guide packshot EN partie 4, contact pour la démonstration (FR, EN), photogrammétrie au lieu de l'éclairage (FR, EN), horlogerie EN au lieu du hub bijoux (3), santé au lieu des cosmétiques (FR, EN) | D48 (a) |
| `alphashot-g2` nommant l'Alphashot Pro G2 | ANC-120, ANC-123, ANC-124, ANC-127 | href vers la fiche `alphashot-pro-g2` : la phrase nomme ce studio ; `alphashot-g2` est un autre produit (`machines.ts`, sans IA, retiré) redirigé par le Worker vers l'XL G2. EN : « Premiers » traduit « the first » | D48 (a) ; D15 pour le mot EN |
| Ancres incohérentes | ANC-011, 012, 013 à 017, 018, 019, 020 à 022, 034, 038 | ancre-phrase réduite à « mal éclairée » ; phrase altérée réparée (« les … et nos offres d'accompagnement ») et Studios au lieu de l'accueil ; 5 liens sectoriels retirés de la puce « Alphashot 360 » ; « modus » → « fashion » (EN, 2) ; 3 liens retirés de la conclusion surchargée (FR, EN) ; « consulter notre article dédié » déplacé sur « les avantages d'une toplight » (FR, EN) | D15 ; D48 (b) pour les déplacements sans mot changé |
| Studios (I02A) | ANC-040 à 043, 045, 046, 048 à 053, 150, 151 | href de la page de qualification ou du hub bijoux vers `/xx/studios-photo-automatises` quand l'ancre nomme les studios | D48 (a) ; `STUDIOS_INTERNAL_LINKING_EVENT` |
| Mode (I05, D52) | ANC-055 à 071 | 9 mentions sectorielles FR → hub `mode-textile` ; 6 ancres « vêtements » FR → `/fr/packshot-mode` ; EN « Fashion » et de-ch « Kleidung » → landing Mode de leur langue | D48 (a) + D52 |
| Secteurs | ANC-072, ANC-073 | « vins et spiritueux » : accueil → hub vin (A-007) ; « Shoe » : index EN → article EN chaussures indexable (hub EN `noindex`, contenu FR) | D48 (a) |
| Doublons | 16 des 26 | lien redondant retiré, texte conservé ; guides chaussures FR/EN : retrait du lien de l'astuce de l'étape 2, conservation de celui de l'étape 5 (Multi-Camera Rig, qui identifie l'XL Pro v2) | retrait |
| ShotFlow, workflows | ANC-100 à 111 | 6 ancres de marque ou auto-liens retirés (« ptimizing » corrigé en « optimizing ») ; 5 ancres « workflow » vers le propriétaire I17 | retrait ; D48 (a) |
| 360°, legacy | ANC-119, 147 à 149 | fiche `alphashot-360` (propriétaire I04) ; article logiciel PackshotCreator perdu | D48 (a) |

Conservées en l'état (28) : 10 doublons utiles (AI Act EN, gel J+7 ; « And many other e-commerce sectors », unique après ANC-073 ; sections distinctes des articles « mise en valeur » FR et EN ; listes ROI FR et EN, uniques après ANC-009 et ANC-010) ; 7 libellés français des gabarits EN (PACK-L, pages `noindex`) ; 8 ancres d'appel ou de chapitre (« immersion totale », « passer à la vitesse supérieure », « Notre guide dédié », « Commencez dès aujourd'hui ! » et leurs jumeaux EN) : P2 sans changement d'intention ; 3 améliorations Studios non appliquées (ANC-044 : la page lie déjà Studios ; ANC-047 et ANC-054 : seconde mention de la même page, qui lie désormais Studios par ANC-046 et ANC-053, laissée vers la page de qualification).

Liens nouveaux (D48 b), par cocon : CC11 F5, 7 (pilier FR, 8 défis, photo produit e-commerce, studio e-commerce, Amazon FR, EN, de-ch) ; CC01, 5 (série → pilier, 4 FR et 1 de-ch) ; CC02-R, 6 (pilier internalisation ↔ ROI, prestataire ; 3 articles → pilier) ; CC13, 1 (migration → distributeur Suisse) ; CC06H, CC06J, CC08, 1 chacun (guide montre → hub horlogerie, guide bijoux → hub bijoux, article → hub vin) ; CC11-MKP, 2 (articles Amazon entre eux) ; de-ch, 1 (migration → format d'image).

**Pourquoi** — Inventaire du 09/10 : 99 défauts confirmés ; propriétaires sans lien éditorial entrant : F5 (0 en FR, EN, de-ch), hub `mode-textile` (0), page distributeur (0), satellites CC02-R (0) ; landing IA cible de 11 ancres hors sujet (ShotFlow, workflows). Principe de la mission : réparer les liens qui racontent une mauvaise histoire, puis relier les bonnes pages.

**Fichiers** — 82 fichiers `content/{blog,guides}/{fr,en,de-ch}/*.json` (champ `content` ou `introText`, un seul champ par fichier) ; `docs/seo-geo/DECISIONS.md` (D52), `docs/seo-geo/ETAT.md` (B, E), `docs/seo-geo/JOURNAL.md`. Aucun fichier de code, de gabarit, de landing, de Worker ni de `messages/*.json`.

**Effet attendu** — [Inférence] Meilleure lisibilité des propriétaires d'intention par les moteurs (F5, Mode, Studios, fiche 360, article workflow) et parcours article → offre explicites ; aucun gain de position ou de trafic n'est promis. Lecture : GSC page × requête à J+28 et J+56 de la fusion, contre la baseline ci-dessous, en citant l'événement D52. Cela repose sur des schémas observés.

Baseline GSC, 90 jours du 09/07 au 06/10/2026 (projet `gsc-crawl-seo`, `gsc_metrics_page`, site 3, lecture seule ; conversions non disponibles dans cette source) :

| Groupe de pages | Impressions | Clics | Position moyenne pondérée |
|---|---|---|---|
| CC01 pilier + 4 volets de la série FR | 30 147 | 107 | 18,9 |
| CC11 satellites qui lient F5 (FR 3, EN 1) | 8 914 | 8 | 33,1 |
| Accueil `/fr` (M5) | 6 980 | 68 | 25,2 |
| Contenus de-ch modifiés (4) | 3 670 | 7 | 11,0 |
| CC05 hub `mode-textile` + articles vêtements FR et EN | 3 300 | 13 | 15,2 |
| CC11-MKP articles Amazon FR (2) | 2 992 | 8 | 5,9 |
| CC02 Studios FR + EN + de-ch | 2 751 | 21 | 26,5 |
| CC02-360 fiche 360 FR + EN + de-ch | 2 378 | 19 | 21,4 |
| Hubs horlogerie, vin, bijoux FR | 2 039 | 9 | 19,7 |
| CC10 landing IA FR + EN | 1 601 | 13 | 22,9 |
| CC10 article workflow I17 FR + EN | 1 295 | 1 | 12,7 |
| CC11 F5 FR + EN + de-ch | 1 204 | 1 | 42,5 |
| CC05 landing Mode FR + EN + de-ch | 789 | 7 | 15,7 |
| CC02-R internalisation FR (4) | 457 | 6 | 11,4 |
| CC13 distributeur Suisse | 8 | 0 | 8,1 |

**Vérifié**
- `git branch --show-current` = `claude/reparation-ancres-cocons` avant chaque commit.
- Moteur d'opérations : chaque changement localisé par ancre et destination exactes, texte visible comparé avant et après, nombre de liens du champ contrôlé ; 126 opérations, 0 échec. Delta des liens contre `6bc15f4` identique au journal des opérations (aucun retrait ni ajout inattendu) : les 34 liens de #123 sont intacts.
- `npx next build` vert (variables factices de la CI) ; `npx tsc --noEmit` vert ; `verifier-json` : 195 JSON valides ; Vitest 499/499.
- HTML prérendu contre la tête de #123 (identifiant de build neutralisé) : 374 pages, 292 identiques, 82 différentes = exactement les 82 pages du journal ; `<title>`, canonique, robots, hreflang, H1 et `lang` inchangés partout ; texte visible modifié sur 5 pages seulement, celles des réécritures prévues (ANC-012, 018, 019, 104, 123).
- Rejeu des 366 chemins internes par le Worker du dépôt devant `next start` : mêmes chemins et mêmes statuts que sur #123. Les 40 destinations nouvelles ou re-ciblées : 200 direct, canonique auto-référente, langue de la source ; 2 en `noindex, follow` (hubs EN horlogerie et santé, même statut que la destination fausse remplacée).
- Densité : au plus 3 liens nouveaux par page, #123 compris ; aucune cible liée deux fois sur une page touchée.
- Playwright (Chromium local) : `machine-selector`, `sommaire-blog`, `navigation-pages-longues` : 81/81 ; `internal-links`, `internal-links-all`, `cta-destinations` : 23 réussis, 1 échec préexistant (CTA « Découvrir nos studios » absent de l'accueil, déjà absent du build de `main`).
- Collisions de fichiers avec les PR ouvertes : #119 (`metaTitle`, ligne 7) contre `content` (ligne 16) dans 4 fichiers : pas de recouvrement ; #104 (`ia-lumieres-virtuelles` FR, même correctif horlogerie que `main`) et #64 (évolution e-commerce FR et EN, comparatif FR) modifient la même ligne `content` que cette PR : conflit textuel à résoudre au profit de `main` à leur actualisation.

**Supposé** — [Inférence] `www` servira le même HTML que le build local. Cela repose sur des schémas observés.

**Non regardé** — Preview Vercel (SSO) et `www` (R4) : mission Chrome préparée dans la PR, non exécutée ; CI GitHub au moment de l'écriture ; conversions (GA4 non consulté) ; sources hors dépôt inaccessibles : `PSC_LANDINGS_COCONS_FINAL_2026-10-07_V2.zip` complet, `08_PSC_ORBITVU_OWNER_MAP.md`, rapport Pareto du 09/10, audits A, C, E, F et F2 d'origine (le ZIP V4.3 en contient les synthèses 00 à 11, sans 08).

**Suite** — Fusion de #123, puis mise à jour de la base de cette PR ; contrôle Chrome de la Preview ; circuit D15 pour les réécritures et les liens D48 (b) ; à la fusion, dater l'événement D52 dans `ETAT.md` § E. Décisions demandées à Laurent ou Sébastien : 5 groupes listés dans la PR (gamme ancienne, XL v2 / XL G2 et `alphashot-g2`, BlendAI, ancres IA et landing IA, rôle et chiffres de la landing Amazon).

---

## 2026-10-09 · #122 — contrôle de Laurent en Chrome réel : ouverture confirmée ; diagnostic en texte JSON · Claude de Laurent

**Chantier** : pop-in d'engagement (#122, brouillon ; GO_MERGE = NO, GO_PUBLICATION = NO) | **PR** : #122 | **Base** : `main` `3c0909b`, inchangé

**Contrôle de Laurent** — Chrome réel, Preview de `a214dc0`, `/fr/blog/guide-achat-studio-2026?popin-debug=1`, de 17:33 à 17:37 (heure du poste). Constats rapportés par Laurent :
- **Onglet** : vierge, `{"debut":…,"etat":null}`, sans remise à zéro.
- **Fenêtre** : `innerWidth` 1321, requête desktop complète vraie.
- **Conditions** :
  - environ 275 s sur le site ;
  - lecture maximale 92 %, environ 87 % à la sortie ;
  - cookie `cookie-consent` présent ;
  - aucune autre fenêtre affichée.
- **Événements reçus** :
  - 4 `mouseleave` : 3 sorties par la droite vers le panneau Claude (x = 1322, 1335, 1323), ignorées comme sorties latérales ;
  - 1 sortie par le haut (x = 1324, y = −6) ;
  - aucun signal `approche` : la montée finale était en diagonale vers le coin haut droit.
- **Résultat** : **pop-in ouverte** à la première vraie sortie par le haut ; `etat` passé à `shown` ; `<dialog open>` de 960 × 597.
- **Bilan** : `CODE_BUG_CONFIRMED = NO`. Causes de variabilité relevées par Laurent : page masquée au départ (fenêtre Chrome réduite ou recouverte) ; sorties latérales vers le panneau Claude ; une seule apparition par onglet ; 60 s de session ; 70 % de la page courante.
- Fermeture (X, Échap) et absence de réapparition après rechargement : non rapportées dans ce contrôle.

**Quoi** — Mode `?popin-debug=1` seulement : le détail des lignes `[popin]` est écrit en texte JSON (au lieu d'un objet que les outils de lecture de console affichent « Object »), avec en plus la visibilité de la page (`page`). Comportement hors diagnostic inchangé.

**Fichiers** — `components/engagement/PopinEngagement.tsx`, `e2e/popin-engagement.spec.ts`.

**Protocole de test, à partir de ce contrôle** —
- fenêtre Chrome au premier plan ;
- sortie verticale vers la barre d'onglets, loin du panneau Claude ;
- un nouvel onglet par essai (onglet saisi, pas dupliqué), ou effacement de `pkc_popin_engagement` dans le `sessionStorage` de l'onglet, sur accord, avant un nouvel essai. Un onglet où la pop-in est apparue reste consommé jusqu'à sa fermeture.

**Vérifié** — `npx tsc --noEmit` vert ; ESLint ciblé sans erreur ni avertissement ; Vitest : 27 fichiers, 532 tests ; `verifier-json` : 195 fichiers ; `npx next build` : 386 pages ; `e2e/popin-engagement.spec.ts` : 38/38, dont la lecture du JSON du diagnostic (`pret`, `page`, `desktop`, `secondes`, `lecture`, `cookies`, `autreFenetre`, `dejaAffichee`).
**Supposé** — [Inférence] Les observations intermittentes antérieures relèvent des mêmes causes d'environnement ; non vérifiable, le `sessionStorage` des autres onglets n'étant pas accessible. Cela repose sur des schémas observés.
**Non regardé** — Chrome sous macOS ; plein écran.

**Suite** — Compléter le contrôle de la Preview : fermeture par X puis rechargement, puis Échap dans un nouvel onglet. Puis décisions HOLD (P4, D42 étape 5, publication après #82) ; fusion sur GO distinct.

---

## 2026-10-09 · #122 — intention de sortie fiabilisée (constat de Laurent en Chrome réel) · Claude de Laurent

**Chantier** : pop-in d'engagement, correction ciblée (mission de Laurent du 09/10, « #122 exit intent ne fonctionne pas en Chrome réel » ; GO_MERGE = NO, GO_PUBLICATION = NO) | **PR** : #122, brouillon, branche `feat/catalogue-engagement-popup` | **Base** : `main` `3c0909b`, inchangé

**Constat** — Laurent, sur la Preview, 60 s et 70 % réunis : la pop-in ne s'affiche pas quand la souris quitte la page par le haut. Les tests Playwright précédents construisaient l'événement de sortie par `dispatchEvent`, taillé pour la règle : ils ne prouvaient rien sur Chrome réel.

**Diagnostic** —
- Chromium 141 fenêtré (Linux X11, écran virtuel), pointeur système déplacé par XTest jusqu'à la barre d'onglets : l'ancienne version `be503f3` s'ouvre aussi (Chromium y rapporte une coordonnée extérieure, `y = -18`). Le défaut n'est pas reproduit dans cet environnement.
- [Inférence] Causes couvertes par la correction, faute de reproduction (cela repose sur des schémas observés) :
  - sortie rapportée à la dernière position intérieure, au-delà des 20 px de l'ancien seuil (comportement prêté à Chrome sous certains systèmes) ;
  - condition desktop évaluée au chargement seulement : fenêtre étroite à l'ouverture (outils de développement, zoom, mise à l'échelle), aucun écouteur posé ;
  - une fenêtre `[role="dialog"]` masquée, présente dans le DOM, bloquait la pop-in ;
  - bord haut atteint sans quitter le document.

**Quoi** — Détection de l'intention de sortie seulement ; design, copy, CTA, `sessionStorage`, 60 s et 70 % inchangés.
- **Signal principal** : `mouseleave` de `document.documentElement` (et `mouseout` sans cible, équivalent), accepté si la sortie se fait par le haut. Accepté : coordonnée négative ; ou position rapportée dans les 80 px du haut, plus proche du bord haut que des côtés, avec une dernière montée continue. Écartés : côtés, bas, barre de défilement, descente.
- **Repli** : la souris atteint les 8 px du haut au terme d'une montée continue d'au moins 40 px, sans bouton enfoncé, avant même de quitter le document.
- **Trajectoire** : dernière suite de pas montants sur 600 ms ; un balayage horizontal (en-tête) l'interrompt ; tremblement latéral léger toléré.
- **Une seule ouverture** : drapeau et retrait des écouteurs au premier déclenchement.
- Écouteurs posés dès qu'un pointeur fin capable de survol est présent ; la largeur de 1 024 px est vérifiée au moment du geste. Mobile et tactile : toujours aucun écouteur.
- Fenêtres bloquantes : seulement celles affichées (`dialog[open]`, `[role="dialog"]` ou `[aria-modal]` visibles, défilement bloqué).
- **Diagnostic** : `?popin-debug=1` dans l'URL écrit en console l'état du surveillant au montage et chaque signal de sortie avec l'état des conditions. Rien n'est stocké ni envoyé.

**Fichiers** — `lib/engagement/regles.ts`, `components/engagement/PopinEngagement.tsx`, `lib/engagement/__tests__/popin-engagement.test.ts`, `e2e/popin-engagement.spec.ts`.

**Rayon d'action** — Surveillant toujours dans le chunk partagé du layout : +6,9 Ko brut et +2,9 Ko gzip par page, FR, EN et de-ch comprises (contre +4,9 et +2,1 Ko ; écart dû aux messages de diagnostic). Aucun texte ni balise ajoutés au HTML prérendu ni au flux RSC. `CookieBanner.tsx`, `pr-checks.yml`, #82 et #117 non modifiés.

**Vérifié** —
- `npx tsc --noEmit` vert ; ESLint ciblé sans erreur ni avertissement ; `verifier-json` : 195 fichiers ; `npx next build` : 386 pages.
- Vitest : 27 fichiers, 532 tests, dont 33 pour la pop-in : sortie haute à coordonnée extérieure, sortie à la dernière position intérieure (0, 30 et 80 px), sorties latérales et basses, barre de défilement, descente, repli, en-tête (horizontal, immobile, clic), petite remontée, trajectoire.
- Playwright Chromium sur `next start` local : `e2e/popin-engagement.spec.ts` 38/38 puis 76/76 sur deux répétitions. Souris uniquement par `page.mouse` (événements `isTrusted` émis par Chromium), plus aucun `dispatchEvent`. Les tests « aucune apparition » attendent le message du surveillant, pour ne pas passer avant l'hydratation.
- Specs de la CI et `youtube-consent` : 89/89.
- **Chromium 141 fenêtré, pointeur système (XTest), build local de la nouvelle tête** : avant 60 s, rien ; 60 s et 30 % de lecture, rien ; sorties gauche, droite, gauche près du haut et basse, rien ; en-tête (montée sur « Solutions », balayage, deux clics), rien ; montée vers la barre d'onglets, ouverture (par le repli, à `y = 2`) ; X, fermée ; rechargement, 100 % et nouvelle sortie haute, rien (« déjà affichée dans la session (dismissed) »).
**Supposé** — [Inférence] La correction couvre le défaut observé par Laurent ; non prouvé, faute de l'avoir reproduit. Cela repose sur des schémas observés.
**Non regardé** — Preview (SSO Vercel) ; Chrome sous Windows et macOS ; plein écran (l'API Fullscreen ne s'est pas appliquée dans l'écran virtuel).

**Suite** — Nouveau contrôle de Laurent sur la Preview, avec `?popin-debug=1` et la console ouverte en cas d'échec : le message indique la condition manquante. Fusion sur GO distinct.

---

## 2026-10-09 · Campagne globale de maillage — 34 liens contextuels (D48 b), correction EN de l'article « lens » (D15) et liens des guides rendus visibles · Claude de Laurent

**Chantier** : maillage et cocons, campagne unique (missions de Laurent du 09/10 : R1 « objectifs photographiques », campagne globale, complément « densité par page », réconciliation V4.3, puis « finition finale » avec GO_CODE ponctuel ; GO_PR_SUPPLÉMENTAIRE, GO_MERGE, GO_PUBLICATION, appels payants = NO) | **PR** : #123, brouillon, « DO NOT MERGE », branche `claude/gracious-cerf-rbj12m` | **Base** : `main` `3c0909b` intégré (fusion de #109)

**Quoi** —
- Liens ajoutés : 34, posés sur des mots existants (D48 b) ; 28 pages sources, 23 cibles ; FR 20, EN 14, de-ch 0 ; 14 P1, 20 P2. Objectif 7 (dont E1, L1, E2 du lot R1), format d'image 5, bijoux 4, netteté 4, cadrage et lunettes 4, horlogerie 2, studio interne et investissement 7, production visuelle 1.
- Retirés après la réconciliation V4.3 (décision de Laurent du 09/10) : F-27-1 et F-27-2 (hub chaussures : lignes D-367 et D-369 du registre, différées après le 26/11, D39, et soumises à CA2), E-ECO-2 (cible jumelle EN d'un article Amazon en mesure, HOLD jusqu'au 23/11), F-ECO-1 (ancre de l'intention I11 vers un article concurrent de F5, gel jusqu'au 23/11). Les 3 fichiers qui ne portaient que ces liens sont identiques à `main`.
- Contrôle des réserves éditoriales : F-BIJ-3 retiré (la phrase d'introduction du guide équipement bijoux annonce le contenu de la page elle-même, « dans ce tutoriel complet », et le lien renvoyait ailleurs) ; E-FLOU-2 : ancre ramenée à « Blurry » (la cible ne traite que du flou, pas du cadrage ; aucun mot modifié) ; F-BIJ-2, F-PROD-1, F-OBJ-2 et F-FLOU-2 conservés (ancre conforme au sujet de la cible ; au plus 2 liens par paragraphe).
- Liens corrigés : 0. Liens existants supprimés : 0. Liens conservés : tous les autres.
- Densité : au plus 3 ajouts par page (une seule page à 3 : bague 8 étapes FR, 2 182 mots, 3 sections, 3 destinations) ; au plus 2 liens par paragraphe ; aucun ajout P2 au-delà de 15 liens de corps pour 1 000 mots. 9 ajouts retirés avant la première livraison pour ces motifs (F-CHA-1, E-CHA-1, E-STU-2, E-STU-3, F-STU-3, E-ECO-1, F-ECO-2, E-OBJ-2, E-PROD-1).
- Article EN `how-to-choose-best-lens-for-product-photography` : `metaTitle`, `h1` et `title`, « packshot(s) » remplacé par « product photography » (D15, D42). Slug, description, texte, FAQ, liens : inchangés.
- Gabarit des guides : classe `guide-content` sur l'introduction et le contenu des étapes (`app/[lang]/guide/[slug]/page.tsx`) et règle de liens dans `app/globals.css` (couche `components`) : couleur `--very-peri-6`, soulignement, survol `--very-peri-7`, contour de focus clavier de 2 px. Cause du défaut : `@tailwindcss/typography` n'est pas chargé, les classes `prose-a:*` ne produisent rien. Plugin non activé ; aucune règle de mise en page des articles reprise.

**Pourquoi** — Recovery Pareto du 09/10 : les cibles retenues cumulaient peu de liens contextuels entrants (format d'image EN : 5 957 impressions sur 90 jours, aucun lien ; bague 8 étapes EN : 3 039, aucun lien). Paire « objectif » : recul de classement daté de mai 2026, aucun lien contextuel ; « product photography » absent de l'article EN alors que les requêtes perdues le contiennent (7 419 impressions d'octobre 2025 à janvier 2026, contre 4 pour « packshot »). Guides : liens indiscernables du texte, défaut préexistant sur `main` (deux guides en échec à la QA Chrome, mission de Laurent du 09/10).

**Fichiers** — 29 JSON `content/{blog,guides}/{fr,en}/**` ; `app/[lang]/guide/[slug]/page.tsx`, `app/globals.css` ; `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Après publication autorisée : lecture informative à J+28, verdict à J+56, sur les 23 cibles contre 5 témoins inchangés (baseline 08/09 → 05/10 : cibles 78 clics, 10 812 impressions, position 11,5 ; témoins 25 clics, 1 370 impressions, position 10,7). Liens contextuels entrants des 23 cibles : 16 → 50. Aucun gain chiffré annoncé.

**Vérifié** (tête finale, build local de la branche) —
- `npx tsc --noEmit` vert ; `verifier-json` : 195 JSON valides ; Vitest 499/499 ; `npx next build` vert (variables factices de la CI) ; `verifier-consequences` : effet local.
- HTML prérendu contre `main` `3c0909b` (actifs CSS neutralisés) : 344 pages identiques au contenu près ; 30 différentes = 28 pages sources (texte identique, liens ajoutés seulement), l'article EN lens (title, H1) et `/en/blog` (titre de la carte) ; en plus, les 47 guides ne diffèrent que par la classe `guide-content`. Canonique, robots, hreflang et `lang` inchangés partout.
- Contre la tête précédente `49ac5c2` : 5 pages différentes, chacune par un lien retiré seulement (les 5 retraits), texte identique.
- Par lien : 34/34 ancres rendues exactes et uniques, cible en 200 direct, canonique auto-référente, même langue, sans `noindex` ; 5/5 retraits absents du rendu, texte conservé.
- Liens de tout le site rejoués (Worker du dépôt devant `next start`) : 366 chemins, statuts identiques à la tête précédente ; hors 200 direct, seulement 3 chemins `alphashot-g2` (D29) et 5 chemins liés depuis des pages EN servies en 410.
- Playwright, Chromium du conteneur : `machine-selector`, `sommaire-blog`, `navigation-pages-longues`, `internal-links` et `mobile-overflow` : 91/92 ; le seul échec, `mobile-overflow` sur `/fr` à 375 px, se reproduit à l'identique sur le build de `main` `3c0909b` (préexistant, accueil non modifié).
- Guides, 7 pages FR, EN et de-ch, 1440 et 390 px : liens `rgb(82, 82, 185)`, soulignés, survol `rgb(77, 94, 167)`, focus clavier `2px solid`, aucun débordement, aucune erreur de page ; contraste du lien sur fond blanc 6,43:1, du survol 6,04:1 ; sur `main`, liens de la couleur du texte, sans soulignement.
- PR ouvertes : aucun fichier commun, sauf avec #27 (branche du 23/09, non fusionnable).
**Supposé** — [Inférence] Chaque ancre décrit le sujet de sa cible : choix éditorial, non mesurable avant publication. Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel (protégée par SSO) ; `www` (R4) ; Firefox et WebKit ; relecture humaine de l'anglais.

**Suite** — CI verte sur la tête finale ; information de Sébastien publiée le 09/10 à 14:16:03 UTC (aucune nouvelle information demandée par Laurent) ; QA Chrome ; délai D15 de 5 jours ouvrés à compter de la dernière condition remplie sur la tête finale ; GO_MERGE distinct ; J0 = publication constatée sur `www`.
## 2026-10-09 · #122 — `main` `3c0909b` intégré, plafond de session réel (`sessionStorage`), temps cumulé sur le site · Claude de Laurent

**Chantier** : pop-in d'engagement (mission de Laurent du 09/10, « #122 — remise à niveau main + vrai cap session + finalisation technique » ; code sur #122 seulement ; GO_MERGE = NO, GO_PUBLICATION = NO) | **PR** : #122, brouillon, branche `feat/catalogue-engagement-popup` | **Base** : `main` `3c0909b` intégré par fusion (`980781c`) ; conflits limités à `JOURNAL.md` et `ETAT.md`, résolus par union (187 entrées de `main` conservées) ; aucun conflit de code

**Quoi** —
- **Une apparition par session**, rechargement et navigation compris : état dans `sessionStorage` seulement, clé `pkc_popin_engagement`, contenu `{ "debut": <instant d'arrivée, ms>, "etat": null | "shown" | "dismissed" | "converted" }`. `shown` à l'apparition ; `dismissed` à la fermeture (X, Échap, fond) ; `converted` au clic Démo ou Catalogue. Tout état non nul empêche une nouvelle apparition.
- **60 s sur le site** : écart entre maintenant et l'instant d'arrivée de la session (horodatage, aucun compteur actif) ; conservé par les navigations internes et les rechargements dans l'onglet ; nouvelle session ou nouvel onglet : zéro.
- **70 % de lecture** : propres à la page courante, remis à zéro à chaque page ; première mesure 250 ms après l'affichage de la page, pour que le défilement de la page précédente ne compte pas.
- `sessionStorage` indisponible (navigation privée stricte, quota) : repli sur la mémoire de la page, sans erreur.
- Design, copy, exclusions, gels, CTA, mesure GA4 : inchangés.

**Pourquoi** — Décision de Laurent du 09/10 : une seule apparition par session, fermeture, clic Démo et clic Catalogue compris ; 60 s minimum sur le site ; 70 % de la page courante ; intention de sortie ; conditions cumulatives.

**Statut vie privée** — `SESSION_STORAGE_USED = functional session-only state`. `PRIVACY_LEGAL_STATUS = NON ÉTABLI`, à intégrer à P4 avant publication. Aucun cookie, aucun `localStorage`, aucun identifiant, aucune URL ni historique de navigation stockés.

**Fichiers** — `lib/engagement/session.ts`, `lib/engagement/activation.ts` (`STOCKAGE_SESSION_AUTORISE = true`), `components/engagement/PopinEngagement.tsx`, `components/engagement/FenetreEngagement.tsx`, `lib/engagement/__tests__/popin-engagement.test.ts`, `e2e/popin-engagement.spec.ts`.

**Rayon d'action** — Inchangé dans sa nature : surveillant dans le chunk partagé du layout, +4,9 Ko brut et +2,1 Ko gzip par page, FR, EN et de-ch comprises (contre +4,4 et +1,9 Ko avant ; comparaison avec un build de `main` à code client identique). Aucun texte ni balise ajoutés au HTML prérendu ni au flux RSC. #117 toujours ouverte : `CookieBanner.tsx` et `pr-checks.yml` non modifiés ; le spec Playwright reste hors de la CI.

**Origine** — `ORIGINE_EMITTED_BY_122 = YES` (`/fr/catalogue-orbitvu-all-in-one?origine=brochure_exit_sitewide`, aucun UTM). `ORIGINE_CONSUMED_BY_82 = NO` : dépendance de #82, non modifiée.

**Vérifié** — Gels relus sur `main` `3c0909b` (`R-UX-LONG.md` § 4 inchangé : accueil 28/10, F5 23/11, Mode et mode-textile 26/11) ; `npx tsc --noEmit` vert ; ESLint ciblé sans erreur ni avertissement ; Vitest : 27 fichiers, 523 tests, dont 24 pour la pop-in ; `verifier-json` : 195 fichiers ; `npx next build` : 386 pages ; Playwright Chromium sur `next start` local : `e2e/popin-engagement.spec.ts` 34/34, dont 9 tests de session (fermeture puis rechargement, clic Démo, clic Catalogue, Échap puis navigation interne, 30 s sur A puis B, temps conservé au rechargement, nouvelle session à zéro, 70 % d'une page précédente ignorés en navigation interne et en chargement complet) ; specs de la CI et `youtube-consent` : 89/89. Contre-épreuve avec `STOCKAGE_SESSION_AUTORISE = false` : les 5 tests qui dépendent du stockage échouent, les 5 autres passent.
**Supposé** — [Inférence] La Preview se comporte comme le build local ; elle est derrière le SSO Vercel. Cela repose sur des schémas observés.
**Non regardé** — Preview et production (R4) ; Firefox et Safari (navigateurs absents du conteneur).

**Suite** — Contrôle humain de la Preview par Laurent, rechargement compris (D42, étape 4) ; P4 avant publication ; validation D42 étape 5 ; publication après celle de la landing #82 ; GO de fusion distinct.

---

## 2026-10-09 · #109 — exception D51 inscrite, QA Chrome 7/7 PASS, fusion autorisée ; #111 fermée sans fusion · Claude de Laurent

**Chantier** : intégrité factuelle (mission « Clôture et publication #109 / fermeture #111 » du 09/10 : GO_MERGE_109, GO_PUBLICATION_109, GO_CLOSE_111_WITHOUT_MERGE, exception D15/D42) | **PR** : #109, branche `fix/factual-integrity-oct-2026` | **Base** : `main` `f03f8ca`, tête contrôlée `81803ad`

**Quoi** — D51 inscrite dans `DECISIONS.md` (texte de Laurent reproduit sans modification). Aucun fichier du site modifié par ce commit : le code fusionné est celui de `81803ad`, contrôlé par Laurent. #109 passe de brouillon à prête et est fusionnée par commit de fusion ; #111 est fermée sans fusion, branche conservée.

**Pourquoi** — QA Chrome de Laurent sur la Preview de `81803ad` : 7 groupes PASS, aucun défaut bloquant (D42, étape 4). Validation de Sébastien (étape 5) non reçue : remplacée pour cette seule PR par l'exception D51, qui ne vaut pas validation de Sébastien. #111 : fusion simulée de `9337135` sur `81803ad` sans effet sur les fichiers du site ; test `claims-roi-sav` repris (en-tête seul différent) ; ses deux entrées JOURNAL présentes mot pour mot ici (08/10, 09/10).

**Fichiers** — `docs/seo-geo/DECISIONS.md` (D51), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — À la fusion : déploiement de production (~3 minutes) ; adresse du showroom, conditions commerciales, délai, garantie, ROI et claims non sourcés corrigés sur les pages servies (voir les entrées du 08/10 et du 09/10).

**Vérifié** — Tête de #109 `81803ad` identique à la tête de la QA Chrome ; CI 4/4 verte, Vercel « success », `mergeable_state` : clean ; `main` `f03f8ca` inchangé (09/10, 12:07 UTC).
**Supposé** — Rien.
**Non regardé** — `www` (R4) : contrôle Chrome de production à faire par Laurent après déploiement.

**Suite** — Après fusion : smoke `sysnext.vercel.app` et contrôle des correctifs servis ; SHA de fusion et résultats consignés dans le commentaire de clôture de #109, puis repris au JOURNAL par la prochaine PR documentaire ; contrôle `www` dans Chrome (Laurent) ; fermeture de #64 sur GO distinct ; #108 à resynchroniser (clés Studios).

---

## 2026-10-09 · #109 — garde `claims-roi-sav` reprise de #111, entrées JOURNAL de #111 conservées ; #111 sans apport propre · Claude de Laurent

**Chantier** : intégrité factuelle (mission V8 de Laurent du 09/10, « finalisation unique #109/#111 » ; cette session est seule à écrire sur #109 et #111) | **PR** : #109, brouillon, branche `fix/factual-integrity-oct-2026` | **Base** : tête `d98c151`

**Quoi** — `lib/__tests__/claims-roi-sav.test.ts` repris tel quel de #111 (`9337135`) ; les deux entrées JOURNAL de #111 (08/10 et 09/10) recopiées sans modification, ci-dessous et à leur date, pour qu'elles survivent à une fermeture de #111 sans fusion.

**Pourquoi** — Fusion simulée de #109 (`d98c151`) et de #111 (`9337135`) : les fichiers du site du résultat sont identiques à ceux de #109 ; seul ce test (et la documentation) distingue #111. Le reporter ici évite une seconde publication des mêmes modifications.

**Fichiers** — `lib/__tests__/claims-roi-sav.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Aucun sur le site. La CI garde contre le retour de « ROI dès le 4e mois » (guide budget, FR, EN, de-ch) et des engagements de service retirés du guide d'achat.

**Vérifié** — voir le commit (tsc, Vitest, `next build`).
**Supposé** — Rien.
**Non regardé** — Preview (SSO) ; `www` (R4).

**Suite** — #111 : fermeture sans fusion sur GO de Laurent, branche conservée.

---

## 2026-10-09 · #111 — `main` `f03f8ca` intégré, valeurs alignées sur #109, garde de test ajustée · Claude de Laurent

**Chantier** : intégrité factuelle, complément de #109 (mission V8 de Laurent du 09/10, « finaliser #109 + #111 », GO_CODE sur ce périmètre, GO_MERGE = NO) | **PR** : #111, brouillon, branche `claude/wizardly-davinci-7i092p-factuel` | **Base** : `main` `f03f8ca` intégré par fusion (`4a69506`)

**Quoi** —
- Fusion de `main` `f03f8ca` : seul `JOURNAL.md` en conflit, fusionné par union (167 + 12 + 1 = 180 entrées).
- Constat : la seconde passe de #109 (`b9698c3`, 08/10) corrige les mêmes lignes plus largement (« seuil de rentabilité dès 500 photos par an », « Hotline française », « Assistance installation gratuite », contrat « interventions on-site illimitées »). Deux versions différentes des mêmes lignes auraient produit un conflit et laissé ces claims dans #111.
- Alignement : `blogBudget.roi.body` et `blogBudget.faq.q5.answer` (FR, EN, de-ch) reprennent mot pour mot les valeurs de #109 ; dans le guide d'achat, le bloc « Avantages support FR » et « Contrat maintenance » est retiré exactement comme dans #109 (même hunk). Le titre « Support Technique France » et la mention « Distributeur officiel Orbitvu France/Suisse » restent ; la garantie relève de #109.
- `lib/__tests__/claims-roi-sav.test.ts` : motifs étendus à la formulation anglaise de #109 (« between 6 and 12 », « guarantee ») ; garde ajoutée contre « on-site illimitées ».

**Pourquoi** — Faits métier du 08/10 (ROI de 6 à 12 mois, jamais garanti ; aucun engagement de service établi) et consigne du 08/10 14:48 « si aucune source ou fait métier explicite ne l'établit : NE PAS L'INVENTER. NE PAS LE CONSERVER PAR DÉFAUT. » Les points « à trancher » de la ligne Academy d'`ETAT.md` (« suivi post-formation », « Formateurs experts 10+ ans », Marie D., Camille R., « plus de 500 entreprises ») sont retirés par #109 : aucune réponse de Sébastien n'est nécessaire pour un retrait.

**Fichiers** — `messages/fr.json`, `messages/en.json`, `messages/de-ch.json` (2 clés par langue), `app/[lang]/blog/guide-achat-studio-2026/page.tsx`, `lib/__tests__/claims-roi-sav.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Fusion de #109 et #111 sans conflit sur les fichiers du site, dans un ordre comme dans l'autre ; après fusion de #109, le diff de #111 se réduit au test et à la documentation. Aucun effet de position annoncé.

**Vérifié** — voir la description de #111 (tests, build, simulation des deux ordres de fusion).
**Supposé** — Rien.
**Non regardé** — Preview (SSO) ; `www` (R4).

**Suite** — Ordre recommandé : #109 puis #111 ; D42 étapes 4 et 5 portées par les mêmes phrases que #109 ; fusion sur GO distinct de Laurent.

---

## 2026-10-09 · Pop-in d'engagement — démo prioritaire, catalogue Orbitvu en repli (desktop, FR) · Claude de Laurent

**Chantier** : pop-in d'engagement (mission de Laurent du 09/10, « Démo prioritaire + catalogue Orbitvu en repli » ; GO code ; GO_MERGE = NO, GO_PUBLICATION = NO) | **PR** : #122, brouillon, branche `feat/catalogue-engagement-popup` | **Base** : `main` `f03f8ca`

**Quoi** — Fenêtre modale desktop, FR, distincte de #82 : « Demander une démo » en CTA principal (`/fr/contact`, cible de tous les CTA démo du site), « Recevoir le catalogue » en CTA secondaire (`/fr/catalogue-orbitvu-all-in-one?origine=brochure_exit_sitewide`, aucun UTM). Apparition une seule fois par session, seulement si trois conditions sont réunies : 60 s sur le site, 70 % de la page lus, puis intention de sortie (souris qui remonte et quitte la fenêtre par le haut). Copy et maquette validées par Laurent, reprises mot pour mot.

**Pourquoi** — Décision de Laurent du 09/10 : démo = conversion prioritaire, catalogue = repli, pop-in = moteur de visibilité des deux ; ni pop-up à l'arrivée, ni minuterie seule, ni mobile, ni formulaire embarqué.

**Fichiers** — `lib/engagement/regles.ts` (routes couvertes, exclusions, gels, seuils, intention de sortie), `lib/engagement/activation.ts` (interrupteurs), `lib/engagement/session.ts` (mémoire de session), `lib/engagement/mesure.ts` (GA4), `components/engagement/PopinEngagement.tsx` (surveillant), `components/engagement/FenetreEngagement.tsx` (fenêtre), `components/engagement/contenu.ts`, `components/engagement/visuel.ts`, `app/[lang]/layout.tsx` (montage), `lib/engagement/__tests__/popin-engagement.test.ts`, `e2e/popin-engagement.spec.ts`.

**Comportement** —
- Desktop au sens du dépôt : 1 024 px et plus (seuil D44), pointeur fin capable de survol. Rien n'est monté en EN ni en de-ch ; sur mobile, aucun écouteur et aucun téléchargement du visuel.
- Exclusions : `/fr/contact`, `/fr/calculateur-roi`, `/fr/calculateur`, `/fr/outil-financement`, `/fr/catalogue-orbitvu-all-in-one`, `/fr/mentions-legales`, `/fr/cgu`, `/fr/confidentialite`, `/fr/academy`, segments de confirmation (`merci`, `confirmation`, `succes`…). Gels (`R-UX-LONG.md`, « aucune modification de la page ») : `/fr` jusqu'au 28/10, `/fr/packshot-e-commerce` jusqu'au 23/11, `/fr/packshot-mode` et `/fr/industrie/mode-textile` jusqu'au 26/11. Aucune levée automatique : une ligne retirée de `ROUTES_GELEES`, sur décision, suffit.
- Pas d'apparition tant que le bandeau cookies attend un choix ou a été rouvert, ni quand une autre fenêtre occupe l'écran (`dialog[open]`, `role="dialog"`, `aria-modal`, défilement bloqué).
- `<dialog>` natif en modal : `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus initial sur « Fermer », focus piégé, Échap, clic sur le fond, retour du focus. Aucune animation, aucun décalage de mise en page (couche supérieure, défilement non bloqué). Fenêtre, texte et visuel chargés seulement quand 60 s et 70 % sont atteints.
- GA4, sans donnée personnelle : `exit_modal_view` (dénominateur, aucun événement existant ne le mesurait), `cta_click` `demo` / `brochure` / `close` (+ `close_method`), `cta_location: exit_modal`.

**Rayon d'action** — `app/[lang]/layout.tsx` est commun à toutes les pages : le surveillant rejoint le chunk JS partagé du layout, soit +4,4 Ko brut et +1,9 Ko gzip par page, FR, EN et de-ch comprises (comparaison avec le build de #109, même base de code client). Aucun texte, aucune image, aucune balise ajoutés au HTML prérendu ni au flux RSC d'une page, gelées comprises. `components/cookies/CookieBanner.tsx` et `.github/workflows/pr-checks.yml` non modifiés, car #117 modifie ces deux fichiers : le bandeau est détecté par son cookie `cookie-consent` et ses événements `open-cookie-banner` / `cookie-consent-update`. En conséquence, le spec Playwright n'est pas encore exécuté par la CI ; à ajouter à `ATTENDUS` après #117. Les tests unitaires le sont.

**Effet attendu** — Aucun avant le GO de publication : `POPIN_PUBLICATION_AUTORISEE = false`, la pop-in n'est montée ni sur la production Vercel ni donc sur `www` ; elle l'est sur les Preview et en local. Après publication, mesure de 7 à 14 jours : impressions, fermetures, clics démo et catalogue, envois du catalogue, demandes de consultant, signaux de baisse de la démo.

**Vérifié** — `npx tsc --noEmit` vert ; ESLint ciblé (`components/engagement`, `lib/engagement`, `layout`, spec) sans erreur ni avertissement ; Vitest : 26 fichiers, 516 tests (dont 21 de la pop-in) ; `verifier-json` : 195 fichiers ; `npx next build` (variables factices) : 386 pages ; Playwright Chromium sur `next start` local : 24/24 pour `e2e/popin-engagement.spec.ts` (conditions, Échap, X, focus, démo, catalogue avec `origine`, aucune requête non GET ni `/api/`, autre fenêtre, aucun décalage, 8 routes hors couverture, bandeau cookies, mobile sans visuel, rendu 1920 × 1080, 1440 × 900 et 1280 × 720), 81/81 pour les specs de la CI (`machine-selector`, `sommaire-blog`, `navigation-pages-longues`). `cookie-banner.spec.ts` « GA4 après acceptation » : en échec en local car `NEXT_PUBLIC_GA_MEASUREMENT_ID` est absent du build ; aucun fichier analytics ou cookies modifié.
**Supposé** — [Inférence] `VERCEL_ENV` vaut `production` au build de production Vercel et `preview` sur les Preview (mécanisme identique à `lib/catalogue/activation.ts` de #82). Cela repose sur des schémas observés.
**Non regardé** — Preview (SSO Vercel) ; production (R4) ; Firefox et Safari (navigateurs absents du conteneur) ; version mobile (hors mission).

**HOLD et décisions ouvertes** —
- **Stockage de session** : la qualification « vie privée » de `sessionStorage` n'est pas établie par la gouvernance (P4 ouvert) ; `STOCKAGE_SESSION_AUTORISE = false`. La mémoire de session est en mémoire du module : elle couvre les navigations internes, pas un rechargement complet ni un nouvel onglet. `SITE_TIME_CROSS_PAGE` est donc partiel : temps cumulé entre pages en navigation interne, remis à zéro par un rechargement complet.
- **`origine`** : non lue par la landing de #82 (qui garde le chemin sans paramètre et les UTM) ; lecture et remontée dans la notification interne à prévoir après la fusion de #82, sans modifier #82 maintenant.
- **Publication** : après la publication de la landing catalogue (#82), sinon le CTA secondaire mène à une 404 ; GO_PUBLICATION distinct.
- **Copywriting FR** : copy validée par Laurent ; validation de Sébastien selon D13 et D42 (étape 5).
- **Visuel** : affiche du film de la gamme Orbitvu (`public/images/hero/orbitvu-gamme-2026-poster.avif`, 23 Ko), déjà publiée sur l'accueil ; droits d'usage du film « supposés » (JOURNAL du 04/10), non établis.

**Suite** — Contrôle de la Preview par Laurent (D42, étape 4 ; 1440 et 1280 px) ; validation D42 étape 5 ; décisions P4 et publication ; fusion sur GO distinct.

---

## 2026-10-09 · #109 — derniers engagements non démontrés retirés (gratuité, « 24h »), descriptions du blog alignées · Claude de Laurent

**Chantier** : intégrité factuelle, successeur de #64 (mission V8 de Laurent du 09/10, « finaliser #109 + #111 sans reposer les questions déjà tranchées », GO_CODE sur ce périmètre, GO_MERGE = NO) | **PR** : #109, brouillon, branche `fix/factual-integrity-oct-2026` | **Base** : tête `a4ce4f9` intégrée par fusion. Une seconde session, distincte de celle qui a ouvert #109, a exécuté la même mission en parallèle ; sa fusion de `main` `f03f8ca` (`04b7823`) recouvrait celle de `d7d1811`, sans écart sur les fichiers du site.

**Quoi** — Complément de l'entrée suivante, hors des 19 fichiers de la seconde passe : « pour un diagnostic gratuit » retiré de `besoins-photographie-produit` ; « Diagnostic gratuit et sans engagement » retiré des deux descriptions de `questionsCles` (FR, EN, de-ch) ; clés inutilisées `contact.trustBadge1` (« Réponse sous 24h ») et `trustBadge3` (« Démo gratuite sans engagement ») supprimées ; `trustBadge2` (« 5000+ entreprises équipées », fait retenu le 08/10) conservée ; descriptions de six articles dans `lib/blog.ts` alignées mot pour mot sur les méta de #109.

**Pourquoi** — Contrôle local du 09/10 : le flux RSC de chaque page sérialise tout le fichier de messages de la langue, si bien que ces chaînes apparaissaient dans le HTML de toutes les pages, y compris celles de #109. Les descriptions de `lib/blog.ts`, lues par la liste du blog et par `RelatedArticles`, reprenaient les anciennes promesses (« Comparatif complet », « pricing »). Démo et diagnostic « gratuits » et « 24 h » avaient déjà été retirés des autres clés par la seconde passe du 08/10.

**Faits métier** — Ceux consolidés dans l'entrée suivante ; aucun n'est repris ni modifié ici.

**Fichiers** — `app/[lang]/besoins-photographie-produit/page.tsx`, `lib/blog.ts`, `messages/fr.json`, `messages/en.json`, `messages/de-ch.json` (namespaces `questionsCles` et `contact` seulement), `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`.

**Rayon d'action** — `lib/blog.ts` alimente `app/[lang]/blog/page.tsx` (liste) et `components/blog/RelatedArticles.tsx` (articles liés, sur les articles et guides) : seules les six descriptions changent, ni slug, ni date, ni `readingTime`. Les clés `contact.trustBadge*` ne sont lues par aucun fichier de `app`, `components` ou `lib` (recherche du 09/10) ; leur suppression ne retire que du flux RSC. Aucune clé de `home` (gel D44), de F5 ou de Mode touchée.

**Effet attendu** — Plus aucune occurrence de « diagnostic gratuit » ni de « Réponse sous 24h » dans le HTML des pages hors accueil, dès le déploiement de la fusion.

**Vérifié** — Après fusion de `a4ce4f9` : voir le message du commit de fusion (tsc, `verifier-json`, Vitest, `next build`, contrôle local `next start`). Avant fusion, sur `04b7823` + ce complément : `npx tsc --noEmit` vert ; `verifier-json` : 195 fichiers valides ; Vitest : 25 fichiers, 495 tests ; `npx next build` (variables factices) : 386 pages ; 42 pages en 200 (FR, EN, de-ch : accueil, contact, mentions légales, besoins, questions clés, page Suisse, Studios, blog, articles), texte visible, `<head>` et JSON-LD contrôlés. Occurrences restantes : accueil (« démo gratuite », « ROI moyen », gel D44), témoignages clients (« il y a 9 mois », « Orbitvu depuis 2018 »), date d'article (2018), « 12 jours » voulu (Studios, guide), « ROI moyen 12-18 mois » de l'article ROI (chantier ROI distinct). Flux RSC : « démo gratuite » ne vient plus que de `home.hero.cta` (gel D44) ; « sans engagement » ne vient plus que de l'offre d'essai BlendAI.
**Supposé** — Que le rendu de la Preview soit identique au rendu local ; la Preview est derrière le SSO Vercel.
**Non regardé** — Preview et production (R4) ; restes déclarés le 08/10, inchangés : Q20/D45, D29, F5, Mode, `home.faq.q7` et `home.hero` (gel jusqu'au 28/10), `foundingDate` et Qualiopi de `organizationSchema()` (accueil, F5, Mode), prix D30 et D25 de `blogStudioIa`, nombres codés en dur de `studios-photo-automatises` (landing #108 en HOLD), `readingTime` de `lib/blog.ts`, `blogPrestataire`, `/industrie` « 2 à 4 semaines » (D10).

**Suite** — #111 empilée sur #109 (fusionner #109 d'abord). Validation D42 : contrôle de la Preview par Laurent (étape 4), puis validation du copywriting FR par Sébastien (étape 5, D13). Aucun GO de fusion.

---

## 2026-10-09 · #109 — `main` `f03f8ca` intégré, « 5000+ » rétabli (erreur de la seconde passe), faits métier consolidés · Claude de Laurent

**Chantier** : intégrité factuelle, successeur de #64 (mission V8 de Laurent du 09/10, « finaliser #109 + #111 », GO_CODE sur ce périmètre, GO_MERGE = NO) | **PR** : #109, brouillon, branche `fix/factual-integrity-oct-2026` | **Base** : `main` `f03f8ca` intégré par fusion (`d7d1811`)

**Quoi** —
- Fusion de `main` `f03f8ca` : seuls `JOURNAL.md` et `ETAT.md` en conflit, fusionnés par union (167 + 12 + 2 = 181 entrées) ; aucun fichier du site en conflit.
- **Correction de l'entrée du 08/10 « seconde passe »** : le retrait de « 5000+ » était une erreur. Valeurs de `main` rétablies à l'identique : `contact.trustStat2Value` et `trustStat2Label` (FR « 5000+ » / « entreprises équipées », EN « 5000+ » / « companies equipped », de-ch « 5'000+ » / « ausgerüstete Unternehmen ») ; `studiosHardware.meta.description` FR et de-ch : « 5 000+ entreprises équipées. » / « 5000+ ausgerüstete Unternehmen. » réinséré à sa place d'origine, sans « ROI moyen 9 mois » ni « Démo gratuite ». La meta EN ne le contenait pas. Les registres de la seconde passe (entrées 554 et 586, hors dépôt) sont à lire avec cette correction.

**Pourquoi** — « 5_000_PLUS = fait métier Sébastien retenu » (Laurent, 08/10, 13:24 UTC). Le seul point ouvert sur ce chiffre était, au JOURNAL du 30/09 (#71), « l'écart « 5 000+ entreprises » (accueil) contre « plus de 500 entreprises » (guide budget) » ; « plus de 500 entreprises » disparaît avec la réécriture de `blogBudget.intro.p2` par #109. Libellé : celui de `main` et de l'accueil, sans portée géographique ni rattachement à Orbitvu ajoutés.

**Faits métier consolidés** (consignés une fois ; formulation et provenance) —
- Sysnext 2001, lancement de PackshotCreator 2004, « PackshotCreator est une marque de Sysnext » : missions de Laurent du 30/09 et du 08/10 ; D33 (25/09, « date de création : 2001 »). `foundingDate` : « FOUNDINGDATE_PATCH = OUT_OF_SCOPE » (30/09), modèle d'entité non tranché.
- Showroom « 198 allée de la Tour, 01700 Beynost », distinct du siège : « fait métier Laurent + Sébastien » (30/09), rappelé le 08/10. Même point que D1 (commune du showroom, Sébastien) : la commune change, la règle éditoriale de D1 (« près de Lyon » hors contact, schema, mentions légales) reste appliquée.
- Orbitvu : distributeur officiel, jamais exclusif (D6) ; « depuis 2023 » (30/09, 08/10).
- Livraison et installation facturées en supplément : D32 (25/09, offre de leasing B2B livrée et installée, France et Suisse), 30/09, 08/10.
- Délai : D32 (25/09) « environ 10 jours » ; le 30/09, Laurent : « délai actuel ≈ 12 jours », « Le chiffre ancien « environ 10 jours » est dépassé par la confirmation du 30/09 », « OLD_D32 = environ 10 jours », « GOVERNANCE_AMENDMENT_REQUIRED = YES » ; le 08/10 : « environ 12 jours, indicatif, NON GARANTI ». Même offre et même point selon Laurent : 12 jours dans le contenu de #109 ; texte de D32 non amendé ; F5 gelée à 10 jours (D37) ; `shippingDetails` de D32 non implémenté.
- Formation facturée séparément ; Essential 4 h à distance, Master 7 h en présentiel (01/10, #71 ; 08/10) ; Qualiopi : « ENTITÉ QUALIOPI = SYSNEXT » (08/10).
- Garantie standard d'un an, extension possible, sans plafond publié (30/09, 08/10).
- ROI « 6–12 mois usuel ; 12–18 mois pour très gros Alphastudio ; jamais comme garantie » (08/10).
- Allemand : accompagnement commercial possible en Suisse, équipe ni bilingue ni native (D33 ; 30/09 ; 08/10) ; espagnol non parlé (D33).
- 5 000+ : ci-dessus.

**Fichiers** — `messages/fr.json`, `messages/en.json`, `messages/de-ch.json` (8 lignes), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Bandeau de `/contact` et meta de Studios (FR, de-ch) conformes au fait retenu. Aucun effet de position annoncé.

**Vérifié** — `verifier-json` : 195 JSON valides ; `npx tsc --noEmit` vert ; Vitest 495/495 ; `npx next build` vert (386 pages) ; HTML prérendu : `/fr/contact`, `/en/contact`, `/de-ch/contact` affichent « 5000+ » / « 5'000+ » et leur libellé ; `<meta name="description">` de `/fr` et `/de-ch/studios-photo-automatises` contient la mention rétablie, celle de `/en` est inchangée ; diff du commit limité aux 8 lignes de `messages`, les autres corrections de #109 sont inchangées.
**Supposé** — [Inférence] Le fait retenu le 08/10 répond au point ouvert le 30/09 (même chiffre, même libellé « entreprises »). Cela repose sur des schémas observés.
**Non regardé** — Preview (SSO) ; `www` (R4). Portées divergentes du même chiffre hors #109 : accueil « en France et en Suisse » (gelé jusqu'au 28/10), `studiosHardware.socialProof.label` « en France et dans le monde » (clé non rendue), page Studios « Clients équipés » (`studios-photo-automatises/page.tsx`, hors des 19 fichiers).

**Suite** — D42 étape 4 (Preview, Laurent) et étape 5 (Sébastien : copywriting FR client-facing, D13) ; fusion sur GO distinct de Laurent ; #111 réconciliée sur les mêmes valeurs (entrée suivante de sa branche).

---

## 2026-10-09 · Landing catalogue All-in-One (#82) : test réel de l'envoi e-mail depuis la Preview, verrous remis · Claude de Sébastien

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Commits** : `4a800f0` (ouverture), `971d0bc` (fermeture)

**Quoi** — Mission de Laurent du 06/10 (« envoi du mail catalogue ») exécutée : deux demandes réelles depuis la Preview de #82, sans CRM, puis `SERVICES_REELS_AUTORISES` remis à `false` et le déploiement de test supprimé.

**Pourquoi** — Vérifier en réel que, sur la Preview, le prospect reçoit l'e-mail du lien et que l'équipe reçoit la notification, consultant compris, avant toute publication.

**Fichiers** — `lib/catalogue/activation.ts` (interrupteur ouvert par `4a800f0`, refermé par `971d0bc`). Vercel : déploiement de test `sysnext-l4az19x4t` (`4a800f0`) supprimé après le test.

**Effet attendu** — Aucun pour le visiteur : production inchangée, page en 404 et API fermée en production ; Preview de nouveau fermée (503).

**Vérifié** —
- Preview `4a800f0` construite (READY) ; formulaire rempli dans Chrome (session Vercel) le 09/10 :
  - A — `TEST PR82 A - a ignorer`, France, sans consultant, prospect `sebastien.jourdan+test-pr82-a@sysnext.com` : écran « Votre catalogue est prêt », « Le lien de téléchargement vous a également été envoyé par e-mail » ;
  - B — `TEST PR82 B - a ignorer`, Suisse, consultant coché, prospect `sebastien.jourdan+test-pr82-b@sysnext.com` : même écran, plus « Votre demande d'échange avec un consultant PackshotCreator a été prise en compte ».
- Resend : exactement 4 envois de test (10:29:47 et 10:30:52 UTC), tous `delivered`, expéditeur `PackshotCreator <sebastien.jourdan@sysnext.com>` ; aucun envoi après la fermeture.
- Boîte `sebastien.jourdan@sysnext.com` (lue par le connecteur Gmail) : les 4 messages en boîte de réception.
  - E-mail prospect : objet « Votre catalogue Orbitvu All-in-One » ; lien `https://videos.packshot-creator.com/catalogues/orbitvu-all-in-one-2026-fr.pdf` ; +33 (0)1 47 42 66 66 et +41 44 580 43 84 ; « Demander une démo » → `/fr/contact`, « Calculer mon ROI » → `/fr/calculateur-roi` ; aucune pièce jointe (6,7 Ko).
  - Notification A : objet `[Brochure] TEST PR82 A - a ignorer`, en-tête « Nouveau lead brochure », fiche complète, « Lien du catalogue envoyé au prospect : confirmé par Resend. »
  - Notification B : objet `[Brochure] TEST PR82 B - a ignorer - DEMANDE À ÊTRE RECONTACTÉ`, en-tête « LE PROSPECT DEMANDE À ÊTRE RECONTACTÉ », « Demande de consultant : OUI ».
- Liens : PDF 200, `application/pdf`, 15 380 434 octets ; `/fr/contact` et `/fr/calculateur-roi` 200 sur `sysnext.vercel.app` et ouverts dans Chrome sur `www` (titres attendus).
- Après fermeture (`971d0bc`, READY, alias de branche) : `POST /api/catalogue` valide → 503 `catalogue_unavailable` ; ancien déploiement `sysnext-l4az19x4t` → 404 `DEPLOYMENT_NOT_FOUND`.
- Aucun appel Pipedrive (code retiré), aucune affaire, aucun lead commercial ; production, Cloudflare, R2, formulaires Contact et ROI non touchés.

**Supposé** — Que le premier clic sur « Recevoir le catalogue » de la demande A, bloqué côté navigateur par « Sélectionnez France ou Suisse » (pays saisi par l'outil sans événement de changement), n'ait rien envoyé : aucune requête n'atteint l'API quand la validation du navigateur échoue, et Resend ne montre aucun envoi supplémentaire.

**Non regardé** — Bandeau « Aperçu de travail, parcours non activé… aucune demande enregistrée ni envoyée » (`CatalogueAllInOne.tsx`, `apercuInterne`) : affiché sur la Preview pendant le test alors que les envois étaient ouverts ; texte à revoir avant la publication. GA4 non testé (cookies non acceptés). Rendu des e-mails sur mobile et dans d'autres messageries que Gmail.

**Suite** — Avant publication : P2 (texte de l'e-mail), P3 (mention du formulaire), P4 (Resend dans la politique de confidentialité), `CATALOGUE_NOTIFICATION_EMAIL` à créer en Production, bandeau d'aperçu, GO de publication et de fusion de Laurent (D42).

---

## 2026-10-09 · Landing catalogue All-in-One (#82) : Pipedrive retiré du parcours brochure, notification à Sébastien · Claude de Sébastien

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Commit** : voir l'historique de #82 (09/10)

**Quoi** — Décision de Sébastien du 09/10 : aucun CRM dans le parcours brochure. Plus aucun appel Pipedrive : `lib/catalogue/pipedrive.ts` supprimé, `crm.ts` devenu `fiche.ts` (contenu de la demande). Parcours : e-mail du lien au prospect, puis notification interne portant la fiche de la demande et le sort de l'e-mail du lien. `CATALOGUE_NOTIFICATION_EMAIL` vaut `sebastien.jourdan@sysnext.com` (Preview de #82) au lieu de `leads@sysnext.com`.

**Pourquoi** — Mission de Laurent du 06/10 (« envoi du mail catalogue », relancée le 07/10) : le code écrivait dans Pipedrive avant tout e-mail, ce qui déclenchait son STOP (« si une écriture Pipedrive est indispensable »). Sébastien a tranché P1 et T1 de Q23 : pas de Pipedrive ; le tri des leads brochure vers le CRM se fait hors du site, par son assistant IA, à partir de la notification. Destinataire changé par Sébastien (T2).

**Fichiers** — `lib/catalogue/services.ts`, `lib/catalogue/gestionnaire.ts`, `lib/catalogue/resend.ts`, `lib/catalogue/fiche.ts` (ex-`crm.ts`), `lib/catalogue/pipedrive.ts` (supprimé), `lib/catalogue/activation.ts`, `lib/catalogue/schema.ts` et `app/api/catalogue/route.ts` (commentaires), `components/landings/catalogue-all-in-one/mesure.ts` (commentaire), `lib/catalogue/__tests__/` (doublure Pipedrive supprimée, scénarios réécrits). Variable Vercel `CATALOGUE_NOTIFICATION_EMAIL` (Preview, branche de #82) modifiée par le tableau de bord le 09/10.

**Effet attendu** — Aucun pour le visiteur tant que `SERVICES_REELS_AUTORISES` est faux. Une fois ouverte, la route n'exige plus `PIPEDRIVE_API_TOKEN` ; elle reste fermée (503) sans `RESEND_API_KEY`, `RESEND_FROM_EMAIL` ou une adresse valide dans `CATALOGUE_NOTIFICATION_EMAIL`, la notification étant désormais la trace de la demande. Contrat de réponse inchangé (`ok`, `pdfUrl`, `emailSent`, `contactRequestAccepted`).

Règles du parcours sans CRM :
- e-mail du lien d'abord, puis notification ; la notification dit si le lien est parti (« confirmé par Resend » ou « NON confirmé, à renvoyer ») ;
- un seul des deux envois confirmé suffit au succès : l'e-mail du lien reste tracé dans le journal d'envoi Resend ;
- aucun des deux confirmé : 500 `technical`, journal `catalogue.aucune_trace`, nouvel essai possible (même `requestId` retraité) ;
- consultant : `contactRequestAccepted` vrai seulement si la notification est transmise ; objet `[Brochure] entreprise - DEMANDE À ÊTRE RECONTACTÉ` et mention en tête, inchangés ;
- fiche : une ligne « Clé : valeur » par information (type, consultant, brochure, pays, entreprise, domaine grand public, produits, page, attribution, date, identifiant), lisible par un programme.

**Vérifié** —
- `npx tsc --noEmit` vert ; eslint de `lib/catalogue`, `app/api/catalogue`, `components/landings/catalogue-all-in-one` : 0 avertissement ; `npx vitest run` : 484/484 (518 avant : tests du contrat Pipedrive retirés, scénarios sans CRM ajoutés).
- Test P : aucun appel `fetch` pendant une demande complète, même avec `PIPEDRIVE_API_TOKEN` présent ; aucune mention de Pipedrive dans les e-mails.
- Contre-épreuves (code remis à l'identique, `cmp`) : succès accepté sans aucune trace → 3 échecs ; sort de l'e-mail présumé dans la notification → 3 échecs.
- Variables de la Preview (lecture par le tableau de bord Vercel le 09/10) : `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `PIPEDRIVE_API_TOKEN` sur Development, Preview et Production ; `CATALOGUE_NOTIFICATION_EMAIL` sur la Preview de la branche seule, relue après modification.
- Resend : domaine `sysnext.com` vérifié (depuis le 14/03), expéditeur de production `sebastien.jourdan@sysnext.com`, envois de production « delivered » le 09/10.

**Supposé** — Que le tri par l'assistant IA de Sébastien lise la notification telle qu'elle est structurée (non vu).

**Non regardé** — Plafond d'envoi du plan Resend : 5 demandes par heure et par adresse IP × 24 h × 2 e-mails = jusqu'à 240 e-mails par jour depuis une seule IP, sur le compte qui sert aussi Contact et ROI. Idempotence : un même `requestId` reçu par deux instances Vercel est traité deux fois (la note Pipedrive assurait ce dédoublonnage ; perte assumée). `/api/contact` et ses écritures Pipedrive : hors périmètre, inchangés.

**Suite** — Test réel contrôlé depuis la Preview (entrée suivante), interrupteurs remis à faux. Avant publication : P2 (texte de l'e-mail), P3 (mention du formulaire), P4 (Resend dans la politique de confidentialité ; Pipedrive n'est plus sous-traitant de ce formulaire), `CATALOGUE_NOTIFICATION_EMAIL` à créer en Production.

---

## 2026-10-09 · #121 — suppressions ciblées sous D50 (ShotFlow FR/EN, Oscaro FR), photographie 3D retirée, `main` intégré · Claude de Laurent

**Chantier** : audit Ubersuggest du 30/09, résiduel factuel (mission V8 de Laurent du 09/10, « reprise immédiate Ubersuggest ») | **PR** : #121, brouillon, branche `seo/ubersuggest-suppressions-factuelles-2026-10-08` | **Base** : `main` `0ca0ba4` intégré (fusion de #113)

**Quoi** — Suppressions seules, sans texte nouveau, sous D50 (exception D13/D42 de Laurent du 09/10) :
- ShotFlow FR (`comment-shotflow-ameliore-suivi-taches-en-temps-reel`) : déjà dans #121, « | -50% de délais » du `metaTitle` et « Réduisez vos délais de 50%, » de la description ; ajoutés : les puces « Les délais d'approbation ont été réduits de 50 %… » et « 40 % du temps de travail économisé… », et dans la FAQ les phrases chiffrées des questions 1 à 5 (étude 2024, 83 %, 47 % ; 3 à 4 semaines, 90 %, 200 déploiements ; enquête 2024, 28 %, Printemps 32 %, 4,2 à 7,8/10 ; 100 000 assets, 1,2 s, 200 utilisateurs, client mode 25 000 assets et 18 % ; 180 clients, 35 %, 15-22 %, 20-25 %, 60 %) et la phrase qui renvoyait à « ces KPIs ».
- ShotFlow EN (`how-shotflow-improves-real-time-task-tracking`) : « Reduce your deadlines by 50%, improve collaboration, and reduce costs. » devient « Improve collaboration and reduce costs. » dans la description, donc dans `og:description` et les cartes du blog (seul accord grammatical : majuscule, virgule) ; « Approval times have been reduced by 50%, speeding up all production. » et « 40% of working time saved thanks to the automation of updates. » retirés ; mêmes suppressions que le FR dans la FAQ.
- Oscaro FR : « , n°1 des pièces auto neuves et d'origine sur internet, » retiré du corps (déjà dans #121).
- Photographie 3D, FR et EN : modifications de #121 retirées, fichiers rendus identiques à `main` (HOLD PACK-D9 intact).

**HOLD — non supprimés, localisation** :
- ShotFlow EN : intertitre H3 « 50% reduction in approval times » (section « ShotFlow: real-time visibility… ») ; section « Case study: a successful transformation » (acteur non nommé, « the results are impressive: », 4 puces 65 %, 50 %, 20 %, 98 %, citation d'un « creative director ») ; FAQ 5, témoignage final ; description, « Supporting testimonies and case studies ». Motif : suppression impossible sans réécriture (intertitre, liste introduite par une phrase) ou témoignage, hors du champ de D50.
- ShotFlow FR : intertitre H3 « 50 % de réduction des délais d'approbation » ; étude de cas (« Après ShotFlow, les résultats sont impressionnants : », 4 puces, citation du directeur créatif) ; FAQ 5, témoignage final ; description, « Témoignages et études de cas à l'appui. ».
- Oscaro FR : description, « le leader des pièces auto en ligne » (suppression impossible sans substituer un sujet) ; title et H1 (résultat client, lot C) ; corps : « plus de 4000 LEDs », « jusqu'à 120 kg », « plus de 7000 références », citation sur la baisse des retours et la hausse des ventes, non identifiés comme non sourcés à ce jour.

**Fichiers** — `content/blog/fr/comment-shotflow-ameliore-suivi-taches-en-temps-reel.json`, `content/blog/en/how-shotflow-improves-real-time-task-tracking.json`, `content/blog/fr/oscaro-com-reduit-ses-retours-darticles-commandes-en-ligne-grace-aux-visuels-a-360deg.json`, `docs/seo-geo/DECISIONS.md` (D50), `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Moins d'affirmations chiffrées non sourcées exposées sur 3 articles, leurs cartes de blog et leurs données structurées. Aucun effet de position annoncé.

**Vérifié** —
- `npx tsc --noEmit` vert ; `verifier-json` : 195 JSON valides ; Vitest 486/486 ; `npx next build` vert (386 pages) ; CSS identique à `main`.
- HTML prérendu contre `main` `0ca0ba4` (identifiant de build neutralisé, scripts retirés) : 363 pages identiques sur 374 ; 11 différentes : les 3 articles, `/fr/blog` et `/en/blog` (carte ShotFlow), 6 articles dont la carte « articles liés » affiche la description ShotFlow. Écarts limités aux suppressions listées.
- JSON-LD : 374 pages, 0 bloc invalide ; 2 pages différentes (ShotFlow FR et EN), champs `Article.description` et réponses de `FAQPage` seulement ; FAQ visible égale à `FAQPage`.
- Rendu local (`next start`, Chromium) des 3 articles et des 2 index, 1440 et 390 px : HTTP 200, un seul H1, 0 débordement, 0 erreur de page ; questions de FAQ ouvertes sans erreur.

**Supposé** — Rien.
**Non regardé** — Preview Vercel (SSO, inaccessible depuis cette session) ; `sysnext.vercel.app` (bloqué par le proxy de la session) ; `www` (R4).

**Suite** — Contrôle Chrome de la Preview (D42, étape 4). Le passage de brouillon à prête pour revue déclenchera une demande de revue automatique `CODEOWNERS` : l'autorisation de Laurent du 09/10 ne vaut que pour #116 et #120. Fusion ensuite, sur le GO conditionnel de Laurent du 09/10. #119 reste en HOLD (D13).

---

## 2026-10-09 · #113 — resynchronisation sur `main` (après #112), retrait D35, fusion ; consignation de la fusion de #112 · Claude de Laurent

**Chantier** : mission de Laurent « V8 — finir Repair Factory #112 + #113 » du 09/10 (GO_CODE limité à la resynchronisation, aux conflits et au retrait du périmètre D35 ; GO_MERGE #113 distinct et conditionnel) | **PR** : #113, branche `claude/focused-hypatia-ygys0g-alt-aria` | **Base** : `main` `67ec946` (fusion de #112)

**Quoi**
1. #112 fusionnée le 09/10 à 08:13:42 UTC, commit de fusion `67ec946` : date consignée comme `STUDIOS_INTERNAL_LINKING_EVENT` (`ETAT.md`, section E) ; #112 passe de B à G.
2. #113 : base passée de la branche de #112 à `main` ; `main` `67ec946` fusionnée dans la branche (conflit sur `JOURNAL.md` seulement, résolu par union).
3. D35 : les 7 ALT traduits de l'article EN protégé `/en/blog/packshot-photography-guide-why-make-product-packshots` sont retirés (commit `f6276a4`) ; le fichier est identique octet pour octet à `main`. Conservés : 7 ALT de-ch, 112 autres ALT EN (45 fichiers), 21 ALT décoratifs vidés, `title` de l'iframe Vimeo, ARIA du sélecteur.

**Pourquoi** — D35 : l'article EN du comparateur F5 reste en l'état jusqu'à la fin de la mesure F5 (J+56 le 23/11). Les 7 ALT y avaient été modifiés le 08/10 par erreur de périmètre ; aucune revue antérieure ne l'avait relevé.

**Fichiers** — `content/blog/en/packshot-photography-guide-why-make-product-packshots.json` (retour à `main`) ; `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Delta de #113 contre `main` : 55 JSON (112 ALT EN sur 45 fichiers, 7 ALT de-ch, 21 ALT décoratifs, 1 `title` d'iframe ; aucun changement hors attributs `alt` / `title`), `MachineCard.tsx`, `MachineModal.tsx`.

**Vérifié** — `main` `67ec946` (09/10, après fusion de #112) ; tête de #113 resynchronisée `e642a68` + ce commit. Delta contre `main` recompté : 55 JSON, 112 ALT EN (45 fichiers), 7 ALT de-ch, 21 décoratifs, 1 `title`, 0 changement hors attributs ; `MachineCard.tsx` et `MachineModal.tsx` identiques à la tête `ab7a0bf` contrôlée le 09/10. `verifier-json` 195 valides ; `tsc` vert ; `next build` vert (386 pages) ; Vitest 486/486. HTML prérendu contre un build de `main` `67ec946` : 47 pages modifiées (41 articles, exactement ceux des JSON de blog touchés ; sélecteur et Studios FR, EN, de-ch) ; identiques à `main` : accueil FR, EN, de-ch, F5 ×3, Mode ×3, hub mode, article D35, 15 URL du cluster AI Act (#96) et les pages sources de sa baseline (`migrer-ancien-packshotcreator` et équivalents). Les 14 guides EN portent leurs ALT dans `introMedia`, champ non rendu par le gabarit : aucune page de guide modifiée. QA Playwright sur build local, 10 URL × 3 viewports : 30/30 PASS (URL 8 et 9 : erreurs de console des intégrations externes seulement, présentes sur `main`). `sysnext` après fusion de #112 (09/10 vers 08:15 UTC) : `smoke.mjs` vert (17 pages, 3 ressources), 6 URL de #112 servies avec le lien attendu.

**Supposé** — QA Chrome réelle de #113 (10/10, 09/10) reprise de la mission de Laurent, non refaite ; la page D35 en était exclue (URL 1 à 10 hors article protégé).
**Non regardé** — `www` (R4) ; relecture EN/DE humaine des ALT (D42).

**Suite** — `smoke.mjs` sur `sysnext` après fusion de #113 ; contrôle Chrome de `www` par Laurent ; fenêtre C11 au plus tard le 15/10 respectée par la fusion.

---

## 2026-10-09 · #112 — exception D49, intégration de `main` et fusion · Claude de Laurent

**Chantier** : mission de Laurent « V8 — finir Repair Factory #112 + #113 » du 09/10 (GO_CODE limité à la resynchronisation, aux conflits et au retrait du périmètre D35 ; GO_MERGE #112 conditionnel) | **PR** : #112, branche `claude/focused-hypatia-ygys0g` | **Base** : `main` `330c022` (fusion de #120)

**Quoi** — `main` `330c022` (#110, #116, #120) intégré par commit de fusion `b41d433` : conflits de `ETAT.md` et `JOURNAL.md` résolus par union. D49 inscrite dans `DECISIONS.md` : exception ponctuelle de Laurent pour #112 (D15 et information préalable de Sébastien non appliquées à cette seule PR). Ligne #112 d'`ETAT.md` mise à jour.

**Pourquoi** — Décision expresse de Laurent du 09/10 (texte intégral en D49). Traçabilité des corrections de régime (a), qui remplace ici l'information préalable de Sébastien : M01, M02, M03 (3 ancres « studio photo automatisé » vers `/fr/studios-photo-automatises`), M30, M31, M32 (ancres horlogerie vers le hub horlogerie, dont 1 de-ch), « photographie commerciale horlogère » (guide bracelet FR, audit E, sans numéro M) vers le hub horlogerie, liens externes (A05, AA5 a, A17, F-098, F-070). Liens de régime (b) publiés au titre de D49 : M04, M05 (Studios), M21, D-044 (hub vin).

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md` ; commit de fusion `b41d433`.

**Effet attendu** — Aucun effet nouveau sur le site par ces commits. Diff de site de #112 identique à la tête `c4c20db` contrôlée (même `patch-id` avant et après l'intégration de `main`).

**Vérifié** — `main` `330c022` ; fichiers de `main` depuis `06b18e2` : aucun fichier du site commun avec #112 ; D49 libre sur `main` ; CODEOWNERS : « la protection de branche n'exige pas de revue ».
**Supposé** — La QA Chrome réelle de #113 (10/10) est reprise de la mission de Laurent ; elle n'a pas été refaite par cette session.
**Non regardé** — `www` (R4).

**Suite** — CI sur la nouvelle tête, puis fusion de #112 ; `STUDIOS_INTERNAL_LINKING_EVENT` = date de cette fusion, à consigner par #113 ; `smoke.mjs` sur `sysnext.vercel.app` après déploiement.

---

## 2026-10-09 · D48 — inscription de CA10 (a) + (b) dans DECISIONS.md, par #112 · Claude de Laurent

**Chantier** : mission de Laurent « V8 — exécution ciblée #112 » du 09/10 (GO_CODE limité à cette inscription ; GO_MERGE, GO_PUBLICATION, GO_CLOUDFLARE_DEPLOY = NO) | **PR** : #112, brouillon, « DO NOT MERGE », branche `claude/focused-hypatia-ygys0g` | **Base** : `main` `06b18e2`

**Quoi** — D48 inscrite en tête de `DECISIONS.md` : CA10 (a) correction d'un `href` existant, ancre inchangée, information de Sébastien ; CA10 (b) lien posé sur un texte existant sans modifier un mot, D15. Datée du 07/10/2026, attribuée à Laurent. Ligne #112 d'`ETAT.md` mise à jour. Aucun fichier du site modifié.

**Pourquoi** — Arbitrage A3 du dossier `PSC_LANDINGS_COCONS_FINAL_2026-10-07` V2 (`11_ARBITRAGES_LAURENT.md`, ZIP hors dépôt, SHA-256 `ef94c420…6024`) : la première PR de vague 1 qui applique CA10 l'inscrit. #112 l'applique : (a) M01, M02, M03, M30, M31, M32 ; (b) M04, M05, M21, et D-044, lien du même type hors du dossier V2. Arbitrages de Laurent du 09/10 : M31 conservé dans #112, #27 non fusionnable en l'état et non fermée ; protocole Studios conservé, son J0 ne bloque pas #112, aucun témoin D47 modifié ; M39 attend une landing IA validée, #105 reste HOLD.

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Aucun effet sur le site. CA10 devient une règle écrite opposable aux PR suivantes.

**Vérifié** — `main` `06b18e2` et tête de #112 `0788f23` avant écriture ; numéro D48 absent de `main`, de la branche et des PR ouvertes ; aucune PR ouverte ne touche `DECISIONS.md` ; texte des deux régimes repris du tableau A3 sans modification.
**Supposé** — Rien.
**Non regardé** — Le reste de `DECISIONS.md` ; les autres lignes d'`ETAT.md`.

**Suite** — D15 pour les liens de régime (b) de #112 non commencé : information de Sébastien à faire par Laurent, après CI verte et Preview contrôlée (D15), puis 5 jours ouvrés sans objection avant tout GO de fusion.

---

## 2026-10-08 · Repair Factory, PR-B — ALT, ARIA et mécanique de langue (B4_1, B4_2, LANG A36/A38, C11) · Claude de Laurent

**Chantier** : SEO/GEO Repair Factory du 08/10 | **PR** : #113, brouillon, « DO NOT MERGE », branche `claude/focused-hypatia-ygys0g-alt-aria`, **empilée sur PR-A (#112)** (mêmes JSON de contenu, champ `content` sur une ligne : se fusionne après PR-A) | **Base** : branche de PR-A

**Quoi** — Deux commits :
1. ALT : 119 ALT en français servis sur 46 articles et guides EN traduits en anglais ; 7 ALT en français de l'article de-ch `leitfaden-packshot-fotografie-warum-packshots-machen` traduits en allemand ; 21 `alt="__wf_reserved_decorative"` (15 fichiers) remplacés par `alt=""` ; `title` de l'iframe Vimeo EN repris de la version FR (F10). Coquille « massacra » (B4-0322) rendue par « mascara » dans l'ALT EN.
2. ARIA et libellés : nom accessible distinct par carte du sélecteur (C11, G-007 à G-009 : « Voir la fiche » suivi du nom de la machine) ; unité « photos » de la modale rendue « Fotos » en de-ch (dette A de PACK-L) ; « Sur devis » rendu « Auf Anfrage » en de-ch. Libellés des secteurs `optics`, `health`, `industrial`, `watchmaking` des fiches (clés brutes en FR et en EN) : retirés de cette PR après l'ouverture de #110 (sprint parallèle, même fichier `app/[lang]/studio-photo/[slug]/page.tsx`), COLLISION_OTHER_SPRINT.

**Pourquoi** — B4 (716 occurrences) et LANG (A01–A38) comptent les mêmes ALT en mauvaise langue (ponts PONT-01, PONT-02 de la réconciliation du 07/10) : une seule correction par occurrence. Registre B4 original absent (`B4_RAW_REGISTER = MISSING`) : seuls les cas prouvés par observation du fichier sont corrigés.

**Fichiers** — 56 fichiers `content/{blog,guides}/{en,de-ch,fr}/**` ; `components/machine-selector/components/MachineCard.tsx`, `components/machine-selector/components/MachineModal.tsx` ; `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Pages EN et de-ch concernées sans ALT en français ; noms accessibles distincts sur 13 cartes (sélecteur FR, EN, de-ch et pages Studios). Effet de classement : aucun attendu en propre (accessibilité, cohérence de langue).

**Vérifié**
- `verifier-json` 195 valides ; `tsc` vert ; `next build` vert (386 pages) ; Vitest 483/483.
- HTML prérendu contre `main` (PR-A + PR-B, après retrait du fichier des fiches) : seules les pages des JSON touchés, le sélecteur et Studios changent ; fiches identiques à `main` ; accueil, F5, Mode, cluster AI Act identiques.
- ALT en français restants sur pages EN : uniquement les 3 pages EN servies en français (décision B1/D9) et les 2 fichiers EN de #109.
- e2e : voir l'entrée PR-A (même build) ; `machine-selector` vert (le spec lit le texte visible, inchangé).

**Supposé** — [Inférence] Les ALT traduits décrivent correctement leur image : la traduction reprend l'ALT français sans vérification visuelle image par image. Cela repose sur des schémas observés.
**Non regardé** — 167 `alt="__wf_reserved_inherit"` (description image par image nécessaire) ; ALT FR jugés trompeurs ou bourrés de mots-clés (B4_3 : réécritures, validation de Sébastien) ; relecture EN et DE humaine (D42).

**Suite** — Fusion après PR-A ; fenêtre C11 (MachineCard sur la cible et le témoin du pilote Studios) : au plus tard le 15/10, sinon après J+56 ; relecture EN/DE.

---

## 2026-10-08 · Repair Factory, PR-A — maillage : ancres, liens et cocons (résiduel V4.3 exécutable) · Claude de Laurent

**Chantier** : SEO/GEO Repair Factory du 08/10 (mission de Laurent, GO_CODE = YES, GO_MERGE = NO) ; registres V4.3 (36 lots, 582 occurrences) et réconciliation du 07/10 | **PR** : #112, brouillon, « DO NOT MERGE », branche `claude/focused-hypatia-ygys0g` ; PR liées : #113 (empilée), #114, #115 | **Base** : `main` `06b18e2`

**Quoi** — Quatre commits, chacun retirable seul :
1. Ancres mal dirigées : A-005 (« horlogerie », ia-lumieres-virtuelles FR) et A-006 (« réussir la photographie de vos montres », guide montre FR) vers le hub horlogerie au lieu du hub bijoux ; jumeau de-ch « Fotografie Ihrer Uhren » vers `/de-ch/branchen/uhren` ; « photographie commerciale horlogère » (guide bracelet FR) vers le hub horlogerie ; libellés EN A-008 (« theoptics And ») et « modus » → « fashion ». Deux fichiers identiques octet pour octet à ceux de #104.
2. Pilote Studios (EPL) : A-001, A-002, A-003 (« studio photo automatisé » qui menait au guide de décision) et N-001, N-002 (liens posés sur une mention existante) vers `/fr/studios-photo-automatises`. Commit isolé : sa fusion fixe le J0 du pilote.
3. Hub vin-spiritueux : D-044 (« bouteilles en verre ») et D-045 (« bouteilles de vin »).
4. Liens externes : retrait du lien, texte conservé (règle AA5 a) pour pixcap FR (F-041, F-042), la balise `<a id="">` sans href (F-043), goaland et wpengine FR et EN (D-020 à D-023) ; « Cloudinary » (FR, EN, de-ch) vers cloudinary.com, « BrightRiver » (EN) vers bright-river.com ; normalisation des URL externes redirigées (A17 : 23 lignes, 78 occurrences, 42 fichiers) ; coquille d'ancre « Alphasmhot » (F-098) ; « Retour au site » du questionnaire (F-070).

**Pourquoi** — Mission du 08/10 : exécuter le résiduel sûr des audits déjà faits, sans nouvel audit. Les quatre landings actuelles (bijoux, IA, vin, Studios) ne sont plus exclues du fait des brouillons #104, #105, #107 et #108. Lignes du registre 582 : E06, A-008, EPL, D-044, D-045, A05, D-020 à D-023, A17 ; constats complémentaires des audits B et E.

**Fichiers** — 52 fichiers `content/{blog,guides}/**` (FR, EN, de-ch) et `app/etude-clients-2026/SurveyForm.tsx` ; `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Après fusion : 4 liens de contenu de plus vers des owners (Studios +2, hub vin +2), 8 ancres redirigées vers la page qui correspond à leur texte (horlogerie +3, Studios +3 au détriment du guide de décision, et leurs jumeaux), aucun lien externe mort ni mal attribué sur les lignes traitées. [Inférence] Effet de classement non chiffrable ; lecture GSC par page à J+28. Cela repose sur des schémas observés.

**Vérifié**
- Fresh-check : `main` `06b18e2` ; PR ouvertes #109 (sprint parallèle, 19 fichiers), #104, #105, #107, #108 (HOLD), #82, #70, #64, #27 ; #110 et #111 (sprint parallèle) ouvertes pendant la mission, aucun fichier commun avec cette PR. Aucun fichier de #109 modifié (fichiers communs exclus ligne par ligne). Fichiers de #27 (non fusionnable, CA2 en attente) modifiés là où le résiduel l'exige.
- Chaque remplacement appliqué par chaîne exacte avec nombre d'occurrences contrôlé ; sérialisation JSON d'origine conservée ; `verifier-json` : 195 fichiers valides.
- URL externes cibles relevées en 200, sans redirection, le 08/10 (curl depuis le conteneur) ; pixcap.com sans résolution DNS ; l'article goaland redirige vers l'index du blog, la ressource wpengine vers un autre article.
- `tsc` vert ; `next build` vert (386 pages, avec PR-B empilée) ; Vitest 483/483.
- HTML prérendu contre `main` (scripts retirés, identifiant de build neutralisé) : seules les pages des fichiers touchés changent ; accueil, F5, Mode et les 15 articles du cluster AI Act identiques.
- Liens rendus, Worker du dépôt rejoué devant `next start` : 0 balise `<a>` sans href (1 sur `main`) ; liens non 200 inchangés (16 vers `alphashot-g2`, D29 ; 2 à double saut, D29 ; 7 depuis des pages EN en 410) ; 3 fragments absents, ceux du témoin du pilote (D47).
- e2e Chromium (machine-selector, sommaire-blog, navigation-pages-longues, internal-links, cta-destinations) : 96 réussis, 1 échec préexistant (`cta-destinations`, CTA « Découvrir nos studios » de l'accueil, relevé par l'audit A le 01/10 ; accueil identique à `main`).

**Supposé** — [Inférence] « bouteilles en verre » (D-044) relève du cocon vin : la page cible traite des bouteilles en verre. Cela repose sur des schémas observés.
**Non regardé** — Preview (SSO) ; `www` (R4) ; Firefox, WebKit ; contenus non traités : liste HOLD de la PR.

**Suite** — Information de Sébastien (CA10 a ; D42, arbitrage final 3 : maillage et liens) ; décision du J0 du pilote Studios (fusion du commit EPL, ou retrait du commit) ; 25 liens vers Studios différés « après lecture du pilote » (D-081 à D-104, D-116) ; GO de fusion distinct.

**Mise à jour du 08/10, finalisation (décision de Laurent)** — Aucune landing nouvelle ni refonte publiée ; #104, #105, #107 et #108 restent HOLD, les pages actuelles bijoux, IA, vin et Studios servent d'owners et de destinations. Un lien vers la page Studios actuelle n'est pas le lancement de la refonte Studios : le J0 du pilote n'est plus une décision préalable à la fusion de cette PR. Sa fusion est consignée comme `STUDIOS_INTERNAL_LINKING_EVENT` (`ETAT.md`, section E), sans baseline payante. Revue finale du diff : 4 liens internes nouveaux (Studios ×2, vin ×2), 7 ancres re-ciblées (Studios ×3, horlogerie ×4 dont 1 de-ch ; correction de l'effet attendu ci-dessus, qui en annonçait 8), 2 libellés EN corrigés sur des cibles inchangées, 0 lien vers `/fr/packshot-e-commerce`, `/fr/packshot-mode` ou l'accueil ; texte visible inchangé hors libellés EN et coquille « Alphasmhot ». Sébastien : information (D42, arbitrage final 3), pas de validation.

---

## 2026-10-09 · Ubersuggest résiduel : #116 fusionnée, #120 intégrée à `main`, décisions de Laurent du 09/10 · Claude de Laurent

**Chantier** : audit Ubersuggest du 30/09, résiduel (mission V8 de Laurent du 09/10, « finalisation #116 et #120 ») | **PR** : #116 fusionnée ; #120 (cette branche) | **Commit de fusion de #116** : `7501f38` (`main`), le 09/10/2026 à 07:14:16 UTC, tête `7841991`

**Quoi** —
- #116 sortie du brouillon puis fusionnée par commit de fusion, tête `7841991` verrouillée. Code des 2 fichiers identique à la tête `13ba3ad`, contrôlée dans Chrome sur la Preview le 09/10 (QA de Laurent : PASS, 4 pages FR/EN, 1440 et 390 px) ; CI 4/4 verte sur `7841991`.
- #120 : `main` `7501f38` intégré dans sa branche ; conflits de `ETAT.md` et `JOURNAL.md` résolus par union ; fichiers du site inchangés (3 `metaTitle` EN, rien d'autre).
- #118 : fermeture sans fusion, son correctif étant fusionné par #116 (HTML identique sur les 374 pages prérendues, mesuré le 09/10).

**Décisions de Laurent du 09/10, consignées sans modification de sens** —
1. Demandes de revue **automatiques** de `CODEOWNERS` autorisées lors du passage de #116 et #120 de brouillon à prêtes pour revue, pour ces deux PR uniquement. Aucune demande manuelle, aucun message direct, aucune relance, aucune attente de validation de Sébastien. Une notification automatique n'est pas une validation métier.
2. **Exception D42 ciblée, #120** : suppression du claim chiffré non sourcé « -50% delay » du `metaTitle` EN de `/en/blog/how-shotflow-improves-real-time-task-tracking`, sans attendre de validation métier complémentaire. Cette exception ne vaut que pour cette suppression : aucun autre claim, aucune prose FR, aucune proposition commerciale. Aucune validation n'est attribuée à Sébastien.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md` (intégration de `main` et consignation) ; fichiers du site de #120 inchangés.

**Vérifié** — Voir l'entrée de contrôle de #120 ci-dessous et la description de la PR.
**Supposé** — Rien.
**Non regardé** — `www` (R4) : contrôle Chrome de Laurent après déploiement. Statut de déploiement Vercel : constaté par le contenu servi seulement.

**Suite** — #119 et #121 restent en HOLD (point D13 des titles FR ; HOLD PACK-D9 ; D42). Après fusion de #120 : `smoke.mjs` sur `sysnext.vercel.app`, puis les 7 pages dans Chrome sur `www`.

---

## 2026-10-08 · Ubersuggest résiduel, PR-B — 3 titles EN raccourcis mécaniquement · Claude de Laurent

**Chantier** : audit Ubersuggest, titles trop longs (mission de Laurent du 08/10, « UBERSUGGEST RESIDUAL CLEANUP », triage du 30/09 réutilisé, aucun nouvel appel Ubersuggest) | **PR** : #120, brouillon, branche `seo/ubersuggest-titres-en-2026-10-08` | **Base** : `main` `06b18e2`

**Quoi** — Champ `metaTitle` de 3 articles EN, chacun remplacé par un texte qui existe déjà :
- `/en/blog/how-to-avoid-blurry-product-photographs` : « How to avoid blurry photos in product photography: causes, solutions, and best practices » (88) devient le H1 de l'article, « How to avoid blurry photos in product photography » (49) ;
- `/en/blog/technique-photograph-jewelry-tutorial` : « How to Photograph Jewelry: Professional Techniques for Jewelers | PackshotCreator » (81) perd son suffixe de marque et devient « How to Photograph Jewelry: Professional Techniques for Jewelers » (63) ;
- `/en/blog/how-shotflow-improves-real-time-task-tracking` : « ShotFlow: Optimize your production monitoring in real time | -50% delay » (71) perd « | -50% delay », chiffre non établi (backlog factuel du triage, n° 4), et devient « ShotFlow: Optimize your production monitoring in real time » (58).

Aucun mot ajouté, aucun claim ajouté, intention inchangée. H1, description, slug et canonical inchangés.

**Pourquoi** — Les 2 seuls titles EN classés SHORTEN_SAFE au triage du 30/09 qui restent mécaniques et hors de toute PR ouverte au 08/10, et le seul claim EN du backlog factuel retirable d'un title par simple suppression, dans un fichier libre. Les titles FR ne sont pas modifiés : la question « un `<title>` relève-t-il du copywriting réservé à Sébastien (D13) ? » reste ouverte (ligne #70 de `ETAT.md`). D13 vise le copywriting français. GSC sur 90 jours au 30/09 (triage) : 5 clics, 1 645 impressions, position 9,3 pour le premier ; 1 clic, 564 impressions, position 30,5 pour le second.

**Fichiers** — `content/blog/en/how-to-avoid-blurry-product-photographs.json`, `content/blog/en/technique-photograph-jewelry-tutorial.json`, `content/blog/en/how-shotflow-improves-real-time-task-tracking.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Titles affichés en entier dans les résultats de recherche. Aucun gain de clics ni de position n'est mesuré ou annoncé ; lecture possible dans GSC à J+28.

**Vérifié** — voir la PR : title, `og:title`, `twitter:title`, canonical et hreflang rendus ; HTML prérendu comparé à `main` ; CSS compilée comparée à `main`.

**Supposé** — [Inférence] Google reprend le title tel quel, sans le réécrire. Cela repose sur des schémas observés.

**Non regardé** — Preview Vercel (SSO) ; `www` (R4) ; CTR avant et après, faute de recul.

**Suite** — GO de Laurent, puis fusion ; information à Sébastien (métadonnées seules, D42, arbitrage final 3). Titles FR : lot de 10 lignes préparé pour Sébastien, hors dépôt, dont le pendant FR du title ShotFlow (« | -50% de délais »).

---

## 2026-10-08 · Ubersuggest résiduel, PR-A — fil d'Ariane hors du `<h1>` des 2 articles à page dédiée (FR et EN, 4 pages) · Claude de Laurent

**Chantier** : audit Ubersuggest du 30/09, résiduel (mission de Laurent du 08/10, lot D), suite de UB-04 (#74) | **PR** : #116 (PR-A), brouillon, « DO NOT MERGE », branche `seo/ubersuggest-tech-h1-dedies-2026-10-08` | **Base** : `main` `06b18e2`

**Quoi** — `comparatif-orbitvu-ortery-styleshoots-2026` et `prestataire-packshot-vs-studio-interne` passaient leur fil d'Ariane dans le prop `title` de `HeroSection`, donc dans le `<h1>`. Le fil passe dans le prop `breadcrumb` introduit par #74 : `<nav>` étiqueté par langue, séparateurs masqués aux lecteurs d'écran, `font-heading` à la place de `font-sans` comme dans #74. Aucun texte visible, aucune clé de `messages/*.json`, aucun title ni description modifiés ; `BreadcrumbList` inchangé.

**Pourquoi** — Défaut laissé hors périmètre par #74 (JOURNAL du 01/10) et inscrit en F4 de `ETAT.md`. Fresh-check du 08/10 sur `main` `06b18e2` : sur les 4 pages, le texte du H1 commence par « Accueil/Blog/Comparatif », « Home/Blog/Comparison », « Accueil/Blog/Guide », « Home/Blog/Guide », avec un `<div>` enfant du `<h1>`.

**Fichiers** — `app/[lang]/blog/comparatif-orbitvu-ortery-styleshoots-2026/page.tsx`, `app/[lang]/blog/prestataire-packshot-vs-studio-interne/page.tsx`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Le H1 des 4 pages ne porte plus que leur titre. Hygiène technique et structure d'accessibilité ; aucun gain de trafic ni de position annoncé.

**Vérifié** —
- Propriété des fichiers : aucune des 15 PR ouvertes au 08/10 (#27, #64, #70, #82, #104, #105, #107 à #115) ne touche les 2 fichiers ni `components/hero/`. `messages/*.json`, modifiés par 6 PR ouvertes, ne sont pas touchés : le libellé du repère reste dans chaque page, comme dans le gabarit d'article.
- `npx tsc --noEmit` vert ; `verifier-json` : 195 JSON valides ; Vitest 483/483 ; `npx next build` vert (variables factices de la CI) ; `verifier-consequences` : effet local.
- HTML prérendu, build de `main` `06b18e2` contre build de la branche, identifiant de build neutralisé, scripts retirés : 374 pages, 370 identiques, 4 différentes, les 4 pages visées. Écart limité au déplacement du fil : `div` dans le `<h1>` devenu `nav` étiqueté juste avant, séparateurs `aria-hidden`, classe de police.
- CSS compilée : 3 feuilles, identiques octet pour octet à celles de `main`.
- Chromium, `next start`, 4 pages, 1440 et 390 px, animations neutralisées : captures de la zone d'en-tête, 0 pixel différent sur les 8 ; police, taille, graisse, interligne, couleur et position du fil identiques ; hauteur de document identique ; 0 débordement, 0 erreur de page.
- `<head>` des 4 pages identique à `main` : title, description, canonical, hreflang, robots, `og:*`, `twitter:*` ; `BreadcrumbList` identique.
- Arbre d'accessibilité (comparatif FR, prestataire EN) : un seul titre de niveau 1, au nom égal au titre de l'article ; repère de navigation « Fil d'Ariane » ou « Breadcrumb », 2 liens, catégorie en texte ; séparateurs absents de l'arbre.
- Playwright, Chromium, `navigation-pages-longues` et `sommaire-blog` sur le build de la branche : 68 sur 69 ; l'échec porte sur `/de-ch/ia-photo-produit` à 1024 px, page non modifiée au HTML identique à `main`, et passe 3 fois sur 3 au rejeu isolé.

**Supposé** — [Inférence] Firefox et Safari suivent le rendu de Chromium : même structure de bloc, mêmes règles CSS. Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel (SSO), `sysnext.vercel.app` et `www` (R4) ; Firefox, Safari, appareils réels.
- Détecté pendant le fresh-check, non modifié : `/{fr,en,de-ch}/studio-photo/selecteur-machines` place un lien de retour « Studios Photo » suivi d'un `<br>` dans son `<h1>`. Hors liste historique de l'audit ; structure différente (lien seul, mise en page centrée) : décision séparée.
- Libellé du repère à migrer vers `messages/*.json`, avec celui du gabarit d'article, quand ces fichiers seront libres.

**Suite** — GO de fusion distinct de Laurent (mission du 08/10 : GO_MERGE = NO). Après fusion : `smoke.mjs` sur `sysnext.vercel.app`, puis les 4 pages dans Chrome sur `www`.
- Doublon : #118, ouverte à 16:17 UTC par une autre session (branche `seo/ubersuggest-residuels-2026-10-08`), porte le même correctif sur les 2 mêmes fichiers, avec un module partagé `lib/blog-fil-ariane.ts` ; #116 a été ouverte à 16:06 UTC, avant elle. Une seule des deux doit être fusionnée : choix de Laurent ; aucune fermeture sans GO.

---

## 2026-10-08 · JSON-LD — `Product.url` et `Offer.url` des fiches de-ch sur l'URL canonique · Claude de Laurent

**Chantier** : sprint SEO/GEO Recovery du 08/10 (mission de Laurent, axe « structured data »), backlog F5 de `ETAT.md` (#55) | **PR** : #110, brouillon, `DO NOT MERGE` | **Branche** : `claude/wizardly-davinci-7i092p` | **Base** : `main` `06b18e2`

**Quoi** — Les 17 fiches `/de-ch/fotostudio/<slug>` déclaraient `Product.url` et `Offer.url` en `/de-ch/studio-photo/<slug>`, qui répond 307 vers la fiche. Ces deux champs prennent l'URL canonique de la fiche, déjà calculée par `getPathname` pour le fil d'Ariane (#55) ; FR et EN inchangés.

**Pourquoi** — Défaut listé au backlog F5 depuis #55 (29/09), confirmé le 08/10 sur un build local de `main` `06b18e2` : relevé des URL internes déclarées dans les JSON-LD des 323 pages du sitemap, statut sans suivre les redirections ; 34 valeurs non 200 : 13 `Product.url` et 13 `Offer.url` (307) sur les fiches du sitemap, 8 `Service.url` (301) sur les hubs `branchen`. Les 4 fiches `delisted`, hors sitemap mais prérendues en de-ch, portaient le même défaut. Les fiches de-ch sont des fiches marchand (`Offer` en CHF) : l'URL de l'offre doit être celle de la page.

**Fichiers** — `app/[lang]/studio-photo/[slug]/page.tsx` (une constante `urlFiche`, partagée par le fil d'Ariane et `productSchema`), `lib/seo/__tests__/json-ld-url-canonique.test.ts` (nouveau), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Aucun avant fusion. Après fusion : `Product.url` et `Offer.url` des 17 fiches de-ch égaux à leur canonique ; aucun autre champ ne change. Lecture : GSC, « Fiches marchand » et « Extraits de produits », filtre `/de-ch/fotostudio/`, J+14 à J+28 après la mise en production. Aucun gain de position ni de clics n'est attendu ni promis.

**Vérifié**
- `npx tsc --noEmit` vert ; `node scripts/seo/verifier-json.mjs` : 195 fichiers valides ; `npx vitest run` : 486/486 (24 fichiers), dont le nouveau test (3/3). Sa règle sur les sources détecte le motif de `main` (URL `/${lang}/studio-photo/…` écrite en dur dans `productSchema`) ; elle exclut nommément `app/[lang]/industrie/[slug]/page.tsx` (voir Non regardé).
- `npx next build` vert (variables factices de la CI), 386 pages.
- `next start` local, avant (`main` `06b18e2`) et après : 56 pages comparées (17 fiches × 3 langues, sélecteur FR et de-ch, `/fr`, `/de-ch`, `/de-ch/branchen/uhren`). 39 identiques ; 17 fiches de-ch différentes sur `Product.url` et `Offer.url` seulement ; statut, `<title>`, canonical, hreflang, `robots`, `BreadcrumbList` et autres blocs JSON-LD identiques.
- Relevé JSON-LD sur le build de la branche : 323 pages, 0 `Product.url` ni `Offer.url` non 200 ; restent les 8 `Service.url`.

**Supposé** — [Inférence] Le comportement 307 de `/de-ch/studio-photo/<slug>` vient du middleware `next-intl` ; le Worker laisse passer les chemins à préfixe de langue, donc la production répond comme le build local. Cela repose sur des schémas observés.
**Non regardé** — `Service.url` des 8 hubs `/de-ch/branchen/*` (`/de-ch/industrie/<slug>`, 301) : laissé en l'état, le gabarit `industrie/[slug]` est touché par #104 et #107 (HOLD) et sert `/de-ch/branchen/mode` (gel Mode jusqu'au 26/11) ; `Service` n'ouvre aucun résultat enrichi. Preview Vercel (SSO), `sysnext.vercel.app` et `www` (R4). Test des résultats enrichis de Google : à faire sur la Preview ou après fusion. Aucun appel payant.

**Suite** — Contrôle de la Preview de-ch (source JSON-LD de 2 fiches) ; fusion sur GO distinct de Laurent ; après fusion, test des résultats enrichis sur `/de-ch/fotostudio/alphashot-pro-g2` et lecture GSC à J+14/J+28. `Service.url` des `branchen` : après la sortie de HOLD de #104 et #107 et le 26/11.

---

## 2026-10-08 · Ubersuggest résiduel — suppressions factuelles minimales (ShotFlow, Oscaro, photographie 3D) · Claude de Laurent

**Chantier** : audit Ubersuggest, backlog factuel du triage du 30/09 (mission de Laurent du 08/10, « RÉCONCILIATION ET RÉPARATION DU TRIAGE DÉJÀ FAIT » ; triage réutilisé, aucun appel Ubersuggest) | **PR** : #121, brouillon, branche `seo/ubersuggest-suppressions-factuelles-2026-10-08` | **Base** : `main` `06b18e2`

**Quoi** — Suppressions seules, sans mot ajouté, dans 4 fichiers qu'aucune PR ouverte ne touche :
- `/fr/blog/comment-shotflow-ameliore-suivi-taches-en-temps-reel` : « | -50% de délais » retiré du title (77 → 60 caractères) ; « Réduisez vos délais de 50%, » retiré de la description, majuscule reportée sur « Améliorez » ;
- `/fr/blog/oscaro-com-reduit-ses-retours-darticles-commandes-en-ligne-grace-aux-visuels-a-360deg` : apposition « n°1 des pièces auto neuves et d’origine sur internet » retirée du corps ;
- `/fr` et `/en/blog/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre` : « brevetés » retiré de « Nos plateaux tournants brevetés » ; phrase « Nos solutions de photos de produits en 3D et nos logiciels dynamiques garantissent le flux de travail le plus rapide et le plus productif possible. » retirée.

**Pourquoi** — Entrées 4 (risque élevé), 6 (risque élevé) et 2 (risque moyen) du backlog factuel du triage : affirmations sans source dans le dépôt. La mission autorise une suppression factuelle minimale dans un fichier qu'aucune PR ne possède, sans claim de remplacement.

**Fichiers** — les 4 JSON ci-dessus, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Ces affirmations ne s'affichent plus : ni dans le résultat de recherche (ShotFlow), ni dans le corps des pages. Aucun gain de trafic ni de position n'est mesuré ou annoncé.

**Vérifié** — voir la PR : carte des fichiers des 20 PR ouvertes ; HTML prérendu comparé à `main` ; title, description, canonical, hreflang, robots, Open Graph et Twitter rendus ; CSS compilée comparée à `main`.

**Supposé** — Rien.

**Non regardé** — Preview Vercel (SSO) ; `www` (R4).
- Non traité, à arbitrer :
  - la FAQ du même article ShotFlow, rendue aussi en `FAQPage` JSON-LD, porte une quinzaine de chiffres sans source (83 %, 47 %, 200 déploiements, 28 %, 100 000 assets, 180 clients…) et un client nommé (« Printemps ») ; idem pour l'intertitre « 50 % de réduction des délais d'approbation ». C'est un chantier éditorial, hors de toute suppression minimale ;
  - description Oscaro, « le leader des pièces auto en ligne » : la retirer impose une reformulation (D13) ;
  - page 2D : le JSON FR est touché par #70 et #119 ; le JSON EN, en `noindex` (D9), n'est pas traité seul pour ne pas faire diverger les deux versions ;
  - description EN de l'article ShotFlow : fichier touché par #120.
- Doublons entre PR ouvertes le 08/10 : #118 et #116 font la même correction (fil d'Ariane des 2 articles dédiés) ; #120 et #119 modifient les 2 mêmes titles EN.

**Suite** — Validation ciblée de Sébastien (D42, arbitrage final 3 : un claim modifié), puis GO de fusion de Laurent ; après fusion, `smoke.mjs` et contrôle Chrome sur `www` des 4 pages.

---

## 2026-10-08 · Repair Factory, PR-D — Worker : BL-042 et BL-018 vers leur équivalent exact (code seul, non déployé) · Claude de Laurent

**Chantier** : SEO/GEO Repair Factory du 08/10 ; E-BL (PACK-W de la réconciliation du 07/10) | **PR** : #115, brouillon, « DO NOT MERGE », branche `claude/focused-hypatia-ygys0g-legacy-worker` | **Base** : `main` `06b18e2`

**Quoi** — `cloudflare-worker/src/index.js` : BL-042, `/ecommerce-jewelry-photography-tutorial` sort de `GONE_PATHS` et redirige en 301 vers `/en/blog/technique-photograph-jewelry-tutorial` (cible déjà utilisée par la variante `/en/blog/…`) ; BL-018, l'ancien article « boostez … 4 erreurs à éviter » redirige vers l'article exact au lieu de l'article voisin « 6 pratiques ». Test `cloudflare-worker/test/e-bl-pack-w.test.ts`.

**Pourquoi** — Rapport E-BL (simulation sur 112 URL à backlinks) : BL-042 en 410 avec équivalent existant (correspondance HIGH), BL-018 vers une cible voisine. Simulation ≠ erreur live : comportement `www` non contrôlé (R4).

**Fichiers** — `cloudflare-worker/src/index.js`, `cloudflare-worker/test/e-bl-pack-w.test.ts`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Après déploiement seulement (non autorisé par cette mission) : les backlinks de ces deux anciennes URL atteignent l'article correspondant. Les variantes `/amp/` de BL-042 passent de 410 à 404.

**Vérifié**
- R5 : Worker déployé `packshot-router` (modifié le 01/10 à 06:59:54 UTC) lu en lecture seule le 08/10 par l'API Cloudflare ; écart avec le dépôt limité aux commentaires retirés par l'empaquetage et aux enveloppes du bundler : aucune divergence de règle.
- Cibles servies en 200 par `next start`, canonique auto-référente, sans `noindex`, présentes au sitemap.
- Vitest Worker : 6 fichiers, 165 tests verts (`unicite-tables`, `legacy-redirects`, `lot-f`, nouveau test sur les hôtes www, en. et fr.) ; `tsc` vert. Arbre de l'application identique à `main` (build vert de `main` `06b18e2` le 08/10).

**Supposé** — Aucun.
**Non regardé** — Comportement réel de `www` (R4 ; témoins `curl.exe` du poste de Laurent, D23) ; 3 251 URL de l'inventaire E-BL (non fourni) ; BL-027 (cible = source A-002 du pilote Studios), BL-045 et BL-048 (images, décision P0-D KEEP_410), BL-071 et BL-091 (gel Mode, 26/11).

**Suite** — Gate de date Worker (`EBL_EARLIEST_WORKER_GATE`, 09 ou 10/10) et lectures lot F et P0-D/E à consigner ; témoins `www` avant et après ; GO de fusion puis GO de déploiement distincts (D4).

---

## 2026-10-08 · Intégrité factuelle — résidus hors #109 : ROI « dès le 4e mois » du guide budget, engagements de service du guide d'achat · Claude de Laurent

**Chantier** : sprint SEO/GEO Recovery du 08/10 (mission de Laurent, axe « intégrité factuelle »), complément de #109 | **PR** : #111, brouillon, `DO NOT MERGE` | **Branche** : `claude/wizardly-davinci-7i092p-factuel` | **Base** : `main` `06b18e2`

**Quoi** — Deux omissions de #109, sur des lignes qu'elle ne touche pas :
- `blogBudget.roi.body` et `blogBudget.faq.q5.answer` (FR, EN, de-ch) : « le ROI est atteint dès le quatrième mois » et « dès le 4e mois » retirés ; ROI « généralement entre 6 et 12 mois selon le volume », indicatif et sans garantie. La FAQ alimente le `FAQPage` de la page ;
- `guide-achat-studio-2026`, bloc « Support Technique France » : « Réponse < 2h ouvrées », « Intervention 24-48h (France métropolitaine) » et « Pièces détachées : Stock FR, livraison 24h » retirés ; « Interventions sur site : selon le contrat de maintenance » renvoie au contrat décrit juste en dessous.

**Pourquoi** — Faits rappelés par Laurent le 08/10 : ROI de 6 à 12 mois en usage courant, jamais garanti ; aucun engagement de service (délai d'intervention, délai de réponse, pièces sous 24 h) établi. #109 retire ces mêmes engagements du comparatif Orbitvu et le ROI de 4 à 8 mois du guide d'achat, mais ces lignes restent sur `main` et sur la tête `0860462` de #109. `/en/blog/budget-studio-photo-automatise` : 363 impressions et 10 clics du 08/09 au 05/10 (`gsc-crawl-seo`, `gsc_metrics_page`, lecture seule).

**Fichiers** — `messages/fr.json`, `messages/en.json`, `messages/de-ch.json` (2 clés par langue, sérialisation d'origine, 6 lignes), `app/[lang]/blog/guide-achat-studio-2026/page.tsx` (3 lignes → 2), `lib/__tests__/claims-roi-sav.test.ts` (nouveau), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Routes** — `blogBudget` n'est lu que par `app/[lang]/blog/budget-studio-photo-automatise/page.tsx` : `/fr/…` et `/en/…` (200) ; `/de-ch/…` répond 404, les valeurs de-ch (en français) sont alignées par cohérence. Guide d'achat : `/fr/blog/guide-achat-studio-2026` et `/en/…` (même gabarit FR). Aucune page gelée (F5, Mode, accueil, #104, #105, #107, #108).

**Effet attendu** — Aucun avant fusion. Après fusion : FAQ et `FAQPage` du guide budget alignés sur le fait ROI ; trois engagements de service non établis retirés du guide d'achat. Réduction d'un risque factuel ; aucun gain de trafic attendu.

**Vérifié**
- `npx tsc --noEmit` vert ; `verifier-json` : 195 fichiers valides ; `npx vitest run` : 487/487 (25 fichiers), dont `claims-roi-sav.test.ts` 4/4. Les conditions du test échouent sur le contenu de `main` (6 textes ROI, 3 lignes de service).
- `npx next build` vert (variables factices de la CI), 386 pages.
- `next start` local comparé à `sysnext.vercel.app` (production hors Cloudflare) sur les 4 routes : `<title>`, canonical, hreflang, `robots` identiques ; JSON-LD identiques hors la réponse `FAQPage` modifiée (budget FR et EN) ; texte visible : seules les phrases visées diffèrent.
- Chromium local, 1440 et 390 px : sections modifiées visibles, FAQ ouverte lisible, 0 erreur console, 0 débordement horizontal.
- Fusion simulée (`git merge-tree`) avec #109 (`0860462`), #110, #108 et #105 : fichiers du site sans conflit ; `JOURNAL.md` en conflit (entrées en tête, union) ; `ETAT.md` en conflit avec #105 seulement.

**Supposé** — [Inférence] « Hotline française » et la mention d'interventions sur site selon contrat restent exactes : la page décrit déjà un contrat de maintenance « Standard (sur devis) : Hotline » et « Premium (sur devis) : + interventions on-site ». Cela repose sur des schémas observés ; non vérifié auprès de Sébastien.
**Non regardé** — Exclusions explicites de #109 laissées en l'état (« Satisfaction client 98 % », « Accompagnement garanti », « Support prioritaire 2 ans », « recommandé pour 90 % des cas », « Rapport qualité/prix imbattable ») ; « Support technique hotline (illimité pendant 3 mois) » et « interventions on-site illimitées » (bloc « suivi post-formation » à trancher par Sébastien, D) ; `home.faq.q2` de-ch et `home.faq.q7` (accueil gelé jusqu'au 28/10) ; `/industrie` (« 2 à 4 semaines », non démontré faux). Preview Vercel (SSO), `www` (R4). D42 : étapes 4 et 5 non faites.

**Suite** — D42 : contrôle de la Preview par Laurent (desktop, tablette, mobile), validation ciblée de Sébastien sur les 4 phrases modifiées ; fusion sur GO distinct, de préférence après #109 ou avec elle (mêmes pages, lignes disjointes).

---

## 2026-10-08 · Intégrité factuelle — PR #109, seconde passe sur les 19 fichiers · Claude de Laurent

**Chantier** : intégrité factuelle, mission « dernier passage » de Laurent du 08/10 | **PR** : #109, brouillon, `DO NOT MERGE` | **Branche** : `fix/factual-integrity-oct-2026` | **Base de la passe** : tête `0860462` | **Commit** : le commit de cette entrée, « fix: remove residual unsupported factual claims »

**Quoi** — Relecture complète des 19 fichiers déjà touchés par #109. Chaque claim est classé : fait vérifié, fait métier établi, Q20_HOLD, D29_HOLD, hors périmètre, retiré ou neutralisé. Un claim présent sur `main` n'est pas tenu pour valide pour cette seule raison. Registre de la passe : 832 entrées, dont 339 retraits et 393 neutralisations ; 7 faits vérifiés ; 28 faits métier établis ; 25 Q20_HOLD ; 5 D29_HOLD ; 35 hors périmètre conservés.
- Guide d'achat : location, occasion (décote, garantie transférable), BPI, CII, aides régionales, durées et taux de leasing, remise comptant, négociation, mises à jour gratuites (2 à 3 par an), pièces 7 à 10 ans, compatibilité ascendante, support prioritaire 2 ans, démo de 2 à 4 h sur 5 à 10 produits, « standard de l'industrie », « tous IA Ready », compatibilité native BlendAI, « 90 % des cas », « 80 % », AR/VR, export 3D, « économies substantielles » : retirés ou neutralisés. Bloc Premium : 6 à 12 mois, puis « Pour les plus grands Alphastudio, le retour observé peut plutôt se situer entre 12 et 18 mois », sans garantie.
- Article ROI : 80 % de temps réalloué, 500 → 5 000 produits sans embauche, mises à jour gratuites, « bijoux → meubles, même workflow », intégration native BlendAI, « Qualité +30 % », « productivité ×20 » : retirés. Le contenu « 12-18 mois » du chantier ROI reste en dehors de la passe.
- Comparatif Orbitvu : réécrit sans comparaison non sourcée. Il ne publie aucune caractéristique de StyleShoots ni de Photomatics, ne contient ni tableau concurrent ni gamme historique PackshotStudio R3, PackshotMacro ou PackshotRotator (noms et fin « 2018 » sans source), et ne cite ni « experts Orbitvu » ni volumes, temps, mégapixels ou systèmes d'exploitation. « Marque lancée en 2004 par la société française Sysnext » et « depuis 2023 » sont conservés (faits établis le 08/10).
- Articles BlendAI vs Flair, BlendAI vs Photoroom et guide IA photo produit : réécrits en guides de critères. Plus aucune donnée Flair, Photoroom ou Claid, plus aucun pourcentage de fidélité, temps automatique, batch chiffré, API ou intégration native, ni cas client chiffré. Le calcul de rentabilité du guide IA (BlendAI Pro 530 €/mois, ROI 463 %) et l'essai « 14 jours » sont retirés.
- Page Suisse : distance « moins de 2 h de Genève » retirée (le showroom est désormais situé à Beynost, près de Lyon), démonstrations en visioconférence retirées, formation « sur site » remplacée par les formats établis (4 h à distance, 7 h en présentiel), « de référence », JSON-LD local « formations certifiées Qualiopi » → « Sysnext est certifiée Qualiopi ».
- Articles JSON : « évolution e-commerce » FR et EN (gratuité, « jusqu'à 70 % », « +15-20 % de conversion », « -15 % de retours », mises à jour sans frais pendant 3 ans, superlatifs ; lien EN `updateyourpackshot.com` corrigé en `upgradeyourpackshot.com`, le programme de reprise étant vérifié sur `www.upgradeyourpackshot.com/fr/` le 08/10) ; comparatif de solutions FR et EN (huissier, « premier studio », « 142 secondes » contradictoire, superlatifs, FAQ Orbitvu « leader », 30 personnes en R&D, 180 salariés).
- `messages` (FR, EN, de-ch) : 258 clés par langue, dans les seuls namespaces touchés par #109 (`contact`, `legal`, `besoinsPhoto`, `studiosHardware`, `blogBudget`, `blogComparatif`, `blogStudioIa`). Corrigés : « 24 h », « 48 h », « garantie », démo et diagnostic « gratuits », « 5000+ entreprises », ROI moyen de 9 mois remplacé par 6 à 12 mois sans garantie, « Hotline dédiée », formations « certifiées » ou « Qualiopi », « 0 €/an » de maintenance, consommables, « plus de 500 entreprises », données concurrentes de `blogComparatif` (cellules « Non vérifié », listes devenues « Points à vérifier auprès du fabricant »), étude « indépendante » remplacée par « réalisée en 2023 à la demande de PackshotCreator », marché et juridique de `blogStudioIa` (34 millions d'images, 8,9 milliards de dollars, FTC, Californie, FDA, ITAR, « zéro hallucination », « solution propriétaire », « Plus de 100 marques », 75 €/mois). de-ch : Qualiopi et OPCO présentés comme français (D38).
- Qualiopi : 16 formulations corrigées vers « Sysnext est certifiée Qualiopi ; financement OPCO possible selon votre situation ».

**Pourquoi** — Mission du 08/10 : aucun claim conservé par défaut sans source ou fait métier explicite ; comparaisons concurrentes limitées aux faits sourcés ; Qualiopi rattaché à Sysnext ; ROI usuel de 6 à 12 mois, de 12 à 18 mois pour les plus grands Alphastudio, jamais garanti.

**Fichiers** — `app/[lang]/blog/{guide-achat-studio-2026, comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet, orbitvu-vs-concurrents, blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026, blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026, ia-photo-produit-guide-2026}/page.tsx`, `app/[lang]/distributeur-orbitvu-suisse/page.tsx`, `content/blog/{fr/evolution-e-commerce-packshot, en/e-commerce-packshot-evolution, fr/comparatif-de-solutions-de-photographie-automatisee, en/comparison-of-automated-photography-solutions}.json`, `messages/{fr,en,de-ch}.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. Relus sans modification : `app/[lang]/contact/page.tsx`, `components/seo/SchemaOrg.tsx`, `data/navigation/pages-longues.ts`.

**Effet attendu** — Aucun avant fusion. Après fusion : URL, canonical, `robots` et hreflang inchangés ; articles réécrits plus courts (temps de lecture affiché inchangé, aligné sur `lib/blog.ts`, hors périmètre) ; sommaires réalignés sur les titres. Réduction du risque factuel et juridique, pas de gain de trafic attendu.

**Restes, non corrigés dans cette passe**
- Q20_HOLD (cadences, dimensions, charges, versions) : 500+ photos/jour, 200 à 500 produits/jour, 30 s par packshot, 3 s, 90 s, 150 photos/heure, 16 et 20 systèmes, jusqu'à 100 cm (G2) contre 35 cm et 40 cm, 18 cm, 2,5 m, 3 m, 1 tonne, 1 000 kg, 50 et 150 kg, MultiStation, modules 360° et vidéo, « Station M ».
- D29_HOLD : résultats de l'étude 2023 (Alphashot XL PRO V2 contre R3 Mark II) : 78 contre 33 contenus par jour, temps des quatre tests, 19 734 et 8 457 visuels par an, 50,6 jours.
- D30 (aucun prix modifié) : `studiosHardware.faqStudios.q1` « 12 000 € à 150 000 € HT » et `blogBudget` « 56 450 à 150 000 € HT », alors que le catalogue indique 12 450 € et 130 000 € HT (E-Comm Studio+, confirmé par Sébastien le 04/09/2026) ; fourchette « Polyvalent » à confronter au catalogue ; « quelques milliers d'euros » (`besoinsPhoto`) ; prix Alphashot 360 dans `blogStudioIa`, à arbitrer entre D30 et D25.
- Zones interdites : `organizationSchema()` (rendu sur l'accueil, F5 et Mode) porte encore « formations certifiées Qualiopi », `numberOfEmployees` 10 à 50 sans source et `foundingDate` 2004.
- Hors des 19 fichiers : nombres 5 000+, 25 ans et 50+ codés en dur dans `studios-photo-automatises/page.tsx` ; « diagnostic gratuit » codé en dur dans `besoins-photographie-produit/page.tsx` ; descriptions de `lib/blog.ts` (« Comparatif complet… pricing ») ; `availability: InStock` du JSON-LD `Offer` (D30).
- Clés non rendues, laissées en l'état : `studiosHardware.threePillars` (« Formation certifiée », « zéro hallucination, fidélité 100% »), `photoTypes` (« Réduit les retours de 25% »), `socialProof`, `roiCalculator`, `sectors`, `contact.trustBadge*`.
- Dossier Ortery et interview Sysnext 2003 : FAQ « Ortery est-il toujours présent en France ? » conservée.

**Vérifié**
- Fresh-check : #109 ouverte, brouillon, tête `0860462` ; `main` `06b18e2`.
- `messages/*.json` et articles JSON : sérialisation d'origine vérifiée octet pour octet avant écriture ; `verifier-json` : 195 fichiers valides.
- `tsc` vert. Vitest ciblé (`registre-pages-longues`, `coherence-dimensions`, `json-ld-techniques`) : 3 fichiers, 37/37.
- ESLint sur les fichiers modifiés : aucune règle nouvelle ; `react/no-unescaped-entities` déjà présent sur `main` dans ces fichiers (étape de lint non bloquante en CI).
- Ancres : chaque entrée des sommaires réécrits pointe vers un `id` présent une seule fois.
- `next build` vert (variables factices de la CI), 386 pages.
- `next start` local, 25 URL touchées par la passe (FR, EN, de-ch), Chromium 390, 768 et 1440 px : statut 200, aucun débordement horizontal, aucune réponse 4xx locale, aucune ancre de sommaire orpheline ; formulations retirées absentes, nouvelles formulations présentes. Erreurs console : CORS du CDN 360 d'Orbitvu sur les deux articles « évolution », contenu embarqué non modifié par la passe.

**Supposé** — [Inférence] `updateyourpackshot.com` est une faute de frappe : le domaine ne répond pas via le proxy, `upgradeyourpackshot.com` répond en FR et en EN. Cela repose sur des schémas observés.

**Non regardé** — Preview Vercel (SSO) et `www` (R4) ; contrôle humain D42 ; namespaces de `messages` non touchés par #109 (accueil compris) ; dates « Dernière mise à jour » des articles.

**Suite** — Arbitrages demandés : prix (D30 contre catalogue, D25 dans `blogStudioIa`) ; Qualiopi de `organizationSchema()` après le 28/10 ; nombres codés en dur de Studios ; Q20 et D29. Contrôle de la Preview par Laurent, puis validation D42 ; fusion et publication sur GO distincts.

---

## 2026-10-08 · Intégrité factuelle — PR #109, successeur de #64 recréé depuis `main` · Claude de Laurent

**Chantier** : faits métier établis, D33, D25, comparatif Orbitvu | **PR** : #109, brouillon, `DO NOT MERGE` | **Branche** : `fix/factual-integrity-oct-2026` | **Base** : `main` `06b18e2` | **Commits** : `9d66eaa` (faits métier), `927e7cf` (D25), puis le commit de cette entrée (comparatif Orbitvu, registre des pages longues, documentation)

**Quoi** — GO code de Laurent du 08/10. Patch recréé depuis `main` : la branche de #64 n'est ni reprise ni rebasée ; #64 reste ouverte, sa fermeture est un geste séparé, après préservation. Corrections classées A dans la revue READ ONLY du 08/10 :
- showroom : 198 allée de la Tour, 01700 Beynost, distinct du siège : `contact.showroomAddress` et `legal.article2.showroomValue` (FR, EN, de-ch), `localBusinessSchema()` (adresse et coordonnées BAN 45.829766 / 4.998587 ; `@id`, `name`, `hasMap` inchangés), carte de `/contact`, « showroom Paris » et « Paris 11e » du comparatif Orbitvu et du guide d'achat → « showroom près de Lyon » ;
- conditions commerciales : livraison et installation facturées en supplément, formation facturée séparément (`studiosHardware.support.step2description`, `besoinsPhoto.solution.step3.description`, `blogBudget.included` en FR, EN, de-ch ; guide d'achat ; FAQ 2 des articles « évolution e-commerce » FR et EN) ;
- délai : environ 12 jours, indicatif et sans garantie (`studiosHardware.faqStudios.q6.answer` en FR, EN, de-ch ; guide d'achat, FAQ et ligne « Délai de livraison ») ;
- garantie : standard d'un an, extension possible, sans plafond (guide d'achat, FAQ et encadré ; « garanties 5-7 ans » retiré de `comment-calculer-le-roi-…`) ; « interventions technicien on-site » retiré de la couverture décrite dans la FAQ du guide ;
- Orbitvu : distribué depuis 2023 (`blogBudget.intro.p2` en FR, EN, de-ch ; `distributeur-orbitvu-suisse` ; comparatif, ×2) ;
- allemand : accompagnement commercial possible en allemand pour la Suisse (FAQ 1 de `distributeur-orbitvu-suisse`) ;
- ROI du guide d'achat : « généralement 6 à 12 mois selon le volume, sans garantie » à la place de « 4 à 8 mois » (FAQ, bloc « Financement », liste finale), de « 5-6 mois » et « 1-2 mois » (délais de retour) ; « 12 à 18 mois pour les plus grands Alphastudio » ajouté au seul bloc Premium (360 ou XXL), qui annonçait « 2-4 mois » ;
- comparatif Orbitvu : « PackshotCreator (société française, fondée en 2004) » → « PackshotCreator, marque lancée en 2004 par la société française Sysnext » ; `foundingDate` non modifié ;
- D25 : prix concurrents et prix comparés retirés de `blogComparatif` (13 clés) et `blogStudioIa` (5 clés) en FR, EN, de-ch, de `blendai-vs-flair-ai-…`, `blendai-vs-photoroom-…`, `ia-photo-produit-guide-2026` et du comparatif de solutions FR et EN (économie annuelle chiffrée) ;
- comparatif Orbitvu : parts de marché, années de fondation des concurrents, prix, sous-sections « Prix compétitif » et « Rapport qualité/prix imbattable », témoignages Marie D., Thomas L., Camille R., engagements de service (hotline < 2 h, interventions 24–48 h, pièces 24 h), satisfaction 98 %, « ×20 », « ×3 », « 90 % », « 15 000 machines » et « 45 % », ROI « 4–8 mois vs 8–12 mois », superlatifs (« leader européen », « seul fabricant », « unique », « excellence », « premium » du support), verdict « l'emporte », comparaisons dépréciatives envers StyleShoots, lignes « IA Ready », « Support France », « Évolutivité » et « Garantie » des tableaux comparatifs, FAQ « Pourquoi Orbitvu est-il moins cher… » (FAQPage 6 → 5) : contenu final de #64 (`63e1e92`), sauf « (2004–2018) », conservé ;
- `data/navigation/pages-longues.ts` : les six exceptions « PR #64 ouverte » de la famille `blog-dedie-avec-sommaire` renvoient à #109 (successeur de #64), mêmes pages, même gel ; aucun autre changement de registre.

**Pourquoi** — Revue READ ONLY du 08/10 : les 28 clés de `messages` et les 6 pages de blog corrigées par #64 portaient encore sur `main` leur valeur du 01/10, et les formulations fautives étaient servies en production (`sysnext.vercel.app`, relevé du 08/10). Faits établis rappelés par Laurent le 08/10 : SHOWROOM, LIVRAISON, INSTALLATION, FORMATION, DÉLAI, GARANTIE, ALLEMAND, ORBITVU (officiel, jamais exclusif), RELATION_ORBITVU 2023, SYSNEXT 2001, PACKSHOTCREATOR_LAUNCH 2004, ROI (6 à 12 mois usuel, 12 à 18 mois pour les très gros Alphastudio, jamais présenté comme une garantie). D25, D33, D42.

**Fichiers** — `messages/fr.json`, `messages/en.json`, `messages/de-ch.json`, `components/seo/SchemaOrg.tsx`, `app/[lang]/contact/page.tsx`, `app/[lang]/distributeur-orbitvu-suisse/page.tsx`, `app/[lang]/blog/{orbitvu-vs-concurrents, guide-achat-studio-2026, comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet, blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026, blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026, ia-photo-produit-guide-2026}/page.tsx`, `content/blog/fr/evolution-e-commerce-packshot.json`, `content/blog/en/e-commerce-packshot-evolution.json`, `content/blog/fr/comparatif-de-solutions-de-photographie-automatisee.json`, `content/blog/en/comparison-of-automated-photography-solutions.json`, `data/navigation/pages-longues.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Aucun avant fusion. Après fusion : canonical, `robots`, hreflang et URL inchangés ; `Store` du showroom à Beynost ; FAQPage du comparatif Orbitvu à 5 questions (6 sur `main`). Réduction d'un risque factuel et juridique, pas de gain de trafic attendu.

**Correction de la revue du 08/10** — Le rapport READ ONLY ne relevait dans le guide d'achat que deux « ROI 4–8 mois ». Il y en a trois (FAQ, bloc « Financement », liste finale), plus « 2-4 mois » (bloc Premium), « 5-6 mois » et « 1-2 mois » (délais de retour), contraires au même fait métier : traités dans le même lot, extension signalée à Laurent.

**Exclus** — `home.faq.q7` (accueil gelé jusqu'au 28/10 : M5, D44) ; `foundingDate` (2004, inchangé) ; `hasMap` et intitulés « Showroom Lyon » ; dimensions, charges, cadences et versions (D45, Q20 ouverte) ; redirections XL (D29) ; F5 (« environ 10 jours ») ; Mode ; `/industrie` (D10) ; Academy et Qualiopi au-delà de #71 ; « (2004–2018) » (lancement de 2004 établi) ; ROI « 12-18 mois » de `comment-calculer-le-roi-…` (chantier ROI distinct) et « Délai retour : 12-18 mois » du guide (moins de 500 produits par an) ; interview « Créée en 2003, la société Sysnext » ; « distributeur exclusif d'Ortery » ; prix BlendAI seuls de `ia-photo-produit-guide-2026` (530 €/mois dans un calcul de rentabilité, sans prix concurrent) ; dans le guide d'achat, « Satisfaction client 98 % », « Accompagnement garanti », « Support prioritaire 2 ans », « recommandé pour 90 % des cas », « Rapport qualité/prix imbattable ».

**#108 (HOLD)** — modifie les mêmes clés `studiosHardware.support.step2description` et `studiosHardware.faqStudios.q6.answer` (FR supprimées, EN et de-ch réécrites avec les mêmes faits). PR108_FUTURE_REBASE_REQUIRED = YES : à sa resynchronisation, garder sa version. #108 n'est pas modifiée. #104, #105, #107 : HOLD, non touchées.

**Vérifié**
- Préconditions, avant écriture : `main` = `06b18e2` ; #64 ouverte, brouillon, non fusionnée ; #104, #105, #107, #108 ouvertes en brouillon ; branche créée depuis `origin/main`.
- `messages/*.json` : 27 clés par langue, éditées par chemin JSON avec la sérialisation d'origine ; 81 lignes modifiées au total, aucune autre (aucun reformatage). Articles JSON : sérialisation d'origine conservée. `verifier-json` : 195 fichiers valides.
- `tsc` vert. `next build` vert, 386 pages : sur `927e7cf` avant le premier push, puis sur l'état final.
- Vitest ciblé (`registre-pages-longues`, `coherence-dimensions`, `json-ld-techniques`) : 3 fichiers, 37/37.
- `next start` local, 26 URL : formulations retirées absentes du HTML, nouvelles formulations présentes ; canonical, hreflang et `robots` identiques à la production ; `Store` : 198 allée de la Tour, 01700 Beynost, 45.829766 / 4.998587 ; `@id`, `name`, `hasMap` inchangés ; `Organization` : `foundingDate` 2004 et siège 254 rue Vendôme inchangés ; nombre de questions FAQPage identique à la production, sauf le comparatif Orbitvu (5 au lieu de 6).
- Rendu Chromium 390, 768 et 1440 px, 20 pages : 0 erreur, 0 réponse 4xx. Mesures identiques à un build local de `main` `06b18e2`, dont un débordement de 4 px préexistant sur `/fr/blog/comparatif-orbitvu-ortery-styleshoots-2026` en 768 px.
- `e2e/contact-form.spec.ts` (Desktop Chrome, Pixel 5 ; affichage seul, aucun envoi) : 21 réussis, 1 échec (« should expand FAQ accordion », Pixel 5), identique sur `main`.

**Supposé** — Aucun.

**Non regardé** — Preview (SSO) et `www` (R4) ; Firefox, WebKit ; contrôle humain D42, étapes 4 et 5.

**Suite** — Contrôle de la Preview de #109 par Laurent (desktop, tablette, mobile) ; validation selon D42 ; fusion uniquement sur GO distinct ; fermeture de #64 sur GO distinct, branche conservée (ses entrées JOURNAL du 30/09 et du 01/10 n'existent que sur elle) ; micro-patch `home.faq.q7` après le 28/10 ; mise à jour de D32 (« 10 jours »), D1 et `00-BRIEFING.md` (Saint-Bonnet) par leur auteur.

---

## 2026-10-07 · PACK-D9 — pages EN servies en français : gate claims, 0 page traduite, 31 pages en HOLD · Claude de Laurent

**Chantier** : PACK-D9 (D9, LANG_1 de l'audit LANG), mission de Laurent du 07/10 ; source désignée : `PACK_D9_TRANSMISSION_2026-10-07.md` (hors dépôt) | **PR** : #106, brouillon, « DO NOT MERGE », branche `claude/charming-bohr-6tu0j5` | **Base** : `main` `b806291`

**Quoi** — Aucune traduction. Gate claims sur les 21 candidates de la transmission et consignation des arbitrages de Laurent du 07/10 dans `docs/seo-geo/PACK-D9-GATE-2026-10-07.md`. Aucun fichier du site modifié.

**Pourquoi** — La mission interdit de publier en anglais une affirmation dont le niveau de preuve n'est pas suffisant (BlendAI, chiffres non sourcés) :
- 15 hubs : chacun rend au moins un claim litigieux. 11 rendent BlendAI (texte ou badge « BLENDAI.STUDIO » du gabarit sur les cartes `type: 'ia'`). Les 4 autres rendent des chiffres non sourcés : cadences (`automobile-pieces-detachees`, `pieces-techniques-industrie`, `sante-medical`), « Réduction de 70% » (`automobile-pieces-detachees`), « 100% hors ligne » (`defense-securite`). Classement : 15 `UNVERIFIED_RENDERED_CLAIM`, 0 `SAFE_TO_TRANSLATE` ; `casClients` (13 hubs) non rendu, non modifié.
- 3 solutions : chiffres (« 5-50€ », « 20-30% », « divise le coût par 10 », « environ 1€ »), témoignages anonymes et « Cas client : Pompéi » rendus. Laurent, 07/10 : « HOLD les 3 ».
- 3 articles : « leader mondial », « plus de 70 brevets », « plus de 20.000 utilisateurs dans 35 pays », « Nous fabriquons », « Depuis 2001 ». Laurent, 07/10 : « Cela concerne PackshotCreator (solutions Ortery) pas les memes infos pour Orbitvu », puis « HOLD les 3 ».

**Fichiers** — `docs/seo-geo/PACK-D9-GATE-2026-10-07.md` (nouveau), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Aucun effet sur le site. Les 31 pages restent servies en français ; `noindex, follow` conservé sur les 25 pages qui le portent.

**Vérifié** —
- Fresh-check : `main` `b806291` ; 8 PR ouvertes (#105, #104, #82, #79, #70, #65, #64, #27). #104 (tête `33fbf24`) : `data/secteurs.ts`, entrée `bijoux-joaillerie` seule, et 2 JSON ; #105 (tête `a86aa1c`) : aucune page D9. Aucune PR ne touche les fichiers cibles de PACK-D9 hors `data/secteurs.ts` (#104). Jumeaux FR : #70 (D9-01), #27 (D9-03).
- Champs rendus lus dans les gabarits `app/[lang]/industrie/[slug]/page.tsx` et `app/[lang]/solutions/[slug]/page.tsx` ; `casClients` lu par aucun fichier de `app/`, `components/`, `lib/`, `scripts/`.
- `npx tsc --noEmit` vert ; `verifier-json` : 195 JSON valides ; Vitest 483/483 (23 fichiers) ; `npx next build` vert sur `main` `b806291` (variables factices de la CI), 374 pages prérendues.
- HTML prérendu, build de la branche contre build de `main` `b806291`, identifiant de build neutralisé, scripts exécutables retirés : 374 pages, **374 identiques** ; FR 161/161, de-CH 54/54, EN 155/155. Valeurs numériques du texte visible : 0 page différente. `noindex, follow` présent sur les 25 pages D9 qui le portent.
- `verifier-consequences.mjs` : effet local, 3 fichiers, rien qui déborde.

**Supposé** — [Inférence] Les fourchettes décrivant la situation du client (taille de catalogue) ne sont pas des claims sur l'offre ; elles ne changent aucun classement. Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel, `sysnext.vercel.app` et `www` (R4) : aucun rendu modifié. Qualité linguistique : sans objet. Aucun audit LANG, B4 ni des 582 occurrences ; aucun appel payant ; aucun service externe.

**Suite** — Décisions séparées : claims des hubs (BlendAI, cadences Q20.14, ROI en %, conformités ; D10 pour `defense-securite`) ; chiffres, témoignages et cas Pompéi des solutions ; sort des articles de la gamme PackshotCreator/Ortery. Traduction ensuite, depuis la FR retenue (D42, étape 7). D9-05 après #104 ; D9-16 après le 26/11 ; D9-24 à D9-31 selon la transmission.

---

## 2026-10-07 · #102 fusionnée — PACK-L, contrôles post-fusion · Claude de Laurent

**Chantier** : PACK-L, GO de fusion de Laurent du 07/10 | **PR** : #102, fusionnée | **Commit de fusion** : `bf8c1c7` (`main`), le 07/10/2026 à 10:26:33 UTC, parents `35d250c` et `0f257b2` | **Consigné dans** : PR documentaire brouillon, branche `claude/great-hawking-9jywhk`

**Quoi** — Fusion de #102 par commit de fusion (méthode du dépôt), tête `0f257b2` verrouillée à la fusion. L'arbre de `main` est identique à celui de `0f257b2`. Aucun autre changement de code.

**Pourquoi** — GO de fusion de Laurent du 07/10, après une QA humaine de la Preview authentifiée : PASS avec trois réserves, toutes préexistantes (micro-contrôle ci-dessous).

**Micro-contrôle des réserves de la Preview (avant fusion)** —
- A, « Kapazität/Tag : 250 photos » : modale du sélecteur, `{machine.capaciteJour} photos`, unité codée en dur en FR. Ligne identique sur `main` `35d250c` et sur `0f257b2` : préexistante.
- B, « Platzbedarf : Sol/Table robuste » : modale, `{machine.spaceRequired}`, valeur produit en FR (D45, Q20 ; A09 et partie produit de A12, exclues de PACK-L). Ligne identique : préexistante.
- C, infobulle du visualiseur 360° « Regardez de plus près l'Alphashot 360 G2 » : absente du dépôt. Elle vient de la présentation Orbitvu hébergée `W2VVEnzxvCD8t2A8qqJNBQ/217258` (réponse JSONP de `orbitvu.co`, lue le 07/10). `OrbitvuViewer.tsx` et les identifiants sont inchangés : préexistante, contenu externe.

**Fichiers** — aucun fichier du site dans cette consignation ; `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Pages EN et de-CH du périmètre dans leur langue ; FR inchangé.

**Vérifié** —
- Avant fusion : `main` `35d250c` ; tête `0f257b2`, aucun commit depuis ; `mergeable_state = clean` ; CI 4/4 verte ; aucune nouvelle PR ouverte.
- `sysnext.vercel.app` sert le nouveau build à 10:27:47 UTC : marqueur de-CH d'A07 présent. Avant la fusion : cache `HIT`, ancien build.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 10:28:27 UTC : 17 pages et 3 ressources vertes.
- QA ciblée sur `sysnext` (Playwright, 8 URL en 1440 et 390 px, modale ouverte sur 2 machines, métadonnées) : 19/19 après un rejeu. Échec initial : `net::ERR_TIMED_OUT` sur `/de-ch/branchen/elektronik` en 1440 px ; la page répond 200 en 0,54 s et le rejeu isolé passe. Spec PACK-L : 9/9.
- `<head>` de 11 pages identique au build testé de `0f257b2` (title, canonical, hreflang, description, `og:*`, `twitter:*`), dont `/de-ch/blog/ai-act-produktbilder`, `/fr/packshot-e-commerce` et `/fr/studio-photo/alphastudio-compact-v2`.
- Rendu FR de production identique au build de `main` d'avant fusion sur 5 pages témoins : `/fr`, `/fr/packshot-e-commerce`, `/fr/studio-photo/alphastudio-compact-v2`, `/fr/studio-photo/alphashot-xl-g2`, `/fr/industrie`.
- `www` dans Chrome, le 07/10 (rapport transmis par Laurent) : PASS. 9 pages en HTTP 200 : `/de-ch/fotostudio/alphashot-pro-g2`, `/de-ch/fotostudio/alphashot-xl-g2`, `/en/studio-photo/alphashot-pro-g2`, `/de-ch/produktfotografie-bedarf`, `/de-ch/wichtige-fragen-produktfotografie`, `/de-ch/fotostudio/maschinen-finder`, `/de-ch/ia-photo-produit`, `/de-ch/branchen/schmuck`, `/de-ch/branchen/uhren`.
  - `lang` correct ; aucun débordement à 1280 px ni à 390 px (iframe) ; aucune image cassée ; aucun texte FR détecté par script (contrôle heuristique).
  - Modale du sélecteur ouverte sur Alphashot Pro G2 : libellés, avantages et limites en allemand ; 390 px de large à 390 px, sans débordement.
  - Title relevé sur chaque page ; canonical auto-référent ; hreflang : 5 entrées (`fr`, `fr-CH`, `en`, `de-CH`, `x-default`), 4 sur les deux secteurs (pas d'`en`).
  - Aucune anomalie introduite par #102 ; réserves A, B, C visibles à l'identique. Aucune mutation.

**Supposé** — [Inférence] L'échec `ERR_TIMED_OUT` est un délai réseau ponctuel du conteneur. Cela repose sur des schémas observés.
**Non regardé** — Statut de déploiement Vercel du commit de fusion : non lu, aucun outil disponible ; la mise en production est constatée par le contenu servi. Relecture EN et DE (15 groupes) : non rendue.

**Événement concomitant** — Fusion du 07/10 à 10:26 UTC, à ne pas attribuer à une mesure. A30 change `og:*` et `twitter:*` de 17 pages de-CH, dont `/de-ch/blog/ai-act-produktbilder` (J+7 AI Act le 13 ou 14/10). `<title>`, canonical et hreflang inchangés : métadonnées sociales seulement, aucune cause SEO démontrée.

**Suite** — Dettes séparées : A (unité « photos » de la modale), B (valeurs `spaceRequired` en FR, Q20), C (texte de la présentation Orbitvu en FR, hors dépôt ; elle nomme la machine « Alphashot 360 G2 », le catalogue « Alphashot 360 »). PACK-D9 débloqué ; mission menée dans sa propre session.

---

## 2026-10-07 · PACK-L — corrections i18n groupées EN/de-CH des gabarits (A07, A29 et reliquats compatibles) · Claude de Laurent

**Chantier** : PACK-L (LANG_2 partiel et LANG_3 de l'audit LANG), GO de codage de Laurent du 07/10 (« GO CODAGE PACK-L = YES », une seule PR brouillon) | **PR** : brouillon, « DO NOT MERGE », branche `claude/great-hawking-9jywhk` | **Base** : `main` `35d250c` (fusion de #100)

**Quoi** — Traduction EN et de-CH de chaînes que les gabarits servaient en français ou en anglais, sans aucun changement de rendu FR :
- P1 : A07 (cas d'usage des fiches machines, traduction seule) ; A29 (deux guides `besoins-photographie-produit` et `questions-cles-photographie-produit`, libellés à trois langues).
- P2/P3 : A08, A10, A11 (liste, meta description et JSON-LD construits depuis les cas d'usage traduits) ; A13, A15, A16 (ALT du hero, `aria-label` vidéo, galerie de-CH des fiches) ; A17, A18 (`SectorGrid`, secteurs connexes de-CH) ; A19 (`data/solutions.ts`, badges et cas d'usage de-CH) ; A25, A26 (libellés ARIA et ALT de la page IA) ; A27, A28 (ALT) ; A30 (métadonnées de `app/[lang]/layout.tsx`) ; A32 (format de date du blog de-CH) ; A34 (badge de `packshot-industriel`) ; A35 et la seule partie modale de A12 (`MachineModal.tsx`).
- Données : champ parallèle optionnel `useCasesI18n` dans les deux `machines.ts` (16 entrées côté ROI, 15 côté sélecteur) et textes `'de-ch'` des avantages et limites du sélecteur (63 repris tels quels du catalogue ROI, 4 nouveaux). Aucune valeur FR ou EN existante modifiée ; aucune dimension, charge, prix, nom, version ni mapping (D45, Q20).
- Helper `pickListL` dans `lib/locale-text.ts` ; test `lib/__tests__/use-cases-i18n.test.ts`.

**Pourquoi** — Registre LANG A01–A38 : 34 fiches et 2 guides de-CH affichaient du français ou de l'anglais (P1 A07, A29) ; reliquats P2/P3 dans les mêmes gabarits.

**Fichiers** — `app/[lang]/{a-propos,besoins-photographie-produit,blog,ia-photo-produit,industrie,industrie/[slug],packshot-industriel,questions-cles-photographie-produit,studio-photo/[slug]}/page.tsx`, `app/[lang]/layout.tsx`, `app/[lang]/ia-photo-produit/_components/{FeaturesTabs,TestimonialCarousel}.tsx`, `components/calculators/ROICalculator/lib/{machines,types}.ts`, `components/machine-selector/lib/{machines,types}.ts`, `components/machine-selector/components/MachineModal.tsx`, `components/media/BeforeAfterSlider.tsx`, `components/shared/SectorGrid.tsx`, `components/video/VideoPlayer.tsx`, `data/solutions.ts`, `lib/locale-text.ts`, `lib/__tests__/use-cases-i18n.test.ts`.

**Exclus** — LANG_1 (A01 à A06) ; A09 et parties produit de A12 ; A14 (« IA Ready ») ; A20, A21 (`SchemaOrg.tsx`, #64) ; A22 à A24 (accueil gelé jusqu'au 28/10) ; A31, A36 à A38 ; A33 (`Header.tsx` : l'en-tête global modifiait l'accueil de-CH et les landings F5 et Mode de-CH ; fichier rétabli à l'identique de `main`). Entrée `alphastudio-compact-v2` des deux catalogues non touchée (gel F5) ; `PackshotEcommerce.tsx`, `SECTOR_PACKSHOT_MAP`, Worker, redirections, `next.config`, middleware absents du diff. Secteur connexe `mode-textile` laissé tel quel (gel Mode).

**Effet attendu** — Pages EN et de-CH concernées entièrement dans leur langue dès le déploiement ; FR identique. [Inférence] Effet de classement non mesurable séparément des mesures en cours (M5, F5, Mode, AI Act). Cela repose sur des schémas observés.

**Vérifié** —
- `npx tsc --noEmit` vert ; Vitest complet 483/483 (23 fichiers) ; `npx next build` vert, variables factices de la CI.
- HTML prérendu `main` / branche, scripts exécutables retirés, identifiant de build neutralisé : 374 pages, 304 identiques, 70 différentes (48 de-CH, 22 EN). **FR : 161/161 identiques.** Identiques aussi : accueil `fr`, `en`, `de-ch` ; `packshot-e-commerce` et `packshot-mode` en EN et de-CH ; `de-ch/industrie/mode` ; hubs Studios EN et de-CH.
- Lignes retirées des deux `machines.ts` : 67/67 reprises à l'identique, avec seulement un champ `'de-ch'` en plus.
- A30 : le repli de `app/[lang]/layout.tsx` change `twitter:title` et `twitter:description` (et `og:*` de `/de-ch/roi-rechner`) sur 17 pages de-CH sans métadonnées propres, dont l'article AI Act `/de-ch/blog/ai-act-produktbilder` (mesure J+7 du 13 ou 14/10) : à inscrire comme événement concomitant (ETAT E) si la PR est fusionnée avant. `<title>`, meta description, canonical et hreflang de ces pages inchangés.
- Chromium sur `next start` de la branche : spec ad hoc hors dépôt 9/9 (fiches EN et de-CH, gel F5, fiche FR, deux guides de-CH, modale de-CH/EN/FR, métadonnées de-CH, secteurs, page IA, blog, badge) ; specs de la CI `machine-selector`, `sommaire-blog`, `navigation-pages-longues` 81/81.
- Specs `seo`, `language-switch`, `youtube-consent` : 242 réussies, 10 échecs, tous sur des pages dont le HTML est identique à `main` (`/en`, pages FR, `/fr/packshot-bijoux` → 301 vers une page FR identique) ou dont `<title>` et meta description sont identiques à `main` (`/en/ia-photo-produit`, `/en/industrie`).
- Fichiers des PR ouvertes (#27, #64, #65, #70, #79, #82) : aucun fichier de code commun ; seuls `JOURNAL.md` et `ETAT.md` sont partagés.

**Supposé** — [Inférence] Les 10 échecs `seo` / `language-switch` sont préexistants : non rejoués sur `main`, déduits de l'identité du HTML. Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel et `www` (R4). Qualité linguistique : relecture EN et DE humaine requise (D42), liste des chaînes nouvelles remise hors dépôt. Clés brutes `health` et `watchmaking` affichées en FR et EN sur les fiches (hors périmètre, FR et EN inchangés). `ETAT.md` A et B périmés depuis la fusion de #100 et #101 (B liste encore #100 ouverte) : signalé, non corrigé.

**Suite** — Relecture EN et DE ; confirmation de Laurent sur la fiche `alphastudio-compact-v2` EN et de-CH, qui reçoit les corrections du gabarit commun (ALT du hero, `aria-label` vidéo, galerie et libellés de-CH) alors que ses propres cas d'usage restent en FR ; GO de fusion distinct ; après fusion : `smoke.mjs` sur `sysnext.vercel.app`, Chrome sur `www`.

---

## 2026-10-07 · #101 — trois micro-corrections documentaires avant revue de fusion · Claude de Laurent

**Chantier** : gouvernance documentaire, GO de Laurent du 07/10 (« Finalisation PR #101 ») | **PR** : #101, brouillon, « DO NOT MERGE » | **Tête de départ** : `b0bf16f` | **Base** : `main` `30482a0`

**Quoi** — Trois corrections dans les fichiers de #101, sans autre changement :
- `docs/standards/R-UX-LONG.md`, tableau de la forme A : « deux articles dédiés » devient « quatre articles dédiés », c'est-à-dire `studio-ia-vs-ia-generative` et `comparatif-orbitvu-ortery-styleshoots-2026` en FR et en EN. Le tableau s'aligne ainsi sur l'en-tête et sur le recompte de #85 (44 + 39 + 4 + 3 + 3 = 93).
- `BOITE-AUX-LETTRES.md`, note du 07/10 sous Q23 : elle présentait à tort l'auteur comme encore à décider. Laurent l'a décidé le 06/10 (`AUTHOR = PackshotCreator`, `SCHEMA_AUTHOR = Organization`) et #96 l'a implémenté. Seule la réserve éventuelle de Sébastien sur le copywriting FR reste ouverte, pour information. La question historique est inchangée.
- `ETAT.md`, A et B : le nombre de PR ouvertes distingue désormais trois états. Il y en avait 7 au relevé de préparation, avant la création de #101 ; il y en a 8 avec #101 ; il y en aura 7 après une fusion éventuelle de #101, seulement si aucune autre PR ne change. Le relevé historique des 7 PR est conservé. Ligne Q23 de A alignée sur la note rectifiée.

**Vérifié** — `main` `30482a0` ; tête de #101 `b0bf16f`, CI 4/4 verte avant correction ; 8 PR ouvertes (GitHub, 07/10). Les 15 fichiers du cluster AI Act portent `author: "PackshotCreator"` sur `main`. `components/seo/SchemaOrg.tsx` (l. 231) ne produit un `Person` que pour un autre auteur.

**Supposé** — Aucun.
**Non regardé** — Aucun nouvel audit. Documents non reconstruits ; aucune autre ligne de #101 modifiée.

**Suite** — CI sur la nouvelle tête ; revue de fusion par Laurent ; GO de fusion distinct.

---

## 2026-10-07 · Resynchronisation documentaire post-fusions (03/10 → 06/10) et QA `www` du 07/10 · Claude de Laurent

**Chantier** : gouvernance documentaire, GO de Laurent du 07/10 (« PR documentaire consolidée ») | **PR** : brouillon, « DO NOT MERGE », branche `claude/admiring-euler-njxp9x` | **Base** : `main` `30482a0`

**Quoi** — Documentation seule, cinq fichiers : `ETAT.md` (A à H actualisées), `DECISIONS.md` (note d'exécution datée, sans D48), `BOITE-AUX-LETTRES.md` (notes datées sous Q22 et Q23), `docs/standards/R-UX-LONG.md` (statut, 93 pages, exceptions, réserve UX) et ce journal. Aucun code applicatif, aucun contenu éditorial, aucune redirection, aucun Worker, aucun service externe touché ; aucun nouvel audit SEO/GEO ; aucun appel payant.

**Pourquoi** — `ETAT.md` décrivait encore `main` à `1e0901b` et 19 PR ouvertes ; #85, #88 à #92, #96 et #99 y figuraient en brouillon ; D44 et D45 y étaient « non encore applicables » ; Q22 et `R-UX-LONG.md` portaient 90 pages et l'exception #91.

**Fresh-check (07/10, GitHub et `git`)** —
- `main` = `30482a08fd4a6329d26eeed3e6ff2a87523e06b4` (fusion de #85), conforme au dernier état connu.
- 7 PR ouvertes : #27, #64, #65, #70, #79, #82, #100 ; tête de #100 : `78c5e364df6945bdbdd544d6d934c70bf7ea081e`, base `30482a0`, CI 4/4 verte sur la tête.
- Les workflows de CI (`pr-checks`, `garde-journal`, `garde-consequences`) ne se déclenchent que sur `pull_request` : aucun contrôle de CI ne tourne sur `main` lui-même. Dernière CI de #85, sur `0d2633f` : 4/4 verte.

**Fusions vérifiées sur GitHub** (`merged_at`, UTC ; commit de fusion sur `main`) —

| PR | Objet | Commit | Fusion |
|---|---|---|---|
| #87 | UX-GOV : D44, D45, `docs/standards/` | `17a4248` | 03/10 17:51:00 |
| #83 | D45 : référentiel des dimensions | `1bc7195` | 03/10 19:49:00 |
| #86 | CI : Vitest et parcours Playwright | `0ac062b` | 04/10 06:23:59 |
| #95 | Hero de l'accueil, film Orbitvu (Claude de Sébastien) | `9b19e6d` | 04/10 09:10:40 |
| #84 | D44 : sommaire du blog | `1e0901b` | 06/10 10:26:23 |
| #96 | Cluster AI Act (D46) | `8247217` | 06/10 12:41:01 |
| #59, #60, #77 | Incluses dans #96 (têtes `2a36322`, `74ae921`, `a207fe3`, ancêtres de `main`), sans commit de fusion propre | — | 06/10 12:41:03 |
| #89 | A04a : liens Skeelbox | `a168b33` | 06/10 13:29:15 |
| #97 | Note BlendAI non sourcée retirée | `df01b04` | 06/10 14:09:37 |
| #93 | D47 : CTA ROI directs | `6cbb903` | 06/10 14:18:56 |
| #90 | A02 : liens ROI interne | `be8cbea` | 06/10 14:24:55 |
| #98 | Documentation : clôture #97, #93, #90 | `c236705` | 06/10 14:56:50 |
| #92 | A04b : liens morts, MacroSphère | `2a53727` | 06/10 15:17:30 |
| #91 | A03 : quatre liens de guides | `3b427d7` | 06/10 15:52:23 |
| #88 | C08 : `hreflang` de l'article IA | `62b3b8d` | 06/10 16:03:55 |
| #99 | D36 : `noindex` de l'origine, partie Next | `e830419` | 06/10 16:44:29 |
| #85 | D44 : barre collante, 93 pages | `30482a0` | 06/10 17:46:14 |

Fermées sans fusion : #94 (06/10 14:59:03), #67 (06/10 16:56:07). Le commit de fusion porte parfois une seconde de moins que `merged_at` (#90, #92, #88, #99, #85) ; l'entrée du 06/10 sur #97, #93 et #90 cite l'heure du commit.

**Contrôles `sysnext.vercel.app`** —
- D36 / #99 : 9 documents HTML sur 9 portent les en-têtes `noindex` attendus (source : mission de Laurent du 07/10 ; liste des 9 URL non reprise).
- #97, #93, #90 : contrôlés le 06/10 (entrée « Clôture fast-forward » ci-dessous).
- #84, #85, #88, #89, #91, #92, #95, #96 : aucun contrôle `sysnext` post-fusion consigné au JOURNAL (relevé du 07/10). `smoke.mjs` post-fusion : non consigné.

**Contrôles `www` du 07/10** (source : mission de Laurent du 07/10 ; QA représentative, pas exhaustive) —
- #85 : PASS représentatif sur six familles ; Studios sans barre commune ; Mode avec une seule barre ; 768 px contrôlé via une iframe de même origine ; viewport principal limité à 1 321 px. Réserve : surbrillance de la section active parfois décalée ; diagnostic P2 **proposé**, aucune correction autorisée ici.
- #88 : PASS sur l'URL exacte `/fr/blog/generer-images-produit-ia` ; canonical auto-référent ; `hreflang` fr, fr-CH, x-default ; ni en ni de-CH.
- #89 : aucun lien Skeelbox dans le scan des 323 URL du sitemap ; mention éditoriale conservée.
- #91 : `www` déjà PASS ; non retesté (consigne de Laurent).
- #92 : MacroSphère retirée comme lien ; ancienne URL observée dans Chrome : destination finale HTTP 404 ; nombre de redirections intermédiaires **non établi**.
- #95 : hero de l'accueil et vidéo Orbitvu PASS.
- #96 : 5 pages FR représentatives PASS. Les 15 versions linguistiques n'ont pas été contrôlées une à une. Fusion le 06/10 ; présence sur `www` constatée le 07/10 ; instant du premier déploiement `www` **non établi**.
- D36 / #99 : Laurent a contrôlé 4 URL par requête HEAD PowerShell depuis son poste (D23) : HTTP 200, en-têtes D36 absents. Cette preuve vient des requêtes HEAD, pas des captures Chrome.

**Vérifié dans le dépôt, sans requête vers le site (R7)** —
- 93 pages : description de #85 (recompte du 06/10 sur build local de `0d2633f` : 44 guides, 39 fiches, 4 articles dédiés, 3 IA photo produit, 3 solutions). Registre `data/navigation/pages-longues.ts` sur `main` : exceptions #27 et #64 présentes, aucune exception #91.
- #88 : `content/blog/alternates.json` sur `main`, groupe de `generer-images-produit-ia` : `fr` seul, `en: null`.
- #89 : 0 `href` vers Skeelbox dans `content/`, `messages/`, `app/`, `components/` ; mention textuelle présente dans 2 fichiers (`content/blog/fr/e-commerce-quel-est-le-reel-impact-des-visuels.json`, `content/blog/en/impact-photographs-product-sheet.json`).
- #92 : 0 `href` vers MacroSphère et 0 `packshot-studio.com` dans `content/`.
- Anomalie distincte, **hors périmètre de #92** : `content/blog/fr/eclairage-photos-produits.json` porte `<a id=""><strong id="">intelligence artificielle dédiée</strong></a>`, sans `href`, sur `main` `30482a0` ; ce fichier n'est pas dans le diff de #92 (10 articles). Non corrigée.
- D45 : `data/produits/fiches-techniques.ts`, `data/produits/ecarts-connus.ts`, `lib/produits/__tests__/coherence-dimensions.test.ts` présents sur `main`.

**Événements de mesure** —
- #95 : hero de l'accueil modifié le 04/10 (fusion à 09:10 UTC). Modification antérieure à la fenêtre M5 (14/10 au 28/10) : consignée comme **événement de baseline**. Aucun gain SEO ne lui est attribué.
- #96 : J0 = mise en production effective (`CLUSTER.md` § 6) ; fusion le 06/10, présence `www` constatée le 07/10 ; J0 tombe donc le 06/10 ou le 07/10 ; l'heure réelle du déploiement n'est pas établie.
- Autres événements concomitants du 04/10 au 06/10, à ne pas attribuer à une mesure : #84, #85, #88 à #93, #97 (`ETAT.md`, E).
- D36 : sortie progressive de l'origine des index, sans date de lecture fixée.
- Lectures échues (canonique des 3 landings, `sku`, fils d'Ariane, lot F) : aucune consignée depuis le 04/10 ; aucune faite ici.

**Fichiers** — `docs/seo-geo/ETAT.md`, `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/BOITE-AUX-LETTRES.md`, `docs/standards/R-UX-LONG.md`.

Détail des changements de `ETAT.md` :
- B réduite aux 7 PR ouvertes ; #59, #60, #77, #67, #83, #85, #86, #87, #96, #99 sorties.
- Lignes de C retirées, car exécutées : « Cluster AI Act — GO MERGE #96 » (remplacée par la QA restante), « D36 / #99 — fusion » (remplacée par le reliquat), « D44, D45 — ordre de fusion et GO », « AR-01 — CTA ROI » (clos ; reliquat : activation CI d'`anchors` et `roi-calculator`), « D44 — guides de #91 », « D44 — libellé actif ». Leur texte reste dans l'historique git de `ETAT.md` et dans les entrées du 03/10 et du 06/10 de ce journal.
- Questions métier ouvertes conservées : #65, #27, lot F, CTA de fin d'article, Zalando, #64 (date, autres points), #70, D29, Q10, fiche Google, P0-J, D42, Studios, branches.
- F4 : sommaire mobile marqué traité par #84 (non rouvert).

**Effet attendu** — Aucun sur le site.

**Supposé** —
- Les preuves `www` du 07/10 et le résultat `sysnext` 9/9 sont repris de la mission de Laurent du 07/10, sans contre-contrôle dans cette session (aucun nouvel audit demandé ; #91 explicitement non retesté).
- Registres V4.3 : le refresh de 36 lots et 582 occurrences a été effectué en lecture seule (mission du 07/10). Ses annexes ne sont pas mises à jour dans le dépôt ; ses classifications restent provisoires et ne sont pas des décisions ; chantier documentaire distinct.

**Non regardé** — `www` et `sysnext` par script (R4, et consigne « aucun nouvel audit ») ; Preview Vercel ; Cloudflare, Supabase, n8n, Vercel ; contenu des branches des PR ouvertes au-delà des fichiers de gouvernance ; `06-CHANTIERS.md`, `REVUE-PR-BRANCHES-2026-10-02.md` et les autres documents de `docs/seo-geo/` (hors périmètre autorisé).

**Collisions avec les PR ouvertes** (diff depuis la base de chaque branche) —
- `JOURNAL.md` : les 7 (#27, #64, #65, #70, #79, #82, #100). #100 a la même base (`30482a0`) et insère en tête : conflit d'insertion certain à la fusion de la seconde des deux, à résoudre par union.
- `ETAT.md` : #27, #64, #65, #70, #82. `DECISIONS.md` : #65. `BOITE-AUX-LETTRES.md` : #82, qui ajoute une seconde « Q23 » (catalogue All-in-One) ; non renumérotée ici, #82 non modifiée. `docs/standards/R-UX-LONG.md` : aucune.

**Contradictions signalées, non résolues** —
- Accueil : D44 (« Ce qu'elle interdit ») et `R-UX-LONG.md` § 4 gèlent l'accueil jusqu'au 28/10 ; #95 a modifié son hero le 04/10 à la demande de Sébastien. [Inférence] Le gel D44 vise la navigation ; son texte est plus large. Non arbitré.
- Q23 en double (main et branche de #82), en attente d'une fusion de #82.
- Lignes « Statut » historiques de D36 (« non exécutée au 25/09 ») et de D47 (« PR #93 (brouillon) ») : laissées telles quelles (append-only) ; la note d'exécution du 07/10 dit l'état réel.

**Suite** — CI sur la PR ; relecture du diff par Laurent ; **GO de fusion distinct de Laurent** (aucune fusion par cette session). #79 : fermeture sur GO distinct. #100 : ne pas fusionner sans GO. #82 : HOLD. Réserve D44 et balise `<a>` sans `href` : deux anomalies distinctes, aucune correction décidée.

---

## 2026-10-06 · Micro-fix de casse de marque Orbitvu : 1 occurrence visible FR + 5 JSON-LD EN · Claude de Laurent

**Chantier** : typographie, hors 06-CHANTIERS | **PR** : #100, brouillon, branche `claude/trusting-mccarthy-km2erk` | **Base** : `main` `30482a0`, puis `main` `262da03` (#101) intégré le 07/10 par commit de fusion

**Quoi** — Micro-fix de casse de marque, 6 corrections : `orbitvu` → `Orbitvu` dans le champ `tool` du guide lunettes FR (1 occurrence visible : badge du hero, repris dans le JSON-LD `HowToTool`) ; `OrbitVu` → `Orbitvu` dans 5 champs `structuredText` de 4 guides EN (5 occurrences JSON-LD `HowToStep.text`, non affichées). Aucune URL, metadata keyword, slug ou logique modifiée ; aucun autre contenu touché.

**Pourquoi** — Source : audit ciblé de casse du 06/10 sur `main` `e830419`. Seule occurrence minuscule visible du périmètre rendu, et seules occurrences `OrbitVu` du dépôt.

**Fichiers** — `content/guides/fr/comment-photographier-lunettes-e-commerce.json`, `content/guides/en/consistent-product-image-collection.json`, `content/guides/en/enhance-lipstick-texture-photo-ai.json`, `content/guides/en/how-to-get-accurate-colors-in-product-photography.json`, `content/guides/en/how-to-take-multi-angle-photos-of-shoes.json`

**Effet attendu** — Après fusion, marque en casse éditoriale sur `/fr/guide/comment-photographier-lunettes-e-commerce` et dans le JSON-LD des 4 guides EN. Aucun effet de classement attendu.

**Vérifié** — Aucune des 6 PR ouvertes au 06/10 (#27, #64, #65, #70, #79, #82) ne touche les 5 fichiers. `verifier-json` 195 ; `tsc` vert ; Vitest 476/476 ; `next build` vert (386 pages). HTML du build : guide FR « le logiciel Orbitvu » (badge et `HowToTool`), 0 « le logiciel orbitvu » ; 4 guides EN, 0 `OrbitVu`. 0 `OrbitVu` dans le dépôt.
**Supposé** — Aucun.
**Non regardé** — Meta keywords en minuscules (14), URLs, slugs, classes CSS, identifiants, `STUDIO ORBITVU` de `app/[lang]/industrie/[slug]/page.tsx` : laissés volontairement. Preview : protégée par le SSO Vercel (302), non contrôlée ; contrôle navigateur fait sur le build local seulement (desktop 1 440 px, mobile 390 px). `www` non contrôlé.

**Synchronisation 07/10** — Conflit d'insertion avec #101 résolu par union : entrées de #101 conservées intégralement, au-dessus de celle-ci (ordre chronologique). Six corrections inchangées.

**Suite** — CI ; contrôle de la Preview ; GO de fusion de Laurent.

---

## 2026-10-06 · #85 actualisée depuis `main` `3b427d7` (fusion de #91) : exceptions temporaires de #91 retirées · Claude de Laurent

**Chantier** : D44 | **PR** : #85, brouillon | **Base intégrée** : `main` `3b427d7`, par commit de fusion `f49a437` (pas de rebase)

**Quoi** —
- Fusion de `main` : seul conflit, le haut de ce journal, résolu par union (entrées de `main` dans leur ordre, les 2 entrées de #85 du 03/10 à leur place). `app/[lang]/ia-photo-produit/page.tsx` fusionné automatiquement : barre de #85 et retrait de la note BlendAI de #97 tous deux présents.
- `data/navigation/pages-longues.ts` : retrait des 3 exceptions temporaires de #91 (`comment-creer-vues-multi-angles-automatique-objet` FR, `how-to-create-automatic-multi-angle-views-of-an-object` EN, `comment-photographier-lunettes-e-commerce` FR) et des constantes `PR91`, `FIN_PR91`. Condition de sortie inscrite le 03/10 remplie : #91 fusionnée le 06/10 (`3b427d7`).
- Tests : `registre-pages-longues.test.ts`, les 3 guides attendus équipés (et non plus gelés) ; `navigation-pages-longues.spec.ts`, guide lunettes FR retiré de `GELEES`.
- Aucune autre règle D44 modifiée : exceptions #27, Mode, F5, Studios, pages de #64, HOLD et EXCLUDE inchangés.

**Vérifié** —
- Aucune autre raison de gel du guide lunettes FR : absent des exceptions #27 et des gels ; aucune PR ouverte ne touche les 3 guides (relevé GitHub du 06/10).
- `verifier-json` 195 ; `tsc` vert ; Vitest 409/409 (dont 9 du registre) ; eslint vert sur les fichiers touchés ; `next build` vert (386 pages).
- Build local : `navigation-pages-longues` 44/44 ; `sommaire-blog` et `machine-selector` 37/37 ; contrôle ciblé des 3 guides (spec temporaire hors dépôt) 12/12 : barre, section active, ancres, une seule navigation collante, masquage en fin de page à 1 024 et 1 440 px ; aucune barre ni débordement à 390 et 768 px.

**Supposé** — Aucun.
**Non regardé** — Preview et `www` ; `docs/standards/R-UX-LONG.md` cite encore #91 en exemple d'exception (ligne 86), non modifié (documentation sur `main`, hors périmètre).

**Suite** — CI sur la nouvelle tête ; contrôle de la Preview par Laurent ; GO de fusion individuel.

---

## 2026-10-06 · D36 reconstruite depuis `main` `2a53727` : `noindex` de l'origine `sysnext.vercel.app`, partie Next seule, remplace #67 · Claude de Laurent

**Chantier** : D36 | **PR** : #99, brouillon, non fusionnée, branche `claude/busy-feynman-0vnf1j` | **Base** : `main` `2a53727` (#92) | **Remplace** : #67, non modifiée, fermeture sur GO de Laurent

**Quoi** — Règle `headers()` de `next.config.ts` : `X-Robots-Tag: noindex` et `X-Packshot-Origin-Noindex: 1` sur les documents HTML de `sysnext.vercel.app` en accès direct. Reprise de la partie Next de #67 (`43e14b3`, `02c093c`), sans sa partie Worker ; test `lib/seo/__tests__/origine-noindex-d36.test.ts` (67 cas) repris de #67 sans modification.

**Pourquoi** — D36 (25/09). Au 06/10, l'origine reste indexable : `https://sysnext.vercel.app/fr`, `/en` et `/de-ch` sans `X-Robots-Tag`, `/fr` sans balise `robots` (`curl`, 06/10 à 15:09 UTC). La protection de `www`, le retrait par le Worker, est active depuis le 01/10 : seule la partie Next de #67 restait à livrer. #67 (base `7ad0ca3`) est en conflit : test Worker ajouté des deux côtés, JOURNAL, ETAT. Son bloc Worker est déjà dans `main` (#68, `92c3c58`), à l'identique.

**Worker au 06/10, lecture seule (API Cloudflare)** —
- version active `107715bc-be59-43c2-a465-15cefd03f516` (n° 93), à 100 %, déployée le 01/10 à 06:59:53 UTC par `wrangler`, 82 s après la fusion de #68 ; version précédente `27b0153c` (25/09). Ce déploiement n'était pas consigné ici ;
- bloc D36 présent. Script actif identique à `cloudflare-worker/src/index.js` de `main` après retrait des commentaires, des lignes vides, de 3 lignes d'assistant `__name22` ajoutées par wrangler et de 2 commentaires du bundler ;
- routes `www.packshot-creator.com/*`, `packshot-creator.com/*`, `*.packshot-creator.com/*` vers `packshot-router`, conformes à `wrangler.toml` ;
- `WEBFLOW_ORIGIN` figure dans la configuration du Worker actif, alors qu'elle a été retirée de `wrangler.toml` le 28/09. Le code ne la lit pas. Hors périmètre, non traité.

**`www` au 06/10** —
- Contrôle de Laurent dans Chrome, rapporté : `/fr`, `/en` et `/de-ch` sont des pages réelles et indexables. `X-Robots-Tag` lu par un `fetch` de même origine, **pas sur la requête document initiale** de l'onglet Réseau : l'absence de l'en-tête sur le document initial n'est pas vérifiée directement.
- Par script : `robots.txt` et `llms.txt` en 200, `x-served-by: nextjs`, sans `X-Robots-Tag`. HTML en 403 de challenge Cloudflare (R4), sans valeur de preuve.

**Fichiers** — `next.config.ts` (constante `ORIGINE_VERCEL_NOINDEX` et `headers()` ; `images` et `redirects()` inchangés), `lib/seo/__tests__/origine-noindex-d36.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. Aucun fichier du Worker.

**Effet attendu** — Après fusion :
- origine en accès direct : `X-Robots-Tag: noindex` et le marqueur sur le HTML. Sortie progressive de l'origine des index qui respectent l'en-tête, au rythme de leurs recrawls ; d'anciennes citations peuvent persister ;
- `www` : aucun changement. La règle Next est écartée si la requête porte un en-tête `cf-*` ; sinon, le Worker retire en-tête et marqueur.

**Vérifié** —
- Fraîcheur : `main` `2a53727` ; #67 ouverte, brouillon, tête `62ebfae`, `mergeable_state: dirty`, non modifiée.
- Patch `next.config.ts` de #67 appliqué sans conflit sur `main`. Seul changement de texte : le commentaire indique que le Worker porte le retrait depuis le 01/10 (#68).
- Vitest : 467/467 sur la branche, 400/400 sur `main` ; test D36 : 67/67.
- Mutations :
  - le test D36 échoue sur la configuration de `main` (aucune règle `headers()`) ;
  - avec un Worker privé du bloc D36 : 9 échecs, tous dans la chaîne « en-têtes Cloudflare retirés par Vercel ».
- `tsc` vert. ESLint : 0 message sur les 2 fichiers. `verifier-json` : 195 JSON valides. `npx next build` vert (valeurs factices) ; `routes-manifest.json` porte la règle, regex `^(?:/((?!_next/|_vercel/|api/)[^.]*))(?:/)?$`.
- Build de la branche contre build de `main` :
  - `routes-manifest.json` ne diffère que par `headers` ;
  - 374 HTML, 378 `.meta` et 3 293 `.rsc` identiques, identifiant de build neutralisé ; aucun `.meta` ne porte `X-Robots-Tag` ni le marqueur ;
  - `sitemap.xml` ne diffère que par `lastmod`, heure du build (`app/sitemap.ts`, préexistant).
- `next start` du build de la branche, 21 chemins × 6 profils d'en-têtes :
  - hôte `sysnext.vercel.app` sans en-tête `cf-*` : `noindex` et marqueur sur les 11 documents HTML (`/` en 307, `/fr`, `/en`, `/de-ch`, `/fr/contact`, `/de-ch/kontakt`, `/calculateur-roi`, `/etude-clients-2026`, `/roi-pro`, `/fr/outil-financement`, `/fr/blog`) ; rien sur `robots.txt`, `sitemap.xml`, `llms.txt`, `favicon.ico`, `icon.png`, une image, un chunk JS, `/_next/image`, `/_vercel/*` (404) et `/api/og` ;
  - même hôte avec `cf-worker`, `cf-ray` ou `cf-connecting-ip` ; hôte `www.packshot-creator.com` ; `localhost` : 0 en-tête sur les 21 chemins.
- Chaîne `www` → Worker du dépôt → `next start` servi sous l'hôte `sysnext.vercel.app`, 12 chemins, en-têtes `cf-*` transmis puis retirés :
  - 24 réponses `www`, 0 `X-Robots-Tag`, 0 marqueur ; statut, balise `robots` et canonical identiques à la référence ;
  - contrôle négatif, Worker privé du bloc D36 et en-têtes retirés : 9 écarts, `noindex` sur le HTML de `www`.
- `smoke.mjs` vert sur ce build servi sous l'hôte `sysnext.vercel.app`, en-tête présent : 17 pages, 3 ressources.

**Supposé** —
- [Non vérifié] Vercel transmet `cf-worker`, `cf-ray` ou `cf-connecting-ip` à son routage pour les requêtes relayées par le Worker. La protection de `www` n'en dépend pas : le retrait par le Worker suffit, chaîne rejouée dans le pire cas.
- [Inférence] Vercel applique les règles `headers()` à chaque requête, à la couche de routage, y compris pour une réponse servie depuis son cache. Aucun `.meta` de prérendu ne porte l'en-tête ; le retrait par le Worker couvre le cas contraire.
- [Inférence] Le Worker actif se comporte comme celui du dépôt testé ici : code identique après normalisation.

**Non regardé** — Preview Vercel : sous SSO, hôte `sysnext-git-…` hors règle par construction, et hors Worker : elle ne prouve rien sur D36. Cloudflare, Worker, dashboards : non touchés, aucun déploiement. Balise `robots`, canonical, hreflang, sitemap, `robots.txt`, `llms.txt` : non modifiés. `WEBFLOW_ORIGIN` : hors périmètre. Formulaires : aucun fichier concerné, non testés. Playwright : non lancé.

**Suite** — GO de fusion de Laurent. Immédiatement après la fusion, sur GO séparé :
1. `curl -sI https://sysnext.vercel.app/fr`, `/en`, `/de-ch`, un article : `x-robots-tag: noindex` et `x-packshot-origin-noindex: 1` ; `/robots.txt` : ni l'un ni l'autre ;
2. Chrome sur `https://www.packshot-creator.com/fr?v=<horodatage>`, `/en`, `/de-ch` : ni l'un ni l'autre, **sur la requête document de l'onglet Réseau** ; présent : `git revert` du commit de fusion ;
3. `node scripts/seo/smoke.mjs https://sysnext.vercel.app` ;
4. JOURNAL.

Après la fusion, aucun retour arrière du Worker vers une version sans le retrait tant que cette PR n'est pas révertée. #67 : fermeture « remplacée », sur GO de Laurent.

---

## 2026-10-06 · A04b (#92) actualisée depuis `main` `c236705` : patch des 10 articles inchangé, MacroSphère morte, retrait conservé · Claude de Laurent

**Chantier** : V4.3, lot 1, A04b | **PR** : #92, brouillon | **Base intégrée** : `main` `c236705`, par commit de fusion `ad807a5` (pas de rebase, pas de force-push)

**Quoi** — Mission V4.3 lot 1 du 06/10 (#92 → #91 → #88) : actualisation de #92, 124 commits de retard. Un seul conflit, d'insertion en tête de `JOURNAL.md`, résolu par union (entrées de `main` puis entrée A04b ; 0 ligne perdue de part et d'autre). Aucun contenu métier modifié.

**MacroSphère (F-033, F-039)** — Contrôle unique de la destination : `fr.packshot-studio.com/…/macrosphere-3d-jewelry-animation` → 301 → `fr.packshot-creator.com/…`. Chromium du conteneur : défi Cloudflare « Just a moment… », 403 (R4, non probant). Worker déployé `packshot-router` (lecture seule, modifié le 01/10) : identique au dépôt aux commentaires près, aucune règle pour ce chemin, renvoi vers `www` chemin conservé. Application (`sysnext.vercel.app`, hors Cloudflare) : 307 vers `/fr/collections/3d/products/macrosphere-3d-jewelry-animation`, puis **404**. Retrait préparé (`8793731`) conservé.

**Vérifié** — Les 10 JSON de `content/blog/` ont exactement le blob de `5a74aba` ; diff `main` → branche sur `content/` identique au patch validé. `verifier-json` : 195 JSON valides ; `tsc` vert ; Vitest 400/400 ; `next build` vert (386 pages). HTML prérendu des 10 articles : 0 occurrence de `pixcap.com`, `<a id="">`, `wiki/Sensorama/`, `capturingreality.com`, `packshot-studio.com` ; cibles Sensorama et RealityScan présentes.

**Supposé** — Qu'un visiteur dans Chrome obtient la même 404 : déduit du Worker déployé et de l'application ; non observé dans un Chrome réel (aucun accès Chrome dans cette session).

**Non regardé** — Preview Vercel (SSO) ; `www` dans Chrome ; les autres liens (audit acquis, non rejoué).

**Suite** — CI sur la nouvelle tête ; GO de fusion distinct de Laurent (`GO MERGE #92`) ; puis #91, puis #88.

---

## 2026-10-06 · Clôture fast-forward #97 / #93 / #90 : trois fusions, `main` final `be8cbea`, `www` contrôlé · Claude de Laurent

**Chantier** : P0 intégrité (#97) ; D47, AR-01 (#93) ; V4.3 lot 1, A02 (#90) | **PR** : documentation seule, branche `claude/stoic-goodall-nrerhy` | **Base** : `main` `be8cbea`

**Quoi** — Clôture des trois fusions du 06/10, faites dans cet ordre sur GO distincts de Laurent, en mode merge :
- #97 fusionnée (`df01b04`, 14:09:37 UTC) : suppression de la note BlendAI non sourcée 4,9/5 × 100 ; contrôle `www` PASS.
- #93 fusionnée (`6cbb903`, 14:18:56 UTC) : D47, CTA ROI directs vers les calculateurs localisés ; contrôle `www` FR/EN PASS, aucun détour par Studios.
- #90 fusionnée (`be8cbea`, 14:24:54 UTC) : liens des articles ROI interne corrigés ; contrôle `www` FR/EN PASS.
- `main` final vérifié : `be8cbea`.
- NEW_P0 = 0 ; NEW_P1 = 0.
- FAST_FORWARD_97_93_90_WWW_VERIFIED = YES.

**Pourquoi** — Rituel de fin d'intervention. `ETAT.md` décrivait encore #93 en brouillon et AR-01 en attente d'une date de fusion.

**Fichiers** — `docs/seo-geo/JOURNAL.md` ; `docs/seo-geo/ETAT.md` (B : ligne #93 retirée, PR fusionnée ; C : ligne AR-01 close ; F4 : observation P3 ; G : ligne #97, #93, #90). Aucun fichier applicatif, aucun test.

**Effet attendu** — Aucun sur le site.

**Vérifié** —
- Avant chaque fusion : fresh-check, PR `clean`, CI 4/4 verte. Après reprise de `main`, patch hors `docs/seo-geo/` identique au patch validé (#93 : `58c585e` ; #90 : `703bf69`) ; `JOURNAL.md` résolu par union, 0 ligne retirée.
- `sysnext.vercel.app` après chaque déploiement (hors Cloudflare, R4) :
  - #97 : 0 « 4,9/5 » et 0 `AggregateRating` sur `/fr` et `/en/ia-photo-produit` et FR/EN `studio-ia-vs-ia-generative` ; 4,7/5 × 83 visible sur `/fr`, `/en` et Studios FR/EN ;
  - #93 : 7 sources FR et EN en 200, 0 lien vers `/studios-photo-automatises#…` ; `/fr/calculateur-roi`, `/en/calculateur-roi`, `/de-ch/roi-rechner` en 200 ; témoin du sélecteur inchangé ; aucun `id="calculateur-roi"` sur Studios ; aucun formulaire envoyé, aucun appel d'API ;
  - #90 : 2 articles en 200, 0 lien `http://gs-new…`, 2 liens Orbitvu par article, ancre lunetterie vers `/{fr,en}/industrie/lunetterie` (200), « Photoshop » non lié en EN.
- `www` : contrôle Chrome de Laurent, PASS pour les trois PR (déclaré par Laurent le 06/10).
- D47 présente dans `DECISIONS.md`, non modifiée. Sa ligne « Statut » cite encore « PR #93 (brouillon) » : application effective depuis la fusion `6cbb903`.
- P3 : ancre EN « Packshot for the`<strong>`optics`</strong>` And eyewear » (rendu « theoptics »). Texte identique dans `f529bd5` (20/09) et `6cbb903` (avant #90) : antériorité à #90 établie par git ; #90 n'a modifié que le `href`.

**Supposé** — Le contrôle `www` de Laurent couvre les pages de la checklist consolidée du 06/10 : FR `/ia-photo-produit`, FR `studio-ia-vs-ia-generative`, prestataire FR/EN, articles ROI interne FR/EN.

**Non regardé** — `www` par script (R4) ; Firefox, Safari, appareils réels ; GA4 ; Search Console.

**Suite** —
- #94 : `PR94_STATUS = SUPERSEDED_BY_D47_AND_CURRENT_MAIN`, `PR94_MERGE = FORBIDDEN`. Sa réservation de Studios pour `id="calculateur-roi"` est caduque depuis D47. Ni reprise ni réparation ; fermeture sur GO explicite de Laurent seulement.
- P3 de l'ancre EN inscrit en `ETAT.md`, F4 ; non corrigé ici.
- Fusion de cette PR documentaire : GO distinct de Laurent.

---

## 2026-10-06 · A02 (#90) actualisée depuis `main` `a168b33` (fusion de #89) : patch inchangé, conflit de journal résolu par union · Claude de Laurent

**Chantier** : V4.3, lot 1, A02 | **PR** : #90, brouillon | **Branche** : `seo/a02-roi-interne-liens-2026-10-03` | **Base** : `main` `a168b33` ; tête précédente `3309244`

**Quoi** — `main` `a168b33` (fusion de #89) fusionnée dans la branche, sans rebase. Seul conflit : `JOURNAL.md`, deux insertions (06/10 et 03/10), résolues par union, ordre chronologique conservé. Aucune modification de contenu : les 2 JSON sont identiques octet pour octet au patch d'origine `a829c50`.

**Pourquoi** — La fusion de #89 rendait #90 de nouveau conflictuelle (6 commits de retard).

**Fichiers** — `docs/seo-geo/JOURNAL.md`. Diff contre `main` : `content/blog/en/what-return-on-investment-with-an-internal-photo-studio.json`, `content/blog/fr/quel-retour-sur-investissement-avec-un-studio-photo-en-interne.json`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Inchangé par rapport à l'entrée A02 du 03/10.

**Vérifié** —
- Texte visible des 2 articles identique à `main` ; 0 ligne de `main` ni de `3309244` retirée de `JOURNAL.md`.
- `tsc` vert ; `verifier-json` : 195 JSON valides ; Vitest 400/400 ; `next build` vert (386 pages).
- `next start` local, desktop 1280 et mobile 390 : les 2 articles en 200 ; 0 lien `http://gs-new…` ; 2 liens Orbitvu par article ; ancre lunetterie vers `/{fr,en}/industrie/lunetterie` ; « Photoshop » non lié en EN ; 0 lien vide ; aucun débordement horizontal ; 0 erreur de page.
- Parcours de la CI `machine-selector` et `sommaire-blog` : 37/37.
- Cibles Orbitvu et lunetterie : relevé du 06/10 non refait (aucun changement détecté). Appels payants : aucun.

**Supposé** — Que l'URL Orbitvu vue par un visiteur est celle relevée depuis le conteneur (R4).

**Non regardé** — Preview Vercel (SSO) ; `www` ; ESLint (étape non bloquante) ; `ETAT.md`, non modifié.

**Suite** — CI et Preview sur la nouvelle tête ; QA de Laurent ; GO de fusion distinct.

---

## 2026-10-06 · A02 (#90) actualisée depuis `main` `8247217` (#96) : URL Orbitvu, lien Photoshop, ancres lunetterie inchangés · Claude de Laurent

**Chantier** : V4.3, lot 1, A02 | **PR** : #90, brouillon | **Branche** : `seo/a02-roi-interne-liens-2026-10-03` | **Base** : `main` `8247217` ; tête précédente `a829c50`

**Quoi** — `main` `8247217` fusionnée dans la branche, sans rebase ni force-push. Seul conflit : `JOURNAL.md` (insertion en tête), résolu par union : toutes les entrées de `main` conservées, entrée A02 du 03/10 placée à sa date. Aucune modification de contenu ajoutée.

**Pourquoi** — #90 était en conflit avec `main` et sa CI du 03/10 précédait #86 (ni Vitest ni parcours Playwright). Consigne de Laurent du 06/10 : actualiser #90 après #89.

**Vérifié** (06/10, conteneur) — hôte `gs-new-features-and-accelerated-content-creation` : NXDOMAIN (DNS public Cloudflare) ; URL Orbitvu cible : 200 ; `sysnext.vercel.app/fr/industrie/lunetterie` : 200, indexable ; `/en/industrie/lunetterie` : 200, `noindex, follow` (état attendu, inchangé) ; aucune PR ouverte ne touche les deux JSON de #90. Diff métier contre `main` identique à celui du 03/10 (2 JSON, 7 modifications d'attributs).

**Supposé** — Rien.

**Non regardé** — Preview Vercel (SSO) ; `www` ; ESLint (étape non bloquante de la CI).

**Suite** — QA express de #90 après le sort de #89 ; GO de fusion distinct de Laurent.

---

## 2026-10-06 · ROI (#93) — CTA directs vers le calculateur réel, option B d'AR-01 abandonnée (D47) · Claude de Laurent

**Chantier** : V4.3, lot 1, A01 = AR-01, révisé | **PR** : #93 (brouillon, ne pas fusionner) | **Base** : `main` `8247217` (#96)

**Quoi** —
- Décision de Laurent du 06/10 (D47) : les CTA ROI de 7 sources visent le calculateur localisé (FR `/fr/calculateur-roi`, EN `/en/calculateur-roi`, de-ch `/de-ch/roi-rechner`), sans détour par `/studios-photo-automatises#…`. Elle remplace l'option B du 03/10 (ancre permanente sur la section ROI de Studios), décrite dans l'entrée AR-01 du 03/10 ci-dessous, qui n'est plus la décision courante.
- 18 expressions dans 7 fichiers : `blendai-vs-flair` (2), `blendai-vs-photoroom` (2), `comment-calculer-le-roi-…` (6), `guide-achat-studio-2026` (5), `ia-photo-produit-guide-2026` (1, balise `<a>` brute devenue `<Link>`), `orbitvu-vs-concurrents` (1, idem), `prestataire-packshot-vs-studio-interne` (1, ancien `hash: 'roi'`). Seuls les `href` changent ; l'id interne `calculateur-roi-gratuit` est inchangé.
- Studios : retour à l'état de `main` ; l'`id="calculateur-roi"` et le commentaire ajoutés par la branche le 03/10 sont retirés. Studios n'est pas transformée en cible.
- Témoin du pilote Studios (`studio-photo/selecteur-machines`, FR, EN, de-ch) : volontairement inchangé. Son lien vise toujours `/studios-photo-automatises#calculateur-roi`, ancre absente : le visiteur arrive en haut de Studios, comme sur `main`.
- `e2e/anchors.spec.ts` : retour à `main`, plus 16 tests ciblés (7 sources × FR, EN : aucun lien `/studios-photo-automatises#…`, au moins le nombre de liens corrigés vers le calculateur ; destinations FR et EN en 200). Les 7 tests de l'option B sont retirés. Témoin exclu, exclusion écrite dans le spec.
- `e2e/roi-calculator.spec.ts` (réécriture du 03/10 conservée) : les 3 tests de Studios vérifient le bouton de la section ROI vers le calculateur, présent sur `main`, sans supposer d'`id`. Toute requête `/api/**` est simulée.
- CI : `pr-checks.yml` inchangé ; `anchors` reste différé, `roi-calculator` n'est pas ajouté.

**Pourquoi** — Les 19 liens du code visaient une ancre absente de Studios depuis le 22/03 (`d5a7fea`). Laurent retient la destination directe vers l'outil réel plutôt que la réparation de l'ancre.

**Unités de comptage** —
- Sur `main` `8247217` : 19 expressions dans 8 fichiers, 39 liens rendus sur 17 pages.
- Corrigées : 18 expressions dans 7 fichiers ; 36 liens rendus sur 14 pages (7 articles × FR, EN).
- Restant volontairement : 1 expression (sélecteur), 3 liens rendus (FR, EN, de-ch).

**Fichiers** — 7 pages d'articles sous `app/[lang]/blog/`, `e2e/anchors.spec.ts`, `e2e/roi-calculator.spec.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/DECISIONS.md`.

**Effet attendu** — Un clic sur « Calculer mon ROI » depuis ces 14 pages ouvre le calculateur de la langue, au lieu du haut de Studios. [Inférence] Le trafic de Studios, les sessions du calculateur et l'usage de l'API du conseiller FR peuvent bouger ; aucune causalité n'est affirmée. Le Header et le Footer lient Studios sur toutes les pages : l'ensemble des pages qui lient Studios ne change pas.

**Vérifié** (local, build de production, variables d'environnement factices, sans clé d'API) —
- `tsc --noEmit` vert ; `verifier-json` : 195 fichiers valides ; Vitest 400/400 ; `next build` vert, 386 pages.
- HTML et RSC prérendus contre `main` `8247217`, identifiant de build et chemins `/_next/static` normalisés : 56 fichiers différents, soit les 14 pages sources (HTML, RSC et 2 segments chacune). Studios, sélecteur et toutes les autres pages : identiques. Sur les 14 pages : 36 `href` changés, texte visible identique, JSON-LD identique ; pour les 2 balises devenues `<Link>`, seul l'ordre des attributs `href` et `class` diffère.
- Playwright, Chromium (`anchors`, `roi-calculator`, `cta-destinations`, `internal-links`, `internal-links-all`, `language-switch`, `machine-selector`, `sommaire-blog`) : branche 112/115, `main` 73/98. Les 3 échecs de la branche existent à l'identique sur `main` : `anchors` « #calculateur-roi exists » (témoin), `cta-destinations` « Découvrir nos studios », `language-switch` « header and footer ». Sur `main`, les 22 autres échecs sont l'ancienne spec ROI. Aucun échec nouveau.
- `anchors` : 22/23 sur la branche ; les 16 nouveaux tests passent. `roi-calculator` : 23/23.
- Contre-épreuve, specs de la branche sur le build de `main` : les 14 tests des sources échouent (détour détecté), les 2 destinations passent ; `roi-calculator` 23/23.
- Appels réels à `/api/roi-chat`, `/api/roi-pdf`, `/api/roi-lead` : 0 ; aucun lead, aucun coût.

**Supposé** — Aucun effet d'indexation propre aux 36 `href` au-delà du transfert de ces liens internes de Studios vers le calculateur [Inférence, cela repose sur des schémas observés].

**Non regardé** — Preview Vercel (protégée par SSO) ; `www` (R4) ; GA4 (hors périmètre, D47) ; Firefox, WebKit, mobile ; CI de la nouvelle tête au moment de l'écriture.

**Suite** — Contrôle de la Preview par Laurent (clic sur « Calculer mon ROI » depuis prestataire et un guide, FR et EN) ; arbitrage de la date de fusion ; GO de fusion distinct ; réconciliation de #94 (GO séparé) ; décision séparée sur `anchors` et `roi-calculator` en CI.

---

## 2026-10-06 · P0 intégrité : note BlendAI 4,9/5 sur 100 avis, sans source, retirée (JSON-LD, FAQ, chaînes mortes) · Claude de Laurent

**Chantier** : P0 intégrité, hors 06-CHANTIERS ; ne lance pas le nettoyage BlendAI global | **PR** : #97, brouillon, branche `claude/dazzling-fermi-1qerqb` | **Commit** : `b2199b7` | **Base** : `main` `1e0901b`, puis `8247217` (fusion de #96) fusionné dans la branche, sans rebase

**Quoi** — Retrait de la seule note `4,9/5` / `100 avis` attachée à l'offre IA, et de rien d'autre :
- `app/[lang]/ia-photo-produit/page.tsx` : bloc `aggregateRating` (4,9 ; 100 ; 5) du JSON-LD `SoftwareApplication` BlendAI, rendu en FR et EN (déjà absent en de-ch, D31). Le reste du bloc est inchangé ;
- `blogStudioIa.faq.q3.answer` (FR, EN, de-ch) : proposition « , avec une note de satisfaction de 4,9/5 » / « , with a 4.9/5 satisfaction rating » supprimée ; la phrase devient « Plus de 100 marques l'utilisent. » / « Over 100 brands use it. ». Texte visible et `FAQPage` de `/fr` et `/en/blog/studio-ia-vs-ia-generative` ; en de-ch, chaîne morte (article jamais servi en de-ch, `i18n/deChCoverage.ts`) ;
- `iaPhotoProduit.socialProof.stat3` et `stat3Label` (FR, EN, de-ch) : clés mortes (aucune référence dans le code, la page n'affiche pas ce bloc), retirées.

**Pourquoi** — Aucune source établie pour 4,9/5 ni pour 100 avis. Avant : `AggregateRating` dans le JSON-LD de 2 pages ; note visible et dans `FAQPage` sur 2 pages ; `4.9/5` présent dans le flux RSC du HTML brut de 355 pages sur 359 (`NextIntlClientProvider` reçoit tout `messages/<langue>.json`, constat déjà relevé dans ce journal). Agrégat Google légitime (`data/testimonials.ts`, `GMB_AGGREGATE` 4,7 / 83) non touché.

**Fichiers** — `app/[lang]/ia-photo-produit/page.tsx`, `messages/fr.json`, `messages/en.json`, `messages/de-ch.json`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Au déploiement : plus aucun `AggregateRating` dans le JSON-LD du site (l'agrégat Google n'est rendu qu'en texte ; les 32 `Review` restent) ; Google retire l'éventuel extrait d'étoiles de `/fr` et `/en/ia-photo-produit` au recrawl (J+3 à J+14). Aucun effet attendu sur les autres pages hors disparition des chaînes du flux RSC.

**Vérifié** —
- Clés de messages, `main` contre branche, par langue : 2 clés supprimées (`stat3`, `stat3Label`), 1 modifiée (`q3.answer`), aucune autre ; édition par lignes, sans reformatage ; `verifier-json` 180 fichiers valides.
- `npx tsc --noEmit` vert ; eslint vert sur la page ; Vitest 400/400 ; `npx next build` vert (371 pages), valeurs factices de la CI, aucun `MISSING_MESSAGE`.
- 359 HTML prérendus, build de `main` contre build de la branche : JSON-LD parsé différent sur 4 pages exactement (`/fr` et `/en/ia-photo-produit` : `aggregateRating` retiré ; `/fr` et `/en/blog/studio-ia-vs-ia-generative` : texte de la réponse 3) ; texte visible différent sur 2 pages (les deux articles, réponse 3) ; `<title>`, description, robots, canonique, hreflang et OG identiques sur 359 pages.
- Après : `4.9/5`, `4,9/5`, `AggregateRating`, `"reviewCount":100`, « note de satisfaction », « satisfaction rating », `Kundenzufriedenheit` : 0 occurrence dans le JSON-LD, le texte visible et le flux RSC des 359 pages.
- Agrégat Google préservé : « 4,7/5 sur 83 avis » visible sur `/fr` et `/fr/studios-photo-automatises`, « 4.7/5 over 83 reviews » sur `/en` et `/en/studios-photo-automatises`, avant comme après ; 32 blocs JSON-LD `Review`, avant comme après.
- `e2e/seo.spec.ts` (Chromium préinstallé, `next start`) : 227/236 sur la branche ; les 9 mêmes échecs sur `main` `1e0901b` (titres de plus de 70 caractères, descriptions, hreflang de `/fr/packshot-bijoux`), aucun lié à ce diff.
- Après fusion de `main` `8247217` (#96) dans la branche, mêmes contrôles refaits contre un build de `8247217` : `verifier-json` 195 fichiers ; `tsc` vert ; Vitest 400/400 ; `next build` vert (386 pages) ; 374 HTML : JSON-LD différent sur les 4 mêmes pages, texte visible sur les 2 mêmes, `<head>` identique sur 374 ; `4.9/5` dans le flux RSC de 370 pages avant, 0 après ; agrégat Google et 32 `Review` inchangés ; `seo.spec` 227/236, les 9 mêmes échecs sur `8247217`. #96 n'apporte aucune occurrence nouvelle de la note.
- Collisions, 19 PR ouvertes : seule #85 touche `app/[lang]/ia-photo-produit/page.tsx` (barre D44, hunks avant la ligne 590 ; ce diff à la ligne 701) ; #64 et #27 touchent `messages/*.json` sans toucher ces clés ; fusion simulée (`git merge-tree`) de la branche avec chacune des 19 : résultat dans la PR.

**Supposé** — Qu'aucune source de la note n'existe hors du dépôt : l'audit la donne NON ÉTABLIE ; aucune trace dans `docs/`, `data/` ni `content/`.
**Non regardé** — Preview Vercel et `www` dans Chrome (R4) ; Test des résultats enrichis de Google ; « Plus de 100 marques », `stat1` (100+ marques) et `stat2` (5 000+ visuels) : autres affirmations, non sourcées elles aussi, hors périmètre (nettoyage BlendAI) ; « fidèles à 100 % » de la description `SoftwareApplication` (RV28-E12) ; `ETAT.md`, non modifié : #96 le réécrivait (fusionnée pendant ce chantier), #94 le réécrit encore, une modification créerait une collision ; documents non servis (`sessions/`, `livrables/`, `PLAN_PROD.md`) qui citent encore 4,9/5.

**Suite** — CI et Preview ; contrôle Chrome de la Preview par Laurent ; GO de fusion de Laurent, distinct. Après fusion : `smoke.mjs` sur `sysnext.vercel.app`, contrôle Chrome de `/fr/ia-photo-produit` sur `www`.

---

## 2026-10-06 · A04a (#89) actualisée depuis `main` `8247217` (#96) : liens Skeelbox retirés, conflit de journal résolu · Claude de Laurent

**Chantier** : V4.3, lot 1, A04a | **PR** : #89, brouillon | **Branche** : `seo/a04a-liens-skeelbox-2026-10-03` | **Base** : `main` `8247217` ; tête précédente `43dd0eb`

**Quoi** — `main` `8247217` fusionnée dans la branche, sans rebase. Seul conflit : `JOURNAL.md` (insertion en tête) ; toutes les entrées de `main` conservées, entrée A04a du 03/10 placée à sa date. Aucune modification de contenu ajoutée : le diff contre `main` reste le retrait des 2 liens Skeelbox.

**Pourquoi** — #89 avait 90 commits de retard et n'était plus fusionnable ; sa CI du 03/10 précédait #86 (ni Vitest ni parcours Playwright).

**Fichiers** — `docs/seo-geo/JOURNAL.md` (résolution et cette entrée). Diff contre `main` : `content/blog/en/impact-photographs-product-sheet.json`, `content/blog/fr/e-commerce-quel-est-le-reel-impact-des-visuels.json`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Inchangé par rapport à l'entrée A04a du 03/10 : plus aucun lien sortant vers `skeelbox.com`.

**Vérifié** —
- Diff des 2 JSON contre `main` : seul le champ `content` change ; une balise `<a>` retirée par fichier (2 liens `skeelbox.com` avant, 0 après) ; texte visible identique ; statistique, liens voisins et métadonnées inchangés.
- `https://www.skeelbox.com/etude-abandon-panier/`, avec et sans `/` final (06/10, conteneur) : 301 vers `https://cemater.com/`, 200, titre « Ojol333: Content Dispatch Layer untuk Menyampaikan Informasi Game Online… » ; la racine de `skeelbox.com` redirige au même endroit.
- `tsc` vert ; `verifier-json` : 195 JSON valides ; Vitest 400/400 ; `next build` vert (386 pages).
- `next start` local, desktop 1280 et mobile 390 : les 2 articles en 200 ; 0 lien `skeelbox` ; paragraphe sans balise ni espace parasite, « (Skeelbox) » présent ; 0 lien vide ; 0 erreur de page.
- Parcours de la CI `machine-selector` et `sommaire-blog` : 37/37 (Chromium préinstallé du conteneur, révision 1194 ; la CI utilise la sienne).
- Appels payants : aucun.

**Supposé** — Que la redirection observée depuis le conteneur est celle que voit un visiteur (R4).

**Non regardé** — Preview Vercel (SSO) ; `www` ; ESLint (étape non bloquante de la CI) ; `ETAT.md`, non modifié pour ne pas étendre les conflits de #90 et #92 ; fond de la statistique citée (AA5 b).

**Suite** — CI et Preview sur la nouvelle tête ; QA humaine de Laurent ; GO de fusion distinct. #90 puis #92 seront actualisées après le sort de #89, une à la fois.

---

## 2026-10-06 · Cluster AI Act (#96) synchronisé avec `main` `1e0901b` (#84) : sommaire de A vérifié, 15 articles intacts, CTA de fin d'article localisés · Claude de Laurent

**Chantier** : cluster AI Act (F2), D46 ; D44 (effet de #84 sur A) | **PR** : #96, brouillon | **Branche** : `ccr-e0a4796e-2p18xn` | **Base** : `main` `1e0901b` ; tête précédente `8d5b131`

**Quoi** —
- `main` `1e0901b` (fusion de #84) fusionné dans #96, sans rebase (`dfa792a`). Un conflit, ce fichier : toutes les entrées conservées, entrée #84 (09:01 UTC) placée au-dessus des deux entrées #96 du 06/10 (06:33 et 07:12 UTC).
- Aucun article modifié. `ETAT.md` (main, #84 livrée, #96, point CTA) et `CLUSTER.md` (§ 10 renvoyé au § 12, § 11 complété pour le sommaire de A, § 12 nouveau).

**Pourquoi** — Mission de Laurent du 06/10 : #84 fusionnée et vérifiée par Laurent sur `www` ; #96 n'était plus fusionnable (`dirty`, 4 commits de retard) et devait reprendre le sommaire corrigé avant le contrôle Chrome final.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/cluster-ai-act-2026-10-06/CLUSTER.md` ; par la fusion : `components/blog/TableOfContents.tsx`, `e2e/sommaire-blog.spec.ts` (contenu de `main`).

**Effet attendu** — À la fusion de #96 : les 15 articles avec le sommaire de #84 ; le spec `sommaire-blog` couvre A en CI sans modification (25 tests au lieu de 18).

**Vérifié** —
- Intégrité : `git diff 8d5b131 dfa792a` = les 3 fichiers de #84 ; les 46 fichiers de #96 identiques à l'octet. JOURNAL : 0 ligne retirée par rapport à `main` comme à `8d5b131`.
- QA 15 URL × 5 formats sur le build local de `dfa792a`, comparée champ par champ à celle de `8d5b131` : 0 écart (meta, canonique, robots, hreflang, JSON-LD, fil d'Ariane, liens, images, tableaux, FAQ) ; 0 débordement ; 0 erreur de console ; liens internes en 200.
- Sommaire de A (22 entrées), vrais viewports : 1 321 × 727, 1 440 × 900, 1 180 × 727, 1 024 × 768 : colonne collée à 96 px, liste plafonnée (567 à 740 px pour 954 px de contenu) et défilante, « Sources » et première entrée → titre à 96 px avec entrée active juste et visible, 21/21 entrées focalisées visibles au clavier, second clic à 150 ms → second titre, molette pendant le défilement → page laissée où le lecteur l'amène, pied de page non recouvert, 0 débordement. 390, 360, 820 px : « 3. Recolorisation », première, milieu, « Sources » → titre à 96 px, premier titre visible sous l'en-tête (« 4. Produit réel… » plus bas, à 1 246 px ou au-delà), panneau replié avant tout défilement.
- Spec `sommaire-blog` : 25/25, dont 12 tests sur A. `tsc` vert ; `verifier-json` 195 fichiers valides ; `next build` vert, 386 pages (`main` 371) ; Vitest 400/400 ; ESLint sans erreur sur les deux fichiers de #84 (#96 ne modifie aucun fichier TS ou JS).
- Suite Playwright complète, Chromium : branche 509 tests, 410 réussis, 99 échecs ; `main` `1e0901b` (même méthode, worktree) 502 tests, 403 réussis, 99 échecs ; listes d'échecs identiques, aucune page du cluster en cause (redirections, ancien calculateur ROI, responsive, seo, anchors AR-01).
- CTA : « Réservez votre démo » et « Calculez votre ROI » ne sont rendus sur aucune page du blog. Bandeau de fin d'article = `components/blog/ArticleCTA.tsx` (201 pages, articles et guides) ; cartes = section finale de l'accueil et de 6 autres gabarits (114 pages). Détail : `CLUSTER.md` § 12.
- Date : 15 articles en `2026-10-06`, publication envisagée le 06/10 : aucun changement.

**Supposé** — Vérification de #84 en production : constat de Laurent dans Chrome sur `www` (`WWW_PR84 = VERIFIED`), non refait ici (R4).
**Non regardé** — Preview de la nouvelle tête dans Chrome (contrôle humain, § 11) ; `www` (R4) ; Firefox, Safari, appareils réels ; sommaire de A en EN et de-ch (couvert par la QA de #84 du 06/10, non refait).

**Suite** — CI et Preview sur la nouvelle tête ; contrôle Chrome final de Laurent (`CLUSTER.md` § 11) ; décision de Laurent sur le bloc CTA visé et sur une PR dédiée ; « GO MERGE #96 ». À la fusion de la seconde de #82 et #96 : numéro de la « Q23 » à arbitrer (collision consignée par #82).
## 2026-10-06 · Landing catalogue All-in-One (#82) actualisée depuis `main` `1e0901b` · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Commit** : `dc7c2e6` (fusion)

**Quoi** — `main` `1e0901b` fusionnée dans la branche de #82, sans rebase, avant toute configuration de la Preview ou tout test réel. Entrés sur `main` depuis `9b19e6d` : `a4b27c6`, `063fd18`, `a26c58c`, `1e0901b` (#84, sommaire du blog, D44) ; fichiers `components/blog/TableOfContents.tsx`, `e2e/sommaire-blog.spec.ts`, `docs/seo-geo/JOURNAL.md`.

**Pourquoi** — GO de Laurent du 06/10 : GitHub déclarait #82 en conflit (`mergeable_state: dirty`).

**Fichiers** — Conflit unique : `docs/seo-geo/JOURNAL.md`, entrées ajoutées en tête des deux côtés. Résolution : toutes les entrées conservées à l'identique ; l'entrée #84 du 06/10 (commit `a26c58c`, 09:01 UTC) placée par heure, entre l'entrée #82 de 09:47 UTC et celle de 08:50 UTC. `components/blog/TableOfContents.tsx` et `e2e/sommaire-blog.spec.ts` repris de `main` sans changement. `ETAT.md` : lignes « Contrôle », « `main` » et « Dernière mise à jour ».

**Effet attendu** — Aucun pour le visiteur. #82 redevient fusionnable sans conflit ; son périmètre (`lib/catalogue`, `app/api/catalogue`, landing) est inchangé par la fusion.

**Vérifié** —
- Aucune ligne du JOURNAL de `main` ni de celui de #82 absente du fichier fusionné (comptage ligne à ligne) ; fichiers de #84 identiques à `main`.
- Invariants de #82 : `PDF_CATALOGUE.enLigne = true`, `SERVICES_REELS_AUTORISES = false`, `PUBLICATION_AUTORISEE = false`, personnes et organisations Pipedrive en v2, notes en v1, `CATALOGUE_NOTIFICATION_EMAIL` sans repli, note « [Brochure] » épinglée, aucun appel `/deals` ni `/leads`, formulaire et mention P3 inchangés.
- Contrôles sur la tête fusionnée : voir la description de #82 (tsc, eslint, `verifier-json`, Vitest, build, Playwright landing et sommaire, `/api/catalogue` en 503, gardes).

**Supposé** — Aucun.

**Non regardé** — La ligne #84 de `ETAT.md` (« Brouillon ; tête `a4b27c6` ») n'est pas réécrite, alors que #84 est fusionnée : chantier distinct, à mettre à jour par sa propre session. #96 n'est pas fusionnée : la collision du numéro Q23 reste ouverte.

**Suite** — Configuration de la Preview (`CATALOGUE_NOTIFICATION_EMAIL` et autres variables) sous GO séparé, puis GO d'exécution du test réel.

---

## 2026-10-06 · Landing catalogue All-in-One (#82) : variable `CATALOGUE_NOTIFICATION_EMAIL`, note « [Brochure] » épinglée, alignement sur le principe du parcours Contact · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Commit** : `a02f293`

**Quoi** — R1 : la notification interne du catalogue lit exclusivement `CATALOGUE_NOTIFICATION_EMAIL`, sans repli sur `NOTIFICATION_EMAIL`. R2 : la note « [Brochure] » est épinglée sur la fiche de la personne (`pinned_to_person_flag = 1`, à la création et à la mise à jour du suivi). Aucun appel réel ; les interrupteurs restent faux.

**Pourquoi** — Décisions de Laurent du 06/10, après la comparaison des parcours Contact et Brochure. Le parcours Brochure suit déjà le principe commercial de Contact (enregistrement du lead → notification interne → e-mail au prospect → suivi humain possible). Il n'en reprend pas les faiblesses techniques : v1 hors support, échecs Resend non détectés, HTML non échappé, organisation approximative, réponse 200 sans trace, destinataires codés en dur, promesse « 24 heures ouvrées », affaire d'office. `NOTIFICATION_EMAIL` est lue par le questionnaire : la changer en production aurait détourné ses notifications. Le code Resend de #82 n'est pas simplifiable par réutilisation : `/api/contact` n'a pas de module partagé, et ses conventions communes (expéditeur `PackshotCreator <RESEND_FROM_EMAIL>`) sont déjà celles du catalogue.

**Fichiers** — `lib/catalogue/services.ts`, `lib/catalogue/resend.ts` (commentaires), `lib/catalogue/pipedrive.ts`, `lib/catalogue/__tests__/doublures.ts`, `lib/catalogue/__tests__/services-reels.test.ts`. Une ligne ajoutée à `.env.example` dans `a02f293` a été retirée avant le push : la garde `verifier-consequences` interdit tout fichier `.env*` (dépôt public). La variable est documentée ici, dans Q23 et dans `services.ts`.

**Effet attendu** — Aucun pour le visiteur tant que la route est fermée. Au test réel : notification à `leads@sysnext.com` une fois la variable créée sur Vercel ; note « [Brochure] » en tête de la fiche personne.

**Vérifié** —
- Variable absente, vide, sans adresse valide, ou `NOTIFICATION_EMAIL` seule présente : aucune notification, absence journalisée (`catalogue.notification.non_configuree`) et consignée dans la note, `contactRequestAccepted` faux, seul l'e-mail au prospect part (4 tests). Avec les deux variables, seule celle du catalogue reçoit.
- Note : `pinned_to_person_flag: 1` à la création (avec `person_id` et `org_id`) et à la mise à jour ; aucun autre drapeau d'épinglage ; demande rejouée sans nouvelle note ; aucune affaire ni Lead. La doublure n'accepte que 0 ou 1 (documentation Pipedrive) et refuse tout autre épinglage.
- Contre-épreuves (code remis à l'identique, `cmp`) : repli sur `NOTIFICATION_EMAIL` → 1 échec ; lecture de `NOTIFICATION_EMAIL` seule → 6 ; note non épinglée à la création → 1 ; drapeau absent de la mise à jour → 1 ; drapeau booléen → 21.
- `npx tsc --noEmit` vert ; eslint de `lib/catalogue` et `app/api/catalogue` : 0 avertissement ; `verifier-json` : 180 valides ; `npx vitest run` : 518/518 ; `npx next build` vert (373 pages, valeurs factices) ; `/api/catalogue` locale : 503 ; Playwright : 45/45 sur Chromium, landing 33/33 sur Mobile Chrome.

**Supposé** — Qu'une mise à jour `PUT /v1/notes/{id}` ne retire pas l'épinglage : le drapeau y est renvoyé pour ne pas en dépendre. Que Pipedrive admette plusieurs notes épinglées sur une même personne (demandes répétées) : non vérifié en réel.

**Non regardé** —
- Vercel : `CATALOGUE_NOTIFICATION_EMAIL` n'est pas créée (hors GO de cette mission).
- `/api/contact` : non modifiée ; ses problèmes techniques sont un chantier séparé, signalé dans Q23.
- Formulaire : ni nom ni téléphone ajoutés (faible friction, décision de Laurent) ; mention P3 inchangée, en attente de Sébastien.

**Suite** — Avant le GO d'exécution du test réel : création de `CATALOGUE_NOTIFICATION_EMAIL` (Preview) et contrôle des autres variables sous GO séparé, domaine Resend, deux adresses de test.

---

## 2026-10-06 · #84 finalisée : sommaire du blog vérifié sur l'article A du cluster AI Act, entrée active juste, molette respectée · Claude de Laurent

**Chantier** : D44 (R-UX-LONG), forme B | **PR** : #84, brouillon, branche `ccr-79f70eb9-ux-blog` | **Base** : `main` `9b19e6d`, fusionnée dans la branche (`063fd18`), tête précédente `a4b27c6`

**Quoi** —
- Synchronisation : `main` fusionné dans la branche, sans rebase (22 commits de retard). Un conflit, ce fichier : entrées de `main` conservées à l'identique, entrée #84 du 03/10 replacée à sa date (après « D45 — référentiel », 07:17 UTC ; avant « CI — Vitest », 08:50 UTC). Aucune ligne supprimée.
- `components/blog/TableOfContents.tsx`, trois corrections, le reste inchangé (repli avant défilement, liste plafonnée `calc(100vh - 10rem)`, corrections d'arrivée) :
  - entrée active calculée sur la position des titres (dernier titre arrivé à sa marge de défilement, 96 px), à chaque défilement ; le titre atteint par un clic devient l'entrée active. L'`IntersectionObserver` sur une ligne à 20 % de la fenêtre est retiré ;
  - un geste du lecteur hors du sommaire (molette, toucher, clic, touche) arrête les corrections d'arrivée ;
  - un clic sur une autre entrée remplace le défilement en cours ; les gestes faits dans le sommaire n'interrompent pas.
- `e2e/sommaire-blog.spec.ts` : 8 tests deviennent 18 sur `main`, 25 quand l'article A est présent (#96).

**Pourquoi** — QA Chrome de la Preview #96, article A (`/fr/blog/ai-act-images-produit`, 22 entrées) : à 1 321 × 727, liste de 884 px sans défilement interne ; à 390 px, titre de « 3. Recolorisation » à environ 717 px au-dessus de l'écran. Ces deux défauts viennent du code de `main`, que #84 corrige. Mesures du 06/10 sur A, build local `main` + #96 :
- desktop, 4 viewports : sommaire de 990 px, 5 à 8 entrées hors écran, dernière entrée non cliquable ;
- mobile 390, 360, 820 px : titre visé à −809, −826 et −707 px.

Deux défauts du code de #84 au 03/10, mesurés sur A avec #84 + #96 :
- entrée active fausse après un clic sur la première entrée (4 viewports sur 4), absente après la dernière à 1 024 × 768 ;
- molette du lecteur pendant le défilement annulée : page ramenée de force sur le titre (`scrollY` 9 419 → 18 565). Sur `main`, la page restait où le lecteur l'amenait.

Une première version de la correction de la molette interrompait aussi sur un appui dans le sommaire : la liste recentrée bougeait sous le pointeur, un second clic rapproché (150 ms) était perdu. Corrigé avant commit ; le test « deux clics rapprochés » le couvre.

**Fichiers** — `components/blog/TableOfContents.tsx`, `e2e/sommaire-blog.spec.ts`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Navigation dans les 122 articles du gabarit commun et les 6 pages dédiées : toutes les entrées atteignables, titre visé sous l'en-tête après clic, toucher ou Entrée, entrée active juste et visible, molette du lecteur jamais contrariée.

**Vérifié** —
- Builds locaux de production, vrais viewports Playwright (Chromium 141), mesures de position en fin de défilement :
  - A en FR, EN, de-ch ; anciens articles : sommaire court (3 entrées), long (41), images chargées en route (deux articles), tableau. 1 321 × 727, 1 440 × 900, 1 180 × 727, 1 024 × 768 ; 390, 360, 820 px ; mouvement réduit. 64 cas, 0 écart : liste dans la fenêtre, défilement interne quand elle dépasse, dernière entrée atteinte, titre à 96 px du haut (31 px sous l'en-tête de 65 px) et premier titre visible, entrée active juste et visible, focus clavier visible sur chaque entrée, pied de page non recouvert, contenu principal immobile, aucun débordement horizontal, repli du panneau environ 30 ms avant le premier défilement ;
  - pages dédiées : `guide-achat-studio-2026` et `comment-calculer-le-roi…` (latéral, 4 viewports), `orbitvu-vs-concurrents` et `ia-photo-produit-guide-2026` (repliable, 390, 360, 820 px, mouvement réduit) : 0 écart, hors le débordement horizontal à 1 024 px de `guide-achat-studio-2026`, identique sur `main` ;
  - clics rapprochés (150 et 400 ms) : la page finit sur le second titre ; molette 300 ms après un clic : page laissée où le lecteur l'amène.
- 151 pages de blog servies par `main` + #96 et par #84 + #96 : `id`, liens, JSON-LD, `<title>`, description, canonique, hreflang et titres identiques ; HTML identique hors balisage du sommaire.
- Spec `sommaire-blog` : 18/18 sur la branche ; 25/25 sur #84 + #96. Contre-épreuves, sans mutation du code : code de `main` + #96, 24 échecs sur 25 (dont « bas du sommaire dans la fenêtre » ×10, « 3. Recolorisation : titre sous l'en-tête » à 390, 360 et 820 px) ; code de #84 au 03/10 + #96, 10 échecs (entrée active, molette, second clic).
- `npx tsc --noEmit` vert ; eslint vert sur les deux fichiers ; `npx next build` vert (371 pages) ; Vitest 400/400 ; `verifier-json` 180 fichiers valides.
- `e2e/anchors.spec.ts` : 6/7 sur la branche comme sur `main` + #96 ; l'échec, identique, est `#calculateur-roi` sur Studios (AR-01, #93), spec différé en CI.

**Supposé** — Safari et Firefox : `scrollend` absent selon les versions, garde de 2 s ; non testé.
**Non regardé** — Firefox, Safari, iOS et Android réels, lecteur d'écran réel ; Preview contrôlée dans Chrome par un humain ; `www` (R4). `docs/seo-geo/ETAT.md` non modifié : la ligne #84 date du 03/10, et #96 réécrit ce fichier (collision évitée).

**Suite** — CI sur la nouvelle tête ; contrôle Chrome de la Preview par Laurent ; GO de fusion distinct. Fusion de #84 avant ou après #96 : aucun fichier commun hors ce journal ; à la fusion de #96, le spec couvre A sans modification.

---

## 2026-10-06 · Cluster AI Act (#96) — continuation : auteur « PackshotCreator », décisions de Laurent consignées, QA finale · Claude de Laurent

**Chantier** : cluster AI Act (F2), D46 | **PR** : #96, brouillon | **Branche** : `ccr-e0a4796e-2p18xn` | **Base** : `main` `9b19e6d` (inchangé depuis la mission initiale, fresh-check du 06/10)

**Quoi**
- Auteur des 15 articles : « Sébastien Jourdan » → « PackshotCreator ». Le schéma `Article.author` pointe désormais vers l'organisation (`…/#organization`), sans profil LinkedIn personnel.
- C (FR, EN, de-ch) : la note d'ouverture précise que la personne de l'image d'en-tête est entièrement synthétique.
- D46 complétée par les précisions de Laurent : `PUBLICATION_AUTHORITY = LAURENT`, `SEBASTIEN_VALIDATION = NOT_RECEIVED` (ce cluster seulement) ; `D16_EXCEPTION = YES` (AI Act B, C, D, Laurent, 06/10, D16 inchangée pour la suite) ; date réelle de publication ; fusion sur « GO MERGE #96 » seulement. Q23 mise à jour (information, sans blocage).
- `CLUSTER.md` : QA finale des visuels B, C, D ; checkpoint final ; checklist de contrôle humain de la Preview (§ 11).
- Rien d'autre : ni `TableOfContents.tsx` (#84), ni gabarit SEO (BL-43-1), ni BlendAI, ni ROI / #93, ni Studios, ni `pr-checks.yml`.

**Pourquoi** — Mission de continuation de Laurent du 06/10 : finaliser #96 sans élargir son rayon.

**Fichiers** — 15 articles du cluster (`author`, note de C), `docs/seo-geo/{DECISIONS,ETAT,JOURNAL,BOITE-AUX-LETTRES}.md`, `docs/seo-geo/cluster-ai-act-2026-10-06/CLUSTER.md`

**Effet attendu** — Aucun avant la fusion.

**Vérifié**
- Fresh-check : `main` `9b19e6d`, tête de #96 `9aaaecc` avant ce commit, identiques à l'état de référence.
- `verifier-json` 195 valides ; `next build` vert, 386 pages ; schéma `Article.author` = organisation sur les 15 URL.
- QA 15 URL × 5 formats (1440, 1180, 820, 390, 360) : 0 anomalie (200, 0 débordement de page, images chargées, 0 erreur de console, 0 requête en échec, liens internes en 200, 1 `h1`, FAQ = `FAQPage`, `html lang` conforme, 5 hreflang, aucune balise `robots`, 0 « ß », 0 tiret cadratin) ; tableaux larges de A et D en défilement interne à 390 et 360 px.
- Largeur de lecture : article de 656 px (`max-w-prose`) sur les 15 URL à 1440 et 1180 px, comme l'article témoin `migrer-ancien-packshotcreator` ; seul le `<code>` de D dépasse, à l'intérieur de son `<pre>`.
- Sommaire : desktop, 15/15 (entrées = titres ; clic → titre à 96 px du haut). Mobile : après un toucher, le titre visé finit au-dessus de l'écran ; même mesure sur 4 articles existants (`migrer` FR et EN, `generer-images-produit-ia`, `alphashot-xl-g2`) : défaut du gabarit actuel, corrigé par #84, non dupliqué ici.
- Langue : aucune phrase française accidentelle en EN ou de-ch (seuls des noms officiels français, attendus).
- Anti-cannibalisation : aucun H2 ni aucune FAQ en double entre A, S, B, C, D (hors « Sources »).
- Visuels B0, B1, C0, C2, D0 contrôlés à 100 % : aucune marque identifiable, aucun texte lisible ; cadran de la montre de C2 : quelques signes de pseudo-texte illisibles, imperceptibles à la taille d'affichage [Inférence]. Aucun visuel retiré.
- e2e (7 specs) sur la branche : 299 réussis, 24 échecs, liste identique à `main` (`9b19e6d`, inchangé).

**Supposé** — [Inférence] La personne de C0 ne ressemble à aucune personne réelle identifiable : provenance générée par IA (#79), ressemblance non vérifiable. Cela repose sur des schémas observés.

**Non regardé** — Preview Vercel (SSO, contrôle humain de Laurent), `www` (R4), Safari, Firefox, appareils réels.

**Suite** — Contrôle humain de la Preview (checklist `CLUSTER.md` § 11) ; date réelle de publication au dernier commit ; « GO MERGE #96 » de Laurent.

---

## 2026-10-06 · Cluster AI Act — cinq articles en FR, EN et de-ch prêts pour une publication coordonnée (D46) · Claude de Laurent

**Chantier** : cluster AI Act (F2), D46 | **PR** : #96, brouillon | **Branche** : `ccr-e0a4796e-2p18xn` | **Base** : `main` `9b19e6d`

**Quoi**
- #59 (A), #60 (S) et #77 fusionnées dans la branche (historique et entrées de JOURNAL conservés, insertion chronologique, contrôle par comptage de lignes) ; contenus identiques aux têtes `2a36322`, `74ae921`, `a207fe3` avant les modifications ci-dessous.
- B (`retouche-ia-photo-produit`), C (`mannequin-invisible-modele-virtuel-avatar`), D (`images-ia-metadonnees-marketplaces`) créés comme articles du blog depuis la matière de #79 (textes du 02/10, FAQ, 5 AVIF identiques à l'octet). Non repris : pages `/revue-interne/`, garde Preview, 8 modules SVG, notes de relecture. #79 n'est pas fusionnée.
- Registre juridique du 06/10 (`docs/seo-geo/cluster-ai-act-2026-10-06/REGISTRE-JURIDIQUE.md`) appliqué : statut des lignes directrices C(2026) 5054 (contenu approuvé le 20/07/2026, adoption formelle annoncée, non constatée au 06/10) ; article 50(5) ; paraphrase de l'exception de l'article 50(2) ; aide Google 6324350 (versions FR et DE : refus du produit ; EN restructurée : sans) ; PFPDT (« messages vocaux », réserve pénale) ; calendrier suisse (Chancellerie « d'ici à la fin 2026 », Portail PME « printemps 2027 »).
- Zalando, page « Updated October 1, 2026 » relevée le 06/10 : « Invisible marking (required by December 2026) », « We strongly recommend… », « You must embed identifying data… ». Formulation prudente conservée, désormais citée : intitulé et recommandation rapportés tels quels, sans conversion en obligation certaine. **ZALANDO_STATUS = SOURCE RECONTRÔLÉE, AMBIGUË DANS LA SOURCE ; FORMULATION PRUDENTE CITÉE.**
- EN des cinq articles et de-ch des cinq (adaptation suisse : phrase de cadrage UE / Suisse dans A, B, C, D ; UWG renvoyé à S dans A ; droit français toujours « in Frankreich » ; sources officielles suisses en version allemande ou anglaise vérifiée).
- Maillage : A → B, C, D, S ; B → A, D ; C → A, B, D ; D → A, C ; S → A, D ; de-ch A, B, C, D → S ; `generer-images-produit-ia` (FR) et articles « migrer » (FR, EN, de-ch) → A ; `llms.txt` → A, S. Aucun lien vers F5, aucun fichier de Mode modifié.
- `alternates.json` : 5 entrées ; `globals.css` : en-têtes de tableau sur plusieurs lignes et cellules resserrées sous 640 px, blocs `<pre>` du blog en défilement interne.
- D46 inscrite ; D41 marquée remplacée sur le seul principe des satellites ; Q23 (information de Sébastien).

**Pourquoi** — Mission de Laurent du 06/10 : publier le cluster sans attendre le retour de Sébastien, de façon coordonnée, après checkpoint et GO de publication explicite.

**Fichiers** — `content/blog/{fr,en,de-ch}/` (15 articles du cluster ; `generer-images-produit-ia`, articles « migrer »), `content/blog/alternates.json`, `public/images/blog/{retouche-ia-photo-produit,mannequin-invisible-modele-virtuel-avatar,images-ia-metadonnees-marketplaces}/`, `app/globals.css`, `public/llms.txt`, `docs/seo-geo/{DECISIONS,ETAT,JOURNAL,BOITE-AUX-LETTRES}.md`, `docs/seo-geo/cluster-ai-act-2026-10-06/`

**Effet attendu** — Aucun avant la fusion. Après fusion : 15 URL indexables, hreflang complet (fr, fr-CH, en, de-CH, x-default) ; pilier mis en avant en tête de `/fr/blog`, `/en/blog`, `/de-ch/blog`.

**Vérifié**
- `verifier-json` 195 valides ; `tsc` vert ; Vitest 400/400 ; `next build` vert, 386 pages (371 sur `main`).
- `next start`, Chromium, 15 URL × 5 formats (1440 × 900, 1180 × 820, 820 × 1180 tactile, 390 × 844 et 360 × 740 mobiles) : 200, 0 débordement de page, toutes les images chargées, 0 erreur de console, 0 requête en échec, un seul `h1`, FAQ visibles = `FAQPage` (A 7, B 5, C 5, D 5, S aucune), 0 ancre cassée, liens internes en 200. Tableaux : aucune colonne hors champ à 820 px et au-delà ; à 390 et 360 px, défilement interne pour les tableaux de A (4) et de D (1), comme pour A sur `main` avant cette PR.
- Métadonnées : title de 49 à 62 caractères, description de 125 à 155, canonique propre à chaque URL, aucune balise `robots`, hreflang identiques sur les trois langues de chaque article, `og:image` = image d'en-tête, JSON-LD Organization, BreadcrumbList, Article (+ FAQPage) ; 15 URL au sitemap ; sélecteur de langue vers l'article correspondant.
- e2e `seo`, `language-switch`, `mobile-overflow`, `machine-selector`, `internal-links`, `internal-links-all`, `responsive` : branche et `main` (worktree, même build) : 299 réussis, 24 échecs chacun, listes identiques.
- `globals.css`, six articles existants à tableau (`alphashot-xl-g2` et « migrer », 3 langues) : à 1440 px inchangés ; à 390 px, colonnes hors champ réduites (ex. `migrer` FR : 570 → 410 px de large), aucune page dégradée.
- BlendAI : 0 occurrence dans les 15 articles. F5 : 0 lien.
- Baseline GSC (`gsc-crawl-seo`, site 3, données au 03/10) : `CLUSTER.md`, section 6.

**Supposé** — [Inférence] La césure (`hyphens: auto`) s'applique sur Chrome et Safari grand public ; le Chromium du conteneur ne l'applique pas. Cela repose sur des schémas observés.

**Non regardé** — Preview Vercel (SSO) et `www` (R4) ; Safari, Firefox, appareils réels ; Légifrance et Amazon (inaccessibles par script le 06/10) ; template du blog : `twitter:*` hérité du site, `og:url`, `og:locale` et `inLanguage` de l'`Article` absents sur tous les articles (BL-43-1, PR distincte) ; `og:image` en AVIF, non lu par plusieurs réseaux sociaux (préexistant).

**Suite** — Checkpoint de la mission ; GO de publication explicite de Laurent ; fusion ; contrôle J0 sur `sysnext.vercel.app` puis `www` dans Chrome ; mesure J+7, J+28, J+56 ; [Inférence] GitHub marquera #59, #60 et #77 comme fusionnées à la fusion de cette PR, leurs têtes étant incluses ; #79 reste ouverte (REVIEW ONLY) ou se ferme sur décision de Laurent.
## 2026-10-06 · Landing catalogue All-in-One (#82) : Pipedrive en API v2 (personnes, organisations), décisions T1, T2, P3, P5 consignées · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Commit** : `c0e4b89`

**Quoi** — Les cinq appels « personnes » et « organisations » de `lib/catalogue/pipedrive.ts` passent en API v2 ; les notes restent en v1. Aucun appel réel : `SERVICES_REELS_AUTORISES` et `PUBLICATION_AUTORISEE` restent faux.

**Pourquoi** — Audit des prérequis du test réel (mission de Laurent du 06/10) : Pipedrive a déprécié au 01/01/2026, puis mis hors support le 01/08/2026, les points d'accès v1 des personnes et des organisations ([changelog](https://developers.pipedrive.com/changelog/post/deprecated-apiv1-endpoints-become-out-of-support) : « may remain functional », sans engagement ni date de retrait). GO de Laurent du 06/10 pour une migration ciblée avant tout test réel.

**Fichiers** — `lib/catalogue/pipedrive.ts`, `lib/catalogue/__tests__/doublures.ts`, `lib/catalogue/__tests__/services-reels.test.ts`.

**Contrat appliqué** — vérifié sur le client officiel `pipedrive` 33.4.3 (`dist/versions/v2`, lu via jsdelivr) et la documentation développeurs :
- base `https://api.pipedrive.com/api/v2` ; jeton dans l'en-tête `x-api-token`, jamais dans l'URL ;
- `GET /persons/search` et `GET /organizations/search` (`term`, `fields`, `exact_match`, `limit`), réponse `data.items[].item` ; `exact_match` non sensible à la casse ;
- `POST /persons` avec `emails` au pluriel (`value`, `primary`, `label`) et `org_id` ; `PATCH /persons/{id}` au lieu de PUT ; `POST /organizations` avec `name` ; réponse `{ success, data: { id } }` ;
- notes en v1, inchangées (`api_token` en paramètre, comme `/api/contact`) : absentes de la liste de dépréciation, sans équivalent v2 ;
- un identifiant non numérique dans une réponse fait échouer l'appel (500, aucun doublon, aucun faux succès).

**Effet attendu** — Aucun pour le visiteur : la route reste en 503. Au test réel, les fiches seront écrites par l'API v2.

**Vérifié** —
- Doublure stricte : chaque route a sa version, sa méthode et son authentification ; tout écart est refusé (405, 410, 401, 400) et consigné.
- 15 tests ajoutés (K) : ordre et adresses des appels, PATCH `{ org_id }` seul, jeton en en-tête et absent des URL v2, paramètres de recherche, corps de création, erreurs HTTP 400 à 500 sans jeton ni donnée saisie, formes de réponse inattendues, refus d'une régression par la doublure.
- Contre-épreuves (code remis à l'identique ensuite, vérifié par `cmp`) : recherche de personne en v1 → 21 échecs ; `email` au singulier → 12 ; jeton aussi dans l'URL v2 → 21 ; PUT au lieu de PATCH → 1 ; organisation créée en v1 → 7.
- `npx tsc --noEmit` vert ; eslint de `lib/catalogue` et `app/api/catalogue` : 0 avertissement ; `verifier-json` : 180 valides ; `npx vitest run` : 509/509 ; `npx next build` vert (373 pages, valeurs factices) ; `/api/catalogue` locale : 503 `catalogue_unavailable` ; Playwright : landing et sélecteur 45/45 sur Chromium, landing 33/33 sur Mobile Chrome.

**Décisions de Laurent du 06/10 (Q23)** —
- T1 : écritures de test autorisées sur le principe : deux personnes, deux organisations (`TEST PR82 A — à supprimer`, `TEST PR82 B — à supprimer`), deux notes, puis suppression. Exécution en attente d'un GO distinct.
- T2 : destinataire métier des notifications catalogue : `leads@sysnext.com`. Configuration Vercel non vérifiée ; `NOTIFICATION_EMAIL` est partagée avec `/api/submit-survey`, ne pas la modifier en production. Variable dédiée proposée dans Q23, non codée.
- P3 : nouvelle mention du formulaire proposée par Laurent, validation de Sébastien en attente. Formulaire non modifié.
- P5 : migration v2 décidée et implémentée sur #82 (ce commit).

**Supposé** — Que le jeton de production soit accepté par `https://api.pipedrive.com/api/v2` avec l'en-tête `x-api-token` : c'est l'adresse du client officiel, mais seul le premier appel réel le prouvera.

**Non regardé** —
- `/api/contact`, `/api/roi-lead`, `/api/roi-pdf`, `/api/submit-survey` et `lib/pipedrive.ts` : toujours en v1 en production, hors du périmètre du GO. Signalé à Sébastien dans Q23.
- Variables Vercel (Preview) et domaine Resend : aucun accès depuis la session.
- Collision de numéro : la branche `ccr-e0a4796e-2p18xn` (#96, cluster AI Act) emploie aussi « Q23 » pour une autre question. Signalée dans Q23, rien renuméroté ni modifié sur #96.

**Suite** — Avant le GO d'exécution du test réel : contrôle Vercel des variables de la Preview (dont `NOTIFICATION_EMAIL`), statut du domaine Resend, deux adresses de test absentes de Pipedrive. P1, P2, P4 et la validation de P3 restent chez Sébastien.

---

## 2026-10-06 · Landing catalogue All-in-One (#82) : PDF en ligne sur R2, `enLigne = true`, services réels toujours fermés · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Commit** : `1ad2aad`

**Quoi** — `PDF_CATALOGUE.enLigne` passe à `true` (`lib/catalogue/pdf.ts`). `SERVICES_REELS_AUTORISES` et `PUBLICATION_AUTORISEE` restent faux : `/api/catalogue` répond toujours 503 et n'appelle ni Resend ni Pipedrive.

**Pourquoi** — GO de Laurent du 06/10, après son envoi du PDF sur R2 et son contrôle depuis son poste Windows (fait métier). URL : `https://videos.packshot-creator.com/catalogues/orbitvu-all-in-one-2026-fr.pdf`.
- Résultats de Laurent : HTTP 200, `application/pdf`, 15 380 434 octets, SHA-256 `0d72b2079706546e241f029f38836985e152ef2af956104322fd343bfc6730e5`.
- `X-Robots-Tag: noindex` présent, mais deux fois.

**Fichiers** — `lib/catalogue/pdf.ts`, `app/api/catalogue/route.ts` (commentaire), `lib/catalogue/__tests__/services-reels.test.ts`. Hors dépôt : objet R2 `packshot-videos/catalogues/orbitvu-all-in-one-2026-fr.pdf` et règle d'en-tête de réponse, posés par Laurent le 06/10. La session n'a rien écrit sur Cloudflare ni sur R2.

**Effet attendu** — Aucun pour le visiteur tant que les services réels sont fermés. Au GO de test réel, la route pourra remettre ce lien.

**Vérifié** —
- Relecture de l'URL publique depuis la session, en lecture seule :
  - HTTP 200, `content-type: application/pdf`, `content-length: 15380434` ;
  - SHA-256 du fichier téléchargé identique ;
  - `x-robots-tag: noindex` reçu deux fois ;
  - `last-modified` du 06/10 à 07:43:41 GMT, `etag` `cf2fbde2dd4342349cad59dba525af62`.
- Contrôles :
  - `npx tsc --noEmit` vert ; eslint : 0 avertissement ;
  - `npx vitest run` : 494/494 ; nouveau test : PDF en ligne et secrets présents, services réels faux → 503, aucun appel ;
  - `npx next build` vert (373 pages) ;
  - `/api/catalogue` locale : 503 `catalogue_unavailable` ;
  - Playwright : landing et sélecteur 45/45 sur Chromium, landing 33/33 sur Pixel 5.

**Supposé** — Aucun.

**Non regardé** —
- Origine du doublon `X-Robots-Tag` (règle de transformation en double, ou autre source) : ne pas modifier Cloudflare dans cette mission.
- Configuration exacte de la règle posée par Laurent (expression, portée) : non lisible avec le jeton de la session.
- `05-INFRA.md` non mis à jour, faute de connaître la règle exacte.

**Suite** — GO distinct de Laurent pour les tests réels contrôlés de Resend et Pipedrive. Q23 reste ouverte.

---

## 2026-10-06 · Landing catalogue All-in-One (#82) : alignement sur les règles brochure de Sébastien du 02/10 · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Commit** : `f5462b5`

**Quoi** —
- Note Pipedrive typée « [Brochure] » : « lead brochure », ni demande de démonstration ni affaire qualifiée. Elle porte l'identifiant de brochure, la langue et le signalement des adresses grand public. Plus aucune phrase d'interdiction d'appel.
- Notification interne pour chaque nouvelle demande (objet `[Brochure] entreprise`), avec la demande de consultant en tête quand elle existe.
- E-mail : chemins de retour « Demander une démo » et « Calculer mon ROI ».
- GA4 : `form_submit` (`brochure_form`), `brochure_download`, `form_error`.
- Limite de fréquence portée à 5 demandes par heure et par IP.

**Pourquoi** — Document « Formulaire brochure — règles de maillage pour Laurent » (Sébastien, 02/10), fourni par Laurent le 06/10 et lu en entier. Il est confronté au code de #82. Les faits métier de Laurent du 06/10 priment sur le même point :
- la demande de brochure est un lead, à compter à part ;
- téléphones conservés ;
- aucune interdiction d'appel codée ;
- landing validée par Sébastien, FR seule ;
- PDF tel quel.

**Fichiers** — `lib/catalogue/crm.ts`, `courriel.ts`, `resend.ts`, `services.ts`, `gestionnaire.ts`, `schema.ts` (constantes `BROCHURE_ID`, `LANGUE_CATALOGUE`), `app/api/catalogue/route.ts`, `components/landings/catalogue-all-in-one/mesure.ts`, `CatalogueForm.tsx` (appel de mesure seulement), tests du catalogue.

**Effet attendu** — Aucun tant que les interrupteurs sont faux. Ensuite :
- chaque demande donne une note `[Brochure]`, un e-mail au prospect et une notification interne ;
- GA4 compte une conversion `form_submit` par demande acceptée ; Pipedrive reste la source du volume.

**Vérifié** —
- Écarts traités, par paragraphe du document :
  - § 3 règle 7 et § 5 : chemins de retour dans l'e-mail, libellés et destinations déjà publiés (`blogArticle.ctaDemo` vers `/contact`, `blogArticle.ctaRoi` vers `/calculateur-roi`, comme `ArticleCTA`), adresses fixes ;
  - § 4 : adresse grand public signalée, jamais refusée ; 5 demandes par heure et par IP ;
  - § 5 : notification `[Brochure] entreprise` lue dans `NOTIFICATION_EMAIL`, sans la mention « ne pas appeler » (écartée par le fait du 06/10) ;
  - § 6 : `form_submit`, `form_name: 'brochure_form'`, `brochure_id`, `page_type`, `locale` ; `brochure_download`.
- Contrôles :
  - `npx tsc --noEmit` vert ; eslint de la landing : 0 avertissement ;
  - `npx vitest run` : 493/493, dont 93 pour le catalogue ;
  - `npx next build` vert (373 pages) ;
  - Playwright : landing et sélecteur 45/45 sur Chromium, landing 33/33 sur Pixel 5.
- Contre-épreuves (fichier restauré à l'identique) : notification limitée au consultant → 3 échecs ; consultant déclaré accepté sans notification → 5 échecs.
- PDF joint à la mission : SHA-256 identique au fichier contrôlé le matin (`0d72b207…`).

**Supposé** — Les libellés publiés « Demander une démo » et « Calculer mon ROI » conviennent à l'e-mail. Le texte de l'e-mail reste à relire par Sébastien (§ 4 et § 5 : textes client écrits par lui).

**Non regardé** —
- Étiquette Pipedrive « Brochure » (§ 6) : identifiant non connu, renvoyé à Q23.
- Lien vers la fiche ou le secteur d'origine : la landing est autonome ; aucune page d'origine, et `machineContext` est absent.
- Lien vers la démonstration sur l'état de succès (§ 4) : landing validée, interface non modifiée.

**Suite** — Q23 complétée. GO R2, puis GO de test réel.

---

## 2026-10-06 · Landing catalogue All-in-One (#82) : parcours fonctionnel V1 (Pipedrive, Resend, consultant, PDF R2, GA4), sans appel réel · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Commits** : `7aa3001` (code), `ffee83c` (fusion de `main` `9b19e6d`, #95)

**Quoi** — `/api/catalogue` reçoit ses adaptateurs, tous verrouillés :
- trace durable dans Pipedrive : personne retrouvée par e-mail (sinon créée), organisation par nom exact (sinon créée), note « Demande de catalogue » portant le requestId, puis le suivi (e-mail, consultant) ;
- e-mail du lien au prospect par Resend, texte existant de `courriel.ts` ;
- consultant demandé : mention explicite dans la note et notification interne aux destinataires de `NOTIFICATION_EMAIL` ;
- URL R2 du PDF dans `lib/catalogue/pdf.ts`, `enLigne = false` ;
- événements GA4 accompagnés de paramètres de contexte sans donnée personnelle.

**Aucune affaire n'est créée**, ni pour une brochure seule, ni pour une demande de consultant. Interrupteur `SERVICES_REELS_AUTORISES = false` : la route répond toujours 503. En production, elle reste fermée tant que `PUBLICATION_AUTORISEE` est faux.

**Pourquoi** — Mission de Laurent du 06/10 : finalisation fonctionnelle avant publication. Landing validée par Sébastien (fait rapporté par Laurent le 06/10). Une demande de brochure n'est pas un lead qualifié : ni appel automatique, ni affaire créée en silence, ni étape Pipedrive choisie sans Sébastien.

**Fichiers** —
- Nouveaux : `lib/catalogue/pipedrive.ts`, `lib/catalogue/resend.ts`, `lib/catalogue/pdf.ts`, `lib/catalogue/__tests__/services-reels.test.ts`, `lib/catalogue/__tests__/mesure-ga4.test.ts`, `lib/catalogue/__tests__/doublures.ts`.
- Modifiés : `lib/catalogue/services.ts`, `gestionnaire.ts`, `crm.ts`, `activation.ts`, `app/api/catalogue/route.ts`, `components/landings/catalogue-all-in-one/mesure.ts`, `CatalogueForm.tsx` (appel de mesure seulement ; champs et textes inchangés), tests existants du catalogue.
- Hors dépôt : aucun ; le PDF n'est pas versionné.

**Effet attendu** — Aucun tant que les interrupteurs sont faux. Après GO R2 (`enLigne = true`) et GO de test réel (`SERVICES_REELS_AUTORISES = true`), sur la Preview :
- une demande crée ou retrouve la personne et l'organisation, puis écrit une note ;
- le prospect reçoit un e-mail portant le lien ;
- si un consultant est demandé, l'équipe reçoit une notification.

**Vérifié** —
- **PDF désigné** (fait métier de Laurent du 06/10), `All_in_One_FR_online_pages_web_version.pdf` :
  - 15 380 434 octets, SHA-256 `0d72b2079706546e241f029f38836985e152ef2af956104322fd343bfc6730e5` ; c'est le nom et la taille du fichier propre décrit dans le brief initial ;
  - 28 pages, A4 paysage 841,89 × 595,28 pt ; MediaBox, CropBox, BleedBox, TrimBox et ArtBox identiques sur les 28 pages, sans rotation ;
  - PDF 1.6 linéarisé ; 32 polices incorporées sur 32 ; ni lien, ni formulaire, ni JavaScript, ni chiffrement ;
  - rendu des 28 pages sans erreur par Poppler et par PDFium 156 (moteur de Chrome, hors interface du navigateur) ; analyse pypdf sans avertissement ;
  - texte identique mot pour mot (2 408 mots) au PDF QA du 02/10 ; rendu aligné : écarts limités aux contours ;
  - **utilisé tel quel, aucun fichier dérivé**.
- **QR du PDF** : mêmes 13 pages et mêmes destinations que le 02/10. Les adresses `orbitvu.fr` répondent 200 après redirection le 06/10. YouTube répond 429 : non vérifié.
- **K1–K6 du dépôt** comparés au nouveau PDF : écarts limités aux contours. Aucun réexport.
- **Contrôles** :
  - `npx tsc --noEmit` vert ; `verifier-json` : 180 JSON valides ; `npx vitest run` : 489/489, dont 89 pour le catalogue ; eslint des fichiers de la landing : 0 avertissement ;
  - `npx next build` vert (373 pages, valeurs factices) ;
  - Playwright : landing et sélecteur 45/45 sur Chromium, landing 33/33 sur Pixel 5 ;
  - contrôle local à 1440, 1024, 768, 390 et 320 : aucun débordement ; vidéo 16:9 et une requête MP4 à partir de 768 ; aucune requête MP4 en dessous.
- **Contre-épreuves**, fichier restauré à l'identique ensuite : dédoublonnage désactivé → le test F échoue ; création d'affaire ajoutée → les tests A et B échouent.
- **R2**, en lecture seule (API Cloudflare) :
  - un seul bucket, `packshot-videos` (WEUR) ;
  - `videos.` figure dans les `PASSTHROUGH_HOSTS` du Worker ; règle WAF 4 « Skip SBFM » sur cet hôte (05-INFRA) ;
  - objet cible absent (404 le 06/10) ;
  - `wrangler r2 object put` n'accepte aucun en-tête libre : `X-Robots-Tag` passe par une règle de transformation de réponse.

**Supposé** —
- Les secrets `PIPEDRIVE_API_TOKEN`, `RESEND_API_KEY` et `RESEND_FROM_EMAIL` de Vercel sont ceux qu'utilise `/api/contact`.
- La présence de `NOTIFICATION_EMAIL` sur Vercel n'est pas établie (seul `/api/submit-survey` la lit, avec une adresse de repli).
- Les réponses de l'API Pipedrive v1 (`persons/search` avec `exact_match`, `notes?person_id`) suivent les formes déjà exploitées par `/api/contact`. Non testé en réel.

**Non regardé** —
- Preview Vercel (SSO) ; production (R4).
- Document « Formulaire brochure — règles de maillage pour Laurent.md », non fourni à la session : les règles appliquées sont celles des sections 7 à 15 de la mission.
- Lecteurs PDF de Chrome, Safari et Firefox, et mobile réel.
- Deux requêtes simultanées sur deux instances : fenêtre de doublon de note possible.

**Suite** —
- GO R2 : upload et règle `X-Robots-Tag`, contrôle `curl.exe` depuis le poste de Laurent (D23), puis `enLigne = true`.
- GO de test réel Pipedrive et Resend depuis la Preview (`SERVICES_REELS_AUTORISES = true`, commit relu).
- Q23 à Sébastien.
- Validation de la Preview, puis GO de publication.

---

## 2026-10-04 · Landing catalogue All-in-One (#82) actualisée depuis `main` `0ac062b` · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Base intégrée** : `main` `0ac062b` (fusions de #87, #83 et #86), par commit de fusion (pas de rebase) | **Tête de départ** : `41e45ee` (commit de Sébastien du 04/10, conservé tel quel)

**Quoi** — `main` fusionnée dans la branche. Conflits sur `JOURNAL.md` (entrées des deux côtés conservées, ordre chronologique inverse) et `ETAT.md` (en-tête de la section A repris de `main`, avec `main` `0ac062b` et les changements du 04/10 ; ligne #82 du tableau B complétée du film de la gamme ; lignes #83 à #87 de `main` conservées sans modification).

**Pourquoi** — Après la fusion de #86, la PR était en conflit avec `main` : seuls les contrôles Vercel tournaient sur `41e45ee`, pas les workflows GitHub.

**Fichiers** — `docs/seo-geo/ETAT.md`, ce journal ; le reste vient de `main` sans conflit.

**Vérifié** — Sur l'état fusionné : `npx tsc --noEmit` vert ; `node scripts/seo/verifier-json.mjs` : 180 JSON valides ; `npx vitest run` : 456/456 ; eslint des fichiers de la landing : 0 avertissement ; `npx next build` vert ; parcours `e2e/machine-selector.spec.ts` (désormais exécuté par `pr-checks`) et `e2e/catalogue-all-in-one.spec.ts` : 45/45 sur Chromium, et spec de la landing 33/33 sur Pixel 5 ; `verifier-consequences.mjs` : rien ne bloque. D44 : la landing (4 806 px à 1440 en V5.1, avant le panneau 16:9 du 04/10) reste sous le seuil indicatif de 7 200 px.
**Supposé** — Que les lignes #83, #86 et #87 du tableau B, rédigées avant leur fusion, seront mises à jour par la session qui les porte.
**Non regardé** — Preview Vercel (SSO) ; lecture du film R2 depuis le conteneur (Chromium sans H.264).

**Suite** — Validation graphique de Laurent sur la Preview, film de la gamme compris. Aucune fusion ni publication.

---

## 2026-10-04 · Landing catalogue All-in-One : film de la gamme Orbitvu à la place de la boucle de la home · Claude de Sébastien

**Chantier** : demande directe de Sébastien du 04/10, sur la Preview de cette branche | **PR** : #82 (brouillon, ne pas fusionner) | **Commit** : voir PR

**Quoi** — Le panneau vidéo du hero ne réutilise plus `hero-range-2025.mp4` recadré. Il lit le film de présentation de la gamme Orbitvu en version 540p sans piste audio (R2, 3,5 Mo, 42 s), en entier. Le panneau passe de 2,2:1 et 2:1 à 16:9 dès 640 px ; sous 640 px, le bandeau reste en 2,4:1 avec l'image fixe. `VideoStudio`, la pause hors champ et la coordination avec le ruban sont inchangés.

**Pourquoi** — Demande de Sébastien du 04/10 : remplacer « le gif actuel » de cette page par `hero-video.mp4`. Les textes anglais incrustés interdisent tout recadrage : un ratio 2:1 rognait le bas de l'image (« Up to 250 products per day »).

**Fichiers** — `components/landings/catalogue-all-in-one/CatalogueAllInOne.tsx`, `e2e/catalogue-all-in-one.spec.ts` (URL de la vidéo et de l'affiche), `public/images/hero/orbitvu-gamme-2026-poster.avif` (nouveau, 23 Ko, plan à 30,6 s sans texte, identique à celui de la PR #95). Hors repo : `https://videos.packshot-creator.com/orbitvu-gamme-2026-540p.mp4`, envoyé le 04/10.

**Effet attendu** — Immédiat sur la Preview. Le panneau gagne environ 46 px de hauteur à 1440 px (686 × 386). Poids vidéo sur ordinateur : jusqu'à 3,5 Mo, contre 0,6 Mo auparavant. Mobile : 0 octet de vidéo, comme avant.

**Vérifié** —
- `npx tsc --noEmit` vert ; `npm run build` vert (373 pages).
- `e2e/catalogue-all-in-one.spec.ts` sur `next start`, Chrome du Mac : 33/33.
- Playwright, Chrome visible :
  - desktop 1440 : `206 video/mp4`, `readyState` 4, lecture muette en cours ;
  - mobile 390 : image fixe, aucune requête vers R2.
- Fichier R2 relu après envoi : empreinte SHA-256 identique au fichier fourni (`daa432dc…`).

**Supposé** — Droits d'usage du film acquis (fourni par Sébastien).

**Non regardé** —
- Safari et Firefox.
- Le cadrage de l'image fixe en 2,4:1 sous 640 px : elle est centrée et le studio reste visible sur la capture à 390 px, mais toutes les largeurs n'ont pas été passées en revue.

**Suite** — La PR #95 (accueil) ajoute la même affiche au même chemin : contenu identique, pas de conflit attendu à la fusion de `main`.

---

## 2026-10-04 · Accueil : film de la gamme Orbitvu dans le hero (split, muet, R2) · Claude de Sébastien

**Chantier** : demande directe de Sébastien du 04/10, hors 06-CHANTIERS | **PR** : #95 | **Commit** : `52d0b4f`

**Quoi** — Hero de l'accueil (FR, EN, DE-CH) : « centré sur fond vidéo » devient « split ». Texte à gauche ; à droite, le film de présentation de la gamme Orbitvu (16:9, 42 s, 1080p, R2) en entier, lu muet en boucle, avec un bouton pause. Sous 768 px ou en mouvement réduit : image fixe, sans téléchargement de la vidéo (même règle que l'ancien `HeroVideo`).

**Pourquoi** — Film fourni par Sébastien ; mise en page et lecture muette décidées par lui le 04/10. La vidéo porte des textes anglais incrustés, avec le logo Orbitvu en ouverture et en fermeture. En fond `object-cover` sous le titre centré, ils se seraient superposés au H1.

**Fichiers** — `app/[lang]/page.tsx`, `components/hero/HeroVideoPanel.tsx` (nouveau), `components/hero/index.ts`, `components/hero/types.ts`, `messages/fr.json`, `messages/en.json`, `messages/de-ch.json` (clés `home.hero.video.title|pause|play`), `public/images/hero/orbitvu-gamme-2026-poster.avif` (nouveau, 23 Ko, plan à 30,6 s sans texte incrusté). Hors repo : `https://videos.packshot-creator.com/orbitvu-gamme-2026-1080p.mp4` (12,6 Mo), envoyé sur le bucket `packshot-videos` le 04/10.

**Effet attendu** — Immédiat au déploiement. Poids vidéo par visite sur ordinateur : jusqu'à 12,6 Mo si le film tourne en entier, contre 0,6 Mo pour l'ancienne boucle (× 21). Servi par R2, sortie non facturée : 10 000 visites/mois ≈ 126 Go, 0 €. Mobile : 0 octet de vidéo, comme avant.

**Vérifié** —
- `npx tsc --noEmit` vert ; eslint vert sur les fichiers modifiés ; `npm run build` vert (371 pages).
- R2 : objet relu après envoi, empreinte SHA-256 identique au fichier fourni (`dfec693b…`).
- Playwright, Chrome du Mac visible, sur `next start` :
  - desktop 1440 FR et DE-CH : réponse `206 video/mp4`, `readyState` 4, lecture en cours, `muted`, aucun bouton son ; bouton pause libellé dans la langue, il met bien en pause ; panneau de 576 × 324 px, hero de 730 px ;
  - mobile 390 : aucune balise `video`, image fixe présente, aucune requête vers R2.
- Une vidéo R2 déjà en production (`Xq0vG-cr2bc.mp4`) répond aussi `206` : la règle WAF Skip couvre toujours `videos.packshot-creator.com`.

**Supposé** — Droits d'usage du film acquis (fourni par Sébastien, distributeur officiel Orbitvu).

**Non regardé** —
- Safari, Firefox, iOS réel.
- Lighthouse et CWV avant/après : l'image fixe devient l'élément le plus visible du hero sur mobile.
- `www` dans Chrome (Worker + WAF) : à faire après déploiement.
- Lisibilité des petits textes incrustés (≈ 9 px à 576 px de large ; les grandes lignes font 15 à 18 px).
- `hero-range-2025.mp4` et son affiche ne sont plus référencés par l'accueil ; laissés en place.

**Suite** — Contrôle sur `www` après fusion. Option : la piste audio du fichier 1080p est inutile en lecture muette (≈ 0,5 Mo, 4 % du poids) et pourrait être retirée par remux.

---

## 2026-10-04 · CI (#86) actualisée depuis `main` `1bc7195`, après la fusion de #87 et de #83 · Claude de Laurent

**Chantier** : D44, D45, contrôles permanents ; préparation du GO de fusion de #86 | **PR** : #86, brouillon | **Base intégrée** : `main` `1bc7195`, par commit de fusion `9e874e1` (pas de rebase)

**Quoi** —
- Fusion de `main` : seul conflit, le haut de ce journal, résolu en ajout seul ; 8 entrées de `main` (#87, #83) et 2 de #86 conservées, classées de la plus récente à la plus ancienne d'après l'heure de leur commit. `02-PROCEDURE.md` fusionné automatiquement (sections distinctes).
- `pr-checks.yml` : `anchors.spec.ts` étiqueté « différé » et rattaché à #93 (`DIFFERES="anchors:AR-01/#93"`). Le résumé du job distingue trois états : exécuté ; absent, arrive avec #84 ou #85 ; différé, activation après AR-01/#93. Aucun autre changement technique.
- `scripts/seo/verifier-consequences.mjs`, `e2e/machine-selector.spec.ts` et `01-RAYON-ACTION.md` identiques à `5cc5bf8`.

**Vérifié** —
- `verifier-json` : 180 fichiers valides ; `npx tsc --noEmit` vert ; eslint vert sur le script et le spec ;
- `npx vitest run` : 20 fichiers, 400 tests, verts ;
- `npx next build` vert, 371 pages, avec les variables factices de la CI ;
- spec `machine-selector` sur ce build servi par `next start` : 12/12 en 9,3 s, 2 workers, sans nouvel essai. Navigateur local : Chromium préinstallé (`/opt/pw-browsers/chromium`) ; la version attendue par Playwright 1.58 est absente de l'environnement local, la CI l'installe (`npx playwright install --with-deps chromium`) ;
- étape d'inventaire extraite du workflow et simulée : branche actuelle (1 spec exécuté, 2 absents avec leur PR, 1 différé ; sortie 0) ; arbre sans spec (sortie 1, erreur explicite) ;
- `--pass-with-no-tests` absent de `.github/`, `package.json`, `playwright.config.ts` et `scripts/` ;
- aucun fichier applicatif modifié contre `main` (`app/`, `components/`, `lib/`, `messages/`, `content/`, `public/`, `i18n/`, `data/`, `cloudflare-worker/`, configurations) ;
- aucun appel payant ni lead possible en CI : aucun secret référencé par les workflows ; seules des valeurs Supabase factices (`exemple.supabase.co`) ; clés Resend, Pipedrive, Anthropic et Gemini absentes de l'environnement du job ; `fetch` simulé dans les quatre fichiers de tests unitaires qui l'appellent ; le spec ne remplit ni ne soumet aucun formulaire (« Demander un devis » : visibilité seulement) ;
- `verifier-consequences` : diff de #86 en effet local ; motifs D44 et D45 reconnus en rayon large.

**Supposé** — Aucun.
**Non regardé** — `ETAT.md`, volontairement non modifié ; `BOITE-AUX-LETTRES.md`, non modifié (Q22, sur `main`, décrit déjà le comportement de #86 ; une nouvelle entrée créerait un conflit pour #88 à #93) ; Firefox, WebKit et mobile émulé, hors CI.

**Suite** — CI réelle sur la nouvelle tête ; information de Sébastien sur la PR (renvoi à Q22) ; GO de fusion distinct de Laurent. Après la fusion de #86, `anchors` passe de `DIFFERES` à `ATTENDUS` dans la PR qui l'active (AR-01, #93).

---

## 2026-10-03 · A02 — articles « ROI interne » : URL Orbitvu restaurée, lien Photoshop retiré, ancres lunetterie corrigées · Claude de Laurent

**Chantier** : V4.3, lot 1, A02 (Maillage V2 PR-02 : F-002 à F-006, A-004, A-008 ; AR-02, CA10 a) | **PR** : brouillon, branche `seo/a02-roi-interne-liens-2026-10-03` | **Base** : `main` `de6c4cd`

**Quoi** — 7 modifications d'attributs, aucun mot changé :
- 4 `href` `http://gs-new-features-and-accelerated-content-creation/` (hôte inexistant, chemin tronqué) → `https://orbitvu.com/blog/orbitvu-station-2220-fast-hermes-brings-new-features-and-accelerated-content-creation` (F-002, F-003 en EN ; F-005, F-006 en FR) ;
- balise du lien « Photoshop » retirée en EN, mot conservé (F-004) ;
- ancre « Le packshot pour l'optique et la lunetterie » → `/fr/industrie/lunetterie` au lieu de `/fr/industrie/pieces-techniques-industrie` (A-004) ; même correction en EN vers `/en/industrie/lunetterie` (A-008).

**Pourquoi** — Hôte `gs-new-…` sans DNS (audit A, Maillage V2). Décision de Laurent du 03/10 : AR-02 (une URL Orbitvu officielle, 4 occurrences ; retrait de la seule balise Photoshop) et CA10 (a). Lunetterie en HOLD : correction de destination seulement, aucun lien nouveau.

**Fichiers** — `content/blog/fr/quel-retour-sur-investissement-avec-un-studio-photo-en-interne.json`, `content/blog/en/what-return-on-investment-with-an-internal-photo-studio.json`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Plus de lien vers un hôte inexistant ; l'ancre lunetterie mène au hub lunetterie.

**Vérifié** (local, build de production, variables factices) —
- Texte visible des deux articles identique avant et après ; 0 occurrence de `http://gs-new` ; URL Orbitvu : 200 depuis le conteneur le 03/10 (titre « Orbitvu Station 22.2.0 “Fast Hermes” brings new features and accelerated content creation »).
- `verifier-json` : 180 JSON valides ; `tsc` vert ; Vitest 377/377 ; `next build` vert ; ESLint : 300 problèmes, identiques sur `main`.
- Diff du HTML prérendu : 6 pages sur 359. Les 2 articles : exactement les 7 modifications annoncées. `/fr/blog`, `/en/blog` : DOM servi identique, charge RSC seule (contenu des articles embarqué, préexistant). `/fr` et `/en/studios-photo-automatises` (cible du pilote) : **DOM servi identique** ; la charge RSC ne diffère que par la sérialisation du sélecteur de machines (ligne en ligne ou référencée), contenu identique, sans lien avec ce diff.
- `next start` local : articles 200, liens conformes ; `/fr/industrie/lunetterie` 200 (indexable) ; `/en/industrie/lunetterie` 200 (`noindex, follow`, comme l'ancienne cible EN).
- Specs `internal-links-all`, `external-links`, `language-switch` : 27 réussies, 1 échec identique sur `main`.
- Appels payants : aucun.

**Supposé** — Rien.

**Non regardé** — Preview Vercel (SSO) ; `www`. Hors lot, constaté : en FR, « Photoshop » pointe vers `adobe.com` (lien conservé) ; en EN, il n'est plus lié. Parité FR/EN de ce lien à arbitrer avec B2 si utile.

**Suite** — Information de Sébastien (CA10 a). Revue de la Preview, GO de fusion distinct de Laurent ; publication envisagée du 12 au 16/10. B2 (prose ROI) viendra après sur les mêmes fichiers.

---

## 2026-10-03 · AR-01 — ancre permanente #calculateur-roi sur Studios, CTA de prestataire, spec ROI sur l'outil réellement servi · Claude de Laurent

> **Remplacée le 06/10 (D47).** Option B abandonnée : les CTA ROI visent le calculateur localisé ; Studios ne reçoit aucun `id`. Entrée conservée comme historique de la branche ; voir l'entrée du 06/10 « ROI (#93) — CTA directs vers le calculateur réel ».

**Chantier** : V4.3, lot 1, A01 = AR-01 (Maillage V2 PR-01 : F-007 à F-029) | **PR** : brouillon autonome, branche `seo/a01-ancre-calculateur-roi-2026-10-03` | **Base** : `main` `de6c4cd` | **Propriétaire** : Claude de Laurent, désigné par Laurent le 03/10 (GO direct)

**Quoi** —
- Section « Quel est le vrai coût de votre production photo actuelle ? » de `/studios-photo-automatises` : `id="calculateur-roi"` permanent, sans condition ni barre de sommaire. Son bouton garde sa destination, le calculateur autonome.
- CTA « btnRoi » de `prestataire-packshot-vs-studio-interne` (FR, EN) : `hash: 'roi'` (ancre inexistante) → `hash: 'calculateur-roi'`.
- `e2e/anchors.spec.ts` : 7 tests ajoutés. Ancre en EN et de-ch, unicité dans les 3 langues, sélecteur → section → calculateur, CTA de prestataire FR et EN, 17 pages sources.
- `e2e/roi-calculator.spec.ts` réécrit sur l'outil réellement servi :
  - section de Studios dans les 3 langues ;
  - assistant à étapes sur `/en/calculateur-roi` et `/de-ch/roi-rechner` ;
  - conseiller conversationnel sur `/fr/calculateur-roi`.
  Chaque assertion de l'ancienne spec a un remplaçant. Toute requête vers `/api/` est simulée (`page.route`) et le formulaire e-mail n'est jamais soumis.

**Pourquoi** — Les liens « Calculer mon ROI » des articles et du sélecteur visent la section ROI de Studios, dont l'ancre a disparu le 22/03/2026 (`d5a7fea`) : le visiteur arrive en haut de page. L'ancienne spec ROI attendait l'assistant intégré à Studios, remplacé par un teaser le même jour ; en FR, l'assistant a été remplacé par le conseiller (GO Sébastien 06/08). Décision de Laurent du 03/10 : option B (ancre sur la section existante), propriétaire désigné, PR autonome.

**Unités de comptage** (tenues séparées) —
- Lignes Maillage V2 : 22 lignes de liens (F-007 à F-028) et 1 ligne de tests (F-029). Une ligne par expression du code, mais 2 lignes pour prestataire (FR, EN) et 3 pour le sélecteur (FR, EN, de-ch).
- Expressions de liens dans le code : 19, dans 8 fichiers. 18 visaient déjà `#calculateur-roi` ; 1 visait `#roi`, corrigée ici.
- Liens rendus : 39, sur 17 pages prérendues. 34 sur les articles (17 expressions × FR et EN), 2 sur prestataire, 3 sur le sélecteur (FR, EN, de-ch).

**Fichiers** — `app/[lang]/studios-photo-automatises/page.tsx` (un attribut et un commentaire), `app/[lang]/blog/prestataire-packshot-vs-studio-interne/page.tsx` (un `hash`), `e2e/anchors.spec.ts`, `e2e/roi-calculator.spec.ts`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Les 39 liens rendus arrivent sur la section ROI, titre visible sous l'en-tête. Témoin du pilote et 5 sources inchangés.

**Vérifié** (local, build de production, variables factices) —
- `verifier-json` : 180 JSON valides. `tsc` vert. Vitest 377/377. `next build` vert. ESLint : 300 problèmes, identiques sur `main` ; 0 sur les deux specs.
- Diff du HTML prérendu : 5 pages sur 359.
  - Studios FR, EN et de-ch : identiques à `main` à l'attribut `id` près, DOM et charge RSC compris.
  - Prestataire FR et EN : identiques au fragment près.
  - Témoin `studio-photo/selecteur-machines` (FR, EN, de-ch) : identique.
- `id="calculateur-roi"` : 1 seul par page Studios. 39 liens rendus vers Studios avec fragment, sur 17 pages, tous en `#calculateur-roi`.
- Arrivée sur `#calculateur-roi` à 390 et 1 440 px, dans les 3 langues : titre à 200 et 280 px du haut, sous l'en-tête (65 px).
- `anchors` + `roi-calculator` : 37/37, trois passes.
- Appels payants et leads : aucun ; `/api/roi-pdf`, `/api/roi-lead` et `/api/roi-chat` simulés.

**Supposé** — Aucun effet d'indexation : un attribut `id` et un fragment d'URL interne.

**Non regardé** — Preview Vercel (SSO) ; `www` ; effet sur les mesures d'audience de Studios ; les liens vers le calculateur hors section ROI (PR-10, PR-12 du Maillage V2, hors lot).

**Suite** — Fichier Studios réservé au seul correctif AR-01 jusqu'à sa clôture ; ensuite, Landings & Hubs reprend la landing. Publication envisagée au J0 Studios du 29/10, si le scénario P2 est validé. Après fusion de #86 : passer `anchors` des specs différés aux specs attendus dans `pr-checks.yml`.

---

## 2026-10-03 · A04a — liens Skeelbox retirés, statistique et texte inchangés · Claude de Laurent

**Chantier** : V4.3, lot 1, A04a (Maillage V2 PR-04, lignes F-032 et F-038 ; AA5 option a) | **PR** : brouillon, branche `seo/a04a-liens-skeelbox-2026-10-03` | **Base** : `main` `de6c4cd`

**Quoi** — Dans deux articles, la balise `<a href="https://www.skeelbox.com/etude-abandon-panier/" id="">Skeelbox</a>` est remplacée par le mot « Skeelbox ». La phrase, la statistique qu'elle cite et la parenthèse restent identiques.

**Pourquoi** — Le 03/10, depuis le conteneur, `https://www.skeelbox.com/etude-abandon-panier/` répond 301 vers `https://cemater.com/`, dont le titre est celui d'un site de jeux en ligne sans rapport (relevés à 08:50 et 10:56 UTC). Le lien envoie le lecteur vers un domaine tiers. Décision de Laurent du 03/10 : retrait des deux liens (AA5 option a), CA10 (a) avec information de Sébastien ; le sort de la statistique (AA5 option b) reste à Sébastien.

**Fichiers** — `content/blog/en/impact-photographs-product-sheet.json`, `content/blog/fr/e-commerce-quel-est-le-reel-impact-des-visuels.json`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Plus aucun lien sortant vers ce domaine depuis le site.

**Vérifié** (local, build de production, variables factices) —
- Texte visible des deux articles identique avant et après (balises retirées, comparaison du texte) ; 0 occurrence de `skeelbox.com` dans les deux JSON.
- `verifier-json` : 180 JSON valides ; `tsc` vert ; Vitest 377/377 ; `next build` vert ; ESLint : 300 problèmes, identiques sur `main`.
- Diff du HTML prérendu `main` / branche : 4 pages sur 359. Les 2 articles : lien retiré, mot conservé. `/fr/blog` et `/en/blog` : DOM servi identique ; seule leur charge utile RSC change, car elle embarque le contenu complet des articles (comportement préexistant).
- `next start` local : les 2 articles répondent 200, 0 lien vers `skeelbox.com` dans le DOM, texte « (Skeelbox) » présent.
- Specs `internal-links-all`, `external-links`, `language-switch` : 27 réussies, 1 échec identique sur `main`.
- Appels payants : aucun.

**Supposé** — Que la redirection observée depuis le conteneur est celle que voit un visiteur : à confirmer dans Chrome (R4 ne s'applique qu'à `www`, mais la redirection est servie par un tiers).

**Non regardé** — Preview Vercel (SSO) ; `www` ; le fond de la statistique citée.

**Suite** — Information de Sébastien : lien retiré, statistique à arbitrer (AA5 b). Revue de la Preview, GO de fusion distinct de Laurent ; publication envisagée du 12 au 16/10, ou plus tôt sur GO exprès.

---

## 2026-10-03 · A04b — liens externes morts et balises sans `href` : 11 corrections démontrées, 2 soumises à contrôle Chrome · Claude de Laurent

**Chantier** : V4.3, lot 1, A04b (Maillage V2 PR-04 : F-030, F-031, F-033 à F-037, F-039, F-040, F-048, F-049 ; CA10 a) | **PR** : brouillon, branche `seo/a04b-liens-externes-balises-2026-10-03` | **Base** : `main` `de6c4cd`

**Quoi** — 13 occurrences dans 10 JSON, aucun mot modifié, en deux commits :
- **Commit 1, corrections démontrées (11)** :
  - Pixcap, 2 liens (F-030, F-031, EN Amazon) : balises retirées, texte conservé ; `pixcap.com` n'a aucun enregistrement A (DNS public Cloudflare, 03/10) ;
  - 3 balises `<a id="">` sans `href` (F-034, F-035, F-037) : balises retirées, texte conservé ;
  - Sensorama, 2 liens (F-036, F-040) : `…/wiki/Sensorama/` (404) → `…/wiki/Sensorama` (200) ;
  - RealityCapture, 2 liens (F-048, F-049) : `https://www.capturingreality.com/` (301) → URL finale RealityScan (200).
- **Commit 2, soumis à contrôle Chrome (2)** : MacroSphère (F-033, F-039) : balise retirée, texte conservé. `fr.packshot-studio.com/…/macrosphere-3d-jewelry-animation` redirige (301) vers `fr.packshot-creator.com`, servi par notre Worker : le dépôt n'y a aucune règle (renvoi vers `www`), Next répond 307 puis 404 (vérifié en local) ; audit A : 404. La production étant derrière Cloudflare (403 aux scripts, R4) et le Worker déployé pouvant diverger (R5), la destination réelle se confirme dans Chrome.

**Pourquoi** — Liens morts, malformés ou redirigés relevés par l'audit A et le Maillage V2. Décision de Laurent du 03/10 : CA10 (a), en distinguant les corrections démontrées des liens nécessitant un contrôle Chrome.

**Fichiers** — `content/blog/en/how-to-get-best-amazon-product-photos.json`, `content/blog/en/potential-advantages-e-commerce-businesses.json`, `content/blog/en/product-photo-lighting.json`, `content/blog/fr/avantage-du-e-commerce-pour-les-entreprises.json`, `content/blog/en/use-photo-studio-virtual-reality.json`, `content/blog/fr/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle.json`, `content/blog/en/from-2d-photography-to-3d-models-of-your-products-introduction-to-photogrammetry.json`, `content/blog/fr/de-la-photographie-2d-aux-modeles-3d-de-vos-produits-introduction-a-la-photogrammetrie.json`, `content/blog/{en,fr}/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre.json`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Plus de liens sortants morts ni de balises de lien inertes dans ces articles.

**Vérifié** (local, build de production, variables factices) —
- Texte visible des 10 articles identique avant et après.
- `verifier-json` : 180 JSON valides ; `tsc` vert ; Vitest 377/377 ; `next build` vert ; ESLint : 300 problèmes, identiques sur `main`.
- Diff du HTML prérendu : 14 pages sur 359. Les 10 articles : exactement les 13 modifications annoncées. `/fr/blog`, `/en/blog` : DOM servi identique, charge RSC seule (contenu embarqué, préexistant). `/fr` et `/en/studios-photo-automatises` : DOM servi identique, écart RSC limité à la sérialisation du sélecteur de machines, sans lien avec ce diff.
- `next start` local : 10 articles en 200 ; plus aucune occurrence de `pixcap.com`, `<a id="">`, `Sensorama/`, `capturingreality.com`, `packshot-studio.com` dans leur DOM. Cibles conservées : Wikipédia 200, RealityScan 200 (conteneur, 03/10).
- Specs `internal-links-all`, `external-links`, `language-switch` : 27 réussies, 1 échec identique sur `main`.
- Appels payants : aucun.

**Supposé** — Que la production renvoie bien un 404 pour l'ancienne URL MacroSphère : déduit du code du dépôt et de l'audit A, non vérifié en production.

**Non regardé** — Preview Vercel (SSO) ; `www`. Hors lot : l'`alt` « macrosphere pour réaliser des animations 3D… » d'une image des mêmes articles.

**Suite** — Contrôle Chrome par Laurent de l'URL MacroSphère avant le GO de fusion ; si elle mène à une page vivante, le commit 2 est retiré avant fusion. Information de Sébastien (CA10 a). Publication envisagée du 12 au 16/10. A17b viendra après sur 6 de ces fichiers.

---

## 2026-10-03 · A03 — 4 liens de guides vers leur destination finale, sans passer par une redirection · Claude de Laurent

**Chantier** : V4.3, lot 1, A03 (Maillage V2 PR-03 : F-045, F-046, F-047, F-068 ; CA10 a) | **PR** : brouillon, branche `seo/a03-redirections-internes-2026-10-03` | **Base** : `main` `de6c4cd`

**Quoi** — Dans le champ `introText` de 3 guides, 4 `href` qui passaient par une redirection du Worker pointent directement vers leur destination finale :
- `/fr/industrie/pieces-techniques` → `/fr/industrie/pieces-techniques-industrie` (F-045) ;
- `/fr/industrie/objets-art-antiquite` → `/fr/industrie` (F-046) ;
- `/fr/industrie/simplifiez-production-de-vos-visuels-optique-lunetterie` → `/fr/industrie/lunetterie` (F-047) ;
- `/en/industrie/pieces-techniques` → `/en/industrie/pieces-techniques-industrie` (F-068).
Aucun mot modifié. Worker et `next.config.ts` non touchés.

**Pourquoi** — Redirections internes évitables (audits A, C, E ; Maillage V2). Destinations lues dans `cloudflare-worker/src/index.js` du dépôt (l. 1060, 1211, 1212, 1217). Décision de Laurent du 03/10 : CA10 (a), avec information de Sébastien.

**Fichiers** — `content/guides/fr/comment-creer-vues-multi-angles-automatique-objet.json`, `content/guides/en/how-to-create-automatic-multi-angle-views-of-an-object.json`, `content/guides/fr/comment-photographier-lunettes-e-commerce.json`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Liens internes directs, sans saut 301 ; plus de dépendance de ces liens au Worker.

**Vérifié** (local, build de production, variables factices) —
- Texte visible des 3 guides identique ; seul `introText` change.
- `verifier-json` : 180 JSON valides ; `tsc` vert ; Vitest 377/377 ; `next build` vert ; ESLint : 300 problèmes, identiques sur `main`.
- Diff du HTML prérendu : 3 pages sur 359 (les 3 guides), exactement les 4 `href` annoncés.
- `next start` local : guides 200 ; nouvelles cibles 200 (`/en/industrie/pieces-techniques-industrie` en `noindex, follow`, comme avant le saut) ; anciennes URL 404 sans le Worker (piège E5), ce qui confirme qu'elles ne vivaient que par la redirection.
- Specs `internal-links-all`, `external-links`, `language-switch` : 27 réussies, 1 échec identique sur `main`. `redirections.spec.ts` : échecs locaux sans rapport avec ce diff (aucun fichier de redirection modifié), mesurés à part sur `main`.
- Appels payants : aucun.

**Supposé** — Que le Worker actif en production applique les mêmes sauts que le dépôt (R5) : sans effet sur cette PR, qui ne dépend plus du Worker.

**Non regardé** — Preview Vercel (SSO) ; `www` ; le choix d'une cible plus précise que le hub pour « artisanaux ou de collection » (éditorial, hors lot).

**Suite** — Information de Sébastien (CA10 a). Revue de la Preview, GO de fusion distinct de Laurent ; publication envisagée du 12 au 16/10.

---

## 2026-10-03 · C08 = D1-H01 — `hreflang` de l'article IA, une seule correction pour les audits A, C et D · Claude de Laurent

**Chantier** : V4.3, lot 1, C08 (Maillage V2 PR-08, ligne G-001 ; audit D H01) | **PR** : brouillon, branche `seo/c08-hreflang-article-ia-2026-10-03` | **Base** : `main` `de6c4cd`

**Quoi** — Une clé ajoutée à `content/blog/alternates.json` : `native-2026-05-02-generer-images-produit-ia` → `{"fr": "generer-images-produit-ia", "en": null}`. `/fr/blog/generer-images-produit-ia` émet désormais ses balises `alternate` `fr`, `fr-CH` et `x-default`, auto-référentes. Aucun `en`, aucun `de-CH` : l'article n'existe qu'en français (antérieur à D38).

**Pourquoi** — Article natif du 02/05 jamais inscrit dans `alternates.json` : `getBlogAlternates()` renvoyait `{fr: null, en: null}`, donc aucune balise `alternate` (audit D H01, Maillage V2 G-001, Kit A–E C08). V4.3 : une seule correction pour C08 et D1-H01. `"en": null` suit le type `AlternatesEntry` (`lib/content.ts`), qui exige la clé `en`.

**Fichiers** — `content/blog/alternates.json`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Signal de langue cohérent pour la page FR (France et Suisse romande). Aucun effet attendu sur l'indexation des autres pages.

**Vérifié** (local, build de production, variables factices) —
- `verifier-json` : 180 JSON valides ; `tsc` vert ; Vitest 377/377 (dont `locale-switch-de-ch.test.ts`) ; `next build` vert.
- Diff du HTML prérendu `main` / branche, après neutralisation de l'identifiant de build (deux builds de `main` : 0 écart) : **1 page sur 359** modifiée, `fr/blog/generer-images-produit-ia.html`, + 3 balises `<link rel="alternate">` (`fr`, `fr-CH`, `x-default`) et la même chose dans la charge utile RSC. Aucune autre page.
- `next start` local : la page répond 200, canonique inchangée, pas de balise `robots`. Sélecteur de langue : EN → `/en/blog`, DE-CH → `/de-ch/blog`, comme avant. `/en/ia-photo-produit` et `/de-ch/ia-photo-produit` ne lient toujours pas l'article (traduction nulle).
- Specs `internal-links-all`, `external-links`, `language-switch` : 27 réussies, 1 échec **identique sur `main`** (`language-switch` : « should translate header and footer »).
- ESLint : 300 problèmes, identiques sur `main` (étape CI `continue-on-error`).
- Appels payants : aucun.

**Supposé** — Rien.

**Non regardé** — Preview Vercel (SSO) ; `www` (R4) ; Search Console.

**Suite** — Revue de la Preview, puis GO de fusion distinct de Laurent ; publication envisagée du 12 au 16/10. Après fusion : `smoke.mjs` sur `sysnext.vercel.app` (contrôle `hreflang` et `x-default`), puis Chrome sur `www`. D1 ne retouche pas H01 ; L11, H08 et L17 restent dans D1.

---

## 2026-10-03 · PRODUCT-TEST (#83) actualisée depuis `main` `17a4248`, après la fusion de #87 · Claude de Laurent

**Chantier** : D45, préparation du GO de fusion de #83 | **PR** : #83, brouillon | **Base intégrée** : `main` `17a4248`, par commit de fusion `5414e0a` (pas de rebase)

**Quoi** — GO de Laurent du 03/10 : préparer la fusion de #83, sans fusionner. Conflits documentaires résolus en ajout seul :
- `BOITE-AUX-LETTRES.md` : Q22 et Q21 (#87), puis Q20 (#83) ; Q19 inchangée ;
- `JOURNAL.md` : les 5 entrées de #87 et les 2 de #83 conservées, classées de la plus récente à la plus ancienne d'après l'heure de leur commit.

Aucun fichier de #83 modifié : `data/produits/`, `lib/produits/`, `scripts/produits/` et `docs/standards/registre-ecarts-dimensions.md` sont identiques à `1c31ac6`. Diff net contre `main` inchangé avant cette entrée : 8 fichiers, + 1 083 lignes, aucune suppression.

**Vérifié** —
- `npx tsc --noEmit` vert ; `verifier-json` : 180 fichiers valides ; eslint vert sur `data/produits`, `lib/produits`, `scripts/produits` ;
- `npx vitest run` : 20 fichiers, 400 tests (377 + 23), verts ;
- `npx next build` vert, 371 pages ;
- mutations temporaires, retirées ou restaurées à l'identique (`git diff` vide) : « Capacité maximale de l'Alphastudio XXL : 100 × 70 × 190 cm » dans un fichier temporaire de `content/` → 1 échec ; « Un meuble de 190 × 100 × 70 cm se photographie dans l'Alphastudio XXL. » → 0 échec ; XXL `w: 91` dans le catalogue du sélecteur → 1 échec ;
- aucun écart contre `main` dans `components/`, `messages/`, `app/`, `content/`, `lib/lead-enrichment.ts`, `public/`, `i18n/`, `cloudflare-worker/` ; le référentiel n'est importé par aucun fichier du site ;
- `docs/standards/README.md`, sur `main` depuis #87, renvoie à `registre-ecarts-dimensions.md`, absent de `main` : le lien n'aboutit qu'à la fusion de #83.

**Supposé** — Aucun.
**Non regardé** — Preview Vercel (aucun rendu modifié) ; `ETAT.md`, volontairement non modifié (réservations de la session « Réparations lot 1 V4.3 ») ; Vitest en CI, absent du workflow de `main` tant que #86 n'est pas fusionnée.

**Suite** — CI sur la nouvelle tête ; GO de fusion distinct de Laurent sur la tête finale ; réponse de Sébastien à Q20 pour PRODUCT-DATA, sans effet sur le référentiel de test.

---

## 2026-10-03 · Arbitrages UX / dimensions du 03/10 : finalisation de #83 à #87 · Claude de Laurent

**Chantier** : D44, D45, alignement V4.3 | **PR** : #87 (documentation), #85 (`c331c40`) | **Base** : `main` `de6c4cd`

**Quoi** —
- Revue, § 11 : décisions de Laurent appliquées, état final des PR, réconciliation des guides de #91, coordination d'AR-01, build cumulé incluant #88 à #92, ordre de fusion, checklist Preview de #84 et #85, GO résiduels.
- Q22 : information de Sébastien sur les contraintes de CI (#86) et les changements d'interface (#84, #85).
- `docs/standards/R-UX-LONG.md` : libellé actif fixe (décision du 03/10) ; Studios en HOLD ; exceptions temporaires pour les PR éditoriales ouvertes (#91).
- Patch AR-01 mis au périmètre validé (`id` permanent, `hash` de prestataire, 5 tests) ; patch de la variante de #85 retiré, puisque appliqué.
- `ETAT.md`, état du chantier : décisions et têtes à jour ; 20 PR ouvertes.

**Pourquoi** — Arbitrages de Laurent du 03/10 après la revue pré-fusion.

**Fichiers** — `docs/seo-geo/PSC_REVUE_PRE_FUSION_83_87_ALIGNEMENT_V43_2026-10-03.md`, `docs/seo-geo/BOITE-AUX-LETTRES.md`, `docs/standards/R-UX-LONG.md`, `docs/seo-geo/propositions-2026-10-03/`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/PSC_ETAT_STANDARD_UX_DIMENSIONS_2026-10-03.md`

**Vérifié** —
- #85 (`c331c40`) : Vitest 385/385, spec de navigation 45/45, registre 116/116 conforme (90 pages équipées).
- AR-01 : `anchors` 12/12 ; 39 liens aboutis ; témoin non modifié.
- Build cumulé (#83 à #87, AR-01, #88 à #92) : conflits limités à `JOURNAL.md` et `BOITE-AUX-LETTRES.md` ; Vitest 408/408 ; parcours 77/77.
- Scénario « #91 fusionnée » : guides éligibles, 6/6.
**Supposé** — rien.
**Non regardé** — propriétaire Landings & Hubs (non nommé dans le dépôt) ; Programme Directeur V4.3 et addendum marché n° 14 (hors dépôt).

**Suite** — GO de Laurent (Preview de #84 et #85, infrastructure de #86, fusions) ; PR AR-01 du propriétaire Maillage V2 ; réponses de Sébastien à Q20, Q21, Q22.

---

## 2026-10-03 · #85 — Studios retirée de la barre (arbitrage de Laurent), guides de #91 en HOLD, pages IA conservées · Claude de Laurent

**Chantier** : D44, arbitrages du 03/10 après la revue pré-fusion | **PR** : #85 | **Base** : `main` `de6c4cd`

**Quoi** —
- **Studios** : `app/[lang]/studios-photo-automatises/page.tsx` revient à l'état de `main`. Famille `landing-gamme` en HOLD ; la barre de Studios relève du chantier commercial, sous validation spécifique. L'ancre `#calculateur-roi` part dans le lot AR-01 (Maillage V2) : #85 ne la porte plus.
- **Guides de #91** (A03, lot 1 V4.3) : `comment-creer-vues-multi-angles-automatique-objet` (FR), `how-to-create-automatic-multi-angle-views-of-an-object` (EN) et `comment-photographier-lunettes-e-commerce` (FR) en exception temporaire jusqu'à la clôture de #91. Si #91 est fusionnée avant #85 : contrôle sur `main`, puis retrait de l'exception.
- **Pages IA** (`/ia-photo-produit`, FR, EN, de-ch) : barre conservée. Hors pilote Studios ; deuxième vague commerciale selon l'addendum marché du 02/10 (conditionnée par #77 et la validation des claims). **Changement UX à reprendre lors de la restructuration éditoriale** : cinq entrées (titres de section existants), `id` posés par la barre, ancre `#resultats` réutilisée.
- **Libellé actif** : emplacement fixe à droite des numéros, conservé (décision de Laurent du 03/10).
- Tests : registre (Studios et guides de #91 gelés) ; spec de navigation (Studios et `comment-photographier-lunettes-e-commerce` passent dans les pages gelées ; `comment-obtenir-couleurs-fideles-photographie-produit` devient la page équipée de référence).

**Pourquoi** — Arbitrages de Laurent du 03/10 : pilote Studios coordonné avec Landings & Hubs et le Maillage V2 (J0 proposé le 29/10) ; formulation actuelle de D44 pour les pages touchées par une PR éditoriale ouverte.

**Fichiers** — `app/[lang]/studios-photo-automatises/page.tsx`, `data/navigation/pages-longues.ts`, `lib/navigation/__tests__/registre-pages-longues.test.ts`, `e2e/navigation-pages-longues.spec.ts`

**Vérifié** — voir la description de #85 (build, Vitest, spec, comptage des pages).
**Supposé** — rien.
**Non regardé** — barre de Studios dans le chantier commercial (hors de cette PR).

**Suite** — Retrait des exceptions de #91 à sa clôture ; activation de Studios sur validation spécifique.

---

## 2026-10-03 · Revue pré-fusion — lot 1 V4.3 ouvert (#88 à #92), conséquence D44 sur #85 · Claude de Laurent

**Chantier** : revue pré-fusion #83 à #87 | **PR** : #87 | **Base** : `main` `de6c4cd`

**Quoi** — Revue complétée : PR #88 à #92 du lot 1 relevées ; #91 (A03) touche trois guides équipés par #85, 4 `href` de `introText` seulement. Gel D44 de ces guides soumis à Laurent (lecture stricte ou proportionnée).

**Pourquoi** — Information de la session « Réparations lot 1 V4.3 », vérifiée sur GitHub (fichiers de #91).

**Fichiers** — `docs/seo-geo/PSC_REVUE_PRE_FUSION_83_87_ALIGNEMENT_V43_2026-10-03.md`

**Vérifié** — Fichiers de #88 à #92 sur GitHub : JSON de contenu et `JOURNAL.md` seulement. Diff de #91 : 3 JSON de guides, champ `introText`, 4 liens ; aucune étape modifiée.
**Supposé** — rien.
**Non regardé** — contenu des diffs de #88, #89, #90, #92 ; comportement de `/fr/calculateur-roi` rapporté par l'autre session.

**Suite** — Arbitrage de Laurent, avec celui de Studios.

---

## 2026-10-03 · Revue pré-fusion — correction de l'inventaire ROI (lien `#roi` de prestataire) · Claude de Laurent

**Chantier** : revue pré-fusion #83 à #87 | **PR** : #87 | **Base** : `main` `de6c4cd`

**Quoi** — Inventaire des liens ROI vers Studios corrigé dans la revue : 19 liens dans le code (39 rendus), dont 1 (2 rendus) vers `#roi` depuis le CTA de `prestataire-packshot-vs-studio-interne`. Option proposée : `hash` changé en `calculateur-roi`, non appliquée (propriétaire d'A01 à désigner). Conséquence D44 du lot 1 (guides de A03) consignée.

**Pourquoi** — Signalement de la session « Réparations lot 1 V4.3 » (F-024, F-025), vérifié dans le code et le HTML rendu. La première version de la revue ne cherchait que `#calculateur-roi` et `#cout`.

**Fichiers** — `docs/seo-geo/PSC_REVUE_PRE_FUSION_83_87_ALIGNEMENT_V43_2026-10-03.md`, `docs/seo-geo/ETAT.md`

**Vérifié** — `git grep "hash: 'roi'"` sur `main` : 1 occurrence (l. 374) ; HTML rendu : `/fr/` et `/en/studios-photo-automatises#roi`.
**Supposé** — rien.
**Non regardé** — inventaire Maillage V2 (22 liens) : toujours absent du dépôt.

**Suite** — Arbitrage de Laurent : propriétaire d'A01, option `#roi`.

---

## 2026-10-03 · Revue pré-fusion #83 à #87 : alignement V4.3, Studios, AR-01, couverture CI · Claude de Laurent

**Chantier** : D44, D45, revue pré-fusion demandée par le pilotage global | **PR** : #87 (documentation), corrections poussées sur #83 et #86 | **Base** : `main` `de6c4cd`

**Quoi** — `PSC_REVUE_PRE_FUSION_83_87_ALIGNEMENT_V43_2026-10-03.md`. Statuts de D44 et D45 à trois niveaux (principe approuvé, inscription en brouillon, application à la fusion). `ETAT.md` : `main` réel, têtes, arbitrages. Correctifs Studios et AR-01 versionnés en patch, non appliqués.

**Pourquoi** — Revue du pilotage du 03/10 : collision de #85 avec le pilote Studios, ancre `#calculateur-roi` conditionnée à la barre, couverture CI à expliciter, statuts des règles à distinguer.

**Fichiers** — `docs/seo-geo/PSC_REVUE_PRE_FUSION_83_87_ALIGNEMENT_V43_2026-10-03.md`, `docs/seo-geo/propositions-2026-10-03/*.patch`, `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/PSC_ETAT_STANDARD_UX_DIMENSIONS_2026-10-03.md`, `docs/standards/*.md`

**Vérifié** — Fusion d'essai locale (#87, #83, #86, AR-01, #84, #85 en variante) : conflits limités à `JOURNAL.md` et `BOITE-AUX-LETTRES.md` ; build vert ; Vitest 408/408 ; parcours 74/74 ; 37 liens ROI aboutis ; pages gelées sans différence hors AR-01 et balisage du sommaire du blog ; JSON-LD identique.
**Supposé** — Effet d'indexation nul de l'attribut `id` d'AR-01 [Inférence].
**Non regardé** — Programme Directeur V4.3, inventaire Maillage V2 (22 liens), scénario P2, tableau de suivi : absents du dépôt.

**Suite** — Arbitrages de Laurent : Studios / #85, AR-01 (rattachement, date), pages IA, Preview de #84, libellé actif, GO d'infrastructure de #86, GO de fusion par PR.

---

## 2026-10-03 · PRODUCT-TEST — garde de la valeur retirée : capacité et objet distingués ; « conforme » défini (revue pré-fusion) · Claude de Laurent

**Chantier** : D45, revue pré-fusion #83 à #87 | **PR** : #83 | **Base** : `main` `de6c4cd`

**Quoi** —
- La garde « valeur retirée » ne signale plus tout triplet 100 / 70 / 190 : elle le signale quand le texte l'énonce comme capacité (catalogue, « maximal », « jusqu'à », nom de machine seul), pas quand il décrit un objet photographié (« un objet de 100 × 70 × 190 cm tient dans l'XXL »). Cinq cas synthétiques fixent la distinction dans le test.
- Statut `conforme` défini comme une correspondance numérique avec la fiche fabricant consultée, sans validation de la version commerciale (référentiel et registre).

**Pourquoi** — Revue du pilotage du 03/10 : l'ancienne garde confondait la régression de la capacité XXL avec la mention légitime d'un objet de même dimension ; le décompte « 11 conformes » pouvait se lire comme une validation des versions.

**Fichiers** — `lib/produits/dimensions.ts`, `lib/produits/__tests__/coherence-dimensions.test.ts`, `data/produits/fiches-techniques.ts` (commentaire), `docs/standards/registre-ecarts-dimensions.md`

**Vérifié** — 23 tests, verts. Deux mutations temporaires : « Capacité maximale de l'Alphastudio XXL : 100 × 70 × 190 cm » → 1 échec ; « Un meuble de 190 × 100 × 70 cm se photographie dans l'Alphastudio XXL » → 0 échec. `evaluateMachine` : un objet de 100 × 70 × 190 reste accepté sur l'XXL.
**Supposé** — rien.
**Non regardé** — formulations rédactionnelles non prévues par les deux listes de mots (objet, capacité) : une mention ambiguë reste signalée, ce qui est le sens prudent.

**Suite** — Aucune valeur affichée modifiée. PR PRODUCT-DATA toujours subordonnée à Q20.

---

## 2026-10-03 · CI — inventaire explicite des specs de parcours, sans `--pass-with-no-tests` (revue pré-fusion) · Claude de Laurent

**Chantier** : D44, D45, revue pré-fusion #83 à #87 | **PR** : #86 | **Base** : `main` `de6c4cd`

**Quoi** — L'étape « Parcours navigateur » inventorie chaque spec attendu dans le résumé du job : présent, exécuté ; absent, signalé avec la PR qui l'apporte (#84, #85) ; `anchors` signalé « activation après AR-01 ». `--pass-with-no-tests` est retiré : le job échoue si aucun spec n'est présent.

**Pourquoi** — Mesuré en local : Playwright ignore déjà un filtre sans correspondance quand un autre en a une ; `--pass-with-no-tests` ne servait donc qu'à rendre vert un passage sans aucun test exécuté (code de sortie 0 au lieu de 1). Le rapport ne distinguait pas les specs exécutés des specs à venir.

**Fichiers** — `.github/workflows/pr-checks.yml`, `docs/seo-geo/JOURNAL.md`

**Vérifié** — YAML valide ; étape simulée en local : branche actuelle (1 spec exécuté, 3 signalés, sortie 0) et arbre sans spec (sortie 1, erreur explicite) ; filtre `e2e/machine-selector.spec.ts` : 12 tests sélectionnés avec la configuration du dépôt.
**Supposé** — rien.
**Non regardé** — `retries: 2` en CI dans `playwright.config.ts` (réglage existant) : un test réussi au deuxième essai est compté « flaky », pas en échec.

**Corrections de l'entrée précédente** — Durée mesurée sur la CI de cette PR : 40 s d'étapes ajoutées, et non 3 à 4 minutes. `anchors` s'active après le lot AR-01, et non après #85 : la revue pré-fusion propose de séparer l'ancre `#calculateur-roi` de la barre.

---

## 2026-10-03 · D44 et D45 inscrites : standards permanents, `docs/standards/`, Q21, état du chantier · Claude de Laurent

**Chantier** : gouvernance, PR UX-GOV | **PR** : brouillon, documentation seule, branche `ccr-79f70eb9-7ls0wm` | **Base** : `main` `de6c4cd`

**Quoi** —
- D44 (R-UX-LONG) et D45 (R-PRODUCT-DIM) dans `DECISIONS.md`.
- Références stables `docs/standards/README.md`, `R-UX-LONG.md`, `R-PRODUCT-DIM.md`.
- Renvois depuis `docs/seo-geo/README.md` et `02-PROCEDURE.md` (étape 2, `npx vitest run`).
- Q21 au Claude de Sébastien : prise de connaissance, texte proposé pour `/CLAUDE.md`.
- `ETAT.md` : A, B (#83 à #86 et cette PR ; #82, absente jusque-là), C, D, F4 bis.
- `PSC_ETAT_STANDARD_UX_DIMENSIONS_2026-10-03.md` pour le pilotage.

**Pourquoi** — GO encadré de Laurent du 03/10 : inscrire durablement les deux règles et les appliquer aux pages présentes et futures, sans fusion ni publication.

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/BOITE-AUX-LETTRES.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/README.md`, `docs/seo-geo/02-PROCEDURE.md`, `docs/seo-geo/PSC_ETAT_STANDARD_UX_DIMENSIONS_2026-10-03.md`, `docs/standards/README.md`, `docs/standards/R-UX-LONG.md`, `docs/standards/R-PRODUCT-DIM.md`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Les deux environnements Claude trouvent les standards depuis `docs/standards/`. L'environnement de Sébastien les trouvera depuis `/CLAUDE.md` si Q21 est acceptée.

**Vérifié** —
- D44 et D45 : identifiants libres sur toutes les branches du dépôt au 03/10. Même contrôle pour Q20 et Q21.
- Faits cités : relus dans les PR #83 à #86. Le décompte « 11 produits conformes » est vérifié dans `fiches-techniques.ts`. Correction : la synthèse de l'audit disait 10.

**Supposé** — Aucun.
**Non regardé** — `/CLAUDE.md`, volontairement non modifié (décision de Sébastien, Q19 option A) ; `06-CHANTIERS.md`, arrêté au 19/09.

**Suite** — GO de fusion dans l'ordre UX-GOV, #83, #86, #84, #85 ; réponses de Sébastien à Q20 et Q21.

---

## 2026-10-03 · CI — Vitest et parcours Playwright ciblés dans `pr-checks`, garde-conséquences étendu, spec du sélecteur réécrit · Claude de Laurent

**Chantier** : D44, D45, contrôles permanents, PR CI | **PR** : brouillon, branche `ccr-79f70eb9-ci` | **Base** : `main` `de6c4cd`

**Quoi** —
- `pr-checks.yml` : étape Vitest après l'intégrité des JSON. Après le build : installation de Chromium, serveur de production local, specs Playwright `machine-selector`, `sommaire-blog`, `navigation-pages-longues` (Chromium, 2 workers ; les specs absents de la branche testée sont ignorés).
- `scripts/seo/verifier-consequences.mjs` et `01-RAYON-ACTION.md` : catalogues de machines, `data/produits/`, `TableOfContents.tsx`, `SommaireCollant.tsx`, `data/navigation/` passent en rayon large.
- `02-PROCEDURE.md` : table de la porte CI.
- `e2e/machine-selector.spec.ts` réécrit sur le parcours réel.

**Pourquoi** — Audit du 03/10 : la CI n'exécutait ni Vitest ni Playwright. Le spec du sélecteur échouait à 11 tests sur 14 sur le build de `main` : barre de recherche, tri par prix, bouton « Voir les détails » et cartes `rounded-xl` n'existent plus.

**Spec du sélecteur** — Assertions dérivées du catalogue affiché (`components/machine-selector/lib/machines.ts`), au lieu de constantes :
- une carte par machine non délistée, dans l'ordre du catalogue ;
- taille maximale affichée par carte (D45) ;
- liste exacte par filtre de taille et d'automatisation, avec compteur ;
- aperçu : ouverture, points forts, taille, fermeture par bouton et par Échap ;
- lien « Voir la fiche » ; réinitialisation ; bloc d'aide ; EN et de-ch ; mobile sans débordement.

Tests retirés parce que la fonction n'existe plus dans l'interface : recherche par nom, tri par prix. Aucun test désactivé.

**Fichiers** — `.github/workflows/pr-checks.yml`, `scripts/seo/verifier-consequences.mjs`, `docs/seo-geo/01-RAYON-ACTION.md`, `docs/seo-geo/02-PROCEDURE.md`, `e2e/machine-selector.spec.ts`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Une PR qui casse la cohérence des dimensions, le registre de navigation, le sommaire du blog, la barre des pages longues ou le sélecteur est rouge avant fusion. Les PR qui touchent les catalogues de machines ou la navigation doivent déclarer leur rayon d'action, celles de Sébastien comprises.

**Vérifié** —
- Spec du sélecteur réécrit : 12/12 sur le build de `main` (ancienne version : 3/14).
- Commande Playwright de la CI rejouée sur le build de la branche : 12/12 en 8 s.
- Vitest : 377 tests en 3 s.
- YAML valide ; `verifier-consequences` reconnaît les quatre nouveaux motifs.
- `tsc`, `verifier-json`, eslint, `next build`.

**Supposé** — Dépôt public : minutes GitHub Actions non facturées [Non vérifié : facturation du compte non consultée]. Durée ajoutée au job estimée à 3 à 4 minutes (installation de Chromium surtout) ; mesurée sur la CI de cette PR.
**Non regardé** — Firefox, WebKit, mobile émulé en CI (seul Chromium y tourne). `e2e/anchors.spec.ts` n'est pas ajouté : son test « #calculateur-roi » échoue sur `main`, défaut corrigé par #85 ; à ajouter après la fusion de #85.

**Suite** — Après fusion de #84 et #85, leurs specs s'exécutent sans modification du workflow. Ajouter `anchors` à la commande après #85.

---

## 2026-10-03 · D44 — barre de sommaire collante mutualisée, trois pilotes puis 96 pages par famille de gabarits · Claude de Laurent

**Chantier** : D44 (R-UX-LONG), PR UX-STICKY | **PR** : brouillon, branche `ccr-79f70eb9-ux-sticky` | **Base** : `main` `de6c4cd` | **Commits** : `9d9de22` (composant, registre, pilotes), puis généralisation

**Quoi** —
- `components/navigation/SommaireCollant.tsx` : version commune de la barre de Mode. Elle apporte ancres configurables, début et fin, rien sous 1 024 px, décalage des ancres calculé sur l'en-tête. Numéros fixes et libellé actif dans un emplacement unique : CLS de défilement nul.
- `data/navigation/pages-longues.ts` : registre par famille, avec pages gelées et exceptions motivées.
- Gabarits équipés, `id` posés seulement si la barre est active, libellés tirés des titres existants :
  - guides (`guide/[slug]`) ;
  - fiches (`studio-photo/[slug]`) ;
  - `studio-ia-vs-ia-generative` et `comparatif-orbitvu-ortery-styleshoots-2026` ;
  - `ia-photo-produit`, `studios-photo-automatises` ;
  - `solutions/[slug]`.
- Tests : `lib/navigation/__tests__/registre-pages-longues.test.ts` (7), `e2e/navigation-pages-longues.spec.ts` (47).

**Pourquoi** — GO encadré de Laurent du 03/10 : généraliser par famille de gabarits, en conservant les navigations adaptées. Audit du 03/10 : 47 guides, 39 fiches et plusieurs landings longues sans navigation.

**Fichiers** — `components/navigation/SommaireCollant.tsx`, `data/navigation/pages-longues.ts`, `lib/navigation/__tests__/registre-pages-longues.test.ts`, `e2e/navigation-pages-longues.spec.ts`, `app/[lang]/guide/[slug]/page.tsx`, `app/[lang]/studio-photo/[slug]/page.tsx`, `app/[lang]/blog/studio-ia-vs-ia-generative/page.tsx`, `app/[lang]/blog/comparatif-orbitvu-ortery-styleshoots-2026/page.tsx`, `app/[lang]/ia-photo-produit/page.tsx`, `app/[lang]/studios-photo-automatises/page.tsx`, `app/[lang]/solutions/[slug]/page.tsx`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Navigation desktop sur 96 pages indexables. Une nouvelle page d'une famille équipée (guide, fiche, solution) reçoit la barre sans autre geste. Aucun effet sur l'indexation : ni URL, ni canonique, ni hreflang, ni contenu.

**Décision de conception à valider** — La barre de Mode insère le libellé actif après le numéro actif : les numéros suivants se décalent à chaque changement de section. CLS mesuré pendant le défilement sur `main` : 0,036 à 1 024 px, 0,021 à 1 440 px ; 0,080 sur un guide de 12 étapes avec la même mécanique. Le composant commun affiche le libellé dans un emplacement fixe à droite des numéros : CLS 0 sur toutes les pages équipées. Mode reste sur son composant jusqu'au 26/11. Sa bascule changera l'emplacement du libellé : décision de Laurent, après contrôle de parité.

**Vérifié** (build local, `main` `de6c4cd` en référence) —
- Registre : 116 pages contrôlées, 116 conformes ; 96 équipées (44 guides, 39 fiches, 3 IA photo produit, 3 gamme, 3 solutions, 2 comparatifs, 2 studio-ia) ; 20 gelées ou exclues sans barre (F5, Mode avec sa barre d'origine, hub mode-textile, accueil, 3 guides de #27, budget, prestataire, Amazon).
- `e2e/navigation-pages-longues.spec.ts` : 94/94 sur deux passages (47 tests). Couvre 17 pages équipées à 1 024 et 1 440 px, 3 pages à 390 et 768 px, 7 pages gelées ou exclues.
- Comparaison `main` / branche, 116 pages à 390 et 1 440 px (232 combinaisons), puis 16 pages représentatives aux 7 largeurs (360 à 1 920, 112 combinaisons) :
  - 0 écart de hauteur de page ;
  - 0 largeur de tableau ou d'illustration modifiée ;
  - 0 débordement horizontal nouveau (débordement de l'accueil à 390 px, préexistant) ;
  - 0 régression de CLS. Deux valeurs isolées sous 1 024 px (solutions à 768 px, IA de-ch à 390 px) remesurées cinq fois : 0 sur `main` comme sur la branche.
- axe-core à 390 et 1 440 px : 0 violation dans la barre. Violations de la page : `color-contrast` (pied de page) et `heading-order`, identiques sur `main`.
- `tsc`, eslint (5 avertissements préexistants sur la fiche), `next build` (371 pages), Vitest 384/384.

**Défaut préexistant corrigé** — Le CTA « Calculer mon ROI » du sélecteur (`app/[lang]/studio-photo/selecteur-machines/page.tsx:149`) pointe vers `/studios-photo-automatises#calculateur-roi`. Sur `main`, cette ancre n'existe pas : le lien ouvre le haut de la page, et `e2e/anchors.spec.ts` (« #calculateur-roi exists ») échoue sur le build de `main`. La section visée (coût de la production, `roiTeaser`) reçoit désormais l'`id` `calculateur-roi`. `anchors.spec.ts` et le spec navigation : 54/54.

**Supposé** — Les ancres existantes `#resultats` (IA photo produit) et `#studios` (gamme), réutilisées, reçoivent sur desktop le décalage de 129 px : les CTA internes qui y mènent s'arrêtent sous la barre au lieu de 0 px. Effet tenu pour souhaitable ; non validé par Sébastien.
**Non regardé** — Firefox, Safari, lecteur d'écran réel ; Preview (SSO) et `www` (R4) ; pages EN non indexées ; Mode non modifiée.

**Suite** — Preview contrôlée par Laurent sur une page par famille ; GO de fusion distinct. Après le 26/11 : bascule de Mode (parité, décision). Après le 23/11 : réexamen de F5. Clôture de #27 et #64 : sortie des pages gelées.

---

## 2026-10-03 · D44 — sommaire du blog : titre visé atteint en mobile et en desktop, liste latérale utilisable sur toute la hauteur · Claude de Laurent

**Chantier** : D44 (R-UX-LONG), PR UX-BLOG | **PR** : brouillon, branche `ccr-79f70eb9-ux-blog` | **Base** : `main` `de6c4cd`

**Quoi** — `components/blog/TableOfContents.tsx` :
- sommaire repliable : le panneau se replie avant le défilement ;
- arrivée : position du titre vérifiée, jusqu'à trois corrections ;
- liste latérale : hauteur maximale `calc(100vh - 10rem)`, défilement interne, entrée active gardée visible, recentrage suspendu pendant un défilement lancé depuis le sommaire ;
- `aria-current="location"`, `aria-expanded` et `aria-controls`, focus visible ;
- mouvement réduit respecté.

Spec `e2e/sommaire-blog.spec.ts` (8 tests). Aucun contenu, aucun `id` de titre, aucune adresse modifiés.

**Pourquoi** — Défauts mesurés le 03/10 sur `main` :
- mobile 390 px : après clic, titre visé à −810 px et −191 px ;
- desktop : 29 sommaires latéraux dépassaient 804 px de hauteur utile, jusqu'à 1 670 px ;
- troisième défaut trouvé pendant ce chantier : les images d'articles sans dimensions se chargent pendant le défilement et allongent la page (+1 277 px et +3 662 px sur deux articles) ; un clic sur une entrée lointaine s'arrêtait plus haut que le titre (titre à 1 372 px et 3 759 px du haut de l'écran au lieu de 96 px). Contrôle : avec les images déjà chargées, le titre arrive à 96 px.

**Fichiers** — `components/blog/TableOfContents.tsx`, `e2e/sommaire-blog.spec.ts`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Navigation dans les 122 articles du gabarit commun et les 6 pages dédiées : titre visé visible sous l'en-tête après clic, toucher ou Entrée ; dernières entrées des longs sommaires atteignables.

**Vérifié** —
- Spec `sommaire-blog` sur build local de la branche : 8/8. Sur build local de `main` : 8/8 en échec (3 desktop sur le défaut lui-même ; 4 mobile parce que le bouton n'a pas d'`aria-expanded` sur `main` ; 1 faute d'`aria-current`).
- Comparaison `main` / branche, 11 pages (les 6 dédiées et 5 articles du gabarit commun) × 7 largeurs (360, 390, 768, 1 024, 1 280, 1 440, 1 920) :
  - 0 écart de hauteur de page ;
  - liste latérale plus haute que la fenêtre : 16 cas sur `main`, 0 sur la branche ;
  - aucune double navigation collante ;
  - débordement horizontal : 1 cas, identique sur `main` (`/fr/blog/guide-achat-studio-2026` à 1 024 px, préexistant, page sous #64).
- `tsc`, eslint, `next build` (371 pages), Vitest 377/377.

**Effet sur les pages protégées (#64, #27)** — Leurs fichiers ne sont pas modifiés. Comportement changé, mesuré :
- `blendai-vs-flair…`, `blendai-vs-photoroom…`, `comment-calculer-le-roi…` et `guide-achat-studio-2026` : liste latérale plafonnée et défilante ; pas de sommaire mobile, comme avant ;
- `orbitvu-vs-concurrents` et `ia-photo-produit-guide-2026` : repliable corrigé, `aria-expanded` ajouté ;
- hauteur de page inchangée aux 7 largeurs.

**Supposé** — Les navigateurs sans évènement `scrollend` (Safari selon les versions) utilisent la garde de 2 s ; non testé dans Safari.
**Non regardé** — Firefox, Safari, lecteur d'écran réel ; Preview et `www` (R4) ; images d'articles sans dimensions (cause racine, contenu de Sébastien) ; le débordement à 1 024 px de `guide-achat-studio-2026`.

**Suite** — Preview contrôlée par Laurent (desktop, tablette, mobile) ; GO de fusion distinct ; contrôle Chrome sur `www` après fusion.

---

## 2026-10-03 · D45 — référentiel des dimensions, contrôle de cohérence, registre des écarts, Q20 · Claude de Laurent

**Chantier** : D45 (R-PRODUCT-DIM), PR PRODUCT-TEST | **PR** : brouillon, branche `ccr-79f70eb9-product-test` | **Base** : `main` `de6c4cd`

**Quoi** — Référentiel `data/produits/fiches-techniques.ts` (17 machines : valeurs consommées par le site, fiche fabricant relevée le 03/10, statut par caractéristique) ; écarts commerciaux connus `data/produits/ecarts-connus.ts` ; test `lib/produits/__tests__/coherence-dimensions.test.ts` (23 tests) ; script `scripts/produits/inventaire-mentions.mts` ; registre `docs/standards/registre-ecarts-dimensions.md` ; Q20 dans `BOITE-AUX-LETTRES.md`. **Aucune valeur affichée ni aucun catalogue modifiés.**

**Pourquoi** — Audit du 03/10 : dimensions saisies à la main dans deux catalogues, synchronisées deux fois à la main (28/09, 01/10) ; champs voisins déjà divergents ; contenus libres faux (guide d'achat 2026, comparatif Orbitvu, article Pro G2, hub mobilier, prompt des leads). Consigne de Laurent du 03/10 : référentiel obligatoire immédiatement, aucune valeur commerciale contradictoire propagée avant validation de Sébastien.

**Fichiers** — `data/produits/fiches-techniques.ts`, `data/produits/ecarts-connus.ts`, `lib/produits/dimensions.ts`, `lib/produits/__tests__/coherence-dimensions.test.ts`, `scripts/produits/inventaire-mentions.mts`, `docs/standards/registre-ecarts-dimensions.md`, `docs/seo-geo/BOITE-AUX-LETTRES.md`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Une modification de dimension, de charge ou d'encombrement dans un catalogue, une landing (Mode, F5), la FAQ d'une fiche ou une traduction, sans mise à jour du référentiel, fait échouer Vitest. La valeur XXL retirée (100 × 70 × 190) ne peut plus revenir. Bloquant en CI seulement après la PR CI (Vitest n'y tourne pas aujourd'hui).

**Vérifié** —
- `npx vitest run` : 20 fichiers, 400 tests verts (377 avant + 23).
- Détection prouvée par trois mutations temporaires, fichiers restaurés à l'identique : XXL `w: 70` dans le catalogue ROI → 6 échecs ; « 190 × 70 × 100 » dans `en.json` (Mode) → 4 échecs ; cadence XXL modifiée dans le sélecteur → 1 échec.
- Limites fonctionnelles sur `evaluateMachine` : XXL 90 cm accepté, 91 refusé ; rotation (190 × 100 × 90, 90 × 190 × 100 acceptés ; 191 et 101 refusés) ; 100 kg accepté, 101 refusé ; chaque machine accepte son objet maximal et refuse 1 cm de plus ; chaque charge chiffrée acceptée, 1 kg de plus refusé.
- `npx tsc --noEmit`, eslint sur les fichiers ajoutés, `verifier-json` (180), `npx next build` (371 pages) : verts.
- Inventaire : 81 triplets libres, 13 sans correspondance (registre, § 2).
- Statuts du référentiel : contrôlés par le test contre les valeurs en présence (une contradiction doit être « écart » ou « à arbitrer » et citer un point de Q20).

**Supposé** — Les pages orbitvu.com décrivent les produits actuels du fabricant ; elles ne suffisent pas à établir une correspondance de version avec les noms PSC (« Pro v2 », « v2 »).
**Non regardé** — Brochures PDF Orbitvu ; notes Pipedrive produites par le prompt des leads (aucun accès, appels Gemini payants exclus) ; Preview et production.

**Suite** — Réponse de Sébastien à Q20, puis PR PRODUCT-DATA (catégorie A d'abord : XL G2 et Micro, encombrements) ; dérivation des catalogues depuis le référentiel ; valeurs F5 après le 23/11, Mode après le 26/11.

---

## 2026-10-02 · Landing catalogue Orbitvu All-in-One — V5.1 : section catalogue compacte, priorité au ruban, métadonnées préparées · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Branche** : `claude/magical-clarke-rkqimg`, partie de `4412966` (HEAD transmis, vérifié identique sur origin) | **Base** : `main` `de6c4cd` (inchangée)

**Quoi** — Mission V5.1 de Laurent après revue de la Preview V5. (A) Section « Trouvez le studio adapté à vos produits » compactée. (B) Ruban des studios : démarrage dès qu'il entre dans le champ, la vidéo du hero se mettant en pause pendant qu'il défile. (C) Title et meta description réécrits pour le positionnement V5, indexation inchangée. H1, formulaire, CTA, téléphones, API, visuels K1–K6 et PDF inchangés.

**Pourquoi** — (A) À 1 361 px de haut à 1440, la section montrait trop du document à télécharger. (B) En V4 et V5, le ruban attendait que la vidéo du hero soit à moins de 30 % visible : à 1440 × 900, un visiteur arrêté sur la frise avec la vidéo encore à l'écran (défilement entre ≈ 370 et 630 px) voyait un ruban immobile. (C) Title et meta description encore ceux du copydeck V2 (« 28 pages, 10 systèmes »).

**Section catalogue (A)** — Texte inchangé à gauche ; à droite, K5 en grand, puis K4 et la vignette K6 côte à côte ; la vignette K6 est un bouton « Agrandir la matrice » qui ouvre la fenêtre modale de la V5. Sous 640 px : pages seules K3 et K2 côte à côte, puis la vignette K6 pleine largeur ; aucune double page minuscule. Hauteurs mesurées (V5 → V5.1) : 1440 px 1 361 → 822 (−40 %), 1024 px 1 348 → 900 (−33 %), 768 px 1 673 → 1 193 (−29 %), 390 px 1 793 → 1 278 (−29 %), 320 px 1 840 → 1 400 (−24 %). À 1440, la hauteur est désormais celle de la colonne de texte, non modifiée : la baisse dépasse la fourchette indicative de 25 à 35 % sans rien retirer.

**Ruban (B)** — Démarrage quand le ruban est visible à 60 % au moins (header déduit), sans condition sur la vidéo. Nouveau `animationPrincipale.ts` : le ruban signale quand il défile, la vidéo du hero se met alors en pause, puis reprend quand il s'arrête. Contrôle visuel en conditions réelles (arrivée par la molette depuis le haut de page) : démarrage immédiat, 22,0 px/s constants sur 14 s, environ deux machines nouvelles en 12 s, huit visibles d'emblée à 1440 ; vitesse conservée. Boucle : incréments réguliers de part et d'autre du retour au début (1 672,2 → 0,6 px), sans saut. Silhouettes, fondu des bords, survol, focus, pause, glissement tactile, mouvement réduit et arrêt hors champ inchangés et revérifiés.

**Métadonnées (C)** — Title : « Studios photo Orbitvu : recevez le catalogue | PackshotCreator » (62 caractères). Meta description : « Découvrez les possibilités des studios photo automatisés Orbitvu et recevez le catalogue All-in-One pour explorer la gamme. France et Suisse. » (141 caractères). Proposition de Laurent retenue telle quelle : longueurs dans les règles du dépôt (`e2e/seo.spec.ts` : title < 70, description de 50 à 160) et termes présents sur la page (studios automatisés Orbitvu, catalogue All-in-One, gamme, France et Suisse). Aucune donnée de volume de recherche consultée ni affirmée. Inchangés : `noindex, nofollow`, aucune canonique, aucun sitemap, route FR seule, `PUBLICATION_AUTORISEE = false`.

**Fichiers** — nouveau : `components/landings/catalogue-all-in-one/animationPrincipale.ts` ; modifiés : `CatalogueAllInOne.tsx`, `AgrandirPage.tsx` (vignette cliquable), `StudiosRail.tsx`, `VideoStudio.tsx`, `coordination.ts` (commentaire), `contenu.ts` (META), `e2e/catalogue-all-in-one.spec.ts`, `docs/seo-geo/ETAT.md`, ce journal. Non modifiés : `app/[lang]/catalogue-orbitvu-all-in-one/page.tsx` (lit `META`), formulaire, API, `public/`, home, fiches machines.

**Vérifié** —
- `npx tsc --noEmit` vert ; eslint des fichiers touchés : 0 avertissement ; `npx vitest run` : 433/433 ; `npx next build` vert.
- `e2e/catalogue-all-in-one.spec.ts`, Chromium et Pixel 5 : 66/66 sur serveur neuf, dont : nouveau title et nouvelle meta description, `nofollow` présent ; ruban qui défile alors que la vidéo est encore visible à plus de 30 %, avec appel à `pause()` sur la vidéo, puis arrêt du ruban et appel à `play()` au retour en haut ; section catalogue ≤ 1 020 px à 1440 et vignette K6 de moins de 400 px ; K3 et K2 côte à côte sur mobile.
- Specs `language-switch`, `mobile-overflow`, `seo` (Chromium) : 11 échecs, les mêmes qu'en V3, V4, V5 et sur `main`.
- Captures locales : aucun débordement horizontal à 1440, 1024, 768, 390 et 320 px ; bas du CTA inchangé (827 px sur 900 à 1440, 881 sur 768 à 1024) ; aucun emplacement neutre ; aucune requête du MP4 sous 768 px.
**Supposé** — Que la vitesse de 22 px/s convienne à l'œil de Laurent : jugement sur enregistrement, pas sur mesure d'usage.
**Non regardé** — Preview Vercel V5.1 dans un navigateur (SSO : les captures sont locales, ce n'est pas un contrôle de la Preview) ; Safari, Firefox et appareils réels ; volumes de recherche des formulations du title.

**Suite** — Dernière validation graphique de Laurent sur la Preview. Restent ouverts avant activation : destination des QR « démo » (`orbitvu.fr/contact/`), versions de produits nommées par le PDF, validation du PDF QA, hébergement du PDF, stockage et CRM, indexation et URL définitive. Aucune fusion ni publication ; pas de développement CRM/e-mail engagé.

---

## 2026-10-02 · Landing catalogue Orbitvu All-in-One — V5 : ruban continu des studios, vraies pages du catalogue · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Branche** : `claude/magical-clarke-rkqimg` | **Base** : `main` `de6c4cd` (inchangée depuis V3)

**Quoi** — Mission V5 de Laurent (prompt du 02/10 et paquet `PSC_CATALOGUE_RECROP_ET_VISUELS_K1_K6_2026-10-02.zip`). (A) La frise V4 (grandes cartes, une carte toutes les 4,5 s, arrêt en bout de liste) devient un ruban fin qui défile en continu, en boucle sans saut. (B) Les six emplacements neutres K1–K6 sont remplacés par les vraies pages du catalogue : couverture K1 dans la carte du formulaire et dans le bloc final, doubles pages K5 et K4, matrice K6 avec agrandissement. H1, formulaire, CTA, téléphones et API inchangés.

**Pourquoi** — Retour de Laurent sur la V4 : trop proche d'un carrousel de fiches, et le catalogue absent de la Preview.

**Paquet reçu (hors dépôt)** — PDF `All-in-One_2026_FR_RECROP_QA_NOT_APPROVED.pdf` (28 pages, 595 × 422 pt) : CropBox `[0 297 595 719]` sur MediaBox `[0 0 595 841]`, soit `Rect(0,122,595,544)` du README en repère haut-gauche ; polices Inter incorporées ; aucune annotation de lien cliquable. Six WebP (pages 1339 × 950, doubles pages 2678 × 950) contrôlés à taille réelle : ni texte tronqué ni mauvais appariement ; appariement conforme au README (K1 p. 1, K2 p. 24, K3 p. 10, K4 pp. 24–25, K5 pp. 10–11, K6 pp. 6–7). Copiés à l'identique (empreintes SHA-256 égales) sous `public/images/catalogue-all-in-one/` ; ni PDF ni planche de contrôle dans le dépôt.

**QR et liens du PDF (contrôle technique, pas de validation)** — 28 pages rendues à 300 dpi, QR décodés (OpenCV, hors dépôt) : « Demander une démo » et « Réserver une démonstration gratuite » → `https://orbitvu.fr/contact/` (pages 6, 8, 10, 12, 14, 16, 18, 20, 22, 24) ; « Voir la brochure dédiée » → `https://orbitvu.fr/product/<modèle>/` (9 fiches) ; vidéos → `youtu.be` (pages 5, 26, 27). Les 10 adresses `orbitvu.fr` répondent 200 après redirection (`/contact/ecrivez-nous`, `/produits/...`) ; les 3 vidéos YouTube ne sont pas vérifiables depuis le conteneur (429). Les QR « démo » visibles sur K2–K6 mènent donc vers `orbitvu.fr`, pas vers le formulaire de la landing : décision ouverte pour Laurent. Page 28 : `www.orbitvu.fr`, `orbitvu@sysnext.com`.

**Frise (A)** — Ruban défilable nativement (glisser, molette horizontale, flèches, Début, Fin), avec boutons précédent / suivant (à partir de 640 px) et pause. Défilement automatique par translation de la piste au sous-pixel (`translate3d`, `requestAnimationFrame`, 22 px/s), rendu au défilement natif à la même position dès qu'il s'arrête. Liste rendue trois fois : la première porte la sémantique, les deux copies sont `aria-hidden` et `inert` ; au bout d'une période (1 683 px à 1 440 px de large), la position recule d'autant, sans saut visible. Défilement seulement sans `prefers-reduced-motion`, ruban visible à 30 % au moins, vidéo du hero hors champ, onglet actif, ni survol ni focus ; toute interaction manuelle l'arrête jusqu'à « Reprendre ». Mobile : défilement continu conservé, un glissement prend la main. Visuels en silhouettes : rendus détourés fondus dans le fond du ruban (`mix-blend-multiply`, luminosité +4 % pour effacer les fonds blanc cassé 250–254), gabarit croissant avec la taille des produits (92 à 176 px de large). Hauteur du ruban : 182 px en desktop, 143 px en mobile. Intitulé court : le texte d'accompagnement V4 est retiré, surtitre et titre conservés. Exclusions V4 réexaminées et maintenues : XL G2 (toutes ses photos sont sur fond noir, D29), XXL et Fashion (vues d'ensemble toutes avec une personne).

**Catalogue (B)** — `EmplacementVisuel` remplacé par `PageCatalogue` (`next/image`, `object-contain`, rapport du fichier) ; sous 640 px, pages seules K3 et K2 à la place des doubles pages, seule l'image affichée étant chargée. Section « Trouvez le studio adapté » recomposée : texte à gauche, K5 et K4 à droite, puis K6 sur toute la largeur avec « Agrandir la matrice » (fenêtre modale native, image à la taille du fichier). Section passée de ≈ 820 à 1 361 px de haut à 1 440 px. Couverture K1 sans rotation : 120 × 85 px (96 × 68 px de 1 024 à 1 279 px, 88 × 62 px sur mobile). Bandeau interne : « extraits du catalogue présentés pour revue, téléchargement du PDF non activé ».

**Fichiers** — nouveaux : `components/landings/catalogue-all-in-one/PageCatalogue.tsx`, `AgrandirPage.tsx`, `public/images/catalogue-all-in-one/k1-couverture.webp`, `k2-furniture-studio-p24.webp`, `k3-alphashot-pro-g2-p10.webp`, `k4-furniture-studio-pp24-25.webp`, `k5-alphashot-pro-g2-pp10-11.webp`, `k6-matrice-pp6-7.webp`, `lib/catalogue/__tests__/visuels-catalogue.test.ts` ; supprimé : `components/landings/catalogue-all-in-one/EmplacementVisuel.tsx` ; modifiés : `StudiosRail.tsx`, `studios.ts`, `visuels.ts`, `contenu.ts`, `CatalogueAllInOne.tsx`, `CatalogueForm.tsx` (vignette seulement, logique inchangée), `e2e/catalogue-all-in-one.spec.ts`, `lib/catalogue/__tests__/frise-studios.test.ts`, `docs/seo-geo/ETAT.md`, ce journal. Non modifiés : home, `HeroVideo`, fiches machines, `MACHINES`, `lib/machine-images.ts`, redirections XL, services CRM et e-mail, `lib/catalogue/activation.ts` (`PUBLICATION_AUTORISEE = false`).

**Vérifié** —
- `npx tsc --noEmit` vert ; eslint des fichiers touchés : 0 avertissement ; `npx vitest run` : 433/433 (dont gabarits de la frise, six visuels présents avec dimensions exactes, ni PDF ni planche dans `public/`).
- `npx next build` vert.
- `e2e/catalogue-all-in-one.spec.ts`, Chromium et Pixel 5 : 64/64, dont ruban (une seule liste exposée, copies inertes, hauteur ≤ 190 px, défilement continu par petits incréments réguliers, arrêt au survol sans saut, pause et reprise, boucle à la fin d'une période, clavier, précédent sans butée, mouvement réduit, glissement tactile qui prend la main) et catalogue (K1 chargée, K5/K4/K6 chargées en desktop, K3/K2/K6 en mobile, aucun emplacement neutre, matrice agrandie puis fermée par Échap). Le test de la vraie route (503) renvoie 429 après plusieurs passes sur le même serveur local (limiteur 5 requêtes / 10 min) : passe finale sur serveur neuf, verte.
- Specs `language-switch`, `mobile-overflow`, `seo` (Chromium) : 11 échecs, les mêmes qu'en V3, en V4 et sur `main`.
- Captures locales : aucun débordement horizontal à 1440, 1024, 768, 390 et 320 px ; bas du CTA à 827 px sur 900 en 1440 × 900 (inchangé), 881 px sur 768 en 1024 × 768 (inchangé) ; tablette 768 : 1 505 px (V4 : 1 475), mobile 320 : 1 393 px (V4 : 1 373), mobile 390 : 1 269 px (inchangé) ; aucune requête du MP4 sous 768 px ; vidéo du hero en pause quand le ruban défile.
**Supposé** — Que les droits confirmés par Laurent couvrent les personnes visibles sur les pages reproduites (mannequin p. 11, silhouette et témoignage nommé p. 25). Que la fluidité du ruban sur Safari iOS et Firefox soit celle mesurée sur Chromium.
**Non regardé** — Preview Vercel V5 dans un navigateur (SSO) ; Safari, Firefox, appareils réels ; lecteurs d'écran réels ; suite e2e complète (1 024 tests) ; destinations YouTube des QR.

**Suite** — Revue de la Preview V5 par Laurent. Décisions ouvertes : destination des QR « démo » (`orbitvu.fr/contact/` et non la landing) ; la matrice K6 et les fiches du PDF nomment des versions qui ne correspondent pas toutes à la gamme du site (Alphadesk, retirée du site ; « Alphashot XL Pro » contre « Alphashot XL Pro v2 ») ; PDF QA à valider avant tout téléchargement. Aucune fusion ni publication.

---

## 2026-10-02 · Landing catalogue Orbitvu All-in-One — V4 : frise des studios, recadrage de la vidéo du hero · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Branche** : `claude/magical-clarke-rkqimg` | **Base** : `main` `de6c4cd`

**Quoi** — Mission V4 de Laurent. (A) Frise panoramique « Du bijou au mobilier, explorez les studios Orbitvu. » insérée entre le hero et « Imaginez les possibilités ». (B) Diagnostic du film translucide autour du flacon dans la vidéo du hero, puis recadrage du panneau vidéo sur le studio et l'écran. Formulaire, CTA, téléphones et API inchangés.

**Pourquoi** — (A) Donner à voir l'étendue de la gamme avant le formulaire de bas de page. (B) Le rectangle translucide, masqué sur la home par le texte et le voile de `HeroVideo`, était visible dans le panneau éditorial de la V3.

**Diagnostic (B)** — Le défaut est dans le fichier source, pas dans l'intégration. `hero-range-2025.mp4` (H.264 Main, 2280 × 780, 104 images : 1 I, 26 P, 76 B) porte un rectangle aux coins arrondis, plus clair que le fond, autour du flacon, dans les 104 images, image I comprise. Mesure sur une zone de 480 × 440 px : bord haut à 47,7 de luminance à l'extérieur contre 58,5 à l'intérieur, écart-type inter-images 0,06 et 0,04 (couche fixe), contre 14,39 sur le flacon en rotation. Identique dans la copie AV1 de capture et dans l'affiche (`hero-range-2025-poster.avif` = image 0, PSNR 49,5 dB) : la transition affiche → vidéo n'y est pour rien. Son bord gauche traverse les nervures du dôme : ce n'est pas une porte du studio. Sa nature exacte (couche de composition) n'est pas établie. React et le CSS ne sont pas en cause.

**Correction retenue (B)** — Recadrage du même fichier, sans flou ni masque : agrandissement ancré à droite (`origin-right`, `scale` 1,7 / 1,56 / 1,42 selon le rapport du panneau, égal à rapport × 780 / 1100), qui montre x ≈ 1180 à 2280 de la source (studio à gauche, écran avec le packshot du flacon), le rectangle s'arrêtant vers x ≈ 1130. Appliqué aussi à l'image fixe (mobile, mouvement réduit). Options écartées : cadrage V3 (défaut visible), recadrage serré sur le flacon (290 px de source, flou), masque ou flou (interdits par la mission). Le remplacement par une autre séquence propre suppose les vidéos des fiches (R2), injoignables depuis le conteneur (403 Cloudflare) : proposé à Laurent, non fait. Retour au cadrage V3 : deux valeurs dans `CatalogueAllInOne.tsx`.

**Frise (A)** — Source : `MACHINES` (calculateur ROI) pour les noms et familles, `getMachineImage()` pour les images ; aucun chemin construit depuis un id. 13 références non retirées (`delisted`) sur `HEAD`, et non 12 comme indiqué dans la mission. 9 retenues, dans l'ordre de `MACHINES` : Alphashot Micro Pro v2, Alphashot 360, Alphashot Pro G2, Alphashot XL Pro v2, Alphatable v2, Alphastudio Compact Pro v2, Bike Studio, Furniture Studio, E-Comm Studio+. Écartées : Alphastudio XXL Pro v2, Fashion Studio Basic, Fashion Studio Pro v2 (toutes les vues d'ensemble disponibles montrent une personne) ; Alphashot XL G2 (seule image : photo d'ambiance sur fond sombre, incohérente avec les rendus détourés sur fond blanc, et D29 : pas de juxtaposition XL G2 / XL Pro v2). Famille d'usage tirée des données, sans chiffre : catégorie de taille, « Prise de vue à plat » pour l'Alphatable. Ni prix, ni cadence, ni lien vers les fiches. Les neuf studios ne sont pas présentés comme les « 10 systèmes » du PDF.

**Comportement** — Défilement horizontal natif à accroche (`scroll-snap`), `data-lenis-prevent`. Desktop : 4,6 cartes visibles à 1440 px, boutons précédent / suivant / pause ; avancée automatique d'une carte toutes les 4,5 s, seulement à partir de 1024 px avec souris, sans `prefers-reduced-motion`, frise visible à moitié au moins et vidéo du hero hors champ (moins de 30 % visible, header déduit) ; suspendue au survol et au focus de la liste ; arrêtée par toute interaction manuelle (bouton, glissement, molette horizontale, flèches, Début, Fin) jusqu'à « Reprendre » ; arrêt en bout de liste, sans boucle ni carte dupliquée. Tablette : 2,7 cartes ; mobile : 1,4 carte ; pas d'automatisme. La vidéo du hero se met en pause hors champ, en plus de la pause du visiteur : une seule animation majeure à la fois.

**Fichiers** — nouveaux : `components/landings/catalogue-all-in-one/StudiosRail.tsx`, `studios.ts`, `coordination.ts`, `lib/catalogue/__tests__/frise-studios.test.ts` ; modifiés : `components/landings/catalogue-all-in-one/CatalogueAllInOne.tsx`, `VideoStudio.tsx`, `contenu.ts`, `e2e/catalogue-all-in-one.spec.ts`, `docs/seo-geo/ETAT.md`, ce journal. Non modifiés : la home et `components/hero/HeroVideo.tsx`, les fiches machines, `lib/machine-images.ts`, `MACHINES`, la logique de redirection XL, `public/` (aucun fichier ajouté ni modifié), les services CRM et e-mail, les autres formulaires.

**Vérifié** —
- `npx tsc --noEmit` vert ; eslint des fichiers touchés : 0 avertissement ; `npx vitest run lib/catalogue` : 52/52 (6 nouveaux sur la frise : aucune référence retirée, exclusions motivées, D29, noms exacts, images issues de `getMachineImage` et présentes sur disque, familles sans chiffre).
- `npx next build` vert.
- `e2e/catalogue-all-in-one.spec.ts`, Chromium et Pixel 5 : 52/52, dont 5 nouveaux sur la frise (position entre hero et possibilités, 9 cartes sans lien ni prix ; précédent, suivant, flèche droite, Début, Fin ; avancée automatique nulle tant que la vidéo est dans le champ, effective frise centrée, arrêtée par la pause ; mouvement réduit sans bouton pause ni mouvement ; mobile à accroche avec carte suivante entrevue, sans automatisme).
- Specs `language-switch`, `mobile-overflow`, `seo` (Chromium) : 11 échecs, les mêmes qu'en V3 et que sur `main` `8c0dd06`.
- Captures locales : aucun débordement horizontal à 1440, 1024, 768, 390 et 320 px ; bas du bouton principal à 827 px sur 900 en 1440 × 900 (inchangé) ; aucune requête du MP4 à 390 et 320 px ; vidéo du hero en pause frise centrée, reprise en haut de page ; avancée automatique 0 → 290 → 580 → 870 px ; survol de 5 s sans mouvement ; glissement tactile effectif à 390 et 768 px, et à 320 px avec un geste de 216 px.
**Supposé** — Que le rectangle soit une couche de composition du fichier livré : sa nature exacte n'est pas établie. Que Chrome, Safari et Firefox lisent le MP4 H.264 en lecture automatique muette, comme sur la home (le Chromium du conteneur ne décode pas le H.264 : captures faites avec une copie AV1 servie au seul navigateur de capture, hors dépôt).
**Non regardé** — Preview Vercel V4 dans un navigateur (SSO) ; Safari iOS, Android et trackpads réels (défilement horizontal au pavé tactile) ; Firefox et WebKit (absents du conteneur) ; lecteurs d'écran réels ; suite e2e complète (1 024 tests), seules les specs de la landing et les trois specs de comparaison ont été lancées.

**Suite** — Revue de la Preview V4 par Laurent : recadrage de la vidéo (studio en grande partie hors champ, écran au centre) ou séquence de remplacement à fournir ; liste des 9 studios et exclusions ; libellés de famille. Aucune fusion ni publication.

---

## 2026-10-02 · Landing catalogue Orbitvu All-in-One — V3 : vidéo de la home, promesse photographique, catalogue en aide au choix · Claude de Laurent

**Chantier** : landing catalogue All-in-One (#82) | **PR** : #82, brouillon, ne pas fusionner | **Branche** : `claude/magical-clarke-rkqimg` | **Base** : `main` `de6c4cd`

**Quoi** — Recentrage V3 demandé par Laurent : ce qui donne envie, ce sont les possibilités des studios Orbitvu ; le catalogue devient la première étape concrète pour choisir. Hero refait (vidéo de la home, H1 « Vos produits comme vous ne les avez jamais vus. », formulaire inchangé), sections « Imaginez les possibilités » et « Trouvez le studio adapté à vos produits » ; bloc final conservé.

**Pourquoi** — Retour de Laurent du 02/10 sur la première Preview : la page présentait le catalogue comme un objet extraordinaire ; c'est un document commercial utile.

**Fait métier** — FAIT MÉTIER LAURENT, 02/10/2026 : Laurent confirme disposer des droits nécessaires à la diffusion du catalogue et à sa présentation sur cette landing. Cette autorisation n'est plus un arbitrage en attente. Le PDF reste à contrôler techniquement : la copie du kit a une CropBox restreinte.

**Fichiers** — modifiés : `components/landings/catalogue-all-in-one/` (`CatalogueAllInOne.tsx`, `CatalogueForm.tsx`, `EmplacementVisuel.tsx`, `contenu.ts`, `visuels.ts`), `e2e/catalogue-all-in-one.spec.ts` ; nouveaux : `components/landings/catalogue-all-in-one/VideoStudio.tsx`, `SansCoupure.tsx` ; `docs/seo-geo/ETAT.md`, ce journal. Non modifiés : `components/hero/HeroVideo.tsx`, la home, les fiches XL G2 et Pro G2, les routes et redirections XL (D29), `public/`.

**Vidéo** — `public/images/hero/hero-range-2025.mp4` (H.264, 2280 × 780, 3,47 s, 30 i/s, 623 654 o) et `hero-range-2025-poster.avif`, référencés tels quels, sans copie. Inspection image par image : studio et écran entre 27 % et 80 % de la largeur, fond sombre uni ailleurs ; une composition « vidéo en fond » placerait le studio derrière le texte et le formulaire. Choix : panneau éditorial sous le titre (cadrage `55% 50%`, rapport 2:1 en desktop), bandeau pleine largeur en tête sur mobile. `VideoStudio` reprend les règles de `HeroVideo` (lecture muette en boucle à partir de 768 px, image fixe en dessous sans téléchargement de la vidéo, image fixe si `prefers-reduced-motion`), sans le voile latéral prévu pour un fond, avec un bouton pause (WCAG 2.2.2). Le modèle du studio filmé n'est pas nommé : non établi.

**Visuels de la section 2** — quatre visuels déjà publiés sur les fiches du site : `alphashot-xl-g2/advantage-open-doors.avif`, `alphashot-xl-g2/soft-station-capture.avif`, `alphashot-pro-g2/soft-export.avif`, `alphashot-pro-g2/packshot-mascara.avif`. Écartés : les photos montrant une personne (`alphashot-xl-g2/packshot-operator.avif`, `alphashot-pro-g2/session.avif`, mains de `alphashot-xl-g2/hw-turntable.avif` ; droit à l'image ouvert au JOURNAL du 01/10). Légendes sans nom de modèle : la copie interne du catalogue (`pdftotext`) nomme l'Alphashot Pro G2 et l'Alphashot XL Pro v2, pas l'XL G2 (D29). Phrase sur l'IA reprise de `/fr/packshot-e-commerce` : « l'assistant photo IA est réservé aux Alphashot Pro G2 et XL G2 ».

**Vérifié** —
- `npx tsc --noEmit` vert ; eslint des fichiers touchés : 0 avertissement (dont la règle React Compiler sur `setState` dans un effet, évitée par `useSyncExternalStore`) ; `npx vitest run` : 423/423.
- `npx next build` vert ; `/fr/catalogue-orbitvu-all-in-one` prérendue seule.
- `e2e/catalogue-all-in-one.spec.ts`, Chromium et Pixel 5 : 42/42, dont vidéo muette et en boucle en desktop avec bouton pause, aucune requête du MP4 à 390 px, image fixe avec `prefers-reduced-motion`, bouton principal dans le premier écran à 1440 × 900.
- Specs existantes `language-switch`, `mobile-overflow`, `seo` (Chromium) : 11 échecs, identiques à ceux de `main` `8c0dd06` relevés le même jour.
- Captures locales : aucun débordement horizontal à 1440, 1024, 768, 390, 320 et 844 × 390 ; bas du bouton principal à 827 px sur 900 en 1440 × 900, 881 px sur 768 en 1024 × 768 ; à 390 × 844, la carte du formulaire commence dans le premier écran (bouton à 1 269 px). Le Chromium du conteneur ne décode pas le H.264 : pour les captures animées, la requête du MP4 est servie au navigateur de capture avec une copie AV1 du même fichier (scratchpad, hors dépôt).
**Supposé** — Que Chrome, Safari et Firefox lisent le MP4 H.264 en lecture automatique muette, comme sur la home.
**Non regardé** — Preview Vercel V3 dans un navigateur (SSO, pas de jeton) ; Safari iOS et Android réels ; Firefox et WebKit (absents du conteneur) ; lecteurs d'écran réels.

**Suite** — Revue graphique et éditoriale de Laurent sur la Preview V3 ; title et meta description encore ceux du copydeck V2, à trancher avec l'indexation ; export paysage correct du PDF, QR, hébergement, stockage, règle CRM et mention données avant toute activation.

---

## 2026-10-02 · Landing catalogue Orbitvu All-in-One — intégration en PR brouillon, bloquée ASSETS/PDF/EXTERNALS PENDING · Claude de Laurent

**Chantier** : landing d'acquisition du catalogue All-in-One (kit d'intégration du 02/10, brief V2), hors 06-CHANTIERS | **PR** : #82, brouillon, ne pas fusionner | **Commit** : `13f3cf0` | **Branche** : `claude/magical-clarke-rkqimg` | **Base** : `main` `8c0dd06`, puis fusion de `main` `de6c4cd` (#81, documentation seule ; conflits `ETAT.md` et `JOURNAL.md` résolus en conservant les deux côtés)

**Quoi** — Page `/fr/catalogue-orbitvu-all-in-one` (FR seule, France et Suisse) en quatre sections, formulaire dédié et route `POST /api/catalogue` à services injectés. La page répond 404 sur la production Vercel tant que `PUBLICATION_AUTORISEE` est faux ; la route répond 503 `catalogue_unavailable` : aucun stockage, aucun adaptateur Pipedrive ni Resend n'existe dans le code.

**Pourquoi** — GO de Laurent du 02/10 pour une intégration en branche isolée et une PR brouillon uniquement. Objectif : donner envie de recevoir le catalogue, consultant facultatif, démonstration en lien tertiaire.

**Fichiers** — nouveaux : `app/[lang]/catalogue-orbitvu-all-in-one/page.tsx`, `components/landings/catalogue-all-in-one/` (`CatalogueAllInOne.tsx`, `CatalogueForm.tsx`, `EmplacementVisuel.tsx`, `LienTelephone.tsx`, `contenu.ts`, `mesure.ts`, `visuels.ts`), `app/api/catalogue/route.ts`, `lib/catalogue/` (`schema.ts`, `gestionnaire.ts`, `services.ts`, `activation.ts`, `courriel.ts`, `crm.ts`, 3 fichiers de tests), `e2e/catalogue-all-in-one.spec.ts` ; modifiés, ajouts d'une ligne : `i18n/routing.ts` (pathname), `i18n/deChCoverage.ts` (`FR_ONLY`) ; `docs/seo-geo/ETAT.md`, ce journal.

**Effet attendu** — Aucun en production : page en 404, route fermée, aucune entrée de sitemap, aucun lien entrant. Sur Preview et en local : revue visuelle et fonctionnelle, avec réponses d'API simulées.

**Vérifié** —
- `npx tsc --noEmit` vert ; eslint des fichiers touchés : 0 avertissement ; `npx vitest run` : 423/423, dont 46 nouveaux (schéma, route : succès simulé, e-mail en échec, CRM en échec, PDF absent, stockage absent ou en échec, pays absent ou hors FR/CH, double clic, nouvel essai, limitation, champ piège, journal sans donnée personnelle, secrets présents sans effet, simulation ; e-mail composé ; règle CRM ; sélecteur de langue). Contre-épreuve : sans l'entrée `FR_ONLY`, 2 tests échouent.
- `npx next build` vert (valeurs factices) : `/fr/catalogue-orbitvu-all-in-one` prérendue seule. Build avec `VERCEL_ENV=production` vert, puis `next start` : `/fr`, `/en` et `/de-ch/catalogue-orbitvu-all-in-one` en 404, `/fr` en 200, `/api/catalogue` en 503.
- Playwright `e2e/catalogue-all-in-one.spec.ts`, Chromium et Pixel 5 : 34/34 ; réponses d'API interceptées ; la vraie route locale répond 503. Balise `robots` `noindex, nofollow`, aucune canonique, aucun hreflang, aucun lien vers F5 dans `<main>`, aucun pays présélectionné, case consultant décochée, ni téléphone ni case marketing ; sélecteur de langue : EN vers `/en`, DE-CH vers `/de-ch`.
- Specs existantes `language-switch`, `mobile-overflow`, `seo` (Chromium) : 241 réussis, 11 échecs, identiques sur un build de `main` `8c0dd06` : préexistants.
- Captures locales 1440×900, 1024×768 paysage, 768×1024, 390×844, 320×640, 844×390, et sept états du formulaire : aucun débordement horizontal ; bas du CTA à 859 px sur 900 en 1440 ; sous la ligne de flottaison à 1024×768. `prefers-reduced-motion` : éventail fixe. Contrastes calculés : CTA blanc sur `#6667AB` 5,13:1 ; textes ≥ 5,9:1 ; texte indicatif des champs 4,17:1 sur leur fond `future-dusk-0` (même couleur `future-dusk-400` que `ContactForm`).
- Aperçus K1–K6 du kit : injectés dans le navigateur de capture seulement ; `git status` ne montre aucun fichier du kit.
**Supposé** — Que le 404 prérendu par `notFound()` est servi en 404 par Vercel comme par `next start` (mesuré en local seulement). Que `trackEvent` n'émet rien sans consentement analytique (lecture de `GoogleAnalytics.tsx`, non mesuré dans GA4).
**Non regardé** — Preview Vercel (pas de jeton de contournement dans cette session ; visuels non autorisés de toute façon). Firefox et WebKit (navigateurs absents du conteneur). Lecteurs d'écran réels. Rendu sur `www` (R4). Envoi réel : interdit à ce stade.

**Suite** — Bloquants avant toute Preview complète ou publication : PDF paysage brut, accord écrit d'Orbitvu (PDF et pages), destinations des QR, hébergement du PDF, stockage durable et reprise des échecs, règle Pipedrive (étape), mention données, relecture de Sébastien (D42), URL, indexation et header (Laurent), puis GO de Laurent.

---

## 2026-10-02 · #81 — trois précisions avant GO : transmission AI Act, Worker D36, nombre de PR · Claude de Laurent

**Chantier** : gouvernance, rangement GitHub du 02/10 | **PR** : #81, brouillon, documentation seule, branche `claude/brave-cray-som6hl` | **Base** : `main` `8c0dd06`, inchangé

**Quoi** — Trois précisions demandées par Laurent après contre-relecture de #81, dans `ETAT.md` et `REVUE-PR-BRANCHES-2026-10-02.md` seulement. L'entrée ci-dessous (rangement) n'est pas réécrite.
1. **Transmission AI Act** — Le pilotage externe du 02/10 rapporte une transmission à Sébastien intitulée « Dossier IA & images produit : nos 5 articles sont prêts pour ta relecture ». Trois états distingués : transmission rapportée (information du pilotage, non établie par GitHub ; les descriptions de #59 et #60 portent encore « mail à Sébastien non envoyé ») ; accusé de réception non établi ; validation métier (D42, étape 5) non établie, aucune trace GitHub. Périmètre des 5 articles non établi par GitHub ; [Inférence] A, S et B, C, D.
2. **D36 / #67** — Les transmissions de pilotage rapportent un déploiement du Worker après #68, le 01/10. L'entrée ci-dessous écrit « déploiement du Worker non consigné » et « présence du bloc D36 en production non établie » : exact pour le dépôt, à lire désormais avec ce rapport. Statut retenu : déploiement rapporté ; version active à confirmer par lecture Cloudflare READ ONLY ; puis contrôle de `www` ; ensuite seulement, décision sur #67. Aucun nouveau déploiement autorisé.
3. **Nombre de PR** — Les 9 PR du registre sont les PR opérationnelles inventoriées avant #81. GitHub affiche 10 PR ouvertes depuis l'ouverture de #81, documentaire. Les mentions « 9 PR ouvertes » de l'entrée ci-dessous s'entendent ainsi.

**Pourquoi** — GO conditionnel de Laurent du 02/10 : trois clarifications avant la fusion de #81.

**Fichiers** — `docs/seo-geo/ETAT.md` (A, B, C, D, F6, G : lignes ciblées), `docs/seo-geo/REVUE-PR-BRANCHES-2026-10-02.md` (§ 1, § 2, § 3, § 5 : lignes ciblées), `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Aucun effet sur le site : documentation seule.

**Vérifié** — Têtes au 02/10 à 13:36 UTC : `main` `8c0dd06`, #81 `fa3ab31`, inchangées. Plus aucune formulation affirmant que le Worker n'a pas été déployé ni que le dossier AI Act n'a pas été transmis, hors citations des descriptions de PR attribuées comme telles.

**Supposé** — Les deux faits rapportés par le pilotage (transmission du 02/10, déploiement du Worker du 01/10) sont repris tels que Laurent les transmet, sans vérification.

**Non regardé** — Cloudflare (aucune lecture, aucun déploiement) ; messagerie ; `www`.

**Suite** — Lecture Cloudflare READ ONLY du Worker actif, puis contrôle de `www`, avant toute décision sur #67. GO de Laurent pour la fusion de #81.

---

## 2026-10-02 · Rangement GitHub : revue des PR et des branches, `ETAT.md` restructuré · Claude de Laurent

**Chantier** : gouvernance, mission « grand rangement GitHub » de Laurent du 02/10 | **PR** : brouillon, documentation seule, ne pas fusionner sans GO, branche `claude/brave-cray-som6hl` | **Base** : `main` `8c0dd06` (#80)

**Quoi** —
- `ETAT.md` réorganisé : A état actuel, B travaux actifs (les 9 PR ouvertes seulement), C balle chez Laurent (décisions, contrôles Chrome sur `www`), D balle chez Sébastien, E mesures datées, F backlog qualifié (renvois), G dernières livraisons, H projets parallèles, puis référence (P0, questions, décisions récentes, accès). L'en-tête de 25 mises à jour successives est remplacé par un lien permanent vers la version `8c0dd06`.
- `REVUE-PR-BRANCHES-2026-10-02.md` (nouveau) : photographie figée des 9 PR ouvertes, des PR fusionnées du 28/09 au 02/10, des 9 PR fermées sans fusion, des 59 branches classées, et 18 contradictions documentaires.
- `06-CHANTIERS.md` : bandeau « backlog historique » en tête, texte existant inchangé. `README.md` : ligne de `06-CHANTIERS.md` précisée.
- Aucun fichier du site. `DECISIONS.md` et `BOITE-AUX-LETTRES.md` non modifiés. Aucune PR existante modifiée, fusionnée ou fermée ; aucune branche supprimée.

**Pourquoi** — Mission de Laurent du 02/10 : rendre lisible en quelques minutes ce qui est terminé, en cours, en attente de validation, en mesure, au backlog ou conservé pour mémoire. `ETAT.md` présentait comme ouverts des chantiers fusionnés et des décisions fusionnées comme non fusionnées.

**Statuts corrigés dans `ETAT.md`, avec leur preuve** —
- D42 et D43 « #76, non fusionnée » : #76 fusionnée le 02/10 à 04:42:30 UTC, `9400eaa`.
- Ligne #65 « reprend `main` après une éventuelle fusion de #76 » : #76 fusionnée ; #65 a 53 commits de retard et 3 fichiers en conflit.
- Academy (#71), UB-04 (#74), `llms.txt` (#54), R01 (#58), Mode (#66) sortis des chantiers ouverts : fusionnées (GitHub, `git log` de `main`). Contrôles et mesures restants conservés en C et E.
- Chantier « Accents — PR à ouvrir » et « PR accents (CC2) : rebaser après #22 » : #23 fusionnée le 20/09 à 17:30:55 UTC, titre identique ; JOURNAL du 20/09.
- « Mesures M1-M6 du chantier marque » : M3 et M4 faites le 19/09, M1, M2 et M6 le 23/09 (JOURNAL) ; reste M5.
- P0-K « effective à la fusion de #35 » : #35 fusionnée le 25/09 à 06:38:55 UTC.
- « 5 branches distantes portant des commits absents de `main` » (19/09) : 2 sur clone complet (`REVUE-PR-BRANCHES-2026-10-02.md`, § 4).
- Page témoin F5 « à venir » : J0 le 28/09, J+28 le 26/10, J+56 le 23/11 (D37).
- D36 « à exécuter » : précisé — #68 fusionnée le 01/10, bloc Worker dans `main` ; déploiement du Worker non consigné ; #67 bloquée par sa porte.

**Preuves conservées hors de `main`** —
- Contrôle post-déploiement du lot F, consigné le 23/09 dans le JOURNAL de la branche `content/maillage-q3` (#27, commit `e81e5c0`), jamais fusionné. Cité tel quel :

  > **Contrôle post-déploiement** — Par Laurent, `curl.exe` depuis son poste, 23/09 07:45-07:46 UTC, chaîne de requête neuve (B2) : **tout conforme**.
  > - Annexe K, ex-410, `alphashot-xl-v2` et lot C : 301 vers les cibles attendues.
  > - Témoins : `/` → `/fr` ; `/de/studio-photo/alphashot-xl` → `/de-ch/fotostudio/alphashot-xl-g2` ; `videos.` 404 servi par R2, `books.` 302 servi par sa propre origine, `trail.` 200 servi par sa propre origine — aucun sous-domaine renvoyé vers `www`.
  > - de-ch (`next.config.ts`, en production depuis la fusion) : `/de-ch/industrie/mode-textile` → 301 `/de-ch/branchen/mode` → 200 (07:29 UTC).
  > - Jeton de déploiement révoqué.

  Clôture de la ligne lot F à confirmer par Laurent (`ETAT.md`, C).
- Maillage Q3 de #27 : 14 liens posés sur 16 paires listées par Laurent le 23/09, dans une phrase existante, sans mot ajouté. Paires : `comment-avoir-meilleures-images-amazon` et `eclairage-photos-produits` → `/fr/packshot-amazon` ; `comment-mettre-en-valeur-un-produit-guide-photographie-packshot` et `promod-revolutionne-ses-shootings-photos-de-mode` → `/fr/packshot-mode` ; guides `comment-faire-photos-multi-angles-chaussures` et `realiser-animation-360-professionnelle-chaussures` → `/fr/industrie/chaussures` ; guide `comment-positionner-montre-avant-shooting-photo` → `/fr/industrie/horlogerie` ; `formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026` → `/fr/academy` (article supprimé depuis par #71) ; `photographie-de-produits-a-360-degres-en-interne` et `est-il-utile-dinternaliser-sa-production-de-photos-packshot` → `/fr/studio-photo/alphashot-360` ; `guide-achat-studio-2026` → `alphashot-pro-g2` et `alphashot-xl-g2` ; `budget-studio-photo-automatise` → `alphastudio-compact-v2` et `alphashot-pro-g2`. Non réalisées : `meubles-decorations-…` → `/fr/packshot-mode` ; `budget-studio-photo-automatise` → `alphastudio-xxl-v2`. Ancres et emplacements : description de #27.
- Audit B : branche `claude/pensive-cannon-zl2oh4`, commit `ec2b4c62cee81b98de0e8660043866656d3c8c45`, 160 fichiers, aucune PR ; classée HISTORICAL_PRESERVE.
- Têtes des 9 PR fermées sans fusion lisibles par `refs/pull/<n>/head` (#1, #24, #31, #43, #48, #53, #61, #62, #63) ; branches de #24, #31, #43, #48, #53, #61, #62, #63 conservées.

**Fichiers** — `docs/seo-geo/ETAT.md`, `docs/seo-geo/REVUE-PR-BRANCHES-2026-10-02.md` (nouveau), `docs/seo-geo/06-CHANTIERS.md`, `docs/seo-geo/README.md`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Aucun effet sur le site : documentation seule.

**Vérifié** —
- `main` `8c0dd06` relu au début de la mission puis à 13:07 UTC ; aucune poussée sur une branche distante après 12:48 UTC au moment de l'écriture. Statut Vercel de `8c0dd06` : `success` à 12:49:13 UTC (API GitHub publique). Aucune CI ne tourne sur `main` (workflows sur `pull_request` seulement).
- 9 PR ouvertes : tête, base, retard, fichiers, conflits contre `8c0dd06` (`git merge-tree --write-tree`), check runs (4/4 verts sur chaque tête), statut Vercel (`success` sur chaque tête), revues (0), commentaires (aucun de `Sebeth7`).
- 71 PR fermées : 62 fusionnées, 9 sans fusion.
- 59 branches distantes, après `git fetch --unshallow` : avance, retard et patchs uniques (`git cherry`) ; 20 portent des commits absents de `main`. Un clone superficiel donnait 399, 372 et 51 commits d'avance à des branches entièrement contenues dans `main`.
- Contrôle de non-perte : 305 identifiants de l'ancien `ETAT.md` (code, SHA, PR, décisions, hors en-tête) recherchés dans le nouvel `ETAT.md` et la photographie ; les absents sont des réservations de fichiers de chantiers fusionnés, consignées dans leurs entrées du JOURNAL, et des éléments du gabarit.
- `npx tsc --noEmit`, `node scripts/seo/verifier-json.mjs`, `npx next build` (variables factices) : voir la PR.
- Appels payants : aucun, 0 USD.

**Supposé** — [Inférence] Le relevé du 19/09 des branches de Sébastien a été fait sur un clone superficiel : ses valeurs coïncident avec celles d'un clone superficiel du 02/10. Cela repose sur des schémas observés.

**Non regardé** —
- `www` (R4) ; Cloudflare : le Worker déployé n'a pas été lu, la présence du bloc D36 en production n'est donc pas établie ; dashboards Vercel ; Supabase ; n8n.
- Contenu éditorial des PR : aucune relecture, aucune validation.
- #80 : aucun envoi de formulaire, aucune sonde.
- Audits A, C, D, E, F/F2 et livrables de pilotage hors dépôt.
- `JOURNAL.md` : l'entrée #80 ci-dessous porte « PR : à venir » ; non modifiée (ajout seul).

**Collision attendue** — Les PR ouvertes qui modifient `ETAT.md` (#27, #59, #60, #64, #65, #67, #70, #77) entreront en conflit sur ce fichier à leur prochaine reprise de `main` : leur ligne se replace dans la section B (#59, #60, #64, #65, #67, #70), en C pour les points à trancher (date de création, #64), en F2 pour BL-43-2 et BL-43-3 (#77). `JOURNAL.md` : insertion en tête, comme pour toute PR.

**Suite** — GO distincts de Laurent, rien n'est exécuté : sort de #27 ; sort de #65 ; suppression éventuelle des 39 branches sans commit absent de `main` (7 relèvent de Sébastien) ; sort des 3 branches de PR fermées sans fusion ; clôture du contrôle lot F ; fusion de cette PR documentaire.

---

## 2026-10-02 · Formulaire de contact : les demandes envoyées depuis les pages de-ch étaient refusées · Claude de Sébastien

**Chantier** : correctif urgent, hors 06-CHANTIERS | **PR** : à venir | **Base** : `main` `9400eaa`

**Quoi** — `/api/contact` accepte désormais `de-ch`. Le schéma est sorti dans `lib/contact-schema.ts`, et `ContactForm` type sa prop `locale` sur la même liste : une langue envoyée par le formulaire et refusée par l'API devient une erreur de compilation.

**Pourquoi** — Le schéma de l'API n'acceptait que `fr` et `en`, alors que `ContactForm` envoie `de-ch` sur `/de-ch/kontakt`, les fiches `fotostudio`, les pages `branchen`, la gamme et les landings de-ch. Sonde du 02/10 sur `sysnext.vercel.app`, envoi invalide par construction (consentement décoché, aucun effet) : 400, `Invalid option: expected one of "fr"|"en"` sur `locale`. Le visiteur voyait le message d'erreur du formulaire ; rien n'arrivait dans Pipedrive ni par email. Décalage introduit par `818cac8` (27/06, de-ch Palier 2). `e2e/contact-form.spec.ts` n'envoie jamais le formulaire et ne teste pas de-ch.

**Fichiers** — `lib/contact-schema.ts` (nouveau), `app/api/contact/route.ts`, `components/forms/ContactForm.tsx`, `lib/__tests__/contact-schema.test.ts` (nouveau), `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Dès le déploiement : une demande de-ch crée personne, organisation et deal à l'étape 17 « R0 - Nouvelles demandes », prévient Sébastien et Stéphane, et envoie au prospect la confirmation anglaise (même traitement que `en`). Libellé du type de demande dans l'email interne : anglais pour de-ch, comme pour en. Titre du deal : français, inchangé.

**Vérifié** — `npx vitest run` : 377/377, dont 4 nouveaux. Contre-épreuve : avec l'ancienne liste `fr`/`en`, 2 tests sur 4 échouent et `tsc` signale 7 erreurs (les pages qui passent `de-ch`). `npx tsc --noEmit`, eslint des 4 fichiers, `npx next build` verts. `next start` local : la sonde de-ch ne renvoie plus que l'erreur de consentement ; une langue inconnue (`de`) reste refusée.
**Supposé** — Que des demandes de-ch ont été perdues depuis la mise en production de la locale : le code et la sonde l'établissent, la date de mise en production n'est pas vérifiée et le volume perdu est inconnu (une erreur 400 n'est pas journalisée côté application).
**Non regardé** — Envoi réel de bout en bout (il crée un vrai deal et deux emails) : à faire depuis `www` dans Chrome après déploiement, puis suppression de la fiche test. Confirmation en allemand : non écrite, la confirmation anglaise s'applique. `/api/roi-pdf` (calculateur EN et de-ch) : n'a pas de liste de langues fermée, non concerné par ce défaut.

**Suite** — Après fusion : sonde sur `sysnext.vercel.app`, puis envoi réel depuis `/de-ch/kontakt`. Un test e2e qui envoie le formulaire (API simulée) dans les trois langues reste à écrire. Confirmation en allemand à décider.

---

## 2026-10-02 · Cluster AI Act — pilier A : visuel A2 intégré (panneau 1 remonté par compositing local) · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `9400eaa`

**Quoi** — A2 `detourage-meme-tasse-quatre-etapes.avif`, grille 2 × 2, ajouté à la fin de « Une retouche IA n'est pas forcément une nouvelle image », avant « Le détourage a changé de qualification en juillet 2026 ».
- Panneaux 2 à 4 : ceux de `A2_detourage_mise_en_forme_standard_V2.png` (paquet `PSC_AI_ACT_A2_S4_REGENERES_2026-10-02`, création ChatGPT), sans modification.
- Panneau 1 : remonté localement, sans aucune génération, sur consigne de Laurent du 02/10 (« STOP aux nouvelles générations complètes de la tasse »).
  - Tasse du panneau 2 extraite par masque, posée à l'identique dans un décor de studio construit localement : fond gris neutre, table mate, pied de lumière flou à gauche.
  - Ombre d'origine transférée, ombre de contact ajoutée.
  - Le panneau 1 du V2 (autre tasse) est écarté.
- ALT : « Quatre vues de la même tasse fictive en grès : dans un décor de studio, détourée sur fond gris, posée sur fond blanc avec une ombre douce, puis légèrement corrigée. »
- Légende de l'inventaire précédée de la mention du montage : « Illustration générée par IA, avec montage. Étapes de préparation… »
- `readingTime` 21 → 22.
- Commit local, **non poussé** : un seul push final par PR, sur GO de Laurent.

**Pourquoi** — Contrôle du 02/10 : la tasse du panneau 1 de V2 diffère de celle des panneaux 2 à 4 (angle, anse, proportions). Le panneau 1 devait montrer exactement la même tasse.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `public/images/blog/ai-act-images-produit/detourage-meme-tasse-quatre-etapes.avif` (ajout), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Fidélité :
  - panneau 1 contre panneau 2, intérieur du masque : 82 999 pixels repris sans aucun écart ; bordure adoucie vers l'intérieur seulement, aucun pixel de l'ancien fond ;
  - panneaux 3 et 4 contre 2 : écarts limités aux contours ;
  - contrôle visuel à 100 % : rebord, anse, pied.
- Image :
  - PNG source V2 : SHA-256 `13a78934…228931` (manifeste C2PA) ; PNG assemblé : `089e234c…dc8cb1` ;
  - AVIF : libaom, CRF 10 (mouchetures de l'émail lissées à CRF 24), yuv444p, plage complète, BT.709, 1092 × 920, 50 741 o, SHA-256 `3c7d267e…cad9eb`, SSIM 0,986 ; moyenne RGB identique au PNG.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, 7 formats : 0 débordement, 0 erreur ; 6 figures chargées, soit 7 visuels avec l'en-tête ; FAQ 7 = `FAQPage` 7 ; 0 ponctuation isolée.
- `smoke.mjs` vert ; e2e : 307 tests, 24 échecs, liste identique à la référence `main`.

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Preview Vercel réelle (SSO) ; `www` (R4).

**Suite** — GO de push de Laurent ; contrôle humain de la Preview.

---

## 2026-10-02 · Cluster AI Act — pilier européen (A) : maillage vers `/fr/packshot-mode`, audit SEO/GEO et contrôles de finalisation · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `9400eaa`

**Quoi** — Un lien interne ajouté, cas 3 (recolorisation, phrase sur le textile) : ancre « packshot mode » vers `/fr/packshot-mode` (landing Mode, D39, qui porte le même retour métier de Sébastien sur la recolorisation). Aucun autre texte modifié. Commit local, **non poussé** : le push attend le GO de Laurent sur l'inventaire du diff (mission du 02/10).

**Pourquoi** — Mission « Finalisation complète des articles A et S » du 02/10 : maillage interne préparé. Destination vérifiée : 200, indexable, canonique propre, sans affirmation contraire à l'article. Destinations écartées ou conditionnelles (affirmations en tension avec l'article, gel F5, D39, D41) : matrice du livrable `PSC_AI_ACT_A_S_FINALISATION_SEO_MAILLAGE_PREVIEWS_2026-10-02.zip`, hors dépôt. Liens A ↔ S : préparés, non activés (404 dans la Preview de branche), simulés dans une intégration locale A + S sur `main` `9400eaa` : liens en 200.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert ; ESLint : 300 signalements, identiques à `main` (aucun fichier de code modifié).
- `next start` local, 7 formats (1440 × 900, 1024 × 768, 1180 × 820, 820 × 1180, 844 × 390, 390 × 844, 360 × 740) : 0 débordement, 0 erreur, 0 requête en échec, toutes les figures chargées, un seul H1 ; FAQ ouverte au clic et au toucher (A).
- `smoke.mjs` vert ; e2e : 307 tests, 24 échecs, liste identique à la référence `main`.
- Liens externes : 26 en 200 ; EUR-Lex (202) et Légifrance (403) non vérifiables par script.

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Preview Vercel réelle (SSO) ; `www` (R4) ; archives F/F2 et addendum du 02/10, absents du dépôt.

**Suite** — GO de push de Laurent ; A2 et S4 régénérés ; contrôle humain des Previews ; liens A ↔ S au déploiement de publication coordonnée.

---

## 2026-10-02 · Cluster AI Act — pilier A : quatre visuels, Zalando harmonisé, tableau complémentaire condensé · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `9400eaa`

**Quoi**
- **Visuels** (paquet `PSC_AI_ACT_A_S_COMPLEMENTS_2026-10-02`, créations ChatGPT, arbitrage de Laurent du 02/10, option 1) :
  - A7 `marquage-machine-mention-visible.avif` : « Deux obligations, deux acteurs », avant « Qui doit quoi » ;
  - A4 `correction-recolorisation-variantes.avif` : cas 3, après le paragraphe « couleur inexistante » ;
  - A5 `poussiere-image-rayure-produit.avif` : cas 6 ;
  - A6 `chemise-a-plat-mannequin-invisible-portee.avif` : fin du cas 7.
  
  Légendes de l'inventaire reprises telles quelles ; textes alternatifs rédigés. A7 montre un flacon fictif distinct de A1 et A3 : ni l'alt ni la légende ne le présentent comme le même produit. Ratio d'origine conservé (1536 × 1024). A2 non intégré : la géométrie de la tasse change entre la photo de studio et la version détourée. À régénérer.
- **Zalando** : formulation commune de Laurent (« Les consignes Zalando analysées évoquent un marquage invisible des contenus générés par IA à l'horizon décembre 2026. Le statut exact de cette exigence reste à confirmer avant publication. ») sous le tableau des plateformes ; cellule « À faire » ramenée à « marquage invisible évoqué à l'horizon décembre 2026, statut exact à confirmer ». « attendu d'ici décembre 2026 » retiré. **ZALANDO_STATUS = UNRESOLVED / À ARBITRER.**
- **Tableau « Les autres situations en un coup d’œil »** rétabli sous forme condensée : mêmes onze lignes et mêmes réponses que `84520da`. Les étiquettes de provenance entre parenthèses sont remplacées par le code de lecture de l'article, expliqué sous l'intertitre (« selon la Commission », « probablement », « à notre lecture », réponse sans mention = règlement). Aucune réponse modifiée, « non tranché » conservé partout où il figurait.
- `readingTime` 19 → 21.

**Pourquoi** — Arbitrages de Laurent du 02/10 : visuels sans défaut, harmonisation Zalando A / S, tableau complémentaire condensé sans perte des nuances réglementaires.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, quatre AVIF ajoutés dans `public/images/blog/ai-act-images-produit/`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- AVIF : libaom, CRF 24, yuv444p, plage complète, BT.709, 1536 × 1024 ; SSIM face au PNG de 0,964 à 0,979 ; moyenne RGB identique au PNG (pas de dérive de plage). Tailles et SHA-256 : A7 69 440 o `d2433b1a…fc5789` ; A4 49 084 o `a9882c30…24a7de` ; A5 61 091 o `3307f1ab…bd5667` ; A6 155 595 o `6e1a8997…c7a44b`. Les PNG source portent un manifeste C2PA, non conservé dans l'AVIF (comme les autres visuels du site).
- Tableau condensé relu ligne par ligne contre `84520da` : deux précisions de la ligne « Vidéo produit » rétablies avant commit (« hypertrucage », « ou modifié »).
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, Chromium, 1440, 820 et 390 px : 0 débordement, 0 erreur de console, 0 requête en échec ; toutes les figures chargées au défilement, ratios 1,500 (nouveaux visuels) et 1,778 (existants) respectés ; 4 tableaux sans défilement à 1440 et 820 px, défilement horizontal à 390 px ; 0 ponctuation isolée en début de ligne ; canonical et JSON-LD inchangés ; FAQ 7 = `FAQPage` 7.
- `smoke.mjs` vert (17 pages, 3 ressources) ; e2e : 307 tests, 24 échecs, liste identique à la référence `main`.

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Source primaire Zalando (aucune nouvelle recherche, consigne de Laurent) ; Preview Vercel (SSO) par script ; `www` (R4).

**Suite** — A2 régénéré à intégrer ; message à Sébastien préparé, non envoyé (Laurent) ; Zalando à confirmer avant publication.

---

## 2026-10-02 · Cluster AI Act — pilier A : relecture éditoriale du 02/10 intégrée · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `9400eaa` (intégré par fusion, JOURNAL en union)

**Quoi** — Corps et FAQ de l'article réécrits à partir de `01_A_PILIER_FR_PROPOSITION.md` (dossier `PSC_AI_ACT_RELECTURE_EDITORIALE_FR_2026-10-02`, GO de Laurent du 02/10 : « actualiser les Previews »). Texte resserré : ouverture par trois visuels, encadré « L’essentiel en une minute », sept cas numérotés, méthode en sept étapes. Conservés : H1, slug, `title`, `metaTitle`, `description`, `date`, image d'en-tête, figure A3 (alt et légende inchangés), note datée, tableaux « Qui doit quoi », calendrier et plateformes (au 30/09), section Sources complète, 24 liens (liste identique), paragraphe « couleur inexistante » validé le 01/10 (option 1), retour métier de Sébastien sur la recolorisation. Sept FAQ : questions inchangées, réponses raccourcies. `readingTime` 22 → 19.

**Retirés, conformément à la proposition** — Tableau « Les autres situations en un coup d’œil » (onze lignes, dont mannequin invisible, avatar d'essayage, vidéo et 360°, matière réintégrée de B, C et D par D41) ; paragraphe de mesure AVIF/WebP du 30/09 sur notre site (remplacé par une phrase générale sur la conservation des métadonnées) ; marqueurs d'emplacement visuel et notes de travail de la proposition.

**Écarts de sens corrigés (formulation de la PR conservée)** — La proposition, reprise telle quelle, aurait modifié la portée d'une source sur les points suivants :
- déployeur défini comme « la marque qui publie » : rétabli « qui utilise l'outil sous sa propre autorité » (article 3(4)) ;
- produit rendu différent ou meilleur « demande une analyse distincte » (encadré) et « la ressemblance trompeuse doit être appréciée » (cas 5) : rétabli « peut en être un » et « la qualification d'hypertrucage est probable » (exemple de la Commission) ;
- mention « claire et reconnaissable, au plus tard lors de la première exposition » et attribution à la Commission de la perception sans outil : rétablies ;
- agence : conclusions des points 12 et 14 et cas intermédiaire non tranché rétablis ; marketplace non déployeur (point 16) conservée ;
- délai du 2 décembre 2026 : « ajouté par le règlement (UE) 2026/1744 » rétabli ; transparence volontaire « sans effort disproportionné » rétablie ;
- mise en forme standard : liste de la Commission dans ses termes, liste des modifications à marquer rétablie ;
- cas 4 : marquage probable du décor par l'outil rétabli ; cas 6 : marquage en cas de changement de sens rétabli ;
- cas 7 : points 113 et 114, et les trois situations voisines (point 92, article L2133-2, loi 2023-451) rétablis en forme courte ;
- sanctions : règle du montant le plus élevé et règle PME rétablies, note de travail retirée.

**Pourquoi** — Relecture éditoriale du 02/10 : A doit se lire comme un guide ; Sébastien relit cette version.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Comptage (texte du corps et FAQ) : 5 486 → 4 757 mots ; 3 tableaux, 1 figure dans le corps, 11 H2, 10 H3 ; aucun marqueur `[…]`, aucun « Niveau : », aucun Markdown brut ; aucun lien vers `/fr/packshot-e-commerce`.
- Script de liens de publication A ↔ S : essai à blanc vert (phrases de renvoi conservées).
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, Chromium, 1440, 820 et 390 px : 0 débordement, 0 erreur de console, 0 requête en échec, A3 chargée au défilement (1600 × 900), 3 tableaux sans défilement à 1440 et 820 px, défilement horizontal à 390 px ; 0 ponctuation isolée en début de ligne ; sommaire, FAQ (7) et JSON-LD `FAQPage` (7) rendus ; canonical inchangée.
- `smoke.mjs` vert (17 pages, 3 ressources) ; e2e : 307 tests, 24 échecs, liste identique à la référence `main` (`6b80e6a`, `9400eaa` ne modifiant que la documentation).

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Recherche juridique nouvelle (exclue) ; Preview Vercel (SSO) par script ; `www` (R4).

**Suite** — Message rectificatif de Laurent à Sébastien ; après son GO : EN et de-ch (D38), liens A ↔ S, date, publication coordonnée.

---

## 2026-10-01 · Cluster AI Act — pilier A : arbitrage « couleur inexistante » (option 1) appliqué · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `6b80e6a`

**Quoi** — Passage « couleur inexistante » de la section « Recolorisation : variante vendue ou couleur inexistante » remplacé par la formulation validée par Laurent le 01/10 (proposition A06 de `PSC_REVUE_EDITORIALE_AI_ACT_A_S_2026-10-01.md`). Aucune autre phrase de l'article modifiée ; article S (#60) non modifié.

**Changement de sens (validé par Laurent)** — Avant : un coloris inexistant présenté comme disponible « relève probablement d'une modification substantielle et, côté marque, d'un hypertrucage ». Après : « les exemples de la Commission invitent à vérifier si la transformation est substantielle et si la présentation pourrait constituer un hypertrucage, selon le rendu et le contexte ». La conclusion AI Act passe d'une interprétation probable à une question à examiner. L'alerte de droit de la consommation est conservée (article L121-2, lien Légifrance inchangé), et reste distincte de la qualification au titre de l'AI Act.

**Pourquoi** — Arbitrage A / S « couleur inexistante », option 1 : aucune source réunie ne tranche le cas sur une fiche produit ; aligner A sur le degré de S (« reste à qualifier selon le cas ») sans renforcer aucune qualification. Arbitrage clos.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Cohérence A / S : plus aucune phrase de A ne qualifie ce cas d'hypertrucage probable ; S, cas 3 : « son application exacte à une fiche produit reste à qualifier selon le cas » ; mentions de droit de la consommation inchangées dans les deux articles.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert ; `next start` local, Chromium, 1440, 820 et 390 px : 0 débordement, 0 erreur de console, 0 ponctuation isolée, 4 tableaux sans défilement à 1440 et 820 px ; `smoke.mjs` vert ; e2e : 307 tests, 24 échecs, liste identique à `main` `6b80e6a`.

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Recherche juridique nouvelle (exclue par la consigne) ; Preview Vercel (SSO) par script ; `www` (R4).

**Suite** — Transmission des deux Previews FR à Sébastien par Laurent ; après son GO : EN et de-ch (D38), liens A ↔ S, date, publication coordonnée.

---

## 2026-10-01 · Cluster AI Act — pilier A : nouvelle illustration A3 · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `6b80e6a`

**Quoi** — A3 remplacée, sur validation de Laurent du 01/10 : `produit-reel-decor-genere.avif` (A1 recoupée en deux panneaux) → `produit-net-decor-flou.avif` (même flacon net au premier plan sur une pierre claire, décor méditerranéen généré flou, sans texte). Emplacement inchangé (« Produit réel dans un décor ou une scène générés »). Alt : « Flacon net au premier plan, posé sur une pierre claire, devant un décor généré volontairement flou. » Légende inchangée. Ancien fichier supprimé, plus aucune référence.

**Pourquoi** — Contre-vérification du 01/10 : A3 redondante avec l'image d'en-tête A1. Brief A3 du 01/10 (finalisation graphique).

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `public/images/blog/ai-act-images-produit/produit-net-decor-flou.avif` (ajout), `public/images/blog/ai-act-images-produit/produit-reel-decor-genere.avif` (suppression), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Source : PNG 1672 × 941 transmis par Laurent (SHA-256 `971c6a7f…f06895`), redimensionné en 1600 × 900, encodé en AVIF yuv444p, plage complète, BT.709 (90 138 o, SHA-256 `c832a720…9910a9`) ; écart moyen AVIF décodé / maître 1,2 niveau sur 255 ; aucun texte ni marque visibles (contrôle à l'œil sur gros plans).
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, Chromium, 1440, 820 et 390 px : nouvelle image en 200 `image/avif` (1600 × 900, chargée), ancienne en 404 ; 662 × 372, 662 × 372, 358 × 201 ; légende présente ; 0 débordement ; 0 erreur de console ; 0 ponctuation isolée en début de ligne ; 4 tableaux sans défilement à 1440 et 820 px.
- SEO inchangé (title 57, description 155, canonical, FAQPage 7, `og:image` = `cover.avif`) ; `smoke.mjs` vert ; e2e : 307 tests, 24 échecs, liste identique à `main` `6b80e6a`.

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Le PNG source porte un manifeste C2PA (bloc `caBX`) ; l'encodage AVIF ne le conserve pas, comme pour les autres visuels du site. Le conserver demanderait de re-signer le fichier dérivé. Aucune obligation de la marque n'est en cause : l'illustration est signalée par sa légende. Preview Vercel (SSO) ; `www` (R4).

**Suite** — Arbitrage « couleur inexistante » A / S ; transmission à Sébastien.

---

## 2026-10-01 · Cluster AI Act — pilier A : passe éditoriale finale, `main` `6b80e6a` intégré · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `6b80e6a` (#66, #78), fusionné par `5603fb4`

**Quoi** — Corrections rédactionnelles tirées de la relecture `PSC_REVUE_EDITORIALE_AI_ACT_A_S_2026-10-01.md` (GO de Laurent du 01/10), sans réécriture de fond ni réduction de longueur :
- ouverture : la question du lecteur d'abord, phrase méta « À la fin de cet article, vous saurez… » et tournure « pas X, mais Y » retirées ; note de méthode datée déplacée sous « En bref », inchangée ;
- « En bref » : deux puces complémentaires fusionnées (décor généré / produit rendu différent) ;
- tableau « Qui doit quoi » : cellule « Agence » ramenée à une phrase ; la nuance (points 12 et 14, cas intermédiaire non tranché) passe en prose sous le tableau, mot pour mot ;
- intertitre « Pourquoi le détourage a changé de qualification en juillet 2026 » ; phrase d'annonce redondante retirée ;
- introduction des sept situations et du tableau des autres situations resserrées ;
- recolorisation : la généralisation non sourcée « Métal, cuir, textile chatoyant ou verre teinté réagissent mal à une recolorisation » est remplacée par les faits métier de Sébastien déjà publiés sur `/fr/packshot-mode` (#66) : teinte exacte, texture et réaction de la matière à la lumière, en particulier sur le textile ;
- couleur inexistante : fondement de l'interprétation explicité (exemple de la Commission pour la publicité et l'emballage) ; degré inchangé (« probablement ») ;
- scène générée : exemples concrets (perspective, accessoire présenté comme inclus, usage suggéré) ; qualification inchangée (non tranché) ;
- influenceur synthétique traité à un seul endroit : la ligne du tableau rejoint la liste des situations voisines, nuance image fixe / vidéo conservée ;
- rubrique « Sources officielles » renommée « Sources » (elle contient aussi plateformes et standards) ;
- typographie : espace insécable entre jour et mois (24 dates).

**Pourquoi** — Standard éditorial de Laurent : article d'expertise naturel, précis, utile ; contre-relecture du 01/10. `main` fusionné : #66 et #78 mettaient le JOURNAL en conflit.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Comparaison avant / après des nombres, articles, points et marqueurs : « probablement » inchangé (24) ; « points 12 et 14 » cité une fois de plus (nuance déplacée) ; aucune date ni aucun article modifié ; FAQ inchangée hors typographie.
- Fusion de `main` : seul conflit, le haut de ce journal, résolu par union ; aucune ligne perdue ; ETAT et DECISIONS : toutes les lignes de `main` présentes.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert ; rendu local à 1440, 820 et 390 px (détail dans la PR).

**Supposé** — [Inférence] Les faits métier de Sébastien sur la recolorisation sont ceux transmis par Laurent le 30/09 et publiés dans `/fr/packshot-mode` (#66, fusionnée) ; le fichier de réponses d'origine n'est pas dans le conteneur. Cela repose sur des schémas observés.

**Non regardé** — Recherche juridique nouvelle (exclue par la consigne) ; Preview Vercel (SSO) par script ; `www` (R4) ; A3 (fichier régénéré non reçu).

**Suite** — Arbitrage de Laurent sur la cohérence A / S « couleur inexistante » (proposition dans la PR) ; A3 ; liens A ↔ S à activer à la publication (script préparé hors dépôt) ; transmission à Sébastien.

---

## 2026-10-01 · Cluster AI Act — pilier A : `main` `f1a3491` (#75) intégré · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `f1a3491`, fusionné par `9f81252`

**Quoi** — `main` `f1a3491` fusionné (#75 : UB-04 consignée en production, documentation seule). Aucun fichier de l'article ni image modifiés. A3 reste en place : sa régénération (brief du 01/10, finalisation graphique) se fait hors dépôt, sans bloquer l'article Suisse.

**Pourquoi** — #75 mettait le haut du JOURNAL en conflit avec la branche.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun.

**Vérifié**
- Seul conflit : le haut de ce journal, résolu par union ; aucune ligne perdue de part ou d'autre ; ETAT fusionné automatiquement.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert ; `next start` local, Chromium, 1440, 820 et 390 px : 0 débordement, 0 erreur de console, 0 ponctuation isolée en début de ligne, 4 tableaux sans défilement à 1440 et 820 px, 2 images chargées ; `smoke.mjs` vert.

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — e2e non rejoués (aucun fichier du site modifié depuis le passage sur `f9e772f`) ; Preview Vercel (SSO) ; `www` (R4).

**Suite** — Intégration de A3 régénéré : nouveau nom de fichier, `alt` du brief, légende inchangée, ancien fichier supprimé.

---

## 2026-10-01 · Cluster AI Act — pilier A : `main` `17fc0b3` (#73) intégré, espaces insécables · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `17fc0b3`, fusionné par `1dc9293`

**Quoi** — `main` `17fc0b3` fusionné (#73 : mesures D16 archivées, D41, PR historiques #43, #53, #61, #62, #63 fermées sans fusion). Typographie seule, dans le corps et les 7 FAQ : 204 espaces remplacées par des espaces insécables (U+00A0) devant « : », « ; », « ? » et « » », après « « », et dans « 1 080 » et « 1 920 » ; deux points de coupure invisibles (`<wbr>`) dans l'identifiant « trainedAlgorithmicMedia » du tableau des plateformes. Aucun mot, aucun lien, aucune qualification modifiés.

**Pourquoi** — Consigne de Laurent du 01/10 : reprise après #73, articles réellement terminés. Mesure sur `next start` local avant correction : signes de ponctuation rejetés seuls en début de ligne, 10 à 1440 px, 10 à 820 px, 7 à 390 px. Les insécables rendaient « « trainedAlgorithmicMedia », » insécable : le tableau des plateformes défilait de nouveau à 1440 px (695 px pour 662) ; les `<wbr>` le ramènent à 662 px.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Fusion de `main` : seul conflit, le haut de ce journal ; résolu par union (entrées de #59, puis entrées de `main`, dont l'archive D16 et D41 de #73) ; aucune ligne perdue de part ou d'autre, contrôle ligne à ligne.
- Texte : corps et FAQ identiques à `1dc9293` une fois U+00A0 ramenée à l'espace et `<wbr>` retiré ; title, description, H1, slug, date et auteur inchangés.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, Chromium, 1440, 820 et 390 px : 0 signe de ponctuation isolé en début de ligne ; 0 débordement de page ; 0 erreur de console ; 0 réponse en erreur ; 4 tableaux sans défilement à 1440 et 820 px, défilement interne à 390 px ; 2 images chargées (hero 848 × 477, 772 × 434, 358 × 201 ; A3 662 × 372, 662 × 372, 358 × 201), légende de A3 présente ; 0 ancre cassée ; 0 marqueur de travail.
- Métadonnées : title 57 caractères, description 155, canonical inchangé, aucune balise `robots`, JSON-LD Organization, BreadcrumbList, Article (auteur Sébastien Jourdan), FAQPage 7 ; URL au sitemap (309 URL) ; `/fr/packshot-e-commerce` présent dans le seul pied de page commun, aucun lien depuis l'article ; `smoke.mjs` local vert (17 pages, 3 ressources).
- e2e (`seo`, `internal-links-all`, `anchors`, `responsive`, `mobile-overflow`, Chromium, 2 workers) : 307 tests, 24 échecs, liste identique à un build local de `main` `17fc0b3` (0 en plus, 0 en moins).

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Preview Vercel (SSO) par script ; `www` (R4) ; Safari et Firefox ; traductions (D38, non démarrées).

**Suite** — Constats non corrigés, faute de consigne de réécriture, listés dans la PR : « probablement » 24 fois et « textes consultés » 9 fois ; H1 coupé « e- / commerce » à 820, 390, 375 et 360 px (gabarit commun, coupure au trait d'union) ; `date` du 28/09 antérieure aux faits du 30/09 cités, à fixer à la publication ; lien vers l'article Suisse sans `href` jusqu'à la publication coordonnée.

---

## 2026-10-01 · Cluster AI Act — pilier A : image d'en-tête signalée, `main` `8365c73` intégré, contrôles avant Sébastien · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `8365c73`, fusionné par `09871fe`

**Quoi** — Note d'ouverture complétée par une phrase : « L’image d’en-tête est une illustration générée par IA. » (A1 n'a pas de légende dans le gabarit commun, non modifié). `main` `8365c73` fusionné, dont #74 : le fil d'Ariane n'est plus rendu dans le `h1` des articles. Aucune autre phrase de l'article modifiée.

**Pourquoi** — Consigne de Laurent du 01/10 (finalisation avant Sébastien) : signaler l'image d'en-tête comme les légendes de A3 (arbitrage Q1), synchroniser la branche avec `main`. Choix éditorial de transparence, non l'affirmation d'une obligation légale.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Fusion de `main` : seul conflit, le haut de ce journal ; toutes les entrées conservées (UB-04 en tête, puis celles de #59) ; aucune ligne perdue de part ou d'autre.
- `tsc` vert ; `verifier-json` 181 valides ; Vitest 373/373 ; `next build` vert, 372 pages.
- `next start` local, Chromium, 390, 1024 et 1440 px : 200 ; 0 débordement de page ; 0 erreur de console ; un seul `h1`, égal au titre, sans fil d'Ariane ; 4 tableaux, sans défilement à 1024 et 1440 px, défilement interne à 390 px ; 2 images (`cover.avif` 848 × 477 puis 358 × 201, `produit-reel-decor-genere.avif` 662 × 372 puis 358 × 201), chargées ; 7 FAQ visibles et 7 dans le `FAQPage` ; 0 ancre cassée ; 0 lien vers `/fr/packshot-e-commerce`.
- Métadonnées : title 57 caractères, description 155, canonical `https://www.packshot-creator.com/fr/blog/ai-act-images-produit`, aucune balise `robots`, `og:image` = `cover.avif`, JSON-LD Organization, BreadcrumbList, Article, FAQPage ; URL présente au sitemap (309 URL) ; `smoke.mjs` local vert (17 pages, 3 ressources).

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Preview Vercel (SSO) par script ; `www` (R4) ; suite e2e complète (le dernier passage, sur `ea7d923`, était identique à `main`) ; traductions (D38, non démarrées). Articles liés `generer-images-produit-ia` et `migrer-ancien-packshotcreator` : non modifiés dans cette PR (backlog BL-43-2 et BL-43-3 de #73).

**Suite** — Transmission à Sébastien sur la Preview de la nouvelle tête ; à la publication coordonnée : lien actif vers l'article Suisse, `date` du jour.

---

## 2026-10-02 · Cluster AI Act — article Suisse S : visuel S4 intégré (version recomposée) · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : `main` `9400eaa`

**Quoi** — S4 `matiere-finition-gros-plans.avif` ajouté dans le cas 5 « Matière ou finition embellie », après le premier paragraphe.
- Source : `S4_matiere_finition_details_V2.png` (paquet `PSC_AI_ACT_A2_S4_REGENERES_2026-10-02`, création ChatGPT).
- Recomposée localement sans génération, sur arbitrage de Laurent du 02/10 : vue d'ensemble du sac, gros plan grain et couture, gros plan doublure et fermeture. Le gros plan du fermoir est retiré : barre horizontale absente du sac.
- Légende de l'inventaire du 02/10 reprise telle quelle ; ALT rédigé ; ratio 1536 × 1024 conservé.
- Commit local, **non poussé** : le push attend le GO de Laurent.

**Pourquoi** — Contrôle de fidélité de S4 V2 du 02/10 : le gros plan du fermoir ne correspond pas à la vue d'ensemble (deux blocs verticaux), comme sur la version refusée. Les gros plans grain et couture, doublure et fermeture restent compatibles avec le sac.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `public/images/blog/images-ia-ecommerce-suisse/matiere-finition-gros-plans.avif` (ajout), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Image :
  - PNG source V2 : SHA-256 `595371a6…0abd2a` (manifeste C2PA) ; PNG recomposé : `75cf11bd…acadf33` ;
  - AVIF : libaom, CRF 24, yuv444p, plage complète, BT.709, 1536 × 1024, 175 037 o, SHA-256 `267dbaf8…b358e4` ; SSIM 0,981 ; moyenne RGB identique au PNG.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, 7 formats : 0 débordement, 0 erreur, 5 figures chargées (ratio 1,500 pour S4) ; 0 ponctuation isolée.
- `smoke.mjs` vert ; e2e : 307 tests, 24 échecs, liste identique à la référence `main`.

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Preview Vercel réelle (SSO) ; `www` (R4).

**Suite** — GO de push de Laurent ; contrôle humain de la Preview.

---

## 2026-10-02 · Cluster AI Act — article Suisse (S) : maillage vers `/fr/packshot-mode`, audit SEO/GEO et contrôles de finalisation · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : `main` `9400eaa`

**Quoi** — Un lien interne ajouté, cas 2 (recolorisation, phrase sur le textile) : ancre « packshot mode » vers `/fr/packshot-mode` (landing Mode, D39, qui porte le même retour métier de Sébastien sur la recolorisation). Aucun autre texte modifié. Commit local, **non poussé** : le push attend le GO de Laurent sur l'inventaire du diff (mission du 02/10).

**Pourquoi** — Mission « Finalisation complète des articles A et S » du 02/10 : maillage interne préparé. Destination vérifiée : 200, indexable, canonique propre, sans affirmation contraire à l'article. Destinations écartées ou conditionnelles (affirmations en tension avec l'article, gel F5, D39, D41) : matrice du livrable `PSC_AI_ACT_A_S_FINALISATION_SEO_MAILLAGE_PREVIEWS_2026-10-02.zip`, hors dépôt. Liens A ↔ S : préparés, non activés (404 dans la Preview de branche), simulés dans une intégration locale A + S sur `main` `9400eaa` : liens en 200.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert ; ESLint : 300 signalements, identiques à `main` (aucun fichier de code modifié).
- `next start` local, 7 formats (1440 × 900, 1024 × 768, 1180 × 820, 820 × 1180, 844 × 390, 390 × 844, 360 × 740) : 0 débordement, 0 erreur, 0 requête en échec, toutes les figures chargées, un seul H1 ; FAQ ouverte au clic et au toucher (A).
- `smoke.mjs` vert ; e2e : 307 tests, 24 échecs, liste identique à la référence `main`.
- Liens externes : 26 en 200 ; EUR-Lex (202) et Légifrance (403) non vérifiables par script.

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Preview Vercel réelle (SSO) ; `www` (R4) ; archives F/F2 et addendum du 02/10, absents du dépôt.

**Suite** — GO de push de Laurent ; A2 et S4 régénérés ; contrôle humain des Previews ; liens A ↔ S au déploiement de publication coordonnée.

---

## 2026-10-02 · Cluster AI Act — article Suisse S : deux visuels, Zalando harmonisé, trois intertitres interrogatifs restaurés · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : `main` `9400eaa`

**Quoi**
- **Visuels** (paquet `PSC_AI_ACT_A_S_COMPLEMENTS_2026-10-02`, créations ChatGPT, arbitrage de Laurent du 02/10, option 1) :
  - S5 `personne-photo-transformation-synthese.avif` : « Quand une personne apparaît », entre le paragraphe du PFPDT et celui sur le mannequin synthétique ;
  - S6 `meme-article-trois-destinations.avif` : section Google, Amazon et Zalando, avant la liste.
  
  Légendes de l'inventaire reprises telles quelles ; textes alternatifs rédigés ; ratio d'origine conservé (1536 × 1024). S4 non intégré : les gros plans ne correspondent pas au sac montré (fermoir, grain). À régénérer.
- **Intertitres restaurés** : « La Suisse a-t-elle un « AI Act » en 2026 ? » (réponse « Non. », texte de `cc2446c` : « générale et transversale ») ; « Faut-il signaler une image générée ou retouchée par IA en Suisse ? » (réponse courte, puis H3 « Commencez par comparer l’image au produit ») ; « C2PA et IPTC sont-ils obligatoires en Suisse ? » (réponse en gras de `cc2446c`, exigences des plateformes rappelées).
- **Zalando** : formulation commune de Laurent dans la puce Zalando ; « présenté comme requis d'ici décembre 2026 » retiré ; refus des mentions visibles et contenus exigeant une mention légale conservés. **ZALANDO_STATUS = UNRESOLVED / À ARBITRER.**
- `readingTime` 15 → 16.

**Pourquoi** — Arbitrages de Laurent du 02/10 : visuels sans défaut, harmonisation Zalando A / S, restauration des trois intertitres interrogatifs utiles (SEO/GEO).

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, deux AVIF ajoutés dans `public/images/blog/images-ia-ecommerce-suisse/`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- AVIF : libaom, CRF 24, yuv444p, plage complète, BT.709, 1536 × 1024 ; S5 84 410 o `826f849b…7d6706`, SSIM 0,960 ; S6 177 797 o `41d0603c…44ed90`, SSIM 0,966. Les PNG source portent un manifeste C2PA, non conservé dans l'AVIF.
- Aucune occurrence de « requis » dans le texte ; script de liens de publication A ↔ S : essai à blanc vert.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, Chromium, 1440, 820 et 390 px : 0 débordement, 0 erreur de console, 0 requête en échec ; toutes les figures chargées au défilement, ratios 1,500 (nouveaux visuels) et 1,778 (existants) respectés ; tableau sans défilement à 1440 et 820 px, défilement horizontal à 390 px ; 0 ponctuation isolée en début de ligne ; canonical et JSON-LD inchangés ; 11 H2 dont les trois intertitres restaurés.
- `smoke.mjs` vert (17 pages, 3 ressources) ; e2e : 307 tests, 24 échecs, liste identique à la référence `main`.

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Source primaire Zalando (aucune nouvelle recherche, consigne de Laurent) ; Preview Vercel (SSO) par script ; `www` (R4).

**Suite** — S4 régénéré à intégrer ; message à Sébastien préparé, non envoyé (Laurent) ; Zalando à confirmer avant publication.

---

## 2026-10-02 · Cluster AI Act — article Suisse S : relecture éditoriale du 02/10 intégrée · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : `main` `9400eaa` (intégré par fusion, JOURNAL en union)

**Quoi** — Corps de l'article réécrit à partir de `02_S_SUISSE_FR_PROPOSITION.md` (dossier `PSC_AI_ACT_RELECTURE_EDITORIALE_FR_2026-10-02`, GO de Laurent du 02/10 : « actualiser les Previews »). Droit suisse, application éventuelle de l'AI Act et règles des plateformes distingués une fois, puis appliqués aux huit situations. Conservés : H1, slug, `title`, `metaTitle`, `description`, `date`, image d'en-tête, figures S3 et S2 (alt et légendes inchangés), note datée, section Sources complète, liens existants (deux liens ajoutés dans le corps, vers la LPD et la page du PFPDT déjà citées en Sources), retour métier de Sébastien sur le textile, aucune FAQ. `readingTime` 20 → 15.

**Remplacés ou retirés, conformément à la proposition** — H2 « La Suisse a-t-elle un « AI Act » en 2026 ? » et « Faut-il signaler une image générée ou retouchée par IA en Suisse ? » fondus dans l'ouverture et dans « En Suisse, commencez par comparer l’image au produit » ; six situations A à F remplacées par un tableau de questions (quatre lignes de la proposition, plus une ligne « outil édité dans l'Union ou hors de l'Union » reprise des situations E et F) suivi des points 12 et 14 ; tableau récapitulatif Suisse / UE / plateformes retiré ; H2 « C2PA et IPTC sont-ils obligatoires en Suisse ? » fondu dans la section plateformes ; marqueurs d'emplacement visuel et notes de travail retirés.

**Écarts de sens corrigés (formulation de la PR conservée)** :
- cas 2 : « ne tranchent pas tous les aspects » → rétabli « ne tranchent pas la qualification précise » ;
- cas 3 : rétablis « indication inexacte ou fallacieuse » (LCD) et l'exemple de la Commission « dans une publicité ou sur un emballage », « reste à qualifier selon le cas » (cohérent avec l'arbitrage du 01/10) ;
- PFPDT : « doit toujours être clairement indiquée » rétabli (le « toujours » de la source était omis), y compris dans l'encadré ;
- champ territorial : points 10 et 13 dans leurs termes, dont « y compris par la publication d'hypertrucages sur l'internet accessible mondialement » ; exemple du point 14 (célébrité) et règle de l'agence (points 12 et 14) rétablis ; « la simple accessibilité mondiale d'un site ne permet pas, à elle seule… » conservé ;
- Google (« impose », ne pas supprimer), Amazon (exclusions) et Zalando (marquage invisible « présenté comme requis d'ici décembre 2026 », refus des mentions visibles, pas de contenu exigeant une mention légale) : formulations vérifiées le 29/09 rétablies ;
- SECO : « avant-projet destiné à la consultation au printemps 2027 », titre « d'ici début 2027 » rétablis.

**Pourquoi** — Relecture éditoriale du 02/10 : S doit rester lisible seul pour un acteur suisse ; Sébastien relit cette version.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Comptage (texte du corps) : 4 599 → 3 549 mots ; 1 tableau, 2 figures dans le corps, 9 H2, 8 H3 ; aucun marqueur `[…]`, aucun « Niveau : », aucun Markdown brut ; aucun lien vers `/fr/packshot-e-commerce`.
- Script de liens de publication A ↔ S : essai à blanc vert (phrases de renvoi conservées).
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, Chromium, 1440, 820 et 390 px : 0 débordement, 0 erreur de console, 0 requête en échec, S3 et S2 chargées au défilement (1600 × 900), tableau sans défilement à 1440 et 820 px, défilement horizontal à 390 px ; 0 ponctuation isolée en début de ligne ; sommaire rendu, aucune FAQ ; canonical et JSON-LD inchangés.
- `smoke.mjs` vert (17 pages, 3 ressources) ; e2e : 307 tests, 24 échecs, liste identique à la référence `main` (`6b80e6a`, `9400eaa` ne modifiant que la documentation).

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Recherche juridique nouvelle (exclue) ; Preview Vercel (SSO) par script ; `www` (R4).

**Suite** — Message rectificatif de Laurent à Sébastien ; après son GO : EN et de-ch (D38), liens A ↔ S, date, publication coordonnée. Questions en H2 retirées (« La Suisse a-t-elle un AI Act », « C2PA et IPTC… ») : à réexaminer à l'étape 6 de D42 (optimisation SEO/GEO).

---

## 2026-10-01 · Cluster AI Act — article Suisse : passe éditoriale finale, `main` `6b80e6a` intégré · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : `main` `6b80e6a` (#66, #78), fusionné par `31e7faf`

**Quoi** — Corrections rédactionnelles tirées de la relecture `PSC_REVUE_EDITORIALE_AI_ACT_A_S_2026-10-01.md` (GO de Laurent du 01/10), sans réécriture de fond ni réduction de longueur :
- ouverture : question directe, phrase méta « Après lecture, vous saurez… » retirée ; note de méthode datée déplacée sous « En bref », inchangée ;
- « La Suisse a-t-elle un AI Act ? » : « Non. » au lieu de « Pas encore. » ; calendrier SECO rapporté tel que la source le donne (texte : « au printemps 2027 » ; titre : « d'ici début 2027 ») ; « Ce qui peut changer en 2027 » : « annoncé pour 2027 » ;
- redites de la conclusion centrale retirées (« Faut-il signaler… ? », « label IA suisse ») ; tournures « pas X, mais Y » remplacées ;
- contrôle de fidélité : deux paragraphes fusionnés en une méthode (fichier diffusé, variante réellement vendue, chaîne d'intervenants) ;
- cas pratiques : quoi vérifier et contre quoi (cas 1, 2, 7, 8) ; cas 2 : fait métier de Sébastien sur le textile (teinte, texture, rendu sous la lumière), déjà publié sur `/fr/packshot-mode` (#66) ;
- cas 3, couleur inexistante : source précisée (exemple de la Commission, publicité et emballage) ; conclusion inchangée (« à qualifier selon le cas ») ;
- champ territorial : notation unifiée « 2(1)(c) » / « 2(1)(a) » ; situation A sans troisième explication du point 13 (accessibilité insuffisante à elle seule, rôle, usage, destination, cas par cas conservés) ; situation B reformulée ;
- « C2PA et IPTC… » : réponse autonome et brève, alignée sur le pilier ;
- typographie : espace insécable entre jour et mois (13 dates).

**Pourquoi** — Standard éditorial de Laurent ; contre-relecture du 01/10. `main` fusionné : #66 et #78 mettaient le JOURNAL en conflit.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Comparaison avant / après des nombres, articles, points et marqueurs : aucun « à notre lecture » ni « non tranché » transformé en conclusion ; écarts limités à la notation de l'article 2, au calendrier (« 2027 » cité une fois de plus) et à la phrase sur l'article 50 dans « C2PA et IPTC ».
- Fusion de `main` : seul conflit, le haut de ce journal (deux blocs), résolu par union ; aucune ligne perdue ; ETAT et DECISIONS : toutes les lignes de `main` présentes.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert ; rendu local à 1440, 820 et 390 px (détail dans la PR).

**Supposé** — [Inférence] Faits métier de Sébastien : voir l'entrée du pilier A du même jour. Cela repose sur des schémas observés.

**Non regardé** — Recherche juridique nouvelle (exclue par la consigne) ; page SECO non relue aujourd'hui (formulations reprises de la contre-vérification du 01/10) ; Preview Vercel (SSO) ; `www` (R4).

**Suite** — Arbitrage de Laurent sur la cohérence A / S « couleur inexistante » ; liens A ↔ S à la publication ; transmission à Sébastien.

---

## 2026-10-01 · Cluster AI Act — article Suisse : S1 corrigé, S3 reconstruit, S2 nettoyé et déplacé, `main` `f1a3491` intégré · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : `main` `f1a3491` (#75), fusionné par `a0f6033`

**Quoi** — Trois visuels remplacés, sur GO de Laurent du 01/10 (finalisation graphique) :
- S1 (image principale) : `cover.avif` → `cover-trois-couches.avif`. Bande droite de la photo prolongée à partir du fond de studio (restes de la transition de A1 retirés : vitres en diagonale, pierres, feuille d'olivier) ; rectangle fantôme de la première carte comblé.
- S3 : `fidelite-produit.avif` → `fidelite-produit-quatre-rendus.avif`. Un seul flacon de référence, trois rendus dérivés (plus chaud, plus froid, teinte de liquide modifiée par rotation pondérée par la chroma) ; cartes neutres, référence signalée par un liseré et le nœud plein de la frise. Alt et légende nouveaux.
- S2 : `suisse-ue-plateforme.avif` → `suisse-ue-plateformes-couches.avif`. Coin sombre, pastille et extrémités de barre parasites retirés ; figure déplacée de « Faut-il signaler… » (mot 760) vers « Quand l’AI Act peut concerner une entreprise suisse », après « Cela ne permet pas de conclure automatiquement… » (mot 2 827). Alt et légende inchangés.
- Anciens fichiers supprimés : plus aucune référence dans le code ni le contenu (recherche dans le dépôt, hors historique du JOURNAL). Texte de l'article inchangé hors figures.

**Pourquoi** — Revue graphique du 01/10 : S3 à aplats rectangulaires décalés et cartes teintées lisibles comme un statut ; raccord de A1 visible sur S1 ; S2 redondant avec S1 à 760 mots du hero et porteur d'artefacts. `main` fusionné : #75 (docs) mettait le JOURNAL en conflit.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `public/images/blog/images-ia-ecommerce-suisse/` (3 ajouts, 3 suppressions), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38). `og:image` et `image` de l'`Article` suivent le nouveau nom.

**Vérifié**
- Fichiers : AVIF 1600 × 900, yuv444p, plage complète, BT.709 ; SHA-256 `0a314229…b992d2` (S1, 13 397 o), `23de32e4…59dd11` (S3, 39 962 o), `c892eb2d…4a28` (S2, 11 013 o), identiques au paquet `FINALISATION_GRAPHIQUE_AI_ACT_2026-10-01`. Écart moyen AVIF décodé / maître PNG inférieur à 1 niveau sur 255.
- Fusion de `main` : seul conflit, le haut de ce journal, résolu par union ; aucune ligne perdue de part ou d'autre ; ETAT fusionné automatiquement.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, Chromium, 1440, 820 et 390 px : nouvelles images en 200 `image/avif`, anciennes en 404 ; 3 images chargées (hero 848 × 477, 772 × 434, 358 × 201 ; S3 et S2 662 × 372, 662 × 372, 358 × 201) ; 2 légendes ; 0 débordement ; 0 erreur de console ; 0 réponse en erreur ; 0 ponctuation isolée en début de ligne ; tableau sans défilement à 1440 et 820 px.
- SEO : title 53, description 146, canonical inchangé, aucune balise `robots`, `og:image` et `Article.image` = `cover-trois-couches.avif` ; carte de `/fr/blog` sur le nouveau fichier ; sitemap 309 URL ; `smoke.mjs` vert (17 pages, 3 ressources).
- e2e (`seo`, `internal-links-all`, `anchors`, `responsive`, `mobile-overflow`, Chromium, 2 workers) : 307 tests, 24 échecs, liste identique à `main` `17fc0b3` (`f1a3491` n'en diffère que par la documentation).

**Supposé** — [Inférence] Les corrections partent des AVIF publiés, les PNG maîtres (`AI_ACT_VISUAL_HANDOFF_2026-09-30.zip`) n'étant pas dans le conteneur : perte de génération jugée invisible à l'affichage. Cela repose sur des schémas observés.

**Non regardé** — Preview Vercel (SSO) par script ; `www` (R4) ; Safari et Firefox ; A2 et S4 (absents du dépôt).

**Suite** — A3 du pilier à régénérer hors dépôt (brief du 01/10) ; GO de Sébastien sur la Preview ; à la publication : liens A ↔ S et `date`.

---

## 2026-10-01 · Cluster AI Act — article Suisse : `main` `17fc0b3` (#73) intégré, espaces insécables · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : `main` `17fc0b3`, fusionné par `271580c`

**Quoi** — `main` `17fc0b3` fusionné (#73 : mesures D16 archivées, D41, PR historiques #43, #53, #61, #62, #63 fermées sans fusion). Typographie seule, dans le corps : 136 espaces remplacées par des espaces insécables (U+00A0) devant « : », « ; », « ? » et « » », et après « « ». Aucun mot, aucun lien, aucune qualification modifiés.

**Pourquoi** — Consigne de Laurent du 01/10 : reprise après #73, articles réellement terminés. Mesure sur `next start` local avant correction : signes de ponctuation rejetés seuls en début de ligne, 3 à 1440 px, 3 à 820 px, 9 à 390 px.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Fusion de `main` : seul conflit, le haut de ce journal ; résolu par union (entrées de #60, puis entrées de `main`, dont l'archive D16 et D41 de #73) ; aucune ligne perdue de part ou d'autre, contrôle ligne à ligne.
- Texte : corps identique à `271580c` une fois U+00A0 ramenée à l'espace ; title, description, H1, slug, date et auteur inchangés.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert.
- `next start` local, Chromium, 1440, 820 et 390 px : 0 signe de ponctuation isolé en début de ligne ; 0 débordement de page ; 0 erreur de console ; 0 réponse en erreur ; tableau sans défilement à 1440 et 820 px, défilement interne à 390 px ; 3 images chargées (hero 848 × 477, 772 × 434, 358 × 201 ; S2 et S3 662 × 372, 662 × 372, 358 × 201), légendes de S2 et S3 présentes ; 0 ancre cassée ; 0 marqueur de travail.
- Métadonnées : title 53 caractères, description 146, canonical inchangé, aucune balise `robots`, JSON-LD Organization, BreadcrumbList, Article (auteur Sébastien Jourdan) ; URL au sitemap (309 URL) ; `/fr/packshot-e-commerce` présent dans le seul pied de page commun, aucun lien depuis l'article ; `smoke.mjs` local vert (17 pages, 3 ressources).
- e2e (`seo`, `internal-links-all`, `anchors`, `responsive`, `mobile-overflow`, Chromium, 2 workers) : 307 tests, 24 échecs, liste identique à un build local de `main` `17fc0b3` (0 en plus, 0 en moins).

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Preview Vercel (SSO) par script ; `www` (R4) ; Safari et Firefox ; adaptation de-ch (non démarrée).

**Suite** — Constats non corrigés, faute de consigne de réécriture, listés dans la PR : « à notre lecture » 9 fois ; renvois au périmètre des sources sous cinq formes, parfois dans la même phrase (« 29 septembre 2026 » 7, « textes consultés » 6, « sources analysées » 5, « sources consultées » 3, « sources étudiées » 1) ; notation « 2(1)(c) » (3) et « article 2, paragraphe 1, lettre c » (1) ; 8 paragraphes de plus de 90 mots, dont la situation A (157 mots) ; H1 coupé « e- / commerce » à 390, 375 et 360 px (gabarit commun) ; lien vers le pilier sans `href` jusqu'à la publication coordonnée.

---

## 2026-10-01 · Cluster AI Act — article Suisse : image d'en-tête signalée, `main` `8365c73` intégré, contrôles avant Sébastien · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : `main` `8365c73`, fusionné par `8d43b90`

**Quoi** — Note d'ouverture complétée par une phrase : « L’image d’en-tête est une illustration générée par IA. » (S1 n'a pas de légende dans le gabarit commun, non modifié). `main` `8365c73` fusionné, dont #74 : le fil d'Ariane n'est plus rendu dans le `h1` des articles. Aucune autre phrase de l'article modifiée.

**Pourquoi** — Consigne de Laurent du 01/10 (finalisation avant Sébastien) : signaler l'image d'en-tête comme les légendes de S2 et S3 (arbitrage Q1), synchroniser la branche avec `main`. Choix éditorial de transparence, non l'affirmation d'une obligation légale.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Fusion de `main` : seul conflit, le haut de ce journal ; toutes les entrées conservées (UB-04 en tête, puis celles de #60) ; aucune ligne perdue de part ou d'autre.
- `tsc` vert ; `verifier-json` 181 valides ; Vitest 373/373 ; `next build` vert, 372 pages.
- `next start` local, Chromium, 390, 1024 et 1440 px : 200 ; 0 débordement de page ; 0 erreur de console ; un seul `h1`, égal au titre, sans fil d'Ariane ; 1 tableau, sans défilement à 1024 et 1440 px, défilement interne à 390 px ; 3 images (`cover.avif` 848 × 477 puis 358 × 201, `suisse-ue-plateforme.avif` et `fidelite-produit.avif` 662 × 372 puis 358 × 201), chargées ; pas de FAQ ni de `FAQPage` (choix maintenu) ; 0 ancre cassée ; 0 lien vers `/fr/packshot-e-commerce`.
- Métadonnées : title 53 caractères, description 146, canonical `https://www.packshot-creator.com/fr/blog/images-ia-ecommerce-suisse`, aucune balise `robots`, `og:image` = `cover.avif`, JSON-LD Organization, BreadcrumbList, Article ; URL présente au sitemap ; `smoke.mjs` local vert (17 pages, 3 ressources).

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — Preview Vercel (SSO) par script ; `www` (R4) ; suite e2e complète (le dernier passage, sur `997cae4`, était identique à `main`) ; adaptation de-ch (D38, non démarrée). Articles liés `generer-images-produit-ia` et `migrer-ancien-packshotcreator` : non modifiés dans cette PR (backlog BL-43-2 et BL-43-3 de #73).

**Suite** — Transmission à Sébastien sur la Preview de la nouvelle tête ; à la publication coordonnée : lien actif vers le pilier A, `date` du jour.

---

## 2026-10-02 · D43 révisée : budget global de 200 USD par mois pour les services payants de recherche SEO/GEO · Claude de Laurent

**Chantier** : gouvernance | **PR** : #76, brouillon, non fusionnée, branche `claude/vibrant-dijkstra-8g0ae5` | **Base** : `main` `6b80e6a`, inchangé

**Quoi** —
- D43 réécrite sur la décision de Laurent du 02/10, citée : 200 USD par mois, toutes missions confondues ; plus de plafond général de 20 USD par mission ni de budget de 20 USD par trimestre ; seuil de 2 USD supprimé ; GO explicite de Laurent avant tout appel payant ou lot d'appels délimité, sur présentation de sept éléments ; consommation du mois non établie à indiquer ; fractionnement interdit. Titre et date de D43 modifiés.
- Arbitrages budgétaires du 01/10 conservés dans D43 pour trace, marqués comme remplacés. Deux dispositions maintenues, listées : la définition d'une mission ; aucun plafond ne vaut autorisation d'écriture, de déploiement, de lancement de workflow ou de modification d'un service externe.
- D26 : ligne « Statut » ; point 4 remplacé par D43 du 02/10 ; formulation historique conservée.
- D42 : trois renvois budgétaires actualisés (note de version, arbitrage 3, tableau d'articulation). Texte et arbitrages éditoriaux inchangés.
- Q19 : référence budgétaire actualisée.
- ETAT : budget applicable ; ligne « À CONFIRMER » retirée ; ligne #65 ; tableau des décisions.

**Évolution des règles budgétaires**

| Date | Source | Règle | État au 02/10 |
|---|---|---|---|
| 19/09 | D26, point 4 | 20 $ par trimestre, GO au-delà de 2 $ par exécution | Remplacée |
| 01/10 | D42, première version | « Pas d'appel payant sans GO préalable » | Remplacée par D43, qui reprend et précise le GO |
| 01/10 | D43, premier arbitrage | Autorisation-cadre de 20 USD cumulés par mission | Remplacée |
| 01/10 | D43, arbitrages finaux 1 et 2 | 20 USD par trimestre et 20 USD par mission cumulés ; GO pour tout appel ; définition de la mission | Remplacés, sauf la définition de la mission |
| 02/10 | D43 | 200 USD par mois, toutes missions confondues ; GO explicite avant tout appel | **En vigueur** |

**Pourquoi** — Décision de Laurent du 02/10 : elle remplace explicitement D26 point 4, le plafond de 20 USD par mission de D43 et le seuil de 2 USD.

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/BOITE-AUX-LETTRES.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Aucun effet sur le site : documentation seule.

**Vérifié** —
- Têtes au 02/10 vers 04:28 UTC : #76 `6acfd87`, `main` `6b80e6a`, #65 `c5e15a8`.
- D42 : seules ses trois lignes de renvoi budgétaire changent ; texte d'origine identique à la tête `59861e9`. D26 : seule la ligne « Statut » change. Citations des arbitrages du 01/10 conservées à l'identique.
- Plus aucun point ouvert « À CONFIRMER » ou « À ARBITRER » dans `DECISIONS.md` ni `ETAT.md` : les occurrences restantes le déclarent sans objet ou appartiennent à l'historique de l'en-tête d'`ETAT.md`. Les seules mentions de 20 USD par mission ou par trimestre restantes sont historiques et marquées comme remplacées.
- Aucun registre de la consommation mensuelle dans `docs/seo-geo/` : la consommation d'octobre 2026 n'y est pas établie.
- JOURNAL : 92 entrées ; aucune ligne de `main` ni de la tête `6acfd87` perdue.
- `npx tsc --noEmit` vert ; `verifier-json` : 180 JSON valides ; Vitest : 373 tests sur 373, 18 fichiers ; `npx next build` vert, variables factices.
- CSS compilée de la branche, texte final compris, identique à celle de `main` `6b80e6a` construit à part : 3 feuilles, mêmes noms et mêmes empreintes MD5.
- Appels payants de cette mission : aucun, 0 USD.

**Supposé** — Rien.

**Non regardé** —
- #65, #64 et les autres PR : non modifiées, par consigne.
- Consommation réelle d'octobre 2026 sur les services payants : hors dépôt, non établie.

**Suite** —
- Claude de #65 : prompt actualisé. Le point 7 (calculateur ROI) renvoie à D43 du 02/10 : budget global de 200 USD par mois, GO explicite de Laurent avant tout appel payant.
- GO de Laurent pour la fusion de #76.

---

## 2026-10-01 · Arbitrages finaux D40 / D42 / D43 consignés · Claude de Laurent

**Chantier** : gouvernance | **PR** : #76, brouillon, non fusionnée, branche `claude/vibrant-dijkstra-8g0ae5` | **Base** : `main` `6b80e6a`, inchangé depuis l'entrée ci-dessous

**Quoi** —
- D43 réécrite sur les arbitrages finaux 1 et 2 de Laurent, cités : budgets de 20 USD par trimestre (D26, conservé) et de 20 USD par mission cumulés ; GO préalable explicite de Laurent pour tout appel payant ; un plafond n'est pas une autorisation de dépense ; définition de la mission ; fractionnement interdit. Le premier arbitrage reste cité pour trace, avec ce qui en est remplacé. Titre modifié : « autorisation-cadre » ne décrit plus la règle.
- D26 : ligne « Statut » alignée.
- D42 : arbitrages finaux 3 (modifications après le GO de Sébastien) et 4 (corrections typographiques) cités à la place des deux points À ARBITRER ; tableau d'articulation avec D40 complété de deux lignes ; statut et interdits complétés.
- Q19 : arbitrages finaux 3 et 4 ajoutés ; portée de D43 corrigée.
- ETAT : un point À CONFIRMER ; ligne #65 ; ligne Q19 ; registre budgétaire absent ; tableau des décisions en vigueur ou proposées.

**Pourquoi** — GO de Laurent du 01/10 sur les quatre arbitrages finaux. Correction : la version précédente de Q19 présentait D43 comme applicable aux contenus du Claude de Sébastien ; aucun arbitrage ne le dit.

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/BOITE-AUX-LETTRES.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Aucun effet sur le site : documentation seule.

**Vérifié** —
- Têtes au 01/10 vers 19:12 UTC : #76 `4a24783`, `main` `6b80e6a`, #65 `c5e15a8`, inchangées depuis l'entrée ci-dessous.
- Citations : texte d'origine de D42 identique à la tête `59861e9` ; premier arbitrage de D43 identique à la tête `4a24783` ; arbitrages finaux cités tels que reçus.
- Plus aucun point « À ARBITRER » dans `DECISIONS.md` ; un point « À CONFIRMER » (D43).
- Aucun registre du cumul des missions ni du solde trimestriel dans `docs/seo-geo/` (recherche de « solde », « par trimestre », « budget de mesure »).
- JOURNAL : 91 entrées ; aucune ligne de `main` ni de la tête `4a24783` perdue.
- `npx tsc --noEmit` vert ; `verifier-json` : 180 JSON valides ; Vitest : 373 tests sur 373, 18 fichiers ; `npx next build` vert, variables factices.
- CSS compilée de la branche, texte final compris, identique à celle de `main` `6b80e6a` construit à part : 3 feuilles, mêmes noms et mêmes empreintes MD5.
- Appels payants de cette mission : aucun, 0 USD.

**Supposé** — Rien.

**Non regardé** —
- #65, #64 et les autres PR : non modifiées, par consigne.
- Protection Vercel, liens partageables, autorisations : non touchés.

**Suite** —
- Laurent : le point À CONFIRMER de D43 (dépassement du plafond de mission sur GO).
- Claude de #65 : les 14 corrections de l'entrée ci-dessous, avec ces changements :
  - point 1 : reprendre `main` après une éventuelle fusion autorisée de #76 ; à défaut, citer D42 et D43 comme consignées dans #76, non fusionnée ;
  - point 7 : tout appel payant, conversation de test du calculateur ROI comprise, demande le GO préalable explicite de Laurent (service, coût estimé, plafond maximal), dans le plafond de la mission et le solde trimestriel (D43) ;
  - point 8 : la place des étapes 6 à 8 de D42 n'est plus à arbitrer : appliquer l'arbitrage final 3 ;
  - point 9 : « Non concerné », corrections typographiques : appliquer l'arbitrage final 4 (pas de nouveau circuit complet ; contrôles techniques, traçabilité proportionnée, validation ciblée si le périmètre typographique est dépassé) ;
  - ajout 15 : § 2, « Règle d'envoi », et § 6, étape 7 : aligner le renvoi après un push sur l'arbitrage final 3 (validation ciblée si changement substantiel ; information si métadonnées, maillage, liens ou réglages techniques ; contrôles dans tous les cas) ;
  - ajout 16 : § 6, tableau du régime, et § 9, gabarit : le GO métier de Sébastien n'est pas une autorisation de publication ; l'autorisation finale de publication ou de fusion appartient à Laurent ;
  - ajout 17 : D40, « Ce qu'elle interdit » : y reporter « transformer le GO métier de Sébastien en autorisation automatique de publication ».

---

## 2026-10-01 · Réconciliation de la gouvernance D40 / D42 / D43, #76 synchronisée avec `main` · Claude de Laurent

**Chantier** : gouvernance | **PR** : #76, brouillon, non fusionnée, branche `claude/vibrant-dijkstra-8g0ae5` | **Base** : `main` `6b80e6a` (#75, #66, #78), fusionné dans la branche

**Quoi** —
- `main` `6b80e6a` fusionné dans la branche. Conflits dans `JOURNAL.md` et `ETAT.md`, résolus en conservant les deux côtés ; `DECISIONS.md` fusionné sans conflit, D39 (#66) conservée.
- D43 : arbitrage du point 3 cité mot pour mot ; budget trimestriel et définition de la mission marqués **À ARBITRER**, comme dans le statut de D26.
- D42 : fait métier de Laurent du 01/10 sur l'accès de Sébastien aux Preview ; tableau d'articulation avec D40, proposée dans #65 et non fusionnée ; deux points **À ARBITRER**.
- ETAT : #54 et #71 consignées fusionnées ; ligne des quatre points À ARBITRER ; modifications à transmettre au Claude de #65 ; liste des PR de contenu mise à jour (#66 publiée, #77 ajoutée).

**Pourquoi** — GO de Laurent du 01/10 : réconcilier D40, D42 et D43 avant toute fusion. Fait métier de Laurent du 01/10 : « Sébastien peut ouvrir les Previews Vercel protégées. Son accès fonctionne, il n'y a aucun problème. »

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Aucun effet sur le site : documentation seule.

**Vérifié** —
- Têtes au 01/10 vers 17:46 UTC : `main` `6b80e6a` ; #65 `c5e15a8`, base `8ec89c1`, non synchronisée avec `main` ; #76 `90e94d7` avant cette entrée.
- Fusions sur `main` depuis la base précédente de #76 (`17fc0b3`) : #75 à 14:57:19 UTC, #66 à 16:26:04 UTC, #78 à 17:30:39 UTC.
- JOURNAL : 89 entrées, soit les 87 de `main` et les 2 de #76 ; aucune ligne de l'un ou l'autre côté perdue. Ordre de la zone fusionnée : heure du commit qui a introduit chaque entrée.
- ETAT : états de PR comparés à GitHub. #54 (29/09, 16:31:38 UTC, `2854c27`), #71 (30/09, 20:40:44 UTC, `8ec89c1`) et #72 (01/10, 09:02:01 UTC, `a6760da`) étaient notées ouvertes ou non fusionnées : corrigées. Ligne UB-04 : version de `main` (#75) retenue, doublon de « Balle chez Laurent » retiré.
- `/llms.txt` sur `sysnext.vercel.app` : 200, aucune occurrence de « exclusi » ni de « 2004 », « 16 secteurs » (#54).
- Numérotation : D40 sur #65 seulement ; D42, D43 et Q19 sur #76 seulement ; aucune D44 ni Q20 sur les branches distantes.
- Bloc cité de D42 identique à celui de la tête `59861e9` ; citation de D43 conforme au texte de l'arbitrage.
- `npx tsc --noEmit` vert ; `verifier-json` : 180 JSON valides ; Vitest : 373 tests sur 373, 18 fichiers ; `npx next build` vert, variables factices.
- CSS compilée de la branche, texte final de cette entrée compris, identique à celle de `main` `6b80e6a` construit à part : 3 feuilles, mêmes noms et mêmes empreintes MD5. Écart avec `main` limité à 4 fichiers de `docs/seo-geo/`.
- Appels payants de cette mission : aucun, 0 USD. Consigne de Laurent du 01/10 : cette mission documentaire ne vaut pas autorisation de lancer un appel payant.

**Supposé** — Rien.

**Non regardé** —
- #65, #64 et les autres PR : non modifiées, par consigne. #77 (AI Act Q2) relevée par ses fichiers, non lue.
- Protection Vercel, liens partageables, autorisations : non touchés.
- `www` dans Chrome (R4).

**Suite** —
- Laurent : quatre points **À ARBITRER**. D43 : budget trimestriel ; définition de la mission. D42 et D40 : étape 6 après le GO ; corrections typographiques ponctuelles.
- Modifications à transmettre au Claude de #65, tête `c5e15a8` :
  1. Fusionner `main` (au moins `6b80e6a`) dans la branche ; placer D40 entre D41 et D39, sans renuméroter ; ne pas présenter D42 ni D43 comme fusionnées tant que #76 ne l'est pas.
  2. D40, « La décision » : remplacer « contrôle du rendu (desktop, 390 px, SEO) » par un contrôle sur ordinateur, smartphone et tablette, en portrait et en paysage lorsque pertinent, interactions tactiles comprises, et SEO (D42, arbitrage 4).
  3. D40, « Le contexte » : remplacer « L'accès de Sébastien aux Preview n'est pas établi par les sources du dépôt ; il se vérifie au premier envoi. » par le fait métier de Laurent du 01/10, cité.
  4. D40, « Ce qu'elle ne change pas » : indiquer que D12 est complétée par D42 (arbitrage 1) pour les contenus éditoriaux : fusion après validation et autorisation de publication.
  5. `08-PREVIEW-VALIDATION.md`, schéma d'en-tête (l. 8) : même remplacement qu'au point 2.
  6. § 3, « Sébastien » (l. 108-121) : remplacer « Accès non établi par les sources du dépôt », l'inférence et la « Vérification au premier envoi » par le fait métier. Conserver « Request access : ne pas contourner » et « Ce que ce circuit ne fait jamais sans GO de Laurent ».
  7. § 4, ligne « Calculateur ROI » (l. 147) : rattacher à D43 (service identifié, coût estimé, cumul de la mission, plafond de 20 USD, nouveau GO au-delà).
  8. § 6 : étape 4, critère de sortie élargi comme au point 2 ; étape 8 « Fusion » : après validation et autorisation de publication (D42, arbitrage 1). La place des étapes 6 à 8 de D42 après le GO reste À ARBITRER : ne pas la trancher dans #65.
  9. § 6, « Non concerné » (l. 209) : laisser les corrections typographiques ponctuelles en l'état, avec un renvoi au point À ARBITRER de D42.
  10. § 8 : ajouter la tablette, les orientations portrait et paysage lorsque pertinent, et les interactions tactiles. L'arbitrage ne fixe ni largeur de tablette ni liste d'interactions : ne pas en inventer.
  11. § 9, gabarit (l. 278) : remplacer « rendu desktop et 390 px contrôlé » par « rendu ordinateur, smartphone et tablette contrôlé, portrait et paysage si pertinent, interactions tactiles testées ».
  12. `ETAT.md` de #65 : ligne « Circuit Preview Vercel → Sébastien (D40) » et en-tête : remplacer « accès de Sébastien aux Preview non établi » par l'accès confirmé du 01/10.
  13. `JOURNAL.md` de #65 : une nouvelle entrée consigne ces modifications ; l'entrée du 30/09 n'est pas réécrite.
  14. Interdits : aucune modification de la protection Vercel, aucun lien public, aucune autorisation ; aucun appel payant.

---

## 2026-10-01 · Mode — #66 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : substitution de page, extension à Mode (D39) | **PR** : #66, fusionnée | **Commit** : `4093d3d` (fusion de `04fdc8a`)

**Quoi** — Publication coordonnée de `/fr/packshot-mode`, `/en/packshot-mode` et `/de-ch/packshot-mode`. Le GO de fusion a été donné par Laurent. La PR a été fusionnée le 01/10 à 16:26:04 UTC. Le déploiement Vercel de production a abouti à 16:27:09 UTC (statut `success` sur `4093d3d`). J0 de mesure = 01/10 ; J+28 = 29/10 ; J+56 = 26/11.

**Vérifié sur l'origine (`sysnext.vercel.app`, hors Cloudflare)** —
- Avant fusion, les trois pages portaient encore « 500 + », « - 80 % », « 3 s », Alphadesk et 100 × 70 cm. Après fusion :
  - les trois pages répondent 200 ;
  - les title, H1, canonical, `og:locale` (fr_FR, en_US, de_CH) sont ceux de la PR ;
  - hreflang : 5 entrées (fr, fr-CH, en, de-CH, x-default) ;
  - JSON-LD Organization, BreadcrumbList et FAQPage (9) ;
  - les anciens chiffres sont absents du contenu (0 occurrence de chacun) ;
  - le sommaire collant, 2 CTA vers `#demande-demo` et le formulaire sont présents ;
  - 0 lien vers `/packshot-e-commerce` dans `<main>`.
- Sélecteur de langue :
  - les liens pointent vers la même page dans les autres langues, tous en 200 ;
  - clic réel : FR → EN, EN → DE-CH et DE-CH → FR arrivent sur la bonne page.
- Liens internes : 167 liens distincts des trois pages, tous en 200. Deux réponses `000` au premier essai (réseau), 200 au second.
- Fiche XXL : 100x90x190 sur `/fr/studio-photo/alphastudio-xxl-v2`, `/en/studio-photo/alphastudio-xxl-v2` et `/de-ch/fotostudio/alphastudio-xxl-v2`. Même valeur sur le sélecteur et sur `/fr/industrie-defense`.
- Sitemap : les trois URL sont présentes. Les hubs `/fr/industrie/mode-textile` et `/fr/industrie/chaussures` lient toujours `/fr/packshot-mode`.
- `smoke.mjs https://sysnext.vercel.app` : vert, 17 pages, 3 ressources, sitemap à 308 URL.
- Navigateur : trois langues sur six affichages (1440, 1280, 1024 et 768 tactiles, 390 et 360 tactiles).
  - 15/18 sans défaut. Partout : 21 images chargées avec alt, FAQ visible = JSON-LD, aucun débordement, appui tactile sur le CTA intermédiaire → `#demande-demo`.
  - Formulaire non soumis.

**Anomalies observées** —
- Erreur React #418 (différence entre HTML serveur et rendu client), intermittente, sur 2 affichages sur 18. Re-mesure sur 6 chargements par page : `/fr/packshot-mode` 1/6, `/fr/packshot-e-commerce` 1/6, `/fr/studios-photo-automatises` 1/6, `/fr/industrie/mode-textile` 0/6. [Inférence] Non propre à #66 : même fréquence sur des pages que #66 ne modifie pas. Jamais observée sur le build local. Cause non établie.
- 502 ponctuel sur un fichier `/_next/static/chunks/…js` (1 affichage sur 18). Le même fichier répond 200 au contrôle suivant.

**Accès navigateur** — Chromium de l'environnement ne reconnaissait pas l'autorité du proxy sortant (`ERR_CERT_AUTHORITY_INVALID`). Les contrôles navigateur ont été faits avec `--ignore-certificate-errors-spki-list` limité à l'empreinte de cette seule autorité (`/root/.ccr/agent-proxy-ca.crt`). La vérification TLS n'a pas été désactivée.

**Supposé** — Le courriel à Sébastien et la soumission des trois URL dans Google Search Console ont été faits par Laurent, selon son message du 01/10. Non vérifiable d'ici.

**Non regardé** — `www.packshot-creator.com` (R4 : Worker et WAF compris) ; Firefox et Safari ; lecteur d'écran réel ; performance (LCP, CLS) en production.

**Suite** —
- Laurent, dans Chrome sur `www`, les trois pages, desktop puis mobile :
  - nouveau contenu ;
  - sélecteur de langue ;
  - sommaire collant ;
  - CTA vers le formulaire, sans l'envoyer ;
  - fiche XXL `/fr/studio-photo/alphastudio-xxl-v2`.
- Erreur React #418 : à instruire hors de ce chantier.
- Mesure GSC à J+28 (29/10) et J+56 (26/11).
- Hors périmètre : chiffres non sourcés du hub mode-textile ; PR distincte recommandée.

---

## 2026-10-01 · Mode — finalisation de la PR #66 : retours de Sébastien, finitions, maillage, EN et de-ch · Claude de Laurent

**Chantier** : substitution de page, extension à Mode (D39) | **PR** : #66, brouillon, prête pour le GO de fusion de Laurent, non fusionnée | **Base** : `9f67351` (fusion de `main` après #73)

**Retours de Sébastien du 01/10 (relayés par Laurent, tenus pour acquis)** —
- Sommaire collant desktop : validé.
- Droits des photos Orbitvu montrant des personnes : confirmés. Couvre les six visuels de la liste transmise : tuile « porté » du hero, opératrice XL G2, `alphastudio-xxl/hero.avif`, `fashion-studio/hero.avif`, vignettes `machines/alphastudio-xxl.avif` et `machines/fashion-studio.avif`. Remplacements préparés le 01/10 : non appliqués, sans objet.
- Alphastudio XXL : profondeur 90 cm. Le constat « profondeur 70 ou 90 cm : NON ÉTABLI PAR LA SOURCE » de l'entrée précédente est levé : 100 × 90 × 190 cm (l, w, h de `dimensionsMax`).
- Illustrations synthétiques V1 à V5 : publiables, remplaçables plus tard par des photos réelles. Aucune régénération.
- Ligne « Balle chez Sébastien » Mode levée dans ETAT. Aucune nouvelle question posée à Sébastien.

**Quoi** —
- XXL : `tailleMax` et `dimensionsMax` 100 × 70 × 190 → 100 × 90 × 190 cm dans `components/machine-selector/lib/machines.ts` et `components/calculators/ROICalculator/lib/machines.ts` ; FAQ de la fiche XXL (FR, EN, de-ch) ; `industrieDefense.faq.q7.answer` dans les trois fichiers de messages. La landing citait déjà 190 × 90 × 100 cm selon la fiche Orbitvu : inchangée.
- Finition FR :
  - Tableau des studios : cartes sous 1024 px (`lg`) au lieu de 768 px (`md`). De 768 à 970 px, la 4e colonne était coupée par le cadre (tableau de 808 à 923 px pour 718 px de cadre).
  - Section collection : la capture du logiciel (`soft-templates.avif`, clairsemée à l'écran) est remplacée par une série réelle de trois packshots Alphatable déjà présents dans le dépôt (robe, sweat, combishort ; même fond, même cadrage), avec des alt dédiés.
- Liens retirés de la page :
  - `/fr/packshot-amazon`, qui affiche « 500 + » et « - 80 % » ;
  - `/fr/blog/prestataire-packshot-vs-studio-interne`, qui affiche « 3 secondes par packshot » et « 300 photos par jour ».
  Clé `plateformes.lienAmazon` supprimée ; `interne.liens` ne garde que le calculateur.
- `MoneyPageResources` (`data/content-maillage.ts`, entrée `packshot-mode`) :
  - Retirés : l'article flat lay (Alphadesk, « 250 produits/jour ») et le cas Promod (ancien PackshotSpin, sans EN).
  - Ajoutés : trois guides accessoires (lunettes, réglages bijoux, position de la montre). Le guide chaussures était déjà lié dans le texte.
  - Rendu : 3 cartes en FR et EN, 2 en de-ch (seuls les guides bijoux et montre existent en de-ch).
- EN et de-ch :
  - Blocs `packshotMode` intégraux remplacent les anciens. Ils sont traduits du FR validé (D38). Clés et balises riches identiques au FR ; 262 messages ICU compilés par langue.
  - `app/[lang]/packshot-mode/page.tsx` sert `PackshotMode` dans les trois langues. Les métadonnées viennent du bloc de chaque langue : title, description, canonical propre, hreflang via `buildLanguages`, `og:locale` fr_FR / en_US / de_CH, Twitter.
  - Sources de la page localisées : libellés traduits, Google en `hl=en` / `hl=de`, Amazon sur la page amazon.fr signalée comme telle.
  - Liens de guides EN corrigés : couleurs, chaussures.
- de-ch, adaptation suisse :
  - Lexique : « verrechnet », « allfällige », dates en 28.09.2026, pas de ß, guillemets « ».
  - OPCO et Qualiopi présentés comme dispositifs français (D38) ; leasing par des établissements suisses.
  - Langue des liens signalée : « (auf Englisch) » sur les trois guides servis en EN ; « (auf Französisch) » sur les formations.

**Maillage** — Sortant, dans le contenu de la page :
- les 13 fiches studio et le sélecteur, par le tableau des studios, inchangé ;
- `/fr/academy`, carte « Formation des équipes — Sysnext », conforme à #71 ;
- le calculateur ROI ;
- l'IA photo produit ;
- les guides couleurs, chaussures et collection homogène ;
- les trois guides accessoires.

Le hub `/fr/industrie/mode-textile` n'est pas lié (chiffres non sourcés : -80 %, 50-100 vêtements par jour, « 400 SKUs ») ; il lie déjà la landing par `SECTOR_PACKSHOT_MAP`. Canoniques et routage de la landing et du hub inchangés (D39). Gel F5 : 0 lien vers `/packshot-e-commerce` dans `<main>` ; le seul lien de la page vient du gabarit global, déjà présent sur toutes les pages. Aucun lien entrant ajouté depuis d'autres pages.

**Fichiers** — `components/landings/PackshotMode.tsx`, `app/[lang]/packshot-mode/page.tsx`, `messages/fr.json` (bloc `packshotMode` ; `industrieDefense.faq.q7.answer`), `messages/en.json` et `messages/de-ch.json` (bloc `packshotMode` remplacé ; `industrieDefense.faq.q7.answer`), `data/content-maillage.ts` (entrée `packshot-mode`), `components/machine-selector/lib/machines.ts`, `components/calculators/ROICalculator/lib/machines.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Rayon d'action** —
- XXL : `machines.ts` est lu par la fiche `/studio-photo/alphastudio-xxl-v2` (FR, EN, `/de-ch/fotostudio/…` : statistiques, FAQ visible et JSON-LD), le sélecteur, le moteur et l'assistant ROI, `/solutions/[slug]` et `/industrie-defense`.
- Comportements :
  - Moteur et assistant ROI (`checkDimensionsFit`, dimensions triées) : un produit dont la plus petite dimension est comprise entre 71 et 90 cm, les deux autres tenant dans 190 et 100 cm, devient compatible avec la XXL.
  - Sélecteur `/studio-photo/selecteur-machines` : il filtre par `tailleCategories`, inchangées ; seul le texte `tailleMax` affiché change.
- `content-maillage.ts` : seule l'entrée `packshot-mode` change.
- EN et de-ch : seule la page `/en/packshot-mode` et `/de-ch/packshot-mode` change de gabarit ; `PackshotLandingTemplate` n'est pas modifié.

**Vérifié** —
- Contrôles statiques : `tsc`, eslint 0, `verifier-json`, Vitest 373/373, `next build` 371 pages. Build local servi par `next start`.
- QA FR, EN et de-ch sur six affichages (1440, 1280, 1024 et 768 tactile, 390 et 360 tactile) : 18/18 sans défaut.
  - Pages : statut 200, 1 H1, canonical propre, 5 hreflang, `og:locale` attendu, JSON-LD Organization, BreadcrumbList et FAQPage, FAQ 9 = JSON-LD 9 (texte identique).
  - Contenu : 21 images chargées, toutes avec alt, aucune clé brute, aucune ancre cassée, aucun débordement horizontal.
  - Erreurs : aucune erreur console, aucune réponse 4xx.
  - Sommaire collant affiché à partir de 1024 px. Appui tactile sur le CTA intermédiaire → `#demande-demo`. Formulaire présent, non soumis.
- Tableaux à 768, 820, 900, 1024, 1280 px, trois langues : aucun dépassement du cadre ; studios en cartes sous 1024, en tableau au-delà.
- Sommaire collant à 1024, 1280, 1440 px, trois langues, dix sections : barre visible, section active signalée, aucun dépassement (libellé actif le plus long : 889 px pour 1360 px de cadre, EN).
- Liens : 167 liens internes distincts des trois pages, tous en 200.
- XXL : 100x90x190 rendu sur la fiche XXL (FR, EN, de-ch), le sélecteur et `/fr/industrie-defense` ; aucune occurrence 100 × 70 × 190 restante dans le code et les messages.
- axe-core à 1440 et 390 px, trois langues : aucune violation dans `<main>`. 57 nœuds `color-contrast` hors `<main>` (gabarit global, préexistants).

Le résultat des specs Playwright est reporté dans la PR.

**Supposé** — Les retours de Sébastien sont relayés par Laurent dans la consigne du 01/10, tenus pour acquis comme demandé. La profondeur de 90 cm repose sur ce retour et sur la fiche Orbitvu relevée le 28/09 ; aucune fiche archivée dans le dépôt.

**Non regardé** —
- Preview réelle (Vercel Authentication, 302 vers SSO) : contrôle visuel dans Chrome à faire par Laurent.
- `www` (R4).
- Firefox et Safari.
- Lecteur d'écran réel.
- `de-ch.json` porte `industrieDefense` en français (préexistant, seule la dimension a changé).
- Pages liées avant ce chantier et qui portent des chiffres non sourcés : `/fr/studios-photo-automatises` (« 500+ ») ; cadences « produits par jour » des fiches.

**Suite** — GO de fusion de Laurent après contrôle visuel des Previews. Après fusion : smoke `sysnext.vercel.app` FR, EN, de-ch, contrôle Chrome sur `www`, entrée au JOURNAL ; le chantier n'est pas terminé avant. Hors périmètre, PR distincte recommandée : nettoyage des chiffres du hub `/fr/industrie/mode-textile`, puis lien réciproque hub → landing déjà en place, landing → hub à ajouter.

---

## 2026-10-01 · D42 arbitrée, D43 (appels payants), Q19, états de #72 et #74 corrigés · Claude de Laurent

**Chantier** : gouvernance | **PR** : #76, brouillon, non fusionnée, branche `claude/vibrant-dijkstra-8g0ae5` | **Base** : `main` `17fc0b3`

**Quoi** —
- Les six arbitrages de Laurent du 01/10 sont intégrés à D42 ; le texte d'origine reste cité sans modification.
- D43 remplace le seuil de 2 $ par exécution de D26 et la ligne « Pas d'appel payant sans GO préalable » de D42 : autorisation-cadre de 20 USD cumulés par mission. Les deux consignes antérieures restent écrites, marquées comme remplacées.
- Q19 transmet D42 et D43 au Claude de Sébastien.
- Les états périmés de #72 et #74 dans `ETAT.md` sont corrigés.

**Pourquoi** — GO de Laurent du 01/10 sur les six points relevés dans l'entrée ci-dessous. Consigne : trace historique claire, sans deux consignes contradictoires en vigueur.

**Fichiers** — `docs/seo-geo/DECISIONS.md` (D43 créée ; D42 complétée ; lignes « Statut » de D12 et D26 annotées, corps inchangé), `docs/seo-geo/BOITE-AUX-LETTRES.md` (Q19), `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Aucun effet sur le site : documentation seule.

**Vérifié** —
- Bloc cité de D42 identique, caractère pour caractère, à celui de la tête `59861e9`. Dans `DECISIONS.md`, hors D42 et D43, seules les lignes « Statut » de D12 et D26 changent.
- Numérotation : aucune D43 ni Q19 sur `main` ni sur les branches distantes au 01/10. Q16 à Q18 jamais déposées (`ETAT.md`).
- #72 fusionnée le 01/10 à 09:02:01 UTC, commit de fusion `a6760da` ; #74 à 10:29:43 UTC, `8365c73` (`git log` de `main`).
- `sysnext.vercel.app`, le 01/10 vers 11:36 UTC :
  - `smoke.mjs` vert, 17 pages et 3 ressources ;
  - 3 articles (`/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots`, `/en/blog/packshot-photography-guide-why-make-product-packshots`, `/de-ch/blog/leitfaden-packshot-fotografie-warum-packshots-machen`) : un seul H1 sans élément enfant, au titre seul, précédé d'un `nav` étiqueté ; `BreadcrumbList` à 3 éléments, PackshotCreator, Blog, l'article ;
  - `/fr` et ces 3 articles : aucune référence Google Fonts ; un seul fichier de police référencé, `Inter_Bold_subset.p.f8804717.woff2`, servi en 34 200 o, taille égale à `app/fonts/inter/Inter-Bold-subset.woff2`.
- `npx tsc --noEmit` vert ; `verifier-json` : 180 JSON valides ; Vitest : 373 tests sur 373, 18 fichiers.
- `npx next build` vert, variables factices. Tailwind analyse aussi les `.md` de `docs/` (constat consigné dans #75, non fusionnée) : la CSS compilée de la branche, texte final de cette entrée compris, est comparée à celle de `main` `17fc0b3`, construit à part. 3 feuilles, mêmes noms et mêmes empreintes MD5 : identiques.
- Appels payants de cette mission (D43) : aucun, 0 USD.

**Supposé** — Rien.

**Non regardé** —
- `www` dans Chrome (R4), pour #72 comme pour #74 : lignes de « Balle chez Laurent ».
- #65, #66 et les articles AI Act : non modifiés, par consigne.
- Playwright : non lancé, aucun fichier du site modifié.
- #75 corrige aussi l'état de #74 dans `ETAT.md`, avec un autre texte : conflit à résoudre à la fusion de la seconde des deux PR.

**Suite** —
- Laurent : les deux points non tranchés de D43 (budget de 20 $ par trimestre de D26 ; définition d'une mission).
- #65 : harmoniser D40 et `08-PREVIEW-VALIDATION.md` avec l'arbitrage 4 avant sa fusion.
- Q19 : réponse du Claude de Sébastien.
- Positionner chaque PR ouverte de contenu dans le circuit de D42.

---

## 2026-10-01 · D42 — standard éditorial PackshotCreator consigné · Claude de Laurent

**Chantier** : gouvernance | **PR** : brouillon, branche `claude/vibrant-dijkstra-8g0ae5` | **Base** : `main` `17fc0b3`

**Quoi** — Décision de gouvernance de Laurent du 01/10 consignée en D42 : texte reproduit sans modification, circuit en huit étapes, exigence non négociable. Six points d'articulation avec D12, D15, D16, D26, D37, D40 et le périmètre des deux Claude relevés, non tranchés.

**Pourquoi** — Consigne de Laurent du 01/10. Aucun motif n'accompagne le texte.

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Aucun effet sur le site : documentation seule. D42 s'applique aux PR ouvertes touchant un contenu éditorial.

**Vérifié** —
- Numérotation : D39 (#66) et D40 (#65) réservées sur branches, D41 sur `main` ; aucune D42 ni au-delà sur les branches distantes au 01/10.
- PR ouvertes au 01/10, fichiers hors `docs/seo-geo/` relevés par `git diff` depuis la base commune avec `main` :
  - touchant `content/**`, `messages/**` ou un composant de landing : #27, #59, #60, #64, #66, #70 ;
  - sans fichier de contenu : #65, #67, #75.
- #71 (Academy, Claude de Sébastien) et #72 (Inter) ne sont plus ouvertes : fusionnées dans `main` (`8ec89c1`, `a6760da`).

**Supposé** — Rien.

**Non regardé** —
- L'étape du circuit atteinte par chaque PR ouverte : non établie.
- `02-PROCEDURE.md`, `README.md` et `/CLAUDE.md` ne sont pas modifiés. #65 modifie déjà `02-PROCEDURE.md` et `README.md`.
- `npx next build` non lancé : aucun fichier du site n'est modifié.

**Suite** —
- Réponses de Laurent aux six points d'articulation de D42 (`ETAT.md`, « Balle chez Laurent »).
- Positionner chaque PR ouverte de contenu dans le circuit.
- Harmoniser D40 (#65) avec l'étape 4 de D42, qui ajoute la tablette.

---

## 2026-10-01 · UB-04 / #74 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : audit Ubersuggest, plan du 01/10, lot 1, action A1 (UB-04) | **PR** : #74, fusionnée sur GO de Laurent | **Commit de fusion** : `8365c73` (`main`), le 01/10/2026 à 10:29:43 UTC | **Tête fusionnée** : `d51f69c` | **Base avant fusion** : `a6760da` (#72)

**Quoi** — Fusion de #74 sur GO de Laurent, limité à la tête `d51f69c`, après ces contrôles :
- tête `d51f69c` inchangée, `main` en `a6760da` ;
- 4 checks verts : types et build, journal, conséquences, Vercel ;
- aucun conflit (`git merge-tree`), PR fusionnable ;
- la CI de #74 avait tourné avant l'arrivée de #72 sur `main`. La fusion `d51f69c` + `a6760da` a donc été reconstruite en local : `tsc` vert, 180 JSON valides, `next build` vert ; sur un article FR, EN et de-ch, un seul `<h1>` sans enfant, précédé du repère `nav` étiqueté.

La PR est sortie du brouillon puis fusionnée par commit de fusion ; branche conservée. Aucune autre modification de code. #70, #64, #66 et les autres PR non touchées.

**Vérifié** —
- `main` = `8365c73`, parents `a6760da` et `d51f69c` ; arbre identique à celui de la fusion reconstruite et contrôlée en local.
- `sysnext.vercel.app` sert le nouveau build à partir de 10:31:01 UTC : première observation du repère `nav` étiqueté, relevé toutes les 20 s.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 10:31:07 UTC : vert, 17 pages et 3 ressources (sitemap 308 URL, robots.txt, llms.txt). #74 ne touche ni le sitemap ni le contenu.
- 3 articles relevés avant fusion (10:29:20 UTC) puis après (10:31:27-35 UTC), tous en 200 : `/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots`, `/en/blog/packshot-photography-guide-why-make-product-packshots`, `/de-ch/blog/leitfaden-packshot-fotografie-warum-packshots-machen`.
  - Après : un seul `<h1>`, sans élément enfant, dont le texte est le titre seul : « Packshot : définition, types et bonnes pratiques pour l'e-commerce », « Packshot — Definition, Types & Best Practices for E-commerce », « Packshot: Definition, Arten und Best Practices für den E-Commerce ».
  - Avant : le texte du H1 commençait par « Accueil/Blog/E-commerce », « Home/Blog/E-commerce », « Startseite/Blog/E-commerce », avec 6 éléments enfants.
  - Après : l'élément qui précède le `<h1>` est un `nav` étiqueté « Fil d'Ariane », « Breadcrumb », « Brotkrümelnavigation » : 2 liens (accueil et blog de la locale), la catégorie en texte, séparateurs `aria-hidden`.
  - `BreadcrumbList` JSON-LD identique avant et après sur les 3 : PackshotCreator, Blog, l'article.
- HTML servi pour ces 3 articles identique, identifiant de build et scripts neutralisés, à celui de la fusion construite en local.
- CSS servie : `fe8d9e9a43b4d4ca.css`, identique octet pour octet à celle de la fusion construite en local.
- Écart de CSS avec la feuille servie avant fusion (`00c919af44f29472.css`) : une seule déclaration ajoutée au thème, la variable de police « sans », qui renvoie à Geist, non chargée. Elle n'a aucun consommateur : 0 référence `var()` à cette variable dans les CSS, JS et HTML du build ; l'utilitaire `font-sans` compile vers la variable Geist, avant comme après. Une propriété personnalisée sans consommateur ne modifie aucune valeur calculée : rendu inchangé.
- Cause de cet écart : l'entrée UB-04 ci-dessous cite le nom de cette variable en toutes lettres, et Tailwind analyse aussi les `.md` de `docs/`. Scanner de Tailwind (`@tailwindcss/oxide`) : le candidat est extrait de `JOURNAL.md` à `8365c73` ; il ne l'est ni de `JOURNAL.md` à `a6760da`, ni du même fichier une fois ce nom reformulé. La parité CSS annoncée dans #74 (« CSS compilée identique », `00c919af44f29472.css`) ne vaut donc pas pour la tête fusionnée : les pages du site référencent la nouvelle feuille.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`, comme pour les PR précédentes. Cela repose sur des schémas observés.

**Non regardé** —
- `www` dans Chrome (R4). Une requête de script sur l'article FR a reçu 403 à 10:31:49 UTC, sans valeur de preuve.
- Les 122 autres articles du gabarit, un par un, en production : contrôlés sur le build local seulement.
- Firefox, Safari, appareils réels ; GSC.

**Suite** —
- Laurent, dans Chrome sur `www` : les 3 articles ci-dessus. Attendu : titre seul dans le H1, fil d'Ariane au-dessus, rendu inchangé ; dans la source, `nav` étiqueté juste avant `<h1>`.
- Hors périmètre, inchangé : `comparatif-orbitvu-ortery-styleshoots-2026` et `prestataire-packshot-vs-studio-interne` (FR et EN, 4 pages) portent toujours le fil dans leur `<h1>` : PR distincte.
- Libellé du repère à migrer vers `messages/*.json` après #64 et #66.
- Proposition, non appliquée : inscrire dans `03-PIEGES.md` que Tailwind analyse les `.md` de `docs/`, et qu'un nom de variable ou de classe CSS cité dans le journal peut modifier la CSS de production. La variable ajoutée est sans effet ; l'entrée UB-04 n'est pas retouchée (on n'efface jamais).

---

## 2026-10-01 · Mode — sommaire collant desktop, formation harmonisée sur #71, dimensions XXL et droits des visuels · Claude de Laurent

**Chantier** : substitution de page, extension à Mode (D39) | **PR** : #66, brouillon, NE PAS FUSIONNER | **Base** : `bac1b18` (contre-relecture ChatGPT du texte intégral terminée, structure et texte validés)

**Quoi** —
- Sommaire collant, desktop seulement (lg et plus) : barre fixe sous l'en-tête du site (`components/landings/SommaireCollant.tsx`, nouveau, client). Elle apparaît quand le sommaire de la page (`#sommaire`) est sorti de l'écran et disparaît après la FAQ. Dix ancres numérotées (mêmes cibles et libellés que `#sommaire`), section en cours signalée par son libellé, un soulignement et `aria-current="location"` ; les autres libellés en `sr-only`, affichés en infobulle au survol et au focus. Nom accessible distinct (« Accès rapide aux sections », clé `sommaire.barre`) : axe signalait deux repères « Sommaire » (`landmark-unique`). Mobile et tablette : sommaire de la page inchangé, non collant.
- Barre latérale façon blog écartée : le blog place un `aside` de 256 px à 48 px du texte (`lg:gap-12`) ; à 1440 px, le contenu passerait de 1232 à 928 px, tableaux et illustrations compris (-25 %), et la FAQ a déjà sa colonne collante (`lg:top-32`). Le composant partagé `components/blog/TableOfContents.tsx` n'est pas réutilisé : boutons sans `aria-expanded`, sans changement d'adresse, mise en page de colonne étroite ; le modifier toucherait tous les articles.
- Formation : « La formation est facturée séparément du studio ; en France, une prise en charge par votre OPCO est possible selon votre situation. » devient « La formation est facturée séparément du studio. Financement OPCO possible selon votre situation. » (formulation de #71, `academy.hero.description`, `fc6c9c6`). Carte finale : titre « Academy » devenu « Formation des équipes — Sysnext », cible `/fr/academy` inchangée, description inchangée.

**Dimensions XXL** — Sources disponibles dans le dépôt : (1) fiche orbitvu.com relevée le 28/09 pour F5, consignée ici et dans `packshotEcommerce` : 190 × 90 × 100 cm, 100 kg, axes non précisés par Orbitvu, version non précisée dans le relevé ; la fiche elle-même n'est pas archivée dans le dépôt ; (2) `sessions/research/orbitvu-specs.md` (collecte du 22/03/2026, sources mêlées orbitvu.com et pages PSC) : « Produits jusqu'a 190 cm de haut, 100 cm de large », sans profondeur, et un tableau à 100x70x190 cm identique à celui du Compact Pro v2, déjà contredit par Orbitvu (80 × 70 × 130 cm) ; (3) `machines.ts` : « Alphastudio XXL Pro v2 », `dimensionsMax` l 100, w 70, h 190, sans source primaire tracée. Hauteur 190 et largeur 100 : concordantes [Inférence : à partir du corpus secondaire]. Profondeur 70 ou 90 cm : NON ÉTABLI PAR LA SOURCE. Version visée par la fiche Orbitvu (XXL ou XXL Pro v2) : NON ÉTABLI PAR LA SOURCE. Aucune valeur harmonisée ; la landing garde la valeur Orbitvu et sa mention « axes non précisés ».

**Droits des visuels** — Revue des visuels réels de la page : outre les quatre photos déjà signalées (tuile « porté » du hero, opératrice XL G2, `alphastudio-xxl/hero.avif`, `fashion-studio/hero.avif`), les vignettes du tableau des studios `machines/alphastudio-xxl.avif` et `machines/fashion-studio.avif` montrent aussi une personne ; elles sont partagées avec les fiches et d'autres pages. Aucun visuel changé avant décision. Remplacements préparés en cas de refus, actifs existants sans personne : opératrice → `alphashot-xl-g2/advantage-open-doors.avif` (1400 × 1004) ; tuile « porté » → `alphatable-alphadesk/packshot-dungarees.avif`, avec légende et alt de la mosaïque à ajuster (« porté » retiré) ; figures XXL et Fashion Studio → aucune vue d'ensemble sans personne dans le dépôt (`alphastudio-xxl/hw-studio.avif` et `fashion-studio/hw-studio.avif` montrent aussi une silhouette) : retrait du bloc de deux figures, le tableau restant ; vignettes du tableau → `alphastudio-xxl/hw-turntable.avif` et `fashion-studio/hw-led.avif` (détails matériels, 439 × 436 et 438 × 436) ou vignette retirée.

**Fichiers** — `components/landings/SommaireCollant.tsx` (nouveau), `components/landings/PackshotMode.tsx` (import et rendu de la barre), `messages/fr.json` (bloc `packshotMode` : `accompagnement.formation.text`, `explore.academy.title`, `sommaire.barre`), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Vérifié** — `verifier-json` (180), `tsc`, eslint sur les 2 fichiers, 261 messages ICU, `next build` (371 pages), `seo.spec` `packshot-mode` 26/26. Build local, 1440, 1280, 1024 et 390 px : barre masquée en haut de page et au retour sur `#sommaire`, visible de la section 1 à la FAQ, masquée au formulaire ; bord haut à 65 px = bas de l'en-tête (aucun chevauchement), bas à 114 px, sous la colonne collante de la FAQ (128 px) ; section active correcte (05 au milieu de « Le studio et l'équipe », 08 après Entrée sur « 08 », 10 dans la FAQ) ; clavier : Tab de 07 à 08, anneau de focus visible, Entrée → `#studios`, titre H2 à 248 px ; 10 cibles existantes ; illustrations et tableaux à 1230 px (1440, 1280), 974 px (1024), 356 px (390) : inchangés ; aucun débordement, aucune erreur console ; 390 px : barre non rendue, sommaire de la page en position statique. axe-core (1440, barre visible) : aucune violation dans la barre ; `color-contrast` : 57 nœuds, tous hors `<main>` (pied de page). CTA intermédiaire inchangé (y = 14 626 à 390 px, clic → `#demande-demo`). Title (61), meta (146), H1 unique, canonical, 5 hreflang, FAQ visible = FAQPage (9/9).
**Supposé** — Aucun.
**Non regardé** — Preview (SSO) ; `www` (R4) ; Firefox et Safari ; lecteur d'écran réel (seul l'arbre d'accessibilité et axe ont été contrôlés).

**Suite** — Sébastien : droits des six visuels avec personnes. Puis décision de fusion par Laurent.

---

## 2026-10-01 · Mode — corrections après contre-relecture ChatGPT + Chrome (retours d'expérience, CTA, Fashion Studio) · Claude de Laurent

**Chantier** : substitution de page, extension à Mode (D39) | **PR** : #66, brouillon, NE PAS FUSIONNER | **Base** : `f1c2da0`, puis `main` `a6760da` (#72) fusionnée

**Quoi** — Corrections ciblées demandées par Laurent après le contrôle Chrome de la Preview (MODE_CHROME_EDITORIAL_QA = PARTIAL) :
- Quatre affirmations d'expérience directe non établies, reformulées en conseils de contrôle, sans test, résultat, préférence client ni témoignage : `matiere.recolo.texte` (« Chez PackshotCreator, nous l'avons vue utilisée ainsi… », « Les clients que nous accompagnons préfèrent en général… »), `interne.raisons.volume.texte` (« D'expérience, PackshotCreator constate… »), `ia.essais.titre` et `ia.essais.texte` (« Ce que nous avons observé », « PackshotCreator a testé… »), `faq.q5.answer` et `faq.q6.answer` (mêmes affirmations).
- Fashion Studio : « dans une organisation proche d'un plateau photo (traditionnel) » n'apparaît pas dans le corpus (`sessions/research/orbitvu-specs.md`, `machines.ts`) ; remplacé par « sur un espace scénique dédié », présent pour la version Pro v2 (« Espace scénique 3×3m ») et la version Basic (« dans un espace scénique »). `studios.rows.fashion.usage` et `faq.q3.answer`.
- Un seul CTA intermédiaire « Demander une démonstration », vers le formulaire existant (`#demande-demo`), en fin de section « Ce que fait le studio, ce que fait l'équipe » : en 390 px, le bouton du hero (y = 782) et le formulaire (y = 25 731) étaient séparés de ~24 900 px ; le nouveau CTA (y = 14 626) coupe cet écart en deux. Aucun formulaire, popup, bandeau fixe ni CTA calculateur ajouté. Clés `auStudio.demo.texte` et `auStudio.demo.cta`.
- Fusion de `main` `a6760da` (#72, Inter auto-hébergée) : conflits limités à `JOURNAL.md` et `ETAT.md`, les deux côtés conservés. Tous les caractères du bloc `packshotMode` sont couverts par l'`unicode-range` du sous-ensemble Inter.

**Images (constat, aucune modification)** — Les « 536 px » relevés dans Chrome sont le `naturalWidth` calculé par le navigateur : en 1440 px et DPR 2, `sizes` (1232 px) fait choisir le candidat 3840w ; `/_next/image` n'agrandit pas et renvoie le fichier source de 1672 × 941 px ; Chrome divise par la densité du descripteur (3840 / 1232) : 1672 × 1232 / 3840 = 536. Même octets pour w=1920 et w=3840 (51 852 o pour V1). Effet réel : sur écran DPR 2, V1 à V5 sont affichées à 1230 px CSS à partir de 1672 px de pixels (agrandissement ×1,47) ; limite de la source, non corrigible sans régénération (exclue). Chargement différé : V1 à V5 se chargent à l'approche, toutes chargées après défilement sur 7 affichages (1440, 1280, 1024, 768, 390 ; DPR 1 à 3). Une capture d'élément prise sans défilement préalable montre V4 vide : artefact de capture, l'image se charge une fois atteinte. Logos : bandeau propre à la page (comme F5), 9 logos nommés, 9 doublons `alt=""` et `aria-hidden="true"`, arbre d'accessibilité à 9 images : aucun défaut ; les logos hors écran horizontalement se chargent quand le défilement les amène (18/18 en 18 s à 390 px). `ClientLogos.tsx` (partagé) n'est pas utilisé par la page et n'est pas touché.

**Dimensions XXL (constat)** — Pas de contradiction de nature : `machines.ts` (100 × 70 × 190 cm) et la fiche Orbitvu relevée le 28/09 (190 × 90 × 100 cm) sont toutes deux des tailles maximales de produit ; l'encombrement de la machine est 277 × 190 × 273 cm (corpus, FAQ de la fiche). [Inférence] Si 190 est la hauteur et 100 la largeur (corpus : « jusqu'à 190 cm de haut, 100 cm de large »), l'écart porte sur la profondeur : 70 cm contre 90 cm. La landing suit la fiche Orbitvu ; l'alignement de `machines.ts` reste hors périmètre (écart n° 3 du 28/09).

**Fichiers** — `messages/fr.json` (bloc `packshotMode` seul, JSON identique hors du bloc), `components/landings/PackshotMode.tsx` (bloc CTA), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Vérifié** — `verifier-json` (180), `tsc`, eslint, 260 messages ICU compilés, Vitest 373/373, `next build` (371 pages) ; sur le build local : `seo.spec` `packshot-mode` 26/26, `smoke.mjs` vert (sitemap 308 URL) ; 1440 et 390 px : 1 H1, aucun débordement de page, aucune erreur console, aucune réponse 4xx, aucune ancre cassée, FAQ visible = FAQPage (9/9), title (61), meta (146), canonical et 5 hreflang inchangés ; clic du nouveau CTA : `#demande-demo` en haut de l'écran ; chaînes retirées (« Chez PackshotCreator », « D'expérience », « nous avons observé », « a testé », « essais menés », « clients que nous accompagnons », « plateau photo traditionnel ») : 0 dans le texte visible, le `<head>` et le JSON-LD.
**Supposé** — Aucun.
**Non regardé** — Preview (SSO) avant le push ; `www` (R4) ; EN et de-ch (D38) ; droits des photos Orbitvu avec personnes (question à Sébastien).

**Suite** — Contre-relecture ChatGPT du texte intégral, puis transmission à Sébastien (un seul point : droits des photos).

---

## 2026-10-01 · Mode — contrôle final avant transmission à Sébastien, trois micro-corrections · Claude de Laurent

**Chantier** : substitution de page, extension à Mode (D39) | **PR** : #66, brouillon, NE PAS FUSIONNER | **Base contrôlée** : `798116e`

**Quoi** — Relecture éditoriale, factuelle, visuelle et SEO de `/fr/packshot-mode` sur le build local de `798116e`. Trois micro-corrections :
- `accompagnement.formation.text` : ajout de « La formation est facturée séparément du studio ; » avant la phrase OPCO. Source : `blogBudget.financing.f2` (#71, Sébastien) : « La formation, facturée séparément du studio, peut être financée par votre OPCO selon votre situation. »
- Alphashot XL G2, limite du tableau des studios : « Ne reçoit ni mannequin ni modèle : réservé aux accessoires et aux objets » devient « Gabarit d'accessoires et d'objets : pas de mannequin taille réelle ni de modèle » ; FAQ q3 : « sont réservés aux accessoires et aux objets » devient « sont dimensionnés pour les accessoires et les objets, pas pour un mannequin taille réelle ni un modèle ». Source : gabarit Orbitvu 60 × 40 × 70 cm (relevé F5). Raison : l'absolu « ne reçoit ni mannequin » n'est établi par aucune source pour un buste de petite taille ; l'impossibilité d'un mannequin taille réelle découle des dimensions.
- V5 : fichier renommé `mode-v5-deux-coloris-reels.avif` → `mode-v5-deux-variantes-colorees.avif` (octets identiques). Raison : le nom, exposé dans l'URL de l'image, contredisait la légende « Illustration synthétique de deux variantes colorées ».

**Fichiers** — `messages/fr.json` (bloc `packshotMode`), `components/landings/PackshotMode.tsx` (chemin V5), `public/images/packshot-mode/` (renommage), `docs/seo-geo/JOURNAL.md`.

**Vérifié** — voir la PR #66 (contrôles rejoués après correction). Alphadesk : absente de la page ; `delisted: true` dans `machines.ts` signifie retirée du catalogue PSC (`1cbc569`), pas arrêtée chez Orbitvu ; l'état maître du 30/09 qui la dit active chez Orbitvu n'est pas dans le dépôt [Non vérifié].
**Supposé** — Aucun.
**Non regardé** — Preview (SSO) ; `www` (R4) ; EN et de-ch (D38).

**Suite** — Transmission de la Preview à Sébastien.

---

## 2026-10-01 · AI Act Q2 — paragraphe AI Act des articles « migrer » : référent, délai transitoire, absolu (FR, EN, de-ch) · Claude de Laurent

**Chantier** : cluster AI Act, BL-43-3 (partiel) | **PR** : #77, brouillon, non fusionnée | **Base** : `main` `17fc0b3` | **Commit** : `576d76b` (tête précédente `a0e27a5`)

**Quoi** — Micro-correction validée par Laurent. Elle porte sur le seul paragraphe AI Act des trois articles « migrer », texte seul. Trois imperfections traitées :
- référent de l'exception : elle vise désormais le seul marquage par l'outil, sans exemption générale ;
- délai transitoire : celui de l'article 111(4) est mentionné ;
- absolu : « Elle n'invente rien » et ses équivalents sont retirés.

**Pourquoi** — Points relevés à la livraison de #77 (entrée suivante, rubrique « Non regardé ») et complément de Laurent du 01/10, contrôlé contre le pilier A (#59, tête `f9e772f`) :
- 50(2) : marquage par le fournisseur ;
- 50(4) : mention visible par le déployeur pour les hypertrucages ;
- 111(4) : délai jusqu'au 2 décembre 2026 pour les systèmes mis sur le marché avant le 2 août 2026 ;
- les exceptions (mise en forme standard, modification non substantielle) concernent le seul marquage du fournisseur.

**Fichiers** — `content/blog/fr/migrer-ancien-packshotcreator.json`, `content/blog/en/migrate-legacy-packshotcreator-studio.json`, `content/blog/de-ch/altes-packshotcreator-studio-migrieren.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Changements (FR ; EN et de-ch à l'identique, de-ch avec la nuance territoriale)**

| Imperfection | Avant | Après | Source |
|---|---|---|---|
| Absolu | « Elle n'invente rien. Ce n'est plus un détail… » | « Partir d'une photo réelle n'est plus un détail… » | Consigne de Laurent : neutraliser, garder le message « photo réelle » |
| Temporalité | « …doit désormais porter un marquage lisible par machine, apposé par l'outil qui la produit ; » | « …doit porter un marquage lisible par machine, apposé par l'outil qui la produit ; les outils mis sur le marché avant cette date ont jusqu'au 2 décembre 2026 pour s'y conformer. » | A, calendrier : « Fin du délai de mise en conformité au marquage de l'article 50(2) pour les systèmes mis sur le marché avant le 2 août 2026 (article 111(4), ajouté par le règlement (UE) 2026/1744). » |
| Temporalité, marque | « la marque, elle, ne doit une mention visible que si l'image constitue un hypertrucage. » | « La marque, elle, ne doit une mention visible que si l'image constitue un hypertrucage, et ce délai ne la concerne pas. » | A : « Cette date ne décale pas l'obligation de la marque. » |
| Référent | « …et la retouche studio classique échappent à cette obligation, comme le détaille… » | « Pour les corrections de couleur ou d'exposition et la retouche studio classique, ce marquage par l'outil n'est pas requis tant qu'elles ne modifient pas substantiellement l'image ou son sens, comme le détaille… » | A, 50(2) : le marquage ne s'applique pas si le système « ne modifie pas substantiellement l'image fournie ou son sens » |

Typographie : espaces insécables entre le jour, le mois et l'année des deux dates, dans ce seul paragraphe (convention de A `f9e772f`). Mesure : 0 signe isolé en début de ligne à 390, 820 et 1440 px.

**Contrôle des sources**
- Pilier A, tête `f9e772f` (avant : `a499b5e` ; écart limité à la typographie et à une fusion de `main`), lu sans modification.
- Analyse Orbitvu du 4 septembre 2026, lien du paragraphe, lue le 01/10 :
  - elle classe parmi les retouches exemptées « Color correction, exposure, and white-balance adjustment » et « Normal studio retouching that does not change what the image shows » ;
  - elle place la fin du délai au 2 décembre 2026 pour les systèmes déjà sur le marché, sans report de l'obligation du déployeur ;
  - elle étend l'exemption aux deux obligations : non repris, conformément à la consigne (pas d'exemption générale).
- « Exposition » : absent des exemples de la Commission cités par A. Seule source : Orbitvu, déjà citée par le paragraphe.
- Aucune recherche juridique nouvelle.

**Effet attendu** — Aucun effet SEO : seul le champ `content` change ; title, description, canonical, hreflang et JSON-LD sont identiques à la production.

**Vérifié**
- `verifier-json` 180 valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert, 371 pages ; `verifier-consequences` : effet local.
- `next start` local, Chromium, 390, 820 et 1440 px, 3 pages :
  - 200 ;
  - un seul paragraphe, un `strong`, un lien inchangé (`_blank`, `noopener`) ;
  - formulations attendues présentes, anciennes absentes ;
  - 0 signe isolé en début de ligne ;
  - FAQ visible = `FAQPage` (8, 8, 8) ;
  - un `h1`, 0 débordement, 0 erreur de console ;
  - captures relues.
- En-tête SEO comparé à `sysnext.vercel.app` par `curl` : identique sur les 3 pages (title, description, canonical, 5 hreflang, 4 JSON-LD).
- `smoke.mjs` local vert (17 pages, 3 ressources).
- e2e (5 specs, Chromium) : 307 tests, 283 passés, 24 échecs, liste identique au passage précédent de #77, aucun sur ces pages.

**Supposé** — Rien de plus que l'entrée suivante (24 échecs e2e préexistants).

**Non regardé**
- Preview Vercel (SSO) et `www`.
- Hors du paragraphe, inchangé :
  - « sans rien changer à l'exactitude de ses caractéristiques » (corps) ;
  - FAQ n° 3 : « sans altérer ses caractéristiques » et « Elle ne génère pas de produit fictif » ;
  - lien Orbitvu à la place des lignes directrices de la Commission.
  Ces trois points relèvent de E3 à E6.
- Dans le paragraphe : « Un seul cas limite y est signalé » ; l'analyse Orbitvu cite aussi « other details that were never captured ». Non modifié.

**Suite** — Validation de Sébastien (prose), puis fusion sur GO de Laurent. Lien vers A non ajouté (D38).

---

## 2026-10-01 · AI Act Q2 — deux formulations juridiques corrigées : `generer-images-produit-ia` (FR) et articles « migrer » (FR, EN, de-ch) · Claude de Laurent

**Chantier** : cluster AI Act, BL-43-2 (E1/E2) et BL-43-3 (partiel : phrase « lisible par machine » seule) | **PR** : #77, brouillon, non fusionnée | **Base** : `main` `17fc0b3` (#73 comprise) | **Commit** : `5357bfb`

**Quoi** — Texte seul, deux phrases. `generer-images-produit-ia` : la non-tromperie est rattachée au droit de la consommation, l'AI Act aux obligations de transparence « dans certains cas ». Articles « migrer » : le marquage lisible par machine est attribué à l'outil, la mention visible de la marque limitée aux hypertrucages.

**Pourquoi** — QA finale des articles A (#59) et S (#60) du 01/10 : ces deux phrases divergent du pilier (description de #59, rubrique « Hors périmètre » ; description de #60, question posée à Sébastien). Formulations FR fournies par Laurent le 01/10, appliquées mot pour mot.

**Fichiers** — `content/blog/fr/generer-images-produit-ia.json`, `content/blog/fr/migrer-ancien-packshotcreator.json`, `content/blog/en/migrate-legacy-packshotcreator-studio.json`, `content/blog/de-ch/altes-packshotcreator-studio-migrieren.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Corrections**

| Article | Langue | Emplacement | Avant | Après |
|---|---|---|---|---|
| `generer-images-produit-ia` | FR seul (aucune version EN ni de-ch, absent d'`alternates.json`) | `content`, section FAQ du corps ; `faqs[4]`, FAQ n° 5 (bloc visible et `FAQPage`) | « Le règlement européen sur l'IA impose également que les images ne trompent pas le consommateur sur les caractéristiques réelles du produit. » | « Le droit de la consommation interdit par ailleurs les images qui trompent le consommateur sur les caractéristiques réelles du produit ; le règlement européen sur l'IA ajoute, dans certains cas, des obligations de transparence. » |
| `migrer-ancien-packshotcreator` | FR | `content`, paragraphe « Retenez surtout ceci » | « …doit désormais porter une mention lisible par machine. » | « …doit désormais porter un marquage lisible par machine, apposé par l'outil qui la produit ; la marque, elle, ne doit une mention visible que si l'image constitue un hypertrucage. » |
| `migrate-legacy-packshotcreator-studio` | EN | `content`, même paragraphe | « …must now carry a machine-readable label. » | « …must now carry a machine-readable marking, applied by the tool that produces it; the brand, for its part, owes a visible disclosure only if the image constitutes a deep fake. » |
| `altes-packshotcreator-studio-migrieren` | de-ch | `content`, même paragraphe | « …muss nun eine maschinenlesbare Kennzeichnung tragen. » | « …muss nun eine maschinenlesbare Kennzeichnung tragen, die das erzeugende Werkzeug anbringt; die Marke selbst muss einen sichtbaren Hinweis nur anbringen, wenn das Bild ein Deepfake ist und die Verordnung für sie gilt. » |

**Choix de traduction et d'adaptation**
- EN : traduit de la version FR corrigée (D38). « label » → « marking » : « label » se lit comme une étiquette visible. « deep fake » et « constitutes » : termes de la version anglaise du règlement (art. 3(60) et 50(4)), relevés de mémoire ; EUR-Lex non consultable par script le 01/10 (page vide) : [Non vérifié].
- de-ch : D38, périmètre suisse. « und die Verordnung für sie gilt » ne présume pas l'application de l'AI Act à une marque suisse ; S (#60) la fait dépendre du rôle et de la diffusion dans l'Union. Aucune règle suisse ajoutée. « Kennzeichnung » conservé : qualifié de « maschinenlesbar » et opposé à « sichtbarer Hinweis ». « Deepfake » : terme de la version allemande du règlement, relevé de mémoire : [Non vérifié].
- Base juridique, pilier A (#59, tête `a499b5e`, lecture seule) : « Le marquage lisible par machine de l'article 50(2) incombe au fournisseur de l'outil, pas à la marque qui l'utilise » ; « La marque, en tant que déployeur, doit une mention visible au titre de l'article 50(4) lorsque l'image est un hypertrucage » ; « Il ne remplace pas le droit de la consommation ». Aucune règle absente de A ou de S ajoutée.

**Effet attendu** — Aucun effet SEO mesurable attendu : correction de fond sur des pages existantes, sans changement d'URL, de title, de description ni de structure.

**Vérifié**
- `main` `17fc0b3` contient la fusion de #73 ; formulations présentes avant modification (2 occurrences FR pour `generer-images-produit-ia`, 1 par langue pour « migrer »).
- La FAQ des articles « migrer » ne contient pas la phrase corrigée (8 FAQ inchangées dans les 3 langues).
- `verifier-json` : 180 JSON valides ; `tsc` vert ; Vitest 373/373 ; `next build` vert, 371 pages (variables factices) ; `verifier-consequences` : « Effet local — 4 fichier(s), rien qui déborde ».
- `next start` local, Chromium, 390 et 1440 px, 4 pages : 200 ; nouveau texte présent (2 fois pour `generer-images-produit-ia`, 1 fois ailleurs), ancien absent du texte et du JSON-LD ; FAQ visible = `FAQPage` à l'identique, question par question (5 et 8, 8, 8) ; un seul `h1` ; 0 débordement ; 0 erreur de console ; capture du paragraphe modifié relue.
- `smoke.mjs` local : vert, 17 pages, 3 ressources.
- e2e (`seo`, `internal-links-all`, `anchors`, `responsive`, `mobile-overflow`, Chromium, serveur local) : 307 tests, 283 passés, 24 échecs, même nombre et mêmes catégories que la liste préexistante relevée par #59 sur `main` `8ec89c1` ; aucun ne porte sur les 4 pages modifiées.
- #59 (`a499b5e`) et #60 (`a9df51d`) : lues, non modifiées.

**Supposé** — Les 24 échecs e2e sont ceux de `main` : comparaison faite avec la liste publiée par #59, sans build de `main` `17fc0b3` dans cette session.

**Non regardé**
- Preview Vercel (SSO) et `www`.
- Champ `dateModified` : absent des 4 articles, non ajouté.
- Reste de BL-43-3 (E3 à E7 : analyse Orbitvu, « n'invente rien », retoucheur IA) : hors consigne.
- Phrase suivante du même paragraphe, inchangée dans les 3 langues : « échappent à cette obligation » (« this obligation », « diese Pflicht ») suit désormais deux obligations ; référent ambigu, relève de E3 à E5.
- « doit désormais porter » : A date au 2 décembre 2026 la fin du délai de marquage pour les systèmes mis sur le marché avant le 2 août 2026 (art. 111(4)) ; formulation de la consigne conservée.

**Suite** — Validation de Sébastien (prose de `content/blog/**`, `01-RAYON-ACTION.md`) et de Laurent (adaptations EN et de-ch), puis fusion sur GO. Renvoi vers A : non ajouté, à n'activer qu'à sa publication (D38).

---

## 2026-10-01 · UB-04 — fil d'Ariane hors du `<h1>` des articles de blog · Claude de Laurent

**Chantier** : audit Ubersuggest, plan du 01/10, lot 1, action A1 (UB-04) | **PR** : #74, brouillon, branche `seo/ub04-h1-fil-ariane-2026-10-01`, non fusionnée | **Base** : `main` `2ef01b2`

**Quoi** — Le gabarit d'article passait le fil d'Ariane dans le prop `title` de `HeroSection`, rendu dans le `<h1>`. Le fil sort du `<h1>` :
- `HeroSection` reçoit un prop optionnel `breadcrumb`, rendu juste avant le `<h1>` dans la variante centrée. Les 19 autres usages ne le passent pas : leur sortie est inchangée.
- Dans le gabarit d'article, le `div` du fil devient un `<nav>` étiqueté par langue (« Fil d'Ariane », « Breadcrumb », « Brotkrümelnavigation »). Les séparateurs « / » sont masqués aux lecteurs d'écran.
- `font-sans` devient `font-heading` sur ce `nav`. Dans le thème, `font-sans` renvoie à la variable Geist, jamais définie : dans le `<h1>`, le fil héritait donc d'Inter ; hors du `<h1>`, il aurait pris la police système. Rendu identique.

Aucun texte visible, aucune clé de `messages/*.json`, aucun title ni description modifiés. Le `BreadcrumbList` JSON-LD est inchangé.

**Pourquoi** — Mesure du 30/09, confirmée le 01/10 sur `main` : le texte du H1 de ces articles commençait par « Accueil / Blog / <catégorie> », et un `<div>` se trouvait dans le `<h1>`, ce que le modèle de contenu HTML n'admet pas.

**Fichiers** — `app/[lang]/blog/[slug]/page.tsx`, `components/hero/HeroSection.tsx`, `components/hero/types.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Le H1 de 125 articles ne contient plus que leur titre. Aucun gain de trafic ni de position n'est mesuré ou annoncé.

**Vérifié** —
- HTML prérendu, `main` `2ef01b2` contre la branche, identifiant de build neutralisé, scripts retirés : 359 fichiers.
  - 234 identiques ;
  - 125 diffèrent : 63 FR, 57 EN, 5 de-ch, tous des articles du gabarit commun ;
  - pour les 125, l'écart s'explique entièrement par le déplacement du fil. Une fois ce déplacement neutralisé, le HTML est identique ; 0 écart inexpliqué.
- H1 : un seul `<h1>` par article, sans élément enfant. Son texte est égal au champ `h1` (ou `title`) du JSON de l'article sur les 125.
- CSS compilée : fichier identique à `main` (`00c919af44f29472.css`), même empreinte que celle servie par `sysnext.vercel.app`. Une première version du commentaire contenait le jeton `--font-sans`, que Tailwind ajoutait au thème : reformulé.
- Chromium, `next start`, 6 articles (3 FR, 2 EN, 1 de-ch), 1440 et 390 px, animations neutralisées :
  - captures de la zone d'en-tête : 0 pixel différent sur les 12 ;
  - position et taille du fil, police, taille, graisse, interligne et couleur calculées identiques ;
  - hauteur de document identique, 0 débordement, 0 erreur de page.
- Accessibilité, arbre ARIA, 3 articles FR, EN et de-ch :
  - un seul `heading` de niveau 1, au nom égal au titre ;
  - un repère `navigation` nommé dans la langue de la page, avec 2 liens et la catégorie en texte ;
  - séparateurs absents de l'arbre ;
  - liens atteints au clavier.
- `npx tsc --noEmit` vert. `verifier-json` : 180 JSON valides. Vitest 373/373. `npx next build` vert, variables factices de la CI. ESLint sur les 3 fichiers : 0 erreur, 1 avertissement (`HeadingData`), déjà présent sur `main`.
- Playwright, Chromium (`seo`, `anchors`, `internal-links`, `language-switch`, `mobile-overflow`, `responsive`) : 285 réussis et 25 échecs sur `main` comme sur la branche, **listes d'échecs identiques**. Configuration locale hors dépôt pointant sur le Chromium du conteneur ; `playwright.config.ts` non modifié.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`. Le rendu de Firefox et Safari suit celui de Chromium : mêmes règles CSS, structure de bloc équivalente. Cela repose sur des schémas observés.

**Non regardé** — Preview Vercel (SSO), `www` (R4), Firefox, Safari, appareils réels.
- Hors périmètre, non modifiés : `comparatif-orbitvu-ortery-styleshoots-2026` et `prestataire-packshot-vs-studio-interne`, articles à page dédiée en FR et EN, portent le même fil dans leur `<h1>` (4 pages).
- Le libellé du repère est défini dans le gabarit, et non dans `messages/*.json`, exclus de ce lot et réservés par #64 et #66 : à y migrer ensuite.

**Suite** — GO de Laurent, puis fusion. Après fusion : `smoke.mjs` sur `sysnext.vercel.app`, un article FR, EN et de-ch contrôlé dans Chrome sur `www`. Les 2 articles à page dédiée relèvent d'une PR distincte.

---

## 2026-10-01 · Cluster AI Act — pilier A : mention « Illustration générée par IA » (Q1) · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : tête `ea7d923`

**Quoi** — Arbitrage Q1 de Laurent du 01/10 : légende de A3 : « Illustration : placer un produit… » devient « Illustration générée par IA. Placer un produit… » ; reste de la légende inchangé. Aucune autre phrase modifiée.

**Pourquoi** — Choix éditorial de transparence sur des illustrations générées par IA, dans des articles consacrés au signalement des images IA. Ce n'est pas l'affirmation d'une obligation légale générale : l'article ne la présente pas comme telle.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié** — `verifier-json`, `tsc`, Vitest et `next build` en local avant push ; rendu des légendes contrôlé sur `next start` local.

**Supposé** — Rien.

**Non regardé** — A1 (hero) : le gabarit commun du blog n'affiche pas de légende sous l'image principale. Ajouter un champ optionnel `imageCaption` au gabarit (`app/[lang]/blog/[slug]/page.tsx`, `lib/content.ts`) a été refusé par le contrôle de permissions de la session (modification d'une ressource partagée) : rien n'est modifié, décision à prendre par Laurent. Preview (SSO) ; `www` (R4).

**Suite** — Mention sur l'image principale selon la décision de Laurent ; puis transmission à Sébastien.

---

## 2026-10-01 · Cluster AI Act — pilier A : contrôle final éditorial avant Sébastien · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : tête `80489cf`, `main` `8ec89c1`

**Quoi** — Passe de sortie éditoriale (audit, corrections, tests, Preview) avant envoi à Sébastien. Dans `content/blog/fr/ai-act-images-produit.json` seulement :
- ouverture : « Vérifié le 28 septembre » devient « Sources vérifiées du 28 au 30 septembre », comme le corps (plateformes et mesure du 30/09) ;
- tableau « qui doit quoi », ligne agence : point 14 cité en entier (une entreprise reste déployeur lorsque des prestataires opèrent le système pour son compte, sous sa responsabilité et son contrôle), comme dans l'article Suisse (#60) ; le cas d'une marque qui impose ou encadre l'usage de l'IA reste non tranché ;
- ligne marketplace : renvoi au point 16 ;
- « la version finale du 20 juillet 2026 » devient « la version publiée le 20 juillet 2026 » ;
- Google, mention visible : « Google peut en ajouter lui-même dans certains cas » ;
- mesure WebP : condition de la mesure (navigateur acceptant WebP) ;
- renvoi vers l'article Suisse : titre réel, toujours sans lien actif ;
- sources classées par nature (cadre européen, droit français, Suisse, plateformes, standards), sans la trace de production « ajoutés » ; cinq sources déjà utilisées par le texte ajoutées à la liste : Google 6324350 (refus du produit), Google 17231950 (libellé IA), projet de lignes directrices du 8 mai 2026, texte adopté par le Sénat le 18/02/2026 et projet de loi n° 2518 de l'Assemblée nationale (organisation du contrôle en France) ;
- en-têtes de trois tableaux raccourcis (« Ce que cela change », « Rôle selon l'AI Act », « Marquage par l'outil ? », « Mention visible par la marque ? », « À faire ») : à 1440 px, les en-têtes insécables (`white-space: nowrap`, `app/globals.css`) faisaient déborder 3 tableaux sur 4 et tronquaient leur dernière colonne.
Aucune qualification de cas modifiée. FAQ, title, meta, H1, slug, canonical, date, visuels, alt et légende inchangés.

**Pourquoi** — Mission « contrôle final éditorial » du 01/10/2026 : Sébastien ne reçoit que ce qui exige son arbitrage. Constats : date d'ouverture contredite par le corps ; ligne agence moins complète que l'article Suisse sur le même point 14 ; deux affirmations Google, le projet du 8 mai et le calendrier parlementaire français sans source listée ; dernière colonne de trois tableaux masquée sur ordinateur.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié** —
- Fresh-check : tête `80489cf` et `main` `8ec89c1` conformes à la mission ; PR ouvertes listées ; aucune autre session n'a écrit dans #59 depuis `80489cf`.
- Sources relues le 01/10 : lignes directrices C(2026) 5054 (PDF, points 10, 12, 13, 14, 16, 92, 113, 114, 116, 117, 127, 129, 154) ; projet du 8 mai 2026 (PDF, point 86 : suppression ou masquage d'arrière-plans parmi les modifications à marquer) ; Google 14743464, 14572008, 6324350 (conservation des métadonnées IA parmi les conditions minimales, dont le non-respect entraîne le refus du produit), 17231950 (paramètre de libellé IA facultatif ; libellés ajoutés par Google dans certains cas) ; Zalando, mise à jour du 31/08/2026 (mentions visibles refusées, marquage invisible « required by December 2026 ») ; Chancellerie fédérale, page « Intelligence artificielle » ; liste des points de contact de la Commission (France : DGCCRF) ; Sénat, texte adopté le 18/02/2026 (titre « systèmes d'intelligence artificielle », art. 55-1 et suivants) ; Assemblée nationale, projet de loi n° 2518 déposé le 20/02/2026.
- Mesure WebP : preuve au JOURNAL de #63 (30/09, 06:27 UTC, `sysnext.vercel.app`, `/images/hero/hero-studios-wide.avif` : original servi en `w=640` et `w=1080`, WebP sans XMP ni EXIF en `w=1920` pour un en-tête `Accept` annonçant WebP).
- Liens externes (22 URL distinctes) : 17 en 200 ; EUR-Lex (2) en 202 et Légifrance (3) en 403, défis anti-robots non concluants.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 346/346 ; `next build` vert, variables factices de la CI.
- `next start` local, Chromium, 1440 et 390 px : 200 ; title 57 car., description 155 car., canonical inchangé, aucune balise `robots` ; JSON-LD Organization, BreadcrumbList, Article, FAQPage 7 ; hero 848 × 477 et 358 × 201, A3 662 × 372 et 358 × 201, ratio 16:9, légende présente ; 4 tableaux sans défilement à 1024, 1280 et 1440 px (avant : 3 sur 4 tronqués), défilement interne à 390 px ; 0 débordement de page ; 0 erreur de console ; 0 ancre cassée ; 0 marqueur ; 0 lien vers `/fr/packshot-e-commerce`.
- e2e (`seo`, `internal-links-all`, `anchors`, `responsive`, `mobile-overflow`, Chromium, serveur local, 2 workers) : 307 tests, 24 échecs, liste identique à un build local de `main` `8ec89c1` (0 en plus, 0 en moins) : titles et descriptions hors bornes (dont `/fr/academy`), hreflang de `/fr/packshot-bijoux`, débordements de `/fr`, `/fr/studios-photo-automatises`, `/fr/ia-photo-produit`, `/fr/industrie-defense`, ancre `#calculateur-roi`. Ces specs ne visent pas l'article lui-même : son contrôle est celui de la ligne précédente.
- Premier passage e2e de la branche écarté : 82 dépassements de délai sur des pages sans lien avec l'article (`/fr/ia-photo-produit`, `/fr/packshot-amazon`…), serveur local bloqué après des contrôles concurrents (même cause que dans #63) ; relance complète sur un serveur redémarré : 0 dépassement.

- Après fusion de `main` `2ef01b2` (#68, Worker D36, fusionnée pendant la passe ; conflit du JOURNAL seulement) : `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 (346 + tests D36 de `main`) ; `next build` vert. Contenu de l'article identique avant et après la fusion.

**Supposé** — [Inférence] EUR-Lex et Légifrance servent les mêmes textes que ceux lus les 29 et 30/09 (Cellar, conversion). Cela repose sur des schémas observés.

**Non regardé** — Preview (SSO) par script ; `www` (R4) ; pages Amazon (rendu JavaScript), relues le 30/09 pour #63 seulement.
Hors périmètre, rien de modifié :
- gabarit du blog : le fil d'Ariane est rendu dans le `h1` (tous les articles) ;
- `globals.css` : en-têtes de tableau insécables, risque de colonne masquée sur d'autres articles ;
- deux articles publiés affichés en « articles liés » sous A, dont la phrase sur l'AI Act diverge du pilier : `generer-images-produit-ia` et `migrer-ancien-packshotcreator`.

**Suite** — Envoi à Sébastien sur la Preview de la nouvelle tête. À la publication coordonnée (D38) : lien actif vers `/fr/blog/images-ia-ecommerce-suisse`, `date` du jour de publication.

---

## 2026-09-30 · Cluster AI Act — pilier A : passe éditoriale (cadre de rédaction de Sébastien) · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : tête `de7289f`, puis fusion de `main` `a8c85ca` (#69, conflit du JOURNAL résolu en gardant les deux entrées)

**Quoi** — Réécriture de la prose pour la lisibilité, qualifications juridiques inchangées. Ouverture qui répond puis dit ce que le lecteur saura décider ; les 34 mentions « Niveau : … » intégrées aux phrases (« la Commission cite », « probablement », « à notre lecture », « les textes consultés ne tranchent pas »), avec un paragraphe de lecture unique avant les cas ; titres des cas sans la numérotation héritée des 20 cas de #43 ; tableau des autres cas reconstruit (réponse pour l'outil et pour la marque, puis degré de certitude, repris de #43 et #61) ; tableaux « qui doit quoi », calendrier et plateformes tournés vers l'action ; listes pour la mise en forme standard et les critères de l'hypertrucage ; 14 tirets cadratins retirés ; 2 liens de sources placés près des affirmations (lignes directrices, article L121-2). FAQ, title, meta, slug, canonical et visuels inchangés ; `readingTime` 20 → 22.

**Pourquoi** — Retour de Sébastien du 30/09 (textes « durs à lire ») et kit `TRANSMISSION_REDACTION_BLOG_2026-09-30` (prompt prioritaire, SKILL, règles d'écriture, style maison, repères SEO/GEO), transmis par Laurent.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Sens juridique : chaque niveau (Texte, Exemple direct Commission, Interprétation, Non tranché) retrouvé dans la nouvelle phrase ; points 10 à 16, 113 à 117 des lignes directrices C(2026) 5054 relus sur le PDF de la Commission le 30/09 pour les deux précisions de sens listées dans la PR (agence : critère des points 12 et 14, cas toujours non tranché ; exemple de produit hypertrucage : « dans une publicité ou sur un emballage »).
- Suisse : « aucune obligation suisse d'étiquetage » devient « aucune obligation suisse générale d'étiquetage », aligné sur l'article Suisse (#60).
- Mots : corps 4 078 → 4 527, total avec FAQ et H1 4 655 → 5 104 (même méthode que la PR) ; hausse due surtout au tableau des autres cas, qui donne désormais la réponse et plus seulement le niveau.
- `verifier-json` 187 valides ; `tsc` vert ; Vitest 342/342 ; `next build` vert, 384 pages.
- `next start` local, 1440 et 390 px : 200, title et description inchangés, canonical inchangé, aucune balise `robots`, JSON-LD Organization, BreadcrumbList, Article, FAQPage 7 = 7 visibles ; hero 848 × 477 et 358 × 201, A3 662 × 372 et 358 × 201, légende présente ; 0 débordement ; 0 erreur de page ; 0 lien interne, 0 lien vers `/fr/packshot-e-commerce` ; aucun « Niveau : » ni tiret cadratin au rendu.
- `e2e/seo.spec.ts` + `internal-links-all.spec.ts` en local : 243 réussis et 8 échecs avant la fusion de #71. Correction : la comparaison annoncée d'abord avec `https://sysnext.vercel.app` n'était pas valable (erreurs TLS du proxy, puis délais dépassés depuis le conteneur). Comparaison refaite après fusion de `main` `8ec89c1` : 235 réussis, 9 échecs, liste identique à celle d'un build local de `main` `8ec89c1` (titles et descriptions hors bornes, dont `/fr/academy`, et hreflang de `/fr/packshot-bijoux`).
- Après fusion de `main` `8ec89c1` (#71) : `verifier-json` 181 valides ; `tsc` vert ; Vitest 346/346 ; `next build` vert, 372 pages ; rendu de l'article inchangé en 1440 et 390 px.
**Supposé** — [Inférence] Le retour de Sébastien se limite à ce que cite la mission (« durs à lire », « meilleur des deux mondes », « reprends les quatre articles comme un ensemble éditorial ») : aucun autre écrit de sa part n'a été transmis. Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel (SSO) ; `www` (R4) ; EN et de-ch (D38) ; relecture par un autre lecteur : aucune ; « quatre articles » : non établi, seuls A et S traités, #61 à #63 non touchées.

**Suite** — Seconde passe de Sébastien sur la Preview ; deux précisions de sens à valider (voir PR #59).

---

## 2026-10-01 · Cluster AI Act — article Suisse : mention « Illustration générée par IA » (Q1) · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : tête `997cae4`

**Quoi** — Arbitrage Q1 de Laurent du 01/10 : légendes de S2 et S3 : « Illustration générée par IA. » placé en tête ; « Illustration de variations de rendu : » devient « Variations de rendu : » (S3) ; reste des légendes inchangé. Aucune autre phrase modifiée.

**Pourquoi** — Choix éditorial de transparence sur des illustrations générées par IA, dans des articles consacrés au signalement des images IA. Ce n'est pas l'affirmation d'une obligation légale générale : l'article ne la présente pas comme telle.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié** — `verifier-json`, `tsc`, Vitest et `next build` en local avant push ; rendu des légendes contrôlé sur `next start` local.

**Supposé** — Rien.

**Non regardé** — S1 (hero) : le gabarit commun du blog n'affiche pas de légende sous l'image principale. Ajouter un champ optionnel `imageCaption` au gabarit (`app/[lang]/blog/[slug]/page.tsx`, `lib/content.ts`) a été refusé par le contrôle de permissions de la session (modification d'une ressource partagée) : rien n'est modifié, décision à prendre par Laurent. Preview (SSO) ; `www` (R4).

**Suite** — Mention sur l'image principale selon la décision de Laurent ; puis transmission à Sébastien.

---

## 2026-10-01 · Cluster AI Act — article Suisse : contrôle final éditorial avant Sébastien · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : tête `d5182e7`, `main` `8ec89c1`

**Quoi** — Passe de sortie éditoriale (audit, corrections, tests, Preview) avant envoi à Sébastien. Dans `content/blog/fr/images-ia-ecommerce-suisse.json` seulement :
- personne réelle identifiable : position du PFPDT ajoutée (« l'utilisation de programmes permettant de falsifier les visages, les images ou les messages vocaux de personnes identifiables doit toujours être clairement indiqué[e] »), dans le corps, l'encadré « En bref » et le tableau ; présentée comme la position de l'autorité, limitée aux personnes identifiables ;
- Zalando : refus des mentions visibles sur l'image et des contenus qui en exigeraient une, comme dans le pilier ;
- cas 4 : distinction produit de série / pièce unique, occasion ou reconditionné, reprise du pilier (« à notre lecture ») ;
- situation A : le point 13, déjà cité deux paragraphes plus haut, n'est plus répété ; restent la simple accessibilité qui ne suffit pas, le renvoi au point 13, le rôle, l'usage du système, la destination des images et le cas par cas ;
- section C2PA / IPTC : répétition des sections plateformes réduite à une phrase ; la norme est nommée « IPTC Photo Metadata » ;
- tableau récapitulatif : en-têtes « Si usage dans l'UE » et « Plateformes » ; à 1440 px, l'en-tête insécable « Si l'image est utilisée dans l'Union » masquait presque toute la colonne « Sur les plateformes ».
Aucune qualification de cas modifiée. Title, meta, H1, slug, canonical, date, visuels, alt et légendes inchangés ; pas de FAQ ajoutée.

**Pourquoi** — Mission « contrôle final éditorial » du 01/10/2026. Constats : la position du PFPDT figurait dans les sources (page « IA et protection des données ») sans être reprise dans la partie « Personnes » qu'elle concerne directement ; Zalando et le cas 4 moins complets que dans le pilier ; point 13 cité deux fois à deux paragraphes d'écart ; colonne du tableau masquée sur ordinateur.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié** —
- Fresh-check : tête `d5182e7` et `main` `8ec89c1` conformes à la mission ; `d5182e7` lu avant toute écriture.
- Sources relues le 01/10 : PFPDT, « IA et protection des données » (phrase citée) et « Déclaration commune sur les images générées par l'IA » (23/02/2026) ; SECO, Portail PME (23/09/2026 : avant-projet destiné à la consultation élaboré au printemps 2027 ; « Les fournisseurs et déployeurs de pays tiers peuvent aussi l'être si les résultats générés par un système d'IA sont utilisés dans l'UE ») ; Chancellerie fédérale, « Réglementation » ; lignes directrices C(2026) 5054 (PDF, points 10, 12, 13, 14) ; Google 14743464 ; Zalando, mise à jour du 31/08/2026.
- Situation A : la règle de la mission (« la simple accessibilité d'un site ou compte suisse depuis l'Union ne suffit pas à elle seule ») est conservée ; aucune phrase n'écrit « accessible dans l'UE = AI Act applicable ».
- Liens externes (16 URL distinctes) : 15 en 200 ; EUR-Lex (1) en 202, défi anti-robots non concluant.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 346/346 ; `next build` vert, variables factices de la CI.
- `next start` local, Chromium, 1440 et 390 px : 200 ; title 53 car., description 146 car., canonical inchangé, aucune balise `robots` ; JSON-LD Organization, BreadcrumbList, Article ; hero 848 × 477 et 358 × 201, S2 et S3 662 × 372 et 358 × 201, ratio 16:9, légendes présentes ; tableau sans défilement à 1024, 1280 et 1440 px (avant : 662 px visibles sur 821), défilement interne à 390 px ; 0 débordement de page ; 0 erreur de console ; 0 ancre cassée ; 0 marqueur ; 0 lien vers `/fr/packshot-e-commerce`.
- e2e (`seo`, `internal-links-all`, `anchors`, `responsive`, `mobile-overflow`, Chromium, serveur local, 2 workers) : 307 tests, 24 échecs, liste identique à un build local de `main` `8ec89c1` (0 en plus, 0 en moins) : titles et descriptions hors bornes (dont `/fr/academy`), hreflang de `/fr/packshot-bijoux`, débordements de `/fr`, `/fr/studios-photo-automatises`, `/fr/ia-photo-produit`, `/fr/industrie-defense`, ancre `#calculateur-roi`. Ces specs ne visent pas l'article lui-même : son contrôle est celui de la ligne précédente.

- Après fusion de `main` `2ef01b2` (#68, Worker D36, fusionnée pendant la passe ; conflit du JOURNAL seulement) : `verifier-json` 181 valides ; `tsc` vert ; Vitest 373/373 (346 + tests D36 de `main`) ; `next build` vert. Contenu de l'article identique avant et après la fusion.

**Supposé** — [Inférence] La page du PFPDT exprime une position d'autorité de surveillance, non une règle légale autonome ; l'article la présente ainsi. Cela repose sur des schémas observés.

**Non regardé** — Preview (SSO) par script ; `www` (R4) ; pages Amazon (rendu JavaScript), relues le 29/09 seulement ; tableau des ratifications du traité n° 225 (403). Hors périmètre, rien de modifié : fil d'Ariane dans le `h1` (gabarit, tous les articles) ; en-têtes de tableau insécables (`globals.css`) ; articles liés `generer-images-produit-ia` et `migrer-ancien-packshotcreator`.

**Suite** — Envoi à Sébastien sur la Preview de la nouvelle tête. À la publication coordonnée (D38) : lien actif vers `/fr/blog/ai-act-images-produit`, `date` du jour de publication ; adaptation de-ch (pas une traduction).

---

## 2026-10-01 · Cluster AI Act — article Suisse : situation A corrigée (accessibilité depuis l'Union) · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : tête `6bcf962`

**Quoi** — Sur consigne de Laurent du 01/10, un seul paragraphe modifié : la situation A de « Six situations à distinguer ». La version de `e8ce8a3` assimilait une image susceptible d'être un hypertrucage, publiée sur un site ou un compte accessible depuis l'Union, à une diffusion dans l'Union. La nouvelle version :
- dit que la simple accessibilité depuis l'Union ne suffit pas, à elle seule, à faire basculer la situation (« À notre lecture ») ;
- reprend la lettre du point 13 telle que l'article la cite déjà plus haut : déployeur qui prévoit lui-même la diffusion dans l'Union, en la dirigeant ou en l'autorisant, y compris par publication sur l'internet accessible mondialement ; exclusion des canaux imprévisibles et hors de son contrôle ;
- s'aligne sur le pilier (#59) : l'application concrète dépend du rôle de l'entreprise, de l'usage du système et de la destination des images ;
- laisse les situations intermédiaires à apprécier au cas par cas.
Aucune autre phrase, aucun visuel, aucune métadonnée modifiés.

**Pourquoi** — Formulation jugée trop large par Laurent : elle pouvait laisser croire que la simple accessibilité d'une publication depuis l'Union suffit à déclencher l'AI Act pour une entreprise suisse.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié** — Un seul paragraphe diffère entre `6bcf962` et la nouvelle tête (comparaison du champ `content` ; autres champs identiques). Paraphrase du point 13 reprise du paragraphe « Les lignes directrices de la Commission précisent ces deux cas », déjà présent dans l'article ; formule du pilier reprise de `80489cf` (#59). `verifier-json`, `tsc` et `next build` : voir la PR.

**Supposé** — [Inférence] La nouvelle formulation ne crée pas de règle nouvelle : elle reste une lecture (« À notre lecture ») des lignes directrices citées. Cela repose sur des schémas observés.

**Non regardé** — Aucune source relue (consigne : pas de nouvelle recherche). Marqueurs terrain et étiquettes éditoriales : non modifiés ici. `e8ce8a3` (autre session) a retiré les 5 marqueurs terrain et intégré les étiquettes à la prose, alors que la consigne de Laurent du 01/10 les supposait encore présents pour la revue de Sébastien : écart signalé à Laurent, rien rétabli. Preview (SSO) ; `www` (R4).

**Suite** — Validation de Laurent sur la formulation, puis passe de Sébastien sur la Preview de la nouvelle tête.

---

## 2026-10-01 · Cluster AI Act — reliquat de la revue du 28/09 archivé : E8 à E13 (site) et H1 à H3 (blendai.studio) · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, reliquat de la revue préalable du 28/09 | **PR** : #73, documentaire, brouillon | **Base** : `main` `2ef01b2`

**Quoi** — Archivage, sans aucune correction, des constats E8 à E13 (contenus du site) et H1 à H3 (site blendai.studio, hors dépôt) de la revue préalable du 28/09, et des faits BlendAI de l'évaluation historique. Backlog inscrit dans `ETAT.md`. Aucun texte public modifié, aucune décision de correction, aucune validation juridique.

**Pourquoi** — Le fil historique « AI Act et images produit e-commerce » signale que ces constats de sa revue du 28/09 n'ont pas été transmis. Contrôle du 01/10 : aucune trace dans `JOURNAL.md`, `ETAT.md`, `DECISIONS.md`, `BOITE-AUX-LETTRES.md` ni `06-CHANTIERS.md`, sur `main` comme sur les branches distantes. E1 à E7 de la même revue sont déjà archivés (BL-43-2 et BL-43-3, entrée précédente).

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Source**
- `REVUE_PREALABLES_AUDIT_PSC_AI_ACT_2026-09-28.md`, lignes 73 (E8), 79 à 83 (E9 à E13) et 89 à 91 (H1 à H3) ; SHA-256 `15e32d04d82c75b94333c8fe59805d96af4dde7a64ffcfa209eb4eaebc564583`. Dépôt lu par la revue : `main` `809f61f` ; ses numéros de ligne valent pour ce commit.
- Faits BlendAI : `BLENDAI_AI_ACT_PROVIDER_ASSESSMENT.md`, § 0 (mis à jour le 28/09) ; SHA-256 `6c3596dd0be10ea2595d938a79cc43ba1795f7c973c550a62f6edf1a09aa31b9`.
- Les deux fichiers sont des pièces jointes de l'artifact privé https://claude.ai/artifact/U9K31cAELz7QhH4VGcyL1y (version `1790618360-4bae`), relues le 01/10 ; empreintes identiques à celles affichées par l'artifact.

**Numérotation** — E8 à E13 et H1 à H3 sont les identifiants de la revue, préfixés ici `RV28-` pour ne pas se confondre avec la piste H1 du chantier « Marque » d'`ETAT.md`. Aucun numéro de décision de l'ancien addendum n'est repris : D25 désigne au dépôt « Pas de prix dans un comparatif concurrentiel ».

**Constats RV28-E8 à RV28-E13 — contenus de packshot-creator.com.** Gravité et besoin d'avis juridique : ceux de la revue du 28/09, non réexaminés. Présence : relevée sur `main` `2ef01b2` le 01/10 par `git grep`, sans autre contrôle.

| ID | Constat de la revue (ligne) | Gravité (revue) | Avis juridique demandé par la revue | Présence sur `main` `2ef01b2` | Statut de preuve | Propriétaire de la vérification | Validation humaine |
|---|---|---|---|---|---|---|---|
| RV28-E8 | BlendAI.studio présenté comme « solution propriétaire » de PackshotCreator ; JSON-LD `provider: PackshotCreator` (l. 73) | MEDIUM ; HIGH si BlendAI est de Sysnext et non conforme au 02/12/2026 | Oui | `messages/fr.json` l. 451, 544, 2765, 2843 ; `messages/en.json` l. 448, 463, 541, 778, 2762 ; `messages/de-ch.json` l. 390, 405, 480 (« eigene Lösung »), 2681, 2759 ; `app/[lang]/ia-photo-produit/page.tsx:712` (`provider`) | Formulations constatées. Qualification de fournisseur : [Interprétation] de la revue, non tranchée | Sébastien : faits produit (développement, entité, mise sur le marché, marquage) | Sébastien (faits, prose) ; avis juridique selon la revue |
| RV28-E9 | FAQ « Les visuels IA sont-ils légaux pour le e-commerce ? » de `studio-ia-vs-ia-generative` : FTC, Californie, « seules les photos réelles sont conformes » (l. 79) | MEDIUM | Oui | `fr.json:2855`, `en.json:2852`, `de-ch.json:2771` | Formulations constatées ; règle californienne marquée [Non vérifié] par la revue ; aucune recherche juridique faite ici | À désigner par Laurent | Sébastien (prose) ; avis juridique selon la revue |
| RV28-E10 | « La Californie impose depuis janvier 2026 le labellisage des photos IA » (l. 80) | MEDIUM | Oui | `fr.json:2760`, `en.json:2757`, `de-ch.json:2676` | Idem E9 | À désigner par Laurent | Idem E9 |
| RV28-E11 | « Conforme : photo réelle auditable, métadonnées préservées » (l. 81) | LOW | Non | `fr.json:2802`, `en.json:2799`, `de-ch.json:2718` | « Métadonnées préservées » non démontré. Constat technique du 30/09 (#63, repris dans #59) : sur `sysnext.vercel.app`, une image AVIF perdait ses métadonnées XMP et EXIF une fois réencodée en WebP à 1 920 px | Claude de Laurent : contrôle technique de la chaîne d'images, sans coût | Sébastien (prose) |
| RV28-E12 | Absolus « Fidélité 100% garantie », « jamais au produit », « zéro hallucination », « fidèles à 100% » (JSON-LD `SoftwareApplication`), aussi sur `/fr/ia-photo-produit` (l. 82) | MEDIUM | Non | `fr.json` l. 352, 356, 420, 421, 441, 668, 2766, 2777 ; `page.tsx:692` (JSON-LD) ; équivalents EN et de-ch non recensés ligne à ligne | Formulations constatées ; exactitude technique non établie | Sébastien : comportement réel de BlendAI | Sébastien (prose) |
| RV28-E13 | Témoignage « La fidélité des rendus est impressionnante. Nos clients ne font pas la différence avec un vrai shooting lifestyle. » (l. 83) | LOW | Non | `fr.json:384` | Contexte éditorial non examiné (auteur, autorisation, pages d'affichage) ; D31 exclut déjà tout témoignage sur `/de-ch` | Sébastien : contexte du témoignage | Sébastien |

**Constats RV28-H1 à RV28-H3 — site blendai.studio, hors dépôt PackshotCreator.** Relevés par la revue le 28/09. **État actuel NON VÉRIFIÉ** : aucune requête ni intervention sur ce site.

| ID | Constat de la revue (ligne) | Gravité (revue) | Qui, selon la revue | Statut de preuve |
|---|---|---|---|---|
| RV28-H1 | Accueil : « Résultats indiscernables du réel, fidélité produit 100% garantie. » (l. 89) | MEDIUM ; HIGH si BlendAI est de Sysnext | Exploitant de BlendAI | Relevé du 28/09, non revérifié |
| RV28-H2 | Offre « Marques Premium » : « Conformité juridique garantie » (l. 90) | HIGH | Exploitant de BlendAI et juriste | Relevé du 28/09, non revérifié |
| RV28-H3 | Pied de page : « Mentions légales », « CGV », « Confidentialité » en HTTP 404 (l. 91) | MEDIUM | Exploitant de BlendAI et juriste | Relevé du 28/09, non revérifié |

Propriétaire des vérifications : l'exploitant de BlendAI. Selon le § 0 du sous-rapport (déclaratif de Laurent du 28/09), le service est développé par Sébastien Jourdan et une société dédiée est en création. Saisine de l'exploitant : décision de Laurent.

**Faits BlendAI de l'évaluation historique** — `BLENDAI_AI_ACT_PROVIDER_ASSESSMENT.md`, § 0.1 : faits communiqués par Laurent le 28/09, « non vérifiés sur pièces » selon le document, non reconfirmés au 01/10. Ce ne sont pas des faits opérationnels actuels.
- Marquage ou métadonnées IA des exports : « Fonction en développement » (`AI_MARKING_EXPORT = IN_DEVELOPMENT`).
- Mannequins ou personnes virtuelles : non vérifié (`VIRTUAL_HUMANS = UNVERIFIED`) ; le document relève qu'ils sont déjà annoncés publiquement (site et blendai.studio).
- Société exploitante : « Une société dédiée est en cours de création » ; nom et date non communiqués.
- Développeur : Sébastien Jourdan ; service en bêta depuis quelques mois, sans date de mise sur le marché retenue ; modèles sous-jacents confidentiels.

**Effet attendu** — Aucun sur le site : documentation seule.

**Vérifié**
- `main` `2ef01b2` ; tête de #73 `781ab08` avant ce commit.
- Aucune trace antérieure de ces constats dans `docs/seo-geo/`, sur `main` et sur les branches distantes.
- Fichiers sources relus depuis l'artifact ; SHA-256 identiques à ceux qu'il affiche.
- Formulations E8 à E13 présentes sur `main` `2ef01b2` (`git grep`).

**Supposé** — Aucune hypothèse retenue.

**Non regardé** — blendai.studio ; exactitude juridique ou factuelle des formulations ; recensement complet EN et de-ch de E12 ; Preview. Constat incident, non instruit : les lignes 2676, 2681, 2718, 2759 et 2771 de `messages/de-ch.json` portent un texte en français.

**Suite** — Aucune correction décidée. Pour chaque item : vérification par son propriétaire, puis décision de Laurent et validation de Sébastien pour la prose, avant toute PR applicative ; avis juridique là où la revue le demande (E8, E9, E10, H2, H3). Ordre proposé par la revue (l. 96) : « E8 (préalable 2), H2 », puis « E9, E10 et E12, enfin E11 et E13 ».

---

## 2026-10-01 · Cluster AI Act — archivage D16 et clôture des PR historiques #43, #53, #61, #62, #63 · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, PR historiques | **PR** : #73, documentaire, brouillon | **Base** : `main` `8ec89c1`

**Quoi** — Archive des mesures D16 qui ont justifié la création du pilier A ; verdict final B/C/D consigné en D41 ; backlog technique de #43 (BL-43-1 à BL-43-4) et idée de #53 (BL-53-1) inscrits ici et dans `ETAT.md`. Sur GO de Laurent du 01/10 : fermeture sans fusion de #53, puis #61, #62, #63, puis #43. Aucune branche supprimée, aucun article ni code modifié.

**Pourquoi** — Revue de clôture du 30/09 (rapport « Revue clôture PR historiques AI Act ») : les mesures D16 de création de A n'existaient que dans #43 (description et JOURNAL de sa branche), absentes de #59 ; le verdict final B/C/D n'était consigné que dans la branche et la description de #59 ; les descriptions de #61, #62 et #63 concluent encore « les trois critères de D16 sont remplis ».

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/DECISIONS.md`

**Archive D16**

**1. Mesures historiques — création du pilier A, 28/09/2026.** Recopiées sans modification depuis la description de #43 (tête `175a9d5`) :

> **D16 — mesures du 28/09/2026 (exécutions n8n 3460 et 3461, workflows jetables archivés, coût 0,343 $)**
> 1. **Similarité (D27)** : brief rédigé de 729 mots ; maximum 0,697 (`/fr/blog/generer-images-produit-ia`) sur 168 pages FR ; 0 page ≥ 0,85. Témoin : page 250 réembarquée, cosinus 1,000000 ; calcul local contrôlé contre `pgvector` à 1e-6 près.
> 2. **Demande FR/CH** (DataForSEO Google Ads, données jusqu'à août 2026 ; témoins conformes) : « ai act e-commerce » 10 et « watermark ai act » 10 en France ; « watermark ai act » 10 en Suisse romande ; famille : « ai act » 4 400, « ia act » 6 600, « article 50 ai act » 90 (260 en août) en France ; « ki kennzeichnungspflicht » 40 (260 en août) en Suisse alémanique.
> 3. **Lacune de citation GEO** : 5 sondes Perplexity Sonar, PSC cité 0/5 ; 19 SERP Google FR, PSC 0/19 dans le top 10 ; AI Overview présent 19/19, contenu non observé. Limites : une exécution par question, un seul moteur.

Le JOURNAL de la branche `seo/ai-act-images-produit-2026-09-28` (entrée « Article AI Act et images produit, Preview à valider », commit `4aa305e`) porte « D16 PASS » dans son en-tête de chantier et résume : « D16 : similarité maximale 0,697 avec l'existant ; « article 50 ai act » 90 recherches (260 en août) ; PSC absent des réponses IA mesurées (0/5 Perplexity). »

Limites, telles qu'écrites dans la source : une exécution par question, un seul moteur pour les sondes ; contenu des AI Overview non observé. Le brief mesuré date du 28/09, avant la restructuration du 29/09 (#59) ; aucune nouvelle mesure n'est faite ici.

**2. Décision de création de A.** Fondée sur les mesures ci-dessus (« D16 PASS », 28/09). Le pilier restructuré (#59, tête `80489cf` au 01/10) ne reproduit pas ces mesures. D16 réserve la fusion d'une création à la validation explicite de Sébastien : `SEBASTIEN_PASS = PENDING` dans la description de #59 au 01/10.

**3. Décision finale B/C/D, 30/09/2026 (D41).** `B_D16_FINAL = NO`, `C_D16_FINAL = NO`, `D_D16_FINAL = NO`. Mesures du 30/09 : descriptions de #61, #62 et #63 (workflows n8n jetables en lecture seule `EiMBLzt28dSzVzHh` et `KPKz3xyNOnDIxZiX`). Leur conclusion « les trois critères de D16 sont remplis » précède la décision de Laurent et n'est pas le verdict retenu. Motif, repris du JOURNAL de la branche de #59 : « critère 2 non rempli pour B et C (aucune demande mesurée sur l'intention réglementaire, requêtes génériques ou d'outils non assimilées) ; critère 3 non rempli pour D ». Matière indispensable réintégrée dans A par `be1f8ae` ; présente à la tête `80489cf` (titres renommés par la passe éditoriale `4200f6a`).

**Backlog conservé** — inscrit aussi dans `ETAT.md`, « Prochaines actions ».

| Élément | SOURCE_PR | SOURCE_SHA | SOURCE_FILE | PURPOSE | CURRENT_STATUS (`main` `8ec89c1`) | FUTURE_ACTION | DEPENDENCY |
|---|---|---|---|---|---|---|---|
| BL-43-1 | #43 | `4aa305e` | `app/[lang]/blog/[slug]/page.tsx` | `og:url`, `og:site_name`, `og:locale` et carte `twitter` propres à chaque article ; retrait de l'import `HeadingData` inutilisé | Absent : `openGraph` sans `url`, `siteName` ni `locale`, aucun `twitter` ; import `HeadingData` présent (l. 21). Fusion simulée du fichier sans conflit | PR applicative distincte, réécrite sur `main` (pas de cherry-pick). Rayon large : 125 articles JSON (FR 63, EN 57, de-ch 5), garde-conséquences | Aucune avec A ou S ; décision de Laurent |
| BL-43-2 | #43 | `4aa305e` | `content/blog/fr/generer-images-produit-ia.json` (corps l. 16, FAQ l. 36) | Séparer droit de la consommation et obligations de transparence de l'AI Act (E1/E2) | Phrase « Le règlement européen sur l'IA impose également que les images ne trompent pas le consommateur… » présente (2 occurrences) | Réécriture depuis le texte final de A, après revue factuelle ; ne pas recopier l'ancien texte de #43 (dates, renvoi à A) ; validation de Sébastien (`01-RAYON-ACTION.md`) | Le texte de #43 renvoie à `/fr/blog/ai-act-images-produit` : lien à n'activer qu'à la publication de A (D38) |
| BL-43-3 | #43 | `4aa305e` (E3 à E7), `216f324` (E3 de-ch), `175a9d5` (E6 dans la FAQ n° 3, JSON-LD compris) | `content/blog/fr/migrer-ancien-packshotcreator.json`, `content/blog/en/migrate-legacy-packshotcreator-studio.json`, `content/blog/de-ch/altes-packshotcreator-studio-migrieren.json` | AI Retoucher décrit d'après Orbitvu (E6) ; retrait de « Elle n'invente rien » (E7) ; répartition fournisseur / déployeur et lignes directrices de la Commission à la place de l'analyse Orbitvu (E3 à E5) ; périmètre suisse en de-ch | Formulations visées présentes dans les 3 langues (« sans altérer ses caractéristiques », « n'invente rien », lien `orbitvu.com/blog/eu-ai-act…`). #71 a modifié ces 3 fichiers : la fusion simulée de #43 y est en conflit | Réécriture sur `main`, revalidée contre le texte final de A (#59) ; validation de Sébastien ; de-ch selon D38 | Publication de A (cohérence, renvoi) ; validation de Sébastien |
| BL-43-4 | #43 | `175a9d5` (tête, description) ; `4aa305e` (JOURNAL de branche) | Description de #43 ; `docs/seo-geo/JOURNAL.md` de la branche `seo/ai-act-images-produit-2026-09-28` | Justification D16 de la création de A | Archivée dans cette entrée et dans le commentaire d'archivage de #43 ; absente de #59 (description et JOURNAL de branche) | À la fusion de #59, renvoyer à cette entrée ; toute nouvelle mesure sur le texte restructuré relève d'une décision de Laurent | #59 |
| BL-53-1 | #53 | `2d4e66d` | `content/blog/fr/ai-act-images-produit.json` de la branche `seo/ai-act-illustrations-2026-09-29`, bloc « Une image retouchée ou générée par IA : faut-il la signaler ? » | Arbre pédagogique en 4 questions | `OPTIONAL / IDEA ONLY` ; non intégré à A | Si Laurent le décide : reconstruire depuis la version juridique finale de A, sans reprendre l'ancien HTML/CSS (sa question 3 omet « entités, événements » de la liste fermée de l'art. 3(60)) | Décision de Laurent ; A publié |

**Effet attendu** — Aucun sur le site : documentation seule. Le cluster ne garde que #59 (A) et #60 (S) ouvertes.

**Vérifié**
- Fresh check du 01/10 : `main` `8ec89c1` ; têtes inchangées depuis la revue du 30/09 : #43 `175a9d5`, #53 `9e86b9b`, #61 `250e34a`, #62 `8f2f42b`, #63 `b6495d1`, sans nouveau commentaire ; #59 `80489cf`, #60 `d5182e7`.
- Mesures D16 du 28/09 extraites par l'API GitHub de la description de #43, sans retouche ; résumé du JOURNAL de branche relu au commit `4aa305e`.
- Numérotation : D39 (#66, branche `claude/exciting-cannon-x48wud`) et D40 (#65, branche `claude/busy-gauss-cfe9m8`) sont pris ; aucune occurrence de D41 ni D42 sur les branches distantes au 01/10.
- `main` `8ec89c1` : formulations visées par E1, E2, E3 à E7 présentes ; gabarit sans `og:url`, `og:site_name`, `og:locale` ni `twitter` ; fusion simulée (`git merge-tree`) de #43 : conflits dans `ETAT.md`, `JOURNAL.md` et les 3 articles « migrer », `page.tsx` sans conflit.
- Matière réintégrée de B, C, D toujours présente dans A à `80489cf` (points 92, 113, 114, 117, 127 et 129 ; L2133-2 ; loi 2023-451 ; tableau des plateformes ; WebP ; C2PA ; 7 FAQ).

- Après fermeture (`git ls-remote`, API GitHub) : les 5 PR à l'état `closed`, `merged = false` ; les 5 branches distantes et `refs/pull/{43,53,61,62,63}/head` pointent sur les têtes ci-dessus ; commits `4aa305e`, `216f324`, `175a9d5`, `2d4e66d` lisibles ; #59 `80489cf` et #60 `d5182e7` inchangées ; `main` `8ec89c1` sans article B, C ou D.
- Commentaire d'archivage de #43 relu par l'API : bloc D16 identique à la description de #43.

**Supposé** — Aucune hypothèse non vérifiée retenue.

**Non regardé** — Aucune nouvelle mesure D16, aucune recherche juridique, aucun crédit payant. #59 et #60 non modifiées. Preview Vercel. Branches distantes conservées : suppression non décidée.

**Clôture du 01/10/2026** (UTC), dans cet ordre :

| PR | Commentaire | Fermée sans fusion |
|---|---|---|
| #43 | archivage D16 et backlog : https://github.com/Sebeth7/packshot-creator/pull/43#issuecomment-5925993020 | — |
| #53 | https://github.com/Sebeth7/packshot-creator/pull/53#issuecomment-5925995805 | 06:28:56 |
| #61 | https://github.com/Sebeth7/packshot-creator/pull/61#issuecomment-5926001091 | 06:29:35 |
| #62 | https://github.com/Sebeth7/packshot-creator/pull/62#issuecomment-5926002712 | 06:29:36 |
| #63 | https://github.com/Sebeth7/packshot-creator/pull/63#issuecomment-5926004339 | 06:29:37 |
| #43 | fermeture : https://github.com/Sebeth7/packshot-creator/pull/43#issuecomment-5926007409 | 06:29:50 |

**Suite** — Suppression éventuelle des branches de #61, #62, #63 après le GO de Sébastien sur #59 ; celle de #53 et #43 après exécution ou abandon explicite du backlog. BL-43-1 à BL-43-3 : chantiers distincts, sur décision.

---

## 2026-10-01 · D36 — #68 resynchronisée avec `main` après #69 et #71, Worker de production relu (R5) · Claude de Laurent

**Chantier** : D36 | **PR** : #68, brouillon, non fusionnée | **Base** : `main` `8ec89c1` | **Fusion** : `008cee1`

**Quoi** — `main` `8ec89c1` (#69, #71) fusionné dans la branche de #68, sans rebase. Seul conflit : le haut de ce journal, résolu sans perte. Entrées conservées, plus récentes en premier : #71, #69, D36. Le diff net de #68 contre `main` reste de 3 fichiers (+223) : Worker, test Worker (27 cas), JOURNAL. Rien n'est déployé.

**Pourquoi** — Préparer la séquence D36 : Worker d'abord, puis origine (#67).

**Fichiers** — `docs/seo-geo/JOURNAL.md` (fusion et cette entrée). Worker et test inchangés.

**Effet attendu** — Aucun.

**Vérifié** —
- R5, lecture seule par l'API Cloudflare :
  - version déployée `27b0153c-5516-432a-91a4-20cddce250ca`, à 100 %, le 25/09 à 05:07 UTC, par `wrangler` ;
  - script de production identique à `main`, après retrait des commentaires et de 3 lignes d'assistant `__name22` ajoutées par wrangler au bundling ;
  - la suite Worker de `main` (176 tests) passe sur le code de production comme sur celui de `main`.
- Entre `main` et #68, seul écart fonctionnel : le bloc D36 de 4 lignes.
- Inertie, avec le Worker de `main` et celui de #68 contre l'origine de production réelle :
  - 39 URL, 0 écart ;
  - 64 réponses de l'origine, 0 marquée, 0 portant `X-Robots-Tag` ;
  - les 3 branches 410 conservent `noindex, nofollow`.
- Academy (#71), identique avec les deux Worker :
  - sous-pages FR, versions EN et de-ch, articles OPCO et `/en/trainings-product-photography` : 301 vers `/fr/academy` ;
  - `/academy/<slug>` sans préfixe : 301 vers `/fr/academy/<slug>` par le Worker, puis vers `/fr/academy` par l'origine (deux sauts déjà présents sur `main`, hors périmètre).
- Contrôles :
  - Vitest 373/373 (346 sur `main`) ;
  - `tsc`, `node --check`, ESLint (0 message) ;
  - `verifier-json` : 180 JSON valides ;
  - `npx next build` vert, aucun `headers()`.

**Supposé** — Rien.

**Non regardé** — #67 : non modifiée. `www` : pas de contrôle navigateur.

**Suite** — GO de Laurent pour : fusion de #68, déploiement du Worker depuis `main`, contrôle de `www`. Ensuite seulement : resynchronisation de #67 et nouveau GO.

---

## 2026-10-01 · Mode — contrôle final avant envoi à Sébastien (Qualiopi, lien Academy, V5) · Claude de Laurent

**Chantier** : substitution de page, extension à Mode (D39) | **PR** : #66, brouillon, NE PAS FUSIONNER | **Commit contrôlé** : `0b9bbef`

**Quoi** — Contrôle seul, aucun code modifié ici. `0b9bbef` (autre session Claude de Laurent) remplace dans `packshotMode.accompagnement.formation.text` « Sysnext (PackshotCreator), organisme de formation certifié Qualiopi, forme vos équipes… » par « Sysnext, organisme de formation certifié Qualiopi, forme vos équipes… » : la certification est attribuée à Sysnext seul. Phrase OPCO inchangée (« possible selon votre situation »). La valeur homonyme de F5 (`packshotEcommerce.r8.formation.text`) n'est pas touchée.

**Pourquoi** — Consigne de Laurent du 01/10 : certification attribuée sans ambiguïté à Sysnext ; aucune « PackshotCreator Academy » certifiée ; ni prix, ni durée, ni formation IA, ni simulateur OPCO, ni promesse de financement.

**Fichiers** — `docs/seo-geo/JOURNAL.md`.

**Vérifié** — Lien de la carte « Formation » : `<Link href="/academy" locale={epingle('/academy')}>`, même implémentation que F5 après #71 ; rendu `/fr/academy`, en 200 ; aucun lien vers `simulateur-opco`. Lien « Academy » du bloc « Explorez » : `locale={epingle(l.href)}`, rendu `/fr/academy`. Légende V5 : « Illustration synthétique de deux variantes colorées. » 5/5 illustrations chargées à 1440 et 390 px. `verifier-json`, `tsc`, Vitest (dont `academy-fr-only`), `next build`, `seo.spec` `packshot-mode`, `smoke.mjs` : verts sur le build local.
**Supposé** — Sysnext est l'entité titulaire de la certification Qualiopi : formulation reprise des textes du site et de #71, non recontrôlée sur le certificat.
**Non regardé** — Textes Qualiopi hors du bloc `packshotMode` (F5, accueil, contact, blog), hors consigne.

**Suite** — Envoi de la Preview à Sébastien par Laurent.

---

## 2026-09-30 · Mode — `main` (#71) fusionnée dans #66, liens formation alignés · Claude de Laurent

**Chantier** : substitution de page, extension à Mode (D39) | **PR** : #66, brouillon, NE PAS FUSIONNER | **Base fusionnée** : `main` `8ec89c1` (#71)

**Quoi** — Fusion de `main` dans la branche de #66 : conflit de `JOURNAL.md` seulement, les deux entrées sont conservées. #71 retire les routes `/academy/formations-packshot` et `/academy/simulateur-opco`, vers lesquelles la carte « Formation » de la page Mode pointait : le build ne passait plus. Alignement identique à celui que #71 applique à F5 :
- lien unique vers `/academy`, libellé « Voir nos formations » ; lien « Simuler une prise en charge OPCO » retiré ;
- `packshotMode.accompagnement.formation.text` : « PackshotCreator Academy, organisme de formation certifié Qualiopi, forme vos opérateurs à la prise de vue sur studio Orbitvu, sur plusieurs niveaux. » devient « Sysnext (PackshotCreator), organisme de formation certifié Qualiopi, forme vos équipes à la prise en main et à la maîtrise des studios Orbitvu, à distance ou en présentiel. » ; la phrase OPCO est inchangée.

**Pourquoi** — Texte de F5 validé par Sébastien dans #71 (audit Qualiopi du 16/10/2026, le catalogue fait foi) ; seul changement textuel de la page Mode, hors visuels.

**Fichiers** — `components/landings/PackshotMode.tsx`, `messages/fr.json` (bloc `packshotMode.accompagnement.formation`), `docs/seo-geo/JOURNAL.md`.

**Vérifié** — voir la PR #66 (contrôles rejoués après fusion).
**Supposé** — Aucun.
**Non regardé** — Preview (SSO) ; `www` (R4).

**Suite** — Passe de Sébastien sur la Preview.

---

## 2026-10-01 · Inter auto-hébergée, itération 2 : sous-ensembles et repli d'origine · Claude de Laurent

**Chantier** : fiabilité du build, suite de l'entrée du 30/09 ci-dessous | **PR** : #72, brouillon, non fusionnée | **Base** : `main` `8ec89c1`

**Quoi** — Les fichiers servis passent des fichiers officiels complets (114 840 o) à des sous-ensembles dérivés de ces fichiers (34 200 o). Les sources officielles restent archivées, non servies, dans `app/fonts/inter/source/`. La police de repli `Inter Fallback` reprend les métriques que `next/font/google` générait avant #72.

**Pourquoi** — Revue de Laurent du 01/10 : principe validé, poids des fichiers complets non validé (+90 384 o par page). Un second écart a été trouvé pendant l'itération. Le repli recalculé par `next/font/local` (`size-adjust` 111,36 % contre 107,12 % sur `main`), mesuré avec une police « Arial » simulée, faisait passer le CLS au chargement de `/fr/packshot-mode` à 390 px de 0,0001 à 0,0339. Il élargissait aussi de 5,06 px les titres contenant « → ». Cet écart existait depuis la première version de #72 ; cette page n'avait pas été mesurée.

**Fichiers** — `app/fonts/inter/Inter-Bold-subset.woff2`, `app/fonts/inter/Inter-SemiBold-subset.woff2`, `app/fonts/inter/subset-unicodes.txt`, `app/fonts/inter-fallback.css` (nouveaux) ; `app/fonts/inter/source/Inter-Bold.woff2`, `app/fonts/inter/source/Inter-SemiBold.woff2` (déplacés, inchangés) ; `app/fonts/inter.ts`, `app/etude-clients-2026/layout.tsx`, `app/fonts/inter/PROVENANCE.md`. `LICENSE.txt` inchangé.

**Sous-ensemble** — Commande `pyftsubset` (fontTools 4.66.1, brotli 1.2.0) dans `PROVENANCE.md`. 359 codepoints :
- Latin-1 tel que Google le servait (225) ;
- Latin étendu A (124) ;
- Ș ș Ț ț et ẞ (5) ;
- U+202F, U+2007, U+2010-2012 (5).

`unicode-range` déclare 354 codepoints : les 5 derniers, absents des fichiers Google, restent au repli comme « → ». Toutes les fonctionnalités OpenType, les métriques et la table `name` sont conservées.

Choix de couverture, mesuré en Bold :

| Couverture | Taille |
|---|---|
| Latin-1 seul | 29 924 o |
| Retenue (Latin-1 + Latin étendu A + ș ț ẞ) | 34 200 o |
| Latin-1 + tout le latin-ext Google | 57 480 o |
| Toute l'ancienne couverture Google | 78 424 o |

Passent d'Inter au repli : Latin étendu B hors Ș ș Ț ț, l'alphabet phonétique, le vietnamien, le grec et le cyrillique. Aucun n'apparaît dans le texte rendu en Inter : 115 caractères distincts sur les 357 pages prérendues, plus `/etude-clients-2026` et `/roi-pro`.

**Poids de police téléchargé** (mesuré à froid, identique à 1440 et 390 px) :

| Route | `main` `8ec89c1` | Fichiers complets | Sous-ensembles | Écart avec `main` |
|---|---|---|---|---|
| Page standard `[lang]` | 24 456 o | 114 840 o | 34 200 o | +9 744 o |
| Routes ROI | 24 456 o | 114 840 o | 34 200 o | +9 744 o |
| `/etude-clients-2026` | 48 432 o | 229 652 o | 68 400 o | +19 968 o |

Un seul fichier préchargé par page (2 sur l'étude, contre 1 sur `main`).

**Vérifié** —
- **Sous-ensembles.** SHA-256 identiques sur deux exécutions. La `cmap` correspond exactement à `subset-unicodes.txt`. Métriques verticales, `xAvgCharWidth` et avances identiques à la source. Façonnage HarfBuzz identique au fichier complet sur 3 019 chaînes (corpus du site et chaînes de test FR, DE, prix, ponctuation), en 700 et en 600.
- **Builds.** `npx next build` vert avec réseau, et vert dans un espace de noms sans réseau (Google et npm injoignables, contrôlé par `curl`) : 371/371 pages. 0 `next/font/google` dans le code ; 0 référence Google Fonts dans `.next` hors `@vercel/og`. CSS compilée identique à `main` hors `@font-face` et classes de module de police.
- **Parité, `main` contre branche.** 19 pages en 1440 et 390 px, dont `/fr/packshot-mode`, les routes ROI et l'étude. Statuts 200. Hauteurs de page identiques. 1 360 éléments rendus en Inter : écart max de largeur de texte 0,016 px, 0 retour à la ligne modifié, graisse, taille et interligne identiques. Écart max par catégorie : H1/H2 (286) 0,016 px ; accents (420) 0,016 px ; allemand (50) 0,000 px ; prix en € (18) 0,001 px ; ponctuation (332) 0,016 px ; titres à « → » ou U+202F (12) 0,000 px.
- **Police réellement utilisée par nœud** (`CSS.getPlatformFontsForNode`), identique sur `main` et la branche :
  - en Inter : chaînes de test FR, DE (dont ẞ), européennes (Ł Š Ő Ş Ț Ÿ), ponctuation, U+00A0 et U+202F ;
  - au repli : « → », U+2010 et U+2011.
- **CLS au remplacement de police** (police retardée de 1,5 s ; 9 pages × 2 largeurs × 3 mesures) : identique à `main`, sans Arial comme avec Arial simulé. Seule exception : `/etude-clients-2026` à 390 px, 0,0084 contre 0,0083 sur une mesure sur trois. Titres à « → » avec Arial simulé : 0,00 px d'écart.
- **Captures.** Différences confinées à l'anticrénelage des bords des lettres Inter, identiques au pixel près à celles de la version complète sur les pages sans animation. Sur les accueils, s'y ajoutent les zones animées, présentes aussi entre deux rendus de `main`.
- **Tests.**
  - `verifier-json` : 180 fichiers valides.
  - `tsc` : 0 erreur.
  - Vitest : 17 fichiers, 346/346.
  - ESLint ciblé : 0 erreur, 0 avertissement.
  - `smoke.mjs` en local : vert, identique à `main`.
  - Playwright (`seo`, `responsive`, `mobile-overflow`, `language-switch`, `internal-links`, `roi-calculator`) : 279 réussis et 46 échecs sur `main` comme sur la branche, listes identiques.

**Supposé** — Que la police Arial réelle de Windows et macOS donne les mêmes résultats que Liberation Sans renommée « Arial » : ses chasses sont compatibles avec Arial. Qu'un contenu futur reste en alphabet latin européen ; sinon, les caractères hors couverture passent au repli, comme « → » aujourd'hui.

**Non regardé** — Firefox et Safari ; le Preview Vercel (jeton de contournement non transmis) ; `www` derrière Cloudflare ; Lighthouse ; les réponses générées du calculateur ROI.

**Suite** — Après fusion : `smoke.mjs` sur `sysnext.vercel.app`, puis contrôle dans Chrome sur `www` (onglet Réseau : un seul `Inter_Bold_subset*.woff2` de 34 200 o, aucune requête Google Fonts). Pour ajouter un caractère : `subset-unicodes.txt`, relancer la commande de `PROVENANCE.md`, puis mettre à jour `unicode-range` dans les deux appels. Rollback : `git revert -m 1 <commit de fusion de #72>` puis push sur `main`.

---

## 2026-09-30 · Inter auto-hébergée : le build ne dépend plus de Google Fonts · Claude de Laurent

**Chantier** : hors chantier SEO — fiabilité du build, demande de Sébastien relayée par Laurent | **PR** : #72, brouillon, non fusionnée | **Commit** : `2a587ad` | **Base** : `main` `a8c85ca` (#69), synchronisée par fusion avec `main` `8ec89c1` (#71)

**Quoi** — Les 5 appels `next/font/google` (Inter) remplacés par `next/font/local` sur les fichiers officiels Inter 4.1, versionnés dans `app/fonts/inter/` avec leur licence. `--font-inter`, `--font-heading` et la pile système du corps inchangés.

**Pourquoi** — Incident du 30/09 : build Next.js/Vercel en échec intermittent (`Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'`), contourné par un redéploiement. Ce module interne n'existe que pour le chargeur Google de Turbopack, qui télécharge à chaque build 2 feuilles CSS (`fonts.googleapis.com`) et 14 fichiers `woff2` (`fonts.gstatic.com`). Reproduit : `main` construit sans réseau échoue (« Failed to fetch `Inter` from Google Fonts », 2 erreurs). Le message exact du 30/09 n'a pas été reproduit.

**Constat de périmètre** — La consigne supposait un seul import. Il y en avait 5 : `app/[lang]/layout.tsx`, `app/calculateur-roi/layout.tsx`, `app/roi-preview/layout.tsx`, `app/roi-pro/layout.tsx` (Inter 700) et `app/etude-clients-2026/layout.tsx` (Inter 400, 500, 600, 700). Tous remplacés : un seul restant aurait maintenu la dépendance. Les 4 derniers sont signalés à Sébastien dans `.github/CODEOWNERS` ; changement limité à la déclaration de police.

**Police** — Source : dépôt officiel `rsms/inter`, tag `v4.1`, `docs/font-files/` ; SHA-256 identiques sur `rsms.me/inter/font-files/` ; table `name` : `Version 4.001;git-9221beed3`. Licence : SIL OFL 1.1, `LICENSE.txt` du tag, aucun nom réservé. `Inter-Bold.woff2` 700 normal, 114 840 o, `fa888127…8d95ea` ; `Inter-SemiBold.woff2` 600 normal, 114 812 o, `5cb7103e…78a301` (détail : `app/fonts/inter/PROVENANCE.md`). Fichier statique 700 retenu contre le variable (352 240 o) : plus petit, et il reproduit la règle actuelle (une seule graisse déclarée, tout `font-heading` en Bold). SemiBold ajouté pour `/etude-clients-2026` seulement : `SurveyForm.tsx` l. 110 et 542 y rendent du 600 ; 400 et 500 n'y sont pas rendus.

**Fichiers** — `app/fonts/inter.ts` (nouveau), `app/fonts/inter/{Inter-Bold.woff2, Inter-SemiBold.woff2, LICENSE.txt, PROVENANCE.md}` (nouveaux), `app/[lang]/layout.tsx`, `app/calculateur-roi/layout.tsx`, `app/roi-preview/layout.tsx`, `app/roi-pro/layout.tsx`, `app/etude-clients-2026/layout.tsx`

**Effet attendu** — Aucun effet visible ni SEO recherché. Le build ne fait plus aucune requête de police : ce chemin d'échec disparaît. Une autre cause d'échec intermittent de Vercel resterait possible.

**Vérifié** —
- Recherche complète : 0 `next/font/google` dans le code après, 5 avant. Aucune requête Google Fonts au runtime ni avant ni après (auto-hébergement déjà fait par `next/font`). Seules références restantes dans `.next` : la bibliothèque `@vercel/og` (route `/api/og`, exécution à la demande), déjà présentes avant.
- `npx next build` dans un espace de noms réseau vide (`unshare -n`, loopback seul ; Google, npm et DNS injoignables, contrôlé par `curl`) : **vert**, 383/383 pages sur la base `a8c85ca`, 371/371 après fusion de `8ec89c1`. `main` dans les mêmes conditions, `a8c85ca` comme `8ec89c1` : **échec**.
- Build : 14 `woff2` émis (316 568 o) avant ; 2 (229 652 o) après. Préchargement : 1 fichier par page avant et après. `/fr`, `/en`, `/de-ch`, blog, ROI : 24 456 o avant (sous-ensemble latin Google), 114 840 o après ; `/etude-clients-2026` : 48 432 o avant, 229 652 o (2 fichiers) après.
- CSS compilée identique hors `@font-face` et classes de module de police.
- `unicode-range` : Inter limitée aux 1 622 caractères que les 7 fichiers Google contenaient réellement. Sans cette limite, « → » (4 titres, 5 pages) passait du repli Arial à Inter, et l'espace fine insécable U+202F des prix (« 1 830 €/mois ») changeait de largeur.
- Parité, `main` (`next start` :3100) contre branche (:3101), Chromium, 1440 et 390 px : `/fr`, `/en`, `/de-ch`, `/fr/blog/photographie-2d-de-produits`, `/fr/blog/8-defis-prodution-contenu-visuel`, `/fr/studio-photo/alphashot-pro-g2`, `/fr/contact`, `/fr/packshot-mode`, `/calculateur-roi`, `/etude-clients-2026`, `/roi-pro`, plus les 8 pages à « → » ou U+202F. Statuts 200 ; police calculée, graisse, taille et hauteur de ligne identiques ; hauteur de document identique partout ; étendue réelle du texte de 1 382 éléments rendus en Inter : écart max 0,02 px (H1/H2 : 290 mesurés, 0,02 px), aucun retour à la ligne modifié.
- Captures : sur les pages sans animation, 100 % des pixels différents sont dans le texte Inter, écart max 60 à 95/255 (anticrénelage des contours ; les deux versions 4.001 diffèrent par leurs points de contour, avances identiques sur les 230 caractères latins). Sur les accueils, écarts supplémentaires dans le tableau de bord animé et la rangée de logos, présents aussi entre deux rendus de `main`.
- Façonnage HarfBuzz des 3 188 chaînes rendues en Inter sur les 369 pages prérendues : identique, sauf 2 cas. « → » : traité par la limite `unicode-range` ci-dessus. « 3x3m » (`/fr|en|de-ch/studio-photo/fashion-studio`) : la version Google remplace « x » entre deux chiffres par le glyphe `multiply.case`, Inter 4.1 non ; sur la page, le compteur animé rend « 3 » et « x3m » dans des nœuds séparés, sans substitution dans les deux cas : capture et largeur identiques.
- Repli (police affichée avant chargement d'Inter, et pour les caractères hors couverture) : `size-adjust` d'Arial 107,12 % avant (métriques Google), 111,36 % après (calculé sur le fichier Bold). Mesuré avec une police « Arial » simulée (Liberation Sans renommée, bac à sable uniquement) : CLS au remplacement, police retardée de 1,5 s, égal ou inférieur sur 8 couples page × largeur (`/fr` 1440 : 0,0161 → 0,0002) ; les flèches des 4 titres concernés, rendues par ce repli, élargissent le titre de 5,06 px (H2 `/fr|en|de-ch/industrie`, 1440), 3,06 px (390), 1,72 px et 0,86 px (H3 `/fr|en/blog/ia-photo-produit-guide-2026`), sans retour à la ligne modifié.
- Après fusion de `8ec89c1` : `node scripts/seo/verifier-json.mjs` : 180 fichiers valides. `npx tsc --noEmit` : 0 erreur. Vitest : 17 fichiers, 346/346. ESLint sur les 6 fichiers TS/TSX touchés : 0 erreur, 0 avertissement. `node scripts/seo/smoke.mjs` sur `main` et sur la branche en local : vert, 17 pages, sortie identique. Étendue du texte rendu en Inter recontrôlée sur cette base : 1 358 éléments, écart max 0,02 px.
- Playwright, Chromium, `seo`, `responsive`, `mobile-overflow`, `language-switch`, `internal-links`, `roi-calculator` : sur `a8c85ca`, `main` et branche 287 réussis, 45 échecs ; sur `8ec89c1`, `main` et branche 279 réussis, 46 échecs. Listes d'échecs identiques entre `main` et branche à chaque fois (échecs préexistants).
- PR ouvertes : aucune ne touche `globals.css`, les polices ni `package*.json`. #71 (Sébastien, ouverte à 20:32 UTC, fusionnée ensuite dans `main` `8ec89c1`) modifiait `app/[lang]/layout.tsx` l. 31-32 : fusionnée dans cette branche, fusion automatique de ce fichier, seul conflit au haut de ce journal.

**Supposé** — [Inférence] Que l'échec observé sur Vercel passait par le chargeur Google de Turbopack : le module `@vercel/turbopack-next/internal/font/google/font` n'appartient qu'à ce chemin (chaîne présente dans le binaire `@next/swc`, à côté de son équivalent `font/local`). Que Chrome sous Windows et macOS rende comme le Chromium de ce conteneur, repli mis à part (mesuré avec une police simulée).

**Non regardé** — Firefox et Safari ; un Preview Vercel (jeton de contournement non transmis) ; `www` derrière Cloudflare ; Lighthouse ; `/roi-preview` en capture (même layout que `/calculateur-roi`) ; les ~360 autres pages en capture (couvertes seulement par le façonnage de leur texte).

**Suite** — Poids : +90 384 o au premier chargement de chaque page (mis en cache ensuite), +181 220 o sur `/etude-clients-2026`. Option documentée, non appliquée : sous-ensemble du fichier officiel limité aux 1 622 caractères (78 372 o) ou au seul latin (31 432 o) — fichier dérivé, SHA-256 différent de la source, à décider par Laurent. Rollback : `git revert -m 1 <commit de fusion de #72>` puis push sur `main` (retour en ~3 minutes), aucun réglage Vercel en jeu. Après fusion : contrôle Vercel du build et `smoke.mjs` sur `sysnext.vercel.app` ; dans Chrome sur `www`, onglet Réseau : un seul `Inter_Bold-*.woff2`, aucune requête Google Fonts.

---

## 2026-09-30 · Academy réduite au catalogue Qualiopi, textes formation alignés · Claude de Sébastien

**Chantier** : hors chantier, demande directe de Sébastien (audit de surveillance Qualiopi du 16/10/2026) | **PR** : #71 | **Commit** : `fc6c9c6`

**Quoi** — `/fr/academy` devient une page simple qui renvoie au catalogue de formation (deux boutons Essential / Master, un lien catalogue, la mention de certification). Elle est servie en FR uniquement. Les sous-pages, le simulateur OPCO et deux articles consacrés à l'ancienne offre sont supprimés et redirigés en 301 vers `/fr/academy`. Les textes du reste du site sont alignés sur l'offre réelle : aucune formation IA ou e-learning, aucune formation incluse à l'achat, plus de prix ni de niveaux, plus de promesse « OPCO 100 % ».

**Pourquoi** — l'auditeur compare le site au catalogue (https://packshotcreator.catalogueformpro.com/), qui fait foi. Le site affichait 6 formations, des durées de 14 h et 21 h et des prix (850 € HT pour 7 h, 1 100 à 1 800 €) qui contredisent les deux seules offres du catalogue : Essential, 4 h à distance, 850 € HT ; Master, 7 h en présentiel, 1 500 € HT. Il annonçait aussi des formations IA et e-learning retirées, et des formations « incluses » alors qu'elles sont toujours facturées à part (Sébastien, 30/09). Trafic GSC sur 90 jours de toutes les pages academy : 7 clics, soit environ 28 par an. Les deux articles redirigés : 0 clic.

**Fichiers** —
- **Page et redirections :** `app/[lang]/academy/page.tsx` (réécrite) et `next.config.ts` (9 redirections 301 ajoutées, 1 réorientée).
- **Supprimés :**
  - pages academy : `app/[lang]/academy/{[slug],calendrier,formations-ia,formations-packshot,simulateur-opco}` ;
  - données et simulateur : `components/simulators/opco/`, `content/formations/`, `lib/formations.ts` ;
  - articles : `app/[lang]/blog/{financement-formation-opco-…,formation-photo-produit-professionnelle-…}`.
- **Navigation et SEO :** `components/layout/{Header,Footer}.tsx`, `i18n/{routing,deChCoverage}.ts`, `app/sitemap.ts`, `lib/{seo-config,blog}.ts`, `components/seo/SchemaOrg.tsx` (`courseSchema` retiré), `public/llms.txt`.
- **Textes :**
  - libellés d'interface : `messages/{fr,en,de-ch}.json` ;
  - FAQ formation des fiches machines : `components/calculators/ROICalculator/lib/machines.ts` (texte seul, aucun calcul touché) ;
  - pages : `app/[lang]/studio-photo/[slug]`, `ia-photo-produit`, `industrie`, `guide`, `not-found`, `layout`, et `blog/page.tsx` ;
  - articles : 7 à page dédiée et 23 fichiers JSON ;
  - `data/secteurs.ts`, `components/landings/PackshotEcommerce.tsx`.
- **Tests :** `lib/__tests__/academy-fr-only.test.ts` (nouveau), `e2e/{anchors,cta-destinations,redirections,seo}.spec.ts`, `e2e/opco-simulator.spec.ts` (supprimé).

**Effet attendu** — dès le déploiement, plus rien sur le site ne contredit le catalogue. Google remplacera les anciennes URL en quelques jours à quelques semaines. D'ici là, un extrait de recherche peut encore afficher un ancien titre, mais le clic mène à `/fr/academy`.

**Vérifié** :
- Build et tests : `npx tsc --noEmit` et `npx next build` verts ; Vitest 346 tests sur 346, dont 4 nouveaux sur l'épinglage FR.
- Redirections sur `next start` local : 25 anciennes URL (FR, EN, DE-CH, sous-pages, fiches, les deux articles, `/en/trainings-product-photography`) répondent en 301 vers `/fr/academy` en un saut, query string conservée. Test e2e `redirections.spec.ts` : bloc academy 12 sur 12.
- Page : hreflang limité à `fr`, `fr-CH` et `x-default`, canonical `/fr/academy`, aucun noindex, JSON-LD Organization + BreadcrumbList.
- Liens et contenu rendu :
  - dans les 359 pages HTML prérendues, aucun lien vers `/en/academy`, `/de-ch/academy`, `/fr/academy/*` ou vers les articles supprimés ; 869 liens pointent directement sur `/fr/academy` ;
  - dans leur texte, aucune occurrence de « formation incluse », « OPCO 100 % », « formations IA », e-learning ou blended ;
  - sitemap : 308 URL, `/fr/academy` seule pour la section.
- Catalogue et rendu visuel : les trois liens catalogue ouvrent la bonne fiche (vérifié le 30/09 : titres « Essential Training Distanciel - Version 2026 » et « Master Training Présentiel - Version 2026 ») ; rendu Playwright à 1440 et 390 px, sans débordement horizontal.

**Supposé** : l'entité certifiée est Sysnext (Sébastien, 30/09). La mention « La certification qualité a été délivrée au titre de la catégorie d'action suivante : ACTIONS DE FORMATION » est reprise telle que fournie. Aucun logo Qualiopi n'est affiché, Sysnext n'en a pas le droit.

**Non regardé** :
- **Cloudflare :** le Worker n'a pas été modifié. `/academy/<x>` sans langue fait deux sauts (Worker vers `/fr/academy/<x>`, puis Next vers `/fr/academy`), comme les anciennes URL legacy qui visent `/en/academy`. Le comportement sur www n'est pas contrôlé avant déploiement.
- **Pages légales (hors périmètre) :** les CGU (article 1, article 4, article 5 « PackshotCreator Academy est certifié Qualiopi ») et la politique de confidentialité citent encore le simulateur OPCO ou l'Academy comme entité certifiée.
- **Formulation « formation(s) certifiée(s) Qualiopi » :** une vingtaine d'occurrences au moins, alors que c'est l'organisme qui est certifié ; à arbitrer avec la consultante.
- **Garde-fous e2e :** les specs nécessitant un navigateur n'ont pas été lancées (navigateurs Playwright non installés).

**Suite** :
- Sébastien : corriger la fiche Master du catalogue, qui dit « souhaitant se former à distance » pour une formation en présentiel.
- À trancher :
  - le « suivi post-formation » du guide d'achat (hotline, session de suivi, accès formateur) ;
  - « Formateurs experts 10+ ans » et les témoignages Marie D. et Camille R. (comparatif Orbitvu) ;
  - l'écart « 5 000+ entreprises » (accueil) contre « plus de 500 entreprises » (guide budget).

---

## 2026-09-30 · Cluster AI Act — article Suisse : passe éditoriale (cadre de rédaction de Sébastien) · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : tête `758ad29`, puis fusion de `main` `a8c85ca` (#69, conflit du JOURNAL résolu en gardant les deux entrées ; la PR était en conflit)

**Quoi** — Réécriture de la prose pour la lisibilité, qualifications juridiques inchangées sauf la situation A (f3ebb10), resserrée. Ouverture qui répond et annonce les trois couches (droit suisse, AI Act, plateformes) ; encadré « En bref » ; 22 marqueurs ([Interprétation] 13, [Texte] 5, [Exemple direct Commission] 4) et les « NON TRANCHÉ » intégrés aux phrases ; les 5 marqueurs `[TERRAIN SÉBASTIEN — …]` retirés, aucune réponse terrain n'ayant été transmise ; les 8 cas commencent par le conseil pratique puis donnent la réponse suisse et la réponse UE ; rappel de l'article 50 en deux phrases en tête de la section UE (S reste lisible seul) ; définitions fournisseur/déployeur avant les six situations, doublon du point 12 retiré ; tableau récapitulatif réécrit (réponse d'abord) ; « label » remplacé par « mention », comme dans A ; sigles développés (LCD, LPD, PFPDT, SECO) ; 12 tirets cadratins retirés ; 1 lien de source placé près de l'affirmation (LCD). `readingTime` 18 → 20.

**Pourquoi** — Retour de Sébastien du 30/09 (textes « durs à lire ») et kit `TRANSMISSION_REDACTION_BLOG_2026-09-30`, transmis par Laurent. Situation A : interprétation de f3ebb10 à revoir (mission du 30/09, point 13).

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Point 13 des lignes directrices C(2026) 5054 relu sur le PDF de la Commission le 30/09 : « including by posting deep fakes on the globally accessible internet » ; « channels that are unforeseeable and outside their control ». La situation A vise désormais une image susceptible d'être un hypertrucage ; le rapprochement reste qualifié d'interprétation.
- Cas 4, côté UE : « La transposition à chaque retouche reste factuelle » devient « les textes consultés ne tranchent pas l'effacement d'une rayure ou d'une usure », aligné sur le cas 14 de A.
- Mots : corps éditorial 3 763 → 4 100 (même méthode que la PR) ; hausse due à l'encadré « En bref », au rappel de l'article 50 et au tableau.
- `verifier-json` 187 valides ; `tsc` vert ; Vitest 342/342 ; `next build` vert, 384 pages.
- `next start` local, 1440 et 390 px : 200, title et description inchangés, canonical inchangé, aucune balise `robots`, JSON-LD Organization, BreadcrumbList, Article (pas de FAQ, pas de FAQPage) ; hero 848 × 477 et 358 × 201, S2 et S3 662 × 372 et 358 × 201, légendes présentes ; 0 débordement ; 0 erreur de page ; 0 lien interne, 0 lien vers `/fr/packshot-e-commerce` ; aucun marqueur ni tiret cadratin au rendu.
- `e2e/seo.spec.ts` + `internal-links-all.spec.ts` en local : 243 réussis et 8 échecs avant la fusion de #71. Correction : la comparaison annoncée d'abord avec `https://sysnext.vercel.app` n'était pas valable (erreurs TLS du proxy, puis délais dépassés depuis le conteneur). Comparaison refaite sur la tête `ed39e81` (fusion de `main` `8ec89c1` poussée par une autre session) : 235 réussis, 9 échecs, liste identique à celle d'un build local de `main` `8ec89c1` (titles et descriptions hors bornes, dont `/fr/academy`, et hreflang de `/fr/packshot-bijoux`).
- Sur `ed39e81` : `verifier-json` 181 valides ; `tsc` vert ; Vitest 346/346 ; `next build` vert, 372 pages ; rendu de l'article inchangé en 1440 et 390 px.
**Supposé** — [Inférence] Le retour de Sébastien se limite à ce que cite la mission ; aucune réponse aux 5 marqueurs terrain n'existe dans les pièces transmises. Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel (SSO) ; `www` (R4) ; adaptation de-ch (D38) ; relecture par un autre lecteur : aucune ; points déjà listés « à arbitrer » dans #60 (PFPDT du 24.09.2025, labels visibles interdits par Zalando) : non ajoutés.

**Suite** — Seconde passe de Sébastien sur la Preview ; validation de la situation A (f3ebb10) ; réponses terrain éventuelles, à intégrer sans inventer.

---

## 2026-09-30 · Mode — pack visuel V1 à V5 intégré dans `/fr/packshot-mode` · Claude de Laurent

**Chantier** : substitution de page, extension à Mode (D39) | **PR** : #66, brouillon, NE PAS FUSIONNER | **Branche** : `claude/exciting-cannon-x48wud` | **HEAD avant** : `ac5698b`

**Quoi** — Cinq illustrations générées (pack du 30/09, `MODE_VISUAL_HANDOFF_2026-09-30.zip`) ajoutées à la version FR, une par section : V3 dans « collection », V2 dans « matière », V1 dans « présentations », V4 dans « au studio » (après le tableau), V5 dans « IA ». Alt et légendes repris du rapport `MODE_VISUAL_FINAL_REVIEW_2026-09-30.md`. V6 (optionnel) non retenu : hero inchangé. Aucun visuel existant retiré, aucun texte existant modifié.

**Pourquoi** — Liste « Visuels à produire » de la PR #66 ; sélection verrouillée par Laurent le 30/09 : V1, V2, V4 KEEP ; V3, V5 KEEP avec réserve ; V6 OPTIONAL.

**Fichiers** — `components/landings/PackshotMode.tsx` (composant `Illustration`, 5 figures), `messages/fr.json` (bloc `packshotMode` : 5 objets `illustration` { alt, caption } ajoutés, rien d'autre ne change), `public/images/packshot-mode/` (5 AVIF, 495 107 octets), `docs/seo-geo/JOURNAL.md`, `ETAT.md`.

**Provenance** — Illustrations générées dans ChatGPT : ni client, ni séance réelle, ni personne de l'équipe, ni preuve de performance. Chaque légende commence par « Illustration synthétique ». Les PNG sources portent un manifeste C2PA (bloc `caBX`) que les dérivés AVIF ne conservent pas ; `next/image` ré-encode de toute façon. PNG conservés hors dépôt.

**Format** — PNG 1672 × 941 → AVIF 1672 × 941 (sharp 0.34.5, qualité 60, effort 6), ratio complet, aucun recadrage. Qualité 50 écartée : grain de la maille et du denim lissé à 100 %. Servi par `next/image` en WebP : à 1440 px (w=1920, image de 1672 px) 52 à 158 Ko, 475 Ko pour les cinq ; à 390 px DPR 3 (w=1080) 27 à 86 Ko, 234 Ko. Chargement différé, aucun préchargement ajouté.

**Écarts au rapport** — Légende V5 : seule la première proposition est publiée (« Illustration synthétique de deux variantes colorées. ») ; la seconde (« ne pas la présenter comme preuve de deux articles physiques photographiés ») est une consigne d'usage, pas une légende. Apostrophes typographiques du rapport converties en apostrophes droites, usage du bloc `packshotMode` (109 droites, 0 typographique). V3 : 7 coloris au lieu de 6, accepté par le rapport. Noms de fichiers repris du pack, y compris `mode-v5-deux-coloris-reels` : le mot « reels » figure dans l'URL de l'image.

**V6** — Comparé dans le DOM du build local, sans modification de code. Desktop : une image 16:9 (576 × 325) à la place de la mosaïque carrée (576 × 576) laisse la colonne à moitié vide. Mobile : plus compact (253 px de haut contre 410). Contenu : un plateau à boîtes à lumière, ni studio Orbitvu ni packshot, alors que le chapeau présente des studios automatisés ; même manteau camel que V1, V4 et V5. Amélioration nette en desktop et en mobile non établie : hero actuel conservé.

**Vérifié** — SHA-256 des 6 PNG et du rapport conformes à `SHA256SUMS.txt` ; `npx tsc --noEmit` ; eslint `--max-warnings=0` sur les 2 fichiers de code ; `verifier-json.mjs` (186) ; Vitest 342/342 ; `npx next build` vert. Build local à 1440 et 390 px : statut 200, 5/5 illustrations chargées au ratio 1,777 (source 1,777), aucun débordement horizontal, 0 erreur console, 0 réponse 4xx/5xx, 0 image sans alt, 0 ancre cassée, 4 tableaux, FAQ 9 visibles = 9 FAQPage, 67 liens internes uniques en 200, aucun claim retiré réintroduit. HTML serveur comparé au build de `ac5698b` : title, meta description, H1, canonical, 5 hreflang, 13 balises OG/Twitter, JSON-LD (octets identiques) et 3 préchargements d'images inchangés. `/en/packshot-mode`, `/de-ch/packshot-mode`, `/fr/industrie/mode-textile`, `/fr/packshot-e-commerce`, `sitemap.xml` (325 URL) : identiques à `ac5698b` hors identifiant de build et `lastmod`. `e2e/seo.spec.ts` filtré `packshot-mode` : 26/26 (Chromium, Pixel 5). `anchors`, `internal-links`, `responsive`, `mobile-overflow` : 107/136 ; les 29 mêmes échecs sur `main` (`7ad0ca3`) et sur `ac5698b`, aucun sur Mode (`/fr`, `/fr/ia-photo-produit`, `/fr/industrie-defense`, `/fr/studios-photo-automatises`). `smoke.mjs` sur le build local : vert, 17 pages.
**Supposé** — Aucune marque tierce et aucun texte lisible dans les images : constat du rapport ; à l'œil sur les PNG, étiquettes intérieures et sac sans inscription lisible.
**Non regardé** — Preview (SSO, aucun jeton de contournement dans cette session) ; `www` (R4) ; EN et de-ch (D38) ; hub.

**Suite** — Passe de Sébastien sur la Preview ; arbitrage de Laurent sur la légende V5 et le nom du fichier V5 si besoin.

---

## 2026-09-30 · Articles de blog centrés sur grand écran · Claude de Sébastien

**Chantier** : hors chantier, demande directe de Sébastien | **PR** : #69 | **Commit** : `d570218`

**Quoi** — `lg:justify-center` sur le conteneur flex du gabarit d'article : le bloc colonne de lecture + sommaire est centré au lieu d'être collé à gauche. Largeur de lecture (65ch) inchangée.

**Pourquoi** — vide à droite de l'article, mesuré : 377 px à 1440, 617 px à 1920, contre 104 et 344 px à gauche. Le `lg:mx-0` d'origine (90f5d81, 08/02) alignait la colonne à gauche du conteneur de 1280 px.

**Fichiers** — `app/[lang]/blog/[slug]/page.tsx`

**Effet attendu** — marges symétriques dès le déploiement : 240 / 240 px à 1440, 480 / 480 à 1920.

**Vérifié** — `npx next build` vert en local. Mesure Playwright avant (sysnext.vercel.app) / après (build local), 5 articles FR / EN / DE-CH × 7 largeurs de 390 à 1920 : largeur de colonne, largeur du sommaire, hauteur de l'article, bannière identiques ; aucun débordement horizontal ; rendu identique sous 1024 px. Aucun article JSON n'est aujourd'hui sans h2 / h3, donc sans sommaire.
**Supposé** — les ~120 autres articles JSON se comportent comme les 5 mesurés : même gabarit, la largeur de colonne ne dépend pas du contenu (`flex-1` + `min-w-0` + `max-w-prose`).
**Non regardé** — les 12 articles à `page.tsx` dédiée (hors gabarit, mises en page propres) ; le hub `/blog` ; le rendu derrière Cloudflare sur www.

**Suite** — rien.

---

## 2026-09-30 · Cluster AI Act — pilier A : visuels A1 (hero) et A3 intégrés · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : tête `be1f8ae`

**Quoi** — A1 devient l'image principale de l'article (champ `image`) ; A3 est inséré dans « Cas 11 + 12 », après le paragraphe sur l'exemple de la Commission (produit réel, environnement généré), avec l'alt et la légende fixés par la mission. A2 n'est pas intégré. Aucune prose modifiée.

**Pourquoi** — Sélection visuelle verrouillée par Laurent le 30/09 (`AI_ACT_VISUAL_FINAL_REVIEW_2026-09-30.md` : A1 et A3 KEEP, A2 REJECT), en vue de la passe de Sébastien sur la Preview.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `public/images/blog/ai-act-images-produit/cover.avif`, `public/images/blog/ai-act-images-produit/produit-reel-decor-genere.avif`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38). Sur la Preview : hero, `og:image` et image de l'`Article` JSON-LD renseignés.

**Vérifié**
- Pack `AI_ACT_VISUAL_HANDOFF_2026-09-30.zip` : SHA-256 et tailles des PNG identiques au rapport (A1 `e5a4cf6d…4437b`, 1 615 385 octets ; A3 `f2f57220…8b7b2`, 1 329 657 octets). PNG sources conservés hors dépôt, non modifiés.
- Pipeline réel : le hero et les images du corps sont servis tels quels (balise `img`, sans optimiseur) ; le corpus utilise l'AVIF (112 champs `image` sur 126) et la convention `/images/blog/<slug>/cover.avif`. Dérivés AVIF 1600 × 900 sans recadrage, qualité 70, 4:4:4 : A1 78 992 octets (PSNR 43,6 dB), A3 73 246 octets (PSNR 43,9 dB) ; comparaison à 1:1 sans différence visible.
- `next start` local : les deux images en 200 `image/avif`, ratio 16:9 complet en 1440 px (hero 848 × 477, A3 662 × 372) et en 390 px (358 × 201 chacune), 0 débordement, 0 erreur de page ; 7 FAQ = FAQPage 7 ; 4 tableaux ; canonical et absence de balise `robots` inchangés ; `og:image` = URL absolue de `cover.avif` ; `Article.image` = `/images/blog/ai-act-images-produit/cover.avif`.
- `verifier-json` 187 valides ; `tsc` vert ; Vitest 342/342 ; `next build` vert, 384 pages ; `e2e/seo.spec.ts` + `internal-links-all.spec.ts` : 243 réussis, les 8 échecs préexistants de `main`, inchangés.

**Supposé** — [Inférence] Provenance : illustrations générées par IA, enregistrées `model_generated=true` le 30/09/2026 selon le rapport (source fournie, non vérifiable dans les fichiers) ; modèle, identifiant de génération et prompt non embarqués ; aucune métadonnée XMP, IPTC ou C2PA dans les PNG ni dans les AVIF. Cela repose sur des schémas observés.

**Non regardé** — Alt du hero : le gabarit impose le titre de l'article (`app/[lang]/blog/[slug]/page.tsx`) ; l'alt demandé pour A1 n'est pas applicable sans modifier ce gabarit commun, non touché. `twitter:image` : le gabarit du blog n'en émet pas par article (image générique du layout, comme tous les articles). Prise en charge de l'AVIF en `og:image` par les réseaux sociaux : non vérifiée, comportement identique au reste du corpus. Preview (SSO). EN et de-ch (D38).

**Suite** — Preview de la nouvelle tête à transmettre à Sébastien (passe finale) ; S1, S2, S3 sur #60 ; alt de hero configurable : PR de gabarit séparée si Laurent le décide.

---

## 2026-09-30 · Cluster AI Act — satellites B, C, D non créés (D16), matière indispensable réintégrée dans le pilier A · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : tête `91e96a8`

**Quoi** — Décision de pilotage de Laurent du 30/09 : `B_D16_FINAL = NO`, `C_D16_FINAL = NO`, `D_D16_FINAL = NO`. Le pilier A reprend seulement la matière indispensable au lecteur : recolorisation (nouvelle H3 « Cas 8 + 9 », section renommée « Sept situations »), phrase sur la correction de couleur « mineure », rayure et usure (cas 14), personnes réelles et synthétiques (cas 16), plateformes et métadonnées (tableau Google Merchant Center, Amazon, Zalando ; point 117 ; métadonnées perdues au réencodage WebP ; C2PA), 2 questions de FAQ, sources correspondantes. Les trois renvois à des « dossiers » futurs sont retirés ; les lignes 8 et 9 de l'index, désormais traitées en H3, aussi.

**Pourquoi** — D16/D27 appliqués par Laurent : critère 2 non rempli pour B et C (aucune demande mesurée sur l'intention réglementaire, requêtes génériques ou d'outils non assimilées) ; critère 3 non rempli pour D. Objectif : un pilier autonome suffisant, sans revenir à la version longue de #43.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38). La PR n'est pas à fusionner en l'état.

**Vérifié**
- Corps 3 437 → 4 258 mots ; FAQ 5 → 7 questions ; total 4 838 mots ; `readingTime` 17 → 20 (ratio des articles longs du blog).
- Textes repris des branches de #61, #62 et #63, déjà relus sur sources primaires le 30/09, avec leurs niveaux (Texte, Exemple direct Commission, Interprétation, Non tranché) ; aucune qualification nouvelle.
- Sérialisation JSON identique à l'original (indentation 2, UTF-8, sans retour final) ; 0 lien interne ; 0 lien vers `/fr/packshot-e-commerce` (D37).
- Contrôles : voir la PR #59 (verifier-json, tsc, Vitest, `next build`, rendu local).
**Supposé** — [Inférence] Le constat sur l'optimiseur d'images (AVIF servi avec métadonnées en 640 et 1 080 px, WebP sans métadonnées en 1 920 px) reste valable à la publication ; il date du 30/09 et vaut pour notre configuration seulement. Cela repose sur des schémas observés.
**Non regardé** — Visuels A1 et A3 : fichiers et rapport `AI_ACT_VISUAL_FINAL_REVIEW_2026-09-30.md` introuvables dans le dépôt, les branches, les artifacts et le stockage Supabase ; article Suisse (#60) inchangé, sans renvoi aux satellites ; EN et de-ch (D38) ; Preview (SSO).

**Suite** — Fermeture sans fusion recommandée pour #61, #62 et #63 ; intégration des visuels A1, A3, S1, S2 et S3 dès transmission des fichiers et du rapport ; passe finale de Sébastien.

---

## 2026-09-29 · Cluster AI Act — pilier A restructuré, PR brouillon · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `e2e1027` (post-#55 et #58 ; `37146c2` au début de la mission)

**Quoi** — Création de `content/blog/fr/ai-act-images-produit.json` depuis `main`, à partir du texte restructuré transmis par Laurent le 29/09 (≈ 3 644 mots FAQ comprise, 5 FAQ), qui remplace éditorialement la version longue de #43. Balisage adapté au format du corpus (`tldr`, `table-wrap`, FAQ dans `faqs`). Micro-corrections seulement : 6 renvois au document de travail (« article source », « article actuel ») ; section « Et en Suisse ? » réduite à une passerelle prudente (art. 2(1)(c)), sans lien actif vers l'article Suisse non publié ; 4 précisions exigées par les sources primaires (art. 3(3) « ou en service » ; art. 3(60) liste fermée ; lignes directrices §92, changements extrêmes « qui modifient le sens » ; Code, interopérabilité « des mécanismes de détection »). Liens ajoutés sur les 8 sources officielles déjà nommées.

**Pourquoi** — Mission « cluster AI Act » de Laurent (29/09) : le pilier se recentre sur l'article 50 ; les cas 3-10, 15, 17-20 et les plateformes relèvent des futurs satellites B, C et D.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json` (création), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée FR, EN et de-ch (D38). La PR n'est pas à fusionner en l'état.

**Vérifié**
- Sources primaires relues le 29/09 : règlement (UE) 2024/1689 et 2026/1744 (texte du JO via le Cellar, EUR-Lex renvoyant 202 aux scripts), lignes directrices C(2026) 5054 et projet du 8 mai 2026 (PDF), FAQ article 50, Code de bonnes pratiques (PDF), liste des autorités de surveillance (7/09/2026), dossiers Sénat et Assemblée nationale, L121-1 et L121-2 (lus par conversion, Légifrance renvoyant 403 aux scripts). A1 à A10 confirmés sur le fond ; qualifications de cas inchangées.
- `verifier-json` 187 fichiers valides ; `tsc` vert ; Vitest 342/342 ; ESLint 258 erreurs et 68 avertissements sur tout le projet, identiques à `main` (les fichiers modifiés ne sont pas analysés par ESLint) ; `next build` vert, 384 pages, après rebase sur `e2e1027`.
- `next start` local : article en 200, canonical `https://www.packshot-creator.com/fr/blog/ai-act-images-produit`, aucune balise `robots`, JSON-LD Organization, BreadcrumbList, Article (`datePublished` = `dateModified` = 2026-09-28) et FAQPage (5 = 5 visibles), URL présente au sitemap (326 URL), 0 débordement en 1440 et 390 px ; comportement identique à `generer-images-produit-ia` (pas de hreflang sans entrée `alternates.json`, pas d'image).
- Liens : 0 interne ; 9 externes, 7 en 200, EUR-Lex 202 et Légifrance 403 (défis anti-robots, non concluants depuis le conteneur).
- `e2e/seo.spec.ts` et `e2e/internal-links-all.spec.ts` sur le serveur local : 243 réussis, 8 échecs préexistants (title ou description hors bornes et hreflang de `/fr/packshot-bijoux`), métadonnées identiques à `sysnext.vercel.app`.
- Aucun lien vers `/fr/packshot-e-commerce` (D37). #43, #53 et #55 non modifiées.
**Supposé** — [Inférence] Les lignes directrices restent citables comme « publiées le 20 juillet 2026, non contraignantes » : le communiqué de la Commission parle de publication, alors que la communication C(2026) 5054 annonce une adoption formelle ultérieure, une fois toutes les versions linguistiques disponibles. Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel (SSO) ; `www.packshot-creator.com` (R4) ; versions EN et de-ch (D38) ; visuels ; relecture de la prose et de la signature par Sébastien (`01-RAYON-ACTION.md`, `content/blog/**`).

**Passe éditoriale du 30/09** (relecture humaine de Laurent, #59) — deux micro-corrections, sans changement de qualification ni de structure : introduction des sources (« Sources utilisées pour cette analyse, vérifiées au 28 septembre 2026. ») ; FAQ « Qu’est-ce qu’un hypertrucage pour une image produit ? », « notamment » retiré au profit de l'énumération fermée de l'art. 3(60) déjà employée dans le corps. `verifier-json`, `tsc` et `next build` rejoués.

**Micro-correction du 30/09, mission « fermeture D16 et micro-corrections A/S »** — section « Quand une image produit devient-elle un hypertrucage ? » : « quatre éléments » devient « quatre critères cumulatifs », avec renvoi au point 113 des lignes directrices C(2026) 5054 (« four cumulative criteria », PDF relu le 30/09). Une phrase ajoutée signale que la FAQ de la Commission (mise à jour le 24/07/2026, relue le 30/09) présente les mêmes exigences en trois critères cumulatifs, en regroupant l’objet représenté avec le critère d’existence. Aucune qualification, aucun cas et aucune structure modifiés. Le verdict D16 de B, C et D reste en attente de mesure : aucune matière n’est réintégrée dans A.

**Suite** — Passe terrain de Sébastien, revue visuelle, maillage final et traductions avant toute publication coordonnée ; liens vers les satellites B, C, D et vers l'article Suisse à activer à leur publication.

---

## 2026-09-30 · Cluster AI Act — article Suisse : visuels S1 (hero), S2 et S3 intégrés · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29` | **Base** : tête `f3ebb10`

**Quoi** — S1 devient l'image principale (champ `image`) ; S2 est inséré à la fin de « Faut-il signaler une image générée ou retouchée par IA en Suisse ? », après les trois questions (produit, personnes, contexte de diffusion) ; S3 dans « Couleur, matière, finition, dimensions, accessoires et défauts », après le paragraphe sur la matière et la finition. Alt et légendes fixés par la mission. S4 n'est pas intégré. Aucune prose modifiée ; les 5 marqueurs `[TERRAIN SÉBASTIEN — …]` restent en place.

**Pourquoi** — Sélection visuelle verrouillée par Laurent le 30/09 (`AI_ACT_VISUAL_FINAL_REVIEW_2026-09-30.md` : S1, S2, S3 KEEP, S4 HOLD), en vue de la passe de Sébastien sur la Preview.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json`, `public/images/blog/images-ia-ecommerce-suisse/cover.avif`, `public/images/blog/images-ia-ecommerce-suisse/suisse-ue-plateforme.avif`, `public/images/blog/images-ia-ecommerce-suisse/fidelite-produit.avif`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38). Sur la Preview : hero, `og:image` et image de l'`Article` JSON-LD renseignés.

**Vérifié**
- Pack `AI_ACT_VISUAL_HANDOFF_2026-09-30.zip` : SHA-256 et tailles des PNG identiques au rapport (S1 `21b3d9d2…92c66`, 485 533 octets ; S2 `e69c2030…3babd`, 239 899 octets ; S3 `34e8b02d…22461`, 398 342 octets). PNG sources conservés hors dépôt, non modifiés.
- Dérivés AVIF 1600 × 900 sans recadrage, qualité 70, 4:4:4 (même pipeline que le pilier A, convention `/images/blog/<slug>/`) : S1 18 133 octets (PSNR 48,4 dB), S2 11 043 octets (49,3 dB), S3 37 218 octets (45,9 dB) ; comparaison à 1:1 sans différence visible.
- `next start` local : les trois images en 200 `image/avif`, ratio 16:9 complet en 1440 px (hero 848 × 477, corps 662 × 372) et en 390 px (358 × 201) ; S3 garde ses quatre variantes, S2 ses trois panneaux ; 0 débordement, 0 erreur de page ; pas de FAQPage (0 FAQ) ; canonical et absence de balise `robots` inchangés ; `og:image` = URL absolue de `cover.avif` ; `Article.image` = `/images/blog/images-ia-ecommerce-suisse/cover.avif`.
- `verifier-json` 187 valides ; `tsc` vert ; Vitest 342/342 ; `next build` vert, 384 pages ; `e2e/seo.spec.ts` + `internal-links-all.spec.ts` : 243 réussis, les 8 échecs préexistants de `main`, inchangés.

**Supposé** — [Inférence] Provenance : illustrations générées par IA, enregistrées `model_generated=true` le 30/09/2026 selon le rapport (source fournie, non vérifiable dans les fichiers) ; modèle, identifiant de génération et prompt non embarqués ; aucune métadonnée XMP, IPTC ou C2PA. Cela repose sur des schémas observés.

**Non regardé** — Alt du hero : le gabarit impose le titre de l'article ; l'alt demandé pour S1 n'est pas applicable sans modifier ce gabarit commun, non touché. `twitter:image` : image générique du layout, comme tous les articles. AVIF en `og:image` sur les réseaux sociaux : non vérifié. Interprétation ajoutée par `f3ebb10` en situation A (point 13) : non modifiée, à valider avant publication. Preview (SSO). Adaptation de-ch (D38).

**Suite** — Preview de la nouvelle tête à transmettre à Sébastien, avec les 5 marqueurs terrain et la question Suisse / UE ; S4 seulement sur GO de Laurent.

---

## 2026-09-29 · Cluster AI Act — article Suisse (S), PR brouillon · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, article Suisse (S) | **PR** : #60, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/images-ia-ecommerce-suisse-2026-09-29`, indépendante du pilier A | **Base** : `main` `e2e1027`

**Quoi** — Création de `content/blog/fr/images-ia-ecommerce-suisse.json` depuis `main`, à partir du texte transmis par Laurent le 29/09 (3 301 mots de corps éditorial, 8 cas pratiques, 5 marqueurs `[TERRAIN SÉBASTIEN — …]` conservés tels quels, aucune FAQ). Micro-corrections seulement :
- S1 (chapeau) ; S2 (Zalando) et S3 (Amazon) alignés sur les pages vérifiées ; S4 (« NO EVIDENCE FOUND » remplacé, prose et tableau) ;
- renvois « dossier » et « corpus » : 20 → 1 (la formulation S4 imposée garde « corpus analysé ») ;
- Google Merchant Center (« toutes les images créées par IA générative », et non « certaines ») ;
- titre officiel de la Convention-cadre ; calendrier suisse ramené à la lettre de la source du SECO (avant-projet destiné à la consultation élaboré au printemps 2027) ; définition du déployeur alignée sur l'art. 3(4) ;
- lien vers le pilier A remplacé par un renvoi sans `href`.

Section « Sources » ajoutée, limitée aux sources utilisées (16 liens : droit suisse, guidance officielle suisse, cadre européen, plateformes, standards).

**Pourquoi** — Mission « cluster AI Act » de Laurent (29/09) : l'article Suisse donne les couches de règles à vérifier, dans l'ordre Suisse → fidélité produit → personnes → UE → plateformes.

**Fichiers** — `content/blog/fr/images-ia-ecommerce-suisse.json` (création), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38 ; version de-ch à adapter juridiquement, pas à traduire). La PR n'est pas à fusionner en l'état.

**Vérifié**
- Revue juridique ciblée des 7 points sur les sources primaires du 29/09 (Fedlex, SECO/Portail PME, ChF, OFJ, DETEC, PFPDT, règlement (UE) 2024/1689, lignes directrices). Point 3 (CO) : OMIT ; les autres sont confirmés, avec le calendrier ajusté à la lettre de la source.
- Plateformes et standards : Google Merchant Center (14743464, 6324350, 17231950), Amazon (G1881, GFXHCHYZRGJRBZA5, GGW8U76SSNTRTBX7, lus par l'API du Help Hub), Zalando (image et vidéo, mises à jour le 31/08/2026), IPTC Digital Source Type, C2PA 2.4.
- `verifier-json` 187 fichiers valides ; `tsc` vert ; Vitest 342/342 ; ESLint sans objet sur le fichier modifié (JSON) ; `next build` vert, 384 pages.
- `next start` local : article en 200, canonical `https://www.packshot-creator.com/fr/blog/images-ia-ecommerce-suisse`, aucune balise `robots`, JSON-LD Organization, BreadcrumbList et Article (`datePublished` = `dateModified` = 2026-09-29), pas de FAQPage (pas de FAQ), URL présente au sitemap (326 URL), 5 marqueurs visibles, 0 débordement en 1440 et 390 px, aucun lien vers `/fr/blog/ai-act-images-produit` ni vers `/fr/packshot-e-commerce`.
- Liens : 0 interne ; 16 externes, 15 en 200, EUR-Lex 202 (défi anti-robots, non concluant). `e2e/seo.spec.ts` et `e2e/internal-links-all.spec.ts` en local : 243 réussis, les 8 mêmes échecs préexistants que sur `main`.
**Supposé** — [Inférence] La page SECO du 23/09/2026 (texte : « au printemps 2027 ») prime sur les pages de la ChF, de l'OFJ et de l'OFCOM, qui disent encore « d'ici à la fin 2026 ». Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel (SSO) ; `www.packshot-creator.com` (R4) ; version de-ch (DSG, UWG, OR, EDÖB) ; visuels ; tableau des signatures du traité n° 225 (coe.int répond 403) ; relecture de la prose et de la signature par Sébastien.

**Passe éditoriale du 30/09** (relecture humaine de Laurent, #60) — une micro-correction : seconde occurrence, redondante, de « Une politique de plateforme n’est ni une loi suisse ni, par elle-même, une obligation de l’AI Act. » retirée après le tableau ; la première, avant Google, Amazon et Zalando, est conservée. Aucun autre passage modifié ; 5 marqueurs inchangés. `verifier-json`, `tsc` et `next build` rejoués.

**Micro-corrections du 30/09, mission « fermeture D16 et micro-corrections A/S »** — section « Quand l’AI Act peut concerner une entreprise suisse » seulement, d’après les lignes directrices C(2026) 5054 (PDF relu le 30/09) et le règlement (UE) 2024/1689 :
- fournisseur défini selon l’art. 3(3) (« développe ou fait développer […] à titre onéreux ou gratuit ») ; déployeur rattaché à l’art. 3(4) ;
- autorité du déployeur : décision d’utiliser le système et de sa manière, sans exigence de contrôle technique (point 12) ; le « contrôle effectif du système et du workflow » n’est plus présenté comme critère ;
- territorialité : art. 2(1)(a) ajouté ; points 10 (fournisseur de pays tiers, usage aval fortuit insuffisant) et 13 (déployeur de pays tiers qui prévoit la diffusion dans l’Union, y compris par publication sur l’internet accessible mondialement) ; exemple direct du point 14 (situation B ; prestataires et agence, situation D) ;
- niveaux explicites ajoutés sur chaque phrase nouvelle : [Texte], [Exemple direct Commission], [Interprétation] ; « NON TRANCHÉ » inchangé ;
- sources : points 10, 12, 13 et 14 ajoutés à la ligne des lignes directrices.
Aucun cas terrain inventé : le marqueur « workflow Suisse / UE » reste en place en attente de la question à Sébastien, et sera supprimé à défaut de réponse. Les quatre autres marqueurs sont inchangés. Aucune autre section modifiée.

**Suite** — Réponses terrain de Sébastien sur les 5 marqueurs (passe ciblée) ; revue visuelle ; maillage entrant au moment de la publication coordonnée ; lien vers le pilier A à activer à sa publication.

---

## 2026-09-30 · D36 — protection Worker, PR séparée avant #67 (voie a) · Claude de Laurent

**Chantier** : D36 | **PR** : brouillon, non fusionnée, branche `seo/d36-protection-worker-2026-09-30` | **Base** : `main` `7ad0ca3` | **Source** : `b7b9808` (#67)

**Quoi** — Le Worker seul, sans aucun changement Next. Dans le bloc qui relaie `www` vers l'origine, une réponse marquée `X-Packshot-Origin-Noindex` perd ce marqueur et `X-Robots-Tag`. Sans marqueur, rien n'est retiré. La logique de `index.js` est celle de `b7b9808`, octet pour octet. Le test `cloudflare-worker/test/d36-origine-noindex.test.ts` passe de 15 à 27 cas. **Rien n'est déployé.**

**Pourquoi** — Voie (a) retenue par Laurent le 30/09. Le Worker doit savoir retirer le noindex marqué avant que l'origine ne l'émette (fusion de #67). Sinon, `www` ne serait protégé que par l'absence des en-têtes `cf-*`, dont la transmission par Vercel n'est pas établie.

**Fichiers** — `cloudflare-worker/src/index.js` (+9), `cloudflare-worker/test/d36-origine-noindex.test.ts`, `docs/seo-geo/JOURNAL.md`.

**Effet attendu** — Aucun tant que #67 n'est pas fusionnée : l'origine n'émet pas le marqueur.

**Vérifié** —
- Inertie, avec le Worker de `main` et le Worker patché contre l'origine de production réelle :
  - 23 URL (pages, noindex existants, 404, redirections, fichiers texte, API, 2 réponses 410) ;
  - 0 écart de statut, d'en-têtes ou de corps ;
  - 40 réponses de l'origine reçues, dont 0 marquée et 0 portant `X-Robots-Tag`.
- `main` ne contient ni le marqueur ni de `headers()` dans `next.config.ts`.
- Test, 27 cas :
  - sur le Worker de `main`, seuls les 4 cas de retrait échouent ; les 23 autres passent à l'identique ;
  - couverts : 410 des trois branches (`noindex, nofollow` conservé), redirections de l'origine et du Worker, `robots.txt`, `sitemap.xml`, `llms.txt`, assets, API, hosts en passage direct et hosts legacy.
- Vitest, `tsc`, ESLint, `node --check`, `verifier-json` et `npx next build` : voir la PR.

**Supposé** — [Non vérifié] La production du Worker est identique au dépôt hors bloc D36 : resynchronisation R5 à faire avant tout déploiement.

**Non regardé** — Next, Vercel, Cloudflare, #67 : non touchés.

**Suite** — Après GO de Laurent, dans cet ordre :
1. fusion de cette PR ;
2. resynchronisation R5 ;
3. `wrangler deploy` depuis `main` ;
4. lecture du script déployé : présence de `x-packshot-origin-noindex` ;
5. contrôle de `www` inchangé ;
6. seulement ensuite, #67, après fusion de `main` dans sa branche. Deux conflits attendus :
   - le test Worker, dont #67 porte la version à 15 cas : garder celle de `main` ;
   - le haut du JOURNAL.

---

## 2026-09-30 · Mode — réécriture FR de la landing `/fr/packshot-mode` (méthode F5) · Claude de Laurent

**Chantier** : substitution de page, extension à Mode (D39) | **PR** : #66, brouillon, NE PAS FUSIONNER | **Branche** : `claude/exciting-cannon-x48wud` | **Base** : `main` `7ad0ca3`

**Quoi** — Version FR de `/fr/packshot-mode` réécrite dans un composant page-scopé, `PackshotMode.tsx` : chapeau, « En bref », sommaire, 9 sections H2 (collection, couleur/matière/tombé, présentations, internalisation, studio et équipe, IA, plateformes, studios, budget et accompagnement) et FAQ de 9 questions. EN et de-ch restent sur `PackshotLandingTemplate` avec leurs anciens messages, jusqu'à la traduction de la version FR validée (D38). Canonical, hreflang, sitemap, robots, Worker : inchangés.

**Pourquoi** — Page de 755 mots visibles (build local de `main`) et 3 FAQ, bandeau « 500+ pièces par jour / 3 s / -80 % » non sourcé et repris par les moteurs IA (dossier Mode du 30/09, hors dépôt), témoignage « Alexandre M. » non validé, Alphadesk (délisté) et Alphashot XL Pro v2 recommandés. Méthode transposée de F5 (`074189a` → `55ea992`), sans reprise de son texte.

**Fichiers** — `components/landings/PackshotMode.tsx` (nouveau), `app/[lang]/packshot-mode/page.tsx`, `messages/fr.json` (bloc `packshotMode` seul, octets identiques hors du bloc), `docs/seo-geo/JOURNAL.md`, `ETAT.md`, `DECISIONS.md`.

**Claims retirés** — 500+ pièces/jour ; 3 s par packshot ; -80 % de coûts ; « centaines de pièces par jour » (meta et bénéfices) ; témoignage « Alexandre M. » (200 références par jour, cadence multipliée par 8) ; « 3 étapes. Zéro compétence photo. » ; « tout est automatisé » ; « reproduction exacte » ; « éliminant les ombres et reflets » ; « détourage instantané » ; « La plupart des marques combinent… » ; « 20 systèmes Orbitvu » ; cartes machines (XL Pro v2, cadences « photos/jour » de `machines.ts`, XXL à 100 × 70 × 190 cm) ; Alphadesk ; image « Showroom PackshotCreator », qui ne représente pas le showroom.

**Faits utilisés** — NN/g, Baymard, Amazon G1881, Google Merchant Center 6324350 et 16989427, Zalando : relevés F5 du 28/09, datés dans la page. Dimensions Orbitvu : fiches relevées le 28/09 pour F5. Limites de l'Alphatable, de l'XXL et du Fashion Studio : fiches du site (`machines.ts`). Faits métier de Sébastien du 30/09, transmis par Laurent (prise de vue réelle, gros volumes, recolorisation, essais IA « mannequin invisible », Fashion Studio) : attribués à « PackshotCreator », sans nom. Financement, formation, accompagnement : faits de F5 (D32 pour la livraison et l'installation). Aucun prix, aucune cadence chiffrée.

**Vérifié** — `npx tsc --noEmit` ; eslint `--max-warnings=0` sur les 2 fichiers de code ; `verifier-json.mjs` (186) ; 249 messages ICU compilés ; Vitest 342/342 ; `npx next build` vert, table des routes identique à `main` (383 pages) ; `e2e/seo.spec.ts` filtré sur `packshot-mode` : 26/26 (Chromium, Pixel 5) ; `smoke.mjs` sur le build local : vert, 17 pages, sitemap 325 URL. Rendu local à 1440 et 390 px : statut 200, 1 H1, `lang="fr"`, canonical et 5 hreflang identiques à `main`, `og:url`, `og:locale`, `og:type` et `twitter:*` ajoutés en FR seulement, Organization + BreadcrumbList + FAQPage (9 questions = FAQ visible), 22 liens internes uniques en 200, 6 externes en `_blank` avec `noopener noreferrer`, aucun débordement horizontal, aucune ancre cassée, aucune erreur console, aucune réponse 4xx, préchargements d'images 10 → 3. Mots visibles du `<main>` : 755 → 3 494. Claims retirés : 0 occurrence dans le texte visible, le `<head>`, le JSON-LD et le bloc `packshotMode` du flux RSC. `/en/packshot-mode`, `/de-ch/packshot-mode` et `/fr/industrie/mode-textile` : HTML hors scripts identique à `main`.
**Supposé** — Les visuels réutilisés (`public/images/machines/*`) sont des visuels Orbitvu : non recontrôlé sur orbitvu.com, d'où des légendes qui ne nomment aucun modèle, sauf pour les photos de studio dont le nom figure sur l'appareil. Valeurs des plateformes : celles du 28/09, non relues depuis.
**Non regardé** — Preview (SSO) ; `www` (R4) ; relecture par Sébastien ; hub non modifié ; versions EN et de-ch non traduites.

**Constats hors périmètre** — Le flux RSC de toute page FR contient tout `fr.json`, donc les anciens claims d'autres namespaces (déjà signalé par F5). La PR #64 (D33, ouverte) annonce un délai de livraison d'environ 12 jours, contre environ 10 dans F5 et D32 : chiffre retiré de la page Mode. Le hub `/fr/industrie/mode-textile` porte des chiffres non sourcés (-80 %, 50-100 vêtements par jour, 100-300 visuels IA par jour, cas client « 400 SKUs », délais -75 %). L'article flat lay lié par `MoneyPageResources` cite l'Alphadesk, « 15 secondes » et « 150 prises de vue par heure ». La fiche XXL du site affiche 100 × 70 × 190 cm, Orbitvu 190 × 90 × 100 cm.

**Suite** — Relecture de Laurent ; passe de Sébastien (faits métier, Fashion Studio, délai de livraison) ; visuels à produire séparément après validation (liste dans la PR) ; traduction EN et de-ch depuis la version FR validée (D38) ; calendrier de fusion à décider par Laurent.

---

## 2026-09-30 · R01 / #58 fusionnée — clôture documentaire · Claude de Laurent

**Chantier** : R01 de l'audit de maillage du 29/09 | **PR** : #58, fusionnée | **Commit de fusion** : `e2e1027` (`main`), le 29/09/2026 à 18:48:26 UTC | **Consigné dans** : #57

**Quoi** — Mise à jour documentaire seulement :
- la ligne R01 de `ETAT.md` indiquait encore « PR #58, brouillon, non fusionnée » ; elle passe à « TERMINÉ — FUSIONNÉ » ;
- aucun code, aucun test fonctionnel refait.

**Vérifié** — `main` = `e2e1027` : commit de fusion de #58, parents `e88e528` et `0e232c2`, daté du 29/09/2026 à 18:48:26 UTC (`git log`).

**Supposé** — Constats de production de #58, rapportés par Laurent le 30/09 d'après la session de #58, et non recontrôlés ici sur sa consigne :
- `sysnext.vercel.app` sert le build de `e2e1027` ;
- `smoke.mjs` vert ;
- les 8 hubs `/de-ch/branchen/*` sont conformes ;
- 0 lien en 404 et 0 redirection dans le sélecteur de langue (26 et 6 avant) ;
- suivi GitHub et rappel de #58 supprimés.

**Non regardé** — `www` (R4). R02 à R19, D9, D29, D33, D36 : non concernés, rien de modifié.

**Suite** — Contrôle Chrome sur `www` de `/de-ch/branchen/uhren`, côté Laurent, comme indiqué dans la « Suite » de l'entrée R01 ci-dessous.

---

## 2026-09-29 · #55 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : audit SEO/GEO du 29/09, PR technique « corrections JSON-LD » (A, B, D) | **PR** : #55, fusionnée sur GO de Laurent | **Commit de fusion** : `e88e528` (`main`), le 29/09/2026 à 18:35:25 UTC | **Tête fusionnée** : `1ceb42a` | **Base avant fusion** : `37146c2`

**Quoi** — Fusion de #55 sur GO de Laurent, après ces contrôles :
- tête `1ceb42a` et `main` `37146c2` inchangés ;
- 4 checks verts ;
- aucun fil ni avis de revue ;
- PR fusionnable.

La PR est sortie du brouillon puis fusionnée par commit de fusion. Aucune autre modification de code. C (Organization distributeur), D32, D33, D36, R01 (sélecteur de langue de-ch), maillage, AI Act et Suisse non touchés.

**Vérifié** —
- `main` = `e88e528`, parents `37146c2` et `1ceb42a` ; arbre identique à celui de `1ceb42a`, la tête testée.
- `sysnext.vercel.app` sert le nouveau build à partir de 18:37:00 UTC : première observation d'un relevé toutes les 10 s, témoin `dateModified` `2026-05-02` sur l'article FR. Avant fusion, la production servait encore `/de-ch/studio-photo/…` dans le fil d'Ariane et `dateModified` = `datePublished`.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 18:37 UTC : vert, 17 pages et 3 ressources.
- `/de-ch/fotostudio/alphashot-pro-g2` : 200. `BreadcrumbList` : `/de-ch`, `/de-ch/studios-photo-automatises`, `/de-ch/fotostudio/alphashot-pro-g2`, tous en 200 sans redirection.
- `/fr/solutions/documentation-technique-visuelle` : 200. `BreadcrumbList` à 2 éléments, `/fr` et la page elle-même, en 200. Plus d'étape `/fr/solutions`.
- `Article` : `datePublished` `2024-01-08T00:00:00.000Z` et `dateModified` `2026-05-02` sur les 3 pages qui portent la valeur source (FR, EN, de-ch). Leurs éléments de fil d'Ariane répondent 200.
- Éléments de fil d'Ariane contrôlés en 404 ou en redirection : 0.
- `/fr` et `/en/distributeur-orbitvu-suisse` : Organization inchangée, soit la variante de la page (téléphones à tirets, sans `email`, `ContactPoint` CH en `French`/`English`).

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`, comme pour les PR précédentes.

**Non regardé** — `www` (R4) ; crawl complet de production, non demandé ; rapport « Fils d'Ariane » de GSC, pas encore lisible.

**Suite** — Laurent, dans Chrome sur `www` : `/de-ch/fotostudio/alphashot-pro-g2` et `/fr/solutions/documentation-technique-visuelle`, JSON-LD du fil d'Ariane. GSC, rapport « Fils d'Ariane », à J+7-14. Backlog inchangé, dans `ETAT.md` : Product/Offer de-ch, `Service.url` `branchen`, `author.url` de-ch, Organization distributeur (D33).

---

## 2026-09-29 · R01 — sélecteur de langue des 8 hubs de-ch · Claude de Laurent

**Chantier** : R01 de l'audit de maillage du 29/09 (seul P0 du rapport) | **PR** : #58, brouillon, branche `claude/gracious-dijkstra-efzyen`, non fusionnée | **Base** : `main` `37146c2`

**Quoi** — `localeSwitchHref` (`i18n/deChCoverage.ts`) : en de-ch seulement, le chemin concret `/industrie/<slug>` est ramené au motif `/industrie/[slug]` avant résolution. La table existante `DE_CH_TO_FR_SECTOR` fait le reste : aucun mapping ajouté. Test de non-régression `lib/__tests__/locale-switch-de-ch.test.ts` (47 cas).

**Pourquoi** — Sur les 8 hubs `/de-ch/branchen/<slug allemand>`, le sélecteur recopiait le slug allemand sous `/fr/industrie/` et `/en/industrie/` : 26 liens vers 13 URL en 404, 6 liens vers 3 URL en 301 (`/fr/industrie/mode`, `schoenheit`, `sport`). Cause vérifiée avant modification : la page est prérendue sous son chemin interne réécrit (charge utile `"c":["","de-ch","industrie","schmuck"]`). `usePathname()` de next-intl 4.6.1 ne rattache pas ce chemin au motif de-ch `/branchen/[slug]` (`getRoute`) et renvoie `/industrie/schmuck`, sans slug. Le sélecteur passait alors par la branche des pages statiques.

**Fichiers** — `i18n/deChCoverage.ts`, `lib/__tests__/locale-switch-de-ch.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Sur les 8 hubs, « FR » mène au hub FR du secteur, la même cible que leur hreflang `fr`. « EN » mène à `/en/studios-photo-automatises` : c'est la règle existante, les 17 hubs `/en/industrie/*` étant `noindex` (D9, non modifiée), et le bouton EN des hubs FR fait déjà de même.

**Vérifié** —
- Avant, sur le build local de `main` `37146c2`, Worker du dépôt rejoué en local : 8 hubs, 2 sélecteurs par page (desktop, mobile), 26 liens en 404, 6 en 301. Identique à l'audit.
- Après, même méthode : 16 cibles sur 16 en 200, 0 lien en 404, 0 redirection.
- Correspondances : `schmuck` → `bijoux-joaillerie`, `uhren` → `horlogerie`, `brillen` → `lunetterie`, `schoenheit` → `cosmetiques-beaute`, `elektronik` → `electronique-hightech`, `sport` → `sport-outdoor`, `mode` → `mode-textile`, `wein` → `vin-spiritueux`.
- HTML prérendu, `main` contre branche : 371 fichiers, 8 diffèrent (les 8 hubs), et seules les 4 balises `<a>` du sélecteur y changent. Sélecteur et hreflang identiques sur les 359 autres pages.
- Chromium, après hydratation : `/de-ch/branchen/schmuck` et `/uhren` conformes. Échantillon hors secteurs (`/de-ch/fotostudio/alphashot-360`, `/de-ch/kontakt`, `/de-ch/blog/altes-packshotcreator-studio-migrieren`, `/fr/industrie/horlogerie`, `/en/studios-photo-automatises`) identique à `main`. 0 erreur de page. Clic réel : « FR » sur `uhren` mène à `/fr/industrie/horlogerie`, « EN » sur `schmuck` à `/en/studios-photo-automatises`.
- Le nouveau test échoue sur le code de `main` (16 cas : 8 hubs × FR et EN, chemin concret) et passe sur la branche.
- `npx tsc --noEmit` vert ; Vitest 337/337 (290 sur `main`) ; `verifier-json` : 186 JSON valides ; ESLint : 0 problème sur les 2 fichiers, 0 sur la version `main` ; `npx next build` vert.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`. Le Worker déployé correspond au Worker du dépôt (R5) pour les 16 cibles.

**Non regardé** — `www` (R4), Preview Vercel (SSO), Safari et appareils réels. Les autres recommandations du rapport de maillage (R02 à R19).

**Suite** — GO de Laurent, fusion, `smoke.mjs` sur `sysnext.vercel.app`, contrôle Chrome sur `www` de `/de-ch/branchen/uhren`. Backlog, hors périmètre, rien de modifié :
- [Inférence] `GoogleAnalytics.tsx` (`page_path`) et `ContactForm.tsx` (`pageSource`) lisent le même `usePathname()` et pourraient recevoir le chemin interne sur les 29 pages de-ch localisées ;
- en local, `next start` répond 307 vers lui-même sur ces 29 chemins, alors que `sysnext.vercel.app` répond 200 : outillage de contrôle seulement.

---

## 2026-09-29 · #55 — périmètre ajusté par Laurent : correction C (Organization distributeur) retirée · Claude de Laurent

**Chantier** : audit SEO/GEO du 29/09, PR technique « corrections JSON-LD » | **PR** : #55, brouillon, non fusionnée, branche `ccr-28357f20-j8452h` | **Base** : `main` `2854c27`

**Quoi** — Sur consigne de Laurent, avant fusion, la correction C est retirée de #55 :
- `app/[lang]/distributeur-orbitvu-suisse/page.tsx` est restauré à l'identique de `main` `2854c27` ; `distributorOrganizationSchema` y est de nouveau émis ;
- les 2 tests Organization sont retirés de `lib/seo/__tests__/json-ld-techniques.test.ts`.

A (fils d'Ariane de-ch), B (étape « Solutions » en 404 retirée) et D (`dateModified` des sources) sont conservés sans changement. Cette entrée remplace, pour C, l'entrée ci-dessous.

**Pourquoi** — Arbitrage de Laurent du 29/09. Aucune donnée source n'était modifiée, mais la sortie publiée sur les 2 pages distributeur changeait sur plusieurs attributs : format des téléphones, `email`, `German` dans le `ContactPoint` CH. Cela relève du chantier D33, pas encore validé.

**Fichiers** — `app/[lang]/distributeur-orbitvu-suisse/page.tsx` (retour à `main`), `lib/seo/__tests__/json-ld-techniques.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Identique à l'entrée ci-dessous pour A, B et D. Aucun effet sur les 2 pages distributeur : leur JSON-LD reste celui de `main`, soit 2 variantes d'`Organization`.

**Vérifié** —
- `git diff 2854c27` sur le fichier distributeur : vide.
- `npx tsc --noEmit` vert. Vitest 295/295 : 290 sur `main` et 5 nouveaux, pour A, B et D. `verifier-json` : 186 JSON valides.
- ESLint complet : 326 messages sur `main` (258 erreurs, 68 alertes) comme sur la branche ; 0 nouveau, 0 disparu.
- `npx next build` vert pour `main` et pour la branche, variables factices de la CI.
- Mesure sur les 402 pages, `main` → branche :
  - pages de-ch à élément de fil d'Ariane redirigé : 21 → 0 ;
  - pages à élément 404 : 6 → 0 ;
  - variantes d'`Organization` : 2 → 2, inchangé ;
  - `Article` émettant le `dateModified` de la source : 0 → 3.
- Comparaison page par page : 30 différences JSON-LD, toutes classées (A 21, B 6, D 3), 0 non classée. JSON-LD des 2 pages distributeur identique à `main`. HTML hors scripts, `<head>`, statuts, `sitemap.xml`, `robots.txt` et `llms.txt` identiques.
- Crawl ciblé : les 32 pages concernées (30 corrigées et les 2 pages distributeur) répondent 200, et tous leurs éléments de fil d'Ariane répondent 200.
- `smoke.mjs` local vert sur `main` et sur la branche, 17 pages et 3 ressources. `e2e/seo.spec.ts`, Chromium : 235 réussis ; 8 échecs, les mêmes 8 sur `main`.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`.

**Non regardé** — Preview Vercel (SSO) et `www` (R4).

**Suite** — La variante d'`Organization` de la page distributeur rejoint le backlog D33. GO de Laurent, puis fusion, `smoke.mjs` sur `sysnext.vercel.app` et relevé des fils d'Ariane d'une fiche `fotostudio` et d'une page `solutions`.

---

## 2026-09-29 · JSON-LD techniques — fils d'Ariane de-ch et solutions, Organization distributeur, `dateModified` · Claude de Laurent

**Chantier** : audit SEO/GEO du 29/09, PR technique « corrections JSON-LD », périmètre strict | **PR** : #55, brouillon, non fusionnée, branche `ccr-28357f20-j8452h` | **Base** : `main` `2854c27`

**Quoi** — Quatre corrections de données structurées, rien d'autre :
- A. `BreadcrumbList` de-ch : l'élément qui visait un segment FR est résolu par `getPathname` (`i18n/routing.ts`) dans 9 fichiers. Aucune table ajoutée.
- B. `solutions/[slug]` : l'étape « Solutions » (`/fr/solutions`, `/en/solutions`, en 404) est retirée. Aucune page créée.
- C. `distributeur-orbitvu-suisse` : la variante `distributorOrganizationSchema` est supprimée ; la page émet `organizationSchema()`. `SchemaOrg.tsx` n'est pas modifié.
- D. `blog/[slug]` transmet à `articleSchema` le `dateModified` du fichier source quand il existe. `datePublished` inchangé ; aucune date générée ; repli existant sur `datePublished` conservé.

**Pourquoi** — Mesure AVANT sur un build local de `main` `2854c27`, 402 pages : les 325 du sitemap et les routes prérendues. Statuts relevés sans suivre les redirections.
- 21 pages de-ch avec un élément de fil d'Ariane en 307. La consigne en annonçait 22 ; j'en mesure 21, soit les pages de l'annexe 2.e du rapport maître du 26/09 : 13 fiches `fotostudio`, `maschinen-finder`, `branchen`, `kontakt`, `packshot-industrie`, `produktfotografie-bedarf`, `roi-rechner`, `wer-sind-wir`, `wichtige-fragen-produktfotografie`.
- 6 pages avec un élément en 404, et non 4 : 3 slugs (`documentation-technique-visuelle`, `documentation-qualite-produit`, `documentation-probatoire`) en FR, dans le sitemap, et en EN, `noindex, follow`, hors sitemap.
- 2 variantes d'`Organization` : la commune sur 289 pages, la divergente sur `/fr` et `/en/distributeur-orbitvu-suisse`.
- 3 fichiers source portent `dateModified` (`2026-05-02`) : le même article en FR, EN et de-ch. Aucun `Article` ne l'émettait : sur les 149 `Article`, `dateModified` = `datePublished`.

**Fichiers** — `app/[lang]/studio-photo/[slug]/page.tsx`, `app/[lang]/studio-photo/selecteur-machines/page.tsx`, `app/[lang]/a-propos/page.tsx`, `app/[lang]/besoins-photographie-produit/page.tsx`, `app/[lang]/calculateur-roi/layout.tsx`, `app/[lang]/contact/page.tsx`, `app/[lang]/industrie/page.tsx`, `app/[lang]/questions-cles-photographie-produit/page.tsx`, `components/templates/PackshotLandingTemplate.tsx` (type de `slug` restreint aux 3 pathnames déclarés), `app/[lang]/solutions/[slug]/page.tsx`, `app/[lang]/distributeur-orbitvu-suisse/page.tsx`, `app/[lang]/blog/[slug]/page.tsx`, `lib/content.ts` (champ optionnel `dateModified`), `lib/seo/__tests__/json-ld-techniques.test.ts` (nouveau), `vitest.config.ts` (`next-intl` transformé par Vite), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Les fils d'Ariane des 27 pages ne visent plus que des URL en 200 direct ; une seule `Organization` sur le site ; les 3 articles déclarent leur date de modification. Aucun effet sur le contenu visible, canonical, hreflang, `lang`, robots ou sitemap. [Inférence] Effet lisible dans GSC, rapport « Fils d'Ariane », après recrawl, soit une à deux semaines.

**Vérifié** —
- `main` distant = `2854c27` avant modification ; branche partie de ce commit.
- Mesure APRÈS, build local de la branche, mêmes 402 pages : pages de-ch à élément redirigé 21 → 0 ; pages à élément 404 6 → 0 ; toutes locales, éléments non 200 : 27 pages → 0 ; variantes d'`Organization` 2 → 1 (291 pages, dont les 2 pages distributeur, identiques au nœud de `/fr`) ; `Article` émettant le `dateModified` de la source : 0 → 3 sur 3.
- Comparaison `main` / branche, page par page, 402 pages :
  - 32 différences JSON-LD, toutes classées : A 21, B 6, C 2, D 3 ; 0 non classée ;
  - HTML hors scripts identique sur les 402 pages, identifiant de build neutralisé ;
  - `<head>` identique : canonical, alternates, robots, `lang`, `title`, description, `og:*` ;
  - statuts et redirections identiques ; `sitemap.xml` (`lastmod` neutralisé), `robots.txt` et `llms.txt` identiques.
- Crawl ciblé des 32 pages concernées : 32 en 200, tous leurs éléments de fil d'Ariane en 200 sans redirection.
- `npx tsc --noEmit` vert. Correction : au premier push (`fa16b1c`), la CI a échoué sur `tsc` : erreur de type dans le fichier de test, écrit après mon passage local de `tsc`. Corrigé au commit suivant ; `tsc`, Vitest, ESLint et build relancés en local avant de pousser. Vitest 297/297 (290 sur `main`, 7 nouveaux). Rejoués contre les sources de `main`, 3 des nouveaux tests échouent et signalent les 9 défauts (8 fichiers de-ch et l'étape « Solutions ») et la variante d'`Organization`. Avertissement de source map du Worker à l'identique sur `main`.
- `verifier-json` : 186 JSON valides. ESLint complet : 326 messages sur `main` (258 erreurs, 68 alertes), 326 sur la branche, 0 nouveau, 0 disparu.
- `npx next build` vert, variables factices de la CI.
- `smoke.mjs` sur `next start` local de `main` et de la branche : vert, 17 pages et 3 ressources, sorties identiques hors URL.
- `e2e/seo.spec.ts`, Chromium : 235 réussis et 8 échecs, les mêmes 8 sur `main` (longueur de `title` et de description, hreflang de `/fr/packshot-bijoux`) ; 0 nouvel échec. Exécuté avec le Chromium préinstallé du conteneur (`executablePath`), Playwright 1.58 attendant une version de navigateur absente.
- `verifier-consequences.mjs` sur la liste des fichiers : « Effet local ».

**Écart émis sur la page distributeur (C)** — La page émet désormais le nœud commun. Par rapport à la variante supprimée :
- `description` : « … pour la France et la Suisse. … » → « … France & Suisse. … » ;
- téléphones : mêmes numéros, format E.164 sans séparateurs (`+33147426666`, `+41445804384`) ;
- `email` `sales@sysnext.com` ajouté aux deux `ContactPoint` ;
- `availableLanguage` du `ContactPoint` CH : `German` ajouté, valeur centrale que D33 conserve.

Aucune donnée n'est modifiée dans `SchemaOrg.tsx`.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`, comme pour les PR précédentes.

**Non regardé** — Preview Vercel (SSO) et `www` (R4). Test des résultats enrichis de Google : non lancé. Le contrôle source des fils d'Ariane ne couvre pas un suffixe réduit à `/${…}` ; le gabarit des landings est couvert par le test `getPathname` et par le type de `slug`.

**Backlog** — Relevé pendant la PR, rien corrigé, consigne « BACKLOG seulement » :
- `Product.url` et `Offer.url` des 13 fiches de-ch visent encore `/de-ch/studio-photo/<slug>` (307) : zone Product/Offer exclue ;
- `Service.url` des 8 pages `branchen/*` en `/de-ch/industrie/<slug>` (301) et `author.url` en `/fr/a-propos` sur les articles de-ch (annexe 2.e du rapport maître) : hors des 4 défauts ;
- `ia-photo-produit` : nœud `provider` `Organization` réduit à `name`, sans `@id`, dans le bloc `SoftwareApplication` à `AggregateRating` : zone exclue ;
- `ETAT.md` présente encore #54 comme non fusionnée, alors que `main` `2854c27` en est la fusion.

**Suite** — GO de Laurent, puis fusion, `smoke.mjs` sur `sysnext.vercel.app` et relevé des fils d'Ariane d'une fiche `fotostudio`, d'une page `solutions` et de la page distributeur.

---

## 2026-09-29 · #52 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : phase 2A du blog | **PR** : #52, fusionnée sur GO final de Laurent | **Commit de fusion** : `9ced920` (`main`), le 29/09/2026 à 15:25:54 UTC | **Tête fusionnée** : `4ff2f07` | **Base avant fusion** : `06483a3`

**Quoi** — La PR #52 a été sortie du brouillon puis fusionnée par commit de fusion, après CI verte sur `4ff2f07` (4 checks et Vercel) et sans fil de revue. Corrections embarquées, au rendu seulement :
- les 5 shortcodes `[embed]` YouTube passent en façade avec consentement (#44) ;
- les liens `target="_blank"` des articles sont normalisés : les 41 internes s'ouvrent dans le même onglet, les 266 externes sans protection reçoivent `rel="noopener noreferrer"`.

Aucune autre correction SEO/GEO n'est embarquée, et aucun fichier de `content/**` n'est modifié. Les 6 `<img src="*.mp4">` restent volontairement hors périmètre (backlog « intégrations legacy à traiter avec preuve »).

**Vérifié** —
- `main` = `9ced920`, parents `06483a3` et `4ff2f07` ; l'arbre de `main` est identique à celui de `4ff2f07`, la tête testée.
- Production hors Cloudflare : `sysnext.vercel.app` sert le nouveau build à partir de 15:27:22 UTC (relevé toutes les 10 s). À 15:27:01 UTC, l'ancien build était encore servi.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 15:27:26 UTC : vert, 17 pages et 3 ressources (sitemap 325 URL).
- Les 125 articles, récupérés par `curl` : 125 réponses 200 ; le contenu de l'article est identique à celui du build testé sur les 125. Les mesures Chromium faites sur ce build (125 articles, 1440 et 390 px) valent donc pour la production.
- HTML de production, 125 articles :
  - 0 shortcode et 62 façades, 0 iframe YouTube ;
  - 1 078 liens hors façades ;
  - 0 lien interne en `_blank` ; 294 liens externes en `_blank`, dont 0 sans protection ;
  - 2 `target="_new"` et 6 balises `img` vers un `.mp4`, inchangés.
- Chromium sur `sysnext.vercel.app`, les réponses de production étant relayées par `curl` : le transport de Chromium échouait par intermittence dans le conteneur (`ERR_TOO_MANY_RETRIES`), alors que `curl` ne donnait aucune erreur.
  - 3 pages à shortcode, en 1440 et 390 px : débordement 0 ; façades 662×372 et 358×201 ; 0 requête YouTube au chargement et après le clic sur la façade ; fenêtre d'information ouverte, aucun nouvel onglet.
  - `/fr/a-propos` (lien relatif) et `https://www.packshot-creator.com/fr/ia-photo-produit` (lien absolu) : navigation dans l'onglet courant.
  - Deux liens externes (`lesnumeriques.com`, `shotflow.com`) : nouvel onglet. Un premier essai, avec une interception limitée à la page, n'avait observé aucun onglet ; il a été refait avec une interception au niveau du contexte.
- Aucune régression constatée.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app` (même projet, le Worker relaie le HTML sans le réécrire).

**Non regardé** — `www` (R4) ; Safari et appareils réels ; balayage Chromium des 125 articles directement en production, remplacé par l'identité du contenu avec le build testé.

**Suite** — Laurent, dans Chrome sur `www`, desktop puis mobile : deux pages à shortcode, un lien interne et un lien externe d'article (détail dans `ETAT.md`). Backlog inchangé : MP4, saasphoto, Sketchfab, F10, `alt` Webflow, traductions.

---

## 2026-09-29 · `llms.txt` — « officiel » (D6), assertion de date retirée, 16 secteurs · Claude de Laurent

**Chantier** : audit SEO/GEO du 29/09, PR technique 1 (constat P0-1) | **PR** : #54, brouillon, non fusionnée | **Base** : `main` `9ced920`

**Quoi** — Trois modifications dans `public/llms.txt`, rien d'autre :
- l. 3 : « Distributeur exclusif France & Suisse » → « Distributeur officiel France & Suisse » ;
- l. 5 : « Packshot Creator existe depuis 2004, » retiré ; aucune date ni ancienneté ajoutée ;
- l. 27 : « 15 secteurs » → « 16 secteurs », soit le nombre d'entrées listées l. 29-44.

**Pourquoi** — D6 proscrit « exclusif » dans toute revendication de distribution. La date de création est contradictoire dans le dépôt : 2004 dans le schéma `Organization` et sur `/a-propos`, 2001 dans D33, « 20 ans » et « 25 ans » dans les textes. Aucune date n'est choisie ici. Le fichier listait 16 secteurs et en annonçait 15.

**Fichiers** — `public/llms.txt`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Après fusion, `/llms.txt` ne revendique plus d'exclusivité ni de date de création. Aucun effet sur les pages, le sitemap, `robots.txt` ou les données structurées.

**Vérifié** —
- `main` distant = `9ced920` avant modification ; branche partie de ce commit.
- Diff : 1 fichier du site, 3 lignes remplacées. `git diff --word-diff` : seuls « exclusif » → « officiel », « Packshot Creator existe depuis 2004, » retiré et « 15 » → « 16 ».
- Mesures sur le fichier : « exclusi » 1 → 0 ; année, « depuis » ou « N ans » 1 → 0 ; secteurs annoncés 15 → 16, secteurs listés 16.
- `npx tsc --noEmit` vert ; `verifier-json` : 186 JSON valides ; `npx next build` vert, variables factices.
- `next start` local : `/llms.txt` en 200 `text/plain; charset=UTF-8`, identique octet pour octet au fichier ; `smoke.mjs http://localhost:3031` vert, 17 pages et 3 ressources (`llms.txt` 3 779 octets).
- `verifier-consequences.mjs` sur la liste des fichiers : « Effet local ».
- `sysnext.vercel.app/llms.txt` était identique au dépôt avant modification (relevé du 29/09).

**Supposé** — [Inférence] `www` sert le même `llms.txt` que `sysnext.vercel.app` ; non contrôlable depuis le conteneur (R4).

**Non regardé** — Preview Vercel (SSO) et `www` (R4). Hors périmètre de cette PR, sans modification : les autres occurrences de « exclusive » du dépôt (`lib/lead-enrichment.ts`, articles) et la date de création ailleurs (schéma `Organization`, `/a-propos`, textes), suivies par l'audit du 29/09 (D33).

**Suite** — GO de Laurent, fusion, `smoke.mjs` sur `sysnext.vercel.app`, puis `https://www.packshot-creator.com/llms.txt` dans Chrome. Aucune date de création ne sera réintroduite dans `llms.txt` avant l'alignement D33 du schéma et de `/a-propos`.

---

## 2026-09-29 · Phase 2A — règle UX finale : liens internes dans le même onglet · Claude de Laurent

**Chantier** : phase 2A du blog | **PR** : #52, brouillon, non fusionnée | **Base** : `main` `06483a3`

**Quoi** — `addRelToBlankTargets` (`lib/blog-utils.ts`) applique la règle UX finale de Laurent du 29/09, qui remplace l'arbitrage précédent (`noopener` seul sur les liens internes) :
- lien interne (`isInternalHref`) en `target="_blank"` : `target` retiré, ouverture dans le même onglet ; aucun `rel` ajouté, un `rel` existant conservé tel quel ;
- lien externe en `_blank` sans protection : `target` conservé, `rel="noopener noreferrer"` ajouté ;
- lien externe déjà protégé, et toute autre cible (`_new`, `_self`…) : inchangés.

Liens internes : `/…`, `#…`, `?…`, et URL absolues vers `packshot-creator.com` ou `www.packshot-creator.com`. Les sous-domaines, `mailto:`, `tel:` et les liens sans `href` sont externes. Aucun de ces cas n'existe dans le corpus : aucun `mailto:` ni `tel:`, même hors `_blank`.

**Pourquoi** — Règle UX de Laurent du 29/09 : un lien interne PackshotCreator reste dans le même onglet ; les liens externes gardent `_blank`, protégés.

**Fichiers** — `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Les 41 liens internes des articles s'ouvrent dans l'onglet courant. Les liens externes gardent leur comportement, avec la protection `window.opener`.

**Vérifié** —
- `npx tsc --noEmit` vert ; Vitest 290/290 (260 sur `main`) ; `verifier-json` : 186 JSON valides ; `npx next build` vert ; ESLint : seules les 2 alertes `no-explicit-any` de `getBlockText`, déjà présentes sur `main`.
- HTML prérendu, `main` contre branche, 375 fichiers : 83 articles modifiés, rien d'autre. `fr/blog/generer-images-produit-ia` s'ajoute aux 82 précédents : c'est la page du lien interne absolu qui portait déjà `rel="noopener"`.
- Sur les 125 articles, 0 différence non classée. La transformation attendue a été réappliquée à `main` par un code Python indépendant : 41 `target` retirés, 266 `rel` ajoutés.
- Liens des articles, façades exclues, de `main` à la branche :
  - 1 078 liens des deux côtés : aucun lien supprimé ;
  - 0 `href`, 0 texte de lien et 0 autre attribut modifié ;
  - `_blank` : 335 → 294 ; internes en `_blank` : 41 → 0 ; externes en `_blank` : 294 → 294, dont 0 sans `rel` (266 sur `main`) ;
  - les 28 externes déjà en `rel="noopener"` sont identiques ; l'interne en `rel="noopener"` perd `target` et garde son `rel` ;
  - 2 `target="_new"`, 6 balises `img` vers un `.mp4` et 62 façades inchangés.
- E2E : 6 specs, build local de la branche, Chromium et Pixel 5, résolution DNS externe coupée : 557 réussis et 25 échecs, les mêmes 25 que sur `main` ; 0 nouvel échec.
- Chromium, 125 articles, 1440 et 390 px, comparés aux mesures de `main` : aucune différence hors champs attendus ; 250 réponses 200 ; 0 lien interne relatif en `_blank` ; 0 lien `_blank` sans `rel` ; 0 requête YouTube au chargement ; débordement à 390 : 0 page.
- Clic réel, Chromium : « À propos » (`/fr/a-propos`, `focus-sur-lhyperfocus`) et le lien absolu `https://www.packshot-creator.com/fr/ia-photo-produit` (`generer-images-produit-ia`) naviguent dans l'onglet courant, sans nouvel onglet ; un lien externe (`lesnumeriques.com`) ouvre un nouvel onglet.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`.

**Non regardé** — `www` (R4), Preview Vercel (SSO), Safari et appareils réels. MP4 : aucune modification (`MP4_SAFE_TO_FIX = NO`), backlog « intégrations legacy à traiter avec preuve ».

**Suite** — GO final de Laurent, puis fusion, `smoke.mjs` sur `sysnext.vercel.app` et contrôle Chrome sur `www`. Sur `www`, vérifier qu'un lien interne d'article, par exemple « À propos » dans `/fr/blog/focus-sur-lhyperfocus`, s'ouvre dans le même onglet.

---

## 2026-09-29 · Phase 2A — arbitrage F22 de Laurent : `noopener` seul sur les liens internes · Claude de Laurent

**Chantier** : phase 2A du blog | **PR** : #52, brouillon, non fusionnée | **Base** : `main` `06483a3`

**Quoi** — `addRelToBlankTargets` distingue désormais la cible du lien (`isInternalHref`, `lib/blog-utils.ts`) :
- lien `target="_blank"` interne sans `rel` : `rel="noopener"` seul ;
- lien externe sans `rel` : `rel="noopener noreferrer"`, inchangé par rapport à l'entrée précédente ;
- `rel` contenant déjà `noopener` ou `noreferrer` : lien inchangé.

Interne signifie : `href` résolu depuis `https://www.packshot-creator.com/` vers `packshot-creator.com` ou `www.packshot-creator.com`, en http ou https. Cela couvre les chemins relatifs, les ancres, les requêtes et les URL absolues du site. Tout le reste est externe : autres domaines, sous-domaines (`videos.`, `trail.`…), `mailto:`, `tel:`, `href` absent. Aucun `mailto:`, `tel:`, sous-domaine ni lien sans `href` dans le corpus.

**Pourquoi** — Arbitrage de Laurent du 29/09 sur les deux points laissés ouverts :
- les 29 liens `rel="noopener"` restent tels quels : `noopener` protège déjà `window.opener` en conservant le Referer ;
- les 40 liens internes n'ont pas besoin de `noreferrer`, qui supprimerait le Referer d'une navigation interne sans nécessité.

**Fichiers** — `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Identique à l'entrée précédente, sauf pour les 40 liens internes `_blank`, qui gardent leur Referer.

**Vérifié** —
- `npx tsc --noEmit` vert ; Vitest 289/289 (260 sur `main`) ; `verifier-json` : 186 JSON valides ; `npx next build` vert ; ESLint : seules les 2 alertes `no-explicit-any` de `getBlockText`, déjà présentes sur `main`.
- HTML prérendu, `main` contre branche, 375 fichiers : seuls les 82 articles déjà attendus diffèrent. Sur les 125 articles, 0 différence non classée. Les 306 `rel` ajoutés sont conformes à la règle, vérifiée par un classement indépendant du code (`urllib` Python) : 40 internes en `noopener`, 266 externes en `noopener noreferrer`.
- Corpus rendu, façades exclues :
  - 335 liens `_blank`, dont 0 sans `rel` (306 sur `main`) ;
  - 41 internes, tous en `noopener`, aucun en `noreferrer` : les 40 corrigés et 1 déjà en `rel="noopener"` ;
  - 294 externes : 266 en `noopener noreferrer` et 28 déjà en `rel="noopener"` ;
  - les 29 liens `rel` existants identiques octet pour octet ;
  - 62 façades, 2 `target="_new"` et 6 balises `img` vers un `.mp4` inchangés.
- E2E : mêmes 6 specs, build local de la branche, Chromium et Pixel 5, résolution DNS externe coupée : 557 réussis et 25 échecs, les mêmes 25 que sur `main` (passage précédent, mêmes conditions) ; 0 nouvel échec.
- Chromium, 125 articles, 1440 et 390 px, comparés aux mesures de `main` : aucune différence hors champs attendus ; 250 réponses 200 ; 40 liens internes relatifs en `noopener`, aucun en `noreferrer` ; liens `rel="noopener"` seul : 29 → 69 ; 0 lien `_blank` sans `rel` ; 0 requête YouTube au chargement ; débordement à 390 : 0 page.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`.

**Non regardé** — `www` (R4), Preview Vercel (SSO), Safari et appareils réels. MP4 : aucune modification (`MP4_SAFE_TO_FIX = NO`). Ils rejoignent, sur décision de Laurent, le backlog « intégrations legacy à traiter avec preuve », avec saasphoto, Sketchfab, F10, les `alt` Webflow et les traductions.

**Suite** — GO final de Laurent, puis fusion, `smoke.mjs` sur `sysnext.vercel.app` et contrôle Chrome sur `www` des 3 pages à shortcode.

---

## 2026-09-29 · Phase 2A — shortcodes `[embed]` YouTube en façade et `rel` des liens `target="_blank"` (F22), au rendu · Claude de Laurent

**Chantier** : phase 2A du blog, correctifs runtime des anciens contenus Webflow, sur consigne de Laurent du 29/09 | **PR** : #52, brouillon, branche `claude/awesome-dirac-j9uvw1`, non fusionnée | **Base** : `main` `06483a3`

**Quoi** —
- **Shortcodes** : `transformEmbedShortcodes` (`lib/blog-utils.ts`) remplace au rendu chaque `[embed]<URL YouTube>[/embed]` d'un paragraphe par la façade de #44 (`renderFacade`, désormais exportée de `lib/youtube.ts`, sans autre changement). Aucune iframe, aucun appel YouTube avant accord ; le texte du paragraphe autour du shortcode reste dans un paragraphe aux mêmes attributs, une partie vide n'est pas émise. Le compteur vidéo inclut ces façades : `YouTubeConsent` est monté sur les 3 pages concernées.
- **F22** : `addRelToBlankTargets` ajoute `rel="noopener noreferrer"` aux liens `target="_blank"` sans `rel`. Un `rel` existant garde ses jetons, ses guillemets et sa place ; s'il contient déjà `noopener` ou `noreferrer`, le lien est inchangé, sinon les deux jetons sont ajoutés à la suite. `target`, `href` et texte intacts, jamais de second `rel`.
- **MP4** : non traités (`MP4_SAFE_TO_FIX = NO`, voir « Non regardé »).

**Pourquoi** — Audit phase 2 : 5 shortcodes affichés en texte brut sur 3 pages, avec 19 px de débordement horizontal à 390 px ; 306 liens `target="_blank"` sans `rel` sur 79 pages.

**Micro-audit avant code** —
- 5 shortcodes, tous `https://youtu.be/<id>` : `HVmUF6Mjan8` ×3 et `xZ_lJM-ClSs` ×2, dans `content/blog/fr/photographie-2d-de-produits.json`, `content/blog/en/photographie-2d-de-produits.json` (2 chacun, paragraphe seul) et `content/blog/fr/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter.json` (1, en fin de paragraphe après du texte). Aucune iframe YouTube sur ces 3 pages avant correction.
- 6 `<img src="*.mp4">` sur 6 pages, 4 fichiers présents (235 à 301 Ko, piste vidéo seule, aucune piste audio, 1,8 à 2,4 s, 7 à 19 images). Ce ne sont pas des vidéos Webflow : balisage Webflow `data-rt-type="image"`, et le script de migration historique (`scripts/extract-webflow-content.mjs`, lu dans `061e05d`, l. 380-393) convertissait tout GIF en MP4 par ffmpeg sans changer la balise `<img>`.

**Fichiers** — `lib/blog-utils.ts`, `lib/youtube.ts` (mot-clé `export` sur `renderFacade` et `FacadeInput`), `lib/__tests__/blog-utils.test.ts`, `lib/__tests__/youtube.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. Aucun fichier de `content/**`, `messages/*`, #27, #43, ni Cloudflare touché.

**Effet attendu** — Dès la mise en production : 3 pages sans shortcode visible ni débordement mobile, 5 vidéos lisibles après accord ; 306 liens protégés contre `window.opener`. Aucun effet SEO direct attendu : textes, titres, `href`, JSON-LD et sitemap inchangés.

**Vérifié** —
- `npx tsc --noEmit` vert ; Vitest 284/284 (14 fichiers) ; `verifier-json` : 186 JSON valides ; `npx next build` vert (valeurs factices de la CI) ; ESLint sur les fichiers modifiés : 2 alertes `no-explicit-any` de `getBlockText`, déjà présentes sur `main`.
- Test corpus de #44 (`youtube.test.ts`) adapté sans affaiblissement : 57 façades issues d'iframes (inchangé), 5 issues de shortcodes, total 62, aucune iframe YouTube.
- HTML prérendu, build de `main` contre build de la branche, 125 articles (DOM et flux RSC), identifiants de build neutralisés, chaque différence classée automatiquement :
  - 82 pages modifiées : 79 par F22 seul, 3 par les shortcodes seuls ;
  - 306 attributs `rel="noopener noreferrer"` ajoutés, rien d'autre sur ces liens ;
  - 5 shortcodes remplacés par 5 façades ; 4 paragraphes réduits au shortcode retirés, 1 paragraphe conservé avec son texte ;
  - hors article, sur les 3 pages à shortcode : `<dialog>` de `YouTubeConsent` inséré, identique octet pour octet à celui des pages vidéo existantes, et sa référence dans le flux RSC ;
  - 0 différence non classée. Hors articles : 375 fichiers prérendus comparés, seules différences les 82 articles et les `lastmod` du sitemap (heure de build, 325 URL des deux côtés).
- Comptages sur les articles rendus, `main` → branche : shortcodes 5 → 0 ; liens `target="_blank"` sans `rel` 306 → 0 ; liens `_blank` hors façades 335 → 335 ; 29 liens `rel="noopener"` identiques ; façades 57 → 62 ; iframes YouTube 0 → 0 ; `<img src="*.mp4">` 6 → 6 ; `__wf_reserved_inherit` 167 → 167 ; iframes sans `title` 3 → 3 ; `h2` 706, `h3` 838, `h4` 147, `li` 2 232, `ul` 647, `ol` 30, `.tldr` 7 : inchangés ; `p` 2 465 → 2 461.
- Chromium, 1440 et 390 px, `main` contre branche :
  - 3 pages à shortcode : débordement 19 px → 0 à 390 px ; façades 662×372 et 358×201 (ratio 1,78), écart de 32 px avant et après, comme les façades existantes ; styles de paragraphes et de listes identiques ; 0 requête YouTube au chargement ; au clic, fenêtre d'information, toujours 0 requête ; « Autoriser et lire la vidéo » : lecteur `youtube-nocookie.com/embed/<id>?autoplay=1&rel=0`, `title` et `referrerpolicy="strict-origin-when-cross-origin"`, comme sur une façade existante.
  - 125 articles, 1440 et 390 : 250 réponses 200 par cible ; aucune différence hors champs attendus (texte hors shortcodes, titres, listes, TL;DR, liens du sommaire, Vimeo, Sketchfab, saasphoto, scripts Orbitvu, images, MP4) ; 0 requête YouTube ; débordement à 390 : 3 pages sur `main`, 0 sur la branche.
- E2E : 6 specs (`anchors`, `seo`, `mobile-overflow`, `external-links`, `youtube-consent`, `cookie-banner`), builds locaux de `main` et de la branche, Chromium et Pixel 5, résolution DNS externe coupée : 557 réussis et 25 échecs de chaque côté, les mêmes 25 qu'à la phase 1 (SEO 16, bandeau cookies 5, ancre `#calculateur-roi` 2, débordement de `/fr` 2), aucun sur un article ; 0 nouvel échec.
  - Premier passage écarté : 91 échecs sur `main`, 108 sur la branche, presque tous des dépassements de délai. Cause établie : 3 requêtes `/_next/image` (logos `.avif`) bloquées sur le serveur local de la branche après l'interruption d'un passage, les 17 échecs supplémentaires portant sur `/fr` et `/en/studios-photo-automatises`, dont le HTML est identique entre `main` et la branche. Relance complète après redémarrage des deux serveurs.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`, comme pour #44 et #50.

**Non regardé** —
- **MP4 (`MP4_SAFE_TO_FIX = NO`)** : origine GIF établie, mais le nombre de boucles du GIF d'origine est perdu à la conversion et les GIF ne sont pas dans le dépôt (archive web injoignable depuis le conteneur : 429 puis connexion réinitialisée). Le nom accessible des 4 vidéos dont l'`alt` vaut `__wf_reserved_inherit` relève de l'arbitrage réservé à ces `alt`. Aucune modification.
- F10, `alt="__wf_reserved_inherit"`, saasphoto, Sketchfab, Vimeo, consentement Orbitvu, sommaire mobile, traductions : hors périmètre sur consigne de Laurent.
- 2 liens `target="_new"` (gnpp.wordpress.com, FR et EN) : hors du périmètre `_blank`, inchangés.
- `www` (R4), Preview Vercel (SSO), Safari et appareils réels.

**Suite** — Deux interprétations à confirmer par Laurent avant fusion :
- les 29 liens `rel="noopener"` sont laissés inchangés, alors que la consigne « ajouter les jetons manquants » donnerait `noopener noreferrer`, comme l'exige `e2e/external-links.spec.ts` sur les pages hors blog ;
- les 40 liens internes `target="_blank"` reçoivent `rel` (condition de « WITHOUT_REL = 0 »), sans changement de `target` ni de `href`.
Après fusion : `smoke.mjs` sur `sysnext.vercel.app`, puis contrôle Chrome sur `www` des 3 pages à shortcode.

---

## 2026-09-29 · #50 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : phase 1 structurelle du blog (F1, F16, F19, F11, F2 limité aux 2 Vimeo) | **PR** : #50, fusionnée sur GO final de Laurent | **Commit de fusion** : `28a1169` (`main`), le 29/09/2026 à 10:33:42 UTC | **Tête fusionnée** : `a9aae77` | **Base avant fusion** : `2de576a`

**Quoi** — GO final donné par Laurent après son contrôle visuel du Preview : desktop validé ; contrôle mobile complet « PASS_WITH_NOTES », 18 combinaisons page × profil sans débordement ni régression de #50.

Contrôles préalables à 10:33 UTC :
- `main` inchangé (`2de576a`) ;
- tête #50 `a9aae77`, 1 commit ;
- PR fusionnable (`clean`) ;
- 4 checks et Vercel en succès ;
- #48 fermée sans fusion.

La PR a été sortie du brouillon, puis fusionnée par commit de fusion. Aucune autre modification de code. #43, #27, `content/**` et Cloudflare non touchés.

**Vérifié** —
- `main` = `28a1169`, parents `2de576a` et `a9aae77` ; l'arbre de `main` est identique à celui de `a9aae77`, la tête testée.
- Production hors Cloudflare : `sysnext.vercel.app` sert le nouveau build à partir de 10:35:02 UTC (première observation, relevé toutes les 10 s : classe `blog-article` présente). À 10:34:52 UTC, l'ancien build était encore servi.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 10:35:07 UTC : vert, 17 pages et 3 ressources (sitemap 325 URL, robots.txt, llms.txt).
- Chromium sur `sysnext.vercel.app`, 125 articles en 1440 et 390 px (10:35 à 10:37 UTC) :
  - 250 réponses 200 ;
  - 57 façades YouTube par largeur, 0 iframe YouTube brute ;
  - 0 paragraphe vide dans le DOM ;
  - 0 « &amp; » dans le sommaire ;
  - débordement horizontal : les 3 mêmes pages à 19 px en 390 qu'avant #50 (`boostez-votre-taux-de-conversion…` FR, `photographie-2d-de-produits` FR et EN), aucune nouvelle.
- Tous les indicateurs mesurés sont identiques à ceux du build testé avant fusion : statut, paragraphes vides, façades, iframes, sommaire, classe, styles calculés et figures.
  - Seule différence : la hauteur totale de page, sur 41 relevés sur 250. Elle vient du chargement différé des images au moment du relevé : `avantages-toplight-photographie-produits` (FR) mesure 9 490 px en local comme en production dans les mêmes conditions, et l'écart de 2 706 px observé correspond à la hauteur de ses images.
- Pages demandées, en 1440 et 390 :
  - `/en/blog/8-steps-to-professional-jewelry-photography` : paragraphes 20 px, puces `disc` et retrait 26 px, listes imbriquées `circle`, liens soulignés, façade 662×372 et 358×201 ;
  - `/fr/blog/optimiser-collaboration-equipe-success-story-shotflow` et `/en/blog/optimize-team-collaboration-success-story-shotflow` : Vimeo 662×373 et 358×202, vide 0 ;
  - `/fr/blog/generer-images-produit-ia` : paragraphe du `.tldr` à 0 px, inchangé ; listes et liens corrigés ;
  - `/en/blog/5-cameras-realistic-3d-animation` : 2 façades intactes (662×372 et 358×201), 0 débordement.

**Supposé** — `www` sert le même HTML que `sysnext.vercel.app` (même projet, le Worker relaie le HTML sans le réécrire).

**Non regardé** — `www` (R4) ; e2e contre la production (les specs ont été passées avant fusion sur les builds locaux de `main` et de la branche, d'arbre identique à la production : mêmes 25 échecs préexistants, aucun nouveau).

**Suite** —
- Laurent, dans Chrome sur `www`, desktop puis mobile : un article Webflow, un natif et un article Vimeo.
- Anomalie séparée, signalée par le contrôle mobile de Laurent et présente à l'identique sur `main` avant #50 : à 390 px, après un clic dans le sommaire, le `h2` visé reste partiellement masqué. Ce n'est pas une régression de #50, qui ne l'a pas corrigée ; je ne l'ai pas reproduite moi-même.
- Restent hors phase : F10, F22, saasphoto, Sketchfab, rendu des guides, chantier éditorial et traductions des anciens articles Webflow.

---

## 2026-09-29 · Phase 1 structurelle du blog — typographie, paragraphes vides, sommaire, 2 figures Vimeo · Claude de Laurent

**Chantier** : phase 1 structurelle du blog (F1, F16, F19, F11, F2 limité aux 2 Vimeo), GO d'implémentation de Laurent du 29/09 | **PR** : brouillon, branche `fix/blog-structure-phase1-2026-09`, non fusionnée | **Base** : `main` `2de576a` | Remplace le seul correctif encore utile de #48

**Quoi** —
- **F1 et F16** : règles CSS limitées au gabarit `app/[lang]/blog/[slug]` (classe `blog-article` sur `<article>`), en `@layer components` et `:where()`.
  - Paragraphes : marges de 20 px.
  - Listes : puces et numéros, retrait de 26 px, listes imbriquées en `circle` ou `lower-alpha`.
  - Liens : soulignés, couleur `--very-peri-6`.
  - Titres : `h4` 18 px/600, `h5` 16 px/600, `h6` 14 px/600 en majuscules.
  - Inchangés : `h2`, `h3`, `.tldr` (paragraphe et puces exclus explicitement), `.table-wrap`, `.article-signature`, `.pkc-yt*`, crédits Sketchfab.
- **F19** : `removeEmptyParagraphs`, appliquée au rendu dans `processHtmlContent`, retire les `<p>` sans attribut (ou avec `id=""` seul), sans balise, faits seulement d'espaces ou de caractères invisibles. 998 paragraphes retirés sur 107 pages (984 ZWJ, 14 espaces). Aucun JSON modifié.
- **F11** : texte du sommaire décodé (`decodeHtmlEntities`). 7 titres concernés ; l'`id` reste calculé sur la source, les ancres ne bougent pas.
- **F2** : la règle de #48 « figure vidéo Webflow sans légende, `padding-bottom` renseigné », reprise à l'identique, préfixe `.prose` remplacé par `.blog-article`. Elle ne cible aujourd'hui que les 2 figures Vimeo.

**Pourquoi** —
- Le plugin `@tailwindcss/typography` n'est pas chargé (Tailwind v4 ignore `tailwind.config.ts` sans `@config` ni `@plugin`). Résultat mesuré sur `main` : paragraphes sans marge, listes sans puce ni retrait, liens de la couleur du texte, `h4` à `h6` rendus comme le texte courant (16 px, graisse 400).
- Les 2 figures Vimeo laissent 373 px de vide en 1440 et 201 px en 390.
- Le sommaire affiche « Gad &amp; Co ».

**Fichiers** — `app/globals.css`, `app/[lang]/blog/[slug]/page.tsx` (1 ligne), `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. `lib/blog-html.ts` n'a pas été créé : sans F22, il ne resterait que deux fonctions, placées avec les autres transformations HTML de `lib/blog-utils.ts`, qu'aucune PR ouverte ne modifie. Aucun fichier de `content/**`, de #44 (`lib/youtube.ts`, `YouTubeConsent.tsx`, règles `.pkc-yt*`), `CookieBanner.tsx`, `messages/*`, #43, #27 ni Cloudflare touché.

**Effet attendu** — Dès la mise en production, sur les 125 articles du gabarit (natifs compris) : paragraphes espacés, listes lisibles, liens visibles ; les 2 vidéos Vimeo sans vide dessous. Aucun effet SEO direct : textes, liens, balises et JSON-LD sont identiques dans le HTML servi, hors transformations visées.

**Vérifié** —
- `npx tsc --noEmit` vert.
- Vitest : 260/260, dont 10 nouveaux tests.
- ESLint sur les fichiers modifiés : 3 alertes, toutes déjà présentes sur `main` (2 `no-explicit-any` dans `getBlockText`, import `HeadingData` inutilisé).
- `verifier-json` : 186 JSON valides.
- `npx next build` vert (valeurs factices de la CI).
- CSS compilé (lecture par postcss) : règles F1 dans `@layer components` ; règle Vimeo, `.tldr`, `.pkc-yt` et `.article-signature` hors couche.
- HTML servi des 125 pages, build de `main` contre build de la branche : identique après les seules transformations visées :
  - 998 paragraphes vides retirés ;
  - 7 titres du sommaire décodés ;
  - classe `blog-article` sur les 125 `<article>`.
- Chromium, 1440 et 390 px, 125 pages :
  - 250 réponses 200 ;
  - 0 paragraphe vide dans le DOM (1 996 sur `main`) ;
  - 57 façades et 0 iframe YouTube brute par largeur ;
  - 0 « &amp; » dans le sommaire (7 par largeur sur `main`) ;
  - débordement horizontal : 3 pages à 19 px en 390, identiques sur `main` (`boostez-votre-taux-de-conversion…` FR, `photographie-2d-de-produits` FR et EN).
- Styles calculés, `main` → branche :

  | Élément | `main` | Branche |
  |---|---|---|
  | Paragraphe | marges 0 px | marges 20 px |
  | `ul` | pas de puce, retrait 0 px | `disc`, retrait 26 px |
  | Liste imbriquée | pas de puce | `circle` |
  | `ol` | pas de numéro | `decimal` |
  | Lien | rgb(13,23,26), non souligné | rgb(82,82,185), souligné |
  | `h2`, `h3` | — | identiques |
  | `h4` | 16/400 | 18/600 |
  | `h5` | 16/400 | 16/600 |
  | `h6` | 16/400 | 14/600, majuscules |

- Vimeo, FR et EN :

  | Largeur | `main` | Branche |
  |---|---|---|
  | 1440 | 662×523, iframe 300×150, vide 373 | 662×373, vide 0 |
  | 390 | 358×352, vide 201 | 358×202, vide 0 |

  Paragraphe suivant à 20 px.
- Inchangés, par mesure :
  - les 40 autres figures des pages détaillées : façades pleine largeur 662×372 et 358×201, façades centrées 576×324, légendes Orbitvu, saasphoto 662×174 avec iframe 300×150, Sketchfab 662×175 avec iframe 300×150 ;
  - encadrés `.tldr` (225, 377 et 353 px), signature (111 px), crédits Sketchfab (#1CAAD9, sans soulignement, graisse 700), couleurs de `h2` et `h3`, comparés à `sysnext.vercel.app`.
- Specs e2e (`anchors`, `seo`, `mobile-overflow`, `external-links`, `youtube-consent`, `cookie-banner`), sur le build local, en Chromium et Pixel 5 : 557 réussies et 25 échecs, les mêmes 25 que sur `main`, aucun sur un article :
  - SEO title, description et hreflang : 16 ;
  - bandeau cookies : 5 ;
  - ancre `#calculateur-roi` : 2 ;
  - débordement de `/fr` : 2.

**Supposé** — [Non vérifié] Les navigateurs récents appliquent `:has()` (règle Vimeo) et `:not()` avec sélecteur complexe (exclusions de F1). Sinon, la règle concernée est ignorée et le rendu reste celui d'aujourd'hui.

**Non regardé** —
- `www` (R4), Preview Vercel (SSO), Safari et appareils réels.
- Les autres usages de `.prose` (guides, CGU, mentions légales, distributeur, articles statiques, `Callout`) : hors périmètre, « blog uniquement ».
- F10, F22, saasphoto et Sketchfab : hors phase 1, sur décision de Laurent.

**Suite** —
- Espacement autour des blocs : les paragraphes vides servaient d'espaceurs ; les marges normales les remplacent.
  - Sous une façade : 32 px avant un paragraphe, un `h3` ou une liste, 48 px avant un `h2` (marge actuelle du titre).
  - Sous Sketchfab : le `h2` suivant est à 73 px du bas de l'iframe en 1440 (92 px en 390), sans le paragraphe vide intercalé.
- #48 fermée sans fusion après l'ouverture de cette PR : rendue obsolète par #44 pour YouTube, son correctif Vimeo est repris ici.
- Après fusion :
  - `node scripts/seo/smoke.mjs https://sysnext.vercel.app` ;
  - contrôle Chrome sur `www` d'un article Webflow, d'un natif et d'un article Vimeo.
- Restent hors phase : F10 (3 iframes sans `title`), F22 (306 liens `_blank` sans `rel`), saasphoto (302 puis 402 depuis le conteneur), Sketchfab (iframe 300×150), rendu des guides.

---

## 2026-09-29 · #44 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : vidéos YouTube des articles, façade locale et consentement contextuel | **PR** : #44, fusionnée sur GO final de Laurent | **Commit de fusion** : `b10bb5e` (`main`), le 29/09/2026 à 08:17:25 UTC | **Tête fusionnée** : `cfb271d` | **Base avant fusion** : `a1771be`

**Quoi** — Laurent a validé le Preview et le texte de la page de confidentialité. Contrôles préalables à 08:17 UTC :
- `main` inchangé (`a1771be`) ;
- tête #44 `cfb271d` ;
- PR fusionnable (`clean`) ;
- 4 checks et Vercel en succès ;
- 4 commits, tous connus.

La PR a été sortie du brouillon, « NE PAS FUSIONNER » retiré du titre et de la description, puis fusionnée par commit de fusion. PR #48 non touchée, phase 1 non lancée, aucun changement dans `content/**` ni côté Cloudflare.

**Vérifié** —
- `main` = `b10bb5e`, parents `a1771be` et `cfb271d` ; l'arbre de `main` est identique à celui de `cfb271d`, la tête testée.
- Production hors Cloudflare : `sysnext.vercel.app` sert les façades à partir de 08:18:53 UTC (première observation, relevé toutes les 10 s). À 08:16:49 UTC, avant fusion, l'article cible avait encore 2 iframes YouTube brutes.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 08:18:58 UTC : vert, 17 pages et 3 ressources (sitemap 325 URL, robots.txt, llms.txt).
- Les 49 articles à vidéo répondent 200 : 57 façades (FR 29, EN 28), 0 iframe YouTube brute.
- `/fr/confidentialite` et `/en/confidentialite` répondent 200. Le nouveau texte de l'article 6 (« Vidéos YouTube ») est présent, et l'ancienne phrase « Aucun cookie marketing n'est utilisé actuellement sur ce site. » ne l'est plus. `/de-ch/confidentialite` répond 404 : les pages légales sont en français seulement (`DE_CH_PIN_FR` dans `i18n/deChCoverage.ts`), et #44 ne modifie pas ce fichier.

**Supposé** — `www` sert le même HTML que `sysnext.vercel.app` (même projet, le Worker relaie le HTML sans le réécrire).

**Non regardé** — `www` (R4 : 403 de challenge Cloudflare pour les scripts, certificat du proxy refusé par le Chromium du conteneur) ; parcours de consentement en production réelle ; Safari et appareils réels.

**Suite** —
- Laurent, dans Chrome sur `www`, un article à vidéo, desktop puis mobile :
  - aucune requête YouTube avant le clic ;
  - fenêtre d'information, puis « Autoriser et lire la vidéo » : lecture sans erreur 153 ;
  - catégorie « Vidéos YouTube » dans le bandeau cookies.
- Points restés ouverts : vide Webflow sous les 2 figures Vimeo ; clic « Personnaliser » en Pixel 5 (existe déjà sur `main`) ; 3 iframes sans `title` (saasphoto 2, Vimeo 1) ; audit de la carte Google Maps de `/contact` ; garde `addYouTubeReferrerPolicy` retirable sur décision ; #48 ne concerne plus que les 2 figures Vimeo.

---

## 2026-09-29 · #44 — reprise technique sur `main` (vidéos YouTube en façade, correctif 153 de #46 conservé) · Claude de Laurent

**Chantier** : vidéos YouTube des articles, façade locale et consentement contextuel | **PR** : #44, brouillon, non fusionnée | **Branche** : `claude/admiring-hypatia-7pir8f` | **Tête avant reprise** : `c304f5d` | **Base intégrée** : `main` `a1771be`, par commit de fusion (pas de rebase)

**Quoi** — Fusion de `main` dans la branche de #44, avec trois conflits résolus :
- `lib/blog-utils.ts` : dans `processHtmlContent`, `transformYouTubeEmbeds` (#44) est conservé et `addYouTubeReferrerPolicy` (#46) est appliquée ensuite sur sa sortie ; le retour garde `videoCount`. `addYouTubeReferrerPolicy` est exportée pour être testée directement.
- `docs/seo-geo/ETAT.md` et `docs/seo-geo/JOURNAL.md` : entrées de `main` (#45, #46, #47) conservées intégralement ; ligne et entrée de #44 conservées, dans l'ordre chronologique.

Tests de #46 (`lib/__tests__/blog-utils.test.ts`), adaptés sans suppression :
- 7 tests vérifiaient la sortie brute de `processHtmlContent`, où l'iframe YouTube est désormais une façade. Les 8 premiers cas portent maintenant directement sur `addYouTubeReferrerPolicy`, avec les mêmes attentes ; les cas « iframes non YouTube » et « liens » vérifient toujours aussi `processHtmlContent`.
- Le 9e (mots et sommaire) est reformulé : la sortie retraitée contient désormais le texte visible de la façade, la comparaison se fait donc entre le contenu avec et sans vidéo.
- 5 tests d'intégration ajoutés : aucune iframe YouTube brute en sortie (5 variantes, dont `referrerpolicy` préexistant), identifiant illisible retiré, aucun `referrerpolicy` en double, deux passages identiques, mots et sommaire inchangés.

**Pourquoi — relation #46 / #44** — Après #44, aucune iframe YouTube ne sort de `processHtmlContent`. `transformYouTubeEmbeds` la remplace par une façade, ou la retire si l'identifiant est illisible. Ses hôtes reconnus couvrent ceux de #46. `addYouTubeReferrerPolicy` ne modifie donc plus rien : 0 iframe YouTube brute mesurée sur les articles du build. Elle reste en garde, conformément à la consigne de ne supprimer aucune modification de `main` venue de #46. Le correctif 153 des vidéos est porté par le lecteur créé après accord (`components/blog/YouTubeConsent.tsx`, `referrerPolicy = 'strict-origin-when-cross-origin'`). Aucun double `referrerpolicy` n'est possible : aucune iframe YouTube n'est rendue côté serveur, et la fonction ne touche pas une iframe qui en porte déjà un.

**Fichiers** — `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. Aucun fichier de `content/**`, de #48 ni de la phase 1 touché.

**Effet attendu** — Aucun à ce stade : PR en brouillon, non fusionnée.

**Vérifié** —
- `npx tsc --noEmit` OK ; `npx vitest run` 250/250 (14 fichiers, dont `lib/__tests__/youtube.test.ts` de #44) ; `node scripts/seo/verifier-json.mjs` 186 fichiers valides ; `npx next build` vert (valeurs factices de la CI). eslint : aucune erreur nouvelle ; les 2 `no-explicit-any` de `getBlockText` existent déjà sur `main`.
- E2E : configuration temporaire hors dépôt, `next start` local, Chromium du conteneur, Desktop Chrome et Pixel 5.
  - `e2e/youtube-consent.spec.ts` : 16/16.
  - `e2e/cookie-banner.spec.ts` : 17/22. La même spec de `main`, jouée sur le build de `main`, donne 16/20 avec les mêmes 4 échecs : GA4 ×2 (`NEXT_PUBLIC_GA_MEASUREMENT_ID` absente au build local) et clic « Personnaliser » en Pixel 5 ×2. Le 5e échec est le test `externalMedia` ajouté par #44 : il bute sur ce même clic en Pixel 5 et réussit en Desktop Chrome.
- Inventaire du HTML prérendu (articles du blog) :
  - 57 façades (FR 29, EN 28, de-ch 0), dont 53 `pkc-yt--fullwidth` et 4 `pkc-yt--center` : les 2 figures à `padding-bottom:33.72%` (`ai-virtual-lights…` FR et EN) et les 2 YouTube à `padding-bottom:` vide (`photographie-de-produits-a-360…` FR et EN) ;
  - 0 iframe YouTube brute ;
  - iframes restantes dans les articles : 6 (Vimeo 2, Sketchfab 2, saasphoto 2), dont 3 sans `title` (saasphoto 2, Vimeo 1), aucune YouTube ;
  - façades : 57/57 avec `aria-label`. 23 portent le titre de l'iframe ou de la légende ; 34 un libellé générique (« Lire la vidéo YouTube », « Play the YouTube video » ou équivalent de-ch). Le lecteur créé après accord porte un `title` : le titre, sinon « Vidéo YouTube » ou « YouTube video ».
- Mesures Chromium, 1440 et 390 px, 9 articles :
  - façades pleine largeur 662 × 372 et 358 × 201, centrées 576 × 324 (plafond 36rem) et 358 × 201, ratio 1,78, 0 px de vide sous les façades ;
  - 6 légendes sous la vidéo ;
  - débordement horizontal 0 ;
  - Vimeo : figure Webflow inchangée, iframe 300 × 150 et 373 px de vide en 1440 (201 en 390), identique à `main` ; saasphoto : 300 × 150, inchangé.
- Consentement et erreur 153 : HTML du build #44 servi sous `sysnext.vercel.app` avec `Referrer-Policy: same-origin` ajouté, EN et FR, desktop 1440 et Pixel 7.
  - 0 requête YouTube avant le clic.
  - Après « Autoriser et lire » : lecteur `youtube-nocookie.com/embed/VssNUk1qsXg?autoplay=1&rel=0` avec `title` et `referrerpolicy="strict-origin-when-cross-origin"`, Referer `https://sysnext.vercel.app/`, lecteur en `playing-mode` dans les 4 cas. 3 cas ont été relancés, YouTube restant injoignable depuis le conteneur au premier passage.

**Supposé** — `www` sert le même HTML que l'origine Vercel (R4).

**Non regardé** — `www` ; Safari et WebKit réels ; appareils réels ; Preview Vercel (SSO) ; cause du clic « Personnaliser » en Pixel 5 (existe déjà sur `main`) ; vide sous les 2 figures Vimeo (hors périmètre de #44) ; F10 (non lancé).

**Suite** — Validation de Laurent : diff, mesures, texte de politique de confidentialité (commit `5c0b785`), puis décision de fusion. Points ouverts :
- vide sous les figures Vimeo ;
- clic « Personnaliser » en Pixel 5 (existe déjà sur `main`) ;
- 3 iframes sans `title` ;
- garde `addYouTubeReferrerPolicy`, retirable plus tard sur décision ;
- recouvrement avec #48 : après #44, seules les 2 figures Vimeo restent concernées par ses règles.

---

## 2026-09-29 · YouTube 153 — #46 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : correctif ponctuel de l'erreur YouTube 153 | **PR** : #46, fusionnée sur GO de Laurent | **Commit de fusion** : `cd17aeb` (`main`), le 29/09/2026 à 05:31:57 UTC | **Tête fusionnée** : `870b3a1` | **Base avant fusion** : `e3197e0`

**Quoi** — La PR #46 est sortie du brouillon, puis fusionnée par commit de fusion, après CI verte sur `870b3a1` (types, build et intégrité des données ; journal ; conséquences ; Vercel) et une PR sans conflit. PR #44 non touchée. Cloudflare non modifié.

**Décision de Laurent (29/09)** — #46 d'abord, comme correctif ponctuel. Ensuite, #44 sera remise à jour depuis `main` en conservant son architecture façade et consentement, et en retirant le traitement de #46 s'il est devenu inutile. #44 n'est pas fusionnée maintenant.

**Vérifié** —
- `main` = `cd17aeb` ; `870b3a1` en est un ancêtre ; `addYouTubeReferrerPolicy` est présent dans `lib/blog-utils.ts` de `main`.
- `sysnext.vercel.app` sert le HTML corrigé à partir de 05:33:29 UTC (première observation, relevé toutes les 10 s). Avant fusion, à 05:31:49 UTC, les iframes n'avaient pas l'attribut.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 05:33:35 UTC, moins de 2 minutes après la fusion : vert, 17 pages et 3 ressources (sitemap 325 URL, robots.txt, llms.txt).
- `sysnext.vercel.app`, 51 articles portant une iframe (26 FR, 25 EN), tous en 200 : iframes YouTube avec `referrerpolicy="strict-origin-when-cross-origin"` FR 29/29 et EN 28/28 ; 0 attribut en double ; les 6 iframes non YouTube sans attribut.
- Reproduction Playwright sur le HTML de production réel (`sysnext.vercel.app`), servi avec l'en-tête `Referrer-Policy: same-origin` ajouté comme devant `www`. Pages : `/en/blog/5-cameras-realistic-3d-animation` et son équivalent FR. Profils : desktop 1440 px, iPhone 13 et Pixel 7 (émulation, moteur Chromium). Pour la vidéo `VssNUk1qsXg` :
  - Referer présent (`https://sysnext.vercel.app/`) dans les 6 cas ; erreur 153 dans aucun cas ;
  - lecteur prêt dans les 6 cas, `playing-mode` après clic en desktop EN et FR et en Pixel 7 EN et FR ;
  - en iPhone 13, le clic émulé ne lance pas la lecture ;
  - desktop EN et Pixel 7 FR ont été relancés une fois, le lecteur restant illisible au premier passage (réseau du conteneur).

**Supposé** — `www.packshot-creator.com` sert le même HTML que `sysnext.vercel.app` (même projet `sysnext`, le Worker relaie le HTML sans le réécrire). Le Referer envoyé depuis `www` sera `https://www.packshot-creator.com/`.

**Non regardé** — `www.packshot-creator.com` (R4) :
- `curl` reçoit un 403 de challenge Cloudflare ;
- le Chromium du conteneur refuse le certificat du proxy (`ERR_CERT_AUTHORITY_INVALID`, y compris avec les erreurs HTTPS ignorées) ; la vérification TLS n'a pas été désactivée.

La disparition de l'erreur 153 sur `www` n'est donc pas constatée : contrôle dans Chrome à faire par Laurent. Non regardés non plus : Safari et WebKit réels, appareils mobiles réels, rendu effectif des images vidéo (`currentTime` à 0).

**Suite** —
- Laurent, dans Chrome sur `www`, sur les deux articles, desktop puis mobile réel :
  - onglet Réseau, requête `youtube.com/embed/VssNUk1qsXg` : en-tête `Referer: https://www.packshot-creator.com/` ;
  - lecteur affiché, lecture après clic, aucune erreur 153 ;
  - en-tête `referrer-policy` de la page, pour confirmer la source.
- Cloudflare : vérification séparée de la Managed Transform « Add security headers », sans modification.
- #44 : reprise séparée sur le nouveau `main`.

---

## 2026-09-29 · YouTube erreur 153 — `referrerpolicy` sur les iframes YouTube du blog · Claude de Laurent

**Chantier** : correctif ponctuel, hors `06-CHANTIERS.md` (erreur YouTube 153 signalée par Laurent) | **PR** : #46, brouillon (branche `claude/youtube-153-referrer-policy-ykjqx9`) | **Commit** : `7e4b5cb` | **Base** : `96489d9` (`main`) | **Merge et déploiement** : aucun sans GO explicite de Laurent

**Quoi** — `processHtmlContent` (`lib/blog-utils.ts`) ajoute `referrerpolicy="strict-origin-when-cross-origin"` aux seules iframes d'embed YouTube (`youtube.com` ou `youtube-nocookie.com`, avec ou sans `www`, chemin `/embed/`) qui n'en portent pas déjà. Aucun JSON de contenu, aucune URL de vidéo, aucun texte, aucun en-tête global ni réglage Cloudflare modifiés.

**Pourquoi** — Erreur 153 (« Erreur de configuration du lecteur vidéo ») constatée par Laurent sur plusieurs articles en production, dont `/en/blog/5-cameras-realistic-3d-animation`. YouTube exige le Referer pour identifier le site intégrant (Required Minimum Functionality : https://developers.google.com/youtube/terms/required-minimum-functionality). Chaîne établie :
- la réponse de `www` porte `referrer-policy: same-origin` ; l'origine Vercel (`sysnext.vercel.app`) n'envoie ni cet en-tête ni balise `<meta name="referrer">`, et le Worker déployé (`packshot-router`, lu par l'API Cloudflare) ne contient aucune occurrence de « referrer » ;
- avec `same-origin`, le navigateur n'envoie aucun Referer vers YouTube ;
- les 57 iframes issues de Webflow n'ont aucun `referrerpolicy` et héritent de la politique de la page ;
- les deux façades qui portaient déjà ce correctif (07/08, `components/video/YouTubeFacade.tsx`, `components/media/VideoFacade.tsx`) ne sont importées nulle part.

**Fichiers** — `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts` (nouveau), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Dès la mise en production : lecture des vidéos YouTube de 49 articles (25 FR, 24 EN, 57 iframes) sans erreur 153 sur `www`. Aucun effet SEO direct attendu : texte, liens, balises meta, canonical, hreflang et JSON-LD inchangés. [Inférence] Effet indirect possible sur l'engagement de ces pages, non mesurable séparément.

**Vérifié** —
- `npx tsc --noEmit` : OK. `npx vitest run` : 232/232, dont 9 nouveaux (Vitest n'est pas lancé par la CI). Les 9 nouveaux tests, lancés contre la version `main` de `blog-utils.ts` : 5 échouent, 4 passent (ce sont les invariants « inchangé »). `npx eslint --max-warnings=0` sur les 2 fichiers : aucune erreur nouvelle ; 2 erreurs `no-explicit-any` préexistantes dans `getBlockText`, non touchée (étape Lint de la CI en `continue-on-error`). `node scripts/seo/verifier-json.mjs` : 186 fichiers valides. `npx next build` (valeurs factices de la CI) : vert.
- HTML prérendu du build :
  - FR : 29/29 iframes YouTube avec l'attribut, sur 25 pages ;
  - EN : 28/28, sur 24 pages ;
  - de-ch : 0 iframe YouTube sur 48 pages ;
  - aucun attribut en double ; les 6 iframes non YouTube (Vimeo, Sketchfab, saasphoto, 1 FR et 1 EN chacune) sans attribut.
- De-ch : les vidéos affichées sont des MP4 servis par `videos.packshot-creator.com` (fiches produit, article Alphashot XL G2) ou par le site (`/images/gallery-ia/*.mp4`), hors YouTube. Elles ne dépendent pas du Referer, ce qui explique qu'elles fonctionnent. Aucun embed YouTube de-ch à corriger.
- Sortie de `processHtmlContent`, `main` contre branche, sur les 125 JSON de `content/` qui portent un champ `content` : 76 identiques ; 49 qui ne diffèrent que par l'attribut (29 FR, 28 EN) ; iframes non YouTube, sommaire et nombre de mots identiques.
- Playwright (Chromium du conteneur). Page servie sous l'origine `sysnext.vercel.app` avec l'en-tête `Referrer-Policy: same-origin` ajouté, comme devant `www`. Cas A : HTML de production, sans correctif. Cas B : HTML du build local, avec correctif. Pages : l'article EN ci-dessus et son équivalent FR. Profils : desktop 1440 px, iPhone 13 et Pixel 7 (émulation, moteur Chromium).
  - Referer reçu par `youtube.com/embed/VssNUk1qsXg` : absent dans tous les passages A, `https://sysnext.vercel.app/` dans tous les passages B.
  - État du lecteur, lu dans le DOM de l'iframe YouTube (`.ytp-error`, classes de `#movie_player`) :

    | Profil | Page | A, sans correctif | B, avec correctif |
    |---|---|---|---|
    | desktop 1440 | EN | erreur 153 | lecteur prêt, puis `playing-mode` après clic |
    | desktop 1440 | FR | erreur 153 | lecteur prêt, puis `playing-mode` après clic |
    | iPhone 13 | EN | erreur 153 | lecteur prêt (titre et chaîne affichés) |
    | iPhone 13 | FR | erreur 153 | lecteur prêt |
    | Pixel 7 | EN | erreur 153 | lecteur prêt, puis `playing-mode` après clic |
    | Pixel 7 | FR | erreur 153 | lecteur prêt, puis `playing-mode` après clic |

  - Erreur 153 jamais affichée en B. Certains passages ont été relancés : YouTube restait injoignable depuis le conteneur (page d'erreur réseau de Chromium, ou lecteur absent). Ces passages sont écartés du tableau, pas comptés comme des succès. En iPhone 13, le clic émulé ne lance pas la lecture : lecteur prêt, sans erreur. `currentTime` reste à 0 dans tous les cas B : la lecture effective des images n'est pas vérifiée (Chromium sans affichage, réseau du conteneur).

**Supposé** — La source de `referrer-policy: same-origin` : [Inférence] la Managed Transform Cloudflare « Add security headers ». Sa documentation liste exactement `referrer-policy: same-origin`, `x-frame-options: SAMEORIGIN` et `x-content-type-options: nosniff`, relevés devant `www` (https://developers.cloudflare.com/rules/transform/managed-transforms/reference/). Non vérifié : les réglages de la zone ne sont pas lisibles depuis la session, et le relevé a été fait sur une réponse 403 de challenge (R4).

**Non regardé** — Réglages Cloudflare (Managed Transforms, Transform Rules) : rien modifié, à vérifier séparément. Safari et WebKit réels : l'émulation iPhone tourne sur le moteur Chromium. Appareils mobiles réels. Preview Vercel : protégé par le SSO, jeton non transmis ; l'erreur n'y est de toute façon pas reproductible, Cloudflare n'étant pas devant. `www` dans Chrome (R4). Champ `introMedia` des guides (10 iframes embedly Orbitvu), non rendu par le site. Autres tiers soumis au même en-tête `same-origin`.

**Suite** — GO de Laurent pour sortir la PR du brouillon et fusionner. Après fusion :
- `smoke.mjs` sur `sysnext.vercel.app` ;
- dans Chrome sur `www` : en-tête `Referer: https://www.packshot-creator.com/` sur la requête `embed/…`, lecture sans erreur 153, desktop puis Safari iOS et Chrome Android réels ;
- vérification séparée de la Managed Transform « Add security headers » ; aucune modification Cloudflare décidée.

Chevauchement avec la PR #44 (brouillon, `claude/admiring-hypatia-7pir8f`, vue après l'ouverture de #46). #44 remplace les mêmes 57 iframes par une façade locale dans `processHtmlContent`. Son lecteur, créé après « Autoriser et lire la vidéo », porte déjà `referrerPolicy = 'strict-origin-when-cross-origin'` (`components/blog/YouTubeConsent.tsx`).
- Les deux PR modifient les mêmes lignes de `lib/blog-utils.ts` : conflit textuel pour la seconde fusionnée.
- Si #44 est fusionnée, #46 devient sans objet sur le blog.
- La réservation de `lib/blog-utils.ts` par #44 n'existe que sur sa branche, pas sur `main` : elle n'était pas visible au rituel de lecture.

---

## 2026-09-29 · F5 — contrôle visuel sur `www` et retour de Sébastien · Claude de Laurent

**Chantier** : substitution de page, page témoin `/packshot-e-commerce` (F5) | **PR** : #39 (fusionnée le 28/09, `04919f8`) | **Commit** : voir PR

**Quoi** — Clôture du point « contrôle Chrome sur `www` » de l'entrée du 28/09. Aucun fichier du site modifié.

**Vérifié** — Déclarations reçues, non contrôlées par script :
- Laurent a ouvert le 29/09/2026 les trois URL sur `www.packshot-creator.com` (`/fr/packshot-e-commerce`, `/en/packshot-e-commerce`, `/de-ch/packshot-e-commerce`). Son retour, verbatim : « j'ai ouvert rapidement les 3 pages, cela semble ok ». Navigateur non précisé.
- Sébastien a répondu par courriel au message de Laurent du 28/09/2026 à 21:01 (« Mise en ligne de la nouvelle page Packshot e-commerce ») : « c'est parfait !! à suivre pour voir les retombées, la page est canon ! ». Date et heure de sa réponse non transmises. Ce retour ne précise pas quelles langues il a consultées.

**Supposé** — Les balises vues sur `sysnext.vercel.app` le 28/09 (canonical, hreflang, OG, données structurées) sont servies à l'identique par `www` : même projet Vercel, et le Worker du dépôt n'a aucune règle sur ces URL [non vérifié sur `www`].

**Non regardé** — Canonical, hreflang, données structurées et console côté `www` (R4 : pas de contrôle par script ; le contrôle de Laurent a été visuel et rapide).

**Suite** — Relevé GSC sur la landing FR à J+28 (26/10/2026) et J+56 (23/11/2026) ; point de départ GSC du jour de la fusion à figer par Laurent ; aucun lien entrant vers F5 avant J+56.

---

## 2026-09-28 · Vidéos YouTube des articles — façade locale et consentement contextuel · Claude de Laurent

**Chantier** : résidu de l'audit de nettoyage #40/#41 (iframes YouTube chargées sans consentement) | **PR** : brouillon, **non fusionnée** | **Branche** : `claude/admiring-hypatia-7pir8f` | **Base** : `96489d9`

**Quoi** — Au rendu, les 57 iframes `youtube.com/embed` des 49 articles (FR/EN) deviennent une façade locale : lien vers la page YouTube (utilisable sans JavaScript), vignette locale ou fond neutre, icône de lecture générique. Au clic, sans accord, une fenêtre d'information s'ouvre avant tout appel tiers ; le lecteur `youtube-nocookie.com` n'est créé qu'après « Autoriser et lire la vidéo », ou directement si la nouvelle catégorie « Vidéos YouTube » du gestionnaire de cookies (champ interne `externalMedia`) est acceptée. Aucun fichier `content/` modifié.

**Pourquoi** — Mesure « avant » du 28/09 (build local, 6 articles témoins) : toutes les mesures appelaient `www.youtube.com` dès l'affichage, cookies refusés compris ; en nouvelle visite, 12 mesures : 132 requêtes `youtube.com`, 26 `doubleclick.net`, 40 cookies YouTube. Iframe de 300 × 150 px dans une figure de 662 × 570 px.

**Fichiers** — `lib/youtube.ts` (nouveau), `lib/blog-utils.ts`, `components/blog/YouTubeConsent.tsx` (nouveau), `components/cookies/CookieBanner.tsx`, `app/[lang]/blog/[slug]/page.tsx`, `app/[lang]/confidentialite/page.tsx`, `app/globals.css`, `messages/{fr,en,de-ch}.json` (`cookies`, `externalVideo`, `privacy.article6`), `lib/__tests__/youtube.test.ts` (nouveau), `e2e/youtube-consent.spec.ts` (nouveau), `e2e/cookie-banner.spec.ts`.

**Choix de conception** — L'accord donné dans la fenêtre vaut pour la vidéo cliquée, sans être mémorisé ; l'accord durable passe par le gestionnaire (lien dans la fenêtre). « Tout accepter » inclut désormais les vidéos YouTube, « Tout refuser » les exclut ; un cookie de consentement antérieur sans la catégorie vaut refus. Retirer la catégorie retire les lecteurs ouverts et remet les façades. Tout clic sur la façade, clic du milieu compris, passe par la fenêtre ; seul le menu contextuel du navigateur ouvre encore le lien directement. Titre de la vidéo : attribut `title` de l'iframe (17), sinon texte de la légende (6), sinon nom accessible générique (34). Vignette locale pour la seule vidéo déjà illustrée sur le site (`tR-6RBucmWw`, affiche de la fiche Alphashot Pro G2) ; aucune vignette téléchargée depuis YouTube.

**Vérifié** —
- `npx tsc --noEmit` vert ; `npx next build` vert ; `node scripts/seo/verifier-json.mjs` : 186 JSON valides ; ESLint sur les fichiers touchés : aucune nouvelle alerte (3 erreurs et 1 avertissement préexistants dans `CookieBanner.tsx`, `lib/blog-utils.ts` et la page article).
- Vitest : 13 tests YouTube sur le corpus réel — 57 intégrations, 49 fichiers, 23 vidéos ; 0 iframe YouTube restante ; 8 `start` conservés (1, 1, 5, 5, 5, 5, 8, 8) ; 6 légendes identiques ; 17 titres d'iframe ; alignement centré ou pleine largeur ; titres h2/h3 et nombre de mots inchangés ; aucune référence ytimg, Google ou DoubleClick.
- Playwright `e2e/youtube-consent.spec.ts` : 16/16 (Desktop Chrome et Pixel 5) — façades, fenêtre, Annuler, Échap, croix, lecteur et attributs, accord non mémorisé, catégorie acceptée, retrait, clavier (Espace sans défilement, Entrée), sans JavaScript.
- Playwright `cookie-banner` + `seo` sur le build final : 245 réussis, 9 échecs. Les 9 mêmes échouent sur un build local de `origin/main` (`96489d9`) : test GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID` absente au build local, `GoogleAnalytics.tsx:47`) et 8 contrôles de longueur de title / meta description ou de hreflang sur des pages non touchées.
- Preuve réseau, build local, réseau réel, 51 mesures (6 articles à vidéos, `/fr/contact` et un article sans vidéo en témoins) : en nouvelle visite (1440 et 390 px), cookies refusés, analytics accepté et vidéos YouTube refusées, vidéos YouTube acceptées sans clic : 0 requête `youtube.com`, `youtube-nocookie.com`, `ytimg.com`/`ggpht.com`, `doubleclick.net`, `googlevideo.com` ; 0 cookie YouTube ou Google ; CLS 0 ; débordement horizontal 0. Clic sans accord : fenêtre affichée, 0 requête YouTube pendant son affichage ; Annuler : 0.
- Après « Autoriser et lire » (4 mesures dédiées, 1440 et 390 px) : iframe `https://www.youtube-nocookie.com/embed/<id>?autoplay=1&rel=0[&start=N]`, `referrerpolicy="strict-origin-when-cross-origin"`, `allowfullscreen`, titre ; domaines contactés : `www.youtube-nocookie.com`, `i.ytimg.com`, `yt3.ggpht.com`, `*.googlevideo.com`, `jnn-pa.googleapis.com`, `www.google.com`, `www.gstatic.com`, `ssl.gstatic.com`, `fonts.gstatic.com` ; 0 requête `youtube.com`, 0 `doubleclick.net` ; 0 cookie tiers relevé ; aucune erreur console hors visionneuses 360 Orbitvu (préexistantes).
- Géométrie : façade 662 × 372 px (pleine largeur) et 576 × 324 px (centrée) à 1440 px ; 358 × 201 px à 390 px ; fenêtre d'information contenue dans l'écran aux deux largeurs.

**Supposé** — Le comportement mesuré sur Chromium local vaut pour la production (même code, même build) ; non contrôlé sur Preview ni sur `www`.

**Non regardé** — Lecture effective : YouTube affiche « Video unavailable » dans le conteneur (4/4 après activation) ; lecture automatique, départ à `start`, cookies et stockage après une lecture réelle : non mesurés, à contrôler dans Chrome sur le Preview. Firefox et Safari. `www.packshot-creator.com` (R4). Qualification juridique du texte de politique de confidentialité et de la fenêtre : aucune.

**Suite** —
- Texte de la politique de confidentialité (article 6, « Vidéos YouTube ») : proposition à valider par Laurent avant fusion ; il remplace « Aucun cookie marketing n'est utilisé actuellement sur ce site. » en FR, EN et de-ch.
- Corrections du 29/09 après relecture de Laurent : libellé de la catégorie « Contenus externes » remplacé par « Vidéos YouTube » (FR), « YouTube videos » (EN), « YouTube-Videos » (de-ch), la catégorie ne gouvernant que YouTube ; « vignette locale » remplacé par « façade locale » dans la politique (une seule vidéo a une vignette) ; information contextuelle complétée (finalités, autres traitements possibles) ; lien vers les règles de confidentialité de Google dans la langue de la page (`hl=fr`, `hl=en`, `hl=de`).
- **GOOGLE_MAPS_PRIVACY_AUDIT_REQUIRED = YES** : iframe Google Maps de `/contact` chargée à l'affichage (`app/[lang]/contact/page.tsx:154`), audit séparé.
- 6 autres iframes tierces se chargent à l'affichage : Vimeo (2), Sketchfab (2), saasphoto.com (2) ; non couvertes par la catégorie, qui ne vise que YouTube.
- Contenu : deux paragraphes vides (`<p>‍</p>`) hérités de Webflow séparent certaines figures (prose de Sébastien, non touchée).

---

## 2026-09-28 · F5 — #39 fusionnée et contrôlée en production (FR, EN, de-ch) · Claude de Laurent

**Chantier** : substitution de page, page témoin `/packshot-e-commerce` (F5) | **PR** : #39 fusionnée ; #24 fermée | **Commit de fusion** : `04919f8` (`main`), le 28/09/2026 à 18:42:03 UTC | **Tête fusionnée** : `55ea992` | **Base avant fusion** : `b26f6e9`

**Quoi** — Fusion de #39 par commit de fusion (méthode de #40 et #41), après sortie du brouillon. Avant fusion : CI verte sur `55ea992` (types, build et intégrité des données ; journal ; conséquences ; Vercel), Preview « Ready », PR sans conflit. PR #24 fermée sans fusion, commentaire « SUPERSEDED BY #39 ». PR #27 non touchée.

**J0 de mesure F5** — Nouvelle landing servie par `https://sysnext.vercel.app` à partir du 28/09/2026 à 18:43:35 UTC (première observation, contrôle toutes les 15 s depuis la fusion). J+28 = 26/10/2026 ; J+56 = 23/11/2026. Aucun lien entrant vers F5 avant J+56 (D37).

**Vérifié** —
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 18:43:51 UTC, moins de 2 minutes après la fusion : vert, 17 pages et 3 ressources (sitemap 325 URL, robots.txt, llms.txt).
- `/fr`, `/en` et `/de-ch/packshot-e-commerce` sur `sysnext.vercel.app`, contrôle HTTP du HTML servi : statut 200, `lang` correct, un H1 (nouveau), title et canonical de la langue, 5 hreflang (fr, fr-CH, en, de-CH, x-default), OG (`fr_FR`, `en_US`, `de_CH`) et Twitter localisés, fil d'Ariane à la bonne locale, FAQ visible = JSON-LD (9/9, identiques), aucun claim interdit, alt de la photo de studio sans nom de modèle ; liens internes 21 (FR), 21 (EN), 20 (de-ch), tous en 200. Les seuls textes identiques au FR trouvés en EN et de-ch sont des libellés de portée composés de noms propres (« Amazon, Google Merchant Center »).
- Dépôt : le Worker Cloudflare (`cloudflare-worker/src/index.js`) ne porte que des redirections d'anciennes URL vers ces pages, aucune règle sur les trois URL.

**Supposé** — La version servie par `www.packshot-creator.com` est celle de `sysnext.vercel.app` (même projet `sysnext`) ; le Worker déployé n'a pas re-divergé du dépôt sur ces URL (R5, non resynchronisé ici).

**Non regardé** — `www.packshot-creator.com` : aucun contrôle par script (R4, Cloudflare renvoie 403 aux clients non navigateurs) ; contrôle à faire dans Chrome. Rendu navigateur en production : Chromium de l'environnement ne reconnaît pas l'autorité du proxy et la vérification TLS n'a pas été désactivée ; le rendu (console, 4xx des ressources, débordement, captures) a été contrôlé sur le build local identique avant fusion. Point de départ GSC du jour de la fusion : à figer par Laurent dans Supabase.

**Suite** — Contrôle Chrome des trois URL sur `www` ; relevé GSC à J+28 et J+56 sur la landing FR ; D38 à appliquer aux prochains articles, dont l'article AI Act.

---

## 2026-09-28 · F5 — landing traduite en EN et de-ch, publication trilingue · Claude de Laurent

**Chantier** : substitution de page, page témoin `/packshot-e-commerce` (F5) | **PR** : #39 | **Commit** : voir PR | **Décisions** : D37 (périmètre trilingue), D38 (règle de traduction)

**Changement de périmètre** — Le brief F5 prévoyait le FR seulement. Laurent décide le 28/09 une publication simultanée en FR, EN et de-ch (D37), sans nouvelle validation de Sébastien. La mesure principale reste celle de la landing FR ; J0 = mise en production ; gel des liens entrants jusqu'à J+56.

**Quoi** — `PackshotEcommerceFr.tsx` devient `PackshotEcommerce.tsx`, servi dans les trois langues ; `page.tsx` n'utilise plus `PackshotLandingTemplate` (non modifié, toujours utilisé par les autres landings). Blocs `packshotEcommerce` de `messages/en.json` et `messages/de-ch.json` remplacés par la traduction du FR du commit `315bc5c` : 309 messages, structure de clés identique. Métadonnées complètes dans les trois langues (canonical, hreflang, OG `fr_FR` / `en_US` / `de_CH`, Twitter) ; le traitement « FR seulement » est supprimé.

**Pourquoi** — Les anciennes versions EN et de-ch affichaient 500+ produits/jour, -80 % de coûts, ROI 4-8 mois, moins de 1 € par image, « all marketplaces » / « alle Marktplätze », un témoignage non validé. Ils disparaissent avec les anciens namespaces.

**Fichiers** — `components/landings/PackshotEcommerce.tsx` (renommé), `app/[lang]/packshot-e-commerce/page.tsx`, `messages/en.json` et `messages/de-ch.json` (bloc `packshotEcommerce` seul), `docs/seo-geo/DECISIONS.md`, `JOURNAL.md`, `ETAT.md`.

**Choix de traduction** — EN américain (usage du dépôt : color, catalog, jewelry), « packshot » gardé pour le concept de la page. de-ch sans « ß », séparateur de milliers en espace insécable (usage majoritaire de `de-ch.json`), guillemets « ». Portées conservées : Qualiopi et OPCO présentés comme français, « support en français » traduit tel quel (aucun claim sur l'allemand, D33), leasing suisse tel que le FR le formule. Repères de terrain de Sébastien traduits avec leurs conditions et leur attribution ; `session.avif` sans nom de modèle. Dates : `September 28, 2026` en EN, `28.09.2026` en de-ch.

**Liens et sources** — En de-ch, cibles non traduites épinglées sur /en par `navPinLocale` (Academy, simulateur OPCO) ; articles au slug de chaque langue (`alternates.json`), avec repli vers l'anglais, signalé « (auf Englisch) », pour « prestataire » et le guide « collection ». Sources : URL inchangées pour Amazon (amazon.fr, libellé explicite), NN/g, Baymard, Zalando, Orbitvu ; Google `6324350?hl=en` (EN et de-ch) et `16989427?hl=en` / `?hl=de`, Shopify `/en/` : versions contrôlées le 28/09 (`6324350?hl=de` : 429, non utilisée).

**Vérifié** — Parité des clés : `MISSING_KEYS_EN = 0`, `EXTRA_KEYS_EN = 0`, `MISSING_KEYS_DE_CH = 0`, `EXTRA_KEYS_DE_CH = 0` ; 309 × 3 messages ICU compilés ; `npx tsc --noEmit` ; eslint des 2 fichiers de code ; `verifier-json.mjs` (186) ; vitest 223/223 ; `npx next build` (3 routes pré-rendues). Build local, 3 langues × 1440 et 390 px : statut 200, 1 H1, `lang` correct, canonical, 5 hreflang, OG et Twitter localisés, fil d'Ariane à la bonne locale, FAQ visible = JSON-LD (9/9), 0 texte FR résiduel en EN et de-ch, 0 clé manquante, 0 claim interdit, 0 erreur console, 0 réponse 4xx, 0 ancre cassée, 0 débordement, images chargées, formulaire en type « demo » masqué ; liens internes : 21 (FR, EN) et 20 (de-ch) en 200. Recherche de claims dans les 3 namespaces : seules occurrences restantes, identiques dans les trois langues, « moins d'une seconde » (déclenchement), « 15 secondes par packshot » (unité Orbitvu), 200 à 300 photos par jour (passage attribué et FAQ 5).
**Supposé** — Aucun.
**Non regardé** — Relecture par un locuteur natif EN et germanophone suisse ; Preview (SSO) ; rendu derrière Cloudflare.

**Suite** — Fusion de #39 si CI verte et Preview prête, puis contrôle de production (entrée suivante).

---

## 2026-09-28 · F5 — photo de studio : modèle retiré de l'alt et de la légende · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : #39 (brouillon) | **Commit** : voir PR

**Quoi** — Alt et légende de `machines/alphashot-pro-g2/session.avif` dans `#automatisation` : « Alphashot Pro G2 » retiré. Alt : « Une opératrice positionne une paire de lunettes de soleil dans un studio photo automatisé Orbitvu ». Légende : « Au poste de prise de vue, l'opératrice place le produit dans le studio Orbitvu, qui enchaîne ensuite les angles prévus. » Fichier ni renommé ni déplacé.

**Pourquoi** — Décision de Laurent : le chemin du fichier et son usage sur la fiche Pro G2 ne suffisent pas à identifier visuellement le modèle photographié.

**Fichiers** — `messages/fr.json` (2 lignes, `packshotEcommerce.r5.imageAlt` et `imageCaption`).

**Vérifié** — `npx tsc --noEmit` ; `node scripts/seo/verifier-json.mjs` (186) ; 309 messages ICU compilés ; `npx next build` ; rendu local du bloc à 1440 × 900 et 390 × 844 : image chargée, nouveaux alt et légende, aucune mention « Pro G2 » dans le bloc, 0 débordement, 0 erreur console. Attribution du passage de terrain inchangée : « photographe » figure dans la proposition d'attribution du fichier de passation transmis pour Sébastien et dans deux articles du dépôt.
**Supposé** — Rien.
**Non regardé** — Preview (SSO) ; rendu derrière Cloudflare.

**Rectificatif de compte rendu (hors page)** — Mesures de longueur mobile établies : nouvelle page complète 38,4 écrans ; ancienne page complète 32,9 écrans ; nouvelle page avant formulaire 32,4 écrans ; ancienne page avant formulaire non mesurée (≈ 26 écrans selon l'observation de Sébastien, estimation non comparable). HTML local de la nouvelle version : 626 243 octets ; hausse d'environ 47 à 49 Ko selon la référence, méthode de l'ancienne mesure non entièrement vérifiable. Les marquages des lunettes apparaissent sur les photos et ne sont lisibles que sur le fichier pleine résolution agrandi.

---

## 2026-09-28 · F5 — intégration du retour de Sébastien sur `/fr/packshot-e-commerce` · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : #39 (brouillon) | **Commit** : voir PR | **Base** : `main` `b26f6e9` (post-#40/#41), fusionnée dans la branche en `4683dfa`

**Quoi** — Retour de Sébastien (fichier `2026-09-28-instructions-claude-packshot-e-commerce.md` et 5 photos) intégré dans la version FR : nouveau H1, hero local (texte avant galerie sur mobile), repères « En bref », sommaire reformulé avec retour au sommaire par section, galerie des 5 vues de lunettes dans `#fiche-produit`, section interne / prestataire réécrite (IA transversale, option mixte), passage de terrain validé dans `#automatisation` avec photo de studio en situation, exports (export, module, abonnement, configuration), unités de cadence, budget, FAQ (9 questions), bouton de démonstration relié au formulaire de la page. Correction ciblée de l'Alphastudio Compact dans les données machines.

**Pourquoi** — Retour de Sébastien du 28/09 sur la Preview ; consignes de Laurent (« GO — reprise F5 après fusion #40 et #41 ») : aucune caricature du prestataire, chiffres de terrain attribués et conditionnés, « Google Merchant Center » en toutes lettres, règle Amazon `contains-synthetic-performer` limitée aux personnes photoréalistes entièrement synthétiques.

**Fichiers** — `messages/fr.json` (bloc `packshotEcommerce` seul, lignes 1219-1741), `components/landings/PackshotEcommerceFr.tsx`, `components/forms/ContactForm.tsx` (prop optionnelle `hideRequestType`, défaut `false`), `components/calculators/ROICalculator/lib/machines.ts` et `components/machine-selector/lib/machines.ts` (entrée `alphastudio-compact-v2` seule), `components/calculators/ROICalculator/lib/machineSelector.ts` (commentaire), `public/images/packshot-e-commerce/` (5 AVIF, 70 Ko au total).

**Décisions sur le retour** —
- Passage de terrain repris mot pour mot, une seule substitution demandée par Laurent : « studio PackshotCreator-Orbitvu » devient « studio automatisé Orbitvu ». Attribution : « photographe et président de Sysnext (PackshotCreator) » ; « directeur » ne figure nulle part dans le dépôt, « Président » figure dans les mentions légales. Aucune relecture de toute la page n'est attribuée à Sébastien.
- 5 photos : une seule monture ; trois quarts en vue principale, puis face, profil, branches repliées, gros plan de la charnière. Lazy, aucun préchargement.
- Étude De, Hu et Rahman retirée (corrélation sans décision applicable) ; la source et le compteur passent de 5 à 4.
- Sommaire compact fixe écarté : l'en-tête du site est déjà `sticky` ; un lien « Retour au sommaire » par section le remplace.
- Formulaire : type de demande fixé à « démonstration » par une prop optionnelle ; les autres usages de `ContactForm` sont inchangés (valeur par défaut `false`).

**Corrections factuelles** —
- Alphastudio Compact : 80 × 70 × 130 cm et 150 produits par jour (orbitvu.com et orbitvu.fr, relevé du 28/09) au lieu de 100 × 70 × 190 cm (plus haut que l'appareil, 183 cm) et 180. Axes non précisés par Orbitvu : ordre de publication conservé dans `dimensionsMax` (l, w, h). Rayon : fiche `/studio-photo/alphastudio-compact-v2` FR, EN, de-ch (FAQ visible et JSON-LD, statistiques clés), sélecteur `/studio-photo/selecteur-machines`, moteur et assistant ROI (`capaciteJour`), `lib/roiChat/*`, pages `/solutions/[slug]` et `/industrie-defense` qui lisent `machines.ts`. La catégorie « grand » du sélecteur reste compatible (comparaison triée : [80, 70, 60] contre [130, 80, 70]).
- Amazon : le minimum de 500 px vaut pour toutes les images (G1881), le fond blanc et les 85 % pour l'image principale ; « bordures de l'image principale » retiré (page US G75, non citée). FAQ : « plusieurs images en plus de l'image principale, ainsi qu'une vidéo » (G1881 FR : « au moins six images supplémentaires » ; blog US : « at least six » au total).
- Zalando (mis à jour le 31/08/2026) : fond gris clair ajouté par Zalando, 20 Mo, exception marques de créateurs (1 800 × 2 600 px). Shopify : jusqu'à 5 000 × 5 000 px, « pas de minimum » retiré (non écrit par la source).
- Modules Orbitvu (manuel mis à jour le 11/09/2026) : Magento 2 ≥ 2.2.0, PrestaShop 1.7.x, WooCommerce en SUN ou auto-hébergé ; Shopware 6 et Shopify en SUN seulement ; modules SUN inclus dès la formule 6G, Shopify payant à part ; auto-hébergé sans vidéo, licence du lecteur ou version de base gratuite.

**Vérifié** — `npx tsc --noEmit` ; eslint des 6 fichiers modifiés ; `node scripts/seo/verifier-json.mjs` (186 fichiers) ; 309 messages ICU compilés ; vitest 223/223 ; `npx next build`. Build local (Chromium, 1440 × 900 et 390 × 844) : un H1, ordre mobile H1 → intro → galerie, 0 ancre cassée, 9 titres ciblés visibles sous l'en-tête, FAQ visible = JSON-LD (9/9), 0 erreur console, 0 réponse 4xx, CLS 0, aucun débordement, cibles ≥ 24 px, contrastes ≥ 5,9:1, aucun claim interdit. Performance (médiane de 3) : desktop LCP 340 ms (324 avant), mobile bridé 1 408 ms (1 448 avant), poids initial mobile 618 Ko (606 avant). e2e : 11 échecs sur des pages non touchées (titres et descriptions EN, `/fr/industrie`, hreflang `packshot-bijoux`, débordement de `/fr`), plus `machine-selector.spec.ts` qui attend des textes absents du code.
**Supposé** — Le libellé « président » convient pour une attribution éditoriale [non vérifié auprès de Sébastien, qui n'est pas sollicité] ; la page Shopify FR (403 au script) dit la même chose que la page EN contrôlée.
**Non regardé** — Rendu derrière Cloudflare ; Preview (SSO) ; envoi réel du formulaire ; versions EN et de-ch de la landing (gabarit partagé non modifié).

**Suite** — Ouverts hors périmètre : Alphastudio XXL affiché 100 × 70 × 190 cm dans `machines.ts` et `messages/*.json` contre 190 × 90 × 100 cm chez Orbitvu (non corrigé par analogie) ; fiche Compact : « Hauteur un peu juste pour mannequins vivants adultes » et « retour sur investissement en 12 à 18 mois » inchangés ; le sélecteur affiche `capaciteJour` en « photos/j » alors qu'Orbitvu parle de produits par jour ; Zalando publie aussi une politique d'étiquetage des contenus générés par IA, non ajoutée (consigne : aucun autre contenu IA modifié).

---

## 2026-09-28 · #40 fusionnée et contrôlée en production (intégrations obsolètes) · Claude de Laurent

**Chantier** : nettoyage, hors chantier numéroté | **PR** : #40 fusionnée | **Commit de fusion** : `15469e5` (`main`), le 28/09/2026 à 15:51:29 UTC | **Base avant fusion** : `809f61f`

**Quoi** — Fusion de #40 (commit de fusion, méthode habituelle du dépôt), puis contrôle de la production sur `sysnext.vercel.app`. PR #39 (F5) non touchée : tête `dc01234` inchangée.

**Pourquoi** — Consigne de Laurent du 28/09 : finaliser, fusionner et contrôler #40 avant la reprise de F5.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Plus aucun appel à `app.lemlist.com` ni à `iframe.packshot-creator.com` sur le site ; GA4 inchangé.

**Vérifié**
- Avant fusion : `main` toujours sur `809f61f`, aucune review, CI verte sur `252ba17` (4 contrôles), `mergeable_state` `clean` ; recontrôle local : `tsc`, 186 JSON, Vitest 223/223, build 383 pages.
- Déploiement : la production sert le nouveau code à partir de 15:53:14 UTC (disparition du marqueur `lemlist` du HTML de `/fr`, sondage toutes les 10 s). Le SHA servi n'est pas exposé par la réponse ; identifiant Vercel de la requête de contrôle : `iad1::cf6p7-1790610795146-76af8128c9eb`.
- `smoke.mjs https://sysnext.vercel.app` à 15:53:42 UTC : tout vert, 17 pages, 3 ressources, sitemap 325 URL (identique au relevé d'avant fusion).
- Réseau, `sysnext.vercel.app`, 11 pages × 3 scénarios (nouvelle visite, analytics accepté, cookies refusés), Chromium ; requêtes vers les collecteurs GA4 et vers Lemlist enregistrées puis abandonnées, pour n'envoyer aucun hit ni aucune visite. Avant → après fusion : requêtes Lemlist (`/api/visitors/tracking`) 33 → 0 ; balises `#lemlist-tracker` 33 → 0 ; requêtes `iframe.packshot-creator.com` 21 → 0 ; `webforms.pipedrive.com` 0 → 0 ; hôtes Webflow 0 → 0 ; 33/33 chargements en 200 des deux côtés.
- GA4 : script chargé sur les 9 pages `[lang]` avec consentement analytics, sur 0 page sans consentement ou après refus, avant comme après. `/calculateur-roi` et `/etude-clients-2026` ne le chargent dans aucun cas, avant comme après.
- Formulaire natif sur `/fr/contact`, `/fr/studio-photo/alphashot-pro-g2`, `/fr/packshot-e-commerce` : affiché, 14 à 15 champs, envoi à vide bloqué (6 messages), aucun appel à `/api/contact` (interception de sécurité), aucune trace WebForms.
- Blog et guides : 191 URL du sitemap, 191 en 200. Redirections historiques de `next.config.ts` : 7 témoins, 7 en 301 vers la cible attendue.
- Chargement de page : dans le conteneur, Chromium perd une partie des requêtes parallèles vers `sysnext.vercel.app` (`ERR_TOO_MANY_RETRIES` du proxy) ; les requêtes vers l'hôte contrôlé ont été relayées par Node avec relance, sans quoi la page ne s'hydrate pas et GA4 paraît absent à tort.
**Supposé** — [Inférence] Que `www.packshot-creator.com` sert le même déploiement que `sysnext.vercel.app` : le Worker proxifie vers `NEXTJS_ORIGIN`. Cela repose sur des schémas observés.
**Non regardé** — `www.packshot-creator.com` : 403 `cf-mitigated: challenge` depuis le conteneur (R4), contrôle à faire dans Chrome. Redirections du Worker (non modifiées, non redéployées). Envoi réel du formulaire : non déclenché. Double `page_view` GA4 : hors périmètre, chantier séparé.

**Anomalie hors périmètre** — `/fr/blog/taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques` contient une balise `<img>` dont la source est une vidéo (`/images/blog/67dbae80b8c0e26556f4ebeb.mp4`, servie en 200) : elle ne peut pas s'afficher. Balise identique dans `809f61f`, héritée de Webflow, non modifiée par #40.

**Corrections de l'entrée précédente (28/09)** — Correction : affirmations non vérifiées, qui auraient dû être étiquetées. « Les iframes pointaient vers un hôte injoignable » : constaté depuis le conteneur seulement (502 du proxy) ; [Non vérifié] depuis un navigateur ordinaire. « `trail.` est le domaine de suivi des e-mails Lemlist » : seul le domaine personnalisé Lemlist est vérifié ; [Inférence] l'usage e-mail. « `WEBFLOW_ORIGIN` reste dans la configuration du Worker déployé » : [Non vérifié] au 28/09, tiré du relevé du 23-25/09. Le message du commit `85cfdbe` affirme que la mention « aucun cookie marketing » de la politique de confidentialité « reste exacte » : [Non vérifié], 57 intégrations `youtube.com/embed` et une carte Google Maps restent sur le site.

**Suite**
- Laurent, dans Chrome sur `www` : `/fr`, `/fr/contact`, `/fr/studio-photo/alphashot-pro-g2`, `/calculateur-roi`, `/etude-clients-2026` et les 5 articles nettoyés ; onglet Réseau : aucune requête `lemlist` ni `iframe.packshot-creator.com`.
- Hors dépôt, non exécuté : variables `WEBFLOW_*` du projet Vercel `sysnext` (à vérifier, puis supprimer si elles existent) ; clé API Webflow à révoquer si elle existe ; tracking visiteurs Lemlist à désactiver côté compte ; enregistrement DNS `iframe.` à vérifier, puis supprimer s'il existe. `trail.packshot-creator.com` conservé tant que l'usage e-mail de Lemlist n'est pas explicitement abandonné.
- `.env.example` : 4 lignes `WEBFLOW_*` à retirer par une PR dédiée, avec l'accord du propriétaire du garde-conséquences.
- F5 (#39) peut reprendre : conflits attendus uniquement dans `JOURNAL.md` et `ETAT.md`.

---

## 2026-09-28 · Suppression des intégrations obsolètes : Lemlist, Pipedrive WebForms, iframes legacy, Webflow API · Claude de Laurent

**Chantier** : nettoyage, hors chantier numéroté (décision métier du 28/09/2026 : les quatre éléments sont obsolètes) | **PR** : #40 (branche `claude/admiring-hypatia-7pir8f`) | **Base** : `809f61f` | **Non fusionnée, non déployée**

**Quoi** — Supprimés le 28/09/2026 : le tracking visiteurs Lemlist (composant et 3 montages), le composant legacy Pipedrive WebForms, les 7 iframes `iframe.packshot-creator.com` de 5 articles, l'intégration API Webflow (clients, scripts d'extraction, `WEBFLOW_ORIGIN`, CDN autorisé, dépendances `puppeteer` et `dotenv`). Catégorie `marketing` retirée du bandeau cookies.

**Pourquoi** — Lemlist chargeait `app.lemlist.com` sur toutes les pages, **sans condition de consentement**, alors que le bandeau annonçait « aucun cookie marketing ». Les iframes pointaient vers un hôte injoignable. WebForms et le client Webflow n'étaient plus importés nulle part. L'audit `AUDIT_TRACEURS_CODES_INJECTES_2026-09-28.md` cité par la demande n'est pas dans le dépôt : inventaire refait par `git grep`.

**Fichiers**
- Supprimés : `components/analytics/LemlistTracker.tsx`, `components/forms/PipedriveContactForm.tsx`, `lib/webflow.ts`, `lib/webflow-guides.ts`, `scripts/extract-webflow-content.mjs`, `extract-guides.js`, `extract-guides-puppeteer.cjs`, `QUICK_START_FORMS.md`, `FORMS_MIGRATION_GUIDE.md`, `FORMS_SUMMARY.md`, `Webflow_Forms_Inventory.md`.
- Code : `app/[lang]/layout.tsx`, `app/calculateur-roi/layout.tsx`, `app/etude-clients-2026/layout.tsx`, `components/forms/index.ts`, `components/cookies/CookieBanner.tsx`, `lib/content.ts` (commentaire), `next.config.ts` (`cdn.prod.website-files.com` retiré de `remotePatterns`), `cloudflare-worker/wrangler.toml` (`WEBFLOW_ORIGIN`), `package.json`, `package-lock.json` (81 paquets retirés, aucune version modifiée).
- Contenu : 4 articles FR et 1 article EN (liste ci-dessous) ; `messages/{fr,en,de-ch}.json` : clés `cookies.marketing` et `cookies.marketingDesc` seulement.
- Tests et documentation : `e2e/cookie-banner.spec.ts` (2 catégories), `cloudflare-worker/README.md` (réécrit : il décrivait un routage vers Webflow), note datée en tête de `docs/README.md`, `docs/02-technical-developer/README.md`, `docs/03-cms-content/README.md`, `docs/05-architecture-integrations/README.md`, `docs/06-seo-performance/README.md`, `PROJECT_GUIDELINES.md` ; note sous l'exemple de logo de `docs/01-design-branding/README.md`.

**Articles nettoyés de `iframe.packshot-creator.com`** — la `<figure>` entière est retirée (iframe, conteneur, légende vide), aucun texte réécrit : aucune transition ne dépendait du média.
- `/fr/blog/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre` : 2 (animations `saw_hemispherical`, `Gold_bag_hemispherical`)
- `/en/blog/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre` : 2 (mêmes animations)
- `/fr/blog/oscaro-com-reduit-ses-retours-darticles-commandes-en-ligne-grace-aux-visuels-a-360deg` : 1 (animation 360° `Motor_360`)
- `/fr/blog/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter` : 1 (`MarbleStatue_Hemispherical` ; l'exemple Orbitvu qui suit reste en place)
- `/fr/blog/taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques` : 1 (`couch_360`, en fin d'article)

**Effet attendu** — Au déploiement : plus aucun appel à `app.lemlist.com` ni à `iframe.packshot-creator.com` ; bandeau cookies à deux catégories ; installation des dépendances sans `puppeteer` (qui télécharge un Chromium à l'installation). Aucun effet sur GA4, les formulaires, le blog ni les guides.

**Vérifié**
- `git grep` : `LemlistTracker`, `app.lemlist.com`, `lemlist-tracker`, `/api/visitors`, `iframe.packshot-creator.com` = 0. `webforms.pipedrive.com` (4) et `PipedriveContactForm` (21) ne subsistent que dans des archives datées (`livrables/`, `sessions/`, `PROMPT_SESSION_PHASE2*.md`, `PLAN_ACTION_MASTER.md`, audit du 26/09), non réécrites.
- Aucun import de `lib/webflow.ts` ni de `lib/webflow-guides.ts` avant suppression ; `lib/content.ts` lit uniquement `content/**`. `env.WEBFLOW_ORIGIN` n'est lu nulle part dans `cloudflare-worker/src/index.js`. Aucun contenu ne référence `cdn.prod.website-files.com`.
- `npx tsc --noEmit` vert ; `verifier-json.mjs` : 186 JSON valides ; Vitest 223/223 ; `npx next build` vert, 383 pages, table des routes identique à la base ; `npm ci` vert sur le nouveau lockfile ; ESLint : 267 → 258 erreurs, 70 → 68 avertissements, écart dû aux seuls fichiers supprimés (l'erreur `set-state-in-effect` de `CookieBanner.tsx` préexiste).
- Réseau, build local, 11 pages × 2 scénarios de consentement (Chromium, certificats du proxy acceptés) : requêtes Lemlist 38 → 0 (dont 16 `POST /api/visitors`), requêtes `iframe.packshot-creator.com` 14 → 0, balises `#lemlist-tracker` 22 → 0, `webforms.pipedrive.com` 0 → 0. GA4 : chargé sur les 9 pages `[lang]` après consentement et absent sans consentement, avant comme après ; `/calculateur-roi` et `/etude-clients-2026` n'ont jamais monté GA4.
- Playwright en local sur build de production (Chromium) : `cookie-banner` 10/10 et `contact-form` 11/11 sur la branche. Sur la base `809f61f`, l'ancienne spec `contact-form` échouait déjà sur ses 5 tests `.pipedriveWebForms` (conteneur absent depuis le passage au formulaire natif) : ils visent désormais le formulaire natif. `roi-calculator` (23 échecs), `seo` (8) et `language-switch` (1) : échecs identiques, test par test, sur la base et sur la branche, donc sans lien avec cette PR.
- Formulaire natif sur `/fr/contact`, une fiche machine et `/fr/packshot-e-commerce` : affiché, envoi à vide bloqué (6 messages, aucun appel à `/api/contact`), à l'identique de la base ; `/api/contact` rejette un envoi invalide à l'identique. Aucun envoi réel (il aurait déclenché des appels sortants sans secrets).
- Captures d'écran avant/après de 3 articles : le vide de 150 à 200 px laissé par chaque iframe cassée a disparu ; aucun conteneur ni légende orphelins. Blog et guides : 202 routes prérendues, identiques à la base.
- `trail.packshot-creator.com` répond la page « Custom domain check » de Lemlist : c'est le domaine de suivi des e-mails Lemlist, pas le tracker du site (qui appelait `app.lemlist.com`).
**Supposé** — Que les campagnes e-mail Lemlist peuvent encore utiliser `trail.` : d'où son maintien dans `PASSTHROUGH_HOSTS`.
**Non regardé** — La production derrière Cloudflare (R4) ; les variables d'environnement Vercel `WEBFLOW_*` (dashboard) ; le compte Lemlist ; le DNS de `iframe.` et `trail.`. Les erreurs console des pages portant un visualiseur Orbitvu (CORS vers `cdn360v2.orbitvu.cloud`), identiques avant et après, hors périmètre.

**Suite**
- Hors dépôt, non exécuté : supprimer les variables `WEBFLOW_API_KEY`, `WEBFLOW_SITE_ID`, `WEBFLOW_BLOG_COLLECTION_ID`, `WEBFLOW_GUIDE_COLLECTION_ID` du projet Vercel `sysnext` si elles existent, et révoquer la clé côté Webflow ; désactiver le tracking visiteurs dans Lemlist.
- `trail.packshot-creator.com` : si Lemlist est abandonné aussi pour l'e-mail, retirer le domaine personnalisé dans Lemlist, l'enregistrement DNS `trail.`, puis l'entrée de `PASSTHROUGH_HOSTS` (resynchronisation R5 d'abord).
- `iframe.packshot-creator.com` : enregistrement DNS à supprimer s'il existe encore.
- `.env.example` conserve ses 4 lignes `WEBFLOW_*` (sans valeur réelle) : le contrôle `garde-consequences` interdit toute modification d'un fichier `.env*`. À retirer par une PR dédiée, avec l'accord du propriétaire du garde.
- `WEBFLOW_ORIGIN` reste dans la configuration du Worker déployé jusqu'au prochain déploiement depuis le dépôt ; sans effet, le code ne la lit pas.

---

## 2026-09-28 · F5 — audit exhaustif de la Preview de `/fr/packshot-e-commerce` · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : #39 (brouillon) | **Commit** : voir PR

**Quoi** — Audit contenu, SEO, GEO, UX, visuels et technique du commit `5070d6a` (build local ; Preview protégée par SSO), corrections appliquées.

**Problèmes trouvés et corrigés** —
1. Hero : 2 visuels sur 4 absents des fiches orbitvu.com (sac jaune, fauteuil jaune) et manteau en doublon avec la série R1. Remplacés par des visuels présents sur les fiches Orbitvu du modèle cité : mascara et palette (Alphashot Pro G2), nettoyeur haute pression (Alphastudio Compact), fauteuil rouge (Furniture Studio) ; légende nommant chaque modèle.
2. R1 : légende « photographiés avec un Alphatable » invérifiable pour 3 vêtements sur 4 (seul le manteau figure sur la fiche Alphatable) ; attribution retirée.
3. R7 : Alphatable complété selon la fiche Orbitvu (165 × 112 × 5 cm, 80 kg).
4. R8 : « formation Packshot professionnel de deux jours (14 heures) » non établie : 2 jours sur `/academy`, niveau 1 à 14 h sur `/academy/formations-packshot`, 7 h dans `content/formations/`. Durée retirée.
5. FAQ : Q1 « Qu'est-ce qu'un packshot e-commerce ? » remplacée par « Quel studio Orbitvu choisir pour ses produits e-commerce ? » (intention décisionnelle ; la définition relève du guide `/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots`, lié depuis « En bref ») ; Q7 et Q8 rendues autonomes (sujet explicite).
6. Petites contradictions : « investissement de départ » face au leasing ; démonstration en visioconférence « avec vos produits » ; « formations certifiées Qualiopi » (c'est l'organisme qui l'est) ; « article livré » et « article vendu ».
7. Métadonnées FR : `og:url`, `og:locale`, `og:type` absents (l'openGraph de la page remplace celui du layout) et `twitter:title` hérité du titre générique sans accents. Ajoutés pour le FR seulement.
8. Hiérarchie : les 3 cartes H3 « Explorez » tombaient sous le H2 du CTA ; le libellé devient un H2.
9. Accessibilité : 3 cibles tactiles sous 24 px (sources, liens formation) portées à 24 px.
10. Maillage : le bloc « Pour aller plus loin » affichait l'article « Taux de conversion » (+35 % de conversion avec le 360°, -35 % de retours) et « Les 10 astuces infaillibles ». Exclus de cette page seulement, par une prop optionnelle `exclure` ajoutée à `MoneyPageResources` (valeur par défaut vide : aucun changement pour les autres pages ni pour EN et de-ch).

**Vérifié** — Fiches orbitvu.com des 8 studios (dimensions, poids, unités, cadences, noms actuels ; aucun modèle délisté cité) ; orbitvu.com/software/ai (assistant photo IA : Pro G2 et XL G2) ; manuel Orbitvu « Subscriptions & Billing » (plan Free sans IA ni mises à jour) ; manuel des plateformes e-commerce (Magento 2, PrestaShop 1.7.x, WooCommerce, Shopware 6 et Shopify via SUN) ; provenance des visuels par comparaison avec les médias des fiches Orbitvu ; calculateur ROI (économie directe annuelle, temps interne libéré, seuil de rentabilité). Aucune duplication avec le guide définitionnel (1 6-gramme commun sur 3 093). Contrôles : `tsc`, eslint sur 3 fichiers, JSON (186), vitest 223/223, `next build`, `e2e/seo.spec.ts` 13/13 sur la page et 51/51 sur 4 autres money pages utilisant `MoneyPageResources`, CLS 0, aucune réponse 4xx, 36 images avec alt, 22 liens internes en 200, 10 externes conformes, FAQPage (8), claims interdits absents du rendu (texte, meta, JSON-LD, bloc `packshotEcommerce` du RSC) et du code de la page.
**Supposé** — L'erreur console `ERR_CERT_AUTHORITY_INVALID` vient du traceur lemlist, bloqué par le proxy de l'environnement de test ; non reproductible hors de ce bac à sable [non vérifié].
**Non regardé** — Rendu derrière Cloudflare ; Preview SSO ; versions EN et de-ch.

**Ouverts, hors périmètre** — `organizationSchema()` (partagé) publie `foundingDate` 2004, contraire à D33 (2001) ; le layout sérialise tout `fr.json` dans le RSC (≈ 370 Ko, anciens claims d'autres pages, HTML de 580 Ko) ; le guide définitionnel lié contient « ROI typique entre 6 et 12 mois » et « 60 à 80 % » ; incohérence des durées de formation entre `/academy`, `/academy/formations-packshot` et `content/formations/`.

---

## 2026-09-28 · F5 — audit final de la version FR de `/fr/packshot-e-commerce` · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : #39 (brouillon) | **Commit** : voir PR

**Quoi** — Audit éditorial, factuel, SEO/GEO, UX et performance du commit `074189a`, corrections appliquées dans le même composant page-scopé et le même bloc `packshotEcommerce` de `messages/fr.json`.

**Pourquoi** — Formulations trop absolues ou non démontrées relevées par Laurent (photographe, recolorisation, « règles qui ne changent pas », principes marketplaces non attribués, prestataire, IA générative) ; claims à revérifier sur source primaire ; 9 préchargements d'images inutiles.

**Corrections** —
1. R1 : « workflow manuel documenté » face à « procédé enregistré », sans opposer le photographe.
2. R2 : variantes fidèles, recolorisation acceptable si la fidélité est contrôlée (Orbitvu documente la recolorisation sélective) ; étude De, Hu et Rahman ramenée à son périmètre exact (consultation du zoom et des photos alternatives, marque de vêtements pour femmes, corrélation) ; 5 sources UX dans un bloc repliable.
3. R3 : titre « les principes durables et les seuils à vérifier » ; chaque principe porte sa portée (toutes plateformes, Amazon, Google, Zalando) ; « six semaines » retiré, remplacé dans le tableau Google par le cadrage conseillé de 75 à 90 %.
4. R4 : prestataire « peut impliquer » envoi et attente ; IA générative décrite par le contrôle de fidélité, sans formule rhétorique.
5. R5 : formation de base attribuée à Orbitvu. R6 : astuce « nouvelle URL » retirée. R7 : Alphastudio XXL à 150 produits/jour (fiche Orbitvu).
6. R8 : financement limité à l'achat et au leasing (60 mois, dès 36 mois) ; « location avec option d'achat » retirée (seule source : FAQ de `machines.ts`, non validée).
7. FAQ : 360° Amazon (arrêt des ajouts le 14/12/2023, images déjà en ligne conservées sauf ajout d'un modèle 3D) ; vue 360° Google réservée aux marchands basés aux États-Unis ; durée d'installation « selon le système et la configuration » (le « un à trois jours » ne venait que de l'article migration) ; nuance bijoux d'Orbitvu.
8. Logos clients en chargement différé ; contrastes WCAG des petits textes (portée, notes, sources, numéros).

**Performance, build local, 3 passages** — Desktop 1440 : LCP médian 440 → 292 ms, élément LCP = H1 (texte) ; 67 → 66 requêtes. Mobile 390, réseau bridé à 1,6 Mbit/s et CPU ×4 : LCP médian 1 456 → 1 408 ms (H1) ; 54 → 45 requêtes, 661 → 605 Ko, images au chargement initial 14 → 5 (84 → 29 Ko), logos 9 → 0. Préchargements d'images dans le `<head>` : 12 → 3. Les écarts de LCP restent dans la variabilité entre passages ; le gain mesurable porte sur les requêtes, le poids et les préchargements. Variante « une seule image prioritaire » dans le hero mesurée (mobile 1 468 ms, desktop 332 ms) : pas de gain, deux images prioritaires conservées.

**Vérifié** — Sources relues le 28/09 : Amazon G1881 FR et EN (six images supplémentaires et une vidéo recommandées, 500 px, zoom à 1 000 px, 85 %, formats, fond RVB 255, une seule unité, allégations et badges, marquage des personnes générées par IA), Amazon G75PWC4THA8J269P (bordures), annonce Amazon Seller Central du 14/12/2023 (360°), Google Merchant Center 6324350 (500 × 500 au 31/01/2027, 1 500 × 1 500, produit entier sans mise en scène, éléments promotionnels, bordures, métadonnées IA, 75 à 90 %, six semaines), 13671720 (vue 360° : États-Unis), résumé Crossref de De, Hu et Rahman 2013, orbitvu.com (Alphastudio XXL, Micro Pro v2, Orbitvu Station, how-it-works). Contrôles : `tsc`, eslint `--max-warnings=0` sur les 2 fichiers TSX, JSON (186), vitest 223/223, `next build` vert, `e2e/seo.spec.ts` 13/13 sur la page, 1 H1, 36 images avec alt, 0 débordement, 0 ancre cassée, 24 liens internes en 200, 10 externes en `_blank` + `noopener noreferrer`, Organization + BreadcrumbList + FAQPage (8), libellés du formulaire à 18,86:1 sur desktop et mobile. `messages/en.json`, `messages/de-ch.json`, `PackshotLandingTemplate.tsx`, `components/forms/` et `app/[lang]/layout.tsx` inchangés par rapport à `main`.
**Supposé** — Les 4 packshots de vêtements du dossier `alphatable-alphadesk/` ont été réalisés sur Alphatable (visuels d'exemple de la fiche). La page Amazon sur le 360° est une annonce du forum vendeurs d'Amazon.com ; son application à Amazon.fr n'est pas documentée séparément.
**Non regardé** — Rendu derrière Cloudflare ; Preview Vercel protégée par SSO (contrôle visuel sur le build local) ; articles liés par `MoneyPageResources`.

**Constat hors périmètre** — `app/[lang]/layout.tsx` passe tout `messages/fr.json` à `NextIntlClientProvider` : environ 370 Ko de messages, dont les anciens claims d'autres pages (500+, -80 %, « 20 systèmes », « sans abonnement »…), figurent dans le flux RSC du HTML de chaque page. Le bloc `packshotEcommerce` qu'il contient est bien le nouveau. Chantier transversal à ouvrir (rayon large : toutes les pages).

**Écarts Orbitvu / données PSC, toujours non corrigés** (chantier transversal séparé) — Alphashot 360 (vidéo, cadence) ; Alphastudio Compact (dimensions) ; Alphastudio XXL (dimensions) ; Furniture Studio (charge) ; Orbitvu Station (« sans abonnement » contre plan gratuit sans IA ni mises à jour) ; garantie (12 mois extensible à 3 ans contre 2 ans extensible à 5) ; livraison et installation « incluses » (`fr.json:900`, contraire à D32). Détail dans l'entrée F5 précédente.

**Suite** — Validation de Sébastien sur la Preview ; réécriture EN et de-ch ; chantier transversal sur les écarts ci-dessus et sur les messages sérialisés dans le RSC.

---

## 2026-09-28 · F5 — nouvelle version FR de la landing `/fr/packshot-e-commerce` · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : voir PR (brouillon) | **Commit** : voir PR

**Quoi** — Version FR réécrite en entier : chapeau citable, 8 H2 (série, fiche produit, marketplaces, choix prestataire / IA / studio interne, automatisé et opérateur, workflow, studio par gabarit, coût complet et accompagnement), FAQ de 8 questions, tableaux et cartes. Rendue par un composant page-scopé ; EN et de-ch restent sur le gabarit partagé, non modifié.

**Pourquoi** — Brief sourcé du 28/09 (`PSC_BRIEF_SOURCES_PACKSHOT_ECOMMERCE_2026-09-28.md`, hors dépôt) : 603 mots, 109 impressions et 0 clic en 120 jours ; chiffres contradictoires avec le reste du site (500+ produits/jour, -80 %, ROI 4-8 mois) ; FAQ Amazon fausse (« 1000px minimum ») ; Alphashot G2 délistée citée ; intention « définition » déjà couverte par `/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots`. La landing prend l'intention « produire en série en interne ».

**Fichiers** — `components/landings/PackshotEcommerceFr.tsx` (nouveau), `app/[lang]/packshot-e-commerce/page.tsx` (FR vers le nouveau composant), `messages/fr.json` (bloc `packshotEcommerce` seul, lignes 1219-1298 d'origine ; aller-retour JSON identique à l'octet hors de ce bloc).

**Claims retirés de la version FR** — 500+ produits/jour, -80 % de coûts, ROI 4-8 mois et tout délai de retour générique, « moins de 1 € par image », « le 360° augmente les conversions », « toutes les marketplaces », « zéro compétence photo », « élimine le photographe et le retoucheur », « Amazon exige 1000px minimum, format JPEG », « IQ Mask garantit un fond blanc conforme », Alphashot G2, témoignage « Marie L. », bandeau de statistiques. Aucun prix en prose (D7, D13, D25).

**Écarts Orbitvu / données PSC, non corrigés ici (rayon large)** — La prose suit Orbitvu (fiches relevées le 28/09) ; `machines.ts` et les autres pages ne sont pas modifiés :
1. Alphashot 360 : vidéo annoncée par Orbitvu, absente de `machines.ts` (`['packshot','360']`) ; 150 produits/jour (Orbitvu) contre 200 (`capaciteJour`).
2. Alphastudio Compact : 80 × 70 × 130 cm (Orbitvu) contre 100 × 70 × 190 cm (PSC, « Compact Pro v2 »).
3. Alphastudio XXL : 190 × 90 × 100 cm (Orbitvu) contre 100 × 70 × 190 cm (PSC).
4. Furniture Studio : plateforme 1 000 kg, version 4 000 kg (Orbitvu) contre 500 kg (PSC).
5. Nombre de systèmes : 14 au catalogue Orbitvu, « 20 systèmes » sur le site PSC, 13 fiches PSC actives.
6. Abonnement : `fr.json:2397` dit Orbitvu Station « sans abonnement … toutes les mises à jour » ; la documentation Orbitvu décrit un plan gratuit sans IA ni mises à jour.
7. Garantie : 12 mois extensible à 3 ans (Orbitvu) contre 2 ans extensible à 5 ans (guide d'achat PSC).
8. `fr.json:900` : « livraison, installation … incluses », contraire à D32.

**Effet attendu** — Sortie de la cannibalisation avec l'article définition ; positions sur « packshot e-commerce », « studio photo e-commerce », « photo produit e-commerce en interne » à mesurer à J+28 et J+56 après mise en production. Aucun lien entrant ajouté (gel J+56).

**Vérifié** — `npx tsc --noEmit` OK ; eslint `--max-warnings=0` OK sur les 2 fichiers TSX ; `node scripts/seo/verifier-json.mjs` OK (186 fichiers) ; `npx vitest run` 223/223 ; `npx next build` vert (variables factices de la CI), `/fr`, `/en`, `/de-ch/packshot-e-commerce` prérendues ; `e2e/seo.spec.ts` filtré sur la page, 13/13, contre `next start` local. Rendu local desktop 1440 px et mobile 390 px : 1 H1, hiérarchie H2/H3, 36 images chargées avec alt, 0 débordement horizontal, 0 ancre cassée, JSON-LD Organization + BreadcrumbList + FAQPage (8 questions), 24 liens internes en 200, 10 liens externes en `target="_blank"` et `rel="noopener noreferrer"`. Recherche des claims retirés et des prix dans le texte, la meta et le JSON-LD : aucun (seuls restent les titres d'articles de `MoneyPageResources`, inchangés).
**Supposé** — Les sources DOI (INFORMS) et Shopify FR répondent 403 à `curl` mais sont publiques dans un navigateur (brief du 28/09). Les valeurs marketplaces sont celles du 28/09 : bloc daté, à revalider à la mise en ligne.
**Non regardé** — Versions EN et de-ch (anciens claims toujours présents) ; rendu derrière Cloudflare ; Preview Vercel protégée par SSO (contrôle visuel fait en local) ; les articles liés par `MoneyPageResources`, dont « Taux de conversion : boostez-le… », non relus.

**Suite** — Validation de Sébastien sur la Preview. Puis : réécriture EN et de-ch ; arbitrage des 8 écarts ci-dessus dans `machines.ts` et `fr.json` ; mise à jour de la FAQ de `/fr/packshot-amazon` si elle porte encore le « 1000px » ; J0 de mesure F5 = date de mise en production.

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
