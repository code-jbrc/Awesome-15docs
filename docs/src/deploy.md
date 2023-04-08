## 自动化部署踩坑文档
### 通过Netlify实现
要实现Netlify的持续集成自动化

1. 登录到你的Netlify帐户，如果你还没有帐户，可以注册一个。

2. 在Netlify的控制面板中，点击"New site from Git"。

3. 选择GitHub作为Git提供商，并授权Netlify访问你的GitHub帐户。

4. 在列出的仓库中，选择你要部署的仓库 "code-jbrc/Awesome-15docs"。

5. 在“Build settings”配置下面的选项：
  - Build command: docs:build
  - Publish directory: dist

6. 为了确保在每次提交到主分支时进行构建，确保“Branch to deploy”设置为主分支（默认应该是 main 或 master）。

7. 点击 "Deploy site"。现在Netlify会自动构建并部署你的站点。

（可选）如果你想要自定义你的站点URL或者使用自定义域名，可以在"Site settings"中进行设置。

现在，每次你向主分支提交更改时，Netlify都会自动构建并部署你的站点。这样，你可以确保你的站点始终保持最新。

### 通过Github Action实现
使用GitHub Actions实现部署，你需要在你的仓库中创建一个名为.github/workflows/release.yml的文件。

以下是一个示例配置，当你提交到主分支时，它会自动构建你的项目并触发Netlify部署：
```yml
name: Build and Deploy to Netlify

on:
  push:
    branches:
      - main # 主分支名称

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm i --no-frozen-lockfile

      - name: Build project
        run: npm run docs:build

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --dir=dist --prod
```

为了使此工作流程正常运行，你需要设置两个GitHub Secrets：NETLIFY_AUTH_TOKEN和NETLIFY_SITE_ID。**请按照以下步骤操作**：

1. 登录到你的Netlify帐户，然后转到"user settings"。
2. 点击"Applications"，然后点击"New access token"以创建一个新的访问令牌。将此令牌保存在一个安全的地方，因为你无法再次查看它。
3. 转到你的Netlify站点设置，然后点击"Site information"以查看你的站点ID。
4. 转到你的GitHub仓库，然后转到"Settings"。
5. 点击左侧菜单中的"Secrets"，然后点击"New repository secret"。
6. 分别添加NETLIFY_AUTH_TOKEN和NETLIFY_SITE_ID，并使用第2步和第3步中找到的值填充它们。
7. 完成这些步骤后，每当你将更改推送到主分支时，GitHub Actions都会自动构建你的项目并将其部署到Netlify。

> 我们使用 Netlify 官方提供的 GitHub Actions for Netlify，这个 Action 可以让我们直接在我们的 workflow 中运行 Netlify CLI，这个 CLI 工具可以将我们的项目部署到 Netlify，我们执行了它的 deploy 命令并且使用了两个标志 --dir 和 --prod，--dir 用来指定我们要部署的文件夹路径，--prod 用来告诉 CLI 将代码提交到 Netlify site 的 production 环境，如果不加 --prod Netlify 会生成一个临时链接让我们来访问部署后的网站。为了让 Netlify 知道我们要把网站部署到具体哪个 site 中，我们还需要提供 NETLIFY_SITE_ID 和 NETLIFY_AUTH_TOKEN 这两个环境变量，我们并没有直接将以上两个值写在 workflow 中，因为如果暴露了这两个密值，任何人都可以操作我们的 Netlify site。解决方法是将这两个值保存在 GitHub 提供的专门保存 secret values 的地方

## Github Page 部署
进入仓库的 Settings => Pages 菜单下，将 Source Branch 字段设置为 pages，文件夹选择 root 根目录就好：

![image](https://user-images.githubusercontent.com/96854855/230694084-ae2b0295-4ba8-4ec1-965f-48310cdf0512.png)

点击 Save 按钮稍等片刻，等到上面出现通知表示已经构建成功。点击链接进入即可看到自动构建完成的应用了，从此以后，你只需要推送到 yml 文件中指定的分支，就可以自动触发构建，自动更新你的网站了。
## 遇到的问题
### 填写Secrets
在项目的仓库内点击Setting

![image](https://user-images.githubusercontent.com/96854855/230694118-e36962a8-81f1-4419-9c83-f4a44847b40d.png)
### pnpm 安装报错
![image](https://user-images.githubusercontent.com/96854855/230694132-4801bafd-5a43-44b8-9330-6e3477860722.png)

**问题**：

`pnpm i --frozen-lockfile` 由于直接用lock文件的pnpm版本与开发的版本不同，导致报错

**解决**：

- 升级本地开发的pnpm版本
- 使用 `pnpm i --no-frozen-lockfile`
- 删掉`lock`文件（可能导致应用运行失败）

## 自动化npm包发布
### 获取 Npm Access Token
要想让 Github Action 能有权利发布指定的 npm 包, 需要获取 npm 的 通行证. 这个通行证就是 npm token, 所以我们需要登入 npm 官网, 生成一个 token

![image](https://user-images.githubusercontent.com/96854855/230694404-fd62fa77-2db1-4448-a522-e0007edae1b0.png)

设置npm包的workflow：
```yml
name: Node.js Package
# 触发工作流程的事件
on:
  push:
    branches:
      - main
# 按顺序运行作业
jobs:
  publish-gpr:
    # 指定的运行器环境
    runs-on: ubuntu-latest
    # 定义 node 版本
    strategy:
      matrix:
        node-version: [18]
    steps:
      # 拉取 github 仓库代码
      - uses: actions/checkout@v3
      # 设定 node 环境
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          # 设置发包 npm 地址仓库
          registry-url: https://registry.npmjs.org
      # 安装 pnpm
      - name: Install pnpm
        run: npm install -g pnpm
      # 安装依赖，相当于 npm ci
      - name: Install dependencies ️
        run: pnpm install --no-frozen-lockfile
      # 执行构建步骤
      - name: 构建
        run: |
          npm run build
      # 执行部署
      - name: 部署
        # 这个 action 会根据配置自动推送代码到指定分支
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          # 指定密钥，即在第一步中设置的
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # 指定推送到的远程分支
          BRANCH: main
          # 指定构建之后的产物要推送哪个目录的代码
          FOLDER: dist
      - run: npm publish
        env:
          # 刚刚设置的 NPM_TOKEN
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```