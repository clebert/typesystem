/* jshint eqnull: true */

'use strict';

var functionToString = Function.prototype.call.bind(Function.prototype.toString);

exports.getTypeOf = function (value) {
    return value === null ? 'null' : typeof value;
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

exports.isVoid = function (value) {
    return value == null;
};

exports.isGenerator = function (value) {
    return typeof value === 'function' && (/^function\s*\*/).test(functionToString(value));
};

exports.isNull = function (value) {
    return value === null;
};
