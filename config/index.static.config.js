var webpack = require('webpack');
var entryPoint  = __dirname + '/../lib/build/index-static.jsx';

/**
 * Webpack config for generating static pages.
 */
module.exports = {
  entry: entryPoint,
  target: 'node',
  devtool: 'sourcemap',
  externals: function(context, request, callback) {
    if (request[0] == '.' || request == entryPoint) {
      // It's either our entry point or a relative module, so include
      // it in the bundle.
      callback();
    } else {
      // It's a non-relative module, so load it via require().
      callback(null, 'commonjs ' + request);
    }
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel', query: { presets: ['es2015', 'react'] }},
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })
  ],
  output: {
    library: 'true',
    libraryTarget: 'commonjs2',
    path: __dirname + '/../build/index-static',
    filename: 'index-static.bundle.js'
  }
};
