"use strict";
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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
var _a;
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var grid_1 = require("./grid");
var form_1 = require("../form");
var react_stikky_1 = __importDefault(require("react-stikky"));
var classnames_1 = __importDefault(require("classnames"));
var styled_components_1 = __importDefault(require("styled-components"));
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
exports.FormButtonGroup = styled_components_1.default((_a = (function (_super) {
    __extends(FormButtonGroup, _super);
    function FormButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormButtonGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, sticky = _a.sticky, style = _a.style, className = _a.className;
        var content = (react_1.default.createElement(form_1.FormLayoutConsumer, null, function (_a) {
            var inline = (_a === void 0 ? {} : _a).inline;
            return (react_1.default.createElement("div", { className: classnames_1.default(className, {
                    'is-inline': !!inline
                }), style: style }, _this.renderChildren()));
        }));
        if (sticky) {
            return (react_1.default.createElement("div", null, react_1.default.createElement(form_1.FormLayoutConsumer, null, function (_a) {
                var FormRef = (_a === void 0 ? {} : _a).FormRef;
                if (!FormRef) {
                    return;
                }
                return (react_1.default.createElement(react_stikky_1.default, { edge: 'bottom', triggerDistance: _this.props.triggerDistance, zIndex: _this.props.zIndex, getStickyBoundary: _this.getStickyBoundaryHandler(FormRef), style: {
                        borderTop: '1px solid #eee',
                        background: (style && style.background) || '#fff',
                        padding: (style && style.padding) || '8px 0'
                    } }, react_1.default.createElement("div", { className: className, style: style }, content)));
            })));
        }
        return content;
    };
    FormButtonGroup.prototype.renderChildren = function () {
        var _a = this.props, children = _a.children, itemStyle = _a.itemStyle, offset = _a.offset, span = _a.span;
        return (react_1.default.createElement("div", { className: 'button-group' }, react_1.default.createElement(grid_1.Row, null, react_1.default.createElement(grid_1.Col, { span: span }, react_1.default.createElement(grid_1.Col, { offset: offset, className: 'inline' }, react_1.default.createElement("div", { className: 'inline-view', style: itemStyle }, children))))));
    };
    FormButtonGroup.prototype.getStickyBoundaryHandler = function (ref) {
        var _this = this;
        return function () {
            _this.formNode = _this.formNode || react_dom_1.default.findDOMNode(ref.current);
            if (_this.formNode) {
                return isElementInViewport(_this.formNode.getBoundingClientRect());
            }
            return true;
        };
    };
    return FormButtonGroup;
}(react_1.Component)),
    _a.defaultProps = {
        span: 24
    },
    _a))(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  &.is-inline {\n    display: inline-block;\n    flex-grow: 3;\n  }\n  .button-group {\n    .inline {\n      display: inline-block;\n      .inline-view {\n        & > * {\n          margin-right: 10px;\n          margin-left: 0px;\n          display: inline-block;\n        }\n        & > *:last-child {\n          margin-right: 0 !important;\n        }\n      }\n    }\n  }\n"], ["\n  ",
    "\n  &.is-inline {\n    display: inline-block;\n    flex-grow: 3;\n  }\n  .button-group {\n    .inline {\n      display: inline-block;\n      .inline-view {\n        & > * {\n          margin-right: 10px;\n          margin-left: 0px;\n          display: inline-block;\n        }\n        & > *:last-child {\n          margin-right: 0 !important;\n        }\n      }\n    }\n  }\n"])), function (props) {
    return props.align ? "display:flex;justify-content: " + getAlign(props.align) : '';
});
var templateObject_1;
