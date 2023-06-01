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
