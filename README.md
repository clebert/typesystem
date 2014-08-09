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
    ts.check(filename, ts.isString);

    if (arguments.length === 2) {
        callback = options;
        options  = null;
    }

    options          = ts.check(options, ts.isObject, {});
    options.encoding = ts.check(options.encoding, ts.isString, null);
    options.flag     = ts.check(options.flag, ts.isString, 'r');

    ts.check(callback, ts.isFunction);

    // ...
}
```

## API

### ts.check(value, predicate, [defaultValue])

Each of the following expressions resolve to the `<value>`:

```javascript
ts.check('abc', ts.isString);
ts.check('abc', ts.isString, 'xyz');

ts.check(0, ts.isInteger);
ts.check(0, ts.isInteger, 123);

ts.check(null, ts.isVoid);
ts.check(undefined, ts.isVoid);
```

Each of the following expressions resolve to the `<defaultValue>`:

```javascript
ts.check(null, ts.isString, 'xyz');
ts.check(undefined, ts.isString, 'xyz');
```

Each of the following expressions throw a `TypeError`:

```javascript
ts.check(0, ts.isString);
ts.check(0, ts.isString, 'xyz');

ts.check('abc', ts.isInteger);
ts.check('abc', ts.isInteger, 123);

ts.check(null, ts.isString);
ts.check(undefined, ts.isString);
```

### ts.isArguments(value)

The following expression resolves to `true`:

```javascript
ts.isArguments(arguments);
```

### ts.isArray(value)

The following expression resolves to `true`:

```javascript
ts.isArray([]);
```

### ts.isBoolean(value)

Each of the following expressions resolve to `true`:

```javascript
ts.isBoolean(false);
ts.isBoolean(true);
```

### ts.isDate(value)

The following expression resolves to `true`:

```javascript
ts.isDate(new Date());
```

### ts.isError(value)

Each of the following expressions resolve to `true`:

```javascript
ts.isError(new Error());
ts.isError(new EvalError());
ts.isError(new RangeError());
ts.isError(new ReferenceError());
ts.isError(new SyntaxError());
ts.isError(new TypeError());
ts.isError(new URIError());
```

### ts.isFunction(value)

The following expression resolves to `true`:

```javascript
ts.isFunction(function () {});
```

### ts.isNull(value)

The following expression resolves to `true`:

```javascript
ts.isNull(null);
```

### ts.isNumber(value)

Each of the following expressions resolve to `true`:

```javascript
ts.isNumber(0);
ts.isNumber(1);
ts.isNumber(1.1);
ts.isNumber(Infinity);
ts.isNumber(NaN);
```

### ts.isObject(value)

The following expression resolves to `true`:

```javascript
ts.isObject({});
```

### ts.isRegExp(value)

The following expression resolves to `true`:

```javascript
ts.isRegExp(new RegExp());
```

### ts.isString(value)

Each of the following expressions resolve to `true`:

```javascript
ts.isString('');
ts.isString('dummy');
```

### ts.isUndefined(value)

The following expression resolves to `true`:

```javascript
ts.isUndefined(undefined);
```

### ts.isFloat(value)

Each of the following expressions resolve to `true`:

```javascript
ts.isFloat(0);
ts.isFloat(1);
ts.isFloat(1.1);
```

### ts.isInteger(value)

Each of the following expressions resolve to `true`:

```javascript
ts.isInteger(-2147483648);
ts.isInteger(2147483647);
ts.isInteger(0);
ts.isInteger(1);
```

### ts.isVoid(value)

Each of the following expressions resolve to `true`:

```javascript
ts.isVoid(null);
ts.isVoid(undefined);
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
