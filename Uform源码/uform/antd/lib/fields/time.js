"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@uform/react");
var moment_1 = __importDefault(require("moment"));
var time_picker_1 = __importDefault(require("antd/lib/time-picker"));
var utils_1 = require("../utils");
react_1.registerFormField('time', react_1.connect({
    getValueFromEvent: function (_, value) {
        return value ? value : null;
    },
    getProps: function (props, fieldProps) {
        var value = props.value, _a = props.disabled, disabled = _a === void 0 ? false : _a;
        try {
            if (!disabled && value) {
                props.value = moment_1.default(value, 'HH:mm:ss');
            }
        }
        catch (e) {
            throw new Error(e);
        }
        utils_1.mapStyledProps(props, fieldProps);
    },
    getComponent: utils_1.mapTextComponent
})(time_picker_1.default));
