"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var format_1 = __importDefault(require("./format"));
var required_1 = __importDefault(require("./required"));
var pattern_1 = __importDefault(require("./pattern"));
var custom_1 = __importDefault(require("./custom"));
var batchInvoke = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fns.map(function (fn) { return Promise.resolve(fn.apply(void 0, args)); });
    };
};
var batchValidate = function (value, rule, values, name) {
    return Promise.all(batchInvoke(format_1.default, required_1.default, pattern_1.default, custom_1.default)(value, rule, values, name));
};
exports.validate = function (value, rule, values, name) {
    var newRule = utils_1.isObj(rule)
        ? rule
        : utils_1.isStr(rule)
            ? { format: rule }
            : utils_1.isFn(rule)
                ? { validator: rule }
                : {};
    return batchValidate(value, newRule, values, name);
};
