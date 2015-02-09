
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var $ = require('gulp-load-plugins')(),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    browserSync = require('browser-sync'),
    historyApiFallback = require('connect-history-api-fallback'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');


function browserSyncReload() {
  return browserSync.reload({stream: true});
}

module.exports = function dev() {
  var gulp = global.gulp;
  // start live reload
  browserSync({
    server: {
      baseDir: './dist',
      // serve as html5 single page
      middleware: historyApiFallback
    },
    open: false,
    ghostMode: {
      clicks: true,
      location: true,
      forms: true,
      scroll: true,
    },
    xip: false,
    minify: false,
  });
  // switch hook to start using it from all tasks
  global.reload = browserSyncReload;

  var args = watchify.args;
  //args.extensions = ['.js']
  var bundler = watchify(browserify('./src/index.js', args));

  function rebundle() {
    gutil.log(gutil.colors.green('Rebundling JS...'));
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log('Browserify Error ' + err);
      })
      .pipe(source('index.js'))
        // XXX source maps do not work here.
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/static/'))
      .pipe(global.reload());
  }

  bundler.on('update', rebundle);
  rebundle();

  // build html
  watch([
    'src/*/**/*.html',
  ], function (files) {
    return runSequence.use(global.gulp)('build-html-partials');
  });
  watch([
    'src/*.html', 
    'src/inline/*.js', 
  ], function (files) {
    // ... manual reload, because we changed the same file
    return runSequence.use(global.gulp)('build-html-pages', 'reload');
  });
  watch([
    'src/*.less',
  ], function (files, cb) {
    return runSequence.use(global.gulp)('build-css');
  });
  watch([
    'dist/static/index.css',
  ], function (files, cb) {
    return runSequence.use(global.gulp)('build-css-critical', 'build-html-pages');
  });
  // reinstalls
  watch('bower.json', function (files) {
    return gulp.start('install');
  });
};
