# BOÎTE AUX LETTRES

Le canal entre le **Claude de Laurent** et le **Claude de Sébastien**.

Une question ouverte ici met le chantier concerné en pause dans `ETAT.md`. La
réponse arrive à la session suivante de l'autre côté — **compter quelques
jours**.

**Ne bloque jamais un chantier entier sur une question périphérique.** Découpe :
livre ce qui ne dépend pas de la réponse, mets en attente ce qui en dépend.

---

## Comment poser une question

1. Ajoute une entrée **en haut** de la section « Questions ouvertes »
2. Numérote : `Q<n>`, en continuant la suite
3. Mets le chantier en pause dans `ETAT.md`, en citant `Q<n>`
4. Commite et pousse tout de suite — la question n'existe qu'une fois poussée

### Ce qui fait une bonne question

| Rubrique | Pourquoi |
|---|---|
| **Le contexte** | Ce que tu faisais, quel chantier |
| **Ce que tu as vérifié** | Évite qu'on refasse ton travail. Cite fichiers et lignes |
| **Les options** | Deux ou trois, avec leurs conséquences |
| **Ta recommandation** | Tu es le plus près du sujet. Dis ce que tu ferais |
| **Ce qui est bloqué** | Permet d'arbitrer l'urgence |

Une question sans recommandation reporte l'intégralité de l'effort sur l'autre
côté. Une question qui commence par « que dois-je faire ? » sans avoir rien
vérifié sera renvoyée.

---

## Gabarit

```markdown
### Q<n> · AAAA-MM-JJ · <titre> — DE <Claude de X> À <Claude de Y>

**Chantier** : <référence 06-CHANTIERS>
**Bloque** : <ce qui est en attente, ou « rien, je continue ailleurs »>

**Contexte** — ce que je faisais.

**Vérifié** — ce que j'ai déjà établi, avec les fichiers et les lignes.

**La question** — formulée de sorte qu'une réponse en trois lignes suffise.

**Options**
- A : <option> → <conséquence>
- B : <option> → <conséquence>

**Ma recommandation** — <A ou B>, parce que <raison>.

---
**RÉPONSE · AAAA-MM-JJ · <Claude de Y>**

<la réponse>

**Action** — ce qui est décidé, et par qui. Si c'est structurant, le reporter
dans `DECISIONS.md`.
```

---

## Questions ouvertes

### Q10 · 2026-09-19 · Réexamen de la cible de clics — DU Claude de Laurent À Laurent

**Chantier** : pilotage du KPI trafic
**Bloque** : rien ; D24 s'applique en attendant

**Contexte** — D24 fixe 250 à 350 clics FR+CH par mois en décembre. Cette borne est ce que la mesure permet de défendre en réparant l'existant et en récupérant la marque sur `/fr`, sans conquête nouvelle. Elle est inférieure au niveau de septembre à décembre 2025 (656 à 721 par mois), parce que la demande a reculé de 28 à 79 % selon la requête en un an.

**Vérifié** — Relevé d'interface GSC du 18/09 (100 % des clics) ; volumes Google Ads historiques du 19/09 ; référentiels de CTR par position.

**La question** — Maintenir 250-350 comme prévision fondée sur la mesure, ou retenir une borne volontariste assumée comme objectif et non comme prévision ?

**Options**
- A : 250-350, révisable à la hausse après mesure de C6 → prévision défendable.
- B : borne supérieure volontariste → objectif d'animation, non adossé à une mesure.

**Ma recommandation** — A. Une cible qu'aucune mesure ne soutient se retourne contre celui qui la porte.

**Élément nouveau du 19/09 — la question devient décidable**

- Chiffrage des 20 quick wins du plan de solutions : [Inférence] 5 à 50 clics FR+CH par mois. Écart à combler pour D24 depuis la base d'août (190) : 60 à 160. Plafond théorique du gisement CTR : 81,6 clics métier par 28 jours, tous pays. Cela repose sur des schémas observés.
- L'option A reposait sur « récupérer la marque sur `/fr` via C6 ». La mesure l'invalide : les URL de C6 ne portent ni impression ni backlink (D28).
- La marque côté français est passée de 50-118 clics par mois (février-juin 2026) à 16 en juillet et 5 en août. Elle fait l'objet du chantier « choix de page sur la marque », non instruit à ce jour.
- Chantier de substitution de page sur les requêtes commerciales : [Inférence] 10 à 35 clics par mois s'il réussit, lisible à 8-12 semaines, sous réserve d'une page témoin. Cumul quick wins + substitution : 15 à 85. L'extension au-delà de la page témoin n'intervient qu'après J+56, soit pas avant début décembre : sa contribution à D24 en décembre est donc faible, voire nulle.
- Conséquence : sans le chantier marque, même la borne basse de 250 est incertaine.

**Options révisées**
- A' : maintenir 250-350 comme prévision **conditionnée** au chantier marque, réexaminée après les mesures M1-M6 et la lecture de C1 (fin octobre).
- B : borne volontariste, assumée comme objectif.
- C : ramener la prévision à la base + quick wins, soit [Inférence] 195-240, et traiter la marque comme un bonus.

**Ma recommandation** — A', renforcée. 250-350 est défendable si le chantier marque et le chantier de substitution de page produisent tous les deux. Avec la substitution seule, elle reste incertaine. Deux dates de décision : fin octobre (M1-M6 et lecture de C1) et J+56 de la page témoin.

**Élément nouveau du 23/09** — Mesure France seule (GSC) : la marque
faisait ~42 clics/mois (avril-juin) et ~23 (juillet-septembre) ; les
impressions de marque ont baissé de 60 %. Le gain du chantier marque est
réévalué à [Inférence] 10 à 20 clics/mois (contre 45-100 estimés sur des
chiffres tous pays). La borne haute de D24 n'est plus défendable ; la
borne basse devient incertaine. Recommandation inchangée sur la forme
(A', décision après M5 fin octobre), revue sur le fond : viser la borne
basse.

---

## Questions traitées

Une question répondue et appliquée descend ici, avec sa réponse. On n'efface
rien : la réponse d'hier explique le code d'aujourd'hui.

### Q15 · 2026-09-23 · Fiche Google France — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-25** — réponse de Laurent consignée en D33. Les alignements à faire sont suivis dans `ETAT.md`.

**Chantier** : marque (D28) | **Bloque** : rien
**Pour information, fait le 23/09 par Laurent** (en attente de
validation Google) : fiche « PackshotCreator - Orbitvu », Site Web
https://www.packshot-creator.com/ → https://www.packshot-creator.com/fr
(la racine est redirigée en 301 vers /fr depuis le 14/07) ; téléphone
principal 01 47 42 66 67 → 01 47 42 66 66 (numéro du site).
**Questions** — 1) La fiche indique « Allemand non parlé » alors que
la Suisse est desservie et que le site annonce un accompagnement en
allemand : à corriger ? « Espagnol » est-il exact ? 2) Date de
création : fiche = décembre 2001, schéma Organization du site =
foundingDate 2004. Laquelle est juste ? 3) Le compte
twitter.com/packshot, ajouté par Google, est-il à Sysnext ?
**Recommandation** — Corriger pour que la fiche et le site disent la
même chose : les moteurs recoupent ces données.

---
**RÉPONSE · 2026-09-25 · Laurent**

1. Allemand : **non parlé**. Espagnol : **non parlé**.
2. Date de création de PackshotCreator/Sysnext à retenir : **2001**. Le `foundingDate` du site, actuellement à 2004, devra être aligné.
3. `twitter.com/packshot` appartient à Sysnext ; le compte est **inactif**.

**Action** — D33. Cette réponse ne modifie rien dans le site. Écarts relevés le 25/09 dans le dépôt (R7), à traiter dans une PR applicative distincte :
- `components/seo/SchemaOrg.tsx:72` : `foundingDate: '2004'`, à aligner sur 2001.
- Le site annonce un accompagnement en allemand en Suisse : `messages/fr.json:189`, `messages/de-ch.json:167`, `messages/en.json:93`. Le `ContactPoint` suisse déclare `availableLanguage: ['German', 'French', 'English']` (`components/seo/SchemaOrg.tsx:66`). Ces mentions contredisent « allemand non parlé » ; aucune correction avant arbitrage.
- `twitter.com/packshot` ne figure pas dans le `sameAs` du site : rien à retirer.
- Fiche Google : si elle déclare l'espagnol parlé, la corriger (Laurent, hors dépôt).

---

### Q14 · 2026-09-19 · L'article EN qui tient une requête française — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-25** — réponse de Laurent consignée en D35 (option A).

**Chantier** : substitution de page
**Bloque** : rien ; la page témoin avance sans réponse
**Échéance** : **aucune réponse n'est attendue avant J+56 de la mise en ligne de la page témoin** ([Inférence] début décembre 2026 si la fusion a lieu début octobre). Question déposée maintenant pour information ; elle sera reposée avec la mesure.

**Contexte** — Sur « packshot e-commerce », « packshot ecommerce » et « packshot e commerce », Google sert `/en/blog/packshot-photography-guide-why-make-product-packshots` en position 2,0 à 2,8 : 1 351 impressions, 0 clic en 120 jours. La landing `/fr/packshot-e-commerce` est absente des trois variantes sur les 28 derniers jours. Elle va être enrichie (711 → ~2 200 mots) pour prendre la place de l'article.

**Vérifié** — `gsc_metrics`, requête × page, 28 et 120 derniers jours ; `sf_pages`, dernier crawl.

**La question** — Que faire de l'article EN ?

**Options**
- A : le laisser en l'état.
- B : le passer en `noindex`. Cela touche `/en` (D17) et n'est pas mesuré ; l'article porte aussi « packshot » et « product packshot » en anglais.
- C : le rediriger vers la landing FR. Cela casse la version anglaise et enfreint D17.

**Ma recommandation** — A tant que la page témoin n'a pas été mesurée (J+56). Si la landing plafonne derrière l'article, le Claude de Laurent repose la question à J+56 avec la mesure ; d'ici là, aucune action de ta part.

---
**RÉPONSE · 2026-09-25 · Laurent**

Objectif confirmé : sur une requête française, la page cible est la page FR. L'article EN n'est ni supprimé, ni passé en `noindex`, ni redirigé maintenant. La mesure F5 (page témoin `/fr/packshot-e-commerce`) est conservée avant toute décision supplémentaire.

**Action** — D35. Aucune action avant la mesure F5.

---

### Q13 · 2026-09-19 · Faits commerciaux pour les données structurées des fiches — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-25** — réponse de Laurent consignée en D32. La mise en œuvre dans les données structurées fera l'objet d'une PR applicative distincte, suivie dans `ETAT.md`.

**Chantier** : données structurées des fiches
**Bloque** : 2 des 4 champs manquants des « Fiches marchand » (10 fiches non valides)

**Contexte** — Google signale 10 fiches marchand non valides. Le prix n'est pas en cause (balisage `Offer` conforme D7). Il manque `sku`, `gtin`/`mpn`, `hasMerchantReturnPolicy`, `shippingDetails`. `sku` et `mpn` (s'il existe) sont traités sans toi. Les deux autres décrivent des engagements commerciaux.

**Vérifié** — Relevé HTML de production du 19/09 (`alphashot-pro-g2`) ; code `components/seo/SchemaOrg.tsx`.

**La question** — Pour une offre de leasing B2B livrée et installée :
1. Existe-t-il une politique de retour (délai, conditions) ou aucune ?
2. La livraison et l'installation sont-elles incluses, facturées, avec quel délai, en France et en Suisse ?

**Options**
- A : tu fournis les faits, le balisage les reflète.
- B : on déclare « pas de retour » et « livraison sur devis », si c'est exact.
- C : on laisse ces deux champs vides ; les fiches restent en avertissement.

**Ma recommandation** — A ou B, selon la réalité commerciale. Rien n'est publié sans ta réponse.

---
**RÉPONSE · 2026-09-25 · Laurent**

1. **Aucune politique de retour** B2B.
2. Livraison et installation **en supplément**. Délai **indicatif** d'environ **10 jours** : ce délai ne devient pas une garantie contractuelle.

La réponse ne distingue pas la France et la Suisse.

**Action** — D32. Le balisage `hasMerchantReturnPolicy` et `shippingDetails` reste à mettre en œuvre dans une PR applicative distincte ; cette clôture ne publie rien.

---

### Q12 · 2026-09-19 · `sysnext.vercel.app` est cité comme source par un moteur de réponse — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-25** — `noindex` validé par Laurent ; la question devient la décision D36, une action à exécuter puis à vérifier.

**Chantier** : hygiène d'indexation
**Bloque** : rien

**Contexte** — Dans un panel de 16 requêtes d'acheteur posées à Perplexity le 19/09, une réponse cite `sysnext.vercel.app` comme source, au même titre que le domaine officiel. L'origine Vercel est donc visible et citable par les moteurs de réponse.

**Vérifié** — Panel Perplexity `sonar` du 19/09. [Non vérifié] le statut robots actuel de l'origine, que je n'ai pas relevé.

**La question** — Fermer l'origine Vercel à l'indexation et à la citation, par un en-tête `X-Robots-Tag: noindex` sur l'hôte `*.vercel.app`, sachant que cette origine sert aussi aux contrôles applicatifs prévus par R4 ?

**Options**
- A : `noindex` sur l'hôte de prévisualisation → les contrôles applicatifs continuent de fonctionner, l'origine sort des index et des citations.
- B : statu quo → l'origine reste citable et indexable.

**Ma recommandation** — A, validée par Laurent le 19/09, après vérification que la règle ne touche pas le domaine de production.

---
**RÉPONSE · 2026-09-25 · Laurent**

Option A validée : `noindex` de `sysnext.vercel.app`. Elle n'est pas implémentée dans la PR documentaire.

**Action** — D36, suivie dans `ETAT.md`. État relevé le 25/09 : `https://sysnext.vercel.app/fr` ne renvoie ni en-tête `X-Robots-Tag` ni balise `robots` ; l'origine reste indexable.

---

### Q6 · 2026-09-19 · Pour information — exemption de PerplexityBot par user-agent et adresse IP — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-25** — échéance du 25/09 atteinte sans objection reçue, selon Laurent ; la décision prévue (D22) est conservée.

**Chantier** : C2
**Bloque** : rien ; information préalable à une modification Cloudflare (D4)

**Contexte** — Super Bot Fight Mode défie PerplexityBot depuis ses adresses officielles : 383 défis sur 519 requêtes en 30 jours au 17/09, 31 en trois jours au 18/09. Cause établie : Cloudflare a retiré PerplexityBot de sa liste de bots vérifiés en 2025 après avoir constaté des crawls furtifs sous user-agent Chrome ; le réglage « bots vérifiés : autoriser » ne le couvre donc plus. Googlebot depuis AS15169 : zéro défi. Les autres crawlers d'IA ne sont pas bloqués depuis les réseaux de leurs éditeurs. Les 6 181 défis restants visent des user-agents usurpés depuis Google Cloud et Amazon : comportement voulu.

**Vérifié** — Réglages de bot management lus par API le 18/09 ; `firewallEventsAdaptiveGroups` du 15 au 18/09 ; liste publiée par Perplexity ; règle `4839b867` désactivée (exemption par user-agent seul, contournable) ; D2 ; D8 non concernée.

**Ce qui sera fait, sauf objection avant le 25/09** — Création d'une règle WAF « Skip SBFM — PerplexityBot », conditionnée à `http.user_agent contains "PerplexityBot"` **et** `ip.src in {liste publiée}`, placée avant « Bloquer chemins sensibles ». Aucune autre règle touchée. Liste recontrôlée chaque trimestre : elle n'avait pas été régénérée depuis plus d'un an au 13/08/2026. Entrée au journal et contrôle à J+3.

**Ma recommandation** — Faire. Aucun effet sur le trafic Google ; effet attendu sur la capacité de Perplexity à lire le site.

---
**RÉPONSE · 2026-09-25 · Laurent**

Nous sommes le 25/09 et aucune objection n'a été reçue avant cette date. La question est close et la décision prévue est conservée : règle WAF « Skip SBFM — PerplexityBot », conditionnée au user-agent **et** aux adresses publiées (D22).

**Action** — Créer la règle. C'est une modification Cloudflare, **non exécutée** au 25/09 et hors de cette PR ; elle est suivie dans `ETAT.md`. Contrôle à J+3 et recontrôle trimestriel de la liste, selon D22.

---

### Q4 · 2026-09-17 · D8 (Amazonbot bloqué tant que durent les 504) : prémisse invalidée — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-25** — D8 close comme sans objet (option 1) ; voir D34.

**Contexte** — D8, du 04/09, maintient le blocage d'Amazonbot tant que le taux de 504 ne
redescend pas.

**Vérifié au 17/09**
- Les 504 ne concernent pas les visiteurs ni les robots : sur 30 jours, 213 490 réponses 504,
  toutes émises sur des requêtes internes Cloudflare liées aux Early Hints ; 0 pour les
  visiteurs et robots réels ; aucune ligne 5xx dans les statistiques d'exploration de Google.
- Amazonbot authentique n'est pas bloqué dans les faits : 0 réponse 403 sur 2 626 requêtes
  depuis les IP d'Amazon, avec une action de contournement enregistrée.
- Les 403 attribués à « amazonbot » visent à 94 % l'user-agent Amzn-SearchBot, dont aucune
  IP relevée ne figure dans la liste publiée par Amazon.

**Options**
1. Clore D8 comme sans objet : la prémisse des 504 est invalidée et la règle ne produit pas
   l'effet visé.
2. Maintenir D8 en la reformulant sur le seul Amzn-SearchBot non authentifié.
3. Ne rien changer.

**Recommandation** — option 1, avec remplacement par une règle explicite si un blocage de
crawler IA est souhaité pour d'autres raisons.

**Ce qui est bloqué** — rien opérationnellement ; la décision reste incohérente avec les faits.

---
**RÉPONSE · 2026-09-25 · Laurent**

Option 1 : D8, dans sa formulation actuelle (Amazonbot bloqué tant que durent les 504), est close : elle est devenue sans objet.

**Action** — D34 ; le statut de D8 est mis à jour. Aucune règle Cloudflare n'est modifiée par cette clôture.

---

### Q2 · 2026-09-17 · Production et validation du contenu — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-25** par Laurent, conformément au régime tacite prévu au 24/09 : l'option (b) et D15 s'appliquent.

**Régime tacite** — Sans objection de Sébastien au 2026-09-24, l'option (b) et D15 s'appliquent. Aucune réponse n'est requise pour les confirmer.

**Le contexte** — Sébastien a transféré le pilotage SEO/GEO le 16/09 faute de temps. Laurent a arbitré le 17/09 : le contenu passe par GitHub et Sébastien valide. La publication de nouvelles pages n'est pas exclue (C7 en est une) et la création d'articles est rouverte sous critère SEO (D16) ; le contenu ne peut pas dépendre de la disponibilité de Sébastien pour sa rédaction. D13 prévoit pourtant « tu produis la structure, il produit la prose ».

**Ce que j'ai vérifié** — DECISIONS.md D5, D12, D13 ; 01-RAYON-ACTION.md (prix affichés, copywriting client-facing) ; 06-CHANTIERS.md C7.

**Les options**
(a) Statu quo D13 : Sébastien rédige la prose. Le goulot demeure.
(b) Le Claude de Laurent rédige la prose française (règles de rédaction, test détecteur IA) ; Sébastien valide explicitement les créations de pages et d'articles (D16) ; réécritures et fusions sans prix ni URL à backlinks en validation tacite sous 5 jours ouvrés (D15).
(c) Comme (b), mais validation tacite étendue aux créations.

**Ma recommandation** — (b), retenue par Laurent. La voix de marque reste sous le contrôle de Sébastien par la validation, sans qu'il porte la rédaction.

**Ce qui est bloqué** — C7 et les réécritures issues de la cannibalisation.

---
**RÉPONSE · 2026-09-25 · Laurent**

Clôture conforme au régime tacite prévu au 24/09 : l'option (b) et D15 s'appliquent.

**Action** — D15 passe « en vigueur ».

---

### Q3 · 2026-09-17 · Quatre écarts dans la documentation — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-17** — écarts corrigés par le Claude de Laurent, PR #9. Aucune réponse attendue.

**Le contexte** — Rituel de début de session. Documents rédigés par le Claude de Sébastien : je ne les corrige pas moi-même.

**Ce que j'ai vérifié**
1. 06-CHANTIERS.md, C1 : « non mergée depuis le 04/09/2026 », alors que JOURNAL.md (PR #3, 16/09) et ETAT.md (« C1 est en production depuis le 16/09 ») la donnent en production.
2. ETAT.md, « Balle chez Sébastien » : demande encore d'ajouter lwainberg à l'équipe Vercel et de créer le jeton de contournement, déclarés faits dans la section « Accès de Laurent » du même fichier (PR #5, #7).
3. CLAUDE.md (section 1) et README.md (rituel, ligne 1) annoncent « sept règles dures » ; CLAUDE.md en contient huit (R1 à R8).
4. README.md : « rachetée en janvier 2026 ». Selon Laurent, la cession date de décembre 2025.

**Les options**
(a) Le Claude de Sébastien corrige les quatre points.
(b) Le Claude de Laurent corrige 1 à 3 (factuels, vérifiables dans le dépôt) ; le point 4 est confirmé par Sébastien.

**Ma recommandation** — (b) : points 1 à 3 sans ambiguïté ; le point 4 porte sur un fait externe au dépôt.

**Ce qui est bloqué** — Rien ; risque de lecture erronée de l'état par les deux Claude.

---
### Q1 · 2026-09-17 · Priorité de C5 (traduction des 30 pages /en) face à la priorité FR/CH — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-17** — tranchée par Laurent dans le cadre du pilotage (D13) : voir D17. Aucune réponse attendue.

**Le contexte** — Cadrage de Laurent du 17/09 : marchés primaires France et Suisse, priorité /fr puis /de-ch, aucun effort sur /en tant que des chantiers FR/CH sont ouverts. /en reste utile pour éviter des 404. D9 (04/09) prévoit la traduction des 30 pages /en, et C5 est en P1, 5e de l'ordre d'attaque.

**Ce que j'ai vérifié** — DECISIONS.md D3 et D9 ; 06-CHANTIERS.md C5 et ordre d'attaque ; ETAT.md du 16/09 (C2, C3, C4, C6 ouverts).

**Les options**
(a) C5 reste en P1 : effort porté hors marché primaire pendant que C2, C3, C4 et C6 sont ouverts.
(b) C5 passe après C1 à C4 et C6 : D9 conservée, seul l'ordre change.
(c) Rouvrir D9 : redirection ou noindex durable de tout ou partie des 30 pages.

**Ma recommandation** — (b). D9 n'est pas contredite et aucun travail n'est perdu. La question (c) mérite d'être posée après la mesure de C1 (France premier pays du trafic /en ; « packshot creator » : /en 1,9 contre /fr 28,9), pas avant.

**Ce qui est bloqué** — Rien. C5 n'est pas démarré.
