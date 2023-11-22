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
var _a;
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from './grid';
import { FormLayoutConsumer } from '../form';
import Sticky from 'react-stikky';
import cls from 'classnames';
import styled from 'styled-components';
var getAlign = function (align) {
    if (align === 'start' || align === 'end') {
        return align;
    }
    if (align === 'left' || align === 'top') {
        return 'flex-start';
    }
    if (align === 'right' || align === 'bottom') {
        return 'flex-end';
    }
    return align;
};
var isElementInViewport = function (rect, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, _d = _b.threshold, threshold = _d === void 0 ? 0 : _d;
    var top = rect.top, right = rect.right, bottom = rect.bottom, left = rect.left, width = rect.width, height = rect.height;
    var intersection = {
        t: bottom,
        r: window.innerWidth - left,
        b: window.innerHeight - top,
        l: right
    };
    var elementThreshold = {
        x: threshold * width,
        y: threshold * height
    };
    return (intersection.t >=
        (offset.top || offset + elementThreshold.y) &&
        intersection.r >=
            (offset.right || offset + elementThreshold.x) &&
        intersection.b >=
            (offset.bottom || offset + elementThreshold.y) &&
        intersection.l >=
            (offset.left || offset + elementThreshold.x));
};
export var FormButtonGroup = styled((_a = (function (_super) {
        __extends(FormButtonGroup, _super);
        function FormButtonGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormButtonGroup.prototype.render = function () {
            var _this = this;
            var _a = this.props, sticky = _a.sticky, style = _a.style, className = _a.className;
            var content = (React.createElement(FormLayoutConsumer, null, function (_a) {
                var inline = (_a === void 0 ? {} : _a).inline;
                return (React.createElement("div", { className: cls(className, {
                        'is-inline': !!inline
                    }), style: style }, _this.renderChildren()));
            }));
            if (sticky) {
                return (React.createElement("div", null,
                    React.createElement(FormLayoutConsumer, null, function (_a) {
                        var FormRef = (_a === void 0 ? {} : _a).FormRef;
                        if (!FormRef) {
                            return;
                        }
                        return (React.createElement(Sticky, { edge: 'bottom', triggerDistance: _this.props.triggerDistance, zIndex: _this.props.zIndex, getStickyBoundary: _this.getStickyBoundaryHandler(FormRef), style: {
                                borderTop: '1px solid #eee',
                                background: (style && style.background) || '#fff',
                                padding: (style && style.padding) || '8px 0'
                            } },
                            React.createElement("div", { className: className, style: style }, content)));
                    })));
            }
            return content;
        };
        FormButtonGroup.prototype.renderChildren = function () {
            var _a = this.props, children = _a.children, itemStyle = _a.itemStyle, offset = _a.offset, span = _a.span;
            return (React.createElement("div", { className: 'button-group' },
                React.createElement(Row, null,
                    React.createElement(Col, { span: span },
                        React.createElement(Col, { offset: offset, className: 'inline' },
                            React.createElement("div", { className: 'inline-view', style: itemStyle }, children))))));
        };
        FormButtonGroup.prototype.getStickyBoundaryHandler = function (ref) {
            var _this = this;
            return function () {
                _this.formNode = _this.formNode || ReactDOM.findDOMNode(ref.current);
                if (_this.formNode) {
                    return isElementInViewport(_this.formNode.getBoundingClientRect());
                }
                return true;
            };
        };
        return FormButtonGroup;
    }(Component)),
    _a.defaultProps = {
        span: 24
    },
    _a))(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  &.is-inline {\n    display: inline-block;\n    flex-grow: 3;\n  }\n  .button-group {\n    .inline {\n      display: inline-block;\n      .inline-view {\n        & > * {\n          margin-right: 10px;\n          margin-left: 0px;\n          display: inline-block;\n        }\n        & > *:last-child {\n          margin-right: 0 !important;\n        }\n      }\n    }\n  }\n"], ["\n  ",
    "\n  &.is-inline {\n    display: inline-block;\n    flex-grow: 3;\n  }\n  .button-group {\n    .inline {\n      display: inline-block;\n      .inline-view {\n        & > * {\n          margin-right: 10px;\n          margin-left: 0px;\n          display: inline-block;\n        }\n        & > *:last-child {\n          margin-right: 0 !important;\n        }\n      }\n    }\n  }\n"])), function (props) {
    return props.align ? "display:flex;justify-content: " + getAlign(props.align) : '';
});
var templateObject_1;
