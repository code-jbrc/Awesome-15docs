---
title: Next.js 踩坑
---

## 浏览器找不到该文件

在 Next.js 中，如果设置 "use server"; 时，浏览器会找不到该文件，因为 Next.js 会将文件打包到服务器端，而不是客户端。