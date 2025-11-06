import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MyLayout from './Mylayout.vue'
import TagPage from './components/TagPage.vue'
import TagsList from './components/TagsList.vue'
import Catalog from './components/Catalog.vue'
import RandomPost from './components/RandomPost.vue' 

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('TagPage', TagPage)
    app.component('TagsList', TagsList)
    app.component('Catalog', Catalog)
    app.component('RandomPost', RandomPost)
  }
}