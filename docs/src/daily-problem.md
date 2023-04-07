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
