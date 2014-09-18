/* jshint eqnull: true */

'use strict';

var objectToString = Function.prototype.call.bind(Object.prototype.toString);
var ts             = exports;

ts.check = function (value, predicate, defaultValue) {
    if (value == null && arguments.length > 2) {
        return defaultValue;
    }

    if (!predicate(value)) {
        throw new TypeError('Illegal argument: ' + JSON.stringify(value));
    }

    return value;
};

ts.isArguments = function (value) {
    return objectToString(value) === '[object Arguments]';
};

ts.isArray = function (value) {
    return objectToString(value) === '[object Array]';
};

ts.isBoolean = function (value) {
    return typeof value === 'boolean';
};

ts.isDate = function (value) {
    return objectToString(value) === '[object Date]';
};

ts.isError = function (value) {
    return objectToString(value) === '[object Error]';
};

ts.isFunction = function (value) {
    return typeof value === 'function';
};

ts.isNull = function (value) {
    return value === null;
};

ts.isNumber = function (value) {
    return typeof value === 'number';
};

ts.isObject = function (value) {
    return objectToString(value) === '[object Object]';
};

ts.isRegExp = function (value) {
    return objectToString(value) === '[object RegExp]';
};

ts.isString = function (value) {
    return typeof value === 'string';
};

ts.isUndefined = function (value) {
    return value === void 0;
};

ts.isVoid = function (value) {
    return value == null;
};

ts.isFinite = function (value) {
    return typeof value === 'number' && value === value && value !== -Infinity && value !== Infinity;
};

ts.isNaN = function (value) {
    return value !== value;
};

var isInt = function (value, min, max) {
    return typeof value === 'number' && value % 1 === 0 && value >= min && value <= max;
};

var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

ts.isInt = function (value) {
    return isInt(value, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
};

ts.isInt8 = function (value) {
    return isInt(value, -0x80, 0x7f);
};

ts.isInt16 = function (value) {
    return isInt(value, -0x8000, 0x7fff);
};

ts.isInt32 = function (value) {
    return isInt(value, -0x80000000, 0x7fffffff);
};

ts.isUInt = function (value) {
    return isInt(value, 0, MAX_SAFE_INTEGER);
};

ts.isUInt8 = function (value) {
    return isInt(value, 0, 0xff);
};

ts.isUInt16 = function (value) {
    return isInt(value, 0, 0xffff);
};

ts.isUInt32 = function (value) {
    return isInt(value, 0, 0xffffffff);
};
