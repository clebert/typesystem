/* global describe, it */
/* jshint unused: false */

'use strict';

var assertion = require('expressive-assertion');
var fs        = require('fs');
var pkg       = require('../package.json');
var path      = require('path');

describe('package.json', function () {
    it('defines an existing primary entry point', function () {
        /* jshint evil: true */

        eval(assertion('pkg.main === "lib/ts.js"'));
        eval(assertion('fs.existsSync(path.join(__dirname, "..", pkg.main))'));
    });
});
