"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var switch_1 = __importDefault(require("antd/lib/switch"));
var react_1 = require("@uform/react");
var utils_1 = require("../utils");
react_1.registerFormField('boolean', react_1.connect({
    valueName: 'checked',
    getProps: utils_1.mapStyledProps
})(utils_1.acceptEnum(switch_1.default)));
