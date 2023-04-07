import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Awesome 15docs',
  description: 'A VitePress Site',
  srcDir: 'src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '开发文件记录', link: '/daily-problem' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '日常开发记录', link: '/daily-problem.md' },
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
})
