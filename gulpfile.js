'use strict';

var gulp = require('gulp');
var jslint = require('gulp-byo-jslint');

gulp.task('lint', function () {
    return gulp
        .src([
            './**/*.js',
            './**/*.json',
            '!./node_modules/**',
            '!./submodules/**'
        ])
        .pipe(jslint({
            jslint: './submodules/JSLint/jslint.js',
            options: {
                node: true
            }
        }));
});
