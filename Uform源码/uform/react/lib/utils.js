"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@uform/utils");
__export(require("@uform/utils"));
exports.isNum = function (value) {
    return typeof value === 'number';
};
exports.isNotEmptyStr = function (str) { return !!(utils_1.isStr(str) && str); };
exports.flatArr = function (arr) {
    return arr.reduce(function (buf, item) {
        return utils_1.isArr(item) ? buf.concat(exports.flatArr(item)) : buf.concat(item);
    }, []);
};
exports.compose = function (payload, args, revert) {
    return utils_1.reduce(args, function (buf, fn) {
        return utils_1.isFn(fn) ? fn(buf) : buf;
    }, payload, revert);
};
exports.createHOC = function (wrapper) { return function (options) { return function (Target) {
    return wrapper(__assign({}, options), Target);
}; }; };
exports.filterSchema = function (_, key) {
    return ['items', 'properties'].indexOf(key) < 0;
};
exports.filterSchemaPropertiesAndReactChildren = function (_, key) {
    return ['items', 'properties', 'children'].indexOf(key) < 0;
};
