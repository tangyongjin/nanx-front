"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("@uform/utils"));
var formatRegExp = /%[sdj%]/g;
function format() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var i = 1;
    var f = args[0];
    var len = args.length;
    if (typeof f === 'function') {
        return f.apply(null, args.slice(1));
    }
    if (typeof f === 'string') {
        var str = String(f).replace(formatRegExp, function (x) {
            if (x === '%%') {
                return '%';
            }
            if (i >= len) {
                return x;
            }
            switch (x) {
                case '%s':
                    return String(args[i++]);
                case '%d':
                    return Number(args[i++]) + '';
                case '%j':
                    try {
                        return JSON.stringify(args[i++]);
                    }
                    catch (_) {
                        return '[Circular]';
                    }
                default:
                    return x;
            }
        });
        return str;
    }
    return f;
}
exports.format = format;
