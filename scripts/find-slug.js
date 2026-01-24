import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'

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

const query = `*[_type == "blogPost"] | order(title asc) {
  _id,
  title,
  "slug": slug.current
}`

const articles = await client.fetch(query)

console.log('📚 Tous les articles blog dans Sanity:\n')
articles.forEach((article, index) => {
  console.log(`${index + 1}. ${article.title}`)
  console.log(`   Slug: ${article.slug}`)
  console.log(`   ID: ${article._id}\n`)
})

console.log(`Total: ${articles.length} articles`)
