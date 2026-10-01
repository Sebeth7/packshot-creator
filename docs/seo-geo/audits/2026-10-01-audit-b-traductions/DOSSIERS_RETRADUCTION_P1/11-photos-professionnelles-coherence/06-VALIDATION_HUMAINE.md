# Validation humaine — famille 67d1ac647fa7de7306d86cee

Points qui exigent une décision avant toute publication. Décideur pressenti selon la consigne : Sébastien pour le copywriting FR, les faits commerciaux, les produits, les prix et la conformité distributeur ; Laurent pour l'historique de la société et le SEO ; les deux pour les noms de personnes et les témoignages.

Le corps ne contient ni témoignage, ni nom de personne, ni prix.

---

1. **Validation du texte FR corrigé** — *Sébastien*
   55 retouches ponctuelles, sans réécriture ; la voix et le plan de l'article sont conservés (`04-PROPOSITION_FR.md`, détail dans 03).
   Si on ne tranche pas : le texte actuel reste servi, avec son H1 tronqué, ses coquilles (« mettre une place », « spéficiquement » dans un intertitre), le marqueur `__wf_reserved_decorative` et une FAQ plus affirmative que le corps. D15 autoriserait la fusion tacite d'une PR de réécriture après cinq jours ouvrés, mais `01-RAYON-ACTION.md` réserve la prose de `content/blog/**` (`content`, `faqs`) à Sébastien : point à arbitrer avant d'invoquer D15 sur ce dossier.

2. **Claims du corps conservés tels quels** — *Sébastien*
   Aucun n'est chiffré ni sourcé dans le texte :
   - « plus économique sur le long terme » et « vous économisez du temps et de l’argent sur le long terme » ;
   - « ces machines prennent bien moins de place dans vos locaux qu’un studio photo traditionnel », alors que l'article cite plus loin le Fashion Studio et le Bike Studio, deux machines de grande taille ;
   - « vous avez tout à y gagner sur le long terme » ;
   - « nous vous recommandons chaudement les studios Orbitvu, à la pointe de la technologie » ;
   - « tout le monde peut utiliser ce type de studio automatisé sans expertise en photographie » ;
   - « réaliser tous les types de média avec aisance : photos fixes, animations à 360 degrés, vidéos » : vrai pour tous les studios Orbitvu ?
   - « Puissant, ce logiciel reste très intuitif ».
   Si on ne tranche pas : ces formulations restent publiées en FR et en EN, sans source.

3. **Claims du corps reformulés plus prudemment** — *Sébastien*
   - « sans avoir à payer de frais supplémentaires » → « sans frais de prestation supplémentaires » (F34) : l'original ignorait les coûts d'exploitation et de maintenance.
   - « Etant donné que le studio fait tout à votre place » → « Comme le studio automatise la prise de vue » (F44, E42).
   Si on ne tranche pas : la proposition garde les formulations prudentes. En cas de refus, rétablir l'original ; l'EN suit.

4. **FAQ : claims supprimés ou ramenés au niveau du corps** — *Sébastien*
   La FAQ alimente le JSON-LD `FAQPage`, donc les extraits repris par les moteurs et les assistants. Changements :
   - FAQ 1 : « Une cohérence visuelle parfaite » et « garantissant une homogénéité parfaite sur l'ensemble de votre catalogue » → « ce qui aide à maintenir l’homogénéité sur l’ensemble de votre catalogue » (F51, E49) ;
   - FAQ 3 : « offre le meilleur compromis entre qualité et productivité » → « offre un bon compromis » ; « tout en garantissant une cohérence parfaite » supprimé. Le corps dit : « Il n’y a pas forcément de solution supérieure aux autres » (F53, E51) ;
   - FAQ 5 : « Chaque studio intègre des fonctionnalités spécifiques optimisées pour son domaine d'application, garantissant des résultats professionnels homogènes » → « Chacun a été développé pour répondre aux besoins de son type de produits, ce qui aide à obtenir des résultats professionnels et homogènes » (F55, E53).
   Si on ne tranche pas : la FAQ servie continue d'affirmer plus que le corps, y compris dans les données structurées.

5. **FAQ 4 : « Le système automatise la capture et la post-production »** — *Sébastien (fait produit)*
   Absent du corps, conservé dans la proposition (F54, E52). À confirmer pour l'ensemble des studios Orbitvu.
   Si on ne tranche pas : la phrase reste. Si elle n'est pas confirmée : la réduire à « Le système automatise la prise de vue ».

6. **Formation : « il suffit de suivre une courte formation pour savoir se servir du studio »** — *Sébastien (conformité Qualiopi)*
   Même promesse en FAQ 3 (« après une courte formation »). Audit de surveillance Qualiopi le 16/10/2026 : `fc6c9c6b` (30/09/2026) pose que le site ne doit rien affirmer qui contredise le catalogue, et qu'aucune formation n'est incluse à l'achat. Ce commit a changé le lien de cette phrase (vers `/fr/academy`), pas la phrase elle-même. Le texte ne dit pas que la formation est incluse ; « il suffit » reste une promesse de prise en main.
   Si on ne tranche pas avant le 16/10/2026 : la phrase reste en ligne, en FR et en EN, au moment de l'audit.

7. **Lien EN vers la page formation en français** — *Laurent (SEO, expérience utilisateur)*
   `/en/academy` redirige vers `/fr/academy` depuis le 30/09/2026 ; la proposition EN garde donc `/fr/academy` (03, R1). Options : (a) lien tel quel ; (b) ancre suivie de « (in French) » ; (c) retrait du lien en EN.
   Si on ne tranche pas : option (a), le lecteur anglophone arrive sans avertissement sur une page en français.

8. **Image du contre-exemple (`67dbae7389928f8e5c7974b2.avif`) : provenance** — *Laurent (historique, auteur de l'article à l'origine) et Sébastien (marque)*
   Grille de 18 chaussures sur fonds gris clair et gris foncé, sans crédit ni source ; sa provenance n'est documentée nulle part dans le dépôt. L'alt actuel l'attribuait à un studio Orbitvu ; l'alt proposé est neutre (F09).
   Si on ne tranche pas : l'image reste, avec un alt corrigé, et la question des droits reste ouverte.

9. **Image principale en français sur la page EN** — *Sébastien (visuels)*
   `67dbae7489928f8e5c79753c.avif` porte le texte incrusté « LE GUIDE COMPLET DE LA PHOTOGRAPHIE PACKSHOT 5 » ; elle sert aussi d'`og:image` sur la page EN (E04). Options : visuel EN dédié, ou image sans texte pour les deux langues.
   Si on ne tranche pas : partages et aperçus de la page EN en français ; l'alt EN (le H1 anglais) ne correspond pas au texte de l'image.

10. **Auteur : « Laurent Wainberg » à l'import, « PackshotCreator » aujourd'hui** — *Laurent et Sébastien*
    Changé par `8ae45f63` (12/06/2026, Sébastien, « auteur générique PackshotCreator sur les articles migrés, cohérence E-E-A-T avec le schema Organization »). Ce remplacement est un choix délibéré sur un champ de métadonnées, pas une substitution erronée dans le corps comme dans les familles interview et comparatif : la proposition garde donc « PackshotCreator ». À trancher : rétablir le nom de l'auteur d'origine (signal E-E-A-T d'un auteur identifié, qui a dirigé la société) ou garder l'auteur organisationnel.
    Si on ne tranche pas : « PackshotCreator » reste affiché, et le JSON-LD renvoie à l'`Organization`.

11. **Format du H1 et harmonisation de la série** — *Laurent (SEO)*
    Proposition : « Guide de la photographie packshot, 5 : des photos produits professionnelles et homogènes » / « Packshot photography guide, 5: consistent, professional product photos ». Les volets 2, 3 et 4 ont le même H1 tronqué ; le volet 1 a déjà été retitré. Choisir un format unique (« , 5 : » ou « (5/5) : ») pour les volets 2 à 5, en cohérence avec le dossier 05 (matériel), traité en parallèle.
    Si on ne tranche pas : chaque dossier propose son propre format et la série devient disparate.

12. **`metaTitle` FR : avec ou sans « professionnelles »** — *Laurent (SEO) et Sébastien (ton)*
    Option A, retenue : « Photographie de produits : obtenir des photos homogènes » (55). Option B : « Photographie de produits : des photos pro et homogènes » (54), registre plus familier. « Professionnelles » ne figure dans aucune des requêtes principales ; il reste dans le slug, le `title` et le H1.
    Si on ne tranche pas : option A.

13. **Adaptations SEO de l'EN absentes du FR** — *Laurent*
    « Packshot photography » ajouté dans le H2 de la seconde partie et dans le H2 Orbitvu ; « packshot photographer » dans le H3 de la solution 2 ; « homogeneity » remplacé partout par « consistency » (05).
    Si on ne tranche pas : la proposition s'applique. En cas de refus, traduire littéralement les intertitres FR.

14. **Calendrier de la retraduction EN** — *Laurent*
    D17 donne la priorité aux chantiers FR/CH ; D38 et D42 (étape 7) imposent de traduire depuis le FR validé. L'EN, de qualité D (traduction automatique segmentée, alts en français), porte pourtant 33 des 49 clics annuels de la famille.
    Si on ne tranche pas : l'EN actuel reste servi jusqu'à la validation du FR et à l'inscription de l'EN au calendrier.

15. **Slugs** — *Laurent*
    Recommandation : conserver les deux slugs, sans redirection (analyse dans 05).
    Si on ne tranche pas : statu quo, conforme à la recommandation.

16. **Relation commerciale avec Orbitvu** — *Sébastien (conformité distributeur)*
    L'article « recommande chaudement » les studios Orbitvu sans dire que PackshotCreator les distribue. Aucune phrase n'a été ajoutée. Faut-il une mention ?
    Si on ne tranche pas : texte inchangé sur ce point.

17. **Lien externe `https://orbitvu.com/software/orbitvu-station/`** — *Laurent ou Sébastien*
    Non vérifié (pas d'accès web pendant l'audit). À ouvrir dans Chrome avant publication.
    Si on ne tranche pas : risque de lien externe mort ou redirigé dans un article republié.

18. **Maillage hors périmètre** — *Laurent*
    Le volet 3 EN pointe vers cet article avec une ancre qui annonce le volet 4 (« choose the media that best suits your needs… ») : à corriger dans la famille du volet 3 (05, fin).
    Si on ne tranche pas : le lien entrant reste trompeur pour le lecteur et pour les moteurs.
