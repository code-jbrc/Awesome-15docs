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
