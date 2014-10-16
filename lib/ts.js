/* jshint eqnull: true */

'use strict';

var objectToString = Function.prototype.call.bind(Object.prototype.toString);

var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

exports.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;

exports.checkArgument = function checkArgument(value, predicate, defaultValue) {
    if (value == null && arguments.length > 2) {
        return defaultValue;
    }

    if (!predicate(value)) {
        var error = new TypeError('Illegal argument: ' + JSON.stringify(value));

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(error, checkArgument);
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

exports.isFinite = function (value, min, max) {
    if (min == null) {
        min = -MAX_SAFE_INTEGER;
    }

    if (max == null) {
        max = MAX_SAFE_INTEGER;
    }

    return typeof value === 'number' && value >= min && value <= max;
};

exports.isFunction = function (value) {
    return typeof value === 'function';
};

exports.isInteger = function (value, min, max) {
    if (min == null) {
        min = -MAX_SAFE_INTEGER;
    }

    if (max == null) {
        max = MAX_SAFE_INTEGER;
    }

    return typeof value === 'number' && value >= min && value <= max && value % 1 === 0;
};

exports.isNaN = function (value) {
    return value !== value;
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
