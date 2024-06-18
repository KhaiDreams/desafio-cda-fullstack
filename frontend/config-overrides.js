const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    buffer: require.resolve("buffer/"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    util: require.resolve("util/"),
    vm: require.resolve("vm-browserify"),
  };
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ]);
  return config;
};
