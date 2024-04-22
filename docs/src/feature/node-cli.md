---
title: 开启 node-cli 应用
---

## 关于 node-cli 的指针移动，输出控制等

仓库：[ansi-escapes](https://github.com/sindresorhus/ansi-escapes)

代码核心：

```js
/**
 * This module provides a collection of ANSI escape sequences for manipulating the cursor and performing various terminal operations.
 * It includes functions for moving the cursor, erasing lines and screens, scrolling, and more.
 *
 * @module ansiEscapes
 */

import process from 'node:process'

// Constants for ANSI escape sequences
const ESC = '\u001B['
const OSC = '\u001B]'
const BEL = '\u0007'
const SEP = ';'

// Check if running in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

// Check if running in Apple Terminal
const isTerminalApp = !isBrowser && process.env.TERM_PROGRAM === 'Apple_Terminal'

// Check if running on Windows
const isWindows = !isBrowser && process.platform === 'win32'

// Define the `cwdFunction` based on the environment
const cwdFunction = isBrowser
  ? () => {
      throw new Error('`process.cwd()` only works in Node.js, not the browser.')
    }
  : process.cwd

// Create an object to hold the ANSI escape sequence functions
const ansiEscapes = {}

/**
 * Moves the cursor to the specified position.
 *
 * @param {number} x - The column position (1-based index).
 * @param {number} [y] - The row position (1-based index). If not provided, the cursor will only move horizontally.
 * @returns {string} The ANSI escape sequence for moving the cursor to the specified position.
 * @throws {TypeError} If `x` is not a number.
 */
ansiEscapes.cursorTo = (x, y) => {
  if (typeof x !== 'number')
    throw new TypeError('The `x` argument is required')

  if (typeof y !== 'number')
    return `${ESC + (x + 1)}G`

  return `${ESC + (y + 1) + SEP + (x + 1)}H`
}

/**
 * Moves the cursor by the specified amount in the horizontal and vertical directions.
 *
 * @param {number} x - The number of columns to move the cursor. Positive values move the cursor to the right, negative values move it to the left.
 * @param {number} y - The number of rows to move the cursor. Positive values move the cursor down, negative values move it up.
 * @returns {string} The ANSI escape sequence for moving the cursor by the specified amount.
 * @throws {TypeError} If `x` is not a number.
 */
ansiEscapes.cursorMove = (x, y) => {
  if (typeof x !== 'number')
    throw new TypeError('The `x` argument is required')

  let returnValue = ''

  if (x < 0)
    returnValue += `${ESC + (-x)}D`
  else if (x > 0)
    returnValue += `${ESC + x}C`

  if (y < 0)
    returnValue += `${ESC + (-y)}A`
  else if (y > 0)
    returnValue += `${ESC + y}B`

  return returnValue
}

/**
 * Moves the cursor up by the specified number of rows.
 *
 * @param {number} [count=1] - The number of rows to move the cursor up.
 * @returns {string} The ANSI escape sequence for moving the cursor up.
 */
ansiEscapes.cursorUp = (count = 1) => `${ESC + count}A`

/**
 * Moves the cursor down by the specified number of rows.
 *
 * @param {number} [count=1] - The number of rows to move the cursor down.
 * @returns {string} The ANSI escape sequence for moving the cursor down.
 */
ansiEscapes.cursorDown = (count = 1) => `${ESC + count}B`

/**
 * Moves the cursor forward by the specified number of columns.
 *
 * @param {number} [count=1] - The number of columns to move the cursor forward.
 * @returns {string} The ANSI escape sequence for moving the cursor forward.
 */
ansiEscapes.cursorForward = (count = 1) => `${ESC + count}C`

/**
 * Moves the cursor backward by the specified number of columns.
 *
 * @param {number} [count=1] - The number of columns to move the cursor backward.
 * @returns {string} The ANSI escape sequence for moving the cursor backward.
 */
ansiEscapes.cursorBackward = (count = 1) => `${ESC + count}D`

/**
 * Moves the cursor to the beginning of the current line.
 *
 * @returns {string} The ANSI escape sequence for moving the cursor to the beginning of the line.
 */
ansiEscapes.cursorLeft = `${ESC}G`

/**
 * Saves the current cursor position.
 *
 * @returns {string} The ANSI escape sequence for saving the cursor position.
 */
ansiEscapes.cursorSavePosition = isTerminalApp ? '\u001B7' : `${ESC}s`

/**
 * Restores the previously saved cursor position.
 *
 * @returns {string} The ANSI escape sequence for restoring the cursor position.
 */
ansiEscapes.cursorRestorePosition = isTerminalApp ? '\u001B8' : `${ESC}u`

/**
 * Gets the current cursor position.
 *
 * @returns {string} The ANSI escape sequence for getting the cursor position.
 */
ansiEscapes.cursorGetPosition = `${ESC}6n`

/**
 * Moves the cursor to the beginning of the next line.
 *
 * @returns {string} The ANSI escape sequence for moving the cursor to the beginning of the next line.
 */
ansiEscapes.cursorNextLine = `${ESC}E`

/**
 * Moves the cursor to the beginning of the previous line.
 *
 * @returns {string} The ANSI escape sequence for moving the cursor to the beginning of the previous line.
 */
ansiEscapes.cursorPrevLine = `${ESC}F`

/**
 * Hides the cursor.
 *
 * @returns {string} The ANSI escape sequence for hiding the cursor.
 */
ansiEscapes.cursorHide = `${ESC}?25l`

/**
 * Shows the cursor.
 *
 * @returns {string} The ANSI escape sequence for showing the cursor.
 */
ansiEscapes.cursorShow = `${ESC}?25h`

/**
 * Erases the specified number of lines.
 *
 * @param {number} count - The number of lines to erase.
 * @returns {string} The ANSI escape sequence for erasing the lines.
 */
ansiEscapes.eraseLines = (count) => {
  let clear = ''

  for (let i = 0; i < count; i++)
    clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '')

  if (count)
    clear += ansiEscapes.cursorLeft

  return clear
}

/**
 * Erases from the current cursor position to the end of the line.
 *
 * @returns {string} The ANSI escape sequence for erasing the end of the line.
 */
ansiEscapes.eraseEndLine = `${ESC}K`

/**
 * Erases from the beginning of the line to the current cursor position.
 *
 * @returns {string} The ANSI escape sequence for erasing the start of the line.
 */
ansiEscapes.eraseStartLine = `${ESC}1K`

/**
 * Erases the entire line.
 *
 * @returns {string} The ANSI escape sequence for erasing the line.
 */
ansiEscapes.eraseLine = `${ESC}2K`

/**
 * Erases from the current cursor position to the end of the screen.
 *
 * @returns {string} The ANSI escape sequence for erasing the end of the screen.
 */
ansiEscapes.eraseDown = `${ESC}J`

/**
 * Erases from the beginning of the screen to the current cursor position.
 *
 * @returns {string} The ANSI escape sequence for erasing the start of the screen.
 */
ansiEscapes.eraseUp = `${ESC}1J`

/**
 * Erases the entire screen.
 *
 * @returns {string} The ANSI escape sequence for erasing the screen.
 */
ansiEscapes.eraseScreen = `${ESC}2J`

/**
 * Scrolls the screen up by the specified number of lines.
 *
 * @param {number} count - The number of lines to scroll up.
 * @returns {string} The ANSI escape sequence for scrolling the screen up.
 */
ansiEscapes.scrollUp = `${ESC}S`

/**
 * Scrolls the screen down by the specified number of lines.
 *
 * @param {number} count - The number of lines to scroll down.
 * @returns {string} The ANSI escape sequence for scrolling the screen down.
 */
ansiEscapes.scrollDown = `${ESC}T`

/**
 * Clears the screen.
 *
 * @returns {string} The ANSI escape sequence for clearing the screen.
 */
ansiEscapes.clearScreen = '\u001Bc'

/**
 * Clears the terminal.
 *
 * @returns {string} The ANSI escape sequence for clearing the terminal.
 */
ansiEscapes.clearTerminal = isWindows
  ? `${ansiEscapes.eraseScreen}${ESC}0f`
  : `${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`

/**
 * Enters the alternative screen buffer.
 *
 * @returns {string} The ANSI escape sequence for entering the alternative screen buffer.
 */
ansiEscapes.enterAlternativeScreen = `${ESC}?1049h`

/**
 * Exits the alternative screen buffer.
 *
 * @returns {string} The ANSI escape sequence for exiting the alternative screen buffer.
 */
ansiEscapes.exitAlternativeScreen = `${ESC}?1049l`

/**
 * Produces a beep sound.
 *
 * @returns {string} The ANSI escape sequence for producing a beep sound.
 */
ansiEscapes.beep = BEL

/**
 * Creates a hyperlink in the terminal.
 *
 * @param {string} text - The text to display as the hyperlink.
 * @param {string} url - The URL to open when the hyperlink is clicked.
 * @returns {string} The ANSI escape sequence for creating a hyperlink.
 */
ansiEscapes.link = (text, url) => [
  OSC,
  '8',
  SEP,
  SEP,
  url,
  BEL,
  text,
  OSC,
  '8',
  SEP,
  SEP,
  BEL,
].join('')

/**
 * Displays an image in the terminal.
 *
 * @param {Buffer} buffer - The image data as a Buffer.
 * @param {Object} [options={}] - The options for displaying the image.
 * @param {number} [options.width] - The width of the image in pixels.
 * @param {number} [options.height] - The height of the image in pixels.
 * @param {boolean} [options.preserveAspectRatio=true] - Whether to preserve the aspect ratio of the image.
 * @returns {string} The ANSI escape sequence for displaying the image.
 */
ansiEscapes.image = (buffer, options = {}) => {
  let returnValue = `${OSC}1337;File=inline=1`

  if (options.width)
    returnValue += `;width=${options.width}`

  if (options.height)
    returnValue += `;height=${options.height}`

  if (options.preserveAspectRatio === false)
    returnValue += ';preserveAspectRatio=0'

  return `${returnValue}:${buffer.toString('base64')}${BEL}`
}

// Export the ansiEscapes object
export default ansiEscapes
```

## slice-ansi 

仓库：[slice-ansi](https://github.com/chalk/slice-ansi)

```js
import ansiStyles from 'ansi-styles'
import isFullwidthCodePoint from 'is-fullwidth-code-point'

// \x1b and \x9b
const ESCAPES = new Set([27, 155])

const CODE_POINT_0 = '0'.codePointAt(0)
const CODE_POINT_9 = '9'.codePointAt(0)

// e.g [39m
const endCodesSet = new Set()

// e.g [31m => [39m
const endCodesMap = new Map()
for (const [start, end] of ansiStyles.codes) {
  endCodesSet.add(ansiStyles.color.ansi(end))
  endCodesMap.set(ansiStyles.color.ansi(start), ansiStyles.color.ansi(end))
}

function getEndCode(code) {
  if (endCodesSet.has(code))
    return code

  if (endCodesMap.has(code))
    return endCodesMap.get(code)

  code = code.slice(2)
  if (code.includes(';'))
    code = `${code[0]}0`

  const returnValue = ansiStyles.codes.get(Number.parseInt(code, 10))
  if (returnValue)
    return ansiStyles.color.ansi(returnValue)

  return ansiStyles.reset.open
}

function findNumberIndex(string) {
  for (let index = 0; index < string.length; index++) {
    const codePoint = string.codePointAt(index)
    if (codePoint >= CODE_POINT_0 && codePoint <= CODE_POINT_9)
      return index

  }

  return -1
}

function parseAnsiCode(string, offset) {
  string = string.slice(offset, offset + 19)
  const startIndex = findNumberIndex(string)
  if (startIndex !== -1) {
    let endIndex = string.indexOf('m', startIndex)
    if (endIndex === -1)
      endIndex = string.length

    return string.slice(0, endIndex + 1)
  }
}

function tokenize(string, endCharacter = Number.POSITIVE_INFINITY) {
  const returnValue = []

  let index = 0
  let visibleCount = 0
  while (index < string.length) {
    const codePoint = string.codePointAt(index)

    if (ESCAPES.has(codePoint)) {
      const code = parseAnsiCode(string, index)
      if (code) {
        returnValue.push({
          type: 'ansi',
          code,
          endCode: getEndCode(code),
        })
        index += code.length
        continue
      }
    }

    const isFullWidth = isFullwidthCodePoint(codePoint)
    const character = String.fromCodePoint(codePoint)

    returnValue.push({
      type: 'character',
      value: character,
      isFullWidth,
    })

    index += character.length
    visibleCount += isFullWidth ? 2 : character.length

    if (visibleCount >= endCharacter)
      break

  }

  return returnValue
}

function reduceAnsiCodes(codes) {
  let returnValue = []

  for (const code of codes) {
    if (code.code === ansiStyles.reset.open) {
      // Reset code, disable all codes
      returnValue = []
    }
    else if (endCodesSet.has(code.code)) {
      // This is an end code, disable all matching start codes
      returnValue = returnValue.filter(returnValueCode => returnValueCode.endCode !== code.code)
    }
    else {
      // This is a start code. Disable all styles this "overrides", then enable it
      returnValue = returnValue.filter(returnValueCode => returnValueCode.endCode !== code.endCode)
      returnValue.push(code)
    }
  }

  return returnValue
}

function undoAnsiCodes(codes) {
  const reduced = reduceAnsiCodes(codes)
  const endCodes = reduced.map(({ endCode }) => endCode)
  return endCodes.reverse().join('')
}

export default function sliceAnsi(string, start, end) {
  const tokens = tokenize(string, end)
  let activeCodes = []
  let position = 0
  let returnValue = ''
  let include = false

  for (const token of tokens) {
    if (end !== undefined && position >= end)
      break

    if (token.type === 'ansi') {
      activeCodes.push(token)
      if (include)
        returnValue += token.code

    }
    else {
      // Character
      if (!include && position >= start) {
        include = true
        // Simplify active codes
        activeCodes = reduceAnsiCodes(activeCodes)
        returnValue = activeCodes.map(({ code }) => code).join('')
      }

      if (include)
        returnValue += token.value

      position += token.isFullWidth ? 2 : token.value.length
    }
  }

  // Disable active codes at the end
  returnValue += undoAnsiCodes(activeCodes)
  return returnValue
}
```

## ansi-regex / strip-ansi

```js
export default function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
  ].join('|')

  return new RegExp(pattern, onlyFirst ? undefined : 'g')
}
```

## ansi-styles

仓库地址：[ansi-styles](https://github.com/chalk/ansi-styles)

```js
const ANSI_BACKGROUND_OFFSET = 10

const wrapAnsi16 = (offset = 0) => code => `\u001B[${code + offset}m`

const wrapAnsi256 = (offset = 0) => code => `\u001B[${38 + offset};5;${code}m`

const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\u001B[${38 + offset};2;${red};${green};${blue}m`

const styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],

    // Bright color
    blackBright: [90, 39],
    gray: [90, 39], // Alias of `blackBright`
    grey: [90, 39], // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39],
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],

    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49], // Alias of `bgBlackBright`
    bgGrey: [100, 49], // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49],
  },
}

export const modifierNames = Object.keys(styles.modifier)
export const foregroundColorNames = Object.keys(styles.color)
export const backgroundColorNames = Object.keys(styles.bgColor)
export const colorNames = [...foregroundColorNames, ...backgroundColorNames]

function assembleStyles() {
  const codes = new Map()

  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\u001B[${style[0]}m`,
        close: `\u001B[${style[1]}m`,
      }

      group[styleName] = styles[styleName]

      codes.set(style[0], style[1])
    }

    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false,
    })
  }

  Object.defineProperty(styles, 'codes', {
    value: codes,
    enumerable: false,
  })

  styles.color.close = '\u001B[39m'
  styles.bgColor.close = '\u001B[49m'

  styles.color.ansi = wrapAnsi16()
  styles.color.ansi256 = wrapAnsi256()
  styles.color.ansi16m = wrapAnsi16m()
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET)
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET)
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET)

  // From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value: (red, green, blue) => {
        // We use the extended greyscale palette here, with the exception of
        // black and white. normal palette only has 4 greyscale shades.
        if (red === green && green === blue) {
          if (red < 8)
            return 16

          if (red > 248)
            return 231

          return Math.round(((red - 8) / 247) * 24) + 232
        }

        return 16
        + (36 * Math.round(red / 255 * 5))
        + (6 * Math.round(green / 255 * 5))
        + Math.round(blue / 255 * 5)
      },
      enumerable: false,
    },
    hexToRgb: {
      value: (hex) => {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16))
        if (!matches)
          return [0, 0, 0]

        let [colorString] = matches

        if (colorString.length === 3)
          colorString = [...colorString].map(character => character + character).join('')

        const integer = Number.parseInt(colorString, 16)

        return [

          (integer >> 16) & 0xFF,
          (integer >> 8) & 0xFF,
          integer & 0xFF,
        ]
      },
      enumerable: false,
    },
    hexToAnsi256: {
      value: hex => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false,
    },
    ansi256ToAnsi: {
      value: (code) => {
        if (code < 8)
          return 30 + code

        if (code < 16)
          return 90 + (code - 8)

        let red
        let green
        let blue

        if (code >= 232) {
          red = (((code - 232) * 10) + 8) / 255
          green = red
          blue = red
        }
        else {
          code -= 16

          const remainder = code % 36

          red = Math.floor(code / 36) / 5
          green = Math.floor(remainder / 6) / 5
          blue = (remainder % 6) / 5
        }

        const value = Math.max(red, green, blue) * 2

        if (value === 0)
          return 30

        let result = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red))

        if (value === 2)
          result += 60

        return result
      },
      enumerable: false,
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false,
    },
    hexToAnsi: {
      value: hex => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false,
    },
  })

  return styles
}

const ansiStyles = assembleStyles()

export default ansiStyles
```

### 更定制化的颜色输出

```js
import styles from 'ansi-styles'

styles.color.ansi(styles.rgbToAnsi(100, 200, 15)) // RGB to 16 color ansi foreground code
styles.bgColor.ansi(styles.hexToAnsi('#C0FFEE')) // HEX to 16 color ansi foreground code

styles.color.ansi256(styles.rgbToAnsi256(100, 200, 15)) // RGB to 256 color ansi foreground code
styles.bgColor.ansi256(styles.hexToAnsi256('#C0FFEE')) // HEX to 256 color ansi foreground code

styles.color.ansi16m(100, 200, 15) // RGB to 16 million color foreground code
styles.bgColor.ansi16m(...styles.hexToRgb('#C0FFEE')) // Hex (RGB) to 16 million color foreground code
```

## log-update

仓库地址：[log-update](https://github.com/sindresorhus/log-update)

```js
// 导入所需的模块
import process from 'node:process'

// 用于处理系统和环境相关的信息
import ansiEscapes from 'ansi-escapes'

// 用于生成ANSI转义码
import cliCursor from 'cli-cursor'

// 用于控制命令行中的光标显示/隐藏
import wrapAnsi from 'wrap-ansi'

// 用于在指定宽度处换行ANSI字符串
import sliceAnsi from 'slice-ansi'

// 用于切割ANSI字符串
import stripAnsi from 'strip-ansi' // 用于移除ANSI字符串中的ANSI转义码

// 默认的终端高度
const defaultTerminalHeight = 24

// 获取终端的宽度，默认为80
const getWidth = ({ columns = 80 }) => columns

// 将文本适应到终端的高度，截掉多余的无法展示的部分
function fitToTerminalHeight(stream, text) {
  const terminalHeight = stream.rows ?? defaultTerminalHeight
  const lines = text.split('\n')
  const toRemove = Math.max(0, lines.length - terminalHeight)
  return toRemove ? sliceAnsi(text, stripAnsi(lines.slice(0, toRemove).join('\n')).length + 1) : text
}

// 创建一个更新日志的函数
export function createLogUpdate(stream, { showCursor = false } = {}) {
  let previousLineCount = 0
  let previousWidth = getWidth(stream)
  let previousOutput = ''

  // 重置函数
  const reset = () => {
    previousOutput = ''
    previousWidth = getWidth(stream)
    previousLineCount = 0
  }

  // 渲染函数
  const render = (...arguments_) => {
    if (!showCursor)
      cliCursor.hide()

    let output = fitToTerminalHeight(stream, `${arguments_.join(' ')}\n`)
    const width = getWidth(stream)

    if (output === previousOutput && previousWidth === width)
      return

    previousOutput = output
    previousWidth = width
    output = wrapAnsi(output, width, { trim: false, hard: true, wordWrap: false })

    // 清除之前的行数，然后输出新的内容
    stream.write(ansiEscapes.eraseLines(previousLineCount) + output)
    previousLineCount = output.split('\n').length
  }

  // 清除函数
  render.clear = () => {
    stream.write(ansiEscapes.eraseLines(previousLineCount))
    reset()
  }

  // 完成函数
  render.done = () => {
    reset()
    if (!showCursor)
      cliCursor.show()

  }

  return render
}

// 创建一个更新stdout的日志函数
const logUpdate = createLogUpdate(process.stdout)
export default logUpdate

// 创建一个更新stderr的日志函数
export const logUpdateStderr = createLogUpdate(process.stderr)
```
