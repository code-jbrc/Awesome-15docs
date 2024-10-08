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

## vscode 特性配置

### 为性能开销较大的插件单独开线程运行

**实验性配置，不稳定**

```json
{
  "extensions.experimental.affinity": {
    "pub.name": 1,
    "pub.name2": 2
  }
}
```

### Native Tabs 同一编辑器多个项目

- **只有Mac能开**

同一编辑器多个项目（Native Tabs）

还需设置mac（only mac 13+） `Desktop & Dock —> prefer tabs when opening document`

### 将布局视图切换至右侧，放大纲和npm脚本

<img width="269" alt="image" src="https://github.com/code-jbrc/Awesome-15docs/assets/96854855/e9c4805c-1322-4058-98a8-d63f8a0f15dd">

### codeActionsOnSave 自动修复eslint失效

原因：

`"eslint.codeActionsOnSave.rules": []`配置了空数组，直接去掉就可以

配置：

```json
{
  "editor.codeActionsOnSave": {
    "source.organizeImports": false,
    "source.fixAll": false,
    "source.fixAll.eslint": true
  }
}
```

### Wrap Tabs （标签超出范围后显示在下方）

开启`Editor: Wrap Tabs`

控制当超出可用空间时，选项卡是否应在多行之间皇换行，或者是否应显示滚动条

### Tree 视图的 Sticky Scroll

`workbench.tree.enableStickyScroll: true` 

`workbench.tree.stickyScrollMaxItemCount`设置最大的粘贴数量，默认是`7`个，占`40%`的视图高度

### window zoom

`window.zoomLevel`设置全局缩放级别

### SCM 源代码管理

当 SCM 卡了的时候，可以关闭下面的 SCM 配置优化

`scm:show history graph`

<img width="600" alt="image" src="https://github.com/user-attachments/assets/d11474b3-ad7f-404b-baba-44e6fa9b6a27">

## 插件推荐

### 增量选择插件

`expand-region` 类似于 `Structural Selection` (Control-W) in the JetBrains IDE's 

### 多行编辑插件

`Toggle Column Selection` 类似于 `JetBrains IDE's 多行编辑模式`

## Vscode GUI 操作 Git 时，报错 command not found 的解决方案

问题：

GUI 中使用 `husky`, `pre-commit` 中 `npm`, `gpg`, `sh`, `pnpm` 等命令 `command not found`

解决方案：

添加一个 `~/.huskyrc` 文件，内容如下：

```bash
# .huskyrc 由于 nvm 环境变量问题导致 husky hook 找不到命令
# See https://typicode.github.io/husky/#/?id=command-not-found
# This loads nvm.sh and sets the correct PATH before running hook
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# GPG
export GPG_TTY=$(tty)
```

找不到 gpg 命令，需要在 `.gitconfig` 中添加：`git config --global gpg.program /opt/homebrew/bin/gpg`

```bash
[gpg]
	program = /opt/homebrew/bin/gpg
```

> **原因**： nvm 环境变量问题导致 husky hook 找不到命令，需要手动加载运行 `nvm`

## Cursor 开启原来的顶部栏

`workbench.activityBar.orientation`
