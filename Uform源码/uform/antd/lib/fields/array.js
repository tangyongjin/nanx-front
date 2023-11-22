"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
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
var react_1 = __importDefault(require("react"));
var react_2 = require("@uform/react");
var icon_1 = __importDefault(require("antd/lib/icon"));
var styled_components_1 = __importStar(require("styled-components"));
exports.CircleButton = styled_components_1.default['div'].attrs({ className: 'cricle-btn' })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  margin-right:10px;\n  border-radius: ", ";\n  border: ", ";\n  margin-bottom: 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  ", "\n  .op-name {\n    margin-left: 3px;\n  }\n"], ["\n  ", "\n  margin-right:10px;\n  border-radius: ", ";\n  border: ", ";\n  margin-bottom: 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  ",
    "\n  .op-name {\n    margin-left: 3px;\n  }\n"])), function (props) { return (!props.hasText ? 'width:30px; height:30px;' : ''); }, function (props) { return (!props.hasText ? '100px' : 'none'); }, function (props) { return (!props.hasText ? '1px solid #eee' : 'none'); }, function (props) {
    return !props.hasText
        ? "&:hover{\n        background:#f7f4f4;\n      }"
        : '';
});
exports.TextButton = styled_components_1.default['div'].attrs({
    className: 'ant-btn-text'
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: inline-block;\n  height: 20px;\n  line-height: 20px;\n  cursor: pointer;\n  .op-name {\n    margin-left: 4px;\n  }\n  ", "\n"], ["\n  display: inline-block;\n  height: 20px;\n  line-height: 20px;\n  cursor: pointer;\n  .op-name {\n    margin-left: 4px;\n  }\n  ",
    "\n"])), function (props) {
    return props.inline && styled_components_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: inline-block;\n      width: auto;\n    "], ["\n      display: inline-block;\n      width: auto;\n    "])));
});
exports.ArrayField = react_2.createArrayField({
    CircleButton: exports.CircleButton,
    TextButton: exports.TextButton,
    AddIcon: function () { return react_1.default.createElement(icon_1.default, { type: "plus" }); },
    RemoveIcon: function () { return react_1.default.createElement(icon_1.default, { type: "delete" }); },
    MoveDownIcon: function () { return react_1.default.createElement(icon_1.default, { type: "down" }); },
    MoveUpIcon: function () { return react_1.default.createElement(icon_1.default, { type: "up" }); }
});
react_2.registerFormField('array', styled_components_1.default((function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, name = _a.name, value = _a.value, renderField = _a.renderField;
        var cls = this.getProps('className');
        var style = this.getProps('style');
        return (react_1.default.createElement("div", { className: className + " " + cls, style: style, onClick: this.onClearErrorHandler() }, value.map(function (item, index) {
            return (react_1.default.createElement("div", { className: "array-item", key: name + "." + index }, react_1.default.createElement("div", { className: "array-index" }, react_1.default.createElement("span", null, index + 1)), react_1.default.createElement("div", { className: "array-item-wrapper" }, renderField(index)), react_1.default.createElement("div", { className: "array-item-operator" }, _this.renderRemove(index, item), _this.renderMoveDown(index, item), _this.renderMoveUp(index), _this.renderExtraOperations(index))));
        }), this.renderEmpty(), value.length > 0 && this.renderAddition()));
    };
    return class_1;
}(exports.ArrayField)))(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    border: 1px solid #eee;\n    min-width: 400px;\n    .array-item {\n      padding: 20px;\n      padding-bottom: 0;\n      padding-top: 30px;\n      border-bottom: 1px solid #eee;\n      position: relative;\n      &:nth-child(even) {\n        background: #fafafa;\n      }\n      .array-index {\n        position: absolute;\n        top: 0;\n        left: 0;\n        display: block;\n        span {\n          position: absolute;\n          color: rgb(255, 255, 255);\n          z-index: 1;\n          font-size: 12px;\n          top: 3px;\n          left: 3px;\n          line-height: initial;\n        }\n        &::after {\n          content: '';\n          display: block;\n          border-top: 20px solid transparent;\n          border-left: 20px solid transparent;\n          border-bottom: 20px solid transparent;\n          border-right: 20px solid #888;\n          transform: rotate(45deg);\n          position: absolute;\n          z-index: 0;\n          top: -20px;\n          left: -20px;\n        }\n      }\n      .array-item-operator {\n        display: flex;\n        border-top: 1px solid #eee;\n        padding-top: 20px;\n      }\n    }\n    .array-empty-wrapper {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer;\n      &.disabled {\n        cursor: default;\n      }\n      .array-empty {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        margin: 20px;\n        img {\n          display: block;\n          height: 80px;\n        }\n        .ant-btn-text {\n          color: #999;\n          i {\n            margin-right: 3px;\n          }\n        }\n      }\n    }\n    .array-item-wrapper {\n      margin: 0 -20px;\n    }\n    .array-item-addition {\n      padding: 10px 20px;\n      line-height: normal !important;\n      background: #fbfbfb;\n      .ant-btn-text {\n        color: #888;\n        i {\n          margin-right: 3px;\n        }\n      }\n    }\n  "], ["\n    border: 1px solid #eee;\n    min-width: 400px;\n    .array-item {\n      padding: 20px;\n      padding-bottom: 0;\n      padding-top: 30px;\n      border-bottom: 1px solid #eee;\n      position: relative;\n      &:nth-child(even) {\n        background: #fafafa;\n      }\n      .array-index {\n        position: absolute;\n        top: 0;\n        left: 0;\n        display: block;\n        span {\n          position: absolute;\n          color: rgb(255, 255, 255);\n          z-index: 1;\n          font-size: 12px;\n          top: 3px;\n          left: 3px;\n          line-height: initial;\n        }\n        &::after {\n          content: '';\n          display: block;\n          border-top: 20px solid transparent;\n          border-left: 20px solid transparent;\n          border-bottom: 20px solid transparent;\n          border-right: 20px solid #888;\n          transform: rotate(45deg);\n          position: absolute;\n          z-index: 0;\n          top: -20px;\n          left: -20px;\n        }\n      }\n      .array-item-operator {\n        display: flex;\n        border-top: 1px solid #eee;\n        padding-top: 20px;\n      }\n    }\n    .array-empty-wrapper {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer;\n      &.disabled {\n        cursor: default;\n      }\n      .array-empty {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        margin: 20px;\n        img {\n          display: block;\n          height: 80px;\n        }\n        .ant-btn-text {\n          color: #999;\n          i {\n            margin-right: 3px;\n          }\n        }\n      }\n    }\n    .array-item-wrapper {\n      margin: 0 -20px;\n    }\n    .array-item-addition {\n      padding: 10px 20px;\n      line-height: normal !important;\n      background: #fbfbfb;\n      .ant-btn-text {\n        color: #888;\n        i {\n          margin-right: 3px;\n        }\n      }\n    }\n  "]))));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
