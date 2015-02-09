
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var plugin = require('gulp-load-plugins')();

module.exports = function buildHtmlPages() {
  var gulp = global.gulp;
  // copy the main htmls, resolving templates
  var inlineJs = gulp.src(['./src/inline/*.js'])
    .pipe(plugin.concat('inline.js'))
    .pipe(plugin.uglify())
    .pipe(gulp.dest('./temp'));
  var inlineCss = gulp.src(['./dist/static/critical.css'])
    .pipe(gulp.dest('./temp'));
  return gulp.src('./src/*.html')
    .pipe(plugin.inject(inlineJs, {
      starttag: '<!-- inject:inline-js -->',
      endtag: '<!-- endinject -->',
      transform: function (filePath, file) {
        // return file contents as an inline script
        return '<script>' + file.contents.toString('utf8') + '</script>';
      }
    }))
    .pipe(plugin.inject(inlineCss, {
      starttag: '<!-- inject:inline-css -->',
      endtag: '<!-- endinject -->',
      transform: function (filePath, file) {
        // return file contents as an inline stylesheet
        return '<style rel="stylesheet">' + file.contents.toString('utf8') + '</style>';
      }
    }))
    .pipe(gulp.dest('./dist/'));
};
