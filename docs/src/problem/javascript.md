---
title: "JavaScript Problem"
---

## ES2021

### ||= 默认值的简洁方式

是一种在 `JavaScript` 中设置默认值的简洁方式。它是在 `ES2021` 中引入的新特性

这行代码的意思是，如果 `options.plugins` 已经有值（并且不是 `null` 或 `undefined`），那么就保持不变。如果 `options.plugins` 是 `null` 或 `undefined`，那么就将其设置为一个空数组 []

```javascript
const test ||= [];
```

## 通过 JS 实现页面的 Copy 功能

```ts
function copy(valueToCopy: string) {
  if ('clipboard' in navigator)
    navigator.clipboard.writeText(valueToCopy)

}
```
