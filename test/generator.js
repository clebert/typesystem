/* eslint no-new-wrappers: 0 */

'use strict';

var valuesMap = {
    Arguments: [
        (function () {
            return arguments;
        }())
    ],
    Array: [
        []
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
        function () {}
    ],
    Null: [
        null
    ],
    Number: [
        0,
        1,
        Infinity,
        NaN
    ],
    Object: [
        {}
    ],
    RegExp: [
        new RegExp()
    ],
    String: [
        '',
        'dummy'
    ],
    Undefined: [
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
