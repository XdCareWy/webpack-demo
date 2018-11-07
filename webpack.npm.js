const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const node_modules = path.resolve(__dirname, "node_modules");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./src/inputTag.js"
  },
  output: {
    filename: "[name].[hash:8].bundle.js",
    path: path.resolve("dist"),
    libraryTarget: "umd",
    library: 'inputTag',
    libraryExport: 'default',
    globalObject: "this"
  },
  devtool: "#source-map",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              modifyVars: {
                "primary-color": "#ff0000",
                "link-color": "#1DA57A",
                "border-radius-base": "0px"
              },
              javascriptEnabled: true
            }
          }
        ]
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
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: "demo",
      template: "./src/index.html",
      inject: true
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
