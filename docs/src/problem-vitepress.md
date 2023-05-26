---
title: Vitepress 开发问题记录
outline: [2, 3]
---

# Vitepress 开发问题记录

## 给Vitepress快速添加全局搜索

### 一、用内置的`local`搜索功能

在`vitepress`的配置里加上这一段
```json
{
  "themeConfig": {
    "search": {
      "provider": "local",
      "options": {
        "translations": {
          "button": { "buttonText": "搜索文档", "buttonAriaLabel": "搜索文档" },
          "modal": {
            "noResultsText": "无法找到相关结果",
            "resetButtonTitle": "清除查询条件",
            "footer": {
              "selectText": "选择",
              "navigateText": "切换",
              "closeText": "关闭"
            }
          }
        }
      }
    }
  }
}
```

**随后出现的效果如图：**

<img width="943" alt="image" src="https://github.com/sxzz/vue-macros/assets/96854855/96e01fad-a434-4a79-bfb9-04ed0ffd2525">

### 二、使用社区的插件`vitepress-plugin-search `或者`vitepress-plugin-pagefind`

以`vitepress-plugin-search`为例

**安装依赖**

```bash
pnpm add -D vitepress-plugin-search flexsearch
```

`vite`配置中添加插件

```ts
import { SearchPlugin } from 'vitepress-plugin-search'

const searchOptions = {
  previewLength: 62,
  buttonLabel: 'Search',
  placeholder: 'Search docs',
}

export default {
  vite: {
    plugins: [
      SearchPlugin(searchOptions),
    ],
  },
}
```

**效果图：**

<img width="767" alt="image" src="https://github.com/sxzz/vue-macros/assets/96854855/9e75d928-7aa2-4d85-879c-52fb46680312">
