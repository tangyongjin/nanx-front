"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var locale_1 = __importDefault(require("./locale"));
var self = utils_1.globalThisPolyfill;
var getBrowserlanguage = function () {
    if (!self.navigator) {
        return 'en';
    }
    return self.navigator.browserlanguage || self.navigator.language || 'en';
};
var LOCALE = {
    messages: {},
    lang: getBrowserlanguage()
};
var getMatchLang = function (lang) {
    var find = LOCALE.lang;
    utils_1.each(LOCALE.messages, function (messages, key) {
        if (key.indexOf(lang) > -1 || String(lang).indexOf(key) > -1) {
            find = key;
            return false;
        }
    });
    return find;
};
exports.setLocale = function (locale) {
    Object.assign(LOCALE.messages, locale);
};
exports.setLanguage = function (lang) {
    LOCALE.lang = lang;
};
exports.getMessage = function (path) {
    return (utils_1.getIn(LOCALE.messages, getMatchLang(LOCALE.lang) + "." + path) ||
        'field is not valid,but not found error message.');
};
exports.setLocale(locale_1.default);
