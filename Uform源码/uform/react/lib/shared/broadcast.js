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
var utils_1 = require("@uform/utils");
var react_eva_1 = require("react-eva");
var utils_2 = require("../utils");
var context_1 = require("./context");
var FormProvider = (function (_super) {
    __extends(FormProvider, _super);
    function FormProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.broadcast = new utils_2.Broadcast();
        return _this;
    }
    FormProvider.prototype.componentWillUnmount = function () {
        this.broadcast.unsubscribe();
    };
    FormProvider.prototype.render = function () {
        var children = this.props.children;
        return (react_1.default.createElement(context_1.BroadcastContext.Provider, { value: this.broadcast }, utils_1.isFn(children) ? children(this.broadcast) : children));
    };
    FormProvider.displayName = 'FormProvider';
    return FormProvider;
}(react_1.Component));
exports.FormProvider = FormProvider;
exports.FormBridge = function () { return function (Target) {
    var Broadcast = function (props) {
        var broadcast = react_1.useContext(context_1.BroadcastContext);
        if (!broadcast) {
            return (react_1.default.createElement(FormProvider, null, function (broadcast) { return react_1.default.createElement(Target, __assign({}, props, { broadcast: broadcast })); }));
        }
        return react_1.default.createElement(Target, __assign({}, props, { broadcast: broadcast }));
    };
    Broadcast.displayName = 'FormBroadcast';
    return Broadcast;
}; };
exports.useForm = function (options) {
    if (options === void 0) { options = {}; }
    var _a = react_1.useState({}), value = _a[0], setState = _a[1];
    var broadcast = react_1.useContext(context_1.BroadcastContext);
    var initialized = false;
    var finalValue = value;
    react_1.useMemo(function () {
        if (broadcast) {
            broadcast.subscribe(function (_a) {
                var type = _a.type, state = _a.state, schema = _a.schema, others = __rest(_a, ["type", "state", "schema"]);
                if (type !== 'submit' && type !== 'reset') {
                    if (initialized) {
                        if (options.selector) {
                            if ((utils_1.isFn(options.selector) && options.selector({ type: type, state: state })) ||
                                (utils_1.isArr(options.selector) &&
                                    options.selector.indexOf(type) > -1) ||
                                (utils_1.isStr(options.selector) && options.selector === type)) {
                                setState(__assign({ status: type, state: state,
                                    schema: schema }, others));
                            }
                        }
                    }
                    else {
                        finalValue = __assign({ status: type, state: state,
                            schema: schema }, others);
                    }
                }
            });
            initialized = true;
        }
    }, [broadcast]);
    var _b = finalValue, status = _b.status, state = _b.state, schema = _b.schema;
    return {
        status: status,
        state: state,
        schema: schema,
        submit: function () {
            if (broadcast) {
                broadcast.notify({ type: 'submit' });
            }
        },
        reset: function () {
            if (broadcast) {
                broadcast.notify({ type: 'reset' });
            }
        },
        dispatch: function (name, payload) {
            if (broadcast) {
                broadcast.notify({ type: 'dispatch', name: name, payload: payload });
            }
        }
    };
};
exports.useFormController = function (_a) {
    var actions = _a.actions, effects = _a.effects;
    var implementActions = react_eva_1.useEva({ actions: actions }).implementActions;
    var context = react_1.useContext(context_1.StateContext);
    var dispatch = react_1.useMemo(function () {
        if (context && context.form) {
            effects(context.form.selectEffect, context.actions);
            return context.form.dispatchEffect;
        }
    }, []);
    return {
        dispatch: dispatch,
        implementActions: implementActions
    };
};
exports.useFormController.createActions = react_eva_1.createActions;
exports.FormConsumer = function (_a) {
    var children = _a.children, selector = _a.selector;
    var formApi = exports.useForm({ selector: selector });
    if (!formApi) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    if (utils_1.isFn(children)) {
        return children(formApi);
    }
    else {
        return children || react_1.default.createElement(react_1.default.Fragment, null);
    }
};
