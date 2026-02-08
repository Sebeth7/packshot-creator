# SESSION S0 - Corrections immediates

**Modele requis : Claude Opus 4.6**
**Duree estimee : ~30 min**
**Prerequis : Aucun**

---

## Contexte

Tu travailles sur le projet PackshotCreator (migration Webflow -> Next.js).
- **Working directory** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`
- **Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (FR/EN)
- Le site est LIVE sur packshot-creator.com. Teste en local (`npm run dev` port 3333) avant de committer.

## Ta mission

Corriger 3 problemes immediats identifies lors de l'audit. Chaque correction doit etre commitee separement.

---

## Tache 1 : Corriger les redirections 404

**Fichier** : `next.config.ts`

Deux redirections pointent vers `/fr/e-commerce` qui **n'existe pas** comme route :

- **Ligne 45** : `{ source: '/e-commerce', destination: '/fr/e-commerce', statusCode: 301 }`
  - Changer destination en `/fr/blog`
- **Ligne 67** : `{ source: '/packshot-secteur-e-commerce', destination: '/fr/e-commerce', statusCode: 301 }`
  - Changer destination en `/fr/blog`

**Verification** : Apres modification, lance `npm run build` pour verifier qu'il n'y a pas d'erreur.

---

## Tache 2 : Corriger les liens AIFeaturesGrid

**Fichier** : `components/sections/AIFeaturesGrid.tsx`

4 liens cassés pointent vers `/blendai#*` :
- Ligne 18 : `/blendai#lifestyle`
- Ligne 24 : `/blendai#background`
- Ligne 30 : `/blendai#retouche`
- Ligne 36 : `/blendai#batch`

**Action** :
1. D'abord, lis `app/[lang]/ia-photo-produit/page.tsx` pour identifier les sections existantes et leurs IDs
2. Remplace les 4 liens par des liens vers `/ia-photo-produit` avec les bons anchors (ajoute des `id=""` dans ia-photo-produit si necessaire)
3. Les liens doivent utiliser `Link` de `@/i18n/routing` (pas `next/link`)
4. Si la page ia-photo-produit n'a pas de sections clairement separees, utilise simplement `/ia-photo-produit` sans anchor

---

## Tache 3 : Nettoyer les references ShotFlow

**Decision PO** : ShotFlow est OBSOLETE. Ne pas migrer, supprimer les references internes.

**References trouvees** :

### A GARDER (redirect SEO) :
- `next.config.ts:88` : `{ source: '/gestion-workflow-shotflow', destination: '/fr/ia-photo-produit', statusCode: 301 }` -- NE PAS TOUCHER

### A MODIFIER :

1. **`app/[lang]/a-propos/page.tsx` ligne 48** :
   - Timeline 2024 mentionne "partenariat ShotFlow"
   - Remplacer par un texte neutre, ex: "Alphashot Pro G2 et innovations IA" / "Alphashot Pro G2 and AI innovations"

2. **`messages/fr.json` lignes 49-57** : Section complete `"shotflow": { ... }`
   - Supprimer toute la section "shotflow" du JSON
   - Verifier qu'aucun composant n'importe ces cles de traduction (chercher `shotflow` dans les .tsx)
   - Si un composant utilise ces cles, le modifier pour ne plus les utiliser

3. **`messages/en.json` lignes 49-57** : Meme traitement

**ATTENTION** : Apres suppression des cles de traduction, verifier que les fichiers JSON restent syntaxiquement valides (virgules, accolades). Lance `npm run build` pour verifier.

---

## Patterns a respecter

- **Link** : Toujours depuis `@/i18n/routing`, JAMAIS `next/link`
- **Pas d'emojis** : Utiliser Lucide icons uniquement
- **Commits** : Un commit par tache (3 commits au total)

## Criteres de done

- [ ] `npm run build` passe sans erreur
- [ ] Les 2 redirections pointent vers `/fr/blog`
- [ ] Les 4 liens AIFeaturesGrid pointent vers `/ia-photo-produit`
- [ ] Aucune reference interne a ShotFlow (sauf la redirection 301 dans next.config.ts)
- [ ] 3 commits propres

## Compte-rendu

A la fin, ecris un fichier `/livrables/prompts-sessions/S0-RAPPORT.md` avec :
- Ce qui a ete fait
- Ce qui a pose probleme (le cas echeant)
- Verifications effectuees
