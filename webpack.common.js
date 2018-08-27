const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
    new HtmlWebpackPlugin({
      title: "demo",
      template: "./src/index.html",
      inject: true
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
