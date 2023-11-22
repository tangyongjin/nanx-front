"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dot_match_1 = __importDefault(require("dot-match"));
var utils_1 = require("./utils");
var matchWithFilter = function (result, filter, payload) {
    if (utils_1.isFn(filter)) {
        return result && filter(payload);
    }
    return result;
};
var wildcardRE = /\*/;
exports.FormPath = {
    match: function (pattern, isRealPath, filter) {
        pattern = pattern + '';
        var match = dot_match_1.default(pattern);
        if (utils_1.isFn(isRealPath)) {
            filter = isRealPath;
            isRealPath = false;
        }
        var matcher = function (payload) {
            if (payload && payload.fieldState) {
                return matchWithFilter(match(utils_1.resolveFieldPath(isRealPath ? payload.fieldState.path : payload.fieldState.name)), filter, payload.fieldState);
            }
            else if (payload && payload.name && payload.path) {
                return matchWithFilter(match(utils_1.resolveFieldPath(isRealPath ? payload.path : payload.name)), filter, payload);
            }
            else if (utils_1.isStr(payload)) {
                return matchWithFilter(match(utils_1.resolveFieldPath(payload)), filter, {
                    name: payload
                });
            }
            else if (utils_1.isArr(payload)) {
                return matchWithFilter(match(payload), filter, { path: payload });
            }
            return false;
        };
        matcher.hasWildcard = wildcardRE.test(pattern);
        matcher.pattern = pattern;
        return matcher;
    },
    exclude: function (matcher) {
        return function (path) {
            return utils_1.isFn(matcher)
                ? !matcher(path)
                : utils_1.isStr(matcher)
                    ? !exports.FormPath.match(matcher)(path)
                    : false;
        };
    },
    transform: function (path, regexp, calllback) {
        var args = utils_1.reduce(utils_1.resolveFieldPath(path), function (buf, key) {
            return new RegExp(regexp).test(key) ? buf.concat(key) : buf;
        }, []);
        return calllback.apply(void 0, args);
    }
};
