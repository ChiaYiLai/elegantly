// .vitepress/posts.data.ts

import { createContentLoader } from 'vitepress'
import type { ContentData } from 'vitepress'

export interface TagInfo {
  name: string
  count: number
}

export interface PostsData {
  posts: ContentData[]
  allTags: TagInfo[]   // [{ name: 'vue', count: 5 }, ...]
}

export default createContentLoader('posts/*.md', {
  includeSrc: true,
  render: true,
  transform(raw: ContentData[]): PostsData {
    // --- 1. 計算每個標籤的文章數 ---
    const tagMap = new Map<string, number>()

    raw.forEach(({ frontmatter }) => {
      const tags = frontmatter.tags || []
      if (Array.isArray(tags)) {
        tags.forEach((t: string) => {
          const tag = t.trim()
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        })
      }
    })

    // --- 2. 轉為排序陣列 ---
    const allTags = Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    // --- 3. 回傳完整資料 ---
    return {
      posts: raw,
      allTags
    }
  }
})