/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')();

module.exports = function bower() {
  return plugin.bower()
    .pipe(gulp.dest('dist/static/'));
};
