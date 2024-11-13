// eslint-disable-next-line no-undef
const { merge } = require('webpack-merge');
// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const common = require('./webpack.common');

// eslint-disable-next-line no-undef
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // eslint-disable-next-line no-undef
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    open: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
