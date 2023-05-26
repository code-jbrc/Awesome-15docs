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
![待补充正确图片](https://peropero.feishu.cn/9882b2bd-beda-4ef4-a36d-ca2f63f8e54d)

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
![待补充正确图片](https://peropero.feishu.cn/d580565a-250a-4810-84ab-c9897abd1a4a)
如果用了flex 则会变成独占一行
![待补充正确图片](https://peropero.feishu.cn/d486f670-bd45-4d0a-9e55-a8e3af50b869)
naive的按钮组件中的按钮的文本和字体就使用了inline-flex布局

## 在内部插入阴影
实现这种button的效果
![待补充正确图片](https://peropero.feishu.cn/63b43d59-62d1-494b-8b90-5c535ab40881)
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
