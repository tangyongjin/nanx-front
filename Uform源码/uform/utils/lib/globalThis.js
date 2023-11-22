"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function globalThis() {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return Function('return this')();
}
exports.globalThisPolyfill = globalThis();
