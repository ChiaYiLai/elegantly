<script setup lang="ts">
import { data as posts } from '../../posts.data'
import PostsList from './PostsList.vue'
</script>

<template>
  <h1 class="title-post" style="margin-top: 2rem">目錄</h1>
  <PostsList :posts="posts" type="catalog" />
</template>
