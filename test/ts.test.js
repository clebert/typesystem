/* global describe, it */
/* jshint evil: true */

'use strict';

var assert = require('better-assert');
var ts     = require('../lib/ts.js');

describe('ts', function () {
    describe('.getTypeOf()', function () {
        it('returns "null"', function () {
            assert(ts.getTypeOf(null) === 'null');
        });

        it('returns "undefined"', function () {
            assert(ts.getTypeOf(undefined) === 'undefined');
        });

        it('returns "boolean"', function () {
            assert(ts.getTypeOf(false) === 'boolean');
            assert(ts.getTypeOf(true) === 'boolean');
        });

        it('returns "number"', function () {
            assert(ts.getTypeOf(0) === 'number');
            assert(ts.getTypeOf(Infinity) === 'number');
            assert(ts.getTypeOf(NaN) === 'number');
        });

        it('returns "string"', function () {
            assert(ts.getTypeOf('') === 'string');
        });

        it('returns "symbol"', function () {
            try {
                assert(ts.getTypeOf(eval('Symbol()')) === 'symbol');
            } catch (exception) {
                if ((/^AssertionError/).test(exception)) {
                    throw exception;
                }
            }
        });

        it('returns "object"', function () {
            assert(ts.getTypeOf([]) === 'object');
            assert(ts.getTypeOf({}) === 'object');
        });

        it('returns "function"', function () {
            assert(ts.getTypeOf(function () {}) === 'function');
        });
    });

    describe('.isFinite()', function () {
        it('returns false', function () {
            assert(ts.isFinite(undefined) === false);
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
            assert(ts.isInteger(undefined) === false);
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
            assert(ts.isNaN(undefined) === false);
        });

        it('returns true', function () {
            assert(ts.isNaN(NaN) === true);
        });
    });

    describe('.isVoid()', function () {
        it('returns false', function () {
            assert(ts.isVoid(NaN) === false);
        });

        it('returns true', function () {
            assert(ts.isVoid(null) === true);
            assert(ts.isVoid(undefined) === true);
        });
    });

    describe('.isGenerator()', function () {
        it('returns false', function () {
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
                if ((/^AssertionError/).test(exception)) {
                    throw exception;
                }
            }
        });
    });
});
