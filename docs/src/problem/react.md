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