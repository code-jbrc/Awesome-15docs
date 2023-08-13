---
title: 正则匹配函数
---

## 正则功能函数

### import match 函数

```ts
/**
 * import match函数
 * @return [[import, importName]]
 */
function getMatchImport(str: string) {
  const importRegex = /import {?\s*([\w\W]+?)\s*}? from ['"](.+)['"]/
  const importRegexAll = /import {?\s*([\w\W]+?)\s*}? from ['"](.+)['"]/g

  const matchAll = str.match(importRegexAll) ?? []
  const result: any[] = []

  for (const item of matchAll)
    result.push(matchImport(item))

  return result.length ? result : ['', '']

  function matchImport(itemImport: string) {
    const match = itemImport.match(importRegex) ?? []
    return [match[1] ?? '', match[2] ?? '']
  }
}
```
