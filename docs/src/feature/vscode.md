---
title: Vscode 特性配置
---

# Vscode 特性配置

## Vscode 光标样式平滑移动

`Cursor Smooth Caret Animation` 配置打开

- `explicit` 仅在鼠标移动时移动，键入时不移动
- `on` 始终平滑移动

## 快捷键

### Win

- `Alt + L`代码折叠为不超过编辑器宽度显示

- `win + ;`快速呼出`Emoji`

## Mac

- `shift + cmd + L` 全选匹配词，类似于全选`cmd + D`

## 为性能开销较大的插件单独开线程运行

```json
{
  "extensions.experimental.affinity": {
    "pub.name": 1,
    "pub.name2": 2
  }
}
```