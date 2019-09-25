const Server = require('express')()
const Vue = require('vue')
const Fs = require('fs')

const Renderer = require('vue-server-renderer').createRenderer({
  template: Fs.readFileSync('./src/index.template.html', 'utf-8')
})

Server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      name: 'vue ssr app~',
      url: req.url
    },
    template:'<div>hello from {{name}}, and url is: {{url}}</div>'
  })
  const context = {
    title: 'SSR test#'
  }
  Renderer.renderToString(app, context, (err, html) => {
    if(err) {
      console.log(err)
      res.status(500).end('server error')
    }
    res.end(html)
  })
})
Server.listen(9527)
console.log('running at: http://localhost:9527')
