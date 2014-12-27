# typesystem

> Better type checking for JavaScript.

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clebert/typesystem/master/LICENSE)
[![npm](http://img.shields.io/npm/v/typesystem.svg?style=flat)](https://www.npmjs.org/package/typesystem)
[![downloads](http://img.shields.io/npm/dm/typesystem.svg?style=flat)](https://www.npmjs.org/package/typesystem)

[![build](http://img.shields.io/travis/clebert/typesystem/master.svg?style=flat)](https://travis-ci.org/clebert/typesystem)
[![coverage](http://img.shields.io/coveralls/clebert/typesystem/master.svg?style=flat)](https://coveralls.io/r/clebert/typesystem)
[![code climate](http://img.shields.io/codeclimate/github/clebert/typesystem.svg?style=flat)](https://codeclimate.com/github/clebert/typesystem)
[![dependencies](http://img.shields.io/david/clebert/typesystem.svg?style=flat)](https://david-dm.org/clebert/typesystem#info=dependencies&view=table)
[![devDependencies](http://img.shields.io/david/dev/clebert/typesystem.svg?style=flat)](https://david-dm.org/clebert/typesystem#info=devDependencies&view=table)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/clebert.svg)](https://saucelabs.com/u/clebert)

## Getting Started

### Installation

```sh
npm install typesystem --save
```

### Integration

```javascript
var ts = require('typesystem');
```

## API

### Overview

- [ts.isFunction(value)](#tsisfunctionvalue)
- [ts.isObject(value)](#tsisobjectvalue)
- [ts.isArgumentsObject(value)](#tsisargumentsobjectvalue)
- [ts.isArrayObject(value)](#tsisarrayobjectvalue)
- [ts.isBooleanObject(value)](#tsisbooleanobjectvalue)
- [ts.isDateObject(value)](#tsisdateobjectvalue)
- [ts.isDocumentObject(value)](#tsisdocumentobjectvalue)
- [ts.isElementObject(value)](#tsiselementobjectvalue)
- [ts.isErrorObject(value)](#tsiserrorobjectvalue)
- [ts.isGlobalObject(value)](#tsisglobalobjectvalue)
- [ts.isNumberObject(value)](#tsisnumberobjectvalue)
- [ts.isPlainObject(value)](#tsisplainobjectvalue)
- [ts.isRegExpObject(value)](#tsisregexpobjectvalue)
- [ts.isStringObject(value)](#tsisstringobjectvalue)
- [ts.isPrimitive(value)](#tsisprimitivevalue)
- [ts.isBoolean(value)](#tsisbooleanvalue)
- [ts.isNull(value)](#tsisnullvalue)
- [ts.isNullOrUndefined(value)](#tsisnullorundefinedvalue)
- [ts.isNumber(value)](#tsisnumbervalue)
- [ts.isFiniteNumber(value)](#tsisfinitenumbervalue)
- [ts.isIntegerNumber(value)](#tsisintegernumbervalue)
- [ts.isString(value)](#tsisstringvalue)
- [ts.isSymbol(value)](#tsissymbolvalue)
- [ts.isUndefined(value)](#tsisundefinedvalue)

### ts.isFunction(value)

```javascript
ts.isFunction(function () {});  // returns true
ts.isFunction(function *() {}); // returns true
```

### ts.isObject(value)

```javascript
ts.isObject(arguments);                      // returns true
ts.isObject([]);                             // returns true
ts.isObject(new Boolean());                  // returns true
ts.isObject(new Date());                     // returns true
ts.isObject(document);                       // returns true
ts.isObject(document.createElement('div'));  // returns true
ts.isObject(document.createElement('span')); // returns true
ts.isObject(new Error());                    // returns true
ts.isObject(new EvalError());                // returns true
ts.isObject(new RangeError());               // returns true
ts.isObject(new ReferenceError());           // returns true
ts.isObject(new SyntaxError());              // returns true
ts.isObject(new TypeError());                // returns true
ts.isObject(new URIError());                 // returns true
ts.isObject(global);                         // returns true
ts.isObject(window);                         // returns true
ts.isObject(new Number());                   // returns true
ts.isObject({});                             // returns true
ts.isObject(new RegExp());                   // returns true
ts.isObject(new String());                   // returns true
```

### ts.isArgumentsObject(value)

```javascript
ts.isArgumentsObject(arguments); // returns true
```

### ts.isArrayObject(value)

```javascript
ts.isArrayObject([]); // returns true
```

### ts.isBooleanObject(value)

```javascript
ts.isBooleanObject(new Boolean()); // returns true
```

### ts.isDateObject(value)

```javascript
ts.isDateObject(new Date()); // returns true
```

### ts.isDocumentObject(value)

```javascript
ts.isDocumentObject(document); // returns true
```

### ts.isElementObject(value)

```javascript
ts.isElementObject(document.createElement('div'));  // returns true
ts.isElementObject(document.createElement('span')); // returns true
```

### ts.isErrorObject(value)

```javascript
ts.isErrorObject(new Error());          // returns true
ts.isErrorObject(new EvalError());      // returns true
ts.isErrorObject(new RangeError());     // returns true
ts.isErrorObject(new ReferenceError()); // returns true
ts.isErrorObject(new SyntaxError());    // returns true
ts.isErrorObject(new TypeError());      // returns true
ts.isErrorObject(new URIError());       // returns true
```

### ts.isGlobalObject(value)

```javascript
ts.isGlobalObject(global); // returns true
ts.isGlobalObject(window); // returns true
```

### ts.isNumberObject(value)

```javascript
ts.isNumberObject(new Number()); // returns true
```

### ts.isPlainObject(value)

```javascript
ts.isPlainObject({}); // returns true
```

### ts.isRegExpObject(value)

```javascript
ts.isRegExpObject(new RegExp()); // returns true
```

### ts.isStringObject(value)

```javascript
ts.isStringObject(new String()); // returns true
```

### ts.isPrimitive(value)

```javascript
ts.isPrimitive(false);             // returns true
ts.isPrimitive(true);              // returns true
ts.isPrimitive(null);              // returns true
ts.isPrimitive(0);                 // returns true
ts.isPrimitive(-Number.MIN_VALUE); // returns true
ts.isPrimitive(Number.MIN_VALUE);  // returns true
ts.isPrimitive(-Number.MAX_VALUE); // returns true
ts.isPrimitive(Number.MAX_VALUE);  // returns true
ts.isPrimitive(-Infinity);         // returns true
ts.isPrimitive(Infinity);          // returns true
ts.isPrimitive(NaN);               // returns true
ts.isPrimitive('');                // returns true
ts.isPrimitive(Symbol());          // returns true
ts.isPrimitive(undefined);         // returns true
```

### ts.isBoolean(value)

```javascript
ts.isBoolean(false); // returns true
ts.isBoolean(true);  // returns true
```

### ts.isNull(value)

```javascript
ts.isNull(null); // returns true
```

### ts.isNullOrUndefined(value)

```javascript
ts.isNullOrUndefined(null);      // returns true
ts.isNullOrUndefined(undefined); // returns true
```

### ts.isNumber(value)

```javascript
ts.isNumber(0);                 // returns true
ts.isNumber(-Number.MIN_VALUE); // returns true
ts.isNumber(Number.MIN_VALUE);  // returns true
ts.isNumber(-Number.MAX_VALUE); // returns true
ts.isNumber(Number.MAX_VALUE);  // returns true
ts.isNumber(-Infinity);         // returns true
ts.isNumber(Infinity);          // returns true
ts.isNumber(NaN);               // returns true
```

### ts.isFiniteNumber(value)

```javascript
ts.isFiniteNumber(0);                 // returns true
ts.isFiniteNumber(-Number.MIN_VALUE); // returns true
ts.isFiniteNumber(Number.MIN_VALUE);  // returns true
ts.isFiniteNumber(-Number.MAX_VALUE); // returns true
ts.isFiniteNumber(Number.MAX_VALUE);  // returns true
```

### ts.isIntegerNumber(value)

```javascript
ts.isIntegerNumber(0);                 // returns true
ts.isIntegerNumber(-Number.MAX_VALUE); // returns true
ts.isIntegerNumber(Number.MAX_VALUE);  // returns true
```

### ts.isString(value)

```javascript
ts.isString(''); // returns true
```

### ts.isSymbol(value)

```javascript
ts.isSymbol(Symbol()); // returns true
```

### ts.isUndefined(value)

```javascript
ts.isUndefined(undefined); // returns true
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
