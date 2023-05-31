import Theme from 'vitepress/theme'
import type { DefineComponent } from 'vue'
import { h } from 'vue'
import busuanzi from 'busuanzi.pure.js'
import 'uno.css'
import type { EnhanceAppContext } from 'vitepress'
import { useData } from 'vitepress'
import { global } from '../../src/components/global'
import './css/index.css'
import Sidebar from './components/Sidebar.vue'
import { isClient } from '@/utils/common'

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
  enhanceApp: ({ app, router }: EnhanceAppContext) => {
    global.forEach(([compName, comp]) => {
      app.component(compName as string, comp as unknown as DefineComponent)
    })
    router.onAfterRouteChanged = () => {
      isClient && busuanzi.fetch()
    }
  },
}
