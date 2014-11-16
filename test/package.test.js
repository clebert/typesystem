/* global describe, it */

'use strict';

var assert = require('better-assert');
var fs     = require('fs');
var pkg    = require('../package.json');
var path   = require('path');

describe('package.json', function () {
    it('defines an existing primary entry point', function () {
        assert(pkg.main === 'lib/ts.js');
        assert(fs.existsSync(path.join(__dirname, '..', pkg.main)));
    });
});
