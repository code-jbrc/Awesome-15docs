---
title: Css开发问题
---

# Css 开发文件记录

## 如何取消鼠标的双击选中

```css
/* 火狐 */
-moz-user-select: none;
/* Safari 和 欧朋 */
-webkit-user-select: none;
/* IE10+ and Edge */
-ms-user-select: none;
/* Standard syntax 标准语法(谷歌) */
user-select: none;
```

## 动态绑定css值
1. 方法1 cssVar 然后可以通过js修改
2. 方法2 v-bind 绑定 适用于vue，注意在绑定url等值的时候需要注意
```css
.className{
    height:v-bind('jsheight')
}
```

## css动画卡顿解决方案
如果控制的是原先定位上面的属性 会导致过多的计算 最终导致动画卡顿
解决：使用transform 替代
eg 上下浮动的动画
```css
@keyframes scatter {
  0% {
    transform: translateY(-2px)
  }
  100% {
    transform: translateY(2px)
  }
}
.thumbsBox{
  background-color: v-bind("bgc");
  &:hover .thumbs{
    opacity: 1;
    animation: scatter 0.5s linear infinite both alternate;
  }
}
```
## css来回动画/动画结束后反方向执行
两种方案
1. 原生css
利用到了both 和 alternate两个属性
both是动画结束处于中间态 alternate是反向执行
适合自己写动画的场景
```css
@keyframes pulse {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.pulse {
  animation-name: pulse;
  animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
  animation-duration: 3s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
```
2. vue的transistion
适合使用animatecss的场景
```vue
        <transition
          name="custom-classes-transition"
          enter-active-class="animate__animated animate__lightSpeedInRight"
          leave-active-class="animate__animated animate__lightSpeedOutRight"
        >
        </transition>
```

## css加label星号 naive
利用naive的注入功能，加上css的after去动态添加星号
![image](https://github.com/code-jbrc/Awesome-15docs/assets/78781776/25401346-e336-43dc-bf21-b8851422c668)

## css伪元素counter
伪元素counter最早在markdown中见到，比如下面的结构
1. xxx
2. Xx
3. Xxxxx
上面的123 都是通过counter生成的
原理是 当容器初始化的时候 声明count计数器 对应counter-reset 值是该计数器控制的变量 该值默认为0
```css
.leftSiderContainer {
  counter-reset: index;
}
```
然后在添加伪元素的时候 使用counter-increment 对计数器控制的变量进行+1，也就是对它的值进行了操作 
伪元素的cotent可以声明内容 结合counter函数 传入计数器的变量index 计算出当前的值
```css
.leftSider {
  &::after {
    counter-increment: index;
    content: counter(index);
    @apply absolute bottom-[8px] left-[-20px] ml-[50%] w-[52px] h-[20px] rounded-[8px] bg-[#7f7f7f] text-[white] text-center;
  }
}
```

## 锚点跳转
锚点跳转是利用了a标签的href属性，当给目标的元素加了a标签作为父元素的时候，随着视窗滚动到目标元素，就会显示href出来
```html
<a href="#123">
    <img src='scsccs.png'/>
</a>
```
优点：方便做跳转
缺点：由于锚点会操作到url，因此刷新后会丢失锚点位置

## Inline-flex 和 flex 的区别
总结：flex 更适合于容器元素， inline-flex适合于内联元素，比如按钮，标签等布局
对于行内的元素来说，可以用inline-flex布局把元素塞进去，和周围的文本融为一体

![image](https://github.com/code-jbrc/Awesome-15docs/assets/78781776/2d104d5d-ee25-4cfe-93b6-1e4e4396fe44)

如果用了flex 则会变成独占一行

![image](https://github.com/code-jbrc/Awesome-15docs/assets/78781776/d26f4d5b-8d5e-4a33-ad11-113cc3a2e5cb)

naive的按钮组件中的按钮的文本和字体就使用了inline-flex布局

## 在内部插入阴影
实现这种button的效果

![image](https://github.com/code-jbrc/Awesome-15docs/assets/78781776/8b553c5e-dd38-4834-a316-49b977e27aeb)

代码
```css
        box-shadow: inset 0 -10px 10px -10px rgba(0, 0, 0, 0.3);
```

## mac下分辨率过高字体变粗问题
fontfamily全局设置normal 后面有需要再bold 

## 字体统一问题
为了在mac下能够字体统一，那必须下载相同的字体，并且使用wrap让字体能在下载完后加载，没下完之前就用默认的

## 字体压缩
otf转woff可以达到压缩，特别是部分字体，压缩后会变得很小很小，而且正常情况下，我们只需要下载normal的字体即可

## grid 学习

### grid-template-areas 使用

```html
<style>
  .calendar {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    padding: 10px;
    grid-template-areas:
      "a a"
      ". b"
      ". c";
  }

  .calendar>div:nth-child(1) {
    grid-area: a;
  }

  .calendar>div:nth-child(2) {
    grid-area: b;
  }

  .calendar>div:nth-child(3) {
    grid-area: c;
  }

  .date {
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 16px;
  }
</style>

<body>
  <div class="calendar">
    <div class="date">Monday, Jan 20</div>
    <div class="date">Wednesday, Jan 22</div>
    <div class="date">Wednesday, Jan 22</div>
  </div>
</body>
```

实现效果

<img width="372" alt="image" src="https://github.com/winchesHe/wes-utils-monorepo/assets/96854855/9c6f8b5d-7eab-4789-a9d4-8b98760c1e32">

### grid-row grid-column 使用

上面的例子，换这个写法

```html
<style>
  .grid-container {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    /* 三行，每行大小相同 */
    grid-template-columns: 1fr 1fr;
    /* 两列，每列大小相同 */
    gap: 10px;
    /* 设置网格之间的间隙 */
  }

  .first-item {
    grid-column: 1 / 3;
    /* 从第一列开始，跨越到第三列 */
    grid-row: 1 / 2;
    /* 从第一行开始，到第二行结束 */
  }

  .second-item {
    grid-column: 2 / 3;
    /* 从第二列开始 */
    grid-row: 2 / 3;
    /* 从第二行开始，到第三行结束 */
  }

  .third-item {
    grid-column: 2 / 3;
    /* 从第二列开始 */
    grid-row: 3 / 4;
    /* 从第三行开始，到第四行结束 */
  }
</style>

<body>
  <div class="grid-container">
    <div class="grid-item first-item">Item 1</div>
    <div class="grid-item second-item">Item 2</div>
    <div class="grid-item third-item">Item 3</div>
  </div>
</body>
```

## 如何做Radio的圆形Checked效果

<img width="100" alt="image" src="https://github.com/winchesHe/wes-utils-monorepo/assets/96854855/ec9ea784-a0a6-48d9-87e9-38914baf53b2">

`tw: checked:bg-white checked:shadow-[0_0_0_6px_#F96B18_inset,0_0_0_6px_#F96B18_inset]`

解释：

这是 CSS 的 `box-shadow` 属性的值，用于给元素添加阴影效果。`box-shadow` 属性的值可以包含以下几个部分：

- 水平偏移：第一个 `0` 表示阴影的水平偏移量。`0` 表示阴影不会向左或向右偏移。
- 垂直偏移：第二个 `0` 表示阴影的垂直偏移量。`0` 表示阴影不会向上或向下偏移。
- 模糊距离：第三个 `0` 表示阴影的模糊距离。`0` 表示阴影边缘将是硬边，没有模糊效果。
- 扩展距离：`6px` 表示阴影的扩展距离。这会使阴影的大小增加，正值会使阴影扩大，负值会使阴影缩小。
- 颜色：`#F96B18` 表示阴影的颜色。
- 插入：`inset` 关键字表示这是一个内阴影，而不是默认的外阴影。

因此，`0 0 0 6px #F96B18 inset` 表示一个没有偏移和模糊效果，扩展距离为 `6px`，颜色为 `#F96B18` 的内阴影。

然后，这个阴影值被重复了两次，所以你会得到两个完全相同的内阴影。在大多数情况下，重复的阴影不会有任何效果，因为它们会完全重叠。但是，如果阴影的颜色有透明度，重复的阴影会使颜色看起来更深。

## 实现一个霓虹灯效果的按钮

<button class="btn-color-box btn-back"><span>跳转到源码</span></button>

```html
<style>
  @property --rotate {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

:root {
  --rotate: 0deg;
  --radius: 12;
  --bg: hsl(210 30% 70% / 0.15);
  --width: 18;
  --height: 10;
  --border: 5;
  --blur: 10;
  --alpha: 0;
  font-family: 'Montserrat', sans-serif;
}

.btn-color-box {
  box-sizing: border-box;
  position: relative;
  display: grid;
  place-items: center;
  padding-inline: 2px;
  text-align: center;
  cursor: pointer;
  text-wrap: nowrap;
  width: calc(var(--width) * 1vw);
  height: calc(var(--height) * 1vh);
  border-radius: calc(var(--radius) * 1px);
  background: var(--bg, hsl(280 0% 0% / 0.25));

  color: rgb(182, 255, 192);
  --color1: pink;
  --color2: orangered;
  --color3: red;
  --color4: magenta;
  font-family: Bad Script;
  font-weight: 700;
  letter-spacing: 15px;
  font-size: 18px;
  /* 文字阴影层叠 */
  text-shadow:
    0 0 10px var(--color1),
    0 0 20px var(--color2),
    0 0 40px var(--color3),
    0 0 80px var(--color4);
  filter: saturate(60%);
}

.btn-color-box > a {
  /* 性能优化 */
  will-change: filter, color;
  --interval: 1s;
  /* 时间函数，持续时间，延迟时间，无限循环 */
  animation: flicker steps(100) var(--interval) 1s infinite;
}

.btn-back {
  border: double calc(var(--border) * 1px) transparent;
  border-radius: calc(var(--radius) * 1.1px);
  /* 三个背景叠加，前两用于生成棋盘布局背景 */
  background-image:
    /* 圆形渐变，圆心在从 0 角度 在 50% 的宽度 70 高度初 */
    conic-gradient(from var(--rotate) at 50% 70%,
      /* 色域 饱和度 明亮度 透明度（100%不透明） */
      hsl(0 0% 98% / .1) 0deg,
      #eec32d 72deg,
      #ec4b4b 144deg,
      #709ab9 216deg,
      #4dffbf 288deg,
      hsl(0 0% 98% / .1) 1turn);
  background-size: 100% 100%;
  background-origin: border-box;
  /* 填满到内容区，填满到整个边距 */
  background-clip: padding-box, padding-box, border-box;
  animation: spin 5s linear infinite;
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }

  100% {
    --rotate: 360deg;
  }
}

@keyframes flicker {
  50% {
    color: white;
    /* 增强色域，色相旋转 */
    filter: saturate(200%) hue-rotate(20deg);
  }
}
</style>

<button className="btn-color-box btn-back" onClick={handleClick}>
  <a>跳转到源码</a>
</button>
```

## Input 框遇到格式化后 Cursor 位置变化问题修复

解决办法：

`useCursor` 通过这个 `hook` 在值变化的时候记录光标的位置，当值变化后重新 `setSelectionRange` 回原来的位置

```ts
/**
 * Keep input cursor in the correct position if possible.
 * Is this necessary since we have `formatter` which may mass the content?
 */
export default function useCursor(input: HTMLInputElement, focused: boolean): [() => void, () => void] {
  const selectionRef = useRef<{
    start?: number
    end?: number
    value?: string
    beforeTxt?: string
    afterTxt?: string
  }>(null)

  function recordCursor() {
    // Record position
    try {
      const { selectionStart: start, selectionEnd: end, value } = input
      const beforeTxt = value.substring(0, start)
      const afterTxt = value.substring(end)

      selectionRef.current = {
        start,
        end,
        value,
        beforeTxt,
        afterTxt,
      }
    }
    catch (e) {
      // Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
    }
  }

  function restoreCursor() {
    if (input && selectionRef.current && focused) {
      try {
        const { value } = input
        const { beforeTxt, afterTxt, start } = selectionRef.current
        const spaceLen = value[start] === ' ' ? 1 : 0

        let startPos = value.length

        if (value.endsWith(afterTxt)) {
          startPos = value.length - selectionRef.current.afterTxt.length - spaceLen
        }
        else if (value.startsWith(beforeTxt)) {
          startPos = beforeTxt.length
        }
        else {
          const beforeLastChar = beforeTxt[start - 1]
          const newIndex = value.indexOf(beforeLastChar, start - 1)
          if (newIndex !== -1)
            startPos = newIndex + 1

        }

        input.setSelectionRange(startPos, startPos)
      }
      catch (e) {
        console.warn(false, `Something warning of cursor restore. Please fire issue about this: ${e.message}`)
      }
    }
  }

  return [recordCursor, restoreCursor]
}
```

## Ellipsis 文本溢出显示省略号

该样式不继承给子元素

如果要继承的话得特殊设置或使用方自己加，所以一般不会在`<Ellipsis>`组件中嵌套其他组件

```css
.moe-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### 多行 Ellipsis

```css
style {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
  overflow-wrap: break-word;
}
```

## MutationObserver 监听DOM树变化

```js
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id')

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true }

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList')
      console.log('A child node has been added or removed.')
    else if (mutation.type === 'attributes')
      console.log(`The ${mutation.attributeName} attribute was modified.`)

  }
}

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback)

// 以上述配置开始观察目标节点
observer.observe(targetNode, config)

// 之后，可停止观察
observer.disconnect()
```

## Svg 图表改颜色

当 `fill` 属性为 `currentColor` 的时候可以通过 `color` `fill` 来改变颜色

## 实现一个斜线的背景

```css
background-image: linear-gradient(135deg,#EEF0F2 10%,transparent 10% 50%,#EEF0F2 50% 60%,transparent 60% 100%)

background-size: 10px 10px;
```

## 换行属性

### white-space

控制如何处理元素内的空白符，包括空格、换行符、制表符等

`white-space: pre-wrap;` // 连续的空白符会被保留，换行符会被保留

### `word-break` 和 `overflow-wrap`

控制文本如何被换行


### text-overflow

当文本溢出时，控制文本如何显示省略号

## Button 的 title 属性

鼠标悬停在按钮上时显示的文本
