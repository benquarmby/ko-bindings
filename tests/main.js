/*global __karma__*/

(function () {
    'use strict';

    var karma = __karma__;
    var allTestFiles = [];
    var testPattern = /-tests\.js$/i;
    var basePattern = /^\/base\/|\.js$/g;

    function addTestFile(file) {
        if (testPattern.test(file)) {
            var rebasedModule = file.replace(basePattern, '');

            allTestFiles.push(rebasedModule);
        }
    }

    Object.keys(karma.files).forEach(addTestFile);

    require.config({
        baseUrl: '/base',
        paths: {
            knockout: './bower_components/knockout/dist/knockout.debug',
            'ko-bindings': './index'
        },
        deps: allTestFiles,
        callback: karma.start
    });
}());
