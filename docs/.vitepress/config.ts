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
          { text: 'Vue 开发问题', link: '/vue-problem' },
          { text: 'Css 开发问题', link: '/css-problem' },
          { text: 'Github 问题记录', link: '/github-problem' },
        ],
        activeMatch: 'problem|example',
      },
      {
        text: 'Typescript',
        items: [
          { text: 'Typescript（tsconfig详解)', link: '/typescript-config' },
          { text: 'Typescript 开发问题记录', link: '/typescript-problem' },
        ],
        activeMatch: 'typescript',
      },
      {
        text: 'Ai 推荐',
        items: [
          { text: 'Ai 网站推荐', link: '/ai-site' },
          { text: 'Ai 生图示例', link: '/ai-picture' },
        ],
        activeMatch: 'ai',
      },
      { text: '自动化部署', link: '/deploy' },
    ],

    sidebar: {
      '/ai': [
        {
          text: 'Ai 推荐',
          items: [
            { text: 'Ai 网站推荐', link: '/ai-site' },
            { text: 'Ai 生图示例', link: '/ai-picture' },
          ],
        },
      ],
      '/': [
        {
          text: '日常开发记录',
          items: [
            { text: 'Vue 开发问题', link: '/vue-problem' },
            { text: 'Css 开发问题', link: '/css-problem' },
            { text: 'Github 问题记录', link: '/github-problem' },
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
        {
          text: '自动化部署',
          items: [
            { text: '自动化部署', link: '/deploy' },
          ],
        },
      ],
    },

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
