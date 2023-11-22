"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@uform/types");
var isArray = types_1.isArr;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
function equal(a, b, filter) {
    if (a === b) {
        return true;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        var arrA = isArray(a);
        var arrB = isArray(b);
        var i = void 0;
        var length_1;
        var key = void 0;
        if (arrA && arrB) {
            length_1 = a.length;
            if (length_1 !== b.length) {
                return false;
            }
            for (i = length_1; i-- !== 0;) {
                if (!equal(a[i], b[i], filter)) {
                    return false;
                }
            }
            return true;
        }
        if (arrA !== arrB) {
            return false;
        }
        var dateA = a instanceof Date;
        var dateB = b instanceof Date;
        if (dateA !== dateB) {
            return false;
        }
        if (dateA && dateB) {
            return a.getTime() === b.getTime();
        }
        var regexpA = a instanceof RegExp;
        var regexpB = b instanceof RegExp;
        if (regexpA !== regexpB) {
            return false;
        }
        if (regexpA && regexpB) {
            return a.toString() === b.toString();
        }
        var urlA = a instanceof URL;
        var urlB = b instanceof URL;
        if (urlA && urlB) {
            return a.href === b.href;
        }
        var keys = keyList(a);
        length_1 = keys.length;
        if (length_1 !== keyList(b).length) {
            return false;
        }
        for (i = length_1; i-- !== 0;) {
            if (!hasProp.call(b, keys[i])) {
                return false;
            }
        }
        for (i = length_1; i-- !== 0;) {
            key = keys[i];
            if (key === '_owner' && a.$$typeof) {
                continue;
            }
            else {
                if (types_1.isFn(filter)) {
                    if (filter({ a: a[key], b: b[key] }, key)) {
                        if (!equal(a[key], b[key], filter)) {
                            return false;
                        }
                    }
                }
                else {
                    if (!equal(a[key], b[key], filter)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    if (a && b && typeof a === 'function' && typeof b === 'function') {
        return a.toString() === b.toString();
    }
    return a !== a && b !== b;
}
exports.isEqual = function exportedEqual(a, b, filter) {
    try {
        return equal(a, b, filter);
    }
    catch (error) {
        if ((error.message && error.message.match(/stack|recursion/i)) ||
            error.number === -2146828260) {
            console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
            return false;
        }
        throw error;
    }
};
