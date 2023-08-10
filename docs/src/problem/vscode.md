---
title: vscode 开发问题记录
---

# vscode 开发问题记录

## 调试时，可以禁用其他插件以提升速度

配置查看

```json
{
  "configurations": [
    {
      "args": [
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--disable-extensions" // 禁用其他插件
      ],
      "runtimeExecutable": "${execPath}",
      "name": "启动扩展",
      "outFiles": [
        "${workspaceFolder}/dist/**/*.js"
      ],
      "request": "launch",
      "type": "extensionHost"
    }
  ]
}
```

## 作用域检查器

`vscode`自带的作用域检查器能帮你调试语法文件。它能显示当前位置符号作用域，以及应用在上面的主题规则和元信息。

在命令面板中输入`Developer: Inspect Editor Tokens and Scopes`或者使用快捷键启动作用域检查器。

![](https://code.visualstudio.com/assets/api/language-extensions/syntax-highlighting/scope-inspector.png)

## 获取lineText的方式

### 通过Range的方式

- `document.getText(document.lineAt(position).range)`

### 通过Position的方式

- `document.lineAt(position.line).text.trim()`