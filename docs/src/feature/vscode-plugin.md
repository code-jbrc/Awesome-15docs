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

## 获取文本

```ts
const wordRange = document.getWordRangeAtPosition(position) // 获取单词范围
const word = document.getText(wordRange) // 根据范围获取文本
const lineText = document.lineAt(position.line).text // 获取行文本
```

## 弹出选择框

```ts
const result = await window.showQuickPick(['1', '2', '3'], { placeHolder: '请选择' })
```

## 为终端发送命令

```ts
window.activeTerminal?.sendText('echo hello')
```
