# [webpack](https://segmentfault.com/a/1190000006178770#articleHeader2)
- npm脚本（package.json的script）可以直接设置./node_modules/.bin/webpack 快速启动webpack
    - 快捷键直接些webpack也可以
### webpack.config.js配置
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
-  
- module.exports=xxx在本地导出对象，让外部目录var xxx=require('./xxx')引入
    - import xxx from './xxx'   也可以这样引入
- exports{xxx}是es6的写法 需要import {carousel} from './xxx' 引入 
- 