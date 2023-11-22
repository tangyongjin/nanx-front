"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@uform/react");
var transfer_1 = __importDefault(require("antd/lib/transfer"));
var utils_1 = require("../utils");
react_1.registerFormField('transfer', react_1.connect({
    getProps: utils_1.mapStyledProps,
    valueName: 'targetKeys'
})(transfer_1.default));
