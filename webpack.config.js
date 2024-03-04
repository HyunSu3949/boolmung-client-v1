const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const prod = process.env.NODE_ENV === "production";

const plugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
  new MiniCssExtractPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      { from: "./src/assets/img", to: "./img" },
      { from: "./src/assets/models", to: "./models" },
      { from: "./src/assets/sound", to: "./sound" },
    ],
  }),
  new Dotenv(),
];

if (prod) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: "bundle-report.json",
    }),
  );
}
module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src/"),
    },
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|glb|gltf|svg)$/i,
        loader: "file-loader",
        options: {
          publicPath: "./",
          name: "[name].[ext]",
        },
      },
    ],
  },
  devtool: prod ? undefined : "source-map",
  plugins,
};
