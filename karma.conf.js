const isDocker = require('is-docker')();
var webpackConfig = require('./webpack.test.js');

module.exports = config => config.set({
  customLaunchers: {
    ChromeCustom: {
      base: 'ChromeHeadless',
      // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
      // more permissions than Docker allows by default)
      flags: isDocker ? ['--no-sandbox'] : []
    }
  },


  basePath: '',

    frameworks: ['jasmine'],

    files: [
      {pattern: './karma-test-shim.js', watched: true}
    ],

    preprocessors: {
      './karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['kjhtml', 'dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false

});


