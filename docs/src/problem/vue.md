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
