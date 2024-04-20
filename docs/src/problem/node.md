---
title: Node 问题记录
---

## await import

当使用`await import`的时候，如果是`win`系统，在使用绝对路径的时候，需要带上`file://`否则，就会报错并提示

```bash
Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file and data are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
    at new NodeError (node:internal/errors:399:5)
    at throwIfUnsupportedURLScheme (node:internal/modules/esm/resolve:1059:11)
    at defaultResolve (node:internal/modules/esm/resolve:1135:3)
    at nextResolve (node:internal/modules/esm/loader:163:28)
    at ESMLoader.resolve (node:internal/modules/esm/loader:838:30)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:424:18)
    at ESMLoader.import (node:internal/modules/esm/loader:525:22)
    at importModuleDynamically (node:internal/modules/esm/translators:110:35)
    at importModuleDynamicallyCallback (node:internal/process/esm_loader:35:14)
    at K (file:///D:/Global/node/pnpm-global/5/.pnpm/@winches+ghost@1.1.9_vue@3.2.47/node_modules/@winches/ghost/dist/bin.js:3:1533) {
  code: 'ERR_UNSUPPORTED_ESM_URL_SCHEME'
}
```

## import 和 require 执行顺序问题

- import 是值的引用，require 是值的拷贝
- 可以在import前使用该变量，因为他会类似于变量提升一样先执行，require不可以
- 详情可看[require和import的区别](https://zhuanlan.zhihu.com/p/121770261)

## node js 18以后由于 OpenSSL 加密，需要调整一下环境变量

报错信息：Error: error:0308010C:digital envelope routines::unsupported

您可以按照以下步骤执行此命令：

打开命令提示符或终端窗口。

输入以下命令并按 `Enter` 键执行：

```bash
set NODE_OPTIONS=–openssl-legacy-provider
```

或者，如果您使用的是 `macOS` 或 `Linux`，可以使用以下命令：

```bash
export NODE_OPTIONS=–openssl-legacy-provider
```

然后，您可以尝试重新运行您的应用程序，看看是否仍然会出现 `digital envelope` `routines` 的错误。

# node-gyp 问题

## if not defined npm_config_node_gyp

如果未定义 `npm_config_node_gyp` ，那么可能是没有正确安装或配置 `node-gyp`，这是一个 `Node.js` 包管理器，用于编译 `C++` 扩展。要解决这个问题，需要先安装 `node-gyp`，可以使用 `npm` 安装：`npm install -g node-gyp`。然后需要确保系统中已经安装了所需的编译工具，如 `Python2.7.10` 和 `Visual Studio C++桌面组件 2015`（`Windows` 系统）或 `GCC（Linux/macOS` 系统）。

指定`node-gyp`地址

```bash
npm config set node_gyp "C:\Users\me\AppData\Roaming\npm\node_modules\node-gyp\bin\node-gyp.js"
```

## node-gyp 网络请求问题

**gyp ERR! stack FetchError: request to https://nodejs.org/download/...headers.tar.gz failed**

解决办法：

**1、外网安装后拖到本地**

issues: https://github.com/nodejs/help/issues/3686

```bash
cd /tmp && wget https://nodejs.org/download/release/v16.13.2/node-v16.13.2-headers.tar.gz

npm config set tarball /tmp/node-v16.13.2-headers.tar.gz

npm ci
```

注意：

`npm config set tarball`若出现`is not a valid npm option`可能是`npm`版本过高比如`npm`9+，降级后正常

**2、设置镜像源**

**1、package.json里添加scripts**

```json
{
  "scripts": {
    "ni": "node-gyp configure --disturl=custom_url && pnpm i"
  }
}
```

**2、在npm命令行使用**

阅读：[从源码分析node-gyp指定node库文件下载地址](https://juejin.cn/post/6963147704075550757)

```bash
// 你的package.json scripts字段
"build": "node-gyp configure"
// 然后在命令行调用
npm run build --disturl=xxx
```

情况1下，`disturl`是作为`node-gyp`的参数进行解析，能够被设置到`opts`中。
情况2，`disturl`是作为`npm`的参数被加入到`npm`环境变量：`npm_config_disturl`，此时，`node-gyp`解析`process.env`的时候，也能解析到`disturl`进而设置到`opts`。

## Error: Could not find any Visual Studio installation to use

[离线安装visual studio官方地址](https://learn.microsoft.com/zh-cn/visualstudio/install/create-an-offline-installation-of-visual-studio?view=vs-2022&source=recommendations)

[【VS离线安装】Visual Studio2022社区版从已安装的联网计算机迁移至未联网的计算机上](https://blog.csdn.net/weixin_44589672/article/details/132274672)

解决方案：

**方案1:**

根据报错提示安装`visual studio 2015`, 并引入相关的`c++`桌面开发

**方案 2:**

可以试下全局安装构建工具

```bash
npm install --global windows-build-tools
```

**Tips**

相关依赖是否需要`python`环境? 需要可安装`2.7.x`版本

## 缺少binding_node模块

进入对应缺少模块的依赖中运行

```bash
node-gyp rebuild
```

## 找不到fetch

需要`nodejs 18+`以上版本，若报类型错误，则添加`tsconfig.json`，`lib: ['dom']`

## 如何获取终端的上下文信息

在`PoswerShell`中，`PowerShell`的历史记录通常存储在以下位置：

%USERPROFILE%\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt

这里会实时记录着终端的上下文指令，可以通过`fs.readFileSync`指令去获取

## tsx 断点失败，出现断点进编译后的可读文件中

`nodejs 20+` 问题导致的，降级到 `nodejs 18`后解决

## 通过 nodejs 打开编辑器跳转到源文件

```ts
// 浏览器端发送一个请求，nodejs端监听该请求
fetch(`/__open-in-editor?file=${src}`).then(
  () => console.log(`%c🚀 ~ launch ~ file: ${src}`, 'color: cyan'),
  () => console.error(`Unable to open: ${src}`),
)
```

```ts
// nodejs端监听请求
import type { IncomingMessage } from 'node:http'
import * as path from 'node:path'
import url from 'node:url'
import launch from 'launch-editor'
import { ROOT } from './helpers/path'

export function launchEditorMiddleware() {
  return (req: IncomingMessage) => {
    if (req.url.includes('/__open-in-editor')) {
      const { file } = url.parse(req.url, true).query || {}
      if (!file) {
        console.error('launch-editor-middleware: required query param "file" is missing.')
      }
      else {
        console.log('\x1B[96m%s\x1B[0m', `🚀 ~ launch ~ file: ${file}`)

        launch(path.resolve(ROOT, file as string), 'code', () => {
          console.error(`Unable to open ${file}`)
        })
      }
    }
  }
}
```