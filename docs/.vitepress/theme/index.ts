import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MyLayout from './Mylayout.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout
}