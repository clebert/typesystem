/* eslint no-eq-null: 0 */

'use strict';

var objectToString = Function.prototype.call.bind(Object.prototype.toString);

exports.checkOptional = function (argument, name, predicate, defaultValue) {
    if (argument == null) {
        return defaultValue;
    }

    if (!predicate(argument)) {
        throw new Error('Illegal argument: [' + name + ']');
    }

    return argument;
};

exports.checkRequired = function (argument, name, predicate) {
    if (!predicate(argument)) {
        throw new Error('Illegal argument: ' + name);
    }

    return argument;
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

exports.isDecimal = function (value) {
    return typeof value === 'number' && isFinite(value);
};

exports.isInteger = function (value) {
    return typeof value === 'number' && value === (value | 0);
};

exports.isVoid = function (value) {
    return value == null;
};
