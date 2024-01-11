---
title: 面试算法
---

## 简易的 html 解析器

要求实现一个简易的 `hmlt` 解析器

要求：

1. 检验是否合法html
2. 没有单闭环标签
3. 没有属性
4. 要求输入：`<div>aaa<h1>test</h1></div>`

输出：

```json
{
  "tagName": "div",
  "children": [
    "aaa",
    {
      "tagName": "h1",
      "children": [
        "test"
      ]
    }
  ]
}
```

```js
function parseHtml(html) {
  if (!html || !validHtml(html))
    return null

  const matchReg = /<(\w+)>|<\/(\w+)>|([^<]+)/g
  const stack = []
  let result = {}

  html.replace(matchReg, (_, startTag, endTag, text) => {
    if (startTag) {
      const node = {
        tagName: startTag,
        children: [],
      }
      if (stack.length > 0)
        stack[stack.length - 1].children.push(node)
      else
        result = node

      stack.push(node)
    }
    else if (endTag) {
      stack.pop()
    }
    else if (text) {
      stack[stack.length - 1].children.push(text)
    }
  })

  return result
}

/**
 * 检验是否合法的html
 */
function validHtml(html) {
  const stack = []
  const reg = /<\/?(\w+)>/g
  let res = ''

  while ((res = reg.exec(html)) !== null) {
    const tag = res[0]
    const text = res[1]
    const isEnd = tag[1] === '/'

    if (!isEnd) {
      stack.push(text)
    }
    else {
      const lastTag = stack.pop()

      if (text !== lastTag)
        return false
    }
  }
  return stack.length === 0
}
const a = parseHtml('<div>aaa<h1>test</h1></div>')

console.log(a)

/** 输出结果
 * {
    tagName: "div",
    children: [
      "aaa",
      {
        tagName: "h1",
        children: [
          "test",
        ],
      },
    ],
  }
 */
```