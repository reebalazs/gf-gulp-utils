/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var plugin = require('gulp-load-plugins')();

module.exports = function bower() {
  return plugin.bower()
    .pipe(global.gulp.dest('dist/static/'));
};
