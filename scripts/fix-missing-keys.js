/**
 * Script pour corriger les keys manquantes dans les articles migrés
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

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

// Génère une clé unique
function generateKey() {
  return crypto.randomBytes(12).toString('hex')
}

// Ajoute les _key manquantes récursivement
function addKeysToBlocks(blocks) {
  if (!Array.isArray(blocks)) return blocks

  return blocks.map(block => {
    const updatedBlock = { ...block }

    // Ajouter _key si manquant
    if (!updatedBlock._key) {
      updatedBlock._key = generateKey()
    }

    // Récursif pour les children
    if (updatedBlock.children && Array.isArray(updatedBlock.children)) {
      updatedBlock.children = updatedBlock.children.map(child => ({
        ...child,
        _key: child._key || generateKey()
      }))
    }

    return updatedBlock
  })
}

// Articles à corriger
const ARTICLES_TO_FIX = [
  'ia-photo-produit-guide-2026',
  'orbitvu-vs-concurrents',
  'guide-achat-studio-2026',
]

async function fixArticle(slug) {
  console.log(`\n🔧 Correction des keys pour : ${slug}`)

  try {
    // 1. Trouver le document
    const query = `*[_type == "blogPost" && slug.current == $slug][0]{_id, content}`
    const doc = await client.fetch(query, { slug })

    if (!doc) {
      throw new Error(`Document non trouvé pour le slug: ${slug}`)
    }

    console.log(`   ✅ Document trouvé: ${doc._id}`)

    // 2. Vérifier s'il y a du contenu
    if (!doc.content || !Array.isArray(doc.content)) {
      throw new Error(`Pas de contenu trouvé`)
    }

    console.log(`   📝 Contenu actuel: ${doc.content.length} blocs`)

    // 3. Ajouter les keys manquantes
    const contentWithKeys = addKeysToBlocks(doc.content)

    console.log(`   🔑 Ajout des keys...`)

    // 4. Mettre à jour le document
    await client
      .patch(doc._id)
      .set({ content: contentWithKeys })
      .commit()

    console.log(`   ✅ Article corrigé avec succès !`)

    return { success: true, slug }
  } catch (error) {
    console.error(`   ❌ Erreur: ${error.message}`)
    return { success: false, slug, error: error.message }
  }
}

async function main() {
  console.log('🔧 Correction des keys manquantes dans les articles migrés\n')
  console.log(`📊 ${ARTICLES_TO_FIX.length} articles à corriger\n`)

  const results = []

  for (const slug of ARTICLES_TO_FIX) {
    const result = await fixArticle(slug)
    results.push(result)
  }

  // Résumé
  const successCount = results.filter(r => r.success).length
  const errorCount = results.filter(r => !r.success).length

  console.log('\n' + '='.repeat(60))
  console.log(`\n✅ Correction terminée !`)
  console.log(`   - Succès : ${successCount}/${ARTICLES_TO_FIX.length}`)
  console.log(`   - Échecs : ${errorCount}/${ARTICLES_TO_FIX.length}`)

  if (errorCount > 0) {
    console.log('\n⚠️  Articles en échec:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.slug}: ${r.error}`)
    })
  }

  console.log('\n💡 Rechargez Sanity Studio pour voir les changements.')
}

main().catch((error) => {
  console.error('\n❌ Erreur fatale:', error)
  process.exit(1)
})
