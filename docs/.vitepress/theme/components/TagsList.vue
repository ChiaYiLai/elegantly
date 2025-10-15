<script setup lang="ts">
import { data } from '../../posts.data'
const tags = data.allTags
</script>

<template>
  <div>
    <ul class="list-tags">
      <li v-for="tag in tags" :key="tag">
        <a :href="`tags/${encodeURIComponent(tag)}`">{{ tag }}</a>
      </li>
    </ul>
  </div>
</template>