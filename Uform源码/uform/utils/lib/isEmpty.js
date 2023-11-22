"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var has = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
function isEmpty(val) {
    if (val == null) {
        return true;
    }
    if (typeof val === 'boolean') {
        return false;
    }
    if (typeof val === 'number') {
        return false;
    }
    if (typeof val === 'string') {
        return val.length === 0;
    }
    if (typeof val === 'function') {
        return val.length === 0;
    }
    if (Array.isArray(val)) {
        if (val.length === 0) {
            return true;
        }
        for (var i = 0; i < val.length; i++) {
            if (val[i] !== undefined &&
                val[i] !== null &&
                val[i] !== '' &&
                val[i] !== 0) {
                return false;
            }
        }
        return true;
    }
    if (val instanceof Error) {
        return val.message === '';
    }
    if (val.toString === toString) {
        switch (val.toString()) {
            case '[object File]':
            case '[object Map]':
            case '[object Set]': {
                return val.size === 0;
            }
            case '[object Object]': {
                for (var key in val) {
                    if (has.call(val, key)) {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    return false;
}
exports.isEmpty = isEmpty;
