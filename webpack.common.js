const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    polyfills: "./src/polyfills.ts",
    vendor: "./src/vendor.ts",
    app: "./src/main.ts"
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)esm5/,
      "./src",
      {}
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "vendor", "polyfills"]
    }),

    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /dist/],
        enforce: 'pre',
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: "./tsconfig.json"
            }
          },
          "angular2-template-loader",
          'tslint-loader'
        ]
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/, /dist/],
        use: "html-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: "file-loader?name=assets/[name].[hash].[ext]"
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /dist/, /src\/app/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("precss"), require("autoprefixer")]
              }
            },
            "sass-loader"
          ]
        })
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src', 'app'),
        loader: 'raw-loader'
      }
    ]
  }
};
