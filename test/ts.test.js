/* exported assert, ts */
/* global describe, it */

'use strict';

var assert = require('expressive-assertion');
var ts     = require('../lib/ts.js');

var functionExpressions = [
    'function () {}',
    'function *() {}'
];

var objectExpressions = [
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
    'global',
    'window',
    'document',
    'document.createElement("div")',
    'document.createElement("span")',
    'new Number()',
    '{}',
    'new RegExp()',
    'new String()'
];

var primitiveExpressions = [
    'false',
    'true',
    'null',
    'undefined',
    '0',
    '-Number.MIN_VALUE',
    'Number.MIN_VALUE',
    '-Number.MAX_VALUE',
    'Number.MAX_VALUE',
    '-Infinity',
    'Infinity',
    'NaN',
    '""',
    'Symbol()'
];

var expressions = functionExpressions.concat(objectExpressions, primitiveExpressions);

var evalAssert = function (name, expression, expected) {
    /* jshint evil: true */

    try {
        eval('assert(function () { return ts.' + name + '(' + expression + ') === ' + expected + ' })');
    } catch (exception) {
        if (!/^(?:ReferenceError|SyntaxError)/.test(exception)) {
            throw exception;
        }
    }
};

var describePredicate = function (name, truthyExpressions) {
    var falsyExpressions = expressions.filter(function (expression) {
        return truthyExpressions.every(function (truthyExpression) {
            return truthyExpression !== expression;
        });
    });

    describe('.' + name + '()', function () {
        it('returns false', function () {
            falsyExpressions.forEach(function (falsyExpression) {
                evalAssert(name, falsyExpression, false);
            });
        });

        it('returns true', function () {
            truthyExpressions.forEach(function (truthyExpression) {
                evalAssert(name, truthyExpression, true);
            });
        });
    });
};

describe('ts', function () {
    describePredicate('isFunction', functionExpressions);

    describePredicate('isObject', objectExpressions);

    describePredicate('isArgumentsObject', [
        'arguments'
    ]);

    describePredicate('isArrayObject', [
        '[]'
    ]);

    describePredicate('isBooleanObject', [
        'new Boolean()'
    ]);

    describePredicate('isDateObject', [
        'new Date()'
    ]);

    describePredicate('isErrorObject', [
        'new Error()',
        'new EvalError()',
        'new RangeError()',
        'new ReferenceError()',
        'new SyntaxError()',
        'new TypeError()',
        'new URIError()'
    ]);

    describePredicate('isGlobalObject', [
        'global',
        'window'
    ]);

    describePredicate('isDocumentObject', [
        'document'
    ]);

    describePredicate('isElementObject', [
        'document.createElement("div")',
        'document.createElement("span")'
    ]);

    describePredicate('isNumberObject', [
        'new Number()'
    ]);

    describePredicate('isPlainObject', [
        '{}'
    ]);

    describePredicate('isRegExpObject', [
        'new RegExp()'
    ]);

    describePredicate('isStringObject', [
        'new String()'
    ]);

    describePredicate('isPrimitive', primitiveExpressions);

    describePredicate('isBoolean', [
        'false',
        'true'
    ]);

    describePredicate('isNull', [
        'null'
    ]);

    describePredicate('isNullOrUndefined', [
        'null',
        'undefined'
    ]);

    describePredicate('isUndefined', [
        'undefined'
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

    describePredicate('isFiniteNumber', [
        '0',
        '-Number.MIN_VALUE',
        'Number.MIN_VALUE',
        '-Number.MAX_VALUE',
        'Number.MAX_VALUE'
    ]);

    describePredicate('isIntegerNumber', [
        '0',
        '-Number.MAX_VALUE',
        'Number.MAX_VALUE'
    ]);

    describePredicate('isString', [
        '""'
    ]);

    describePredicate('isSymbol', [
        'Symbol()'
    ]);
});
