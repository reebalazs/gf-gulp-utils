
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var packageInfo = require('../package.json'),
    _ = require('lodash'),
    util = require('gulp-util'),
    sequence = require('./sequence');

module.exports = function setup(options) {
  if (options.gulp === undefined) {
    throw new Error('gf-gulp-utils require gulp to be defined in options.');
  }
  options = _.assign({
    // use gf-gulp-utils as default.
    packageName: packageInfo.name
  }, options);
  global.gulp = options.gulp;
  // To be used from streams, only does reload when we are in watch.
  global.reload = util.noop;
  // Use packageName if defined, in the banner.
  global.banner =  '/*\n * ' + options.packageName + ' generated resources \n*/\n';
  // set up gulp tasks
  _.each(this.tasks, function(values, name) {
    // Make a single value into an array
    if (typeof values !== 'object') {
      values = [values];
    }
    // Register each handler as an inside task.
    values = _.map(values, function(value, index) {
      if (typeof value !== 'function') {
        return value;
      } else {
        // register the value under an implicit task
        var implicitTaskName = '_' + name + '_' + index;
        options.gulp.task(implicitTaskName, value);
        return implicitTaskName;
      }
    });
    // register the values as a sequence
    options.gulp.task(name, sequence(values));
  });
};
