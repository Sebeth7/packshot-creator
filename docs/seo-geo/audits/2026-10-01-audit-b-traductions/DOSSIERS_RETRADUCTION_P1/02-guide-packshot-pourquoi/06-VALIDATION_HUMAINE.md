# 06 — Points à valider par un humain — famille 67d154e9a53d05fd8c219b8c

Rôles (consigne du dossier) : **Sébastien** — copywriting FR, faits commerciaux, produits, prix, conformité distributeur ; **Laurent** — historique de la société, SEO ; **les deux** — noms de personnes, témoignages.

Contexte : article le plus visible du corpus (requête EN « packshot » 23 903 impressions, FR « packshot » 5 082 ; 804 clics sur 365 jours pour la famille). Toute republication touche la page qui porte ces requêtes : publier les trois langues ensemble (D38), noter la date et relever la GSC avant / après.

Règle générale si rien n'est tranché : **rien n'est publié**, le texte actuel reste en ligne avec ses défauts (EN illisible par endroits, `alt` réservés, DPI erroné, nom de l'auteur d'origine effacé). Les marqueurs `[À VALIDER]` des propositions interdisent une publication partielle sans décision sur les points concernés.

---

1. **Attribution de l'article — ligne de crédit et auteur** · décideurs : **Laurent + Sébastien**
   - Constat : `0a65c654` et `37da2e28` (02/05/2026, Sébastien) écrivaient « Article publié à l'origine par **Laurent Wainberg** en janvier 2024 » ; `8ae45f63` (12/06/2026, « auteur générique PackshotCreator sur les articles migrés ») a remplacé ce nom par « PackshotCreator » dans les trois langues (le de-ch, créé le 27/06, a hérité de la version modifiée). L'import Webflow (`56d4bc32`) avait Laurent Wainberg pour auteur ; le champ `author` est Sébastien Jourdan depuis `0a65c654`.
   - Proposition : rétablir « Laurent Wainberg » dans la ligne de crédit (FR, EN, de-ch), garder `author` = Sébastien Jourdan.
   - À trancher : nom rétabli, marque « PackshotCreator », ou autre formule ; cohérence avec la doctrine E-E-A-T invoquée par `8ae45f63` (schema `Organization`).
   - Si on ne tranche pas : la ligne actuelle (« PackshotCreator ») reste ; la proposition ne peut pas être publiée telle quelle sur cette ligne.

2. **Validation du texte FR client-facing** · décideur : **Sébastien** (D42 étape 5)
   - Retouches proposées sur sa version du 02/05/2026 : phrase sur le meuble déplacée après la liste des usages (FR-13), accords et calques corrigés, reformulations de fluidité, intertitre h3 « Se démarquer de la concurrence en faisant bonne impression » (au lieu de « …de vos concurrents… »).
   - Si on ne tranche pas : ni l'EN ni le de-ch ne peuvent être recalés (D38 : la traduction part du FR validé).

3. **Section « Origine et terminologie officielle du packshot » (Journal officiel)** · décideurs : **Laurent** (SEO, section ajoutée pour le référencement) **+ Sébastien** (texte FR)
   - Constat : « officiellement reconnu en France », « décret de 1983, complété en 2000 », « terminologie officielle de la photographie publicitaire de produit » : aucune source ; contredit la FAQ du même article (« Années 1980-1990 : … exclusivement un terme de production vidéo publicitaire »). [Inférence non vérifiée, aucun accès web dans ce dossier : la terminologie officielle française publie en principe des équivalents français à préférer aux termes étrangers ; le terme pourrait y figurer comme terme étranger, ce qui serait l'inverse d'une « reconnaissance ».]
   - Proposition : formulation prudente sans « reconnu » ni « décret », cohérente avec la FAQ, marquée `[À VALIDER]`, dans les trois langues ; l'EN actuel, qui étendait le fait aux « French-speaking markets », est ramené à « In France ».
   - À trancher : vérifier au Journal officiel ou sur FranceTerme (nature du texte, date, complément de 2000, statut du terme) puis réécrire avec la source citée, **ou** supprimer la section (le `h2` disparaît : à arbitrer avec l'objectif SEO de `a8a3d3f6`).
   - Si on ne tranche pas : la proposition ne peut pas être publiée avec ce paragraphe ; le texte actuel, probablement inexact, reste en ligne.

4. **« Au Québec, on parle plutôt de « photo d'emballage » »** · décideurs : **Laurent + Sébastien**
   - Constat : usage terminologique non sourcé ; le de-ch actuel l'a traduit par «Verpackungsfoto», comme si l'on parlait allemand au Québec.
   - Proposition : conservé en FR ; en EN et en de-ch, terme français conservé et glosé (« "photo d'emballage" ("packaging photo") », «photo d'emballage» («Verpackungsfoto»)).
   - Si on ne tranche pas : la phrase reste marquée `[À VALIDER]` ; à supprimer si aucune source n'est trouvée.

5. **Éléments propres à la version EN** · décideur : **Laurent** (SEO EN)
   - Conservés dans la proposition EN, bien qu'absents du FR, parce qu'ils portent des requêtes fortes : phrase sur l'origine publicitaire du terme, phrase sur la graphie « pack shot » (requêtes « pack shot » 6 022 et « pack shots » 2 597 impressions), FAQ « What does packshot mean? » et `h2` « Packshot meaning & official terminology » (« packshot meaning » : 5 769 impressions, position 3,8).
   - À valider en plus : la phrase « In the UK, the IAB (Interactive Advertising Bureau) and broadcast standards bodies have codified packshot requirements for digital advertising », affirmation non sourcée sur des organismes nommés (conservée, `[À VALIDER]`).
   - Option : ajouter au FR (requête « packshot def », 850 impressions, position 5,3) et au de-ch une FAQ « Que signifie packshot ? » construite sur les faits déjà présents (origine publicitaire, définition) — non faite ici, la consigne imposant la structure actuelle.
   - Si on ne tranche pas : l'EN garde 8 FAQ et le FR et le de-ch 7 (statu quo) ; la phrase IAB reste en attente.

6. **Lien EN « professional studio » → `/en/studios-photo-automatises`** · décideur : **Laurent** (maillage)
   - Constat : lien propre à l'EN ; l'ancre désigne un studio photo traditionnel, la cible est la page commerciale des studios automatisés ; absent en FR et en de-ch.
   - Proposition : ancre et cible conservées.
   - Si on ne tranche pas : le lien reste.

7. **Chiffres et promesses de la section « Packshot automatisé »** · décideur : **Sébastien** (faits commerciaux, produits, conformité distributeur)
   - « 200 à 500 packshots par jour » (opérateur sans formation avancée) : conservé, à sourcer.
   - « Le ROI typique se situe entre 6 et 12 mois pour les entreprises produisant plus de 500 visuels par an » : terminologie corrigée (« le retour sur investissement intervient… ») ; délai et seuil conservés, à sourcer ; [inférence de la revue] un seuil de 500 visuels **par an** paraît incohérent avec 200 à 500 packshots **par jour** : faute de frappe possible (par jour ? par mois ?), à confirmer.
   - « réduction du coût par image de l'ordre de 60 à 80 % » : conservé, à sourcer.
   - « la seule réponse rentable » : ramené à « une réponse rentable » (exclusivité retirée, à confirmer).
   - « fond blanc parfait sans retouche » : ramené à « fond blanc obtenu sans retouche » (« parfait » retiré, à confirmer).
   - Précédent : D37 et D38 ont retiré de la landing F5 des claims de même nature (« 500+ produits/jour », « -80 % », « ROI 4-8 mois »).
   - Si on ne tranche pas : les chiffres restent marqués `[À VALIDER]` et la section ne peut pas être publiée en l'état ; le texte actuel, aux mêmes chiffres, reste en ligne.

8. **FAQ « Qui a inventé le concept du studio packshot ? »** · décideurs : **Laurent** (historique de la société) **+ Sébastien**
   - Constat : revendication d'invention du studio packshot automatisé, du « premier système intégré » et d'un impact sur « des milliers d'entreprises », sans source, présente dès l'import Webflow ; le corps présente aujourd'hui PackshotCreator comme distributeur des systèmes Orbitvu.
   - Proposition : « PackshotCreator est à l'origine du concept de studio packshot automatisé » (« révolutionné le domaine » retiré ; invention, « premier système » et « milliers » conservés) ; de-ch « teilweise automatisiert » au lieu de « weitgehend » (renforcement corrigé).
   - Si on ne tranche pas : la FAQ, reprise aussi dans le JSON-LD `FAQPage`, reste en l'état.

9. **« en quelques secondes » (FAQ « Peut-on faire des packshots sans photographe professionnel ? »)** · décideur : **Sébastien** (produits)
   - Délai non sourcé, conservé. L'EN actuel renforçait le claim (« with no photography expertise required ») : la proposition rétablit la nuance du FR (« without advanced photography skills »).
   - Si on ne tranche pas : formulation conservée, marquée `[À VALIDER]`.

10. **Bio de l'auteur** · décideurs : **Sébastien** (bio) **+ Laurent** (lien)
    - « photographe spécialisé en photographie packshot depuis plus de 20 ans » : ancienneté déclarative, conservée (à confirmer ; D33 fixe la création de la société à 2001).
    - Ancre « blendai.studio » (nom de domaine) pointant vers la page interne `/<langue>/ia-photo-produit` : conservée ; un lecteur peut s'attendre à quitter le site.
    - de-ch « Geschäftsführer » pour « directeur » : conservé.
    - Si on ne tranche pas : bio inchangée.

11. **FAQ « caractéristiques techniques d'un packshot professionnel »** · décideur : **Sébastien** (métier)
    - Correction technique proposée dans les trois langues : la valeur DPI d'un fichier n'agit ni à l'écran ni au zoom ; « au moins 300 pixels par pouce à la taille d'impression finale » pour l'imprimé, « seule la définition en pixels » à l'écran.
    - Troncature : la réponse annonce « les spécifications essentielles » et n'en donne qu'une. Proposition : « La première est la résolution. » À trancher : compléter par d'autres critères (à rédiger par Sébastien, rien n'est inventé ici) ou garder ce seul critère.
    - Seuils « 2 000 pixels minimum, idéalement 3 000 à 4 000 » : présentés comme une norme générale, conservés (C11).
    - Si on ne tranche pas : l'erreur DPI reste en ligne, y compris dans le JSON-LD `FAQPage`.

12. **FAQ « Quelle est l'origine du terme packshot ? »** · décideurs : **Laurent + Sébastien**
    - Chronologie (années 1980-1990, fin des années 1990, années 2000, années 2010-2020) sans source ; conservée, emphase retirée (« exemple fascinant »). Elle doit rester cohérente avec la décision du point 3.
    - Si on ne tranche pas : conservée telle que proposée.

13. **Affirmations SEO du corps** · décideur : **Laurent** (SEO)
    - « les photographies sont indispensables au référencement naturel », « des photographies de produits de qualité peuvent influencer considérablement ce classement », « de mauvaises photographies packshot peuvent entraîner une baisse de votre positionnement » : conservées (formulées avec « peuvent »). Seul « indexées et référencées de la même manière que les pages web classiques » est nuancé en « indexées et apparaître dans les résultats, au même titre que les pages web ».
    - Si on ne tranche pas : formulations proposées conservées.

14. **« vous évitez les retours » → « vous limitez les retours »** · décideur : **Sébastien**
    - Atténuation d'une promesse absolue, dans les trois langues (FR-39, EN-45, DE-19).
    - Si on ne tranche pas : retour à « évitez » possible sans autre impact.

15. **Métadonnées : `metaTitle` raccourcis et `description` sans millésime** · décideur : **Laurent** (SEO)
    - FR 74 → 58 caractères, EN 79 → 51 (« Packshot: Meaning, Types & Product Photography Tips »), de-ch 70 → 54 ; marque retirée des `metaTitle` (variantes avec marque fournies dans `05`) ; « Guide complet 2026 » et équivalents retirés. `title` et `h1` inchangés.
    - Risque : article en position 7,3 (EN) et 9,9 (FR) sur « packshot » ; un changement de `<title>` peut faire bouger le classement dans un sens ou dans l'autre. Relevé GSC avant / après recommandé.
    - Si on ne tranche pas : `metaTitle` tronqués et millésime « 2026 » qui se périme le 01/01/2027.

16. **Textes alternatifs (11 images × 3 langues)** · décideur : **Laurent** (SEO) ; **Sébastien** pour la provenance de l'image 4
    - Rédigés après examen visuel des fichiers ; les marques visibles sur les produits ne sont pas nommées. L'image 4 (`…628cb6`) est une maquette à l'en-tête « ORBITVU.COM » : provenance et droits d'usage à confirmer (aucun crédit dans le texte).
    - Si on ne tranche pas : les 4 `alt` « __wf_reserved_inherit » et les `alt` français en EN et en de-ch restent.

17. **Image principale `…accd.avif`** · décideurs : **Sébastien** (visuel) **+ Laurent**
    - Texte français incrusté « LE GUIDE COMPLET DE LA PHOTOGRAPHIE PACKSHOT 1 » : servi tel quel en EN et en de-ch ; la numérotation « 1 » a été retirée des titres le 02/05/2026. Son `alt` est le `h1` (gabarit).
    - À trancher : garder, ou produire des déclinaisons EN et de-ch sans numéro.
    - Si on ne tranche pas : l'image actuelle reste dans les trois langues.

18. **Liens de-ch vers des articles français** · décideur : **Laurent** (maillage, cohérence de-ch)
    - Ancres allemandes vers `/fr/guide/comment-faire-focus-stacking-pour-photographier-bracelet`, `/fr/blog/materiel-photo-guide-photographie-packshot`, `/fr/blog/choix-media-guide-de-la-photographie-packshot-4`, `/fr/blog/comment-avoir-des-photos-professionnelles-guide-packshot-produit` : aucune version de-ch n'existe (`alternates.json`). Cibles conservées dans la proposition.
    - Options : garder `/fr/` (en signalant la langue au lecteur, par exemple « (auf Französisch) »), pointer vers `/en/`, ou attendre des versions de-ch (D5 interdit de créer de nouveaux articles : à articuler).
    - Si on ne tranche pas : les liens vers le français restent.

19. **Section terminologique dans la version de-ch** · décideur : **Laurent**
    - Elle parle du Journal officiel français et du Québec : sans erreur de périmètre (rien n'y est présenté comme applicable en Suisse, D38), mais d'un intérêt faible pour un lectorat suisse alémanique. À garder par parité avec le FR, ou à retirer du seul de-ch.
    - Si on ne tranche pas : conservée, sous réserve du point 3.

20. **Graphies retenues** · décideur : **Sébastien** (confirmation)
    - « PackshotCreator » en un mot (le JSON ne contient pas la forme balisée « Packshot<em>Creator</em> »), « PackshotCreator – Sysnext » avec tiret demi-cadratin, « Orbitvu ». Alphashot et Shotflow n'apparaissent pas dans cette famille. Les systèmes Orbitvu sont dits « distribués par PackshotCreator », sans « exclusif » (D6).
    - Si on ne tranche pas : graphies du texte actuel, inchangées.

21. **Image `…ac9b` dans « La netteté avant tout »** · décideur : **Sébastien**
    - Elle montre un seul embout net et les autres flous (faible profondeur de champ), alors que le texte demande de « bannir tout flou » et recommande le focus stacking. Choix d'illustration à confirmer ou à remplacer (même emplacement).
    - Si on ne tranche pas : image conservée, `alt` descriptif.

22. **FAQ redondantes** · décideur : **Laurent** (SEO)
    - FAQ 2 (packshot, lifestyle et nature morte) et FAQ 6 (packshot et lifestyle) se recoupent ; la seconde a été ajoutée par `a8a3d3f6` pour le référencement. Conservées toutes deux.
    - Si on ne tranche pas : statu quo.

23. **Intertitres modifiés en EN et en de-ch** · décideur : **Laurent** (SEO EN et de-ch)
    - EN (`h3` sauf mention) : « Definition of a packshot photograph » → « Packshot definition » ; « Where can you find packshot photographs? » → « Where are packshot photographs used? » ; « Product photography in still life » → « Still life product photography » ; « Internet, a new era that changes everything for the presentation of your products » → « The internet: a new era that changes everything for product presentation » ; « Stand out from your competitors by making a good impression » → « Stand out from the competition by making a good impression » ; « A key element for the natural referencing of your e-commerce site » → « A key element for your e-commerce site's SEO » ; « A faithful representation » → « An accurate representation » ; « Without distraction » → « No distractions » ; `h2` « Automated packshot: the modern solution for e-commerce teams » → « Automated packshots: the solution for e-commerce businesses » (suit le FR, « modern » absent du FR). Les `h2` « What is packshot photography? », « Packshot meaning & official terminology » et « Packshot photography, lifestyle photography or still life photography? … » sont conservés mot pour mot.
    - de-ch (`h3`) : « Definition einer Packshot-Fotografie » → « Definition der Packshot-Fotografie » ; « Internet, eine neue Ära, … » → « Das Internet: eine neue Ära, die die Präsentation Ihrer Produkte grundlegend verändert » ; « Sich von der Konkurrenz abheben durch einen guten ersten Eindruck » → « Sich mit einem guten ersten Eindruck von der Konkurrenz abheben » ; « Schärfe vor allem » → « Schärfe hat Vorrang ».
    - FR : un seul `h3` modifié, « Se démarquer de vos concurrents… » → « Se démarquer de la concurrence… » (validation Sébastien, point 2).
    - Les ancres du sommaire dépendent des intertitres : aucun fichier du dépôt ne pointe vers une ancre de ces trois URL (recherche du 01/10/2026) ; les liens externes vers des ancres ne sont pas connus.
    - Si on ne tranche pas : reprendre les intertitres actuels, sans autre impact.

---

Témoignages : **aucun** dans les trois versions (D31 respecté en de-ch). Prix et devises : **aucun** (D30). Aucune PR ouverte ne modifie cette famille (consigne du 01/10/2026).
