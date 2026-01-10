# Images Requises pour l'Article IA Photo Produit 2026

## Article : ia-photo-produit-guide-2026.mdx

### Image de couverture principale
**Fichier** : `ia-photo-produit-2026-cover.jpg`
**Spécifications** :
- Dimensions : 1200×630px (format OpenGraph)
- Format : JPEG optimisé (max 200KB)
- Contenu suggéré : Montage avant/après montrant transformation packshot → lifestyle via IA

---

## Images Complémentaires Recommandées (7-10 images)

### 1. Exemples avant/après Lifestyle Generator
**Fichiers** :
- `lifestyle-before-bijou.jpg` (packshot fond blanc bague)
- `lifestyle-after-bijou.jpg` (bague portée sur main, décor luxe)
- `lifestyle-before-chaussure.jpg` (chaussure fond blanc)
- `lifestyle-after-chaussure.jpg` (chaussure mise en scène urbaine)

**Spécifications** :
- Dimensions : 800×800px minimum
- Format : JPEG ou PNG
- Poids max : 150KB par image

---

### 2. Exemples Background Generator
**Fichiers** :
- `background-exemple-1.jpg` (produit cosmétique, fond nature)
- `background-exemple-2.jpg` (produit tech, fond abstrait)

**Spécifications** :
- Dimensions : 800×800px minimum
- Format : JPEG
- Poids max : 150KB par image

---

### 3. Schéma workflow visuel
**Fichier** : `workflow-studio-ia-ecommerce.jpg` ou `.svg`
**Contenu** : Diagramme illustrant le workflow 4 étapes :
1. Studio Orbitvu → Packshot
2. Export PNG/TIFF
3. Traitement IA (BlendAI)
4. QA + Export e-commerce

**Spécifications** :
- Dimensions : 1200×600px (format large)
- Format : SVG (vectoriel) ou PNG haute qualité
- Police : Cairo (cohérence avec la charte)

---

### 4. Captures écran interfaces
**Fichiers** :
- `blendai-interface.jpg` (screenshot interface BlendAI)
- `photoroom-interface.jpg` (screenshot interface Photoroom)
- `flair-interface.jpg` (screenshot interface Flair)

**Spécifications** :
- Dimensions : 1200×800px
- Format : JPEG optimisé (max 200KB)
- Annotations possibles (flèches, cadres) pour guider le lecteur

---

## Alternative : Images Placeholder

En attendant les vraies images, vous pouvez utiliser des placeholders :

```bash
# Créer des images placeholder avec ImageMagick (si installé)
convert -size 1200x630 xc:#00BCD4 -pointsize 60 -fill white -gravity center \
  -annotate +0+0 "IA Photo Produit\n2026" \
  public/blog/ia-photo-produit-2026-cover.jpg
```

Ou utiliser un service comme :
- https://placehold.co/1200x630/00BCD4/FFFFFF?text=IA+Photo+Produit+2026
- https://via.placeholder.com/1200x630/00BCD4/FFFFFF?text=Cover

---

## Checklist Images

- [ ] ia-photo-produit-2026-cover.jpg (1200×630px)
- [ ] lifestyle-before-bijou.jpg (800×800px)
- [ ] lifestyle-after-bijou.jpg (800×800px)
- [ ] lifestyle-before-chaussure.jpg (800×800px)
- [ ] lifestyle-after-chaussure.jpg (800×800px)
- [ ] background-exemple-1.jpg (800×800px)
- [ ] background-exemple-2.jpg (800×800px)
- [ ] workflow-studio-ia-ecommerce.svg ou .png (1200×600px)
- [ ] blendai-interface.jpg (1200×800px)
- [ ] photoroom-interface.jpg (1200×800px)
- [ ] flair-interface.jpg (1200×800px)

---

**Note** : Pour l'instant, l'article fonctionnera même sans les images (elles seront en erreur 404 mais ne bloqueront pas le rendu). Priorisez l'image de couverture pour le SEO/OG.
