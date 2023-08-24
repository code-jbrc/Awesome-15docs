---
title: Ts 问题记录
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

## js 文件不能识别paths路径

`tsconfig.json`里添加上`allowJs: true`和`include`里添加上`js`文件

## .ts 后缀报错

`tsconfig.json` 设置 `"allowImportingTsExtensions": true` 即可，[相关阅读](https://gist.github.com/andrewbranch/79f872a8b9f0507c9c5f2641cfb3efa6#module-resolution-for-bundlers-typescript-runtimes-and-node-loaders)

## 如何在不使用const泛型修饰符的情况下推导出列表字面量

如果我们确实想让返回值的类型和传入参数的类型所匹配，但不想加上as const修饰符（因为它会让类型变为readonly ["111", "222"]），那我们怎么做呢？

最近TypeScript 5.0的更新中加入了const泛型修饰符，能够在不用as const断言的情况下推导出字面量类型，然而它的结果也是readonly，这不是我们所想要的

其实你只需要做一些小小的改动：

```ts
const g = <T extends string[]>(t: [...T]) => t // 这里t的类型用了一个展开运算

const h = g(['111', '222']) // 好，类型变成["111", "222"]了
```

就可以得到我们想要的结果。

::: info

[相关阅读：Typescript 如何使一个传入的 Array 类型变为元组类型？](https://www.zhihu.com/question/523396892/answer/2401672619)

这里的 source 的[...T] 只是说把source 类型推断成一个Tuple Type，而 T 本身应该是一个形如(number | string | {a: number})[] 的 Array Type。

但是这里的字面量[1, 'hello', { a: 1 }]并不是独立推断的， 它受到上下文类型 的影响，而这个影响是是 Variadic tuple types 设计的一项特性。

当一个数组字面量的上下文类型是 Tuple Type，那么就会对这个数组字面量推导出对应的Tuple Type，[...T]就是这个上下文类型的指示器。

TS的作者 Anders 老爷子在提交这项特性的PR里提到过这一特点，并给出示例：

```ts
declare function ft1<T extends unknown[]>(t: T): T
declare function ft2<T extends unknown[]>(t: T): readonly [...T]
declare function ft3<T extends unknown[]>(t: [...T]): T
declare function ft4<T extends unknown[]>(t: [...T]): readonly [...T]

ft1(['hello', 42]) // (string | number)[]
ft2(['hello', 42]) // readonly (string | number)[]
ft3(['hello', 42]) // [string, number]
ft4(['hello', 42]) // readonly [string, number]
```

:::
