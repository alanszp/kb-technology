module.exports = function(config) {
  'use strict';

  var common = require('./karma.common.js');
  common.logLevel = config.LOG_INFO;
  config.set(common);
};