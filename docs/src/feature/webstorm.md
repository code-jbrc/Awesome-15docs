---
title: Vscode 特性配置
---

## 实现保存时 eslint fix

要实现保存自动 `eslint fix`，我们只需要配置`Tools` => `Actions` => `Actions on` `Save` => 勾选`Run eslint` `--fix`

## 设置 keyMap 为vscode风格

由于本人习惯`vscode`按键，使用设置为`vscode`风格

打开设置找到`keyMap`设置为`vscode`

## 添加文件修改状态查看

`Editor Tabs` 里的 `Mark modified` 开启

## 显示css颜色样式为背景

`Appearance` --> `show CSS color preview as background` 开启

## 多行编辑模式

`alt + shift + G`，快速添加多行光标编辑

## 左右移动元素

`alt + shift + ctrl + left/right` 可以左右移动元素

## 取消warn在scroll中显示

`General`中`Errors and Warnings`找到`warn`关闭`Error stripe mark`

## 关闭编辑器右侧白线

打开搜索`shift + shift`选择`show right margin`将其关闭

## 开启暂存区缓存区展示

类似于vscode的：

![image](https://github.com/biomejs/biome/assets/96854855/282e0b40-cd09-4356-9063-37467f348b62)

1、首先打开`commit -> use-non-modal commit interface`

<img width="681" alt="image" src="https://github.com/winchesHe/vscode-plugin-goto-define-better/assets/96854855/3bcac7c5-8765-431a-9513-e5f7124ef929">

2、打开`git -> Enable staging area`即可

<img width="1172" alt="image" src="https://github.com/winchesHe/vscode-plugin-goto-define-better/assets/96854855/d61e505f-cf94-423b-a7b9-42e954e58d46">

## 增量选择

`Extending selection` 配置，可以增量选择光标所在处。

## 一个窗口打开多个项目

`file --> open projects --> attach`即可添加到该窗口

## 语义突出显示

按Ctrl+Alt+S打开 IDE 设置并选择Editor | 配色方案 | 语言默认值 | 语义突出显示。

选择语义突出显示复选框并在必要时自定义颜色范围。

`Color Scheme -> Language Defaults -> Semantic highlighting`

## 解决webstorm卡顿问题

[解决 webstorm 卡顿的问题](https://www.jianshu.com/p/fcda623eb7ff)

1、排除不需要建立索引的目录

![image](https://github.com/biomejs/biome/assets/96854855/57004df2-b286-4458-b47a-359a497595eb)

2、提高内存

`change memory settings`提高内存

3、清楚无用的缓存

![image](https://github.com/biomejs/biome/assets/96854855/2ed837e0-14b4-4160-b35c-9988f2dd6da6)

## 去掉滚动条里不想要的标记

关掉条纹标记

`Editor -> Color Scheme -> General -> Errors and Warnings -> 选择对应的错误 -> 关掉Error stripe mark勾选`
