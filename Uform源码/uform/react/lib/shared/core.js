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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var pascal_case_1 = __importDefault(require("pascal-case"));
var utils_1 = require("../utils");
var FIELD_WRAPPERS;
var FORM_FIELDS;
var FIELD_PROPS_TRANSFORMERS;
var FIELD_RENDERER;
var FORM_COMPONENT;
exports.initialContainer = function () {
    var _a;
    FIELD_WRAPPERS = [];
    FORM_FIELDS = {};
    FIELD_PROPS_TRANSFORMERS = {};
    FIELD_RENDERER = undefined;
    FORM_COMPONENT = (_a = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.render = function () {
                var _a = this.props, formRef = _a.formRef, component = _a.component, props = __rest(_a, ["formRef", "component"]);
                return React.createElement(component, __assign({}, props, { ref: formRef }));
            };
            return class_1;
        }(React.Component)),
        _a.defaultProps = {
            component: 'form'
        },
        _a.displayName = 'Form',
        _a);
};
exports.registerFormField = function (name, component, notWrapper) {
    if (utils_1.isNotEmptyStr(name) &&
        (utils_1.isFn(component) || typeof component.styledComponentId === 'string')) {
        if (notWrapper) {
            FORM_FIELDS[utils_1.lowercase(name)] = component;
            FORM_FIELDS[utils_1.lowercase(name)].registerMiddlewares = [];
        }
        else {
            FORM_FIELDS[utils_1.lowercase(name)] = utils_1.compose(component, FIELD_WRAPPERS, true);
            FORM_FIELDS[utils_1.lowercase(name)].registerMiddlewares = FIELD_WRAPPERS;
        }
        FORM_FIELDS[utils_1.lowercase(name)].displayName = pascal_case_1.default(name);
    }
};
exports.registerFormFields = function (fields) {
    utils_1.each(fields, function (component, name) {
        exports.registerFormField(name, component);
    });
};
exports.registerFieldMiddleware = function () {
    var wrappers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        wrappers[_i] = arguments[_i];
    }
    FIELD_WRAPPERS = FIELD_WRAPPERS.concat(wrappers);
    utils_1.each(FORM_FIELDS, function (component, key) {
        if (!component.registerMiddlewares.some(function (wrapper) { return wrappers.indexOf(wrapper) > -1; })) {
            FORM_FIELDS[key] = utils_1.compose(FORM_FIELDS[key], wrappers, true);
            FORM_FIELDS[key].registerMiddlewares = FIELD_WRAPPERS;
        }
    });
};
exports.registerFormWrapper = function () {
    var wrappers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        wrappers[_i] = arguments[_i];
    }
    FORM_COMPONENT = wrappers.reduce(function (buf, fn, index) {
        var comp = utils_1.isFn(fn) ? fn(buf) : buf;
        comp.displayName = "FormWrapperLevel" + index;
        return comp;
    }, FORM_COMPONENT);
};
exports.registerFieldRenderer = function (renderer) {
    FIELD_RENDERER = renderer;
};
exports.registerFormFieldPropsTransformer = function (name, transformer) {
    if (utils_1.isFn(transformer)) {
        FIELD_PROPS_TRANSFORMERS[name] = transformer;
    }
};
exports.getFormFieldPropsTransformer = function (name) {
    return FIELD_PROPS_TRANSFORMERS[name];
};
exports.getFormField = function (name) {
    return FORM_FIELDS[name];
};
exports.getFieldRenderer = function () { return FIELD_RENDERER; };
exports.OriginForm = React.forwardRef(function (props, ref) {
    return React.createElement(FORM_COMPONENT, __assign({}, props, { ref: ref }));
});
