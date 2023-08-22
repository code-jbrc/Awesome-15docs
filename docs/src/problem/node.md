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