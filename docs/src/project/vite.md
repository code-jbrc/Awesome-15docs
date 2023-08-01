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