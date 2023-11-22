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
var react_1 = __importDefault(require("react"));
var select_1 = __importDefault(require("antd/lib/select"));
var icon_2 = __importDefault(require("antd/lib/icon"));
var react_dom_1 = __importDefault(require("react-dom"));
var styled_components_1 = __importDefault(require("styled-components"));
var utils_1 = require("@uform/utils");
__export(require("@uform/utils"));
var MoveTo = typeof window !== 'undefined' ? require('moveto') : null;
var WrapSelect = styled_components_1.default((function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.render = function () {
        var _a = this.props, _b = _a.dataSource, dataSource = _b === void 0 ? [] : _b, others = __rest(_a, ["dataSource"]);
        var children = dataSource.map(function (item) {
            var label = item.label, value = item.value, others = __rest(item, ["label", "value"]);
            return (react_1.default.createElement(select_1.default.Option, __assign({ key: value }, others, { label: label, value: value }), label));
        });
        return (react_1.default.createElement(select_1.default, __assign({ className: this.props.className }, others), children));
    };
    return class_1;
}(react_1.default.Component)))(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-width: 100px;\n  width: 100%;\n"], ["\n  min-width: 100px;\n  width: 100%;\n"])));
var Text = styled_components_1.default(function (props) {
    var value;
    if (props.dataSource && props.dataSource.length) {
        var find_1 = props.dataSource.filter(function (_a) {
            var value = _a.value;
            return Array.isArray(props.value)
                ? props.value.some(function (val) { return val == value; })
                : props.value == value;
        });
        value = find_1.reduce(function (buf, item, index) {
            return buf.concat(item.label, index < find_1.length - 1 ? ', ' : '');
        }, []);
    }
    else {
        value = Array.isArray(props.value)
            ? props.value.join(' ~ ')
            : String(props.value === undefined || props.value === null ? '' : props.value);
    }
    return (react_1.default.createElement("div", { className: props.className + " " + (props.size || '') + " text-field" }, value || 'N/A', props.innerAfter ? ' ' + props.innerAfter : '', props.addonAfter ? ' ' + props.addonAfter : ''));
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 32px;\n  line-height: 32px;\n  vertical-align: middle;\n  font-size: 13px;\n  color: #333;\n  &.small {\n    height: 24px;\n    line-height: 24px;\n  }\n  &.large {\n    height: 40px;\n    line-height: 40px;\n  }\n"], ["\n  height: 32px;\n  line-height: 32px;\n  vertical-align: middle;\n  font-size: 13px;\n  color: #333;\n  &.small {\n    height: 24px;\n    line-height: 24px;\n  }\n  &.large {\n    height: 40px;\n    line-height: 40px;\n  }\n"])));
var loadingSvg = '<svg viewBox="0 0 1024 1024" class="anticon-spin" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>';
exports.StateLoading = function (Target) {
    return (function (_super) {
        __extends(Select, _super);
        function Select() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Select.prototype.componentDidMount = function () {
            if (this.wrapper) {
                this.wrapperDOM = react_dom_1.default.findDOMNode(this.wrapper);
                this.mapState();
            }
        };
        Select.prototype.componentDidUpdate = function () {
            this.mapState();
        };
        Select.prototype.render = function () {
            var _this = this;
            return (react_1.default.createElement(Target, __assign({ ref: function (inst) {
                    if (inst) {
                        _this.wrapper = inst;
                    }
                } }, this.props)));
        };
        Select.prototype.mapState = function () {
            var _this = this;
            var state = this.props.state;
            var loadingName = 'anticon-spin';
            var iconSizeClassNames = [
                'xxs',
                'xs',
                'small',
                'medium',
                'large',
                'xl',
                'xxl',
                'xxxl'
            ];
            this.classList = this.classList || [];
            if (this.wrapperDOM) {
                var icon_1 = this.wrapperDOM.querySelector('.anticon');
                if (!icon_1 || !icon_1.classList) {
                    return;
                }
                if (state === 'loading') {
                    icon_1.classList.forEach(function (className) {
                        if (className.indexOf('anticon-') > -1) {
                            if (className !== loadingName &&
                                iconSizeClassNames.every(function (val) { return "anticon-" + val !== className; })) {
                                icon_1.classList.remove(className);
                                _this.classList.push(className);
                            }
                        }
                    });
                    if (icon_1.innerHTML) {
                        icon_1.oldHTML = icon_1.innerHTML;
                        icon_1.innerHTML = loadingSvg;
                    }
                    if (!icon_1.classList.contains(loadingName)) {
                        icon_1.classList.add(loadingName);
                    }
                }
                else {
                    icon_1.classList.remove(loadingName);
                    this.classList.forEach(function (className) {
                        icon_1.classList.add(className);
                    });
                    if (icon_1.oldHTML) {
                        icon_1.innerHTML = icon_1.oldHTML;
                    }
                    this.classList = [];
                }
            }
        };
        return Select;
    }(react_1.default.Component));
};
var Select = exports.StateLoading(WrapSelect);
exports.acceptEnum = function (component) {
    return function (_a) {
        var dataSource = _a.dataSource, others = __rest(_a, ["dataSource"]);
        if (dataSource || others.showSearch) {
            return react_1.default.createElement(Select, __assign({ dataSource: dataSource }, others));
        }
        else {
            return react_1.default.createElement(component, others);
        }
    };
};
exports.mapStyledProps = function (props, _a) {
    var loading = _a.loading, size = _a.size;
    if (loading) {
        props.state = props.state || 'loading';
        props.suffix = props.suffix || (react_1.default.createElement(icon_2.default, { type: "loading", style: { color: 'rgba(0, 0, 0, 0.25)' } }));
    }
    else {
        props.suffix = props.suffix || react_1.default.createElement("span", null);
    }
    if (size) {
        props.size = size;
    }
};
exports.mapTextComponent = function (Target, props, _a) {
    var editable = _a.editable, name = _a.name;
    if (editable !== undefined) {
        if (utils_1.isFn(editable)) {
            if (!editable(name)) {
                return Text;
            }
        }
        else if (editable === false) {
            return Text;
        }
    }
    return Target;
};
exports.compose = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (payload) {
        var extra = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extra[_i - 1] = arguments[_i];
        }
        return args.reduce(function (buf, fn) {
            return buf !== undefined ? fn.apply(void 0, [buf].concat(extra)) : fn.apply(void 0, [payload].concat(extra));
        }, payload);
    };
};
exports.transformDataSourceKey = function (component, dataSourceKey) {
    return function (_a) {
        var _b;
        var dataSource = _a.dataSource, others = __rest(_a, ["dataSource"]);
        return react_1.default.createElement(component, __assign((_b = {}, _b[dataSourceKey] = dataSource, _b), others));
    };
};
exports.moveTo = function (element) {
    if (!element || !MoveTo) {
        return;
    }
    if (element.scrollIntoView) {
        element.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'start'
        });
    }
    else {
        new MoveTo().move(element.getBoundingClientRect().top);
    }
};
var templateObject_1, templateObject_2;
