"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@uform/react");
var rate_1 = __importDefault(require("antd/lib/rate"));
var utils_1 = require("../utils");
react_1.registerFormField('rating', react_1.connect({
    getProps: utils_1.mapStyledProps
})(rate_1.default));
