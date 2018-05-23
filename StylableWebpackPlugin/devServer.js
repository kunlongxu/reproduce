const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
let config = require("./webpack.config.dev");
let config2 = require("./webpack.config.dev2");
let config3 = require("./webpack.config.dev3");
const port = process.env.npm_package_config_prot || 5000;
const host = process.env.npm_package_config_host || "localhost";
new WebpackDevServer(webpack(config3), {
  public: config.output.publicPath,
  hot: true,
  historyApiFallback: {
    disableDotRule: true
  },
  stats: {
    colors: true,
    chunks: false,
    "errors-only": true
  }
}).listen(port, host, function(err, result) {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at http://${host}:${port}`);
});
