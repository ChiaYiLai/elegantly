<script setup lang="ts">
import { withBase, type ContentData } from 'vitepress'

interface PostProps {
  posts: ContentData[]
  type?: string
}

const props = withDefaults(defineProps<PostProps>(), {
  type: 'cards',
})
</script>

<template>
  <ul :class="`list-${$props.type}`">
    <li v-for="post in props.posts" :key="post.url">
      <a :href="withBase(post.url)">
        <h3>{{ post.frontmatter.title }}</h3>
        <div v-if="post.html && props.type === 'cards'" class="content" v-html="post.html"></div>
      </a>
    </li>
  </ul>
</template>

<style>
.list-catalog {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  li {
    margin: 0 0 1rem;
    a {
      text-decoration: underline;
      text-underline-offset: 8px;
      text-decoration-thickness: 1px;
      text-decoration-color: var(--vp-c-gutter);
      transition: 1s;
      color: var(--text);
      h3 {
        font-size: 18px;
        margin: 0;
      }
    }
    a:hover {
      color: var(--vp-c-brand-1);
    }
  }
}
@media (min-width: 960px) {
  .list-catalog {
    font-size: 21px;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    li {
      flex: 0 1 calc((100% - 2 * 1.5rem) / 3);
      margin: 0 !important;
      a {
        h3 {
          font-size: 24px;
          line-height: 1.5;
        }
      }
    }
  }
}
.list-cards {
  display: flex;
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  flex-wrap: wrap;
  gap: 1.5rem;
  li {
    width: 100%;
    margin: 0 !important;
    a {
      display: block;
      text-decoration: none;
      color: var(--text);
      padding: 2rem;
      background-color: var(--vp-c-bg-soft);
      border-radius: 12px;
      height: 100%;
      transition: 0.4s;
      a {
        display: none;
      }
    }
    a:hover {
      color: var(--text);
      box-shadow: 0 0 0 1px var(--vp-c-brand-1);
    }
    h3 {
      margin: 0 0 1.5rem;
      font-size: 24px;
      line-height: 1.2;
    }
    .content {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    p,
    ul,
    li {
      font-size: 18px;
      margin: 0 0 1rem;
    }
    blockquote {
      display: none;
    }
  }
}
@media (min-width: 960px) {
  .list-cards {
    li {
      flex: 0 1 calc((100% - 2 * 1.5rem) / 3);
    }
  }
}
</style>
