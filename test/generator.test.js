/* jshint maxlen: 160 */
/* global describe, it */

'use strict';

var assert = require('extended-assert');
var generator = require('./generator');

function serialize(objects) {
    return objects.map(function (object) {
        return Object.prototype.toString.call(object).toLowerCase();
    });
}

describe('generator', function () {
    describe('.types()', function () {
        it('returns a sorted array of all types', function () {
            assert.deepEqual(generator.types(), [
                'object:arguments',
                'object:array',
                'object:boolean',
                'object:date',
                'object:error',
                'object:function',
                'object:global',
                'object:json',
                'object:math',
                'object:number',
                'object:plain',
                'object:regex',
                'object:string',
                'primitive:boolean',
                'primitive:number',
                'primitive:string',
                'primitive:void'
            ]);
        });

        it('returns always a new array', function () {
            assert.notStrictEqual(generator.types(), generator.types());
        });
    });

    describe('.typesExcept()', function () {
        it('returns a sorted array of all types except the specified <typeToExclude>', function () {
            assert.deepEqual(generator.typesExcept('object:error'), [
                'object:arguments',
                'object:array',
                'object:boolean',
                'object:date',
                'object:function',
                'object:global',
                'object:json',
                'object:math',
                'object:number',
                'object:plain',
                'object:regex',
                'object:string',
                'primitive:boolean',
                'primitive:number',
                'primitive:string',
                'primitive:void'
            ]);
        });

        it('returns always a new array', function () {
            var typeToExclude = 'object:error';

            assert.notStrictEqual(generator.typesExcept(typeToExclude), generator.typesExcept(typeToExclude));
        });
    });

    describe('.valuesOfType()', function () {
        it('returns a sorted array of all values for the specified <type>', function () {
            assert.deepEqual(serialize(generator.valuesOfType('object')), [
                '[object arguments]',
                '[object array]',
                '[object boolean]',
                '[object date]',
                '[object error]',
                '[object error]',
                '[object error]',
                '[object error]',
                '[object error]',
                '[object error]',
                '[object error]',
                '[object function]',
                '[object global]',
                '[object json]',
                '[object math]',
                '[object number]',
                '[object object]',
                '[object regexp]',
                '[object string]'
            ]);

            assert.deepEqual(serialize(generator.valuesOfType('object:error')), [
                '[object error]',
                '[object error]',
                '[object error]',
                '[object error]',
                '[object error]',
                '[object error]',
                '[object error]'
            ]);

            assert.deepEqual(generator.valuesOfType('primitive'), [
                false,
                true,
                0,
                1,
                Infinity,
                '',
                'string',
                null,
                undefined
            ]);

            assert.deepEqual(generator.valuesOfType('primitive:boolean'), [
                false,
                true
            ]);
        });

        it('returns always a new array', function () {
            var type = 'object:error';

            assert.notStrictEqual(generator.valuesOfType(type), generator.valuesOfType(type));
        });
    });
});
