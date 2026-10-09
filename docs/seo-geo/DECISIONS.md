# DÉCISIONS

Les arbitrages rendus. **On ne les rejoue pas.** Si le contexte a changé au
point de justifier un réexamen, on ouvre une question dans
`BOITE-AUX-LETTRES.md` — on ne décide pas silencieusement l'inverse.

Append-only. Plus récent en haut.

---

## Gabarit

```markdown
## D<n> · AAAA-MM-JJ · <titre>

**Décidé par** : Sébastien | Laurent | les deux
**Statut** : en vigueur | remplacée par D<n>

**La décision** — en une ou deux phrases, à l'impératif.

**Le contexte** — ce qui la motivait.

**Ce qu'elle interdit** — les gestes que cette décision ferme.
```

---

## D53 · 2026-10-09 · Exception ponctuelle D15/D48 pour les PR #123 et #124 : fusion et publication sans attendre l'échéance de D15 ; fusion par commit de fusion

**Décidé par** : Laurent — mission « GO final Laurent — fusion et publication PR #123 puis #124 » du 09/10/2026, confirmée par la mission « Reprise autorisée — PR #124 après fusion de #123 » du même jour
**Statut** : en vigueur pour les seules têtes `6bc15f4` (#123) et `9a76bc1` (#124) ; épuisée par leurs fusions du 09/10 (`085b005`, `f143f61`). D15, D42 et D48 restent inchangées pour tout le reste ; `02-PROCEDURE.md` n'est pas modifié.

**La décision** — Texte de Laurent du 09/10/2026, reproduit sans modification :

> L'exception ponctuelle D15/D48 ne vaut que pour :
> - #123, HEAD 6bc15f46a3d426feb3ba688a35c571bd1d996152 ;
> - #124, HEAD 9a76bc1546a88d65dde5e406c34408d67f67a188.
> Elle dispense du délai D15 restant pour ces deux PR et, pour #124 seulement, de publier une nouvelle information à Sébastien selon D48(a). Elle ne constitue pas une validation métier de Sébastien ; ne modifie pas durablement D15, D42 ou D48 ; n'autorise aucun nouveau claim, aucune réécriture, aucune modification produit, et ne s'étend à aucun autre HEAD ou PR. Inscrire cette décision comme D53 par le circuit documentaire approprié APRÈS les fusions, sans modifier préalablement les HEAD contrôlés.

> Fusionner EXCLUSIVEMENT par « Create a merge commit » (pas squash, pas rebase). Laurent autorise ponctuellement cette dérogation à 02-PROCEDURE.md : un squash entraînerait des conflits artificiels dans #124.

**Le contexte** — #123 : délai D15 démarré le 09/10 (information de Sébastien à 14:16:03 UTC, CI verte à 14:59:49 UTC, QA Chrome PASS déclarée par Laurent), 5e jour ouvré le vendredi 16/10. #124 : CI verte (16:39:50 UTC), QA Chrome 15/15 PASS et non-régression de #123 PASS (Laurent, 09/10) ; information de Sébastien prévue par D48 (a) non publiée, donc D15 non démarré. #124 était empilée sur la tête de #123 : fusionnées par commit de fusion, les deux PR donnent des arbres identiques aux têtes contrôlées ; un squash de #123 aurait provoqué 13 conflits dans #124 (simulation `git merge-tree` du 09/10). `02-PROCEDURE.md` (étape 6) prescrit `--squash` ; les fusions récentes de `main` sont des commits de fusion.

**Exécution** — #123 fusionnée le 09/10 à 20:18:55 UTC (`085b005`, arbre identique à `6bc15f4`) ; #124 le 09/10 à 20:42:37 UTC (`f143f61`, arbre identique à `9a76bc1`). Aucune information complémentaire publiée à Sébastien. Contrôles de production : JOURNAL du 09/10.

**Ce qu'elle interdit** — Présenter les contenus de #123 et #124 comme validés par Sébastien ; appliquer cette exception à une autre PR ou à une autre tête ; s'en prévaloir pour une réécriture, un claim, un prix ou une modification produit ; tenir la dérogation de méthode de fusion pour une modification de `02-PROCEDURE.md`.

---

## D52 · 2026-10-09 · Maillage vers Mode, Packshot e-commerce et Amazon : les fenêtres d'observation ne diffèrent plus les liens éditoriaux ; D37 et le gel Mode amendés sur ce seul point

**Décidé par** : Laurent — mission « Réparation globale des ancres et finalisation des cocons SEO/GEO » du 09/10/2026, § 6 : « Il ne souhaite plus différer systématiquement les améliorations du maillage sur Mode, Amazon et Packshot e-commerce simplement pour préserver des tests SEO. La priorité est l'amélioration du site et l'obtention de résultats. »
**Statut** : en vigueur. **Amende D37** sur un point (« aucun lien entrant vers F5 avant J+56 ») et la règle de gel de la surface Mode tirée de D39 (`09_GELS_COLLISIONS_DEPENDENCIES.md` du 07/10 : aucun lien entrant nouveau vers la landing Mode, le hub `mode-textile` et l'article vêtements avant le 26/11). Le reste de D35, D37 et D39 est inchangé.

**Restrictions antérieures identifiées**

| Source | Restriction | Après D52 |
|---|---|---|
| D37 | « Aucun lien entrant vers F5 avant J+56 » (23/11) | Levée pour les liens éditoriaux posés dans le contenu (articles, guides) |
| `09_GELS` (07/10), au titre de D39 et D44 | Surface Mode (landing FR, EN, de-ch, hub `/fr/industrie/mode-textile`, article vêtements) : rien ne modifie la surface ni ses liens entrants avant le 26/11 | Levée pour les liens éditoriaux posés dans le contenu, y compris la destination des liens existants de l'article vêtements (texte inchangé) ; landings et hub non modifiés |
| `09_GELS` (07/10), au titre de D37 | Articles Amazon (I12) « en mesure » jusqu'au 23/11 | Levée pour les liens éditoriaux entre contenus |
| D39 | Lier la landing Mode à F5 avant le 23/11 | **Inchangée** : ce lien supposerait de modifier la landing Mode ; aucune PR de D52 ne le pose |
| D35 | Article EN `packshot-photography-guide-why-make-product-packshots` laissé en l'état ; page cible FR sur requête française | **Inchangée** : l'article EN n'est pas modifié et ne reçoit aucun lien entrant nouveau |

**La décision** — Les liens éditoriaux utiles vers les pages propriétaires Mode (`/xx/packshot-mode`, hub `mode-textile`), Packshot e-commerce (`/xx/packshot-e-commerce`) et vers les articles Amazon sont posés sans attendre la fin des fenêtres de mesure. Les URL, canoniques, hreflang et rôles de ces pages sont conservés. Chaque intervention est consignée comme événement concomitant dans `ETAT.md` § E, avec sa date de fusion.

**Le contexte** — Au 09/10, `/fr/packshot-e-commerce` (propriétaire de l'intention I11) ne recevait aucun lien depuis les articles et guides ; `/fr/packshot-mode` (I05) en recevait 2, tous du cluster AI Act ; le hub `/fr/industrie/mode-textile` aucun ; 15 ancres « mode », « vêtements » ou « textiles » menaient à l'index des secteurs. Inventaire des ancres du 09/10 et PR de réparation consolidée #124 du même jour.

**Ce qu'elle interdit** — Modifier, au titre de D52, une URL, une canonique, un hreflang ou le rôle d'une page Mode, F5 ou Amazon ; modifier les fichiers réservés des landings (`PackshotEcommerce.tsx`, `PackshotMode.tsx`, namespaces `packshotEcommerce` et `packshotMode`) ; tenir D52 pour une autorisation de modifier une landing en reconstruction (#104, #105, #107, #108) ; poser un lien vers la landing `/xx/packshot-amazon` tant que son rôle (I12, décision prévue le 23/11) et ses chiffres non sourcés (« 500+ », « -80 % », « 100 % conforme ») ne sont pas tranchés ; attribuer à une landing seule une évolution GSC postérieure à la fusion sans citer l'événement D52.

---

## D51 · 2026-10-09 · Exception ponctuelle D15/D42 pour la PR #109 : fusion et publication sans attendre la validation de Sébastien

**Décidé par** : Laurent — mission « Clôture et publication #109 / fermeture #111 » du 09/10/2026
**Statut** : en vigueur pour la seule PR #109 ; épuisée par sa fusion. D15 et D42 restent inchangées pour tout le reste.

**La décision** — Texte de Laurent du 09/10/2026, reproduit sans modification :

> Laurent accorde une EXCEPTION PONCTUELLE D15/D42 pour la seule PR #109, afin de ne pas prolonger l'attente de validation tacite de Sébastien pour les corrections factuelles et suppressions de promesses non étayées déjà documentées.
> Cette exception :
> * ne vaut pas validation de Sébastien ;
> * ne crée aucun nouveau claim ;
> * ne permet aucune réécriture supplémentaire ;
> * ne s'étend pas à une autre PR ;
> * ne modifie pas durablement D15 ou D42.

**Le contexte** — Contrôle de la Preview de #109 par Laurent dans Chrome (D42, étape 4) : 7 groupes PASS sur la tête `81803ad`, transmis le 09/10. Validation de Sébastien (D42, étape 5) non reçue. Même mission : GO de fusion de #109, GO de publication par le déploiement Vercel déclenché par la fusion, GO de fermeture de #111 sans fusion (apport repris dans #109).

**Ce qu'elle interdit** — Présenter les contenus de #109 comme validés par Sébastien ; appliquer cette exception à une autre PR, #111 comprise ; s'en prévaloir pour une réécriture, un nouveau claim, un prix, un témoignage ou un contenu marketing.

---

## D50 · 2026-10-09 · Exception D13/D42 ciblée : suppressions d'affirmations chiffrées ou de superlatifs non sourcés dans ShotFlow FR, ShotFlow EN et Oscaro FR (PR #121)

**Décidé par** : Laurent — mission « V8 — reprise immédiate Ubersuggest » du 09/10/2026
**Statut** : en vigueur pour le seul périmètre ci-dessous (PR #121) ; épuisée par sa fusion. D13 et D42 restent inchangées pour tout le reste.

**La décision** — Texte de Laurent du 09/10/2026, reproduit sans modification :

> J'autorise exceptionnellement les suppressions ciblées d'affirmations chiffrées ou de superlatifs NON SOURCÉS déjà identifiés concernant ShotFlow FR, ShotFlow EN et Oscaro FR, à condition de ne créer aucun nouveau claim, témoignage ou fait métier. Cette exception D13/D42 ne couvre aucune réécriture générale, aucun autre article et aucun contenu PACK-D9.

**Le contexte** — #121 préparait le 08/10 des retraits sous réserve d'une validation ciblée de Sébastien (D42, arbitrage final 3). Une exception de même nature, limitée au retrait de « -50% delay » du `metaTitle` EN de ShotFlow, avait été décidée par Laurent le 09/10 pour #120 (JOURNAL du 09/10). La présente décision ne vaut pas validation de Sébastien.

**Ce qu'elle interdit** — Toute réécriture au titre de cette exception (ajout, substitution ou reformulation au-delà de l'accord grammatical rendu nécessaire par une suppression) ; son application à un autre article ou aux articles PACK-D9 (photographie 2D, photographie 3D, photographie à 360 degrés) ; la création d'un claim, d'un témoignage ou d'un fait métier ; la présentation des contenus restants comme validés.

---

## D49 · 2026-10-09 · Exception ponctuelle pour la PR #112 : publication sans attendre D15 ni l'information préalable de Sébastien prévues par D48

**Décidé par** : Laurent — mission « V8 — finir Repair Factory #112 + #113 » du 09/10/2026
**Statut** : en vigueur pour la seule PR #112 ; épuisée par sa fusion. D15 et D48 restent inchangées pour toutes les autres PR.

**La décision** — Texte de Laurent du 09/10/2026, reproduit sans modification :

> J'autorise exceptionnellement la publication des quatre ajouts de liens CA10(b) M04, M05, M21 et D-044 sans attendre les cinq jours ouvrés de D15, les libellés restant strictement inchangés et les destinations ayant déjà été vérifiées.
> Pour les corrections déterministes CA10(a), la traçabilité dans la PR et le JOURNAL est autorisée en remplacement de l'information préalable à Sébastien, sur cette PR uniquement.
> Cette décision ne constitue ni validation tacite acquise ni validation de Sébastien. Elle ne modifie pas D15/D48 pour les autres PR.

**Le contexte** — D48 (CA10) prévoit l'information de Sébastien pour les corrections de régime (a) et le délai de D15 pour les liens de régime (b). Au 09/10, Sébastien n'avait reçu aucune information sur #112 (aucun message dans le dépôt ni sur la PR) : le délai de D15 n'avait pas commencé. Liens concernés dans #112 : régime (a) M01, M02, M03, M30, M31, M32, l'ancre « photographie commerciale horlogère » du guide FR `comment-faire-focus-stacking-pour-photographier-bracelet` (audit E, sans numéro M) et les corrections de liens externes ; régime (b) M04, M05, M21 et D-044. Contrôles disponibles : QA locale sur build, 30 passages sur 30 (09/10) ; QA Chrome réelle de #113, 10/10, selon la mission de Laurent du 09/10.

**Ce qu'elle interdit** — Appliquer cette exception à une autre PR ; présenter les quatre liens de régime (b) comme validés tacitement ou par Sébastien ; modifier le libellé ou la destination de ces liens au titre de cette exception.

---

## D48 · 2026-10-07 · CA10 : corriger un `href` existant (a) ou poser un lien sur un texte existant (b), deux circuits distincts

**Décidé par** : Laurent — arbitrage A3 du dossier `PSC_LANDINGS_COCONS_FINAL_2026-10-07` V2 (`11_ARBITRAGES_LAURENT.md`, rendu le 07/10/2026, hors dépôt), qui complète le régime (a) décidé le 03/10 ; inscription demandée par Laurent le 09/10/2026
**Statut** : en vigueur depuis le 07/10/2026. Inscrite le 09/10/2026 par la PR #112, première PR qui l'applique, comme le prévoit A3.

**La décision** — Deux régimes pour les liens posés dans un texte existant :

| Régime | Portée | Circuit |
|---|---|---|
| (a) | Correction déterministe d'un `href` existant, **ancre inchangée** | Information de Sébastien |
| (b) | Ajout d'un lien sur un texte existant, **sans modification d'un seul mot** | D15 : validation tacite après 5 jours ouvrés |

Aucun des deux régimes ne vaut GO de fusion ni GO de publication : ces décisions restent séparées et appartiennent à Laurent (D12, D42 arbitrage final 3).

**Le contexte** — Le programme directeur V4.3 (03/10) posait CA10 : le périmètre du droit de corriger un `href` dans la prose sans changer le texte, face à la pose de liens nouveaux. Le régime (a) est appliqué depuis la décision de Laurent du 03/10, citée par les entrées du JOURNAL des lots A02, A03 et A04b (03/10), sans avoir été inscrit ici. A3 a ajouté le régime (b) le 07/10 et prévu cette inscription. Lignes du dossier V2 visées : (a) M01, M02, M03, M20, M30, M31, M32 ; (b) M04, M05, M21, M39.

**Ce qu'elle interdit** — Modifier l'ancre d'un lien au titre du régime (a) ; modifier un seul mot du texte au titre du régime (b) ; fusionner un lien du régime (b) avant l'échéance de D15 ; tenir l'information de Sébastien, ou l'échéance de D15, pour un GO de fusion ou de publication.

---

## Note d'exécution · 2026-10-07 · État de mise en œuvre de D36, D44, D45, D46 et D47 après les fusions du 03/10 au 06/10 — pas une décision

**Rédigée par** : Claude de Laurent, sur GO documentaire de Laurent du 07/10/2026 (« PR documentaire consolidée »)
**Nature** : note d'exécution. **Aucune décision nouvelle, aucun numéro D48.** Les décisions ci-dessous ne sont ni réécrites ni modifiées : leurs lignes « Statut » restent celles de leur date. Cette note dit seulement, au 07/10, ce qui est implémenté, ce qui est contrôlé et ce qui reste ouvert. Sources : GitHub (`merged_at`, commits de fusion sur `main` `30482a0`) ; preuves `www` transmises par la mission de Laurent du 07/10 ; JOURNAL du 07/10.

**D36** (`noindex` de l'origine `sysnext.vercel.app`) — **implémentée et contrôlée.**
- Partie Worker : #68, fusionnée le 01/10, Worker `107715bc` actif depuis le 01/10 (JOURNAL du 06/10). Partie Next : #99, fusionnée le 06/10 à 16:44 UTC (`e830419`). #67 fermée sans fusion le 06/10 à 16:56 UTC (remplacée par #99).
- `sysnext.vercel.app` : 9 documents HTML sur 9 portent les en-têtes `noindex` attendus (mission du 07/10 ; liste des 9 URL non reprise ici).
- `www` : Laurent a contrôlé 4 URL par requête HEAD PowerShell depuis son poste (D23) : HTTP 200, en-têtes D36 absents. Cette preuve vient de ces requêtes HEAD ; elle n'est pas attribuée aux captures Chrome.
- La ligne « Statut » de D36 (« non exécutée au 25/09 ») est historique. Limite connue, inchangée : `smoke.mjs` lit la balise `robots`, pas l'en-tête.

**D44** (R-UX-LONG) — **appliquée** : règle écrite par #87 (03/10, `17a4248`) ; forme B par #84 (06/10 à 10:26 UTC, `1e0901b`) ; forme A et registre par #85 (06/10 à 17:46 UTC, `30482a0`), **93 pages** équipées ; CI par #86 (04/10, `0ac062b`). Studios en HOLD ; Mode garde sa barre d'origine jusqu'au 26/11.
- Réserve UX du 07/10 : la surbrillance de la section active est parfois décalée. Diagnostic P2 **proposé**, non arbitré ; aucune correction autorisée. La règle n'est pas modifiée.

**D45** (R-PRODUCT-DIM) — **contrôles présents** : référentiel `data/produits/fiches-techniques.ts`, registre `data/produits/ecarts-connus.ts`, test `lib/produits/__tests__/coherence-dimensions.test.ts` (#83, fusionnée le 03/10 à 19:49 UTC, `1bc7195`), exécutés en CI depuis #86.
- **Q20 reste ouverte** : aucune valeur contradictoire corrigée ; la PR PRODUCT-DATA attend la réponse de Sébastien.

**D46** (cluster AI Act) — **#96 fusionnée** le 06/10 à 12:41 UTC (`8247217`), sur GO de Laurent.
- #59, #60 et #77 sont marquées fusionnées par GitHub à 12:41:03 UTC : leurs têtes sont incluses dans #96, sans commit de fusion propre sur `main`.
- QA `www` **partielle** : 5 pages FR représentatives PASS le 07/10. Les 15 versions linguistiques n'ont pas été contrôlées une à une. Présence sur `www` constatée le 07/10 ; instant du premier déploiement `www` non établi.
- `SEBASTIEN_VALIDATION = NOT_RECEIVED`, inchangé. #79 reste ouverte, REVIEW ONLY, fermeture sur GO distinct.

**D47** (CTA ROI) — **#93 fusionnée** le 06/10 à 14:18 UTC (`6cbb903`) : CTA ROI des 7 sources vers le calculateur localisé (`/fr/calculateur-roi`, `/en/calculateur-roi`, `/de-ch/roi-rechner`). Contrôle `www` FR/EN PASS le 06/10 (JOURNAL du 06/10).
- La ligne « Statut » de D47 cite encore « PR #93 (brouillon) » : application effective depuis la fusion.
- #94 fermée sans fusion le 06/10 à 14:59 UTC. Activation d'`anchors` et de `roi-calculator` en CI : toujours une décision séparée.
- **AR-01 n'est pas rouvert** : clos le 06/10.

**Ce que cette note n'est pas** — ni une décision (décision ≠ implémentation : chaque ligne ci-dessus constate une mise en œuvre, elle ne tranche rien) ; ni une preuve de publication (une fusion n'établit pas la présence sur `www`, qui se constate à part) ; ni une validation exhaustive (une QA partielle ne vaut pas contrôle de toutes les pages) ; ni une validation de Sébastien.

---

## D47 · 2026-10-06 · Destination canonique des CTA ROI : le calculateur localisé, sans détour par Studios ; option B d'AR-01 remplacée

**Décidé par** : Laurent — mission « ROI / PR #93 — exécution, destination canonique directe vers le vrai calculateur » du 06/10/2026
**Statut** : en vigueur. Mise en œuvre : PR #93 (brouillon) ; application effective à sa fusion, sur GO distinct de Laurent ; date de fusion à arbitrer avant la fusion.

**La décision** — Les CTA ROI des sept sources qui passaient par Studios visent le calculateur localisé : FR `/fr/calculateur-roi`, EN `/en/calculateur-roi`, de-ch `/de-ch/roi-rechner`. Studios n'est pas transformée en cible : aucun `id="calculateur-roi"` n'y est ajouté. Le témoin du pilote Studios (`studio-photo/selecteur-machines`) reste inchangé. GA4 est traité séparément. `anchors` et `roi-calculator` ne sont pas activés en CI par #93.

**Le contexte** — L'option B d'AR-01, décidée le 03/10 (`ETAT.md`, C ; revue `PSC_REVUE_PRE_FUSION_83_87_ALIGNEMENT_V43_2026-10-03.md`, § 11.4), faisait de la section ROI de Studios la cible des liens « Calculer mon ROI », par un `id` permanent. Elle est remplacée sur ce point. Sur `main` `8247217` : 19 expressions dans 8 fichiers visaient `/studios-photo-automatises#calculateur-roi` (18) ou `#roi` (1, prestataire) ; aucune des deux ancres n'existe sur Studios depuis le 22/03/2026 (`d5a7fea`), le visiteur arrivait en haut de page. #93 corrige 18 expressions dans 7 fichiers (36 liens rendus sur 14 pages, FR et EN) ; l'expression du sélecteur (3 liens rendus, FR, EN, de-ch) est l'exception volontaire du témoin. Le calculateur FR est un conseiller adossé à une API facturée.

**Ce qu'elle interdit** — Ajouter un `id="calculateur-roi"` à Studios pour rétablir l'option B ou pour rendre le témoin fonctionnel ; modifier le lien du témoin sans nouvelle décision ; faire pointer un nouveau CTA ROI vers `/studios-photo-automatises#…` ; appeler réellement l'API du calculateur dans un test sans GO explicite (D43) ; ajouter un événement GA4 au titre de cette décision.

---

## D46 · 2026-10-06 · Cluster AI Act : cinq articles (A, S, B, C, D) préparés en FR, EN et de-ch pour une publication coordonnée ; D41 remplacée sur le principe des satellites

**Décidé par** : Laurent — mission « Finalisation et publication complète du cluster AI Act » du 06/10/2026
**Statut** : en vigueur pour la préparation. **Remplace D41 sur le seul principe de non-création des satellites B, C et D** ; le reste de D41 est maintenu (voir ci-dessous). La fusion, donc la mise en production, reste subordonnée au GO de publication explicite de Laurent, donné après le checkpoint de la mission. Statut de publication à employer : `PUBLICATION_AUTHORIZED_BY_LAURENT`, jamais `VALIDATED_BY_SEBASTIEN`.

**La décision** — Termes de la mission, reproduits : « Laurent décide de ne plus attendre le retour de Sébastien pour publier le dossier AI Act. » Publier un cluster de cinq articles : A (pilier européen), S (Suisse), B (retouche IA), C (mannequins virtuels, personnes synthétiques), D (métadonnées, marketplaces), en FR, EN et de-ch. Nouvel état : A, S à publier ; B, C, D à créer et publier. Les vrais articles B, C, D sont construits depuis le `main` courant ; #79 sert de matière (textes, visuels, provenance) et n'est pas fusionnée ; les anciennes PR #61, #62 et #63 ne sont pas réutilisées telles quelles.

**Ce qui reste de D41** — #61, #62 et #63 ne se rouvrent pas. Les mesures D16 du 30/09 ne sont pas présentées comme un verdict favorable : critère 2 non rempli pour B et C, critère 3 non rempli pour D, motif de Laurent du 30/09 inchangé. Aucune nouvelle mesure D16 n'a été faite le 06/10 (un volume de recherche exigerait un appel payant, exclu par la mission) ; relevé gratuit du 06/10 dans `gsc-crawl-seo` : 2 impressions en 90 jours sur les requêtes du thème. La création de B, C, D repose sur la décision de Laurent, pas sur D16.

**Articulation, sans réécriture des décisions antérieures**
- D16 (création : trois critères, validation explicite de Sébastien) et D42, étape 5 (validation de Sébastien) : la mission remplace, pour ce cluster, l'attente de la validation de Sébastien par l'autorisation de publication de Laurent. Aucune validation de Sébastien n'est établie (relevé GitHub du 06/10 : aucun commentaire de `Sebeth7` sur #59, #60, #77 et #79, aucune revue sur #59 et #60).
- `01-RAYON-ACTION.md` (texte de Sébastien du 16/09) classe le copywriting français client-facing parmi ce qui engage l'entreprise et relève de son arbitrage, et `README.md` rappelle que la prose française est sa voix. D46 ne modifie pas ces documents. Le point est porté au checkpoint de la mission comme contradiction non résolue par D46.
- D38 (publication trilingue coordonnée, de-ch adapté au périmètre suisse) : appliquée.

**Le contexte** — #59 (A) et #60 (S) prêts depuis le 02/10, transmis à Sébastien selon le pilotage du 02/10, sans retour établi sur GitHub. #79 : previews privées B, C, D finalisées le 02/10.

**Précisions de Laurent du 06/10/2026 (mission de continuation de #96)**, reproduites sans ajout :
- `PUBLICATION_AUTHORITY = LAURENT` ; `SEBASTIEN_VALIDATION = NOT_RECEIVED`. Laurent décide de ne plus attendre la validation de Sébastien pour publier ce dossier. Cette décision vaut uniquement pour ce cluster ; elle ne supprime ni D42 ni les circuits métier habituels. Ne jamais écrire que les cinq articles ont été validés par Sébastien. Q23 reste une information, sans valeur de blocage. Copywriting sans Sébastien : `AUTHORIZED_FOR_THIS_CLUSTER = YES`.
- `D16_EXCEPTION = YES` ; `SCOPE = AI Act B/C/D uniquement` ; `AUTHORITY = Laurent` ; `DATE = 06/10/2026`. L'exception ne modifie pas D16 pour les futurs articles ; aucun appel DataForSEO pour la justifier rétroactivement.
- Auteur affiché : « PackshotCreator » ; aucun profil personnel en `author.sameAs` ; aucune attribution à Laurent.
- `datePublished` = date réelle de publication ; `dateModified` = date réelle du dernier changement significatif ; cohérentes dans les trois langues d'un article.
- Visuels B, C, D : utilisation autorisée après la QA finale ; ce n'est pas une validation de Sébastien.
- Fusion de #96 : uniquement sur « GO MERGE #96 » explicite de Laurent.

`01-RAYON-ACTION.md` et `README.md` ne sont pas modifiés par ces précisions.

**Ce qu'elle interdit** — Publier les pages `/revue-interne/` de #79 ; fusionner #79 ; présenter la publication comme validée par Sébastien ; fusionner sans le GO de publication explicite de Laurent.

---

## D45 · 2026-10-03 · R-PRODUCT-DIM : caractéristiques dimensionnelles des produits, référentiel obligatoire et contradictions conservées

**Décidé par** : Laurent — GO encadré du 03/10/2026 (mission d'exécution « Standard UX et fiabilité des données produit »)
**Statut** : principe approuvé par Laurent le 03/10/2026. Inscription : PR #87 (brouillon au 03/10). Application effective à la fusion de chaque PR de mise en œuvre : la règle écrite avec #87 ; le référentiel et son contrôle avec #83 ; leur exécution en CI avec #86. Correction des valeurs contradictoires subordonnée à la réponse de Sébastien (Q20). Référence stable : `docs/standards/R-PRODUCT-DIM.md`

**La décision** — Une caractéristique dimensionnelle produit possède une définition non ambiguë, une référence de version et une source traçable, et ne diverge pas entre les consommateurs du site. Distinguer toujours : dimensions maximales du produit photographiable, encombrement extérieur de la machine, plateau, charge maximale (avec son type), ordre des axes, unités, génération ou version commerciale, source primaire, date de vérification, statut de validation métier. Préférer une donnée partagée à des valeurs saisies indépendamment. Une contradiction non résolue est conservée comme telle, avec ses deux sources. Catégorie A (même produit, valeur du site différente de la source) : correction technique possible, avec source, tests et contrôle des consommateurs. Catégorie B (version non établie, sources contradictoires, source absente) : aucune valeur remplacée avant la réponse de Sébastien.

**Le contexte** — Audit du 03/10/2026 (livrable `03-AUDIT-DIMENSIONS-PRODUITS.md`) : dimensions saisies à la main dans deux catalogues (`components/machine-selector/lib/machines.ts`, `components/calculators/ROICalculator/lib/machines.ts`), synchronisées deux fois à la main (28/09, 01/10) ; cadences et catégories de taille déjà divergentes ; textes libres faux (guide d'achat 2026, comparatif Orbitvu, article Pro G2, hub mobilier, prompt des leads). Fiches publiques Orbitvu relevées le 03/10 à 05:54 UTC : 11 correspondances numériques de l’objet maximal avec les fiches fabricant consultées (sans validation des versions commerciales), encombrements divergents pour 5 produits, Furniture Studio contradictoire sur trois sources. Mise en œuvre : PR PRODUCT-TEST (#83) ; contrôle en CI : PR #86 ; questions à Sébastien : Q20.

**Ce qu'elle interdit** — Modifier une dimension, une charge ou un encombrement dans un catalogue sans le référentiel et sa source ; corriger automatiquement une valeur fabricant supposée erronée ; assimiler deux générations de produits ou un nom PSC suffixé à un nom fabricant sans validation de Sébastien ; harmoniser le catalogue en recopiant une fiche publique quand la version commerciale n'est pas établie ; réintroduire une valeur retirée (XXL 100 × 70 × 190 cm) ; modifier une redirection XL au titre de cette règle (D29).

---

## D44 · 2026-10-03 · R-UX-LONG : navigation des pages longues, une règle par famille de gabarits

**Décidé par** : Laurent — GO encadré du 03/10/2026 (mission d'exécution « Standard UX et fiabilité des données produit »)
**Statut** : principe approuvé par Laurent le 03/10/2026. Inscription : PR #87 (brouillon au 03/10). Application effective à la fusion de chaque PR de mise en œuvre : la règle écrite avec #87 ; le sommaire du blog (forme B) avec #84 ; la barre mutualisée et le registre (forme A) avec #85 ; leur contrôle en CI avec #86. Référence stable : `docs/standards/R-UX-LONG.md` ; registre `data/navigation/pages-longues.ts`

**La décision** — Toute page longue reçoit une navigation adaptée à sa structure et à son gabarit, dès lors qu'elle améliore réellement l'accès aux sections ; la règle s'applique aux pages existantes et futures, FR, EN et de-ch, par famille de gabarits. Trois comportements : (A) sommaire horizontal collant sous l'en-tête, desktop (≥ 1 024 px), composant mutualisé `components/navigation/SommaireCollant.tsx` ; (B) sommaire latéral existant du blog, corrigé et utilisable sur toute la hauteur de l'écran ; (C) sommaire statique ou aucune navigation persistante quand un élément collant dégraderait l'expérience. Une page ne cumule jamais deux navigations collantes. Éligibilité : longueur rendue (≥ 7 200 px à 1 440 px, indicatif), au moins quatre sections de contenu hors FAQ (indicatif), bénéfice écrit, libellés sans texte nouveau, absence de conflit. Les pages sous expérience SEO ou touchées par une PR éditoriale ouverte sont en HOLD jusqu'à leur date de sortie.

**Le contexte** — Audit du 03/10/2026 sur 309 URL (livrables 01 et 02) : la barre de Mode (#66) donnait le comportement de référence ; le sommaire du blog avait deux défauts mesurés (titre visé hors écran à 390 px ; 29 listes latérales plus hautes que la fenêtre) ; 47 guides, 39 fiches et plusieurs landings longues n'avaient aucune navigation. La variante latérale avait été écartée sur Mode : à 1 440 px, elle ramène le contenu de 1 232 à 928 px. Mise en œuvre : PR UX-BLOG (#84), UX-STICKY (#85) ; contrôles en CI : PR #86.

**Ce qu'elle interdit** — Afficher deux navigations collantes sur une page ; copier le composant dans une page au lieu d'utiliser le composant mutualisé ; ajouter un élément collant sous 1 024 px ; inventer un libellé pour la navigation (copywriting de Sébastien, D42) ; modifier par ce biais une URL, une canonique, un hreflang ou un contenu éditorial ; modifier une page gelée avant sa date de sortie (F5 23/11, Mode et hub mode-textile 26/11, accueil 28/10) ; modifier `slugify` ou le calcul des `id` des titres du blog (ancres historiques).

---

## D43 · 2026-10-02 · Services payants de recherche SEO/GEO : budget global de 200 USD par mois, GO explicite de Laurent avant tout appel

**Décidé par** : Laurent — décision du 02/10, qui remplace sur le budget ses arbitrages du 01/10
**Statut** : **en vigueur depuis le 02/10** (décision de Laurent) ; texte consigné par la PR #76. **Remplace** : le budget de 20 USD par trimestre et le seuil de GO de 2 USD par exécution de D26 (point 4) ; le plafond de 20 USD par mission des arbitrages du 01/10 ; la ligne « Pas d'appel payant sans GO préalable » de D42, dont l'exigence de GO est reprise et précisée ici

**La décision** — Décision de Laurent du 02/10/2026, reproduite sans modification :

> FAIT MÉTIER LAURENT — 02/10/2026 :
>
> Le budget global des services payants de recherche SEO/GEO PackshotCreator est fixé à :
>
> 200 USD PAR MOIS, TOUTES MISSIONS CONFONDUES.
>
> Cette décision remplace explicitement :
>
> - D26, point 4 : ancien budget de 20 USD par trimestre ;
> - D43 : ancien plafond de 20 USD par mission ;
> - l'ancien seuil de GO au-delà de 2 USD par exécution.
>
> Il n'existe donc plus de plafond général de 20 USD par mission ni de budget limité à 20 USD par trimestre.
>
> Une mission peut dépasser 20 USD lorsque la qualité des mesures le justifie, sous réserve du budget mensuel disponible et du GO de Laurent.
>
> Les 200 USD constituent un plafond global mensuel, et non 200 USD supplémentaires par mission.
>
> Le plafond mensuel ne constitue PAS une autorisation automatique de dépense.
>
> Avant tout appel payant ou lot d'appels précisément délimité, présenter :
>
> - le service utilisé ;
> - l'objectif ;
> - le nombre d'appels et leurs paramètres ;
> - le coût estimé ;
> - le plafond maximal ;
> - la consommation cumulée connue du mois ;
> - le budget mensuel restant connu.
>
> Attendre le GO explicite de Laurent.
>
> Si la consommation antérieure du mois n'est pas établie, l'indiquer : ne pas supposer arbitrairement que le solde est de 200 USD.
>
> Ne pas fractionner artificiellement une mission pour contourner une autorisation.

**Règle applicable** — Récapitulatif de la décision du 02/10 :

| Point | Règle |
|---|---|
| Budget | 200 USD par mois, toutes missions confondues : plafond global mensuel, pas 200 USD par mission |
| Plafond par mission | Aucun plafond général. Une mission peut dépasser 20 USD si la qualité des mesures le justifie, dans le budget mensuel disponible et sur GO de Laurent |
| Budget de 20 USD par trimestre | Supprimé |
| Seuil de GO de 2 USD par exécution | Supprimé |
| Autorisation | GO explicite de Laurent avant tout appel payant ou lot d'appels précisément délimité, sur présentation des sept éléments de la décision |
| Consommation du mois non établie | L'indiquer ; ne pas supposer un solde de 200 USD |
| Fractionnement | Interdit pour contourner une autorisation |

**Dispositions du 01/10 maintenues** — Non visées par la décision du 02/10 et compatibles avec elle :
- la définition d'une mission : « Une mission est un objectif opérationnel délimité, associé à un périmètre, un livrable identifié et un budget cumulé. Son coût comprend l'ensemble des recherches, appels exploratoires, mesures complémentaires, contre-expertises et vérifications payantes nécessaires à cet objectif. » (arbitrage final 2) ;
- un plafond ne constitue aucune autorisation d'écriture, de déploiement, de lancement de workflow ou de modification d'un service externe (premier arbitrage).

Toutes les autres dispositions budgétaires du 01/10 sont remplacées. Le point « À CONFIRMER » du 01/10 (dépassement du plafond de mission) est sans objet : la décision du 02/10 le tranche.

**Historique** — Consignes antérieures, citées pour trace, **plus en vigueur** sauf les deux dispositions maintenues ci-dessus :
- D26, point 4 (19/09) : budget de mesure de 20 $ par trimestre, GO au-delà de 2 $ par exécution ;
- D42, première version (01/10) : « Pas d'appel payant sans GO préalable » ;
- premier arbitrage de Laurent du 01/10 (point 3) :

> Remplacer l'ancien seuil de 2 USD par une autorisation-cadre de 20 USD cumulés PAR MISSION, tous appels payants confondus.
>
> * Pas 20 USD par appel.
> * Pas de consommation illimitée.
> * Identifier le service utilisé avant l'appel.
> * Estimer son coût.
> * Comptabiliser les dépenses cumulées de la mission.
> * Ne pas effectuer d'appel entraînant un dépassement des 20 USD.
> * Au-delà, solliciter un nouveau GO explicite de Laurent.
>
> Ce plafond budgétaire ne constitue aucune autorisation d'écriture, de déploiement, de lancement de workflow ou de modification d'un service externe.
> La nouvelle décision prévaut sur l'ancien seuil de D26 et modifie explicitement la restriction budgétaire initialement rédigée dans D42. Conserver une trace historique claire de cet arbitrage, sans laisser deux consignes contradictoires en vigueur.

- arbitrages finaux 1 et 2 de Laurent du 01/10 :

> Les deux limites se cumulent :
>
> - D26 : conserver le budget de mesure de 20 USD par trimestre.
> - D43 : fixer également un plafond maximal de 20 USD par mission.
>
> Le plafond par mission n'autorise jamais à dépasser le solde trimestriel disponible.
>
> Tout appel payant nécessite préalablement le GO explicite de Laurent, avec identification du service, estimation du coût et plafond maximal.
>
> Un plafond budgétaire ne constitue pas, à lui seul, une autorisation de dépense.
>
> Une mission est un objectif opérationnel délimité, associé à un périmètre, un livrable identifié et un budget cumulé.
>
> Son coût comprend l'ensemble des recherches, appels exploratoires, mesures complémentaires, contre-expertises et vérifications payantes nécessaires à cet objectif.
>
> Le fractionnement artificiel d'un même objectif en plusieurs missions pour contourner le plafond est interdit.
>
> Avant chaque dépense, vérifier le cumul de la mission et le solde du budget trimestriel.

**Ce qu'elle interdit** — Un appel payant, ou un lot d'appels, sans GO explicite préalable de Laurent. Une demande de GO sans les sept éléments de la décision. Supposer un solde de 200 USD quand la consommation antérieure du mois n'est pas établie. Dépasser le budget mensuel. Fractionner artificiellement une mission pour contourner une autorisation. Tenir le plafond mensuel pour une autorisation automatique de dépense, ou un plafond pour une autorisation d'écriture, de déploiement, de lancement de workflow ou de modification d'un service externe.

---

## D42 · 2026-10-01 · Standard éditorial PackshotCreator : circuit complet en huit étapes

**Décidé par** : Laurent — six arbitrages d'articulation, puis arbitrages finaux 3 et 4, rendus par Laurent le même jour
**Statut** : en vigueur depuis le 01/10 (décision de Laurent, applicable aux PR déjà ouvertes) ; texte consigné par la PR #76 — portée : tous les articles, landings, hubs et contenus éditoriaux, produits par les deux environnements Claude, PR déjà ouvertes comprises, sans annuler les travaux antérieurement validés. **La ligne « Pas d'appel payant sans GO préalable » est remplacée par D43**, qui exige le GO préalable explicite de Laurent pour tout appel payant. Complète D12 pour les contenus éditoriaux (arbitrage 1 et arbitrage final 3)

**La décision** — Texte de Laurent du 01/10/2026, reproduit sans modification :

> DÉCISION DE GOUVERNANCE — STANDARD ÉDITORIAL PACKSHOTCREATOR
> Décidé par : Laurent
> Date : 1er octobre 2026
> Portée : TOUS les articles, landings, hubs et contenus éditoriaux.
> Aucun contenu ne doit être considéré comme terminé sur la seule base d'une rédaction achevée ou d'une CI verte.
> Chaque chantier doit suivre le circuit complet :
>
> 1. Cadrage SEO/GEO à partir des sources et données existantes.
> 2. Rédaction naturelle, experte et fidèle aux faits métier.
> 3. Intégration complète des visuels, tableaux et éléments éditoriaux.
> 4. Contrôle de la véritable Preview sur desktop, tablette et mobile.
> 5. Validation de Sébastien selon la gouvernance applicable.
> 6. Optimisation finale du maillage interne et du SEO/GEO.
> 7. Traduction EN et adaptation de-ch depuis la version FR validée, selon le périmètre linguistique.
> 8. QA finale, publication autorisée, contrôle de production et mesure des résultats.
>
> EXIGENCE NON NÉGOCIABLE :
> Un livrable doit être complet sur trois plans :
> ÉDITORIAL + VISUEL/UX + SEO/GEO.
> Pas de publication précipitée.
> Pas de témoignages inventés.
> Pas de promesses non sourcées.
> Pas de contenu qui sonne artificiellement IA.
> Pas de traduction depuis un brouillon.
> Pas de fusion assimilée à une validation.
> Pas d'appel payant sans GO préalable.
> Cette règle s'applique également aux PR déjà ouvertes, sans annuler les travaux antérieurement validés.

**Note de version** — La ligne « Pas d'appel payant sans GO préalable » reste citée ci-dessus pour trace. Elle n'est plus en vigueur : D43 la remplace (décision du 02/10 : budget global de 200 USD par mois ; GO explicite de Laurent avant tout appel payant).

**Arbitrages de Laurent du 01/10** — Six points d'articulation avec les décisions existantes, relevés dans la première version de cette décision (PR #76, tête `59861e9`) et tranchés par Laurent le même jour :
1. **D12** — Aucun contenu éditorial n'est fusionné avant validation et autorisation de publication selon la gouvernance applicable. D12 reste en vigueur pour le reste.
2. **D15 et D16** — Conservées : validation tacite après cinq jours ouvrés pour les réécritures (D15), validation explicite pour les créations (D16). Les exigences qualitatives de D42 s'appliquent dans les deux cas.
3. **D26, point 4** — Le seuil de 2 USD est remplacé par une autorisation-cadre de 20 USD cumulés par mission : voir D43. Précisé par les arbitrages finaux 1 et 2 (D43) : budget trimestriel conservé, GO préalable pour tout appel, définition de la mission. **Remplacé sur le budget par D43 du 02/10** : 200 USD par mois, toutes missions confondues, sans plafond trimestriel ni plafond général par mission.
4. **D40** (proposée dans #65, non fusionnée) — Contrôle des Preview sur ordinateur, smartphone et tablette, en portrait et en paysage lorsque pertinent ; tester également les interactions tactiles. Cet arbitrage élargit le contrôle « desktop et 390 px » de D40 et de `08-PREVIEW-VALIDATION.md` (#65). #65 n'est pas modifiée par cette PR : son texte est à harmoniser avant sa fusion.
5. **Périmètre** — D42 concerne les contenus produits par les deux environnements Claude. Transmission au Claude de Sébastien par la boîte aux lettres (Q19). Le périmètre d'intervention de chacun, défini par `/CLAUDE.md`, n'est pas modifié.
6. **Travaux validés** — D37 et les travaux antérieurement validés restent acquis. D42 s'applique aux étapes restantes des chantiers ouverts.

**Le contexte** — Aucun motif n'accompagne le texte. Fait métier confirmé par Laurent le 01/10, utile à l'étape 5 : « Sébastien peut ouvrir les Previews Vercel protégées. Son accès fonctionne, il n'y a aucun problème. » Relevé du 01/10 dans le dépôt, sur `main` `17fc0b3` :
- PR ouvertes touchant `content/**`, `messages/**` ou un composant de landing : #27 (maillage Q3, 13 fichiers), #59 (pilier AI Act, FR), #60 (article Suisse, FR), #64 (D33, 16 fichiers), #66 (`/fr/packshot-mode`), #70 (`metaTitle` d'un article) ;
- PR ouvertes sans fichier de contenu : #65 (D40, documentation), #67 (D36, Worker et `next.config.ts`), #75 (documentation).

**Articulation avec D40** — D40 est **proposée dans #65, non fusionnée** : elle n'est pas en vigueur. Relevé du 01/10 sur la tête `c5e15a8` de #65 (D40 et `08-PREVIEW-VALIDATION.md`) :

| Point | D40 (#65) | D42 et D43 | Verdict |
|---|---|---|---|
| Contrôle des Preview, supports | Desktop 1440 px et mobile ≈ 390 px (§ 6, § 8, § 9) | Ordinateur, smartphone et tablette ; portrait et paysage lorsque pertinent (arbitrage 4) | Écart : #65 à compléter |
| Interactions tactiles | Absentes | À tester (arbitrage 4) | Écart : #65 à compléter |
| Transmission à Sébastien | Alias de branche, SHA de tête et dossier de validation, pour toute modification client-facing substantielle ; accès de Sébastien « non établi » | Étape 5 ; accès établi par le fait métier du 01/10 | Compatible ; mention d'accès de #65 obsolète |
| Validation avant publication | Ne pas fusionner pour montrer ; GO avant fusion pour une création | Aucun contenu éditorial fusionné avant validation et autorisation de publication (arbitrage 1) ; autorisation finale de Laurent (arbitrage final 3) | Compatible |
| Modifications après le GO de Sébastien | Un GO vaut pour la tête indiquée ; tout push après l'envoi est renvoyé, limité à ce qui a changé (§ 2, § 6) | Validation ciblée si changement substantiel ; information si métadonnées, maillage, liens ou réglages techniques ; contrôles dans tous les cas (arbitrage final 3) | #65 à aligner |
| Corrections typographiques ponctuelles | Hors du circuit (§ 6, « Non concerné ») | Pas de nouveau circuit complet ; contrôles techniques, traçabilité proportionnée, validation ciblée si le périmètre typographique est dépassé (arbitrage final 4) | Compatible ; #65 à compléter |
| Création, réécriture, technique | D16 explicite, D15 tacite, D12 sans transmission | Même régime (arbitrage 2) ; exigences qualitatives dans les deux cas | Compatible |
| Appels payants | Calculateur ROI sur une Preview : appels facturés, « pas de conversation de test sans raison » (§ 4) | D43 (02/10) : budget global de 200 USD par mois ; GO explicite de Laurent avant tout appel payant | À rattacher à D43 dans #65 |

**Arbitrages finaux de Laurent du 01/10 — articulation avec D40**, reproduits sans modification.

Arbitrage final 3 — modifications SEO/GEO après le GO de Sébastien :

> Adopter la règle suivante :
>
> - Si les modifications ultérieures changent substantiellement le texte, le sens, un claim, une qualification juridique ou une proposition commerciale : nouvelle validation ciblée de Sébastien sur les éléments modifiés.
> - Si elles ne concernent que les métadonnées, le maillage, les liens ou des réglages techniques sans changement de sens : information à Sébastien, sans lui imposer une nouvelle validation complète.
> - Dans tous les cas, les contrôles techniques et visuels restent nécessaires.
> - L'autorisation finale de publication ou de fusion appartient toujours à Laurent.
>
> Ne pas transformer le GO métier de Sébastien en autorisation automatique de publication.

Arbitrage final 4 — corrections typographiques ponctuelles :

> Une correction strictement typographique, sans modification du sens, d'un claim ou du contenu substantiel, ne déclenche pas un nouveau circuit complet Preview / Sébastien.
>
> Elle reste soumise :
>
> - aux contrôles techniques habituels ;
> - à une traçabilité proportionnée ;
> - à une nouvelle validation ciblée si elle dépasse finalement le périmètre typographique.
>
> Conserver la cohérence de cette exception entre D40 et D42.

**Ce qu'elle interdit** — Ceux du texte, sans ajout : la phrase « Aucun contenu ne doit être considéré comme terminé… » et les lignes « Pas de… » de l'exigence non négociable, sauf « Pas d'appel payant sans GO préalable », remplacée par D43. S'y ajoutent, par l'arbitrage 1 : fusionner un contenu éditorial avant validation et autorisation de publication ; par l'arbitrage final 3 : transformer le GO métier de Sébastien en autorisation automatique de publication.

---

## D41 · 2026-09-30 · Cluster AI Act : satellites B, C et D non créés, matière indispensable réintégrée dans le pilier A

**Décidé par** : Laurent — consignée le 2026-10-01
**Statut** : **remplacée par D46 (06/10/2026) sur le seul principe de non-création des satellites B, C et D** ; le reste est maintenu (#61, #62 et #63 ne se rouvrent pas ; mesures du 30/09 non présentées comme un verdict favorable). Texte d'origine ci-dessous, inchangé — application de D16 et D27, qu'elle n'amende pas

**La décision** — Ne pas créer les satellites B (retouche IA, #61), C (mannequins virtuels et personnes synthétiques, #62) et D (métadonnées et marketplaces, #63) : `B_D16_FINAL = NO`, `C_D16_FINAL = NO`, `D_D16_FINAL = NO`. Réintégrer dans le pilier A (#59) la seule matière indispensable au lecteur. Fermer #61, #62 et #63 sans fusion.

**Le contexte** — Mesures D16 du 30/09 dans les descriptions de #61, #62 et #63 (workflows n8n jetables en lecture seule `EiMBLzt28dSzVzHh` et `KPKz3xyNOnDIxZiX`). Leur conclusion « les trois critères de D16 sont remplis » précède la décision et n'est pas le verdict retenu. Motif de Laurent : critère 2 non rempli pour B et C (aucune demande mesurée sur l'intention réglementaire, requêtes génériques ou d'outils non assimilées) ; critère 3 non rempli pour D. Réintégration : commit `be1f8ae` de #59. Archive des mesures et backlog : `JOURNAL.md`, entrée du 2026-10-01.

**Ce qu'elle interdit** — Publier, fusionner ou rouvrir #61, #62 ou #63 ; présenter leurs mesures du 30/09 comme un verdict favorable à leur publication ; recréer un article sur ces trois sujets sans nouvelle mesure D16 complète et nouvelle décision.

---

## D39 · 2026-09-30 · Mode : la landing `/fr/packshot-mode` est la page commerciale cible ; le hub reste distinct

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — Sur la mode, la page commerciale cible est `/fr/packshot-mode`, enrichie à partir de l'existant selon la méthode de F5. Le hub `/fr/industrie/mode-textile` reste en place et distinct : ni redirection, ni canonique croisée. Le recrawl encore incomplet de la landing après #16 ne justifie aucun changement de canonique, de redirection ou d'architecture. La version FR est validée avant toute traduction (D38).

**Le contexte** — Phase de recherche Mode close le 30/09 (rapport de phase 1, Evidence Pack et contre-expertise, hors dépôt). La landing faisait 755 mots visibles et affichait des chiffres non sourcés (500+ pièces par jour, 3 s, -80 %) repris par les moteurs IA.

**Ce qu'elle interdit** — Rouvrir l'arbitrage landing / hub sans élément nouveau ; rediriger ou canonicaliser l'une vers l'autre ; relancer la recherche Mode pour ce chantier ; lier la landing Mode à F5 avant le 23/11/2026 (D37).

---

## D38 · 2026-09-28 · Tout nouvel article se publie en FR, EN et de-ch de façon coordonnée

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — Pour tout nouvel article : 1. rédaction et validation factuelle en FR ; 2. traduction EN ; 3. adaptation de-ch ; 4. contrôle SEO, hreflang, données structurées et FAQ des trois langues ; 5. publication coordonnée. La traduction part de la version FR validée, jamais d'une ancienne version ou d'un ancien brief, et ne renforce aucun claim. Pour un sujet juridique ou réglementaire, la version de-ch est adaptée au périmètre suisse et ne suppose jamais qu'une règle de l'UE s'applique directement à la Suisse (s'applique notamment au futur article AI Act).

**Le contexte** — Publication trilingue de F5 (D37) : les versions EN et de-ch de la landing portaient encore les claims retirés du FR (500+ produits/jour, -80 %, ROI 4-8 mois).

**Ce qu'elle interdit** — Publier un nouvel article dans une seule langue sans décision contraire. Traduire depuis une autre source que la version FR validée. Transposer en de-ch une règle UE ou un dispositif français (OPCO, Qualiopi) comme s'il valait en Suisse.

---

## D37 · 2026-09-28 · F5 publiée simultanément en FR, EN et de-ch

**Décidé par** : Laurent
**Statut** : en vigueur — **modifie le périmètre du brief F5** (FR seulement)

**La décision** — La nouvelle landing `/packshot-e-commerce` est publiée en même temps en FR, EN et de-ch, par un seul composant page-scopé ; les versions EN et de-ch sont traduites de la version FR validée (commit `315bc5c`) et remplacent les anciennes. Aucune nouvelle validation de Sébastien n'est demandée : la version FR intègre son retour. La mesure F5 principale reste celle de la landing FR ; les règles de mesure historiques ne sont pas modifiées rétroactivement ; J0 = mise en production de la landing FR ; aucun lien entrant vers F5 avant J+56.

**Le contexte** — Les namespaces EN et de-ch `packshotEcommerce` servaient l'ancienne landing et ses claims non sourcés (500+ produits/jour, -80 % de coûts, ROI 4-8 mois, moins de 1 € par image, « toutes les marketplaces », témoignage non validé).

**Ce qu'elle interdit** — Conserver l'ancienne landing EN ou de-ch. Utiliser les résultats EN ou de-ch comme mesure principale de F5. Ajouter du maillage entrant vers F5 avant J+56.

---

## D36 · 2026-09-25 · `noindex` de l'origine `sysnext.vercel.app` : validé, à exécuter

**Décidé par** : Laurent
**Statut** : en vigueur — **non exécutée** au 25/09 : action à exécuter puis à vérifier

**La décision** — Fermer l'origine `sysnext.vercel.app` à l'indexation et à la citation par un `noindex`, sans toucher le domaine de production `www.packshot-creator.com`. L'origine continue de servir aux contrôles applicatifs (R4, D23).

**Le contexte** — Q12 : le 19/09, une réponse de Perplexity citait `sysnext.vercel.app` comme source. L'option A, en-tête `X-Robots-Tag: noindex` sur l'hôte Vercel, avait été validée par Laurent le 19/09 ; la validation est confirmée le 25/09.
- État relevé le 25/09 : ni en-tête `X-Robots-Tag` ni balise `robots` sur `https://sysnext.vercel.app/fr`.
- Dépendance (R8) : `scripts/seo/smoke.mjs` lit la balise `<meta name="robots">`, pas l'en-tête. Une mise en œuvre par balise sur l'origine ferait échouer le smoke des pages indexables sur `sysnext.vercel.app`.

**Ce qu'elle interdit** — Une règle qui atteindrait `www.packshot-creator.com`. Une mise en œuvre qui empêcherait les contrôles sur l'origine. Tenir l'action pour faite sans vérification, sur l'origine comme sur le domaine de production.

---

## D35 · 2026-09-25 · Requête française : la page cible est la page FR ; l'article EN reste en l'état jusqu'à la mesure F5

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — Sur une requête française, la page cible est la page FR. L'article EN `/en/blog/packshot-photography-guide-why-make-product-packshots` n'est ni supprimé, ni passé en `noindex`, ni redirigé maintenant. La mesure F5 (page témoin `/fr/packshot-e-commerce`) est conservée : aucune décision supplémentaire avant elle.

**Le contexte** — Q14 : sur « packshot e-commerce » et ses variantes, Google sert cet article EN en position 2,0 à 2,8 (1 351 impressions, 0 clic en 120 jours). La landing FR est absente de ces requêtes. Option A de Q14.

**Ce qu'elle interdit** — Supprimer, passer en `noindex` ou rediriger l'article EN avant la mesure F5 et sans nouvelle décision.

---

## D34 · 2026-09-25 · D8 close : blocage d'Amazonbot, décision devenue sans objet

**Décidé par** : Laurent
**Statut** : en vigueur — **clôt D8**

**La décision** — D8, dans sa formulation actuelle (« Amazonbot reste bloqué tant que le taux de 504 ne redescend pas »), est close : elle est devenue sans objet. Cette clôture ne modifie aucune règle Cloudflare.

**Le contexte** — Q4, vérifications du 17/09 :
- les 504 sont toutes émises sur des requêtes internes Cloudflare liées aux Early Hints, et aucune ne touche les visiteurs ni les robots réels ;
- Amazonbot authentique n'est pas bloqué dans les faits : 0 réponse 403 sur 2 626 requêtes depuis les IP d'Amazon ;
- les 403 attribués à « amazonbot » visent à 94 % l'user-agent Amzn-SearchBot, depuis des IP absentes de la liste publiée par Amazon.

**Ce qu'elle interdit** — Invoquer D8 pour justifier un blocage d'Amazonbot. Un blocage de crawler d'IA pour une autre raison passe par une nouvelle décision explicite.

---

## D33 · 2026-09-25 · Faits de référence de l'entreprise : langues, date de création, compte Twitter

**Décidé par** : Laurent
**Statut** : en vigueur — alignement du site à faire

**La décision** — Faits de référence de PackshotCreator/Sysnext :
- allemand : un peu parlé. PackshotCreator peut assurer un accompagnement commercial en allemand en Suisse. L'équipe n'est présentée ni comme bilingue, ni comme germanophone native ;
- espagnol : non parlé ;
- `twitter.com/packshot` : appartient à Sysnext, inactif ;
- date de création : 2001.

Le `foundingDate` du schéma `Organization` du site, actuellement à 2004, doit être aligné sur 2001.

**Le contexte** — Q15 portait sur les langues déclarées par la fiche Google France, sur le compte Twitter et sur la date de création : décembre 2001 sur la fiche, `foundingDate` 2004 sur le site. Le 25/09, avant fusion, Laurent a précisé le fait « allemand » ; la formulation initiale de cette décision est remplacée. Relevé du 25/09 dans le dépôt (R7), sans modification :
- `components/seo/SchemaOrg.tsx:72` : `foundingDate: '2004'`, à aligner ;
- mentions actuelles d'accompagnement en allemand, conservées : `messages/fr.json:189`, `messages/de-ch.json:167`, `messages/en.json:93` et `app/[lang]/distributeur-orbitvu-suisse/page.tsx:36`, et le `ContactPoint` commercial suisse (`availableLanguage` avec `German`, `components/seo/SchemaOrg.tsx:66`) ;
- aucune formulation ne présente l'équipe comme bilingue ou germanophone native. Les quatre textes cités annoncent en allemand l'ensemble du service, formation et SAV compris : ils sont signalés pour une relecture ultérieure.

`twitter.com/packshot` ne figure pas dans le `sameAs` du site.

**Ce qu'elle interdit** — Présenter l'équipe comme bilingue ou germanophone native. Retirer les mentions actuelles d'accompagnement en allemand pour ce seul motif. Déclarer l'espagnol parlé ou une date de création autre que 2001. Présenter `twitter.com/packshot` comme un canal actif.

---

## D32 · 2026-09-25 · Faits commerciaux des fiches : aucun retour, livraison et installation en supplément, délai indicatif

**Décidé par** : Laurent
**Statut** : en vigueur — mise en œuvre dans les données structurées à faire

**La décision** — Pour l'offre de leasing B2B livrée et installée, en France comme en Suisse, la règle est la même :
- aucune politique de retour ;
- livraison et installation facturées en supplément ;
- délai indicatif d'environ 10 jours.

Ce délai reste indicatif : il n'est jamais présenté comme une garantie contractuelle.

**Le contexte** — Q13 : 10 fiches marchand sont signalées non valides par Google. Il leur manque `hasMerchantReturnPolicy` et `shippingDetails`, qui décrivent des engagements commerciaux. Le 25/09, avant fusion, Laurent a précisé que la règle vaut pour la France et pour la Suisse.

**Ce qu'elle interdit** — Déclarer une politique de retour. Déclarer la livraison ou l'installation incluses. Présenter le délai d'environ 10 jours comme garanti, en texte comme en données structurées.

---

## D31 · 2026-09-24 · Aucun témoignage ni avis client sur `/de-ch`

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — Sur `/de-ch`, aucun témoignage ni avis client n'est rendu, en texte comme en données structurées :
- avis Google (`TestimonialsSection`) et leurs JSON-LD `Review` ;
- section clients de la home et micro-témoignage du CTA final ;
- carrousel de `/ia-photo-produit` et `aggregateRating` du JSON-LD `SoftwareApplication` de BlendAI ;
- citations des landings `packshot-*`.

`/fr` et `/en` ne changent pas.

**Le contexte** — Relevé du 24/09 sur `sysnext.vercel.app` : `/de-ch` rendait « What our clients say » et « Reviews published on Google » en anglais, 6 avis Google en français et 8 blocs JSON-LD `Review`. `/de-ch/ia-photo-produit` portait un `aggregateRating` (4,9 sur 100 avis). Les avis existants sont en français ; ils ne sont ni traduits ni remplacés. Mise en œuvre : PR #32.

**Ce qu'elle interdit** — Traduire un avis ; rédiger ou inventer un témoignage en allemand ; réintroduire sur `/de-ch` un bloc d'avis, un `Review` ou un `aggregateRating` dérivé d'avis clients sans nouvelle décision.

---

## D30 · 2026-09-24 · Mensualités de-ch : hors périmètre, aucun changement

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — `OUT_OF_SCOPE_NO_CHANGE`. Le chantier SEO/GEO ne modifie aucun prix ni aucune devise. Pas de PR sur les mensualités de-ch, pas de modification de `lib/leasing.ts`, du JSON-LD `Offer` lié aux mensualités, de la FAQ Wine ni du calculateur ROI, pas de sollicitation de Sébastien au titre de ce chantier.

**Le contexte** — Les prix affichés sont l'un des quatre sujets qui engagent l'entreprise (`01-RAYON-ACTION.md`, D13). Un passage des mensualités de-ch en euros a été préparé le 24/09 ; il n'est pas retenu dans ce chantier. D30 ne statue pas sur la devise : elle sort le sujet du chantier.

**Ce qu'elle interdit** — Toute modification de prix, de devise ou de mensualité au titre du chantier SEO/GEO ; présenter la conclusion « CHF décidé » du Master V3 comme une décision de référence de ce chantier.

---

## D29 · 2026-09-24 · Alphashot XL v2 et Alphashot XL G2 : mapping produit à valider

**Décidé par** : Laurent
**Statut** : `SUSPENDED / REVIEW_PRODUCT_MAPPING` — n'est **pas** en vigueur. L'orientation initiale du 24/09 (« le successeur de l'Alphashot XL v2 est l'Alphashot XL G2 ») est suspendue le jour même.

**La décision** — Aucune redirection automatique Alphashot XL v2 → XL G2 n'est validée. Aucun nouveau changement de redirection XL avant validation du mapping produit. Aucun rollback automatique de l'existant.

**Le contexte** — L'Alphashot XL ancienne génération et l'Alphashot XL G2 coexistent ; PackshotCreator appelle encore l'ancienne génération « Alphashot XL v2 ». La fiche existe toujours : `/de-ch/fotostudio/alphashot-xl-v2` répond 200, avec une canonique auto-référente et sans balise `robots`, mais elle est `delisted: true` et absente du sitemap (relevé du 24/09 sur `sysnext.vercel.app`). En conséquence :
- la PR #31 (`next.config.ts`) est fermée sans fusion, `SUPERSEDED / REVIEW_PRODUCT_MAPPING`, et aucune de ses règles n'est conservée ;
- dans la PR #30, `/de/fotostudio/alphashot-xl` garde son état de `main` (301 → `/de-ch/fotostudio/maschinen-finder`).

**Classées `REVIEW_PRODUCT_MAPPING`, laissées en l'état** :

| Ensemble | État au 24/09 |
|---|---|
| **13 redirections du Worker déjà en production vers `alphashot-xl-g2`** | Visaient `alphashot-xl-v2` le 17/09, basculées entre le 17/09 et le 23/09. Liste ci-dessous |
| 2 règles de `next.config.ts` : `/en/photo-studio/alphashot-xl` et `/en/studio-photo/alphashot-xl` | → `/en/studio-photo/alphashot-xl-v2`, **inchangées** |
| `/de/fotostudio/alphashot-xl` (Worker) | → `/de-ch/fotostudio/maschinen-finder`, **inchangé** |

Les 13 redirections du Worker :

| Groupe | Chemins |
|---|---|
| `DE_CH_MAP` et racine | `/de/studio-photo/alphashot-xl`, `/fr/studio-photo/alphashot-xl`, `/studio-photo/alphashot-xl` |
| Lot F, PR #26, accord du 23/09 | `/commun/packshot-3d.html`, `/commun/packshot-pro-3d-hd.html`, `/gamme-studio/studio-photo-sans-detourage-packshot-r3/specifications`, `/product/maestrobot-studio-3d`, `/product/photo-studio-r3`, `/produit/alphashot-xl`, `/produit/packshotcreator-r3`, `/produit/studio-photo-sans-detourage-packshot-r3`, `/es/studio-photo/alphashot-xl`, `/nl/studio-photo/alphashot-xl` |

**Ce qu'elle interdit** — Toute nouvelle redirection vers `alphashot-xl-g2` ou vers `alphashot-xl-v2` pour une ancienne URL XL ; tout retour en arrière automatique des 13 redirections en production ; toute modification des 2 règles de `next.config.ts`. Ces gestes restent fermés tant que le mapping produit XL v2 / XL G2 n'est pas validé. Note : les tests `lot-f` et `legacy-redirects` vérifient qu'aucune entrée du Worker ne cible `alphashot-xl-v2`. Un retour vers la v2, s'il est décidé, les modifiera.

---

## D28 · 2026-09-19 · C6 reclassé en hygiène ; ouverture du chantier « choix de page sur la marque »

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — Traiter C6 (redirections legacy vers `/fr`) comme de l'hygiène de locale, effet attendu sur les clics proche de zéro : pilote de 25 URL déployé dans un cycle distinct du lot F. Ouvrir comme chantier de fond prioritaire le choix de page par Google sur les requêtes de marque, instruit par la mesure (M1-M6) avant toute action.

**Le contexte** — Les 103 URL legacy à contenu français routées vers `/en` portent 0 impression attribuable et 0 backlink dans l'échantillon. Sur la marque, `/en` est en position 1,7 ; `/fr` est absent des 8 premières URL. Côté français, la marque a été servie par la racine `/` jusqu'en juin 2026 ; elle est passée de 50-118 clics par mois à 16 en juillet et 5 en août ; `/fr` a glissé de la position 4,7 (avril) à 28,9 (juillet). `x-default` pointe déjà vers `/fr`. Historique du Worker : la racine faisait une redirection conditionnelle par langue jusqu'au 14/07, puis une 301 inconditionnelle vers `/fr` depuis cette date.

**Ce qu'elle interdit** — Présenter C6 comme le levier de la marque ; agir sur la marque (racine, canonique, données structurées `Organization`, fiche d'établissement Google) avant les mesures M1 à M6.

---

## D27 · 2026-09-19 · D16 amendée : la similarité se mesure sur le brief rédigé

**Décidé par** : Laurent
**Statut** : en vigueur — amende le critère 1 de D16

**La décision** — La similarité d'embedding < 0,85 avec l'existant se calcule sur le **brief rédigé** de l'article (titre, angle, plan, questions traitées), comparé aux pages du corpus FR. Elle ne se calcule jamais sur un mot-clé ou un titre seul.

**Le contexte** — Mesure du 19/09 sur les 53 idées d'`editorial_calendar` : similarité maximale au corpus FR de 0,466 à 0,720. Un mot-clé comparé à une page entière passe toujours sous 0,85 : le critère ne triait rien. Le seuil est calibré de page à page (les paires article/offre culminent à 0,97).

**Ce qu'elle interdit** — Valider le critère 1 sur un mot-clé ; créer un article sans brief mesuré.

---

## D26 · 2026-09-19 · Arbitrages de cadrage du mandat

**Décidé par** : Laurent
**Statut** : en vigueur, sauf le point 4 — **point 4 remplacé par D43 du 2026-10-02**, sur le budget (20 $ par trimestre) comme sur le seuil de GO (2 $ par exécution) : budget global de 200 USD par mois pour les services payants de recherche SEO/GEO, GO explicite de Laurent avant tout appel payant. Formulation historique du point 4 conservée ci-dessous

**La décision** — Cinq points arbitrés le 19/09, sans passer par la boîte aux lettres :

1. **Le mandat porte sur le trafic**, pas sur la qualification des demandes. Avec une limite portée dans chaque livrable : vingt mois de `deal_events` montrent une à deux affaires gagnées par mois quel que soit le trafic, et les clics France sont passés de 684 à 86 sur la même période. On pilote le trafic faute d'un indicateur mesurable plus proche du résultat, pas parce qu'il prédit le résultat.
2. **La Belgique n'est pas une zone.** Le cadre « jamais la Belgique, fr-BE, nl-BE, nl » est confirmé et non révisable, bien que la Belgique ait produit 722 clics sur 16 mois contre 703 pour la Suisse.
3. **Aucune règle de qualification des devis n'est établie** : l'échantillon est trop faible. Le KPI final reste non mesurable proprement, et c'est assumé.
4. **Budget de mesure** : 20 $ par trimestre, avec GO au-delà de 2 $ par exécution.
5. **Les prix affichés du site** relèvent exclusivement des données structurées (D7) : le balisage `Offer` des 42 fiches est conforme et la mention visible « À partir de X €/mois en leasing » est imposée par le format. Aucune remise en cause de D7, D13 ni D25.

**Le contexte** — Ces cinq points avaient été formulés en questions (Q5, Q7, Q8, Q9, Q11) dans le bilan d'audit, et arbitrés par Laurent avant tout dépôt dans la boîte aux lettres. Ils sont consignés ici plutôt qu'en questions closes, puisqu'ils n'ont jamais été posés.

**Ce qu'elle ferme** — Rouvrir la Belgique, la règle de qualification des devis, ou l'affichage des prix, sans élément nouveau. La numérotation Q5, Q7, Q8, Q9 et Q11 reste inutilisée : ne pas la réattribuer.

---

## D25 · 2026-09-18 · Pas de prix dans un comparatif concurrentiel

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — Aucun prix, ni celui de PackshotCreator ni celui d'un concurrent, ne figure dans une page de comparaison concurrentielle. La comparaison porte sur des caractéristiques objectives et vérifiables : cadence, formats et dimensions acceptés, automatisation du détourage, intégrations, logiciel, support, lieu de fabrication, formation.

**Le contexte** — Un prix concurrent cité et devenu faux expose à un contentieux, et la charge de le maintenir à jour sur quatre concurrents est disproportionnée. Le prix reste par ailleurs réservé aux formats techniques qui l'imposent (D7) et à la validation de Sébastien (D13).

**Ce qu'elle ferme** — Publier un tableau comparatif chiffré en euros. Reprendre un prix concurrent lu sur un forum ou un site tiers.

---

## D24 · 2026-09-19 · Cible de clics FR+CH et sa mesure

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — Le KPI trafic est le nombre de clics Google Search Console, pays France et Suisse, toutes pages, lu dans l'interface (dimension Pays) tant que la table `gsc_metrics_page_country` n'existe pas. Point de départ : 190 clics par mois (août 2026). Cible : **250 à 350 clics par mois en décembre 2026**, révisable à la hausse après mesure de l'effet de C6. L'ordre de grandeur de 1 200 à 1 500 clics avancé le 17/09 est un plafond théorique à douze mois, pas une cible.

**Le contexte** — Une première cible de 350 à 450 avait été calculée le 18/09 sur trois hypothèses que les mesures du 19/09 ont démenties : une base de 55 000 impressions mensuelles (la base réelle France est d'environ 22 000), un gisement de CTR de +400 à 600 clics par mois (le CTR français est de 1,41 % à la position 14,4, soit **au-dessus** de la norme pour cette position), et une demande stable (les volumes Google Ads reculent de 28 à 79 % selon la requête sur un an).

**Ce qu'elle ferme** — Comparer des clics tous pays à cette cible. Prendre un chiffre suisse dans `gsc_metrics_country` seul, dont la couverture varie de 9 à 50 % selon le mois. Bâtir un plan sur la récupération du CTR. Créer des articles informationnels pour atteindre la cible : D16 reste le critère.

---

## D23 · 2026-09-18 · R4 amendée : la production est testable depuis le poste de Laurent

**Décidé par** : Laurent
**Statut** : en vigueur — **amende R4 (`CLAUDE.md`) et B1 (`03-PIEGES.md`)**

**La décision** — « La production n'est pas testable par un script » reste vrai pour Claude Code, la CI, les Preview et tout client distant. Ce n'est pas vrai depuis le poste Windows de Laurent ni depuis le NAS : leur préfixe IPv6 est en liste blanche Cloudflare (règle d'accès `966dd862`, /64, « W11 + NAS crawler », 20/06) et `curl.exe` y renvoie les codes réels, Worker et WAF compris.

**Le contexte** — R4 avait été rédigée le 16/09 sur une mesure faite hors liste blanche : 17 pages sur 17 en 403. Elle a conduit à qualifier de « divergence du Worker » un comportement conforme.

**Ce qu'elle ferme** — Conclure à un défaut de production depuis un 403 obtenu hors liste blanche. Faire passer une vérification de production par Claude Code quand un `curl.exe` depuis le poste de Laurent est possible.

**Ce qu'elle n'ouvre pas** — L'adresse en liste blanche ne reçoit ni les défis Super Bot Fight Mode ni la règle « chemins sensibles ». Pour ce que reçoit un visiteur ordinaire, le contrôle dans Chrome reste la référence.

---

## D22 · 2026-09-18 · Super Bot Fight Mode est la source des défis ; PerplexityBot n'est plus un bot vérifié ; exemption par user-agent et adresse IP combinés

**Décidé par** : Laurent
**Statut** : en vigueur — **remplace la section « bots » de `05-INFRA.md`**

**La décision** — Super Bot Fight Mode est actif (`sbfm_definitely_automated = managed_challenge`, détection JavaScript, `sbfm_verified_bots = allow`) et produit les défis attribués le 17/09 à « une règle managée » : 54 167 en trois jours. Googlebot depuis AS15169 : zéro défi. PerplexityBot est défié depuis ses adresses publiées — 383 défis sur 519 requêtes en 30 jours au 17/09, 31 en trois jours au 18/09 — parce que **Cloudflare l'a retiré de sa liste de bots vérifiés en 2025** après avoir constaté des crawls furtifs sous user-agent Chrome : `verified_bots = allow` ne le couvre plus. Les autres crawlers d'IA ne sont pas bloqués depuis les réseaux de leurs éditeurs ; les 6 181 défis restants visent des user-agents usurpés depuis Google Cloud et Amazon, et c'est le comportement voulu.

Correctif retenu : une règle WAF « Skip Super Bot Fight Mode » conditionnée à `http.user_agent contains "PerplexityBot"` **et** `ip.src in {liste publiée}`, la liste étant recontrôlée chaque trimestre — elle n'avait pas été régénérée depuis plus d'un an au 13/08/2026 et ne comptait que huit adresses.

**Ce qu'elle ferme** — Toute exemption fondée sur le user-agent seul. Toute règle par plage d'adresses figée sans recontrôle périodique. Toute mesure « pourcentage de robot bloqué » fondée sur le user-agent seul. Réactiver la règle `54a4b8c2` « Skip SBFM videos R2 », désactivée depuis le 23/07, sans contrôle visiteur préalable des vidéos produit.

---

## D21 · 2026-09-18 · Divergence Worker dépôt/production : close

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — Le Worker `packshot-router` déployé le 24/07/2026 se comporte comme `cloudflare-worker/src/index.js` de `main` : zéro écart sur les 14 URL du lot C (5 × 410, 5 × 301 vers la cible attendue, 3 × 404 sans règle, 1 × 307 produit par next-intl à l'origine). Codes confirmés par `curl.exe` depuis le poste de Laurent, dont l'adresse est en liste blanche Cloudflare.

**Le contexte** — Le constat « synchronisé » du 17/09 (PR #10) reposait sur une comparaison de tables. Il a été rouvert le 18/09 sur l'hypothèse que Google recevait des 404 là où le dépôt sert des 301 et des 410. La mesure de comportement du 18/09 tranche dans le sens « synchronisé ».

**Ce qu'elle ferme** — Rouvrir la divergence sans mesure de comportement. Elle ne lève pas R5 : tout déploiement part du dépôt, jamais du dashboard, et reste précédé d'un contrôle d'unicité des clés (piège E4 ; le doublon `/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026` entre `LEGACY_REDIRECTS` l. 1006 et `GONE_PATHS` l. 282 est à retirer au lot F).

---

## D20 · 2026-09-17 · Rééquilibrage vers /de-ch à instruire
**Statut** : proposée, en attente de validation de Laurent
Le marché suisse pèse 10 700 recherches mensuelles sur le périmètre pertinent, contre environ
190 000 en France, mais avec un CPC médian de 3,36 $ en allemand et des pointes à 35 $, et des
verticales identifiées (horlogerie, bijouterie). L'effort marginal sur /de-ch peut être plus
rentable qu'en France ; arbitrage à rendre avant le prochain lot de contenu.

---

## D19 · 2026-09-17 · L'IA est un objectif de citation, pas de position
**Statut** : proposée, en attente de validation de Laurent
« photo produit ia » et « packshot ia » cumulent 70 recherches par mois en France ; aucune
requête de cette famille n'apparaît dans les 905 requêtes GSC. En revanche un AI Overview
s'affiche sur 4 des 15 requêtes mesurées. Les contenus IA sont donc pilotés par un indicateur
de citation en réponse générative, pas par une position ni par un volume de clics.

---

## D18 · 2026-09-17 · Cible SEO = intention prestataire, angle internalisation
**Statut** : proposée, en attente de validation de Laurent
La demande d'achat d'équipement mesurée en France est de 1 620 recherches par mois, toutes
formulations confondues, à 0,53 $ de CPC. L'intention prestataire pèse 13 760 recherches à
1,93 $, et l'univers « packshot » 4 810 recherches avec des CPC de 5 à 11,63 $. Le SEO vise
donc les entreprises qui font faire leurs visuels, avec un angle d'internalisation, et non
des requêtes d'achat de machine qui n'existent pas en volume.

---

## D17 · 2026-09-17 · Priorité aux chantiers FR/CH dans l'ordre d'attaque

**Décidé par** : Laurent
**Statut** : en vigueur

**La décision** — C5 (traduction des 30 pages /en) passe après C1 à C4 et C6. D9 n'est pas modifiée : la traduction reste décidée, seul son rang change.

**Le contexte** — Marchés primaires France et Suisse, priorité /fr puis /de-ch. /en reste utile pour éviter des 404. Ordre des chantiers relevant du pilotage SEO/GEO transféré le 16/09 (D13).

**Ce qu'elle ferme** — Démarrer C5 tant que C1 à C4 et C6 sont ouverts, sauf réexamen explicite.

---

## D16 · 2026-09-17 · Amendement de D5 : création d'articles sur critère SEO

**Décidé par** : Laurent
**Statut** : en vigueur — **amende D5** (qui reste valable hors critère)

**La décision** — Un nouvel article de blog peut être créé si trois conditions sont réunies : (1) aucune page existante ne couvre l'intention — similarité d'embedding inférieure à 0,85 avec le corpus FR ; (2) une demande est mesurée en France ou en Suisse — impressions GSC FR+CH ou volume DataForSEO non nul ; (3) l'intention est commerciale ou transactionnelle, ou comble une lacune de citation GEO mesurée. Sinon, D5 s'applique : fusion, optimisation, réécriture. La création de pages hors blog (verticaux, landings, pages commerciales FR/CH) n'est pas visée par D5.

**Le contexte** — D5 (03/09) répondait à la cannibalisation : 94 articles, 29 paires à plus de 0,95 de similarité. Le trafic FR+CH est en baisse continue et le pilotage SEO/GEO est passé à Laurent le 16/09. Un gel total de la création empêche de couvrir une demande réelle non servie.

**Ce qu'elle ferme** — Créer un article sans avoir documenté les trois mesures dans la PR. Créer un article dont l'intention est déjà couverte au-delà du seuil de similarité. Fusionner une création sans validation explicite de Sébastien.

**Non vérifié** — Le seuil de 0,85 n'est pas calibré sur la cannibalisation réelle du corpus ; à réviser après les premières créations.

---

## D15 · 2026-09-17 · Validation tacite des réécritures de contenu

**Décidé par** : Laurent — **confirmée tacitement au 2026-09-24 sauf objection de Sébastien (Q2)**
**Statut** : en vigueur — Q2 close le 2026-09-25 selon le régime tacite prévu au 24/09

**La décision** — Une PR qui réécrit ou fusionne du contenu existant, sans prix affiché et sans suppression d'URL portant des backlinks, est fusionnée par le Claude de Laurent si Sébastien n'a pas formulé d'objection dans les 5 jours ouvrés suivant son ouverture. La création de page ou d'article, les prix affichés, la suppression d'une URL à backlinks et tout engagement vis-à-vis d'un tiers restent en validation explicite de Sébastien.

**Le contexte** — Sébastien a transféré le pilotage SEO/GEO à Laurent le 16/09 au motif explicite du manque de temps. Une validation explicite sur toute PR de contenu rétablit le filet humain que D12 avait remplacé par des filets techniques, après douze jours de blocage de C1.

**Ce qu'elle ferme** — Fusionner par validation tacite une PR touchant un prix, une URL à backlinks ou une création. Décompter le délai avant que la CI soit verte et le Preview contrôlé.

---

## D14 · 2026-09-16 · L'accès Vercel de Laurent reste à l'échelle de l'équipe

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Laurent garde le rôle `Member` sur l'équipe Vercel
`sebs-projects-ca1e93a7`, donc l'accès aux 8 projets qu'elle contient. Arbitrage
rendu en connaissance de cause : « tant pis on lui laisse l'accès total Vercel,
pas très risqué ».

**Le contexte** — Question posée à l'origine sur GitHub, où la réponse est
nette : `Sebeth7` est un compte personnel, l'accès collaborateur y est par
dépôt, et Laurent n'a que `packshot-creator`. Rien à corriger.

Sur Vercel en revanche, l'équipe héberge `sysnext`, `jade-tdb`, `frontend`,
`packshot-art`, `packshot-art-next`, `packshot-evolution`, `sebjourdanphoto` et
`recraft-studio-backend`. Le rôle `Member` porte sur les huit : créer des
déploiements, gérer intégrations et domaines.

**Pourquoi c'est resté ainsi** — Le cloisonnement par projet est réservé au plan
Enterprise ; les cinq rôles du plan Pro sont tous à l'échelle de l'équipe. Les
seules sorties réelles étaient de le passer en `Viewer`, de migrer `sysnext`
dans une équipe dédiée, ou de le retirer. Aucune n'a paru justifiée au regard du
risque.

À noter : Laurent a présidé cette société. Son accès Vercel est vraisemblablement
hérité de l'ancienne configuration, pas accordé récemment.

**Ce qu'elle ferme** — Ne pas rouvrir ce sujet sans élément nouveau. Si un
cloisonnement devenait nécessaire, la migration de `sysnext` vers une équipe
dédiée est un chantier à part : re-liaison GitHub, domaines à revérifier, et un
abonnement supplémentaire.

**Non vérifié** — Si le rôle `Viewer` donne accès à Observability sur le plan
Pro. Sans objet tant que D14 tient, mais à savoir si la question revient.

---

## D13 · 2026-09-16 · Quartier libre — le risque à écarter est celui des conséquences non mesurées

**Décidé par** : Sébastien
**Statut** : en vigueur — **remplace le cadre de permissions initial de D12**

**La décision** — Laurent a quartier libre sur le site. Le mandat ne se définit
pas par ce qu'il a le droit de toucher, mais par ce dont il doit avoir mesuré
les conséquences avant d'agir. Dans ses mots :

> Laurent est l'ancien propriétaire de la société, c'est une personne de
> confiance. Le seul risque qu'il faut ôter est celui d'une dégradation de
> l'existant par des actions dont les pleines conséquences n'auraient pas été
> prises en compte. Pour le reste il a quartier libre.

**Le contexte** — La première version de cette gouvernance découpait le dépôt en
zones verte, orange et rouge, avec une liste d'interdits. Le modèle était
calibré sur un prestataire extérieur inconnu. Il ne correspondait pas à la
réalité : Laurent a dirigé cette société et la connaît mieux que quiconque.

**Ce qu'elle change** — Il n'y a plus de zone interdite. `01-PERIMETRE.md`
devient `01-RAYON-ACTION.md` : une carte des dépendances, pas une clôture. Le
contrôle `garde-perimetre`, qui bloquait des fichiers, devient
`garde-consequences`, qui affiche ce qui dépend de ce qui est touché et exige
que la PR le déclare. Il ne juge pas la réponse : il s'assure que la question a
été posée.

**Ce qui reste fermé** — Quatre choses, dont aucune ne tient à la confiance :
un secret dans un dépôt public (irréversible) ; les prix affichés (conformité
distributeur Orbitvu) ; le copywriting français client-facing (la voix de
Sébastien) ; la suppression d'une URL portant des backlinks.

---

## D12 · 2026-09-16 · Laurent merge ses propres pull requests

**Décidé par** : Sébastien
**Statut** : en vigueur, dans les termes révisés par D13 ; **complétée par D42** (2026-10-01) : aucun contenu éditorial n'est fusionné avant validation et autorisation de publication selon la gouvernance applicable

**La décision** — Le Claude de Laurent merge ses propres pull requests dès lors
que le contrôle d'intégration est vert et le Preview contrôlé. Seul ce qui
engage l'entreprise vis-à-vis d'un tiers passe par Sébastien.

**Le contexte** — `main` était figé depuis douze jours, le correctif de la cause
structurelle n°1 attendant en branche. Le filet humain était devenu le goulot.
Il est remplacé par des filets techniques : carte des dépendances rappelée par
le CI, porte d'intégration, journal obligatoire.

**Ce qu'elle interdit** — Pousser directement sur `main` : un push sur `main`
est un déploiement en production. Merger avec un contrôle d'intégration rouge.

---

## D11 · 2026-09-16 · La passerelle vit dans le dépôt

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Toute coordination entre le Claude de Laurent et le Claude de
Sébastien passe par `docs/seo-geo/` : `ETAT.md`, `JOURNAL.md`, `DECISIONS.md`,
`BOITE-AUX-LETTRES.md`. Un doute s'écrit dans la boîte aux lettres ; le chantier
se met en pause ; le Claude de Sébastien répond à sa session suivante.

**Le contexte** — Aucun canal ne reliait les deux côtés. Conséquences déjà
constatées : une liste de travaux « à faire » dont la moitié était livrée la
veille ; un pont de données gelé le jour où il était décidé de le relancer.

**Ce qu'elle interdit** — Coordonner par mail sans trace dans le dépôt. Livrer
sans entrée au journal.

**Ce qu'elle ouvre** — Le canal est symétrique. Le Claude de Sébastien y pose
aussi ses questions : Laurent a dirigé cette société et sait des choses sur
l'historique du site qui ne sont écrites nulle part.

---

## D10 · 2026-09-04 · Vertical défense abandonné

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Abandonner le vertical « défense et sécurité » au profit d'un
vertical **industrie / aéronautique / automobile**. Page cible à définir.

**Ce qu'elle interdit** — Investir sur `industrie-defense`. La fusion prévue à
l'annexe K sur ce sujet est à revoir.

---

## D9 · 2026-09-04 · Traduire les 30 pages `/en` plutôt que les rediriger

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Les 30 pages `/en` qui servent du contenu français seront
**traduites**, par lots, et non redirigées ni supprimées. Les sets
`NOINDEX_EN_*` de `lib/seo-config.ts` pilotent la réactivation : retirer un slug
réactive la page dans robots, sitemap et sélecteur simultanément.

**Ce qu'elle interdit** — Poser un 301 sur ces pages. Retirer un slug d'un set
avant que la traduction soit en ligne.

---

## D8 · 2026-09-04 · Amazonbot reste bloqué

**Décidé par** : Sébastien
**Statut** : **close le 2026-09-25**, devenue sans objet — voir D34 (Q4)

**La décision** — Amazonbot (97 % bloqué, 18 946 requêtes sur sept jours) reste
bloqué tant que le taux de 504 ne redescend pas. Les sept autres crawlers IA
doivent être débloqués.

---

## D7 · 2026-09-04 · `price` = mensualité de leasing

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Le champ `price` au niveau `Offer` du schema Product porte la
**mensualité de leasing** : prix comptant × 1,3 réparti sur 60 mois. Google la
lira comme le prix du produit ; c'est assumé.

**Ce qu'elle interdit** — Substituer le prix comptant sans nouvel arbitrage.

---

## D6 · 2026-08-20 · Doctrine de formulation : officiel, jamais exclusif

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — PackshotCreator est distributeur **officiel** d'Orbitvu.
Le mot « exclusif » est proscrit de toute revendication de distribution, dans
toutes les langues. Personne n'est exclusif sur la Suisse.

**Ce qu'elle interdit** — Écrire « exclusif » dans une revendication de
distribution. **Ne concerne pas** les textes juridiques qui emploient
« propriété exclusive de SYSNEXT » — ceux-là ne se touchent pas.

---

## D5 · 2026-09-03 · Ne pas créer de nouveaux articles

**Décidé par** : Laurent, accepté par Sébastien
**Statut** : en vigueur

**La décision** — Ne pas ajouter d'articles de blog. 94 articles existent, dont
29 paires à plus de 0,95 de similarité. Le problème est la cannibalisation.

**Ce qu'elle interdit** — Créer un article. La réponse à un manque de couverture
est la fusion, l'optimisation ou la désindexation.

---

## D4 · 2026-07-24 · Le dépôt est la source unique du Worker

**Décidé par** : Laurent, accepté sans réserve
**Statut** : en vigueur

**La décision** — Toute règle du Worker Cloudflare passe par un commit dans
`cloudflare-worker/src/index.js`, puis un déploiement depuis le dépôt. Plus
aucune édition au dashboard, par personne — « y compris pour désactiver une
règle Cloudflare » (mail de Laurent, 24/07/2026).

**Le contexte** — Deux violations en trois semaines. La seconde a cassé toutes
les vidéos produit en production pendant une journée, par suppression d'une
règle WAF et par un passthrough vide redirigeant un sous-domaine actif.

**Ce qu'elle interdit** — Éditer le Worker au dashboard. Déployer sans avoir
resynchronisé au préalable.

---

## D3 · 2026-06/07 · Le `noindex` sur `/en` est réversible par conception

**Décidé par** : Sébastien et Laurent
**Statut** : en vigueur

**La décision** — Les pages `/en` servant du contenu français sont en `noindex`,
pas en 301. Bascule en 301 ciblée uniquement si un export de backlinks révèle
des liens externes entrants.

---

## D2 · 2026-06 · Orientation B du `robots.txt`

**Décidé par** : Sébastien et Laurent
**Statut** : en vigueur

**La décision** — Ouvrir les crawlers de **citation** (visibilité GEO), bloquer
ceux d'**entraînement et d'extraction**. En-tête
`Content-Signal: search=yes, ai-input=yes, ai-train=no`. `Google-Extended` n'est
pas bloqué.

**Prérequis** — « Block AI bots » et « AI Labyrinth » désactivés côté
Cloudflare, sans quoi le `robots.txt` ne sert à rien.

---

## D1 · 2026-06/08 · La commune du showroom hors de l'éditorial

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — L'éditorial dit « près de Lyon ». La commune exacte
(Saint-Bonnet-de-Mure) n'apparaît que sur la page contact, dans le schema, dans
les mentions légales et sur la fiche Google Business.

**Le contexte** — Déménagement possible.
