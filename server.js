const fs = require('fs')
const path = require('path')
const express = require('express')
const LRU = require("lru-cache")

const { createBundleRenderer } = require('vue-server-renderer')
const devServer = require('./build/setup-dev-server')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const app = express()

const microCache = new LRU({
  max: 100,
  maxAge: 1000 // 重要提示：条目在 1 秒后过期。
});
const isCacheable = req => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定(non-user-specific)页面才会缓存
  return true;
};

const serve = (path, cache) =>
  express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 : 0
  })
app.use('/dist', serve('./dist', true))
app.use('/public', express.static('public'))
function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      basedir: resolve('./dist'),
      runInNewContext: false
    })
  )
}

function render(req, res) {
  const cacheable = isCacheable(req);
  if (cacheable) {
    const hit = microCache.get(req.url);
    if (hit) {
      console.log("Response from cache");
      return res.end(hit);
    }
  }

  const startTime = Date.now()
  res.setHeader('Content-Type', 'text/html')

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      res.status(500).send('500 | Internal Server Error~')
      console.log(err)
    }
  }

  const context = {
    title: 'SSR 测试', // default title
    url: req.url,
    render: {
      mata: function() {},
      link: function() {}
    }
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (cacheable) {
      microCache.set(req.url, html);
    }
    if (!isProd) {
      console.log(`whole request: ${Date.now() - startTime}ms`)
    }
  })
}

let renderer
let readyPromise
const templatePath = resolve('./src/index.template.html')

if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json') // 将js文件注入到页面中
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = devServer(app, templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

app.get(
  '*',
  isProd
    ? render
    : (req, res) => {
        readyPromise.then(() => render(req, res))
      }
)

const port = process.env.PORT || 9527
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
