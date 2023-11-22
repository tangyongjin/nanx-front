"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@uform/types");
var globalThis_1 = require("./globalThis");
var NATIVE_KEYS = [
    ['Map', function (map) { return new Map(map); }],
    ['WeakMap', function (map) { return new WeakMap(map); }],
    ['WeakSet', function (set) { return new WeakSet(set); }],
    ['Set', function (set) { return new Set(set); }],
    ['Date', function (date) { return new Date(date); }],
    'FileList',
    'File',
    'URL',
    'RegExp',
    [
        'Promise',
        function (promise) {
            return new Promise(function (resolve, reject) { return promise.then(resolve, reject); });
        }
    ]
];
var isNativeObject = function (values) {
    for (var i = 0; i < NATIVE_KEYS.length; i++) {
        var item = NATIVE_KEYS[i];
        if (Array.isArray(item) && item[0]) {
            if (globalThis_1.globalThisPolyfill[item[0]] &&
                values instanceof globalThis_1.globalThisPolyfill[item[0]]) {
                return item[1] ? item[1] : item[0];
            }
        }
        else {
            if (globalThis_1.globalThisPolyfill[item] &&
                values instanceof globalThis_1.globalThisPolyfill[item]) {
                return item;
            }
        }
    }
};
exports.clone = function (values, filter) {
    var nativeClone;
    if (Array.isArray(values)) {
        return values.map(function (item) { return exports.clone(item, filter); });
    }
    else if (isNativeObject(values)) {
        nativeClone = isNativeObject(values);
        return types_1.isFn(nativeClone) ? nativeClone(values) : values;
    }
    else if (typeof values === 'object' && !!values) {
        if ('$$typeof' in values && '_owner' in values) {
            return values;
        }
        if (values._isAMomentObject) {
            return values;
        }
        if (Object.getOwnPropertySymbols(values || {}).length) {
            return values;
        }
        var res = {};
        for (var key in values) {
            if (Object.hasOwnProperty.call(values, key)) {
                if (types_1.isFn(filter)) {
                    if (filter(values[key], key)) {
                        res[key] = exports.clone(values[key], filter);
                    }
                    else {
                        res[key] = values[key];
                    }
                }
                else {
                    res[key] = exports.clone(values[key], filter);
                }
            }
        }
        return res;
    }
    else {
        return values;
    }
};
