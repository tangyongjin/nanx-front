"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@uform/react");
var input_1 = __importDefault(require("antd/lib/input"));
var utils_1 = require("../utils");
var TextArea = input_1.default.TextArea;
react_1.registerFormField('textarea', react_1.connect({
    getProps: utils_1.mapStyledProps,
    getComponent: utils_1.mapTextComponent
})(utils_1.acceptEnum(TextArea)));
