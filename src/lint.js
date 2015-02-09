
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var plugin = require('gulp-load-plugins')();

module.exports = function lint() {
  return global.gulp.src('src/**/*.js')
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter(require('jshint-stylish')));
};
