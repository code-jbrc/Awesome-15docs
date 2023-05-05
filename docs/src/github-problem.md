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

## 查看github作者的信息

### 1. 通过GitHub API接口查找

`https://api.github.com/users/<name>/events/public`，只需将名字换成想查看的名字即可。

![](https://image.cha138.com/20221212/fb08834235d94c6b87b1b756fbbef31c.jpg)

### 2. 通过`commits`

进入到作者主页，查看那个仓库是无fork的，点击进入

![](https://image.cha138.com/20221212/a1f9a93d345441e88fc159bad59d3894.jpg)

点击commits进入

![](https://image.cha138.com/20221212/e42df6c4ebbe4931a20a8f6d3fe1cfec.jpg)

点击进入作者后边数字

![](https://image.cha138.com/20221212/541331b33b4c438091f813088b583a5e.jpg)

进入后url地址后加上 .patch

![](https://image.cha138.com/20221212/05029392c50a40c0b94934ff333cbace.jpg)

即可看到作者邮箱地址

![](https://image.cha138.com/20221212/b48b7872e587482b94e830fec6e80d7f.jpg)