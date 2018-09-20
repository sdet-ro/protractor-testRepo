'use strict';
let Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    onPrepare: function () {
        browser.manage().timeouts().setScriptTimeout(980000);

        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './report',
                showPassed: false,
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                cleanDestination: true,
                fileName: 'htmlReport'
            })
        );
        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayStacktrace: true
                }
            })
        );
        browser.getCapabilities().then((c) => {
            if (c.get('platform') === 'Mac OS X') {
                browser.driver.manage().window().setSize(browserWidth, browserHeight);
            }
        });
    },
    capabilities: {
        'browserName': 'chrome',

        'chromeOptions': {
            args: ['--silent', '--no-sandbox', '--test-type=browser', '--lang=US', '--start-maximized'], //,'--headless', '--disable-gpu'
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'extensions_to_open': '',
                    'default_directory': process.cwd() + '/downloads/'
                },
            }
        },
        'loggingPrefs': {'driver': 'SEVERE', 'server': 'SEVERE', 'browser': 'SEVERE'}

    },

    directConnect: true,
    framework: 'jasmine',

    suites: {
        release: [
            '../specs/**/sandbox9.js'
        ],
    },
    specs: [
        '../**/sandbox10.js'
    ],

// Options to be passed to Jasmine-node.
    keepAlive: false,
    useAllAngular2AppRoots: true,
    getPageTimeout: 3400000,
    DEFAULT_TIMEOUT_INTERVAL: 9500000,
    defaultTimeoutInterval: 3500000,
    allScriptsTimeout: 3400000,
    jasmineNodeOpts: {
        keepAlive: false,
        isVerbose: true,
        showColors: false,
        includeStackTrace: true,
        defaultTimeoutInterval: 9500000,
        print: function () {
        }
    }
};
