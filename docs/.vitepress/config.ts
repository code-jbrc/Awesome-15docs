import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Awesome 15docs',
  description: 'A VitePress Site',
  srcDir: 'src',
  outDir: '../dist',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '主页', link: '/' },
      {
        text: '开发记录',
        items: [
          { text: 'Vue 开发问题', link: '/vue-problem' },
          { text: 'Css 开发问题', link: '/css-problem' },
          { text: 'Github 问题记录', link: '/github-problem' },
          { text: 'ReactNative 开发问题', link: '/react-native-problem' },
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
        text: 'AI 推荐',
        items: [
          { text: 'AI 网站推荐', link: '/ai-site' },
          { text: 'AI 生图示例', link: '/ai-picture' },
        ],
        activeMatch: 'ai',
      },
      { text: '自动化部署', link: '/deploy' },
    ],

    sidebar: {
      '/ai': [
        {
          text: 'AI 推荐',
          items: [
            { text: 'AI 网站推荐', link: '/ai-site' },
            { text: 'AI 生图示例', link: '/ai-picture' },
          ],
        },
      ],
      '/': [
        {
          text: '日常开发记录',
          items: [
            { text: 'Vue 开发问题', link: '/vue-problem' },
            { text: 'Css 开发问题', link: '/css-problem' },
            { text: 'ReactNative 开发问题', link: '/react-native-problem' },
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
      { icon: 'github', link: 'https://github.com/code-jbrc/Awesome-15docs' },
    ],
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
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
