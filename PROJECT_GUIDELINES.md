# PackshotCreator Migration Guidelines

## Design System Reference

**PRIMARY DESIGN REFERENCE**: `design_system_final.md`

### Color Palette (Orbitvu Official)
- **Primary Orbitvu** (CTA): #EC3655 (Rouge/Rose)
- **Secondary Orbitvu** (Liens, Accents): #24A1B4 (Turquoise)
- **Text Dark** (Body): #0D171A
- **Heading Dark**: #001D26
- **Neutral Medium**: #546E7A
- **BG Light Gray**: #F8FAFB
- **BG Off-White**: #FBFBFB
- **Accent Gold**: #FFB300
- **Accent Success**: #00C853
- **Accent Alert**: #FF6F00

### Typography
- **Headings** (H1, H2): Cairo, sans-serif (font-cairo)
- **Body & H3**: Roboto, sans-serif (font-roboto)

## Migration Rules

### RÈGLE CRITIQUE : Copie Intégrale des Pages

**Toutes les pages doivent être copiées intégralement depuis Webflow, incluant :**

1. **Tous les éléments visuels**
   - Header et navigation
   - Footer avec toutes ses sections
   - Sections intermédiaires
   - Logos clients
   - Tous les composants visuels

2. **Animations et interactions**
   - Les animations doivent être reproduites en React
   - Utiliser des équivalences React/Framer Motion si nécessaire
   - Les animations peuvent différer légèrement du Webflow original si techniquement nécessaire
   - Maintenir l'esprit et le timing des animations originales

3. **Structure et contenu**
   - Respecter l'ordre exact des sections
   - Conserver tous les textes et images
   - Maintenir la hiérarchie visuelle

### Workflow de Migration

1. **Analyse via Chrome MCP**
   - Screenshot complet de la page Webflow
   - Identification de tous les éléments
   - Documentation des animations et transitions

2. **Comparaison**
   - Vérifier tous les éléments présents
   - Identifier les éléments manquants
   - Noter les animations à reproduire

3. **Implémentation**
   - Créer les composants manquants
   - Implémenter les animations avec Framer Motion ou équivalent
   - Ajouter toutes les traductions (FR, EN, DE, ES, NL)

4. **Validation**
   - Build sans erreurs
   - Vérification visuelle
   - Test des animations
   - Validation SEO (content parity)

### Réutilisabilité des Composants (RÈGLE #7)

- Créer des composants réutilisables pour les patterns communs
- Un composant créé pour FR doit fonctionner pour EN, DE, ES, NL
- Éviter la duplication de code
- Privilégier les props pour la personnalisation

### Stack Technique

- **Framework**: Next.js 14.1.1 (App Router)
- **Styling**: Tailwind CSS v4 (inline @theme in globals.css)
- **i18n**: next-intl 4.6.1
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion (recommandé)

### Références Design

- **Design principal**: design_system_final.md
- **Design complémentaire**: brief_design_system.md
- **Benchmarks**: Orbitvu.com, Stripe.com, Photoroom.com
