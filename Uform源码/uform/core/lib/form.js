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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var field_1 = require("./field");
var validator_1 = require("@uform/validator");
var Subject_1 = require("rxjs/internal/Subject");
var filter_1 = require("rxjs/internal/operators/filter");
var path_1 = require("./path");
var defaults = function (opts) {
    return (__assign({ initialValues: {}, values: {}, onSubmit: function () { }, effects: function () { } }, opts));
};
var Form = (function () {
    function Form(opts) {
        var _this = this;
        this.setFieldState = function (path, callback) {
            if (_this.destructed) {
                return;
            }
            return new Promise(function (resolve) {
                if (utils_1.isStr(path) || utils_1.isArr(path) || utils_1.isFn(path)) {
                    _this.updateQueue.push({ path: path, callback: callback, resolve: resolve });
                }
                if (_this.syncUpdateMode) {
                    _this.updateFieldStateFromQueue();
                    return resolve();
                }
                else if (_this.updateQueue.length > 0) {
                    if (_this.updateRafId !== undefined) {
                        utils_1.caf(_this.updateRafId);
                    }
                    _this.updateRafId = utils_1.raf(function () {
                        if (_this.destructed) {
                            return;
                        }
                        _this.updateFieldStateFromQueue();
                    });
                }
                else {
                    return resolve();
                }
            });
        };
        this.setFormState = function (callback) {
            if (_this.destructed) {
                return;
            }
            if (!utils_1.isFn(callback)) {
                return;
            }
            var published = _this.publishState();
            callback(published);
            return Promise.resolve(_this.checkState(published));
        };
        this.dispatchEffect = function (eventName) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (_this.subscribes[eventName]) {
                (_a = _this.subscribes[eventName]).next.apply(_a, args);
            }
        };
        this.selectEffect = function (eventName, eventFilter) {
            if (!_this.subscribes[eventName]) {
                _this.subscribes[eventName] = new Subject_1.Subject();
            }
            if (utils_1.isStr(eventFilter) || utils_1.isFn(eventFilter)) {
                var predicate = utils_1.isStr(eventFilter)
                    ? path_1.FormPath.match(eventFilter)
                    : eventFilter;
                return _this.subscribes[eventName].pipe(filter_1.filter(predicate));
            }
            return _this.subscribes[eventName];
        };
        this.getFieldState = this.getFieldState.bind(this);
        this.getFormState = this.getFormState.bind(this);
        this.options = defaults(opts);
        this.publisher = new utils_1.Broadcast();
        this.initialized = false;
        this.state = {};
        this.fields = {};
        this.subscribes = opts.subscribes || {};
        this.updateQueue = [];
        this.updateBuffer = new utils_1.BufferList();
        this.editable = opts.editable;
        this.schema = opts.schema || {};
        this.traverse = opts.traverse;
        this.initialize({
            values: this.options.values,
            initialValues: this.options.initialValues
        });
        this.initializeEffects();
        this.initialized = true;
        this.destructed = false;
        this.fieldSize = 0;
    }
    Form.prototype.changeValues = function (values) {
        var lastValues = this.state.values;
        var lastDirty = this.state.dirty;
        this.state.values = values || {};
        this.state.dirty =
            lastDirty || (this.initialized ? !utils_1.isEqual(values, lastValues) : false);
        this.updateFieldsValue();
    };
    Form.prototype.changeEditable = function (editable) {
        this.editable = editable;
        utils_1.each(this.fields, function (field) {
            field.changeEditable(editable);
        });
    };
    Form.prototype.isDirtyValues = function (values) {
        return !utils_1.isEmpty(values) && !utils_1.isEqual(this.state.values, values);
    };
    Form.prototype.getFieldState = function (path, callback) {
        var field;
        utils_1.each(this.fields, function (innerField) {
            if (innerField.match(path)) {
                field = innerField;
                return false;
            }
        });
        if (field) {
            field.syncContextValue();
            return utils_1.isFn(callback)
                ? callback(field.publishState())
                : field.publishState();
        }
    };
    Form.prototype.getFormState = function (callback) {
        return utils_1.isFn(callback) ? callback(this.publishState()) : this.publishState();
    };
    Form.prototype.registerField = function (name, options) {
        var _this = this;
        var value = this.getValue(name);
        var initialValue = this.getInitialValue(name, options.path);
        var field = this.fields[name];
        if (field) {
            field.initialize({
                path: options.path,
                onChange: options.onChange,
                value: value,
                initialValue: initialValue
            });
            this.asyncUpdate(function () {
                _this.updateFieldStateFromBuffer(field);
            });
        }
        else {
            this.fields[name] = new field_1.Field(this, {
                name: name,
                value: value,
                path: options.path,
                initialValue: initialValue,
                props: this.traverse ? this.traverse(options.props) : options.props
            });
            var field_2 = this.fields[name];
            if (options.onChange) {
                this.asyncUpdate(function () {
                    _this.updateFieldStateFromBuffer(field_2);
                    field_2.onChange(options.onChange);
                });
                this.dispatchEffect('onFieldChange', field_2.publishState());
            }
            this.fieldSize++;
        }
        return this.fields[name];
    };
    Form.prototype.setIn = function (name, value) {
        var _this = this;
        utils_1.setIn(this.state.values, name, value, function (path) {
            return utils_1.getSchemaNodeFromPath(_this.schema, path);
        });
    };
    Form.prototype.setInitialValueIn = function (name, value) {
        utils_1.setIn(this.state.initialValues, name, value);
    };
    Form.prototype.setValue = function (name, value) {
        var _this = this;
        var field = this.fields[name];
        if (field) {
            field.updateState(function (state) {
                state.value = value;
            });
            field.pristine = false;
            if (field.dirty) {
                field.notify();
                this.dispatchEffect('onFieldInputChange', field.publishState());
                this.internalValidate(this.state.values).then(function () {
                    _this.formNotify(field.publishState());
                });
            }
        }
    };
    Form.prototype.setErrors = function (name, errors) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        errors = utils_1.toArr(errors);
        var field = this.fields[name];
        if (field) {
            var lastErrors = field.errors;
            if (!utils_1.isEqual(lastErrors, errors)) {
                field.errors = errors.map(function (msg) { return validator_1.format.apply(void 0, [msg].concat(args)); });
                if (errors.length) {
                    field.invalid = true;
                    field.valid = false;
                }
                else {
                    field.invalid = false;
                    field.valid = true;
                }
                field.dirty = true;
                field.notify();
            }
        }
    };
    Form.prototype.updateChildrenValue = function (parent) {
        var _this = this;
        if (!parent.path || this.batchUpdateField) {
            return;
        }
        utils_1.each(this.fields, function (field, $name) {
            if (utils_1.isChildField(field, parent)) {
                var newValue = _this.getValue($name);
                if (!utils_1.isEqual(field.value, newValue)) {
                    field.dirty = true;
                    field.value = newValue;
                    field.notify();
                    _this.dispatchEffect('onFieldChange', field.publishState());
                }
            }
        });
    };
    Form.prototype.updateChildrenInitalValue = function (parent) {
        var _this = this;
        if (!parent.path) {
            return;
        }
        utils_1.each(this.fields, function (field, $name) {
            if (utils_1.isChildField(field, parent)) {
                var newValue = _this.getInitialValue($name);
                if (!utils_1.isEqual(field.initialValue, newValue)) {
                    field.dirty = true;
                    field.initialValue = newValue;
                }
            }
        });
    };
    Form.prototype.updateFieldInitialValue = function () {
        var _this = this;
        if (this.state.dirty && this.initialized) {
            utils_1.each(this.fields, function (field, name) {
                var newValue = _this.getInitialValue(name);
                field.initialValue = newValue;
            });
        }
        return Promise.resolve();
    };
    Form.prototype.updateFieldsValue = function (validate) {
        var _this = this;
        if (validate === void 0) { validate = true; }
        var _a = utils_1.defer(), promise = _a.promise, resolve = _a.resolve;
        var update = function () {
            var updateList = [];
            _this.batchUpdateField = true;
            utils_1.each(_this.fields, function (field, name) {
                var newValue = _this.getValue(name);
                field.updateState(function (state) {
                    state.value = newValue;
                });
                if (field.dirty) {
                    updateList.push(new Promise(function (resolve) {
                        utils_1.raf(function () {
                            if (_this.destructed) {
                                return;
                            }
                            field.notify();
                            _this.dispatchEffect('onFieldChange', field.publishState());
                            resolve();
                        });
                    }));
                }
            });
            _this.batchUpdateField = false;
            resolve(Promise.all(updateList));
        };
        if (this.state.dirty && this.initialized) {
            if (validate) {
                this.internalValidate(this.state.values, true).then(function () {
                    _this.formNotify();
                    update();
                });
            }
            else {
                update();
            }
        }
        return promise;
    };
    Form.prototype.updateChildrenVisible = function (parent, visible) {
        var _this = this;
        if (!parent.path) {
            return;
        }
        utils_1.each(this.fields, function (field, $name) {
            if ($name === parent.name) {
                return;
            }
            if (utils_1.isChildField(field, parent)) {
                if (!visible) {
                    _this.deleteIn($name);
                }
                else {
                    var value = field.value !== undefined ? field.value : utils_1.clone(field.initialValue);
                    if (field.value !== undefined) {
                        _this.setIn($name, value);
                    }
                }
                if (field.visible !== visible) {
                    if (visible) {
                        if (field.hiddenFromParent) {
                            field.visible = visible;
                            field.hiddenFromParent = false;
                            field.shownFromParent = true;
                            field.dirty = true;
                        }
                    }
                    else {
                        field.visible = visible;
                        field.hiddenFromParent = true;
                        field.shownFromParent = false;
                        field.dirty = true;
                    }
                }
            }
        });
    };
    Form.prototype.updateChildrenDisplay = function (parent, display) {
        if (!parent.path) {
            return;
        }
        utils_1.each(this.fields, function (field, $name) {
            if ($name === parent.name) {
                return;
            }
            if (utils_1.isChildField(field, parent)) {
                if (field.display !== display) {
                    if (display) {
                        if (field.hiddenFromParent) {
                            field.display = display;
                            field.hiddenFromParent = false;
                            field.shownFromParent = true;
                            field.dirty = true;
                        }
                    }
                    else {
                        field.display = display;
                        field.hiddenFromParent = true;
                        field.shownFromParent = false;
                        field.dirty = true;
                    }
                }
            }
        });
    };
    Form.prototype.getInitialValue = function (name, path) {
        var initialValue = utils_1.getIn(this.state.initialValues, name);
        var schema;
        var schemaDefault;
        if (initialValue === undefined) {
            schema = path ? utils_1.getSchemaNodeFromPath(this.schema, path) : undefined;
            schemaDefault = schema && schema.default;
            if (schemaDefault !== undefined) {
                this.setIn(name, schemaDefault);
            }
        }
        return initialValue !== undefined ? initialValue : schemaDefault;
    };
    Form.prototype.getValue = function (name, copy) {
        return copy
            ? utils_1.clone(utils_1.getIn(this.state.values, name))
            : utils_1.getIn(this.state.values, name);
    };
    Form.prototype.deleteIn = function (name) {
        utils_1.deleteIn(this.state.values, name);
    };
    Form.prototype.deleteInitialValues = function (name) {
        utils_1.deleteIn(this.state.initialValues, name);
    };
    Form.prototype.reset = function (forceClear, validate) {
        var _this = this;
        if (validate === void 0) { validate = true; }
        utils_1.each(this.fields, function (field, name) {
            var value = _this.getValue(name);
            var initialValue = _this.getInitialValue(name, field.path);
            if (!validate) {
                if (field.errors.length > 0) {
                    field.errors = [];
                    field.dirty = true;
                }
                if (field.effectErrors.length > 0) {
                    field.effectErrors = [];
                    field.dirty = true;
                }
            }
            if (!utils_1.isEmpty(value) || !utils_1.isEmpty(initialValue)) {
                field.updateState(function (state) {
                    state.value = forceClear ? undefined : initialValue;
                });
                field.pristine = true;
            }
            if (field.dirty) {
                field.notify();
                _this.formNotify(field.publishState());
            }
        });
        if (!validate) {
            var formState = this.publishState();
            this.dispatchEffect('onFormReset', formState);
            if (utils_1.isFn(this.options.onReset)) {
                this.options.onReset({ formState: formState });
            }
        }
        else {
            this.internalValidate(this.state.values, true).then(function () {
                _this.formNotify();
                utils_1.raf(function () {
                    if (_this.destructed) {
                        return;
                    }
                    var formState = _this.publishState();
                    _this.dispatchEffect('onFormReset', formState);
                    if (utils_1.isFn(_this.options.onReset)) {
                        _this.options.onReset({ formState: formState });
                    }
                });
            });
        }
    };
    Form.prototype.publishState = function () {
        return utils_1.publishFormState(this.state);
    };
    Form.prototype.formNotify = function (fieldState) {
        var formState = this.publishState();
        if (utils_1.isFn(this.options.onFieldChange)) {
            this.options.onFieldChange({ formState: formState, fieldState: fieldState });
        }
        if (fieldState) {
            this.dispatchEffect('onFieldChange', fieldState);
        }
        if (this.state.dirty) {
            this.publisher.notify({ formState: formState, fieldState: fieldState });
        }
        this.state.dirty = false;
        return formState;
    };
    Form.prototype.validate = function () {
        var _this = this;
        this.validating = true;
        return this.internalValidate(this.state.values, true).then(function () {
            return new Promise(function (resolve, reject) {
                _this.formNotify();
                utils_1.raf(function () {
                    _this.validating = false;
                    if (_this.destructed) {
                        return;
                    }
                    if (_this.state.valid) {
                        resolve(_this.publishState());
                    }
                    else {
                        if (_this.options.onValidateFailed) {
                            _this.options.onValidateFailed(_this.state.errors);
                        }
                        reject(_this.state.errors);
                    }
                });
            });
        });
    };
    Form.prototype.submit = function () {
        var _this = this;
        if (this.validating)
            return new Promise(function (resolve) {
                resolve(_this.publishState());
            });
        return this.validate().then(function (formState) {
            _this.dispatchEffect('onFormSubmit', formState);
            if (utils_1.isFn(_this.options.onSubmit)) {
                _this.options.onSubmit({ formState: formState });
            }
            return formState;
        });
    };
    Form.prototype.subscribe = function (callback) {
        return this.publisher.subscribe(callback);
    };
    Form.prototype.destructor = function () {
        var _this = this;
        if (this.destructed) {
            return;
        }
        this.destructed = true;
        this.publisher.unsubscribe();
        utils_1.each(this.subscribes, function (effect) {
            effect.unsubscribe();
        });
        utils_1.each(this.fields, function (field, key) {
            field.destructor();
            delete _this.fields[key];
        });
        this.fieldSize = 0;
        delete this.fields;
        delete this.publisher;
    };
    Form.prototype.syncUpdate = function (fn) {
        if (utils_1.isFn(fn)) {
            this.syncUpdateMode = true;
            fn();
            this.syncUpdateMode = false;
        }
    };
    Form.prototype.initialize = function (_a) {
        var _b = _a.initialValues, initialValues = _b === void 0 ? this.state.initialValues : _b, _c = _a.values, values = _c === void 0 ? this.state.values : _c;
        var lastValues = this.state.values;
        var lastDirty = this.state.dirty;
        var currentInitialValues = utils_1.clone(initialValues) || {};
        var currentValues = utils_1.isEmpty(values)
            ? utils_1.clone(currentInitialValues)
            : utils_1.clone(values) || {};
        this.state = {
            valid: true,
            invalid: false,
            errors: [],
            pristine: true,
            initialValues: currentInitialValues,
            values: currentValues,
            dirty: lastDirty ||
                (this.initialized ? !utils_1.isEqual(currentValues, lastValues) : false)
        };
        if (this.options.onFormChange && !this.initialized) {
            this.subscribe(this.options.onFormChange);
            this.options.onFormChange({
                formState: this.publishState()
            });
        }
        this.updateFieldsValue(false);
    };
    Form.prototype.initializeEffects = function () {
        var effects = this.options.effects;
        if (utils_1.isFn(effects)) {
            effects(this.selectEffect, {
                setFieldState: this.setFieldState,
                getFieldState: this.getFieldState,
                getFormState: this.getFormState,
                setFormState: this.setFormState
            });
        }
    };
    Form.prototype.checkState = function (published) {
        if (!utils_1.isEqual(this.state.values, published.values)) {
            this.state.values = published.values;
            this.state.dirty = true;
            return this.updateFieldsValue();
        }
        if (!utils_1.isEqual(this.state.initialValues, published.initialValues)) {
            this.state.initialValues = published.initialValues;
            this.state.dirty = true;
            return this.updateFieldInitialValue();
        }
        return Promise.resolve();
    };
    Form.prototype.asyncUpdate = function (fn) {
        if (utils_1.isFn(fn)) {
            if (this.syncUpdateMode) {
                this.syncUpdateMode = false;
                fn();
                this.syncUpdateMode = true;
            }
            else {
                fn();
            }
        }
    };
    Form.prototype.updateFieldStateFromQueue = function () {
        var _this = this;
        var failed = {};
        var rafIdMap = {};
        utils_1.each(this.updateQueue, function (_a, i) {
            var path = _a.path, callback = _a.callback, resolve = _a.resolve;
            utils_1.each(_this.fields, function (field) {
                if (path && (utils_1.isFn(path) || utils_1.isArr(path) || utils_1.isStr(path))) {
                    if (utils_1.isFn(path) ? path(field) : field.pathEqual(path)) {
                        field.updateState(callback);
                        if (_this.syncUpdateMode) {
                            field.dirty = false;
                        }
                        if (path.hasWildcard) {
                            _this.updateBuffer.push(path.pattern, callback, { path: path, resolve: resolve });
                        }
                        if (field.dirty) {
                            var dirtyType_1 = field.dirtyType;
                            field.notify();
                            if (rafIdMap[field.name]) {
                                utils_1.caf(rafIdMap[field.name]);
                            }
                            rafIdMap[field.name] = utils_1.raf(function () {
                                if (_this.destructed) {
                                    return;
                                }
                                if (dirtyType_1 === 'value') {
                                    _this.internalValidate().then(function () {
                                        _this.formNotify(field.publishState());
                                    });
                                }
                                else {
                                    _this.formNotify(field.publishState());
                                }
                            });
                        }
                    }
                    else {
                        failed[i] = failed[i] || 0;
                        failed[i]++;
                        if (_this.fieldSize <= failed[i]) {
                            if (utils_1.isArr(path)) {
                                _this.updateBuffer.push(path.join('.'), callback, {
                                    path: path,
                                    resolve: resolve
                                });
                            }
                            else if (utils_1.isStr(path)) {
                                _this.updateBuffer.push(path, callback, { path: path, resolve: resolve });
                            }
                            else if (utils_1.isFn(path) && path.pattern) {
                                _this.updateBuffer.push(path.pattern, callback, {
                                    path: path,
                                    resolve: resolve
                                });
                            }
                        }
                    }
                }
            });
            if (resolve && utils_1.isFn(resolve)) {
                resolve();
            }
        });
        this.updateQueue = [];
    };
    Form.prototype.updateFieldStateFromBuffer = function (field) {
        var _this = this;
        var rafIdMap = {};
        this.updateBuffer.forEach(function (_a) {
            var path = _a.path, values = _a.values, key = _a.key;
            if (utils_1.isFn(path) ? path(field) : field.pathEqual(path)) {
                values.forEach(function (callback) { return field.updateState(callback); });
                if (_this.syncUpdateMode) {
                    field.dirty = false;
                }
                if (field.dirty) {
                    var dirtyType_2 = field.dirtyType;
                    field.notify();
                    if (rafIdMap[field.name]) {
                        utils_1.caf(rafIdMap[field.name]);
                    }
                    rafIdMap[field.name] = utils_1.raf(function () {
                        if (_this.destructed) {
                            return;
                        }
                        if (dirtyType_2 === 'value') {
                            _this.internalValidate().then(function () {
                                _this.formNotify(field.publishState());
                            });
                        }
                        else {
                            _this.formNotify(field.publishState());
                        }
                    });
                }
                if (!path.hasWildcard) {
                    _this.updateBuffer.remove(key);
                }
            }
        });
    };
    Form.prototype.internalValidate = function (values, forceUpdate) {
        var _this = this;
        if (values === void 0) { values = this.state.values; }
        if (this.destructed) {
            return;
        }
        return new Promise(function (resolve) {
            if (_this.rafValidateId) {
                utils_1.caf(_this.rafValidateId);
            }
            _this.rafValidateId = utils_1.raf(function () {
                if (_this.destructed) {
                    return resolve();
                }
                return validator_1.runValidation(values || _this.state.values, _this.fields, forceUpdate)
                    .then(function (response) {
                    var lastValid = _this.state.valid;
                    var newErrors = utils_1.reduce(response, function (buf, _a) {
                        var name = _a.name, errors = _a.errors;
                        if (!errors.length) {
                            return buf;
                        }
                        else {
                            return buf.concat({ name: name, errors: errors });
                        }
                    }, []);
                    _this.state.valid = newErrors.length === 0;
                    _this.state.invalid = !_this.state.valid;
                    _this.state.errors = newErrors;
                    if (_this.state.valid !== lastValid) {
                        _this.state.dirty = true;
                    }
                    var lastPristine = _this.state.pristine;
                    if (!utils_1.isEqual(_this.state.values, _this.state.initialValues)) {
                        _this.state.pristine = false;
                    }
                    else {
                        _this.state.pristine = true;
                    }
                    if (lastPristine !== _this.state.pristine) {
                        _this.state.dirty = true;
                    }
                    return response;
                })
                    .then(resolve);
            });
        });
    };
    return Form;
}());
exports.Form = Form;
