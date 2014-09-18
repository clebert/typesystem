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

var testInt = function (predicate, min, max) {
    it('returns false', function () {
        g.getValuesExcept([
            'Number'
        ]).concat([
            NaN,
            -Infinity,
            Infinity,
            -Math.PI,
            Math.PI,
            min - 1,
            max + 1
        ]).forEach(function (value) {
            assert.strictEqual(predicate(value), false);
        });
    });

    it('returns true', function () {
        [
            min,
            max,
            -0,
            0
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
            assert.strictEqual(ts.check('foo', truthy), 'foo');
            assert.strictEqual(ts.check('foo', truthy, 'bar'), 'foo');

            assert.strictEqual(ts.check(0, truthy), 0);
            assert.strictEqual(ts.check(0, truthy, 123), 0);

            assert.strictEqual(ts.check(null, truthy), null);
            assert.strictEqual(ts.check(void 0, truthy), void 0);
        });

        it('returns the <defaultValue>', function () {
            assert.strictEqual(ts.check(null, truthy, 'bar'), 'bar');
            assert.strictEqual(ts.check(null, falsy, 'bar'), 'bar');

            assert.strictEqual(ts.check(void 0, truthy, 'bar'), 'bar');
            assert.strictEqual(ts.check(void 0, falsy, 'bar'), 'bar');
        });

        it('throws a type error', function () {
            assert.throwsError(function () {
                ts.check('foo', falsy);
            }, 'TypeError', 'Illegal argument: "foo"');

            assert.throwsError(function () {
                ts.check('foo', falsy, 'bar');
            }, 'TypeError', 'Illegal argument: "foo"');

            assert.throwsError(function () {
                ts.check(0, falsy);
            }, 'TypeError', 'Illegal argument: 0');

            assert.throwsError(function () {
                ts.check(0, falsy, 'bar');
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
                assert.strictEqual(value, 'foo');

                called += 1;

                return true;
            };

            ts.check('foo', predicate);

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

    describe('.isFinite()', function () {
        var predicate = ts.isFinite;

        it('returns false', function () {
            g.getValuesExcept([
                'Number'
            ]).concat([
                NaN,
                -Infinity,
                Infinity
            ]).forEach(function (value) {
                assert.strictEqual(predicate(value), false);
            });
        });

        it('returns true', function () {
            [
                -Math.PI,
                Math.PI,
                Number.MIN_VALUE,
                Number.MAX_VALUE,
                -MAX_SAFE_INTEGER,
                MAX_SAFE_INTEGER,
                -0,
                0
            ].forEach(function (value) {
                assert.strictEqual(predicate(value), true);
            });
        });
    });

    describe('.isNaN()', function () {
        var predicate = ts.isNaN;

        it('returns false', function () {
            g.getValuesExcept([
                'Number'
            ]).concat([
                -Infinity,
                Infinity,
                -Math.PI,
                Math.PI,
                Number.MIN_VALUE,
                Number.MAX_VALUE,
                -MAX_SAFE_INTEGER,
                MAX_SAFE_INTEGER,
                -0,
                0
            ]).forEach(function (value) {
                assert.strictEqual(predicate(value), false);
            });
        });

        it('returns true', function () {
            assert.strictEqual(predicate(NaN), true);
        });
    });

    describe('.isInt()', function () {
        testInt(ts.isInt, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    });

    describe('.isInt8()', function () {
        testInt(ts.isInt8, -128, 127);
    });

    describe('.isInt16()', function () {
        testInt(ts.isInt16, -32768, 32767);
    });

    describe('.isInt32()', function () {
        testInt(ts.isInt32, -2147483648, 2147483647);
    });

    describe('.isUInt()', function () {
        testInt(ts.isUInt, 0, MAX_SAFE_INTEGER);
    });

    describe('.isUInt8()', function () {
        testInt(ts.isUInt8, 0, 255);
    });

    describe('.isUInt16()', function () {
        testInt(ts.isUInt16, 0, 65535);
    });

    describe('.isUInt32()', function () {
        testInt(ts.isUInt32, 0, 4294967295);
    });
});
