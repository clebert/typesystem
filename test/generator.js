'use strict';

function createObjectsMap() {
    /* jshint -W053 */

    var objectsMap = Object.create(null);

    objectsMap['object:arguments'] = [
        arguments
    ];

    objectsMap['object:array'] = [
        []
    ];

    objectsMap['object:boolean'] = [
        new Boolean()
    ];

    objectsMap['object:date'] = [
        new Date()
    ];

    objectsMap['object:error'] = [
        new Error(),
        new EvalError(),
        new RangeError(),
        new ReferenceError(),
        new SyntaxError(),
        new TypeError(),
        new URIError()
    ];

    objectsMap['object:function'] = [
        function () {}
    ];

    objectsMap['object:global'] = [
        global
    ];

    objectsMap['object:json'] = [
        JSON
    ];

    objectsMap['object:math'] = [
        Math
    ];

    objectsMap['object:number'] = [
        new Number()
    ];

    objectsMap['object:plain'] = [
        {}
    ];

    objectsMap['object:regex'] = [
        new RegExp()
    ];

    objectsMap['object:string'] = [
        new String()
    ];

    return objectsMap;
}

function createPrimitivesMap() {
    var primitivesMap = Object.create(null);

    primitivesMap['primitive:boolean'] = [
        false,
        true
    ];

    primitivesMap['primitive:number'] = [
        0,
        1,
        Infinity
    ];

    primitivesMap['primitive:string'] = [
        '',
        'string'
    ];

    primitivesMap['primitive:void'] = [
        null,
        undefined
    ];

    return primitivesMap;
}

exports.types = function () {
    var objectTypes = Object.keys(createObjectsMap());
    var primitiveTypes = Object.keys(createPrimitivesMap());

    return objectTypes.concat(primitiveTypes).sort();
};

exports.typesExcept = function (typeToExclude) {
    var objectTypes = Object.keys(createObjectsMap());
    var primitiveTypes = Object.keys(createPrimitivesMap());

    return objectTypes.concat(primitiveTypes).filter(function (type) {
        return type !== typeToExclude;
    }).sort();
};

exports.valuesOfType = function (type) {
    var objectsMap = createObjectsMap();

    if (type === 'object') {
        var objectTypes = Object.keys(createObjectsMap()).sort();

        return objectTypes.reduce(function (objects, type) {
            return objects.concat(objectsMap[type]);
        }, []);
    }

    var primitivesMap = createPrimitivesMap();

    if (type === 'primitive') {
        var primitiveTypes = Object.keys(createPrimitivesMap()).sort();

        return primitiveTypes.reduce(function (primitives, type) {
            return primitives.concat(primitivesMap[type]);
        }, []);
    }

    return objectsMap[type] || primitivesMap[type];
};
