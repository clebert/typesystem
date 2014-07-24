/* global describe, it */

'use strict';

var assert = require('extended-assert');
var ts = require('../lib/ts');
var g = require('./generator');

var testPredicate = function (predicate, types) {
    it('returns false', function () {
        g.getValuesExcept(types).forEach(function (value) {
            assert.strictEqual(predicate(value), false);
        });
    });

    it('returns true', function () {
        g.getValues(types).forEach(function (value) {
            assert.strictEqual(predicate(value), true);
        });
    });
};

var testCheck = function (check, createErrorMessage) {
    it('throws an error containing the <name> if the <predicate> evaluates to a falsy value', function () {
        var expected = 'name';

        assert.throwsError(function () {
            check('argument', expected, function () {
                return 0;
            });
        }, 'Error', createErrorMessage(expected));
    });

    it('returns the <argument> if the <predicate> evaluates to a truthy value', function () {
        var expected = 'argument';

        assert.strictEqual(check(expected, 'name', function () {
            return 1;
        }), expected);
    });

    it('calls the <predicate> and passes the <argument> to it', function () {
        var called = false;
        var expected = 'argument';

        check(expected, 'name', function (actual) {
            called = true;

            assert.strictEqual(actual, expected);

            return true;
        });

        assert.strictEqual(called, true);
    });
};

describe('ts', function () {
    describe('.checkOptional()', function () {
        it('returns the <defaultValue> and doesn\'t call the <predicate> if the <argument> is void', function () {
            var called = false;
            var expected = 'defaultValue';

            g.getValues([
                'Null',
                'Undefined'
            ]).forEach(function (value) {
                assert.strictEqual(ts.checkOptional(value, 'name', function () {
                    called = true;
                }, expected), expected);
            });

            assert.strictEqual(called, false);
        });

        testCheck(ts.checkOptional, function (name) {
            return 'Illegal argument: [' + name + ']';
        });
    });

    describe('.checkRequired()', function () {
        testCheck(ts.checkRequired, function (name) {
            return 'Illegal argument: ' + name;
        });
    });

    [
        'Arguments',
        'Array',
        'Boolean',
        'Date',
        'Error',
        'Function',
        'Null',
        'Number',
        'Object',
        'RegExp',
        'String',
        'Undefined'
    ].forEach(function (type) {
        describe('.is' + type + '()', function () {
            testPredicate(ts['is' + type], [
                type
            ]);
        });
    });

    describe('.isDecimal()', function () {
        var predicate = ts.isDecimal;

        it('returns false', function () {
            g.getValuesExcept([
                'Number'
            ]).concat([
                Infinity,
                NaN
            ]).forEach(function (value) {
                assert.strictEqual(predicate(value), false);
            });
        });

        it('returns true', function () {
            [
                -2147483649,
                2147483648,
                0.1,
                1.1,
                0,
                1
            ].forEach(function (value) {
                assert.strictEqual(predicate(value), true);
            });
        });
    });

    describe('.isInteger()', function () {
        var predicate = ts.isInteger;

        it('returns false', function () {
            g.getValuesExcept([
                'Number'
            ]).concat([
                -2147483649,
                2147483648,
                0.1,
                1.1,
                Infinity,
                NaN
            ]).forEach(function (value) {
                assert.strictEqual(predicate(value), false);
            });
        });

        it('returns true', function () {
            [
                -2147483648,
                2147483647,
                0,
                1
            ].forEach(function (value) {
                assert.strictEqual(predicate(value), true);
            });
        });
    });

    describe('.isVoid()', function () {
        testPredicate(ts.isVoid, [
            'Null',
            'Undefined'
        ]);
    });
});
