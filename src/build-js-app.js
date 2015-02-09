
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var plugin = require('gulp-load-plugins')(),
    _ = require('lodash'),
    browserify = require('browserify'),
    transform = require('vinyl-transform');

module.exports = function buildJsApp() {
  var gulp = global.gulp;
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  return gulp.src('src/index.js')
    .pipe(plugin.sourcemaps.init())
      .pipe(browserified)
      .pipe(plugin.removeUseStrict())
      .pipe(plugin.uglify())
      .pipe(plugin.header(_.template(global.banner)()))
    .pipe(plugin.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/static/'))
    .pipe(global.reload());
};
