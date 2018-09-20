'use strict';

const moment = require('moment');
const _ = require('lodash');
const del = require('del');



const EC = protractor.ExpectedConditions;

let testBrowserLogs = function () {
    browser.manage().logs().get('browser').then(function (browserLog) {
        if (browserLog.length > 0) {
            for (let i = browserLog.length - 1; i >= 0; i--) {
                expect("Browser Logged Error Found").toEqual(browserLog[i]);
            }
        } else {
            expect(browserLog.length).toEqual(0);
        }
    });
};

let stringGen = function (len, Numbers) {
    let text = "";
    let charset;
    if (Numbers) {
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    } else {
        charset = "abcdefghijklmnopqrstuvwxyzr";
    }

    for (let i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
};

let slowType = function (elm, keys, delay) {
    for (let i = 0; i < keys.length; i++) {
        browser.sleep(delay);
        elm.sendKeys(keys[i]);
    }
};


let smartWait = function (item1, item2, item3) {
    if(item1 ==='3'){
        ch(item2);
    }
    else if (item1 === 'not') {
        browser.wait(EC.not(EC.visibilityOf(item2)), 45000, 'Item visible!');
    }
    else if (item3 === true) {
        browser.wait(EC.visibilityOf(item2), 45000, 'Item NOT visible');
    } else if (item2) {
        browser.wait(EC.presenceOf(item2), 45000, 'Item NOT present');
    } else {
        browser.driver.sleep(item1);
    }
};


let elByName = (param) => {
    return element(by.name(param));
};

let allByTag= (param, combined) => {
    if(combined){
        return combined.all(by.tagName(param));
    }else{
        return element.all(by.tagName(param));
    }
};

let allByTxt= (paramClass, paramText, combined) => {
    if(combined){
        return combined.all(by.cssContainingText(paramClass, paramText));
    }else{
        return element.all(by.cssContainingText(paramClass, paramText));
    }
};

let byTxt= (paramClass, paramText) => {
    return element(by.cssContainingText(paramClass, paramText));
};
let byModel= (paramClass) => {
    return element(by.model(paramClass));
};


module.exports = {
    byTxt,
    byModel,
    allByTxt,
    elByName,
    allByTag,
    smartWait,
    slowType,
    testBrowserLogs,
    stringGen,

};
