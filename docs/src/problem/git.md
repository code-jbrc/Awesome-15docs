---
title: Git 开发问题
---

# Git 开发问题

## Git Tag 常用指令

```shell
git tag  //查看所有tag列表

git tag <tagname>  //打一个轻量标签,没有个人信息

git tag -a <tagname> -m '描述'  //打一个附注标签，包含信息

git show  //显示tag的详细信息

git tag -a <tagname> xxxxx  //为之前的提交打标签 

git push origin <tagname> //把指定的标签推送到远程

git push origin --tags //把所有远程没有的本地标签推送到远程

git tag -d <tagname> //删除本地标签

git push origin :refs/tags <tagname> //删除远程标签

git push origin :refs/tags/<tagname>  // 将冒号前面的空值推送到远程标签名
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