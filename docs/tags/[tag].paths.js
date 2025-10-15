import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const POSTS_DIR = path.resolve(__dirname, '../posts')

function getAllTagsSync() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.warn(`Warning: Posts directory not found at ${POSTS_DIR}`)
    return []
  }

  const files = fs.readdirSync(POSTS_DIR)
  const tagSet = new Set()
  
  files.forEach(fileName => {
    if (!fileName.endsWith('.md')) return
    
    try {
      const filePath = path.join(POSTS_DIR, fileName)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(content)
      
      const tags = data.tags || []
      if (Array.isArray(tags)) {
        tags.forEach(t => tagSet.add(t.trim()))
      }
    } catch (e) {
      console.error(`Error processing file ${fileName}:`, e)
    }
  })
  
  return Array.from(tagSet)
}

export default {
  paths() {
    const tags = getAllTagsSync()

    return tags.map(tag => {
      return {
        params: {
          tag: tag
        }
      }
    })
  }
}