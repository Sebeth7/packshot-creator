# Version d'origine retrouvée

La plus ancienne version conservée dans le dépôt est l'extraction Webflow du commit `56d4bc32` (18/04/2026, `scripts/extract-webflow-content.mjs`, API Webflow v2). Aucun export brut de Webflow n'est conservé dans le dépôt ni dans `gsc-crawl-seo` (crawls à partir du 28/05/2026). Les versions ES, DE et NL de l'ancien site Webflow n'ont pas été extraites.

## FR — /fr/blog/decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator

### Commits ayant modifié le fichier depuis l'import

- `fc6c9c6b` 2026-09-30 feat(academy): page réduite au catalogue Qualiopi, textes formation alignés
- `1ebb469c` 2026-07-07 fix(maillage): corrections audit body — hub horlogerie, ancres Pro G2, repointage EN, cross-langue fr/en + de-ch
- `3cfa2e73` 2026-06-30 fix(seo): repointe les liens money pages obsolètes et retire les prix Orbitvu publiés
- `ed5dc135` 2026-06-23 feat(seo): maillage interne (rapport Laurent V4) + annotation hreflang fr-CH
- `8ae45f63` 2026-06-12 chore(content): auteur générique PackshotCreator sur les articles migrés
- `44d780f1` 2026-05-23 fix(images): migrate all inline images from Webflow CDN to local storage
- `56d4bc32` 2026-04-18 feat(content): 158 articles+guides extraits de Webflow

### Champs de métadonnées modifiés depuis l'import

- `title` : import = "Interview de Laurent Wainberg, fondateur de PackshotCreator" → actuel = "Interview de PackshotCreator, fondateur de PackshotCreator"
- `h1` : import = "Laurent Wainberg, fondateur de PackshotCreator – Interview" → actuel = "PackshotCreator, fondateur de PackshotCreator – Interview"
- `metaTitle` : import = "Laurent Wainberg, fondateur de PackshotCreator – Interview" → actuel = "PackshotCreator, fondateur de PackshotCreator – Interview"
- `description` : import = "Découvrez l’histoire du Packshot automatisé à travers l’interview de Laurent Wainberg, pionnier et fondateur de PackshotCreator." → actuel = "Découvrez l’histoire du Packshot automatisé à travers l’interview de PackshotCreator, pionnier et fondateur de PackshotCreator."
- `faqs` : import = [{"question": "Qui a inventé le concept de Packshot automatisé ?", "answer": "C’est Laurent Wainberg, fondateur de la société Sysnext, qui a introduit dès 2003 en Europe le premier système de photographie automatisée pour les produits. L’idée était simple mais visionnaire : permettre aux entreprises de produire en interne des visuels de qualité, sans dépendre systématiquement d’un studio photo ext → actuel = [{"question": "Qui a inventé le concept de Packshot automatisé ?", "answer": "C’est PackshotCreator, fondateur de la société Sysnext, qui a introduit dès 2003 en Europe le premier système de photographie automatisée pour les produits. L’idée était simple mais visionnaire : permettre aux entreprises de produire en interne des visuels de qualité, sans dépendre systématiquement d’un studio photo exte
- `author` : import = "Laurent Wainberg" → actuel = "PackshotCreator"

### Écarts de corps (blocs, import → actuel)

```diff
@@ -3 +3 @@
-À ses débuts, Packshot*Creator* a essuyé des critiques virulentes, notamment de la part de certains photographes professionnels. Les caissons automatisés de prise de vue à LED étaient vus comme une menace pour le métier. « Certains ont crié à la mort de la photographie. Pourtant, la réalité était toute autre : le marché avait simplement évolué, et nous y avons répondu avec une solution adaptée », rappelle Laurent Wainberg.
+À ses débuts, Packshot*Creator* a essuyé des critiques virulentes, notamment de la part de certains photographes professionnels. Les caissons automatisés de prise de vue à LED étaient vus comme une menace pour le métier. « Certains ont crié à la mort de la photographie. Pourtant, la réalité était toute autre : le marché avait simplement évolué, et nous y avons répondu avec une solution adaptée », rappelle PackshotCreator.
@@ -6 +6 @@
-Packshot*Creator* s’est imposé comme un acteur à part entière de la chaîne de valeur du commerce digital, en accompagnant non seulement les e-commerçants, mais aussi les services marketing, R&D et communication de nombreux secteurs. [Cosmétiques](/fr/industrie/beautes), [industrie](/fr/industrie/pieces-techniques), luxe, pharmacie, [agroalimentaire](/fr/industrie/art-de-table-photos-culinaires): les usages se sont multipliés, tout comme les fonctionnalités.
+Packshot*Creator* s’est imposé comme un acteur à part entière de la chaîne de valeur du commerce digital, en accompagnant non seulement les e-commerçants, mais aussi les services marketing, R&D et communication de nombreux secteurs. [Cosmétiques](/fr/industrie/cosmetiques-beaute), [industrie](/fr/industrie/pieces-techniques-industrie), luxe, pharmacie, [agroalimentaire](/fr/industrie/food-alimentaire): les usages se sont multipliés, tout comme les fonctionnalités.
@@ -12 +12 @@
-En 2011, Sysnext affichait déjà un chiffre d’affaires de 4 millions d’euros, en croissance de +11 %. L’année suivante démarrait sur une dynamique encore plus forte (+20 %). Ce développement s’est appuyé sur une politique de R&D soutenue et une stratégie d’accompagnement des clients à forte valeur ajoutée. ⏎ La technologie, seule, ne suffit pas. Ce que PackshotCreator a compris très tôt, c’est que la réussite passe aussi par **la pédagogie et l’acculturation des équipes**. « Nous ne nous sommes jamais contentés de vendre un studio photo automatisé. Nous avons toujours misé sur l’accompagnement
+En 2011, Sysnext affichait déjà un chiffre d’affaires de 4 millions d’euros, en croissance de +11 %. L’année suivante démarrait sur une dynamique encore plus forte (+20 %). Ce développement s’est appuyé sur une politique de R&D soutenue et une stratégie d’accompagnement des clients à forte valeur ajoutée. ⏎ La technologie, seule, ne suffit pas. Ce que PackshotCreator a compris très tôt, c’est que la réussite passe aussi par **la pédagogie et l’acculturation des équipes**. « Nous ne nous sommes jamais contentés de vendre un studio photo automatisé. Nous avons toujours misé sur l’accompagnement
@@ -16 +16 @@
-Depuis 2016, Packshot*Creator* propose également des [**formations spécialisées** en photographie produit](/fr/academy/formations-packshot) : packshot maroquinerie, bouteilles de vin, mobilier, décoration, etc. Ces formations s’adressent aussi bien aux photographes professionnels qu’aux équipes internes de marques ou d’agences. C’est une nouvelle preuve de l’engagement de la marque dans la **transmission des savoirs et l’élévation des standards visuels.**
+Packshot*Creator* propose également des [**formations aux studios photo Orbitvu**](/fr/academy), destinées aux équipes qui les utilisent au quotidien. C’est une nouvelle preuve de l’engagement de la marque dans la **transmission des savoirs et l’élévation des standards visuels.**
@@ -18,2 +18,2 @@
-**Packshot*Creator* n’a pas tué la photographie : il en a révélé de nouveaux usages.** Grâce à une vision résolument tournée vers les enjeux métiers, l’entreprise a su imposer l’automatisation comme un allié stratégique au service de la performance visuelle. ⏎ Aujourd’hui encore, [à travers sa collaboration avec Orbitvu](https://orbitvu.com/blog/packshotcreator-now-powered-orbitvu/) et le développement de solutions comme l’[Alphashot Pro G2](/fr/studio-photo/alphashot-g2), PackshotCreator continue d’innover. Avec une promesse inchangée depuis ses débuts : aider les marques à créer **des image
-Pour replonger dans cette interview fondatrice qui revient sur les débuts de Packshot*Creato*r et la vision de son fondateur, **vous pouvez la (re)lire ici** : [Interview Laurent Wainberg – GNPP](https://gnpp.wordpress.com/2012/09/17/interview-laurent-wainberg-de-packshotcreator-2/).
+**Packshot*Creator* n’a pas tué la photographie : il en a révélé de nouveaux usages.** Grâce à une vision résolument tournée vers les enjeux métiers, l’entreprise a su imposer l’automatisation comme un allié stratégique au service de la performance visuelle. ⏎ Aujourd’hui encore, [à travers sa collaboration avec Orbitvu](https://orbitvu.com/blog/packshotcreator-now-powered-orbitvu/) et le développement de solutions comme l’[Alphashot Pro G2](/fr/studio-photo/alphashot-pro-g2), PackshotCreator continue d’innover. Avec une promesse inchangée depuis ses débuts : aider les marques à créer **des i
+Pour replonger dans cette interview fondatrice qui revient sur les débuts de Packshot*Creato*r et la vision de son fondateur, **vous pouvez la (re)lire ici** : [Interview PackshotCreator – GNPP](https://gnpp.wordpress.com/2012/09/17/interview-laurent-wainberg-de-packshotcreator-2/).
```

## Texte intégral à l'import — FR

- slug : `decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator`
- title : Interview de Laurent Wainberg, fondateur de PackshotCreator
- h1 : Laurent Wainberg, fondateur de PackshotCreator – Interview
- metaTitle : Laurent Wainberg, fondateur de PackshotCreator – Interview
- description : Découvrez l’histoire du Packshot automatisé à travers l’interview de Laurent Wainberg, pionnier et fondateur de PackshotCreator.
- date : 2017-10-04T00:00:00.000Z ; dateModified : None ; catégorie : Actualités ; auteur : Laurent Wainberg ; temps de lecture : 4
- image principale : /images/blog/67e2a882c6b1faecf8a7d34d.avif

### Corps

Créée en 2003, la société Sysnext – à l’origine du concept [**Packshot*Creator***](/fr/a-propos) – a bouleversé les codes de la photographie de produits. Avec une idée simple, mais audacieuse : rendre la production visuelle plus rapide, plus accessible et plus cohérente pour les entreprises. Dix ans après ses débuts, la société affiche une présence dans plus de 35 pays, près de 8 000 entreprises équipées et une conviction toujours aussi forte : **les visuels produits sont un levier stratégique de performance.**

### Une innovation longtemps incomprise

À ses débuts, Packshot*Creator* a essuyé des critiques virulentes, notamment de la part de certains photographes professionnels. Les caissons automatisés de prise de vue à LED étaient vus comme une menace pour le métier. « Certains ont crié à la mort de la photographie. Pourtant, la réalité était toute autre : le marché avait simplement évolué, et nous y avons répondu avec une solution adaptée », rappelle Laurent Wainberg.

Le e-commerce explosait, les volumes de références à photographier augmentaient, les délais se raccourcissaient. Les entreprises n’avaient plus seulement besoin de belles images : elles avaient besoin de **productivité**, de **standardisation**, et d’un **contrôle interne** sur leur production visuelle. C’est exactement ce que proposait Packshot*Creator*, bien avant que l’automatisation ne devienne un mot-clé à la mode.

### Une approche business centrée sur les usages

Packshot*Creator* s’est imposé comme un acteur à part entière de la chaîne de valeur du commerce digital, en accompagnant non seulement les e-commerçants, mais aussi les services marketing, R&D et communication de nombreux secteurs. [Cosmétiques](/fr/industrie/beautes), [industrie](/fr/industrie/pieces-techniques), luxe, pharmacie, [agroalimentaire](/fr/industrie/art-de-table-photos-culinaires): les usages se sont multipliés, tout comme les fonctionnalités.

**Photographies fixes, visuels multi-angles, animations 360°, vues 3D hémisphériques**… Les studios Packshot*Creator* ont évolué au rythme des besoins, tout en gardant une philosophie constante : **faciliter la création de visuels qualitatifs, cohérents et interactifs.**

(paragraphe vide)

![__wf_reserved_inherit](/images/blog/67e2aa0213158b42087cf052.avif)

(paragraphe vide)

#### Une croissance soutenue et une reconnaissance internationale

En 2011, Sysnext affichait déjà un chiffre d’affaires de 4 millions d’euros, en croissance de +11 %. L’année suivante démarrait sur une dynamique encore plus forte (+20 %). Ce développement s’est appuyé sur une politique de R&D soutenue et une stratégie d’accompagnement des clients à forte valeur ajoutée. ⏎ La technologie, seule, ne suffit pas. Ce que PackshotCreator a compris très tôt, c’est que la réussite passe aussi par **la pédagogie et l’acculturation des équipes**. « Nous ne nous sommes jamais contentés de vendre un studio photo automatisé. Nous avons toujours misé sur l’accompagnement, la formation et l’appropriation de l’outil par les utilisateurs finaux », souligne Laurent Wainberg.

#### De la productivité à la maîtrise des flux visuels

Dans un monde où les délais sont tendus, les contenus nombreux et les canaux multiples, **la photographie automatisée n’est pas une simple option : c’est une réponse stratégique**. PackshotCreator permet aux entreprises de garder la main sur leur production de contenus, sans sacrifier la qualité ou la créativité. En intégrant ces studios au sein même des équipes produit ou marketing, les entreprises gagnent en **agilité, cohérence et efficacité**. ⏎ Les photographes, eux, n’ont pas été évincés du processus. Bien au contraire : en les déchargeant des tâches répétitives et techniques, les solutions automatisées leur permettent de **se recentrer sur la direction artistique, la retouche haut de gamme et les projets à forte valeur ajoutée.**

#### L’humain au cœur du dispositif

Depuis 2016, Packshot*Creator* propose également des [**formations spécialisées** en photographie produit](/fr/academy/formations-packshot) : packshot maroquinerie, bouteilles de vin, mobilier, décoration, etc. Ces formations s’adressent aussi bien aux photographes professionnels qu’aux équipes internes de marques ou d’agences. C’est une nouvelle preuve de l’engagement de la marque dans la **transmission des savoirs et l’élévation des standards visuels.**

### Conclusion

**Packshot*Creator* n’a pas tué la photographie : il en a révélé de nouveaux usages.** Grâce à une vision résolument tournée vers les enjeux métiers, l’entreprise a su imposer l’automatisation comme un allié stratégique au service de la performance visuelle. ⏎ Aujourd’hui encore, [à travers sa collaboration avec Orbitvu](https://orbitvu.com/blog/packshotcreator-now-powered-orbitvu/) et le développement de solutions comme l’[Alphashot Pro G2](/fr/studio-photo/alphashot-g2), PackshotCreator continue d’innover. Avec une promesse inchangée depuis ses débuts : aider les marques à créer **des images percutantes, cohérentes et maîtrisées**, en toute autonomie.

Pour replonger dans cette interview fondatrice qui revient sur les débuts de Packshot*Creato*r et la vision de son fondateur, **vous pouvez la (re)lire ici** : [Interview Laurent Wainberg – GNPP](https://gnpp.wordpress.com/2012/09/17/interview-laurent-wainberg-de-packshotcreator-2/).

### FAQ

**Q : Qui a inventé le concept de Packshot automatisé ?**

C’est Laurent Wainberg, fondateur de la société Sysnext, qui a introduit dès 2003 en Europe le premier système de photographie automatisée pour les produits. L’idée était simple mais visionnaire : permettre aux entreprises de produire en interne des visuels de qualité, sans dépendre systématiquement d’un studio photo externe.

**Q : D’où vient le nom PackshotCreator ?**

Le nom est né avec la volonté de démocratiser la création de visuels produits, aussi appelés packshots. Avec PackshotCreator, le packshot n’était plus réservé aux agences ou aux photographes experts : il devenait accessible, automatisé et reproductible en entreprise. Le terme "Packshot" est même devenu un générique utilisé dans l’industrie, ce qui témoigne de l’impact de la marque.

**Q : Comment la profession a-t-elle réagi à ces innovations ?**

Au départ, les photographes traditionnels ont vu ces systèmes comme une menace. Mais avec le temps, beaucoup ont compris qu’ils pouvaient s’appuyer sur l’automatisation pour gagner du temps sur les tâches répétitives et se concentrer sur les missions à forte valeur ajoutée : direction artistique, création d’univers, storytelling visuel…

**Q : Quelle a été la contribution de PackshotCreator au marché européen ?**

PackshotCreator a été le premier acteur à structurer le marché européen de la photographie automatisée. L’entreprise a aussi joué un rôle pédagogique fort, en expliquant les enjeux de productivité visuelle, en formant des milliers d’utilisateurs et en rendant cette technologie intelligible pour les PME, les grands groupes, et les photographes eux-mêmes.

**Q : Qui est Orbitvu et comment s’intègre-t-il dans cette histoire ?**

Orbitvu est une société polonaise innovante, qui a émergé dans les années 2010 avec une nouvelle génération de studios photo automatisés. PackshotCreator est devenu en 2023 le distributeur officiel d’Orbitvu en France et dans plusieurs pays francophones, intégrant ces nouvelles solutions plus performantes, plus fiables et conçues pour les standards actuels de l’e-commerce et du marketing visuel.


## EN — /en/blog/interview-laurent-wainberg-founder-packshotcreator

### Commits ayant modifié le fichier depuis l'import

- `fc6c9c6b` 2026-09-30 feat(academy): page réduite au catalogue Qualiopi, textes formation alignés
- `1ebb469c` 2026-07-07 fix(maillage): corrections audit body — hub horlogerie, ancres Pro G2, repointage EN, cross-langue fr/en + de-ch
- `3cfa2e73` 2026-06-30 fix(seo): repointe les liens money pages obsolètes et retire les prix Orbitvu publiés
- `ed5dc135` 2026-06-23 feat(seo): maillage interne (rapport Laurent V4) + annotation hreflang fr-CH
- `8ae45f63` 2026-06-12 chore(content): auteur générique PackshotCreator sur les articles migrés
- `44d780f1` 2026-05-23 fix(images): migrate all inline images from Webflow CDN to local storage
- `56d4bc32` 2026-04-18 feat(content): 158 articles+guides extraits de Webflow

### Champs de métadonnées modifiés depuis l'import

- `title` : import = "Interview with Laurent Wainberg, founder of PackshotCreator" → actuel = "Interview with PackshotCreator, founder of PackshotCreator"
- `h1` : import = "Laurent Wainberg, founder of PackshotCreator — Interview" → actuel = "PackshotCreator, founder of PackshotCreator — Interview"
- `metaTitle` : import = "Laurent Wainberg, founder of PackshotCreator — Interview" → actuel = "PackshotCreator, founder of PackshotCreator — Interview"
- `description` : import = "Discover the history of automated Packshot through an interview with Laurent Wainberg, pioneer and founder of PackshotCreator." → actuel = "Discover the history of automated Packshot through an interview with PackshotCreator, pioneer and founder of PackshotCreator."
- `faqs` : import = [{"question": "Who invented the automated Packshot concept?", "answer": "It was Laurent Wainberg, founder of the company Sysnext, who introduced the first automated product photography system in Europe in 2003. The idea was simple but visionary: to allow companies to produce quality visuals internally, without always depending on an external photo studio."}, {"question": "Where does the name Packs → actuel = [{"question": "Who invented the automated Packshot concept?", "answer": "It was PackshotCreator, founder of the company Sysnext, who introduced the first automated product photography system in Europe in 2003. The idea was simple but visionary: to allow companies to produce quality visuals internally, without always depending on an external photo studio."}, {"question": "Where does the name Packsh
- `author` : import = "Laurent Wainberg" → actuel = "PackshotCreator"

### Écarts de corps (blocs, import → actuel)

```diff
@@ -3 +3 @@
-In its early days, Packshot*Creator* has received strong criticism, in particular from some professional photographers. Automated LED cameras were seen as a threat to the profession. “Some cried out for the death of photography. However, the reality was quite different: the market had simply evolved, and we responded to it with an adapted solution,” recalls Laurent Wainberg.
+In its early days, Packshot*Creator* has received strong criticism, in particular from some professional photographers. Automated LED cameras were seen as a threat to the profession. “Some cried out for the death of photography. However, the reality was quite different: the market had simply evolved, and we responded to it with an adapted solution,” recalls PackshotCreator.
@@ -6 +6 @@
-Packshot*Creator* has established itself as a fully-fledged player in the digital commerce value chain, supporting not only e-retailers, but also marketing, R&D and communication departments in many sectors. [Cosmetics](/en/industrie/beautes), [industry](/en/industrie/pieces-techniques), luxury, pharmacy, [Agri-food](/en/industrie/art-de-table-photos-culinaires): uses have multiplied, as have functionalities.
+Packshot*Creator* has established itself as a fully-fledged player in the digital commerce value chain, supporting not only e-retailers, but also marketing, R&D and communication departments in many sectors. [Cosmetics](/en/industrie/cosmetiques-beaute), [industry](/en/industrie/pieces-techniques-industrie), luxury, pharmacy, [Agri-food](/en/industrie/food-alimentaire): uses have multiplied, as have functionalities.
@@ -12 +12 @@
-In 2011, Sysnext already had a turnover of 4 million euros, up +11%. The following year started with even stronger momentum (+20%). This development was based on a sustained R&D policy and a strategy to support customers with high added value. ⏎ Technology alone is not enough. What PackshotCreator understood very early on is that success also requires **pedagogy and the acculturation of teams**. “We've never just sold an automated photo studio. We have always focused on support, training and the appropriation of the tool by end users”, underlines Laurent Wainberg.
+In 2011, Sysnext already had a turnover of 4 million euros, up +11%. The following year started with even stronger momentum (+20%). This development was based on a sustained R&D policy and a strategy to support customers with high added value. ⏎ Technology alone is not enough. What PackshotCreator understood very early on is that success also requires **pedagogy and the acculturation of teams**. “We've never just sold an automated photo studio. We have always focused on support, training and the appropriation of the tool by end users”, underlines PackshotCreator.
@@ -16 +16 @@
-Since 2016, Packshot*Creator* also offers [**specialized training** In product photography](/en/academy/formations-packshot) : packshot leather goods, wine bottles, furniture, decoration, etc. These courses are aimed at professional photographers as well as internal teams of brands or agencies. It is a new proof of the brand's commitment to **transmission of knowledge and the raising of visual standards.**
+Packshot*Creator* also offers [**training on Orbitvu photo studios**](/fr/academy) (in French), for the teams who use them every day. It is a new proof of the brand's commitment to **transmission of knowledge and the raising of visual standards.**
@@ -18,2 +18,2 @@
-**Packshot*Creator* did not kill photography: it revealed new uses of it.** Thanks to a vision resolutely focused on business challenges, the company was able to impose automation as a strategic ally in the service of visual performance. ⏎ Even today, [through its collaboration with Orbitvu](https://orbitvu.com/blog/packshotcreator-now-powered-orbitvu/) and the development of solutions such as[Alphashot Pro G2](/en/studio-photo/alphashot-g2), PackshotCreator continues to innovate. With a promise that has remained the same since its inception: to help brands create **powerful, coherent and con
-To dive back into this founding interview that looks back on the beginnings of Packshot*Creato*r and the vision of its founder, **You can (re) read it here** : [Interview with Laurent Wainberg — GNPP](https://gnpp.wordpress.com/2012/09/17/interview-laurent-wainberg-de-packshotcreator-2/).
+**Packshot*Creator* did not kill photography: it revealed new uses of it.** Thanks to a vision resolutely focused on business challenges, the company was able to impose automation as a strategic ally in the service of visual performance. ⏎ Even today, [through its collaboration with Orbitvu](https://orbitvu.com/blog/packshotcreator-now-powered-orbitvu/) and the development of solutions such as[Alphashot Pro G2](/en/studio-photo/alphashot-pro-g2), PackshotCreator continues to innovate. With a promise that has remained the same since its inception: to help brands create **powerful, coherent and
+To dive back into this founding interview that looks back on the beginnings of Packshot*Creato*r and the vision of its founder, **You can (re) read it here** : [Interview with PackshotCreator — GNPP](https://gnpp.wordpress.com/2012/09/17/interview-laurent-wainberg-de-packshotcreator-2/).
```

## Texte intégral à l'import — EN

- slug : `interview-laurent-wainberg-founder-packshotcreator`
- title : Interview with Laurent Wainberg, founder of PackshotCreator
- h1 : Laurent Wainberg, founder of PackshotCreator — Interview
- metaTitle : Laurent Wainberg, founder of PackshotCreator — Interview
- description : Discover the history of automated Packshot through an interview with Laurent Wainberg, pioneer and founder of PackshotCreator.
- date : 2017-10-04T00:00:00.000Z ; dateModified : None ; catégorie : News ; auteur : Laurent Wainberg ; temps de lecture : 4
- image principale : /images/blog/67e2a882c6b1faecf8a7d34d.avif

### Corps

Created in 2003, the company Sysnext — at the origin of the concept [**Packshot*Creator***](/en/a-propos) — has shaken up the codes of product photography. With a simple but daring idea: to make visual production faster, more accessible and more consistent for businesses. Ten years after its beginnings, the company has a presence in more than 35 countries, nearly 8,000 equipped companies and a conviction that is still as strong as ever: **the visuals produced are a strategic driver of performance.**

### An innovation that has long been misunderstood

In its early days, Packshot*Creator* has received strong criticism, in particular from some professional photographers. Automated LED cameras were seen as a threat to the profession. “Some cried out for the death of photography. However, the reality was quite different: the market had simply evolved, and we responded to it with an adapted solution,” recalls Laurent Wainberg.

E-commerce was exploding, the volume of references to be photographed was increasing, the deadlines were getting shorter. Businesses no longer just needed beautiful images: they needed **productivity**, of **standardizing**, and of a **internal control** on their visual production. That's exactly what Packshot was offering.*Creator*, long before automation became a hot topic.

### A business approach focused on uses

Packshot*Creator* has established itself as a fully-fledged player in the digital commerce value chain, supporting not only e-retailers, but also marketing, R&D and communication departments in many sectors. [Cosmetics](/en/industrie/beautes), [industry](/en/industrie/pieces-techniques), luxury, pharmacy, [Agri-food](/en/industrie/art-de-table-photos-culinaires): uses have multiplied, as have functionalities.

**Still photographs, multi-angle visuals, 360° animations, hemispheric 3D views**... Packshot Studios*Creator* have evolved at the pace of needs, while maintaining a constant philosophy: **facilitate the creation of qualitative, coherent and interactive visuals.**

(paragraphe vide)

![__wf_reserved_inherit](/images/blog/67e2aa0213158b42087cf052.avif)

(paragraphe vide)

#### Sustained growth and international recognition

In 2011, Sysnext already had a turnover of 4 million euros, up +11%. The following year started with even stronger momentum (+20%). This development was based on a sustained R&D policy and a strategy to support customers with high added value. ⏎ Technology alone is not enough. What PackshotCreator understood very early on is that success also requires **pedagogy and the acculturation of teams**. “We've never just sold an automated photo studio. We have always focused on support, training and the appropriation of the tool by end users”, underlines Laurent Wainberg.

#### From productivity to the control of visual flows

In a world where deadlines are tight, numerous contents and multiple channels, **automated photography is not a simple option: it is a strategic response**. PackshotCreator allows businesses to keep control of their content production, without sacrificing quality or creativity. By integrating these studios into the product or marketing teams themselves, companies gain in **agility, consistency and efficiency**. ⏎ Photographers, on the other hand, were not excluded from the process. On the contrary: by relieving them of repetitive and technical tasks, automated solutions allow them to **refocus on artistic direction, high-end retouching and projects with high added value.**

#### The human at the heart of the device

Since 2016, Packshot*Creator* also offers [**specialized training** In product photography](/en/academy/formations-packshot) : packshot leather goods, wine bottles, furniture, decoration, etc. These courses are aimed at professional photographers as well as internal teams of brands or agencies. It is a new proof of the brand's commitment to **transmission of knowledge and the raising of visual standards.**

### Conclusion

**Packshot*Creator* did not kill photography: it revealed new uses of it.** Thanks to a vision resolutely focused on business challenges, the company was able to impose automation as a strategic ally in the service of visual performance. ⏎ Even today, [through its collaboration with Orbitvu](https://orbitvu.com/blog/packshotcreator-now-powered-orbitvu/) and the development of solutions such as[Alphashot Pro G2](/en/studio-photo/alphashot-g2), PackshotCreator continues to innovate. With a promise that has remained the same since its inception: to help brands create **powerful, coherent and controlled images**, in complete autonomy.

To dive back into this founding interview that looks back on the beginnings of Packshot*Creato*r and the vision of its founder, **You can (re) read it here** : [Interview with Laurent Wainberg — GNPP](https://gnpp.wordpress.com/2012/09/17/interview-laurent-wainberg-de-packshotcreator-2/).

### FAQ

**Q : Who invented the automated Packshot concept?**

It was Laurent Wainberg, founder of the company Sysnext, who introduced the first automated product photography system in Europe in 2003. The idea was simple but visionary: to allow companies to produce quality visuals internally, without always depending on an external photo studio.

**Q : Where does the name PackshotCreator come from?**

The name was born with the desire to democratize the creation of product visuals, also called packshots. With PackshotCreator, the packshot was no longer reserved for agencies or expert photographers: it became accessible, automated and repeatable in business. The term “Packshot” has even become a generic term used in the industry, a testament to the impact of the brand.

**Q : How has the profession reacted to these innovations?**

At first, traditional photographers saw these systems as a threat. But over time, many understood that they could rely on automation to save time on repetitive tasks and focus on missions with high added value: artistic direction, universe creation, visual storytelling...

**Q : What was PackshotCreator's contribution to the European market?**

PackshotCreator was the first player to structure the European automated photography market. The company also played a strong educational role, by explaining the challenges of visual productivity, by training thousands of users and by making this technology intelligible for SMEs, large groups, and the photographers themselves.

**Q : Who is Orbitvu and how does he fit into this story?**

Orbitvu is an innovative Polish company, which emerged in the 2010s with a new generation of automated photo studios. In 2023, PackshotCreator became the official distributor of Orbitvu in France and in several French-speaking countries, integrating these new solutions that are more efficient, more reliable and designed for current e-commerce and visual marketing standards.

