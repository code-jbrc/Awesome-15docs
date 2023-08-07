---
title: Shell 问题记录
---

## 调试模式

`bash -x`来简单地启用脚本的调试输出。

1. 安装Bash和bashdb：

- 安装Git for Windows：访问https://gitforwindows.org/并下载适合您系统的Git for Windows安装程序。在安装过程中，选择安装"Git Bash Here"和"Git GUI Here"选项。
- 安装bashdb：在Git Bash中运行以下命令来安装bashdb：

```bash
git clone https://github.com/rocky/bashdb.git
cd bashdb
./configure
make
sudo make install
```

2. 编写您的Shell脚本：使用任何文本编辑器编写您的Shell脚本并保存为.sh文件。

3. 设置断点：在您希望设置断点的地方，插入`set -x`命令。例如：

```bash
#!/bin/bash
echo "This is a debuggable line."
set -x  # 设置断点
echo "This line will be printed during debugging."
```

4. 运行脚本并启动调试器：在Git Bash中运行以下命令来启动调试器并运行您的脚本：

```bash
bashdb your_script.sh
```
这将启动bashdb调试器并加载您的脚本。

5. 调试Shell脚本：bashdb会在断点处停止执行，您可以使用各种调试命令来探查变量、执行步骤、单步执行等。

- `c`：继续执行直到下一个断点或脚本结束。
- `n`：单步执行下一条命令。
- `s`：进入子函数并停止在第一行。
- `l`：显示当前行附近的代码。
- `p`：打印变量的值。
- `q`：退出调试器。

## $()和"$()"的区别

`$()`和`"$()"`实际上是同一个意思，它们都是用于在Bash（和其他类Unix shell）中执行命令并捕获其输出的方法。

`$()`是一种用于命令替换的一般形式，其中括号内是要执行的命令。执行这个命令后，将用该命令的输出结果替换整个`$()`部分。

例如：
```bash
result=$(ls)
```
在这个例子中，`$(ls)`执行`ls`命令来列出当前目录的文件列表，并将输出结果存储在`result`变量中。

`"$()"`是对`$()`的引用，它在双引号中使用，可以帮助防止一些特殊字符被解释或扩展。在`$()`中，命令的输出通常会被解释成单个词，如果输出包含空格或其他特殊字符，可能会出现问题。但是，如果将`$()`放在双引号内，输出将会作为一个整体保持，这样可以更安全地处理命令的输出。

例如：
```bash
filename="file with spaces.txt"
result="$(ls "$filename")"
```
在这个例子中，如果文件名有空格，将其包含在`"$()"`中可以确保输出结果被当做一个整体，而不会被解释成多个单词。

总结起来，`$()`和`"$()"`都是用于在Bash中执行命令并捕获其输出的方法。`"$()"`在一些情况下可以提供更安全的输出处理。