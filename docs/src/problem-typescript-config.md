---
title: Ts 配置详解
---

# Typescript （tsconfig详解）
## Typescript 5.0 更新
> [TypeScript 5.0 正式发布！](https://juejin.cn/post/7211151196329115704)
### allowImportingTsExtensions

`--allowImportingTsExtensions `允许 TypeScript 文件使用特定于 TypeScript 的扩展名（如 `.ts、.mts 或 .tsx`）相互导入。

仅当启用 `--noEmit` 或 `--emitDeclarationOnly` 时才允许使用此标志，因为这些导入路径在运行时无法在 JavaScript 输出文件中解析。 这里的期望是**解析器**（例如打包工具、运行时或其他工具）将使 .ts 文件之间的这些导入正常工作。

### resolvePackageJsonExports
`--resolvePackageJsonExports` 强制 TypeScript 在从 `node_modules` 中的包中读取时查询 `package.json` 文件的 `exports` 字段。
在 `--moduleResolution` 的 `node16、nodenext` 和 `bundler` 选项下，此选项默认为 `true`。

### resolvePackageJsonImports
`--resolvePackageJsonImports` 强制 TypeScript 在从其祖先目录包含 `package.json` 的文件执行以` # `开头的查找时查询 `package.json` 文件的 `imports` 字段。
在 `--moduleResolution` 的 `node16、nodenext` 和 `bundler` 选项下，此选项默认为 `true`。

## moduleResolution 详解
> 参考地址：[tsconfig之moduleResolution详解](https://blog.csdn.net/weixin_40013817/article/details/127200965)
### 作用
`moduleResolution`：模块解析策略,是指编译器在查找导入模块内容时所遵循的流程

## 模块解析分析
如下代码，编辑器会采用模块解析策略 Node 和 Classic，去查找 moduleB 在哪里？如果最后找不到，
编译器不能解析这个模块会返回错误 error TS2307: Cannot find module 'moduleA'

```ts
import { b } from './moduleB'
```

### 模块的相对以及非相对模块导入
相对导入是以 /，./ 或 ../ 开头的

```ts
import { DefaultHeaders } from '../constants/http'
import Entry from './components/Entry'
import '/mod'
```

其它形式的导入被当作非相对的

```ts
import * as $ from 'jQuery'
import { Component } from '@angular/core'
```

## 模块解析策略
- 共有两种可用的模块解析策略：`Node `和 `Classic`。
- 可以使用 `--moduleResolution` 标记来指定使用哪种模块解析策略。
- 若未指定，那么在使用了 `--module AMD | System | ES2015` 时的默认值为 `Classic`，其它情况时则为 `Node`。

## Classic 策略
这种策略在以前是 TypeScript 默认的解析策略。

**相对导入的模块是相对于导入它的文件进行解析的**
如 `/root/src/folder/A.ts` 文件里的 `import { b } from "./moduleB"` 会使用下面的查找流程

- /root/src/folder/moduleB.ts
- /root/src/folder/moduleB.d.ts

**非相对模块的导入**
从包含导入文件的目录开始依次向上级目录遍历，尝试定位匹配的声明文件

如 /root/src/folder/A.ts 文件里的 import { b } from "moduleB" 会使用下面的查找流程

- /root/src/folder/moduleB.ts
- /root/src/folder/moduleB.d.ts
- /root/src/moduleB.ts
- /root/src/moduleB.d.ts
- /root/moduleB.ts
- /root/moduleB.d.ts
- /moduleB.ts
- /moduleB.d.ts

## Node 策略
**Node.js 相对导入**
如 /root/src/moduleA.js 文件里的 var x = require("./moduleB"); 会使用下面的查找流程

- /root/src/moduleB.js
- /root/src/moduleB 目录是否包含一个 package.json 文件，且 package.json 文件指定了一个 main 模块，如果 Node.js 发现文件 /root/src/moduleB/package.json 包含了 { "main": "lib/mainModule.js" }，那么 Node.js 会引用 /root/src/moduleB/lib/mainModule.js
- /root/src/moduleB 目录是否包含一个 index.js，这个文件会被隐式地当作那个文件夹下的 main 模块。
  
**Node.js 非相对导入**
Node 会在一个特殊的文件夹 node_modules 里查找你的模块。 node_modules 可能与当前文件在同一级目录下，或者在上层目录里。 Node 会向上级目录遍历，查找每个 node_modules 直到它找到要加载的模块。

如 /root/src/moduleA.js 文件里的 var x = require("moduleB"); 会使用下面的查找流程

- /root/src/node_modules/moduleB.js

- /root/src/node_modules/moduleB/package.json (如果指定了 main 属性)

- /root/src/node_modules/moduleB/index.js

- /root/node_modules/moduleB.js

- /root/node_modules/moduleB/package.json (如果指定了 main 属性)

- /root/node_modules/moduleB/index.js

- /node_modules/moduleB.js

- /node_modules/moduleB/package.json (如果指定了 main 属性)

- /node_ymodules/moduleB/index.js

## Typescript 策略
### TypeScript 相对导入
TypeScript 是模仿 Node.js 运行时的解析策略来在编译阶段定位模块定义文件。

- TypeScript 在 Node 解析逻辑基础上增加了 TypeScript 源文件的扩展名（ .ts，.tsx 和 .d.ts）
- TypeScript 在 package.json 里使用字段 types 来表示类似 main 的意义 - 编译器会使用它来找到要使用的 main 定义文件
如 /root/src/moduleA.ts 文件里的 import { b } from "./moduleB" 会使用下面的查找流程

- /root/src/moduleB.ts
- /root/src/moduleB.tsx
- /root/src/moduleB.d.ts
- /root/src/moduleB/package.json (如果指定了 types 属性)
- /root/src/moduleB/index.ts
- /root/src/moduleB/index.tsx
- /root/src/moduleB/index.d.ts

### TypeScript 非相对的导入
如 /root/src/moduleA.ts 文件里的 import { b } from "moduleB" 会使用下面的查找流程

/root/src/node_modules/moduleB.ts

/root/src/node_modules/moduleB.tsx

/root/src/node_modules/moduleB.d.ts

/root/src/node_modules/moduleB/package.json (如果指定了 types 属性)

/root/src/node_modules/moduleB/index.ts

/root/src/node_modules/moduleB/index.tsx

/root/src/node_modules/moduleB/index.d.ts

/root/node_modules/moduleB.ts

/root/node_modules/moduleB.tsx

/root/node_modules/moduleB.d.ts

/root/node_modules/moduleB/package.json (如果指定了 types 属性)

/root/node_modules/moduleB/index.ts

/root/node_modules/moduleB/index.tsx

/root/node_modules/moduleB/index.d.ts

/root/node_modules/moduleB.ts

/root/node_modules/moduleB.tsx

/root/node_modules/moduleB.d.ts

/root/node_modules/moduleB/package.json (如果指定了 types 属性)

/root/node_modules/moduleB/index.ts

/root/node_modules/moduleB/index.tsx

/root/node_modules/moduleB/index.d.ts

---