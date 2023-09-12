---
title: Vite 问题记录
outline: [2, 3]
---

# Vite 问题记录

## `import.meta.glob`问题记录

### 1. 在同一个模块不会重复调用

当你在一个组件内使用了`import.meta.glob`函数，**如果这个组件复用了多次，这个模块的组件会复用第一次`import.meta.glob`的结果**。

该函数**只会在组件第一次初始化的时候调用，后面的在组件实例会复用初始化时调用的结果**。

## cmj和esm问题记录

### 默认导出的内容，不能用具名导入

```
// 1.ts
export default {
    a: 1,
    b: 2,
};

// 2.ts
import { a } from '1.ts'
// 这样是错误的，不能具名导入
```

### require 不能动态拼接

### cmj不能赋值导出

```ts
// 错误的
const C = Oop.extend({
  // ...
})
module.exports = C

C.TENANT_SUB_VIEW_LIST = TENANT_SUB_VIEW_LIST
```
## 模块引用错误，引用值不存在

由于更新依赖的时候不会删除旧文件，导致本地运行的时候，三方依赖通过`esm`引用的旧文件内容，而该引用未设置值，在本地模块中会通过`setValue`设置值，本地`setValue`中引用的是新文件的内容，从而导致，三方依赖中会报错，引用值不存在（因为本地文件`setValue`调用的新文件，三方依赖用的旧文件）

解决办法：

直接删除`node_modules` .`pnpm` 里的旧文件

## postcss 路径配置

`postcss.config.js`里的`path`路径可以指定在哪个地方寻找文件

```js
require('postcss-import')({
  path: [
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../packages'),
    path.resolve(__dirname, '../node_modules'),
  ],
})
```
