'use strict';

var objectToString = Function.prototype.call.bind(Object.prototype.toString);

function createTesterMap() {
    var testerMap = Object.create(null);

    testerMap['object'] = function (value) {
        switch (typeof value) {
        case 'function':
        case 'object':
            return value;
        }

        return false;
    };

    testerMap['object:arguments'] = function (value) {
        return objectToString(value) === '[object Arguments]';
    };

    testerMap['object:array'] = function (value) {
        return objectToString(value) === '[object Array]';
    };

    testerMap['object:boolean'] = function (value) {
        return typeof value === 'object' && objectToString(value) === '[object Boolean]';
    };

    testerMap['object:date'] = function (value) {
        return objectToString(value) === '[object Date]';
    };

    testerMap['object:error'] = function (value) {
        return objectToString(value) === '[object Error]';
    };

    testerMap['object:function'] = function (value) {
        return typeof value === 'function';
    };

    testerMap['object:global'] = function (value) {
        switch (objectToString(value)) {
        case '[object global]':
        case '[object Window]':
        case '[object DOMWindow]':
            return true;
        }

        return false;
    };

    testerMap['object:json'] = function (value) {
        return objectToString(value) === '[object JSON]';
    };

    testerMap['object:math'] = function (value) {
        return objectToString(value) === '[object Math]';
    };

    testerMap['object:number'] = function (value) {
        return typeof value === 'object' && objectToString(value) === '[object Number]';
    };

    testerMap['object:plain'] = function (value) {
        return objectToString(value) === '[object Object]';
    };

    testerMap['object:regex'] = function (value) {
        return objectToString(value) === '[object RegExp]';
    };

    testerMap['object:string'] = function (value) {
        return typeof value === 'object' && objectToString(value) === '[object String]';
    };

    testerMap['primitive'] = function (value) {
        switch (typeof value) {
        case 'function':
        case 'object':
            return !value;
        }

        return true;
    };

    testerMap['primitive:boolean'] = function (value) {
        return typeof value === 'boolean';
    };

    testerMap['primitive:number'] = function (value) {
        return typeof value === 'number';
    };

    testerMap['primitive:string'] = function (value) {
        return typeof value === 'string';
    };

    testerMap['primitive:void'] = function (value) {
        return value == null;
    };

    return testerMap;
}

function quote(value) {
    return '"' + value + '"';
}

function TypeSystem() {
    var self = this;
    var testerMap = createTesterMap();

    function checkType(value, name, type) {
        if (!testerMap[type](value)) {
            throw new TypeError('The <' + name + '> must be of type: ' + quote(type));
        }

        return value;
    }

    self.checkType = checkType;

    function defineType(name, supertype, tester) {
        checkType(name, 'name', 'primitive:string');
        checkType(supertype, 'supertype', 'primitive:string');
        checkType(tester, 'tester', 'object:function');

        if (!/^[a-z]+$/.test(name)) {
            throw new SyntaxError('The <name> must consist only of lowercase letters.');
        }

        if (!testerMap[supertype]) {
            throw new Error('The <supertype> must exist: ' + quote(supertype));
        }

        var type = supertype + ':' + name;

        if (testerMap[type]) {
            throw new Error('The new type already exist: ' + quote(type));
        }

        var superTester = testerMap[supertype];

        testerMap[type] = function (value) {
            return superTester(value) && tester.call(self, value);
        };

        return type;
    }

    self.defineType = defineType;

    self.defineFiniteNumberType = function () {
        return defineType('finite', 'primitive:number', isFinite);
    };

    self.defineIntegerNumberType = function () {
        return defineType('integer', 'primitive:number', function (number) {
            return number === (number | 0);
        });
    };

    self.hasType = function (type) {
        return !!testerMap[type];
    };

    self.testType = function (value, type) {
        return !!testerMap[type](value);
    };

    self.types = function () {
        return Object.keys(testerMap).sort();
    };
}

exports.createTypeSystem = function () {
    return new TypeSystem();
};
