---
title: Webpack 與 VueCli
---

# 0820 Webpack 與 VueCli

## 建置工具
  將各式各樣的原始程式碼，轉換成在瀏覽器可執行的 `JavaScript`、`CSS`、`HTML` 程式。
  - ### 包含以下內容：
    - #### 程式轉換
      將 `TypeScript` 編譯成 `JavaScript`，將 `SCSS` 編譯成 `CSS` 等。
    - #### 檔案最佳化
      壓縮 `JavaScript`、`CSS`、`HTML` 程式，壓縮合併圖片 等。
    - #### 程式分割
      分割多個頁面的公共程式，分析首頁不需要執行部分的程式。
    - #### 模組合併
      在採用模組化的專案裡，會有很多個模組和檔案，需要透過建置功能將模組分類合併成一個檔案。
    - #### 自動更新
      監聽本機原始程式碼的變化，自動重新建置、更新瀏覽器。
    - #### 程式驗證
      在程式被傳送到倉庫前，需要驗證程式是否符合標準，以及單元測試是否通過。
    - #### 自動發佈
      更新程式後，自動建置出 線上發佈程式 並傳輸給發佈系統。

## Webpack
  [Webpack](https://webpack.js.org/)，是一個包裝模組化 `JavaScript` 的工具，在 `Webpack` 裡，一切檔案皆模組，透過 `Loader` 轉換檔案，透過 `Plugin` 植入鉤子，最後輸出由多個模組合成的檔案。
  ![0820_WebpackAndVueCli-1](/public/2023/0820_WebpackAndVueCli-1.png)
  它會從 `main.js` 出發，識別出原始程式中的模組化匯入敘述，遞迴地找出入口檔案的所有依賴，將入口和所有依賴包裝到一個單獨的檔案中。

  - ### 設定
    - #### Entry：設定模組的入口
      `Webpack` 執行建置的第一步將從入口開始，搜尋及遞迴解析出所有入口依賴的模組。

    - #### Output：設定如何輸出最後想要的程式
      設定輸出檔案的名稱、輸出檔案要儲存的本機目錄等。

    - #### Module：設定處理模組的規則
      設定 `Loader` 讀取和解析的規則。

    - #### Resolve：設定尋找模組的規則
      `Resolve` 設定 `Webpack` 如何尋找模組所對應的檔案。設定別名路徑。

    - #### Plugin：設定擴充外掛程式
      設定各種 `Plugin` 可以讓 `Webpack` 做任何與建置相關的事情。

    - #### DevServer：設定 DevServer
      設定熱加載 (原始碼變更時自動更新瀏覽器)、`DevServer` 預設根目錄、`Port`、`Https`

  - ### 基礎結構
    ```js
    const path = require('path');

    module.exports = {
      entry: './app/entry',
      outpur: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/assets/',
        chunkFilename: '[id].js'
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: [
              path.resolve(__dirname, 'app')
            ],
            exclude: [
              path.resolve(__dirname, 'app/demo-files')
            ],
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  ...
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new CommonsChunkPlugin({
          name: 'common',
          chunks: ['main'],
        })
      ],
      reslove: {
        modules: ['node_modules'],
        alias: {
          '@': 'src'
        }
      },
      devServer: {
        proxy: {
          '/api': 'http://localhost:3000',
        },
        https: false,
      }
    }
    ```

## Vue CLI
  - `Vue CLI` 是由 `Vue.js` 核心團隊所開發，用來提供開發者快速建置 `Vue.js` 專案並整合相關工具鍊的一套指令列 (`command-line`) 工具。它的特色是提供開發者在短短的幾分鐘時間內，即可快速建置一個立即可用的 Vue.js (含 2.x/3.x) 示範專案，這個專案同時也內建了 `Hot-Reload`、`ES Lint` 與 `dev-Server` 等功能。

  - `Vue CLI` 整合了 `webpack` 和 `webpack-dev-server`，讓開發者可以快速建置一套立即可用的開發環境，同時，也可以依開發者需要與其他 `Plugin` 整合。透過內部的 `vue-cli-service` 服務，可以直接透過 `serve`、`build` 等指令來啟動本機的開發環境、測試，或是專案的打包建置等。

    - package.json
      ```json
      {
        ...
        "scripts": {
          "serve": "vue-cli-service serve --mode local",
          "build": "vue-cli-service build --mode development",
          "build:dev": "vue-cli-service build --mode development",
          "build:uat": "vue-cli-service build --mode uat",
          "build:prod": "vue-cli-service build --mode production",
          "lint": "vue-cli-service lint --fix"
        },
        ...
      }
      ```

  - `Vue CLI` 建置專案後，預設結構如下
    ```sh
    ├── node_modules/          # node 相關的套件 (隱藏目錄)
    │
    ├── dist/                  # 用來存放打包後的檔案
    ├── public/                # 公開檔案目錄
    │   ├── favicon.ico
    │   └── index.html
    │
    ├── src/                   # 原始碼目錄，主要都在這裡進行開發
    │   ├── App.vue
    │   ├── assets/            # 靜態檔案的預設目錄
    │   ├── components/        # 元件檔案的預設目錄
    │   └── main.js            # Vue 專案的預設進入點
    │
    ├── babel.config.js        # babel 設定檔
    ├── README.md 
    └── package.json           # 專案、相依套件設定檔
    ```

  - ### vue-config-js 設定檔
    - 由於 `Vue CLI` 希望減少開發者的負擔，透過 `Vue CLI` 建立專案後就馬上可以投入開發，所以預設是採取 `零配置` 的設定策略。
    - 但是在實際開發時，偶爾我們還是會因應不同場景，會有需要調整設定的時候，像是要調整 `webpack` 的參數時，這個時候我們就必須自行建立 `vue.config.js` 檔案了。
    - `vue.config.js` 需要建立在整個專案的根目錄下，也就是這個位置：
      ```sh
      ├── node_modules/          # node 相關的套件 (隱藏目錄)
      ├── dist/                  # 用來存放打包後的檔案
      ├── public/                # 公開檔案目錄
      ├── src/                   # 原始碼目錄，主要都在這裡進行開發
      │
      ├── README.md 
      ├── vue.config.js          # vue.config.js 設定檔
      └── package.json           # 專案、相依套件設定檔
      ```

  - ### [相關參數](https://cli.vuejs.org/zh/config)

    ```js
    const UglifyJsPlugin = require("terser-webpack-plugin");

    const resolve = (dir) => path.join(__dirname, dir);

    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

    const path = require('path');
    const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
    const stringReplace = require('./stringReplace.json');

    const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
    const IS_UAT = ['uat', 'ut'].includes(process.env.NODE_ENV);

    module.exports = {
      publicPath: process.env.PUBLIC_PATH !== undefined ? process.env.PUBLIC_PATH : '/',
      lintOnSave: true,
      runtimeCompiler: true,
      chainWebpack: config => {
        config.resolve.alias
          .set('@', resolve('src'))
          .set('@assets', resolve('src/assets'))
          .set('@imges', resolve('src/assets/images'))
          .set('@compononts', resolve('src/components'))
          .set('@shared', resolve('src/components/shared'))
          .set('@less', resolve('src/assets/less'))
          .set('@scss', resolve('src/assets/scss'));
      },
      configureWebpack: config => {
        // enable source-map
        config.devtool = 'source-map';

        config.output.filename = 'js/[name].[hash:8].js';
        config.output.chunkFilename = 'js/[name].[hash:8].js';

        const plugins = [];

        // ---------------- 調整包版記憶體 釋放 ---------------- //
        const existingForkTsChecker = config.plugins.filter(
          (p) => p instanceof ForkTsCheckerWebpackPlugin,
        )[0];

        config.plugins = config.plugins.filter(
          (p) => !(p instanceof ForkTsCheckerWebpackPlugin),
        );

        const forkTsCheckerOptions = existingForkTsChecker.options;
        forkTsCheckerOptions.workers = 4;
        forkTsCheckerOptions.memoryLimit = 8192;

        plugins.push(new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions));

        // ---------------- 文字替代 ---------------- //
        if (IS_PROD || IS_UAT) {
          plugins.push(new ReplaceInFileWebpackPlugin([
            {
              dir: 'dist/js',
              test: [/\.js$/, /\.js\.map$/],
              rules: [
                // 套用 stringReplace.json 裡面的 替換列表
                ...stringReplace.options.map((i) => ({
                  search: new RegExp(i.search, 'ig'),
                  replace: i.replace,
                })),
      
                // ----- 若想使用 全局替代的話 可以改用以下語法 ------ //
                // // 針對 版本號 替換
                // {
                //   search: /(\w+)@((\d\.)+\d)/ig,
                //   replace: '$1_$2',
                // },
                // // 針對 Email 替換
                // {
                //   search: /(\w+)@(([\da-z.-]+)\.com)/ig,
                //   replace: '$1_$2',
                // },
              ],
            },
          ]));
        }

        // ---------------- uglify ---------------- //
        if (IS_PROD || IS_UAT) {
          plugins.push(
            new UglifyJsPlugin({
              terserOptions: {
                warnings: true,
                output: {
                  comments: false,
                  beautify: false,
                },
                compress: {
                  drop_console: true,
                  drop_debugger: true,
                }
              },
              parallel: true
            })
          );
        }

        config.plugins = [...config.plugins, ...plugins];
      },
      css: {
        loaderOptions: {
          less: {
            lessOptions: {
              modifyVars: {
                'border-radius-base': '0px',
              },
              javascriptEnabled: true
            }
          },
        }
      }
    }
    ```

  - `configureWebpack` 與 `chainWebpack` 的作用相同，唯一的區別就是他們修改webpack配置方式不同。

  - `configureWebpack`
    - Type: Object | Function
    - 通過 `webpack-merge` 合併到最終的配置中。
  
  - `chainWebpack`
    - Type: Function
    - 通過 `webpack-chain` 鏈式編程的形式來修改默認的 `webpack` 配置。

  - ### 審查 最終 Webpack 配置
    - #### 將其輸出重定向到一個文件以便進行查閱
      ```sh
      vue inspect > output.js
      ```

    - #### 指定一個路徑來審查配置的一小部分
      ```sh
      vue inspect module.rules.0
      ```

    - #### 指向一個規則或插件的名字
      ```sh
      vue inspect --rule vue
      vue inspect --plugin html
      ```

    - #### 列出所有規則和插件的名字
      ```sh
      vue inspect --rules
      vue inspect --plugins
      ```