
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var $ = require('gulp-load-plugins')();

module.exports = function buildFonts() {
  // just copy the manually prepared font css, for now.
  return global.gulp.src('./src/fonts/*.css')
    .pipe(global.gulp.dest('./dist/static/fonts/'))
    .pipe(global.reload());
};
