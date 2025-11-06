import { createContentLoader } from 'vitepress'

export default createContentLoader(['posts/*.md', '!posts/index.md'], {
  render: true,
})
