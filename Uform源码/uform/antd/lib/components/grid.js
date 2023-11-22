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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var utils_1 = require("@uform/utils");
var Row = (function (_super) {
    __extends(Row, _super);
    function Row() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Row.prototype.render = function () {
        var _a, _b, _c, _d;
        var _e = this.props, prefix = _e.prefix, pure = _e.pure, wrap = _e.wrap, fixed = _e.fixed, gutter = _e.gutter, fixedWidth = _e.fixedWidth, align = _e.align, justify = _e.justify, hidden = _e.hidden, className = _e.className, Tag = _e.component, children = _e.children, others = __rest(_e, ["prefix", "pure", "wrap", "fixed", "gutter", "fixedWidth", "align", "justify", "hidden", "className", "component", "children"]);
        var hiddenClassObj;
        if (hidden === true) {
            hiddenClassObj = (_a = {}, _a[prefix + "row-hidden"] = true, _a);
        }
        else if (typeof hidden === 'string') {
            hiddenClassObj = (_b = {}, _b[prefix + "row-" + hidden + "-hidden"] = !!hidden, _b);
        }
        else if (Array.isArray(hidden)) {
            hiddenClassObj = hidden.reduce(function (ret, point) {
                ret[prefix + "row-" + point + "-hidden"] = !!point;
                return ret;
            }, {});
        }
        var newClassName = classnames_1.default(__assign((_c = {}, _c[prefix + "row"] = true, _c[prefix + "row-wrap"] = wrap, _c[prefix + "row-fixed"] = fixed, _c[prefix + "row-fixed-" + fixedWidth] = !!fixedWidth, _c[prefix + "row-justify-" + justify] = !!justify, _c[prefix + "row-align-" + align] = !!align, _c), hiddenClassObj, (_d = {}, _d[className] = !!className, _d)));
        var newChildren = utils_1.toArr(children);
        var gutterNumber = parseInt(gutter, 10);
        if (gutterNumber !== 0) {
            var halfGutterString_1 = gutterNumber / 2 + "px";
            others.style = __assign({ marginLeft: "-" + halfGutterString_1, marginRight: "-" + halfGutterString_1 }, (others.style || {}));
            newChildren = react_1.Children.map(children, function (child) {
                if (child &&
                    child.type &&
                    typeof child.type === 'function' &&
                    child.type.isNextCol) {
                    var newChild = react_1.cloneElement(child, {
                        style: __assign({ paddingLeft: halfGutterString_1, paddingRight: halfGutterString_1 }, (child.props.style || {}))
                    });
                    return newChild;
                }
                return child;
            });
        }
        return (react_1.default.createElement(Tag, __assign({ role: 'row', className: newClassName }, others), newChildren));
    };
    Row.defaultProps = {
        prefix: 'ant-',
        pure: false,
        fixed: false,
        gutter: 0,
        wrap: false,
        component: 'div'
    };
    return Row;
}(react_1.Component));
exports.Row = Row;
var breakPoints = ['xxs', 'xs', 's', 'm', 'l', 'xl'];
var Col = (function (_super) {
    __extends(Col, _super);
    function Col() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Col.prototype.render = function () {
        var _a, _b, _c, _d;
        var _this = this;
        var _e = this.props, prefix = _e.prefix, pure = _e.pure, span = _e.span, offset = _e.offset, fixedSpan = _e.fixedSpan, fixedOffset = _e.fixedOffset, hidden = _e.hidden, align = _e.align, xxs = _e.xxs, xs = _e.xs, s = _e.s, m = _e.m, l = _e.l, xl = _e.xl, Tag = _e.component, className = _e.className, children = _e.children, others = __rest(_e, ["prefix", "pure", "span", "offset", "fixedSpan", "fixedOffset", "hidden", "align", "xxs", "xs", "s", "m", "l", "xl", "component", "className", "children"]);
        var pointClassObj = breakPoints.reduce(function (ret, point) {
            var pointProps = {};
            if (typeof _this.props[point] === 'object') {
                pointProps = _this.props[point];
            }
            else {
                pointProps.span = _this.props[point];
            }
            ret[prefix + "col-" + point + "-" + pointProps.span] = !!pointProps.span;
            ret[prefix + "col-" + point + "-offset-" + pointProps.offset] = !!pointProps.offset;
            return ret;
        }, {});
        var hiddenClassObj;
        if (hidden === true) {
            hiddenClassObj = (_a = {}, _a[prefix + "col-hidden"] = true, _a);
        }
        else if (typeof hidden === 'string') {
            hiddenClassObj = (_b = {}, _b[prefix + "col-" + hidden + "-hidden"] = !!hidden, _b);
        }
        else if (Array.isArray(hidden)) {
            hiddenClassObj = hidden.reduce(function (ret, point) {
                ret[prefix + "col-" + point + "-hidden"] = !!point;
                return ret;
            }, {});
        }
        var classes = classnames_1.default(__assign((_c = {}, _c[prefix + "col"] = true, _c[prefix + "col-" + span] = !!span, _c[prefix + "col-fixed-" + fixedSpan] = !!fixedSpan, _c[prefix + "col-offset-" + offset] = !!offset, _c[prefix + "col-offset-fixed-" + fixedOffset] = !!fixedOffset, _c[prefix + "col-" + align] = !!align, _c), pointClassObj, hiddenClassObj, (_d = {}, _d[className] = className, _d)));
        return (react_1.default.createElement(Tag, __assign({ role: 'gridcell', className: classes }, others), children));
    };
    Col.isNextCol = true;
    Col.defaultProps = {
        prefix: 'ant-',
        pure: false,
        component: 'div'
    };
    return Col;
}(react_1.Component));
exports.Col = Col;
