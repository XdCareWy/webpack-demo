const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const node_modules = path.resolve(__dirname, "node_modules");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].[hash:8].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },
  module: {
    noParse: path.resolve(node_modules, "*/**/*.min.js"),
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|vendor)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader" },
            {
              loader: "less-loader",
              options: {
                modifyVars: {
                  "primary-color": "#ff0000",
                  "link-color": "#1DA57A",
                  "border-radius-base": "2px"
                },
                javascriptEnabled: true
              }
            }
          ]
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "demo",
      template: "./src/index.html",
      inject: true
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      allChunks: true
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
