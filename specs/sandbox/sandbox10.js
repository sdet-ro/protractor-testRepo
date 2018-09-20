'use strict';
const {panel} = require("../../constants/index");
const {Utils} = require('../../modules/index');

describe('demo test', function () {
    afterEach(function () {
        // Utils.testBrowserLogs();
    });

    it('should load successfully', function () {
        browser.ignoreSynchronization = true;
        browser.get(panel.webPage);
        expect(browser.getCurrentUrl()).toBe(panel.webPage);
    });
    it('should open demo request', function () {
        let requestBtn = $(panel.requestBtn);
        Utils.smartWait(1, requestBtn);
        requestBtn.click();
    });
    it('close open demo request', function () {
        let requestBtnClose = $(panel.closeBtn);
        Utils.smartWait(1, requestBtnClose);
        requestBtnClose.click();
        Utils.smartWait('not', $(panel.overlay))
    });
    it('should browse to contact page', function () {
        let ContactBTN = element(by.cssContainingText(panel.li, panel.Contact));

        Utils.smartWait(1, ContactBTN);
        ContactBTN.click();
    });
    it('should browse to knowleadge base', function () {
        let knowleadgeBaseBtn = element(by.cssContainingText('a', panel.kwBase));

        Utils.smartWait(1, knowleadgeBaseBtn);
        knowleadgeBaseBtn.click();
    });
    it('should browse to knowleadge base', function () {
        let searchBar = $(panel.searchBar)

        Utils.smartWait(1, searchBar);
        searchBar.click();
        Utils.slowType(searchBar, panel.Contact, 30);
        searchBar.sendKeys(protractor.Key.ENTER);
    });
    it('should browse to 1st article ', function () {
        let stTitle = $$(panel.results).get(1);

        Utils.smartWait(1, stTitle);
        Utils.smartWait(2000);

        stTitle.click();

    });
    it('should assert article author ', function () {
        let stTitle = $(panel.author);
        expect(stTitle.getText()).toBe('Rob Hatley');
    });
    it('should assert article date ', function () {
        let updateDate = $(panel.meta);

        updateDate.getText().then(function (value) {
            expect(value.includes('2018')).toBe(true);
        })
    });



});
