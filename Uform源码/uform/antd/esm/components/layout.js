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
var _a, _b;
import React, { Component, useLayoutEffect, useRef } from 'react';
import { createVirtualBox, createControllerBox } from '@uform/react';
import { toArr } from '@uform/utils';
import Card from "antd/lib/card";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import styled from 'styled-components';
import cls from 'classnames';
import { FormLayoutConsumer, FormItem, FormLayoutProvider } from '../form';
var normalizeCol = function (col, defaultValue) {
    if (defaultValue === void 0) { defaultValue = { span: 0 }; }
    if (!col) {
        return defaultValue;
    }
    else {
        return typeof col === 'object' ? col : { span: col };
    }
};
export var FormLayoutItem = function (props) {
    return React.createElement(FormLayoutConsumer, {}, function (_a) {
        var labelAlign = _a.labelAlign, labelTextAlign = _a.labelTextAlign, labelCol = _a.labelCol, wrapperCol = _a.wrapperCol, size = _a.size, autoAddColon = _a.autoAddColon;
        return React.createElement(FormItem, __assign({ labelAlign: labelAlign,
            labelTextAlign: labelTextAlign,
            labelCol: labelCol,
            wrapperCol: wrapperCol,
            autoAddColon: autoAddColon,
            size: size }, props), props.children);
    });
};
export var FormLayout = createVirtualBox('layout', function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (React.createElement(FormLayoutConsumer, null, function (value) {
        var newValue = __assign({}, value, props);
        var child = newValue.inline || newValue.className || newValue.style ? (React.createElement("div", { className: cls(newValue.className, {
                'ant-form ant-form-inline': !!newValue.inline
            }), style: newValue.style }, children)) : (children);
        return (React.createElement(FormLayoutProvider, { value: newValue }, child));
    }));
});
export var FormItemGrid = createVirtualBox('grid', (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        var title = this.props.title;
        if (title) {
            return this.renderFormItem(this.renderGrid());
        }
        else {
            return this.renderGrid();
        }
    };
    class_1.prototype.renderFormItem = function (children) {
        var _a = this.props, title = _a.title, help = _a.help, name = _a.name, extra = _a.extra, props = __rest(_a, ["title", "help", "name", "extra"]);
        return React.createElement(FormLayoutItem, __assign({ label: title, noMinHeight: true, id: name, extra: extra,
            help: help }, props), children);
    };
    class_1.prototype.renderGrid = function () {
        var _a = this.props, rawChildren = _a.children, rawCols = _a.cols, title = _a.title, description = _a.description, help = _a.help, extra = _a.extra, props = __rest(_a, ["children", "cols", "title", "description", "help", "extra"]);
        var children = toArr(rawChildren);
        var childNum = children.length;
        var cols = toArr(rawCols).map(function (col) { return normalizeCol(col); });
        if (cols.length < childNum) {
            var offset = childNum - cols.length;
            var lastSpan = 24 -
                cols.reduce(function (buf, col) {
                    return (buf +
                        Number(col.span ? col.span : 0) +
                        Number(col.offset ? col.offset : 0));
                }, 0);
            for (var i = 0; i < offset; i++) {
                cols.push({ span: Math.floor(lastSpan / offset) });
            }
        }
        return (React.createElement(Row, __assign({}, props), children.reduce(function (buf, child, key) {
            return child
                ? buf.concat(React.createElement(Col, __assign({ key: key }, cols[key]), child))
                : buf;
        }, [])));
    };
    return class_1;
}(Component)));
export var FormCard = createVirtualBox('card', styled((_a = (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_2.prototype.render = function () {
            var _a = this.props, children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
            return (React.createElement(Card, __assign({ className: className }, props), children));
        };
        return class_2;
    }(Component)),
    _a.defaultProps = {},
    _a))(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin-bottom: 30px;\n    .ant-card-body {\n      padding-top: 30px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      display: block;\n      margin-bottom: 30px;\n    }\n  "], ["\n    margin-bottom: 30px;\n    .ant-card-body {\n      padding-top: 30px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      display: block;\n      margin-bottom: 30px;\n    }\n  "]))));
export var FormBlock = createVirtualBox('block', styled((_b = (function (_super) {
        __extends(class_3, _super);
        function class_3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_3.prototype.render = function () {
            var _a = this.props, children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
            return (React.createElement(Card, __assign({ className: className }, props), children));
        };
        return class_3;
    }(Component)),
    _b.defaultProps = {},
    _b))(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    margin-bottom: 0px;\n    .ant-card-body {\n      padding-top: 20px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      border: none;\n      padding: 0 15px;\n      padding-bottom: 15px;\n      display: block;\n      box-shadow: none;\n    }\n    .ant-card-head {\n      padding: 0 !important;\n      min-height: 24px;\n      font-weight: normal;\n    }\n    .ant-card-head-title {\n      padding: 0;\n    }\n  "], ["\n    margin-bottom: 0px;\n    .ant-card-body {\n      padding-top: 20px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      border: none;\n      padding: 0 15px;\n      padding-bottom: 15px;\n      display: block;\n      box-shadow: none;\n    }\n    .ant-card-head {\n      padding: 0 !important;\n      min-height: 24px;\n      font-weight: normal;\n    }\n    .ant-card-head-title {\n      padding: 0;\n    }\n  "]))));
export var FormTextBox = createControllerBox('text-box', styled(function (_a) {
    var children = _a.children, schema = _a.schema, className = _a.className;
    var _b = schema['x-props'], title = _b.title, help = _b.help, text = _b.text, name = _b.name, extra = _b.extra, props = __rest(_b, ["title", "help", "text", "name", "extra"]);
    var ref = useRef();
    var arrChildren = toArr(children);
    var split = String(text).split('%s');
    useLayoutEffect(function () {
        if (ref.current) {
            var elements = ref.current.querySelectorAll('.text-box-field');
            var syncLayouts_1 = Array.prototype.map.call(elements, function (el) {
                return [
                    el,
                    function () {
                        var ctrl = el.querySelector('.ant-form-item-control:first-child');
                        if (ctrl) {
                            el.style.width = ctrl.getBoundingClientRect().width + 'px';
                        }
                    }
                ];
            });
            syncLayouts_1.forEach(function (_a) {
                var el = _a[0], handler = _a[1];
                el.addEventListener('DOMSubtreeModified', handler);
            });
            return function () {
                syncLayouts_1.forEach(function (_a) {
                    var el = _a[0], handler = _a[1];
                    el.removeEventListener('DOMSubtreeModified', handler);
                });
            };
        }
    }, []);
    var index = 0;
    var newChildren = split.reduce(function (buf, item, key) {
        return buf.concat(item ? (React.createElement("span", { key: index++, className: "text-box-words" }, item)) : null, arrChildren[key] ? (React.createElement("div", { key: index++, className: "text-box-field" }, arrChildren[key])) : null);
    }, []);
    if (!title) {
        return (React.createElement("div", { className: className, ref: ref }, newChildren));
    }
    return React.createElement(FormLayoutItem, __assign({ label: title, noMinHeight: true, id: name, extra: extra,
        help: help }, props), React.createElement("div", { className: className, ref: ref }, newChildren));
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: flex;\n    .text-box-words {\n      font-size: 14px;\n      line-height: 34px;\n      color: #333;\n      ", "\n    }\n    .text-box-words:nth-child(1) {\n      margin-left: 0;\n    }\n    .text-box-field {\n      display: inline-block;\n    }\n  "], ["\n    display: flex;\n    .text-box-words {\n      font-size: 14px;\n      line-height: 34px;\n      color: #333;\n      ",
    "\n    }\n    .text-box-words:nth-child(1) {\n      margin-left: 0;\n    }\n    .text-box-field {\n      display: inline-block;\n    }\n  "])), function (props) {
    var editable = props.editable, schema = props.schema;
    var gutter = schema['x-props'].gutter;
    if (!editable) {
        return {
            margin: 0
        };
    }
    return {
        margin: "0 " + (gutter === 0 || gutter ? gutter : 10) + "px"
    };
}));
var templateObject_1, templateObject_2, templateObject_3;
