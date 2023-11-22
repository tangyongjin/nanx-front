"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
exports.default = (function (value, rule, values, name) {
    if (utils_1.isFn(rule.validator)) {
        return rule.validator(value, rule, values, name);
    }
});
