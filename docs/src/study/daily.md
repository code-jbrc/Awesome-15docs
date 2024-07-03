---
title: 日常学习资料
---

## Javascript V8 性能优化代码

好文推荐：[Optimizing Javascript for fun and for profit](https://romgrk.com/posts/optimizing-javascript/)

## Slack 创建一个 App 应用

[官网 QuickStart](https://api.slack.com/quickstart)

[官网 App 地址](https://api.slack.com/apps)

主要按照官网的流程

1. 先创建一个 App，选择一个 Workspace
2. 添加 Bot 的权限，比如 `chat:write`
3. 在 Workspace 中添加 App，即安装 App 到频道中

发送信息

1. 配置 Bot 的监听事件，比如 `message.channels`
2. 通过 Webhook 直接用 Bot 发送消息