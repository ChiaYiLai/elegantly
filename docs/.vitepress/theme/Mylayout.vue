<script setup>
import DefaultTheme from 'vitepress/theme'
import { withBase, useData, useRoute, inBrowser } from 'vitepress'
import { watchEffect, computed } from 'vue'
import Logo from './components/Logo.vue'

const { Layout } = DefaultTheme
const { frontmatter, isDark, site } = useData()
const route = useRoute()

const isPostPage = computed(() => {
  const path = route.path
  return path.startsWith(`${site.value.base}posts/`)
})

watchEffect(() => {
  if (inBrowser) {
    const color = isDark.value ? '#1b1b1f' : '#ffffff'
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', color)
  }
})
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <Logo />
    </template>
    <template #doc-before>
      <h1 class="title-post">{{ frontmatter.title }}</h1>
    </template>
    <template #doc-footer-before>
      <ul class="list-tags">
        <li v-for="tag in frontmatter.tags || []" :key="tag">
          <a :href="withBase(`/tags/${tag}`)">{{ tag }}</a>
        </li>
      </ul>
    </template>
    <template #doc-after>
      <RandomPost v-if="isPostPage" />
    </template>
  </Layout>
</template>

<style>
.list-tags {
  list-style: none !important;
  display: flex;
  flex-wrap: wrap;
  padding: 0 !important;
  margin: 0 0 1.5rem;
  gap: 1rem 1.5rem;
  font-size: 16px;
  li {
    margin: 0 !important;
  }
  a::before {
    content: '#';
    display: inline;
    margin-right: 2px;
  }
  a {
    text-decoration: none;
    transition: 0.4s;
    color: var(--text);
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      background-color: var(--vp-c-gutter);
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      margin-left: 0.5rem;
    }
  }
  a:hover {
    color: var(--vp-c-brand-1);
  }
}
</style>
