import { defineConfig } from 'vitepress'
import { getPostSidebar } from './utils/posts'
const base = '/elegantly/'

export default defineConfig({
  base,
  cleanUrls: true,
  lang: 'zh-TW',
  title: "優雅地生活",
  description: "只有在感謝的時候，<br>你才擁有它們。",
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg` }],
    ['script', { 
      async: 'true', 
      src: 'https://www.googletagmanager.com/gtag/js?id=G-K84RT52S7J' 
    }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-K84RT52S7J');
    `]
  ],
  async transformPageData(pageData) {
    if (pageData.params?.tag) {
      const tag = decodeURIComponent(pageData.params.tag)
      pageData.title = tag
      pageData.frontmatter = {
        ...pageData.frontmatter,
        title: tag
      }
    }
  },
  sitemap: {
    hostname: `https://chiayilai.github.io${base}`
  },
  themeConfig: {
    nav: [
      { text: '關於作者', link: 'https://chiayilai.github.io/resume/' },
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
      copyright: '© Chia Yi Lai. All rights reserved.'
    },
    docFooter: {
      prev: 'Prev',
      next: 'Next'
    },
    sidebarMenuLabel: '目錄',
    returnToTopLabel: 'up',
    darkModeSwitchLabel: '外觀',
    lightModeSwitchTitle: '切換到淺色模式',
    darkModeSwitchTitle: '切換到深色模式',
    aside: false,
    notFound: {
      title: '找不到頁面',
      quote: '頁面不存在',
      linkLabel: '返回首頁',
      linkText: '回到首頁',
      code: '404'
    },
  }
})

export interface Footer {
  message?: string
  copyright?: string
}
