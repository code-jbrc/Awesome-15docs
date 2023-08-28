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

- `Alt + <--`返回上一步，可以方便阅读源码

- `ctrl + shift + L`选择所有找到的查找匹配项，，类似于全选`cmd + D`

## Mac

- `shift + cmd + L` 全选匹配词，类似于全选`cmd + D`

![](https://github.com/lokalise/i18n-ally/assets/96854855/6fa34a26-f6b5-4bcd-a64a-5a66c8d52069)

## 为性能开销较大的插件单独开线程运行

```json
{
  "extensions.experimental.affinity": {
    "pub.name": 1,
    "pub.name2": 2
  }
}
```

## Native Tabs 同一编辑器多个项目

- **只有Mac能开**

## 插件推荐

### 增量选择插件

`expand-region` 类似于 `Structural Selection` (Control-W) in the JetBrains IDE's 

### 多行编辑插件

`Toggle Column Selection` 类似于 `JetBrains IDE's 多行编辑模式`
