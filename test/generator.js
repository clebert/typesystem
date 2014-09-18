/* jshint -W009, -W010, -W053, -W054 */

'use strict';

var MAX_SAFE_INTEGER = 9007199254740991;

var valuesMap = {
    Arguments: [
        (function () {
            return arguments;
        }())
    ],
    Array: [
        [],
        new Array()
    ],
    Boolean: [
        false,
        true
    ],
    Date: [
        new Date()
    ],
    Error: [
        new Error(),
        new EvalError(),
        new RangeError(),
        new ReferenceError(),
        new SyntaxError(),
        new TypeError(),
        new URIError()
    ],
    Function: [
        function () {},
        new Function()
    ],
    Null: [
        null
    ],
    Number: [
        NaN,
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
    ],
    Object: [
        {},
        new Object()
    ],
    RegExp: [
        /(?:)/,
        new RegExp()
    ],
    String: [
        '',
        'foo'
    ],
    Undefined: [
        undefined,
        void 0
    ],
    Misc: [
        global,
        JSON,
        Math,
        new Boolean(),
        new Number(),
        new String()
    ]
};

exports.getValues = function (types) {
    return types.reduce(function (values, type) {
        return values.concat(valuesMap[type]);
    }, []);
};

exports.getValuesExcept = function (typesToExclude) {
    return Object.keys(valuesMap).filter(function (type) {
        return typesToExclude.every(function (typeToExclude) {
            return type !== typeToExclude;
        });
    }).reduce(function (values, type) {
        return values.concat(valuesMap[type]);
    }, []);
};
