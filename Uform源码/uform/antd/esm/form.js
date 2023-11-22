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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var _a;
var _b;
import React from 'react';
import classNames from 'classnames';
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Popover from "antd/lib/popover";
import Icon from "antd/lib/icon";
import styled from 'styled-components';
import { registerFormWrapper, registerFieldMiddleware } from '@uform/react';
import LOCALE from './locale';
import { isFn, moveTo, isStr, stringLength } from './utils';
export var FormLayoutProvider = (_a = React.createContext(undefined), _a.Provider), FormLayoutConsumer = _a.Consumer;
var normalizeCol = function (col) {
    return typeof col === 'object' ? col : { span: col };
};
var getParentNode = function (node, selector) {
    if (!node || (node && !node.matches)) {
        return;
    }
    if (node.matches(selector)) {
        return node;
    }
    else {
        return getParentNode(node.parentNode || node.parentElement, selector);
    }
};
var isPopDescription = function (description, maxTipsNum) {
    if (maxTipsNum === void 0) { maxTipsNum = 30; }
    if (isStr(description)) {
        return stringLength(description) > maxTipsNum;
    }
    else {
        return React.isValidElement(description);
    }
};
export var FormItem = styled((_b = (function (_super) {
        __extends(FormItem, _super);
        function FormItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormItem.prototype.render = function () {
            var _a;
            var _b = this.props, className = _b.className, labelAlign = _b.labelAlign, labelTextAlign = _b.labelTextAlign, style = _b.style, prefix = _b.prefix, wrapperCol = _b.wrapperCol, labelCol = _b.labelCol, size = _b.size, help = _b.help, extra = _b.extra, noMinHeight = _b.noMinHeight, isTableColItem = _b.isTableColItem, validateState = _b.validateState, autoAddColon = _b.autoAddColon, maxTipsNum = _b.maxTipsNum, required = _b.required, type = _b.type, schema = _b.schema, others = __rest(_b, ["className", "labelAlign", "labelTextAlign", "style", "prefix", "wrapperCol", "labelCol", "size", "help", "extra", "noMinHeight", "isTableColItem", "validateState", "autoAddColon", "maxTipsNum", "required", "type", "schema"]);
            var itemClassName = classNames((_a = {},
                _a[prefix + "form-item"] = true,
                _a["" + prefix + labelAlign] = labelAlign,
                _a["has-" + validateState] = !!validateState,
                _a["" + prefix + size] = !!size,
                _a["" + className] = !!className,
                _a["field-" + type] = !!type,
                _a));
            var Tag = (wrapperCol || labelCol) && labelAlign !== 'top' ? Row : 'div';
            var label = labelAlign === 'inset' ? null : this.getItemLabel();
            return (React.createElement(Tag, __assign({}, others, { gutter: 0, className: itemClassName, style: style }),
                label,
                this.getItemWrapper()));
        };
        FormItem.prototype.getItemLabel = function () {
            var _a;
            var _b = this.props, id = _b.id, required = _b.required, label = _b.label, labelCol = _b.labelCol, wrapperCol = _b.wrapperCol, prefix = _b.prefix, extra = _b.extra, labelAlign = _b.labelAlign, labelTextAlign = _b.labelTextAlign, autoAddColon = _b.autoAddColon, isTableColItem = _b.isTableColItem, maxTipsNum = _b.maxTipsNum;
            if (!label || isTableColItem) {
                return null;
            }
            var ele = (React.createElement("label", { htmlFor: id, required: required, key: "label", className: classNames({
                    'no-colon': !autoAddColon
                }) }, label));
            var cls = classNames((_a = {},
                _a[prefix + "form-item-label"] = true,
                _a["" + prefix + labelTextAlign] = !!labelTextAlign,
                _a));
            if ((wrapperCol || labelCol) && labelAlign !== 'top') {
                return (React.createElement(Col, __assign({}, normalizeCol(labelCol), { className: cls }),
                    ele,
                    isPopDescription(extra, maxTipsNum) && this.renderHelper()));
            }
            return (React.createElement("div", { className: cls },
                ele,
                isPopDescription(extra, maxTipsNum) && this.renderHelper()));
        };
        FormItem.prototype.getItemWrapper = function () {
            var _a = this.props, labelCol = _a.labelCol, wrapperCol = _a.wrapperCol, children = _a.children, extra = _a.extra, label = _a.label, labelAlign = _a.labelAlign, help = _a.help, prefix = _a.prefix, noMinHeight = _a.noMinHeight, size = _a.size, isTableColItem = _a.isTableColItem, maxTipsNum = _a.maxTipsNum;
            var message = (React.createElement("div", { className: prefix + "form-item-msg " + (!noMinHeight ? prefix + "form-item-space" : '') },
                help && React.createElement("div", { className: prefix + "form-item-help" }, help),
                !help && !isPopDescription(extra, maxTipsNum) && (React.createElement("div", { className: prefix + "form-item-extra" }, extra))));
            var ele = (React.createElement("div", { className: prefix + "form-item-control" },
                React.cloneElement(children, { size: size }),
                message));
            if ((wrapperCol || labelCol) &&
                labelAlign !== 'top' &&
                !isTableColItem &&
                label) {
                return (React.createElement(Col, __assign({}, normalizeCol(wrapperCol), { key: "item" }), ele));
            }
            return React.createElement(React.Fragment, null, ele);
        };
        FormItem.prototype.renderHelper = function () {
            return (React.createElement(Popover, { placement: "top", content: this.props.extra },
                React.createElement(Icon, { type: "question-circle", className: this.props.prefix + "form-tips" })));
        };
        return FormItem;
    }(React.Component)),
    _b.defaultProps = {
        prefix: 'ant-'
    },
    _b))(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 0 !important;\n  .ant-form-item-control-wrapper {\n    line-height: 32px;\n  }\n  .ant-form-item-control {\n    line-height: 32px;\n  }\n  &.field-table {\n    .ant-form-item-control {\n      overflow: auto;\n    }\n  }\n  .antd-uploader {\n    display: block;\n  }\n  .ant-form-item-msg {\n    &.ant-form-item-space {\n      min-height: 18px;\n      margin-bottom: 2px;\n      .ant-form-item-help,\n      .ant-form-item-extra {\n        margin-top: 0;\n        line-height: 1.5;\n      }\n    }\n  }\n  .ant-form-tips {\n    margin-left: -5px;\n    margin-right: 10px;\n    transform: translateY(1px);\n  }\n  .ant-form-item-extra {\n    color: #888;\n    font-size: 12px;\n    line-height: 1.7;\n  }\n  .ant-col {\n    padding-right: 0;\n  }\n  .ant-card-head {\n    background: none;\n  }\n  .ant-form-item-label label {\n    color: #666;\n    font-size: 14px;\n    &.no-colon:after {\n      content: '';\n    }\n  }\n  ul {\n    padding: 0;\n    li {\n      margin: 0;\n      & + li {\n        margin: 0;\n      }\n    }\n  }\n"], ["\n  margin-bottom: 0 !important;\n  .ant-form-item-control-wrapper {\n    line-height: 32px;\n  }\n  .ant-form-item-control {\n    line-height: 32px;\n  }\n  &.field-table {\n    .ant-form-item-control {\n      overflow: auto;\n    }\n  }\n  .antd-uploader {\n    display: block;\n  }\n  .ant-form-item-msg {\n    &.ant-form-item-space {\n      min-height: 18px;\n      margin-bottom: 2px;\n      .ant-form-item-help,\n      .ant-form-item-extra {\n        margin-top: 0;\n        line-height: 1.5;\n      }\n    }\n  }\n  .ant-form-tips {\n    margin-left: -5px;\n    margin-right: 10px;\n    transform: translateY(1px);\n  }\n  .ant-form-item-extra {\n    color: #888;\n    font-size: 12px;\n    line-height: 1.7;\n  }\n  .ant-col {\n    padding-right: 0;\n  }\n  .ant-card-head {\n    background: none;\n  }\n  .ant-form-item-label label {\n    color: #666;\n    font-size: 14px;\n    &.no-colon:after {\n      content: '';\n    }\n  }\n  ul {\n    padding: 0;\n    li {\n      margin: 0;\n      & + li {\n        margin: 0;\n      }\n    }\n  }\n"])));
var toArr = function (val) { return (Array.isArray(val) ? val : val ? [val] : []); };
registerFormWrapper(function (OriginForm) {
    OriginForm = styled(OriginForm)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    &.ant-form-inline,\n    .ant-form-inline {\n      display: flex;\n      .rs-uform-content {\n        margin-right: 15px;\n      }\n      .ant-form-item {\n        display: inline-block;\n        vertical-align: top;\n      }\n      .ant-form-item:not(:last-child) {\n        margin-right: 20px;\n      }\n\n      .ant-form-item.ant-left .ant-form-item-control {\n        display: inline-block;\n        display: table-cell\0;\n        vertical-align: top;\n        line-height: 0;\n      }\n    }\n    .ant-form-item-label {\n      line-height: 32px;\n    }\n    .ant-form-item-label label[required]:before {\n      margin-right: 4px;\n      content: '*';\n      color: #ff3000;\n    }\n    .ant-form-item-help {\n      margin-top: 4px;\n      font-size: 12px;\n      line-height: 1.5;\n      color: #999;\n    }\n    .ant-form-item.has-error .ant-form-item-help {\n      color: #ff3000;\n    }\n\n    .ant-table {\n      table {\n        table-layout: auto;\n      }\n    }\n  "], ["\n    &.ant-form-inline,\n    .ant-form-inline {\n      display: flex;\n      .rs-uform-content {\n        margin-right: 15px;\n      }\n      .ant-form-item {\n        display: inline-block;\n        vertical-align: top;\n      }\n      .ant-form-item:not(:last-child) {\n        margin-right: 20px;\n      }\n\n      .ant-form-item.ant-left .ant-form-item-control {\n        display: inline-block;\n        display: table-cell\\0;\n        vertical-align: top;\n        line-height: 0;\n      }\n    }\n    .ant-form-item-label {\n      line-height: 32px;\n    }\n    .ant-form-item-label label[required]:before {\n      margin-right: 4px;\n      content: '*';\n      color: #ff3000;\n    }\n    .ant-form-item-help {\n      margin-top: 4px;\n      font-size: 12px;\n      line-height: 1.5;\n      color: #999;\n    }\n    .ant-form-item.has-error .ant-form-item-help {\n      color: #ff3000;\n    }\n\n    .ant-table {\n      table {\n        table-layout: auto;\n      }\n    }\n  "])));
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.FormRef = React.createRef();
            return _this;
        }
        Form.prototype.render = function () {
            var _a;
            var _b = this.props, className = _b.className, inline = _b.inline, size = _b.size, labelAlign = _b.labelAlign, labelTextAlign = _b.labelTextAlign, autoAddColon = _b.autoAddColon, children = _b.children, labelCol = _b.labelCol, layout = _b.layout, wrapperCol = _b.wrapperCol, maxTipsNum = _b.maxTipsNum, style = _b.style, prefix = _b.prefix, others = __rest(_b, ["className", "inline", "size", "labelAlign", "labelTextAlign", "autoAddColon", "children", "labelCol", "layout", "wrapperCol", "maxTipsNum", "style", "prefix"]);
            var isInline = inline || layout === 'line';
            var formClassName = classNames((_a = {},
                _a[prefix + "form"] = true,
                _a[prefix + "form-" + (isInline ? 'inline' : layout)] = true,
                _a["" + prefix + size] = size,
                _a[prefix + "form-" + labelAlign] = !!labelAlign,
                _a[className] = !!className,
                _a));
            return (React.createElement(FormLayoutProvider, { value: {
                    labelAlign: labelAlign,
                    labelTextAlign: labelTextAlign,
                    labelCol: labelCol,
                    wrapperCol: wrapperCol,
                    maxTipsNum: maxTipsNum,
                    inline: isInline,
                    size: size,
                    autoAddColon: autoAddColon,
                    FormRef: this.FormRef
                } },
                React.createElement(OriginForm, __assign({}, others, { formRef: this.FormRef, onValidateFailed: this.validateFailedHandler(others.onValidateFailed), className: formClassName, style: style }), children)));
        };
        Form.prototype.validateFailedHandler = function (onValidateFailed) {
            var _this = this;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (isFn(onValidateFailed)) {
                    onValidateFailed.apply(void 0, args);
                }
                var container = _this.FormRef.current;
                if (container) {
                    var errors = container.querySelectorAll('.ant-form-item-help');
                    if (errors && errors.length) {
                        var node = getParentNode(errors[0], '.ant-form-item');
                        if (node) {
                            moveTo(node);
                        }
                    }
                }
            };
        };
        Form.defaultProps = {
            component: 'form',
            prefix: 'ant-',
            size: 'default',
            labelAlign: 'left',
            layout: 'horizontal',
            locale: LOCALE,
            autoAddColon: true
        };
        Form.displayName = 'SchemaForm';
        Form.LOCALE = LOCALE;
        return Form;
    }(React.Component));
    Form.LOCALE = LOCALE;
    return Form;
});
var isTableColItem = function (path, getSchema) {
    var schema = getSchema(path);
    return schema && schema.type === 'array' && schema['x-component'] === 'table';
};
registerFieldMiddleware(function (Field) {
    return function (props) {
        var name = props.name, errors = props.errors, editable = props.editable, path = props.path, required = props.required, schema = props.schema, schemaPath = props.schemaPath, getSchema = props.getSchema;
        if (path.length === 0) {
            return React.createElement(Field, props);
        }
        return React.createElement(FormLayoutConsumer, {}, function (_a) {
            var labelAlign = _a.labelAlign, labelTextAlign = _a.labelTextAlign, labelCol = _a.labelCol, maxTipsNum = _a.maxTipsNum, wrapperCol = _a.wrapperCol, size = _a.size, autoAddColon = _a.autoAddColon;
            return React.createElement(FormItem, __assign({ labelAlign: labelAlign,
                labelTextAlign: labelTextAlign,
                labelCol: labelCol,
                maxTipsNum: maxTipsNum,
                wrapperCol: wrapperCol,
                autoAddColon: autoAddColon,
                size: size, required: editable === false ? false : required }, schema['x-item-props'], { label: schema.title, noMinHeight: schema.type === 'object' && !schema['x-component'], isTableColItem: isTableColItem(schemaPath.slice(0, schemaPath.length - 2), getSchema), type: schema['x-component'] || schema.type, id: name, validateState: toArr(errors).length ? 'error' : undefined, extra: schema.description, help: toArr(errors).join(' , ') ||
                    (schema['x-item-props'] && schema['x-item-props'].help) }), React.createElement(Field, props));
        });
    };
});
var templateObject_1, templateObject_2;
