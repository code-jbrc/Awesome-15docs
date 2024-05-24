# 自动化部署踩坑文档

## 通过Netlify实现
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

## 通过Github Action实现
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
permissions:
  contents: write

on:
  push:
    tags:
      - 'v*'

  # 按顺序运行作业
  # 创建 publish-npm 任务
  publish-npm:
    # 在 ubuntu 最新版本的虚拟机执行
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      # 检查并切换到 main 分支
      - name: 检查 main 分支
        # 使用 actions/checkout 插件
        uses: actions/checkout@v3

      # 初始化缓存
      - name: 初始化缓存
        uses: actions/cache@v3
        id: cache-dependencies
        with:
          path: node_modules
          key: ${{runner.OS}}-${{hashFiles('**/package-lock.json')}}

      # 安装 node
      - name: 安装 Node.js
        # 使用 actions/setup-node 插件
        uses: actions/setup-node@v3
        with:
          # node版本
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm run build

      # 读取当前版本号
      - name: 读取当前版本号
        id: version
        uses: notiz-dev/github-action-json-property@release
        with:
          # 读取版本号
          path: ./package.json
          prop_path: version

      - run: echo ${{steps.version.outputs.prop}}

      - name: 创建 Release
        uses: softprops/action-gh-release@v1
        with:
          files: ./lib/index.umd.js
          name: v${{steps.version.outputs.prop}}
          tag_name: v${{steps.version.outputs.prop}}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: 发布 NPM 包
        # 执行发布代码
        run: |
          npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN
          npm publish
        env:
          # 配置 npm access token 环境变量
          NPM_TOKEN: ${{secrets.NPM_ACCESS_TOKEN}}

      - name: 刷新缓存
        run: |
          curl https://purge.jsdelivr.net/npm/iemotion-pic@latest/lib/name.json
```

## 部署github robot
```yml
name: 3D-PICTURE

on:
  schedule:
    - cron: '0 8 * * *'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    name: generate-github-profile-3d-contrib
    steps:
      - uses: actions/checkout@v2
      - uses: yoshi389111/github-profile-3d-contrib@0.7.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          USERNAME: ${{ github.repository_owner }}
      - name: Commit & Push
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add -A .
          git commit -m "generated"
          git push
```

这里的`GITHUB_TOKEN`和`repository_owner`都会自动生成

> **注意**：因为要写入文件，所以记得要去`secrets`里给`GITHUB_TOKEN`设置写入的权限

## 自动Tag发布，并生成CHANGELOG.md文件

添加`workflows`

```yml
# .github/workflows/release.yml

name: Release

permissions:
  contents: write

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v3
        with:
          node-version: 16.x

      - run: npx changelogithub # or changelogithub@0.12 if ensure the stable result
        env:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

`scripts` 里添加指令 `changlog`和`release`

```json
{
  "scripts": {
    "changlog": "npx conventional-changelog -p angular -i CHANGELOG.md -s --commit-path .",
    "release": "bumpp --execute='npm run changlog' --all"
  }
}
```

最后运行`release`，然后运行成功后`npm publish`即可。

## 自定义 changelog

通过脚本的形式，可以生成更定制化的`changelog`信息

```ts
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import readline from 'node:readline'
import standardChangelog from 'standard-changelog'
import { VERSION, pkg } from '../constants/common'
import { GENERATE_DIR, resolver } from '../constants/paths'
import { logger } from '../logger'

const VERSION_REG = /\d+\.\d+\.\d+/
const JIRA_REG = /\w+-\d+/
const COMMIT_TEMPLATE = fs.readFileSync(resolver(`${GENERATE_DIR}/commit.hbs`), 'utf8')
const HEADER_TEMPLATE = fs.readFileSync(resolver(`${GENERATE_DIR}/header.hbs`), 'utf8')

function getLastCommit() {
  const gitCommand = 'git log --oneline'
  const changeLogCommits = execSync(gitCommand, {
    cwd: process.cwd(),
    encoding: 'utf-8',
  }).split('\n')

  return changeLogCommits
    .find((cmt: string) => VERSION_REG.test(cmt) && (cmt.includes('version') || /v\d+\.\d+\.\d+/.test(cmt)))
    ?.slice(0, 7)
}

function getCommitterInfo(hash: string) {
  const gitCommand = `git show -s --format='%an' ${hash}`
  return execSync(gitCommand, {
    cwd: process.cwd(),
    encoding: 'utf-8',
  }).replace('\n', '')
}

function addTitlePrefix(title: string) {
  if (title.includes('Bug'))
    return `🐛 ${title}`
  else if (title.includes('Feature'))
    return `🚀 ${title}`
  else if (title.includes('Others'))
    return `🔧 ${title}`

  return title
}

function updateVersion() {
  return new Promise((resolve) => {

    const rl = readline.createInterface({ input: process.stdin as any, output: process.stdout as any })

    logger.info(`当前 package.json 版本号为: ${VERSION}\n请输入本次要发布的版本号:(可按回车跳过)\n`)

    rl.prompt()

    rl.on('line', (input) => {
      let newVersion = ''
      if (!input) {
        newVersion = VERSION.replace(/(\d+\.\d+\.)(\d+)/, (version, $1, $2) => $1 + (Number($2) + 1))
      }
      else if (!VERSION_REG.test(input)) {
        logger.error('⚡ 请输入正确版本号格式! (eg: 1.0.0)')
        rl.prompt()
        return
      }
      else {
        newVersion = input
      }
      const newPkg = JSON.stringify(Object.assign({}, pkg, { version: newVersion }), null, 2)
      fs.writeFileSync('package.json', `${newPkg}\n`, 'utf8')

      logger.success(`已更新 package.json 版本号为: ${newVersion}\n`, true)

      rl.close()
    })

    rl.on('close', resolve)
  })
}

async function updateChangeLog() {
  await updateVersion()

  logger.info('正在生成最新 changeLog...')

  const lastCommit = getLastCommit()
  const initialChangelogStr = fs.readFileSync('CHANGELOG.md', 'utf8')

  const data = initialChangelogStr.split('\n')

  new Promise((resolve) => {
    standardChangelog(
      {
        transform(commit, cb) {
          const committerInfo = getCommitterInfo(commit.hash)
          // 添加提交者信息
          commit.subject = commit.subject?.replace(/(.*?)\((#\w+)\)/, `$1@${committerInfo} $2`)
          commit.references = commit.references
            .filter((ref, index, self) => {
              // 去除重复的引用
              return self.findIndex(t => t.issue === ref.issue) === index
            })
            .map((ref) => {
              // 引用重定向到 JIRA
              if (JIRA_REG.test(ref.issue))
                ref.customUrl = 'https://moego.atlassian.net/browse'

              return ref
            })
          cb(null, commit)
        },
      },
      null,
      { from: lastCommit },
      {},
      {
        finalizeContext(context) {
          context.newLine = '\n'
          context.commitGroups = context.commitGroups.map((group) => {
            return {
              ...group,
              title: addTitlePrefix(group.title),
            }
          })
          return context
        },
        commitPartial: COMMIT_TEMPLATE,
        headerPartial: HEADER_TEMPLATE,
      },
    )
      .on('data', (chunk) => {
        let changeLogStr = chunk.toString().trim()
        changeLogStr = changeLogStr.replace(/\(([\d-]+)\)/g, '`$1`')

        data.unshift(`${changeLogStr}\n`)
      })
      .on('end', resolve)
  }).then(() => {
    const writeStream = fs.createWriteStream('CHANGELOG.md', 'utf8')
    writeStream.write(data.join('\n'))
    writeStream.end()

    logger.success('已生成最新 changeLog... 请打开 CHANGELOG.md 确认', true)
  })
}

updateChangeLog()
```

**模版文件**

`commit.hbs`

```hbs
* {{subject}}

{{~!-- commit link --}}
{{~#if @root.linkReferences}} ([{{shortHash}}](
  {{~#if @root.repository}}
    {{~#if @root.host}}
      {{~@root.host}}/
    {{~/if}}
    {{~#if @root.owner}}
      {{~@root.owner}}/
    {{~/if}}
    {{~@root.repository}}
  {{~else}}
    {{~@root.repoUrl}}
  {{~/if}}/
  {{~@root.commit}}/{{hash}}))
{{~else if hash}} {{hash}}{{~/if}}

{{~!-- commit references --}}
{{~#if references~}}
  , closes
  {{~#each references}} {{#if @root.linkReferences~}}
    [
    {{~this.repository}}#{{this.issue}}](
    {{~this.customUrl}}/{{this.issue}})
  {{~else}}
    {{~#if this.owner}}
      {{~this.owner}}/
    {{~/if}}
    {{~this.repository}}#{{this.issue}}
  {{~/if}}{{/each}}
{{~/if}}

```

`header.hbs`

```hbs
## {{repository}} {{version}}
{{newLine}}
  {{~#if title}} "{{title}}"
  {{~/if~}}
  {{~#if date}}({{date}})
  {{~/if~}}

```

## 自动创建PR同步仓库

```yml
name: Update B Repository # 工作流程的名称

on:
  push:
    branches:
      - docs-sync # test for now

jobs:
  update-b-repo: # 工作流程中的一个任务
    runs-on: ubuntu-latest # 任务运行的环境

    steps: # 任务中的步骤
      - name: Checkout A repository # 第一步：检出 A 仓库的代码
        uses: actions/checkout@v2

      - name: Set up Git # 第二步：设置 Git 用户信息
        run: |
          git config --global user.name 'winchesHe'
          git config --global user.email '329487092@qq.com'

      - name: Clone B repository # 第三步：克隆 B 仓库并创建一个新分支
        run: |
          git clone https://github.com/nextui-org/nextui B-repo --depth 1  # 替换为实际的 B 仓库路径

      - name: Make changes to B repository # 第四步：在 B 仓库中进行修改并提交更改
        run: |
          cd B-repo
          # 在这里添加你的命令来修改 B 仓库
          echo "Some changes" > some-file.txt
          git add .
          git commit -m "Update from A repository"

      - name: Create Pull Request # 第六步：创建一个 Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.PAT }}
          path: B-repo
          branch: update-branch
          title: Update from A repository
          body: This PR updates B repository with changes from A repository.
```

## 自动同步上游仓库

```yml
name: sync-fork
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch: { }
jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - run: gh repo sync $REPOSITORY -b $BRANCH_NAME
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          REPOSITORY: ${{ github.repository }}
          BRANCH_NAME: ${{ github.ref_name }}
```
