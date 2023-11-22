"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var message_1 = require("../message");
var pattern_1 = require("./pattern");
var regexp_1 = __importDefault(require("./regexp"));
var PatternKeys = Object.keys(regexp_1.default);
var batchValidate = function (value, rule, values, name) {
    for (var i = 0; i < PatternKeys.length; i++) {
        if (PatternKeys[i] === rule.format) {
            return pattern_1.patternValidate(regexp_1.default[PatternKeys[i]], value, utils_1.format(rule.message || message_1.getMessage(rule.format), name, value));
        }
    }
};
exports.default = (function (value, rule, values, name) {
    return batchValidate(value, rule, values, name);
});
