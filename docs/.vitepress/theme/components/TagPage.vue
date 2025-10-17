<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useData } from 'vitepress'
const { params } = useData()
import { data as posts } from '../../posts.data'

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
