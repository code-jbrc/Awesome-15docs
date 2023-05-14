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

git tag orgin --delete <tagname> //删除远程标签

git push origin :refs/tags/<tagname>  // 将冒号前面的空值推送到远程标签名
```