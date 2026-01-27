# Scripts de Migration Blog

## Migration MDX → Sanity Portable Text

### Description
Ce script migre le contenu des articles MDX incomplets vers Sanity CMS en utilisant l'API Sanity directe.

### Prérequis
- Token API Sanity configuré dans `.env.local`
- Fichiers MDX sources présents dans `/content/blog/`
- Articles déjà créés dans Sanity (métadonnées existantes)

### Utilisation

```bash
npm run migrate:blog
```

### Articles ciblés
Le script migrera automatiquement les articles suivants :

1. ✅ `ia-photo-produit-guide-2026` (3799 mots)
2. ✅ `orbitvu-vs-concurrents` (1857 mots)
3. ✅ `guide-achat-studio-2026` (3001 mots)

### Fonctionnement

1. **Lecture** : Lit le fichier MDX source
2. **Parsing** : Extrait le frontmatter et le contenu
3. **Conversion** : Convertit le Markdown en Portable Text
   - Titres H2/H3
   - Paragraphes
   - Listes à puces
4. **Upload** : Met à jour le document Sanity via API
5. **Validation** : Confirme la migration

### Format Portable Text

Le script convertit automatiquement :
- `## Titre` → Bloc H2
- `### Sous-titre` → Bloc H3
- Paragraphes normaux → Blocs de texte
- `- Item` → Liste à puces

### Limitations actuelles

⚠️ Les composants MDX personnalisés ne sont pas migrés automatiquement :
- `<Callout>` → À recréer manuellement dans Sanity
- `<ComparisonTable>` → À recréer manuellement dans Sanity

Ces composants peuvent être ajoutés après la migration via l'interface Sanity Studio.

### Vérification post-migration

Après l'exécution, vérifiez dans Sanity Studio :
1. Ouvrir l'article migré
2. Vérifier que le contenu est complet
3. Ajouter les composants custom si nécessaire
4. Publier l'article

### Dépannage

**Erreur "Document non trouvé"** :
- Vérifiez que l'article existe dans Sanity
- Vérifiez le slug dans Sanity (doit correspondre au nom du fichier MDX)

**Erreur "Unauthorized"** :
- Vérifiez que `SANITY_API_TOKEN` est défini dans `.env.local`
- Vérifiez que le token a les droits d'écriture

**Contenu manquant** :
- Vérifiez que le fichier MDX source existe dans `/content/blog/`
- Vérifiez que le contenu MDX est bien formaté
