
/* jshint node: true */
'use strict';

var sequence = require('./sequence.js');

module.exports = {
  tasks: {
    'default': sequence('dev'),
    'clean': require('./clean.js'),
    'lint': require('./lint.js'),
    'reload': require('./reload.js'),
    'build':  sequence(['build-js', 'build-html']),
    'bower': require('./bower.js'),
    'install': sequence('bower', 'build'),
    'dev': require('./dev.js'),
    'build-html': sequence('build-css', 'build-css-critical', 'build-html-pages'),
    'build-html-pages': require('./build-html-pages.js'),
    'build-css-critical': require('./build-css-critical.js'),
    'build-js': sequence('build-html-partials', 'build-js-app'),
    'build-html-partials': require('./build-html-partials.js'),
    'build-js-app': require('./build-js-app.js'),
    'build-css': require('./build-css.js'),
  },
  setup: require('./setup.js')
};
