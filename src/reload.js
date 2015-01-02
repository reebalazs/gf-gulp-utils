
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var browserSync = require('browser-sync');

module.exports = function reload(cb) {
  browserSync.reload();
  cb();
};
