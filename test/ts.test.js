/* global describe, it */
/* jshint evil: true, -W053 */

'use strict';

var assert = require('better-assert');
var ts     = require('../lib/ts.js');

var handle = function (exception) {
    if ((/^AssertionError/).test(exception)) {
        throw exception;
    }
};

describe('ts', function () {
    describe('.isNull()', function () {
        it('returns false', function () {
            assert(ts.isNull(undefined) === false);
            assert(ts.isNull(false) === false);
            assert(ts.isNull(0) === false);
            assert(ts.isNull('') === false);
            assert(ts.isNull({}) === false);
            assert(ts.isNull(function () {}) === false);
        });

        it('returns true', function () {
            assert(ts.isNull(null) === true);
        });
    });

    describe('.isUndefined()', function () {
        it('returns false', function () {
            assert(ts.isUndefined(null) === false);
            assert(ts.isUndefined(false) === false);
            assert(ts.isUndefined(0) === false);
            assert(ts.isUndefined('') === false);
            assert(ts.isUndefined({}) === false);
            assert(ts.isUndefined(function () {}) === false);
        });

        it('returns true', function () {
            assert(ts.isUndefined(undefined) === true);
        });
    });

    describe('.isVoid()', function () {
        it('returns false', function () {
            assert(ts.isVoid(false) === false);
            assert(ts.isVoid(0) === false);
            assert(ts.isVoid('') === false);
            assert(ts.isVoid({}) === false);
            assert(ts.isVoid(function () {}) === false);
        });

        it('returns true', function () {
            assert(ts.isVoid(null) === true);
            assert(ts.isVoid(undefined) === true);
        });
    });

    describe('.isBoolean()', function () {
        it('returns false', function () {
            assert(ts.isBoolean(null) === false);
            assert(ts.isBoolean(undefined) === false);
            assert(ts.isBoolean(0) === false);
            assert(ts.isBoolean('') === false);
            assert(ts.isBoolean({}) === false);
            assert(ts.isBoolean(function () {}) === false);
        });

        it('returns true', function () {
            assert(ts.isBoolean(false) === true);
            assert(ts.isBoolean(true) === true);
        });
    });

    describe('.isNumber()', function () {
        it('returns false', function () {
            assert(ts.isNumber(null) === false);
            assert(ts.isNumber(undefined) === false);
            assert(ts.isNumber(false) === false);
            assert(ts.isNumber('') === false);
            assert(ts.isNumber({}) === false);
            assert(ts.isNumber(function () {}) === false);
        });

        it('returns true', function () {
            assert(ts.isNumber(0) === true);
            assert(ts.isNumber(-Number.MIN_VALUE) === true);
            assert(ts.isNumber(Number.MIN_VALUE) === true);
            assert(ts.isNumber(-Number.MAX_VALUE) === true);
            assert(ts.isNumber(Number.MAX_VALUE) === true);
            assert(ts.isNumber(-Infinity) === true);
            assert(ts.isNumber(Infinity) === true);
            assert(ts.isNumber(NaN) === true);
        });
    });

    describe('.isFinite()', function () {
        it('returns false', function () {
            assert(ts.isFinite(null) === false);
            assert(ts.isFinite(undefined) === false);
            assert(ts.isFinite(false) === false);
            assert(ts.isFinite('') === false);
            assert(ts.isFinite({}) === false);
            assert(ts.isFinite(function () {}) === false);

            assert(ts.isFinite(-Infinity) === false);
            assert(ts.isFinite(Infinity) === false);
            assert(ts.isFinite(NaN) === false);
        });

        it('returns true', function () {
            assert(ts.isFinite(0) === true);
            assert(ts.isFinite(-Number.MIN_VALUE) === true);
            assert(ts.isFinite(Number.MIN_VALUE) === true);
            assert(ts.isFinite(-Number.MAX_VALUE) === true);
            assert(ts.isFinite(Number.MAX_VALUE) === true);
        });
    });

    describe('.isInteger()', function () {
        it('returns false', function () {
            assert(ts.isInteger(null) === false);
            assert(ts.isInteger(undefined) === false);
            assert(ts.isInteger(false) === false);
            assert(ts.isInteger('') === false);
            assert(ts.isInteger({}) === false);
            assert(ts.isInteger(function () {}) === false);

            assert(ts.isInteger(-Number.MIN_VALUE) === false);
            assert(ts.isInteger(Number.MIN_VALUE) === false);
            assert(ts.isInteger(-Infinity) === false);
            assert(ts.isInteger(Infinity) === false);
            assert(ts.isInteger(NaN) === false);
        });

        it('returns true', function () {
            assert(ts.isInteger(0) === true);
            assert(ts.isInteger(-Number.MAX_VALUE) === true);
            assert(ts.isInteger(Number.MAX_VALUE) === true);
        });
    });

    describe('.isNaN()', function () {
        it('returns false', function () {
            assert(ts.isNaN(null) === false);
            assert(ts.isNaN(undefined) === false);
            assert(ts.isNaN(false) === false);
            assert(ts.isNaN('') === false);
            assert(ts.isNaN({}) === false);
            assert(ts.isNaN(function () {}) === false);

            assert(ts.isNaN(0) === false);
            assert(ts.isNaN(-Number.MIN_VALUE) === false);
            assert(ts.isNaN(Number.MIN_VALUE) === false);
            assert(ts.isNaN(-Number.MAX_VALUE) === false);
            assert(ts.isNaN(Number.MAX_VALUE) === false);
            assert(ts.isNaN(-Infinity) === false);
            assert(ts.isNaN(Infinity) === false);
        });

        it('returns true', function () {
            assert(ts.isNaN(NaN) === true);
        });
    });

    describe('.isString()', function () {
        it('returns false', function () {
            assert(ts.isString(null) === false);
            assert(ts.isString(undefined) === false);
            assert(ts.isString(false) === false);
            assert(ts.isString(0) === false);
            assert(ts.isString({}) === false);
            assert(ts.isString(function () {}) === false);
        });

        it('returns true', function () {
            assert(ts.isString('') === true);
        });
    });

    describe('.isSymbol()', function () {
        it('returns false', function () {
            assert(ts.isSymbol(null) === false);
            assert(ts.isSymbol(undefined) === false);
            assert(ts.isSymbol(false) === false);
            assert(ts.isSymbol(0) === false);
            assert(ts.isSymbol('') === false);
            assert(ts.isSymbol({}) === false);
            assert(ts.isSymbol(function () {}) === false);
        });

        it('returns true', function () {
            try {
                assert(ts.isSymbol(eval('Symbol()')) === true);
            } catch (exception) {
                handle(exception);
            }
        });
    });

    describe('.isObject()', function () {
        it('returns false', function () {
            assert(ts.isObject(null) === false);
            assert(ts.isObject(undefined) === false);
            assert(ts.isObject(false) === false);
            assert(ts.isObject(0) === false);
            assert(ts.isObject('') === false);
            assert(ts.isObject(function () {}) === false);
        });

        it('returns true', function () {
            assert(ts.isObject(arguments) === true);
            assert(ts.isObject([]) === true);
            assert(ts.isObject(new Boolean()) === true);
            assert(ts.isObject(new Date()) === true);

            assert(ts.isObject(new Error()) === true);
            assert(ts.isObject(new EvalError()) === true);
            assert(ts.isObject(new RangeError()) === true);
            assert(ts.isObject(new ReferenceError()) === true);
            assert(ts.isObject(new SyntaxError()) === true);
            assert(ts.isObject(new TypeError()) === true);
            assert(ts.isObject(new URIError()) === true);

            assert(ts.isObject(new Number()) === true);
            assert(ts.isObject({}) === true);
            assert(ts.isObject(new RegExp()) === true);
            assert(ts.isObject(new String()) === true);
        });
    });

    describe('.isArgumentsObject()', function () {
        it('returns false', function () {
            assert(ts.isArgumentsObject(null) === false);
            assert(ts.isArgumentsObject(undefined) === false);
            assert(ts.isArgumentsObject(false) === false);
            assert(ts.isArgumentsObject(0) === false);
            assert(ts.isArgumentsObject('') === false);
            assert(ts.isArgumentsObject(function () {}) === false);

            assert(ts.isArgumentsObject([]) === false);
            assert(ts.isArgumentsObject(new Boolean()) === false);
            assert(ts.isArgumentsObject(new Date()) === false);

            assert(ts.isArgumentsObject(new Error()) === false);
            assert(ts.isArgumentsObject(new EvalError()) === false);
            assert(ts.isArgumentsObject(new RangeError()) === false);
            assert(ts.isArgumentsObject(new ReferenceError()) === false);
            assert(ts.isArgumentsObject(new SyntaxError()) === false);
            assert(ts.isArgumentsObject(new TypeError()) === false);
            assert(ts.isArgumentsObject(new URIError()) === false);

            assert(ts.isArgumentsObject(new Number()) === false);
            assert(ts.isArgumentsObject({}) === false);
            assert(ts.isArgumentsObject(new RegExp()) === false);
            assert(ts.isArgumentsObject(new String()) === false);
        });

        it('returns true', function () {
            assert(ts.isArgumentsObject(arguments) === true);
        });
    });

    describe('.isArray()', function () {
        it('returns false', function () {
            assert(ts.isArray(null) === false);
            assert(ts.isArray(undefined) === false);
            assert(ts.isArray(false) === false);
            assert(ts.isArray(0) === false);
            assert(ts.isArray('') === false);
            assert(ts.isArray(function () {}) === false);

            assert(ts.isArray(arguments) === false);
            assert(ts.isArray(new Boolean()) === false);
            assert(ts.isArray(new Date()) === false);

            assert(ts.isArray(new Error()) === false);
            assert(ts.isArray(new EvalError()) === false);
            assert(ts.isArray(new RangeError()) === false);
            assert(ts.isArray(new ReferenceError()) === false);
            assert(ts.isArray(new SyntaxError()) === false);
            assert(ts.isArray(new TypeError()) === false);
            assert(ts.isArray(new URIError()) === false);

            assert(ts.isArray(new Number()) === false);
            assert(ts.isArray({}) === false);
            assert(ts.isArray(new RegExp()) === false);
            assert(ts.isArray(new String()) === false);
        });

        it('returns true', function () {
            assert(ts.isArray([]) === true);
        });
    });

    describe('.isBooleanObject()', function () {
        it('returns false', function () {
            assert(ts.isBooleanObject(null) === false);
            assert(ts.isBooleanObject(undefined) === false);
            assert(ts.isBooleanObject(false) === false);
            assert(ts.isBooleanObject(0) === false);
            assert(ts.isBooleanObject('') === false);
            assert(ts.isBooleanObject(function () {}) === false);

            assert(ts.isBooleanObject(arguments) === false);
            assert(ts.isBooleanObject([]) === false);
            assert(ts.isBooleanObject(new Date()) === false);

            assert(ts.isBooleanObject(new Error()) === false);
            assert(ts.isBooleanObject(new EvalError()) === false);
            assert(ts.isBooleanObject(new RangeError()) === false);
            assert(ts.isBooleanObject(new ReferenceError()) === false);
            assert(ts.isBooleanObject(new SyntaxError()) === false);
            assert(ts.isBooleanObject(new TypeError()) === false);
            assert(ts.isBooleanObject(new URIError()) === false);

            assert(ts.isBooleanObject(new Number()) === false);
            assert(ts.isBooleanObject({}) === false);
            assert(ts.isBooleanObject(new RegExp()) === false);
            assert(ts.isBooleanObject(new String()) === false);
        });

        it('returns true', function () {
            assert(ts.isBooleanObject(new Boolean()) === true);
        });
    });

    describe('.isDate()', function () {
        it('returns false', function () {
            assert(ts.isDate(null) === false);
            assert(ts.isDate(undefined) === false);
            assert(ts.isDate(false) === false);
            assert(ts.isDate(0) === false);
            assert(ts.isDate('') === false);
            assert(ts.isDate(function () {}) === false);

            assert(ts.isDate(arguments) === false);
            assert(ts.isDate([]) === false);
            assert(ts.isDate(new Boolean()) === false);

            assert(ts.isDate(new Error()) === false);
            assert(ts.isDate(new EvalError()) === false);
            assert(ts.isDate(new RangeError()) === false);
            assert(ts.isDate(new ReferenceError()) === false);
            assert(ts.isDate(new SyntaxError()) === false);
            assert(ts.isDate(new TypeError()) === false);
            assert(ts.isDate(new URIError()) === false);

            assert(ts.isDate(new Number()) === false);
            assert(ts.isDate({}) === false);
            assert(ts.isDate(new RegExp()) === false);
            assert(ts.isDate(new String()) === false);
        });

        it('returns true', function () {
            assert(ts.isDate(new Date()) === true);
        });
    });

    describe('.isError()', function () {
        it('returns false', function () {
            assert(ts.isError(null) === false);
            assert(ts.isError(undefined) === false);
            assert(ts.isError(false) === false);
            assert(ts.isError(0) === false);
            assert(ts.isError('') === false);
            assert(ts.isError(function () {}) === false);

            assert(ts.isError(arguments) === false);
            assert(ts.isError([]) === false);
            assert(ts.isError(new Boolean()) === false);
            assert(ts.isError(new Date()) === false);
            assert(ts.isError(new Number()) === false);
            assert(ts.isError({}) === false);
            assert(ts.isError(new RegExp()) === false);
            assert(ts.isError(new String()) === false);
        });

        it('returns true', function () {
            assert(ts.isError(new Error()) === true);
            assert(ts.isError(new EvalError()) === true);
            assert(ts.isError(new RangeError()) === true);
            assert(ts.isError(new ReferenceError()) === true);
            assert(ts.isError(new SyntaxError()) === true);
            assert(ts.isError(new TypeError()) === true);
            assert(ts.isError(new URIError()) === true);
        });
    });

    describe('.isNumberObject()', function () {
        it('returns false', function () {
            assert(ts.isNumberObject(null) === false);
            assert(ts.isNumberObject(undefined) === false);
            assert(ts.isNumberObject(false) === false);
            assert(ts.isNumberObject(0) === false);
            assert(ts.isNumberObject('') === false);
            assert(ts.isNumberObject(function () {}) === false);

            assert(ts.isNumberObject(arguments) === false);
            assert(ts.isNumberObject([]) === false);
            assert(ts.isNumberObject(new Boolean()) === false);
            assert(ts.isNumberObject(new Date()) === false);

            assert(ts.isNumberObject(new Error()) === false);
            assert(ts.isNumberObject(new EvalError()) === false);
            assert(ts.isNumberObject(new RangeError()) === false);
            assert(ts.isNumberObject(new ReferenceError()) === false);
            assert(ts.isNumberObject(new SyntaxError()) === false);
            assert(ts.isNumberObject(new TypeError()) === false);
            assert(ts.isNumberObject(new URIError()) === false);

            assert(ts.isNumberObject({}) === false);
            assert(ts.isNumberObject(new RegExp()) === false);
            assert(ts.isNumberObject(new String()) === false);
        });

        it('returns true', function () {
            assert(ts.isNumberObject(new Number()) === true);
        });
    });

    describe('.isPlainObject()', function () {
        it('returns false', function () {
            assert(ts.isPlainObject(null) === false);
            assert(ts.isPlainObject(undefined) === false);
            assert(ts.isPlainObject(false) === false);
            assert(ts.isPlainObject(0) === false);
            assert(ts.isPlainObject('') === false);
            assert(ts.isPlainObject(function () {}) === false);

            assert(ts.isPlainObject(arguments) === false);
            assert(ts.isPlainObject([]) === false);
            assert(ts.isPlainObject(new Boolean()) === false);
            assert(ts.isPlainObject(new Date()) === false);

            assert(ts.isPlainObject(new Error()) === false);
            assert(ts.isPlainObject(new EvalError()) === false);
            assert(ts.isPlainObject(new RangeError()) === false);
            assert(ts.isPlainObject(new ReferenceError()) === false);
            assert(ts.isPlainObject(new SyntaxError()) === false);
            assert(ts.isPlainObject(new TypeError()) === false);
            assert(ts.isPlainObject(new URIError()) === false);

            assert(ts.isPlainObject(new Number()) === false);
            assert(ts.isPlainObject(new RegExp()) === false);
            assert(ts.isPlainObject(new String()) === false);
        });

        it('returns true', function () {
            assert(ts.isPlainObject({}) === true);
        });
    });

    describe('.isRegExp()', function () {
        it('returns false', function () {
            assert(ts.isRegExp(null) === false);
            assert(ts.isRegExp(undefined) === false);
            assert(ts.isRegExp(false) === false);
            assert(ts.isRegExp(0) === false);
            assert(ts.isRegExp('') === false);
            assert(ts.isRegExp(function () {}) === false);

            assert(ts.isRegExp(arguments) === false);
            assert(ts.isRegExp([]) === false);
            assert(ts.isRegExp(new Boolean()) === false);
            assert(ts.isRegExp(new Date()) === false);

            assert(ts.isRegExp(new Error()) === false);
            assert(ts.isRegExp(new EvalError()) === false);
            assert(ts.isRegExp(new RangeError()) === false);
            assert(ts.isRegExp(new ReferenceError()) === false);
            assert(ts.isRegExp(new SyntaxError()) === false);
            assert(ts.isRegExp(new TypeError()) === false);
            assert(ts.isRegExp(new URIError()) === false);

            assert(ts.isRegExp(new Number()) === false);
            assert(ts.isRegExp({}) === false);
            assert(ts.isRegExp(new String()) === false);
        });

        it('returns true', function () {
            assert(ts.isRegExp(new RegExp()) === true);
        });
    });

    describe('.isStringObject()', function () {
        it('returns false', function () {
            assert(ts.isStringObject(null) === false);
            assert(ts.isStringObject(undefined) === false);
            assert(ts.isStringObject(false) === false);
            assert(ts.isStringObject(0) === false);
            assert(ts.isStringObject('') === false);
            assert(ts.isStringObject(function () {}) === false);

            assert(ts.isStringObject(arguments) === false);
            assert(ts.isStringObject([]) === false);
            assert(ts.isStringObject(new Boolean()) === false);
            assert(ts.isStringObject(new Date()) === false);

            assert(ts.isStringObject(new Error()) === false);
            assert(ts.isStringObject(new EvalError()) === false);
            assert(ts.isStringObject(new RangeError()) === false);
            assert(ts.isStringObject(new ReferenceError()) === false);
            assert(ts.isStringObject(new SyntaxError()) === false);
            assert(ts.isStringObject(new TypeError()) === false);
            assert(ts.isStringObject(new URIError()) === false);

            assert(ts.isStringObject(new Number()) === false);
            assert(ts.isStringObject({}) === false);
            assert(ts.isStringObject(new RegExp()) === false);
        });

        it('returns true', function () {
            assert(ts.isStringObject(new String()) === true);
        });
    });

    describe('.isFunction()', function () {
        it('returns false', function () {
            assert(ts.isFunction(null) === false);
            assert(ts.isFunction(undefined) === false);
            assert(ts.isFunction(false) === false);
            assert(ts.isFunction(0) === false);
            assert(ts.isFunction('') === false);
            assert(ts.isFunction({}) === false);
        });

        it('returns true', function () {
            assert(ts.isFunction(function () {}) === true);

            try {
                assert(ts.isFunction(eval('(function () { return function *() {}; }())')) === true);
            } catch (exception) {
                handle(exception);
            }
        });
    });

    describe('.isGenerator()', function () {
        it('returns false', function () {
            assert(ts.isGenerator(null) === false);
            assert(ts.isGenerator(undefined) === false);
            assert(ts.isGenerator(false) === false);
            assert(ts.isGenerator(0) === false);
            assert(ts.isGenerator('') === false);
            assert(ts.isGenerator({}) === false);
            assert(ts.isGenerator(function () {}) === false);
        });

        it('returns true', function () {
            try {
                assert(ts.isGenerator(eval('(function () { return function*() {}; }())')) === true);
                assert(ts.isGenerator(eval('(function () { return function*foo() {}; }())')) === true);

                assert(ts.isGenerator(eval('(function () { return function* () {}; }())')) === true);
                assert(ts.isGenerator(eval('(function () { return function* foo() {}; }())')) === true);

                assert(ts.isGenerator(eval('(function () { return function*  () {}; }())')) === true);
                assert(ts.isGenerator(eval('(function () { return function*  foo() {}; }())')) === true);

                assert(ts.isGenerator(eval('(function () { return function *() {}; }())')) === true);
                assert(ts.isGenerator(eval('(function () { return function *foo() {}; }())')) === true);

                assert(ts.isGenerator(eval('(function () { return function  *() {}; }())')) === true);
                assert(ts.isGenerator(eval('(function () { return function  *foo() {}; }())')) === true);
            } catch (exception) {
                handle(exception);
            }
        });
    });

    describe('.isNull', function () {
        it('returns false', function () {
            assert(ts.isNull({}) === false);
        });

        it('returns true', function () {
            assert(ts.isNull(null) === true);
        });
    });
});
