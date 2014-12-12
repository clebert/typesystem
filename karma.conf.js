'use strict';

if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
}

var customLaunchers = {
    ChromeLatest: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: ''
    }
};

module.exports = function (config) {
    config.set({
        autoWatch: false,
        browsers: Object.keys(customLaunchers),
        captureTimeout: 120000,
        colors: true,
        customLaunchers: customLaunchers,
        files: [
            'test/ts.test.js'
        ],
        frameworks: [
            'browserify',
            'mocha'
        ],
        logLevel: 'LOG_DEBUG',
        preprocessors: {
            'test/ts.test.js': 'browserify'
        },
        reporters: [
            'saucelabs'
        ],
        sauceLabs: {
            connectOptions: {
                port: 5757
            },
            recordScreenshots: false
        },
        singleRun: true,
        browserify: {
            debug: true
        }
    });
};
