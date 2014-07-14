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
var createTypeSystem = require('typesystem').createTypeSystem;
```

## API

### createTypeSystem()

Creates a new type system and returns it.

```javascript
var ts = createTypeSystem();
```

#### Built-in Types

| Type              | Accepted Value           |
| :---------------- | :----------------------- |
| object            | any object               |
| object:arguments  | an arguments object      |
| object:array      | an array object          |
| object:boolean    | a boolean object         |
| object:date       | a date object            |
| object:error      | an error object          |
| object:function   | a function object        |
| object:global     | the Global/Window object |
| object:json       | the JSON object          |
| object:math       | the Math object          |
| object:number     | a number object          |
| object:plain      | a plain object           |
| object:regex      | a regex object           |
| object:string     | a string object          |
| primitive         | any primitive            |
| primitive:boolean | a boolean primitive      |
| primitive:number  | a number primitive       |
| primitive:string  | a string primitive       |
| primitive:void    | null or undefined        |

### ts.checkBounds(args, min, [max])

Throws an error if the arguments are out of bounds, and returns this type system otherwise.

```javascript
function stat(path, callback) {
    ts.checkBounds(arguments, 2);

    // ...
}
```

### ts.checkType(value, name, type)

Throws an error if the value is not of the specified type, and returns it otherwise.

```javascript
function stat(path, callback) {
    ts.checkType(path, 'path', 'primitive:string');
    ts.checkType(callback, 'callback', 'object:function');

    // ...
}
```

### ts.testType(value, type)

Returns true if the value is of the specified type, and false otherwise.

```javascript
if (ts.testType(path, 'primitive:string')) {
    // ...
}
```

### ts.defineType(name, supertype, tester)

Defines a new custom type and returns it.

```javascript
var newType = ts.defineType('integer', 'primitive:number', function (number) {
    return number === (number | 0);
});
```

### ts.defineFiniteNumberType()

Defines a new type ```primitive:number:finite```, which accepts only finite numbers, and returns it.

```javascript
var newType = ts.defineFiniteNumberType();
```

### ts.defineIntegerNumberType()

Defines a new type ```primitive:number:integer```, which accepts only integer numbers, and returns it.

```javascript
var newType = ts.defineIntegerNumberType();
```

### ts.hasType(type)

Returns true if the type exists, and false otherwise.

```javascript
if (ts.hasType('primitive:number:integer')) {
    // ...
}
```

### ts.types()

Returns a sorted array of all existing types.

```javascript
var types = ts.types();
```

## Example Usage

Example implementation of [fs.readFile(filename, [options], callback)](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback):

```javascript
function readFile(filename, options, callback) {
    ts.checkBounds(arguments, 2, 3);
    ts.checkType(filename, 'filename', 'primitive:string');

    if (arguments.length === 2) {
        callback = options;
        options = null;
    }

    options = ts.testType(options, 'primitive:void') ?
        {} : ts.checkType(options, '[options]', 'object:plain');

    options.encoding = ts.testType(options.encoding, 'primitive:void') ?
        null : ts.checkType(options.encoding, '[options.encoding]', 'primitive:string');

    options.flag = ts.testType(options.flag, 'primitive:void') ?
        'r' : ts.checkType(options.flag, '[options.flag]', 'primitive:string');

    ts.checkType(callback, 'callback', 'object:function');

    // ...
}
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

## License

Licensed under the MIT license.
