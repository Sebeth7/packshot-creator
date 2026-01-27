# PROMPT SESSION - VÉRIFICATION FINALE ARTICLES BLOG SANITY

**Date** : 24 janvier 2026
**Objectif** : Vérifier la complétude de TOUS les articles blog dans Sanity CMS
**Priorité** : 🔴 CRITIQUE - Dernière vérification avant production

---

## 🎯 CONTEXTE

La migration MDX → Sanity CMS a été effectuée avec succès pour **3/8 articles** via l'API Sanity :
- ✅ `ia-photo-produit-guide-2026` (3799 mots → 355 blocs) - Vérifié complet
- ✅ `orbitvu-vs-concurrents` (1857 mots → 284 blocs) - Vérifié complet
- ✅ `guide-achat-studio-2026` (3001 mots → 563 blocs) - Vérifié complet

**Statut actuel** : ~95% complété
**Reste à faire** : Vérifier les **5 autres articles** pour s'assurer de leur complétude

---

## 📋 TÂCHES À ACCOMPLIR

### Tâche 1 : Vérifier les 2 articles NON VÉRIFIÉS

Ces 2 articles ont été créés dans Sanity mais leur contenu n'a **jamais été vérifié** :

1. **`blendai-vs-photoroom`**
   - MDX source : 2,089 mots (fichier `/content/blog/blendai-vs-photoroom.mdx`)
   - Catégorie : "IA & Technologie"
   - Vérifier : Contenu complet dans Sanity ? Ou juste métadonnées ?

2. **`blendai-vs-flair`**
   - MDX source : 2,475 mots (fichier `/content/blog/blendai-vs-flair.mdx`)
   - Catégorie : "IA & Technologie"
   - Vérifier : Contenu complet dans Sanity ? Ou juste métadonnées ?

**Action** :
- Ouvrir chaque article dans Sanity Studio (`http://localhost:3000/studio`)
- Scroller dans le champ "Content" pour vérifier la présence de **plusieurs sections H2/H3** et paragraphes
- Critère de succès : Contenu > 5 paragraphes minimum (pas juste 1-2 paragraphes d'intro)

**Si incomplets** : Utiliser le script de migration `/scripts/migrate-mdx-to-sanity.js` pour les migrer

---

### Tâche 2 : Vérifier les 3 articles "Présumés complets"

Ces 3 articles ont été marqués comme "complets" lors de la vérification manuelle Chrome initiale, mais **sans vérification approfondie** :

3. **`formation-photo-produit`**
   - MDX source : 3,715 mots
   - Reading time Sanity : 11 minutes
   - Vérifier : Vraiment 3715 mots de contenu ou juste métadonnées + 1 paragraphe ?

4. **`financement-formation-opco-guide`**
   - MDX source : 2,786 mots
   - Reading time Sanity : 10 minutes
   - Vérifier : Vraiment ~2800 mots ou juste intro ?

5. **`calculer-roi-studio-photo-guide`**
   - MDX source : 1,922 mots
   - Reading time Sanity : Vérifier dans Sanity
   - Vérifier : Vraiment ~1900 mots ou juste intro ?

**Action** :
- Ouvrir chaque article dans Sanity Studio
- Scroller dans le champ "Content" sur **toute la hauteur** pour évaluer la longueur réelle
- Comparer visuellement avec l'article `ia-photo-produit-guide-2026` (355 blocs) qui est **confirmé complet**
- Si un article semble beaucoup plus court alors qu'il devrait avoir un nombre de mots similaire → INCOMPLET

**Critères de validation** :
- Article de ~2000 mots → Devrait avoir ~250-300 blocs Portable Text minimum
- Article de ~3000 mots → Devrait avoir ~400-500 blocs Portable Text minimum
- Présence de multiples titres H2 (au moins 5-8 sections)
- Scroll dans le champ Content doit prendre plusieurs secondes

**Si incomplets** : Ajouter leur slug au script de migration et exécuter :
```javascript
// Dans /scripts/migrate-mdx-to-sanity.js, modifier :
const ARTICLES_TO_MIGRATE = [
  'nom-article-incomplet-1',
  'nom-article-incomplet-2',
]
```
Puis `npm run migrate:blog`

---

## 🔧 OUTILS DISPONIBLES

### Scripts de migration (dans `/scripts/`)

1. **`migrate-mdx-to-sanity.js`** - Migration automatique MDX → Sanity
   ```bash
   npm run migrate:blog
   ```

2. **`fix-missing-keys.js`** - Correction des _key manquantes (si warning Sanity)
   ```bash
   node scripts/fix-missing-keys.js
   ```

3. **`find-slug.js`** - Liste tous les articles avec leurs slugs
   ```bash
   node scripts/find-slug.js
   ```

### Environnement

- **Sanity Studio** : `http://localhost:3000/studio/structure/blogPost`
- **Token API** : Déjà configuré dans `.env.local` (permissions Developer)
- **Fichiers MDX sources** : `/content/blog/*.mdx`

---

## ✅ CRITÈRES DE RÉUSSITE

### Pour CHAQUE article vérifié

- [ ] Article ouvert dans Sanity Studio
- [ ] Champ "Content" scrollé jusqu'en bas
- [ ] Présence de multiples sections (H2, H3)
- [ ] Longueur du contenu cohérente avec le nombre de mots MDX source
- [ ] Pas de warning "Missing keys" (si warning → corriger avec `fix-missing-keys.js`)
- [ ] Article marqué comme "Published" (pas "Draft")

### Pour la session complète

- [ ] **8/8 articles** vérifiés individuellement
- [ ] **8/8 articles** ont un contenu complet (pas juste métadonnées)
- [ ] Liste finale des articles incomplets identifiés (si aucun → ✅ 100% complet)
- [ ] Si articles incomplets trouvés → Migration effectuée via script API
- [ ] Document de session créé avec résumé (voir template ci-dessous)

---

## 📊 TEMPLATE RAPPORT DE SESSION

Créer un fichier `VERIFICATION_FINALE_ARTICLES_SESSION.md` avec :

```markdown
# RAPPORT VÉRIFICATION FINALE ARTICLES BLOG

**Date** : [DATE]
**Durée session** : [DURÉE]

## Résultats Vérification

### Articles COMPLETS (X/8)

| Slug | Mots MDX | Blocs Sanity | Statut | Vérifié |
|------|----------|--------------|--------|---------|
| ia-photo-produit-guide-2026 | 3799 | 355 | ✅ Complet | ✅ Session précédente |
| ... | ... | ... | ... | ... |

### Articles INCOMPLETS (X/8)

| Slug | Problème détecté | Action prise |
|------|------------------|--------------|
| ... | Contenu court | Migration via script |

## Actions Effectuées

1. [ ] Vérification blendai-vs-photoroom
2. [ ] Vérification blendai-vs-flair
3. [ ] Vérification formation-photo-produit
4. [ ] Vérification financement-formation-opco-guide
5. [ ] Vérification calculer-roi-studio-photo-guide
6. [ ] Migration des articles incomplets (si applicable)
7. [ ] Correction des _key (si applicable)

## Statut Final

- **Articles complets** : X/8 (X%)
- **Articles incomplets migrés** : X
- **Prêt pour production** : ✅ OUI / ❌ NON

## Prochaines Étapes

[Si 100% complet] → Tests front-end des articles sur le site
[Si incomplet] → Actions correctives nécessaires
```

---

## 🚨 CAS PARTICULIERS

### Si un article est en mode "Draft"

Utiliser le script `/scripts/publish-draft.js` (à adapter pour le bon ID) :
```bash
node scripts/publish-draft.js
```

### Si warning "Missing keys" apparaît

```bash
node scripts/fix-missing-keys.js
```

Puis recharger Sanity Studio (F5)

### Si le contenu Sanity semble corrompu

1. Vérifier que le fichier MDX source existe : `/content/blog/[slug].mdx`
2. Ajouter le slug à `ARTICLES_TO_MIGRATE` dans le script
3. Relancer la migration : `npm run migrate:blog`
4. Corriger les keys : `node scripts/fix-missing-keys.js`

---

## 📝 NOTES IMPORTANTES

### Limitations connues de la migration automatique

Le script convertit :
- ✅ Titres H2, H3
- ✅ Paragraphes
- ✅ Listes à puces

**NON convertis** (ignorés volontairement) :
- ❌ Composants `<Callout>` (peuvent être recréés manuellement après si nécessaire)
- ❌ Composants `<ComparisonTable>` (peuvent être recréés manuellement après si nécessaire)

Ces composants custom sont optionnels et peuvent être ajoutés via Sanity Studio après migration.

### Token API Sanity

Le token actuel a les permissions **Developer** (lecture + écriture).
Si erreur "Unauthorized" → Vérifier que `SANITY_API_TOKEN` est bien défini dans `.env.local`

---

## 🎯 OBJECTIF SESSION

**À la fin de cette session, tu dois pouvoir répondre** :

1. Combien d'articles sont **réellement complets** dans Sanity ? (X/8)
2. Quels articles étaient incomplets et ont été migrés ?
3. Le contenu Sanity est-il prêt pour la production ?

**Critère de succès** : **8/8 articles (100%)** avec contenu complet dans Sanity CMS.

---

**Document créé le** : 24 janvier 2026
**Pour session** : Vérification finale articles blog
**Temps estimé** : 30-45 minutes
