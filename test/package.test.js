/* global describe, it */

'use strict';

var assert = require('expressive-assertion');
var fs     = require('fs');
var pkg    = require('../package.json');
var path   = require('path');

describe('package.json', function () {
    it('defines an existing primary entry point', function () {
        assert(function () {
            return pkg.main === 'lib/ts.js';
        });

        assert(function () {
            return fs.existsSync(path.join(__dirname, '..', pkg.main));
        });
    });
});
