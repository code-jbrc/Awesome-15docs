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