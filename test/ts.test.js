/* global describe, it */
/* jshint unused: false */

'use strict';

var assertion = require('expressive-assertion');
var ts        = require('../lib/ts.js');

var assert = function (name, expression, expected) {
    /* jshint evil: true */

    try {
        eval(assertion('ts.' + name + '(' + expression + ') === ' + expected));
    } catch (exception) {
        if ((/^Error/).test(exception)) {
            throw exception;
        }
    }
};

var describePredicate = function (name, truthyExpressions) {
    var falsyExpressions = [
        'null',
        'undefined',
        'false',
        'true',
        '0',
        '-Number.MIN_VALUE',
        'Number.MIN_VALUE',
        '-Number.MAX_VALUE',
        'Number.MAX_VALUE',
        '-Infinity',
        'Infinity',
        'NaN',
        '""',
        'Symbol()',
        'arguments',
        '[]',
        'new Boolean()',
        'new Date()',
        'new Error()',
        'new EvalError()',
        'new RangeError()',
        'new ReferenceError()',
        'new SyntaxError()',
        'new TypeError()',
        'new URIError()',
        'new Number()',
        '{}',
        'new RegExp()',
        'new String()',
        'function () {}',
        'function *() {}',
        'function *foo() {}',
        'function*() {}',
        'function*foo() {}',
        'function* foo() {}'
    ].filter(function (expression) {
        return truthyExpressions.every(function (truthyExpression) {
            return truthyExpression !== expression;
        });
    });

    describe('.' + name + '()', function () {
        it('returns false', function () {
            falsyExpressions.forEach(function (falsyExpression) {
                assert(name, falsyExpression, false);
            });
        });

        it('returns true', function () {
            truthyExpressions.forEach(function (truthyExpression) {
                assert(name, truthyExpression, true);
            });
        });
    });
};

describe('ts', function () {
    describePredicate('isNull', [
        'null'
    ]);

    describePredicate('isUndefined', [
        'undefined'
    ]);

    describePredicate('isVoid', [
        'null',
        'undefined'
    ]);

    describePredicate('isBoolean', [
        'false',
        'true'
    ]);

    describePredicate('isNumber', [
        '0',
        '-Number.MIN_VALUE',
        'Number.MIN_VALUE',
        '-Number.MAX_VALUE',
        'Number.MAX_VALUE',
        '-Infinity',
        'Infinity',
        'NaN'
    ]);

    describePredicate('isFinite', [
        '0',
        '-Number.MIN_VALUE',
        'Number.MIN_VALUE',
        '-Number.MAX_VALUE',
        'Number.MAX_VALUE'
    ]);

    describePredicate('isInteger', [
        '0',
        '-Number.MAX_VALUE',
        'Number.MAX_VALUE'
    ]);

    describePredicate('isNaN', [
        'NaN'
    ]);

    describePredicate('isString', [
        '""'
    ]);

    describePredicate('isSymbol', [
        'Symbol()'
    ]);

    describePredicate('isObject', [
        'arguments',
        '[]',
        'new Boolean()',
        'new Date()',
        'new Error()',
        'new EvalError()',
        'new RangeError()',
        'new ReferenceError()',
        'new SyntaxError()',
        'new TypeError()',
        'new URIError()',
        'new Number()',
        '{}',
        'new RegExp()',
        'new String()'
    ]);

    describePredicate('isArgumentsObject', [
        'arguments'
    ]);

    describePredicate('isArray', [
        '[]'
    ]);

    describePredicate('isBooleanObject', [
        'new Boolean()'
    ]);

    describePredicate('isDate', [
        'new Date()'
    ]);

    describePredicate('isError', [
        'new Error()',
        'new EvalError()',
        'new RangeError()',
        'new ReferenceError()',
        'new SyntaxError()',
        'new TypeError()',
        'new URIError()'
    ]);

    describePredicate('isNumberObject', [
        'new Number()'
    ]);

    describePredicate('isPlainObject', [
        '{}'
    ]);

    describePredicate('isRegExp', [
        'new RegExp()'
    ]);

    describePredicate('isStringObject', [
        'new String()'
    ]);

    describePredicate('isFunction', [
        'function () {}',
        'function *() {}',
        'function *foo() {}',
        'function*() {}',
        'function*foo() {}',
        'function* foo() {}'
    ]);

    describePredicate('isGenerator', [
        'function *() {}',
        'function *foo() {}',
        'function*() {}',
        'function*foo() {}',
        'function* foo() {}'
    ]);
});
