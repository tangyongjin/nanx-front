"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_eva_1 = require("react-eva");
var core_1 = require("@uform/core");
var utils_1 = require("../utils");
var context_1 = require("../shared/context");
var core_2 = require("../shared/core");
var broadcast_1 = require("../shared/broadcast");
exports.StateForm = utils_1.createHOC(function (options, Form) {
    var StateForm = (function (_super) {
        __extends(StateForm, _super);
        function StateForm(props) {
            var _this = _super.call(this, props) || this;
            _this.onValidateFailed = function ($props) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var props = _this.props || $props;
                    if (props.onValidateFailed) {
                        return props.onValidateFailed.apply(props, args);
                    }
                };
            };
            _this.onFieldChangeHandler = function ($props) {
                return function (_a) {
                    var formState = _a.formState;
                    var props = _this.props || $props;
                    if (props.onChange) {
                        var values = formState.values;
                        if (!utils_1.isEqual(_this.lastFormValues, values)) {
                            props.onChange(values);
                            _this.lastFormValues = utils_1.clone(values);
                        }
                    }
                };
            };
            _this.getSchema = function (path) {
                return utils_1.getSchemaNodeFromPath(_this.props.schema, path);
            };
            _this.onSubmitHandler = function ($props) {
                return function (_a) {
                    var formState = _a.formState;
                    var props = _this.props || $props;
                    if (props.onSubmit) {
                        var promise = props.onSubmit(utils_1.clone(formState.values));
                        if (promise && promise.then) {
                            _this.notify({
                                type: 'submitting',
                                state: _this.formState
                            });
                            promise.then(function () {
                                _this.notify({
                                    type: 'submitted',
                                    state: _this.formState
                                });
                            }, function (error) {
                                _this.notify({
                                    type: 'submitted',
                                    state: _this.formState
                                });
                                throw error;
                            });
                        }
                    }
                };
            };
            _this.onNativeSubmitHandler = function (e) {
                if (e.preventDefault) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                _this.form.submit().catch(function (e) {
                    if (console && console.error) {
                        console.error(e);
                    }
                });
            };
            _this.getValues = function () {
                return _this.form.getValue();
            };
            _this.submit = function () {
                return _this.form.submit();
            };
            _this.reset = function (params, validate) {
                if (validate === void 0) { validate = true; }
                var forceClear;
                if (utils_1.isObj(params)) {
                    forceClear = !!params.forceClear;
                    validate = !utils_1.isEmpty(params.validate) ? params.validate : validate;
                }
                _this.form.reset(forceClear, validate);
            };
            _this.validate = function () {
                return _this.form.validate();
            };
            _this.dispatch = function (type, payload) {
                _this.form.dispatchEffect(type, payload);
            };
            _this.initialized = false;
            _this.form = core_1.createForm({
                initialValues: props.defaultValue || props.initialValues,
                values: props.value,
                effects: props.effects,
                subscribes: props.subscribes,
                schema: props.schema,
                editable: props.editable,
                traverse: function (schema) {
                    var traverse = schema &&
                        core_2.getFormFieldPropsTransformer(schema['x-component'] || schema.type);
                    return traverse ? traverse(schema) : schema;
                },
                onSubmit: _this.onSubmitHandler(props),
                onFormChange: _this.onFormChangeHandler(props),
                onFieldChange: _this.onFieldChangeHandler(props),
                onValidateFailed: _this.onValidateFailed(props),
                onReset: _this.onResetHandler(props),
                onFormWillInit: function (form) {
                    props.implementActions(_this.getActions(form));
                }
            });
            _this.formState = {};
            _this.initialized = true;
            return _this;
        }
        StateForm.prototype.getActions = function (form) {
            return {
                setFormState: form.setFormState,
                getFormState: form.getFormState,
                setFieldState: form.setFieldState,
                getFieldState: form.getFieldState,
                reset: this.reset,
                submit: this.submit,
                validate: this.validate,
                getSchema: this.getSchema,
                dispatch: this.dispatch
            };
        };
        StateForm.prototype.notify = function (payload) {
            var _a = this.props, broadcast = _a.broadcast, schema = _a.schema;
            if (broadcast) {
                payload.schema = schema;
                broadcast.notify(payload);
            }
        };
        StateForm.prototype.onFormChangeHandler = function (props) {
            var _this = this;
            var lastState = this.formState;
            return function (_a) {
                var formState = _a.formState;
                if (_this.unmounted) {
                    return;
                }
                if (lastState && lastState.pristine !== formState.pristine) {
                    if (lastState.pristine) {
                        _this.notify({
                            type: 'changed',
                            state: formState
                        });
                    }
                    else {
                        _this.notify({
                            type: 'reseted',
                            state: formState
                        });
                    }
                }
                lastState = formState;
                _this.formState = formState;
                if (!_this.initialized) {
                    _this.notify({
                        type: 'initialize',
                        state: formState
                    });
                }
            };
        };
        StateForm.prototype.onResetHandler = function ($props) {
            var _this = this;
            return function (_a) {
                var formState = _a.formState;
                var props = _this.props || $props;
                if (props.onReset) {
                    props.onReset(utils_1.clone(formState.values));
                }
            };
        };
        StateForm.prototype.componentDidUpdate = function (prevProps) {
            var _a = this.props, value = _a.value, editable = _a.editable, initialValues = _a.initialValues;
            if (!utils_1.isEmpty(value) && !utils_1.isEqual(value, prevProps.value)) {
                this.form.changeValues(value);
            }
            else if (this.form.isDirtyValues(value)) {
                this.form.changeValues(value);
            }
            if (!utils_1.isEmpty(initialValues) &&
                !utils_1.isEqual(initialValues, prevProps.initialValues)) {
                this.form.initialize({
                    values: initialValues,
                    initialValues: initialValues
                });
            }
            if (!utils_1.isEmpty(editable) && !utils_1.isEqual(editable, prevProps.editable)) {
                this.form.changeEditable(editable);
            }
        };
        StateForm.prototype.componentDidMount = function () {
            var _this = this;
            this.unmounted = false;
            this.form.dispatchEffect('onFormMount', this.form.publishState());
            this.unsubscribe = this.props.broadcast.subscribe(function (_a) {
                var type = _a.type, name = _a.name, payload = _a.payload;
                if (_this.unmounted) {
                    return;
                }
                if (type === 'submit') {
                    _this.submit();
                }
                else if (type === 'reset') {
                    _this.reset();
                }
                else if (type === 'dispatch') {
                    _this.form.dispatchEffect(name, payload);
                }
            });
        };
        StateForm.prototype.componentWillUnmount = function () {
            this.unmounted = true;
            if (this.form) {
                this.form.destructor();
                this.unsubscribe();
                delete this.form;
            }
        };
        StateForm.prototype.render = function () {
            var _a = this.props, onSubmit = _a.onSubmit, onChange = _a.onChange, onReset = _a.onReset, onValidateFailed = _a.onValidateFailed, initialValues = _a.initialValues, defaultValue = _a.defaultValue, effects = _a.effects, implementActions = _a.implementActions, dispatch = _a.dispatch, editable = _a.editable, subscribes = _a.subscribes, subscription = _a.subscription, children = _a.children, schema = _a.schema, broadcast = _a.broadcast, locale = _a.locale, value = _a.value, others = __rest(_a, ["onSubmit", "onChange", "onReset", "onValidateFailed", "initialValues", "defaultValue", "effects", "implementActions", "dispatch", "editable", "subscribes", "subscription", "children", "schema", "broadcast", "locale", "value"]);
            return (react_1.default.createElement(context_1.StateContext.Provider, { value: {
                    locale: locale,
                    form: this.form,
                    actions: this.getActions(this.form),
                    getSchema: this.getSchema,
                    broadcast: broadcast
                } },
                react_1.default.createElement(Form, __assign({}, others, { onSubmit: this.onNativeSubmitHandler }), children)));
        };
        StateForm.displayName = 'StateForm';
        StateForm.defaultProps = {
            locale: {}
        };
        return StateForm;
    }(react_1.Component));
    return react_eva_1.connect({ autoRun: false })(broadcast_1.FormBridge()(StateForm));
});
