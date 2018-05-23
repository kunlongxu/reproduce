const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
var Jarvis = require("webpack-jarvis");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const StylablePlugin = require("stylable-integration/webpack-plugin");
module.exports = {
  devtool: "eval-source-map",
  entry: ["./src/ts/index.tsx"],
  output: {
    path: path.join(__dirname, "tmp"),
    filename: "[name].js?[hash]",
    chunkFilename: "[name].[id].js?[hash]",
    publicPath: ""
  },
  resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
              // { loader: "cache-loader" },
              // {
              //   loader: "thread-loader",
              //   options: {
              //     // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              //     workers: require("os").cpus().length - 1
              //   }
              // },
              // { loader: "react-hot-loader/webpack" },
              {
                loader: "ts-loader",
                options: {
                  // transpileOnly: true,
                  happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                  getCustomTransformers: () => ({
                    before: [
                      tsImportPluginFactory({
                        style: true
                      })
                    ]
                  }),
                  compilerOptions: {
                    module: "esnext"
                  }
                }
              }
            ]
          },
          {
            test: /\.less$/,
            oneOf: [
              {
                use: [
                  {
                    loader: "style-loader"
                  },
                  {
                    loader: "css-loader",
                    options: {
                      sourceMap: true
                    }
                  },
                  {
                    loader: "less-loader",
                    options: {
                      javascriptEnabled: true,
                      // modifyVars: theme,
                      sourceMap: true
                    }
                  }
                ]
              }
            ]
          },

          {
            test: /(?!\.st)\.css$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          StylablePlugin.rule(),
          {
            test: /\.(jpe?g|png|gif)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  hash: "sha512",
                  digest: "hex",
                  name: "[hash].[ext]"
                }
              },
              {
                loader: "image-webpack-loader",
                options: {
                  query: {
                    mozjpeg: {
                      progressive: true
                    },
                    gifsicle: {
                      interlaced: false
                    },
                    optipng: {
                      optimizationLevel: 4
                    },
                    pngquant: {
                      quality: "75-90",
                      speed: 3
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new StylablePlugin({
      injectBundleCss: true /* dev mode */,
      nsDelimiter: "_ss_"
    }),
    // new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html", // Load a custom template
      inject: "body", // Inject all scripts into the body
      title: "新浪INF",
      // favicon: "./settings/favicon.ico",
      filename: "index.html"
    }),
    new webpack.NamedModulesPlugin()
    // new webpack.HotModuleReplacementPlugin()
  ]
};
