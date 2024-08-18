import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import { MarkdownTransform } from './plugins/markdownTransform'

const CSS_LIBRARY = {
  text: 'css 开发框架知识',
  items: [
    { text: 'Scss 常用知识点', link: '/css-library/knowledge' },
    { text: 'Scss 开发技巧', link: '/css-library/dev-skill' },
    { text: 'Scss 封装函数', link: '/css-library/function' },
    { text: 'Tailwind 开发技巧', link: '/css-library/tailwind-skill' },
  ],
}

const PLAY_DX = [
  {
    text: 'DX 开发者体验',
    items: [
      { text: '自动化部署', link: '/feature/deploy' },
      { text: 'Vscode 特性配置', link: '/feature/vscode' },
      { text: 'Vscode 插件开发', link: '/feature/vscode-plugin' },
      { text: 'Webstorm 特性配置', link: '/feature/webstorm' },
      { text: '正则表达式技巧', link: '/feature/regexp' },
      { text: '正则通用功能函数', link: '/feature/regexp-fn' },
      { text: 'Node CLI 开发', link: '/feature/node-cli' },
    ],
  },
  CSS_LIBRARY,
  {
    text: '摸鱼工具',
    items: [
      { text: '阅读器', link: '/play/epub-reader' },
    ],
  },
]

const PROJECT = {
  text: '工程化记录',
  items: [
    { text: 'Vite 开发问题', link: '/project/vite' },
    { text: 'AST 学习记录', link: '/project/ast' },
    { text: 'Eslint 配置', link: '/project/eslint' },
    { text: '前端服务监控SDK', link: '/project/monitor' },
    { text: '桌面端应用开发', link: '/project/desktop' },
  ],
}

const PROBLEM_ITEMS = [
  { text: 'Vue 开发问题', link: '/problem/vue' },
  { text: 'Vitepress 开发问题', link: '/problem/vitepress' },
  { text: 'Css 开发问题', link: '/problem/css' },
  { text: 'ReactNative 开发问题', link: '/problem/react-native' },
  { text: 'Github 问题记录', link: '/problem/github' },
  { text: 'Git 开发问题', link: '/problem/git' },
  { text: 'Vscode 开发问题', link: '/problem/vscode' },
  { text: 'Node 开发问题', link: '/problem/node' },
  { text: 'Shell 开发问题', link: '/problem/shell' },
  { text: 'React 开发问题', link: '/problem/react' },
  { text: 'Javascript 开发问题', link: '/problem/javascript' },
  { text: 'Nextui 开发记录', link: '/problem/nextui' },
  { text: 'Next.js 踩坑', link: '/problem/next-js' },
  { text: 'Figma 开发记录', link: '/problem/figma' },
]

const MAC = {
  text: '系统问题记录',
  items: [
    { text: 'Mac 开发问题', link: '/systems/mac' },
    { text: 'Win 开发问题', link: '/systems/win' },
    { text: 'Chrome 开发记录', link: '/systems/chrome' },
  ],
}

const PROJECT_PROBLEM = [
  {
    text: '日常开发记录',
    items: [
      ...PROBLEM_ITEMS,
      { text: 'Markdown Examples', link: '/problem/markdown-examples' },
      { text: 'Runtime API Examples', link: '/problem/api-examples' },
    ],
  },
  {
    text: 'Typescript',
    items: [
      { text: 'Typescript（tsconfig详解)', link: '/problem/typescript-config' },
      { text: 'Typescript 开发问题记录', link: '/problem/typescript' },
    ],
  },
  PROJECT,
  MAC,
]

const STUDY = {
  text: '学习资料推荐',
  items: [
    {
      text: 'AI 推荐',
      items: [
        { text: 'AI 网站推荐', link: '/study/site' },
        { text: 'AI 生图示例', link: '/study/picture' },
      ],
    },
    {
      text: 'AI 学习',
      items: [
        { text: 'Prompt 优化工程', link: '/study/prompt' },
        { text: 'LangChain 知识库', link: '/study/lang-chain' },
      ],
    },
    {
      text: 'Css 设计网站推荐',
      items: [
        { text: 'Css 设计网站推荐', link: '/study/css-site' },
        { text: '渐变色网站推荐', link: '/study/gradients' },
      ],
    },
    {
      text: '日常学习',
      items: [
        { text: '日常学习资料', link: '/study/daily' },
      ],
    },
    {
      text: 'Mobile 移动端记录',
      items: [
        { text: 'Mobile 移动端记录', link: '/study/mobile' },
      ],
    },
  ],
}

const AUTHOR = [
  {
    text: '个人记录',
    items: [
      { text: '生活经历', link: '/author/myself' },
      { text: '个人作品', link: '/author/works' },
      { text: '面试反问', link: '/author/interview' },
      { text: '面试算法', link: '/author/algorithm' },
      { text: '面试知识', link: '/author/interview-knowledge' },
      { text: '工作经历', link: '/author/work-experience' },
      { text: '开源经历', link: '/author/experience' },
    ],
  },
]

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
              { text: 'Typescript（tsconfig详解)', link: '/problem/typescript-config' },
              { text: 'Typescript 开发问题记录', link: '/problem/typescript' },
            ],
          },
          PROJECT,
          MAC,
        ],
        activeMatch: 'problem|example|project',
      },
      {
        ...STUDY,
        activeMatch: 'ai',
      },
      {
        text: 'DX 开发者体验',
        items: [
          ...PLAY_DX,
        ],
        activeMatch: 'feature|play',
      },
      {
        text: '个人记录',
        items: [
          ...AUTHOR,
        ],
        activeMatch: 'author',
      },
    ],

    sidebar: {
      '/study': [
        STUDY,
      ],
      '/problem': PROJECT_PROBLEM,
      '/project': PROJECT_PROBLEM,
      '/systems': PROJECT_PROBLEM,
      '/feature': PLAY_DX,
      '/play': PLAY_DX,
      '/css-library': PLAY_DX,
      '/author': AUTHOR,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/code-jbrc/Awesome-15docs' },
    ],

    editLink: {
      pattern: 'https://github.com/code-jbrc/Awesome-15docs/tree/main/docs/src/:path',
      text: '在 GitHub 编辑此页',
    },

    lastUpdatedText: '最后更新于',

    footer: {
      message: 'Made with ❤️',
      copyright:
        'MIT License © 2023 <a href="https://github.com/winchesHe">winchesHe</a>',
    },

    outline: [2, 3],

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
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
  ],

  srcExclude: ['**/README.md', '**/TODO.md'],

  vite: {
    resolve: {
      alias: [
        { find: /^@\/(.+)/, replacement: resolve(__dirname, '../../$1') },
      ],
    },
    plugins: [
      MarkdownTransform(),
      // plugins
      Components({
        dirs: resolve(__dirname, './theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: resolve(__dirname, './types/components.d.ts'),
        transformer: 'vue3',
      }),
      UnoCSS(),
      Inspect(),
    ],
  },
})
