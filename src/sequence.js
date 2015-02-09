
/* globals: module: true; require: true */
/* jshint node: true */
'use strict';

var runSequence = require('run-sequence');

module.exports = function sequence() {
  var args = Array.prototype.slice.call(arguments, 0);
  return function runSequenceTask(cb) {
    var fArgs = Array.prototype.slice.call(args, 0);
    fArgs.push(cb);
    runSequence.use(global.gulp).apply(null, fArgs);
  };
};
