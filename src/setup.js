
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var _ = require('lodash'),
    gulp = require('gulp');

module.exports = function setup() {
  _.each(this.tasks, function(value, name) {
    gulp.task(name, value);
  });
};
