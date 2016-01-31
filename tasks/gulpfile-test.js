'use strict';

var gulp = require('gulp');
var karma = require('karma');
var path = require('path');

gulp.task('test', function (done) {
    var config = {
        configFile: path.resolve('karma.conf.js'),
        singleRun: true
    };
    var server = new karma.Server(config, done);

    server.start();
});
