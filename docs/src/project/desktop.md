---
title: 桌面端应用开发
---

## Webview 学习

[webview 知识点](https://juejin.cn/post/7074066493792583717)

```md
1. 什么是webkit引擎
在理解什么是webview之前，让我们先来了解一下，什么是webkit引擎，我们前端写的html，css如何通过webkit引擎渲染成真正的页面呢？
（chrome浏览器也是基于webkit引擎开发的，Mozilla浏览器是基于Gecko引擎开发的，这里只说下webkit引擎）
首先要明白的是WebKit是一个渲染引擎，而不是一个浏览器，通常开发完页面后可以在浏览器上显示页面，但WebKit专注于网页内容展示，其中渲染是其中核心的部分之一。
渲染部分主要理解基于DOM树来介绍Render树和RenderLayer树的构建由来和方式。
1.1 那么什么是DOM？
简单来说，DOM是对HTML或者XML等文档的一种结构化表示方法，通过这种方式，用户可以通过提供标准的接口来访问HTML页面中的任何元素的相关属性，并可对DOM进行相应的添加、删除和更新操作等。

比如说我们使用原生js的方式：


document.getElementById()
document.getElementsByTagName()，
以及CSS选择器document.getElementsByClassName()

基于DOM树的一些可视（visual）的节点，WebKit来根据需要来创建相应的RenderObject节点，这些节点也构成了一颗树，称之为Render树。基于Render树，WebKit也会根据需要来为它们中的某些节点创建新的RenderLayer节点，从而形成一棵RenderLayer树。
Render树和RenderLayer树是WebKit支持渲染所提供的基础,WebKit的布局计算依赖它们，浏览器的渲染和GPU硬件加速也都依赖于它们。
下面借助百度的一张图，来看下在渲染过程中的不同的三个树：

2. 什么是webview
2.1 介绍完webkit引擎让我们看下什么是webview：

Webview 是一个基于webkit引擎，可以解析DOM 元素，展示html页面的控件，它和浏览器展示页面的原理是相同的，所以可以把它当做浏览器看待。

Android的Webview在低版本和高版本采用了不同的webkit版本内核，4.4后直接使用了Chrome。
2.1 webview主要用于什么地方？或者说什么需求下会使用到webview?
个人理解，电脑上展示html页面，通过浏览器打开页面即可浏览，而手机系统层面，如果没有webview支持，是无法展示html页面，所以webview的作用即用于手机系统来展示html界面的
所以它主要在需要在手机系统上加载html文件时被需要
2.3 一个原生应用调用html页面的过程？
1.原生应用加载html页面（加载页面的方式可能有多种，比如加载本地写好的html文件，或者放置在服务器的文件）
2.加载完成，展示就是通过webview来渲染展示的，如果系统没有webview，则是无法渲染展示html的
3.1、2步其实一个原生应用调用html页面过程已经完成了，那么页面不光展示，有时候可能还需要交互，这里的话就需要写一些方法了，比如html界面的按钮需要调用系统原生的东西（比如：拍照，系统的文件，相册之类的）。原生端就负责维护html调用的接口，然后按照需要返回（原生端充当一个server的角色，html充当一个client角色）
2.4 使用webview的好处？
原生APP是将页面的布局设计，以及业务代码打包然后用户下载安装使用，而webview是通过加载html文件来进行页面的展示，当需要更新页面布局的或者业务逻辑变更时，如果是原生的APP就需要修改前端内容，升级打包，重新发布才可以使用最新的。
而通过webview方式的页面则只需要修改html代码或者js文件（如果是从服务器端获取，只要新的文件部署完成），用户重新刷新就可以使用更新后的，无需通过下载安装的方式完成升级
2.5 安卓系统内置浏览器，自带浏览器？
内置浏览器和自带浏览器是一个概念？
国内手机的自带浏览器不是chrome，主要是版权的原因，自带的浏览器都是手机厂商基于国内主流的几大浏览器自己定制，然后发布在自己手机系统版本中.不过国内几大浏览器厂商如QQ浏览器，UC浏览器、都是基于webkit引擎的
iphone的自带浏览器是Safari，Safari浏览器的内核是webkit
2.6。1 原生渲染（主要讲IOS） 类原生RN类React Native  webview差异？
iOS原生渲染的流程有那几部分组成呢？
主要分为以下四步：

第一步：更新视图树、图层树。（分别对应View的层级结构、View上的Layer层级结构）
第二步：CPU开始计算下一帧要显示的内容（包括视图创建、布局计算、视图绘制、图像解码）。当 runloop 在 kCFRunLoopBeforeWaiting 和 kCFRunLoopExit 状态时，会通知注册的监听，然后对图层打包，打完包后，将打包数据发送给一个独立负责渲染的进程 Render Server。
前面 CPU 所处理的这些事情统称为 Commit Transaction。
第三步：数据到达 Render Server 后会被反序列化，得到图层树，按照图层树的图层顺序、RGBA 值、图层 frame 来过滤图层中被遮挡的部分，过滤后将图层树转成渲染树，渲染树的信息会转给 OpenGL ES/Metal。
第四步：Render Server 会调用 GPU，GPU 开始进行前面提到的顶点着色器、形状装配、几何着色器、光栅化、片段着色器、测试与混合六个阶段。完成这六个阶段的工作后，就会将 CPU 和 GPU 计算后的数据显示在屏幕的每个像素点上。


2.6.2. WebView：
对于WebView渲染，其主要工作在WebKit中完成。
WebKit本身的渲染基于macOS的Lay Rendering架构，iOS本身渲染也是基于这套架构。
因此，本身从渲染的实现方式来说，性能应该和原生差别不大。
但为什么我们能明显感觉到使用WebView渲染要比原生渲染的慢呢？

第一，首次加载。会额外多出网络请求和脚本解析工作。
即使是本地网页加载，WebView也要比原生多出脚本解析的工作。
WebView要额外解析HTML+CSS+JavaScript代码。
第二，语言解释执行性能来看。JS的语言解析执行性能要比原生弱。
特别是遇到复杂的逻辑与大量的计算时，WebView 的解释执行性能要比原生慢不少。
第三，WebView的渲染进程是独立的，每一帧的更新都要通过IPC （IPC（Inter-Process Communication，进程间通信）。进程间通信是指两个进程的数据之间产生交互）调用GPU进程，会造成频繁的IPC进程通信，从而造成性能消耗。并且，两个进程无法共享纹理资源，GPU无法直接使用context光栅化，而必须要等待WebView通过IPC把context传给GPU再光栅化。因此GPU自身的性能发挥也会受影响。

因此，WebView的渲染效率，是弱于原生渲染的。
2.6.3 类React Native（使用JavaScriptCore引擎做为虚拟机方案）
代表：React Native、Weex、小程序等。
我们以 ReactNative 举例：
React Native的渲染层直接走的是iOS原生渲染，只不过是多了Json+JavaScript脚本解析工作。
通过JavaScriptCore引擎将“JS”与“原生控件”产生相对应的关联。
进而，达成通过JS来操控iOS原生控件的目标。
（简单来说，这个json就是一个脚本语言到本地语言的映射表，KEY是脚本语言认识的符号，VALUE是本地语言认识的符号。）

简单介绍一下，JavaScriptCore：
JavaScriptCore 是 iOS 原生与 JS 之间的桥梁，其原本是 WebKit 中解释执行 JavaScript 代码的引擎。目前，苹果公司有 JavaScriptCore 引擎，谷歌有V8引擎。

但与 WebView 一样，RN也需要面临JS语言解释性能的问题。
因此，从渲染效率角度来说，WebView < 类ReactNative < 原生。
（因为json的复杂度比html+css低）
2.7 APP webview展示的页面和通过手机浏览器打开的页面一样吗？
不管是ios还是安卓，自带浏览器底层都是基于webkit的，然后各自系统中均带有webview控件，也是基于webkit引擎，所以不管通过APP调用webview展示html页面还是通过在浏览器打开html页面，效果是一样的。
以上就是学习的一些有关webview的知识点。
站在巨人的肩膀上学习 👇🏻：
学习链接如下： ❤
iOS 浅谈GPU及“App渲染流程
WebView性能、体验分析与优化
WebView你真的熟悉吗？看了才知道
优化wwebview方案：
满满的WebView优化干货，让你的H5实现秒开体验
```