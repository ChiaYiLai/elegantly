import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export interface PostItem {
  text: string
  link: string
}

export function getPostSidebar(): PostItem[] {
  const postsDir = path.resolve(import.meta.dirname, '../../posts')
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir)
  return files
    .filter(file => file.endsWith('.md'))
    .filter(file => file !== 'index.md')
    .map(file => {
      const filePath = path.join(postsDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(content)
      const name = file.replace(/\.md$/, '')
      return {
        text: data.title || name,
        link: `/posts/${name}`,
      }
    })
}
