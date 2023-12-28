---
title: Vscode 插件开发
---

## 如何给Tree添加上折叠功能

`showCollapseAll` 设置为 `true` 即可。

```ts
vscode.window.createTreeView('mixinsTree', { treeDataProvider: mixinsTreeProvider, showCollapseAll: true })
```

## 获取当前页面的outline数据

```ts
await commands.executeCommand<DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', textDocument.uri)
```
