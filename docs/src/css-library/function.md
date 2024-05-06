---
title: Scss 封装函数
---

# Scss 封装函数

## Triangle 三角形封装

```scss
@mixin triangle($direction:top, $size:30px, $border-color:black) {
  width: 0px;
  height: 0px;
  display: inline-block;
  border-width: $size;
  border-#{$direction}-width: 0;
  @if ($direction==top) {
     border-color: transparent transparent $border-color transparent;
     border-style: dashed dashed solid dashed;
  }
  @else if($direction==right) {
     border-color: transparent transparent transparent $border-color;
     border-style: dashed dashed dashed solid;
  }
  @else if($direction==bottom) {
     border-color: $border-color transparent transparent transparent;
     border-style: solid dashed dashed dashed;
  }
  @else if($direction==left) {
     border-color: transparent $border-color transparent transparent;
     border-style: dashed solid dashed dashed;
  }
}
.p0 {
     @include triangle($size:50px);
}

.p1 {
     @include triangle(right, 50px, red);
}

.p2 {
    @include triangle(bottom, 50px, blue);
}

.p3 {
     @include triangle(left, 50px, green);
}
```

编译为

```scss
.p0 {
    width: 0px;
    height: 0px;
    display: inline-block;
    border-width: 50px;
    border-top-width: 0;
    border-color: transparent transparent black transparent;
    border-style: dashed dashed solid dashed;
}

.p1 {
    width: 0px;
    height: 0px;
    display: inline-block;
    border-width: 50px;
    border-right-width: 0;
    border-color: transparent transparent transparent red;
    border-style: dashed dashed dashed solid;
}

.p2 {
    width: 0px;
    height: 0px;
    display: inline-block;
    border-width: 50px;
    border-bottom-width: 0;
    border-color: blue transparent transparent transparent;
    border-style: solid dashed dashed dashed;
}

.p3 {
    width: 0px;
    height: 0px;
    display: inline-block;
    border-width: 50px;
    border-left-width: 0;
    border-color: transparent green transparent transparent;
    border-style: dashed solid dashed dashed;
}
```
## 变量定义函数

```scss
@use 'sass:map';
@use 'sass:list';
@use 'sass:meta';

/**
 * 添加变量名前缀
 * @example
 * to-css-var-name('result', 'color') -> --vxp-result-color
 * -------------------------------------------------------------------------- */

@function to-css-var-name($name-units...) {
  // variable prefix is fixed to '--vxp'
  $name: '--vxp';

  @each $unit in $name-units {
    @if $unit != '' {
      $name: $name + '-' + $unit;
    }
  }

  @return $name;
}

// 获取css值
@function get-css-var($name-units...) {
  @return var(#{to-css-var-name($name-units...)});
}

// 定义css变量
@mixin define-css-var($name-units, $value) {
  #{to-css-var-name($name-units...)}: #{$value};
}

/**
 * 定义预设值
 * @example
 * @include define-preset-values('result', { text-color: #000 })
 * @result
 * --vxp-result-text-color: #000
 * -------------------------------------------------------------------------- */
@mixin define-preset-values($base-name, $style-map, $inspect: false) {
  @each $name in map.keys($style-map) {
    @include define-css-var(
      ($base-name, $name),
      if($inspect, #{meta.inspect(map.get($style-map, $name))}, map.get($style-map, $name))
    );
  }
}

/**
 * 定义预设样式值
 * @example
 * @include define-preset-style('result', { text-color: color test dark-2 })
 * @result
 * --vxp-result-text-color: var(--vxp-result-color-test-dark-2)
 * -------------------------------------------------------------------------- */
@mixin define-preset-style($base-name, $style-map) {
  @each $name in map.keys($style-map) {
    $style-units: map.get($style-map, $name);

    @if list.length($style-units) != 0 {
      @include define-css-var(($base-name, $name), get-css-var($style-units...));
    }
  }
}
```

:::warning meta.inspect的作用
`meta.inspect()`内的`scss`内容会被保留
:::