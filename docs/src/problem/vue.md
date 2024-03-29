---
title: Vue开发问题
author: winches
---

# Vue开发问题记录

## input 框，blur事件和click事件冲突问题
在做一个下拉框的时候，input 下拉选项绑定了click事件，当点击下拉选项时，由于`blur`优先级比`click`高

导致`click`下拉选项失败

**解决办法**:
  - 使用`mousedown`事件替换`click`该事件优先级比`blur`高
  - 设置下拉框消失的`settimeout`设置`300ms`

## 使用自动导入后如何覆盖样式
当使用了`unplugin-vue-components`自动导入`Element-plus`后

覆盖样式需要更改设置为如下
```ts
Components({
  // 取消自动导入样式
  resolvers: [ElementPlusResolver({ importStyle: false })]
})
```
然后再在主入口导入覆盖样式即可

## 控制插槽内只渲染指定组件

`Tabs`标签页组件内，只能渲染`TabsPane`组件，其他的不会渲染

比如下面`div`内的内容不会渲染：

```vue
<fr-tabs @tab-click="handleClick">
  <fr-tabs-pane>test1</fr-tabs-pane>
  <div>不会渲染</div>
</fr-tabs>
```

**实现方式**：

```vue
<script setup lang="ts">
const slotContent = useSlots()
const slots = slotContent.default?.().filter(slot => (slot.type as any)?.name === 'FrTabsPane')
</script>

<Transition v-for="(item, index) in slots" :key="index">
  <component :is="item" />
</Transition>
```

## 调试Vue代码

当给一个`Dom`绑定了`Click`事件后，通过`Chrome`加入了一个`Event Listener Breakpoints`后，通过`Click`会跳进到`Vue`源码文件中，通过给`Vue`源码文件忽略断点的操作，可以直接跳转到触发`Click`的`Vue`文件中

<img width="1146" alt="image" src="https://github.com/kaorun343/vue-property-decorator/assets/96854855/93c8f26e-df4b-4c98-be1b-4996306b397f">

## keep-alive 的踩坑

生命周期的执行顺序：`beforeRouteLeave` --> 全局的`beforeEach`守卫 --> 执行全局的`beforeEnter` --> 在被激活的组件里调`beforeRouteEnter`(组件先注册) --> 然后才执行`deactivated`导致被缓存的组件没有被清除导致错误

解决：

`beforeRouteLeave` 会在组件注册前调用，先执行这个移除掉dom即可

## vue-demi 同时开发vue2/3库

阅读：[手把手教你如何以 sfc 组件形式优雅开发 vue2/3 通用组件](https://zhuanlan.zhihu.com/p/597334820)

# vue2 问题

## import导入的变量或者函数，template中使用的时候报错未定义

`import`导入函数或者导入变量不能直接再`template`中使用，

变量需要再`data`中重新定义一下。

函数需要再`method`中重新定义一下。

## vue2 组件注册全局类型

借助`vetur`的[globalComponents](https://vuejs.github.io/vetur/reference/#example)和[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)实现为组件注册全局类型和按需导入，让`vue2`也能享受`vue3`的组件提示

## vue-loader 2.6 不支持在template中的标签使用`?.`语法
