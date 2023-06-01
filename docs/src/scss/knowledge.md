---
title: Scss 常用知识点
outline: [2, 3]
---

# Scss 常用知识点

## Scss内置扩展

`scss`内置扩展分为`color list map math meta selector  string`等，扩展也就是`scss`内置的一些`function`，每个模块下内容比较多，这里用一些常用的进行举例。

内置函数可以使用@`use`模块化引入，也可以直接使用他提供的全局函数名调用，以下两种方式是一样的。

```scss
@use 'sass:list';
p {
    color: nth($list: red blue green, $n: 2); // blue
    color: list.nth($list: red blue green, $n: 2); // blue
}
```

### color

`scss`包含很多操作颜色的函数。例如`lighten()`与 `darken()`可用于调亮或调暗颜色，`opacify()`使颜色透明度减少，`transparent()`使颜色透明度增加，`mix()`用来混合两种颜色。

```scss
.p1 {
    // 让颜色变亮
    color:scale-color(#5c7a29, $lightness: +30%);
}

.p2 {
    // 让颜色变暗
    color:scale-color(#5c7a29, $lightness: -15%);
}

.p3 {
    // 降低颜色透明度
    color:scale-color(#5c7a29, $alpha: -40%);
}
```

编译为

```scss
.p1 {
    color: #95c249;
}

.p2 {
    color: #4e6823;
}

.p3 {
    color: rgba(92, 122, 41, 0.6);
}
```

### String

`scss`有许多处理字符串的函数，比如向字符串添加引号的`quote()`、获取字符串长度的`string-length()`和将内容插入字符串给定位置的`string-insert()`。

```scss
p {
    &:after {
        content: quote(这是里面的内容);
    }
    background-color: unquote($string: "#F00");
    z-index:str-length("scss学习");
}
```

编译为

```scss
p {
    background-color: #F00;
    z-index: 6;
}
p:after {
    content: "这是里面的内容";
}
```

### Math

数值函数处理数值计算，例如：`percentage()`将无单元的数值转换为百分比，`round()`将数字四舍五入为最接近的整数，`min()`和`max()`获取几个数字中的最小值或最大值，`random()`返回一个随机数。

```scss
p {
    z-index: abs(-15); // 15
    z-index: ceil(5.8); //6
    z-index: max(5, 1, 6, 8, 3); //8
    opacity: random(); // 随机 0-1
}
```

编译为

```scss
p {
    z-index: 15;
    z-index: 6;
    z-index: max(5, 1, 6, 8, 3);
    opacity: 0.8636254167;
}
```

### List

`List`函数操作`List，length()`返回列表长度，`nth()`返回列表中的特定项，`join()`将两个列表连接在一起，`append()`在列表末尾添加一个值。

```scss
p {
    z-index: length(12px); //1
    z-index: length(12px 5px 8px); //3
    z-index: index(a b c d, c); //3
    padding: append(10px 20px, 30px); // 10px 20px 30px
    color: nth($list: red blue green, $n: 2); // blue
}
```

编译为

```scss
p {
    z-index: 1;
    z-index: 3;
    z-index: 3;
    padding: 10px 20px 30px;
    color: blue;
}
```

### Map

`Map`函数操作`Map，map`-`get()`根据键值获取`map`中的对应值，`map-merge()`来将两个`map`合并成一个新的`map，map`-`values()`映射中的所有值。

```scss
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px);
$padding:(top:10px, right:20px, bottom:10px, left:30px);
p {
    font-size: map-get($font-sizes, "normal"); //18px
    @if map-has-key($padding, "right") {
        padding-right: map-get($padding, "right");
    }
    &:after {
        content: map-keys($font-sizes) + " "+ map-values($padding) + "";
    }
}
```

编译为

```scss
p {
    font-size: 18px;
    padding-right: 20px;
}
p:after {
    content: '"small", "normal", "large" 10px, 20px, 10px, 30px';
}
```

### selector

选择符相关函数可对选择`css`进行一些相应的操作，例如：`selector-append()`可以把一个选择符附加到另一个选择符，`selector-unify()`将两组选择器合成一个复合选择器。

```scss
@use 'sass:selector';

@debug selector.is-superselector("a", "a"); // true

// 可以直接使用@forward下的前缀
@debug selector-append("a", ".disabled"); // a.disabled
@debug selector-extend("a.disabled", "a", ".link"); // a.disabled, .link.disabled

.header {
    content: selector-append(".a", ".b", ".c") + '';
    content: selector-unify("a", ".disabled") + '';
}
```

编译为

```scss
.header {
    content: ".a.b.c";
    content: "a.disabled";
}
```

### meta

`meta`提供一个`mixin`和一些原子级别的`function`，比如使用`meta.calc`-`args`获取方法的参数，`meta.calc`-`name`获取方法名。

```scss
meta.load-css
meta.load-css($url，$with:())该mixin可以把$url中css样式全部包含进来。注意，$url引入的函数，变量和mixin在 meta.load-css()后的scss中并不能用，它只会返回编译后的css代码。它的第二个参数可以修改使用了!default的变量。

src/corners

$border-contrast: false !default;

code {
    background-color: #6b717f;
    color: #d2e1dd;
    @if $border-contrast {
        border-color: #dadbdf;
    }
}
index.scss

@use "sass:meta";

body.dark {
    @include meta.load-css("src/corners", $with: ("border-contrast": true));
}
```

编译为

```scss
body.dark code {
    background-color: #6b717f;
    color: #d2e1dd;
    border-color: #dadbdf;
}
function
@use "sass:meta";

@debug meta.calc-args(calc(100px + 10%)); // unquote("100px + 10%")
@debug meta.calc-args(clamp(50px, var(--width), 1000px)); // 50px, unquote("var(--width)"), 1000px

@debug meta.calc-name(calc(100px + 10%)); // "calc"
@debug meta.calc-name(clamp(50px, var(--width), 1000px)); // "clamp"
```