---
title: Eslint 配置
---

## Eslint Flag Config (new eslint system)

[https://eslint.org/blog/2022/08/new-config-system-part-2/](https://eslint.org/blog/2022/08/new-config-system-part-2/)

## eslint-plugin-import

### 额外区分 type 导入

`"import/consistent-type-specifier-style": ["error", "prefer-top-level"]`

```ts
// ✅
import type { HTMLNextUIProps, PropGetter } from '@nextui-org/system'

import { useProviderContext } from '@nextui-org/system'
```