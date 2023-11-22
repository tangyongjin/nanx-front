"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var message_1 = require("../message");
var isValidateEmpty = function (value) {
    if (typeof value === 'object') {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (!isValidateEmpty(value[key]))
                    return false;
            }
        }
        return true;
    }
    else {
        return utils_1.isEmpty(value);
    }
};
exports.default = (function (value, rule, values, name) {
    if (rule.required) {
        return isValidateEmpty(value)
            ? utils_1.format(rule.message || message_1.getMessage('required'), name)
            : '';
    }
});
