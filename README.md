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

- [ts.isPrimitive(value)](#tsisprimitivevalue)
- [ts.isNull(value)](#tsisnullvalue)
- [ts.isUndefined(value)](#tsisundefinedvalue)
- [ts.isNullOrUndefined(value)](#tsisnullorundefinedvalue)
- [ts.isBoolean(value)](#tsisbooleanvalue)
- [ts.isNumber(value)](#tsisnumbervalue)
- [ts.isFinite(value)](#tsisfinitevalue)
- [ts.isInteger(value)](#tsisintegervalue)
- [ts.isNaN(value)](#tsisnanvalue)
- [ts.isString(value)](#tsisstringvalue)
- [ts.isSymbol(value)](#tsissymbolvalue)
- [ts.isObject(value)](#tsisobjectvalue)
- [ts.isArgumentsObject(value)](#tsisargumentsobjectvalue)
- [ts.isArray(value)](#tsisarrayvalue)
- [ts.isBooleanObject(value)](#tsisbooleanobjectvalue)
- [ts.isDate(value)](#tsisdatevalue)
- [ts.isError(value)](#tsiserrorvalue)
- [ts.isEvalError(value)](#tsisevalerrorvalue)
- [ts.isPlainError(value)](#tsisplainerrorvalue)
- [ts.isRangeError(value)](#tsisrangeerrorvalue)
- [ts.isReferenceError(value)](#tsisreferenceerrorvalue)
- [ts.isSyntaxError(value)](#tsissyntaxerrorvalue)
- [ts.isTypeError(value)](#tsistypeerrorvalue)
- [ts.isURIError(value)](#tsisurierrorvalue)
- [ts.isGlobalObject(value)](#tsisglobalobjectvalue)
- [ts.isHTMLDocument(value)](#tsishtmldocumentvalue)
- [ts.isHTMLElement(value)](#tsishtmlelementvalue)
- [ts.isNumberObject(value)](#tsisnumberobjectvalue)
- [ts.isPlainObject(value)](#tsisplainobjectvalue)
- [ts.isRegExp(value)](#tsisregexpvalue)
- [ts.isStringObject(value)](#tsisstringobjectvalue)
- [ts.isFunction(value)](#tsisfunctionvalue)
- [ts.isGenerator(value)](#tsisgeneratorvalue)
- [ts.isPlainFunction(value)](#tsisplainfunctionvalue)

### ts.isPrimitive(value)

```javascript
ts.isPrimitive(null);      // returns true
ts.isPrimitive(undefined); // returns true
ts.isPrimitive(false);     // returns true
ts.isPrimitive(true);      // returns true
ts.isPrimitive(0);         // returns true
ts.isPrimitive(Infinity);  // returns true
ts.isPrimitive(NaN);       // returns true
ts.isPrimitive('');        // returns true
ts.isPrimitive(Symbol());  // returns true
```

### ts.isNull(value)

```javascript
ts.isNull(null); // returns true
```

### ts.isUndefined(value)

```javascript
ts.isUndefined(undefined); // returns true
```

### ts.isNullOrUndefined(value)

```javascript
ts.isNullOrUndefined(null);      // returns true
ts.isNullOrUndefined(undefined); // returns true
```

### ts.isBoolean(value)

```javascript
ts.isBoolean(false); // returns true
ts.isBoolean(true);  // returns true
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

### ts.isFinite(value)

```javascript
ts.isFinite(0);                 // returns true
ts.isFinite(-Number.MIN_VALUE); // returns true
ts.isFinite(Number.MIN_VALUE);  // returns true
ts.isFinite(-Number.MAX_VALUE); // returns true
ts.isFinite(Number.MAX_VALUE);  // returns true
```

### ts.isInteger(value)

```javascript
ts.isInteger(0);                 // returns true
ts.isInteger(-Number.MAX_VALUE); // returns true
ts.isInteger(Number.MAX_VALUE);  // returns true
```

### ts.isNaN(value)

```javascript
ts.isNaN(NaN); // returns true
```

### ts.isString(value)

```javascript
ts.isString(''); // returns true
```

### ts.isSymbol(value)

```javascript
ts.isSymbol(Symbol()); // returns true
```

### ts.isObject(value)

```javascript
ts.isObject(arguments);     // returns true
ts.isObject([]);            // returns true
ts.isObject(new Boolean()); // returns true
ts.isObject(new Date());    // returns true
ts.isObject(new Error());   // returns true
ts.isObject(global);        // returns true
ts.isObject(window);        // returns true
ts.isObject(new Number());  // returns true
ts.isObject({});            // returns true
ts.isObject(new RegExp());  // returns true
ts.isObject(new String());  // returns true
```

### ts.isArgumentsObject(value)

```javascript
ts.isArgumentsObject(arguments); // returns true
```

### ts.isArray(value)

```javascript
ts.isArray([]); // returns true
```

### ts.isBooleanObject(value)

```javascript
ts.isBooleanObject(new Boolean()); // returns true
```

### ts.isDate(value)

```javascript
ts.isDate(new Date()); // returns true
```

### ts.isError(value)

```javascript
ts.isError(new Error());          // returns true
ts.isError(new EvalError());      // returns true
ts.isError(new RangeError());     // returns true
ts.isError(new ReferenceError()); // returns true
ts.isError(new SyntaxError());    // returns true
ts.isError(new TypeError());      // returns true
ts.isError(new URIError());       // returns true
```

### ts.isEvalError(value)

```javascript
ts.isEvalError(new EvalError()); // returns true
```

### ts.isPlainError(value)

```javascript
ts.isPlainError(new Error()); // returns true
```

### ts.isRangeError(value)

```javascript
ts.isRangeError(new RangeError()); // returns true
```

### ts.isReferenceError(value)

```javascript
ts.isReferenceError(new ReferenceError()); // returns true
```

### ts.isSyntaxError(value)

```javascript
ts.isSyntaxError(new SyntaxError()); // returns true
```

### ts.isTypeError(value)

```javascript
ts.isTypeError(new TypeError()); // returns true
```

### ts.isURIError(value)

```javascript
ts.isURIError(new URIError()); // returns true
```

### ts.isGlobalObject(value)

```javascript
ts.isGlobalObject(global); // returns true
ts.isGlobalObject(window); // returns true
```

### ts.isHTMLDocument(value)

```javascript
ts.isHTMLDocument(document); // returns true
```

### ts.isHTMLElement(value)

```javascript
ts.isHTMLElement(document.createElement("div"));  // returns true
ts.isHTMLElement(document.createElement("span")); // returns true
```

### ts.isNumberObject(value)

```javascript
ts.isNumberObject(new Number()); // returns true
```

### ts.isPlainObject(value)

```javascript
ts.isPlainObject({}); // returns true
```

### ts.isRegExp(value)

```javascript
ts.isRegExp(new RegExp()); // returns true
```

### ts.isStringObject(value)

```javascript
ts.isStringObject(new String()); // returns true
```

### ts.isFunction(value)

```javascript
ts.isFunction(function *() {}); // returns true
ts.isFunction(function () {});  // returns true
```

### ts.isGenerator(value)

```javascript
ts.isGenerator(function *() {}); // returns true
```

### ts.isPlainFunction(value)

```javascript
ts.isPlainFunction(function () {}); // returns true
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
