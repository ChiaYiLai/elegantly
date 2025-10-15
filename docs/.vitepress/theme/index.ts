import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MyLayout from './Mylayout.vue'
import TagPage from './components/TagPage.vue' 

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    // 註冊 TagsList (您之前已經做過)
    // app.component('TagsList', TagsList) 
    
    // 📌 註冊 TagPage 為全域組件
    app.component('TagPage', TagPage) 
  }
}