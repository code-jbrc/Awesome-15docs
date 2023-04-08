import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Awesome 15docs',
  description: 'A VitePress Site',
  srcDir: 'src',
  outDir: '../dist',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      {
        text: '开发记录',
        items: [
          { text: 'vue开发问题', link: '/vue-problem' },
        ],
      },
      { text: '自动化部署', link: '/deploy' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'vue开发问题', link: '/vue-problem' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  head: [
    [
      'link', { rel: 'stylesheet', href: '/css/index.css' },
    ],
  ],
  srcExclude: ['**/README.md', '**/TODO.md'],
})
