define(['knockout', 'ko-bindings'], function (ko, bindings) {
    'use strict';

    describe('ko-bindings register', function () {
        beforeAll(function () {
            bindings.attach(ko);
        });

        afterAll(function () {
            delete ko.bindings;
        });

        afterEach(function () {
            delete ko.bindingHandlers.customBinding;
        });

        it('should add a new binding on bindingHandlers', function () {
            ko.bindings.register('customBinding', {});

            expect(ko.bindingHandlers.customBinding).toBeDefined();
            expect(ko.bindingHandlers.customBinding.init).not.toBeDefined();
            expect(ko.bindingHandlers.customBinding.update).not.toBeDefined();
        });

        it('should add init method when it exists on binding', function () {
            ko.bindings.register('customBinding', {
                init: function () {
                    return;
                }
            });

            expect(ko.bindingHandlers.customBinding.init).toBeDefined();
        });

        it('should add update method when it exists on binding', function () {
            ko.bindings.register('customBinding', {
                update: function () {
                    return;
                }
            });

            expect(ko.bindingHandlers.customBinding.update).toBeDefined();
        });

        describe('init', function () {
            var binding;

            beforeEach(function () {
                binding = jasmine.createSpyObj(['init']);
                ko.bindings.register('customBinding', binding);
                ko.bindingHandlers.customBinding.init(
                    'element',
                    'valueAccessor',
                    'allBindings',
                    'viewModel',
                    'bindingContext'
                );
            });

            it('should wrap all 5 arguments in a data object', function () {
                expect(binding.init).toHaveBeenCalledWith({
                    bindingContext: 'bindingContext',
                    viewModel: 'viewModel',
                    allBindings: 'allBindings',
                    valueAccessor: 'valueAccessor',
                    element: 'element'
                });
            });

            it('should use the binding object as the "this" context', function () {
                expect(binding.init.calls.mostRecent().object).toBe(binding);
            });
        });

        describe('update', function () {
            var binding;

            beforeEach(function () {
                binding = jasmine.createSpyObj(['update']);
                ko.bindings.register('customBinding', binding);
                ko.bindingHandlers.customBinding.update(
                    'element',
                    'valueAccessor',
                    'allBindings',
                    'viewModel',
                    'bindingContext'
                );
            });

            it('should wrap all 5 arguments in a data object', function () {
                expect(binding.update).toHaveBeenCalledWith({
                    bindingContext: 'bindingContext',
                    viewModel: 'viewModel',
                    allBindings: 'allBindings',
                    valueAccessor: 'valueAccessor',
                    element: 'element'
                });
            });

            it('should use the binding object as the "this" context', function () {
                expect(binding.update.calls.mostRecent().object).toBe(binding);
            });
        });
    });
});
