---
title: Github 问题记录
---

# Github 问题记录

## Github Action 权限

> 这里的`GITHUB_TOKEN`和`repository_owner`都会自动生成
> 
> **注意**：因为要写入文件，所以记得要去`secrets`里给`GITHUB_TOKEN`设置写入的权限

## 自动 Fork 仓库问题

:::warning 报错信息

`You’re making changes in a project you don’t have write access to. We’ve created a fork of this project for you to commit your proposed changes to. Submitting a change will write it to a new branch in your fork, so you can send a pull request.`

:::

**原因**：

当您试图对一个您没有写权限的仓库进行更改时，GitHub 会自动为您创建一个 fork。这是 GitHub 的默认行为，目的是让您能够提交对项目的更改。这种情况下，您不能取消自动创建 fork 的功能。

如果您不希望 fork 该仓库，可以遵循以下步骤：

1. 不要在原始仓库中直接编辑文件。这可以避免触发自动创建 fork 的机制。

2. 如果您已经创建了 fork，您可以转到 fork 仓库的 "Settings"（设置）页面，向下滚动到底部，点击 "Delete this repository"（删除此仓库）按钮来删除 fork。请注意，这会永久删除仓库及其所有历史记录，因此在执行此操作之前，请确保您不需要此仓库的任何内容。