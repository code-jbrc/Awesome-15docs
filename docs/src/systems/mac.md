---
title: Mac 开发问题
---

# Mac 开发问题

## Error: EMFILE: too many open files（超出文件打开限制）

由于`Mac`系统默认对打开文件的数量进行了限制，开发过程中，经常遇到超出文件打开限制的错误

**解决办法：**

在文件夹 /`Library/LaunchDaemons` 下创建一个 `plist` 文件 `limit.maxfiles.plist`

### 1. 添加内容

```html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>limit.maxfiles</string>
    <key>ProgramArguments</key>
    <array>
      <string>launchctl</string>
      <string>limit</string>
      <string>maxfiles</string>
      <string>65536</string>
      <string>200000</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>ServiceIPC</key>
    <false/>
  </dict>
</plist>
```

### 2. 修改文件权限

```sh
sudo chown root:wheel /Library/LaunchDaemons/limit.maxfiles.plist
sudo chmod 644 /Library/LaunchDaemons/limit.maxfiles.plist
```

### 3. 载入新设定（并加入启动任务）

```sh
sudo launchctl load -w /Library/LaunchDaemons/limit.maxfiles.plist
```

### 4. 查看当前限制

```sh
launchctl limit
```

### 5. 验证

- 核心参数验证：sysctl -a | grep maxfiles 如果出来参数是 65536 524288 则为成功。
- 守护进程验证：sudo launchctl list | grep limit.maxfiles 如果该守护进程成功运行，则会显示类似于以下内容的输出：- 0 limit.maxfiles

:::tip 补充
`limit maxfiles` 是一个命令，用于在 macOS 或类似的 Unix 系统中设置文件描述符限制。

文件描述符是操作系统用于追踪打开文件或网络连接的标识符。在某些情况下，系统对同时打开的文件描述符数量进行了限制，以控制系统资源的使用。

通过运行 `launchctl limit maxfiles 65536 200000` 命令，您可以将文件描述符限制设置为以下两个值：

- `65536`：表示软限制（soft limit），即系统允许的最大文件描述符数量。软限制是一个警告阈值，超过该值后，系统会发出警告信息。
- `200000`：表示硬限制（hard limit），即系统允许的最大文件描述符数量的绝对上限。硬限制是软限制的上限，超过该值后，系统会阻止进一步增加文件描述符数量。

这意味着，通过该命令，您将将文件描述符限制设置为软限制为 `65536`，硬限制为 `200000`。

请注意，修改文件描述符限制可能需要管理员权限。此命令会直接修改系统的文件描述符限制，并且可能对系统性能和稳定性产生影响。在修改文件描述符限制之前，请确保了解其含义、限制和潜在的影响，并谨慎操作。
:::

::: warning 注意
可使用 `sysctl -a | grep maxfiles` 验证是否成功

若出现以下内容，且为对应修改的值，则为成功：

- kern.maxfiles: 12288 表示系统最大打开文件数限制是12288。也称为“硬限制”
- kern.maxfilesperproc: 10240 表示单个进程最大打开文件数限制是10240。也称为“软限制”


**另外**

实际机器在安装 aTrust 后发现以上验证不通过，解决办法：

- 在 `launchctl list` 时发现 `com.sangfor.limit.maxfiles`
- 可以使用以下命令来查看守护进程的配置内容： `sudo launchctl list com.sangfor.limit.maxfiles`
- `cat /Library/LaunchDaemons/com.sangfor.limit.maxfiles.plist` 可以看到相关任务具体内容。
- 使用这个命令关闭此多余任务 `sudo launchctl unload -w /Library/LaunchDaemons/com.sangfor.limit.maxfiles.plist`

**参考资料**：[https://zhuanlan.zhihu.com/p/631912339](https://zhuanlan.zhihu.com/p/631912339)

:::

## nvm command not found

```bash
source ~/.nvm/nvm.sh
```

You can run this command on the bash OR you can put it in the file `/.bashrc` or `~/.profile` or `~/.zshrc` to automatically load it

## 添加 gpg 签名

文章：[https://juejin.cn/post/7268593569782300727?searchId=20240202102610CE10A1BB825AF77F7FF8](https://juejin.cn/post/7268593569782300727?searchId=20240202102610CE10A1BB825AF77F7FF8)
