
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    templatecache = require('gulp-angular-templatecache');

module.exports = function buildHtmlPartials() {
  var gulp = global.gulp;
  // build the partials
  return gulp.src('./src/*/**/*.html')
    .pipe(templatecache({
      output: './temp/templates.js',
      strip: './src',
      prepend: './src',
      minify: {},
    }))
    .pipe(gulp.dest('./temp'));
};
