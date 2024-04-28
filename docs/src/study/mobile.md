---
title: Mobile 移动端记录
---

## 移动端 触摸事件和 mousedown、mouseup、click 事件之间的关系

一、移动端 触摸事件

ontouchstart、ontouchmove、ontouchend、ontouchcancel

1、Touch事件简介

pc上的web页面鼠 标会产生onmousedown、onmouseup、onmouseout、onmouseover、onmousemove的事件，但是在移动终端如iphone、ipod Touch、ipad上的web页面触屏时会产生ontouchstart、ontouchmove、ontouchend、ontouchcancel事件，分别对应了触屏开始、拖拽及完成触屏事件和取消。
<font color=red>当按下手指时，触发ontouchstart；
当移动手指时，触发ontouchmove；
当移走手指时，触发ontouchend。
当一些更高级别的事件发生的时候（如电话接入或者弹出信息）会取消当前的touch操作，即触发ontouchcancel。一般会在ontouchcancel时暂停游戏、存档等操作。</font>

2、Touch事件与Mouse事件的出发关系

<font color=Yellow>在触屏操作后，手指提起的一刹那（即发生ontouchend后），系统会判断接收到事件的element的内容是否被改变，如果内容被改变，接下来的事 件都不会触发，如果没有改变，会按照mousedown，mouseup，click的顺序触发事件。特别需要提到的是，只有再触发一个触屏事件时，才会 触发上一个事件的mouseout事件。</font>


二、mousedown、mouseup、click事件之间的关系

　　点击select标签元素的时候，会弹出下拉。然而当option中没有元素时，就不希望弹出下拉（比如在某些浏览器中，点击select会默认出一个罩层效果，而此时没有数据选择的话，弹出比较不友好）。

　　首先想到是利用click事件控制，发现仍然会有下拉出现...实际这个是mousedown事件控制的。

　　这里就说明下click和mousedown、mouseup。规范要求，<font color="red">只有在同一个元素上相继触发 mousedown 和 mouseup 事件，才会触发 click 事件；如果 mousedown 或 mouseup 中的一个被取消，就不会触发 click 事件。</font>

　　这句话也很好理解，有时候我们在浏览网页时，鼠标在一个按钮或者链接上按下了，但是突然却又改了主意，此时我们一般会移开鼠标，在另一个空白处松开鼠标哈哈~相信这个大家经常上网都有经验。实际这个就利用了click事件要求在同一个元素相继触发mousedown 和 mouseup 事件。

> [移动端 触摸事件和 mousedown、mouseup、click 事件之间的关系](https://blog.csdn.net/muzidigbig/article/details/83276851)
>
> **解决办法**：
> 
> [使用指针事件处理多端设备“定点”输入问题](https://zhuanlan.zhihu.com/p/339923599)
> 
> [Pointer events 指针事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_events)