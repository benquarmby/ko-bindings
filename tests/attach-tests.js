define(['knockout', 'ko-bindings'], function (ko, bindings) {
    'use strict';

    describe('ko-bindings attach', function () {
        beforeEach(function () {
            bindings.attach(ko);
        });

        afterEach(function () {
            delete ko.bindings;
        });

        it('should attach itself to knockout', function () {
            expect(ko.bindings).toBeDefined();
        });

        it('should have register method', function () {
            expect(typeof ko.bindings.register).toBe('function');
        });

        it('should have unregister method', function () {
            expect(typeof ko.bindings.unregister).toBe('function');
        });

        it('should have isRegistered method', function () {
            expect(typeof ko.bindings.isRegistered).toBe('function');
        });
    });
});
