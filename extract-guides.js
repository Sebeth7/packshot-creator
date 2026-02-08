/**
 * Script d'extraction automatique des guides Webflow
 * Extrait le contenu HTML et le convertit en markdown
 */

const fs = require('fs');
const path = require('path');

// Liste des guides à extraire
const guides = [
  'comment-creer-vues-multi-angles-automatique-objet',
  'comment-faire-animation-360-objet-transparent',
  'comment-faire-focus-stacking-pour-photographier-bague',
  'comment-faire-focus-stacking-pour-photographier-bracelet',
  'comment-faire-photos-multi-angles-chaussures',
  'comment-faire-video-chaussures',
  'comment-mettre-en-valeur-textures-produits-packshot',
  'comment-nettoyer-montre-avant-shooting',
  'comment-obtenir-couleurs-fideles-photographie-produit',
  'comment-obtenir-fond-blanc-parfait-sans-detourage-produit',
  'comment-photographier-lunettes-e-commerce',
  'comment-positionner-montre-avant-shooting-photo',
  'comment-prendre-photo-nette-bijoux-sans-fond',
  'comment-sublimer-texture-rouge-a-levres-photo-avec-ia',
  'modifier-couleur-produit-photo',
  'quel-equipement-choisir-pour-photo-bijoux',
  'quels-reglages-pour-photographier-bijoux',
  'realiser-animation-360-professionnelle-chaussures',
  'visuels-collection-produits-homogenes'
];

const baseUrl = 'https://www.packshot-creator.com/guide/';
const outputDir = '/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/data-webflow/guides/';

async function extractGuideContent(slug) {
  const url = baseUrl + slug;
  console.log(`Extraction de: ${url}`);

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Extraction basique des métadonnées et du contenu
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const metaDescMatch = html.match(/<meta name="description" content="(.*?)"/);
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);

    const title = titleMatch ? titleMatch[1].replace(/&[^;]+;/g, '').trim() : '';
    const metaDescription = metaDescMatch ? metaDescMatch[1] : '';
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '').trim() : '';

    return {
      slug,
      title,
      metaDescription,
      h1,
      url,
      html
    };
  } catch (error) {
    console.error(`Erreur lors de l'extraction de ${slug}:`, error.message);
    return null;
  }
}

async function main() {
  console.log(`Extraction de ${guides.length} guides...`);

  let guideNumber = 4; // On commence à 4 car 1-3 sont déjà faits

  for (const slug of guides) {
    const data = await extractGuideContent(slug);

    if (data) {
      // Créer un fichier markdown basique
      const markdown = `# ${data.h1 || data.title}

**URL source :** ${data.url}
**Meta title :** ${data.title}
**Meta description :** ${data.metaDescription}

---

## Introduction

[Contenu à compléter manuellement]

---

## Prérequis

[À extraire]

---

## Contenu

[Sections à extraire]

---

## FAQ

[Questions/réponses à extraire]

---

## Images

[Images à lister]

---

**Extrait le :** 1er février 2026
**Guide ${guideNumber}/23**
`;

      const filename = `guide-${slug}.md`;
      const filepath = path.join(outputDir, filename);

      fs.writeFileSync(filepath, markdown, 'utf8');
      console.log(`✓ ${filename} créé`);

      guideNumber++;
    }

    // Pause pour ne pas surcharger le serveur
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\nExtraction terminée!');
}

main().catch(console.error);
