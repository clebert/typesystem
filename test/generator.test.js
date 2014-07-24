/* global describe, it */

'use strict';

var assert = require('extended-assert');
var generator = require('./generator');

var serialize = function (values) {
    return values.map(function (value) {
        var type = typeof value;

        switch (type) {
            case 'boolean':
            case 'number':
            case 'string':
                return type + ':' + value;
            default:
                return Object.prototype.toString.call(value);
        }
    });
};

describe('generator', function () {
    describe('.getValues()', function () {
        it('returns an array of all values of the specified <types>', function () {
            assert.deepEqual(serialize(generator.getValues([
                'Arguments'
            ])), [
                '[object Arguments]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Array'
            ])), [
                '[object Array]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Boolean'
            ])), [
                'boolean:false',
                'boolean:true'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Date'
            ])), [
                '[object Date]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Error'
            ])), [
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Function'
            ])), [
                '[object Function]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Null'
            ])), [
                '[object Null]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Number'
            ])), [
                'number:0',
                'number:1',
                'number:Infinity',
                'number:NaN'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Object'
            ])), [
                '[object Object]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'RegExp'
            ])), [
                '[object RegExp]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'String'
            ])), [
                'string:',
                'string:dummy'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Undefined'
            ])), [
                '[object Undefined]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Misc'
            ])), [
                '[object global]',
                '[object JSON]',
                '[object Math]',
                '[object Boolean]',
                '[object Number]',
                '[object String]'
            ]);

            assert.deepEqual(serialize(generator.getValues([
                'Null',
                'Undefined',
                'Error'
            ])), [
                '[object Null]',
                '[object Undefined]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]'
            ]);
        });
    });

    describe('.getValuesExcept()', function () {
        it('returns an array of all values not of the specified <types>', function () {
            assert.deepEqual(serialize(generator.getValuesExcept([
                'Boolean',
                'Number',
                'String'
            ])), [
                '[object Arguments]',
                '[object Array]',
                '[object Date]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Function]',
                '[object Null]',
                '[object Object]',
                '[object RegExp]',
                '[object Undefined]',
                '[object global]',
                '[object JSON]',
                '[object Math]',
                '[object Boolean]',
                '[object Number]',
                '[object String]'
            ]);
        });
    });
});
