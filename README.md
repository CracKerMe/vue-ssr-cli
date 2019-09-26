# vue-ssr-cli
custom vue-ssr-cli for starter,i hope to receive your advice with this ssr initiation repository
面向 Vue-ssr 新手以及不太熟悉的开发者的一款脚手架, 最终将包含 vuex/router/axios/scss/reset.css 等实现,代码可以通过 commit 切换查看不同阶段的代码实现过程.期待来自您的[issues](https://github.com/CracKerMe/vue-ssr-cli/issues)


### How to get this
```
git clone git@github.com:CracKerMe/vue-ssr-cli.git
```

### How to preview
```
cd vue-ssr-cli && npm i
npm run dev
```

### How to publish
```
npm run build
npm start
```




### Step by step:
1. 安装基本依赖, 编写`server.js` 读取`index.template.html` 渲染简单ssr
  node 安装命令如下
  
  ```
  npm i express vue vue-server-renderer -S
```
  
2. 配置` Webpack` && `Babel` && `vue-loader` && `router`

  node 安装命令如下
  ```
  npm i webpack@4 webpack-cli webpack-dev-middleware webpack-hot-middleware webpack-merge webpack-node-externals -S-D
  npm i chokidar cross-env friendly-errors-webpack-plugin memory-fs rimraf vue-loader -S-D
  npm i babel-core@6.26.3 babel-loader@7.1.4 babel-plugin-syntax-dynamic-import babel-preset-env babel-preset-react babel-preset-stage-0 babel-plugin-transform-runtime -S
  npm i vuex vue-router vue-template-compiler vuex-router-sync axios -S
  ```

3. 配置 vuex/store 以及scss-loader
  node 安装命令如下
  ```
  npm i css-loader node-sass sass-loader style-loader optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin mini-css-extract-plugin -S-D
  ```

4. 配置缓存以及meta-seo
  node 安装命令如下
  ```
  npm i lru-cache vue-meta-info -S-D
  ```