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

## 报错：background.ts.f0ca535e.js:1 Failed to attach debugger: Error: Cannot access a chrome-extension:// URL of different extension

解决办法：

[https://stackoverflow.com/questions/31054482/chrome-debugger-api-attach-extension-error](https://stackoverflow.com/questions/31054482/chrome-debugger-api-attach-extension-error)

两个 flag

`--silent-debugger-extension-api`

To allow debugging of background pages.

`--extensions-on-chrome-urls`

To allow debugging of other extensions.

## 获取浏览器控制台输出

```ts
export class ConsoleLogger {
  private debuggee: chrome.debugger.Debuggee
  private callback: (message: string) => void

  constructor(tabId: number, callback: (message: string) => void) {
    this.debuggee = { tabId }
    this.callback = callback
  }

  async attach() {
    try {
      await chrome.debugger.attach(this.debuggee, '1.3')
      await chrome.debugger.sendCommand(this.debuggee, 'Console.enable')

      chrome.debugger.onEvent.addListener((source, method, params) => {
        if (method === 'Console.messageAdded' && source.tabId === this.debuggee.tabId)
          this.callback((params as any)?.message?.text || '')

      })
    }
    catch (err) {
      console.error('Failed to attach debugger:', err)
    }
  }

  async detach() {
    try {
      await chrome.debugger.detach(this.debuggee)
    }
    catch (err) {
      console.error('Failed to detach debugger:', err)
    }
  }
}
```