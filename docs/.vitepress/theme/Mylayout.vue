<script setup>
import DefaultTheme from 'vitepress/theme'
import { withBase, useData } from 'vitepress'
import { watchEffect } from 'vue'
import Logo from './components/Logo.vue'

const { Layout } = DefaultTheme
const { frontmatter, isDark } = useData()

watchEffect(() => {
  const color = isDark.value ? '#1b1b1f' : '#ffffff'
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', color)
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
  </Layout>
</template>