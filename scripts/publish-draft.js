/**
 * Publie le draft "Guide d'Achat Studio 2026"
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

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

async function publishDraft() {
  const draftId = 'drafts.7f01df94-9b20-49a5-82c5-824927b083fe'
  const publishedId = '7f01df94-9b20-49a5-82c5-824927b083fe'

  console.log('📤 Publication du draft "Guide d\'Achat Studio 2026"...\n')

  try {
    // Récupérer le draft
    console.log('1️⃣  Récupération du draft...')
    const draft = await client.getDocument(draftId)

    if (!draft) {
      throw new Error(`Draft non trouvé: ${draftId}`)
    }

    console.log(`   ✅ Draft trouvé: ${draft.title}`)
    console.log(`   Slug: ${draft.slug?.current}`)

    // Créer/mettre à jour la version publiée
    console.log('\n2️⃣  Publication...')

    const publishedDoc = {
      ...draft,
      _id: publishedId,
    }

    // Supprimer les champs spécifiques au draft
    delete publishedDoc._updatedAt
    delete publishedDoc._createdAt
    delete publishedDoc._rev

    const result = await client.createOrReplace(publishedDoc)

    console.log(`   ✅ Document publié avec succès !`)
    console.log(`   ID publié: ${result._id}`)

    // Supprimer le draft
    console.log('\n3️⃣  Suppression du draft...')
    await client.delete(draftId)
    console.log(`   ✅ Draft supprimé`)

    console.log('\n✅ Publication terminée avec succès !')
    console.log(`\nL'article est maintenant accessible avec le slug: guide-achat-studio-2026`)

  } catch (error) {
    console.error('\n❌ Erreur lors de la publication:', error.message)
    throw error
  }
}

publishDraft().catch((error) => {
  console.error('\n❌ Erreur fatale:', error)
  process.exit(1)
})
