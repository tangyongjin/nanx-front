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
import React from 'react';
import { FormConsumer } from '@uform/react';
import Button from "antd/lib/button";
export var Submit = function (_a) {
    var showLoading = _a.showLoading, props = __rest(_a, ["showLoading"]);
    return (React.createElement(FormConsumer, { selector: ['submitting', 'submitted'] }, function (_a) {
        var status = _a.status;
        return (React.createElement(Button, __assign({ type: 'primary', htmlType: 'submit', disabled: showLoading ? status === 'submitting' : undefined }, props, { loading: showLoading ? status === 'submitting' : undefined }), props.children || '提交'));
    }));
};
export var Reset = function (props) {
    return (React.createElement(FormConsumer, null, function (_a) {
        var reset = _a.reset;
        return (React.createElement(Button, __assign({}, props, { onClick: reset }), props.children || '重置'));
    }));
};
