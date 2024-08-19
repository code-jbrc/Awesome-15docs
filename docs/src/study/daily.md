---
title: 日常学习资料
---

## Javascript V8 性能优化代码

好文推荐：[Optimizing Javascript for fun and for profit](https://romgrk.com/posts/optimizing-javascript/)

## Slack 创建一个 App 应用

[官网 QuickStart](https://api.slack.com/quickstart)

[官网 App 地址](https://api.slack.com/apps)

主要按照官网的流程

1. 先创建一个 App，选择一个 Workspace
2. 添加 Bot 的权限，比如 `chat:write`
3. 在 Workspace 中添加 App，即安装 App 到频道中

发送信息

1. 配置 Bot 的监听事件，比如 `message.channels`
2. 通过 Webhook 直接用 Bot 发送消息

## Slack 创建工作流

[官网 Workflow Builder](https://slack.com/intl/zh-cn/help/articles/17542172840595-%E6%9E%84%E5%BB%BA%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%EF%BC%9A%E5%9C%A8-Slack-%E4%B8%AD%E5%BB%BA%E7%AB%8B%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B#%E5%8F%98%E9%87%8F-1)

它可以接收 webhook 和设置变量，然后重新发送到指定位置，频道/个人

## Slack 工具合集

> [Slack help center](https://slack.com/intl/zh-cn/help/categories/360000049043)
> [Slack message playground](https://app.slack.com/block-kit-builder/T011CF3CMJN#%7B%22blocks%22:%5B%5D%7D)
> [Slack api 文档](https://api.slack.com/tutorials)

## 代理问题

cookie domain 跨域问题修复

```ts
const proxyConfig = {
  target: DEFAULT_PROXY_TARGET,
  router: (req) => {
    const host = req.headers.cookie
      ?.split(/\s*;\s*/g)
      .find(item => item.startsWith('test='))
      ?.substring('test='.length)
    return host || DEFAULT_PROXY_TARGET
  },
  secure: false,
  changeOrigin: true,
  cookieDomainRewrite: 'localhost'
}

const res = {
  proxy: {
    '/api': proxyConfig,
  },
}
```

## types 导出问题

是否导出正确的 types 以供使用

[https://arethetypeswrong.github.io/](https://arethetypeswrong.github.io/)

```json
{
  "exports": {
    "./types": {
      "import": "./types",
      "require": "./types",
      "types": "./types"
    },
    "./src/*": "./src/*",
    "./*": "./*"
  },
  "main": "./dist/index.js",
  "types": "./dist/types/index.d.ts",
  "import": "./dist/index.js"
}
```

## Wakatime 无限 initializing

可能是 `wakatime-internal.cfg` 出问题

出问题的文件

```sh
[internal]
cli_version_last_accessed = 1722159975
backoff_retries           = 0
backoff_at                = 
heartbeats_last_sent_at   = 2024-07-29T09:48:16+08:00
```

重新删掉后新的配置文件会重新生成，backoff_at 应该是导致无限 initializing 的原因

```sh
[internal]
heartbeats_last_sent_at = 2024-07-29T12:05:02+08:00
```

## lexical 富文本的 bullet list ::marker 伪类丢失问题

`tailwindcss` 的 `list-style: none` 对 `ul,ol` 会导致 `::marker` 伪类丢失

`li` 需要设置 `display: list-item`

导致 lexical 的 bullet list 无法正常显示

`list-style: disc` 设置无须列表样式，`list-style-type: auto` 设置有序列表样式

## lexical 富文本导出的样式带上 style，避免消费方丢失样式

重写 HTMLPlugin， `$generateHtmlFromNodes` 方法 搭配 `OnChangePlugin` 在变更时导出样式

```ts
function $appendNodesToHTML(
  editor: LexicalEditor,
  currentNode: LexicalNode,
  parentElement: HTMLElement | DocumentFragment,
  selection: BaseSelection | null = null,
): boolean {
  let shouldInclude = selection !== null ? currentNode.isSelected(selection) : true
  const shouldExclude = $isElementNode(currentNode) && currentNode.excludeFromCopy('html')
  let target = currentNode

  if (selection !== null) {
    let clone = $cloneWithProperties(currentNode)
    // eslint-disable-next-line no-mixed-operators
    clone = $isTextNode(clone) && selection !== null ? $sliceSelectedTextNodeContent(selection, clone) : clone
    target = clone
  }

  const children = $isElementNode(target) ? target.getChildren() : []
  const registeredNode = editor._nodes.get(target.getType())
  let exportOutput

  // Use HTMLConfig overrides, if available.
  if (registeredNode && registeredNode.exportDOM !== undefined)
    exportOutput = registeredNode.exportDOM(editor, target)
  else
    exportOutput = target.exportDOM(editor)

  const { element, after } = exportOutput

  if (!element)
    return false

  /** ======================== Custom part ======================== */
  // Add class to style
  if (element instanceof HTMLElement) {
    const classList = element.classList

    if (classList.length) {
      classList.forEach((className) => {
        if (className.startsWith('moe')) {
          const mapStyleValue = styledStyleMap[className] || ''
          const prevStyle = element.getAttribute('style') || {}
          const style = getStyleObjectFromCSS(mapStyleValue)
          const mergedStyle = { ...prevStyle, ...style }
          const styleString = getCSSFromStyleObject(mergedStyle)

          element.setAttribute('style', styleString)
        }
      })
    }
  }
  /** ======================== Custom part ======================== */

  const fragment = document.createDocumentFragment()

  for (let i = 0; i < children.length; i++) {
    const childNode = children[i]
    const shouldIncludeChild = $appendNodesToHTML(editor, childNode, fragment, selection)

    if (
      !shouldInclude
      && $isElementNode(currentNode)
      && shouldIncludeChild
      && currentNode.extractWithChild(childNode, selection, 'html')
    )
      shouldInclude = true

  }

  if (shouldInclude && !shouldExclude) {
    if (isHTMLElement(element))
      element.append(fragment)

    parentElement.append(element)

    if (after) {
      const newElement = after.call(target, element)
      if (newElement)
        element.replaceWith(newElement)

    }
  }
  else {
    parentElement.append(fragment)
  }

  return shouldInclude
}
```