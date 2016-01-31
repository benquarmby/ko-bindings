'use strict';

var gulp = require('gulp');
var jslint = require('gulp-byo-jslint');
var jslintPath = '../submodules/JSLint/jslint.js';

gulp.task('lint-core', function () {
    return gulp
        .src(['../*.js', '../*.json'])
        .pipe(jslint({
            jslint: jslintPath
        }));
});

gulp.task('lint-tasks', function () {
    return gulp
        .src(['../tasks/**.js', '../tasks/**.json'])
        .pipe(jslint({
            jslint: jslintPath,
            options: {
                node: true
            }
        }));
});

gulp.task('lint-tests', function () {
    return gulp
        .src(['../tests/**/*.js', '../tests/**/*.json'])
        .pipe(jslint({
            jslint: jslintPath,
            options: {
                browser: true
            },
            globals: [
                'require',
                'define',
                'jasmine',
                'describe',
                'beforeEach',
                'beforeAll',
                'afterEach',
                'afterAll',
                'it',
                'expect'
            ]
        }));
});

gulp.task('lint', ['lint-core', 'lint-tasks', 'lint-tests']);
