"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@uform/react");
var input_number_1 = __importDefault(require("antd/lib/input-number"));
var utils_1 = require("../utils");
react_1.registerFormField('number', react_1.connect({
    getProps: utils_1.mapStyledProps,
    getComponent: utils_1.mapTextComponent
})(utils_1.acceptEnum(input_number_1.default)));
