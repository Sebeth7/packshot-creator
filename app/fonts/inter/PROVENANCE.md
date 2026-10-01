# Inter — provenance des fichiers

Servis par `next/font/local` : les deux sous-ensembles `*-subset.woff2`,
dérivés des fichiers officiels Inter 4.1 archivés dans `source/`.

## Sources officielles (`source/`, non modifiées, non servies)

Copiées le 30/09/2026 depuis le dépôt officiel d'Inter.

| Fichier | Graisse | Style | Octets | SHA-256 |
|---|---|---|---|---|
| `source/Inter-Bold.woff2` | 700 | normal | 114 840 | `fa888127b6da015b65569f0351f3b5c391ad928904951f1c20e9f8462a8d95ea` |
| `source/Inter-SemiBold.woff2` | 600 | normal | 114 812 | `5cb7103e4e605989afebc03d989c79201e54b21b5183db33981f70db9178a301` |
| `LICENSE.txt` | — | — | 4 380 | `262481e844521b326f5ecd053e59b98c8b2da78c8ee1bdbb6e8174305e54935a` |

- **Projet** : Inter, The Inter Project Authors — https://github.com/rsms/inter
- **Version** : Inter 4.1 (tag `v4.1`) ; table `name` des polices :
  `Version 4.001;git-9221beed3`
- **Chemins source** :
  `https://raw.githubusercontent.com/rsms/inter/v4.1/docs/font-files/Inter-Bold.woff2`,
  `…/Inter-SemiBold.woff2`, `https://raw.githubusercontent.com/rsms/inter/v4.1/LICENSE.txt`
- **Contrôle croisé** : SHA-256 identiques sur le site officiel
  (`https://rsms.me/inter/font-files/Inter-Bold.woff2?v=4.1`, idem SemiBold).

## Sous-ensembles dérivés (servis)

| Fichier | Graisse | Style | Octets | Codepoints | SHA-256 |
|---|---|---|---|---|---|
| `Inter-Bold-subset.woff2` | 700 | normal | 34 200 | 359 | `3692699bf9e472903a20c5dc92da3499caa4eabbbd421dd5f1bffb52fffdd3ed` |
| `Inter-SemiBold-subset.woff2` | 600 | normal | 34 200 | 359 | `8003c20a6ef04fba5cd33954ffdbdc3c73628cb7b36bd0dd0d1f38ef4600f410` |

- **Outil** : `pyftsubset` de fontTools 4.66.1, compression WOFF2 par
  brotli 1.2.0 (Python 3.11). Sortie identique, au SHA-256 près, sur deux
  exécutions.
- **Commande exacte**, lancée depuis `app/fonts/inter/` :

  ```bash
  for w in Bold SemiBold; do
    pyftsubset source/Inter-$w.woff2 \
      --unicodes-file=subset-unicodes.txt \
      --layout-features='*' --name-IDs='*' --name-languages='*' \
      --flavor=woff2 --output-file=Inter-$w-subset.woff2
  done
  ```

- **Codepoints conservés** : `subset-unicodes.txt` (359, commentés par groupe).
  - **Latin de base et Latin-1** (225) : le sous-ensemble « latin » que Google
    servait avant #72. Lettres A-Z et a-z, chiffres, ponctuation, accents
    français, Œ œ, Ä Ö Ü ä ö ü ß, « » ‹ ›, ’ ‘ “ ” „ ‚, – —, …, €, % + / &,
    parenthèses et crochets, espaces U+00A0 et U+2009.
  - **Latin étendu A** (124, U+0100-017F) : langues européennes à alphabet
    latin (Ÿ, Ł, Š, Ž, Ő, Ş, Ğ…).
  - **Roumain et allemand** (5) : Ș ș Ț ț et l'eszett majuscule ẞ.
  - **Liste explicite** (5) : U+202F (espace fine insécable), U+2007,
    U+2010-2012. Ces caractères sont dans le fichier, mais exclus de
    `unicode-range`.
- **Conservé tel quel** : toutes les fonctionnalités OpenType des glyphes
  retenus (`kern`, `calt`, `case`, `ss01`…), les métriques verticales,
  `xAvgCharWidth`, les avances, et les mentions de licence de la table `name`
  (IDs 13 et 14).

## `unicode-range`

Les deux appels `localFont` (`app/fonts/inter.ts`,
`app/etude-clients-2026/layout.tsx`) déclarent les codepoints du fichier que
Google servait aussi avant #72, soit 354. Calcul : pour chacun des 7 fichiers
`woff2` téléchargés par l'ancien `next/font/google` au build de `main`
`8ec89c1`, on prend l'intersection de sa table `cmap` et de son
`unicode-range`, on fait l'union, puis on l'intersecte avec
`subset-unicodes.txt`.

Ce qui reste rendu par la police de repli, comme avant #72 :

- U+202F, U+2007, U+2010-2012 : absents des fichiers Google ;
- tout caractère hors du fichier, dont « → » (U+2192).

Ce qui passe d'Inter au repli : les autres caractères que Google couvrait
(Latin étendu B hors Ș ș Ț ț, alphabet phonétique, vietnamien, grec,
cyrillique). Aucun n'apparaît dans le texte rendu en Inter le 01/10/2026.

## Police de repli

`app/fonts/inter-fallback.css` déclare `Inter Fallback` (`local('Arial')`)
avec les métriques que `next/font/google` générait pour Inter avant #72 :
`ascent-override` 90,44 %, `descent-override` 22,52 %, `line-gap-override` 0 %,
`size-adjust` 107,12 %. Ce sont les valeurs de
`calculateSizeAdjustValues('Inter')` (`next/dist/server/font-utils`,
Next 16.1.1), identiques dans les deux feuilles du build de `main` `8ec89c1`.

Les deux appels `localFont` passent `adjustFontFallback: false` et
`fallback: ['Inter Fallback']`. Sans cela, `next/font/local` recalcule ces
métriques à partir des avances du fichier Bold (`size-adjust` 111,36 %).
Mesuré avec une police « Arial » : ce recalcul faisait passer le décalage au
chargement de `/fr/packshot-mode` (390 px) de 0,0001 à 0,0339 et élargissait
de 5,06 px les titres contenant « → ».

## Licence

SIL Open Font License 1.1 : `LICENSE.txt`, tel que publié au tag `v4.1`, non
modifié.

La licence autorise la modification : « to use, study, copy, merge, embed,
modify, redistribute ». Un sous-ensemble est une « Modified Version » au sens
de la licence (« deleting […] any of the components »).

Seule restriction de nom : la condition 3, qui vise les noms réservés
(« Reserved Font Name »). La mention de copyright du tag `v4.1` n'en déclare
aucun : « Copyright (c) 2016 The Inter Project Authors
(https://github.com/rsms/inter) ». Le nom « Inter » peut donc être conservé.

Conditions respectées :

- le fichier de licence accompagne les polices (condition 2) ;
- les sous-ensembles restent sous OFL 1.1 (condition 5) ;
- les polices ne sont pas vendues seules (condition 1).

## Contrôle

```bash
sha256sum app/fonts/inter/source/*.woff2 app/fonts/inter/*-subset.woff2 app/fonts/inter/LICENSE.txt
```
