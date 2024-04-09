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

## 给Vp页面加上访问量记录

### 方案一、使用`busuanzi`服务

### 实现过程

1. 安装`busuanzi.pure.js`

```shell
pnpm add -D busuanzi.pure.js
```

2. 在页面路由变化的时候，调用`busuanzi`服务

```ts
export default {
  enhanceApp: ({ router }: EnhanceAppContext) => {
    router.onAfterRouteChanged = () => {
      isClient && busuanzi.fetch()
    }
  },
}
```

3. 通过md编译插件为每个页面添加上阅读量组件

4. 添加`busuanzi_value_page_pv`唯一标识至标签中

```html
阅读量：<span id="busuanzi_container_page_pv"><span id="busuanzi_value_page_pv" /></span>
```

**实现原理：**

当页面路由变化后，在变化后的页面发送`busuanzi`的请求，并通过jsonp回调函数执行，添加访问量到`ID`中，完成访问量的记录。

### 常见问题

1. `busuanzi.fetch()`调用前，需要判断是否是客户端，否则`Node`打包会报错。
2. `referrer`默认是`strict-origin-when-cross-origin`，需更改`referrer`策略，以达到发送网站信息，准确记录网站访问量
- 比如：`unsafe-url`、`no-referrer-when-downgrade(推荐)`

:::warning 注意：
`strict-origin-when-cross-origin` 是一个`CSP（Content Security Policy）`的策略指令，用于指定浏览器在跨域请求时如何发送`Referer`头信息。当浏览器从一个站点跳转到另一个站点时，`Referer`头信息会告诉目标站点请求来自哪个站点。这个指令的作用是在跨域请求时，只有在目标站点和源站点的协议、主机名和端口号都相同时，会发送`Referer`头信息，否则不发送。

例如，如果当前页面的`URL`是 `https://example.com/page1.html`，并且它包含一个指向`https://example.net/page2.html` 的链接，那么如果链接中包含 `rel`="`noreferrer`" 属性或没有设置 `rel` 属性，那么在跳转到 `https://example.net/page2.html` 时，`Referer`头信息将不会包含 `https://example.com/page1.html` 这个信息。但是，如果在当前页面的`HTTP`应头中设置了 
`Referrer-Policy`:`strict-origin-when-cross-origin`，那么在跨域请求时，只有当目标站点和源站点的协议、主机名和端口号都相同时，才会发送`Referer`头信息。
这个指令可以帮助保护用户的隐私，因为它可以防止目标站点获取到来自其他站点的`Referer`头信息，从减少了跨站点追踪的可能性。
:::

### 方案二、Visitor Badge

**使用方法**

[点击查看文档](https://visitor-badge.laobi.icu/#docs)

## react-docgen-typescript 解析问题

当使用`docgen.parse`时，若加了`displayName`那么只会识别并返回对应的组件，并更改解析后的`displayName`为相应的值

若不指定`displayName`则返回全部`export`的组件