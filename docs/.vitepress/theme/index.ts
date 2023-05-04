import Theme from 'vitepress/theme'
import { global } from '../../src/components/global'
import './css/index.css'

export default {
  ...Theme,
  enhanceApp: ({ app }) => {
    global.forEach(([compName, comp]) => {
      app.component(compName, comp)
    })
  },
}
