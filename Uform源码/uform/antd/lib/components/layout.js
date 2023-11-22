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
var _a, _b;
var react_1 = __importStar(require("react"));
var react_2 = require("@uform/react");
var utils_1 = require("@uform/utils");
var card_1 = __importDefault(require("antd/lib/card"));
var row_1 = __importDefault(require("antd/lib/row"));
var col_1 = __importDefault(require("antd/lib/col"));
var styled_components_1 = __importDefault(require("styled-components"));
var classnames_1 = __importDefault(require("classnames"));
var form_1 = require("../form");
var normalizeCol = function (col, defaultValue) {
    if (defaultValue === void 0) {
        defaultValue = { span: 0 };
    }
    if (!col) {
        return defaultValue;
    }
    else {
        return typeof col === 'object' ? col : { span: col };
    }
};
exports.FormLayoutItem = function (props) {
    return react_1.default.createElement(form_1.FormLayoutConsumer, {}, function (_a) {
        var labelAlign = _a.labelAlign, labelTextAlign = _a.labelTextAlign, labelCol = _a.labelCol, wrapperCol = _a.wrapperCol, size = _a.size, autoAddColon = _a.autoAddColon;
        return react_1.default.createElement(form_1.FormItem, __assign({ labelAlign: labelAlign,
            labelTextAlign: labelTextAlign,
            labelCol: labelCol,
            wrapperCol: wrapperCol,
            autoAddColon: autoAddColon,
            size: size }, props), props.children);
    });
};
exports.FormLayout = react_2.createVirtualBox('layout', function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (react_1.default.createElement(form_1.FormLayoutConsumer, null, function (value) {
        var newValue = __assign({}, value, props);
        var child = newValue.inline || newValue.className || newValue.style ? (react_1.default.createElement("div", { className: classnames_1.default(newValue.className, {
                'ant-form ant-form-inline': !!newValue.inline
            }), style: newValue.style }, children)) : (children);
        return (react_1.default.createElement(form_1.FormLayoutProvider, { value: newValue }, child));
    }));
});
exports.FormItemGrid = react_2.createVirtualBox('grid', (function (_super) {
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
        return react_1.default.createElement(exports.FormLayoutItem, __assign({ label: title, noMinHeight: true, id: name, extra: extra,
            help: help }, props), children);
    };
    class_1.prototype.renderGrid = function () {
        var _a = this.props, rawChildren = _a.children, rawCols = _a.cols, title = _a.title, description = _a.description, help = _a.help, extra = _a.extra, props = __rest(_a, ["children", "cols", "title", "description", "help", "extra"]);
        var children = utils_1.toArr(rawChildren);
        var childNum = children.length;
        var cols = utils_1.toArr(rawCols).map(function (col) { return normalizeCol(col); });
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
        return (react_1.default.createElement(row_1.default, __assign({}, props), children.reduce(function (buf, child, key) {
            return child
                ? buf.concat(react_1.default.createElement(col_1.default, __assign({ key: key }, cols[key]), child))
                : buf;
        }, [])));
    };
    return class_1;
}(react_1.Component)));
exports.FormCard = react_2.createVirtualBox('card', styled_components_1.default((_a = (function (_super) {
    __extends(class_2, _super);
    function class_2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_2.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
        return (react_1.default.createElement(card_1.default, __assign({ className: className }, props), children));
    };
    return class_2;
}(react_1.Component)),
    _a.defaultProps = {},
    _a))(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin-bottom: 30px;\n    .ant-card-body {\n      padding-top: 30px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      display: block;\n      margin-bottom: 30px;\n    }\n  "], ["\n    margin-bottom: 30px;\n    .ant-card-body {\n      padding-top: 30px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      display: block;\n      margin-bottom: 30px;\n    }\n  "]))));
exports.FormBlock = react_2.createVirtualBox('block', styled_components_1.default((_b = (function (_super) {
    __extends(class_3, _super);
    function class_3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_3.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
        return (react_1.default.createElement(card_1.default, __assign({ className: className }, props), children));
    };
    return class_3;
}(react_1.Component)),
    _b.defaultProps = {},
    _b))(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    margin-bottom: 0px;\n    .ant-card-body {\n      padding-top: 20px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      border: none;\n      padding: 0 15px;\n      padding-bottom: 15px;\n      display: block;\n      box-shadow: none;\n    }\n    .ant-card-head {\n      padding: 0 !important;\n      min-height: 24px;\n      font-weight: normal;\n    }\n    .ant-card-head-title {\n      padding: 0;\n    }\n  "], ["\n    margin-bottom: 0px;\n    .ant-card-body {\n      padding-top: 20px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      border: none;\n      padding: 0 15px;\n      padding-bottom: 15px;\n      display: block;\n      box-shadow: none;\n    }\n    .ant-card-head {\n      padding: 0 !important;\n      min-height: 24px;\n      font-weight: normal;\n    }\n    .ant-card-head-title {\n      padding: 0;\n    }\n  "]))));
exports.FormTextBox = react_2.createControllerBox('text-box', styled_components_1.default(function (_a) {
    var children = _a.children, schema = _a.schema, className = _a.className;
    var _b = schema['x-props'], title = _b.title, help = _b.help, text = _b.text, name = _b.name, extra = _b.extra, props = __rest(_b, ["title", "help", "text", "name", "extra"]);
    var ref = react_1.useRef();
    var arrChildren = utils_1.toArr(children);
    var split = String(text).split('%s');
    react_1.useLayoutEffect(function () {
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
        return buf.concat(item ? (react_1.default.createElement("span", { key: index++, className: "text-box-words" }, item)) : null, arrChildren[key] ? (react_1.default.createElement("div", { key: index++, className: "text-box-field" }, arrChildren[key])) : null);
    }, []);
    if (!title) {
        return (react_1.default.createElement("div", { className: className, ref: ref }, newChildren));
    }
    return react_1.default.createElement(exports.FormLayoutItem, __assign({ label: title, noMinHeight: true, id: name, extra: extra,
        help: help }, props), react_1.default.createElement("div", { className: className, ref: ref }, newChildren));
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
