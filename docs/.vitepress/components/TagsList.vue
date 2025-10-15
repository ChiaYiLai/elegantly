<script setup lang="ts">
import { useData } from 'vitepress'
// 💡 匯入您定義的介面
import type { PostsData } from '../posts.data' 

// 1. 使用 useData 鉤子取得數據，並指定 PostsData 類型
const { data } = useData<PostsData>()

// 2. 直接使用在 Node.js 構建時計算好的 allTags 陣列
const tags = data.value.allTags

// 3. (可選) 檢查 posts 數據也可以，但 TagsList 不需用到
// const allPosts = data.value.posts 
</script>

<template>
  <div>
    <h2>文章標籤</h2>
    <ul class="tags-list">
      <li v-for="tag in tags" :key="tag">
        <a :href="`/tag?tag=${encodeURIComponent(tag)}`">{{ tag }}</a>
      </li>
    </ul>
  </div>
</template>