
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var del = require('del');

module.exports = function clean(cb) {
  del([
    'temp/**/*',
    'dist/**/*',
  ], cb);
};
