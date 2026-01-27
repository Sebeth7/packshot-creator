import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

console.log('✅ Variables loaded')
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('API Token présent:', !!process.env.SANITY_API_TOKEN)
console.log('API Token length:', process.env.SANITY_API_TOKEN?.length)
console.log('Token starts with:', process.env.SANITY_API_TOKEN?.substring(0, 10))

console.log('\n🔍 Testing Sanity Client...')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-11',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

try {
  const result = await client.fetch('*[_type == "blogPost"][0...3]{_id, title, slug}')
  console.log('✅ Query successful!')
  console.log('Articles found:', result.length)
  result.forEach(doc => {
    console.log(`  - ${doc.title} (${doc.slug?.current})`)
  })
} catch (error) {
  console.error('❌ Query failed:', error.message)
}
