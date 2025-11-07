import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  render: true,
  transform(raw) {
    return raw.filter(post => {
      return !post.url.endsWith('/index.html') && post.url !== '/posts/'
    })
  },
})
