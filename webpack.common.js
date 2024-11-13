// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line no-undef
const CopyWebpackPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line no-undef
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line no-undef
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// eslint-disable-next-line no-undef
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
// eslint-disable-next-line no-undef
const ImageminMozjpeg = require('imagemin-mozjpeg');
// eslint-disable-next-line no-undef
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// eslint-disable-next-line no-undef
module.exports = {
  entry: {
    // eslint-disable-next-line no-undef
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          }
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      // eslint-disable-next-line no-undef
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // eslint-disable-next-line no-undef
          from: path.resolve(__dirname, 'src/public/'),
          // eslint-disable-next-line no-undef
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'therestaurantdb-api',
          },
        },
        {
          // Menangani semua request gambar
          urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/images\/.*$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'therestaurantdb-image-api',
            expiration: {
              maxEntries: 50, // Batasan cache
              maxAgeSeconds: 30 * 24 * 60 * 60, // Cache gambar selama 30 hari
            },
          },
        },
      ],
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: true,
    }),
  ],
};
