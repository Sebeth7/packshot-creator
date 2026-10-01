# Points à valider — famille 67d05174a21e0a8b35feb47e

Décideurs pressentis : **Sébastien** (copywriting FR, faits commerciaux, produits, prix, conformité distributeur) ; **Laurent** (historique de la société, SEO) ; **les deux** (noms de personnes, témoignages). Par défaut, ce qui n'est pas tranché reste dans l'état de la proposition indiqué à chaque point.

Priorité : points 1 à 4 avant toute publication ; points 5 à 10 avec la relecture du FR ; points 11 à 17 facultatifs ou hors texte.

---

### 1. Appellation « Hyperfocus » ou « SuperFocus » — Sébastien (produit), avis de Laurent (historique)

- Constat : l'article nomme la fonction « Hyperfocus » dans la description, le résumé (puce 3) et la FAQ (Q4), jamais dans le corps, qui parle de focus stacking. Le reste du dépôt dit « SuperFocus » ou « Super Focus » : `content/blog/fr/focus-sur-lhyperfocus.json` (« intégrée nativement sous le nom de SuperFocus »), `components/machine-selector/lib/machines.ts` l. 51, `components/calculators/ROICalculator/lib/machines.ts`, `data/secteurs.ts`, `messages/fr.json`. Cet article dit « SuperFocus » dès l'import Webflow (`56d4bc32`), mais son slug `focus-sur-lhyperfocus` et l'alt d'une de ses images (« Résultat hyperfocus sur une montre ») laissent penser qu'« Hyperfocus » a été un nom en usage ; seul Laurent peut dire s'il s'agit d'un ancien nom (PackshotCreator ou Orbitvu) ou d'une erreur.
- Proposition : nom **conservé** partout (consigne : ne pas trancher). Seule retouche : la puce 3 rattache Hyperfocus au focus stacking (« un focus stacking avancé »), comme le fait déjà la FAQ Q4.
- À décider : garder « Hyperfocus », passer à « SuperFocus » (description, puce 3, Q4 et R4, FR et EN), ou écrire « SuperFocus (anciennement Hyperfocus) » si l'historique le justifie.
- Sans décision : « Hyperfocus » reste publié, en contradiction avec le reste du site.

### 2. Nom du modèle : « Alphashot Micro V2 », « Alphashot Micro » ou « Alphashot Micro Pro v2 » — Sébastien

- Constat : le corps et la FAQ Q4 disent « Alphashot Micro V2 » (lien vers `/fr/studio-photo/alphashot-micro-v2`) ; la citation et les FAQ Q2 et Q5 disent « Alphashot Micro » ; le référentiel du dépôt dit « Alphashot Micro Pro v2 » (`messages/fr.json` l. 1429, `messages/en.json` l. 1426, `components/machine-selector/lib/machines.ts` l. 32).
- Proposition : appellations **conservées** telles quelles (R7). Dans la citation, « Alphashot Micro » reste de toute façon : ce sont les mots du client.
- Graphies retenues dans la proposition : Orbitvu, Alphashot, PackshotCreator (suffixe des metaTitle), Gad & Co. Shotflow n'apparaît pas dans cet article.
- Sans décision : trois appellations coexistent pour le même studio.

### 3. Spécifications non sourcées de la FAQ Q4 — Sébastien

- Extraits (FR, EN identiques sur le fond) : « jusqu'à 200 images à différents plans focaux » ; « incréments micrométriques (aussi précis que 10 microns) » ; « algorithmes propriétaires qui analysent la topographie tridimensionnelle du bijou et calculent automatiquement les séquences optimales de mise au point ».
- Constat : aucune source dans le texte ni dans le dépôt. Le seul « 200 » du référentiel est `capaciteJour: 200` (capacité journalière, `components/machine-selector/lib/machines.ts` l. 34). `content/blog/fr/focus-sur-lhyperfocus.json` (FAQ) indique qu'un empilement efficace « se compose de 6 à 20 prises de vues » : pas une contradiction stricte (6 à 20 n'est pas un maximum), mais un écart d'ordre de grandeur visible pour un lecteur des deux articles.
- Proposition : chiffres et affirmation **conservés**, tournure corrigée, marqueur `[À VALIDER]` dans les deux propositions.
- Phrase de repli, sans chiffres ni affirmation invérifiable, tirée du texte actuel :
  - FR : « Contrairement au focus stacking traditionnel, elle automatise la séquence de mises au point. L’Alphashot Micro V2 capture une série d’images sur des plans focaux différents, puis les fusionne en conservant les informations de profondeur. »
  - EN : “Unlike traditional focus stacking, it automates the focus sequence. The Alphashot Micro V2 captures a series of images at different focal planes, then merges them while preserving depth information.”
- À décider : sourcer les chiffres dans la documentation Orbitvu (fiche ou manuel), ou adopter la phrase de repli.
- Sans décision : les chiffres restent publiés sans source, dans la FAQ balisée `FAQPage` (données structurées reprises par les moteurs et les assistants).

### 4. Témoignage de Benzi Gad (Gad & Co) — les deux

- Extraits : FR « Aujourd’hui, nous réalisons facilement plus de 100 photos par jour […] Le retour sur investissement depuis l’acquisition de l’Alphashot Micro est absolument exceptionnel. » ; EN “we easily take more than 100 photos per day […] has been absolutely exceptional.”
- À vérifier : fidélité de la citation à la vidéo `https://www.youtube.com/embed/c-U75lcjtTY` (mot pour mot en EN, traduction en FR) ; orthographe du nom et fonction (« responsable marketing » / *marketing manager*) ; autorisation de reprise ; lien `https://gaddiamonds.com/home/` (non vérifié, aucun accès web).
- Proposition : citation **conservée mot pour mot** dans les deux langues (apostrophes FR harmonisées seulement). L'EN n'est pas retraduit depuis le FR : il est probablement le plus proche de l'original (inférence de la revue, non prouvée). La traduction FR répète « efficace / efficacement » ; si l'original anglais est confirmé, une traduction FR plus fidèle et plus fluide pourra être proposée.
- Sans décision : citation publiée telle qu'aujourd'hui.

### 5. FAQ Q2 : « plus de 100 photos par jour » — Sébastien

- Constat : l'actuel présente le chiffre d'un seul client comme une capacité générale (« il est possible de réaliser plus de 100 photos par jour »), la source n'arrivant qu'en fin de phrase.
- Proposition : chiffre conservé, attribué d'emblée au témoignage (« D’après le témoignage de Gad & Co cité dans cet article, … »).
- Sans décision : retour à la formulation actuelle.

### 6. Absolus et superlatifs atténués — Sébastien

Aucun n'est sourcé. Atténuations retenues (FR → EN) :

| Actuel FR | Proposé FR | Proposé EN |
|---|---|---|
| nos conseils exclusifs (description) | supprimé | supprimé |
| qui contrôle parfaitement les reflets et les éclats | qui permet de maîtriser finement… | that gives you fine control over… |
| une expérience interactive exceptionnelle | une expérience interactive riche | a rich interactive experience |
| parfaitement optimisées pour les plateformes e-commerce | optimisées pour… | optimized for… |
| pour assurer une netteté parfaite (puce 3) | pour obtenir une netteté uniforme sur toute la profondeur du bijou | to get uniform sharpness across the entire depth of the piece |
| afin d'améliorer considérablement l’expérience utilisateur | pour enrichir l’expérience utilisateur | to enhance the user experience |
| contrôler parfaitement les reflets et éclats (FAQ R3) | maîtriser finement… | for fine control over… |
| révolutionne-t-elle (FAQ Q4) | améliore-t-elle | improve |
| représente une évolution majeure | constitue une évolution importante | is a significant development |
| impossible à obtenir avec des méthodes conventionnelles | difficile à atteindre avec… | hard to achieve with… |

Non atténués : « absolument exceptionnel » (dans la citation, point 4) ; « avantages décisifs » (appréciation éditoriale courante). Sans décision : les atténuations restent dans la proposition ; refuser l'une d'elles revient à reprendre l'actuel pour cette phrase.

### 7. « Clarté » corrigé en « pureté » — Sébastien

- Constat : en gemmologie française, les critères du diamant sont carat, couleur, pureté, taille ; « clarté » calque l'anglais *clarity*.
- Proposition : « leur taille, pureté, poli et symétrie ».
- Sans décision : retour à « clarté » (compris, mais non conforme au vocabulaire des joailliers, public visé).

### 8. Métadonnées FR — Laurent (SEO) et Sébastien (copywriting)

- title `Comment photographier des bijoux : tutoriel photo e-commerce` ; h1 `Photographier des bijoux : techniques professionnelles pour joailliers` ; metaTitle `Comment photographier des bijoux en studio | PackshotCreator` (60) ; description `Photographie de bijoux : studio macro, éclairage, technologie Hyperfocus, animations à 360° et post-production. Nos conseils pour réussir vos visuels.` (150).
- Points d'attention : le metaTitle abandonne « techniques professionnelles pour joailliers » (reporté dans le h1) au profit de « en studio » ; la description ne cite plus « diamants et pierres précieuses ». Requête la mieux classée, « comment photographier des bijoux » (9,8), conservée en tête du `<title>`. Les requêtes « photographe (de) bijoux » (positions 28 à 30) relèvent d'une intention de service, que l'article ne couvre pas.
- Sans décision : le `<title>` actuel de 95 caractères, en Title Case, reste servi et tronqué.

### 9. Métadonnées EN et partage de la requête « jewelry photography » — Laurent

- title `Jewelry photography: an e-commerce photo tutorial` ; h1 `Jewelry photography: professional techniques for jewelers` ; metaTitle `Jewelry photography: studio techniques | PackshotCreator` (56) ; description (150) dans `05`.
- Point d'attention : `/en/blog/8-steps-to-professional-jewelry-photography` reçoit aussi des impressions sur « jewelry photography » (0/150/54,5). La proposition fait porter la requête générique par cette page-ci (1 050 impressions) ; à confirmer pour éviter que les deux pages se disputent la même requête.
- Sans décision : metaTitle de 81 caractères, title agrammatical (« What technique to photograph jewelry »).

### 10. Structure EN et ancres du sommaire — Laurent

- L'intertitre EN sur l'éclairage passe de H3 à H2, comme en FR (même ancre). Changent d'ancre : FR `temoignage-concret-gad-amp-co-et-l-efficacite-orbitvu` ; EN `practical-tips-succeed-in-your-jewelry-photography` et `concrete-testimony-gad-amp-co-and-orbitvu-efficiency`. Aucun lien du dépôt ne les vise ; un lien externe éventuel vers ces ancres retomberait en haut de page.
- Sans décision : hiérarchie FR/EN divergente, sans autre conséquence.

### 11. Auteur : « Laurent Wainberg » à l'import, « PackshotCreator » aujourd'hui — les deux

- Constat : l'import Webflow (`56d4bc32`) attribuait l'article à Laurent Wainberg ; le commit `8ae45f63` (12/06/2026, Sébastien) a remplacé l'auteur par « PackshotCreator » sur les articles migrés, délibérément (« cohérence E-E-A-T avec le schema Organization »). Le corps ne contient aucun nom de personne remplacé (similarité 1,0 avec l'import).
- Proposition : auteur **conservé** (« PackshotCreator ») : ce n'est pas un remplacement à tort dans le texte, mais une décision éditoriale explicite.
- Sans décision : l'auteur reste « PackshotCreator ».

### 12. Date affichée et `dateModified` — Laurent (historique), Sébastien

- Constat : date affichée 18/10/2023, pas de `dateModified`. L'item Webflow a été créé le 11/03/2025 et les images du corps le 20/03/2025 (horodatage des identifiants Webflow : inférence). La vidéo de présentation de l'Alphashot Micro V2 référencée dans le dépôt date du 12/12/2023 (`app/[lang]/studio-photo/[slug]/page.tsx` l. 38). Le texte actuel, qui cite l'Alphashot Micro V2, semble donc postérieur à la date affichée (inférence, non prouvée).
- À décider : garder la date ; ou renseigner `dateModified` (champ lu par le JSON-LD, `page.tsx` l. 290) à la date de publication de la version corrigée.
- Sans décision : la page reste datée de 2023 sans date de mise à jour.

### 13. Visionneuse 360° Orbitvu intégrée — Sébastien

- Constat : la section « Animations à 360° » contient un bloc `<script src="//orbitvu.co/share/RgHtEmJGrtsxUJDjt6BkfW/6530158/360/script…">` suivi d'un `<div class="orbitvu-viewer">`. Le rendu Markdown de `01` ne le montre pas. `sanitizeHtml` (`lib/sanitize.ts`) renvoie le HTML tel quel. [Inférence technique] Un script inséré par `dangerouslySetInnerHTML` s'exécute au chargement complet de la page (HTML servi), mais pas lors d'une navigation côté client.
- Proposition : bloc **conservé** à l'identique dans les deux langues.
- À vérifier dans Chrome (R4 : non vérifiable par script) : `https://sysnext.vercel.app/fr/blog/joailliers-nos-conseils-pour-reussir-vos-visuels-produits`, en accès direct puis depuis la liste du blog. Si la visionneuse ne s'affiche pas, décider de la remplacer (par exemple par le composant `components/video/OrbitvuViewer.tsx`, ce qui sort du périmètre du texte) ou de la retirer.
- Sans décision : le bloc reste ; l'espace peut être vide pour une partie des visiteurs.

### 14. Image 2 : capture d'un logiciel de retouche généraliste — Sébastien

- Constat : `/images/blog/67dbae80db22afe6492e962a.avif` montre la retouche d'une photo de bague dans un logiciel d'édition d'image généraliste, alors que le paragraphe vante « les logiciels modernes intégrés aux studios spécialisés ».
- Proposition : image conservée, alt descriptif fidèle à ce qu'elle montre.
- Sans décision : léger décalage entre l'image et le texte.

### 15. Alt de l'image principale — Sébastien (code), Laurent (SEO)

- Constat : l'alt de `/images/blog/67dbae80db22afe6492e967e.avif` est le h1 (`page.tsx` l. 206) ; aucun champ JSON ne permet de le décrire. L'image montre quatre bagues sur fond blanc.
- Proposition : rien dans le JSON ; le h1 corrigé améliore déjà l'alt. Ajouter un champ d'alt touche le gabarit de tous les articles (rayon large, R8) : hors périmètre de ce dossier.
- Sans décision : alt = h1.

### 16. Catégorie « Innovations » — Laurent et Sébastien (facultatif)

- L'article est un tutoriel ; « E-commerce » est la seule autre catégorie générale existante. Proposition : conservée. Sans décision : inchangée.

### 17. Slugs conservés — Laurent (confirmation)

- FR `joailliers-nos-conseils-pour-reussir-vos-visuels-produits` et EN `technique-photograph-jewelry-tutorial` conservés. L'EN est peu idiomatique mais porte le backlink de la famille (1 domaine, AS 64, suivi) et reçoit six redirections du Worker ; analyse complète dans `05`. Sans décision : inchangés, ce qui est la recommandation.
