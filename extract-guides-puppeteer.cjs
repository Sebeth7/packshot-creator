/**
 * Script d'extraction automatique des guides Webflow avec Puppeteer
 * Extrait le contenu complet de chaque guide et génère des fichiers markdown
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const guides = [
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

async function extractGuide(page, slug, guideNumber) {
  const url = baseUrl + slug;
  console.log(`\n[${guideNumber}/23] Extraction de: ${slug}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Attendre que le contenu soit chargé
    await page.waitForSelector('h1', { timeout: 5000 });

    // Extraire toutes les données
    const data = await page.evaluate(() => {
      // Fonction helper pour obtenir le contenu d'une section
      function getSectionContent(h2Element) {
        let content = [];
        let el = h2Element.nextElementSibling;

        while (el && el.tagName !== 'H2' && el.tagName !== 'SECTION') {
          const text = el.textContent?.trim();
          if (text && text.length > 10 &&
              !text.includes('Thank you') &&
              !text.includes('Oops') &&
              !text.includes('cookie')) {
            const cleanText = text.replace(/\s+/g, ' ').trim();
            if (cleanText && !content.includes(cleanText)) {
              content.push(cleanText);
            }
          }
          el = el.nextElementSibling;
        }

        return content.join('\n\n');
      }

      return {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content || '',
        h1: document.querySelector('h1')?.textContent?.trim() || '',
        url: window.location.href,

        // Introduction
        intro: Array.from(document.querySelectorAll('p'))
          .filter(p => {
            const text = p.textContent.trim();
            return text.length > 50 &&
              !text.includes('cookie') &&
              !text.includes('Thank you');
          })
          .slice(0, 3)
          .map(p => p.textContent.trim())
          .join('\n\n'),

        // Prérequis
        prerequis: {
          logistique: document.body.textContent.match(/Alphashot[^.\n]+/)?.[0] ||
                      document.body.textContent.match(/Studio[^.\n]+/)?.[0] || '',
          outil: document.body.textContent.match(/Logiciel Orbitvu[^.\n]+/)?.[0] || '',
          duree: document.body.textContent.match(/\d+\s*minutes?/)?.[0] || ''
        },

        // Sections
        sections: Array.from(document.querySelectorAll('h2')).filter(h2 => {
          const text = h2.textContent.trim();
          return text &&
            !text.includes('FAQ') &&
            !text.includes('Industries') &&
            !text.includes('Produits') &&
            !text.includes('Ressources') &&
            !text.includes('Paramètres') &&
            text.length > 5;
        }).map(h2 => ({
          title: h2.textContent.trim(),
          content: getSectionContent(h2)
        })),

        // FAQ
        faq: Array.from(document.querySelectorAll('button')).filter(btn =>
          btn.querySelector('h2, h3, h4')?.textContent?.includes('?')
        ).map(btn => ({
          question: btn.querySelector('h2, h3, h4')?.textContent?.trim(),
          answer: btn.nextElementSibling?.textContent?.trim() || ''
        })).filter(item => item.answer && item.answer.length > 20),

        // Images principales
        images: Array.from(document.querySelectorAll('img')).filter(img =>
          img.src.includes('cdn.prod.website-files.com') &&
          img.src.includes('/67') &&
          !img.alt.toLowerCase().includes('alphashot') &&
          !img.alt.toLowerCase().includes('studio') &&
          !img.alt.toLowerCase().includes('logo') &&
          !img.alt.toLowerCase().includes('shotflow') &&
          img.width > 200
        ).slice(0, 10).map(img => ({
          src: img.src,
          alt: img.alt || ''
        }))
      };
    });

    // Générer le markdown
    const markdown = generateMarkdown(data, guideNumber);

    // Sauvegarder le fichier
    const filename = `guide-${slug}.md`;
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, markdown, 'utf8');

    console.log(`✓ ${filename} créé (${data.sections.length} sections, ${data.faq.length} FAQ)`);

    return true;
  } catch (error) {
    console.error(`✗ Erreur pour ${slug}:`, error.message);
    return false;
  }
}

function generateMarkdown(data, guideNumber) {
  let md = `# ${data.h1 || data.title}\n\n`;
  md += `**URL source :** ${data.url}\n`;
  md += `**Meta title :** ${data.title}\n`;
  md += `**Meta description :** ${data.metaDescription}\n\n`;
  md += `---\n\n`;

  // Introduction
  md += `## Introduction\n\n`;
  md += `${data.intro || '[Contenu à compléter]'}\n\n`;
  md += `---\n\n`;

  // Prérequis
  md += `## Prérequis\n\n`;
  if (data.prerequis.logistique) md += `**Logistique**\n- ${data.prerequis.logistique}\n\n`;
  if (data.prerequis.outil) md += `**Outil**\n- ${data.prerequis.outil}\n\n`;
  if (data.prerequis.duree) md += `**Durée**\n- ${data.prerequis.duree}\n\n`;
  md += `---\n\n`;

  // Contenu
  md += `## Contenu\n\n`;
  data.sections.forEach((section, idx) => {
    md += `### ${idx + 1}. ${section.title}\n\n`;
    md += `${section.content || '[Contenu à compléter]'}\n\n`;
  });
  md += `---\n\n`;

  // FAQ
  md += `## FAQ\n\n`;
  if (data.faq.length > 0) {
    data.faq.forEach(item => {
      md += `### ${item.question}\n\n`;
      md += `${item.answer}\n\n`;
    });
  } else {
    md += `[Aucune FAQ disponible]\n\n`;
  }
  md += `---\n\n`;

  // Images
  md += `## Images\n\n`;
  if (data.images.length > 0) {
    md += `| # | URL | Alt | Position |\n`;
    md += `|---|-----|-----|----------|\n`;
    data.images.forEach((img, idx) => {
      md += `| ${idx + 1} | ${img.src} | ${img.alt} | - |\n`;
    });
  } else {
    md += `[Aucune image identifiée]\n`;
  }
  md += `\n---\n\n`;

  // Médias
  md += `## Médias\n\n`;
  md += `Aucune vidéo identifiée dans ce guide.\n\n`;
  md += `---\n\n`;

  md += `**Extrait le :** 1er février 2026\n`;
  md += `**Guide ${guideNumber}/23**\n`;

  return md;
}

async function main() {
  console.log('🚀 Démarrage de l\'extraction des guides...\n');
  console.log(`📊 ${guides.length} guides à extraire\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  let guideNumber = 5; // On commence à 5 (guides 1-4 déjà faits)
  let successCount = 0;

  for (const slug of guides) {
    const success = await extractGuide(page, slug, guideNumber);
    if (success) successCount++;
    guideNumber++;

    // Pause entre chaque requête
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await browser.close();

  console.log(`\n✅ Extraction terminée!`);
  console.log(`📁 ${successCount}/${guides.length} guides extraits avec succès`);
  console.log(`📂 Fichiers sauvegardés dans: ${outputDir}`);
}

main().catch(console.error);
