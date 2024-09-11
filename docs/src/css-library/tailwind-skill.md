---
title: Tailwind Skill
---

## 选择子元素

Reference: [CSS-in-JS syntax](https://tailwindcss.com/docs/plugins#css-in-js-syntax)

```html
<!-- 选择 div 下的子元素 a 设置 font-size 为 12px -->
<div class="[&_a]:text-[12px]">
  <a></a>
</div>
```

## tailwindcss 选择子元素

`[&_.child:value]` 选择子元素

## has 的用法

`has-[>_div[data-slot=color-token-row]]:color-token-list` 选择子元素有 `div[data-slot=color-token-row]` 的元素

## * 子元素选择

`data-[slot=color-token-row]:*:color-token-inline-grid` 选择当前元素下的全部带有 `data-slot=color-token-row` 的标签的子元素
