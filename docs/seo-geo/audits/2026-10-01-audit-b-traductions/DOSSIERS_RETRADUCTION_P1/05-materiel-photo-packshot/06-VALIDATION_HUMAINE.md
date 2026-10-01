# Points à valider — famille 67d16fc7ca69ff54d95f3dae

Décideurs pressentis : **Sébastien** (copywriting FR, faits commerciaux, produits, prix, conformité distributeur) ; **Laurent** (historique de la société, SEO) ; **les deux** (noms de personnes, témoignages). Par défaut, si un point n'est pas tranché, rien n'est publié de plus que ce que la colonne « Sans décision » indique : aucune affirmation n'est renforcée.

## Publication et gouvernance

1. **Validation du texte FR corrigé** (`04-PROPOSITION_FR.md`, anomalies FR-01 à FR-T2). Décideur : **Sébastien** (D42 étape 5 ; `01-RAYON-ACTION.md`). Sans décision : le FR actuel reste en ligne (qualité B : lisible, fautes mineures, deux alts Webflow inexploitables) et l'EN ne peut pas être recalé (D38, D42 étape 7).

2. **H1 complété par le sujet** (FR et EN : le H1 devient identique au `title`). Effet induit : l'alt de l'image principale, alimenté par le H1, change aussi. Écart avec la convention des volets 3, 4 et 5, dont les H1 restent « Le guide complet de la photographie packshot, N ». Décideur : **Laurent** (SEO ; éventuellement aligner les volets 3 à 5 dans un second temps). Sans décision : H1 actuel conservé, le reste de la proposition reste applicable.

3. **Arbitrage D17 pour la retraduction EN.** D17 gèle l'effort `/en` tant que des chantiers FR/CH sont ouverts (`06-CHANTIERS.md`, C5). La version EN actuelle est une traduction automatique non relue (qualité D) qui génère 83 clics par an et 936 impressions sur 90 jours. Décideur : **Laurent** (auteur de D17), en accord avec Sébastien pour le calendrier. Sans décision : `04-PROPOSITION_EN.md` reste en réserve, l'EN actuel reste en ligne.

4. **Numérotation de série EN « Part 2 »** au lieu de « , 2: » (`title` et `h1`). Les volets 3 à 5 EN gardent aujourd'hui « , 3: », « , 4: », « , 5: ». Décideur : **Laurent**. Sans décision : garder « The Complete Guide to Packshot Photography, 2: Photo Equipment and What You Need to Know ».

5. **metaTitle et description FR et EN** (`05-METADONNEES_PROPOSEES.md`). FR : retouche minimale du metaTitle (casse, 62 → 59 caractères) qui garde la structure positionnée sur « materiel pour packshot » (position 2,5) ; nouvelle description de 145 caractères. EN : metaTitle réécrit avec « Packshot Photography Equipment » en tête ; description de 155 caractères. Décideur : **Laurent** (SEO). Sans décision : valeurs actuelles conservées.

## Faits techniques et affirmations non sourcées (toutes conservées, aucune renforcée)

6. **Dimensions des capteurs.** Actuel : « le plein format (35 mm de largeur) et l'APS-C (24 mm de largeur) ». Le capteur plein format mesure 36 × 24 mm ; « 35 mm » désigne le format de film. Proposé : « environ 35 mm » / « environ 24 mm » avec note `[À VALIDER]`, et passage à « 36 mm » si confirmé (FR et EN). Décideur : **Sébastien**. Sans décision : la formulation « environ 35 mm » est publiée (approximation défendable) et la note entre crochets est retirée.

7. **Recommandation de l'APS-C** « qui offre une plus grande profondeur de champ, et donc un produit plus net » : affirmation simplifiée, vraie à cadrage et ouverture comparables. Décideur : **Sébastien** (conserver, nuancer ou retirer). Sans décision : conservée telle quelle.

8. **« Les appareils photo reflex (DSLR) sont largement considérés comme la référence en photographie packshot »** (actuel : « la norme de facto ») : affirmation datée (article de janvier 2024) au regard de la place prise par les hybrides. Décideur : **Sébastien**. Sans décision : conservée.

9. **« Il pourrait être tentant de s'en tenir au smartphone, mais sa qualité d'image est trop limitée »** : affirmation absolue non étayée. Décideur : **Sébastien**. Sans décision : conservée.

10. **Lumière blanche neutre de 5 500 K** et effets attribués à une lumière trop froide ou trop chaude : valeur prescriptive non sourcée. Décideur : **Sébastien**. Sans décision : conservée.

11. **Promesses sur les studios automatisés** (faits commerciaux, conformité distributeur Orbitvu). Décideur : **Sébastien**. Sans décision : toutes conservées à la force actuelle.
    - a) « comme ceux que nous commercialisons » et « nos studios automatisés » : statut de vendeur, à vérifier au regard de la qualification de distributeur.
    - b) Studios « bien plus compacts qu'un studio photo traditionnel ».
    - c) Enregistrement des positions et réglages réutilisables « en un clic » ; « cette étape devient alors un jeu d'enfant » (actuel : « rendant cette étape totalement triviale », même force).
    - d) « Enregistrez tous vos réglages et positions en quelques clics » ; « logiciel intuitif et facile à utiliser » ; qualité « constante et cohérente, quelle que soit la période de l'année ».
    - e) « économiser beaucoup de temps et de travail manuel », « réduire les erreurs et les coûts », « augmenter votre productivité tout en vous garantissant une qualité d'image supérieure » (aucun chiffre ni source ; la version EN actuelle disait « ensuring », la proposition EN rétablit « guaranteeing », équivalent du FR).
    - f) Vues à 360 degrés, vidéos et animations « bien souvent » possibles.
    - g) Focus stacking « réalisé automatiquement » avec un studio automatisé.
    - h) EN actuel « to ensure that each shot is the same as the last » renforçait le FR « semblable » : la proposition EN revient à « similar ».

12. **Chiffres et recommandations de la FAQ** : vue à 360° de 24 à 72 images ; minimum de 5 à 7 photos pour l'e-commerce ; macro de 85 à 105 mm « idéal… avec une précision exceptionnelle » ; 50 mm f/1,8 ou f/1,4 ; zoom 24-70 mm. Aucun n'est sourcé. Décideur : **Sébastien**. Sans décision : conservés (la FAQ est aussi diffusée dans le JSON-LD FAQPage).

## Noms de personnes et visuels

13. **Champ `author`.** Import Webflow : « Laurent Wainberg » ; actuel : « PackshotCreator », remplacé par le commit `8ae45f63` du 12/06/2026 (« auteur générique PackshotCreator sur les articles migrés… cohérence E-E-A-T avec le schema Organization »). Le nom n'apparaît ni dans le corps ni dans les titres : ce n'est pas un remplacement fautif du type relevé dans `8ae45f63` / `4dde4f23` sur d'autres familles, mais un choix éditorial délibéré. La proposition ne rétablit donc pas le nom. Décideurs : **Laurent et Sébastien** (nom de personne ; Laurent, ancien dirigeant, est l'auteur d'origine). Sans décision : « PackshotCreator » reste affiché.

14. **Image principale avec texte français sur la page EN** (`/images/blog/67dbae71507d67953210f224.avif`, texte incrusté « LE GUIDE COMPLET DE LA PHOTOGRAPHIE PACKSHOT 2 »). Décideur : **Sébastien** (production d'une déclinaison EN, ou d'un visuel sans texte commun aux deux langues). Sans décision : la page EN garde un visuel en français (EN-05).

15. **Ancres de liens internes modifiées** (cibles inchangées) : « skincare et des cosmétiques » → « cosmétiques et des soins de la peau » ; « secteur du high-tech… » → « secteurs du high-tech… » ; ancres des volets 3 et 5 resserrées ; EN : « Skincare and cosmetics » → « skincare and cosmetics », « high-tech, household appliances and computer sector » → « high-tech, household appliance, and computing sectors ». Ces liens viennent du maillage (`ed5dc135`, rapport Laurent V4 ; `1ebb469c` pour l'EN). Décideur : **Laurent** (maillage). Sans décision : remettre les ancres actuelles mot pour mot, le reste de la phrase corrigée restant valable.

16. **`dateModified` à la republication.** Aucun `dateModified` aujourd'hui (article daté du 31/01/2024). Décideur : **Laurent** (signal de fraîcheur, cohérence avec les autres articles corrigés). Sans décision : champ laissé vide.

17. **Textes alternatifs à vérifier sur l'image.**
    - Schéma `/images/blog/67d15a1ea67d40a54ffcc411.avif` : l'icône non légendée en bas du schéma est interprétée comme l'appareil photo.
    - Comparaison `/images/blog/67dbae71507d67953210f1b0.avif` : l'attribution des deux moitiés (smartphone à gauche, Orbitvu à droite) est déduite de l'ordre de la légende et de la qualité visible ; risque faible.

    Décideur : **Sébastien** (ou la personne qui dispose des visuels sources). Sans décision : pour le schéma, retirer « et appareil photo face au produit » (FR) / « and the camera facing the product » (EN) ; pour la comparaison, l'alt proposé est conservé.

18. **Cohérence des visuels avec le texte** (facultatif) : le schéma d'installation est légendé en anglais sur la page FR ; l'illustration de « La netteté » montre un produit sur fond noir, alors que l'article déconseille le fond gris ou noir. Décideur : **Sébastien**. Sans décision : visuels conservés, sans conséquence sur le texte.

## Pour information (aucune décision requise)

- **Graphie des marques.** Seule marque citée dans le texte : **Orbitvu** (légende, alts), graphie unique et correcte ; le logiciel est nommé « Orbitvu Station » (repris de l'alt actuel). « PackshotCreator » n'apparaît que dans le champ `author`, en un mot. « Alphashot » est visible dans une capture d'écran mais n'est pas cité ; « Shotflow » est absent. Les marques de produits tiers visibles sur les images (flacon cosmétique, appareil compact, lunettes) ne sont pas nommées dans les alts.
- **Slugs** conservés dans les deux langues ; aucun problème relevé (`05`, dernière section).
- **Témoignages, prix, devises** : aucun dans la famille. Pas de version de-ch.
