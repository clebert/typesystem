# typesystem

> Sophisticated Type Checking for JavaScript.

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clebert/typesystem/master/LICENSE)
[![npm](http://img.shields.io/npm/v/typesystem.svg?style=flat)](https://www.npmjs.org/package/typesystem)
[![downloads](http://img.shields.io/npm/dm/typesystem.svg?style=flat)](https://www.npmjs.org/package/typesystem)

[![build](http://img.shields.io/travis/clebert/typesystem/master.svg?style=flat)](https://travis-ci.org/clebert/typesystem)
[![coverage](http://img.shields.io/coveralls/clebert/typesystem/master.svg?style=flat)](https://coveralls.io/r/clebert/typesystem)
[![code climate](http://img.shields.io/codeclimate/github/clebert/typesystem.svg?style=flat)](https://codeclimate.com/github/clebert/typesystem)
[![dependencies](http://img.shields.io/david/clebert/typesystem.svg?style=flat)](https://david-dm.org/clebert/typesystem#info=dependencies&view=table)
[![devDependencies](http://img.shields.io/david/dev/clebert/typesystem.svg?style=flat)](https://david-dm.org/clebert/typesystem#info=devDependencies&view=table)

## Getting Started

### Installation

```sh
npm install typesystem --save
```

### Integration

```javascript
var ts = require('typesystem');
```

## Usage

Example implementation of [fs.readFile(filename, [options], callback)](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback):

```javascript
function readFile(filename, options, callback) {
    ts.checkRequired(filename, 'filename', ts.isString);

    if (arguments.length === 2) {
        callback = options;
        options = null;
    }

    options = ts.checkOptional(options, 'options', ts.isObject, {});
    options.encoding = ts.checkOptional(options.encoding, 'options.encoding', ts.isString, null);
    options.flag = ts.checkOptional(options.flag, 'options.flag', ts.isString, 'r');

    ts.checkRequired(callback, 'callback', ts.isFunction);

    // ...
}
```

## API

### ts.checkOptional(argument, name, predicate, defaultValue)

```javascript
options = ts.checkOptional(options, 'options', ts.isObject, {});
```

### ts.checkRequired(argument, name, predicate)

```javascript
filename = ts.checkRequired(filename, 'filename', ts.isString);
```

### ts.isArguments(value)

```javascript
var bool = ts.isArguments(arguments);
```

### ts.isArray(value)

```javascript
var bool = ts.isArray([]);
```

### ts.isBoolean(value)

```javascript
var bool = ts.isBoolean(false);
var bool = ts.isBoolean(true);
```

### ts.isDate(value)

```javascript
var bool = ts.isDate(new Date());
```

### ts.isError(value)

```javascript
var bool = ts.isError(new Error());
var bool = ts.isError(new EvalError());
var bool = ts.isError(new RangeError());
var bool = ts.isError(new ReferenceError());
var bool = ts.isError(new SyntaxError());
var bool = ts.isError(new TypeError());
var bool = ts.isError(new URIError());
```

### ts.isFunction(value)

```javascript
var bool = ts.isFunction(function () {});
```

### ts.isNull(value)

```javascript
var bool = ts.isNull(null);
```

### ts.isNumber(value)

```javascript
var bool = ts.isNumber(0);
var bool = ts.isNumber(1);
var bool = ts.isNumber(Infinity);
var bool = ts.isNumber(NaN);
```

### ts.isObject(value)

```javascript
var bool = ts.isObject({});
```

### ts.isRegExp(value)

```javascript
var bool = ts.isRegExp(new RegExp());
```

### ts.isString(value)

```javascript
var bool = ts.isString('');
var bool = ts.isString('dummy');
```

### ts.isUndefined(value)

```javascript
var bool = ts.isUndefined(undefined);
```

### ts.isDecimal(value)

```javascript
var bool = ts.isDecimal(0);
var bool = ts.isDecimal(1);
var bool = ts.isDecimal(1.1);
```

### ts.isInteger(value)

```javascript
var bool = ts.isInteger(-2147483648);
var bool = ts.isInteger(2147483647);
var bool = ts.isInteger(0);
var bool = ts.isInteger(1);
```

### ts.isVoid(value)

```javascript
var bool = ts.isVoid(null);
var bool = ts.isVoid(undefined);
```

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
