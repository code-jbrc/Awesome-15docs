---
title: 浏览器插件开发踩坑
---

## Crxjs 浏览器插件开发（vite）问题记录

`Refused to load the script 'chrome-extension://65fbf486-37dc-4a71-a17e-a567b680778b/assets/content.ts-B_w-r5D-.js' because it violates the following Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:* http://127.0.0.1:*". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.`

CSP 策略问题

解决办法：[CSP Issue on Chrome 130+](https://github.com/crxjs/chrome-extension-tools/issues/918)

1. remove chrome.runtime.getURL in content script

```ts
(function () {
  'use strict';

  (async () => {
    await import('./chunk-b674a675.js')
  })().catch(console.error)

})()
```

2. use_dynamic_url set to false