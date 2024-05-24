---
title: Nextui 开发记录
---

## 实现 codeBlock folder

类似：

1. [https://github.com/codesandbox/sandpack/issues/392](https://github.com/codesandbox/sandpack/issues/392)
2. Tailwindcss ui component docs

实现方法：

1. 通过 `prism-react-renderer` 获取到 `token`
2. 自定义实现一个 `transformTokens` 方法，将用于渲染的 `token` 数据转换为期望的格式，注意：大于xxx行、哪些需要默认展开、哪些需要默认折叠，高亮行数问题等
3. 最后注入到 `codeBlock` 组件中，然后再添加上 `folder` 的样式即可

// Helper.ts
import type Highlight from 'prism-react-renderer'

export type TransformTokens = Parameters<Highlight['props']['children']>[0]['tokens']

export type TransformTokensTypes = TransformTokens[0][0] & {
  folderContent?: TransformTokens
  summaryContent?: TransformTokens[0]
  class?: string
  index?: number
  open?: boolean
}

const startFlag = ['{', '[']
const endFlag = ['}', ']']
const specialStartFlag = ['(']
const specialEndFlag = [')']
const defaultFoldFlagList = ['cn', 'HTMLAttributes']
const defaultShowFlagList = ['Component', 'forwardRef']

/**
 * Transform tokens from `prism-react-renderer` to wrap them in folder structure
 *
 * @example
 * transformTokens(tokens) -> wrap tokens in folder structure
 */
export function transformTokens(tokens: TransformTokens, folderLine = 10) {
  const result: TransformTokens = []
  let lastIndex = 0
  let isShowFolder = false
  let fold = false

  tokens.forEach((token, index) => {
    if (index < lastIndex)
      return

    let startToken: TransformTokens[0][0] = null as any
    const mergedStarFlagList = [...startFlag]

    token.forEach((t) => {
      if (defaultFoldFlagList.some(text => t.content.includes(text))) {
        // If cn then need to judge whether it is import token
        if (t.content.includes('cn') && token.some(t => t.content === 'import'))
          return

        // If HTMLAttributes then need to judge whether it have start flag
        if (
          t.content.includes('HTMLAttributes')
          && !token.some(t => startFlag.includes(t.content))
        )
          return

        fold = true
        mergedStarFlagList.push(...specialStartFlag)
      }

      if (mergedStarFlagList.includes(t.content))
        startToken = t

      if (defaultShowFlagList.some(text => t.content.includes(text)))
        isShowFolder = true

    })

    const mergedOptions = fold
      ? {
          specialEndFlag,
          specialStartFlag,
        }
      : undefined
    const isFolder = checkIsFolder(token, mergedOptions)

    if (isFolder && startToken) {
      const endIndex = findEndIndex(tokens, index + 1, mergedOptions)

      // Greater than or equal to folderLine then will folder otherwise it will show directly
      if (endIndex !== -1 && (endIndex - index >= folderLine || isShowFolder || fold)) {
        lastIndex = endIndex
        const folder = tokens.slice(index + 1, endIndex)
        const endToken = tokens[endIndex]
        const ellipsisToken: TransformTokensTypes = {
          types: ['ellipsis'],
          content: '',
          class: 'custom-folder ellipsis-token',
        }
        const copyContent: TransformTokensTypes = {
          types: ['copy'],
          content: '',
          folderContent: folder,
          class: 'custom-folder copy-token',
        }

        endToken.forEach((t, _, arr) => {
          let className = ''

          className += 'custom-folder'
          if (t.content.trim() === '' && (arr.length === 3 || arr.length === 4)) {
            // Add length check to sure it's added to } token
            className += ' empty-token'
          }
          (t as TransformTokensTypes).class = className
        })

        startToken.types = ['folderStart'];
        (startToken as TransformTokensTypes).folderContent = folder;
        (startToken as TransformTokensTypes).summaryContent = [
          ...token,
          ellipsisToken,
          copyContent,
          ...endToken,
        ];
        (startToken as TransformTokensTypes).index = index
        isShowFolder && !fold && ((startToken as TransformTokensTypes).open = true)

        result.push([startToken])

        isShowFolder = false
        fold = false

        return
      }
    }
    token.forEach((t) => {
      (t as TransformTokensTypes).index = index
    })
    result.push(token)
  })

  return result
}

interface SpecialOptions {
  specialStartFlag?: string[]
  specialEndFlag?: string[]
}

function checkIsFolder(
  token: TransformTokens[0],
  { specialStartFlag, specialEndFlag }: SpecialOptions = {},
) {
  const stack: string[] = []
  const mergedStarFlagList = specialStartFlag ? [...startFlag, ...specialStartFlag] : startFlag
  const mergedEndFlagList = specialEndFlag ? [...endFlag, ...specialEndFlag] : endFlag

  for (const t of token) {
    if (mergedStarFlagList.includes(t.content))
      stack.push(t.content)
    else if (mergedEndFlagList.includes(t.content))
      stack.pop()

  }

  return stack.length !== 0
}

function findEndIndex(
  tokens: TransformTokens,
  startIndex: number,
  { specialStartFlag, specialEndFlag }: SpecialOptions = {},
) {
  const stack: string[] = ['flag']
  const mergedStarFlagList = specialStartFlag ? [...startFlag, ...specialStartFlag] : startFlag
  const mergedEndFlagList = specialEndFlag ? [...endFlag, ...specialEndFlag] : endFlag

  for (let i = startIndex; i < tokens.length; i++) {
    const token = tokens[i]

    for (const line of token) {
      const transformLine = line.content.replace(/\$/g, '')

      if (mergedStarFlagList.includes(transformLine))
        stack.push('flag')
      else if (mergedEndFlagList.includes(transformLine))
        stack.pop()

      if (stack.length === 0)
        return i

    }
  }

  return -1
}
```