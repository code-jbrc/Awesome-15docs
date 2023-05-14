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