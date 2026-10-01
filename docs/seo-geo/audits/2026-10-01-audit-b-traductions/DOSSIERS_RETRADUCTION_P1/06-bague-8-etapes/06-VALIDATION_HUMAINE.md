# Points à valider — famille 67d0561565ef40a9406f1bac (bague en 8 étapes)

Décideurs pressentis : **Sébastien** (copywriting FR, faits commerciaux, produits, prix, conformité distributeur) ; **Laurent** (historique de la société, SEO) ; **les deux** (noms de personnes, témoignages).
Les numéros correspondent aux renvois de `03-ANOMALIES_ANNOTEES.md` et `05-METADONNEES_PROPOSEES.md`. Défaut = ce qui se passe si personne ne tranche.

## Gouvernance

1. **Validation du texte FR client-facing** — *Sébastien*. `04-PROPOSITION_FR.md` est une proposition non publiée (D42 étape 5) ; l'EN se recale ensuite sur le FR validé (D38, D42 étape 7).
   Défaut : rien n'est publié ; le FR (qualité C) et l'EN (qualité D, traduction automatique brute, 7 alt en français) restent en ligne en l'état.

## Produit et appellations

2. **Nom unique du produit : « Alphashot Micro Pro v2 »** — *Sébastien*. Le texte actuel emploie trois noms (« Micro V2 », « Micro Version 2 », « Micro Pro v2 »). La proposition retient celui du catalogue du site (`machines.ts`, id `alphashot-micro-v2`). À noter : le boîtier photographié (image `…075d0`) porte l'inscription « ALPHASHOT MICRO v2 », sans « Pro ».
   Défaut : « Alphashot Micro Pro v2 » partout dans la proposition.

3. **Produit possiblement délisté ou dépassé** — *Sébastien*. L'Alphashot Micro Pro v2 est toujours au catalogue du site (`components/calculators/ROICalculator/lib/machines.ts`, `components/machine-selector/lib/machines.ts`, fiche `/studio-photo/alphashot-micro-v2`) : il n'est pas délisté côté site. Mais les gammes XL et Pro y sont passées en « G2 » alors que la Micro reste en « v2 », l'article parle du « nouveau design » et la fiche produit utilise une vidéo de 2023. À confirmer auprès d'Orbitvu : génération actuellement commercialisée, présence de Brilliance Light et des LED Brilliance, port USB Type-C. Aucun accès web dans cet audit : non vérifié.
   Défaut : l'article reste centré sur la Micro Pro v2, avec un risque d'obsolescence produit.

4. **Graphie « Superfocus » ou « Super Focus »** — *Sébastien*. L'article et les guides du site écrivent « Superfocus » ; le catalogue et la fiche produit « Super Focus ».
   Défaut : « Superfocus » (graphie actuelle de l'article).

## Claims et texte (aucun claim n'a été renforcé ; chacun est conservé ou adouci)

5. **« technologie innovante et unique pour maintenir et photographier une bague avec une facilité déconcertante »** (intro, FR et EN) — *Sébastien*. Contredit par l'étape 3 (pas de système intégré de maintien des bagues). Proposition : « technologie innovante qui rend la prise de vue d'une bague remarquablement simple » ; « unique » et « maintenir » **retirés**.
   Défaut : version prudente de la proposition.

6. **« vous pouvez garantir des résultats exceptionnels »** — *Sébastien*. Proposition : « Vous obtenez des résultats exceptionnels » (« garantir » retiré).
   Défaut : version de la proposition.

7. **« précision inégalée »** — *Sébastien*. Superlatif non démontré. Proposition : « grande précision ».
   Défaut : version de la proposition.

8. **« Comme le confirment nos utilisateurs, l'objectif 100mm macro donne d'excellents résultats »** — *Sébastien et Laurent* (témoignage). Aucun utilisateur ni source cités. Proposition : conservé (« Nos utilisateurs le confirment : … »). Alternative : retirer l'attribution aux utilisateurs.
   Défaut : conservé.

9. **« exclusive / exclusif »** — *Sébastien* (conformité distributeur) : « la fonction exclusive Brilliance Light », « système exclusif d'éclairage cylindrique » (étape 6 et FAQ 3). Conservés.
   Défaut : conservés.

10. **Port USB Type-C, « nouveau design », « transfert de données ultra-rapide », compatibilité avec les hybrides les plus récents** — *Sébastien*. Spécification et nouveauté datées (contenu de mars 2025 au plus tôt). Conservés.
    Défaut : conservés.

11. **« Contrairement à d'autres solutions du marché, l'Alphashot Micro Pro v2 ne dispose pas d'un système intégré de maintien des bagues »** — *Sébastien*. Affirmation comparative sur des concurrents non nommés, défavorable au produit vendu. Conservée.
    Défaut : conservée.

12. **Spécifications de détail** — *Sébastien* : intensité des spots « de 1 à 100 % » ; spots sur « bras articulés » (l'image `…075d3` montre un bras flexible type col-de-cygne) ; portes latérales « amovibles » (étape 6) mais « ajustables » (FAQ 3, rendu « réglables ») ; « bouton de protection pour la sécurité » (rendu « bouton de sécurité ») ; gestion des reflets d'Orbitvu Station.
    Défaut : formulations conservées, incohérence amovibles / réglables maintenue.

13. **Phrase incompréhensible « Il permet également une interaction virtuelle avec votre prospect. »** (étape 6, FR et EN) — *Sébastien*. Sens non établi. Proposition : phrase retirée, bloc `[À VALIDER]` laissé dans `04` avec une reformulation conditionnelle fondée sur les « animations à 360° » de l'introduction.
    Défaut : phrase supprimée. **Le bloc `[À VALIDER]` doit être ôté avant toute conversion en HTML.**

14. **Intertitres FR et EN réécrits** — *Laurent*. Les `id` des H2 sont recalculés depuis le texte, donc les ancres de la table des matières changent ; aucun lien interne du dépôt ne pointe vers ces ancres. En FR, « photographier une bague » n'est plus répété dans les intertitres 2 et 4 (il reste dans le H1, l'intertitre 1 et le corps).
    Défaut : intertitres de la proposition.

15. **« Cela attire l'attention des clients et augmente vos ventes »** (conclusion) — *Sébastien*. Promesse commerciale non sourcée. Proposition : « de quoi retenir l'attention de vos clients et soutenir vos ventes ».
    Défaut : version adoucie.

16. **« notre studio de photographie spécialisé en bijouterie », « notre technologie avancée », « Notre configuration plateau noir et réflecteur noir »** — *Sébastien* (conformité distributeur). Le matériel est d'Orbitvu ; PackshotCreator le distribue. Conservé tel quel.
    Défaut : « notre » conservé.

17. **Capacité « jusqu'à 150 bijoux par jour » (FAQ 1) et « jusqu'à 150 produits par jour » (FAQ 5)** — *Sébastien*. Le catalogue du site, qui alimente le calculateur ROI, annonce 200 produits/jour pour ce modèle (`capaciteJour: 200`). Chiffre conservé à 150 dans la proposition.
    Défaut : l'incohérence entre l'article (repris dans le JSON-LD FAQPage) et le calculateur persiste.

18. **« Combinée à une ouverture optimale (f/16-f/22), cette technologie garantit une netteté irréprochable »** (FAQ 2) — *Sébastien* (avis technique de Laurent bienvenu). En macro, f/16-f/22 expose à la diffraction et le focus stacking sert justement à s'en affranchir. Proposition : plage conservée, « optimale » et « garantit » retirés (« permet d'obtenir »).
    Défaut : version prudente ; la recommandation technique reste publiée.

19. **Préréglages par matériau « (or, diamant, saphir, émeraude, perle, rubis) » qui optimisent automatiquement l'éclairage** (FAQ 3) — *Sébastien*. Fonctionnalité à confirmer auprès d'Orbitvu. Conservée.
    Défaut : conservée.

20. **« paramètres préconfigurés conformes aux exigences des principales plateformes e-commerce », export automatique aux formats requis, intégration directe dans le CMS e-commerce** (FAQ 4 et 5) — *Sébastien*. Conservés.
    Défaut : conservés.

21. **ROI : « automatisation complète », « élimination des coûts de sous-traitance photo »** (FAQ 5) — *Sébastien*. Rendu « suppression des coûts de sous-traitance photo » (même portée) ; le débit (150/jour) n'est plus présenté comme une durée.
    Défaut : version de la proposition.

22. **Recommandation « objectif macro Canon 100 mm »** — *Sébastien*. Produit tiers sans référence exacte ; l'image montre le 100 mm macro à côté d'un zoom marqué « EF » (monture reflex), alors que le paragraphe USB-C met en avant les hybrides : vérifier que la recommandation reste à jour. Conservé.
    Défaut : conservé.

## Images, vidéo, provenance

23. **Image de l'étape 8 : une montre** (marque tierce lisible sur le cadran) dans un article sur les bagues — *Sébastien*. Remplacer par un packshot de bague sur plateau noir, si l'équipe en dispose ? Droits d'usage de l'image à confirmer.
    Défaut : image conservée, alt précisé sans citer la marque.

24. **Image de l'étape 2** : mains gantées installant un plateau sombre, alors que le texte parle du plateau transparent — *Sébastien*.
    Défaut : image conservée, alt décrivant ce qu'elle montre.

25. **Provenance et crédits des 9 images** (dont l'image principale : bague en or à pierre taille trillion bleu-vert) non documentés dans le JSON — *Sébastien*.
    Défaut : aucune mention ajoutée.

26. **Vidéo YouTube `yXhxWyL3vPo`** — *Sébastien*. Disponibilité non vérifiable dans cet audit (pas d'accès web) ; la fiche produit utilise une autre vidéo (`IWcXbWzVEYQ`).
    Défaut : intégration conservée.

## SEO et historique

27. **Auteur : « Laurent Wainberg » à l'import, « PackshotCreator » aujourd'hui** — *Laurent et Sébastien*. Le remplacement vient de `8ae45f63` (12/06/2026), choix délibéré et motivé (cohérence E-E-A-T avec le schema Organization) : ce n'est pas une substitution erronée dans le texte, et aucun nom de personne n'a été remplacé dans le corps. La proposition ne rétablit donc pas l'auteur importé ; elle signale le point.
    Défaut : « PackshotCreator ».

28. **Date affichée 11/04/2023** alors que l'item Webflow a été créé le 11/03/2025 (ObjectId) et que le texte présente le « nouveau design » — *Laurent* (historique de publication).
    Défaut : date inchangée.

29. **Métadonnées EN** (title, h1, metaTitle, description : `05`) orientées « how to photograph rings », « ring photography », « professional jewelry photography » — *Laurent*. L'EN apporte 279 des 365 clics de la famille : c'est le changement le plus sensible du dossier.
    Défaut : métadonnées EN actuelles maintenues (la retraduction du corps peut être publiée indépendamment).

30. **Description FR** (le « cadrage » promis n'est pas traité) — *Laurent* (SEO) et *Sébastien* (texte).
    Défaut : description actuelle maintenue.

31. **Lien EN « jewelry professionals » → `/en/industrie/bijoux-joaillerie`** — *Laurent*. Cible inscrite dans `NOINDEX_EN_INDUSTRIE_SLUGS` (`lib/seo-config.ts`) ; la revue indique qu'elle est servie en français. Cible conservée dans la proposition (consigne : mêmes cibles).
    Défaut : lien conservé vers une page EN non indexée.

32. **Slug EN `8-steps-to-professional-jewelry-photography`** — *Laurent*. Analyse en `05` : conservation recommandée (porte la première requête EN, cible de multiples redirections du Worker et de 3 tests e2e).
    Défaut : conservé, sans risque.

33. **Catégorie « Innovations »** pour un tutoriel produit (« Produits » / « Products » existent) — *Sébastien*. Affichage et filtre de la liste du blog uniquement.
    Défaut : « Innovations ».

## Forme et graphies

34. **Mise en forme** — *Sébastien* : gras ramené de 209 à environ 100 segments par langue ; 17 paragraphes vides Webflow non reproduits ; liste à puces FR en minuscules avec point-virgule.
    Défaut : mise en forme de la proposition.

35. **Graphies retenues** — *Sébastien* : Orbitvu ; Orbitvu Station ; Alphashot Micro Pro v2 ; Brilliance Light ; LED Brilliance (en EN : « LED Brilliance lights ») ; Superfocus (point 4). « PackshotCreator » et « Shotflow » n'apparaissent pas dans le texte de cette famille : aucune graphie à arbitrer pour eux. Aucun nom de personne ni témoignage nominatif dans le corps.
    Défaut : graphies ci-dessus.
