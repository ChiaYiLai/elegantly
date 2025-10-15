// .vitepress/posts.data.ts

import { createContentLoader } from 'vitepress'
import type { ContentData } from 'vitepress' // 匯入 ContentData 類型

// 定義您的 Data Loader 最終輸出的介面
export interface PostsData {
  posts: ContentData[] // 包含 url, frontmatter 等原始資訊
  allTags: string[]    // 預先計算好的標籤列表
}

export default createContentLoader('posts/*.md', {
  includeSrc: true,  // 包含原始 markdown 內容
  render: true, 
  // 💡 在 Node.js 環境中執行計算邏輯
  transform(raw: ContentData[]): PostsData { 
    
    // --- 1. 計算所有標籤 (Tag Aggregation) ---
    const tagSet = new Set<string>()
    raw.forEach(({ frontmatter }) => {
      const tags = frontmatter.tags || []
      if (Array.isArray(tags)) {
        tags.forEach((t: string) => tagSet.add(t.trim()))
      }
    })
    const allTags = Array.from(tagSet).sort()
    
    // --- 2. 輸出結構 ---
    return {
      posts: raw,       // 輸出完整的原始數據供其他地方使用
      allTags: allTags  // 輸出預先計算好的標籤列表
    }
  }
})