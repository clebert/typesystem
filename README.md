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

- [ts.getTypeOf(value)](#tsgettypeofvalue)
- [ts.isFinite(value)](#tsisfinitevalue)
- [ts.isInteger(value)](#tsisintegervalue)
- [ts.isNaN(value)](#tsisnanvalue)
- [ts.isVoid(value)](#tsisvoidvalue)
- [ts.isGenerator(value)](#tsisgeneratorvalue)

### ts.getTypeOf(value)

```javascript
ts.getTypeOf(null);           // returns 'null'
ts.getTypeOf(undefined);      // returns 'undefined'
ts.getTypeOf(false);          // returns 'boolean'
ts.getTypeOf(0);              // returns 'number'
ts.getTypeOf('');             // returns 'string'
ts.getTypeOf(Symbol());       // returns 'symbol'
ts.getTypeOf({});             // returns 'object'
ts.getTypeOf(function () {}); // returns 'function'
```

### ts.isFinite(value)

```javascript
ts.isFinite(Number.MIN_VALUE); // returns true
ts.isFinite(Number.MAX_VALUE); // returns true
```

### ts.isInteger(value)

```javascript
ts.isInteger(Number.MAX_VALUE); // returns true
```

### ts.isNaN(value)

```javascript
ts.isNaN(NaN); // returns true
```

### ts.isVoid(value)

```javascript
ts.isVoid(null);      // returns true
ts.isVoid(undefined); // returns true
```

### ts.isGenerator(value)

```javascript
ts.isGenerator(function *() {}); // returns true
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
