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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("../shared/core");
var utils_1 = require("../utils");
exports.default = (function () {
    return core_1.registerFormField('object', (function (_super) {
        __extends(ObjectField, _super);
        function ObjectField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObjectField.prototype.render = function () {
            return this.renderProperties();
        };
        ObjectField.prototype.renderProperties = function () {
            var _a = this.props, renderField = _a.renderField, getOrderProperties = _a.getOrderProperties;
            var properties = getOrderProperties();
            var children = [];
            utils_1.each(properties, function (_a) {
                var key = (_a === void 0 ? {} : _a).key;
                if (key) {
                    children.push(renderField(key, true));
                }
            });
            return children;
        };
        return ObjectField;
    }(react_1.default.Component)));
});
