# Consignes de relecture linguistique — audit B (articles hérités de Webflow)

Mode : LECTURE SEULE. Ne modifie AUCUN fichier du dépôt `/home/user/packshot-creator`.
N'écris QUE dans `ANNEXES/RELECTURES_JSON/`.
Aucun accès web, aucun appel payant, aucune commande git qui modifie quoi que ce soit (`git show`, `git log`, `git diff` autorisés).

## Entrées

Pour chaque famille éditoriale (un `webflowItemId`), un extrait prêt à lire :
`(extraits de travail non conservés) families/<ID>.md`

Il contient, pour chaque langue (FR, EN, parfois de-ch) : métadonnées (title, h1, metaTitle,
description, date), anomalies détectées automatiquement (à confirmer ou infirmer, elles
peuvent être fausses), signatures de traduction, puis le corps balisé
(`##` intertitres, `¶` paragraphes, `•` puces, `[IMG alt=…]`, `[LÉGENDE]`, liens `{lien «ancre» → cible}`), puis la FAQ.

Si besoin, le JSON source est `content/blog/<lang>/<slug>.json` et la version importée de
Webflow (18/04/2026) s'obtient par `git -C /home/user/packshot-creator show 56d4bc32:content/blog/<lang>/<slug>.json`.

## Ce que tu dois faire, famille par famille

Lis INTÉGRALEMENT chaque version linguistique (pas un échantillon), en comparant FR et EN
paragraphe par paragraphe, puis de-ch s'il existe. Recherche :

1. `titre_litteral` — titres, H1, metaTitle traduits mot à mot ;
2. `title_case` — majuscules artificielles, Title Case anglais appliqué au français (intertitres, titres, FAQ) ;
3. `calque` — calques de l'anglais en FR (ou du français en EN) ;
4. `incomprehensible` — phrases grammaticalement correctes mais incompréhensibles ou absurdes ;
5. `faux_ami_terminologie` — faux amis, terminologie métier incorrecte (photographie produit, packshot, éclairage, focus stacking, détourage, plateau tournant, etc.) ;
6. `appellation` — incohérences Orbitvu / PackshotCreator / Packshot Creator / Alphashot / Shotflow, noms remplacés à tort (ex. « PackshotCreator » mis à la place d'une personne) ;
7. `traduction_automatique` — paragraphes manifestement traduits automatiquement (mots non traduits, majuscules au milieu des phrases, segments découpés) ;
8. `unites_dates_legendes_alt` — unités, formats de nombres, dates, légendes, textes alternatifs incorrects ou dans la mauvaise langue ;
9. `incoherence_seo_h1_corps` — incohérence entre metaTitle, title, H1, description et corps ;
10. `structure` — paragraphes manquants, doublés ou inversés entre les langues, sections absentes d'une langue ;
11. `claim_renforce` — traduction qui renforce un claim (chiffre, superlatif, promesse, « jusqu'à » perdu, « garanti » ajouté…) ;
12. `melange_linguistique` — mélange de langues dans un même article ;
13. `autre` — tout autre défaut éditorial notable (fait daté, lien mort apparent, typographie lourde).

## Règles

- Chaque erreur cite l'extrait ACTUEL **mot pour mot**, copié depuis l'extrait (jamais reformulé).
- Ne jamais inventer de fait métier, de source ou de texte original. Si tu proposes une correction, elle reste au plus près du sens du texte, sans ajouter d'information.
- Pas de Title Case en français. Français et anglais natifs, naturels, sans style artificiel.
- Ne traite PAS la version FR comme originale par défaut. Origine linguistique :
  - « FR → EN (preuve interne) » seulement si l'EN contient des traces objectives de traduction depuis le FR (mots français résiduels, calques du français, segments mal découpés) — cite-les ;
  - « EN → FR (preuve interne) » si l'inverse ;
  - sinon « SOURCE ORIGINALE NON ÉTABLIE », éventuellement suivi de « [Inférence] direction probable … » avec les indices.
  - Pour de-ch : même logique (traduit depuis FR ou EN ?), avec preuves.
- Claims : relève les chiffres, statistiques, superlatifs, promesses (productivité, ROI, délais, « garanti », « unique », « premier »…), indique s'ils sont sourcés dans le texte (lien), et tout écart FR/EN.
- Échelle de qualité par langue :
  - `A` natif ou quasi natif, publiable en l'état ;
  - `B` correct, retouches ponctuelles (≤ 5 corrections mineures) ;
  - `C` dégradé : calques, maladresses ou erreurs fréquentes, réécriture partielle ;
  - `D` fortement dégradé : traduction automatique visible, phrases incompréhensibles, mélange de langues, retraduction complète ;
  - `X` contenu dans la mauvaise langue ou absent.
  Note la qualité linguistique ET éditoriale (un texte natif mais avec un nom propre remplacé à tort n'est pas A).

## Sortie

Pour CHAQUE famille, écris un fichier `reviews/<ID>.json` (UTF-8, JSON valide) :

```json
{
  "family": "<ID>",
  "slugs": {"fr": "...", "en": "...", "de-ch": "... ou null"},
  "sujet": "une phrase en français",
  "langue_originale": "FR → EN (preuve interne) | EN → FR (preuve interne) | SOURCE ORIGINALE NON ÉTABLIE",
  "preuve_langue": "citations exactes ou indices ; préfixe [Inférence] si ce n'est pas une preuve",
  "qualite": {"fr": "A|B|C|D|X", "en": "A|B|C|D|X", "de-ch": "A|B|C|D|X ou null"},
  "justification_qualite": {"fr": "...", "en": "...", "de-ch": "..."},
  "nb_erreurs_estime": {"fr": 0, "en": 0, "de-ch": 0},
  "erreurs": [
    {"langue": "fr|en|de-ch", "categorie": "<une des 13>", "gravite": "bloquant|majeur|mineur",
     "emplacement": "title|h1|metaTitle|description|intertitre|corps|faq|alt|legende",
     "extrait_actuel": "copie exacte", "probleme": "...", "proposition": "correction proposée ou null"}
  ],
  "claims_a_reverifier": [
    {"langue": "fr|en|de-ch|toutes", "extrait": "copie exacte", "source_dans_texte": "lien ou aucune", "motif": "...", "ecart_fr_en": "... ou null"}
  ],
  "titre_h1_meta": "diagnostic de cohérence title / H1 / metaTitle / description / corps, par langue",
  "structure_fr_en": "parité, sections ou paragraphes manquants, doublés, inversés",
  "images_alt_legendes": "diagnostic",
  "appellations": "diagnostic",
  "recommandation": "conserver | retouches | réécriture partielle | retraduction complète | arbitrage éditorial",
  "remarques": "faits datés, obsolescence, liens douteux, points nécessitant validation humaine"
}
```

Liste dans `erreurs` toutes les erreurs bloquantes et majeures, et jusqu'à 10 mineures représentatives par langue
(indique le total estimé dans `nb_erreurs_estime`). Sois précis et exhaustif : ce fichier sert à reconstruire les articles.

Quand tous tes fichiers sont écrits, réponds par un résumé très court : pour chaque ID, les notes FR/EN/de-ch et la recommandation.
