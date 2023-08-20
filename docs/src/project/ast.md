---
title: AST 学习记录
outline: [2, 3]
---

## 常见AST节点类型

1、literal(字面量) : 本身语义代表了一个值。

```ts
const name = 'iceman' // iceman ---> StringLiteral 字符串字面量
const age = 30 // 30     ---> NumberLiteral 数字字面量
const isMan = true // true   ---> BooleanLiteral 布林字面量
const reg = /\d/ // /\d/   ---> RegExpLiteral 正则字面量
```

2、Identifier(标识符) : 变量名、属性名、参数名等等一系列声明和引用的名字。

```ts
  import { request } form 'framework';   // request              ---> Identifier
  let name = 'iceman';                   // name                 ---> Identifier
  const age = 30;                        // age                  ---> Identifier
  function talk(name) {                  // talk, name           ---> Identifier
      console.log(name);                 // console, log, name   ---> Identifier
  }
 const obj = {                          // obj                  ---> Identifier
      name: 'guang'                      // name                 ---> Identifier
  }

```

3、Statement(语句) : 代码执行的最小单位。

```ts
return 'iceman' // ReturnStatement
if (age > 35) {} // IfStatement
throw new Error('error') // ThrowStatement
try {}
catch (e) {} // TryStatement
for (let i = 0; i < 5; i++) {} // ForStatement
```

4、Declaration(声明) : 声明语句是一种特殊的 Statement。

```ts
const listLen = 1 // VariableDeclaration
const listName = 'user' // VariableDeclaration
function getInfo(info) { // FunctionDeclaration
  if (info.isRun)
    return info.name

  return ''
}
class Car { // ClassDeclaration
  constructor() {}
  method() {}
}
```

5、Expression(表达式) : expression的特点是执行完成后会有返回值，这也是它和语句的区别。

```ts
[1, 2, 3] // ArrayExpression 数组表达式
age = 1 // AssignmentExpression 赋值表达式
1 + 2 // BinaryExpression二元表达式
const obj = { // ObjectExpression对象表达式
  foo: 'foo',
  bar() {}
}
const getName = function () {} // FunctionExpression函数表达式
function getAge(age) { // ArrowFunctionExpression箭头函数表达式
  return age
}
```

6、Import : 导入模块，属于一种特殊的声明语句，有三种类型 `ImportSpecifier` | `ImportDefaultSpecifier` | `ImportNamespaceSpecifier`。

```ts
import api, { environment } from 'framework'

// named import
import { request as req } from 'framework'

// namespaced import
import api from 'framework'

// default import
import * as APP from 'framework' // namespaced imort
```

7、Export : 导出模块，也属于一种特殊的声明，有三种类型 `ExportAllDeclaration` | `ExportDefaultDeclaration` | `ExportNamedDeclaration`。

```ts
export * from './iceman'
export default 'iceman'
export const ice = 'iceman'
```

每个 `AST` 节点都有自己的属性，但是它们也有一些公共的属性：

`pos，AST` 节点在代码字符串中索引的起始位置，配合 `end` 确定节点在代码字符串中的位置（用于唯一性判定）。

`end，AST` 节点在代码字符串中索引的结束位置，配合 `pos` 确定节点在代码字符串中的位置（用于唯一性判定）。

`kind`，用来标记当前 `AST` 节点的类型，上面列举的节点类型都可以通过 `ts.SyntaxKind` 的定义来查看。

## AST 的四个阶段

![](https://github.com/ast-grep/ast-grep.github.io/assets/96854855/23916d9b-ed28-480b-aaf2-b7432d232aaf)

1. Parsing（解析） ：这个过程由编译器实现，会经过词法分析和语法分析两个过程，生成 AST 。

2. Traversing（遍历）： 深度优先遍历 AST ，访问树上各个节点的信息（Node）。

3. Transforming（修改）： 在遍历的过程中可对节点信息进行修改/转化，生成新的 AST 。

4. Printing（输出）： 将转化后新的 AST 输出成新的代码块。

代码编译，代码加工一般会经历 1，2，3，4 四个阶段，而代码分析因为不会去改变源代码，所以一般只经历 1，2 两个阶段。比如 `ESLint` 仅检查语法错误时，只需要对 `AST` 各级节点进行遍历，定位违反语法规则的节点信息并标记，返回修复建议即可，不需要对代码作出修改和再输出。

### AST 如何生成

生成 AST 包含两个步骤：

- 词法分析：将整个代码字符串分割成最小语法单元数组。

- 语法分析：在分词基础上建立分析语法单元之间的关系。

**词法分析**

>将输入的源代码字符串，生成一系列词法单元 (Tokens)，这些词法单元包括数字，标点符号，运算符等，这些词法单元之间都是独立的。

**语法分析**

>将词法分析出来的 Token 按照不同的语法结构如声明语句、赋值表达式等转化成有语法含义的抽象语法树结构。