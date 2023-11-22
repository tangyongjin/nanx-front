"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@uform/react");
var radio_1 = __importDefault(require("antd/lib/radio"));
var utils_1 = require("../utils");
var RadioGroup = radio_1.default.Group;
react_1.registerFormField('radio', react_1.connect({
    getProps: utils_1.mapStyledProps,
    getComponent: utils_1.mapTextComponent
})(utils_1.transformDataSourceKey(RadioGroup, 'options')));
