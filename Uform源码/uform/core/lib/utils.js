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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@uform/utils");
__export(require("@uform/utils"));
var self = utils_1.globalThisPolyfill;
var compactScheduler = function (_a, fresh) {
    var raf = _a[0], caf = _a[1], priority = _a[2];
    return [fresh ? function (callback) { return raf(priority, callback); } : raf, caf];
};
var getScheduler = function () {
    if (!self.requestAnimationFrame) {
        return [self.setTimeout, self.clearTimeout];
    }
    try {
        var scheduler = require('scheduler');
        return compactScheduler([
            scheduler.scheduleCallback || scheduler.unstable_scheduleCallback,
            scheduler.cancelCallback || scheduler.unstable_cancelCallback,
            scheduler.NormalPriority || scheduler.unstable_NormalPriority
        ], !!scheduler.unstable_requestPaint);
    }
    catch (err) {
        return [self.requestAnimationFrame, self.cancelAnimationFrame];
    }
};
exports.raf = (_a = getScheduler(), _a[0]), exports.caf = _a[1];
exports.resolveFieldPath = function (path) {
    if (!utils_1.isArr(path)) {
        return utils_1.isStr(path) ? exports.resolveFieldPath(utils_1.getPathSegments(path)) : undefined;
    }
    return path.reduce(function (buf, key) {
        return buf.concat(utils_1.getPathSegments(key));
    }, []);
};
exports.isChildField = function (field, parent) {
    if (field && parent && field.path && parent.path) {
        for (var i = 0; i < parent.path.length; i++) {
            if (field.path[i] !== parent.path[i]) {
                return false;
            }
        }
        return parent.path.length < field.path.length;
    }
    return false;
};
exports.hasRequired = function (rules) {
    return utils_1.toArr(rules).some(function (rule) {
        return rule && rule.required;
    });
};
exports.publishFormState = function (state) {
    var values = state.values, valid = state.valid, invalid = state.invalid, initialValues = state.initialValues, errors = state.errors, pristine = state.pristine, dirty = state.dirty;
    return {
        values: utils_1.clone(values),
        valid: valid,
        invalid: invalid,
        errors: errors,
        pristine: pristine,
        dirty: dirty,
        initialValues: utils_1.clone(initialValues)
    };
};
exports.publishFieldState = function (state) {
    var value = state.value, valid = state.valid, invalid = state.invalid, errors = state.errors, visible = state.visible, display = state.display, editable = state.editable, initialValue = state.initialValue, name = state.name, path = state.path, props = state.props, effectErrors = state.effectErrors, loading = state.loading, pristine = state.pristine, required = state.required, rules = state.rules;
    return {
        value: utils_1.clone(value),
        valid: valid,
        invalid: invalid,
        editable: editable,
        visible: visible,
        display: display,
        loading: loading,
        errors: errors.concat(effectErrors),
        pristine: pristine,
        initialValue: utils_1.clone(initialValue),
        name: name,
        path: path,
        props: props,
        required: required,
        rules: rules
    };
};
var BufferList = (function () {
    function BufferList() {
        this.data = [];
        this.indexes = {};
    }
    BufferList.prototype.push = function (key, value, extra) {
        if (!this.indexes[key]) {
            var index = this.data.length;
            this.data.push(__assign({}, extra, { key: key, values: [value] }));
            this.indexes[key] = index;
        }
        else {
            var item = this.data[this.indexes[key]];
            if (!item.values.some(function (callback) { return utils_1.isEqual(callback, value); })) {
                item.values.push(value);
            }
        }
    };
    BufferList.prototype.forEach = function (callback) {
        for (var i = 0; i < this.data.length; i++) {
            if (utils_1.isFn(callback)) {
                callback(this.data[i], this.data[i].key);
            }
        }
    };
    BufferList.prototype.remove = function (key, value) {
        var _this = this;
        this.data = this.data.reduce(function (buf, item, index) {
            if (item.key === key) {
                delete _this.indexes[key];
                return buf;
            }
            else {
                _this.indexes[key] = buf.length;
                return buf.concat(item);
            }
        }, []);
    };
    return BufferList;
}());
exports.BufferList = BufferList;
