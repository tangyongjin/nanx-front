"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isType = function (type) { return function (obj) {
    return obj != null && Object.prototype.toString.call(obj) === "[object " + type + "]";
}; };
exports.isFn = isType('Function');
exports.isArr = Array.isArray || isType('Array');
exports.isPlainObj = isType('Object');
exports.isStr = isType('String');
exports.isBool = isType('Boolean');
exports.isNum = isType('Number');
exports.isObj = function (val) { return typeof val === 'object'; };
exports.isRegExp = isType('RegExp');
