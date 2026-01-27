/**
 * Script pour corriger et migrer l'article "Guide d'Achat Studio 2026"
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-11',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Convertit Markdown en Portable Text
function markdownToPortableText(markdown) {
  const blocks = []
  const lines = markdown.split('\n')
  let currentParagraph = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line) {
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
      continue
    }

    if (line.startsWith('## ')) {
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
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.replace('## ', '') }],
      })
      continue
    }

    if (line.startsWith('### ')) {
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
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.replace('### ', '') }],
      })
      continue
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
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
      blocks.push({
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: line.replace(/^[*-] /, '') }],
      })
      continue
    }

    if (line.startsWith('<')) {
      continue
    }

    currentParagraph.push(line)
  }

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

async function main() {
  console.log('🔧 Correction de l\'article "Guide d\'Achat Studio 2026"\n')

  // 1. Lire le fichier MDX
  console.log('📖 Lecture du fichier MDX...')
  const filePath = path.join(__dirname, '..', 'content', 'blog', 'guide-achat-studio-2026.mdx')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(fileContent)

  // 2. Convertir en Portable Text
  console.log('🔄 Conversion en Portable Text...')
  const portableTextBlocks = markdownToPortableText(content)
  console.log(`   ✅ ${portableTextBlocks.length} blocs créés`)

  // 3. Utiliser l'ID du draft directement
  console.log('\n🔍 Utilisation du document draft...')
  const docId = 'drafts.7f01df94-9b20-49a5-82c5-824927b083fe'

  const doc = await client.getDocument(docId)

  if (!doc) {
    throw new Error(`Document non trouvé: ${docId}`)
  }

  console.log(`   ✅ Document trouvé: ${doc._id}`)
  console.log(`   Titre: ${doc.title}`)
  console.log(`   Slug actuel: ${doc.slug?.current || 'null'}`)

  // 4. Définir le bon slug
  const targetSlug = 'guide-achat-studio-2026'

  // 5. Mettre à jour le document avec slug + contenu
  console.log(`\n🚀 Mise à jour du document...`)
  console.log(`   - Nouveau slug: ${targetSlug}`)
  console.log(`   - Nouveau contenu: ${portableTextBlocks.length} blocs`)

  const result = await client
    .patch(doc._id)
    .set({
      slug: { _type: 'slug', current: targetSlug },
      content: portableTextBlocks,
    })
    .commit()

  console.log('\n✅ Article corrigé et migré avec succès !')
  console.log(`   Document ID: ${result._id}`)
}

main().catch((error) => {
  console.error('\n❌ Erreur:', error.message)
  process.exit(1)
})
