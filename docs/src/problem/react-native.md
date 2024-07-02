---
title: React Native 问题记录
---

# React Native 踩坑

## 安装环境

推荐看[官方文档](https://www.reactnative.cn/docs/environment-setup)的教程，开发react native最好在mac平台，调试更方便

## 初始化项目

`npx react-native init AwesomeTSProject --template react-native-template-typescript`

如果安装失败，可以指定使用npm安装

`npx react-native init AwesomeTSProject --template react-native-template-typescript --npm`

也可以使用expo cli，expo提供了更好的开箱即用支持和平滑的升级体验，第一次上手推荐使用这个

```bash
npm install -g expo-cli
expo init AwesomeProject
```

## 我的RN模版

经过大半个月的踩坑，我搞了一个对于我来说开发体验还算不错的[模版](https://github.com/yang1206/react-native-template)，下面来介绍一下

### 技术栈

- TypeScript：类型安全的JavaScript超集。
- Tailwind CSS：实用的CSS框架。
- React Query：用于数据获取和状态管理的库。
- Zod：用于解析和验证数据的模式库。
- React Hook Form：用于表单处理和验证的库。
- React Navigation：功能强大的导航库。
- React Native MMKV：高性能的键值存储解决方案。
- Expo：支持部分Expo包。
- React Native Reanimated：高性能动画库。
- React Native Vector Icons：矢量图标库。
- React Query Kit：React Query的实用工具集。
- Zustand：轻量级状态管理库。

TS不用多说，首先讲一下Tailwind CSS，我们知道RN不支持css，所以我们需要借助[nativewind](https://nativewind.dev)这个库将tailwind语法编译成RN的StyleSheet对象，我在这个模版中使用了compileOnly模式，通过nativewind提供的styled方法包装react native基础组件，因为我们不希望所有组件都被转换，这样也能更好的控制想要设置样式的组件，并且可以减少转换的时间，组件在`@/ui/core`目录中；这个做法参考了这个[模版](https://github.com/obytes/react-native-template-obytes)，如果你使用expo cli，那么我会直接推荐你使用这个模版，因为我的模版大部分都参考了这个模版，区别在于我使用了react-native-cli; 如果你想在所有组件中使用，按照nativewind文档使用即可。

React query这个库可以方便我们请求数据，React Query Kit能使 ReactQuery 更易复用和类型安全，强烈推荐这两个工具

React Hook Form和Zod，用来做表单校验，不必多说。

这里我使用了React Native MMKV来替换了RN社区更流行的asyncStorage，因为它更快，同时采用了Zustand进行状态管理，Zustand也是目前React社区非常流行的一个状态管理方案，使用也非常方便。

另外一个地方就是react native的打包工具metro目前不支持符号链接，也就是不支持pnpm等包管理工具，但是我就是想用pnpm，所以在github上发现了[这个库](https://microsoft.github.io/rnx-kit/docs/tools/metro-resolver-symlinks)，它可以使metro支持符号链接，根据文档修改metro配置即可使用pnpm啦，这个项目由微软开源，同时还提供了其它很有用的RN工具，大家可以自行研究。

另外模版也使用了expo的一些包，因为它们在积极维护，并且大部分包都支持在裸漏的RN项目使用，你可以查看[文档](https://docs.expo.dev/versions/latest/sdk/)来判断哪些包支持

大概用到的库就是这些，剩下都是React Native社区非常成熟的库，可以自行去官网或github查看文档

### 调试

调试应该是RN最麻烦的事情，在这个模版中我使用了[flipper](https://github.com/facebook/flipper)调试工具，因为如果你使用了原生代码，就只能使用它来调试，它支持查看网络请求，查看React组件等，我在模版已经配置好了React query，React Navigation，MMKV的调试 devtools，因此你可以直接上手使用，记得在flipper的plugin下载插件， 如果你使用的是苹果m系列芯片的mac，官方只放出了英特尔版，体验非常糟糕，因此我推荐m系列芯片用户在这里[下载](https://github.com/chiragramani/FlipperReleases)，它提供了mac通用版本，拥有更流畅的体验。

注意⚠️，你下载的flipper桌面客户端版本需要和你的react-native-flipper依赖版本匹配

### 构建发布版本

#### ios

我已经配置好了打包命令，首先运行`pnpm bundle:ios`命令，他会生成静态资源文件，这是打包必须的步骤

然后启动xcode

![](https://s2.loli.net/2023/04/27/2j1QbASmJOUwM5v.png)

将生成的文件添加到Copy Bundle Resources中

然后运行`pnpm ios:release`，如果不出意外，生产包就会安装在模拟器中，不需要metro 加载js就能运行，如果你要安装到真机上或是发布到app store，请使用xcode，查看官网的[教程](https://reactnative.dev/docs/publishing-to-app-store)

如果你在构建ios发布版本时遇到了这个错误

```
 "_OBJC_CLASS_$_FlipperClient", referenced from:
      objc-class-ref in libreact-native-flipper.a(FlipperReactNativeJavaScriptPluginManager.o)
ld: symbol(s) not found for architecture arm64
```

这是因为最新的flipper导致的，具体可查看[issue](https://github.com/facebook/flipper/issues/4278)，目前我的解决办法就是在打包前移除它

新建一个react-native.config.js文件

```javascript
//react-native.config

module.exports = {
  dependencies: {
    { 'react-native-flipper': { platforms: { ios: null } } }
  },
}

```

然后重新安装pod依赖，再次使用xcode打包应该就没有问题了

```bash
pnpm podinstall
```

目前我遇到的问题就是这些，如果有其他问题可以尝试删除ios目录下的pod和build文件夹，重新安装pod库，卸载掉之前安装在模拟器的的应用，如果还是无法解决，就只能google或者bing国际版搜索了，一般情况下都可以在github或stackoverflow找到答案。

#### android

打包之前你需要生成密钥，具体可以参考官方文档这篇[文章](https://reactnative.dev/docs/signed-apk-android)

然后的步骤就与ios一样了，先运行`pnpm bundle:android`生成静态资源，然后运行`模版`	中准备好的脚本命令`pnpm  android:release`，然后你就可以在 `android/app/build/outputs/apk/release`目录下找到你打包好的apk文件。

处理安卓的打包时我遇到了很多的问题，下面就讲一讲并给出我的解决办法。

1. `Execution failed for task ':app:mergeReleaseResources'.`
   删除`android/app/src/main/res/`目录下`drawable-`开头的文件夹，这是之前生成静态资源时产生的，删除后重新运行打包即可

2. `Execution failed for task ':app:installRelease'.`错误，这是由于你的模拟器上已经安装有一个相同签名名称的app，卸载之前的开发版再次运行打包即可。

3. 其他错误，终端进入android目录，运行` ./gradlew clean`命令，尝试清除项目构建过程中生成的临时文件和输出文件。运行此命令可以帮助解决构建过程中的一些问题，例如构建失败或构建结果与预期不符。如果你使用了volta这个工具，在命令后加入`./gradlew clean --no-daemon`，这是因为volta对RN的支持不太好

### 修改图标或启动页面

可以在[图标工场](https://icon.wuruihong.com/)生成对应的图标文件。

这个部分我强烈推荐阅读expo的[这篇教程](https://github.com/expo/expo/tree/main/packages/expo-splash-screen#-installation-in-bare-react-native-projects)，图文并茂，照着教程一步一步来就行。

## 总是在 Installing boost (1.76.0)

[pod install fails (not M1) — 401 when installing Boost](https://github.com/facebook/react-native/issues/33462)

解决办法：

一、

```bash
rm -rf ~/Library/Caches/CocoaPods
rm -rf Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
pod deintegrate
pod setup
pod install
```

二、替换地址

`node_modules/react-native/third-party-podspecs/boost.podspec`

```bash
spec.source = { :http => 'https://sourceforge.net/projects/boost/files/boost/1.76.0/boost_1_76_0.tar.bz2',
                  :sha256 => 'f0397ba6e982c4450f27bf32a2a83292aba035b827a5623a14636ea583318c41' }
```

三、但是 `use_frameworks!` 不能跟 `flipper` 一起使用，所以需要注释掉 `use_frameworks!`

## Why you don’t need Flipper in your React Native app … and how to get by without it

[为什么不需要 Flipper 和如何替代它](https://shift.infinite.red/why-you-dont-need-flipper-in-your-react-native-app-and-how-to-get-by-without-it-3af461955109)

## 封装 FlexView 给 react-native 使用

```tsx
import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

interface FlexViewProps {
  children: React.ReactNode
  start?: boolean
  end?: boolean
  around?: boolean
  between?: boolean
  style?: StyleProp<ViewStyle>
  center?: boolean
  col?: boolean
  itemsCenter?: boolean
  [key: string]: any
}

const marginMap = {
  matchRegex: /^m[tblr]?-(\d+)$/,
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
}

const paddingMap = {
  matchRegex: /^m[tblr]?-(\d+)$/,
  p: 'padding',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
}

export function FlexView(props: FlexViewProps) {
  const { children, start, end, around, between, className, center, col, style, itemsCenter, ...other } = props

  const base: StyleProp<ViewStyle> = {
    display: 'flex',
    flexDirection: col ? 'column' : 'row',
    justifyContent: start
      ? 'flex-start'
      : end
        ? 'flex-end'
        : around
          ? 'space-around'
          : between
            ? 'space-between'
            : center
              ? 'center'
              : undefined,
    alignItems: itemsCenter ? 'center' : undefined,
  }

  Object.keys(other).forEach((key) => {
    const value = +key.split('-')[1]
    const attrKey = key.split('-')[0]

    if (key.startsWith('w-'))
      base.width = value

    if (key.startsWith('h-'))
      base.height = value

    if (marginMap.matchRegex.test(key))
      base[marginMap[attrKey]] = value

    if (paddingMap.matchRegex.test(key))
      base[paddingMap[attrKey]] = value

  })

  return <View style={[base, style]}>{children}</View>
}
```
