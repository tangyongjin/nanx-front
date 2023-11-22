"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
require("./form");
require("./fields/string");
require("./fields/number");
require("./fields/boolean");
require("./fields/date");
require("./fields/time");
require("./fields/range");
require("./fields/upload");
require("./fields/checkbox");
require("./fields/radio");
require("./fields/rating");
require("./fields/transfer");
require("./fields/array");
require("./fields/table");
require("./fields/textarea");
require("./fields/password");
require("./fields/cards");
__export(require("@uform/react"));
__export(require("./components/formButtonGroup"));
__export(require("./components/button"));
__export(require("./components/layout"));
var react_1 = __importDefault(require("react"));
var react_2 = require("@uform/react");
var utils_1 = require("./utils");
exports.mapStyledProps = utils_1.mapStyledProps;
exports.mapTextComponent = utils_1.mapTextComponent;
var SchemaForm = (function (_super) {
    __extends(SchemaForm, _super);
    function SchemaForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SchemaForm.prototype.render = function () {
        return react_1.default.createElement(react_2.SchemaForm, __assign({}, this.props));
    };
    return SchemaForm;
}(react_1.default.Component));
exports.default = SchemaForm;
var Field = (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.prototype.render = function () {
        return react_1.default.createElement(react_2.Field, __assign({}, this.props));
    };
    return Field;
}(react_1.default.Component));
exports.Field = Field;
