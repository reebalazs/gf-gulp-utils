
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')();

module.exports = function lint() {
  return gulp.src('src/**/*.js')
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter(require('jshint-stylish')));
};
