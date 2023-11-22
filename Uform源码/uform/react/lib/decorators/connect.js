"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var utils_1 = require("../utils");
var isEvent = function (candidate) {
    return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
};
var isReactNative = typeof window !== 'undefined' &&
    window.navigator &&
    window.navigator.product &&
    window.navigator.product === 'ReactNative';
var getSelectedValues = function (options) {
    var result = [];
    if (options) {
        for (var index = 0; index < options.length; index++) {
            var option = options[index];
            if (option.selected) {
                result.push(option.value);
            }
        }
    }
    return result;
};
var getValue = function (event, isReactNative) {
    if (isEvent(event)) {
        if (!isReactNative &&
            event.nativeEvent &&
            event.nativeEvent.text !== undefined) {
            return event.nativeEvent.text;
        }
        if (isReactNative && event.nativeEvent !== undefined) {
            return event.nativeEvent.text;
        }
        var detypedEvent = event;
        var _a = detypedEvent.target, type = _a.type, value = _a.value, checked = _a.checked, files = _a.files, dataTransfer = detypedEvent.dataTransfer;
        if (type === 'checkbox') {
            return !!checked;
        }
        if (type === 'file') {
            return files || (dataTransfer && dataTransfer.files);
        }
        if (type === 'select-multiple') {
            return getSelectedValues(event.target.options);
        }
        return value;
    }
    return event;
};
var createEnum = function (enums, enumNames) {
    if (utils_1.isArr(enums)) {
        return enums.map(function (item, index) {
            if (typeof item === 'object') {
                return __assign({}, item);
            }
            else {
                return __assign({}, item, { label: utils_1.isArr(enumNames) ? enumNames[index] || item : item, value: item });
            }
        });
    }
    return [];
};
var bindEffects = function (props, effect, dispatch) {
    utils_1.each(effect(dispatch, __assign({}, props)), function (event, key) {
        var prevEvent = key === 'onChange' ? props[key] : undefined;
        props[key] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (utils_1.isFn(prevEvent)) {
                prevEvent.apply(void 0, args);
            }
            if (utils_1.isFn(event)) {
                return event.apply(void 0, args);
            }
        };
    });
    return props;
};
exports.connect = function (opts) { return function (Target) {
    opts = __assign({ valueName: 'value', eventName: 'onChange' }, opts);
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            var _a;
            var _b = this.props, value = _b.value, name = _b.name, mutators = _b.mutators, schema = _b.schema, editable = _b.editable;
            var props = __assign({}, opts.defaultProps, schema['x-props'], (_a = {}, _a[opts.valueName] = value, _a[opts.eventName] = function (event) {
                var _a;
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                mutators.change(opts.getValueFromEvent
                    ? (_a = opts.getValueFromEvent).call.apply(_a, [{ props: schema['x-props'] || {} },
                        event].concat(args)) : getValue(event, isReactNative));
            }, _a));
            if (editable !== undefined) {
                if (utils_1.isFn(editable)) {
                    if (!editable(name)) {
                        props.disabled = true;
                        props.readOnly = true;
                    }
                }
                else if (editable === false) {
                    props.disabled = true;
                    props.readOnly = true;
                }
            }
            if (utils_1.isFn(schema['x-effect'])) {
                props = bindEffects(props, schema['x-effect'], mutators.dispatch);
            }
            if (utils_1.isFn(opts.getProps)) {
                var newProps = opts.getProps(props, this.props);
                if (newProps !== undefined) {
                    props = newProps;
                }
            }
            if (utils_1.isArr(schema.enum) && !props.dataSource) {
                props.dataSource = createEnum(schema.enum, schema.enumNames);
            }
            if (props.editable !== undefined) {
                delete props.editable;
            }
            return react_1.default.createElement(utils_1.isFn(opts.getComponent)
                ? opts.getComponent(Target, props, this.props)
                : Target, props);
        };
        return class_1;
    }(react_1.PureComponent));
}; };
