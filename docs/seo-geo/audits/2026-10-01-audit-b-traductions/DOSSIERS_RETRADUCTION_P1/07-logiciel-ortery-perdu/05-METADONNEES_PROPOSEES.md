# Métadonnées proposées — famille 681a1a294d5ce94156610507

Comptes en caractères Unicode, espaces insécables comprises (une espace insécable compte pour un caractère). Valeurs actuelles citées mot pour mot depuis les JSON de `main` `17fc0b3`.

Rappel de l'usage des champs par le gabarit `app/[lang]/blog/[slug]/page.tsx` et les composants de blog :

- `metaTitle` devient la balise `<title>` et le titre Open Graph, sans suffixe de marque (repli sur `title` s'il est vide) ;
- `h1` est le titre affiché de la page **et** l'alt de l'image principale ;
- `title` sert aux cartes d'articles (`BlogGrid`, `RelatedArticles`), y compris comme alt de leur vignette ;
- `description` alimente la meta description et `og:description`.

Requêtes GSC à préserver (365 jours au 28/09/2026, `GSC_REQUETES_P1.md`, clics / impressions / position) :

- FR : « packshot creator » 2/119/4,8 ; « packshotcreator » 0/118/20,6 ; « packshot-creator » 0/9/5,8 ; « packshot creator software download » 0/4/8,0 ;
- EN : « packshot creator » 1/1467/1,7 ; « packshotcreator » 0/554/13,2 ; « packshot-creator » 0/444/1,1 ; « packshot software » 0/289/19,9 ; « ortery » 1/178/7,0 ; « packshot creator software download » 12/139/1,7 ; « ortery software » 0/135/9,2 ; « packshot replacement » 0/125/8,0.

Ce sont des requêtes de marque : la page est la porte d'entrée des anciens clients, et une vingtaine d'anciennes URL d'aide et de logiciel (CD d'installation perdu, compatibilité Windows 11, édition Mac, Dropbox, réglages de l'appareil photo) y sont redirigées par le Worker (`cloudflare-worker/src/index.js`). Les propositions gardent donc en tête « PackshotCreator », « Ortery », « logiciel / software » et, en EN, l'intention « download ».

---

## FR — /fr/blog/logiciel-packshotcreator-ortery-perdu-solution

### slug
- Actuel : `logiciel-packshotcreator-ortery-perdu-solution`
- Proposé : **conservé**.
- Analyse : slug français correct, sans faute, porteur des termes de marque. Le changer imposerait une redirection 301 (Worker ou `next.config.ts`), la mise à jour de `content/blog/alternates.json` et de cinq mappings du Worker qui pointent déjà vers lui (`/logiciel-packshotcreator`, `/nouveau-logiciel-packshot-creator-2018`, anciennes pages d'aide `/portal/fr/kb/…`), ainsi que des liens entrants des articles « Migrer » FR et de-ch. Aucun bénéfice : recommandation de ne pas y toucher.

### title (cartes d'articles)
- Actuel : « Vous avez perdu votre logiciel PackshotCreator ou Ortery ? »
- Proposé : « Vous avez perdu votre logiciel PackshotCreator ou Ortery ? » (58 caractères)
- Justification : seuls l'espace finale et l'espace avant « ? » (insécable) changent. Formulation naturelle de la question que se pose le lecteur.

### h1 (et alt de l'image principale)
- Actuel : « Récupérer votre logiciel PackshotCreator ou Ortery »
- Proposé : **inchangé** (50 caractères).
- Justification : clair, porteur de « logiciel PackshotCreator » et « Ortery ». Il sert aussi d'alt à l'image principale (`/images/blog/681a148a2f962e366b1271b4.avif`), qui montre le boîtier du CD d'installation du logiciel PackshotCreator (« Software Installation CD », mention « Now compatible with Microsoft Windows 7 ») : l'alt reste pertinent.

### metaTitle
- Actuel : « Récupérer votre logiciel PackshotCreator ou Ortery perdu - Solutions et alternatives » (84 caractères)
- Proposé : « Logiciel PackshotCreator ou Ortery perdu : que faire ? » (54 caractères)
- Justification : tient dans l'affichage des résultats ; ouvre sur « Logiciel PackshotCreator », requête de marque ; « que faire » reprend l'intertitre « Que faire si vous avez perdu le logiciel » et l'intention des anciens clients. Le séparateur « - » et la capitale à « Solutions » disparaissent.

### description
- Actuel : « Problèmes avec votre logiciel PackshotCreator ou Ortery? Découvrez comment récupérer votre licence, résoudre les problèmes de compatibilité Windows 11 et explorer les alternatives modernes. » (189 caractères)
- Proposé : « Logiciel PackshotCreator ou Ortery perdu ? Où le télécharger, comment réactiver une licence, les limites sous Windows 11 et les alternatives Orbitvu. » (149 caractères)
- Justification : dans la cible 140-155 ; suit l'ordre de l'article (téléchargement et licence auprès d'Ortery, limites Windows 11, alternatives) ; retire la promesse « résoudre les problèmes de compatibilité Windows 11 », que l'article ne tient pas (06-20) ; nomme Orbitvu, objet de la seconde moitié de l'article.

### date et dateModified
- Actuel : date « 2025-05-06T00:00:00.000Z » ; dateModified absent.
- Proposé : date **inchangée** ; dateModified à renseigner à la date de publication de la version validée.
- Justification : les marqueurs « en 2025 » sont retirés du texte ; un dateModified récent signale la mise à jour aux moteurs et aux lecteurs (06-17).

### catégorie
- Actuel : « Produits »
- Proposé : **inchangée**.

### auteur
- Actuel : « PackshotCreator » (import Webflow : « Laurent Wainberg » ; remplacement délibéré, commit `8ae45f63` du 12/06/2026)
- Proposé : **inchangé** en attendant la décision 06-18.

### Image du corps — alt
- `src` : `/images/blog/681a16ed96fe1ef9fd011a22.avif` (inchangé, même position : sous l'intertitre « Étape 1 »)
- Actuel : `__wf_reserved_inherit`
- Proposé : « Étiquette signalétique d'un Photosimile 200 d'Ortery Technologies indiquant le modèle et le numéro de série » (107 caractères)
- Justification : l'image, convertie en PNG pour examen le 01/10/2026, montre une étiquette « Photosimile », « Model : Photosimile 200 », tension d'alimentation, « Serial No. », marquages CE et FCC, « Ortery Technologies Inc. Made in Taiwan ». L'alt dit ce que l'image apporte à l'étape : où lire le modèle et le numéro de série (06-19).

### Image du corps — légende
- Actuel : aucune.
- Proposé : aucune (pas d'ajout de contenu).

### Vidéo — titre de l'iframe (facultatif)
- `src` : `https://www.youtube.com/embed/9Yrf5vwJsu4` (inchangé)
- Actuel : « What is Virtual Lights and how it works? I ALPHASHOT PRO G2 »
- Proposé (facultatif, accessibilité) : « Vidéo : l'éclairage virtuel de l'Alphashot Pro G2 »
- Justification : l'attribut `title` d'une iframe décrit son contenu pour les lecteurs d'écran ; le titre YouTube anglais, avec « I » pour une barre verticale, peut rester si l'on préfère ne pas toucher au balisage.

### Intertitres modifiés (rappel, détail en 03)
- « Étape 1 : Identifiez votre matériel » → « Étape 1 : identifiez votre matériel »
- « Étape 2 : Contactez Ortery Technologies » → « Étape 2 : contactez Ortery Technologies »
- « Problèmes de compatibilité importants » → « Compatibilité avec Windows 11 : des limites importantes »
- « Les avantages des solutions Orbitvu modernes : » → « Les avantages des solutions Orbitvu modernes »
- Les autres intertitres sont inchangés.

---

## EN — /en/blog/lost-packshotcreator-ortery-software-solution

### slug
- Actuel : `lost-packshotcreator-ortery-software-solution`
- Proposé : **conservé**.
- Analyse : anglais correct, porteur de « packshotcreator », « ortery » et « software ». Quatorze mappings du Worker y aboutissent (`/blog/lost-…`, `/en/blog/logiciel-packshotcreator-ortery-perdu-solution`, `/software-packshotcreator`, `/compatible-cameras-list`, éditions Mac, anciennes pages d'aide `/portal/en/kb/…`), plus le lien de l'article « Migrate » EN. Tout changement exigerait une 301, la mise à jour de ces mappings et de `alternates.json`, avec un risque de chaînes de redirection : à ne pas changer.

### title (cartes d'articles)
- Actuel : « Have you lost your PackshotCreator or Ortery software? »
- Proposé : « Have you lost your PackshotCreator or Ortery software? » (54 caractères)
- Justification : seule l'espace finale disparaît ; contient « PackshotCreator », « Ortery software ».

### h1 (et alt de l'image principale)
- Actuel : « Get your PackshotCreator or Ortery software »
- Proposé : « Recover your PackshotCreator or Ortery software » (47 caractères)
- Justification : rend « Récupérer » (EN-02) ; cohérent avec le metaTitle et l'intention « lost » ; reste un alt acceptable pour l'image du CD d'installation.

### metaTitle
- Actuel : « Recover your lost PackshotCreator or Ortery software - Solutions and alternatives » (81 caractères)
- Proposé : « Lost PackshotCreator or Ortery software? Where to get it » (56 caractères)
- Justification : tient dans l'affichage ; garde en tête « PackshotCreator », puis « Ortery software » (135 impressions, position 9,2) ; « Where to get it » répond à l'intention de « packshot creator software download » (12 clics, première source de clics de la page) sans promettre un téléchargement depuis notre site, puisque l'article renvoie vers Ortery. Variante écartée : « …? Download & support » (59), qui laisserait croire que PackshotCreator fournit le téléchargement et le support.

### description
- Actuel : « Problems with your PackshotCreator or Ortery software? Learn how to get your license back, fix Windows 11 compatibility issues, and explore modern alternatives. » (160 caractères)
- Proposé : « Lost your PackshotCreator or Ortery software? Where to download it, how to reactivate a license, Windows 11 limitations and Orbitvu alternatives. » (145 caractères)
- Justification : traduction de la description FR proposée ; contient « download », « PackshotCreator », « Ortery software » ; retire « fix Windows 11 compatibility issues » (06-20).

### date et dateModified
- Identique au FR (06-17).

### catégorie
- Actuel : « Products »
- Proposé : **inchangée**.

### auteur
- Identique au FR (06-18).

### Image du corps — alt
- `src` : `/images/blog/681a16ed96fe1ef9fd011a22.avif` (inchangé, même position)
- Actuel : `__wf_reserved_inherit`
- Proposé : « Rating plate of an Ortery Technologies Photosimile 200 showing the model and serial number » (90 caractères)
- Justification : voir le FR.

### Image du corps — légende
- Actuel : aucune.
- Proposé : aucune.

### Vidéo — titre de l'iframe (facultatif)
- Actuel : « What is Virtual Lights and how it works? I ALPHASHOT PRO G2 »
- Proposé (facultatif) : « Video: how virtual lighting works on the Alphashot Pro G2 »

### Intertitres modifiés (rappel, détail en 03)
- « What should you do if you lost the software or changed your PC? » → « What should you do if you've lost the software or changed your PC? »
- « Significant compatibility issues » → « Windows 11 compatibility: significant limitations »
- « Orbitvu: The New Generation of Automated Studios » → « Orbitvu: the new generation of automated studios »
- « The advantages of modern Orbitvu solutions: » → « The advantages of modern Orbitvu solutions »
- « Key advantages of Orbitvu compared to older studios » → « Key advantages of Orbitvu over older studios »
- « Why reinternalize your visual production? » → « Why bring your visual production back in-house? »
- Inchangés : « Why is your software no longer available? », « Step 1: Identify your hardware », « Step 2: Contact Ortery Technologies », « In summary », « FAQ ».

---

## de-ch

Aucune version de-ch dans `alternates.json` pour cette famille : pas de `04-PROPOSITION_DE-CH.md`. L'article de-ch « altes-packshotcreator-studio-migrieren » renvoie vers la version FR (« Unser Ratgeber zum Thema (auf Französisch) ») ; ce lien reste valide puisque le slug FR est conservé.
