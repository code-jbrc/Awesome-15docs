---
title: Typescript Problem
---
# Typescript（开发问题记录）
## vue/macros 类型报错
<img alt="image" src="https://user-images.githubusercontent.com/96854855/231127950-b0c5125e-b7b6-42bf-85fb-ebb99f0cd6ee.png">

**基本原因**: ts升级到5.x带来的规范性问题
**根本原因**:
- `vite`模板在`tsconfig.json`使用的是`"moduleResolution": "Node"`配置
- `ts`升级到5.x后新增了一个配置`resolvePackageJsonExports`，这个配置在`moduleResolution`的值为`node`时是默认为`true`的
- `resolvePackageJsonExports`会要求导入一个包时严格检测包的`exports`

**解决方案**：
- 如果 `ts` 版本小于 5，那么出现这个告警的原因应该是最新版 `vscode`，测试后发现好像 `vscode 1.74 `以及更早的版本不会出现该告警
  - 这种情况下可以选择将**vscode的内置Typescript版本降为4.x**

<img alt="image" src="https://user-images.githubusercontent.com/96854855/231132240-7b5dff2c-252d-4ae3-8229-d0913b5210b7.png">

- 如果 `ts` 版本大于 5，那么你可以选择将 `moduleResolution` 配置为 `bundler`，但是这样的话，其他依赖（比如 Element Plus）就会疯狂报错
  - **// @ts-expect-error 来忽略这个错误**
  - **resolvePackageJsonExports设为false**
