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
        activeMatch: 'problem|example',
      },
      { text: '自动化部署', link: '/deploy' },
      {
        text: 'Typescript',
        items: [
          { text: 'Typescript（tsconfig详解)', link: '/typescript-config' },
          { text: 'Typescript 开发问题记录', link: '/typescript-problem' },
        ],
        activeMatch: 'typescript',
      },
    ],

    sidebar: [
      {
        text: '日常开发记录',
        items: [
          { text: 'vue开发问题', link: '/vue-problem' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'Typescript',
        items: [
          { text: 'Typescript（tsconfig详解)', link: '/typescript-config' },
          { text: 'Typescript 开发问题记录', link: '/typescript-problem' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  head: [
    [
      'script',
      {
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-YYMJNTZ2D8',
      },
    ],
    [
      'script',
      {},
      `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-YYMJNTZ2D8');
      `,
    ],
  ],
  srcExclude: ['**/README.md', '**/TODO.md'],
})
