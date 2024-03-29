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

## 前瞻断言(非捕获组)

`x(?=y)`，它表示“仅在后面是 `Y` 时匹配 `X`”。这里的 `X` 和 `Y` 可以是任何模式。

```ts
const str = '1 turkey costs 30€'

alert(str.match(/\d+(?=€)/)) // 30，数字 1 被忽略了，因为它后面没有 €
```

**否定的前瞻断言**

`X(?!Y)`，意思是“搜索 `X`，但前提是后面没有 `Y`”。

```ts
const str = '2 turkeys cost 60€'

alert(str.match(/\d+\b(?!€)/g)) // 2（价格不匹配）
```

## 后瞻断言(非捕获组)

- 肯定的后瞻断言：`(?<=Y)X`，匹配 `X`，仅在前面是 `Y` 的情况下。
- 否定的后瞻断言：`(?<!Y)X`，匹配 `X`，仅在前面不是 `Y` 的情况下。

```ts
const str = '1 turkey costs $30'

// 美元符号被转义 \$
alert(str.match(/(?<=\$)\d+/)) // 30（跳过了仅仅是数字的值）
```

```ts
const str = '2 turkeys cost $60'

alert(str.match(/(?<!\$)\b\d+/g)) // 2（价格不匹配）
```

## 前/后瞻断言（捕获组）

一般来说，前瞻断言和后瞻断言括号中的内容不会成为结果的一部分。

但在某些情况下，我们可能还想捕获前瞻断言和后瞻断言所匹配的内容，或者部分内容。这也是可行的。只需要将该部分包装在额外的括号中。

```ts
// 前瞻断言
let str = '1 turkey costs 30€'
let regexp = /\d+(?=(€|kr))/ // €|kr 两侧有额外的括号

alert(str.match(regexp)) // 30, €

// 后瞻端游
let str = '1 turkey costs $30'
let regexp = /(?<=(\$|£))\d+/

alert(str.match(regexp)) // 30, $
```

## 非捕获组(?:)

```ts
const str = 'Gogogo John!'

// ?: 从捕获组中排除 'go'
const regexp = /(?:go)+ (\w+)/i

const result = str.match(regexp)

alert(result[0]) // Gogogo John（完整的匹配项）
alert(result[1]) // John
alert(result.length) // 2（在数组中没有其他数组项）
```

## str.match 和 str.matchAll

- 方法 `str.match` 仅当不带修饰符 `g` 时返回捕获组。
- 方法 `str.matchAll` 始终返回捕获组。

```ts
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi)
results = Array.from(results)
results[0] // [ '<h1>', 'h1', index: 0, input: '<h1> <h2>', groups: undefined ]
results[0][1] // h1
```

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

## 各系统的换行符

`\r\n` 表示 `Windows` 风格的换行符，回车符（CR）和换行符（LF）。
`\n` 表示 `Unix/Linux` 风格的换行符，换行符（LF）。
`\r` 表示老版本的 `Mac` 风格的换行符，新版为`\n`。
