/* jshint maxlen: 160 */
/* global beforeEach, describe, it */

'use strict';

var assert = require('extended-assert');
var createTypeSystem = require('../lib/ts').createTypeSystem;
var g = require('./generator');

describe('.createTypeSystem()', function () {
    it('returns a type system', function () {
        var ts = createTypeSystem();

        assert.strictEqual(Object.prototype.toString.call(ts), '[object Object]');
        assert.strictEqual(typeof ts.checkType, 'function');
        assert.strictEqual(typeof ts.defineFiniteNumberType, 'function');
        assert.strictEqual(typeof ts.defineIntegerNumberType, 'function');
        assert.strictEqual(typeof ts.defineType, 'function');
        assert.strictEqual(typeof ts.hasType, 'function');
        assert.strictEqual(typeof ts.testType, 'function');
        assert.strictEqual(typeof ts.types, 'function');
    });

    it('returns always a new object', function () {
        assert.notStrictEqual(createTypeSystem(), createTypeSystem());
    });
});

describe('TypeSystem', function () {
    var ts;
    var checkType;
    var defineFiniteNumberType;
    var defineIntegerNumberType;
    var defineType;
    var hasType;
    var testType;
    var types;

    beforeEach(function () {
        ts = createTypeSystem();
        checkType = ts.checkType;
        defineFiniteNumberType = ts.defineFiniteNumberType;
        defineIntegerNumberType = ts.defineIntegerNumberType;
        defineType = ts.defineType;
        hasType = ts.hasType;
        testType = ts.testType;
        types = ts.types;
    });

    describe('.checkType()', function () {
        it('calls the tester function within the context of this type system and passes the <value> to it', function () {
            var called = false;

            defineType('foo', 'primitive:number', function (value) {
                called = true;

                assert.strictEqual(this, ts);
                assert.strictEqual(value, 123);

                return true;
            });

            assert.strictEqual(called, false);

            assert.doesNotThrowError(function () {
                checkType(123, 'bar', 'primitive:number:foo');
            }, 'TypeError', 'The <bar> must be of type: "primitive:number:foo"');

            assert.strictEqual(called, true);
        });

        it('calls the super-tester function before calling the tester function', function () {
            defineType('foo', 'primitive:number', function () {
                assert.ok(false);
            });

            assert.throwsError(function () {
                checkType('string', 'bar', 'primitive:number:foo');
            }, 'TypeError', 'The <bar> must be of type: "primitive:number:foo"');
        });

        it('throws an error if the <value> is not of the specified built-in <type>', function () {
            g.types().forEach(function (type) {
                g.typesExcept(type).forEach(function (otherType) {
                    g.valuesOfType(otherType).forEach(function (value) {
                        assert.throwsError(function () {
                            checkType(value, 'bar', type);
                        }, 'TypeError', 'The <bar> must be of type: "' + type + '"');
                    });
                });
            });

            g.valuesOfType('primitive').forEach(function (value) {
                assert.throwsError(function () {
                    checkType(value, 'bar', 'object');
                }, 'TypeError', 'The <bar> must be of type: "object"');
            });

            g.valuesOfType('object').forEach(function (value) {
                assert.throwsError(function () {
                    checkType(value, 'bar', 'primitive');
                }, 'TypeError', 'The <bar> must be of type: "primitive"');
            });
        });

        it('throws an error if the <value> is not of the specified custom <type>', function () {
            defineType('foo', 'primitive:number', function (value) {
                return value === 123;
            });

            assert.throwsError(function () {
                checkType(1234, 'bar', 'primitive:number:foo');
            }, 'TypeError', 'The <bar> must be of type: "primitive:number:foo"');
        });

        it('returns the <value> if it is of the specified built-in <type>', function () {
            g.types().concat('object', 'primitive').forEach(function (type) {
                g.valuesOfType(type).forEach(function (value) {
                    assert.strictEqual(checkType(value, 'bar', type), value);
                });
            });
        });

        it('returns the <value> if it is of the specified custom <type>', function () {
            defineType('foo', 'primitive:number', function (value) {
                return value === 123;
            });

            assert.strictEqual(checkType(123, 'bar', 'primitive:number:foo'), 123);
        });
    });

    describe('.defineFiniteNumberType()', function () {
        var newType = 'primitive:number:finite';

        it('returns "' + newType + '"', function () {
            assert.strictEqual(defineFiniteNumberType(), newType);
        });

        it('throws an error if called twice on the same type system', function () {
            defineFiniteNumberType();

            assert.throwsError(function () {
                defineFiniteNumberType();
            }, 'Error', 'The new type already exist: "' + newType + '"');
        });

        it('defines a new type which accepts only finite numbers', function () {
            assert.strictEqual(hasType(newType), false);

            defineFiniteNumberType();

            assert.strictEqual(hasType(newType), true);

            g.typesExcept('primitive:number').forEach(function (type) {
                g.valuesOfType(type).forEach(function (value) {
                    assert.strictEqual(testType(value, newType), false);
                });
            });

            [
                Infinity,
                NaN
            ].forEach(function (value) {
                assert.strictEqual(testType(value, newType), false);
            });

            [
                0,
                1
            ].forEach(function (value) {
                assert.strictEqual(testType(value, newType), true);
            });
        });
    });

    describe('.defineIntegerNumberType()', function () {
        var newType = 'primitive:number:integer';

        it('returns "' + newType + '"', function () {
            assert.strictEqual(defineIntegerNumberType(), newType);
        });

        it('throws an error if called twice on the same type system', function () {
            defineIntegerNumberType();

            assert.throwsError(function () {
                defineIntegerNumberType();
            }, 'Error', 'The new type already exist: "' + newType + '"');
        });

        it('defines a new type which accepts only integer numbers', function () {
            assert.strictEqual(hasType(newType), false);

            defineIntegerNumberType();

            assert.strictEqual(hasType(newType), true);

            g.typesExcept('primitive:number').forEach(function (type) {
                g.valuesOfType(type).forEach(function (value) {
                    assert.strictEqual(testType(value, newType), false);
                });
            });

            [
                -2147483649,
                2147483648,
                0.1,
                1.1,
                Infinity,
                NaN
            ].forEach(function (value) {
                assert.strictEqual(testType(value, newType), false);
            });

            [
                -2147483648,
                2147483647,
                0,
                1
            ].forEach(function (value) {
                assert.strictEqual(testType(value, newType), true);
            });
        });
    });

    describe('.defineType()', function () {
        it('returns a new type as a combination of the <supertype> and <name>', function () {
            var type = defineType('foo', 'primitive:number', function () {});

            assert.strictEqual(type, 'primitive:number:foo');
        });

        it('accepts a custom type as the <supertype>', function () {
            var supertype = defineType('foo', 'primitive:number', function () {});
            var type = defineType('bar', supertype, function () {});

            assert.strictEqual(type, 'primitive:number:foo:bar');
        });

        it('throws an error if the <name> is not of type "primitive:string"', function () {
            g.typesExcept('primitive:string').forEach(function (type) {
                g.valuesOfType(type).forEach(function (name) {
                    assert.throwsError(function () {
                        defineType(name);
                    }, 'TypeError', 'The <name> must be of type: "primitive:string"');
                });
            });
        });

        it('throws an error if the <supertype> is not of type "primitive:string"', function () {
            g.typesExcept('primitive:string').forEach(function (type) {
                g.valuesOfType(type).forEach(function (supertype) {
                    assert.throwsError(function () {
                        defineType('foo', supertype);
                    }, 'TypeError', 'The <supertype> must be of type: "primitive:string"');
                });
            });
        });

        it('throws an error if the <tester> is not of type "object:function"', function () {
            g.typesExcept('object:function').forEach(function (type) {
                g.valuesOfType(type).forEach(function (tester) {
                    assert.throwsError(function () {
                        defineType('foo', 'primitive:number', tester);
                    }, 'TypeError', 'The <tester> must be of type: "object:function"');
                });
            });
        });

        it('throws an error if the <name> is not lowercase', function () {
            [
                '',
                ' ',
                'Foo',
                ' foo',
                'foo ',
                'primitive:number:foo'
            ].forEach(function (name) {
                assert.throwsError(function () {
                    defineType(name, 'primitive:number', function () {});
                }, 'SyntaxError', 'The <name> must consist only of lowercase letters.');
            });
        });

        it('throws an error if the <supertype> does not exist', function () {
            [
                '',
                ' ',
                'Foo',
                ' foo',
                'foo ',
                'foo',
                'primitive:number:foo',
                'null',
                'undefined'
            ].forEach(function (supertype) {
                assert.throwsError(function () {
                    defineType('foo', supertype, function () {});
                }, 'Error', 'The <supertype> must exist: "' + supertype + '"');
            });
        });

        it('throws an error if the new type already exist as built-in type', function () {
            assert.throwsError(function () {
                defineType('arguments', 'object', function () {});
            }, 'Error', 'The new type already exist: "object:arguments"');
        });

        it('throws an error if the new type already exist as custom type', function () {
            defineType('foo', 'primitive:number', function () {});

            assert.throwsError(function () {
                defineType('foo', 'primitive:number', function () {});
            }, 'Error', 'The new type already exist: "primitive:number:foo"');
        });
    });

    describe('.hasType()', function () {
        it('returns false if the <type> does not exist', function () {
            [
                '',
                ' ',
                'Foo',
                ' foo',
                'foo ',
                'foo',
                'primitive:number:foo',
                'null',
                'undefined'
            ].forEach(function (type) {
                assert.strictEqual(hasType(type), false);
            });
        });

        it('returns true if the <type> already exist as built-in type', function () {
            g.types().concat('object', 'primitive').forEach(function (type) {
                assert.strictEqual(hasType(type), true);
            });
        });

        it('returns true if the <type> already exist as custom type', function () {
            defineType('foo', 'primitive:number', function () {});

            assert.strictEqual(hasType('primitive:number:foo'), true);
        });
    });

    describe('.testType()', function () {
        it('calls the tester function within the context of this type system and passes the <value> to it', function () {
            var called = false;

            defineType('foo', 'primitive:number', function (value) {
                called = true;

                assert.strictEqual(this, ts);
                assert.strictEqual(value, 123);

                return true;
            });

            assert.strictEqual(called, false);

            assert.strictEqual(testType(123, 'primitive:number:foo'), true);

            assert.strictEqual(called, true);
        });

        it('calls the super-tester function before calling the tester function', function () {
            defineType('foo', 'primitive:number', function () {
                assert.ok(false);
            });

            assert.strictEqual(testType('string', 'primitive:number:foo'), false);
        });

        it('returns false if the <value> is not of the specified built-in <type>', function () {
            g.types().forEach(function (type) {
                g.typesExcept(type).forEach(function (otherType) {
                    g.valuesOfType(otherType).forEach(function (value) {
                        assert.strictEqual(testType(value, type), false);
                    });
                });
            });

            g.valuesOfType('primitive').forEach(function (value) {
                assert.strictEqual(testType(value, 'object'), false);
            });

            g.valuesOfType('object').forEach(function (value) {
                assert.strictEqual(testType(value, 'primitive'), false);
            });
        });

        it('returns false if the <value> is not of the specified custom <type>', function () {
            defineType('foo', 'primitive:number', function (value) {
                return value === 123;
            });

            assert.strictEqual(testType(1234, 'primitive:number:foo'), false);
        });

        it('returns true if the <value> is of the specified built-in <type>', function () {
            g.types().concat('object', 'primitive').forEach(function (type) {
                g.valuesOfType(type).forEach(function (value) {
                    assert.strictEqual(testType(value, type), true);
                });
            });
        });

        it('returns true if the <value> is of the specified custom <type>', function () {
            defineType('foo', 'primitive:number', function (value) {
                return value === 123;
            });

            assert.strictEqual(testType(123, 'primitive:number:foo'), true);
        });

        it('returns always a boolean value', function () {
            defineType('foo', 'primitive:number', function (value) {
                return value;
            });

            assert.strictEqual(testType(0, 'primitive:number:foo'), false);
            assert.strictEqual(testType(1, 'primitive:number:foo'), true);
        });
    });

    describe('.types()', function () {
        it('returns a sorted array of only built-in types', function () {
            assert.deepEqual(types(), [
                'object',
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
                'primitive',
                'primitive:boolean',
                'primitive:number',
                'primitive:string',
                'primitive:void'
            ]);
        });

        it('returns a sorted array of all existing types', function () {
            defineType('foo', 'primitive:number', function () {});

            assert.deepEqual(types(), [
                'object',
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
                'primitive',
                'primitive:boolean',
                'primitive:number',
                'primitive:number:foo',
                'primitive:string',
                'primitive:void'
            ]);
        });

        it('returns always a new array', function () {
            assert.notStrictEqual(types(), types());
        });
    });
});
