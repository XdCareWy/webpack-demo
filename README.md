# Introduction
这个demo主要记录在学习webpack_v3.4.1的文档时的内容。包含了如何使用webpack构建前端项目。
# Step
1. ```git clone git@github.com:XdCareWy/webpack-demo.git```
2. ```npm install```
3. ```npm run build```
4. 在浏览器中打开index.html

# Note
1. webpack2.x以上的版本支持部分ES6的语法，可以在webpack.config.js文件中使用如const、let
2. webpack2.x以上的版本与webpack1.x的版本中的loader的配置写法有区别
3. 在module中主要的添加了以下几个loader
* css的loader, style-loader、css-loader
* image的loader, file-loader
* 数据文件(csv、tsv、xml)loader, csv-loader、xml-loader
* JSON数据文件不需要额外的使用loader, webpack已经内置了

# FQA
这个学习过程是看webpack官方文档一步一步学习的，有问题可以一起交流。
[这个分支的官方文档](https://webpack.js.org/guides/asset-management/)

# License
MIT