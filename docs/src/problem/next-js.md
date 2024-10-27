---
title: Next.js 踩坑
---

## 浏览器找不到该文件

在 Next.js 中，如果设置 "use server"; 时，浏览器会找不到该文件，因为 Next.js 会将文件打包到服务器端，而不是客户端。

## Next14 迁移到  Next15

### What Nextjs15 [link](https://nextjs.org/blog/next-15)

Turbopack dev is now stable [link](https://nextjs.org/blog/turbopack-for-development-stable)

Support `dev --turbo`

- Up to `76.7%` faster local server startup.
- Up to `96.3%` faster code updates with Fast Refresh.
- Up to `45.8%` faster initial route compile without caching (Turbopack does not have disk caching yet).

### Upgrade guide [link](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)

PR: [link](https://github.com/nextui-org/frontio/pull/240)

### Upgrade note

- Next15 support both `react19` and `react18`, so you don't need to upgrade `react` version.
- But you need to override `package.json` `react` and `react-dom` version to `18.x` in order to support `next15` use same react version.

### Check guide

1. dev/dev --turbo,build,start,lint command success
2. type check and lint 0 error