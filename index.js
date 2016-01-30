/*!
   ko-bindings
   Copyright 2016 Ben Quarmby

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
!*/

/*jslint browser*/
/*global define, ko*/

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['module'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(module);
    } else {
        var context = {};
        factory(context);
        context.exports.attach(ko);
    }
}(function (module) {
    'use strict';

    function attach(ko) {
        if (!ko) {
            throw new Error('Knockout could not be found');
        }

        var handlers = ko.bindingHandlers;
        var methods = ['init', 'update'];

        function createCallback(config, method) {
            return function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                config[method]({
                    element: element,
                    valueAccessor: valueAccessor,
                    allBindings: allBindings,
                    viewModel: viewModel,
                    bindingContext: bindingContext
                });
            };
        }

        function isRegistered(bindingName) {
            return handlers.hasOwnProperty(bindingName);
        }

        function register(bindingName, config) {
            if (!config) {
                throw new Error('Invalid configuration for binding ' + bindingName);
            }

            if (isRegistered(bindingName)) {
                throw new Error('Binding ' + bindingName + ' is already registered');
            }

            var binding = {};

            methods.forEach(function (method) {
                if (typeof config[method] === 'function') {
                    binding[method] = createCallback(config, method);
                }
            });

            handlers[bindingName] = binding;
        }

        function unregister(bindingName) {
            delete handlers[bindingName];
        }

        ko.bindings = {
            isRegistered: isRegistered,
            register: register,
            unregister: unregister
        };
    }

    module.exports = {
        attach: attach
    };
}));
