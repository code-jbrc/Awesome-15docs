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

## 类原型上的属性方法不会被冒号拓展继承

```ts
class A {
  a = 1
  b = 2
}

A.prototype.c = 3

const b = {
  ...new A(),
}

console.log(b) // { a: 1, b: 2 }
```

通过 extends 继承的类，原型上的属性方法会被继承

## 创建没原型对象的方法

`Object.create(null)` 可以创建一个没有原型的对象

```ts
const obj = Object.create(null)

const Empty = function () {}
Empty.prototype = Object.create(null)

// Optimization: Use new Empty()instead of object.create(null) for performance
// v8 has a better optimization for initializing functions compared to Object
const empty = new Empty()
```

## 拓展展开数组和对象的区别

为什么会有区别？

- **数组**：扩展运算符期望一个可迭代对象，而 `null` 或 `undefined` 不是可迭代的，因此会导致错误。
- **对象**：扩展运算符期望从一个对象中复制属性。由于 `null` 和 `undefined` 没有属性，因此会导致一个空对象，但不会抛出错误。

```ts
const array = [...null] // TypeError: null is not iterable
const object = { ...null } // Results in an empty object, no error
```
