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

exports.isVoid = function (value) {
    return value == null;
};

exports.isFloat = function (value) {
    return typeof value === 'number' && isFinite(value);
};

var isInt = function (value) {
    return typeof value === 'number' && (value % 1) === 0;
};

exports.isInt = isInt;

var isInRange = function (value, max, min) {
    return value <= max && value >= min;
};

exports.isInt8 = function (value) {
    return isInt(value) && isInRange(value, 0x7f, -0x80);
};

exports.isInt16 = function (value) {
    return isInt(value) && isInRange(value, 0x7fff, -0x8000);
};

exports.isInt32 = function (value) {
    return isInt(value) && isInRange(value, 0x7fffffff, -0x80000000);
};

exports.isUInt8 = function (value) {
    return isInt(value) && isInRange(value, 0xff, 0);
};

exports.isUInt16 = function (value) {
    return isInt(value) && isInRange(value, 0xffff, 0);
};

exports.isUInt32 = function (value) {
    return isInt(value) && isInRange(value, 0xffffffff, 0);
};
