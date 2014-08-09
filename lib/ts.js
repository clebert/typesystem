/* eslint no-eq-null: 0 */

'use strict';

var objectToString = Function.prototype.call.bind(Object.prototype.toString);

exports.check = function (value, predicate, defaultValue) {
    if (value == null && arguments.length > 2) {
        return defaultValue;
    }

    if (!predicate(value)) {
        throw new TypeError('Illegal argument: ' + JSON.stringify(value));
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

exports.isFloat = function (value) {
    return typeof value === 'number' && isFinite(value);
};

exports.isInteger = function (value) {
    return typeof value === 'number' && value === (value | 0);
};

exports.isVoid = function (value) {
    return value == null;
};
