/* jshint eqnull: true */

'use strict';

var objectToString = Function.prototype.call.bind(Object.prototype.toString);

exports.check = function check(value, predicate, defaultValue) {
    if (value == null && arguments.length > 2) {
        return defaultValue;
    }

    if (!predicate(value)) {
        var error = new TypeError('Illegal argument: ' + JSON.stringify(value));

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(error, check);
        }

        throw error;
    }

    return value;
};

exports.isArguments = function (value) {
    return objectToString(value) === '[object Arguments]';
};

exports.isArray = function (value) {
    return objectToString(value) === '[object Array]';
};

exports.isBoolean = function (value) {
    return typeof value === 'boolean';
};

exports.isDate = function (value) {
    return objectToString(value) === '[object Date]';
};

exports.isError = function (value) {
    return objectToString(value) === '[object Error]';
};

exports.isFunction = function (value) {
    return typeof value === 'function';
};

exports.isNull = function (value) {
    return value === null;
};

exports.isNumber = function (value) {
    return typeof value === 'number';
};

exports.isObject = function (value) {
    return objectToString(value) === '[object Object]';
};

exports.isRegExp = function (value) {
    return objectToString(value) === '[object RegExp]';
};

exports.isString = function (value) {
    return typeof value === 'string';
};

exports.isUndefined = function (value) {
    return value === void 0;
};

exports.isVoid = function (value) {
    return value == null;
};

exports.isFinite = function (value) {
    return typeof value === 'number' && value === value && value !== -Infinity && value !== Infinity;
};

exports.isNaN = function (value) {
    return value !== value;
};

var isInt = function (value, min, max) {
    return typeof value === 'number' && value % 1 === 0 && value >= min && value <= max;
};

var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

exports.isInt = function (value) {
    return isInt(value, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
};

exports.isInt8 = function (value) {
    return isInt(value, -0x80, 0x7f);
};

exports.isInt16 = function (value) {
    return isInt(value, -0x8000, 0x7fff);
};

exports.isInt32 = function (value) {
    return isInt(value, -0x80000000, 0x7fffffff);
};

exports.isUInt = function (value) {
    return isInt(value, 0, MAX_SAFE_INTEGER);
};

exports.isUInt8 = function (value) {
    return isInt(value, 0, 0xff);
};

exports.isUInt16 = function (value) {
    return isInt(value, 0, 0xffff);
};

exports.isUInt32 = function (value) {
    return isInt(value, 0, 0xffffffff);
};
