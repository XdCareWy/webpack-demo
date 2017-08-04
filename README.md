# Introduction
这个demo主要记录在学习webpack_v3.4.1的文档时的内容。包含了如何使用webpack构建前端项目。
# Step
1. ```git clone git@github.com:XdCareWy/webpack-demo.git```
2. ```npm install```
3. ```npm run build```
4. 在浏览器中打开index.html

# Note
这个分支主要介绍了使用HMR
1. 使用过程中会出现一个问题，当你更新print.js的时候，点击按钮出来的结果不是更新后的值。
[Gotchas](https://webpack.js.org/guides/hot-module-replacement/#gotchas)
2. 添加style.css并添加处理css的loader，HMR将会热更新css模块
3. 在index.js里最后一段代码，不写也是可以的，但是还没理解教程里为什么要写这段。

# FQA
这个学习过程是看webpack官方文档一步一步学习的，有问题可以一起交流。
[这个分支的官方文档](https://webpack.js.org/guides/output-management/)

# License
MIT