<script setup lang="ts">
import { ref, watch } from 'vue'
import { withBase, type ContentData, useRoute } from 'vitepress'
import { data as posts } from '../../posts.data'
const randomPosts = ref<ContentData[] | null>(null)

const route = useRoute()
function fetchRandomPosts() {
  if (posts.length) {
    const selectedCount = 3
    randomPosts.value = [...posts]
      .sort(() => Math.random() - 0.5)
      .slice(0, selectedCount)
  }
}
fetchRandomPosts() 

watch(
  () => route.path,
  () => {
    fetchRandomPosts()
  }
)
</script>

<template>
  <div v-if="randomPosts" class="random-post">
    <h2>隨機文章</h2>
    <ul class="list-cards">
      <li class="post-card" v-for="post in randomPosts">
        <a :href="withBase(post.url)">
          <h3>{{ post.frontmatter.title || '無標題' }}</h3>
          <div v-if="post.html" class="content" v-html="post.html"></div>
        </a>
      </li>
    </ul>
  </div>
</template>