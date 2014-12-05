'use strict';

var objectToString = Function.prototype.call.bind(Object.prototype.toString);

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

exports.isVoid = function (value) {
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
    return typeof value === 'function' && value.constructor.name === 'GeneratorFunction';
};

exports.isPlainFunction = function (value) {
    return typeof value === 'function' && value.constructor.name !== 'GeneratorFunction';
};
