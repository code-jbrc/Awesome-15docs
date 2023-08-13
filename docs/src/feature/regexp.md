---
title: 正则匹配技巧
---

# 正则匹配技巧

## 正则修饰符

正则表达式可能有影响搜索结果的修饰符

在 `JavaScript` 中，只有 6 个修饰符：

`i`

使用此修饰符后，搜索时不区分大小写：`A` 和 `a` 之间没有区别

`g`

使用此修饰符后，搜索时会寻找所有的匹配项 —— 没有它，则仅返回第一个匹配项

`m`

多行模式

`s`

启用 “`dotall`” 模式，允许点 . 匹配换行符 \`n`

`u`

开启完整的 `Unicode` 支持，该修饰符能够正确处理代理对

`y`

粘滞（`Sticky`）模式，在文本中的确切位置搜索

**中文正则**

`\u4e00-\u9fa5`

## 反向引用

正则表达式引擎会找到第一个引号 (['"]) 并记住其内容。那是第一个捕获组。

在模式中 \1 表示“找到与第一组相同的文本”，在我们的示例中为完全相同的引号。

与此类似，\2 表示第二组的内容，\3 —— 第三分组，依此类推。

```ts
const str = 'He said: "She\'s the one!".'

const regexp = /(['"])(.*?)\1/g

alert(str.match(regexp)) // "She's the one!"
```

## 正则踩坑

### new RegExp 里字符串需转义对应的字符

`new Regexp`函数会把字符串转成正则表达式，所以需要转义特殊字符

如：`$_test`函数

需转化为：`new RegExp('\\$_test')`

## 善用 exec 函数

```ts
let match
const regex = /test/g // 需加g，它就会从存储在 regexp.lastIndex 属性中的位置开始在字符串 str 中进行搜索。如果找到匹配项，则将在匹配后立即将 regexp.lastIndex 设置为索引
const text = 'all text all'
// eslint-disable-next-line no-cond-assign
while ((result = regex.exec(text)))
  alert(`Found ${result[0]} at position ${result.index}`)
  // 在位置 0 发现了 let，然后
  // 在位置 4 发现 varName
  // 未找到就会重置索引 lastIndex 设置为0
```
