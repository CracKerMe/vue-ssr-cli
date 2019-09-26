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


### 项目截图
![首页](https://github.com/CracKerMe/demos/blob/master/ssr-picture1.png?raw=true)
![歌手页面](https://github.com/CracKerMe/demos/blob/master/ssr-picture2.png?raw=true)


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

### 切换 commit 查看实现步骤

**git reset --hard 下面的log值**

| commit log                               |            描述            |
| ---------------------------------------- | :------------------------: |
| 4aa0cb77ca7931c81bc092d4b1d47231fd6238be |      简单可运行的ssr       |
| 5dd758257664d7ea88da7aa9b4b8816203daf56a | 配置好Babel webpack router |
| 91fef3d171a79d56bec7d9d31c2b61ca229fc1e8 |      页面打通可以开发      |
| 3a065064a4a04a6a0db4b9f3021380cd5f6c1108 |   添加 lru缓存 meta-vue    |
| f4188621541c1f1778815dbfb5dbcca263f813b5 |       各功能提取封装       |

