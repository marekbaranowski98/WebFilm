const {resolve} = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "static")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css"
      })
  ]
};
