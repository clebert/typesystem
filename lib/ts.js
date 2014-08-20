/* eslint no-eq-null: 0 */

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
    return typeof value === 'number' && isFinite(value);
};

var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

var isInt = function (value, max, min) {
    return typeof value === 'number' && !(value % 1) && value <= max && value >= min;
};

ts.isInt = function (value) {
    return isInt(value, MAX_SAFE_INTEGER, -MAX_SAFE_INTEGER);
};

ts.isInt8 = function (value) {
    return isInt(value, 0x7f, -0x80);
};

ts.isInt16 = function (value) {
    return isInt(value, 0x7fff, -0x8000);
};

ts.isInt32 = function (value) {
    return isInt(value, 0x7fffffff, -0x80000000);
};

ts.isUInt = function (value) {
    return isInt(value, MAX_SAFE_INTEGER, 0);
};

ts.isUInt8 = function (value) {
    return isInt(value, 0xff, 0);
};

ts.isUInt16 = function (value) {
    return isInt(value, 0xffff, 0);
};

ts.isUInt32 = function (value) {
    return isInt(value, 0xffffffff, 0);
};
