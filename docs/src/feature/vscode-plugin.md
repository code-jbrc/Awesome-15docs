---
title: Vscode 插件开发
---

## 如何给Tree添加上折叠功能

`showCollapseAll` 设置为 `true` 即可。

```ts
vscode.window.createTreeView('mixinsTree', { treeDataProvider: mixinsTreeProvider, showCollapseAll: true })
```
