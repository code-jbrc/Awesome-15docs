import Theme from 'vitepress/theme'
import { h } from 'vue'
import naive from 'naive-ui'
import { useData } from 'vitepress'
import { global } from '../../src/components/global'
import './css/index.css'
import './css/tailwind.css'
import Sidebar from './components/Sidebar.vue'

export default {
  ...Theme,
  Layout() {
    const { frontmatter } = useData()
    const props: Record<string, any> = {}
    const customClass = frontmatter.value.custom || ''

    if (customClass)
      props.class = customClass

    return h(Theme.Layout, props, {
      'sidebar-nav-after': () => h(Sidebar),
    })
  },
  enhanceApp: ({ app }: { app: any }) => {
    app.use(naive)
    global.forEach(([compName, comp]) => {
      app.component(compName, comp)
    })
  },
}
