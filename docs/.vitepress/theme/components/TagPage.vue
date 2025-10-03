<script setup lang="ts">
import { useRoute } from 'vitepress'
const route = useRoute()
const tag = route.params.tag as string

const modules = import.meta.glob('../../posts/*.md', { eager: true })
const posts = Object.entries(modules)
  .map(([path, mod]: any) => ({
    title: mod.frontmatter.title,
    tags: mod.frontmatter.tags || [],
    path: path.replace('../../posts', '/posts').replace(/\.md$/, '')
  }))
  .filter(p => p.tags.includes(tag))
</script>

<template>
  <h1>標籤：{{ tag }}</h1>
  <ul>
    <li v-for="post in posts" :key="post.path">
      <a :href="post.path">{{ post.title }}</a>
    </li>
  </ul>
</template>