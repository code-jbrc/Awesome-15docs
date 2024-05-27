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

## JS 情况下 XMLHttpRequest/fetch 请求，Get 的 body 被忽略

在 `XMLHttpRequest` 和 `fetch` 请求中，`GET` 请求的 `body` 会被忽略。这是因为 `GET` 请求的 `body` 是不被允许的，所以浏览器会忽略它。

> Unfortunately, this doesn't seem to be an axios problem. The problem seems to lie on the http client implementation in the browser javascript engine.> 
>
> According to the documentation and the spec XMLHttpRequest ignores the body of the request in case the method is GET. If you perform a request in Chrome/> Electron with XMLHttpRequest and you try to put a json body in the send method this just gets ignored.> 
>
> Using fetch which is the modern replacement for XMLHtppRequest also seems to fail in Chrome/Electron.