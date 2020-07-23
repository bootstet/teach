## 本地开发
1. `npm run install` 安装依赖
2. 运行`npm run start` 启动webpack编译，项目会自动打开`127.0.0.1:9001`进行开发
3. 本地开发使用devtool，使用'source-map'进行联调，详细说明用法参照官网`https://webpack.docschina.org/configuration/devtool/`。
  
## eslint 
1. 在commit之前，pre-commit钩子中，自动启动eslint对代码进行校验
  ```js
  // package.json
    "lint-staged": {
      "*.js": [
        "eslint",
        "git add"
      ]
    }
  ```
2. 如果想要在eslint之后自动格式化代码，需将package.json中的lint-staged中eslint 改为 eslint --fix
3. 代码风格使用 standard风格

## 上线打包
1 运行`npm run build`打包上线