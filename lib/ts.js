'use strict';

var errorToString    = Function.prototype.call.bind(Error.prototype.toString);
var functionToString = Function.prototype.call.bind(Function.prototype.toString);
var objectToString   = Function.prototype.call.bind(Object.prototype.toString);

exports.isPrimitive = function (value) {
    var type = typeof value;

    return (type !== 'function' && type !== 'object') || value === null;
};

exports.isNull = function (value) {
    return value === null;
};

exports.isUndefined = function (value) {
    return value === undefined;
};

exports.isNullOrUndefined = function (value) {
    return value == null;
};

exports.isBoolean = function (value) {
    return typeof value === 'boolean';
};

exports.isNumber = function (value) {
    return typeof value === 'number';
};

exports.isFinite = function (value) {
    return typeof value === 'number' && Math.abs(value) <= Number.MAX_VALUE;
};

exports.isInteger = function (value) {
    return typeof value === 'number' && value % 1 === 0;
};

exports.isNaN = function (value) {
    return value !== value;
};

exports.isString = function (value) {
    return typeof value === 'string';
};

exports.isSymbol = function (value) {
    /* jshint notypeof: true */

    return typeof value === 'symbol';
};

exports.isObject = function (value) {
    return typeof value === 'object' && value !== null;
};

exports.isArgumentsObject = function (value) {
    return objectToString(value) === '[object Arguments]';
};

exports.isArray = function (value) {
    return objectToString(value) === '[object Array]';
};

exports.isBooleanObject = function (value) {
    return typeof value === 'object' && objectToString(value) === '[object Boolean]';
};

exports.isDate = function (value) {
    return objectToString(value) === '[object Date]';
};

exports.isError = function (value) {
    return objectToString(value) === '[object Error]';
};

exports.isEvalError = function (value) {
    return objectToString(value) === '[object Error]' && /^EvalError/.test(errorToString(value));
};

exports.isPlainError = function (value) {
    return objectToString(value) === '[object Error]' && /^Error/.test(errorToString(value));
};

exports.isRangeError = function (value) {
    return objectToString(value) === '[object Error]' && /^RangeError/.test(errorToString(value));
};

exports.isReferenceError = function (value) {
    return objectToString(value) === '[object Error]' && /^ReferenceError/.test(errorToString(value));
};

exports.isSyntaxError = function (value) {
    return objectToString(value) === '[object Error]' && /^SyntaxError/.test(errorToString(value));
};

exports.isTypeError = function (value) {
    return objectToString(value) === '[object Error]' && /^TypeError/.test(errorToString(value));
};

exports.isURIError = function (value) {
    return objectToString(value) === '[object Error]' && /^URIError/.test(errorToString(value));
};

exports.isGlobalObject = function (value) {
    var string = objectToString(value);

    return string === '[object global]' || string === '[object Window]';
};

exports.isNumberObject = function (value) {
    return typeof value === 'object' && objectToString(value) === '[object Number]';
};

exports.isPlainObject = function (value) {
    return objectToString(value) === '[object Object]';
};

exports.isRegExp = function (value) {
    return objectToString(value) === '[object RegExp]';
};

exports.isStringObject = function (value) {
    return typeof value === 'object' && objectToString(value) === '[object String]';
};

exports.isFunction = function (value) {
    return typeof value === 'function';
};

exports.isGenerator = function (value) {
    return typeof value === 'function' && /^function *\*/.test(functionToString(value));
};

exports.isPlainFunction = function (value) {
    return typeof value === 'function' && !/^function *\*/.test(functionToString(value));
};
