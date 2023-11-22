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
var filterSchema = function (value, key) {
    return key !== 'properties' && key !== 'items';
};
var Field = (function () {
    function Field(context, options) {
        this.fieldbrd = new utils_1.Broadcast();
        this.context = context;
        this.dirty = false;
        this.pristine = true;
        this.valid = true;
        this.removed = false;
        this.invalid = false;
        this.visible = true;
        this.display = true;
        this.editable = true;
        this.destructed = false;
        this.loading = false;
        this.errors = [];
        this.props = {};
        this.effectErrors = [];
        this.initialize(options);
    }
    Field.prototype.initialize = function (options) {
        var _this = this;
        var rules = this.getRulesFromProps(options.props);
        this.value = !utils_1.isEqual(this.value, options.value)
            ? utils_1.clone(options.value)
            : this.value;
        this.name = !utils_1.isEmpty(options.name) ? options.name : this.name || '';
        this.namePath = utils_1.resolveFieldPath(this.name);
        this.path = utils_1.resolveFieldPath(!utils_1.isEmpty(options.path) ? options.path : this.path || []);
        this.rules = !utils_1.isEmpty(rules) ? rules : this.rules;
        this.required = utils_1.hasRequired(this.rules);
        if (utils_1.isEmpty(options.props)) {
            this.initialValue = !utils_1.isEmpty(options.initialValue)
                ? options.initialValue
                : this.initialValue;
        }
        else {
            this.initialValue = !utils_1.isEqual(this.initialValue, options.initialValue)
                ? options.initialValue
                : !utils_1.isEmpty(this.initialValue)
                    ? this.initialValue
                    : this.getInitialValueFromProps(options.props);
            this.props = !utils_1.isEmpty(this.props)
                ? __assign({}, this.props, utils_1.clone(options.props)) : utils_1.clone(options.props);
            var editable = this.getEditableFromProps(options.props);
            this.editable = !utils_1.isEmpty(editable) ? editable : this.getContextEditable();
        }
        if (options.initialValue) {
            this.lastValidateValue = options.initialValue;
        }
        if (this.pristine &&
            !utils_1.isEmpty(this.initialValue) &&
            ((utils_1.isEmpty(this.value) && this.visible) ||
                (this.removed && !this.shownFromParent))) {
            this.value = utils_1.clone(this.initialValue);
            this.context.setIn(this.name, this.value);
        }
        this.mount();
        if (utils_1.isFn(options.onChange)) {
            this.onChange(options.onChange);
        }
        this.context.syncUpdate(function () {
            _this.context.dispatchEffect('onFieldInit', _this.publishState());
        });
    };
    Field.prototype.getInitialValueFromProps = function (props) {
        if (props) {
            if (!utils_1.isEqual(this.initialValue, props.default)) {
                return props.default;
            }
        }
    };
    Field.prototype.getContextEditable = function () {
        return this.getEditable(this.context.editable);
    };
    Field.prototype.getEditableFromProps = function (props) {
        if (props) {
            if (!utils_1.isEmpty(props.editable)) {
                return this.getEditable(props.editable);
            }
            else {
                if (props['x-props'] && !utils_1.isEmpty(props['x-props'].editable)) {
                    return this.getEditable(props['x-props'].editable);
                }
            }
        }
    };
    Field.prototype.getRulesFromProps = function (props) {
        if (props) {
            var rules = utils_1.toArr(props['x-rules']);
            if (props.required && !rules.some(function (rule) { return rule.required; })) {
                rules.push({ required: true });
            }
            return utils_1.clone(rules);
        }
        return this.rules;
    };
    Field.prototype.getRequiredFromProps = function (props) {
        if (!utils_1.isEmpty(props.required)) {
            return props.required;
        }
    };
    Field.prototype.getEditable = function (editable) {
        if (utils_1.isFn(editable)) {
            return editable(this.name);
        }
        if (utils_1.isBool(editable)) {
            return editable;
        }
        return this.editable;
    };
    Field.prototype.onChange = function (fn) {
        if (utils_1.isFn(fn)) {
            if (this.unSubscribeOnChange) {
                this.unSubscribeOnChange();
            }
            fn(this.publishState());
            this.unSubscribeOnChange = this.subscribe(fn);
        }
    };
    Field.prototype.pathEqual = function (path) {
        if (utils_1.isStr(path)) {
            if (path === this.name) {
                return true;
            }
        }
        path = utils_1.resolveFieldPath(path);
        if (path.length === this.path.length) {
            for (var i = 0; i < path.length; i++) {
                if (path[i] !== this.path[i]) {
                    return false;
                }
            }
            return true;
        }
        else if (path.length === this.namePath.length) {
            for (var i = 0; i < path.length; i++) {
                if (path[i] !== this.namePath[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Field.prototype.match = function (path) {
        if (utils_1.isFn(path)) {
            return path(this);
        }
        if (utils_1.isStr(path)) {
            if (path === this.name) {
                return true;
            }
        }
        path = utils_1.resolveFieldPath(path);
        if (path.length === this.path.length) {
            for (var i = 0; i < path.length; i++) {
                if (path[i] !== this.path[i]) {
                    return false;
                }
            }
            return true;
        }
        else if (path.length === this.namePath.length) {
            for (var i = 0; i < path.length; i++) {
                if (path[i] !== this.namePath[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Field.prototype.publishState = function () {
        return utils_1.publishFieldState(this);
    };
    Field.prototype.syncContextValue = function () {
        if (this.visible) {
            var contextValue = this.context.getValue(this.name, true);
            var contextInitialValue = this.context.getInitialValue(this.name, this.path);
            if (!utils_1.isEqual(this.value, contextValue)) {
                this.value = contextValue;
            }
            if (!utils_1.isEqual(this.initialValue, contextInitialValue)) {
                this.initialValue = contextInitialValue;
            }
        }
    };
    Field.prototype.subscribe = function (callback) {
        return this.fieldbrd.subscribe(callback);
    };
    Field.prototype.notify = function (force) {
        if (!this.dirty && !force) {
            return;
        }
        this.fieldbrd.notify(this.publishState());
        this.dirty = false;
        this.dirtyType = '';
    };
    Field.prototype.unsubscribe = function () {
        this.fieldbrd.unsubscribe();
    };
    Field.prototype.changeProps = function (props, force) {
        var lastProps = this.props;
        if (utils_1.isEmpty(props)) {
            return;
        }
        if (force || !utils_1.isEqual(lastProps, props, filterSchema)) {
            this.props = utils_1.clone(props, filterSchema);
            var editable = this.getEditableFromProps(this.props);
            if (!utils_1.isEmpty(editable)) {
                this.editable = this.getEditableFromProps(this.props);
            }
            var rules = this.getRulesFromProps(this.props);
            if (!utils_1.isEmpty(rules)) {
                this.rules = rules;
            }
            this.dirty = true;
            this.notify();
        }
    };
    Field.prototype.changeEditable = function (editable) {
        if (!this.props || !utils_1.isEmpty(this.props.editable)) {
            return;
        }
        if (this.props['x-props'] && !utils_1.isEmpty(this.props['x-props'].editable)) {
            return;
        }
        this.editable = this.getEditable(editable);
        this.dirty = true;
        this.notify();
    };
    Field.prototype.mount = function () {
        if (this.removed) {
            if (!this.alreadyHiddenBeforeUnmount && !this.visible) {
                this.visible = true;
            }
            this.removed = false;
            this.context.dispatchEffect('onFieldChange', this.publishState());
        }
    };
    Field.prototype.unmount = function () {
        if (!this.visible) {
            this.alreadyHiddenBeforeUnmount = true;
        }
        else {
            this.alreadyHiddenBeforeUnmount = false;
        }
        this.visible = false;
        this.removed = true;
        if (!this.context) {
            return;
        }
        if (!this.hiddenFromParent) {
            this.context.deleteIn(this.name);
        }
    };
    Field.prototype.checkState = function (published) {
        if (published === void 0) { published = this.publishState(); }
        if (!utils_1.isEqual(published.value, this.value)) {
            this.value = published.value;
            this.pristine = false;
            this.context.setIn(this.name, this.value);
            this.context.updateChildrenValue(this);
            this.dirtyType = 'value';
            this.dirty = true;
        }
        if (!utils_1.isEqual(published.initialValue, this.initialValue)) {
            this.initialValue = published.initialValue;
            this.context.setInitialValueIn(this.name, this.value);
            this.context.updateChildrenInitalValue(this);
            this.dirtyType = 'initialValue';
            this.dirty = true;
        }
        var editable = this.getEditable(published.editable);
        if (!utils_1.isEqual(editable, this.editable)) {
            this.editable = editable;
            this.dirtyType = 'editable';
            this.dirty = true;
        }
        else {
            var prevEditable = this.getEditableFromProps(this.props);
            var propsEditable = this.getEditableFromProps(published.props);
            if (!utils_1.isEmpty(propsEditable) &&
                !utils_1.isEqual(propsEditable, this.editable) &&
                !utils_1.isEqual(prevEditable, propsEditable)) {
                this.editable = propsEditable;
                this.dirtyType = 'editable';
                this.dirty = true;
            }
        }
        published.errors = utils_1.toArr(published.errors).filter(function (v) { return !!v; });
        if (!utils_1.isEqual(published.errors, this.effectErrors)) {
            this.effectErrors = published.errors;
            this.valid = this.effectErrors.length > 0 && this.errors.length > 0;
            this.invalid = !this.valid;
            this.dirtyType = 'errors';
            this.dirty = true;
        }
        if (!utils_1.isEqual(published.rules, this.rules)) {
            this.rules = published.rules;
            this.errors = [];
            this.valid = true;
            if (utils_1.hasRequired(this.rules)) {
                this.required = true;
                published.required = true;
            }
            this.invalid = false;
            this.dirtyType = 'rules';
            this.dirty = true;
        }
        else {
            var prePropsRules = this.getRulesFromProps(this.props);
            var propsRules = this.getRulesFromProps(published.props);
            if (!utils_1.isEmpty(propsRules) &&
                !utils_1.isEqual(prePropsRules, propsRules) &&
                !utils_1.isEqual(propsRules, this.rules)) {
                this.rules = propsRules;
                this.errors = [];
                if (utils_1.hasRequired(this.rules)) {
                    this.required = true;
                    published.required = true;
                }
                this.valid = true;
                this.invalid = false;
                this.dirtyType = 'rules';
                this.dirty = true;
            }
        }
        if (!utils_1.isEqual(published.required, this.required)) {
            this.required = !!published.required;
            if (this.required) {
                if (!utils_1.hasRequired(this.rules)) {
                    this.rules = utils_1.toArr(this.rules).concat({
                        required: true
                    });
                    this.errors = [];
                    this.valid = true;
                    this.invalid = false;
                }
            }
            else {
                this.rules = utils_1.toArr(this.rules).filter(function (rule) {
                    if (rule && rule.required) {
                        return false;
                    }
                    return true;
                });
                this.errors = [];
                this.valid = true;
                this.invalid = false;
            }
            this.dirty = true;
        }
        else {
            var propsRequired = this.getRequiredFromProps(published.props);
            var prevPropsRequired = this.getRequiredFromProps(this.props);
            if (!utils_1.isEmpty(propsRequired) &&
                !utils_1.isEqual(propsRequired, prevPropsRequired)) {
                this.required = !!propsRequired;
                this.errors = [];
                if (this.required) {
                    if (!utils_1.hasRequired(this.rules)) {
                        this.rules = utils_1.toArr(this.rules).concat({
                            required: true
                        });
                        this.errors = [];
                        this.valid = true;
                        this.invalid = false;
                    }
                }
                else {
                    this.rules = utils_1.toArr(this.rules).filter(function (rule) {
                        if (rule && rule.required) {
                            return false;
                        }
                        return true;
                    });
                    this.errors = [];
                    this.valid = true;
                    this.invalid = false;
                }
                this.dirty = true;
            }
        }
        if (published.loading !== this.loading) {
            this.loading = published.loading;
            this.dirtyType = 'loading';
            this.dirty = true;
        }
        if (!utils_1.isEqual(published.visible, this.visible)) {
            this.visible = !!published.visible;
            if (this.visible) {
                this.value =
                    this.value !== undefined ? this.value : utils_1.clone(this.initialValue);
                if (this.value !== undefined) {
                    this.context.setIn(this.name, this.value);
                }
                this.context.updateChildrenVisible(this, true);
            }
            else {
                this.context.deleteIn(this.name);
                this.context.updateChildrenVisible(this, false);
            }
            this.dirtyType = 'visible';
            this.dirty = true;
        }
        if (!utils_1.isEqual(published.display, this.display)) {
            this.display = !!published.display;
            this.context.updateChildrenDisplay(this, this.display);
            this.dirtyType = 'display';
            this.dirty = true;
        }
        if (!utils_1.isEqual(published.props, this.props, filterSchema)) {
            this.props = utils_1.clone(published.props, filterSchema);
            this.dirtyType = 'props';
            this.dirty = true;
        }
        if (this.editable === false) {
            this.errors = [];
            this.effectErrors = [];
        }
    };
    Field.prototype.updateState = function (reducer) {
        if (!utils_1.isFn(reducer)) {
            return;
        }
        if (this.removed) {
            return;
        }
        var published = {
            name: this.name,
            path: this.path,
            props: utils_1.clone(this.props, filterSchema),
            value: utils_1.clone(this.value),
            initialValue: utils_1.clone(this.initialValue),
            valid: this.valid,
            loading: this.loading,
            editable: this.editable,
            invalid: this.invalid,
            pristine: this.pristine,
            rules: utils_1.clone(this.rules),
            errors: utils_1.clone(this.effectErrors),
            visible: this.visible,
            display: this.display,
            required: this.required
        };
        reducer(published);
        this.checkState(published);
    };
    Field.prototype.destructor = function () {
        if (this.destructed) {
            return;
        }
        this.destructed = true;
        if (this.value !== undefined) {
            this.value = undefined;
            this.context.deleteIn(this.name);
        }
        this.context.updateChildrenVisible(this, false);
        delete this.context;
        this.unsubscribe();
        delete this.fieldbrd;
    };
    return Field;
}());
exports.Field = Field;
