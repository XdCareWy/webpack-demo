# Introduction
这个demo主要记录在学习webpack_v3.4.1的文档时的内容。包含了如何使用webpack构建前端项目。
# Step
1. ```git clone git@github.com:XdCareWy/webpack-demo.git```
2. ```npm install```
3. 开发打包：```./node_modules/.bin/webpack ./tree-shaking/main.js ./tree-shaking/main.bundle.js```
4. 上线打包：```./node_modules/.bin/webpack --optimize-minimize ./tree-shaking/main.js ./tree-shaking/main.bundle.js```
5. 在浏览器中打开index.html

# Note
这个分支主要介绍了webpack里面的tree shaking。主要查看打包后的文件中哪些被打包了，哪些被exports了。

- 在打包的时候将webpack.config.js去除掉


# FQA
这个学习过程是看webpack官方文档一步一步学习的，有问题可以一起交流。
[这个分支的官方文档](https://webpack.js.org/guides/tree-shaking/)

# License
MIT