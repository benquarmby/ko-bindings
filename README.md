# ko-bindings

A binding management interface for Knockout.

## Why?

Knockout version 3.2.0 added component support together with a first class
functional API for managing them.

Unfortunately the much older binding system still requires manually mutating
the `ko.bindingHandlers` object. There is no first class API.

Additionally, the `init` and `update` callback signatures within bindings take
a total of *five* parameters, when only one or two are often used.

This module aims to resolve these issues in a backwards compatible way by:
- Adding a functional API for working with custom bindings and,
- Reducing callback signatures to a single `data` parameter.

## Installation
```
bower install benquarmby/ko-bindings --save
```

## Usage

### Without a module loader

Add `ko-bindings` as a script after knockout. It will attach itself to the `ko`
global automatically.

```HTML
<!DOCTYPE html>
<html>
<head>
    <title>Knockout Bindings</title>
    <script src="path/to/knockout.js" />
    <script src="path/to/ko-bindings.js" />
</head>
<body>
</body>
</html>
```

### Using AMD

Since it attaches itself to Knockout, this module should only be initialized
once. Application bootstrapping is the perfect place to add `ko-bindings` as a
dependency.

```JavaScript
// app.js
define(['knockout', 'ko-bindings'], function(ko, bindings) {
    'use strict';

    // Attach bindings API to ko
    bindings.attach(ko);
}); 
```

### Register a binding

```JavaScript
ko.bindings.register('myCustomBinding', {
    init: function (data) {
        // Initialize using binding data which contains properties for
        // element, valueAccessor, allBindings, viewModel and bindingContext
    },
    update: function (data) {
        // Update using binding data which contains properties for
        // element, valueAccessor, allBindings, viewModel and bindingContext
    }
});
```

### Detect a binding

```JavaScript
var bindingExists = ko.bindings.isRegisted('myCustomBinding');
```

### Remove a binding

```JavaScript
ko.bindings.unregister('myCustomBinding');
```
