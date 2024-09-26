---
title: 日常踩坑
---

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

## Lexical 匹配邮箱，并且添加`mailto`唤起客户端前缀

```ts
const EMAIL_REGEX
  = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/

createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
  return `mailto:${text}`
})
```

## Tooltip 实现方式

核心在于实现一个 `state` 状态管理，然后通过 `onMouseEnter` 和 `onMouseLeave` 事件来控制 `state` 状态的显示和隐藏，即使 `trigger` 触发 `onMouseLeave` 事件关闭

但是如果在 `delay` 时间内再次触发 `onMouseEnter` 事件，那么会清空 `close` 的定时器， `state` 状态保持打开

具体参考 `@react-stately/tooltip/src/useTooltipTriggerState.ts`