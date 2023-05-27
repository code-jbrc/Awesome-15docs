import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

const PLAY_DX = [
  {
    text: 'DX 开发者体验',
    items: [
      { text: '自动化部署', link: '/feature-deploy' },
      { text: 'Vscode 特性配置', link: '/feature-vscode' },
    ],
  },
  {
    text: '摸鱼工具',
    items: [
      { text: '阅读器', link: '/play-epub-reader' },
    ],
  },
]

const PROJECT = {
  text: '工程化记录',
  items: [
    { text: 'Vite 开发问题', link: '/project-vite' },
  ],
}

const PROBLEM_ITEMS = [
  { text: 'Vue 开发问题', link: '/problem-vue' },
  { text: 'Vitepress 开发问题', link: '/problem-vitepress' },
  { text: 'Css 开发问题', link: '/problem-css' },
  { text: 'ReactNative 开发问题', link: '/problem-react-native' },
  { text: 'Github 问题记录', link: '/problem-github' },
  { text: 'Git 开发问题', link: '/problem-git' },
]

const PROJECT_PROBLEM = [
  {
    text: '日常开发记录',
    items: [
      ...PROBLEM_ITEMS,
      { text: 'Markdown Examples', link: '/problem-markdown-examples' },
      { text: 'Runtime API Examples', link: '/problem-api-examples' },
    ],
  },
  {
    text: 'Typescript',
    items: [
      { text: 'Typescript（tsconfig详解)', link: '/problem-typescript-config' },
      { text: 'Typescript 开发问题记录', link: '/problem-typescript' },
    ],
  },
  PROJECT,
]

const AI = {
  text: 'AI 网站推荐',
  items: [
    {
      text: 'Ai 推荐',
      items: [
        { text: 'AI 网站推荐', link: '/ai-site' },
        { text: 'AI 生图示例', link: '/ai-picture' },
      ],
    },
    {
      text: '设计网站推荐',
      items: [
        { text: '渐变色网站推荐', link: '/ai-gradients' },
      ],
    },
  ],
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Awesome 15docs',
  description: 'A VitePress Site',
  srcDir: 'src',
  outDir: '../dist',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '主页', link: '/' },
      {
        text: '开发记录',
        items: [
          ...PROBLEM_ITEMS,
          {
            text: 'Typescript',
            items: [
              { text: 'Typescript（tsconfig详解)', link: '/problem-typescript-config' },
              { text: 'Typescript 开发问题记录', link: '/problem-typescript' },
            ],
          },
          PROJECT,
        ],
        activeMatch: 'problem|example|project',
      },
      {
        ...AI,
        activeMatch: 'ai',
      },
      {
        text: 'DX 开发者体验',
        items: [
          { text: '自动化部署', link: '/feature-deploy' },
          { text: 'Vscode 特性配置', link: '/feature-vscode' },
          {
            text: '摸鱼工具',
            items: [
              { text: '阅读器', link: '/play-epub-reader' },
            ],
          },
        ],
        activeMatch: 'feature|play',
      },
    ],

    sidebar: {
      '/ai': [
        AI,
      ],
      '/problem': PROJECT_PROBLEM,
      '/project': PROJECT_PROBLEM,
      '/feature': PLAY_DX,
      '/play': PLAY_DX,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/code-jbrc/Awesome-15docs' },
    ],

    editLink: {
      pattern: 'https://github.com/code-jbrc/Awesome-15docs/tree/main/docs/src/:path',
      text: '在 GitHub 编辑此页',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
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
  vite: {
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '../../$1') },
      ],
    },
  },
})
