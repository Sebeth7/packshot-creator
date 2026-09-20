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
**Statut** : en vigueur

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
**Statut** : proposée

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
**Statut** : en vigueur, dans les termes révisés par D13

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
**Statut** : en vigueur, tant que durent les 504

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
