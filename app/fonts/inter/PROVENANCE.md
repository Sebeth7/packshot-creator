# Inter — provenance des fichiers

Fichiers copiés sans modification depuis le dépôt officiel d'Inter, le
30/09/2026. Chargés par `app/fonts/inter.ts` via `next/font/local`.

| Fichier | Graisse | Style | Octets | SHA-256 |
|---|---|---|---|---|
| `Inter-Bold.woff2` | 700 | normal | 114 840 | `fa888127b6da015b65569f0351f3b5c391ad928904951f1c20e9f8462a8d95ea` |
| `Inter-SemiBold.woff2` | 600 | normal | 114 812 | `5cb7103e4e605989afebc03d989c79201e54b21b5183db33981f70db9178a301` |
| `LICENSE.txt` | — | — | 4 380 | `262481e844521b326f5ecd053e59b98c8b2da78c8ee1bdbb6e8174305e54935a` |

- **Projet** : Inter, The Inter Project Authors — https://github.com/rsms/inter
- **Version** : Inter 4.1 (tag `v4.1`) ; table `name` des polices :
  `Version 4.001;git-9221beed3`
- **Chemins source** :
  `https://raw.githubusercontent.com/rsms/inter/v4.1/docs/font-files/Inter-Bold.woff2`,
  `…/Inter-SemiBold.woff2`, `https://raw.githubusercontent.com/rsms/inter/v4.1/LICENSE.txt`
- **Contrôle croisé** : SHA-256 identiques sur le site officiel
  (`https://rsms.me/inter/font-files/Inter-Bold.woff2?v=4.1`, idem SemiBold).
- **Licence** : SIL Open Font License 1.1, `LICENSE.txt` ci-contre, tel que
  publié au tag `v4.1`. Aucun nom de police réservé (Reserved Font Name) n'y
  est déclaré.

Contrôle :

```bash
sha256sum app/fonts/inter/*.woff2 app/fonts/inter/LICENSE.txt
```

## `unicode-range`

Les deux appels `localFont` (`app/fonts/inter.ts`,
`app/etude-clients-2026/layout.tsx`) limitent Inter aux 1 622 caractères que
Google servait avant le 30/09/2026 : pour chacun des 7 fichiers `woff2`
téléchargés par l'ancien `next/font/google` au build de `main` `a8c85ca`
(sous-ensembles latin, latin-ext, cyrillic, cyrillic-ext, greek, greek-ext,
vietnamese), intersection de sa table `cmap` et de son `unicode-range`, puis
union. Même résultat pour 700 seul et pour 400 à 700.

Effet : un caractère que les fichiers Google ne contenaient pas (« → »,
espace fine insécable U+202F du formatage français des prix, etc.) reste rendu
par la police de repli, comme avant, et non par Inter.
