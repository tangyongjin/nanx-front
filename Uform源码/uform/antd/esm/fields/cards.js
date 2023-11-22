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
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { registerFormField } from '@uform/react';
import Card from "antd/lib/card";
import { toArr } from '@uform/utils';
import { ArrayField } from './array';
var FormCardsField = styled((function (_super) {
    __extends(class_1, _super);
    function class_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCardEmpty = function (title) {
            return (React.createElement(Card, { style: _this.getProps('style'), title: title, className: "card-list" }, _this.renderEmpty()));
        };
        return _this;
    }
    class_1.prototype.renderOperations = function (item, index) {
        return (React.createElement(Fragment, null,
            this.renderRemove(index, item),
            this.renderMoveDown(index, item),
            this.renderMoveUp(index),
            this.renderExtraOperations(index)));
    };
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, className = _a.className, schema = _a.schema, renderField = _a.renderField;
        var _b = this.getProps() || {}, title = _b.title, style = _b.style, cls = _b.className, renderAddition = _b.renderAddition, renderRemove = _b.renderRemove, renderEmpty = _b.renderEmpty, renderMoveDown = _b.renderMoveDown, renderMoveUp = _b.renderMoveUp, renderOperations = _b.renderOperations, others = __rest(_b, ["title", "style", "className", "renderAddition", "renderRemove", "renderEmpty", "renderMoveDown", "renderMoveUp", "renderOperations"]);
        return (React.createElement("div", { className: className + " " + cls, style: style, onClick: this.onClearErrorHandler() },
            toArr(value).map(function (item, index) {
                return (React.createElement(Card, __assign({}, others, { title: React.createElement("span", null,
                        index + 1,
                        ". ",
                        title || schema.title), className: "card-list", key: index, extra: _this.renderOperations(item, index) }), renderField(index)));
            }),
            value.length === 0 && this.renderCardEmpty(title),
            React.createElement("div", { className: "addition-wrapper" }, value.length > 0 && this.renderAddition())));
    };
    return class_1;
}(ArrayField)))(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .ant-card-body {\n    padding-top: 30px;\n    padding-bottom: 0 !important;\n  }\n  .ant-card-head-main {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .ant-card {\n    display: block;\n    margin-bottom: 0px;\n    background: #fff;\n    .array-empty-wrapper {\n      display: flex;\n      justify-content: center;\n      cursor: pointer;\n      margin-bottom: 0px;\n      &.disabled {\n        cursor: default;\n      }\n      .array-empty {\n        display: flex;\n        flex-direction: column;\n        margin-bottom: 20px;\n        align-items: center;\n        img {\n          margin-bottom: 16px;\n          height: 85px;\n        }\n        .next-btn-text {\n          color: #888;\n        }\n        .next-icon:before {\n          width: 16px !important;\n          font-size: 16px !important;\n          margin-right: 5px;\n        }\n      }\n    }\n\n    .next-card {\n      box-shadow: none;\n    }\n    .card-list {\n      box-shadow: none;\n      border: 1px solid #eee;\n    }\n\n    .array-item-addition {\n      box-shadow: none;\n      border: 1px solid #eee;\n      transition: all 0.35s ease-in-out;\n      &:hover {\n        border: 1px solid #ccc;\n      }\n    }\n  }\n  .ant-card.card-list {\n    margin-top: 20px;\n  }\n\n  .addition-wrapper .array-item-addition {\n    margin-top: 20px;\n    margin-bottom: 3px;\n  }\n  .cricle-btn {\n    margin-bottom: 0;\n  }\n  .ant-card-extra {\n    display: flex;\n  }\n  .array-item-addition {\n    background: #fff;\n    display: flex;\n    cursor: pointer;\n    padding: 10px 0;\n    justify-content: center;\n    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);\n    .next-btn-text {\n      color: #888;\n    }\n    .next-icon:before {\n      width: 16px !important;\n      font-size: 16px !important;\n      margin-right: 5px;\n    }\n  }\n  .card-list:first-child {\n    margin-top: 0 !important;\n  }\n"], ["\n  .ant-card-body {\n    padding-top: 30px;\n    padding-bottom: 0 !important;\n  }\n  .ant-card-head-main {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .ant-card {\n    display: block;\n    margin-bottom: 0px;\n    background: #fff;\n    .array-empty-wrapper {\n      display: flex;\n      justify-content: center;\n      cursor: pointer;\n      margin-bottom: 0px;\n      &.disabled {\n        cursor: default;\n      }\n      .array-empty {\n        display: flex;\n        flex-direction: column;\n        margin-bottom: 20px;\n        align-items: center;\n        img {\n          margin-bottom: 16px;\n          height: 85px;\n        }\n        .next-btn-text {\n          color: #888;\n        }\n        .next-icon:before {\n          width: 16px !important;\n          font-size: 16px !important;\n          margin-right: 5px;\n        }\n      }\n    }\n\n    .next-card {\n      box-shadow: none;\n    }\n    .card-list {\n      box-shadow: none;\n      border: 1px solid #eee;\n    }\n\n    .array-item-addition {\n      box-shadow: none;\n      border: 1px solid #eee;\n      transition: all 0.35s ease-in-out;\n      &:hover {\n        border: 1px solid #ccc;\n      }\n    }\n  }\n  .ant-card.card-list {\n    margin-top: 20px;\n  }\n\n  .addition-wrapper .array-item-addition {\n    margin-top: 20px;\n    margin-bottom: 3px;\n  }\n  .cricle-btn {\n    margin-bottom: 0;\n  }\n  .ant-card-extra {\n    display: flex;\n  }\n  .array-item-addition {\n    background: #fff;\n    display: flex;\n    cursor: pointer;\n    padding: 10px 0;\n    justify-content: center;\n    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);\n    .next-btn-text {\n      color: #888;\n    }\n    .next-icon:before {\n      width: 16px !important;\n      font-size: 16px !important;\n      margin-right: 5px;\n    }\n  }\n  .card-list:first-child {\n    margin-top: 0 !important;\n  }\n"])));
registerFormField('cards', FormCardsField);
var templateObject_1;
