---
title: Figma 开发记录
---

## Variables 学习

Figma intro to variables: [https://www.youtube.com/watch?v=1ONxxlJnvdM](https://www.youtube.com/watch?v=1ONxxlJnvdM)

Working with Variables: [https://www.figma.com/plugin-docs/working-with-variables/#get-variables](https://www.figma.com/plugin-docs/working-with-variables/#get-variables)

### Example

Creating a new variable collection

This example creates a new variable collection with two modes, and a color variable that defines a value for each of those two modes.

```js
const collection = figma.variables.createVariableCollection('new-collection')
collection.renameMode(collection.modes[0].modeId, 'light')
const colorVariable = figma.variables.createVariable('color-variable', collection, 'COLOR')

// rename our new variable and collection because naming is hard!
colorVariable.name = 'text-primary'
collection.name = 'semantic colors'

const lightModeId = collection.modes[0].modeId
const darkModeId = collection.addMode('dark')

// Sets the color to #000 in light mode and #fff in dark mode
colorVariable.setValueForMode(lightModeId, { r: 0, g: 0, b: 0 })
colorVariable.setValueForMode(darkModeId, { r: 1, g: 1, b: 1 })
```

### 获取响应头不全问题

跨越请求的响应头不全，需要在请求头中添加 `X-Figma-Token`，值为 `token`，`token` 可以在 Figma 的设置中找到。

```ts
// Set the CORS headers
response.setHeader('Access-Control-Allow-Headers', '*')
response.setHeader('Access-Control-Expose-Headers', '*')
  ```