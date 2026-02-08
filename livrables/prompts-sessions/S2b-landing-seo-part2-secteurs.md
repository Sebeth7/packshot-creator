# SESSION S2b - Landing SEOs (Amazon, Industriel) + 2 nouveaux secteurs

**Modele requis : Claude Opus 4.6**
**Duree estimee : ~2h**
**Prerequis : S2a terminee (pour voir le pattern etabli)**

---

## Contexte

Tu travailles sur le projet PackshotCreator (migration Webflow -> Next.js).
- **Working directory** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`
- **Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (FR/EN)

## Documents de reference

1. **Brandbook** : `livrables/BRANDBOOK_WEB_COMPLET.md`
2. **Brandbook annexes** : `livrables/BRANDBOOK_WEB_ANNEXES.md`
3. **Rapport S2a** : `livrables/prompts-sessions/S2a-RAPPORT.md` -- LIS-LE pour reprendre le meme pattern
4. **Secteurs existants** : `data/secteurs.ts` -- structure de reference pour les 2 nouveaux secteurs
5. **Page industrie** : `app/[lang]/industrie/[slug]/page.tsx` -- template pour les secteurs

## Ta mission

2 taches : creer 2 landing SEOs supplementaires + 2 nouveaux secteurs.

---

## TACHE 1 : Landing SEOs (Amazon, Industriel)

Meme structure et patterns que les 3 pages creees en S2a. Lis le rapport S2a et les pages existantes pour reprendre exactement le meme pattern.

**IMPORTANT** : S2a a utilise le MEME slug pour FR et EN (pas de pathname differencie dans i18n/routing.ts). C'est coherent avec le pattern des pages industrie. Fais pareil : `/fr/packshot-amazon` et `/en/packshot-amazon` (meme slug). Ne touche PAS a `i18n/routing.ts` pour les pathnames.

### 4. Packshot Amazon (`/fr/packshot-amazon` | `/en/packshot-amazon`)

**Mot-cle cible FR** : "packshot amazon", "photo produit amazon", "studio photo amazon"
**Mot-cle cible EN** : "amazon packshot", "amazon product photography", "amazon photo requirements"

**H1 FR** : "Packshot Amazon : Photos Conformes aux Exigences Marketplace"
**H1 EN** : "Amazon Packshot: Product Photos That Meet Marketplace Standards"

**Benefices** :
- Fond blanc pur (RGB 255,255,255) conforme Amazon
- Detourage automatique precis
- Photo 360 pour fiches produit enrichies
- Volume : traitement par lots pour catalogues larges
- Formats optimises (JPEG, PNG, conformes aux guidelines Amazon)

**FAQ** :
- Quelles sont les exigences photo Amazon en 2026 ?
- Comment avoir un fond blanc pur pour Amazon ?
- Comment automatiser les photos produit pour une marketplace ?

**Machines** : Alphashot 360, Alphashot G2

### 5. Packshot Industriel (`/fr/packshot-industriel` | `/en/packshot-industrial`)

**Mot-cle cible FR** : "packshot industriel", "photo produit industriel", "photographie piece technique"
**Mot-cle cible EN** : "industrial packshot", "industrial product photography", "technical part photography"

**H1 FR** : "Packshot Industriel : Documentation Visuelle de Precision"
**H1 EN** : "Industrial Packshot: Precision Visual Documentation"

**Benefices** :
- Rendu des details mecaniques et techniques
- Photo 360 pour catalogues pieces detachees
- Eclairage controle pour surfaces metalliques
- Standardisation visuelle multi-references
- Integration PIM/DAM

**FAQ** :
- Comment photographier des pieces metalliques sans reflets ?
- Quel studio photo pour les pieces techniques ?
- Comment standardiser la photo produit industrielle ?

**Machines** : Alphashot XL, Alphashot Pro G2

**Action** :
- Creer les 2 pages (meme structure que S2a)
- Ajouter les pathnames dans `i18n/routing.ts`
- Ajouter les traductions dans `messages/fr.json` et `messages/en.json`

---

## TACHE 2 : 2 nouveaux secteurs

### Architecture

Ajouter 2 secteurs dans `data/secteurs.ts` en suivant exactement la meme structure que les 12 existants (interface `Secteur`).

Les pages seront automatiquement generees par `app/[lang]/industrie/[slug]/page.tsx` (route dynamique).

### Secteur 13 : Industrie Manufacturiere

```
slug: 'industrie-manufacturiere'
```

**Contenu FR** :
- Titre : "Industrie Manufacturiere"
- Hero : "Solutions Photo pour l'Industrie Manufacturiere"
- Sous-titre : "Documentez vos produits et pieces avec precision"
- Description : Focus sur la documentation technique, catalogues pieces detachees, controle qualite visuel

**Problematiques** :
- Volume important de references a documenter
- Necessite de standardisation visuelle
- Surfaces metalliques et reflectives complexes
- Integration avec les systemes PIM/ERP

**Solutions** (2-3 items avec avantages) :
- Studios automatises : productivite, regularite, integration
- Photo 360 : documentation complete, reduction des retours SAV
- IA retouche : detourage automatique, fond normalise

**CTA** : "Optimisez votre documentation produit"

### Secteur 14 : Defense et Securite

```
slug: 'defense-securite'
```

**Contenu FR** :
- Titre : "Defense et Securite"
- Hero : "Solutions Photo pour la Defense et la Securite"
- Sous-titre : "Documentation visuelle conforme aux exigences du secteur"
- Description : Focus sur la documentation de materiel, equipements, traçabilite

**Problematiques** :
- Exigences de traçabilite strictes
- Materiels et equipements de haute precision
- Confidentialite des donnees visuelles
- Normes de documentation specifiques

**Solutions** (2-3 items avec avantages) :
- Studios sur site : pas de sortie de materiel, confidentialite
- Photo 360 standardisee : documentation normalisee
- Workflow securise : donnees locales, pas de cloud

**CTA** : "Contactez-nous pour une solution adaptee"

**IMPORTANT** : Fournis aussi les traductions EN pour chaque secteur. Ajoute les traductions dans `messages/fr.json` et `messages/en.json` si les secteurs utilisent le systeme de traduction (verifie en lisant `app/[lang]/industrie/[slug]/page.tsx`).

---

## Patterns CRITIQUES

- **Secteurs** : Respecte exactement l'interface `Secteur` de `data/secteurs.ts`
- **Link** : `import { Link } from '@/i18n/routing'`
- **Params** : `{ params }: { params: Promise<{ lang: string }> }`
- **SchemaOrg** : `import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg'`
- **Bouton primaire** : `bg-very-peri-500 hover:bg-very-peri-600`
- **Pas d'emojis**

## Criteres de done

- [ ] 2 landing SEOs creees (Amazon + Industriel)
- [ ] 2 secteurs ajoutes dans `data/secteurs.ts`
- [ ] Traductions ajoutees dans les deux fichiers messages
- [ ] `npm run build` passe sans erreur
- [ ] Commits propres (1 pour landing SEOs, 1 pour secteurs)

## Compte-rendu

Ecris `/livrables/prompts-sessions/S2b-RAPPORT.md`
