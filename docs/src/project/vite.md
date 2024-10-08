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

## HSTS 自动重定向到 https 修复

项目开启了 `http2` 后，响应头上会加上 `Strict-Transport-Security: max-age=31536000`，导致本地开发时，`http` 会 `307` 临时重定向到 `https`，并且浏览器会缓存这个重定向，导致后续无法访问 `http`。

解决办法：

[HSTS: Fix automatic re-routing of http:// to https:// on localhost in Web Browsers](https://weblog.west-wind.com/posts/2022/Oct/24/Fix-automatic-rerouting-of-http-to-https-on-localhost-in-Web-Browsers)

设置响应头`Strict-Transport-Security: max-age=0`

```info
若出现类似`http: protocol error: unknown error: net::ERR_FAILED`的错误，可以尝试清除浏览器缓存，或者直接通过 devtools 的 network 面板 `disable cache` 来禁用缓存
```

## Debug node_modules 依赖

[Cannot watch specific dependencies in node_modules](https://github.com/vitejs/vite/issues/8619)

```ts
import { ViteDevServer } from 'vite'

export function pluginWatchNodeModules(modules) {
  // Merge module into pipe separated string for RegExp() below.
  const pattern = `/node_modules\\/(?!${modules.join('|')}).*/`
  return {
    name: 'watch-node-modules',
    configureServer: (server: ViteDevServer): void => {
      server.watcher.options = {
        ...server.watcher.options,
        ignored: [
          new RegExp(pattern),
          '**/.git/**',
        ]
      }
    }
  }
}
```
Then to use it, pass into your plugins array like so:

```ts
// Import from the separate file you might store this in, e.g. 'utils'
import { pluginWatchNodeModules } from './utils'

const config = {
  plugins: [
  // ... other plugins...
    pluginWatchNodeModules(['your-plugin', 'another-example']),
  ]
}
```

Edit: p.s. Don't forget to ensure that you exclude these packages from optimizeDeps like so:

```json
{
  "optimizeDeps": {
    "exclude": [
      "your-plugin",
      "another-example"
    ]
  }
}
```
