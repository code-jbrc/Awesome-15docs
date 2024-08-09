---
title: React 开发记录
---

## useImperativeHandle 暴露部分 API

https://react.docschina.org/learn/manipulating-the-dom-with-refs

```ts
useImperativeHandle(ref, () => ({
  // 只暴露 focus，没有别的
  focus() {
    realInputRef.current.focus()
  },
}))
```

## flushSync

`flushSync` 中的代码执行后，立即同步更新 `DOM`

https://react.docschina.org/learn/manipulating-the-dom-with-refs

```ts
function handleAdd() {
  const newTodo = { id: nextId++, text }
  flushSync(() => {
    setText('')
    setTodos([...todos, newTodo])
  })
  listRef.current.lastChild.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  })
}
```

## useMemo

`useMemo Hook` 类似于 `computed` 缓存（或者说 记忆（`memoize`））一个昂贵的计算。

https://react.docschina.org/learn/you-might-not-need-an-effect

```ts
import { useMemo, useState } from 'react'

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')
  const visibleTodos = useMemo(() => {
    // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行
    return getFilteredTodos(todos, filter)
  }, [todos, filter])
  // ...
}
```

## 灵活运用组件 key

https://react.docschina.org/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes

通常，当在相同的位置渲染相同的组件时，React 会保留状态。通过将 userId 作为 key 传递给 Profile 组件，使  React 将具有不同 userId 的两个 Profile 组件视为两个不应共享任何状态的不同组件。每当 key（这里是 userId）变化时，React 将重新创建 DOM，并 重置 Profile 组件和它的所有子组件的 state。现在，当在不同的个人资料之间导航时，comment 区域将自动被清空。

## composeRefs

```ts
type PossibleRef<T> = React.Ref<T> | undefined

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function')
    ref(value)
  else if (ref !== null && ref !== undefined)
    (ref as React.MutableRefObject<T>).current = value
}
export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach(ref => setRef(ref, node))
}
```

## dom 有关的操作可以参考

[https://samthor.au/2021/observing-dom/](https://samthor.au/2021/observing-dom/)

## React 类型报错

### 'React' refers to a UMD global

[https://www.totaltypescript.com/react-refers-to-a-umd-global](https://www.totaltypescript.com/react-refers-to-a-umd-global)

react 16 以前需要手动引入

17 之后，只需要加上配置

```json
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

## 解决React中遇到的 “xxxx”不能用作 JSX 组件 问题

[https://juejin.cn/post/7089463577634930718](https://juejin.cn/post/7089463577634930718)

检查`@types/react-dom` 和 `@types/react` 的版本是否一致

## useResizeObserver

监听元素大小变化后，执行回调

```ts
import { throttle } from 'lodash'
import { RefObject, useLayoutEffect, useMemo } from 'react'

export function useResizeObserver(ref: RefObject<HTMLElement>, callBack: (element: HTMLElement) => void, delay = 50) {
  const trigger = useMemo(
    () =>
      throttle((ele) => {
        callBack(ele)
      }, delay),
    [],
  )

  useLayoutEffect(() => {
    if (!ref.current)
      return

    const observer
      = 'ResizeObserver' in window
        ? new ResizeObserver(() => {
          trigger(ref.current)
        })
        : null
    if (observer)
      observer.observe(ref.current)

    // initial check
    trigger(ref.current)
    return () => {
      // disconnect
      if (observer)
        observer.disconnect()

    }
  }, [ref])
}
```

## React 深色模式/暗黑模式

参考资料：

- [next-themes](https://github.com/pacocoursey/next-themes)

- [The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/)

- [theme-color](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name/theme-color)

用 media 来查询一个媒体类型，如果条件符合则使用对应颜色

```html
<!-- 当用户选择明亮摸索是，则用户界面主题色同步改为，白色 -->
<meta
  name="theme-color"
  media="(prefers-color-scheme: light)"
  content="white" />
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
```

```js
// Nextjs
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
```

## useEffect 使用心得

1. 对于 `deps`，若是 `[]`，则只会执行一次，执行时机是 `componentDidMount`，若是 `undefined`，则会执行多次，执行时机是 `componentDidUpdate`。

因此，如果 `deps` 里是 `domref` 则可以不加，因为 `domref` 会在 `componentDidMount` 时就有值，不会变化，想加事件可以直接用 `onXxx` 注册。

但是，对于 `useMemo, useCallback` 之类的，如果依赖了 `domref`，则需要加上 `domref`，否则会出现 `undefined` 的情况。

## Hooks

### useLatestCallback

作用替代 `useCallback`，解决返回函数地址不同问题

```ts
export function useLatestCallback<F extends (...args: any[]) => any>(fn: F): LatestCallback<F> {
  const cb = useRef<LatestCallback<F>>()
  if ('fn' in fn)
    return fn as any

  if (!cb.current)
    cb.current = Object.assign<any, any>((...args: any[]) => cb.current!.fn(...args), { fn })
  else if (cb.current.fn !== fn)
    cb.current.fn = fn

  return cb.current!
}
```

## createContext 和 useContext 粗略实现

```tsx
import { useEffect, useRef } from 'react'

export function useContext(context: any) {
  const { Provider: { state } } = context
  useEffect(() => {

    console.log('🚀 ~ useContext ~ state:', state)
  }, [context])

  return {
    ...state
  }
}

export function createContext<T>(initState: T) {
  function Provider<T>(props: {
    value: T
    children?: React.ReactNode
  }) {
    const state = useRef(initState)
    Provider.state = state.current

    const { value, children } = props

    useEffect(() => {
      console.log('value changed:', value)
      state.current = value as any
    }, [value])

    return children
  }
  Provider.state = initState

  const context = {
    Provider,
  }

  return context
}
```

## renderComponent 和 Component 写法

### renderComponent 容易造成父组件 hook 不一致问题

隐性的 hooks 执行顺序问题。如果改成组件，就会是组件内部的 hooks 顺序，如果是 renderFunction ，就会是父组件的 hooks 顺序问题

## Component not a function

可能原因 ForwardRef 包了 Memo 造成的

## React 实现一个 Iframe 组件

```tsx
import React, { useState } from 'react'
import { createPortal } from 'react-dom'

function Iframe({ children, ...props }) {
  const [contentRef, setContentRef] = useState(null)
  const mountNode = contentRef?.contentWindow?.document?.body

  return (
    <iframe title="iframe" {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}

export default Iframe
```
