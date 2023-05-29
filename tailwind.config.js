/** @type {import('tailwindcss').Config} */
module.exports = {
  // 找不到vp的indexhtml不知道打包后有没有影响
  content: ['./index.html', './docs/src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {

  },
  //   plugins: [require('@tailwindcss/line-clamp')],
  // 可以自定义一些css类名
  extend: {},
  corePlugins: {
    preflight: true, // 禁止tailwindcss的默认属性base，防止和组件库的样式产生冲突
  },
  postcss: {
    options: {
      implement: true,
    },
  },
}
