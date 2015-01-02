
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    critical = require('critical');

module.exports = function buildCssCritical(cb) {
  gulp.src(['dist/static/index.css'])
    .pipe($.rename({
      basename: 'critical'
    }))
    .pipe(gulp.dest('dist/static/'))
    .on('end', function() {
      critical.generate({
          base: 'dist/static/',
          src: 'index.html',
          dest: '../../temp/critical.css',
          width: 320,
          height: 480,
          minify: true
      }, function(err, output) {
        cb();
      });
    });
};
