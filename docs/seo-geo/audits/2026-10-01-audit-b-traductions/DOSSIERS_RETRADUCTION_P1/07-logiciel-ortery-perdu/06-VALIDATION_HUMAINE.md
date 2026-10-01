# Points à valider par un humain — famille 681a1a294d5ce94156610507

Décideurs pressentis, selon la consigne du dossier : **Sébastien** pour le copywriting FR, les faits commerciaux, les produits, les prix et la conformité distributeur ; **Laurent** pour l'historique de la société et le SEO ; **les deux** pour les noms de personnes et les témoignages. Plusieurs faits datent de la période où Laurent dirigeait PackshotCreator (partenariat Ortery, fin du support) : il est le mieux placé pour les confirmer, Sébastien décide de leur formulation publique.

**Règle commune si rien n'est tranché.** Aucune version n'est publiée sans validation (D42, arbitrage 1 ; D42 figure sur la branche `claude/vibrant-dijkstra-8g0ae5`, pas encore sur `main` au 01/10/2026). Le texte actuel reste en ligne, y compris le corps EN traduit automatiquement (« instant disposal of funds », « relocation », « Automaton ») sur la langue qui porte le plus de trafic (181 clics sur 365 jours). Une réécriture peut être fusionnée par validation tacite après cinq jours ouvrés (D15), **sauf** ce qui engage l'entreprise vis-à-vis d'un tiers : les points 2, 5, 6, 7, 8 et 15, qui concernent Ortery ou une offre commerciale, exigent une validation explicite de Sébastien. Si la proposition est publiée sans décision sur un point particulier, c'est la version par défaut indiquée ci-dessous qui s'applique.

---

1. **Marqueurs temporels « en 2025 » et « informations à jour »** — Décideur : Sébastien (copywriting).
   Le chapeau (« Cependant, en 2025, nombreux sont les utilisateurs… ») et la FAQ 4 (« En 2025, Orbitvu permet… ») datent l'article ; « voici les informations à jour » engage sur leur fraîcheur.
   Par défaut : « Depuis la fin du support, cependant, de nombreux utilisateurs nous contactent… », « Orbitvu permet aujourd'hui… », « voici ce qu'il faut savoir ». À confirmer : les demandes d'anciens clients continuent-elles en 2026 (l'article « Migrer » parle d'appels « chaque semaine », sur une autre question) ?
   Sans décision : la page reste datée de mai 2025 dans son texte même.

2. **« Distributeur exclusif d'Ortery » sur la zone EMEA** — Décideurs : Laurent (vérité historique) et Sébastien (D6, conformité distributeur).
   D6 proscrit « exclusif » de toute revendication de distribution, dans toutes les langues ; le commit `74dff0ce` l'a laissé ici volontairement au titre d'« ancien partenariat Ortery ». Deux options : (a) « le distributeur d'Ortery sur la zone EMEA », conforme à D6, **retenue par défaut** ; (b) rétablir « exclusif » si Laurent confirme l'exclusivité historique et si Sébastien juge que D6 ne vise pas un partenariat terminé. Dans ce cas, préciser l'exception dans `DECISIONS.md` pour éviter qu'un futur contrôle D6 ne la retire.
   Sans décision : le texte en ligne garde « exclusif » (et la coquille « en sur »), en écart avec la lettre de D6.

3. **Bornes « entre 2003 et 2024 » et « pendant plus de 20 ans »** — Décideur : Laurent (historique).
   Le site se contredit : « Créée en 2003, la société Sysnext » (interview), mais « Depuis 2004 », « (2004-2024) » et `foundingDate` 2004 ailleurs (`messages/fr.json`, `SchemaOrg.tsx`) ; D33 fixe la création de PackshotCreator/Sysnext à 2001. L'article « Migrer » reprend « entre 2003 et 2020 ».
   Par défaut : conservé (2003). Sans décision : la contradiction entre pages persiste ; elle ne bloque pas ce dossier.

4. **Ortery « pionnière de la photographie automatisée depuis 2001 »** — Décideur : Laurent (historique).
   `messages/fr.json` (comparatif Orbitvu, Ortery, Styleshoots) écrit « Fondé en 2002 à PanChiao (Taiwan) ».
   Par défaut : conservé (2001). Sans décision : deux dates de fondation d'un tiers coexistent sur le site.

5. **Compatibilité des logiciels Ortery avec Windows 11** — Décideur : Sébastien (affirmation sur un tiers), éclairage technique de Laurent.
   Le corps disait « Les solutions Ortery présentent une compatibilité limitée avec Windows 11 » ; la FAQ 1 dit « Oui, les logiciels Ortery les plus récents sont compatibles avec Windows 11 », et l'EN renforce en « fully compatible ».
   Par défaut : le corps vise « les anciennes versions des logiciels Ortery livrées avec les studios PackshotCreator » (sens du contexte, cohérent avec la FAQ et l'article « Migrer ») ; la FAQ 1 commence par « Cela dépend de la version. » au lieu de « Oui, », garde l'affirmation sur les versions récentes et se termine par « Pour vérifier votre configuration, adressez-vous à Ortery. » ; « fully » disparaît de l'EN. Ni la compatibilité des versions récentes ni les bornes 2003-2020 ne sont sourcées dans le texte.
   Sans décision : la contradiction corps/FAQ reste en ligne, et l'EN affirme une compatibilité totale au nom d'un tiers.

6. **« Dans ces cas, une remise en fonctionnement est rarement possible »** — Décideur : Sébastien (affirmation défavorable à un tiers).
   En tension avec la FAQ 2, qui invite à tenter la remise en service auprès d'Ortery.
   Par défaut : « une remise en service n'est pas toujours possible : elle suppose que votre matériel soit encore pris en charge et que votre configuration […] soit compatible », conditions reprises de la FAQ 2. Si Sébastien dispose d'éléments établissant que c'est « rarement » possible, la formule d'origine peut revenir.
   Sans décision : affirmation non sourcée sur la capacité d'un tiers à servir ses clients.

7. **Coordonnées d'Ortery** — Décideur : Sébastien (relation avec un tiers) ; Laurent peut confirmer en tant qu'ancien partenaire.
   « Ortery Technologies B.V., Cypresbaan 45 BG, 2908 LT Capelle aan den IJssel », « +31 64121-8909 », lien `https://ortery.eu/contact-ortery-technologies-inc/` : rien n'a pu être vérifié (pas d'accès web). La proposition ne change que la graphie (« IJssel », « 2908 LT », « (Rotterdam) ») et le groupement des chiffres du téléphone (« +31 6 4121 8909 », mêmes chiffres). À vérifier dans Chrome : l'adresse, le numéro (un mobile néerlandais pour le contact d'une société), le lien.
   Sans décision : des coordonnées peut-être périmées restent la seule issue proposée aux anciens clients.

8. **Fin du support et rôle d'Ortery** — Décideurs : Laurent (fait historique) et Sébastien (engagement public).
   « PackshotCreator ne distribue plus les logiciels Ortery » ; « le support PackshotCreator […] a officiellement pris fin le 31 décembre 2024 » ; « Ortery est aujourd'hui votre seul interlocuteur pour : télécharger un logiciel PackshotCreator ou PackshotSpin, réactiver une licence, obtenir une assistance technique ». L'article « Migrer » reprend la date. Les affirmations sur ce qu'Ortery fournit (téléchargement et licences de logiciels vendus sous la marque PackshotCreator) engagent un tiers et ne sont pas sourcées.
   Par défaut : conservées. Sans décision : elles restent publiées telles quelles ; si Ortery ne fournit plus ces logiciels, les anciens clients sont renvoyés vers une impasse.

9. **Noms des anciens produits et graphies retenues** — Décideur : Laurent (historique des gammes).
   « PackshotOne », « R3 Mark II », « Spin O3T » (lettre O ou chiffre zéro ?), « PackshotSpin » : à confirmer. Graphies uniques retenues dans la proposition : **PackshotCreator** (en un mot ; « PackshoTone » et « packshotcreator » corrigés en EN), **Orbitvu**, **Orbitvu Station**, **Alphashot Pro G2** (au lieu de « Alphashot PRO G2 »), **Alphashot XL Pro** (au lieu de « XL PRO »), **macOS**, **Ortery Technologies**. **Shotflow** n'apparaît pas dans cette famille.
   Sans décision : graphies par défaut ci-dessus ; un nom de modèle erroné gênerait l'identification du matériel à l'étape 1.

10. **« Depuis 2023 », distributeur officiel d'Orbitvu** — Décideur : Sébastien (conformité distributeur).
    Date non sourcée dans le texte. En anglais, « the official distributor » se lit comme « le seul distributeur » ; la proposition EN écrit « as an official distributor », conforme à D6 (« Personne n'est exclusif sur la Suisse »). Le texte n'indique pas de territoire ; l'article « Migrer » précise « en France et en Suisse » : pas d'ajout ici.
    Sans décision : formulations par défaut ; la version EN actuelle reste ambiguë.

11. **« 74 lampes pilotables séparément »** — Décideur : Sébastien (produit).
    Présenté comme un avantage de toutes les solutions Orbitvu ; le chiffre est celui de l'Alphashot Pro G2 (titre de la vidéo, `messages/en.json`, article « Migrer ») et contredit les « 170 panneaux LED » de l'Alphashot XL G2.
    Par défaut : « (Alphashot Pro G2) » ajouté après le chiffre. Sans décision : le chiffre reste généralisé à toute la gamme.

12. **Promesses de compatibilité et de fonctions Orbitvu** — Décideur : Sébastien (produit).
    « Compatibilité complète avec Mac et PC, PIM, DAM, marketplaces et sites e-commerce » ; « prise en charge complète de Windows 11 et de macOS » ; « Export e-commerce en un clic vers les principales plateformes » ; « suppression instantanée du fond » ; « Assistant photo IA intégré » (l'article « Migrer » situe l'assistant d'éclairage IA sur l'Alphashot Pro G2) ; « plus rapides, plus intuitives ». Aucune source dans le texte ; l'article « Migrer » confirme Windows 10 et 11 et macOS pour Orbitvu Station.
    Par défaut : conservées, non renforcées. Sans décision : promesses absolues non sourcées, contraires à l'exigence de D42 (« Pas de promesses non sourcées »).

13. **« Des milliers d'entreprises »** — Décideur : Sébastien.
    Non chiffré dans le texte ; cohérent avec « 5 000+ entreprises équipées » de `messages/fr.json`, lui-même non sourcé ici.
    Par défaut : conservé. Sans décision : claim publié tel quel.

14. **« Facteur de trois à cinq » (FAQ 4)** — Décideur : Sébastien.
    « Dans la majorité des cas, le temps de production est réduit d'un facteur de trois à cinq » : gain chiffré sans source.
    Par défaut : « Selon les cas, le temps de production peut être divisé par trois à cinq » (chiffre conservé, modalité atténuée), « En 2025 » retiré. Options : sourcer le chiffre, ou le supprimer. Sans décision : promesse chiffrée non sourcée maintenue, en FR comme en EN.

15. **Offre de reprise (FAQ 5)** — Décideur : Sébastien (offre commerciale, validation explicite au titre de D15).
    Le texte promet « un diagnostic gratuit, une évaluation de reprise de votre matériel, une remise commerciale sur un nouveau studio Orbitvu » et « un accompagnement complet incluant démonstration, formation et intégration ». L'article « Migrer » (25/09/2026) parle d'une reprise estimée « au cas par cas, après un diagnostic gratuit », d'une formation « facturée séparément » et choisie par le client, et ne mentionne pas de remise. L'EN actuel dit « a commercial offer », qui n'est pas une remise.
    Par défaut : diagnostic gratuit, évaluation de reprise et remise conservés ; l'accompagnement est détaché de ce que « comprend » l'offre (« Nous vous accompagnons ensuite tout au long du projet : démonstration, formation et intégration ») ; l'EN dit « a discount », fidèle au FR. Si la remise n'existe plus, la retirer des deux langues ; question « mise à jour » devenue « mise à niveau ».
    Sans décision : deux articles du site décrivent l'offre différemment, et l'EN décrit une troisième variante.

16. **« Transition rapide, sans interruption d'activité »** — Décideur : Sébastien.
    Cohérent avec l'article « Migrer » (« La production ne s'arrête à aucun moment ») ; promesse non sourcée.
    Par défaut : conservée. Sans décision : publiée telle quelle.

17. **Date affichée et dateModified** — Décideurs : Laurent (SEO) et Sébastien.
    Date « 2025-05-06 », dateModified absent. Proposition : renseigner dateModified à la publication de la version validée, date d'origine conservée.
    Sans décision : la page corrigée paraît inchangée depuis mai 2025.

18. **Auteur : « PackshotCreator » ou « Laurent Wainberg »** — Décideurs : Laurent et Sébastien (nom de personne).
    L'import Webflow portait « Laurent Wainberg » ; le commit `8ae45f63` (Sébastien, 12/06/2026) l'a remplacé par « PackshotCreator » sur l'ensemble des articles migrés (cohérence E-E-A-T avec le schema Organization). Le remplacement est délibéré et ne touche que le champ auteur : aucun nom remplacé dans le corps. Le texte parle au nom de l'entreprise (« nous », « notre équipe »).
    Par défaut : « PackshotCreator » conservé. Sans décision : statu quo.

19. **Texte alternatif nommant le Photosimile 200** — Décideur : Sébastien (copywriting).
    L'alt décrit l'image réelle (étiquette signalétique d'un Photosimile 200 d'Ortery Technologies), examinée après conversion AVIF vers PNG. Le modèle n'est pas cité dans le texte de l'article : confirmer qu'on peut le nommer, ou se contenter de « Étiquette signalétique d'un appareil Ortery Technologies indiquant le modèle et le numéro de série ».
    Sans décision : alt proposé appliqué ; l'actuel `__wf_reserved_inherit` est en tout cas à remplacer.

20. **Métadonnées et intertitres SEO** — Décideur : Laurent (SEO).
    FR : metaTitle « Logiciel PackshotCreator ou Ortery perdu : que faire ? », description de 149 caractères, intertitre « Compatibilité avec Windows 11 : des limites importantes ». EN : h1 « Recover your PackshotCreator or Ortery software », metaTitle « Lost PackshotCreator or Ortery software? Where to get it », description avec « download ». Les descriptions retirent la promesse de « résoudre » / « fix » les problèmes de compatibilité Windows 11, que l'article ne tient pas. Requête EN la plus cliquée : « packshot creator software download » (12 clics, position 1,7), à surveiller après publication.
    Sans décision : metaTitle tronqués (84 et 81 caractères) et descriptions trop longues maintenus.

21. **Chantier C13 noté « clos » à tort** — Décideur : Laurent (documentation).
    `docs/seo-geo/06-CHANTIERS.md` : « C13 · Coquille dans l'article Ortery — clos […] Clos le 19/09 : traité par la PR « accents et champs marchands » ». La coquille « en sur la zone EMEA » est toujours dans `content/blog/fr/logiciel-packshotcreator-ortery-perdu-solution.json` sur `main` (`17fc0b3`), et aucune branche ne la retire (`git log --all -S`).
    Sans décision : le tableau des chantiers affirme corrigé un défaut toujours en ligne.

22. **Anciennes URL redirigées vers cette page** — Décideur : Laurent (SEO).
    Le Worker redirige ici près de vingt anciennes URL d'aide et de logiciel, dont certaines traitent de sujets que l'article n'aborde pas : éditions Mac (« packshot-creator-mac-lion-edition », « packshotcreator-and-mac-monterey »), Dropbox, réglages de l'appareil photo, liste des appareils compatibles. Rien n'a été ajouté, faute de source dans le texte ; décider si ces redirections restent pertinentes ou si un paragraphe sur les anciennes éditions Mac mérite d'être rédigé à partir d'une source.
    Sans décision : statu quo ; ces visiteurs arrivent sur une page qui ne répond qu'en partie à leur question.

23. **Cohérence de la version EN avec l'article « Migrate »** — Décideur : Laurent (cohérence EN).
    La proposition suit l'usage américain du dépôt (« December 31, 2024 », « color », « license ») ; l'article natif voisin « migrate-legacy-packshotcreator-studio » est en anglais britannique (« 31 December 2024 », « jewellery », « colour »). Le voisin n'est pas modifié ici (PR #77 en cours sur un autre paragraphe).
    Sans décision : les deux articles liés entre eux affichent deux conventions d'anglais.
