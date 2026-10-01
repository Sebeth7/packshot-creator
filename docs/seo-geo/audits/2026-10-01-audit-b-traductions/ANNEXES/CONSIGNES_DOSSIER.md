# Consignes — dossier de retraduction P1 (audit B, 01/10/2026)

Mode : LECTURE SEULE du dépôt `/home/user/packshot-creator`. N'écris QUE dans le dossier de sortie indiqué.
Aucun accès web, aucun appel payant. `git show` / `git log` autorisés.

## Entrées (déjà prêtes dans le dossier de sortie ou le scratchpad)

- `01-TEXTE_ACTUEL.md` : texte intégral actuellement servi, toutes langues (ne pas modifier) ;
- `02-ORIGINAL_RETROUVE.md` : version de l'import Webflow (`56d4bc32`, 18/04/2026), historique et écarts (ne pas modifier) ;
- revue linguistique de la famille : `ANNEXES/RELECTURES_JSON/<ID>.json` ;
- extrait balisé : `(extraits de travail non conservés) families/<ID>.md` ;
- requêtes GSC : `ANNEXES/GSC_REQUETES_P1.md` ;
- JSON source : `content/blog/<lang>/<slug>.json`.

## Fichiers à écrire

1. `00-FICHE.md` — identité (ID, URL des langues, trafic fourni dans la consigne, PR concernée), origine linguistique et preuve
   (reprendre la revue ; si non prouvée : « SOURCE ORIGINALE NON ÉTABLIE »), verdict par langue, résumé des décisions proposées.
2. `03-ANOMALIES_ANNOTEES.md` — toutes les anomalies, par langue, dans l'ordre du texte : extrait actuel mot pour mot,
   catégorie, gravité, explication, correction retenue dans la proposition. Vérifie chaque anomalie de la revue contre
   `01-TEXTE_ACTUEL.md` ; complète-la si tu en trouves d'autres ; retire celles qui sont fausses en le signalant.
3. `04-PROPOSITION_FR.md` — texte FR corrigé INTÉGRAL (titre, chapeau, intertitres, paragraphes, listes, tableaux,
   images, légendes, FAQ), même ordre et même structure que l'actuel, prêt à être converti en HTML.
4. `04-PROPOSITION_EN.md` — texte EN INTÉGRAL retraduit depuis `04-PROPOSITION_FR.md`.
5. `04-PROPOSITION_DE-CH.md` — seulement si la famille a une version de-ch : adaptation depuis `04-PROPOSITION_FR.md`.
6. `05-METADONNEES_PROPOSEES.md` — par langue : `title`, `h1`, `metaTitle` (cible ≤ 60 caractères, compte indiqué),
   `description` (cible 140-155 caractères, compte indiqué), `alt` de chaque image (avec `src`), légendes, catégorie ;
   valeur actuelle → valeur proposée → justification (requêtes GSC à préserver). **Slug : conservé** dans tous les cas ;
   si le slug pose un problème (faute, langue), écris seulement l'analyse : risque SEO, redirection nécessaire (Worker ou
   `next.config.ts`), mise à jour de `alternates.json`, et recommandation — sans le changer.
7. `06-VALIDATION_HUMAINE.md` — liste numérotée des points qui exigent une décision humaine, avec le nom du décideur
   pressenti (Sébastien : copywriting FR, faits commerciaux, produits, prix, conformité distributeur ; Laurent : historique
   de la société, SEO ; les deux : noms de personnes, témoignages), et ce qui se passe si on ne tranche pas.

## Règles de rédaction

- **Rédaction native, naturelle et experte**, sans style artificiel d'IA (pas de « plongeons », « dans un monde où »,
  « révolutionner », listes à rallonge, emphase creuse). Pas de Title Case en français. Pas de traduction mot à mot.
- **Aucun fait métier, chiffre, anecdote, source, nom, date ou fonctionnalité inventés.** La proposition ne contient que
  l'information déjà présente dans le texte actuel ou dans la version importée (`02`). Si une phrase est incompréhensible
  et que le sens ne peut pas être reconstitué avec certitude, propose la reformulation la plus prudente et marque-la
  `[À VALIDER : …]`.
- **Claims** : ne jamais renforcer. Un chiffre ou une promesse sans source dans le texte reste tel quel ou est formulé plus
  prudemment, et il est TOUJOURS listé dans `06`. Ne pas supprimer un claim sans le signaler dans `03` et `06`.
- **Préserver** : informations produit exactes, liens et sources documentaires (mêmes cibles d'URL, ancres traduites),
  images (même `src`, ordre identique), crédits et provenance des illustrations, structure des tableaux, nuances
  réglementaires, FAQ (mêmes questions, corrigées).
- **Noms** : Orbitvu, PackshotCreator (en un mot, marque), Alphashot, Shotflow (graphie du site : vérifier dans le
  texte actuel et retenir une graphie unique, signalée dans `06`). Si un nom de personne a été remplacé à tort par
  « PackshotCreator » (commits `8ae45f63`, `4dde4f23`), la proposition rétablit la version importée ET le signale dans
  `06` (décision Laurent + Sébastien).
- **Textes alternatifs** : décrire ce que l'image montre d'après le nom de fichier, la légende, l'alt existant et le texte
  autour ; si c'est insuffisant, écrire une proposition prudente suivie de `[à vérifier sur l'image]`. Jamais
  `__wf_reserved_inherit`, jamais d'alt dans une autre langue.
- **FR** : typographie française (espace insécable avant « : ; ? ! », guillemets « », nombres « 19 734 », décimales à virgule).
- **EN** : anglais américain (usage du dépôt : color, catalog, jewelry), typographie anglaise. La version EN suit le FR
  corrigé, mais garde les termes que la requête EN recherche (voir `GSC_REQUETES_P1.md`) dans `title`, `h1` et intertitres
  quand c'est naturel.
- **de-ch** : allemand standard suisse, « ss » jamais « ß », pas de transposition d'une règle UE ou française comme si elle
  s'appliquait en Suisse (D38), aucun prix ni devise ajoutés (D30), aucun témoignage client ajouté (D31) ; signaler dans `06`
  tout témoignage existant.
- Gouvernance à rappeler en tête de `04-PROPOSITION_FR.md` : « Proposition — non publiée. Le texte français client-facing
  relève de la validation de Sébastien (D42 étape 5 ; `01-RAYON-ACTION.md`). La version EN et la version de-ch se
  recalent sur le FR validé (D38, D42 étape 7). »
- Mets entre crochets `[…]` toute note éditoriale dans les propositions ; tout le reste doit être du texte publiable.

Quand tous les fichiers sont écrits, réponds en 10 lignes maximum : fichiers écrits, nombre d'anomalies, points à valider.
