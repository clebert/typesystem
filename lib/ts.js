'use strict';

var objectToString = Object.prototype.toString;

exports.isObject = function (value) {
    var type = typeof value;

    return type === 'function' || (type === 'object' && value !== null);
};

exports.isArgumentsObject = function (value) {
    return objectToString.call(value) === '[object Arguments]';
};

exports.isArrayObject = function (value) {
    return objectToString.call(value) === '[object Array]';
};

exports.isBooleanObject = function (value) {
    return typeof value === 'object' && objectToString.call(value) === '[object Boolean]';
};

exports.isDateObject = function (value) {
    return objectToString.call(value) === '[object Date]';
};

exports.isDocumentObject = function (value) {
    var string = objectToString.call(value);

    return string === '[object HTMLDocument]' || string === '[object Document]';
};

exports.isElementObject = function (value) {
    return /HTML[A-Za-z]+Element/.test(objectToString.call(value));
};

exports.isErrorObject = function (value) {
    return objectToString.call(value) === '[object Error]';
};

exports.isFunctionObject = function (value) {
    return typeof value === 'function';
};

exports.isGlobalObject = function (value) {
    var string = objectToString.call(value);

    return string === '[object global]' || string === '[object Window]';
};

exports.isNumberObject = function (value) {
    return typeof value === 'object' && objectToString.call(value) === '[object Number]';
};

exports.isPlainObject = function (value) {
    return objectToString.call(value) === '[object Object]';
};

exports.isRegExpObject = function (value) {
    return objectToString.call(value) === '[object RegExp]';
};

exports.isStringObject = function (value) {
    return typeof value === 'object' && objectToString.call(value) === '[object String]';
};

exports.isPrimitive = function (value) {
    var type = typeof value;

    return (type !== 'function' && type !== 'object') || value === null;
};

exports.isBoolean = function (value) {
    return typeof value === 'boolean';
};

exports.isNull = function (value) {
    return value === null;
};

exports.isNullOrUndefined = function (value) {
    return value == null;
};

exports.isNumber = function (value) {
    return typeof value === 'number';
};

exports.isFiniteNumber = function (value) {
    return typeof value === 'number' && value >= -Number.MAX_VALUE && value <= Number.MAX_VALUE;
};

exports.isIntegerNumber = function (value) {
    return typeof value === 'number' && value % 1 === 0;
};

exports.isString = function (value) {
    return typeof value === 'string';
};

exports.isSymbol = function (value) {
    /* jshint notypeof: true */

    return typeof value === 'symbol';
};

exports.isUndefined = function (value) {
    return value === undefined;
};
