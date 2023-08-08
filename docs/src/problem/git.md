---
title: Git 开发问题
---

# Git 开发问题

## Git Tag 常用指令

```shell
git tag  # 查看所有tag列表

git tag <tagname>  # 打一个轻量标签,没有个人信息

git tag -a <tagname> -m '描述'  # 打一个附注标签，包含信息

git show  # 显示tag的详细信息

git tag -a <tagname> xxxxx  # 为之前的提交打标签 

git push origin <tagname> # 把指定的标签推送到远程

git push origin --tags # 把所有远程没有的本地标签推送到远程

git tag -d <tagname> # 删除本地标签

git push origin :refs/tags <tagname> # 删除远程标签

git push origin :refs/tags/<tagname>  # 将冒号前面的空值推送到远程标签名

git remote prune origin # 当你从远程仓库中删除了一个分支，但是本地仓库中仍然存在该分支的引用时，可以使用该命令将其清理掉。
```

总结
1、命令 git tag 标签名用于新建一个标签，默认为HEAD，也可以指定一个commit id；
2、命令git tag -a 标签名 -m "标签说明" 可以指定标签信息；
3、命令git tag可以查看所有标签；
4、命令git tag -d 标签名删除标签；
5、命令git push origin 可以推送一个本地标签；
6、命令git push origin --tags可以推送全部未推送过的本地标签；
7、命令git push origin :refs/tags/可以删除一个远程标签；
8、命令git tag -a -m 'messages’可以创建一个带附注的标签；
9、命令git tag -s -m 'messages’可以创建一个带 gpg 签名的标签；

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
	echo "$changed_files" | grep --quiet "$1" && eval "$2"
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
