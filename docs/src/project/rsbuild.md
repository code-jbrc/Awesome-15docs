---
title: rsbuild
---

## Rsbuild 使用 HTTP2

官网开启 https 后，默认使用 http2 协议，https://rsbuild.dev/config/server/https

但是目前还不支持 http2 的 proxy，所以还需要手动实现 http2-proxy 的代理

升级步骤

1. 安装 `@rsbuild/plugin-basic-ssl` 插件，自动配置 https 证书和开启 https
2. 安装 `http2-proxy` 库，实现 http2 的代理
3. 修改 `rsbuild.config.ts` 配置，添加 http2-proxy 的代理中间件

```ts
// http2-proxy.ts
import { IncomingMessage } from 'node:http'
import * as Http2 from 'node:http2'
import proxy from 'http2-proxy'

type http2WebOptions = Parameters<typeof proxy.web>[2]

function error(message: string): never {
  throw new Error(message)
}

export function createHttp2ProxyMiddlewares(options: {
  [regexp: string]: {
    target: string
    rewrite?: (url: string) => string
    secure?: boolean
    onReq?: http2WebOptions['onReq']
    onRes?: (req: Http2.Http2ServerRequest, res: Http2.Http2ServerResponse, proxyRes: IncomingMessage) => void
  }
}) {
  const middlewares: ((req: Http2.Http2ServerRequest, res: Http2.Http2ServerResponse, next: () => void) => void)[] = []

  for (const [regexp, { target, rewrite, secure = false, onReq, onRes }] of Object.entries(options)) {
    const re = new RegExp(regexp)
    const tu = new URL(target)

    if (!tu.pathname.endsWith('/'))
      tu.pathname += '/'

    const protocol = /^https?:$/.test(tu.protocol)
      ? (tu.protocol.slice(0, -1) as 'https' | 'http')
      : error(`Invalid protocol: ${tu.href}`)

    const port
      = tu.port === ''
        ? { https: 443, http: 80 }[protocol]
        : /^\d+$/.test(tu.port)
          ? Number(tu.port)
          : error(`Invalid port: ${tu.href}`)

    middlewares.push((req, res, next) => {
      if (req.url && re.test(req.url)) {
        const url = (rewrite?.(req.url) ?? req.url).replace(/^\/+/, '')
        const { pathname, search } = new URL(url, tu)
        // @ts-expect-error req type mismatch
        proxy.web(req, res, {
          protocol,
          port,
          hostname: tu.hostname,
          path: pathname + search,
          onReq: onReq as any,
          onRes: onRes as any,
          rejectUnauthorized: secure, // 是否验证服务器的 TLS 证书
        })
      }
      else {
        next()
      }
    })
  }

  return middlewares
}

// 实现change origin效果
export async function proxyOnRes(req: Http2.Http2ServerRequest,
  res: Http2.Http2ServerResponse,
  proxyRes: IncomingMessage) {
  const reqHost = (req.headers.host || req.headers[':authority'] || '') as string
  const host = reqHost.replace(/:\d+$/, '')
  res.setHeader('x-powered-by', 'http2-proxy')
  if (host && proxyRes.headers['set-cookie']?.length) {
    res.setHeader(
      'set-cookie',
      proxyRes.headers['set-cookie']!.map((s) => {
        return s.replace(/;\s*domain=.*?(?=;|$)/gi, `; Domain=${host}`).replace(/;\s*secure\s*(?=;|$)/gi, '')
      }),
    )
    delete proxyRes.headers['set-cookie']
  }

  res.writeHead(proxyRes.statusCode || 200, proxyRes.headers)

  proxyRes.pipe(res)
}
```

```ts
// rsbuild.config.ts
const config = {
  dev: {
    setupMiddlewares: [
      (middleware) => {
        // @ts-expect-error type mismatch
        middleware.unshift(...proxyMiddlewares)
      },
    ]
  }
}
```
