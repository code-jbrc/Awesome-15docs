import Theme from 'vitepress/theme'
import { h } from 'vue'
import { global } from '../../src/components/global'
import './css/index.css'
import Sidebar from './components/Sidebar.vue'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'sidebar-nav-after': () => h(Sidebar),
    })
  },
  enhanceApp: ({ app }) => {
    global.forEach(([compName, comp]) => {
      app.component(compName, comp)
    })
  },
}
