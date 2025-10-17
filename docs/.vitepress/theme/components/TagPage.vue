<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { withBase, useData } from 'vitepress'
const { params, frontmatter } = useData()
import { data } from '../../posts.data'

const currentTag = computed(() => {
  return decodeURIComponent(params.value.tag || '')
})
const allPosts = computed(() => data.posts || [])

const filteredPosts = computed(() => {
  if (!currentTag.value) return []

  return allPosts.value
    .filter(p => {
      const tags: string[] = p.frontmatter.tags || []
      return tags.some(t => t.trim() === currentTag.value)
    })
})
</script>

<template>
  <div class="tag-page">
    <ul class="list-posts" v-if="filteredPosts.length">
      <li v-for="post in filteredPosts" :key="post.url">
        <a :href="withBase(post.url)">
          {{ post.frontmatter.title || '無標題' }}
        </a>
      </li>
    </ul>
    <p v-else-if="currentTag" class="no-posts">
      目前沒有「{{ currentTag }}」標籤的文章
    </p>
  </div>
</template>

<style scoped>
</style>