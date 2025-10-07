<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import Logo from './components/Logo.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData() 
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <Logo />
    </template>
    <template #doc-before>
      <h1 class="title-post">{{ frontmatter.title }}</h1>
    </template>
    <template #doc-footer-before>
      <ul class="list-tags">
        <li v-for="tag in frontmatter.tags || []" :key="tag">
          <a :href="`/tag/${tag}`">{{ tag }}</a>
        </li>
      </ul>
    </template>
  </Layout>
</template>