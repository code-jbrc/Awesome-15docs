---
title: 常见面试知识点
---

## vue2 和 vue3 的区别

一、性能提升

1. 基于Proxy的新响应式系统（数据劫持优化）

由原来的Object.defineProperty的getter 和setter，改成了ES6 Proxy 作为其观察机制（准确说是 Proxy 配合 Reflect，Reflect提供了一些操作Object对象的方法），初始化时无需递归遍历数据，初始化效率更高，而且也可以监控数组。速度加倍，节省了一半内存开销。

2. 虚拟DOM重写

虚拟DOM静态属性缓存，避免重复patch。内存换时间。

3. Diff算法优化

增加了静态标记flag。标记和提升所有静态根节点，diff 的时候只⽐较动态节点内容。

4. 静态提升（hoistStatic）

Vue2中无论元素是否参与更新，每次都会重新创建（createVNode），然后再渲染（Vue2 中的虚拟dom节点是进⾏全量的更新）。

在Vue3中使用了静态提升后，对于静态不需要发生变化的元素，只会被创建一次，静态节点都被提升到 render ⽅法之外，在渲染时直接复用即可。（**静态提升避免了静态元素节点频繁重复创建**）

5. 体积更小

vue3整个源码体积相对减少，优化了打包方法，引入tree-shaking，按需编译，避免打包无用模块（例如只打包用到的ref,reactive,components等），使得打包后的bundle的体积更小，提升了运行效率。（通过摇树优化核⼼库体积，减少不必要的代码量）

二、开发体验提升

1. 用 Ts 完全重写

基于typescipt编写，可以享受到类型提示。对Ts支持更好。

编辑器可提供强有力的类型检查和错误提示。

2. Compositon Api 的支持

compositon Api 可以解决业务分离问题，使代码有更好的复用性。

同时，也方便后续的维护和管理，setup() 的出现，使得相关的业务代码得以集中起来，方便查找和维护。我们可以把不同的业务代码进行逻辑抽离，比如使用hooks形式，更容易维护。而Vue2不同的业务代码都混杂在options中，不便管理。

## 都说 Composition API 和 React Hook 很像，请问他们的区别是什么？
从 React Hook 从实现的角度来看，React 是通过链表去实现 hooks 的调用的。需要确保每次更新时 hooks 的调用顺序一致，这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

所以有以下几个限制：

- 不在循环中、条件语句中、函数嵌套中调用 Hook
- 你必须确保它总是在 React Top level 调用函数 Hook
- 使用效果、依赖关系必须手动确定

和 Composition API 是基于 Vue 的响应系统，和React Hook 相比：

- 在 setup() 函数中，一个组件实例只执行一次，而React Hook 每次重新渲染时，都需要调用 Hook，给 React 带来的 GC 比 Vue 更大的压力，性能也相对 Vue 来说比较慢
- Compositon API 不必担心调用的顺序，它也可以在循环中、条件、在嵌套函数中任意位置使用
响应式系统自动实现依赖关系收集，而且组件的性能优化是由 Vue 内部完成的，而 React Hook 的依赖关系需要手动传递，并且依赖关系的顺序必须得到保证，尤其是使用 useEffect、useMemo 等 Hook 时，否则组件性能会因为依赖关系不正确而下降。
- reactive + ref 属于响应式数据，⽐ react 的useState，要更难理解

虽然Compoliton API区别于React Hook，但它的设计思路也是来自React Hook的参考。

## ref 和 reactive 的区别

1. ref 支持基础类型
2. 监听方式不同

watch 可以直接监听 ref 的基础类型

watch 监听 ref 的对象类型，需要`.value` 或者加个 `deep`

watch 监听 `reactive` 默认会加上`deep`

3. ref 需要`.value`使用
