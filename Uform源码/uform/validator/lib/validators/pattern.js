"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var message_1 = require("../message");
exports.patternValidate = function (pattern, value, message) {
    if (utils_1.isEmpty(value)) {
        return '';
    }
    if (utils_1.isRegExp(pattern)) {
        pattern.lastIndex = 0;
    }
    var valid = utils_1.isFn(pattern)
        ? pattern(value)
        : utils_1.isRegExp(pattern)
            ? pattern.test(String(value))
            : new RegExp(String(pattern)).test(String(value));
    return !valid ? message : '';
};
exports.default = (function (value, rule, values, name) {
    if (rule.pattern) {
        return exports.patternValidate(rule.pattern, value, utils_1.format(rule.message || message_1.getMessage('pattern'), name, value, rule.pattern));
    }
});
