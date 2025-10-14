<script setup lang="ts">

import { ref, computed, onMounted } from 'vue'
import { data as posts } from '../posts.data'

const tag = ref('')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  tag.value = params.get('tag') || ''
})

const filteredPosts = computed(() => {
  if (!tag.value) return []
  return posts.filter(p => p.tags.includes(tag.value))
})
</script>

<template>
  <div class="tag-page">
    <h1 class="title-post" v-if="tag"># {{ tag }}</h1>
    <h1 v-else>請選擇標籤</h1>
    
    <ul class="list-posts" v-if="filteredPosts.length > 0">
      <li v-for="post in filteredPosts" :key="post.path">
        <a :href="`/elegantly${post.url}`">{{ post.title }}</a>
      </li>
    </ul>
    <p v-else-if="tag">目前沒有「{{ tag }}」標籤的文章</p>
  </div>
</template>

<style scoped>
</style>