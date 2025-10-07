import { defineConfig } from 'vitepress'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

function getPostSidebar() {
  const postsDir = path.resolve(__dirname, '../posts')
  const files = fs.readdirSync(postsDir)

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(postsDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(content)   // 解析 frontmatter

      const name = file.replace(/\.md$/, '')
      return {
        text: data.title || name,   // 有 title 就用 title
        link: `/posts/${name}`
      }
    })
}

export default defineConfig({
  base: '/elegantly/',
  cleanUrls: true,
  title: "優雅地生活",
  description: "只有在感謝的時候，<br>你才擁有它們。",
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: 'Chia Yi Lai', link: 'https://chiayilai.github.io/resume/' },
    ],

    sidebar: [
      {
        text: '目錄',
        items: getPostSidebar()
      }
    ],

    socialLinks: [
    ],

    footer: {
      copyright: '© Chia Yi Lai. All rights reserved. '
    },
    docFooter: {
      prev: 'Prev',
      next: 'Next'
    },
  }
})

export interface Footer {
  message?: string
  copyright?: string
}
