<script setup lang="ts">
import { computed } from 'vue'
import { data } from '../../posts.data'

const randomPost = computed(() => {
  const posts = data.posts || []
  if (posts.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * posts.length)
  return posts[randomIndex]
})
</script>

<template>
  <div v-if="randomPost" class="random-post">
    <div class="post-card">
        <a :href="`/elegantly${randomPost.url}`">
            <h3 class="title-post">{{ randomPost.frontmatter.title || '無標題' }}</h3>
            <div v-if="randomPost.html" class="content" v-html="randomPost.html"></div>
        </a>
    </div>
  </div>
</template>