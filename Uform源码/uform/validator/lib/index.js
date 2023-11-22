"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.format = utils_1.format;
var validators_1 = require("./validators");
__export(require("./message"));
var flatArr = function (arr) {
    return utils_1.reduce(arr, function (buf, item) {
        return utils_1.isArr(item)
            ? buf.concat(flatArr(item))
            : item
                ? buf.concat(item)
                : buf;
    }, []);
};
exports.runValidation = function (values, fieldMap, forceUpdate, callback) { return __awaiter(_this, void 0, void 0, function () {
    var queue;
    return __generator(this, function (_a) {
        queue = [];
        if (utils_1.isFn(forceUpdate)) {
            callback = forceUpdate;
            forceUpdate = false;
        }
        utils_1.each(fieldMap, function (field, name) {
            var value = utils_1.getIn(values, name);
            if (field.visible === false ||
                field.display === false ||
                field.editable === false) {
                return;
            }
            if (!forceUpdate) {
                if (field.pristine)
                    return;
                if (utils_1.isEmpty(field.lastValidateValue) && utils_1.isEmpty(value))
                    return;
                if (utils_1.isEqual(field.lastValidateValue, value)) {
                    return;
                }
            }
            var title = field.props && field.props.title;
            var rafId = setTimeout(function () {
                field.loading = true;
                field.dirty = true;
                if (field.notify) {
                    field.notify();
                }
            }, 100);
            queue.push(Promise.all(utils_1.toArr(field.rules).map(function (rule) {
                return validators_1.validate(value, rule, values, title || name);
            })).then(function (errors) {
                clearTimeout(rafId);
                var lastFieldErrors = utils_1.toArr(field.errors);
                var lastValid = field.valid;
                var lastLoading = field.loading;
                var newErrors = flatArr(utils_1.toArr(errors));
                var effectErrors = flatArr(utils_1.toArr(field.effectErrors));
                field.loading = false;
                field.errors = newErrors;
                field.effectErrors = effectErrors;
                if (forceUpdate) {
                    if (newErrors.length || effectErrors.length) {
                        field.valid = false;
                        field.invalid = true;
                    }
                    else {
                        field.valid = true;
                        field.invalid = false;
                    }
                    field.dirty = true;
                }
                else {
                    if (!field.pristine) {
                        if (newErrors.length || effectErrors.length) {
                            field.valid = false;
                            field.invalid = true;
                        }
                        else {
                            field.valid = true;
                            field.invalid = false;
                        }
                        if (!utils_1.isEqual(lastValid, field.valid) ||
                            !utils_1.isEqual(lastFieldErrors, field.errors)) {
                            field.dirty = true;
                        }
                    }
                }
                if (field.loading !== lastLoading) {
                    field.dirty = true;
                }
                if (field.dirty && field.notify) {
                    field.notify();
                }
                field.lastValidateValue = utils_1.clone(value);
                return {
                    name: name,
                    value: value,
                    field: field,
                    invalid: field.invalid,
                    valid: field.valid,
                    errors: newErrors.concat(effectErrors)
                };
            }));
        });
        return [2, Promise.all(queue).then(function (response) {
                if (utils_1.isFn(callback)) {
                    callback(response);
                }
                return response;
            })];
    });
}); };
exports.default = exports.runValidation;
