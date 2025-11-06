<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../posts.data'

interface TagInfo {
  name: string
  count: number
}

const allTags = computed<TagInfo[]>(() => {
  const map = new Map<string, number>()
  posts.forEach(p => {
    const tags = p.frontmatter.tags || []
    if (Array.isArray(tags)) {
      tags.forEach(t => map.set(t, (map.get(t) || 0) + 1))
    }
  })
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})
</script>

<template>
  <ul class="list-tags">
    <li v-for="tag in allTags" :key="tag.name">
      <a :href="`tags/${encodeURIComponent(tag.name)}`">
        <b>{{ tag.name }}</b>
        <span>{{ tag.count }}</span>
      </a>
    </li>
  </ul>
</template>
