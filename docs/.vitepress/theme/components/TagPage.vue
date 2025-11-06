<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'
const { params } = useData()
import { data as posts } from '../../posts.data'
import PostsList from './PostsList.vue'

const currentTag = computed(() => {
  return decodeURIComponent(params.value.tag || '')
})

const filteredPosts = computed(() => {
  if (!currentTag.value) return []

  return posts
    .filter(p => {
      const tags: string[] = p.frontmatter.tags || []
      return tags.some(t => t.trim() === currentTag.value)
    })
})
</script>

<template>
  <div class="tag-page">
    <PostsList :posts="filteredPosts" />
  </div>
</template>
