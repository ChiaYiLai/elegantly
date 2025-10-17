<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase, type ContentData } from 'vitepress'
import { data } from '../../posts.data'
const randomPost = ref<ContentData | null>(null)


onMounted(async () => {
  const posts = data.posts || []
  if (posts.length > 0) {
    const randomIndex = Math.floor(Math.random() * posts.length)
    randomPost.value = posts[randomIndex]
  }
})
</script>

<template>
  <div v-if="randomPost" class="random-post">
    <div class="post-card">
      <a :href="withBase(randomPost.url)">
        <h3 class="title-post">{{ randomPost.frontmatter.title || '無標題' }}</h3>
        <div v-if="randomPost.html" class="content" v-html="randomPost.html"></div>
      </a>
    </div>
  </div>
  <!-- 可選：SSR 時顯示佔位內容 -->
  <div v-else class="random-post skeleton">
    <div class="post-card">
      <div class="loading">載入中...</div>
    </div>
  </div>
</template>