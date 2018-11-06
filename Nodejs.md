 - # [Node](http://www.imooc.com/learn/348)
---
# [npm](https://juejin.im/post/5ab3f77df265da2392364341)
## 安装
 - 本地安装
    - 将安装包放在 ./node_modules 下（运行npm时所在的目录）
    - 可以通过 require() 来引入本地安装的包
    - npm install xxx 安装xxx模块到当前目录，但不记录到package.json里。
    - npm install --save xxx 安装xxx模块，并且记录到package.json里，字段对应的dependency，是产品环境必须依赖的模块
    - npm install xxx --save-dev把你的安装包信息写入package.json文件的dev-Dependencies字段中
 - 全局安装
    - npm install --global xxx全局安装xxx模块，但不记录到package.json里，如果模块里package.json有bin配置，会自动链接，作为cli命令
    - 全局安装可以直接在命令行里使用
    - npm root -g  查看全局安装目录
    - npm list -g --depth 0 查看全局安装的包
    - 
- npm uninstall  删除包 
- npm install   下载package.json记录的包
## npm 命令 
 - npm init 初始化创建一个包
 - npm init -y 初始化创建一个默认的包
 - npm run xxx  启动npm脚本 （package.json的script）
 - 关于速度慢
    - 方案1:
        - npm install -g ppt-cli --registry=https://registry.npm.taobao.org
    - 方案2：nrm 一个快速切换源版本的工具
        - npm install -g nrm
        - nrm ls
        - nrm use taobao
# 系统模块
### http模块
创建服务
```
http.createServer(function(req,res){
	var obj=urlLib.parse(req.url)
	res.end()
}).listen(8080)
```
### fs模块
读写文件
- fs.readFile('fileName','callback(err,data){}')
    - 读文件
- fs.writeFile('fileName','content','callback(err,dara){}')
    - 写或创建文件

### url模块
解析url 主要解析get数据
- url.pathname 获取及设置URL的路径(path)部分
- url.parse(req.url,true)
### querystring模块
主要解析post数据
### path模块
主要用于处理文件与目录的路径

# 自定义模块
### 引入
> var mod=quirequi=('mod')
> 注意：如果不在module_nodes文件下的模块需要加——'./' 如 var mod=quirequi=('./mod')
### 输出
> exports.xxx=??  	exports.yyy=??
>
> module.exports={xxx:??,yyy:??}


# 调试
断点调试：断点调试：node debugger 或node inspector 或vscode
[package.json中文文档](https://github.com/ericdum/mujiang.info/issues/6/)

# [Express](http://www.expressjs.com.cn/)

#### 安装应用生成器
```
npm install express-generator -g
npm install express-generator --save-dev ———— 一般安装在本地项目中，方便在开发机环境使用
```
#### 创建应用
```
express myapp //在当前目录下创建一个名为myapp的工程文件
cd myapp  //进入文件夹
npm install  //安装所有依赖包
npm start   //打开服务

```
### 创建基本服务三步
```javascript
const express=require('express')
//1.创建服务
var server=express()
//2.处理请求 
server.use('/b.html',function(req,res){
    res.send('BBB')
    res.end()
})
//3.监听端口
server.listen(8080)
```
- 请求req
    - req.params.xx //读取url返回：后面的xx参数
    - req.path   //读取url返回/后面的url
    - req.query  //读取？后面的参数
- 响应res
    - s