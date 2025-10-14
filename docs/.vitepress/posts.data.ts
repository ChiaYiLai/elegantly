import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData.map(({ url, frontmatter }) => ({
      title: frontmatter.title,
      url,
      tags: frontmatter.tags || [],
    }))
  }
})