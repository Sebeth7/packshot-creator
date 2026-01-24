/**
 * Script de migration MDX → Sanity Portable Text
 * Migre le contenu des articles MDX incomplets vers Sanity CMS
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

// Configuration Sanity
const client = createClient({
  projectId: 'qvraq6li',
  dataset: 'production',
  apiVersion: '2024-01-11',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Mapping fichier MDX → Slug Sanity (pour les articles dont les noms diffèrent)
const SLUG_MAPPING = {
  'formation-photo-produit': 'formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026',
}

// Articles à migrer (ceux identifiés comme incomplets)
const ARTICLES_TO_MIGRATE = [
  'formation-photo-produit',
]

/**
 * Convertit le contenu Markdown en Portable Text
 * Format simplifié : paragraphes et titres principaux
 */
function markdownToPortableText(markdown) {
  const blocks = []

  // Split par lignes vides pour détecter les paragraphes
  const lines = markdown.split('\n')
  let currentParagraph = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Ignorer les lignes vides
    if (!line) {
      if (currentParagraph.length > 0) {
        // Fin du paragraphe précédent
        const text = currentParagraph.join(' ').trim()
        if (text) {
          blocks.push({
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text }],
          })
        }
        currentParagraph = []
      }
      continue
    }

    // Détecter les titres H2 (## Titre)
    if (line.startsWith('## ')) {
      // Flush paragraphe en cours
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim()
        if (text) {
          blocks.push({
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text }],
          })
        }
        currentParagraph = []
      }

      // Ajouter le H2
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.replace('## ', '') }],
      })
      continue
    }

    // Détecter les titres H3 (### Titre)
    if (line.startsWith('### ')) {
      // Flush paragraphe en cours
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim()
        if (text) {
          blocks.push({
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text }],
          })
        }
        currentParagraph = []
      }

      // Ajouter le H3
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.replace('### ', '') }],
      })
      continue
    }

    // Détecter les listes (- item ou * item)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      // Flush paragraphe en cours
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim()
        if (text) {
          blocks.push({
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text }],
          })
        }
        currentParagraph = []
      }

      // Ajouter l'item de liste
      blocks.push({
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: line.replace(/^[*-] /, '') }],
      })
      continue
    }

    // Ignorer les composants MDX personnalisés (pour l'instant)
    if (line.startsWith('<')) {
      continue
    }

    // Ligne normale : ajouter au paragraphe en cours
    currentParagraph.push(line)
  }

  // Flush dernier paragraphe
  if (currentParagraph.length > 0) {
    const text = currentParagraph.join(' ').trim()
    if (text) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text }],
      })
    }
  }

  return blocks
}

/**
 * Lit et parse un fichier MDX
 */
function readMdxFile(slug) {
  const filePath = path.join(__dirname, '..', 'content', 'blog', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Fichier MDX non trouvé : ${filePath}`)
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(fileContent)

  return { frontmatter, content }
}

/**
 * Trouve l'ID du document Sanity correspondant au slug
 */
async function findSanityDocumentId(slug) {
  // Utiliser le mapping si disponible, sinon utiliser le slug tel quel
  const sanitySlug = SLUG_MAPPING[slug] || slug

  const query = `*[_type == "blogPost" && slug.current == $slug][0]._id`
  const docId = await client.fetch(query, { slug: sanitySlug })

  if (!docId) {
    throw new Error(`Document Sanity non trouvé pour le slug : ${sanitySlug}`)
  }

  return docId
}

/**
 * Met à jour le contenu d'un article dans Sanity
 */
async function updateSanityArticle(slug) {
  console.log(`\n📝 Migration de l'article : ${slug}`)

  try {
    // 1. Lire le fichier MDX
    console.log('  ↳ Lecture du fichier MDX...')
    const { frontmatter, content } = readMdxFile(slug)

    // 2. Convertir en Portable Text
    console.log('  ↳ Conversion en Portable Text...')
    const portableTextBlocks = markdownToPortableText(content)
    console.log(`  ↳ ${portableTextBlocks.length} blocs créés`)

    // 3. Trouver le document Sanity
    console.log('  ↳ Recherche du document Sanity...')
    const docId = await findSanityDocumentId(slug)
    console.log(`  ↳ Document trouvé : ${docId}`)

    // 4. Mettre à jour le contenu via l'API
    console.log('  ↳ Mise à jour du contenu...')
    const result = await client
      .patch(docId)
      .set({ content: portableTextBlocks })
      .commit()

    console.log(`  ✅ Article migré avec succès !`)

    return result
  } catch (error) {
    console.error(`  ❌ Erreur lors de la migration : ${error.message}`)
    throw error
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Début de la migration MDX → Sanity Portable Text\n')
  console.log(`📊 ${ARTICLES_TO_MIGRATE.length} articles à migrer\n`)

  let successCount = 0
  let errorCount = 0

  for (const slug of ARTICLES_TO_MIGRATE) {
    try {
      await updateSanityArticle(slug)
      successCount++
    } catch (error) {
      errorCount++
      console.error(`\n❌ Échec pour ${slug}:`, error.message)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`\n✅ Migration terminée !`)
  console.log(`   - Succès : ${successCount}/${ARTICLES_TO_MIGRATE.length}`)
  console.log(`   - Échecs : ${errorCount}/${ARTICLES_TO_MIGRATE.length}`)

  if (errorCount > 0) {
    console.log('\n⚠️  Certains articles n\'ont pas pu être migrés.')
    process.exit(1)
  }
}

// Exécution
main().catch((error) => {
  console.error('\n❌ Erreur fatale:', error)
  process.exit(1)
})
