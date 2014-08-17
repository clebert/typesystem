/* global describe, it */

'use strict';

var assert = require('extended-assert');
var ts     = require('../lib/ts');
var g      = require('./generator');

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

var MAX_SAFE_INTEGER = 9007199254740991;
var MIN_SAFE_INTEGER = -9007199254740991;

var testInt = function (predicate, max, min) {
    it('returns false', function () {
        g.getValuesExcept([
            'Number'
        ]).concat([
            max === MAX_SAFE_INTEGER ? Infinity : max + 1,
            min === MIN_SAFE_INTEGER ? -Infinity : min - 1,
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
            max,
            min,
            0,
            1
        ].forEach(function (value) {
            assert.strictEqual(predicate(value), true);
        });
    });
};

describe('ts', function () {
    describe('.check()', function () {
        var truthy = function () {
            return 1;
        };

        var falsy = function () {
            return 0;
        };

        it('returns the <value>', function () {
            assert.strictEqual(ts.check('abc', truthy), 'abc');
            assert.strictEqual(ts.check('abc', truthy, 'xyz'), 'abc');

            assert.strictEqual(ts.check(0, truthy), 0);
            assert.strictEqual(ts.check(0, truthy, 123), 0);

            assert.strictEqual(ts.check(null, truthy), null);
            assert.strictEqual(ts.check(void 0, truthy), void 0);
        });

        it('returns the <defaultValue>', function () {
            assert.strictEqual(ts.check(null, truthy, 'xyz'), 'xyz');
            assert.strictEqual(ts.check(null, falsy, 'xyz'), 'xyz');

            assert.strictEqual(ts.check(void 0, truthy, 'xyz'), 'xyz');
            assert.strictEqual(ts.check(void 0, falsy, 'xyz'), 'xyz');
        });

        it('throws a type error', function () {
            assert.throwsError(function () {
                ts.check('abc', falsy);
            }, 'TypeError', 'Illegal argument: "abc"');

            assert.throwsError(function () {
                ts.check('abc', falsy, 'xyz');
            }, 'TypeError', 'Illegal argument: "abc"');

            assert.throwsError(function () {
                ts.check(0, falsy);
            }, 'TypeError', 'Illegal argument: 0');

            assert.throwsError(function () {
                ts.check(0, falsy, 'xyz');
            }, 'TypeError', 'Illegal argument: 0');

            assert.throwsError(function () {
                ts.check(null, falsy);
            }, 'TypeError', 'Illegal argument: null');

            assert.throwsError(function () {
                ts.check(void 0, falsy);
            }, 'TypeError', 'Illegal argument: undefined');
        });

        it('passes the <value> to the <predicate>', function () {
            var called = 0;

            var predicate = function (value) {
                assert.strictEqual(value, 'abc');

                called += 1;

                return true;
            };

            ts.check('abc', predicate);

            assert.strictEqual(called, 1);
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

    describe('.isVoid()', function () {
        testPredicate(ts.isVoid, [
            'Null',
            'Undefined'
        ]);
    });

    describe('.isFloat()', function () {
        var predicate = ts.isFloat;

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
                Number.MAX_VALUE,
                Number.MIN_VALUE,
                0.1,
                1.1,
                0,
                1
            ].forEach(function (value) {
                assert.strictEqual(predicate(value), true);
            });
        });
    });

    describe('.isInt()', function () {
        testInt(ts.isInt, MAX_SAFE_INTEGER, MIN_SAFE_INTEGER);
    });

    describe('.isInt8()', function () {
        testInt(ts.isInt8, 127, -128);
    });

    describe('.isInt16()', function () {
        testInt(ts.isInt16, 32767, -32768);
    });

    describe('.isInt32()', function () {
        testInt(ts.isInt32, 2147483647, -2147483648);
    });

    describe('.isUInt8()', function () {
        testInt(ts.isUInt8, 255, 0);
    });

    describe('.isUInt16()', function () {
        testInt(ts.isUInt16, 65535, 0);
    });

    describe('.isUInt32()', function () {
        testInt(ts.isUInt32, 4294967295, 0);
    });
});
