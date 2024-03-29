---
title: Git 开发问题
---

# Git 开发问题

## Git Tag 常用指令

```bash
git tag  # 查看所有tag列表

git tag <tagname>  # 打一个轻量标签,没有个人信息

git tag -a <tagname> -m '描述'  # 打一个附注标签，包含信息

git show  # 显示tag的详细信息

git tag -a <tagname> xxxxx  # 为之前的提交打标签 

git push origin <tagname> # 把指定的标签推送到远程

git push origin --tags # 把所有远程没有的本地标签推送到远程

git tag -d <tagname> # 删除本地标签

git push origin :refs/tags <tagname> # 删除远程标签

git push origin --delete <tagname> # 删除远程标签

git remote prune origin # 当你从远程仓库中删除了一个分支，但是本地仓库中仍然存在该分支的引用时，可以使用该命令将其清理掉。
```

## Git 常用指令

```bash
git reflog # 本地全部的commit记录
```

## 在触发合并或变基操作时监听`package.json`，变化则运行`install`

git hook 用于在“git pull”之后运行命令（如果指定文件已更改）。在此示例中，如果 package.json 更改，则用于运行“npm install”，如果“bower.json”更改，则运行“bower install”。运行“chmod +x post-merge”以使其可执行，然后将其放入“.git/hooks/”中。

```bash
# post-merge/post-rebase
#!/usr/bin/env bash
# MIT © Sindre Sorhus - sindresorhus.com

# git hook to run a command after `git pull` if a specified file was changed
# Run `chmod +x post-merge` to make it executable then put it into `.git/hooks/`.

changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

check_run() {
	if echo "$changed_files" | grep --quiet "$1"; then
		echo "检测到 $1 更改，开始重新安装依赖"
		eval "$2"
	fi
}

# Example usage
# In this example it's used to run `npm install` if package.json changed
check_run package.json "npm install"
```

## git 批量删除分支

- 删除已经合并的分支

```bash
git branch | xargs git branch -d
```

- 强制删除匹配指定规则分支

```bash
git branch | grep 'xxx.*' | xargs git branch -D
```

- 强制删除匹配指定规则远程分支

```bash
git branch -a | grep 'xxx.*' | xargs git branch -D
```

**命令解释**

`|`  用于将一串命令串联起来，前面命令的输出，可以作为后面命令的输入

---

`xargs`

`xargs` 是给命令传递参数的一个过滤器，也是组合多个命令的一个工具

---

`grep`

`grep` 搜索过滤命令，使用正则表达式搜索文本

---

> **推荐使用** `git bash` 输入命令，`powershell` 需配置相关环境变量，否则会出现 `grep、xargs`无法识别等报错

## git 全局设置

**查看全局设置**

`git config --global --list`

### 自动切换换行符`core.autocrlf`

`core.autocrlf`
- true： 提交时改成LF，检出时改成CRLF
- input：提交时改成LF，检出时不改
- false：提交时是什么就是什么，不改换行符，检出时也不改(默认)

**设置全局值**

`git config --global core.autocrlf false`

### 忽略大小写`core.ignorecase`

**设置全局值**

`git config --global core.ignorecase false` 区分大小写
`git config --global core.ignorecase true` 不区分大小写

## git 快速拉取仓库

### 快速拉取远程仓库全部分支浅层和取消Tags

```bash
git clone <xxx仓库地址> <重命名> --depth=1 --no-single-branch --no-tags
```

### 快速拉取远程仓库代码

```bash
git clone --depth=1 xxx 加上这个指令即可，xxx可以重命名
```

### 搭配浅克隆拉取远程分支到本地

在Git中，远程分支是不能直接用于创建本地分支的，因为它们不是真正的提交记录。

如果你想在本地创建一个与远程分支对应的本地分支，你需要先将远程分支拉取到本地，然后再基于该分支创建本地分支。

你可以使用以下命令将远程分支拉取到本地：

`git fetch --depth=1 origin test`

这个命令会将远程仓库的`test`分支拉取到本地，并创建一个名为`FETCH_HEAD`的引用。然后，你可以使用以下命令基于该引用创建本地分支：

`git checkout -b test FETCH_HEAD`

这个命令会创建一个名为`test`的本地分支，并将其指向`FETCH_HEAD`引用所指向的提交记录。然后，你就可以在该分支上进行修改了。

需要注意的是，由于你使用了`--depth`选项进行浅克隆，因此你可能无法拉取所有的分支和标签。如果你需要拉取其他分支或标签，你需要使用`git fetch`命令将它们拉取到本地。
