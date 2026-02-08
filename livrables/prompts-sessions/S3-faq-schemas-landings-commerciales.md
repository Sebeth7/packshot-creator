# SESSION S3 - FAQPage Schemas + Landings commerciales

**Modele requis : Claude Opus 4.6**
**Duree estimee : ~1.5h**
**Prerequis : S0, S2a/S2b terminees**

---

## Contexte

Tu travailles sur le projet PackshotCreator (migration Webflow -> Next.js).
- **Working directory** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`
- **Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (FR/EN)

## Documents de reference

1. **SchemaOrg existant** : `components/seo/SchemaOrg.tsx` -- les schemas JSON-LD existants
2. **Data Webflow pages** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/data-webflow/pages/` -- contenu source des landings
3. **Brandbook** : `livrables/BRANDBOOK_WEB_COMPLET.md`

## Ta mission

2 taches : ajouter FAQPage schemas sur les pages existantes + creer 2-3 landing commerciales.

---

## TACHE 1 : Ajouter FAQPage schema aux pages existantes

### Etat actuel

Le schema FAQPage est utilise dans :
- `app/[lang]/page.tsx` (homepage)
- `app/[lang]/guide/[slug]/page.tsx` (guides)

Il manque sur :
- **12 pages industrie** (FR + EN = 24 pages) : `app/[lang]/industrie/[slug]/page.tsx`
- **Page academy hub** : `app/[lang]/academy/page.tsx`

### Action pour les pages industrie

1. Lis `app/[lang]/industrie/[slug]/page.tsx` pour comprendre la structure actuelle
2. Lis `data/secteurs.ts` -- verifie si les secteurs ont deja des FAQ dans leurs donnees
3. Si les FAQ n'existent pas dans les donnees secteurs :
   - Ajoute un champ optionnel `faq?: { question: string; answer: string }[]` a l'interface `Secteur`
   - Ajoute 3-5 FAQ pertinentes pour chaque secteur (en FR)
   - Les FAQ doivent etre specifiques au secteur (pas generiques)
4. Integre le schema FAQPage dans la page industrie/[slug]
5. Utilise `faqSchema()` de `SchemaOrg.tsx` -- s'il n'existe pas, cree-le

### Action pour la page academy

1. Lis `app/[lang]/academy/page.tsx`
2. Ajoute 5 FAQ pertinentes sur les formations :
   - Les formations sont-elles certifiantes ?
   - Comment financer ma formation via OPCO ?
   - Quelles formations packshot proposez-vous ?
   - Les formations incluent-elles la pratique ?
   - Peut-on suivre les formations a distance ?
3. Integre le schema FAQPage

### Schema FAQPage

Si `faqSchema` n'existe pas dans SchemaOrg.tsx, le creer :

```typescript
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
```

---

## TACHE 2 : Landings commerciales (depuis Webflow)

### Pages a creer

Lis les fichiers source dans `data-webflow/pages/` pour recuperer le contenu :

1. **`/fr/besoins-photographie-produit`** (+ EN)
   - Landing commerciale "Trouvez votre solution"
   - Source : `data-webflow/pages/` (cherche le fichier correspondant)
   - Structure : hero + questionnaire/guide + CTA

2. **`/fr/ancien-studio-photo`** -- DEJA UNE REDIRECTION dans next.config.ts (ligne 89)
   - Verifie si la redirection actuelle (`/ancien-studio-photo` -> `/fr/studios-photo-automatises`) est suffisante
   - Si le contenu Webflow original avait une vraie page de valeur, cree-la. Sinon, garde la redirection.

3. **`/fr/questions-cles-photographie-produit`** (+ EN)
   - Lead magnet / guide telechargeable
   - Source : `data-webflow/pages/`
   - Structure : hero + liste de questions/reponses + CTA telechargement

### Pour chaque landing

- Respecte le design system (brandbook)
- `generateMetadata()` avec title, description, alternates
- Schema Organization + Breadcrumb
- Ajoute le pathname dans `i18n/routing.ts`
- Ajoute les traductions dans `messages/fr.json` et `messages/en.json`

---

## Patterns CRITIQUES

- **Link** : `@/i18n/routing`
- **SchemaOrg** : default export + named exports
- **Params** : `Promise<{ lang: string }>`
- **Pas d'emojis**, Lucide icons uniquement
- **Hero** : `bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800`
- **Sections** : `py-20`, `max-w-7xl mx-auto px-4 sm:px-6`

## Criteres de done

- [ ] FAQPage schema sur les 12 pages industrie
- [ ] FAQPage schema sur la page academy
- [ ] `faqSchema` disponible dans SchemaOrg.tsx
- [ ] Landing commerciales creees (au moins 1, selon contenu Webflow disponible)
- [ ] `npm run build` passe sans erreur
- [ ] Commits propres

## Compte-rendu

Ecris `/livrables/prompts-sessions/S3-RAPPORT.md` avec :
- Nombre de FAQ ajoutees par secteur
- Si faqSchema existait deja ou a ete cree
- Landing commerciales creees ou non (et pourquoi)
- Problemes rencontres
