# Points à valider — interview du fondateur (famille `67e2ad276291f90c1cf0dc8b`)

Décideurs pressentis, selon les consignes du dossier : **Sébastien** pour le copywriting FR, les faits commerciaux, les produits, les prix et la conformité distributeur ; **Laurent** pour l'historique de la société et le SEO ; **les deux** pour les noms de personnes et les témoignages.

Particularité de ce dossier : le sujet de l'interview, Laurent Wainberg, est aussi l'ancien propriétaire de la société et le mandant du chantier SEO/GEO. Tout point qui touche à son nom ou à son rôle demande donc l'accord explicite de Sébastien, propriétaire actuel, et pas seulement celui de Laurent.

Aucun prix, aucune devise ni aucun témoignage client ne figure dans l'article. Il n'existe pas de version de-ch (`alternates.json` : FR et EN seulement).

---

1. **Rétablir le nom « Laurent Wainberg » aux huit endroits modifiés par `8ae45f63`, dans chaque langue** — title, h1, metaTitle, description, « rappelle », « souligne », ancre GNPP, FAQ 1 (FR-01, 02, 04, 05, 12, 24, 28, 31 ; EN-01, 02, 03, 04, 16, 31, 41, 44).
   - Décideurs : **les deux** (nom de personne) ; accord explicite de Sébastien requis.
   - Constat : le message du commit ne vise que le champ auteur (« Remplace l'auteur hérité de Webflow par PackshotCreator ») ; le remplacement dans le texte est un effet de bord. La proposition rétablit la version importée.
   - Si l'effacement du nom était voulu (choix postérieur à la cession, par exemple), l'article n'a plus d'objet en tant qu'interview. Il faut alors le réécrire en histoire de la société, sans citations attribuées, ou le retirer. Un retrait d'URL portant des liens entrants relève de la validation explicite de Sébastien ; il faudrait aussi une redirection et la mise à jour du Worker et d'`alternates.json`.
   - Si on ne tranche pas : le `<title>` « PackshotCreator, fondateur de PackshotCreator – Interview » reste servi dans les résultats de recherche en FR et en EN, deux citations à la première personne restent attribuées à une marque, et le JSON-LD `FAQPage` continue d'affirmer qu'une marque a fondé Sysnext.

2. **Champ `author` : « PackshotCreator » conservé** (FR-07, EN-05).
   - Décideur : **Sébastien**, qui a choisi l'auteur générique (`8ae45f63`, cohérence E-E-A-T avec le schéma `Organization`) ; avis de Laurent.
   - Constat : la proposition ne touche pas ce champ. Une fois le nom rétabli, la signature « PackshotCreator » reste cohérente : la marque publie l'interview de son fondateur. Le JSON-LD `Article` déclare alors un auteur de type `Organization` (`components/seo/SchemaOrg.tsx`, ligne 231). Repasser l'auteur à « Laurent Wainberg » produirait un auteur de type `Person` : c'est une autre décision.
   - Si on ne tranche pas : statu quo, sans défaut bloquant.

3. **Date de création : « Créée en 2003 » remplacé par « Créée en 2001 [D33] »** (FR-09, EN-07).
   - Décideur : **Laurent** (historique), en application de D33.
   - Constat : D33 (25/09/2026) fixe la création en 2001. Le reste du site est aussi à aligner, hors de ce dossier : `foundingDate` 2004 (`components/seo/SchemaOrg.tsx`, ligne 72), « Depuis 2004 » et « 20 Ans d'Innovation (2004-2024) » sur la page À propos (`messages/fr.json`).
   - Si on ne tranche pas : la contradiction avec D33 reste servie, et la note `[D33]` doit être retirée avant publication.

4. **FAQ 1, « dès 2003 » : conservé, contrairement à la consigne reçue** (FR-32, EN-44).
   - Décideur : **Laurent** (historique).
   - Constat (R7) : la consigne du dossier demandait d'aligner aussi ce « 2003 » sur D33. Or cette date porte ici sur le premier système livré, pas sur la création de Sysnext. D33 ne fixe que la date de création. Le rapport maître (`PSC_RAPPORT_MAITRE_CONSOLIDE_INTEGRAL_2026-09-26.md`, ligne 2938) relève que « D33 (2001) ne contredit pas une livraison dès 2003 », et l'article `logiciel-packshotcreator-ortery-perdu-solution` parle de studios fournis « entre 2003 et 2024 ». Écrire 2001 affirmerait une date de lancement qu'aucune source n'établit.
   - Options : (a) garder 2003 pour le premier système (proposition) ; (b) écrire 2001 si le premier système a bien été lancé dès la création ; (c) retirer l'année.
   - Si on ne tranche pas : option (a) par défaut ; retirer la note `[D33 : …]` avant publication.

5. **Graphie unique « PackshotCreator », en romain** (FR-10, EN-11, EN-19, EN-23).
   - Décideur : **Sébastien** (voix de la marque).
   - Constat : l'article écrit `Packshot<em>Creator</em>` (7 occurrences en FR, 5 en EN), style de l'ancien logo, à côté de « PackshotCreator » en romain. S'y ajoutent une occurrence à l'italique coupé (`Packshot<em>Creato</em>r`) dans chaque langue et deux noms coupés par la traduction automatique en EN. Les autres noms propres sont correctement écrits : Orbitvu, Alphashot Pro G2, Sysnext, GNPP. Shotflow n'apparaît pas dans l'article.
   - Si on ne tranche pas : on peut garder l'italique d'origine sur les occurrences régulières, mais l'italique coupé et les deux coupures EN doivent être corrigés dans tous les cas.

6. **« Dix ans après ses débuts », « plus de 35 pays », « près de 8 000 entreprises équipées » : faits mis au passé, chiffres inchangés** (FR-11, EN-09).
   - Décideur : **Laurent** (historique).
   - Constat : aucune source dans le texte ; l'interview GNPP du 17/09/2012, liée en fin d'article, en est la source probable (non vérifiée, pas d'accès web). La revue note qu'une autre page du site annonce « plus de 20.000 utilisateurs dans 35 pays » (famille `670e28fe822e237fb9d638e4`). Options : confirmer, dater (« en 2012 », si c'est bien la date), ou retirer.
   - Si on ne tranche pas : les chiffres restent publiés, au passé, ce qui est moins risqué que le présent actuel.

7. **Chiffre d'affaires 2011 de 4 millions d'euros, en hausse de 11 %, puis +20 % l'année suivante** (FR-21, EN-27).
   - Décideurs : **Laurent** (exactitude historique) et **Sébastien** (opportunité de publier des données financières de la société qu'il détient).
   - Constat : aucune source dans le texte ; seule la formulation a changé (« en hausse de 11 % » au lieu de « en croissance de +11 % »).
   - Si on ne tranche pas : chiffres publiés tels qu'ils le sont depuis Webflow.

8. **Antériorité : « Qui a inventé le concept de packshot automatisé ? » et « le premier système de photographie automatisée … en Europe »** (FR-33, EN-44).
   - Décideurs : **Laurent** (historique) et **Sébastien** (claim commercial ; l'article Ortery est le sien).
   - Constat : claim conservé sans source. Il est contredit en partie par une autre page du site : « Tous les logiciels fournis avec les studios PackshotCreator entre 2003 et 2024 ont été développés par Ortery Technologies, […] pionnière de la photographie automatisée depuis 2001 » (`content/blog/fr/logiciel-packshotcreator-ortery-perdu-solution.json`). La réponse dit « introduit en Europe », la question dit « inventé ». Formulation prudente possible, si elle est retenue : question « Qui a introduit le packshot automatisé en Europe ? » et réponse « l'un des premiers systèmes ».
   - Si on ne tranche pas : le site garde deux récits concurrents, PackshotCreator inventeur et Ortery pionnière, que les moteurs et assistants IA liront tous les deux.

9. **« Premier acteur à structurer le marché européen » (FAQ 4), « rôle pédagogique fort, en formant de nombreux utilisateurs » (FAQ 4) et « pionnier » (ancienne description)** (FR-05, FR-37, EN-04, EN-48).
   - Décideurs : **Laurent** (historique) et **Sébastien** (claim).
   - Constat : superlatif conservé tel quel dans la FAQ. « Pionnier » ne figure plus dans la description proposée, qui gagne « Sysnext » à la place : c'est un allègement de claim, à accepter ou refuser. « De nombreux utilisateurs » reprend l'adoucissement de Sébastien du 30/09 (`fc6c9c6b` ; l'import disait « des milliers »). Formulation prudente possible pour la FAQ : « l'un des premiers acteurs ».
   - Si on ne tranche pas : superlatif publié tel quel ; description sans « pionnier ».

10. **« Le terme "Packshot" est même devenu un générique utilisé dans l'industrie, ce qui témoigne de l'impact de la marque » : lien de causalité retiré** (FR-36, EN-46).
    - Décideurs : **Sébastien** (copywriting), après avis de **Laurent** (historique).
    - Constat : la proposition garde « Le terme « packshot » s'est d'ailleurs imposé dans tout le secteur » et retire « ce qui témoigne de l'impact de la marque ». Cette causalité n'a pas de source, et la marque est bâtie sur ce mot. Options : (a) proposition ; (b) rétablir la phrase actuelle ; (c) supprimer toute la phrase.
    - Si on ne tranche pas : option (a) ; retirer la note `[À VALIDER]` avant publication.

11. **« le développement de solutions comme l'Alphashot Pro G2 » remplacé par « des solutions comme l'Alphashot Pro G2 »** (FR-27, EN-39).
    - Décideur : **Sébastien** (produits, conformité distributeur).
    - Constat : l'Alphashot Pro G2 est un studio Orbitvu ; la tournure actuelle prête à PackshotCreator le développement d'un produit du fabricant. Autre formulation possible : « et la distribution de solutions comme… ».
    - Si on ne tranche pas : le texte servi continue d'attribuer à PackshotCreator le développement d'un produit Orbitvu.

12. **FAQ 5, Orbitvu** (FR-39, FR-40, FR-41, EN-50).
    - Décideur : **Sébastien** (faits commerciaux, conformité distributeur).
    - Points conservés sans source : Orbitvu « a émergé dans les années 2010 » (à vérifier) ; PackshotCreator distributeur officiel « en 2023 » ; périmètre « en France et dans plusieurs pays francophones », alors que d'autres pages disent « France et Suisse » (relevé de la revue) ; nouvelles solutions « plus performantes, plus fiables » que l'ancienne gamme (comparatif implicite).
    - Point corrigé : « le distributeur officiel » devient « distributeur officiel » (« an official Orbitvu distributor » en EN), parce que l'article défini suggère un distributeur unique (D6 : officiel, jamais exclusif).
    - Si on ne tranche pas : claims publiés tels quels ; si l'article défini est rétabli, l'exclusivité implicite revient.

13. **Intertitre « Une croissance soutenue et une reconnaissance internationale »** (FR-20).
    - Décideurs : **Sébastien** (copywriting) et **Laurent** (historique).
    - Constat : la section n'étaye aucune reconnaissance internationale. Intertitre conservé ; variante possible : « Une croissance soutenue ».
    - Si on ne tranche pas : intertitre conservé.

14. **Retouches de langue et de style du FR** — FR-03, 13, 14, 15, 16, 17, 21, 22, 23, 25, 26, 30, 34, 35, 38, 39, 41 (« L'e-commerce », « maîtrise en interne », « commerce numérique », « visuels de qualité », « Quand les délais… » au lieu de « Dans un monde où… », etc.).
    - Décideur : **Sébastien** (copywriting FR client-facing, D42 étape 5).
    - Si on ne tranche pas : le FR n'est pas publiable au sens de D42, et l'EN, qui en dépend (D38, D42 étape 7), ne peut pas être finalisé.

15. **Date de publication 2017-10-04, sans `dateModified`** (FR-08, EN-06).
    - Décideur : **Laurent** (SEO).
    - Constat : l'article cite des faits de 2023 et l'Alphashot Pro G2 ; l'item Webflow date du 25/03/2025 (inférence). Recommandation : renseigner `dateModified` à la date de republication corrigée, qui est un fait. Ne pas modifier `date` sans connaître la vraie date de rédaction.
    - Si on ne tranche pas : la page continue d'afficher « 4 octobre 2017 » au-dessus de faits de 2023.

16. **Texte alternatif de l'image principale (`/images/blog/67e2a882c6b1faecf8a7d34d.avif`)**.
    - Décideurs : **les deux** (personnes représentées) et **Laurent** (SEO).
    - Constat : le gabarit impose le H1 comme texte alternatif (`app/[lang]/blog/[slug]/page.tsx`, ligne 206). La photo montre trois personnes sur un stand PackshotCreator de salon professionnel. Ce dossier n'identifie personne ; l'alt corrigé « Laurent Wainberg, fondateur de PackshotCreator – interview » laisse entendre qu'il figure sur la photo. Un alt dédié exige une modification du gabarit commun à tous les articles (rayon large, R8).
    - Si on ne tranche pas : alt = H1 corrigé, acceptable mais imprécis.

17. **Texte alternatif de l'image du corps : « … dont une table de prise de vue Orbitvu Alphadesk »** (FR-19, EN-26).
    - Décideur : **Sébastien** (produits).
    - Constat : l'alt a été rédigé après examen de l'image ; « ALPHADESK » et le logo Orbitvu sont lisibles sur la table. Le lieu du showroom n'est pas nommé (D1).
    - Si on ne tranche pas : utiliser la variante sans nom de produit, « Espace de démonstration réunissant plusieurs studios photo automatisés » (« Demo space with several automated photo studios »).

18. **EN : langue de l'interview GNPP**.
    - Décideur : **Laurent** (il connaît l'interview).
    - Constat : le slug de l'URL (`interview-laurent-wainberg-de-packshotcreator`) suggère un texte français ; non vérifié, faute d'accès web. Si c'est le cas, ajouter « (in French) » après le lien, comme pour la formation.
    - Si on ne tranche pas : lien publié sans la mention ; retirer la note `[À VALIDER]`.

19. **Paragraphe formation repris tel quel** (« formations aux studios photo Orbitvu… », lien `/fr/academy`).
    - Décideur : **Sébastien** (confirmation seulement).
    - Constat : réécrit le 30/09/2026 (`fc6c9c6b`) pour s'aligner sur le catalogue Qualiopi avant l'audit du 16/10/2026. La version importée (« Depuis 2016 … maroquinerie, bouteilles de vin… ») n'est pas rétablie.
    - Si on ne tranche pas : rien ne change. Ne pas réintroduire l'ancienne version.

20. **Catégorie « Actualités » / « News » pour un portrait historique**.
    - Décideur : **Laurent** (SEO).
    - Si on ne tranche pas : catégorie inchangée, sans conséquence bloquante.

21. **Slug FR conservé malgré « dirigeant » (devenu inexact) et le préfixe « decryptages-interviewe- »** (FR-06 ; analyse dans 05).
    - Décideur : **Laurent** (SEO).
    - Recommandation : conserver.
    - Si on ne tranche pas : slug conservé, sans impact.

22. **Même effet de bord ailleurs sur le site (hors périmètre de ce dossier)**.
    - Décideurs : **les deux** (nom de personne).
    - Famille `67e13c063cd0299737798aa4` (« Automatiser la création… ») : signature de citation « — PackshotCreator, fondateur et dirigeant de PackshotCreator » (FR) et « — PackshotCreator, founder and director of PackshotCreator » (EN), introduite par le commit `4dde4f23` du 12/06/2026.
    - Article EN `series-e-commerce-ebooks-shooting-products` : lien vers cette interview avec l'ancre « Her complete interview » (pronom erroné).
    - Si on ne tranche pas : la décision prise au point 1 s'appliquera de façon incohérente d'une page à l'autre.

23. **Ordre de mise en ligne**.
    - Décideur : **Laurent** (SEO, processus D42).
    - Recommandation : FR validé, puis EN recalé, puis publication simultanée des deux langues. Les pages FR et EN sont liées par hreflang : publier le nom dans une seule langue ferait coexister « Laurent Wainberg » et « PackshotCreator, fondateur de PackshotCreator » sur la même paire.
    - Si on ne tranche pas : risque de publier une seule langue.

---

## Récapitulatif des claims (tous conservés ou adoucis, aucun renforcé)

| Claim | Traitement dans la proposition | Point |
|---|---|---|
| Sysnext créée en 2003 | 2001 [D33] | 3 |
| Premier système en Europe dès 2003 ; « inventé » | conservé, 2003 marqué [D33] | 4, 8 |
| 35 pays, près de 8 000 entreprises, « dix ans après » | conservé, mis au passé | 6 |
| CA 2011 : 4 M€, +11 %, puis +20 % | conservé | 7 |
| « Reconnaissance internationale » (intertitre) | conservé | 13 |
| « Pionnier » (description) | retiré de la description | 9 |
| Premier acteur à structurer le marché européen | conservé | 9 |
| Rôle pédagogique, « de nombreux utilisateurs » | conservé (version du 30/09) | 9 |
| « Packshot » devenu générique grâce à la marque | causalité retirée | 10 |
| Développement de l'Alphashot Pro G2 | adouci (« des solutions comme ») | 11 |
| Orbitvu apparue dans les années 2010 | conservé | 12 |
| Distributeur officiel depuis 2023, France et pays francophones | conservé, article défini retiré (D6) | 12 |
| Solutions Orbitvu plus performantes et plus fiables | conservé | 12 |
