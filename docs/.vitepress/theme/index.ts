import Theme from 'vitepress/theme'
import type { DefineComponent } from 'vue'
import { h } from 'vue'
import busuanzi from 'busuanzi.pure.js'
import 'uno.css'
import type { EnhanceAppContext } from 'vitepress'
import { useData } from 'vitepress'
import { global } from '../../src/components/global'
import './css/index.css'
import Wave from './components/Wave.vue'
import HomePage from './components/HomePage.vue'
import Sidebar from './components/Sidebar.vue'
import { globalVp } from './components/global'
import { isClient } from '@/utils/common'

export default {
  ...Theme,
  Layout() {
    const { frontmatter } = useData()
    const props: Record<string, any> = {}
    const customClass = frontmatter.value.customClass || ''

    if (customClass)
      props.class = customClass

    return h(Theme.Layout, props, {
      'sidebar-nav-after': () => h(Sidebar),
      'home-hero-before': () => h(Wave),
      'home-features-after': () => h(HomePage),
    })
  },
  enhanceApp: ({ app, router }: EnhanceAppContext) => {
    [...globalVp, ...global].forEach(([compName, comp]) => {
      app.component(compName as string, comp as unknown as DefineComponent)
    })
    router.onAfterRouteChanged = () => {
      isClient && busuanzi.fetch()
    }
  },
}
