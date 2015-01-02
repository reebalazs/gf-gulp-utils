
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    _ = require('lodash'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css'),
    util = require('util');

module.exports = function buildCss() {
  return gulp.src('./src/*.less')
    .pipe($.sourcemaps.init())
      .pipe($.less({
        compress: true,
        paths: [path.join(__dirname, 'src')]
      })).on('error', util.log)
      .pipe($.autoprefixer('last 10 versions', 'ie 9'))
      .pipe(minifyCSS({keepBreaks: false}))
      .pipe($.header(_.template(global.banner)()))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/static/'))
    .pipe(global.reload());
};
