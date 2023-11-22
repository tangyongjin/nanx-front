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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
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
var validator_1 = require("@uform/validator");
var core_1 = require("@uform/core");
exports.FormPath = core_1.FormPath;
var react_eva_1 = require("react-eva");
var core_2 = require("./shared/core");
exports.registerFieldMiddleware = core_2.registerFieldMiddleware;
exports.registerFormFieldPropsTransformer = core_2.registerFormFieldPropsTransformer;
exports.registerFormField = core_2.registerFormField;
exports.registerFormFields = core_2.registerFormFields;
exports.registerFormWrapper = core_2.registerFormWrapper;
var field_1 = require("./state/field");
var utils_1 = require("./utils");
exports.calculateSchemaInitialValues = utils_1.calculateSchemaInitialValues;
var markup_1 = require("./decorators/markup");
var initialize_1 = __importDefault(require("./initialize"));
__export(require("./shared/virtualbox"));
__export(require("./decorators/connect"));
__export(require("./shared/broadcast"));
__export(require("./shared/array"));
initialize_1.default();
exports.SchemaForm = markup_1.SchemaMarkup()(React.forwardRef(function (props, ref) {
    var children = props.children, className = props.className, others = __rest(props, ["children", "className"]);
    return (React.createElement(core_2.OriginForm, __assign({ className: "rs-uform " + (className || '') }, others, { ref: ref }),
        React.createElement("div", { className: "rs-uform-content" },
            React.createElement(field_1.FormField, { name: "", path: [], schemaPath: [] })),
        children));
}));
exports.Field = markup_1.SchemaField;
exports.setValidationLocale = validator_1.setLocale;
exports.setValidationLanguage = validator_1.setLanguage;
exports.createFormActions = function () {
    return react_eva_1.createActions('getFormState', 'getFieldState', 'setFormState', 'setFieldState', 'getSchema', 'reset', 'submit', 'validate', 'dispatch');
};
exports.createAsyncFormActions = function () {
    return react_eva_1.createAsyncActions('getFormState', 'getFieldState', 'setFormState', 'setFieldState', 'getSchema', 'reset', 'submit', 'validate', 'dispatch');
};
exports.SchemaForm.displayName = 'SchemaForm';
exports.default = exports.SchemaForm;
