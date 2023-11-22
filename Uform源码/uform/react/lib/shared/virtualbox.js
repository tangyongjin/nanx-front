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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var pascal_case_1 = __importDefault(require("pascal-case"));
var core_1 = require("./core");
var markup_1 = require("../decorators/markup");
var utils_1 = require("../utils");
var field_1 = require("../state/field");
exports.createVirtualBox = function (name, component, isController) {
    var _a;
    utils_1.registerVirtualboxFlag(name);
    core_1.registerFormField(name, (_a = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.render = function () {
                var _a = this.props, schema = _a.schema, schemaPath = _a.schemaPath, path = _a.path, getOrderProperties = _a.getOrderProperties;
                var parentPath = path.slice(0, path.length - 1);
                var properties = getOrderProperties(schema);
                var children = properties.map(function (_a) {
                    var key = _a.key;
                    var newPath = parentPath.concat(key);
                    var newName = newPath.join('.');
                    var newSchemaPath = schemaPath.concat(key);
                    return (react_1.default.createElement(field_1.FormField, { key: newSchemaPath, name: newName, path: newPath, schemaPath: newSchemaPath }));
                });
                return react_1.default.createElement(component, isController ? this.props : schema['x-props'], children);
            };
            return class_1;
        }(react_1.default.PureComponent)),
        _a.displayName = 'VirtualBoxWrapper',
        _a), true);
    var VirtualBox = function (_a) {
        var children = _a.children, fieldName = _a.name, render = _a.render, props = __rest(_a, ["children", "name", "render"]);
        return (react_1.default.createElement(markup_1.SchemaField, { type: "object", name: fieldName, "x-component": name, "x-props": props, "x-render": render }, children));
    };
    if (component.defaultProps) {
        VirtualBox.defaultProps = component.defaultProps;
    }
    VirtualBox.displayName = pascal_case_1.default(name);
    return VirtualBox;
};
exports.createControllerBox = function (name, component) { return exports.createVirtualBox(name, component, true); };
exports.FormSlot = function (_a) {
    var name = _a.name, children = _a.children;
    return (react_1.default.createElement(markup_1.SchemaField, { type: "object", name: name, "x-component": "slot", renderChildren: children }));
};
